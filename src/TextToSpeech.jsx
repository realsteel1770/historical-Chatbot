export const speakText = (text) => {
    // Cancels any current speech (so it doesn't overlap)
    window.speechSynthesis.cancel();
  
    // Checks if there is text
    if (!text) {
      console.log("No text to speak");
      return;
    }
  
    // Says line
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Makes it slightly slower/deeper for "Space" effect
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
  
    window.speechSynthesis.speak(utterance);
  };