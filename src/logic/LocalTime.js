import { useState, useEffect } from 'react';

export default function useLocalTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  return [time];
}
