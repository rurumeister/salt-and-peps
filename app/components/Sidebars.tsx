import Image from "next/image";
import Link from "next/link";
import { modellingAlbums, photographyFilter } from "../lists";
type MainSidebarProps = {
  isSidebarOpen: boolean;
  setTogglePhotography: (value: boolean) => void;
  toggleSidebar: () => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
};

export const MainSidebar = ({
  isSidebarOpen,
  setTogglePhotography,
  toggleSidebar,
  selectedCategory,
  handleCategoryChange,
}: MainSidebarProps) => {
  return (
    <div
      id="sidebar"
      className={`sidebar min-h-screen self-start flex flex-col justify-between min-w-[300px] sticky top-0 p-5 transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:transform-none lg:sticky`}
    >
      <div>
        <Image
          src="/logo.svg"
          alt="Site logo"
          width={300}
          height={100}
          className="hidden lg:block"
        />
        <p className="inconsolata font-extralight ml-12">Photography</p>
        <div className="lg:ml-16 flex flex-col">
          <button
            className={`default-hover w-40 text-left ${
              selectedCategory === "PhotographyAll" && "font-bold"
            }`}
            onClick={() => {
              handleCategoryChange("PhotographyAll");
              toggleSidebar();
              setTogglePhotography(true);
              window.scrollTo(0, 0);
            }}
          >
            All
          </button>
          {photographyFilter.map((category, index) => (
            <button
              key={index}
              className={`default-hover w-40 text-left ${
                selectedCategory === category && "font-bold"
              }`}
              onClick={() => {
                handleCategoryChange(category);
                toggleSidebar();
                setTogglePhotography(true);
                window.scrollTo(0, 0);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex flex-col pt-8 ">
          <button className="text-left ml-12">Modelling</button>
          <button
            className={`text-left lg:ml-16 default-hover ${
              selectedCategory === "ModellingAll" && "font-bold"
            }`}
            onClick={() => {
              handleCategoryChange("ModellingAll");
              toggleSidebar();
              setTogglePhotography(false);
              window.scrollTo(0, 0);
            }}
          >
            All
          </button>
          {modellingAlbums.map((category, index) => (
            <button
              key={index}
              className={`default-hover text-left lg:ml-16 ${
                selectedCategory === category.type && "font-bold"
              }`}
              onClick={() => {
                handleCategoryChange(category.type);
                toggleSidebar();
                setTogglePhotography(false);
                window.scrollTo(0, 0);
              }}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:ml-12 pb-8 flex flex-col">
        <button className="about-button default-hover">
          <Link href="about">
            <p>About</p>
          </Link>
        </button>
        <button className="contact-button default-hover">
          <Link href="contact">
            <p>Contact</p>
          </Link>
        </button>
      </div>
    </div>
  );
};

export const OnlyAllSidebar = ({
  isSidebarOpen,
  currentPage,
}: {
  isSidebarOpen: boolean;
  currentPage: string;
}) => {
  return (
    <div
      id="sidebar"
      className={`sidebar min-h-screen self-start flex flex-col justify-between min-w-[300px] sticky top-0 p-5 transform transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:transform-none lg:sticky`}
    >
      <div>
        <Image
          src="/logo.svg"
          alt="Site logo"
          width={300}
          height={100}
          className="hidden lg:block"
        />
        <h2 className="ml-12">Photography</h2>
        <div className="lg:ml-16 flex flex-col">
          <Link href="/">
            <button className={`default-hover w-40 text-left`}>All</button>
          </Link>
          {photographyFilter.map((category) => (
            <p
              key={category}
              className={`w-40 ${
                category != "All"
                  ? "opacity-20 cursor-not-allowed"
                  : "default-hover"
              }`}
              onClick={() => {
                if (category === "All") {
                  window.location.href = "/";
                }
              }}
            >
              {category}
            </p>
          ))}
        </div>
        <div className="flex flex-col pt-8 opacity-20">
          <button className="text-left ml-12 cursor-not-allowed">
            Modelling
          </button>
          <button className="text-left lg:ml-16 cursor-not-allowed">All</button>
          {modellingAlbums.map((category, index) => (
            <button
              key={index}
              className="text-left lg:ml-16 cursor-not-allowed"
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      <div className="ml-12 pb-8 flex flex-col">
        <button className="about-button default-hover">
          <Link href="/about">
            <p className={`${currentPage === "/about" && "font-bold"} `}>
              About
            </p>
          </Link>
        </button>{" "}
        <button className="contact-button default-hover">
          <Link href="/contact">
            <p className={`${currentPage === "/contact" && "font-bold"}`}>
              Contact
            </p>
          </Link>
        </button>
      </div>
    </div>
  );
};
