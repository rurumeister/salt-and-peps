import { GoArrowUp } from "react-icons/go";
import { PiInstagramLogoLight } from "react-icons/pi";
const instagramURL = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const Footer = () => {
  return (
    <footer className="py-8 px-5 mt-10 w-full">
      <div className="flex justify-between items-center">
        <p className="spectral text-xs ml-12 italic">
          all content copyright © 2024 saltandpeps
        </p>
        <div className="flex gap-5">
          <a
            href={instagramURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl default-hover"
          >
            <PiInstagramLogoLight />
          </a>
          <div
            className="text-xl default-hover"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <GoArrowUp />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
