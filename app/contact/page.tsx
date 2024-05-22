"use client";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OnlyAllSidebar } from "../components/Sidebars";
const Footer = dynamic(() => import("../components/Footer"));
export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const pathname = usePathname();

  return (
    <>
      <Head>
        <title>Contact Me</title>
        <meta
          name="description"
          content="Get in touch with me through this page."
        />
        <meta name="keywords" content="contact, get in touch, reach out" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
        <aside
          className={`sidebar-container ${
            isSidebarOpen ? "open" : "closed"
          } lg:flex z-10 w-full items-center justify-between font-mono text-sm`}
        >
          <div className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Site Logo"
              width={200}
              height={100}
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
          <nav
            id="sidebar"
            className="min-h-screen self-start flex flex-col justify-between min-w-[300px] sticky top-0"
          >
            <OnlyAllSidebar
              isSidebarOpen={isSidebarOpen}
              currentPage={pathname}
            />
          </nav>
          <section className="pl-5 pt-5 min-h-screen w-full">
            <form>
              <div className="border-b border-gray-900/10 pb-12 spectral italic text-[#766a62]">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6"
                    >
                      Name *
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="text"
                        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 "
                    >
                      Email address *
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="text"
                      className="block text-sm font-medium leading-6 "
                    >
                      Contact no. *
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone-number"
                        name="phone-number"
                        type="text"
                        autoComplete="text"
                        className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <fieldset className="mt-8">
                  <legend className="block text-sm font-medium leading-6 ">
                    Types of Service *
                  </legend>
                  <div className="flex flex-wrap mt-6 gap-5 font-sans font-light">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-everything"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-aber-600 focus:ring--600"
                      />
                      <label
                        htmlFor="push-everything"
                        className="block text-sm font-medium leading-6"
                      >
                        Pre-wedding
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-email"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-email"
                        className="block text-sm font-medium leading-6 "
                      >
                        Couple
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 "
                      >
                        Fashion
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 "
                      >
                        Products
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 "
                      >
                        Events
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 "
                      >
                        Food
                      </label>
                    </div>
                    <div className="flex items-center gap-x-3">
                      <input
                        id="push-nothing"
                        name="push-notifications"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="push-nothing"
                        className="block text-sm font-medium leading-6 "
                      >
                        Travel
                      </label>
                    </div>
                  </div>
                </fieldset>
                <div className="col-span-full mt-8">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 "
                  >
                    Tell us more
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                    />
                  </div>
                </div>
              </div>
            </form>
          </section>
        </aside>
        <Footer />
      </main>
    </>
  );
}
