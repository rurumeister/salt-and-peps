import { GoArrowUp } from "react-icons/go";
import { PiInstagramLogoLight, PiTiktokLogo } from "react-icons/pi";
const instagramURL = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const tiktokURL = process.env.NEXT_PUBLIC_TIKTOK_URL;
const Footer = () => {
  return (
    <footer className="py-8 lg:px-5 mt-10 w-full max-w-screen-2xl">
      <div className="flex justify-between items-center">
        <p className="spectral text-xs lg:ml-12 italic">
          all content copyright © 2024 saltandpeps
        </p>
        <div className="flex gap-5">
          <a
            href={instagramURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl default-hover"
            aria-label="Instagram"
          >
            <PiInstagramLogoLight />
          </a>
          <a
            href={tiktokURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl default-hover"
            aria-label="Tiktok"
          >
            <PiTiktokLogo />
          </a>

          <button
            className="text-xl default-hover"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Scroll to top"
          >
            <GoArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
