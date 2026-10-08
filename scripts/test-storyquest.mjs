// KIKI Story Teacher Comprehensive Integration & Educational Intelligence Test Suite
// Verifies Section 14 Requirements:
// - Age 6: Shadows
// - Age 11: Digestion (showing academic depth vs age 6)
// - Age 11: Fractions (inverse denominator relationship)
// - Age 12: Force and Motion (inertia, net force, friction)
// - Age 11: Photosynthesis (chloroplasts, glucose, autotrophic nutrition)
// - Age 10: Online Privacy (credentials, PII, safety)
// - Age 8: Hand Washing (20-second soap lathering)
// - Custom: "How do airplanes fly?" (curved airfoils, pressure differential, Lift)
// - Needs vs. Wants (strict domain isolation)
// - Hiccups (diaphragm muscle reflex)
// - Semantic Free-Text Evaluation & Misconception Diagnosis
// - Adaptive Teaching Scaffolding with NEW question
// - Evidence-Based Parent/Teacher Learning Report with Understanding Profile

async function runTests() {
  const baseUrl = 'http://localhost:3000';
  console.log('🧪 Starting KIKI Educational Intelligence Verification Suite against', baseUrl);

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
    // 1. AGE 6: SHADOWS (Concrete, Short Sentences, Light Blocked)
    // -------------------------------------------------------------
    console.log('\n--- 1. Testing Age 6: Shadows (Light Blocked, Sensory Metaphors) ---');
    const resShadows = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Emma',
          childAge: 6,
          topic: 'Light and Shadows',
          learningGoal: 'A solid object blocks straight light beams, casting a shadow',
          struggle: 'Thinks shadows are separate creatures that follow you',
          storyWorld: 'forest',
          companionType: 'animal'
        }
      })
    });
    const dataShadows = await resShadows.json();
    assert(resShadows.status === 200, 'Age 6 Shadows returns status 200');
    assert(dataShadows.levels && dataShadows.levels.length === 5, 'Generates 5 adventure levels');
    assert(Boolean(dataShadows.learningPlan), 'Generates AI Learning Plan first');
    assert(dataShadows.learningPlan.learningObjectives.length >= 3, 'Learning plan has >= 3 age-appropriate objectives');
    const textShadows = JSON.stringify(dataShadows.levels).toLowerCase();
    assert(textShadows.includes('shadow') && textShadows.includes('light'), 'Story strictly teaches shadows and light');
    assert(textShadows.includes('block'), 'Teaches that solid objects block straight light beams');

    // -------------------------------------------------------------
    // 2. AGE 11: DIGESTION (Mechanical & Chemical Breakdown, Absorption)
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing Age 11: Digestion (Cognitive Depth vs Age 6) ---');
    const resDigestion11 = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Liam',
          childAge: 11,
          topic: 'How Digestion Works',
          learningGoal: 'Mechanical and chemical processes break down food, absorbed in small intestine',
          struggle: 'Thinks stomach absorbs all nutrients into the blood',
          storyWorld: 'forest',
          companionType: 'animal'
        }
      })
    });
    const dataDigestion11 = await resDigestion11.json();
    assert(resDigestion11.status === 200, 'Age 11 Digestion returns status 200');
    assert(dataDigestion11.learningPlan.targetAge === 11, 'Learning plan adapted for Age 11');
    const planVocab = dataDigestion11.learningPlan.ageAppropriateVocabulary.join(' ').toLowerCase();
    assert(planVocab.includes('enzymes') || planVocab.includes('absorption') || planVocab.includes('chyme') || planVocab.includes('intestine'), 'Age 11 Learning Plan contains academic vocabulary (enzymes, absorption, intestine)');
    const textDigestion11 = JSON.stringify(dataDigestion11.levels).toLowerCase();
    assert(textDigestion11.includes('mechanical') || textDigestion11.includes('chemical') || textDigestion11.includes('absorption') || textDigestion11.includes('intestine'), 'Age 11 narrative teaches mechanical/chemical processes and intestinal absorption');
    assert(!textDigestion11.includes('water cycle') && !textDigestion11.includes('ocean wave'), 'Digestion has zero water cycle leakage');

    // -------------------------------------------------------------
    // 3. AGE 11: FRACTIONS (Comparing 1/3 vs 1/4 Slices, Inverse Denominator)
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing Age 11: Fractions (Denominator Magnitude & Slicing) ---');
    const resFractions = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Maya',
          childAge: 11,
          topic: 'Comparing Fractions (1/3 vs 1/4)',
          learningGoal: 'Dividing into more equal pieces makes each individual piece smaller (1/3 > 1/4)',
          struggle: 'Thinks 1/4 is bigger than 1/3 because 4 is greater than 3',
          storyWorld: 'kitchen',
          companionType: 'child'
        }
      })
    });
    const dataFractions = await resFractions.json();
    assert(resFractions.status === 200, 'Age 11 Fractions returns status 200');
    assert(dataFractions.levels.length === 5, 'Generates 5 fraction levels');
    const textFractions = JSON.stringify(dataFractions.levels).toLowerCase();
    assert(textFractions.includes('fraction') && (textFractions.includes('denominator') || textFractions.includes('slice')), 'Teaches fractions and denominator partitioning');
    assert(textFractions.includes('1/3') || textFractions.includes('1/4') || textFractions.includes('smaller'), 'Addresses 1/3 vs 1/4 slice comparison');

    // -------------------------------------------------------------
    // 4. AGE 12: FORCE AND MOTION (Inertia, Net Force & Friction)
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing Age 12: Force and Motion (Inertia & Newton’s Laws) ---');
    const resForce = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Devon',
          childAge: 12,
          topic: 'Force and Motion',
          learningGoal: 'Unbalanced net force causes acceleration; friction opposes motion; inertia sustains velocity in frictionless space',
          struggle: 'Believes continuous pushing force is required just to maintain constant speed in vacuum',
          storyWorld: 'space',
          companionType: 'robot'
        }
      })
    });
    const dataForce = await resForce.json();
    assert(resForce.status === 200, 'Age 12 Force and Motion returns status 200');
    const textForce = JSON.stringify(dataForce.levels).toLowerCase();
    assert(textForce.includes('friction') && (textForce.includes('inertia') || textForce.includes('constant speed') || textForce.includes('net force')), 'Teaches friction and inertia');

    // -------------------------------------------------------------
    // 5. AGE 11: PHOTOSYNTHESIS (Leaves as Solar Kitchens, Glucose & Oxygen)
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Age 11: Photosynthesis (Chloroplasts, Autotrophs) ---');
    const resPhoto = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Aria',
          childAge: 11,
          topic: 'Photosynthesis',
          learningGoal: 'Plants synthesize glucose from sunlight, water, and CO2, releasing oxygen',
          struggle: 'Thinks plants eat soil and dirt like cereal',
          storyWorld: 'forest',
          companionType: 'animal'
        }
      })
    });
    const dataPhoto = await resPhoto.json();
    assert(resPhoto.status === 200, 'Age 11 Photosynthesis returns status 200');
    const textPhoto = JSON.stringify(dataPhoto.levels).toLowerCase();
    assert(textPhoto.includes('sunlight') && (textPhoto.includes('glucose') || textPhoto.includes('sugar') || textPhoto.includes('chloroplast')), 'Teaches solar energy synthesis of glucose');
    assert(textPhoto.includes('oxygen'), 'Teaches oxygen release');

    // -------------------------------------------------------------
    // 6. AGE 10: ONLINE PRIVACY (Digital Safety, Passwords & PII)
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing Age 10: Online Privacy (Personal Info & Passwords) ---');
    const resPrivacy = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Kai',
          childAge: 10,
          topic: 'Online Privacy & Passwords',
          learningGoal: 'Never share passwords or real-world identifying info with online strangers',
          storyWorld: 'cyber',
          companionType: 'robot'
        }
      })
    });
    const dataPrivacy = await resPrivacy.json();
    assert(resPrivacy.status === 200, 'Age 10 Online Privacy returns status 200');
    const textPrivacy = JSON.stringify(dataPrivacy.levels).toLowerCase();
    assert(textPrivacy.includes('password') && (textPrivacy.includes('stranger') || textPrivacy.includes('private')), 'Teaches secret passwords and protecting personal privacy');

    // -------------------------------------------------------------
    // 7. AGE 8: HAND WASHING (20 Seconds Soap Bubbles)
    // -------------------------------------------------------------
    console.log('\n--- 7. Testing Age 8: Hand Washing (20-Second Soap Lathering) ---');
    const resWash = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Leo',
          childAge: 8,
          topic: '20-Second Soap Hand Washing',
          learningGoal: 'Soap molecules attach to invisible germs and wash them away with 20 seconds of lathering',
          storyWorld: 'school',
          companionType: 'animal'
        }
      })
    });
    const dataWash = await resWash.json();
    assert(resWash.status === 200, 'Age 8 Hand Washing returns status 200');
    const textWash = JSON.stringify(dataWash.levels).toLowerCase();
    assert(textWash.includes('soap') && (textWash.includes('germ') || textWash.includes('20 second')), 'Teaches soap bubbles and 20 seconds lathering');

    // -------------------------------------------------------------
    // 8. CUSTOM TOPIC: "How Do Airplanes Fly?" (Lift & Airfoil)
    // -------------------------------------------------------------
    console.log('\n--- 8. Testing Custom Topic: "How do airplanes fly?" (Airfoils & Lift) ---');
    const resFlight = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Sam',
          childAge: 10,
          topic: 'How Do Airplanes Fly?',
          learningGoal: 'Curved wings cause air to move faster over the top, generating upward Lift',
          storyWorld: 'sky',
          companionType: 'child'
        }
      })
    });
    const dataFlight = await resFlight.json();
    assert(resFlight.status === 200, 'Custom Topic Flight returns status 200');
    const textFlight = JSON.stringify(dataFlight.levels).toLowerCase();
    assert(textFlight.includes('wing') && (textFlight.includes('lift') || textFlight.includes('airfoil')), 'Teaches curved wings and upward lift');

    // -------------------------------------------------------------
    // 9. BUG FIX: NEEDS VS WANTS (Zero Banana / Digestion Dialogue)
    // -------------------------------------------------------------
    console.log('\n--- 9. Testing Bug Fix: Needs vs Wants (Zero Banana / Digestion Content) ---');
    const resNeeds = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Chloe',
          childAge: 9,
          topic: 'Needs vs. Wants',
          learningGoal: 'Needs (healthy food, water, warm clothes) come before wants (toys, extra treats)',
          storyWorld: 'city',
          companionType: 'child'
        }
      })
    });
    const dataNeeds = await resNeeds.json();
    assert(resNeeds.status === 200, 'Needs vs Wants returns status 200');
    const textNeeds = JSON.stringify(dataNeeds.levels).toLowerCase();
    assert(textNeeds.includes('need') && textNeeds.includes('want'), 'Story teaches Needs vs Wants');
    assert(!textNeeds.includes('banana') && !textNeeds.includes('digestive juices') && !textNeeds.includes('esophagus'), 'ZERO banana or digestion contamination');

    // -------------------------------------------------------------
    // 10. CUSTOM TOPIC: HICCUPS (Diaphragm Muscle Reflex)
    // -------------------------------------------------------------
    console.log('\n--- 10. Testing Custom Topic: Hiccups (Diaphragm Spasm) ---');
    const resHiccup = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Zack',
          childAge: 8,
          topic: 'Why Do We Hiccup?',
          learningGoal: 'Diaphragm muscle spasms and snaps vocal cords shut; calm breathing resets it',
          storyWorld: 'school',
          companionType: 'animal'
        }
      })
    });
    const dataHiccup = await resHiccup.json();
    assert(resHiccup.status === 200, 'Hiccups returns status 200');
    const textHiccup = JSON.stringify(dataHiccup.levels).toLowerCase();
    assert(textHiccup.includes('diaphragm') && (textHiccup.includes('muscle') || textHiccup.includes('spasm')), 'Teaches diaphragm muscle reflex');

    // -------------------------------------------------------------
    // 11. SEMANTIC EVALUATION: Typo Tolerant Free-Text Evaluation
    // -------------------------------------------------------------
    console.log('\n--- 11. Testing /api/story/evaluate (Semantic Typo & Phrasing Tolerance) ---');
    const resEval1 = await fetch(`${baseUrl}/api/story/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptText: 'In your own words, explain how food gives us energy.',
        childResponse: 'the stomack and salyva break food into tinny nutreints for body blood!!',
        expectedCoreConcept: 'Stomach and digestive system break food into tiny nutrients for energy',
        childAge: 10,
        checkpointType: 'own_words'
      })
    });
    const evalData1 = await resEval1.json();
    assert(resEval1.status === 200, 'Evaluate endpoint returns status 200');
    assert(evalData1.understood === true, 'Child understood concept despite phonetic spelling mistakes');
    assert(evalData1.nextAction === 'advance', 'Next action is advance');

    // -------------------------------------------------------------
    // 12. SEMANTIC MISCONCEPTION DIAGNOSIS: Digestion vs Absorption
    // -------------------------------------------------------------
    console.log('\n--- 12. Testing /api/story/evaluate (Specific Misconception Diagnosis) ---');
    const resEval2 = await fetch(`${baseUrl}/api/story/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptText: 'Explain how food gets into the blood.',
        childResponse: 'the stomach takes the nutrients into the blood',
        expectedCoreConcept: 'The small intestine absorbs nutrients into the blood after stomach breakdown',
        childAge: 11,
        checkpointType: 'own_words'
      })
    });
    const evalData2 = await resEval2.json();
    assert(resEval2.status === 200, 'Evaluate returned status 200');
    assert(evalData2.understood === false, 'Detected misconception correctly (understood = false)');
    assert(Boolean(evalData2.misconceptionIdentified), 'Diagnosed specific misconception hurdle');
    assert(evalData2.nextAction === 'try_differently', 'Next action is try_differently');
    assert(!evalData2.friendlyFeedback.toLowerCase().includes('wrong'), 'KIKI never says "Wrong"');

    // -------------------------------------------------------------
    // 13. ADAPTIVE TEACHING: Alternate Analogy + BRAND NEW Question
    // -------------------------------------------------------------
    console.log('\n--- 13. Testing /api/story/adapt (Alternate Analogy & Brand New Question) ---');
    const resAdapt = await fetch(`${baseUrl}/api/story/adapt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'Explain how food gets into the blood.',
        childResponse: 'the stomach takes the nutrients into the blood',
        expectedConcept: 'The small intestine absorbs nutrients into the blood after stomach breakdown',
        misconception: evalData2.misconceptionIdentified,
        setup: {
          childName: 'Liam',
          childAge: 11,
          topic: 'How Digestion Works',
          learningGoal: 'Small intestine absorbs nutrients into blood',
          interest: 'sports and smoothies'
        }
      })
    });
    const adaptData = await resAdapt.json();
    assert(resAdapt.status === 200, 'Adapt endpoint returns status 200');
    assert(Boolean(adaptData.alternateAnalogy), 'Provides alternate tangible analogy');
    assert(Boolean(adaptData.followUpPrompt), 'Provides a BRAND NEW follow-up prompt');
    assert(adaptData.followUpPrompt !== 'Explain how food gets into the blood.', 'Follow-up question is NEW, not repeating the original question');
    assert(Array.isArray(adaptData.options) && adaptData.options.length >= 2, 'Provides scaffolded multiple options');

    // -------------------------------------------------------------
    // 14. EVIDENCE-BASED PARENT/TEACHER LEARNING REPORT
    // -------------------------------------------------------------
    console.log('\n--- 14. Testing /api/story/report (Evidence-Based Learning Insights) ---');
    const resReport = await fetch(`${baseUrl}/api/story/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Liam',
          childAge: 11,
          topic: 'How Digestion Works',
          learningGoal: 'Understand mechanical breakdown and small intestine absorption',
        },
        interactions: [
          {
            levelNumber: 1,
            phase: 'discover',
            question: 'What happens to food?',
            childResponse: 'Let’s find out! 🚀',
            demonstratedConcept: true,
            positiveEvidence: ['Eager exploration'],
            scaffoldingUsed: false
          },
          {
            levelNumber: 2,
            phase: 'explore',
            question: 'What happens first?',
            childResponse: 'Teeth mechanically grind food while salivary enzymes begin breakdown',
            demonstratedConcept: true,
            positiveEvidence: ['Understood oral cavity action'],
            scaffoldingUsed: false
          },
          {
            levelNumber: 3,
            phase: 'solve',
            question: 'How do stomach and intestine divide work?',
            childResponse: 'The stomach takes the nutrients into the blood',
            demonstratedConcept: false,
            positiveEvidence: ['Thinking about nutrients in blood'],
            misconceptionIdentified: 'Confused stomach churning with intestinal absorption',
            scaffoldingUsed: true
          },
          {
            levelNumber: 4,
            phase: 'teach',
            question: 'Explain the digestive system',
            childResponse: 'the stomack blenders food into soup then intestine absorbs it into blood',
            demonstratedConcept: true,
            positiveEvidence: ['Articulated blender vs sponge absorption'],
            scaffoldingUsed: true
          },
          {
            levelNumber: 5,
            phase: 'master',
            question: 'What happens if small intestine absorption is impaired?',
            childResponse: 'Nutrients cannot enter capillaries to fuel cells because absorption occurs in small intestine',
            demonstratedConcept: true,
            positiveEvidence: ['Correctly applied intestinal absorption concept to fatigue'],
            scaffoldingUsed: false
          }
        ],
        starsEarned: 5
      })
    });
    const reportData = await resReport.json();
    assert(resReport.status === 200, 'Report endpoint returns status 200');
    assert(Boolean(reportData.learningPlan), 'Report includes KIKI AI Learning Plan');
    assert(Array.isArray(reportData.understandingProfile) && reportData.understandingProfile.length === 4, 'Report includes Understanding Profile across 4 dimensions');
    assert(reportData.conceptsDemonstrated.length > 0, 'Report includes Demonstrated Concepts with evidence quotes');
    const quotes = reportData.conceptsDemonstrated.map(d => d.evidenceQuote).join(' ');
    assert(quotes.includes('stomack') || quotes.includes('blenders') || quotes.includes('Teeth'), 'Report includes verbatim quotes from the child');
    assert(Boolean(reportData.howKikiAdapted), 'Report documents How KIKI Adapted to the child');
    assert(Boolean(reportData.parentTeacherTakeaway), 'Report includes Parent/Teacher Key Takeaway summary');
    assert(Array.isArray(reportData.suggestedNextActivities) && reportData.suggestedNextActivities.length >= 2, 'Report recommends offline real-world next activities');

    // -------------------------------------------------------------
    // FINAL SUMMARY
    // -------------------------------------------------------------
    console.log(`\n🎉 Educational Intelligence Verification Complete: ${passed} passed, ${failed} failed`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

runTests();
