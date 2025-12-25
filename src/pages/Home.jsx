import { useEffect, useRef, useState } from "react";
import HoverTitle from "@components/HoverTitle";
import { motion } from "motion/react";
import Header from "@components/Header";
import Menu from "@components/Menu";
import CenteredPixelTransition from "@components/pixelTransition/centered";

export default function Home() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <main className="">
      {/* <HoverTitle text="Hover Me!" /> */}
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <Menu menuIsActive={menuIsActive} />
      {dimensions.height > 0 && (
        <CenteredPixelTransition
          menuIsActive={menuIsActive}
          dimensions={dimensions}
        />
      )}
    </main>
  );
}
