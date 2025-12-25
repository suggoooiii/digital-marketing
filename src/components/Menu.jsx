import React from "react";
import { motion } from "framer-motion";

const anim = {
  initial: {
    opacity: 0,
  },

  open: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

const Menu = ({ menuIsActive }) => {
  return (
    <motion.div
      className="fixed flex flex-col items-center justify-center h-[90vh] w-full z-3"
      variants={anim}
      initial="initial"
      animate={menuIsActive ? "open" : "exit"}
    >
      <p className="text-[5vw] m-[5px]">Home</p>
      <p className="text-[5vw] m-[5px]">About</p>
      <p className="text-[5vw] m-[5px]">Contact</p>
    </motion.div>
  );
};

export default Menu;
