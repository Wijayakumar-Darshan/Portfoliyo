"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { animate, motion } from "framer-motion";
import TextShadingView from "../animations/TextShadingView";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    value: "+94 764545369",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    value: "darshanwijayakumar0@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    value: "No:218/14, Mahawatta, Opatha, Kotugoda, Sri Lanka",
  },
];

const Contact = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  /* const handleInputChange = (e) => {
    const { name, value } = e.target;

    const nameRegex = /^[A-Za-z.]*$/;

    if ((name === "firstName" || name === "lastName") && !nameRegex.test(value)) {
      setErrors({ ...errors, [name]: "Only letters and dots are allowed" });
      setTimeout(() => {
        setErrors({...errors, [name]: "" });
      }, 2000); // Delay of 500ms
      return;
    }
    else{
      setErrors({...errors, [name]: "" });
    }

    setFormData({...formData, [name]: value });
  }; */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Regex for validations
    const nameRegex = /^[A-Za-z.\s]*$/; // Only letters and dots
    const emailRegex = /^[A-Za-z0-9.@]*$/;
    const phoneRegex = /^\+?[0-9]*$/;
    const subjectRegex = /^[A-Za-z0-9.\s]*$/;
  
    let errorMsg = "";
  
    // Name Validation
    if ((name === "firstName" || name === "lastName") && !nameRegex.test(value)) {
      errorMsg = "Only letters, spaces and dots are allowed";
    }
  
    // Email Validation
    if (name === "email"){
      if ((value.match(/@/g) || []).length > 1) {
        errorMsg = "Only one '@' is allowed";
      }
      else if(!emailRegex.test(value)) {
        errorMsg = "Only letters, numbers and @ are allowed";
      }
    }

    // Subject Validation
    if (name === "subject" && !subjectRegex.test(value)) {
      errorMsg = "Only letters, numbers, spaces and dots are allowed";
    }

    // Phone Number Validation
    if (name === "phone"){
      if(value.length > 20){
        errorMsg = "Phone number should not exceed 20 characters";
      }
      else if(!phoneRegex.test(value)) {
        errorMsg = "Only numbers allowed";
      }
    }
  
    // Set error message if there's a validation error
    if (errorMsg) {
      setErrors({ ...errors, [name]: errorMsg });
  
      // Remove error message after 2 seconds
      setTimeout(() => {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }, 2000);
      return;
    }
  
    // Clear errors and update form data
    setErrors({ ...errors, [name]: "" });
    setFormData({ ...formData, [name]: value });
  };
  
  const validate = () => {
    let newErrors = {};
    let sanitizedFormData = {};
  
    // Regex patterns
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\+?[0-9]{7,20}$/;
    const nameRegex = /^[A-Za-z. ]*$/; // Only letters, dots, and spaces
    
    for (const field in formData) {
      let value = formData[field].trim(); // Trim spaces
  
      // Sanitize all fields (prevent HTML injection)
      value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
      // Validation checks
      if (!value) {
        newErrors[field] = "This field is required";
      } 
  
      // Name validation
      if ((field === "firstName" || field === "lastName") && value.length > 0 && !nameRegex.test(value)) {
        newErrors[field] = "Only letters, dots, and spaces are allowed";
      }
  
      // Email validation
      if (field === "email" && value.length > 0 && !emailRegex.test(value)) {
        newErrors[field] = "Invalid email format";
      }
  
      // Phone validation
      if (field === "phone" && value.length > 0 && !phoneRegex.test(value)) {
        newErrors[field] = "Invalid phone number (only digits, 7-20 characters)";
      }
  
      // Store sanitized value
      sanitizedFormData[field] = value;
    }
  
    setErrors(newErrors);

    if (Object.keys(newErrors).length !== 0) {
      // Remove error message after 2 seconds
      setTimeout(() => {
        setErrors({});
      }, 6000);
      return;
    }
  
    // Return sanitized data if no errors, otherwise return null
    return Object.keys(newErrors).length === 0 ? sanitizedFormData : null;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const validatedData = validate();

    if (validatedData) {

      try {

        const response = await fetch('/api/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
          },
          body: JSON.stringify(validatedData),
        })

        if (response.ok) {

          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
  
          toast.success("Message sent", {
            className: "custom-toast",
            position: 'top-center',
            autoClose: 2000,
          });

        } else {
          throw new Error('Failed to send message');
        }
      } catch (error) {
        //console.error('Error:', error);
        toast.error("Failed to send message. Please try again later.", {
          className: "custom-toast",
          position: 'top-left',
          autoClose: 2500,
        });
      }

    }
    else{
      //console.log("Form validation failed. Please check the errors.");
      toast.error("Form validation failed. Please check the errors", {
        className: "custom-toast",
        position: 'top-left',
        autoClose: 2500,
      });
      
    }
  };

  const itemVariantLeft = {
    initial: {
      opacity: 0,
      x: -100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const itemVariantRight = {
    initial: {
      opacity: 0,
      x: 100,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  }

  const viewMargin = "-20% 0px -25% 0px";

  return (
    <div className="container max-auto lg:pt-[70px] mb-8 lg:mb-0">
      <div className="flex flex-col lg:flex-row gap-[30px]">
        <div className="order-1 lg:order-none overflow-hidden">
          {/* Form */}
          <form className="flex flex-col gap-2 p-6 bg-[#27272c50] rounded-xl">
            <motion.h3
              initial={{
                opacity: 0,
                x: -100,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.5 },
              }}
              viewport={{
                margin: "-10% 0px -25% 0px",
              }}
              className="text-3xl text-accent pb-4"
            >
              Let&apos;s work together
            </motion.h3>
            <p className="text-white/60 text-sm">
              <TextShadingView>
                I&apos;m here to help you achieve your goals. Let&apos;s connect and create
                a unique digital experience together.
              </TextShadingView>
            </p>
            <motion.div
              className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <motion.div 
                variants={itemVariantLeft} 
                initial='initial'
                whileInView='animate'
                viewport={{
                  margin: viewMargin
                }}
                className={`flex flex-col ${!(errors?.firstName) && 'lg:pb-4'}`}
              >
                <Input type="firstName" placeholder="First Name" name="firstName" onChange={handleInputChange} value={formData.firstName} />
                {errors.firstName && <p className="text-red-400 text-xs">{errors.firstName}</p>}
              </motion.div>
              <motion.div 
                variants={itemVariantRight}
                initial='initial'
                whileInView='animate'
                viewport={{
                  margin: viewMargin
                }}
                className={`flex flex-col ${!(errors?.lastName) && 'lg:pb-4'}`}
              >
                <Input type="lastName" placeholder="Last Name" name="lastName" onChange={handleInputChange} value={formData.lastName} />
                {errors.lastName && <p className="text-red-400 text-xs">{errors.lastName}</p>}
              </motion.div>
              <motion.div 
                variants={itemVariantLeft}
                initial='initial'
                whileInView='animate'
                viewport={{
                  margin: viewMargin
                }}
                className={`flex flex-col ${!(errors?.email) && 'lg:pb-4'}`}
              >
                <Input type="email" placeholder="Email" name="email" onChange={handleInputChange} value={formData.email} />
                {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
              </motion.div>
              <motion.div 
                variants={itemVariantRight}
                initial='initial'
                whileInView='animate'
                viewport={{
                  margin: viewMargin
                }}
                className={`flex flex-col pb-2 ${!(errors?.phone) && 'lg:pb-6'}`}
              >
                <Input type="phone" placeholder="Phone" name="phone" onChange={handleInputChange} value={formData.phone} />
                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
              </motion.div>
            </motion.div>
            <motion.div 
              variants={itemVariantLeft}
              initial='initial'
              whileInView='animate'
              viewport={{
                margin: viewMargin
              }}
              className={`flex flex-col pb-2 ${!(errors?.subject) && 'lg:pb-6'}`}
            >
              <Input type="subject" placeholder="Subject" className="w-full" name="subject" onChange={handleInputChange} value={formData.subject} />
              {errors.subject && <p className="text-red-400 text-xs">{errors.subject}</p>}
            </motion.div>
            <motion.div
              variants={itemVariantRight} 
              initial='initial'
              whileInView='animate'
              viewport={{
                margin: viewMargin
              }}
              className="flex flex-col lg:pb-2"
            >
              <Textarea
                className="h-[100px]"
                placeholder="Type your message here" 
                name="message" 
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <p className="text-red-400 text-xs">{errors.message}</p>}
            </motion.div>
            <motion.div
              initial={{
                opacity: 0,
                y: 50,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { 
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 400,
                  damping: 10,
                 },
              }}
              viewport={{
                margin: "-10% 0px -10% 0px",
              }}
              className="flex items-center justify-center lg:justify-start"
            >
              <Button 
                type="submit" 
                className="w-full md:max-w-36 text-sm h-[30px] mt-2"
                onClick={handleSubmit}
              >
                Send message
              </Button>
            </motion.div>
          </form>
        </div>
        {/* Info */}
        <div className="flex-1 flex items-center lg:justify-end order-2 lg:order-none mt-4 md:mt-0 mb-8 lg:mb-0 lg:pr-10 lg:pl-4">
          <motion.ul
            /* variants={{
              initial: {},
              animate: { staggerChildren: 0.2}
            }}
            initial='initial'
            whileInView='animate'
            viewport={{
              margin: "-20% 0px -20% 0px",
            }} */
            className="flex flex-col gap-10 w-full"
          >
            {info.map((item, index) => {
              return (
                <motion.li 
                  variants={{
                    initial: {
                      opacity: 0,
                      y: -50,
                    },
                    animate: {
                      opacity: 1,
                      y: 0,
                      transition: { 
                        duration: 0.5,
                        //delay: index * 0.2
                        staggerChildren: 0.2
                      },
                    },
                  }}
                  initial='initial'
                  whileInView='animate'
                  viewport={{
                    margin: "-20% 0px -20% 0px",
                  }}
                  key={index} 
                  className="flex items-center gap-6"
                >
                  <div className="min-w-[52px] h-[52px] lg:min-w-[60px] lg:h-[60px] bg-[#27272c60] text-accent rounded-md flex items-center justify-center">
                    <div className="text-[25px]">{item.icon}</div>
                  </div>
                  <motion.div 
                    variants={{
                      initial: {
                        opacity: 0,
                        x: -50,
                      },
                      animate: {
                        opacity: 1,
                        x: 0,
                        transition: { 
                          delay: 0.4,
                          duration: 0.3,
                        },
                      },
                    }}
                    className="flex flex-col"
                  >
                    <p className="text-white/60 text-sm">{item.title}</p>
                    <h3 className="text-base text-ellipsis line-clamp-2">
                      {item.value}
                    </h3>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
