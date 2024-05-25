"use client";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Hamburger from "hamburger-react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OnlyAllSidebar } from "../components/Sidebars";
import { photographyFilter } from "../lists";
const Footer = dynamic(() => import("../components/Footer"));

export default function Contact() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const pathname = usePathname();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleCaptchaChange = (token: any) => {
    setCaptchaToken(token);
  };

  const onSubmit = async (data: any) => {
    if (!captchaToken) {
      setError("captcha", {
        type: "manual",
        message: "Please complete the hCaptcha.",
      });
      return;
    }

    let values = { ...data, captchaToken };
    let res = null;
    try {
      res = await fetch("/api/message", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      let responseData = await res.json();

      if (res.status === 200) {
        alert("Message Sent Successfully!");
        window.location.reload();
      } else {
        alert("Error: " + responseData.message);
      }
    } catch (err: any) {
      console.log({ err });
      alert("Network error: " + err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-10 lg:pl-20">
      <Head>
        <title>
          Contact SaltandPeps - Get in Touch for Photography and Content
          Creation
        </title>
        <meta
          name="description"
          content="Reach out to SaltandPeps for professional photography and content creation services in Singapore. Let's bring your ideas to life!"
        />
        <meta
          name="keywords"
          content="contact, photography, content creation, Singapore, SaltandPeps"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.saltandpeps.com/contact" />
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
        <section className="lg:pl-5 pt-5 min-h-screen w-full flex justify-end">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="border-b border-gray-900/10 pb-8 spectral italic text-[#766a62]">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6"
                  >
                    Name *
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      autoComplete="name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.name.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    Email address *
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^@]+@[^@]+\.[^@]+$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium leading-6"
                  >
                    Contact no. *
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone-number"
                      {...register("phoneNumber", {
                        required: "Contact number is required",
                      })}
                      type="text"
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phoneNumber.message as string}
                      </p>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <legend className="block text-sm font-medium leading-6">
                    Types of Service *
                  </legend>
                  <div className="flex flex-wrap mt-6 gap-5 font-sans font-light">
                    {photographyFilter.map((filter) => (
                      <div key={filter} className="flex items-center gap-x-3">
                        <input
                          id={filter}
                          {...register("serviceType", {
                            required: "Please select a service type",
                          })}
                          type="radio"
                          value={filter}
                          className="h-4 w-4 border-gray-300 text-aber-600 focus:ring--600"
                        />
                        <label
                          htmlFor={filter}
                          className="block text-sm font-medium leading-6"
                        >
                          {filter}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.serviceType && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.serviceType.message as string}
                    </p>
                  )}
                </div>
                <div className="sm:col-span-4">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6"
                  >
                    Tell us more
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      {...register("about")}
                      name="about"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY as string}
                    onVerify={handleCaptchaChange}
                  />
                  {errors.captcha && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.captcha.message as string}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-start">
              <button
                type="submit"
                className="font-mono font-light rounded-md underline underline-offset-8 py-2 text-xs hover:text-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </main>
  );
}
