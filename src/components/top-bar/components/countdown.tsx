"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Countdown() {
  const computeCountdown = () => {
    const today = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const tomorrow = today + 1000 * 60 * 60 * 36;
    return new Date(tomorrow - new Date().getTime());
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
      className="hover:border-border/10 ml-auto gap-1"
      variant="outline"
      asChild
    >
      <div>
        <span>Próximo anime em</span>
        <span className="text-success" suppressHydrationWarning>
          {countdown.getHours().toFixed().padStart(2, "0")}:
          {countdown.getMinutes().toFixed().padStart(2, "0")}:
          {countdown.getSeconds().toFixed().padStart(2, "0")}
        </span>
      </div>
    </Button>
  );
}
