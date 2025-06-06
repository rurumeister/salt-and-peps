"use client";
import image1 from "@/public/about/01.jpg";
import image2 from "@/public/about/02.jpg";
import image3 from "@/public/about/03.jpg";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { OnlyAllSidebar } from "../components/Sidebars";
const Footer = dynamic(() => import("../components/Footer"));

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
      <Head>
        <title>
          About SaltandPeps - Professional Photography and Content Creation
        </title>
        <meta
          name="description"
          content="Learn about Peps, the creative mind behind SaltandPeps. Specializing in portraits, fashion, food, pre-wedding photography, and content creation in Singapore."
        />
        <meta
          name="keywords"
          content="about, personal, information, biography, photography, content creator, Singapore"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.saltandpeps.com/about" />
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
        <OnlyAllSidebar isSidebarOpen={isSidebarOpen} currentPage={pathname} />
        <section className="md:pl-5 min-h-screen w-full">
          <FloatingWhatsApp
            phoneNumber={process.env.NEXT_PUBLIC_PHONE_NUMBER as string}
            accountName="Peps"
            avatar="./peps.png"
            darkMode={true}
            allowEsc={true}
          />
          <div className="flex flex-col gap-5 w-full h-full">
            <div className="relative flex gap-4 h-fit">
              <div className="flex flex-col justify-end pb-4">
                <div className="flex flex-col gap-4">
                  <h2
                    className="font-sans italic font-semibold text-5xl pb-4 underline underline-offset-4"
                    style={{
                      color: "#C5AB97",
                    }}
                  >
                    Peps HW
                  </h2>
                  <Image
                    src="/about/01.jpg"
                    alt="Picture of Peps"
                    width={400}
                    height={200}
                    priority
                    className="object-contain block w-[100%] md:hidden"
                    style={{ height: "auto" }}
                  />
                  <p
                    className="inconsolata border-b border-gray-900/10 pb-4"
                    style={{
                      fontFamily: "__Inconsolata_f98d14",
                      fontWeight: "100",
                      fontSize: "16px",
                    }}
                  >
                    A natural born creative, Peps specialises in a number of
                    things from{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Portraits
                    </span>
                    ,{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Fashion
                    </span>
                    ,{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Food
                    </span>
                    ,{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Pre-Wedding
                    </span>
                    , and even{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Studio
                    </span>
                    . With 9 years of experience in{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      photography
                    </span>
                    , she has also extended her flair for creativity into her
                    role as a Digital Content Creator, where she is known for
                    conceptualising and creating visuals that aim to provide
                    successful digital campaigns, while adding a unique,
                    personal aesthetic spin for her clientele.
                  </p>
                  <p
                    style={{
                      fontFamily: "__Inconsolata_f98d14",
                      fontWeight: "300",
                      fontSize: "16px",
                    }}
                  >
                    Despite only recently entering the industry, she has humbly
                    worked on several notable collaborations with global brands
                    like{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      Love Bonito, New Balance
                    </span>{" "}
                    and{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      UNIQLO
                    </span>
                    .
                  </p>
                </div>
              </div>
              <Image
                src={image1}
                alt="Picture of Peps"
                width={400}
                height={200}
                priority
                className="object-contain hidden md:block"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
            <div className="justify-center md:justify-normal relative flex gap-2">
              <Image
                src={image3}
                alt="Picture of Peps"
                width={250}
                height={250}
                priority
                className="object-cover w-[250px] h-[250px] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px]"
              />
              <Image
                src={image2}
                alt="Picture of Peps"
                width={400}
                height={150}
                priority
                className="hidden md:block object-contain w-[300px] lg:w-[250px] xl:w-[350px]"
                style={{ height: "auto" }}
              />
              <div
                className="w-80 underline absolute bottom-24 left-0"
                style={{
                  borderBottom: "2px solid #DBBEA8",
                }}
              ></div>
              <div className="hidden md:flex flex-col gap-4 pl-2 pt-4">
                <p
                  style={{
                    fontFamily: "__Inconsolata_f98d14",
                    fontWeight: "300",
                    fontSize: "16px",
                  }}
                >
                  Peps also models on a freelance basis – having worked with{" "}
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    Limited Edt{" "}
                  </span>
                  on an International Women&apos;s Day campaign,{" "}
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    AforArcade&apos;s
                  </span>{" "}
                  9th Anniversary &quot;Flashback Collection&quot; catalogue as
                  well as{" "}
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    Love Bonito&apos;s
                  </span>{" "}
                  13th Anniversary campaign.
                </p>
                <p
                  style={{
                    fontFamily: "__Inconsolata_f98d14",
                    fontWeight: "300",
                    fontSize: "16px",
                  }}
                >
                  Let’s bring your ideas to life!
                </p>
                <Link href="/contact">
                  <div className="mt-6 flex items-center justify-center">
                    <button
                      type="submit"
                      className="font-mono font-light rounded-md underline underline-offset-8 py-2 text-xs hover:text-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                    >
                      LET&apos;S CHAT !
                    </button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex md:hidden flex-col gap-4 pl-2 pt-2">
              <p
                style={{
                  fontFamily: "__Inconsolata_f98d14",
                  fontWeight: "300",
                  fontSize: "16px",
                }}
              >
                Peps also models on a freelance basis – having worked with{" "}
                <span
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Limited Edt{" "}
                </span>
                on an International Women&apos;s Day campaign,{" "}
                <span
                  style={{
                    fontWeight: "600",
                  }}
                >
                  AforArcade&apos;s
                </span>{" "}
                9th Anniversary &quot;Flashback Collection&quot; catalogue as
                well as{" "}
                <span
                  style={{
                    fontWeight: "600",
                  }}
                >
                  Love Bonito&apos;s
                </span>{" "}
                13th Anniversary campaign.
              </p>
              <p
                style={{
                  fontFamily: "__Inconsolata_f98d14",
                  fontWeight: "300",
                  fontSize: "16px",
                }}
              >
                Let&apos;s bring your ideas to life!
              </p>
              <Link href="/contact">
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="submit"
                    className="font-mono font-light rounded-md underline underline-offset-8 py-2 text-xs hover:text-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                  >
                    LET&apos;S CHAT !
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
