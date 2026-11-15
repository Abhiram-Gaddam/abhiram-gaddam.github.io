import type { Metadata } from "next";
import AboutClient from "@/components/aboutPage";

export const metadata: Metadata = {
  title: "About Abhiram Gaddam | Full-Stack & GenAI Developer",
  description:
    "About Abhiram Gaddam (Gaddam Abhiram):Personal Journey, background, skills, freelance work and the projects he's shipped.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutClient />;
}