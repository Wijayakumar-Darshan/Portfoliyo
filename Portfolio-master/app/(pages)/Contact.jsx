"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import TextShadingView from "../animations/TextShadingView";

const contactInfo = [
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Regex patterns
    const nameRegex = /^[A-Za-z.\s]*$/;
    const emailRegex = /^[A-Za-z0-9.@]*$/;
    const phoneRegex = /^\+?[0-9]*$/;
    const subjectRegex = /^[A-Za-z0-9.\s]*$/;
  
    let errorMsg = "";
  
    // Validation logic
    if ((name === "firstName" || name === "lastName") && !nameRegex.test(value)) {
      errorMsg = "Only letters, spaces and dots allowed";
    }
    else if (name === "email") {
      if ((value.match(/@/g) || []).length > 1) {
        errorMsg = "Only one '@' allowed";
      } else if (!emailRegex.test(value)) {
        errorMsg = "Invalid characters";
      }
    }
    else if (name === "phone") {
      if (value.length > 20) {
        errorMsg = "Max 20 characters";
      } else if (!phoneRegex.test(value)) {
        errorMsg = "Only numbers allowed";
      }
    }
    else if (name === "subject" && !subjectRegex.test(value)) {
      errorMsg = "Invalid characters";
    }
  
    // Update errors
    if (errorMsg) {
      setErrors({ ...errors, [name]: errorMsg });
      setTimeout(() => setErrors(prev => ({ ...prev, [name]: "" })), 2000);
      return;
    }
  
    setErrors({ ...errors, [name]: "" });
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'message'];
    
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors", { position: 'top-center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_SECRET_KEY,
        },
        body: JSON.stringify({
          ...formData,
          // Sanitize inputs
          message: formData.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
        }),
      });

      if (response.ok) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        toast.success("Message sent successfully!");
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto lg:pt-[70px] mb-8 lg:mb-0">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact Form */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1"
        >
          <form className="flex flex-col gap-4 p-6 bg-[#27272c50] rounded-xl">
            <motion.h3 variants={fadeInUp} className="text-3xl text-accent">
              Let's work together
            </motion.h3>
            
            <div className="text-white/60 text-sm">
              <TextShadingView as="span">
                I'm here to help you achieve your goals. Let's connect and create
                a unique digital experience together.
              </TextShadingView>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['firstName', 'lastName', 'email', 'phone'].map((field, i) => (
                <motion.div
                  key={field}
                  variants={i % 2 === 0 ? slideInLeft : slideInRight}
                  className="flex flex-col"
                >
                  <Input
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                    value={formData[field]}
                    onChange={handleInputChange}
                  />
                  {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                </motion.div>
              ))}
            </div>

            <motion.div variants={slideInLeft} className="flex flex-col">
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
            </motion.div>

            <motion.div variants={slideInRight} className="flex flex-col">
              <Textarea
                className="min-h-[100px]"
                placeholder="Your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <Button
                type="submit"
                className="w-full md:w-auto min-w-36"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </motion.div>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex-1 lg:pl-8"
        >
          <motion.ul className="flex flex-col gap-8">
            {contactInfo.map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                custom={index}
                className="flex gap-4 items-center"
              >
                <div className="min-w-[52px] h-[52px] bg-[#27272c60] text-accent rounded-md flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/60 text-sm">{item.title}</p>
                  <p className="text-base line-clamp-2">{item.value}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;