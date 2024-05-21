import Image from "next/image";
import Link from "next/link";
import { filter } from "../lists";
type MainSidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
};

export const MainSidebar = ({
  isSidebarOpen,
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
        <div className="lg:ml-14 ">
          {filter.map((category, index) => (
            <button
              key={index}
              className={`default-hover w-40 text-left ${
                selectedCategory === category && "font-bold"
              }`}
              onClick={() => {
                handleCategoryChange(category);
                toggleSidebar();
                window.scrollTo(0, 0);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="lg:ml-14 pb-8 flex flex-col">
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
      } lg:transform-none lg:relative`}
    >
      <div>
        <Image
          src="/logo.svg"
          alt="Site logo"
          width={300}
          height={100}
          className="hidden lg:block"
        />
        <div className="ml-14">
          {filter.map((category) => (
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
      </div>
      <div className="ml-14 pb-8 flex flex-col">
        <button className="about-button default-hover">
          <Link href="about">
            <p className={`${currentPage === "/about" && "font-bold"} `}>
              About
            </p>
          </Link>
        </button>{" "}
        <button className="contact-button default-hover">
          <Link href="contact">
            <p className={`${currentPage === "/contact" && "font-bold"}`}>
              Contact
            </p>
          </Link>
        </button>
      </div>
    </div>
  );
};
