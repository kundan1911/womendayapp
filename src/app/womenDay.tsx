'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function WomensDayApp() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    if (submitted && !hasSpoken) {
      const speakText = () => {
        const speech1 = new SpeechSynthesisUtterance("Happy Women’s Day,");
        speech1.lang = "en-US";
        const speech2 = new SpeechSynthesisUtterance(name);
        speech2.lang = "hi-IN";

        const voices = window.speechSynthesis.getVoices();
        speech1.voice = voices.find(voice => voice.lang === "en-US") || null;
        speech2.voice = voices.find(voice => voice.lang === "hi") || null;

        window.speechSynthesis.cancel();
        setTimeout(() => {
          window.speechSynthesis.speak(speech1);
          setTimeout(() => {
            window.speechSynthesis.speak(speech2);
            setHasSpoken(true);
          }, 1000);
        }, 500);
      };

      if (window.speechSynthesis.getVoices().length > 0) {
        speakText();
      } else {
        window.speechSynthesis.onvoiceschanged = speakText;
      }
    }
  }, [submitted, name, hasSpoken]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-pink-200 text-center p-4 overflow-hidden">
    {/* Falling Flowers Animation */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-2xl"
        style={{
          left: `${Math.random() * 100}vw`,
          top: `-${Math.random() * 20}vh`,
          color: ["#ff69b4", "#ff1493", "#db7093", "#ff4500", "#ffa500"][Math.floor(Math.random() * 5)],
        }}
        animate={{
          y: ["-10vh", "110vh"],
          opacity: [1, 0],
        }}
        transition={{
          duration: Math.random() * 5 + 5,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        🌸
      </motion.div>
    ))}

    {!submitted ? (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-pink-700 mb-4">Welcome Beautiful Ladies!</h1>
        <input
          type="text"
          placeholder="Enter your name"
           className="p-2 rounded border border-pink-500 text-lg focus:outline-none mr-5 text-red-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="mt-4 bg-pink-500 text-white px-4 py-2 rounded"
          onClick={() => setSubmitted(true)}
          disabled={!name.trim()}
        >
          Celebrate!
        </button>
      </motion.div>
    ) : (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl font-bold text-pink-700 mb-4">Happy Women's Day, {name}!</h1>
        {/* Flower Shower Animation */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            style={{
              left: `${Math.random() * 100}vw`,
              top: `-${Math.random() * 20}vh`,
              color: ["#ff69b4", "#ff1493", "#db7093", "#ff4500", "#ffa500"][Math.floor(Math.random() * 5)],
            }}
            animate={{
              y: ["-10vh", "110vh"],
              opacity: [1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: 0,
              ease: "easeInOut",
            }}
          >
            🌺
          </motion.div>
        ))}
      </motion.div>
    )}
  </div>
  );
}
