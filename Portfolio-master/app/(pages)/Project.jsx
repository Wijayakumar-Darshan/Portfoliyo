"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCustomScroll from "../hooks/useCustomScroll";
import MotionBtn from "@/components/MotionBtn";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import isMobile from "is-mobile";

//import ProjectItem from "@/components/ProjectItem";
/* import dynamic from "next/dynamic";
const ProjectItem = dynamic(() => import("@/components/ProjectItem") , {
  ssr: false,
}); */

const Project = () => {

  const projects = [
    {
      title: "BikzIK E-Commerce Platform",
      image: "/assets/projects/BikzIK.png",
      description: "BIKZIK is a modern, full-stack e-commerce platform that offers seamless shopping experiences. It is built using the latest technologies with features like user authentication, product management, and cloud image storage.",
      link: "https://bikzik.vercel.app",
      git: "https://github.com/Buddika-Kasun/BikzIK_E-commarce_Web-MERN-"
    },
    {
      title: "My Portfolio",
      image: "/assets/projects/Portfolio.png",
      description: "A sleek and responsive personal portfolio website built with Next.js 15, React 19, and Tailwind CSS. It showcases projects, skills, and experiences with smooth animations powered by Framer Motion. Optimized for performance and accessibility.",
      link: "https://buddikakasun.vercel.app", 
      git: "https://github.com/Buddika-Kasun/Portfolio" 
    },    
    {
      title: "UniCore ERP System",
      image: "/assets/projects/Unicore.png",
      description: "UniCore is a powerful ERP system built with Next.js, React, and MongoDB, designed to streamline university management with modules for resource utilization, reservations, user profiles, and administrative operations.",
      link: "",    
      git: "https://github.com/Buddika-Kasun/UMS_Unicore_ERP-NextJs-",
    },
    {
      title: "Supplement Shop Admin",
      image: "/assets/projects/SupplementAdmin.png",
      description: "A modern admin dashboard for managing a supplement shop. Built with Next.js 14, MongoDB, and Tailwind CSS, it features CRUD operations for categories, subcategories, products, and admin users, with secure OAuth authentication.",
      link: "",
      git: "https://github.com/Buddika-Kasun/Suppliment_shop_Admin_Web-NextJs-"
    },
    {
      title: "Supplement Shop Client",
      image: "/assets/projects/SupplementClient.png",
      description: "A sleek and responsive supplement store built with Next.js 14, MongoDB, and Styled Components. Features include product listings, category-based filtering, featured product banners, and a shopping cart for a seamless user experience.",
      link: "",
      git: "https://github.com/Buddika-Kasun/Suppliment_shop_User_Web-NextJs-",
    },
  ];

  const { scrollYProgress } = useCustomScroll({
    sectionsClassName: "projects",
  }); //console.log(scrollYProgress); output = 0 to 1 value

  /* const ref2 = useRef();
  const { scrollYProgress: scroll } = useScroll(ref2);
  const xxTranslate = useTransform(scroll, [0,1], [0, - window?.innerWidth * projects?.length]); console.log(xxTranslate); */

  // Dynamically calculate the X translation
  //const translateX = scrollYProgress * -window.innerWidth * (projects?.length - 0.55 || 1);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    // Add an event listener to handle scroll and update the translateX value dynamically
    const handleScroll = () => {
      const progress = scrollYProgress;
      const width = window?.innerWidth || 0;
      const translation =
        progress * -width * (projects?.length - 0.55 || 1);
      setTranslateX(translation);
    };

    // Trigger the scroll update once at mount
    handleScroll();

    // Add event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollYProgress, projects]);

  const imageVariant = {
    initial: {
      opacity: 0,
      y: 500,
      x: -500,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const textVariant = {
    initial: {
      opacity: 0,
      y: 500,
      x: 500,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        staggerChildren: 0.5,
      },
    },
  };
  

  const ListItem = ({ item }) => {
    const ref = useRef();

    const inView = useInView(ref, { margin: "-100px" });

    return (
      <div
        ref={ref}
        className="h-full min-w-full overflow-hidden flex flex-col lg:flex-row lg:gap-20 items-start  lg:justify-center lg:px-8 lg:pl-16"
      >
        <div className="w-full lg:min-w-[400px] lg:max-w-[400px] rounded-md">
          <Image
            src={item.image}
            width={200}
            height={200}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4 p-2 lg:p-0">
          <h2 className="text-lg lg:text-3xl font-semibold text-ellipsis line-clamp-2 leading-tight lg:leading-normal text-accent">
            {item.title}
          </h2>
          <div className="lg:py-4 leading-tight lg:leading-normal">{item.description}</div>
          <div className="flex gap-6">
            { 
              item.link &&
              <Link
                href={item.link}
                target="_blank"
                className="bg-accent rounded-lg w-fit px-4 text-primary lg:hover:bg-accent-hover cursor-none lg:hover:scale-105 lg:hover:transition-all duration-200"
              >
                View Project
              </Link>
            }
            <MotionBtn
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 10,
              }}
            >
              <Link href={item.git} target="_blank" className='w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 cursor-none'>
                <FaGithub />
              </Link>
            </MotionBtn>
          </div>
        </div>
      </div>
    );
  };

  const ref = useRef(null);

  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  const isInMobile = isMobile();

  const leftVariant = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }
  }

  const rightVariant = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    }
  }

  return (
    <div
      //ref={ref}
      className="container max-auto lg:pt-[120px] mb-8 lg:mb-0 min-h-[calc(100vh)] h-full relative projects z-10"
    >
      {
        !isInMobile ? (
          /* Desktop */
          <>
          <div className="sticky hidden lg:block top-24 lg:top-28 w-full overflow-hidden">
            <motion.h1 
              initial={{
                opacity: 0,
                y: -50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                },
              }}
              viewport={{
                margin: "-15% 0px -25% 0px",
                //once: true,
              }}
              className="text-2xl font-semibold pb-4 lg:pb-8"
            >
              Projects
            </motion.h1>
            <motion.div
              className="flex h-full lg:items-center w-full sticky top-0 gap-8"
              style={{
                transform: `translateX(${translateX}px)`, // Apply X translation based on scroll progress
                transition: "transform 0.1s ease-out", // Smooth transition
              }}
              //style={{x: xxTranslate}}
              
            >
              {projects.map((project, index) => (
                <ListItem key={index} item={project} />
              ))}
            </motion.div>
          </div>
          {/* Add extra space for smooth scrolling */}
          <div className="hidden lg:block">
            {[...Array(projects.length)].map((_, i) => (
              <div key={i} className="min-h-[100vh]" />
            ))}
          </div>
          </>
        ) : (
          /* Mobile */
          <div className="lg:hidden w-full">
            <motion.h1
              initial={{
                opacity: 0,
                y: -50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                },
              }}
              viewport={{
                margin: "-25% 0px -25% 0px",
                //once: true,
              }}
              className="text-2xl font-semibold pb-4 lg:pb-8"
            >
                Projects
            </motion.h1>
            <div className="flex flex-col gap-16">
              {projects.map((project, index) => (
                //<ProjectItem item={project} key={index} />
                // <ListItem key={index} item={project} />
                <motion.div
                  key={index}
                  variants={textVariant}
                  //initial="initial"
                  //animate={inView ? 'animate' : 'initial'}
                  //whileInView="animate"
                  //viewport={{amount: 0.5}}
                  className="h-full min-w-full overflow-hidden flex flex-col lg:flex-row lg:gap-20 items-start  lg:justify-center lg:px-8 lg:pl-16"
                >
                  <motion.div
                    variants={leftVariant}
                    initial='initial'
                    whileInView='animate'
                    viewport={{
                      margin: "-25% 0px -25% 0px",
                    }}
                    className="w-full lg:min-w-[400px] lg:max-w-[400px] rounded-md"
                  >
                    <Image
                      src={project.image}
                      width={200}
                      height={200}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover rounded-md -z-10"
                      />
                  </motion.div>
                  <div className="flex flex-col gap-4 p-2 lg:p-0">
                    <motion.h2 
                      variants={rightVariant}
                      initial='initial'
                      whileInView='animate'
                      viewport={{
                        margin: "-25% 0px -25% 0px",
                      }}
                      className="text-lg lg:text-3xl font-semibold text-ellipsis line-clamp-2 leading-tight lg:leading-normal text-accent">
                      {project.title}
                    </motion.h2>
                    <motion.div
                      variants={leftVariant}
                      initial='initial'
                      whileInView='animate'
                      viewport={{
                        margin: "-25% 0px -25% 0px",
                      }}
                      className="lg:py-4 leading-tight lg:leading-normal">
                        {project.description}
                      </motion.div>
                    <motion.div
                      variants={rightVariant}
                      initial='initial'
                      whileInView='animate'
                      viewport={{
                        margin: "-25% 0px 0px 0px",
                      }}
                      className="flex gap-6"
                    >
                      { 
                        project.link &&
                        <Link
                        href={project.link}
                        target="_blank"
                        className="bg-accent rounded-lg w-fit px-4 text-primary lg:hover:bg-accent-hover cursor-none"
                        >
                          View Project
                        </Link>
                      }
                        <Link href={project.git} target="_blank" className='w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 cursor-none'>
                          <FaGithub />
                        </Link>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      }

    </div>
  );
};

export default Project;
