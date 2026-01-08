import React from "react";

export function splitToSpans(text) {
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <span className="inline-block will-change-transform">
        {w}
        {i < words.length - 1 ? "\u00A0" : ""}
      </span>
    </span>
  ));
}
