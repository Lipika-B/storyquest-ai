# KIKI 🌟📖

> **"Little stories. Big discoveries."**
> 
> *Hackathon Challenge: “Story Teacher: Teach any topic through a story a child won't want to stop reading.”*

**KIKI** is an adaptive children's storytelling world and learning companion. It transforms any topic—from multiplication to photosynthesis, civic sense, and digital safety—into an interactive, age-appropriate story where **the story is the product**.

---

## 🌟 The Core Experience

A parent or teacher chooses what a child should learn → **KIKI** creates a personalized, age-appropriate adventure → the child learns through the story → **KIKI** checks whether the child actually understood → if the child struggles, **KIKI** teaches the idea differently → the child continues the adventure → the parent/teacher receives an evidence-based learning report.

```
Adult Setup (Topic + Goal)
       ↓
KIKI Personalized Adventure
       ↓
Child Interactive Storybook (The Spark ➔ The Puzzle ➔ The Triumph)
       ↓
"Explain It in Your Own Words" Check
       ↓
Adaptive Loop: Success ➔ Progress | Struggle ➔ "Try Again, Differently"
       ↓
Evidence-Based Parent/Teacher Report
```

---

## 🧭 Two Distinct Experiences

### 1. 🎓 Parent & Teacher Setup Studio
- **Clean & Focused**: No giant forms or complicated admin dashboards.
- **Required Inputs**:
  - **Child's Age** (5–7 Early Explorer, 8–10 Curious Adventurer, 11–13 Master Sleuth) driving vocabulary, sentence length, and cognitive models.
  - **What KIKI Teaches** (custom topic or 1-click pick from KIKI's Curated Topic Worlds).
  - **Learning Goal** (what the child should understand after the story, e.g., *"Understand that 7 × 6 means 7 equal groups of 6"*).
- **Optional Personalization**:
  - Specific struggle (e.g., *"Confuses 7 × 6 and 7 × 7"*).
  - Child's interests (Rockets, animals, cooking, soccer, dinosaurs, trains).
  - Story world (Space Station, Wonder Woods, Everyday City, KIKI's Kitchen, Discovery Lab, Coral Ocean, Village, Cyber City).
  - Companion (Bolt the Robot, Barnaby Fox, Sammy Explorer, Lumi Sprite, Fuzzy Monster).
  - Story style (Adventure, Mystery, Discovery, Rescue, Real-life problem).
- **Curated Topic Worlds**:
  - 🚀 Space Station (Mathematics)
  - 🌳 Wonder Woods (Science & Nature)
  - 🏙️ Everyday City (Civic Sense & Community)
  - 🧼 Healthy Habitats (Self-Care & Life Skills)
  - 💛 Feelings Forest (Emotional & Social Learning)
  - 🔐 Cyber City (Digital Safety)
  - 🍳 KIKI's Kitchen (Everyday Life & Kitchen Math)
  - 🌈 Question Cloud ("Why Does This Happen?")
  - ✏️ Plus support for **any custom topic**!

### 2. 🌟 Child Adventure with KIKI
- **Zero Technical Controls or Dashboards**: The child simply enters KIKI's world.
- **Screen 1 — Welcome**: Animated KIKI greeting with big *"Start Adventure 🚀"* button.
- **Interactive Storybook Diorama**:
  - Animated SVG/CSS KIKI companion mascot with reactive expressions (`happy`, `thinking`, `curious`, `cheering`, `explaining`).
  - Illustrated scenery background (twinkling space stars, sunny forest canopy, city rooftops).
  - Speech bubbles with character dialogue.
  - Native browser **Read Aloud (Web Speech API)** button (*"KIKI Read to Me"*).
  - Subtle procedural sound effects via **Web Audio API** with a dedicated sound toggle.
- **Story Structure**:
  - **Chapter 1 (The Spark)**: The concept appears naturally inside the story problem (never as a textbook definition).
  - **Chapter 2 (The Puzzle)**: The characters encounter a dilemma requiring the concept.
  - **Chapter 3 (The Triumph)**: The child solves the problem and explains it in their own words to KIKI.
- **"Explain It in Your Own Words"**:
  - Core understanding check evaluated semantically by AI.
  - Strictly ignores spelling, grammar, punctuation, or imperfect sentence structure.
- **"Try Again, Differently"**:
  - If a child struggles: **Never says "Wrong"**.
  - KIKI introduces an alternate, physical analogy connected to the child's interest (e.g., switching from rocket fuel trays to pizza slices or cookie trays) and gives an encouraging follow-up check.
- **Completion & Celebration**:
  - Cheering KIKI mascot, star badges, and confetti bursts.

---

## 📊 Evidence-Based Learning Report

Provides a post-quest diagnostic snapshot answering: *"Did the child appear to understand the concept, and what should we do next?"*
- **Target Learning Goal vs. Estimated Understanding** (*Mastered Concept*, *Strong Understanding*, *Developing Understanding*, *Beginning Exploration*).
- **Concepts Demonstrated**: Includes **verbatim quotes** from the child's actual responses as evidence.
- **Areas for Gentle Reinforcement**: Constructive observations of any initial hurdles.
- **Learning Behavior Observations**: Cognitive engagement notes.
- **Suggested Next Learning Activities**: Real-world offline activities (kitchen experiments, bedtime discussion prompts, physical games).
- **Print / Save as PDF** support.

---

## 🔬 Age Adaptation Matrix

| Dimension | Early Explorer (Ages 5–7) | Curious Adventurer (Ages 8–10) | Master Sleuth (Ages 11–13) |
| :--- | :--- | :--- | :--- |
| **Language & Pacing** | Very short sentences (<10 words), sensory sound words, personified companions (*Pip the Sprout*). | Dynamic sentences, detective mystery, relatable challenges (*Bolt the Robot*). | Rich vocabulary, systemic reasoning, conceptual tension (*Cadet Devon*). |
| **Metaphors** | Concrete physical sensations (sponges, warm hugs, sunshine kitchens). | Stepping stones, recipes, cookie trays, friendly benchmarks. | Partitioning, proportional balance, inverse denominator relationships. |
| **Pedagogical Focus** | What characters see, touch, or do directly. | Step-by-step logic, cause-and-effect, and predictions. | Underlying mechanisms, "why this rule holds", and edge cases. |

---

## 🛠️ Technical Architecture

- **Framework**: Next.js 14 (App Router, TypeScript, Tailwind CSS, Lucide Icons).
- **Mascot & Animations**: Native SVG/CSS KIKI character with `prefers-reduced-motion` accessibility support.
- **Audio & Speech**:
  - Web Audio API procedural synthesis (zero audio files needed, works offline).
  - Web Speech API for native browser text-to-speech reading.
- **AI & Fallback Resilience**:
  - Primary: Google Gemini API (`gemini-2.5-flash`) with JSON schema enforcement.
  - Offline / Quota Fallback: Built-in **Parametric Story Engine** that dynamically generates unique stories incorporating the exact age, topic, goal, struggle, setting, and companion even when offline.
- **Repository Size**: Total git repository footprint is **~90 KiB**, far below the 10 MB limit on branch `main`.

---

## 🧪 Testing & Verification

Run the comprehensive automated integration suite:
```bash
node scripts/test-storyquest.mjs
```

Verifies:
- **Requirement 25 Showcase Persona**: Age 9, Multiplication, 7x6 equal groups, Space, Robot, Rockets.
- **Requirement 26 Diverse Categories**: Science, Civic Sense, Digital Safety, etc., proving that stories visibly adapt to different topics and contexts.
- **"Explain It in Your Own Words"**: Validates concept understanding without grading grammar or spelling.
- **"Try Again, Differently"**: Scaffolds struggling learners without negative markers.
- **Parent/Teacher Learning Report**: Cites verbatim quotes and offline activities.

---

## ☁️ Google Cloud Run Deployment

Deploy directly to Google Cloud Run using the included multi-stage Alpine Dockerfile:

```bash
gcloud run deploy kiki \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="YOUR_KEY"
```

The container listens on standard port `8080` (configured via `PORT=8080`).
