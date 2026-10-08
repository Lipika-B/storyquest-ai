'use client';

import React from 'react';
import { MiniGameConfig } from '@/lib/types/quest';
import { ChewFoodGame } from './ChewFoodGame';
import { PizzaCutterGame } from './PizzaCutterGame';
import { FlashlightShadowGame } from './FlashlightShadowGame';
import { HabitatMatchGame } from './HabitatMatchGame';
import { ColorMixGame } from './ColorMixGame';
import { PushCartGame } from './PushCartGame';

interface StoryMiniGameProps {
  config?: MiniGameConfig;
  topic?: string;
  onComplete: () => void;
}

export const StoryMiniGame: React.FC<StoryMiniGameProps> = ({
  config,
  topic = '',
  onComplete,
}) => {
  const topicLower = topic.toLowerCase();

  // If explicit config type is provided, use it
  if (config?.type === 'chew_food' || topicLower.includes('digest')) {
    return <ChewFoodGame onComplete={onComplete} />;
  }

  if (config?.type === 'cut_pizza' || topicLower.includes('fraction') || topicLower.includes('half') || topicLower.includes('quarter')) {
    return <PizzaCutterGame onComplete={onComplete} />;
  }

  if (config?.type === 'shadow_light' || topicLower.includes('shadow') || topicLower.includes('light')) {
    return <FlashlightShadowGame onComplete={onComplete} />;
  }

  if (config?.type === 'match_habitat' || topicLower.includes('habitat') || topicLower.includes('animal')) {
    return <HabitatMatchGame onComplete={onComplete} />;
  }

  if (config?.type === 'mix_colors' || topicLower.includes('colour') || topicLower.includes('color') || topicLower.includes('rainbow')) {
    return <ColorMixGame onComplete={onComplete} />;
  }

  if (config?.type === 'push_cart' || topicLower.includes('force') || topicLower.includes('friction') || topicLower.includes('motion')) {
    return <PushCartGame onComplete={onComplete} />;
  }

  // Fallback / default: return null if no mini game matches
  return null;
};
