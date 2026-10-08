// KIKI Story Teacher Comprehensive Integration Test Suite
// Verifies all 7 Section 30 Personas + Adaptive Scaffolding + Diagnostic Reporting

async function runTests() {
  const baseUrl = 'http://localhost:3000';
  console.log('🧪 Starting KIKI Integration Verification Suite against', baseUrl);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // -------------------------------------------------------------
    // 1. PERSONA A: MATHS (Age 9, Multiplication 7x6 equal groups, Space, Robot, Rockets)
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Persona A: Maths (Multiplication 7x6, Space, Robot, Rockets) ---');
    const resA = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Alex',
          childAge: 9,
          topic: 'Multiplication (The 7 Times Table)',
          learningGoal: 'Understand 7 × 6 as equal groups',
          struggle: 'Confuses 7 × 6 and 7 × 7',
          storyWorld: 'space',
          companionType: 'robot',
          interest: 'rockets and fuel crystals',
          learningStyle: 'adventure'
        }
      })
    });
    const dataA = await resA.json();
    const levelsA = dataA.levels || dataA.chapters || [];
    assert(resA.status === 200, 'Persona A returns status 200');
    assert(levelsA.length === 5, 'Persona A generates 5 adventure levels');
    const textA = JSON.stringify(levelsA).toLowerCase();
    assert(textA.includes('robot') || textA.includes('bolt'), 'Persona A features robot companion');
    assert(textA.includes('rocket') || textA.includes('crystal') || textA.includes('fuel'), 'Persona A features rocket fuel crystals');
    assert(textA.includes('7 × 6') || textA.includes('42') || textA.includes('equal groups'), 'Persona A addresses 7x6 equal groups');

    // -------------------------------------------------------------
    // 2. PERSONA B: SCIENCE (Age 8, Digestion, Monkey, Forest, Banana)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Persona B: Science (Digestion, Monkey, Forest, Banana) ---');
    const resB = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Milo',
          childAge: 8,
          topic: 'How Digestion Works',
          learningGoal: 'Stomach breaks food into tiny nutrients for energy',
          struggle: 'Thinks food stays in tummy like a backpack',
          storyWorld: 'forest',
          companionType: 'animal',
          interest: 'monkeys and sweet bananas',
          learningStyle: 'discovery'
        }
      })
    });
    const dataB = await resB.json();
    const levelsB = dataB.levels || dataB.chapters || [];
    assert(resB.status === 200, 'Persona B returns status 200');
    assert(levelsB.length === 5, 'Persona B generates 5 adventure levels');
    const textB = JSON.stringify(levelsB).toLowerCase();
    assert(textB.includes('digest') || textB.includes('stomach') || textB.includes('tummy') || textB.includes('nutrient'), 'Persona B strictly teaches digestion (Topic Relevance preserved!)');
    assert(!textB.includes('water cycle') && !textB.includes('ocean wave'), 'Persona B has NO water cycle hallucination');

    // -------------------------------------------------------------
    // 3. PERSONA C: CURIOSITY (Age 7, Shadows — Why does my shadow follow me?)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Persona C: Curiosity (Shadows, Blocked Light) ---');
    const resC = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Emma',
          childAge: 7,
          topic: 'Why Shadows Form',
          learningGoal: 'An opaque object blocks straight light beams, casting a dark shape',
          struggle: 'Thinks shadows are real dark creatures following her',
          storyWorld: 'everyday',
          companionType: 'child',
          interest: 'flashlights and bedtime adventures',
          learningStyle: 'mystery'
        }
      })
    });
    const dataC = await resC.json();
    const levelsC = dataC.levels || dataC.chapters || [];
    assert(resC.status === 200, 'Persona C returns status 200');
    assert(levelsC.length === 5, 'Persona C generates 5 adventure levels');
    const textC = JSON.stringify(levelsC).toLowerCase();
    assert(textC.includes('shadow') || textC.includes('light') || textC.includes('beam') || textC.includes('block'), 'Persona C teaches blocked light shadows');

    // -------------------------------------------------------------
    // 4. PERSONA D: CIVIC SENSE (Age 8, Keeping Public Places Clean)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Persona D: Civic Sense (Keeping Public Places Clean, Monster) ---');
    const resD = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Aarav',
          childAge: 8,
          topic: 'Keeping Public Places Clean',
          learningGoal: 'Shared parks belong to all citizens so trash must go in bins',
          struggle: 'Drops snack wrappers on the park grass',
          storyWorld: 'city',
          companionType: 'monster',
          interest: 'city playground slides',
          learningStyle: 'rescue'
        }
      })
    });
    const dataD = await resD.json();
    const levelsD = dataD.levels || dataD.chapters || [];
    assert(resD.status === 200, 'Persona D returns status 200');
    assert(levelsD.length === 5, 'Persona D generates 5 adventure levels');
    const textD = JSON.stringify(levelsD).toLowerCase();
    assert(textD.includes('park') || textD.includes('clean') || textD.includes('bin') || textD.includes('litter'), 'Persona D teaches public clean spaces');
    assert(textD.includes('monster') || textD.includes('grumble'), 'Persona D features fuzzy monster companion');

    // -------------------------------------------------------------
    // 5. PERSONA E: SELF-CARE (Age 6, Hand Washing — Why 20 seconds of soap bubbles?)
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Persona E: Self-Care (Hand Washing, Soap Bubbles) ---');
    const resE = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Leo',
          childAge: 6,
          topic: 'Why We Wash Hands with Soap',
          learningGoal: 'Soap bubbles trap sticky germs and slide them down the drain in 20 seconds',
          struggle: 'Rinses hands with water for only 2 seconds',
          storyWorld: 'kitchen',
          companionType: 'animal',
          interest: 'playing with bubble baths',
          learningStyle: 'discovery'
        }
      })
    });
    const dataE = await resE.json();
    const levelsE = dataE.levels || dataE.chapters || [];
    assert(resE.status === 200, 'Persona E returns status 200');
    assert(levelsE.length === 5, 'Persona E generates 5 adventure levels');
    const textE = JSON.stringify(levelsE).toLowerCase();
    assert(textE.includes('soap') || textE.includes('bubble') || textE.includes('germ') || textE.includes('wash'), 'Persona E teaches soap bubble hand washing');

    // -------------------------------------------------------------
    // 6. PERSONA F: DIGITAL SAFETY (Age 10, Online Privacy & Strong Passwords)
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Persona F: Digital Safety (Online Privacy, Passwords) ---');
    const resF = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Maya',
          childAge: 10,
          topic: 'Online Privacy & Passwords',
          learningGoal: 'Never share personal secrets or passwords with online strangers',
          struggle: 'Shares gaming passwords with casual friends',
          storyWorld: 'cyber',
          companionType: 'robot',
          interest: 'coding video games',
          learningStyle: 'adventure'
        }
      })
    });
    const dataF = await resF.json();
    const levelsF = dataF.levels || dataF.chapters || [];
    assert(resF.status === 200, 'Persona F returns status 200');
    assert(levelsF.length === 5, 'Persona F generates 5 adventure levels');
    const textF = JSON.stringify(levelsF).toLowerCase();
    assert(textF.includes('privacy') || textF.includes('password') || textF.includes('secret') || textF.includes('lock'), 'Persona F teaches online privacy');

    // -------------------------------------------------------------
    // 7. PERSONA G: CUSTOM TOPIC (Age 11, "How do airplanes fly? Lift & Wing Shape")
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Persona G: Custom Topic (Airplanes, Lift & Wing Shape) ---');
    const resG = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Noah',
          childAge: 11,
          topic: 'How Do Airplanes Fly?',
          learningGoal: 'Curved airplane wings push air faster over top, creating lift',
          struggle: 'Thinks engines alone flap or pull planes straight up like elevators',
          storyWorld: 'custom',
          companionType: 'magical',
          interest: 'paper gliders and aviation',
          learningStyle: 'adventure'
        }
      })
    });
    const dataG = await resG.json();
    const levelsG = dataG.levels || dataG.chapters || [];
    assert(resG.status === 200, 'Persona G returns status 200');
    assert(levelsG.length === 5, 'Persona G generates 5 adventure levels');
    const textG = JSON.stringify(levelsG).toLowerCase();
    assert(textG.includes('wing') || textG.includes('lift') || textG.includes('air') || textG.includes('fly'), 'Persona G teaches aviation wing lift');

    // -------------------------------------------------------------
    // 8. UNDERSTANDING CHECK: "Explain it in your own words" (Semantic evaluation)
    // -------------------------------------------------------------
    console.log('\n--- 8. Testing /api/story/evaluate ("Explain it in your own words") ---');
    const evalRes1 = await fetch(`${baseUrl}/api/story/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptText: 'Explain to KIKI how 7 × 6 works!',
        childResponse: 'becuz 7 trays with 6 crystals each is equal groups and 5 was 35 so add 7 is 42',
        expectedCoreConcept: 'Understand that 7 × 6 means 7 equal groups of 6, and build from 7 × 5 = 35',
        childAge: 9,
        checkpointType: 'own_words'
      })
    });
    const evalData1 = await evalRes1.json();
    assert(evalRes1.status === 200, 'Evaluate endpoint returns status 200');
    assert(evalData1.understood === true, 'Child understood concept despite conversational punctuation & spelling');
    assert(evalData1.nextAction === 'advance', 'Next action is advance');

    // -------------------------------------------------------------
    // 9. ADAPTIVE SCAFFOLDING: "Try Again, Differently"
    // -------------------------------------------------------------
    console.log('\n--- 9. Testing Adaptive Scaffolding When Child Hesitates ---');
    const evalRes2 = await fetch(`${baseUrl}/api/story/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptText: 'Explain why 1/3 of a pizza is bigger than 1/4 of a pizza',
        childResponse: '4 is bigger so 1/4 is bigger',
        expectedCoreConcept: 'Dividing into more slices shrinks the size of each slice (inverse denominator)',
        childAge: 11,
        checkpointType: 'own_words'
      })
    });
    const evalData2 = await evalRes2.json();
    assert(evalData2.understood === false, 'Detected misconception correctly');
    assert(evalData2.nextAction === 'try_differently', 'Next action is try_differently');
    assert(!evalData2.friendlyFeedback.toLowerCase().includes('wrong'), 'KIKI never says "Wrong"');

    const adaptRes = await fetch(`${baseUrl}/api/story/adapt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'Explain why 1/3 is bigger than 1/4',
        childResponse: '4 is bigger so 1/4 is bigger',
        expectedConcept: 'Dividing into more slices shrinks each slice',
        misconception: evalData2.misconceptionIdentified,
        setup: {
          childName: 'Devon',
          childAge: 11,
          topic: 'Fractions',
          learningGoal: 'Dividing into more slices shrinks each slice',
          interest: 'pizza baking',
          storyWorld: 'kitchen',
          companionType: 'child'
        }
      })
    });
    const adaptData = await adaptRes.json();
    assert(adaptRes.status === 200, 'Adapt endpoint returns status 200');
    assert(Boolean(adaptData.alternateAnalogy), 'Provides alternate tangible analogy');
    assert(Boolean(adaptData.followUpPrompt), 'Provides follow-up scaffolded mini-challenge');

    // -------------------------------------------------------------
    // 10. EVIDENCE-BASED PARENT/TEACHER LEARNING REPORT
    // -------------------------------------------------------------
    console.log('\n--- 10. Testing /api/story/report (Evidence-Based Learning Insights) ---');
    const reportRes = await fetch(`${baseUrl}/api/story/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Alex',
          childAge: 9,
          topic: 'Multiplication (The 7 Times Table)',
          learningGoal: 'Understand 7 × 6 as equal groups',
          struggle: 'Confuses 7 × 6 and 7 × 7'
        },
        interactions: [
          {
            levelNumber: 1,
            question: 'How to arrange 7 rocket trays?',
            childResponse: 'Let’s find out! 🚀',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Eagerly leaped into the discovery phase'],
            scaffoldingUsed: false
          },
          {
            levelNumber: 2,
            question: 'What pattern connects 7 rows of 5 and 7 rows of 6?',
            childResponse: 'Add one more 7 to 35',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Recognized equal groups increment'],
            scaffoldingUsed: false
          },
          {
            levelNumber: 4,
            question: 'Teach KIKI how 7 × 6 works!',
            childResponse: '7 trays of 6 crystals equals 42 fuel power',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Demonstrated equal group multiplication in own words'],
            scaffoldingUsed: false
          }
        ],
        starsEarned: 5
      })
    });
    const reportData = await reportRes.json();
    assert(reportRes.status === 200, 'Report endpoint returns status 200');
    assert(Boolean(reportData.estimatedMastery), 'Includes estimated mastery rating');
    assert(Array.isArray(reportData.conceptsDemonstrated) && reportData.conceptsDemonstrated.length > 0, 'Cites demonstrated concepts with evidence quotes');
    assert(Boolean(reportData.howKikiAdapted), 'Explains how KIKI adapted to the child');
    assert(Array.isArray(reportData.suggestedNextActivities) && reportData.suggestedNextActivities.length >= 2, 'Recommends real-world offline activities');

    console.log(`\n🎉 Verification Complete: ${passed} passed, ${failed} failed`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
