// import React, { useState ,useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Code ,Menu } from 'lucide-react';
// import { motion ,useAnimation ,useScroll } from "framer-motion";

// function Navbar() {
//   const [toggle,setToggle]=useState(true)
//   const handleToggle=()=>{
//     setToggle((prev)=>!prev)
//   }
//   const closeMenu = () => {
//     setToggle(true);
//   };
//   const controls = useAnimation();
//   const { scrollY } = useScroll();

//   useEffect(() => {
//     const unsubscribe = scrollY.onChange((latest) => {
//       if (latest > 50) {
//         controls.start({ width: "60%", left: "20%" });
//       } else {
//         controls.start({ width: "90%", left: "0%" });
//       }
//     });

//     return () => unsubscribe();
//   }, [scrollY, controls]);

//   return ( <> 
//     <motion.nav 
//     className="bg-white z-50 fixed top-5 ml-5 md:ml-8 left-0 rounded-full shadow-md h-16"
//       initial={{ width: "90%", left: "0%" }}
//       animate={controls}
//       transition={{ duration: 0.3, ease: "easeOut" }}
//     > <div  >
//       <div className="max-w-screen-xl mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           <NavLink to="/" className="flex items-center space-x-2">
//             <Code className="text-blue-600" size={24} />
//             <span className="lg:text-xl text-md  pop font-bold">Gaddam Abhiram</span>
//           </NavLink>
//           <div className="hidden bg-white md:flex space-x-8">


//             {/* Desktop View and Tab View */}


//             <NavLink 
//               to="/" 
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative  duration-300 ease-in-out ${isActive ? 'text-blue-600 underline ' : 'text-gray-600 hover:text-blue-600 '}`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink 
//               to="/about" 
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative    duration-300 ease-in-out ${isActive ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-600'}`
//               }
//             >
//               About
//             </NavLink>
//             <NavLink 
//               to="/projects" 
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative   duration-300 ease-in-out ${isActive ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-600'}`
//               }
//             >
//               Projects
//             </NavLink>
//             <NavLink 
//               to="/contact" 
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative duration-300 ease-in-out ${isActive ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-600'}`
//               }
//             >
//               Contact
//             </NavLink>
//           </div>
//          < button onClick={handleToggle} className='  sm:hidden  text-blue-500' > <Menu></Menu> </button>
         
//         </div>
       
       
       
//         {/* Mobile View  */}


//         <div  onClick={closeMenu} className = {(toggle) ? `hidden` : `rounded-md  sm:hidden bg-white flex flex-col gap-2 items-center`} > 
//           <div className=' bg-white flex flex-col gap-2 items-center' > 
//            <NavLink 
//               to="/" 
//               // onClick={closeMenu}
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative bg-white  text-center rounded-md border-2 border-white shadow  w-full   duration-300 ease-in-out ${isActive ? 'text-blue-600 underline ' : 'text-gray-600 hover:text-blue-600 '}`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink 
//               to="/about" 
//               // onClick={closeMenu}
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative bg-white   text-center rounded-md border-2 border-white shadow  w-full   duration-300 ease-in-out ${isActive ? 'text-blue-600 underline ' : 'text-gray-600 hover:text-blue-600 '}`
//               }
//             >
//               About
//             </NavLink>
//             <NavLink 
//               to="/projects" 
//               // onClick={closeMenu}
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative bg-white font-bold  text-center rounded-md border-2 border-white shadow  w-full   duration-300 ease-in-out ${isActive ? 'text-blue-600 underline ' : 'text-gray-600 hover:text-blue-600 '}`
//               }
//             >
//               Projects
//             </NavLink>
//             <NavLink 
//               to="/contact" 
//               // onClick={closeMenu}
//               className={({ isActive }) => 
//                 `hover:text-blue-600 transition-all relative bg-white font-bold text-center rounded-md border-2 border-white shadow  w-full   duration-300 ease-in-out ${isActive ? 'text-blue-600 underline ' : 'text-gray-600 hover:text-blue-600 '}`
//               }
//             >
//               Contact
//             </NavLink>
            
//              </div>
        
//              </div> </div>
//       </div> </motion.nav> 
//     </>
//   );
// }

// export default Navbar;

import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Code, Menu } from 'lucide-react';
import { motion, useAnimation, useScroll } from "framer-motion";

function Navbar() {
  const [toggle, setToggle] = useState(true);
  const menuRef = useRef(null);
  const iconRef = useRef(null); // reference to Menu icon
  const controls = useAnimation();
  const { scrollY } = useScroll();

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const closeMenu = () => {
    setToggle(true);
  };

  // Animate navbar width on scroll
  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 50) {
        controls.start({ width: "60%", left: "20%" });
      } else {
        controls.start({ width: "90%", left: "0%" });
      }

      // Close the menu when scrolling
      closeMenu();
    });

    return () => unsubscribe();
  }, [scrollY, controls]);

  // Detect outside click to close menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    }

    if (!toggle) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggle]);

  return (
    <>
      <motion.nav
        className="bg-white z-50 fixed ml-5 md:ml-8 top-5 left-0 rounded-full shadow-md h-16"
        initial={{ width: "90%", left: "0%" }}
        animate={controls}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div>
          <div className="max-w-screen-xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <NavLink to="/" className="flex items-center space-x-2">
                <Code className="text-blue-600" size={24} />
                <span className="lg:text-xl text-md pop font-bold">Gaddam Abhiram</span>
              </NavLink>

              {/* Desktop Menu */}
              <div className="hidden bg-white md:flex space-x-8">
                {["/", "/about", "/projects", "/contact"].map((path, i) => {
                  const labels = ["Home", "About", "Projects", "Contact"];
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      className={({ isActive }) =>
                        `hover:text-blue-600 transition-all relative duration-300 ease-in-out ${isActive ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-600'}`
                      }
                    >
                      {labels[i]}
                    </NavLink>
                  );
                })}
              </div>

              {/* Mobile Menu Icon */}
              <button ref={iconRef} onClick={handleToggle} className="sm:hidden text-blue-500">
                <Menu />
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
              ref={menuRef}
              className={toggle ? `hidden` : `rounded-md sm:hidden bg-white flex flex-col gap-2 items-center mt-2`}
            >
              <div className="bg-white flex flex-col gap-2 items-center w-full">
                {["/", "/about", "/projects", "/contact"].map((path, i) => {
                  const labels = ["Home", "About", "Projects", "Contact"];
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `hover:text-blue-600 transition-all relative bg-white text-center rounded-md border-2 border-white shadow w-full duration-300 ease-in-out ${isActive ? 'text-blue-600 underline' : 'text-gray-600 hover:text-blue-600'}`
                      }
                    >
                      {labels[i]}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
