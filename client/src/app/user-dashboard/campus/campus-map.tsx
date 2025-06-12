"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CampusMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("campus-map");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <motion.div
      id="campus-map"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="relative rounded-lg overflow-hidden h-[400px] bg-slate-100"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1d2b7d]"></div>
        </div>
      )}

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.573492944942!2d104.89540667544009!3d11.582402688619704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109517bf7757d23%3A0x965c34888684bf1!2sParagon%20International%20University!5e0!3m2!1sen!2skh!4v1746371390273!5m2!1sen!2skh"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setIsLoaded(true)}
        className={`${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      ></iframe>
    </motion.div>
  );
}
