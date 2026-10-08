# StoryQuest AI 🚀📚

> **"Teach any topic through a story a child won't want to stop reading — and discover whether it worked."**

StoryQuest AI is an adaptive educational storytelling experience built for the Hackathon challenge. It combines the narrative power of storytelling with dynamic pedagogical feedback to help kids learn math and science concepts intuitively.

---

## 🌟 The Core Philosophy: "The Lesson Adapts to the Child"

Kids often find textbooks and repetitive drills tedious, but they never tire of stories. StoryQuest AI flips traditional learning:
1. **Personalized Story Adventure**: Instead of a generic explanation, a parent or teacher customizes a learning mission (e.g., *"Understands multiplication but struggles with the 7 times table"* or *"Thinks plants eat soil like cereal"*).
2. **Age-Calibrated Pedagogy**: A 6-year-old and a 12-year-old receive genuinely different learning journeys—differing not just in vocabulary, but in cognitive models, story complexity, and real-world anchors.
3. **"Explain It in Your Own Words"**: Rather than relying only on multiple-choice quizzes, the system prompts the child to explain concepts in their own words. AI evaluates conceptual understanding, explicitly ignoring spelling or grammar errors.
4. **"Try Again, Differently" Scaffolding**: If a child struggles, the app **never says "Wrong"**. It introduces an alternate physical analogy, grounded in the child's chosen world, with a scaffolded follow-up check.
5. **Evidence-Based Parent/Teacher Report**: Provides a diagnostic snapshot citing verbatim quotes from the child, diagnosed hurdles, and actionable offline home/classroom activities.

---

## 🧭 Two Connected Portals • One Experience

- **🎓 Parent & Teacher Learning Studio**
  - Input child age (5–13) with age-bracket indicators:
    - *Early Explorer (Ages 5–7)*: Sensory, concrete, playful characters.
    - *Curious Adventurer (Ages 8–10)*: Cause-and-effect, benchmarks, mystery.
    - *Master Sleuth (Ages 11–13)*: Systems logic, precise mechanisms, proportional reasoning.
  - Set specific learning challenges (e.g., struggles with 7x6, confuses fraction denominators).
  - Customize story setting (Space, Forest, Everyday Life, School, Fantasy) and companion style (Robot, Animal, Kid Explorer).
  - 1-Click Curriculum Presets for instant zero-friction demo testing.
- **🚀 Child Adventure Quest**
  - Warm, playful, gamified reading interface (zero exam anxiety).
  - 3 Story Chapters with milestone progression map.
  - Browser **Read Aloud (Web Speech API)** narration for early readers.
  - Interactive Checkpoints (Predictions, Choices, "Explain in your own words").
  - Adaptive Scaffolding ("Try Again, Differently").
  - Celebratory confetti & star badges.

---

## 🔬 Age Adaptation Matrix

| Dimension | Early Explorer (Ages 5–7) | Curious Adventurer (Ages 8–10) | Master Sleuth (Ages 11–13) |
| :--- | :--- | :--- | :--- |
| **Tone & Style** | Short sentences (<12 words), sensory words, personified companions (*Pip the Sprout*). | Dynamic pacing, detective mystery, relatable challenges (*Bolt the Baker-Bot*). | Scientific tension, technical systems, precise terminology (*Cadet Devon on Orbital Station*). |
| **Metaphors** | Concrete physical sensations (sponges, warm hugs, sunshine kitchens). | Stepping stones, recipes, cookie trays, friendly benchmarks. | Partitioning, proportional balance, inverse denominator relationships. |
| **On Struggle** | Friendly character acts out the motion with an everyday tactile comparison. | Breaks problem into sequential steps with a real-world anchor. | Deconstructs the underlying formula/relationship and addresses the edge case. |

---

## 🛠️ Technical Architecture

- **Framework**: Next.js 14 (App Router, TypeScript, Tailwind CSS, Lucide Icons).
- **Sound & Accessibility**:
  - Web Audio API procedural synthesis for celebratory chimes (zero external audio files).
  - Web Speech API for native browser text-to-speech story reading.
  - Semantic HTML, keyboard-navigable controls, high WCAG AA color contrast.
- **AI Engine & Resilience**:
  - Google Gemini API (`gemini-2.5-flash` / `gemini-1.5-flash`) with JSON schema enforcement.
  - Zero API key exposure: all AI interactions run server-side in `/api/story/*`.
  - Built-in pedagogical fallback engine ensuring **100% demo reliability** even without API keys or during rate limits.
- **Deployment**: Google Cloud Run ready via multi-stage Alpine Dockerfile with `standalone` output.

---

## 🚀 Running Locally

1. **Clone & Install**:
   ```bash
   git clone https://github.com/Lipika-B/storyquest-ai.git
   cd storyquest-ai
   npm install
   ```

2. **Configure Environment (Optional)**:
   Create a `.env.local` file:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: If `GEMINI_API_KEY` is not provided, the application runs seamlessly using the built-in curriculum preset and pedagogical fallback engine).*

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build Production Container**:
   ```bash
   npm run build
   ```

---

## ☁️ Google Cloud Run Deployment

Deploy directly to Google Cloud Run using the included multi-stage Dockerfile:

```bash
# 1. Build and deploy to Cloud Run
gcloud run deploy storyquest-ai \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="YOUR_KEY"
```

The container listens on standard port `8080` (configured via `PORT=8080`).
Repository size is kept well below 10 MB on branch `main`.

---

## 🧪 Testing Scenarios

1. **Preset 1 (7 Times Table • Age 9)**:
   - Select preset "The Great Space Bakery & The 7-Crate Mystery".
   - Test "Explain in your own words" in Chapter 2.
   - Enter: *"Because 6 trays is 42, so 7 trays is just adding 7 more!"*
   - Verify: Evaluator recognizes the benchmark concept without grading spelling/grammar, awards star, and advances.
2. **Adaptive Retry Test ("Try Again, Differently")**:
   - In Chapter 1, select a distractor option.
   - Verify: **No "Wrong" message displayed**. The system triggers **"Try Again, Differently"** with a tray-stacking analogy, allows the child to retry, and recovers successfully.
3. **Preset 2 (Photosynthesis • Age 6)**:
   - Test "Pip the Little Leaf’s Sunny Kitchen".
   - Verify: Simple sensory vocabulary, short sentences, and leaf-as-kitchen analogy.
4. **Learning Report**:
   - Complete Chapter 3, click "View Learning Report".
   - Verify: Estimated understanding status, direct quotes from child, diagnosed hurdles, and offline home activities.
