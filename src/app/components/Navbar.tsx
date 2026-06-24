"use client";
import React, { useState } from "react";

// 1. Defined the interface outside the component so it's clean and reusable
interface NavbarProps {
  currentBg: [number, number, number];
  onColorChange: (color: [number, number, number]) => void;
  currentBlob : [number, number, number];
  onColorBlob: (color: [number, number, number]) => void;
  currentDay: boolean;
  onDayChange: (boolean: boolean) => void;
}

export default function Navbar({ currentBg, onColorChange, currentBlob, onColorBlob, currentDay, onDayChange}: NavbarProps) {
  // 2. Simple toggle handler function
  const handleToggle = () => {
    // If it's currently dark (0.0, 0.0, 0.0), switch to a light gray/white (0.95, 0.95, 0.95)
    // Otherwise, toggle it back to dark.
    console.log("trying to change colour")
    if (currentBg[0] === 0.0 && currentBg[1] === 0.0 && currentBg[2] === 0.0) {
      onColorChange([1.0, 1.0, 1.0]);
      onColorBlob([0.7055, 0.8076, 1.45]);
      onDayChange(true);
    } else {
      onColorChange([0.0, 0.0, 0.0]);
      onColorBlob([34./255., 197./255., 94./255.]);
      onDayChange(false);
    }
  };

  return (
    <div>
      <nav className="p-8 flex justify-between items-center uppercase tracking-widest text-xs border-b border-white/10">
        <span className="font-bold text-neutral-500">Sandro Saran / 2026</span>
        <div className="space-x-8">
          <a
            href="#work"
            className={currentDay ? "hover:text-accentblue transition-colors text-neutral-500 font-medium lowercase" : "hover:text-green-500 transition-colors text-neutral-500 font-medium lowercase"}
          >
            work
          </a>
          <a
            href="#about"
            className={currentDay ? "hover:text-accentblue transition-colors text-neutral-500 font-medium lowercase" : "hover:text-green-500 transition-colors text-neutral-500 font-medium lowercase"}
          >
            about
          </a>
          
          {/* 3. Attached the click listener here */}
          <button 
            onClick={handleToggle}
            className={currentDay ? "hover:text-accentblue transition-colors text-neutral-500 font-medium" : "hover:text-green-500 transition-colors text-neutral-500 font-medium"}
          >
            day/night
          </button>
        </div>
      </nav>
    </div>
  );
}