// StoryQuest AI End-to-End Verification Suite

async function runTests() {
  const baseUrl = 'http://localhost:3000';
  console.log('🧪 Starting StoryQuest AI Integration Tests against', baseUrl);

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
    // 1. Test Story Generation
    console.log('\n--- 1. Testing /api/story/generate ---');
    const genRes = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Lily',
          childAge: 6,
          topic: 'How Plants Make Food',
          specificNeed: 'Thinks plants eat dirt like cereal',
          setting: 'forest',
          characterStyle: 'animal',
          learningStyle: 'adventure',
          realWorldContext: 'cooking and drinking water'
        }
      })
    });
    const genData = await genRes.json();
    assert(genRes.status === 200, 'Generate endpoint returns status 200');
    assert(Array.isArray(genData.chapters) && genData.chapters.length >= 3, 'Generates 3 chapters');
    assert(genData.chapters[0].checkpoint !== undefined, 'Chapter 1 has checkpoint');
    assert(genData.chapters[1].checkpoint.type === 'own_words', 'Chapter 2 has "own_words" checkpoint');

    // 2. Test "Explain in your own words" Evaluation (Understood)
    console.log('\n--- 2. Testing /api/story/evaluate (Semantic Concept Match) ---');
    const evalRes1 = await fetch(`${baseUrl}/api/story/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptText: 'Explain in your own words how Pip makes food without a spoon!',
        childResponse: 'his leaves open to the warm sun and mix water and air like a tiny oven!',
        expectedCoreConcept: 'The green leaf uses sunlight like an oven to mix water and air into sweet food',
        childAge: 6,
        checkpointType: 'own_words'
      })
    });
    const evalData1 = await evalRes1.json();
    assert(evalRes1.status === 200, 'Evaluate endpoint returns status 200');
    assert(evalData1.understood === true, 'Recognized child understood concept despite conversational wording');
    assert(evalData1.nextAction === 'advance', 'Next action is advance');

    // 3. Test Evaluation when child struggles (Triggers Scaffolding)
    console.log('\n--- 3. Testing /api/story/evaluate (Struggling Child) ---');
    const evalRes2 = await fetch(`${baseUrl}/api/story/evaluate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        promptText: 'Explain why 1/3 of a shield is bigger than 1/4 of a shield',
        childResponse: '4 is bigger than 3 so 1/4 has to be bigger',
        expectedCoreConcept: 'Dividing by more pieces shrinks the size of each piece (inverse denominator)',
        childAge: 12,
        checkpointType: 'own_words'
      })
    });
    const evalData2 = await evalRes2.json();
    assert(evalData2.understood === false, 'Correctly detected misconception');
    assert(evalData2.nextAction === 'try_differently', 'Next action is try_differently');
    assert(!evalData2.friendlyFeedback.toLowerCase().includes('wrong'), 'Feedback never uses harsh "Wrong" language');

    // 4. Test "Try Again, Differently" Scaffolding Generation
    console.log('\n--- 4. Testing /api/story/adapt ("Try Again, Differently") ---');
    const adaptRes = await fetch(`${baseUrl}/api/story/adapt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: 'Explain why 1/3 is bigger than 1/4',
        childResponse: '4 is bigger than 3',
        expectedConcept: 'Dividing by more pieces shrinks each piece',
        misconception: evalData2.misconceptionIdentified,
        setup: {
          childName: 'Devon',
          childAge: 12,
          topic: 'Fractions',
          setting: 'space',
          characterStyle: 'child',
          realWorldContext: 'pizza slices'
        },
        checkpointId: 'c1-frac'
      })
    });
    const adaptData = await adaptRes.json();
    assert(adaptRes.status === 200, 'Adapt endpoint returns status 200');
    assert(Boolean(adaptData.alternateAnalogy), 'Provides alternate real-world analogy');
    assert(Boolean(adaptData.followUpPrompt), 'Provides follow-up scaffolded question');
    assert(Array.isArray(adaptData.options), 'Provides supportive options for retry');

    // 5. Test Parent/Teacher Learning Report Generation
    console.log('\n--- 5. Testing /api/story/report ---');
    const reportRes = await fetch(`${baseUrl}/api/story/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Alex',
          childAge: 9,
          topic: 'The 7 Times Table',
          specificNeed: 'Struggles with 7x6 and 7x7'
        },
        interactions: [
          {
            chapterNumber: 1,
            checkpointId: 'c1',
            question: 'How to find 7x6?',
            childResponse: '35 plus 7 more cakes',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Used friendly 5s benchmark'],
            scaffoldingUsed: false
          },
          {
            chapterNumber: 2,
            checkpointId: 'c2',
            question: 'Explain 7x7 in your own words',
            childResponse: 'Take the 42 and add another 7 to reach 49',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Repeated equal group addition'],
            scaffoldingUsed: false
          }
        ],
        starsEarned: 3,
        presetId: 'multiplication-7'
      })
    });
    const reportData = await reportRes.json();
    assert(reportRes.status === 200, 'Report endpoint returns status 200');
    assert(Boolean(reportData.estimatedMastery), 'Includes estimated understanding status');
    assert(Array.isArray(reportData.conceptsDemonstrated), 'Contains concepts demonstrated');
    assert(reportData.conceptsDemonstrated.length > 0, 'Contains demonstrated concept items with evidence');
    assert(Array.isArray(reportData.suggestedNextActivities) && reportData.suggestedNextActivities.length >= 2, 'Contains at least 2 suggested home/classroom activities');

    console.log(`\n🎉 Verification Summary: ${passed} passed, ${failed} failed`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
}

runTests();
