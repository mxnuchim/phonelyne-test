import React from "react";
import { Mail, Twitter, Facebook } from "lucide-react";
import Divider from "./Divider";
import LogoLight from "../icons/logo/LogoLight";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blackBg text-white pb-12 pt-8 lg:pb-8 lg:pt-12 px-4 md:px-16 h-28 lg:h-60">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        {/* Logo */}
        <div className="mb-6 md:mb-0">
          <LogoLight />
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="#pages" className="hover:underline text-base">
              Pages
            </a>
          </li>
          <li>
            <a href="#help" className="hover:underline text-base">
              Help
            </a>
          </li>
          <li>
            <a href="#devices" className="hover:underline text-base">
              Devices
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline text-base">
              Contact
            </a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-6 md:mt-0">
          <a href="mailto:support@example.com" aria-label="Mail">
            <Mail className="h-5 w-5 hover:text-gray-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5 hover:text-gray-400" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5 hover:text-gray-400" />
          </a>
        </div>
      </div>

      {/* Divider */}
      <Divider className="my-8" />

      {/* Terms and Conditions & Privacy Policy */}
      <div className="flex justify-start text-sm space-x-6">
        <a href="#terms" className="hover:underline">
          Terms and Conditions
        </a>
        <a href="#privacy" className="hover:underline">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
