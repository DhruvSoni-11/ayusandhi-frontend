import { useState, useEffect } from 'react';

const useTypingEffect = (phrases, typingSpeed = 150, deletingSpeed = 50, pauseDuration = 2000) => {
  const [currentText, setCurrentText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      const currentPhrase = phrases[currentPhraseIndex];
      if (currentText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(text => text.slice(0, -1));
        }, deletingSpeed);
      } else {
        setCurrentPhraseIndex(index => (index + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, currentPhraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return currentText;
};

export default useTypingEffect;