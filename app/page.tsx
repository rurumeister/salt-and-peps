"use client";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HomeMasonry } from "./components/Masonry";
import { MainSidebar } from "./components/Sidebars";
import { albums } from "./lists";
const Footer = dynamic(() => import("./components/Footer"));
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const filteredImages =
    selectedCategory === "All"
      ? albums
      : albums.filter((image) => image.type === selectedCategory.toLowerCase());
  useEffect(() => {
    console.log("isSidebarOpen: ", isSidebarOpen);
  }, [isSidebarOpen]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
      <div
        className={`sidebar-container ${
          isSidebarOpen ? "open" : "closed"
        } lg:flex z-10 w-full items-center justify-between font-mono text-sm`}
      >
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={200}
            height={100}
            className="block lg:hidden"
          />
        </div>
        <div className="absolute right-5 top-4 mobile-menu-icon lg:hidden text-xl cursor-pointer self-center">
          <Hamburger
            toggled={isSidebarOpen}
            toggle={toggleSidebar}
            size={20}
            direction="right"
          />
        </div>
        <MainSidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <HomeMasonry filteredImages={filteredImages} />
      </div>
      <Footer />
    </main>
  );
}
