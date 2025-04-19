import React from 'react';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import '/Users/saikrishna/Documents/Abhiram/prac1/src/App.css';
import hero from "/Users/saikrishna/Documents/Abhiram/prac1/src/components/images/hero.png";
import { motion } from "framer-motion"
import abhi from "/Users/saikrishna/Documents/Abhiram/prac1/src/components/images/Abhiram.jpg"


function Home() {
  const [text, setText] = useState("");
  const words = ["React Developer","Freelancer", "Machine Learning Engineer"];
    
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    
  
    useEffect(() => {
      const currentWord = words[wordIndex];
      const typingSpeed = isDeleting ? 60 : 100;
  
      const timeout = setTimeout(() => {
        setCharIndex((prev) =>
          isDeleting ? prev - 1 : prev + 1
        );
        setText(currentWord.substring(0, charIndex));
  
        // Start deleting after full word is typed
        if (!isDeleting && charIndex === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
  
        // Move to next word after deleting
        if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, typingSpeed);
  
      return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex, words]);


  return (
      <>

    <div>
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-white to-blue-300 text-white">
        <div className="container mx-auto flex justify-between px-6 py-32">
          <div className="max-w-3xl ml-20">
            <h1 className=" w-fit pop px-2  rounded-md bg-amber-400 mt-20  mb-6 leading-tight">
             Gaddam Abhiram
            </h1>
            <div>
            <p className="text-4xl bold mb-8 text-blue-300">
                <div className=" mt-6 typewriter">
              <span className='text-gray-900 pop font-bold'  >I’m <span className='text-amber-500' > {text}</span></span>
            <span className="cursor">|</span>
          </div> 
            </p>

            <p className="text-gray-600 pop text-lg mb-8">
              I am a passionate developer with a knack for creating dynamic and responsive web applications. I love to learn new technologies and improve my skills.
            </p>

            </div>
            <div className="flex mt-10 gap-4">
              <Link 
                to="/projects" 
                className=" text-yellow-700 bg-yellow-50 px-6 py-3 rounded-lg font-semibold hover:bg-amber-500 hover:border-white hover:border-2 hover:text-white transition-colors inline-flex items-center"
              >
                View My Work <ArrowRight size={20} className="ml-2" />
              </Link>
              <Link 
                to="/contact" 
                className="border-2 border-white text-yellow-600 px-6 py-3 rounded-lg font-semibold hover:bg-orange-200 hover:border-white hover:text-yellow-600 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>
          <div className=' hidden md:block   ' > <img src={hero} alt={"abhiram"}  ></img> </div>
        </div>
      </header>

      {/* Featured Section */}
      <section className="bg-gradient-to-r  py-20">
        <div className="container mx-auto px-6">
          <motion.h2 
          className="text-3xl lg:w-2/5 md:h-3/5 w-5/6 -ml-12  heading md:-ml-20 lg:py-4  py-2 md:py-1 bg-blue-300 font-bold flex justify-between mb-12 text-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          > <span className='text-black ml-10 pop font-light' >  Want to Know More </span><span className='bg-white border-0 scale-150 -mr-4 rotate-45  h-5 p-5 '  >  </span> </motion.h2>
          {/* <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
              alt="Featured Project"
              className="w-full h-64 object-cover"
            />
            <div className="p-8">
              <h3 className="text-2xl font-bold  mb-4">E-commerce Dashboard</h3>
              <p className="text-gray-600 mb-6">
                A comprehensive dashboard solution for managing online store inventory .
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  JavaScript
                </span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Tailwind
                </span>
              </div>
              <Link 
                to="/projects" 
                className="text-blue-600 font-semibold hover:text-blue-700 inline-flex items-center"
              >
                View All Projects <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div> */}
          <div className=' grid md:grid-cols-2  grid-cols-1 place-items-center ' > 

          <motion.div 
          className="wave-ball  h-60 w-60 "
          animate={{ y: [0, 10, 0]  }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
>       
            <div className="  label">  <img className='rounded-full ' src={abhi} alt='Abhiram' />    </div>
          </motion.div>          
          
            < motion.div initial={{ opacity: 0, x: 50 }}
                                      
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1.0  }}
          viewport={{ once: true, amount: 0.2 }} className=' bg-blue-300 pl-5 text-center rounded-tr-lg flex justify-center text-wrap shrink items-center md:h-2/5 h-full md:py-0 py-3 mt-10 rounded-bl-full  rounded-tl-full ' > So! This is me Abhiram a Junior Front end Developer making mistakes while creating Magic.I aim to build applications that not only meet user needs but also push the boundaries of what's possible.
          </motion.div>

          < motion.div initial={{ opacity: 0, x: 0 }}
                                      
            whileInView={{ opacity: 1, x: 50 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1.3  }}
            viewport={{ once: true, amount: 0.2 }} className=' bg-blue-300 pl-5 text-center text-wrap shrink rounded-l-lg flex justify-center items-center md:h-2/5 h-3/6  md:py-0 py-2 mt-40 rounded-br-full  rounded-tr-full ' > On this website, you'll find a collection of projects that showcase my skills and creativity. Each project represents my journey, growth, and the dedication I put into making meaningful contributions to the tech community
            </motion.div>
           </div>

           <div className=' flex flex-col mt-16  justify-center items-center ' >
           <p className='lastfont text-4xl' >Want to Work With me  </p>
           <p className='text-gray-500 p-4 text-wrap px-6 text-center' >I'm always excited to collaborate, learn, and grow. Feel free to explore my work, and don't hesitate to reach out if you're interested in connecting or have a project in mind!</p>
           <Link 
                to="/contact" 
                className=" bg-blue-300 mt-7  text-yellow-500 px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 hover:text-amber-400 "
              >
                👍🏼
              </Link>
        </div>


        </div>

        
      </section>
    </div>
    </>
  );
}

export default Home;