"use client";
import { GraphQLClient, gql } from "graphql-request";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HomeMasonry } from "./components/Masonry";
import { MainSidebar } from "./components/Sidebars";
import { PhotoAlbum } from "./interfaces/album";
const Footer = dynamic(() => import("./components/Footer"));

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("PhotographyAll");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [togglePhotography, setTogglePhotography] = useState<boolean>(true);
  const [photoAlbums, setPhotoAlbums] = useState<PhotoAlbum[]>([]);
  const [filteredImages, setFilteredImages] = useState<PhotoAlbum[]>([]);
  const apiURL = process.env.NEXT_PUBLIC_API_URL as string;
  const token = process.env.NEXT_PUBLIC_API_TOKEN as string;
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const client = new GraphQLClient(apiURL, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const query = gql`
    query {
      pepsPhotographListCollection {
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
    client
      .request(query)
      .then((data) => {
        console.log(data);
        const formattedData: PhotoAlbum[] =
          data?.pepsPhotographListCollection?.items.map((item: any) => ({
            title: item.title,
            type: item.type,
            images: item.imagesCollection.items.map((image: any) => ({
              url: image.url,
              title: image.title,
              description: image.description,
            })),
            highlight: item.highlight,
          }));
        setPhotoAlbums(formattedData);
        setFilteredImages(formattedData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log("togglePhotography: ", togglePhotography);
    console.log("selectedCategory: ", selectedCategory);
    if (togglePhotography) {
      const images =
        selectedCategory === "PhotographyAll"
          ? photoAlbums
          : photoAlbums.filter(
              (album) =>
                album.type.toLowerCase() === selectedCategory.toLowerCase()
            );
      setFilteredImages(images);
    } else {
      const images =
        selectedCategory === "ModellingAll"
          ? photoAlbums
          : photoAlbums.filter(
              (album) =>
                album.type.toLowerCase() === selectedCategory.toLowerCase()
            );
      setFilteredImages(images);
    }
  }, [togglePhotography, selectedCategory, photoAlbums]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
      <Head>
        <title>Photo Gallery</title>
        <meta
          name="description"
          content="A collection of beautiful photos categorized for easy browsing."
        />
        <meta
          name="keywords"
          content="photo gallery, images, categories, photography"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div
        className={`sidebar-container ${
          isSidebarOpen ? "open" : "closed"
        } lg:flex z-10 w-full items-center justify-between font-mono text-sm`}
      >
        <div className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Site logo"
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
        <MainSidebar
          setTogglePhotography={setTogglePhotography}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
        <HomeMasonry
          filteredImages={filteredImages}
          togglePhotography={togglePhotography}
        />
      </div>
      <Footer />
    </main>
  );
}
