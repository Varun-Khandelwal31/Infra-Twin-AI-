import { NextResponse } from 'next/server';
import { INSPECTION_SAMPLES, CONTRACTOR_SLA_SAMPLES } from '@/lib/mockInference';

export async function GET() {
  return NextResponse.json({
    inspections: INSPECTION_SAMPLES,
    slaVerifications: CONTRACTOR_SLA_SAMPLES,
  });
}
