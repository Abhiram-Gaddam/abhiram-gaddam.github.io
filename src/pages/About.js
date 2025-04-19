import React from 'react';
import { Code, Layout, BrainCircuit , Server, BookOpen ,TrendingUp ,SquareDashedBottomCode } from 'lucide-react';
import Abhiram from '/Users/saikrishna/Documents/Abhiram/prac1/src/components/images/Abhiram.jpg';

function About() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        {/* Profile Section */}
        <div className="max-w-4xl mx-auto mb-20">
  <h1 className="text-4xl font-bold mb-8">About Me</h1>
  <div className="bg-white rounded-lg shadow-lg p-8">
    {/* <div className='flex justify-center'  >
      <div className='border-white rounded-full shadow-md border w-1/5 ' > <img  className='rounded-full text-center object-cover max-h-60 ' src={Abhiram} alt={"Abhiram"} ></img> </div> 
    </div> */}
    <p className="text-gray-600 mb-6">
      
      <h1 className='font-bold text-xl font-serif '> <p className='font-medium' > Hello! I'm </p>  Gaddam Bhanu Venkata Abhiram</h1>
      A third-year Computer Science and Business Systems student at 
      R.V.R. & J.C. College of Engineering. My journey into technology began with a fascination for 
      how software works and has grown into a passion for building impactful, user-friendly solutions.
    </p>
    <p className="text-gray-600 mb-6">
      I specialize in frontend development, leveraging modern tools like React to design intuitive and visually appealing interfaces. 
      My projects range from e-commerce websites to machine learning systems like credit card fraud detection. 
      I enjoy exploring new technologies and blending creativity with problem-solving to deliver functional and aesthetically pleasing applications.
    </p>
    <p className="text-gray-600">
      Beyond coding, I am constantly pushing my boundaries by participating in hackathons and working on collaborative projects. 
      My goal is to make technology accessible and valuable to everyone while continuing to grow as a developer.
    </p>
  </div>
</div>


        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-blue-100 p-4 rounded-lg inline-block mb-4">
                  {skill.icon}
                </div>
                <h3 className="font-semibold mb-2">{skill.name}</h3>
                <p className="text-sm text-gray-600">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Experience */}
        <div className="max-w-4xl mx-auto">
  <h2 className="text-3xl font-bold mb-8">Education & Experience</h2>
  <div className="bg-white rounded-lg shadow-lg p-8">
    {/* Education Section */}
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Education</h3>
      <div className="flex items-start">
        <div className="bg-blue-100 p-2 rounded-lg mr-4">
          <BookOpen className="text-blue-600" size={24} />
        </div>
        <div>
          <h4 className="font-semibold">Bachelor of Technology</h4>
          <p className="text-gray-600">R.V.R. & J.C. College of Engineering</p>
          <p className="text-sm text-gray-500">Computer Science and Business Systems | 2022 - Present</p>
        </div>
      </div>
    </div>

    {/* Experience Section */}
    <div>
      <h3 className="text-xl font-bold mb-4">Experience</h3>
      <div className="space-y-6">
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <Code className="text-blue-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold">Gen-Ai Projects</h4>
            <p className="text-gray-600">Built a multi-language voice-to-image system</p>
            <p className="text-sm text-gray-500">Jan 2025</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <SquareDashedBottomCode className="text-blue-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold">Web Development Projects</h4>
            <p className="text-gray-600">E-commerce website, Portfolio, Recipe Finder App..etc</p>
            <p className="text-sm text-gray-500">2024 - Present</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <TrendingUp className="text-blue-600" size={24} />
          </div>
          <div>
            <h4 className="font-semibold">Machine Learning Projects</h4>
            <p className="text-gray-600">Credit Card Fraud Detection System, Real-World Object Detection..etc</p>
            <p className="text-sm text-gray-500">2024</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

const skills = [
  {
    name: "Frontend Development",
    description: "React, JavaScript ",
    icon: <Code className="text-blue-600" size={24} />
  },
  {
    name: "UI/UX Design",
    description: "Responsive Design, User Experience",
    icon: <Layout className="text-blue-600" size={24} />
  },
  {
    name: "Machine Learning",
    description: "Gen AI, Statistics ",
    icon: <BrainCircuit className="text-blue-600" size={24} />
  },
  {
    name: "Backend Integration",
    description: " Node.js",
    icon: <Server className="text-blue-600" size={24} />
  }
];

export default About;