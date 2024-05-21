"use client";
import { SlugMasonry } from "@/app/components/Masonry";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { OnlyAllSidebar } from "../../components/Sidebars";
import { AlbumType } from "../../interfaces/album";
import { albums } from "../../lists";
const Footer = dynamic(() => import("../../components/Footer"));
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams}`;
  console.log(url);
  //reverse href={`album/${img.title.toLowerCase().replace(/ /g, "-")}`}
  const slug = url.split("/").pop();
  const album = albums.find(
    (album) => album.title.toLowerCase().replace(/ /g, "-") === slug
  ) as AlbumType;
  console.log(album);
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
        <OnlyAllSidebar isSidebarOpen={isSidebarOpen} currentPage={pathname} />
        <SlugMasonry album={album} />
      </div>
      <Footer />
    </main>
  );
}
