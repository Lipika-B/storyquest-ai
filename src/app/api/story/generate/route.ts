import { NextRequest, NextResponse } from 'next/server';
import { ParentSetup, StoryLevel, LearningPlan } from '@/lib/types/quest';
import { callGeminiJSON } from '@/lib/ai/gemini';
import { buildLearningPlanPrompt, buildStoryPrompt } from '@/lib/ai/prompts';
import { generateLearningPlan, generateParametricStory } from '@/lib/ai/storyEngine';

interface GenerateResponse {
  levels: StoryLevel[];
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

    // STEP 1: CREATE INTERNAL AI LEARNING PLAN FIRST
    let learningPlan: LearningPlan | null = null;
    try {
      const planPrompt = buildLearningPlanPrompt(setup);
      const aiPlan = await callGeminiJSON<LearningPlan>(planPrompt, {
        model: 'gemini-2.5-flash',
        temperature: 0.3,
      });
      if (aiPlan && Array.isArray(aiPlan.learningObjectives) && aiPlan.learningObjectives.length > 0) {
        learningPlan = aiPlan;
      }
    } catch (e) {
      // Fallback to domain engine
    }

    if (!learningPlan) {
      learningPlan = generateLearningPlan(setup);
    }

    // STEP 2: GENERATE 5-LEVEL STORYTEACHING ADVENTURE ANCHORED TO LEARNING PLAN
    try {
      const storyPrompt = buildStoryPrompt(setup, learningPlan);
      const aiStory = await callGeminiJSON<GenerateResponse>(storyPrompt, {
        model: 'gemini-2.5-flash',
        temperature: 0.7,
      });

      if (aiStory && Array.isArray(aiStory.levels) && aiStory.levels.length === 5) {
        const isRelevant = verifyTopicRelevance(setup.topic, aiStory.levels);
        if (isRelevant) {
          return NextResponse.json({
            success: true,
            levels: aiStory.levels,
            learningPlan,
            source: 'ai',
          });
        }
        console.warn('[KIKI] AI generation failed topic relevance check. Using parametric story engine.');
      }
    } catch (e) {
      // Fallback to parametric engine
    }

    // Guaranteed high-pedagogy parametric engine
    const parametricLevels = generateParametricStory(setup, learningPlan);
    return NextResponse.json({
      success: true,
      levels: parametricLevels,
      learningPlan,
      source: 'parametric_engine',
    });
  } catch (error) {
    console.error('Error in /api/story/generate:', error);
    const fallbackSetup: ParentSetup = {
      childName: 'Explorer',
      childAge: 8,
      topic: 'Learning Adventure',
      learningGoal: 'Discover how the world works',
      storyWorld: 'forest',
      companionType: 'animal'
    };
    const rescuePlan = generateLearningPlan(fallbackSetup);
    const rescueLevels = generateParametricStory(fallbackSetup, rescuePlan);
    return NextResponse.json({
      success: true,
      levels: rescueLevels,
      learningPlan: rescuePlan,
      source: 'recovery_engine',
    });
  }
}

/**
 * Strict Topic Relevance Guard: Verify that the generated levels are genuinely relevant to the requested topic.
 */
function verifyTopicRelevance(topic: string, levels: StoryLevel[]): boolean {
  const fullText = JSON.stringify(levels).toLowerCase();
  const topicLower = topic.toLowerCase();
  const topicWords = topicLower.split(/\s+/).filter(w => w.length > 3 && !['what', 'when', 'where', 'which', 'does', 'make', 'into', 'from', 'with'].includes(w));

  // If topic has significant words, at least one must be explicitly present in the levels
  if (topicWords.length > 0) {
    const hasTopicWord = topicWords.some(word => fullText.includes(word));
    if (!hasTopicWord) return false;
  }

  // Cross-domain mismatch guards (e.g. Needs vs Wants vs Digestion/Bananas)
  if (topicLower.includes('need') || topicLower.includes('want') || topicLower.includes('money') || topicLower.includes('budget')) {
    if (fullText.includes('banana') || fullText.includes('digestive juices') || fullText.includes('swallow')) {
      return false;
    }
  }

  if (topicLower.includes('digest') || topicLower.includes('stomach')) {
    if (fullText.includes('ocean waves') || fullText.includes('water cycle rain') || fullText.includes('airplane wings')) {
      return false;
    }
  }

  if (topicLower.includes('multipl') || topicLower.includes('table')) {
    if (fullText.includes('photosynthesis leaves') || fullText.includes('soap bubbles')) {
      return false;
    }
  }

  return true;
}
