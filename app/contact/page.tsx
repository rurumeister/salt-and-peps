"use client";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OnlyAllSidebar } from "../components/Sidebars";
const Footer = dynamic(() => import("../components/Footer"));
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  console.log(pathname);
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
        <div
          id="sidebar"
          className="min-h-screen self-start flex flex-col justify-between min-w-[300px] sticky top-0"
        >
          <div>
            <OnlyAllSidebar
              isSidebarOpen={isSidebarOpen}
              currentPage={pathname}
            />
          </div>
        </div>
        <div className="pl-5 min-h-screen w-full">
          This Page is for contacting me!!!
        </div>
      </div>
      <Footer />
    </main>
  );
}
