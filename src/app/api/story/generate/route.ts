import { NextRequest, NextResponse } from 'next/server';
import { ParentSetup, StoryChapter } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildStoryPrompt } from '@/lib/ai/prompts';
import { CURRICULUM_PRESETS } from '@/lib/ai/mockData';

interface GenerateResponse {
  chapters: StoryChapter[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const setup: ParentSetup = body.setup;

    if (!setup || !setup.topic || !setup.childAge) {
      return NextResponse.json(
        { error: 'Topic and child age are required.' },
        { status: 400 }
      );
    }

    // Check if matching preset ID was requested
    if (body.presetId) {
      const preset = CURRICULUM_PRESETS.find(p => p.id === body.presetId);
      if (preset) {
        return NextResponse.json({
          success: true,
          chapters: preset.chapters,
          source: 'curriculum_preset',
        });
      }
    }

    // Attempt AI Generation via Gemini
    const prompt = buildStoryPrompt(setup);
    const aiResult = await callGeminiJSON<GenerateResponse>(prompt, {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
    });

    if (aiResult && Array.isArray(aiResult.chapters) && aiResult.chapters.length >= 2) {
      return NextResponse.json({
        success: true,
        chapters: aiResult.chapters,
        source: 'ai',
      });
    }

    // Smart pedagogical fallback matching age & domain
    const fallbackPreset = findBestPresetFallback(setup);
    return NextResponse.json({
      success: true,
      chapters: fallbackPreset.chapters,
      source: 'fallback',
      note: 'Rendered using StoryQuest pedagogical fallback engine.',
    });
  } catch (error) {
    console.error('Error in /api/story/generate:', error);
    // Even if an unexpected server exception occurs, never let the user experience fail
    const defaultPreset = CURRICULUM_PRESETS[0];
    return NextResponse.json({
      success: true,
      chapters: defaultPreset.chapters,
      source: 'fallback_recovery',
    });
  }
}

function findBestPresetFallback(setup: ParentSetup) {
  const topicLower = setup.topic.toLowerCase();
  const needLower = (setup.specificNeed || '').toLowerCase();

  if (topicLower.includes('photo') || topicLower.includes('plant') || setup.childAge <= 7) {
    return CURRICULUM_PRESETS[1]; // Pip the Sprout (Age 5-7 Science)
  }
  if (topicLower.includes('frac') || topicLower.includes('divide') || setup.childAge >= 11) {
    return CURRICULUM_PRESETS[2]; // Quantum Shield Fractions (Age 11-13 Math)
  }
  return CURRICULUM_PRESETS[0]; // Space Bakery Multiples (Age 8-10 Math)
}
