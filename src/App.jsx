import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
// Import your page components here

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import { ReactLenis, useLenis } from "lenis/react";
import StickySection from "@components/Stickysection.jsx";

export default function App() {
  return (
    // <Home />
    <ReactLenis root>
      <main className="bg-black min-h-screen">
        {/* Intro Section */}
        <div className="h-screen flex items-center justify-center text-white">
          <h1 className="text-8xl font-bold">Scroll Down</h1>
        </div>

        {/* Sticky Sections Wrapper */}
        <div className="relative w-full">
          <StickySection
            offset={0}
            bgColor="bg-[#C3ABFF]"
            imgSrc="src/assets/img/1.png"
            title="Content Creation"
          >
            The algorithm's workings are shrouded in complexity...
          </StickySection>

          <StickySection
            offset={151.583}
            bgColor="bg-[#FED35B]"
            imgSrc="src/assets/img/2.png"
            title="SEO"
          >
            The digital gospel etched into the very code...
          </StickySection>

          <StickySection
            offset={303.166}
            bgColor="bg-[#FFFFFF]"
            imgSrc="src/assets/img/3.png"
            title="Advertisement"
          >
            The elusive entities, lacking human form...
          </StickySection>

          <StickySection
            offset={454.749}
            bgColor="bg-[#FBC1D4]"
            imgSrc="src/assets/img/5.png"
            title="Brand Strategy "
            // titleColor="white"
          >
            This overlooked realm, a consequence of algorithmic judgments...
          </StickySection>
          <StickySection
            offset={606.332}
            bgColor="bg-[#1E1E1E]"
            imgSrc="src/assets/img/4.png"
            title="Visual Identity"
            titleColor="white"
          >
            This overlooked realm, a consequence of algorithmic judgments...
          </StickySection>
        </div>

        {/* Outro Section */}
        <div className="h-screen flex items-center justify-center text-white">
          <p className="text-2xl">End of the journey.</p>
        </div>
      </main>
    </ReactLenis>
  );
}
