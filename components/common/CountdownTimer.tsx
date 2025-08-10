import React, { useState, useEffect } from 'react';

type Props = {
  targetDate?: string;
  onExpire?: () => void;
  className?: string;
};

const CountdownTimer: React.FC<Props> = ({ targetDate, onExpire, className }) => {
  const calculateTimeLeft = () => {
    if (!targetDate) return { total: 0 };
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
        if (onExpire) onExpire();
      }
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.total <= 0) {
    return <span className="text-green-400 font-semibold">Disponível agora!</span>;
  }
  
  const format = (num: number | undefined) => num?.toString().padStart(2, '0') || '00';

  return (
    <div className={`flex gap-3 justify-center ${className}`}>
      <TimeUnit value={timeLeft.days} label="dias" />
      <TimeUnit value={timeLeft.hours} label="horas" />
      <TimeUnit value={timeLeft.minutes} label="min" />
      <TimeUnit value={timeLeft.seconds} label="seg" />
    </div>
  );
};

const TimeUnit: React.FC<{value?: number, label: string}> = ({value, label}) => (
    <div className="text-center">
        <div className="text-2xl font-bold text-haut-accent">{value?.toString().padStart(2, '0') || '00'}</div>
        <div className="text-xs text-haut-muted uppercase">{label}</div>
    </div>
)

export default CountdownTimer;