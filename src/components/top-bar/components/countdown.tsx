"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";

export const revalidate = 0;

export default function Countdown() {
  const computeCountdown = () => {
    const now = new Date();
    const nextMidDay =
      now.getHours() >= 12
        ? addDays(now, 1).setHours(12, 0, 0, 0)
        : new Date().setHours(12, 0, 0, 0);

    const diff = nextMidDay - now.getTime();
    const hours = diff / 1000 / 60 / 60;
    const minutes = (hours - (hours | 0)) * 60;
    const seconds = (minutes - (minutes | 0)) * 60;
    const format = (n: number) => `${n | 0}`.padStart(2, "0");

    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  };

  const [countdown, setCountdown] = useState(computeCountdown);

  useEffect(() => {
    const timeout = setTimeout(() => setCountdown(computeCountdown()), 1000);

    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <Button
      className="mx-auto w-full gap-1 hover:border-border/10 sm:mr-0 sm:w-auto"
      variant="outline"
      asChild
    >
      <div>
        <span>Próximo anime em</span>
        <span
          className="inline-block w-14 text-success"
          suppressHydrationWarning
        >
          {countdown}
        </span>
      </div>
    </Button>
  );
}
