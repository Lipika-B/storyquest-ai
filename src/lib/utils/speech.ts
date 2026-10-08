// Native Web Speech API integration for child-friendly read-aloud narration

export class StorySpeaker {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeaking = false;

  public static speak(text: string, onEnd?: () => void, pitch: number = 1.05, rate: number = 0.95): boolean {
    if (!this.synth) return false;

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch; // slightly friendly child tone
    utterance.rate = rate;   // slightly measured for clarity

    // Select natural friendly English voice if available
    const voices = this.synth.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.debug('Speech synthesis note:', e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    this.isSpeaking = true;
    this.synth.speak(utterance);
    return true;
  }

  public static stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }

  public static getSpeakingState(): boolean {
    return this.synth ? this.synth.speaking : false;
  }
}
