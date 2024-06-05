import Image from "next/image";
import Link from "next/link";
import { photographyFilter } from "../lists";

type MainSidebarProps = {
  isFeatureActive: boolean;
  setIsFeatureActive: (value: boolean) => void;
  isSidebarOpen: boolean;
  setIsPortrait: (value: boolean) => void;
  setTogglePhotography: (value: boolean) => void;
  toggleSidebar: () => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  modellingFilter: string[];
};

export const MainSidebar = ({
  isFeatureActive,
  setIsFeatureActive,
  isSidebarOpen,
  setIsPortrait,
  setTogglePhotography,
  toggleSidebar,
  selectedCategory,
  handleCategoryChange,
  modellingFilter,
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
          alt="SaltandPeps Logo"
          width={300}
          height={100}
          priority
          className="hidden lg:block"
        />
        <p className="inconsolata font-extralight lg:ml-12">Photography</p>
        <div className="ml-12 lg:ml-16 flex flex-col">
          <button
            className={`default-hover w-40 text-left ${
              selectedCategory === "PhotographyAll" &&
              !isFeatureActive &&
              "font-bold"
            }`}
            onClick={() => {
              handleCategoryChange("PhotographyAll");
              setIsFeatureActive(false);
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
                category === "Portraits"
                  ? setIsPortrait(true)
                  : setIsPortrait(false);
                handleCategoryChange(category);
                setIsFeatureActive(false);
                toggleSidebar();
                setTogglePhotography(true);
                window.scrollTo(0, 0);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex flex-col pt-8">
          <p className="text-left lg:ml-12">Modelling</p>
          <button
            className={`default-hover ml-12 lg:ml-16 w-40 text-left ${
              selectedCategory === "ModellingAll" &&
              !isFeatureActive &&
              "font-bold"
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
          {modellingFilter.map((category, index) => (
            <button
              key={index}
              className={`default-hover ml-12 lg:ml-16 capitalize text-left ${
                selectedCategory === category && !isFeatureActive && "font-bold"
              }`}
              onClick={() => {
                setIsFeatureActive(false);
                handleCategoryChange(category);
                toggleSidebar();
                setTogglePhotography(false);
                window.scrollTo(0, 0);
              }}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex flex-col pt-8">
          <button
            className={`text-left lg:ml-12 ${isFeatureActive && "font-bold"}`}
            onClick={() => setIsFeatureActive(true)}
          >
            Features
          </button>
        </div>
      </div>

      <div className="lg:ml-12 pb-24 lg:pb-8 flex flex-col">
        <button className="about-button default-hover">
          <Link href="/about">
            <p>About</p>
          </Link>
        </button>
        <button className="contact-button default-hover">
          <Link href="/contact">
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
          alt="SaltandPeps Logo"
          width={300}
          height={100}
          priority
          className="hidden lg:block"
        />
        <h2 className="opacity-20 cursor-not-allowed lg:ml-12">Photography</h2>
        <div className="ml-12 lg:ml-16 flex flex-col">
          <button
            className={`default-hover w-40 text-left opacity-20 cursor-not-allowed`}
          >
            All
          </button>
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
          <button className="text-left lg:ml-12 cursor-not-allowed">
            Modelling
          </button>
          <button className="text-left ml-12 lg:ml-16 w-40 cursor-not-allowed">
            All
          </button>
        </div>
      </div>
      <div></div>
      <div>
        <Link href="/">
          <button className="about-button ml-12 default-hover">Back</button>
        </Link>
      </div>
      <div className="lg:ml-12 pb-24 lg:pb-8 flex flex-col">
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
