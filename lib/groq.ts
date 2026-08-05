import { retrieveIRCContext } from './ircKnowledgeBase';

export interface BOQItem {
  item: string;
  quantity: string;
  unit: string;
  rateINR: number;
  totalINR: number;
}

export interface BOQResponse {
  summary: string;
  distressAreaSqm: number;
  depthCm: number;
  materials: BOQItem[];
  laborAndEquipment: BOQItem[];
  totalCostINR: number;
  estimatedCO2Kg: number;
  ircCitations: string[];
  executionTimeDays: number;
  source?: 'live' | 'simulated';
}

export async function generateBOQWithLlama(prompt: string, inspectionContext?: any): Promise<BOQResponse> {
  const apiKey = process.env.GROQ_API_KEY || process.env.NEXT_PUBLIC_GROQ_API_KEY;
  const ircContext = retrieveIRCContext(prompt + ' ' + (inspectionContext?.distressType || 'pothole'));

  if (apiKey) {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are Nirman Copilot, an AI Road Infrastructure Engineer trained on Indian Road Congress (IRC) standards.
Always generate a JSON object matching this schema:
{
  "summary": "string explaining technical rationale",
  "distressAreaSqm": number,
  "depthCm": number,
  "materials": [{"item": "string", "quantity": "string", "unit": "string", "rateINR": number, "totalINR": number}],
  "laborAndEquipment": [{"item": "string", "quantity": "string", "unit": "string", "rateINR": number, "totalINR": number}],
  "totalCostINR": number,
  "estimatedCO2Kg": number,
  "ircCitations": ["string"],
  "executionTimeDays": number
}

Use these IRC Grounding Clauses for compliance:
${ircContext}`,
            },
            {
              role: 'user',
              content: `User prompt: ${prompt}\nInspection Data: ${JSON.stringify(inspectionContext || {})}`,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.2,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content) as BOQResponse;
          parsed.source = 'live';
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Groq API call fallback triggered:', err);
    }
  }

  // High-fidelity fallback response tailored to inspection context
  const area = inspectionContext?.metrics?.areaSqm || 2.5;
  const depth = inspectionContext?.metrics?.maxDepthCm || 15;
  const volume = inspectionContext?.metrics?.volumeCum || 0.375;

  const bitumenTon = (volume * 2.4 * 0.05).toFixed(3); // 5% bitumen content, density 2.4 t/m3
  const aggregateTon = (volume * 2.4 * 0.95).toFixed(2);
  const tackCoatL = (area * 0.5).toFixed(1);

  const matBitumenCost = Math.round(parseFloat(bitumenTon) * 62000);
  const matAggCost = Math.round(parseFloat(aggregateTon) * 1400);
  const matTackCost = Math.round(parseFloat(tackCoatL) * 95);
  const matEmulsionCost = Math.round(area * 120);

  const laborCutterCost = 3500;
  const laborRollerCost = 6500;
  const laborCrewCost = 4800;

  const totalMaterials = matBitumenCost + matAggCost + matTackCost + matEmulsionCost;
  const totalLabor = laborCutterCost + laborRollerCost + laborCrewCost;
  const totalCost = totalMaterials + totalLabor;
  const co2Estimate = Math.round(volume * 380); // ~380 kg CO2e per m3 asphalt work

  return {
    summary: `BOQ generated in accordance with IRC:82-2023 for ${area} sq.m pothole repair (${depth}cm depth). Recommends full-depth cutting, tack coat sealing, and 2-layer Bituminous Concrete (BC) compaction.`,
    distressAreaSqm: area,
    depthCm: depth,
    materials: [
      { item: 'VG-30 Bitumen Mix (BC)', quantity: `${bitumenTon} Ton`, unit: 'Ton', rateINR: 62000, totalINR: matBitumenCost },
      { item: 'Graded Crushed Aggregate (10-20mm)', quantity: `${aggregateTon} Ton`, unit: 'Ton', rateINR: 1400, totalINR: matAggCost },
      { item: 'Bitumen Emulsion RS-1 (Tack Coat)', quantity: `${tackCoatL} Liters`, unit: 'Liter', rateINR: 95, totalINR: matTackCost },
      { item: 'Polyester Crack Sealant Matrix', quantity: `${(area * 0.4).toFixed(1)} Kg`, unit: 'Kg', rateINR: 300, totalINR: matEmulsionCost },
    ],
    laborAndEquipment: [
      { item: 'Pavement Saw Cutter & Crew', quantity: '1 Shift', unit: 'Shift', rateINR: 3500, totalINR: laborCutterCost },
      { item: 'Vibratory Mini-Roller (3-Ton)', quantity: '1 Shift', unit: 'Shift', rateINR: 6500, totalINR: laborRollerCost },
      { item: 'Skilled Roadwork Technicians (4 pxx)', quantity: '1 Day', unit: 'Day', rateINR: 4800, totalINR: laborCrewCost },
    ],
    totalCostINR: totalCost,
    estimatedCO2Kg: co2Estimate,
    ircCitations: [
      'IRC:82-2023 Section 4.3.2 (Full-Depth Patch Repair Standard)',
      'IRC:82-2023 Section 5.1.4 (Edge Sealing & 98% Density Compaction)',
      'MoRTH Section 3000 Clause 3004.3 (Sub-grade Density Verification)',
    ],
    executionTimeDays: 1,
    source: 'simulated',
  };
}
