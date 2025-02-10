import { useState, useEffect } from "react";
import BentoGrid from "./components/BentoGrid";
import RainingEmojis from "./components/RainingEmojis";
import { motion } from "framer-motion";

function App() {
  const [displayText, setDisplayText] = useState("");
  const [noAttempts, setNoAttempts] = useState(0);
  const [showGrid, setShowGrid] = useState(true);
  const [_, setShowConfetti] = useState(false);
  const [isDecided, setIsDecided] = useState(false);
  const message = "Baabi, Will you be my valentine?";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayText(message.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const handleNoClick = () => {
    const nextAttempt = noAttempts + 1;
    setNoAttempts(nextAttempt);
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setShowGrid(false);
    setIsDecided(true);
    setDisplayText("I love you ❤️");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <RainingEmojis />
      <motion.div
        className="bg-white rounded-[32px] md:p-24 p-4 md:rounded-[32px] rounded-[16px]"
        animate={{ scale: isDecided ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}>
        <motion.h1
          className="text-4xl text-pink-600 text-center font-sans"
          animate={{ scale: isDecided ? 1.2 : 1 }}
          transition={{ duration: 0.5 }}>
          {displayText}
        </motion.h1>
        {showGrid ? <BentoGrid /> : null}
        {!isDecided && (
          <div className="relative flex justify-center gap-4 mt-8">
            <motion.button
              onClick={handleYesClick}
              className={`bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 border-4 border-pink-900 transition-all ${noAttempts >= 10 ? "w-full text-4xl py-8" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Yes
            </motion.button>
            {noAttempts < 10 && (
              <motion.button
                onClick={handleNoClick}
                className={`text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all bg-red-500 border-4 border-red-900 ${noAttempts > 0 ? "fixed" : ""}`}
                style={
                  noAttempts > 0
                    ? {
                        top: `${Math.min(Math.max(Math.random() * 100, 20), 80)}%`,
                        left: `${Math.min(Math.max(Math.random() * 100, 20), 80)}%`,
                        zIndex: 50,
                      }
                    : undefined
                }
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}>
                No
              </motion.button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default App;
