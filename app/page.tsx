"use client";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import FeatureList from "./components/FeatureList";
import { HomeMasonry } from "./components/Masonry";
import { MainSidebar } from "./components/Sidebars";
import { Feature, PhotoAlbum, Portrait } from "./interfaces/album";
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
  const [isFeatureActive, setIsFeatureActive] = useState<boolean>(false);
  const [featureList, setFeatureList] = useState<Feature[]>([]);
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
      const featureList = allAlbums.featureLists || [];
      const formattedPhotoData: PhotoAlbum[] = photographyList.map(
        (item: any) => ({
          title: item.title,
          type: item.type,
          priority: item?.priority,
          images: item.images.map((image: any) => ({
            url: image.url,
            title: image.fileName,
            description: image.fileName,
            height: image.height,
            width: image.width,
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
            height: image.height,
            width: image.width,
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
      const formattedFeatureData: Feature[] = featureList.map((item: any) => ({
        title: item.title,
        link: item.link,
        date: item.date,
        author: item.author,
        coverPhoto: item.coverPhoto.url,
      }));

      setPhotoAlbums(formattedPhotoData);
      setModellingAlbums(formattedModellingData);
      setPortraitAlbums(formattedPortraitData);
      setFeatureList(formattedFeatureData);
      setModellingFilter(formattedModellingData.map((album) => album.title));
    }
  }, [allAlbums]);

  useEffect(() => {
    filterImages();
  }, [
    togglePhotography,
    selectedCategory,
    photoAlbums,
    modellingAlbums,
    portraitAlbums,
    featureList,
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

      <FloatingWhatsApp
        phoneNumber={process.env.NEXT_PUBLIC_PHONE_NUMBER as string}
        accountName="Peps"
        avatar="./peps.png"
        darkMode={true}
        allowEsc={true}
      />
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
          isFeatureActive={isFeatureActive}
          setIsFeatureActive={setIsFeatureActive}
          setIsPortrait={setIsPortrait}
          setTogglePhotography={setTogglePhotography}
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          modellingFilter={modellingFilter}
        />
        {isFeatureActive ? (
          <FeatureList features={featureList} />
        ) : (
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
        )}
      </div>
      <Footer />
    </main>
  );
}
