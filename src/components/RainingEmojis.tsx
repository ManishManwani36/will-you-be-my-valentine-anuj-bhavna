import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EmojiProps {
  id: number;
  emoji: string;
  x: number;
  duration: number;
  size: number;
}

const emojis = [
  "❤️",
  "😘",
  "😍",
  "💋",
  "💘",
  "💝",
  "💟",
  "❣️",
  "❤️‍🔥",
  "🫶",
  "♥️",
  "♥︎",
  "❣︎",
  "🥰",
  "😻",
  "💖",
  "💗",
  "💓",
  "💞",
  "💕",
  "❤️‍🩹",
  "🩷",
  "🧡",
  "💛",
  "💚",
  "💙",
  "🩵",
  "💜",
  "🤎",
  "🖤",
  "🩶",
  "🤍",
  "🫀",
  "❤︎",
  "💌",
];

const RainingEmojis = () => {
  const [emojiList, setEmojiList] = useState<EmojiProps[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji: EmojiProps = {
        id: Date.now(),
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: Math.random() * 100,
        duration: 2 + Math.random() * 3, // Slightly faster fall
        size: 20 + Math.random() * 30,
      };

      setEmojiList((prev) => [...prev, newEmoji]);

      // Remove emoji after animation completes
      setTimeout(
        () => {
          setEmojiList((prev) =>
            prev.filter((emoji) => emoji.id !== newEmoji.id)
          );
        },
        newEmoji.duration * 1000 + 2000
      );
    }, 200); // Increased frequency

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 9999 }}>
      <AnimatePresence>
        {emojiList.map((item) => (
          <motion.div
            key={item.id}
            initial={{ y: "-10vh", x: `${item.x}vw`, opacity: 1, rotate: 0 }}
            animate={{
              y: "110vh",
              opacity: 1,
              rotate: [0, 180, 360],
            }}
            exit={{ y: "110vh", opacity: 1 }}
            transition={{
              duration: item.duration,
              ease: [0.45, 0, 0.55, 1], // Natural cubic bezier curve
            }}
            style={{
              position: "absolute",
              fontSize: `${item.size}px`,
              zIndex: 9999,
            }}>
            {item.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default RainingEmojis;
