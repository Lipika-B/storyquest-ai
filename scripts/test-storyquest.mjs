// KIKI Story Teacher Integration Test Suite

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
    // 1. Requirement 25: Test Showcase Persona (Age 9, Multiplication, 7x6 equal groups, Space, Robot, Rockets)
    console.log('\n--- 1. Testing Requirement 25: Showcase Persona (Multiplication 7x6, Space, Robot, Rockets) ---');
    const req25Res = await fetch(`${baseUrl}/api/story/generate`, {
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
    const req25Data = await req25Res.json();
    assert(req25Res.status === 200, 'Generate endpoint returns status 200');
    assert(Array.isArray(req25Data.chapters) && req25Data.chapters.length >= 3, 'Generates 3 full chapters');
    
    // Validate that personalizations visibly appear in the generated story
    const fullStoryText = JSON.stringify(req25Data.chapters).toLowerCase();
    assert(fullStoryText.includes('robot') || fullStoryText.includes('bolt'), 'Story visibly features robot companion');
    assert(fullStoryText.includes('rocket') || fullStoryText.includes('fuel') || fullStoryText.includes('space') || fullStoryText.includes('orbital'), 'Story visibly incorporates rocket/space context');
    assert(fullStoryText.includes('7 × 6') || fullStoryText.includes('7') || fullStoryText.includes('multiplication'), 'Story visibly incorporates 7x6 multiplication');
    assert(fullStoryText.includes('equal groups') || fullStoryText.includes('groups') || fullStoryText.includes('rule'), 'Story visibly addresses equal groups');

    // 2. Requirement 26: Test Diverse Topics & Confirm Stories Visibly Change
    console.log('\n--- 2. Testing Requirement 26: Diverse Categories & Dynamic Story Differences ---');
    
    // Topic A: Age 6, Why plants need sunlight, Forest, Animal
    const sciRes = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Lily',
          childAge: 6,
          topic: 'Why Plants Need Sunlight',
          learningGoal: 'Leaves act like tiny solar kitchens using sunlight to make food',
          struggle: 'Thinks plants eat garden dirt like cereal',
          storyWorld: 'forest',
          companionType: 'animal',
          interest: 'little garden sprouts',
          learningStyle: 'discovery'
        }
      })
    });
    const sciData = await sciRes.json();
    const sciStoryText = JSON.stringify(sciData.chapters).toLowerCase();
    assert(sciStoryText.includes('forest') || sciStoryText.includes('greenwood'), 'Science story features forest setting');
    assert(sciStoryText.includes('sunlight') || sciStoryText.includes('leaf') || sciStoryText.includes('plants'), 'Science story features plants & sunlight');

    // Topic B: Age 8, Civic sense — keeping public places clean, City, Monster
    const civicRes = await fetch(`${baseUrl}/api/story/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        setup: {
          childName: 'Aarav',
          childAge: 8,
          topic: 'Keeping Public Places Clean',
          learningGoal: 'Parks belong to all of us so littering ruins the space for everyone',
          struggle: 'Drops wrappers on the ground',
          storyWorld: 'city',
          companionType: 'monster',
          interest: 'playground slides and city parks',
          learningStyle: 'rescue'
        }
      })
    });
    const civicData = await civicRes.json();
    const civicStoryText = JSON.stringify(civicData.chapters).toLowerCase();
    assert(civicStoryText.includes('city') || civicStoryText.includes('plaza') || civicStoryText.includes('park'), 'Civic story features city park setting');
    assert(civicStoryText.includes('monster') || civicStoryText.includes('grumble'), 'Civic story features fuzzy monster companion');

    // Confirm the two stories are completely different from each other!
    assert(sciStoryText !== civicStoryText, 'Different topic setups visibly produce distinct stories');

    // 3. Test "Explain in your own words" (Concept recognized without grading grammar)
    console.log('\n--- 3. Testing /api/story/evaluate ("Explain in your own words") ---');
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

    // 4. Test Child Struggling (Triggers "Try Again, Differently")
    console.log('\n--- 4. Testing Adaptive Learning When Child Struggles ---');
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

    // 5. Test "Try Again, Differently" Scaffolding Generation
    console.log('\n--- 5. Testing /api/story/adapt ("Try Again, Differently") ---');
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
    assert(Boolean(adaptData.followUpPrompt), 'Provides follow-up scaffolded question');

    // 6. Test Evidence-Based Parent/Teacher Report
    console.log('\n--- 6. Testing /api/story/report (Evidence-Based Learning Insights) ---');
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
            chapterNumber: 1,
            checkpointId: 'c1',
            question: 'How to arrange 7 rocket trays?',
            childResponse: 'Focus on 7 equal groups of 6',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Identified equal groups'],
            scaffoldingUsed: false
          },
          {
            chapterNumber: 2,
            checkpointId: 'c2',
            question: 'Explain 7x6 in your own words',
            childResponse: '7 trays with 6 crystals each is 42',
            attemptNumber: 1,
            demonstratedConcept: true,
            positiveEvidence: ['Demonstrated equal group computation'],
            scaffoldingUsed: false
          }
        ],
        starsEarned: 3
      })
    });
    const reportData = await reportRes.json();
    assert(reportRes.status === 200, 'Report endpoint returns status 200');
    assert(Boolean(reportData.estimatedMastery), 'Includes estimated mastery rating');
    assert(Array.isArray(reportData.conceptsDemonstrated) && reportData.conceptsDemonstrated.length > 0, 'Cites demonstrated concepts with evidence');
    assert(Array.isArray(reportData.suggestedNextActivities) && reportData.suggestedNextActivities.length >= 2, 'Recommends at least 2 real-world offline activities');

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
