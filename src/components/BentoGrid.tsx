import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TOTAL_IMAGES } from "../constants/images";

const BentoGrid = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);

      // Add scroll behavior
      const scrollInterval = setInterval(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 100); // Adjust timing to match animation

      // Cleanup scroll interval after animation completes
      setTimeout(() => {
        clearInterval(scrollInterval);
      }, 3000); // Adjust based on total animation duration
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const images = Array.from({ length: TOTAL_IMAGES }, (_, i) => i + 1).map(
    (num) => `/assets/image-${num}.jpeg`
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-8 max-w-full`}>
      {images.map((image, index) => {
        const isWide = index % 3 === 0;
        const isTall = index % 5 === 0;
        const isLarge = index % 7 === 0;

        return (
          <motion.div
            key={image}
            variants={item}
            className={`relative overflow-hidden rounded-xl transition-transform hover:scale-[1.02] ${isWide ? "col-span-2" : ""} ${isTall ? "row-span-2" : ""} ${isLarge ? "col-span-2 row-span-2" : ""}`}
            style={{
              aspectRatio: isWide
                ? "16/9"
                : isTall
                  ? "3/4"
                  : isLarge
                    ? "4/3"
                    : "1",
              minHeight: isLarge ? "400px" : isTall ? "300px" : "200px",
              maxHeight: isLarge ? "600px" : isTall ? "450px" : "300px",
              width: "100%",
              height: "100%",
            }}>
            <img
              src={image}
              alt={`Memory ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover hover:object-contain transition-[object-fit] duration-300"
              loading="lazy"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default BentoGrid;
