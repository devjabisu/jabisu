import Image from "next/image";
import Link from "next/link";

import { AiFillAppstore, AiFillPushpin, AiFillGithub } from "react-icons/ai";

export default function Home() {
  return (
    <div>
      <section className="flex flex-col items-center justify-center mt-6">
        <h1 className="text-center font-bold text-3xl text-gray-800 mt-6">
          Welcome to Jabisu, a tool which enhances your developing experience
        </h1>
      </section>
      <section id="cards-list" className="mt-24 ml-auto mr-auto max-w-2xl">
        <div className="grid grid-cols-1 gap-8">
          <div id="first-card">
            <a
              href="/tools"
              className="block w-full p-7 bg-white border border-gray-200 rounded-lg show hover:bg-gray-100"
            >
              <span className="flex">
                <AiFillAppstore className="text-2xl mt-1" />
                <h2 className="text-2xl font-semibold pl-4">All APPS</h2>
              </span>
              <p className="mt-3 text-lg text-gray-600">
                Discover apps which make development easier
              </p>
            </a>
          </div>
          <div id="second-card">
            <a
              href="#"
              className="block w-full p-7 bg-white border border-gray-200 rounded-lg show hover:bg-gray-100"
            >
              <span className="flex">
                <AiFillPushpin className="text-2xl mt-1" />
                <h2 className="text-2xl font-semibold pl-4">Pinned APPS</h2>
              </span>
              <p className="mt-3 text-lg text-gray-600">
                Quick access to your favorite apps
              </p>
            </a>
          </div>
          <div id="third-card">
            <a
              href="#"
              className="block w-full p-7 bg-white border border-gray-200 rounded-lg show hover:bg-gray-100"
            >
              <span className="flex">
                <AiFillGithub className="text-2xl mt-1" />
                <h2 className="text-2xl font-semibold pl-4">Contribute</h2>
              </span>
              <p className="mt-3 text-lg text-gray-600">
                Fork me on github and make it even better
              </p>
            </a>
          </div>
        </div>
      </section>
      <footer className="text-gray-400 absolute bottom-8 m-auto left-0 right-0">
        <p className="text-right mr-4">
          Build by{" "}
          <a href="#" className="hover:text-blue-800">
            @seanchain
          </a>{" "}
          With ❤️
        </p>
      </footer>
    </div>
  );
}
