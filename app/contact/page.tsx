"use client";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OnlyAllSidebar } from "../components/Sidebars";
const Footer = dynamic(() => import("../components/Footer"));
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta
          name="description"
          content="Get in touch with me through this page."
        />
        <meta name="keywords" content="contact, get in touch, reach out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
        <aside
          className={`sidebar-container ${
            isSidebarOpen ? "open" : "closed"
          } lg:flex z-10 w-full items-center justify-between font-mono text-sm`}
        >
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Site Logo"
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
              label="Toggle sidebar"
            />
          </div>
          <nav
            id="sidebar"
            className="min-h-screen self-start flex flex-col justify-between min-w-[300px] sticky top-0"
          >
            <OnlyAllSidebar
              isSidebarOpen={isSidebarOpen}
              currentPage={pathname}
            />
          </nav>
          <section className="pl-5 min-h-screen w-full">
            <h1> This Page is for contacting me!!!</h1>
          </section>
        </aside>
        <Footer />
      </main>
    </>
  );
}
