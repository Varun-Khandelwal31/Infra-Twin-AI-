import { NextResponse } from 'next/server';

export async function GET() {
  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'road-1',
        properties: {
          id: 'road-1',
          name: 'Connaught Place Outer Circle',
          ward: 'Ward 34 - NDMC',
          healthScore: 74,
          status: 'Fair',
          trafficVolume: '4,200 PCU/hr',
          potholesCount: 3,
          inspectionId: 'IR-2025-05-27-1045',
          historicalScores: [88, 85, 81, 78, 76, 74],
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.214, 28.633],
            [77.218, 28.635],
            [77.221, 28.632],
            [77.219, 28.628],
            [77.214, 28.630],
            [77.214, 28.633],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'road-2',
        properties: {
          id: 'road-2',
          name: 'Barakhamba Road Arterial',
          ward: 'Ward 34 - NDMC',
          healthScore: 45,
          status: 'Critical',
          trafficVolume: '6,800 PCU/hr',
          potholesCount: 7,
          inspectionId: 'IR-2025-05-30-1120',
          historicalScores: [75, 68, 60, 54, 48, 45],
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.221, 28.632],
            [77.226, 28.629],
            [77.232, 28.626],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'road-3',
        properties: {
          id: 'road-3',
          name: 'Janpath Avenue',
          ward: 'Ward 33 - Lutyens',
          healthScore: 88,
          status: 'Good',
          trafficVolume: '3,100 PCU/hr',
          potholesCount: 1,
          inspectionId: 'IR-2025-05-25-0901',
          historicalScores: [94, 93, 91, 90, 89, 88],
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.218, 28.628],
            [77.218, 28.618],
            [77.219, 28.612],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'road-4',
        properties: {
          id: 'road-4',
          name: 'Outer Ring Road (IIT Flyover Stretch)',
          ward: 'Ward 12 - South Delhi',
          healthScore: 38,
          status: 'Critical',
          trafficVolume: '9,400 PCU/hr',
          potholesCount: 12,
          inspectionId: 'IR-2025-05-28-1092',
          historicalScores: [68, 62, 54, 47, 41, 38],
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.185, 28.548],
            [77.193, 28.546],
            [77.202, 28.544],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'road-5',
        properties: {
          id: 'road-5',
          name: 'Dwarka Expressway Sector 21',
          ward: 'Ward 08 - Dwarka',
          healthScore: 92,
          status: 'Good',
          trafficVolume: '5,600 PCU/hr',
          potholesCount: 0,
          inspectionId: 'IR-2025-05-29-1104',
          historicalScores: [98, 97, 95, 94, 93, 92],
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.050, 28.555],
            [77.058, 28.552],
            [77.065, 28.548],
          ],
        },
      },
      {
        type: 'Feature',
        id: 'road-6',
        properties: {
          id: 'road-6',
          name: 'NH-48 Mahipalpur Flyover Segment',
          ward: 'Ward 14 - Airport Zone',
          healthScore: 58,
          status: 'Fair',
          trafficVolume: '11,200 PCU/hr',
          potholesCount: 5,
          inspectionId: 'IR-2025-05-26-1011',
          historicalScores: [82, 77, 71, 66, 62, 58],
        },
        geometry: {
          type: 'LineString',
          coordinates: [
            [77.115, 28.538],
            [77.125, 28.542],
            [77.135, 28.545],
          ],
        },
      },
    ],
  };

  return NextResponse.json(geojson);
}
