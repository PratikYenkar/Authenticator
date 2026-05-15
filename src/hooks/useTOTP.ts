import { useState, useEffect, useRef } from 'react';
import { Account } from '../types';
import { generateTOTP, formatCode, getTimeRemaining } from '../utils/otpauth';

export function useTOTP(account: Account) {
  const [code, setCode] = useState(() => generateTOTP(account));
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const refresh = () => setCode(generateTOTP(account));

    // Clear any existing interval before setting up a new one
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const timeUntilNext = getTimeRemaining(account.period) * 1000;

    const timeout = setTimeout(() => {
      refresh();
      intervalRef.current = setInterval(refresh, account.period * 1000);
    }, timeUntilNext);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [account.secret, account.period, account.algorithm, account.digits]);

  return {
    code,
    formattedCode: formatCode(code, account.digits),
  };
}
