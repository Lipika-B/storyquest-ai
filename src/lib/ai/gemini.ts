export interface GeminiGenerateOptions {
  model?: string;
  temperature?: number;
}

export async function callGeminiJSON<T>(
  prompt: string,
  options: GeminiGenerateOptions = {}
): Promise<T | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('[StoryQuest AI] GEMINI_API_KEY is not set. Using smart pedagogical fallback engine.');
    return null;
  }

  const model = options.model || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: options.temperature ?? 0.7,
        },
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[StoryQuest AI] Gemini API error (${response.status}):`, errText);
      return null;
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.warn('[StoryQuest AI] Empty response from Gemini API');
      return null;
    }

    // Clean potential markdown blocks if present
    const cleaned = candidateText.trim().replace(/^```json/i, '').replace(/```$/i, '').trim();
    const parsed = JSON.parse(cleaned) as T;
    return parsed;
  } catch (error) {
    console.warn('[StoryQuest AI] Gemini API call exception, falling back:', error);
    return null;
  }
}
