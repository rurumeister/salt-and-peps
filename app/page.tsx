"use client";
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
  const [modellingAlbums, setModellingAlbums] = useState<PhotoAlbum[]>([]);
  const [modellingFilter, setModellingFilter] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<PhotoAlbum[]>([]);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const fetchAllPhotoAlbums = async () => {
    const response = await fetch("/api/proxy/get-photog-all");
    if (!response.ok) {
      throw new Error(`Error fetching all albums: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  const fetchAllModellingAlbums = async () => {
    const response = await fetch("/api/proxy/get-modelling-all");
    if (!response.ok) {
      throw new Error(`Error fetching all albums: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchAllPhotoAlbums()
      .then((data) => {
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
      .catch((error: string) => {
        console.error(error);
      });
    fetchAllModellingAlbums()
      .then((data) => {
        const formattedData: PhotoAlbum[] =
          data?.pepsModellingListCollection?.items.map((item: any) => ({
            title: item.title,
            type: item.type,
            images: item.imagesCollection.items.map((image: any) => ({
              url: image.url,
              title: image.title,
              description: image.description,
            })),
            highlight: item.highlight,
          }));
        setModellingAlbums(formattedData);

        const filter: string[] = [];
        formattedData.forEach((album) => {
          if (!filter.includes(album.title)) {
            filter.push(album.title);
          }
        });
        setModellingFilter(filter);
        setFilteredImages(formattedData);
      })
      .catch((error: string) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
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
          ? modellingAlbums
          : modellingAlbums.filter(
              (album) =>
                album.title.toLowerCase() === selectedCategory.toLowerCase()
            );
      setFilteredImages(images);
    }
  }, [togglePhotography, selectedCategory, photoAlbums, modellingAlbums]);

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
          modellingFilter={modellingFilter}
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
