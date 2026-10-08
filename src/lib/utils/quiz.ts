/**
 * Multiple-choice option distribution and shuffling utility.
 * Fixes the "Option A is always correct" issue by distributing the correct answer
 * across random or balanced positions (A, B, C, D) while explicitly tracking the correct option.
 */

export interface DistributedOptions {
  options: string[];
  correctOption: string;
  correctIndex: number;
}

/**
 * Distributes options such that the correct answer is positioned at a target index or random position.
 * @param rawOptions Array of options where by authoring convention rawOptions[0] is the correct answer.
 * @param targetIndex Optional target index (0=A, 1=B, 2=C, 3=D) to guarantee variety across levels.
 */
export function distributeOptions(
  rawOptions: string[],
  targetIndex?: number
): DistributedOptions {
  if (!rawOptions || rawOptions.length === 0) {
    return { options: [], correctOption: '', correctIndex: -1 };
  }

  const correctOption = rawOptions[0];
  const distractors = rawOptions.slice(1);

  // If there's only 1 option, return as is
  if (distractors.length === 0) {
    return { options: [correctOption], correctOption, correctIndex: 0 };
  }

  // Shuffle distractors
  const shuffledDistractors = [...distractors];
  for (let i = shuffledDistractors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledDistractors[i], shuffledDistractors[j]] = [shuffledDistractors[j], shuffledDistractors[i]];
  }

  // Determine index for the correct answer
  const totalCount = rawOptions.length;
  let finalIndex: number;
  if (typeof targetIndex === 'number' && targetIndex >= 0) {
    finalIndex = targetIndex % totalCount;
  } else {
    finalIndex = Math.floor(Math.random() * totalCount);
  }

  // Assemble final array with correct answer at finalIndex
  const result: string[] = [];
  let distractorIdx = 0;
  for (let i = 0; i < totalCount; i++) {
    if (i === finalIndex) {
      result.push(correctOption);
    } else {
      result.push(shuffledDistractors[distractorIdx++]);
    }
  }

  return {
    options: result,
    correctOption,
    correctIndex: finalIndex,
  };
}

/**
 * Helper to ensure a level's options are properly formatted with correctOption tracked.
 */
export function formatLevelChoices(
  rawOptions: string[] | undefined,
  levelIndex: number = 0
): { options: string[] | undefined; correctOption: string | undefined } {
  if (!rawOptions || rawOptions.length === 0) {
    return { options: undefined, correctOption: undefined };
  }

  // Vary position: Level 2 -> index 1 (B), Level 3 -> index 2 (C), Level 5 -> index 0 (A) or 3 (D)
  const targetPos = (levelIndex + 1) % rawOptions.length;
  const distributed = distributeOptions(rawOptions, targetPos);

  return {
    options: distributed.options,
    correctOption: distributed.correctOption,
  };
}
