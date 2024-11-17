"use client";

import { useState } from "react";
import { Field, Label, Switch } from "@headlessui/react";
import Navbar from "../../components/Navbar/Navbar";

export default function ContactUs() {
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <Navbar />
      <div className="w-[73%] mx-auto mt-8 md:mt-5 ">
        <span className="text-[#989898] font-bold text-sm">Home</span>

        <h1 className="font-bold text-[#4e4e4e] font-barlow mt-4 text-5xl">
          Contact Chrom Tech
        </h1>
      </div>

      <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-16">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-7xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Contact sales
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch mt-16 mx-auto max-w-7xl">
          <form action="#" method="POST" className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="company"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Company
                </label>
                <div className="mt-2.5">
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      <option>Pak</option>
                      <option>CA</option>
                      <option>US</option>
                    </select>
                  </div>
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm/6 font-semibold text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <Field className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
                  >
                    <span className="sr-only">Agree to policies</span>
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <Label className="text-sm/6 text-gray-600">
                  By selecting this, you agree to our{" "}
                  <a href="#" className="font-semibold text-indigo-600">
                    privacy&nbsp;policy
                  </a>
                  .
                </Label>
              </Field>
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Let's talk
              </button>
            </div>
          </form>

          <div className="w-full lg:w-[40%] xl:w-[45%] mt-8 flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13604.027386270297!2d74.3350073!3d31.5496994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904f3f5bc15a3%3A0x809b4a7d79b8f178!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1697029074735!5m2!1sen!2s"
              width="100%"
              allowFullScreen=""
              loading="lazy"
              title="The WebCraft Solutions Limited Location"
              className="border-0 rounded-lg shadow-lg sm:h-80 md:h-[500px] lg:h-[600px]"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
}
