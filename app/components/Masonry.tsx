"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { PhotoAlbum, Portrait } from "../interfaces/album";

const NoAlbumsFound = ({ category }: { category: string }) => {
  return (
    <div className="flex flex-col w-full self-center">
      <p className="text-center text-md">{`No images found in the ${category.toLowerCase()} category. Stay tuned!`}</p>
    </div>
  );
};

const PhotographyMasonry = ({
  filteredImages,
  loadedImages,
  handleImageLoad,
  togglePhotography,
  handleCategoryChange,
}: {
  filteredImages: PhotoAlbum[];
  loadedImages: number[];
  handleImageLoad: (index: number) => void;
  togglePhotography: boolean;
  handleCategoryChange: (category: string) => void;
}) => {
  return filteredImages.map((img, index) => {
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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
        {!!togglePhotography ? (
          <Link
            href={`${
              togglePhotography === true
                ? `photography/${img.title.toLowerCase().replace(/ /g, "-")}`
                : `modelling/${img.title.toLowerCase().replace(/ /g, "-")}`
            }`}
          >
            <div className="flex-col absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm cursor-pointer underline">
                {img.type}
              </p>
              <p className="text-white text-lg cursor-pointer">{img.title}</p>
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
            <p className="text-white text-lg cursor-pointer">{img.title}</p>
            <p className="text-white text-xs cursor-pointer default-hover">
              View more
            </p>
          </div>
        )}
        <style jsx>{`
          .masonry-item {
            break-inside: avoid;
            margin-bottom: 0.5em;
            position: relative;
          }

          .opacity-in {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }

          .opacity-out {
            opacity: 0;
          }
        `}</style>
      </div>
    );
  });
};

export const SlugMasonry = ({
  album,
  url,
}: {
  album: PhotoAlbum;
  url?: string;
}) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);
  useEffect(() => {
    setLoadedImages([]);
  }, [album]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  return (
    <div className="min-h-screen w-full relative">
      <h2 className="block lg:hidden">{url}</h2>
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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
        <div className="absolute bottom-0 p-4 z-10 backdrop-blur-sm bg-[#766a62] bg-opacity-50">
          <p className="font-bold text-white">{album?.title}</p>
        </div>
      </div>
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
              layout="responsive"
              width={250}
              height={250}
              style={{ objectFit: "cover" }}
              onLoad={() => handleImageLoad(index + 1)}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
        />
        <div className="absolute bottom-0 p-4 z-10 backdrop-blur-sm bg-[#766a62] bg-opacity-50">
          <p className="font-bold text-white">{album?.title}</p>
        </div>
      </div>
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
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
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
  isPortrait,
  filteredImages,
  portraitAlbums,
  modellingImages,
  togglePhotography,
  selectedCategory,
  handleCategoryChange,
  albumsLoading,
}: {
  isPortrait: boolean;
  filteredImages: PhotoAlbum[];
  portraitAlbums: Portrait[];
  modellingImages: PhotoAlbum;
  togglePhotography: boolean;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  albumsLoading: boolean;
}) => {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  useEffect(() => {
    setLoadedImages([]);
  }, [filteredImages]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  const renderPortrait = () => {
    return (
      <div>
        <h2 className="block lg:hidden">Portraits.</h2>
        <div className="masonry-grid">
          {portraitAlbums.map((img: any, index) => (
            <div
              key={index}
              className={`relative masonry-item group ${
                loadedImages.includes(index) ? "opacity-in" : "opacity-out"
              }`}
            >
              <Image
                src={img.image}
                alt={img.title}
                layout="responsive"
                width={250}
                height={250}
                style={{ objectFit: "cover" }}
                onLoad={() => handleImageLoad(index)}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
              />
            </div>
          ))}
        </div>
        <style jsx>{`
          .masonry-grid {
            ${filteredImages.length < 5
              ? "column-count: 2;"
              : "column-count: 3;"}
            column-gap: 0.5em;
          }

          .opacity-in {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
          }

          .opacity-out {
            opacity: 0;
          }

          @media (max-width: 1024px) {
            .masonry-grid {
              column-count: 2;
            }
          }

          @media (max-width: 768px) {
            .masonry-grid {
              column-count: 2;
            }
          }
        `}</style>
      </div>
    );
  };

  const renderMasonryGrid = () => (
    <div className="render-parent">
      {!togglePhotography &&
      selectedCategory !== "ModellingAll" &&
      modellingImages?.images?.length > 0 ? (
        <ModellingMasonry album={modellingImages} />
      ) : (
        <div className="masonry-grid">
          <PhotographyMasonry
            filteredImages={filteredImages}
            loadedImages={loadedImages}
            handleImageLoad={handleImageLoad}
            togglePhotography={togglePhotography}
            handleCategoryChange={handleCategoryChange}
          />
        </div>
      )}
      <style jsx>{`
        .masonry-grid {
          ${filteredImages.length < 5 ? "column-count: 2;" : "column-count: 3;"}
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
  let category = selectedCategory;
  if (category === "PhotographyAll") {
    category = "All Photography";
  } else if (category === "ModellingAll") {
    category = "All Modelling";
  } else {
    category = selectedCategory;
  }
  return (
    <div
      className={`lg:pl-5 w-full min-h-screen flex flex-col ${
        filteredImages.length < 1 || modellingImages?.images?.length < 1
          ? "justify-center"
          : ""
      }`}
    >
      {albumsLoading ? (
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
      ) : (filteredImages.length < 1 || modellingImages?.images?.length < 1) &&
        !isPortrait ? (
        <NoAlbumsFound category={category} />
      ) : isPortrait ? (
        renderPortrait()
      ) : (
        <div>
          <h2 className="block lg:hidden">{category}.</h2>
          {renderMasonryGrid()}
        </div>
      )}
    </div>
  );
};
