"use client";
import { SlugMasonry } from "@/app/components/Masonry";
import { GraphQLClient, gql } from "graphql-request";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OnlyAllSidebar } from "../../components/Sidebars";
import { PhotoAlbum } from "../../interfaces/album";
const Footer = dynamic(() => import("../../components/Footer"));

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [album, setAlbum] = useState<PhotoAlbum | null>(null);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}${searchParams}`;
  const slug = url.split("/").pop();
  const transformSlugToTitle = (slug: string) => {
    return slug
      .split("-")
      .map((word) => word.replace(/^./, (match) => match.toUpperCase()))
      .join(" ")
      .replace(/ & /g, " & ");
  };
  const apiURL = process.env.NEXT_PUBLIC_API_URL as string;
  const token = process.env.NEXT_PUBLIC_API_TOKEN as string;
  const title = slug ? transformSlugToTitle(slug) : "";
  console.log("Title: ", title);

  const client = new GraphQLClient(apiURL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    query ($title: String!) {
      pepsPhotographListCollection(where: { title: $title }) {
        items {
          title
          type
          imagesCollection {
            items {
              url
              title
              description
            }
          }
          highlight
        }
      }
    }
  `;

  useEffect(() => {
    if (title) {
      client
        .request(query, { title })
        .then((data) => {
          if (data?.pepsPhotographListCollection?.items?.length > 0) {
            const item = data.pepsPhotographListCollection.items[0];
            console.log("item", item);
            const formattedAlbum: PhotoAlbum = {
              title: item.title,
              type: item.type,
              images: item.imagesCollection.items.map((image: any) => ({
                url: image.url,
                title: image.title,
                description: image.description,
              })),
              highlight: item.highlight,
            };
            setAlbum(formattedAlbum);
            setLoading(false);
            console.log("formattedAlbum", formattedAlbum);
          } else {
            setAlbum(null);
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
        </aside>
        <Footer />
      </main>
    </>
  );
}
