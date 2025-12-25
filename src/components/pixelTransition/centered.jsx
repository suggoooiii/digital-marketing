import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const anim = {
  initial: {
    opacity: 0,
  },
  open: (i) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.03 * i },
  }),
  closed: (i) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.03 * i },
  }),
};

export default function centeredPixelTransition({ menuIsActive, dimensions }) {
  const { width, height } = dimensions;

  const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  const getBlocks = () => {
    const { innerWidth, innerHeight } = window;
    const blockSize = innerWidth * 0.05;
    const nbOfBlocks = Math.ceil(innerHeight / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
    return shuffledIndexes.map((randomIndex, index) => {
      return (
        <motion.div
          key={index}
          className="w-full h-[5vw] bg-[#ff6a00]"
          variants={anim}
          initial="initial"
          animate={menuIsActive ? "open" : "closed"}
          custom={randomIndex}
        />
      );
    });
  };

  return (
    <div className="flex h-screen overflow-hidden relative z-1 pointer-events-none">
      {[...Array(20)].map((_, index) => {
        return (
          <div key={index} className="w-[5vw] h-full flex flex-col">
            {getBlocks()}
          </div>
        );
      })}
    </div>
  );
}
