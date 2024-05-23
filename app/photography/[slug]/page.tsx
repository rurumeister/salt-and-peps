"use client";
import { SlugMasonry } from "@/app/components/Masonry";
import { OnlyAllSidebar } from "@/app/components/Sidebars";
import { transformSlugToTitle } from "@/app/helpers";
import { PhotoAlbum, SlugAlbum } from "@/app/interfaces/album";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const Footer = dynamic(() => import("@/app/components/Footer"));

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<SlugAlbum>();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams}`;
  const slug = url.split("/").pop();

  const title = slug ? transformSlugToTitle(slug) : "";

  const fetchAlbumData = async (title: string) => {
    const response = await fetch(
      `/api/proxy/fetch-album-data/?title=${encodeURIComponent(title)}`
    );
    if (!response.ok) {
      throw new Error(`Error fetching album data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    if (title) {
      fetchAlbumData(title)
        .then((data) => {
          if (data.images.length > 0) {
            const formattedAlbum: PhotoAlbum = {
              title: data.title,
              type: data.type,
              images: data.images.map((image: any) => ({
                url: image.url,
                title: image.filename,
              })),
            };
            setAlbum(formattedAlbum);
            setLoading(false);
          } else {
            setAlbum(undefined);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [title]);

  return (
    <>
      <Head>
        <title>{album?.title || "Album"}</title>
        <meta
          name="description"
          content={`View the ${album?.title || "album"} gallery.`}
        />
        <meta
          name="keywords"
          content={`gallery, ${album?.title || "album"}, photos`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
        <div
          className={`sidebar-container max-w-screen-2xl ${
            isSidebarOpen ? "open" : "closed"
          } lg:flex z-10 w-full items-center justify-between font-mono text-sm`}
        >
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Site Logo"
              width={200}
              height={100}
              priority
              className="block lg:hidden"
            />
          </div>
          <div className="absolute right-5 top-4 mobile-menu-icon lg:hidden text-xl cursor-pointer self-center">
            <Hamburger
              toggled={isSidebarOpen}
              toggle={toggleSidebar}
              size={20}
              label="Toggle sidebar"
            />
          </div>
          <OnlyAllSidebar
            isSidebarOpen={isSidebarOpen}
            currentPage={pathname}
          />
          <div className="min-h-screen w-full relative">
            {!loading && <SlugMasonry album={album as PhotoAlbum} />}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
