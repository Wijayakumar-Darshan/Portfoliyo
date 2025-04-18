/*  v1
"use client";

import { useEffect, useState } from "react";

const useCustomScroll = () => {

    // ----- State to hold scroll direction (up or down) and last scroll position -----
    const [scrollDirection, setScrollDirection] = useState("down"); // 'up' or 'down'
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollPosition = window?.scrollY;

            if (currentScrollPosition > lastScrollPosition) {
                setScrollDirection("down");
            } else if (currentScrollPosition < lastScrollPosition) {
                setScrollDirection("up");
            }

            setLastScrollPosition(currentScrollPosition);
        };

        window?.addEventListener("scroll", handleScroll);

        return () => {
            window?.removeEventListener("scroll", handleScroll);
        };

    }, [lastScrollPosition]);
    // ---------------------------------------------------------------------------------

    // ------------- Scroll Entered(5%),Active(50%),Leaved(95%) Section ---------------
    const [enteredSection, setEnteredSection] = useState({});
    const [leavedSection, setLeavedSection] = useState({});
    const [activeSection, setActiveSection] = useState("home"); // Track active section

    useEffect(() => {

        const enterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setEnteredSection(entry.target.id); // Update entered section
                    }
                });
            },
            { threshold: 0.04 } // Trigger when 5% of the section is visible
        );

        const leaveObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setLeavedSection(entry.target.id); // Update leaved section
                    }
                });
            },
            { threshold: 0.94 }
        );

        const activeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id); // Update active section
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the section is visible
        );

        // Observe each section
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            enterObserver.observe(section)
            leaveObserver.observe(section);
            activeObserver.observe(section);
        });

        return () => observer.disconnect(); // Cleanup on component unmount

    }, []);
    // ----------------------------------------------------------------------------------

    // ---------------- Function to calculate progress for each section -----------------
    const [sectionProgress, setSectionProgress] = useState({}); // Track progress for each section

    const calculateProgress = () => {
        const sections = document.querySelectorAll("section");
        const progressData = {};

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            const sectionHeight = rect.height;
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;

            // Calculate the percentage of the section visible in the viewport
            const visibleHeight = Math.min(sectionBottom, window?.innerHeight) - Math.max(sectionTop, 0);
            const sectionProgressValue = Math.max(0, Math.min(visibleHeight / window?.innerHeight, 0.99));
            progressData[section.id] = sectionProgressValue; // Store progress for this section
        });

        setSectionProgress(progressData);
    };

    // Listen to scroll events and calculate section progress
    useEffect(() => {
        const handleScroll = () => {
            calculateProgress();
        };
        window?.addEventListener("scroll", handleScroll);
        window?.addEventListener("resize", handleScroll);

        return () => {
            window?.removeEventListener("scroll", handleScroll);
            window?.removeEventListener("resize", handleScroll);
        };
    }, []);
    // ----------------------------------------------------------------------------------

    // ------------------ Function to handle header background color --------------------
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector("header");
            if (window?.scrollY > 0) {
                header.classList.add("bg-[#193432cc]", "shadow-lg");
            } else {
                header.classList.remove("bg-[#193432cc]", "shadow-lg");
            }
        };

        window?.addEventListener("scroll", handleScroll);

        return () => {
            window?.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // -----------------------------------------------------------------------------------

    // Return values
    return {
        scrollDirection,
        lastScrollPosition,
        enteredSection,
        leavedSection,
        activeSection,
        sectionProgress,
    };
};

export default useCustomScroll;
*/

//  v2 
/*
"use client";

import { useEffect, useState } from "react";

const useCustomScroll = ({ sectionsClassName = "section" } = {}) => {
  // States for scroll direction, section progress, etc.
  const [scrollDirection, setScrollDirection] = useState("down"); // 'up' or 'down'
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [enteredSection, setEnteredSection] = useState({});
  const [leavedSection, setLeavedSection] = useState({});
  const [activeSection, setActiveSection] = useState("home");
  const [sectionProgress, setSectionProgress] = useState({ home: 0.99 }); // Track progress for each section
  const [subSectionProgress, setSubSectionProgress] = useState({});
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    // Reference the scrollable container
    //const container = document.getElementById("main-container");
    const container = document.documentElement;

    if (!container) {
      console.error("Element with id 'main-container' not found!");
      return;
    }

    // Scroll Direction Logic
    const handleScrollDirection = () => {
      const currentScrollPosition = container.scrollTop;

      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection("down");
      } else if (currentScrollPosition < lastScrollPosition) {
        setScrollDirection("up");
      }

      setLastScrollPosition(currentScrollPosition);
    };

    // Section Progress Calculation
    /*
    const calculateProgress = () => {
      const sections = Array.from(
        container.getElementsByClassName(sectionsClassName),
      );
      const progressData = {};

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const visibleHeight =
          Math.min(rect.bottom, containerRect.bottom) -
          Math.max(rect.top, containerRect.top);
        const progress = Math.max(
          0,
          Math.min(visibleHeight / containerRect.height, 0.99),
        );

        progressData[section.id] = progress;
      });
      
      setSectionProgress(progressData);
    };
    *
    const calculateProgress = () => {
      const sections = Array.from(document.getElementsByClassName(sectionsClassName));
      const progressData = {};
    
      // Get the window?'s viewport dimensions
      const windowHeight = window?.innerHeight;
      const scrollTop = window?.scrollY;
    
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
    
        // Calculate the top and bottom of the visible area of the section in the viewport
        const visibleTop = Math.max(rect.top, 0);  // Section's top within the window?
        const visibleBottom = Math.min(rect.bottom, windowHeight); // Section's bottom within the window?
    
        // If the section is not in the window?'s visible area, no progress
        if (visibleTop >= visibleBottom) {
          progressData[section.id] = 0;
          return;
        }
    
        // Calculate the visible height of the section within the viewport
        const visibleHeight = visibleBottom - visibleTop;
    
        // Calculate the total height of the section
        const sectionHeight = rect.height;
    
        // Calculate the section's progress
        const progress = sectionHeight === 0 ? 0 : Math.min((visibleHeight / windowHeight), 0.99) ; //console.log("section: ",section.id, "visibleHeight: ", visibleHeight, "sectionHeight: ", sectionHeight, "progress: ", progress)
    
        // Clamp progress between 0 and 1
        progressData[section.id] = Math.min(Math.max(progress, 0), 1);
      });
    
      // Call the function to update the state or UI with the progress
      setSectionProgress(progressData); //console.log(progressData)
    };
    

    // Header Background Color Change
    const handleScrollHeader = () => {
      const header = document.querySelector("header");
      if (container.scrollTop > 0) {
        header.classList.add("bg-[#193432cc]", "shadow-lg");
      } else {
        header.classList.remove("bg-[#193432cc]", "shadow-lg");
      }
    };

    // Up arrow opacity change
    const handleUpArrow = () => {
      const upArrow = document.getElementById("upArrow");
      if (container.scrollTop > 10) {
        upArrow.classList.remove("opacity-0");
        upArrow.classList.add("opacity-100");
      } else {
        upArrow.classList.remove("opacity-100");
        upArrow.classList.add("opacity-0");
      }
    };

    // Intersection Observers for Entered, Active, and Leaved Sections
    const enterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEnteredSection(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.04 },
    );

    const leaveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLeavedSection(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.94 },
    );

    /* const activeObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { root: container, threshold: 0.5 }
        ); *

    // Find the section name with the max value (Active section)
    const maxSectionName = Object.keys(sectionProgress).reduce(
      (maxName, section) => {
        return sectionProgress[section] > sectionProgress[maxName]
          ? section
          : maxName;
      },
      Object.keys(sectionProgress)[0],
    ); // Start with the first section as the initial max
    setActiveSection(maxSectionName);

    const sections = container.querySelectorAll("section");
    sections.forEach((section) => {
      enterObserver.observe(section);
      leaveObserver.observe(section);
      //activeObserver.observe(section);
    });

    const calScrollYProgress = () => {
      const section = container.querySelector(`.${sectionsClassName}`); // Get the section by class name
      if (!section) return;

      const containerHeight = container.scrollHeight - container.clientHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Calculate the scroll position and progress for the section
      const sectionScrollTop = Math.max(0, container.scrollTop - sectionTop); // Scroll position inside section
      const sectionProgress = Math.min(1, sectionScrollTop / sectionHeight);

      setScrollYProgress(sectionProgress);
    };

    // Event listeners for scroll and resize
    /*
    container.addEventListener("scroll", handleScrollDirection);
    container.addEventListener("scroll", calculateProgress);
    container.addEventListener("resize", calculateProgress);
    container.addEventListener("scroll", handleScrollHeader);
    container.addEventListener("scroll", handleUpArrow);
    container.addEventListener("scroll", calScrollYProgress);
    *
    window?.addEventListener("scroll", handleScrollDirection);
    window?.addEventListener("scroll", calculateProgress);
    window?.addEventListener("resize", calculateProgress);
    window?.addEventListener("scroll", handleScrollHeader);
    window?.addEventListener("scroll", handleUpArrow);
    window?.addEventListener("scroll", calScrollYProgress);

    return () => {
      /*
      container.removeEventListener("scroll", handleScrollDirection);
      container.removeEventListener("scroll", calculateProgress);
      container.removeEventListener("resize", calculateProgress);
      container.removeEventListener("scroll", handleScrollHeader);
      container.removeEventListener("scroll", handleUpArrow);
      container.removeEventListener("scroll", calScrollYProgress);
      *
      window?.removeEventListener("scroll", handleScrollDirection);
      window?.removeEventListener("scroll", calculateProgress);
      window?.removeEventListener("resize", calculateProgress);
      window?.removeEventListener("scroll", handleScrollHeader);
      window?.removeEventListener("scroll", handleUpArrow);
      window?.removeEventListener("scroll", calScrollYProgress);
      enterObserver.disconnect();
      leaveObserver.disconnect();
      //activeObserver.disconnect();
    };
  }, [lastScrollPosition]);

  // Return values
  return {
    scrollDirection,
    lastScrollPosition,
    enteredSection,
    leavedSection,
    activeSection,
    sectionProgress,
    scrollYProgress,
  };
};

export default useCustomScroll;
*/



//  v3
/*
"use client";

import { useEffect, useState } from "react";

const useCustomScroll = ({ sectionsClassName = "section" } = {}) => {
  // States for scroll tracking and section progress
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [enteredSection, setEnteredSection] = useState({});
  const [leavedSection, setLeavedSection] = useState({});
  const [activeSection, setActiveSection] = useState("home");
  const [sectionProgress, setSectionProgress] = useState({ home: 0.99 });
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    // Use `document.documentElement` as the container
    const container = document.documentElement;

    if (!container) {
      console.error("Document root (HTML element) not found!");
      return;
    }

    // Scroll Direction Logic
    const handleScrollDirection = () => {
      const currentScrollPosition = container.scrollTop;

      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection("down");
      } else if (currentScrollPosition < lastScrollPosition) {
        setScrollDirection("up");
      }

      setLastScrollPosition(currentScrollPosition);
    };

    // Section Progress Calculation
    const calculateProgress = () => {
      const sections = Array.from(
        document.getElementsByClassName(sectionsClassName)
      );
      const progressData = {};

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visibleHeight = Math.min(
          rect.bottom,
          window?.innerHeight
        ) - Math.max(rect.top, 0);
        const progress = Math.max(
          0,
          Math.min(visibleHeight / rect.height, 0.99)
        );

        progressData[section.id] = progress;
      });

      setSectionProgress(progressData);
    };

    // Scroll Progress for the Whole Page
    const handleScrollProgress = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollYProgress(progress);
    };

    // Intersection Observers
    const enterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEnteredSection(entry.target.id);
          }
        });
      },
      { threshold: 0.04 }
    );

    const leaveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setLeavedSection(entry.target.id);
          }
        });
      },
      { threshold: 0.94 }
    );

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe sections
    const sections = document.querySelectorAll(`.${sectionsClassName}`);
    sections.forEach((section) => {
      enterObserver.observe(section);
      leaveObserver.observe(section);
      activeObserver.observe(section);
    });

    // Event Listeners
    const handleScroll = () => {
      handleScrollDirection();
      calculateProgress();
      handleScrollProgress();
    };

    window?.addEventListener("scroll", handleScroll);

    return () => {
      window?.removeEventListener("scroll", handleScroll);
      enterObserver.disconnect();
      leaveObserver.disconnect();
      activeObserver.disconnect();
    };
  }, [lastScrollPosition, sectionsClassName]);

  return {
    scrollDirection,
    enteredSection,
    leavedSection,
    activeSection,
    sectionProgress,
    scrollYProgress,
  };
};

export default useCustomScroll;
*/

"use client";

import { useEffect, useState } from "react";

const useCustomScroll = ({ sectionsClassName = "section" } = {}) => {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [enteredSection, setEnteredSection] = useState({});
  const [leavedSection, setLeavedSection] = useState({});
  const [activeSection, setActiveSection] = useState("home");
  const [sectionProgress, setSectionProgress] = useState({ home: 0.99 });
  const [subSectionProgress, setSubSectionProgress] = useState({});
  const [scrollYProgress, setScrollYProgress] = useState(0);

  useEffect(() => {
    // Ensure window? is available (client-side only)
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const container = document.documentElement;

    // Scroll Direction Logic
    const handleScrollDirection = () => {
      const currentScrollPosition = container.scrollTop;

      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection("down");
      } else if (currentScrollPosition < lastScrollPosition) {
        setScrollDirection("up");
      }

      setLastScrollPosition(currentScrollPosition);
    };

    // Section Progress Calculation
    const calculateProgress = () => {
      const sections = Array.from(document.getElementsByClassName(sectionsClassName));
      const progressData = {};

      const windowHeight = window?.innerHeight;
      const scrollTop = window?.scrollY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);  
        const visibleBottom = Math.min(rect.bottom, windowHeight); 

        if (visibleTop >= visibleBottom) {
          progressData[section.id] = 0;
          return;
        }

        const visibleHeight = visibleBottom - visibleTop;
        const sectionHeight = rect.height;

        const progress = sectionHeight === 0 ? 0 : Math.min(visibleHeight / windowHeight, 0.99);
        progressData[section.id] = Math.min(Math.max(progress, 0), 1);
      });

      setSectionProgress(progressData);
    };

    // Header Background Color Change
    const handleScrollHeader = () => {
      const header = document.querySelector("header");
      if (container.scrollTop > 0) {
        header.classList.add("bg-[#193432cc]", "shadow-lg");
      } else {
        header.classList.remove("bg-[#193432cc]", "shadow-lg");
      }
    };

    const calScrollYProgress = () => {
      const section = container.querySelector(`.${sectionsClassName}`); // Get the section by class name
      if (!section) return;

      const containerHeight = container.scrollHeight - container.clientHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Calculate the scroll position and progress for the section
      const sectionScrollTop = Math.max(0, container.scrollTop - sectionTop); // Scroll position inside section
      const sectionProgress = Math.min(1, sectionScrollTop / sectionHeight);

      setScrollYProgress(sectionProgress);
    };

    // Up arrow opacity change
    const handleUpArrow = () => {
      const upArrow = document.getElementById("upArrow");
      if (container.scrollTop > 10) {
        upArrow.classList.remove("opacity-0");
        upArrow.classList.add("opacity-100");
      } else {
        upArrow.classList.remove("opacity-100");
        upArrow.classList.add("opacity-0");
      }
    };

    // Intersection Observers
    const enterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEnteredSection(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.04 },
    );

    const leaveObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLeavedSection(entry.target.id);
          }
        });
      },
      { root: container, threshold: 0.94 },
    );

    const maxSectionName = Object.keys(sectionProgress).reduce(
      (maxName, section) => sectionProgress[section] > sectionProgress[maxName] ? section : maxName,
      Object.keys(sectionProgress)[0],
    );
    setActiveSection(maxSectionName);

    const sections = container.querySelectorAll("section");
    sections.forEach((section) => {
      enterObserver.observe(section);
      leaveObserver.observe(section);
    });

    // Scroll Event Listeners
    window?.addEventListener("scroll", handleScrollDirection);
    window?.addEventListener("scroll", calculateProgress);
    window?.addEventListener("resize", calculateProgress);
    window?.addEventListener("scroll", handleScrollHeader);
    window?.addEventListener("scroll", handleUpArrow);
    window?.addEventListener("scroll", calScrollYProgress);

    return () => {
      window?.removeEventListener("scroll", handleScrollDirection);
      window?.removeEventListener("scroll", calculateProgress);
      window?.removeEventListener("resize", calculateProgress);
      window?.removeEventListener("scroll", handleScrollHeader);
      window?.removeEventListener("scroll", handleUpArrow);
      window?.removeEventListener("scroll", calScrollYProgress);
      enterObserver.disconnect();
      leaveObserver.disconnect();
    };
  }, [lastScrollPosition]);

  return {
    scrollDirection,
    lastScrollPosition,
    enteredSection,
    leavedSection,
    activeSection,
    sectionProgress,
    scrollYProgress,
  };
};

export default useCustomScroll;
