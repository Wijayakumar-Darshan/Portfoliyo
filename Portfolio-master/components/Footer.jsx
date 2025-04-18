"use client"

import isMobile from "is-mobile";
import React from "react";
import Social from "./Social";
import { motion } from "framer-motion";
import social from "@/data/social";
import MotionBtn from "./MotionBtn";
import Link from "next/link";

const Footer = () => {

  const containerVariant = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      },
    }
  }

  const viewportMargin = isMobile()
    ? "-10% 0px -10% 0px" // For mobile devices
    : "-10% 0px -5% 0px"; // For larger screens

  return (
    <footer 
      className="min-h-16 overflow-hidden"
    >
      <motion.div 
        variants={containerVariant}
        initial='initial'
        whileInView='animate'
        viewport={{
          margin: viewportMargin
        }}
        className="container flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 bg-[#193432cc] shadow-lg py-8 lg:py-6"
      >
        <motion.div
          variants={{
            initial: { 
              opacity: 0
            },
            animate: { 
              opacity: 1,
              transition: {
                delay: 0.4,
                duration: 0.5,
                ease: "easeInOut"
              }
            }
          }}
        >
          <div class="text-sm flex flex-col lg:flex-row items-center justify-center lg:gap-2">
            <div>© 2025 Wijayakumar Darshan.</div>
            <div>All rights reserved.</div>
          </div>
        </motion.div>
        <div className="px-8">
          {/* <Social
            containerStyle="flex gap-4 lg:gap-6"
            iconStyle="w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 cursor-none"
          /> */}
          <div className="flex gap-4 lg:gap-6">
            {social.map((item, index) => {
              return (
                <motion.div
                  variants={{
                    initial: {
                      opacity: 0,
                      y: 100,
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: (index * 0.1) + 0.3,
                        duration: 0.2,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  key={index}
                >
                <MotionBtn
                  whileHover={{ rotate: 360, scale: 1.5 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <Link href={item.url} target="_blank" className="w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 cursor-none">
                    {item.icon}
                  </Link>
                </MotionBtn>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
