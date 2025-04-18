// Components
import CVBtn from "@/components/CVBtn";
import Photo from "@/components/Photo";
import Social from "@/components/Social";
import TypingEffect from "@/components/TypingEffect";
import TextShadingView from "../animations/TextShadingView";
import { motion } from 'framer-motion';

const Home = () => {

  const awardVariants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: {
          delay: 0.5,
          duration: 2,
          ease: "easeInOut",
          type: "spring",
          stiffness: 100,
          damping: 8,
        },
        opacity: {
          delay: 0.5,
          duration: 0.5,
          ease: "easeInOut",
        },
        staggerChildren: 0.4,
      }
    }
  }

  return (
    <div className="container mx-auto lg:pt-[60px]">
      <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-8">
        {/* Text */}
        <div className="text-center xl:text-left order-2 xl:order-none">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="h1"
          >
            <span className="w">Hello, I&apos;m</span>
            <br />
            <span className="text-accent">Wijayakumar Darshan</span>
            <br />
          </motion.h1>
          <h2 className="text-xl lg:text-4xl mb-6">
            <TypingEffect />
          </h2>
          <div className="max-w-[500px] mb-9 text-white/80 w">
            <TextShadingView>
              I excel at crafting elegant digital experiences and I am
              proficient in verious programming languages and thechnology.
            </TextShadingView>
          </div>

          <motion.div
            variants={awardVariants}
            initial="initial"
            whileInView="animate"
            className="flex flex-col xl:flex-row items-center gap-8"
          >
            {/* CV button */}
            <CVBtn />

            {/* Social media */}
            <motion.div variants={awardVariants} className="mb-8 xl:mb-0" >
              <Social
                containerStyle="flex gap-6"
                iconStyle="w-9 h-9 border-[1.5px] border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500 cursor-none"
              />
            </motion.div>
          </motion.div>
        </div>
        {/* Photo */}
        <div className="order-1 xl:order-none mb-8 xl:mb-0 xl:mr-20">
          <Photo />
        </div>
      </div>
    </div>
  );
};

export default Home;
