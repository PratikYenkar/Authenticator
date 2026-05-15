import { useState, useEffect } from 'react';
import { getTimeRemaining } from '../utils/otpauth';

export function useCountdown(period: number = 30) {
  const [timeRemaining, setTimeRemaining] = useState(() => getTimeRemaining(period));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining(period));
    }, 1000);
    return () => clearInterval(interval);
  }, [period]);

  return {
    timeRemaining,
    progress: timeRemaining / period,
    isWarning: timeRemaining <= 10,
    isUrgent: timeRemaining <= 5,
  };
}
