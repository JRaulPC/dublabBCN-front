"use client";
import React, { useState, useEffect } from "react";

const DigitalClock = (): React.ReactElement => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <time className="min-w-[145px]" suppressHydrationWarning>
      Barcelona {hours}:{minutes}:{seconds}
    </time>
  );
};

export default DigitalClock;
