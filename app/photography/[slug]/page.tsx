"use client";
import { SlugMasonry } from "@/app/components/Masonry";
import { OnlyAllSidebar } from "@/app/components/Sidebars";
import { transformSlugToTitle } from "@/app/helpers";
import { PhotoAlbum, SlugAlbum } from "@/app/interfaces/album";
import { useAlbumData } from "@/app/lib/useAlbumData";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const Footer = dynamic(() => import("@/app/components/Footer"));

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [album, setAlbum] = useState<SlugAlbum>();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams}`;
  const slug = url.split("/").pop();
  const cleanedUrl = url.substring(1);
  const title = slug ? transformSlugToTitle(slug) : "";
  const {
    data: albumData,
    isLoading: albumsLoading,
    error: allAlbumsError,
  } = useAlbumData(title);

  useEffect(() => {
    if (albumData && albumData.images.length > 0) {
      const formattedAlbum: PhotoAlbum = {
        title: albumData.title,
        type: albumData.type,
        images: albumData.images.map((image: any) => ({
          url: image.url,
          title: image.filename,
          height: image.height,
          width: image.width,
        })),
      };
      setAlbum(formattedAlbum);
    } else {
      setAlbum(undefined);
    }
  }, [albumData]);

  return (
    <>
      <Head>
        <title>{album?.title || "Album"} - SaltandPeps Photography</title>
        <meta
          name="description"
          content={`View the ${
            album?.title || "album"
          } gallery by SaltandPeps. Explore stunning photography albums in Singapore.`}
        />
        <meta
          name="keywords"
          content={`gallery, ${
            album?.title || "album"
          }, photos, photography, Singapore`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="canonical"
          href={`https://www.saltandpeps.com/photography/${slug}`}
        />
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
              alt="SaltandPeps Logo"
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
          <div className="min-h-screen w-full relative flex">
            {!albumsLoading && album && (
              <SlugMasonry album={album as PhotoAlbum} url={title} />
            )}
            {albumsLoading && (
              <div className="flex flex-col w-full self-center">
                <TailSpin
                  visible={true}
                  height="60"
                  width="60"
                  color="#766a62"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  wrapperStyle={{
                    alignSelf: "center",
                  }}
                  wrapperClass=""
                />
              </div>
            )}
            {allAlbumsError && (
              <div className="flex flex-col w-full self-center">
                <p className="text-center text-lg">Error loading album.</p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
