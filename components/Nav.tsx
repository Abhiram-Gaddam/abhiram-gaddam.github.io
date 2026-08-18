import Link from "next/link";
import DoodleHero from "./illustrations/DoodleHero";
import { useEffect, useState } from "react";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set the initial value
    setIsMobile(window.innerWidth <= breakpoint);

    // Update the value whenever the window is resized
    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }

    window.addEventListener("resize", handleResize);
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}  

export default function Nav() {
    let isMobile = useIsMobile()
  return (
    <header className="sticky top-0 z-30 border-b-2 border-line bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/" className="font-display text-2xl text-paper">
         Gaddam Abhiram. <span className="text-copper-bright">.</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted">
          {/* <Link href="/#projects" className="transition-colors hover:text-paper">
            Work
          </Link>
          <Link href="/#experience" className="transition-colors hover:text-paper">
            Experience
          </Link> */}
          <Link href="/about" className="transition-colors hover:text-copper-bright md:mr-0 mr-6">
            About me →
          </Link>
        </nav>
        <div className="absolute right-0 -top-1 z-20 pointer-events-none">
           {isMobile ?  <DoodleHero size={80} /> :  <DoodleHero size={120} /> }
           
          </div>
      </div>
    </header>
  );
}
