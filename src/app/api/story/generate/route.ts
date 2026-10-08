import { NextRequest, NextResponse } from 'next/server';
import { ParentSetup, StoryChapter } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildStoryPrompt } from '@/lib/ai/prompts';
import { generateParametricStory } from '@/lib/ai/storyEngine';

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

    // Attempt AI Generation via Gemini
    const prompt = buildStoryPrompt(setup);
    const aiResult = await callGeminiJSON<GenerateResponse>(prompt, {
      model: 'gemini-2.5-flash',
      temperature: 0.7,
    });

    if (aiResult && Array.isArray(aiResult.chapters) && aiResult.chapters.length >= 3) {
      return NextResponse.json({
        success: true,
        chapters: aiResult.chapters,
        source: 'ai',
      });
    }

    // Dynamic parametric fallback engine:
    // Generates a tailored 3-chapter story weaving age, topic, goal, struggle, world, and companion
    const parametricChapters = generateParametricStory(setup);
    return NextResponse.json({
      success: true,
      chapters: parametricChapters,
      source: 'parametric_engine',
    });
  } catch (error) {
    console.error('Error in /api/story/generate:', error);
    // In case of any exception, guarantee a custom story based on setup
    const fallbackSetup: ParentSetup = {
      childName: 'Explorer',
      childAge: 8,
      topic: 'Learning Adventure',
      learningGoal: 'Discover how the world works',
      storyWorld: 'forest',
      companionType: 'animal'
    };
    const rescueChapters = generateParametricStory(fallbackSetup);
    return NextResponse.json({
      success: true,
      chapters: rescueChapters,
      source: 'recovery_engine',
    });
  }
}
