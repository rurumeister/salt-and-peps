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
  const [modellingImages, setModellingImages] = useState<any>();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const fetchAllAlbums = async () => {
    const response = await fetch("/api/proxy/fetch-all-albums");
    if (!response.ok) {
      throw new Error(`Error fetching album data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetchAllAlbums()
      .then((data: any) => {
        const photographyList = data.photographyLists
          ? data.photographyLists
          : [];
        const modellingList = data?.modellingLists ? data.modellingLists : [];
        const formattedPhotoData: PhotoAlbum[] = photographyList.map(
          (item: any) => ({
            title: item.title,
            type: item.type,
            images: item.images.map((image: any) => ({
              url: image.url,
              title: image.fileName,
              description: image.fileName,
            })),
            highlight: item.highlight,
          })
        );
        const formattedModellingData: PhotoAlbum[] = modellingList.map(
          (item: any) => ({
            title: item.title,
            type: item.type,
            images: item.images.map((image: any) => ({
              url: image.url,
              title: image.fileName,
              description: image.fileName,
            })),
            highlight: item.highlight,
          })
        );
        setPhotoAlbums(formattedPhotoData);
        setModellingAlbums(formattedModellingData);
        setModellingFilter(formattedModellingData.map((album) => album.title));
      })
      .catch((err: string) => console.error(err));
  }, []);

  useEffect(() => {
    if (!!togglePhotography) {
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
      selectedCategory != "ModellingAll" && setModellingImages(images[0]);
    }
  }, [togglePhotography, selectedCategory, photoAlbums, modellingAlbums]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
      <Head>
        <title>
          SaltandPeps Photo Gallery - Professional Photography in Singapore
        </title>
        <meta
          name="description"
          content="Explore the SaltandPeps photo gallery featuring a collection of stunning photographs categorized for easy browsing. Discover our professional photography services in Singapore."
        />
        <meta
          name="keywords"
          content="photo gallery, images, categories, photography, Singapore"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.saltandpeps.com/gallery" />
      </Head>
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
          modellingImages={modellingImages}
          togglePhotography={togglePhotography}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </div>
      <Footer />
    </main>
  );
}
