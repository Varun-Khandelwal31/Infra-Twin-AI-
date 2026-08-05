import { NextResponse } from 'next/server';
import { generateBOQWithLlama } from '@/lib/groq';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, inspectionContext } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const boqResult = await generateBOQWithLlama(prompt, inspectionContext);
    return NextResponse.json(boqResult);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to generate BOQ' }, { status: 500 });
  }
}
