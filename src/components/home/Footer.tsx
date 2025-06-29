import Link from "next/link";
import {
  Call,
  Copyright,
  Facebook,
  Instagram,
  Location,
  LocationTick,
} from "iconsax-react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaReddit,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { Logo } from "../ui";
import { NavData } from "@/lib/data";
import { LocateIcon } from "lucide-react";
import { FaEnvelope } from "react-icons/fa";

const Links = [
  { name: "Explore", link: "/profile" },
  { name: "Company", link: "/checkout" },
  { name: "Correction Policy", link: "/correction-policy" },
  { name: "Terms of use", link: "/terms" },
];

export const Footer = () => {
  return (
    <footer className="z-0 w-full py-10 mt-auto bg-gradient-to-b from-[rgba(3,68,50,1)] to-[rgba(74,0,1,1)]">
      <div className="relative max-w-[1232px] mx-auto flex py-10 sm:py-6 flex-col  items-start bottom-0 left-0 w-full  text-white px-6 gap-8">
        <div className="relative rounded-3xl min-h-[352px] m-auto flex py-10  flex-col  items-start bottom-0 left-0 w-full bg-[rgba(5,67,49,1)] border border-[rgba(119,230,203,1)]  text-white px-6 sm:px-[MIN(100px,10%)] gap-8">
          <div className="flex  flex-wrap items-start justify-between flex-1 w-full gap-10">
            <div className="flex gap-6 flex-col items-start max-w-[MIN(90%,467px)]">
              <Logo />

              <p>
                Buildwise Solutions offers genuine, affordable land and housing
                across Africa and the diaspora. We guide clients with expert
                property research and consultancy so they invest smart and
                confidently.
              </p>
            </div>

            <div className="ml-auto flex-1 flex-wrap md:flex-nowrap  justify-between items-start flex gap-10">
              <div className="flex justify-between min-w-[MIN(100%,309px)] items-start gap-4  gap-x-10 flex-col sm:max-w-[50%]">
                <p className="font-bold">Get In touch</p>

                <p className="flex gap-4 items-center">
                  <Location size={24} variant="Bold" color="currentColor" />
                  6/10 Gaius Street Awada Obosi Onitsha
                </p>
                <div className="flex gap-4 items-start">
                  <Call size={18} variant="Bold" color="currentColor" />
                  <div className="flex gap-1 flex-col">
                    <a href="tel:+2349039451527">+234 9039 4515 27</a>
                    <a href="tel:+2348174084680">+234 8174 0846 80</a>
                    <a href="tel:+2348060974335">+234 8060 9743 35</a>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <FaEnvelope size={18} color="currentColor" className="mt-2" />
                  <div className="flex flex-col">
                    <a href="mailto:info@buildwise.ng">info@buildwise.ng</a>
                    <a href="mailto:buildwise@gmail.com">buildwise@gmail.com</a>
                  </div>
                </div>
              </div>

              <ul className="flex justify-between items-start gap-4  gap-x-10 flex-col sm:max-w-[50%]">
                <p className="font-bold">Quick Links</p>
                {NavData.map(({ name, path }, index) => (
                  <li key={`links-${index}`}>
                    <Link className="capitalize group flex gap-1" href={path}>
                      {">"} <p className="group-hover:underline">{name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <ul className="flex flex-wrap items-center gap-4 gap-y-2">
            <p className="w-full text-xs">Follow us:</p>
            <li>
              <Link href="#">
                <FaInstagram size={16} />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FaFacebook />
              </Link>
            </li>

            <li>
              <Link href="#">
                <FaYoutube />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
