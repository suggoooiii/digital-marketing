import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";

const anim = {
  initial: {
    opacity: 0,
  },
  open: (delay) => ({
    opacity: 1,
    transition: { duration: 0, delay: 0.02 * delay[0] },
  }),
  closed: (delay) => ({
    opacity: 0,
    transition: { duration: 0, delay: 0.02 * delay[1] },
  }),
};

export default function horizontalPixelTransition({
  menuIsActive,
  dimensions,
}) {
  const { width, height } = dimensions;
  /**
   * Shuffles array in place (Fisher–Yates shuffle).
   * @param {Array} a items An array containing the items.
   */
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

  const getBlocks = (indexOfColum) => {
    const blockSize = width * 0.05;
    const nbOfBlocks = Math.ceil(height / blockSize);
    const shuffledIndexes = shuffle([...Array(nbOfBlocks)].map((_, i) => i));
    return shuffledIndexes.map((randomIndex, index) => {
      return (
        <motion.div
          key={index}
          className="w-full h-[5vw] bg-[#ff6a00]"
          variants={anim}
          initial="initial"
          animate={menuIsActive ? "open" : "closed"}
          custom={[indexOfColum + randomIndex, 20 - indexOfColum + randomIndex]}
        />
      );
    });
  };

  return (
    <div className="flex h-screen overflow-hidden relative z-1 pointer-events-none">
      {[...Array(20)].map((_, index) => {
        return (
          <div key={index} className="w-[5vw] h-full flex flex-col">
            {getBlocks(index)}
          </div>
        );
      })}
    </div>
  );
}
