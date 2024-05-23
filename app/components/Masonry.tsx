"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PhotoAlbum } from "../interfaces/album";
export const SlugMasonry = ({ album }: { album: PhotoAlbum }) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  useEffect(() => {
    setLoadedImages([]);
  }, [album]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="relative w-full h-screen">
        <Image
          src={`${album?.images?.[0].url}`}
          alt={album?.title}
          fill
          style={{ objectFit: "cover" }}
          priority={true}
          className={`absolute inset-0 ${
            loadedImages.includes(0) ? "opacity-in" : "opacity-out"
          }`}
          onLoad={() => handleImageLoad(0)}
        />
        <div className="absolute bottom-0 p-4 z-10 backdrop-blur-sm bg-[#766a62] bg-opacity-50">
          <p className=" font-bold text-white">{album?.title}</p>
        </div>
      </div>
      {/* Masonry layout for the remaining images */}
      <div className="pt-2 masonry-grid">
        {album?.images.slice(1).map((img, index) => (
          <div
            key={index + 1}
            className={`relative masonry-item group ${
              loadedImages.includes(index + 1) ? "opacity-in" : "opacity-out"
            }`}
          >
            <Image
              src={`${img.url}`}
              alt={img.title || "Masonry Image"}
              width={250}
              height={250}
              style={{ objectFit: "cover", width: "100%", height: "auto" }}
              onLoad={() => handleImageLoad(index + 1)}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 0.5em;
        }

        .opacity-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .opacity-out {
          opacity: 0;
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 0.5em;
          position: relative;
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
};

export const ModellingMasonry = ({ album }: { album: PhotoAlbum }) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  useEffect(() => {
    setLoadedImages([]);
  }, [album]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <div className="min-h-screen w-full relative">
      <div className="relative w-full h-screen">
        <Image
          src={`${album.images[0].url}`}
          alt={album?.title}
          layout="fill"
          style={{ objectFit: "cover" }}
          className={`absolute inset-0 ${
            loadedImages.includes(0) ? "opacity-in" : "opacity-out"
          }`}
          onLoad={() => handleImageLoad(0)}
        />
        <div className="absolute bottom-0 p-4 z-10 backdrop-blur-sm bg-[#766a62] bg-opacity-50">
          <p className=" font-bold text-white">{album?.title}</p>
        </div>
      </div>
      {/* Masonry layout for the remaining images */}
      <div className="masonry masonry-grid">
        {album?.images.slice(1).map((img, index) => (
          <div
            key={index + 1}
            className={`relative masonry-item group ${
              loadedImages.includes(index + 1) ? "opacity-in" : "opacity-out"
            }`}
          >
            <Image
              src={`${img.url}`}
              alt={img.title}
              layout="responsive"
              width={250}
              height={250}
              style={{ objectFit: "cover" }}
              onLoad={() => handleImageLoad(index + 1)}
            />
          </div>
        ))}
      </div>
      <style jsx>{`
        .masonry-grid {
          column-count: 2;
          column-gap: 0.5em;
        }

        .opacity-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .opacity-out {
          opacity: 0;
        }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 0.5em;
          position: relative;
        }

        @media (min-width: 1700px) {
          .masonry {
            padding-top: 8px;
          }
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
};

export const HomeMasonry = ({
  filteredImages,
  modellingImages,
  togglePhotography,
  selectedCategory,
  handleCategoryChange,
}: {
  filteredImages: PhotoAlbum[];
  modellingImages: PhotoAlbum;
  togglePhotography: boolean;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
}) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  useEffect(() => {
    setLoadedImages([]);
  }, [filteredImages]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };
  //TODO: if it is modelling, unless it is all, just show all the images, also do the same for Portraits
  return (
    <div className="lg:pl-5 w-full min-h-screen">
      <div className="masonry-grid">
        {!togglePhotography &&
        selectedCategory != "ModellingAll" &&
        modellingImages?.images?.length > 0 ? (
          <div>
            <ModellingMasonry album={modellingImages as PhotoAlbum} />
          </div>
        ) : filteredImages.length > 0 ? (
          filteredImages.map((img, index) => {
            const firstImage = img.images[0];
            return (
              <div
                key={index}
                className={`relative masonry-item group ${
                  loadedImages.includes(index) ? "opacity-in" : "opacity-out"
                }`}
              >
                <Image
                  src={`${firstImage.url}`}
                  alt={img.title}
                  layout="responsive"
                  width={250}
                  height={250}
                  style={{ objectFit: "cover" }}
                  onLoad={() => handleImageLoad(index)}
                />
                {!!togglePhotography ? (
                  <Link
                    href={`${
                      togglePhotography === true
                        ? `photography/${img.title
                            .toLowerCase()
                            .replace(/ /g, "-")}`
                        : `modelling/${img.title
                            .toLowerCase()
                            .replace(/ /g, "-")}`
                    }`}
                  >
                    <div className="flex-col absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm cursor-pointer underline">
                        {img.type}
                      </p>
                      <p className="text-white text-lg cursor-pointer">
                        {img.title}
                      </p>
                      <p className="text-white text-xs cursor-pointer default-hover">
                        View more
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div
                    className="flex-col absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => handleCategoryChange(img.title)}
                  >
                    <p className="text-white text-sm cursor-pointer underline">
                      {img.type}
                    </p>
                    <p className="text-white text-lg cursor-pointer">
                      {img.title}
                    </p>
                    <p className="text-white text-xs cursor-pointer default-hover">
                      View more
                    </p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>No images found. Stay tuned!</p>
        )}
      </div>
      <style jsx>{`
        .masonry-grid {
          ${filteredImages.length < 5 ? "column-count: 2;" : "column-count: 4;"}
          column-gap: 0.5em;
        }

        .opacity-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .opacity-out {
          opacity: 0;
        }

        @media (max-width: 1280px) {
          .masonry-grid {
            column-count: 3;
          }
        }

        @media (max-width: 1024px) {
          .masonry-grid {
            column-count: 2;
          }
        }

        @media (max-width: 768px) {
          .masonry-grid {
            column-count: 1;
          }
        }
      `}</style>
    </div>
  );
};
