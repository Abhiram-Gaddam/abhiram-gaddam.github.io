


import React, { useState } from "react";
import { ExternalLink, Github, BrainCircuit, Code, Layers } from "lucide-react";
import { motion } from "framer-motion";

function Projects() {
  const [activeTab, setActiveTab] = useState("React");

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Tab navigation
  const tabs = [
    { name: "React", icon: <Code /> },
    { name: "Machine Learning", icon: <BrainCircuit /> },
    { name: "Other", icon: <Layers /> },
  ];

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-6 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center gap-2 md:px-4 md:py-2 px-2 py-1 rounded-lg transition-all ${

                activeTab === tab.name
                  ? "bg-blue-500 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeTab === "React" &&
            reactProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
          {activeTab === "Machine Learning" &&
            MLprojects.map((project, index) => <ProjectCard key={index} project={project} />)}
          {activeTab === "Other" &&
            otherProjects.map((project, index) => <ProjectCard key={index} project={project} />)}
        </div>
      </div>
    </div>
  );
}

// Reusable Project Card Component
export const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          <a href={project.demo} rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center" target="_blank">
            Live Demo <ExternalLink size={16} className="ml-1" />
          </a>
          <a href={project.github} rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700 flex items-center" target="_blank">
            Code <Github size={16} className="ml-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// React Projects Data
const reactProjects = [
  {
    title: "Restaurant App",
    description: "Order food and book restaurant tables in real-time with ease!",
    image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["React", "API", "CSS"],
    demo: "https://restaurant-mgt.netlify.app",
    github: "https://github.com/Abhiram-Gaddam/Restaurant-Mgt"
  },

  {
    title: "E-commerce Dashboard",
    description: "A responsive dashboard for managing online store inventory.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "JavaScript", "Tailwind"],
    demo: "https://e-commerce-bva.netlify.app/",
    github: "https://github.com/Abhiram-Gaddam/E-Commerce"
  },
  

  {
    
      title: "Movie Search App",
      description: "A movie search app that allows users to look up movie titles, view posters, ratings, and basic details using the OMDB API.",
      image: "https://plus.unsplash.com/premium_photo-1710961232986-36cead00da3c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWVzfGVufDB8fDB8fHww     ",
      technologies: ["React", "OMDB API", "Tailwind"],
      demo: "https://github.com/Abhiram-Gaddam/Projects/tree/main/movie-databae", // Replace with your live link
      github: "https://github.com/Abhiram-Gaddam/Projects/tree/main/movie-databae" // Replace with your actual repo
    
    
  }
];

// Machine Learning Projects Data
const MLprojects = [
  {
    title: "Credit Card Fraud Detection",
    description: "Detect fraudulent transactions using ML models.",
    image: "https://plus.unsplash.com/premium_photo-1682310138171-14794943c4c5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNyZWRpdCUyMGNhcmQlMjBmcmF1ZHxlbnwwfHwwfHx8MA%3D%3D",
    technologies: ["Isolation Forest", "ADASYN", "XGBoost"],
    demo: "https://github.com/Abhiram-Gaddam/Credit-card-Fraud-Detection-",
    github: "https://github.com/Abhiram-Gaddam/Credit-card-Fraud-Detection-",
  },
  {
    title: "Chat With Your Document",
    description: "An artificial intelligence solution that simplifies textual content for improved understanding ",
    image: "https://cdn.leonardo.ai/users/8449803c-7c7e-44f3-86d8-50beb4bbf121/generations/8eb386f2-5fa3-480d-ba2b-5f153d32a352/Leonardo_Lightning_XL_i_a_realistic_way_create_a_robo_reading_1.jpg",
    technologies: ["Openrouter", "Node", "Gemini"],
    demo: "https://github.com/Abhiram-Gaddam/Chat_with_document",
    github: "https://github.com/Abhiram-Gaddam/Chat_with_document"
  },
  {
    title: "Movie Recommendation System",
    description: "A system that recommends movies based on user preferences.",
    technologies: ["React", "OMDB API","TD-IDF","Cosine Similarity"],
    image : "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fG1vdmllJTIwcmV2aWV3fGVufDB8fDB8fHww",
    demo:"https://github.com/Abhiram-Gaddam/Projects/tree/main/Movie_Recomm",
    github: "https://github.com/Abhiram-Gaddam/Projects/tree/main/Movie_Recomm"
},
  {
    title: "Multilingual Voice-to-Image Generator",
    description: "Convert voice input in multiple languages into AI-generated images.",
    image: "https://cdn.leonardo.ai/users/8449803c-7c7e-44f3-86d8-50beb4bbf121/generations/ae7cbcfc-07ab-48fb-8d9c-4a572a6c3225/Leonardo_Lightning_XL_image_generation_images_0.jpg",
    technologies: ["Speech Recognition", "NLP", "Stable Diffusion"],
    demo: "https://github.com/Abhiram-Gaddam/Projects/tree/main/Voice%20to%20image",
    github: "https://github.com/Abhiram-Gaddam/Projects/tree/main/Voice%20to%20image"
},


];

// Other Projects Data
const otherProjects = [
  {
    title: "Portfolio Website",
    description: "Personal portfolio website built with React and Tailwind CSS.",
    technologies: ["React", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1501959181532-7d2a3c064642?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydGZvbGlvJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D",
    demo:"abhiram-gaddam.github.io",
    github: "https://github.com/Abhiram-Gaddam"
  },
  {
    title: "Recipe Finder",
    description: "Web app to search and save favorite recipes using a public API.",
    technologies: ["JavaScript", "API", "LocalStorage"],
    image:"https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVjaXBlJTIwZmluZGVyfGVufDB8fDB8fHww",
    demo:"#",
    github: "https://github.com/Abhiram-Gaddam"
  },
 
];

export default Projects;
