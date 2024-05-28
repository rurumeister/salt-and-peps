"use client";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HomeMasonry } from "./components/Masonry";
import { MainSidebar } from "./components/Sidebars";
import { PhotoAlbum, Portrait } from "./interfaces/album";
import { useAllAlbums } from "./lib/useAllAlbums";
const Footer = dynamic(() => import("./components/Footer"));

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("PhotographyAll");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [togglePhotography, setTogglePhotography] = useState<boolean>(true);
  const [photoAlbums, setPhotoAlbums] = useState<PhotoAlbum[]>([]);
  const [modellingAlbums, setModellingAlbums] = useState<PhotoAlbum[]>([]);
  const [portraitAlbums, setPortraitAlbums] = useState<Portrait[]>([]);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [modellingFilter, setModellingFilter] = useState<string[]>([]);
  const [filteredImages, setFilteredImages] = useState<PhotoAlbum[]>([]);
  const [modellingImages, setModellingImages] = useState<any>();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const {
    data: allAlbums,
    isLoading: albumsLoading,
    error: allAlbumsError,
  } = useAllAlbums();

  useEffect(() => {
    if (allAlbums) {
      const photographyList = allAlbums.photographyLists || [];
      const modellingList = allAlbums.modellingLists || [];
      const portraitList = allAlbums.portraitLists || [];
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
          isPortrait: item.isPortrait,
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
      const formattedPortraitData: Portrait[] = portraitList.map(
        (item: any) => ({
          title: item.title,
          image: item.image.url,
        })
      );
      setPhotoAlbums(formattedPhotoData);
      setModellingAlbums(formattedModellingData);
      setPortraitAlbums(formattedPortraitData);
      setModellingFilter(formattedModellingData.map((album) => album.title));
    }
  }, [allAlbums]);

  useEffect(() => {
    filterImages();
    console.log("filteredImages", filteredImages);
    console.log("photoAlbums", photoAlbums);
  }, [
    togglePhotography,
    selectedCategory,
    photoAlbums,
    modellingAlbums,
    portraitAlbums,
  ]);

  const filterImages = () => {
    if (togglePhotography) {
      const images =
        selectedCategory === "PhotographyAll"
          ? photoAlbums.filter((album) => album.highlight === true)
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
      if (selectedCategory !== "ModellingAll") {
        setModellingImages(images[0]);
      } else {
        setModellingImages(null);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
      <Head>
        <title>SaltandPeps - Photography, Pre-Wedding, Content Creation</title>
        <meta
          name="description"
          content="SaltandPeps offers professional photography and content creation services in Singapore. Specializing in pre-wedding and fashion photography."
        />
        <meta
          name="keywords"
          content="photography, pre-wedding, content creation, Singapore"
        />
        <link rel="canonical" href="https://www.saltandpeps.com" />
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
          setIsPortrait={setIsPortrait}
          setTogglePhotography={setTogglePhotography}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          modellingFilter={modellingFilter}
        />
        <HomeMasonry
          isPortrait={isPortrait}
          albumsLoading={albumsLoading}
          filteredImages={filteredImages}
          portraitAlbums={portraitAlbums}
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
