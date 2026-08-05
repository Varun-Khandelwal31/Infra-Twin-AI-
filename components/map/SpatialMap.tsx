'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  MapPin,
  Calendar,
  Layers,
  Activity,
  ExternalLink,
  Bot,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export interface RoadFeature {
  id: string;
  name: string;
  ward: string;
  status: string;
  trafficVolume: string;
  potholesCount: number;
  inspectionId: string;
  historicalScores: number[];
  coordinates: [number, number][]; // [lng, lat]
}

function parseGeoJSONFeatures(geojson: any): RoadFeature[] {
  if (!geojson || !Array.isArray(geojson.features)) return [];
  return geojson.features.map((f: any) => ({
    id: f.id || f.properties?.id || `road-${Math.random()}`,
    name: f.properties?.name || 'Unknown Pavement Stretch',
    ward: f.properties?.ward || 'NDMC Ward',
    status: f.properties?.status || 'Fair',
    trafficVolume: f.properties?.trafficVolume || '4,500 PCU/hr',
    potholesCount: f.properties?.potholesCount ?? 0,
    inspectionId: f.properties?.inspectionId || 'IR-2025-05-27-1045',
    historicalScores: f.properties?.historicalScores || [80, 78, 75, 72, 70, 68],
    coordinates: f.geometry?.coordinates || [],
  }));
}

const MAP_STYLES = [
  { id: 'dark', label: 'OpenStreetMap Dark (SaaS)', url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json' },
  { id: 'osm', label: 'OpenStreetMap Standard', url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json' },
  { id: 'light', label: 'OpenStreetMap Light', url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json' },
];

export default function SpatialMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  const [roads, setRoads] = useState<RoadFeature[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedMonthIdx, setSelectedMonthIdx] = useState(5); // June
  const [selectedRoad, setSelectedRoad] = useState<RoadFeature | null>(null);
  const [currentStyle, setCurrentStyle] = useState('dark');

  // Fetch roads GeoJSON on mount
  useEffect(() => {
    setLoading(true);
    fetch('/api/roads')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch road networks`);
        return res.json();
      })
      .then((geojson) => {
        const parsed = parseGeoJSONFeatures(geojson);
        setRoads(parsed);
        if (parsed.length > 0) {
          setSelectedRoad(parsed[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching /api/roads:', err);
        setError(err?.message || 'Failed to load road networks');
        setLoading(false);
      });
  }, []);

  // Construct GeoJSON FeatureCollection with temporal scores
  const getGeoJSON = (monthIdx: number, roadList: RoadFeature[]) => {
    return {
      type: 'FeatureCollection',
      features: roadList.map((road) => {
        const score = road.historicalScores[monthIdx] ?? 70;
        return {
          type: 'Feature',
          id: road.id,
          properties: {
            id: road.id,
            name: road.name,
            ward: road.ward,
            healthScore: score,
            trafficVolume: road.trafficVolume,
            potholesCount: road.potholesCount,
          },
          geometry: {
            type: 'LineString',
            coordinates: road.coordinates,
          },
        };
      }),
    };
  };

  const addMapLayers = (map: maplibregl.Map, monthIdx: number, roadList: RoadFeature[]) => {
    if (!map.getSource('roads-source')) {
      map.addSource('roads-source', {
        type: 'geojson',
        data: getGeoJSON(monthIdx, roadList) as any,
      });
    } else {
      const src = map.getSource('roads-source') as maplibregl.GeoJSONSource;
      if (src) {
        src.setData(getGeoJSON(monthIdx, roadList) as any);
      }
    }

    if (!map.getLayer('roads-glow')) {
      map.addLayer({
        id: 'roads-glow',
        type: 'line',
        source: 'roads-source',
        paint: {
          'line-color': [
            'step',
            ['get', 'healthScore'],
            '#ef4444', 50,
            '#f59e0b', 80,
            '#10b981',
          ],
          'line-width': 12,
          'line-opacity': 0.35,
        },
      });
    }

    if (!map.getLayer('roads-line')) {
      map.addLayer({
        id: 'roads-line',
        type: 'line',
        source: 'roads-source',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': [
            'step',
            ['get', 'healthScore'],
            '#ef4444', 50,
            '#f59e0b', 80,
            '#10b981',
          ],
          'line-width': 5,
        },
      });

      map.on('click', 'roads-line', (e) => {
        if (!e.features || !e.features[0]) return;
        const clickedId = e.features[0].properties?.id;
        const found = roadList.find((r) => r.id === clickedId);
        if (found) {
          setSelectedRoad(found);
        }
      });

      map.on('mouseenter', 'roads-line', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'roads-line', () => {
        map.getCanvas().style.cursor = '';
      });
    }
  };

  // Initialize MapLibre GL map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || loading || roads.length === 0) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES[0].url,
      center: [77.2167, 28.6315],
      zoom: 12,
      pitch: 45,
      bearing: -15,
    });

    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    map.on('load', () => {
      addMapLayers(map, selectedMonthIdx, roads);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [loading, roads]);

  // Update map source on temporal slider month change or roads update
  useEffect(() => {
    if (!mapRef.current || roads.length === 0) return;
    const map = mapRef.current;
    if (map.isStyleLoaded()) {
      const source = map.getSource('roads-source') as maplibregl.GeoJSONSource;
      if (source) {
        source.setData(getGeoJSON(selectedMonthIdx, roads) as any);
      }
    }
  }, [selectedMonthIdx, roads]);

  // Handle Style Switch
  const handleStyleChange = (styleObj: typeof MAP_STYLES[0]) => {
    setCurrentStyle(styleObj.id);
    if (!mapRef.current) return;
    const map = mapRef.current;
    map.setStyle(styleObj.url);
    map.once('style.load', () => {
      addMapLayers(map, selectedMonthIdx, roads);
    });
  };

  // Fly to selected road
  const handleSelectRoad = (road: RoadFeature) => {
    setSelectedRoad(road);
    if (mapRef.current && road.coordinates.length > 0) {
      const [lng, lat] = road.coordinates[0];
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 13.5,
        pitch: 50,
        duration: 1500,
      });
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-6rem)] rounded-2xl border border-cyan-500/20 bg-[#0a0e17] p-8 flex flex-col items-center justify-center space-y-4">
        <Activity className="w-8 h-8 text-cyan-400 animate-spin" />
        <div className="text-sm font-mono font-bold text-white">Fetching GeoJSON Road Networks from /api/roads...</div>
        <div className="w-64 h-2 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[calc(100vh-6rem)] rounded-2xl border border-rose-500/30 bg-[#0a0e17] p-8 flex flex-col items-center justify-center space-y-4">
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
          ⚠️ {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs font-mono"
        >
          Retry Load
        </button>
      </div>
    );
  }

  const currentScore = selectedRoad ? selectedRoad.historicalScores[selectedMonthIdx] : 0;
  const trendData = selectedRoad
    ? MONTHS.map((m, idx) => ({
        month: m,
        score: selectedRoad.historicalScores[idx],
      }))
    : [];

  return (
    <div className="relative w-full h-[calc(100vh-6rem)] flex flex-col lg:flex-row overflow-hidden rounded-2xl border border-cyan-500/20 shadow-glass bg-[#0a0e17]">
      {/* Map Container */}
      <div className="relative flex-1 h-full min-h-[450px]">
        <div ref={mapContainerRef} className="w-full h-full" />

        {/* Map Header Overlay & OpenStreetMap Badge */}
        <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 text-xs font-semibold text-cyan-300 flex items-center gap-2 shadow-cyan-glow">
            <Globe className="w-4 h-4 text-cyan-400" />
            <span>OpenStreetMap Vector Engine • New Delhi</span>
          </div>

          {/* Map Style Selector Pills */}
          <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            {MAP_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => handleStyleChange(s)}
                className={cn(
                  'px-2.5 py-1 rounded-lg transition-all font-medium',
                  currentStyle === s.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow'
                    : 'text-slate-400 hover:text-slate-200'
                )}
              >
                {s.label.split(' ')[1]}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Good (&gt;80)
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ml-2" /> Fair (50-80)
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ml-2" /> Critical (&lt;50)
          </div>
        </div>

        {/* Segment Selection Overlay */}
        <div className="absolute top-16 left-4 z-10 flex flex-wrap gap-2 max-w-xl">
          {roads.map((road) => {
            const score = road.historicalScores[selectedMonthIdx];
            const isSelected = selectedRoad?.id === road.id;
            let bgStyle = 'border-emerald-500/40 text-emerald-400';
            if (score < 50) bgStyle = 'border-rose-500/40 text-rose-400';
            else if (score < 80) bgStyle = 'border-amber-500/40 text-amber-400';

            return (
              <button
                key={road.id}
                onClick={() => handleSelectRoad(road)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all backdrop-blur-md border',
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-cyan-glow'
                    : `bg-slate-900/80 hover:bg-slate-800 ${bgStyle}`
                )}
              >
                {road.name.split(' ')[0]} ({score})
              </button>
            );
          })}
        </div>

        {/* Bottom Temporal Slider Controls */}
        <div className="absolute bottom-4 left-4 right-4 lg:right-96 z-10 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 shrink-0">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Temporal Degradation Simulator</span>
          </div>

          <div className="flex-1 max-w-md flex items-center gap-4">
            <span className="text-xs font-mono font-bold text-cyan-400 shrink-0">
              {MONTHS[selectedMonthIdx]} 2026
            </span>
            <input
              type="range"
              min={0}
              max={5}
              value={selectedMonthIdx}
              onChange={(e) => setSelectedMonthIdx(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono shrink-0">
            <span>Monsoon Degradation Simulation</span>
          </div>
        </div>
      </div>

      {/* Right Drawer / Popup Panel for Selected Road */}
      {selectedRoad && (
        <div className="w-full lg:w-96 bg-[#111726]/95 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-cyan-500/20 p-6 flex flex-col justify-between overflow-y-auto shrink-0 z-20">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                Segment Metadata
              </span>
              <span className="text-xs font-mono text-slate-400">{selectedRoad.ward}</span>
            </div>

            <h2 className="text-lg font-bold text-white font-display mb-1">
              {selectedRoad.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Inspection Ref: {selectedRoad.inspectionId}</span>
            </div>

            {/* Score & Status Card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-mono">Current Health Score</div>
                <div className="text-3xl font-extrabold font-display text-white mt-0.5">
                  {currentScore} <span className="text-xs text-slate-500 font-mono font-normal">/ 100</span>
                </div>
              </div>

              <span
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-bold font-mono border',
                  currentScore > 80
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : currentScore > 50
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                )}
              >
                {selectedRoad.status}
              </span>
            </div>

            {/* Historical Degradation Line Chart (Recharts) */}
            <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-300 font-display mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                6-Month Degradation Trend Line
              </h3>

              <div className="w-full h-36 bg-slate-950/60 rounded-xl p-2 border border-slate-800">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={10} />
                    <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#00d9ff', borderRadius: '8px', fontSize: '11px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#00d9ff"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: '#00d9ff' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Traffic & Distress Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-6">
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">Traffic Volume</div>
                <div className="font-bold text-slate-200 font-display mt-0.5">{selectedRoad.trafficVolume}</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-[10px] text-slate-400 font-mono">AI Detected Potholes</div>
                <div className="font-bold text-rose-400 font-display mt-0.5">{selectedRoad.potholesCount} Critical</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-4 border-t border-slate-800">
            <Link
              href={`/audit?sample=sample-1`}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs hover:shadow-cyan-glow transition-all flex items-center justify-center gap-2"
            >
              <span>View Scan in AI Audit Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <Link
              href={`/copilot?sample=sample-1`}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-cyan-300 font-semibold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>Generate IRC BOQ</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
