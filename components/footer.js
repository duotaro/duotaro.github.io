import Link from "next/link.js";
import { GlobeAltIcon, } from "@heroicons/react/16/solid";
import GithubIcon from "./icons/github";
import XIcon from "./icons/x";
import GoogleIcon from "./icons/google";
import InstagramIcon from "./icons/instagram";

export default function Footer({  }) {

const socialLinks = [
	{
		id: 1,
		icon: <GlobeAltIcon className="w-5 h-5" />,
		url: 'https://www.stoman.me/',
	},
	{
		id: 2,
		icon: <GithubIcon />,
		url: 'https://github.com/realstoman',
	},
	{
		id: 3,
		icon: <XIcon />,
		url: 'https://twitter.com/realstoman',
	},
	{
		id: 4,
		icon: <GoogleIcon />,
		url: 'https://www.linkedin.com/in/realstoman',
	},
	{
		id: 5,
		icon: <InstagramIcon />,
		url: 'https://www.youtube.com/c/realstoman',
	},
];


  return (
      <footer className="container mx-auto">
        <div className="pt-10 sm:pt-30 pb-8 mt-10 border-t-2 border-primary-light dark:border-secondary-dark">
          {/* Footer social links */}
          <div className="font-general-regular flex flex-col justify-center items-center mb-6 sm:mb-14">
            <p className="text-3xl sm:text-4xl text-primary-dark dark:text-primary-light mb-5">
              Follow me
            </p>
            <ul className="flex gap-4 sm:gap-8">
              {socialLinks.map((link) => (
                <a
                  href={link.url}
                  target="__blank"
                  key={link.id}
                  className="text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer rounded-lg bg-gray-50 dark:bg-ternary-dark hover:bg-gray-100 shadow-sm p-4 duration-300"
                >
                  <i className="text-xl sm:text-2xl md:text-3xl">
                    {link.icon}
                  </i>
                </a>
              ))}
            </ul>
          </div>

          <div className="font-general-regular flex justify-center items-center text-center">
            <div className="text-lg text-ternary-dark dark:text-ternary-light">
              &copy; {new Date().getFullYear()}
              <a
                href="https://github.com/realstoman/react-tailwindcss-portfolio"
                target="__blank"
                className="hover:underline hover:text-indigo-600 dark:hover:text-indigo-300 ml-1 duration-500"
              >
                Techvenience
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
}