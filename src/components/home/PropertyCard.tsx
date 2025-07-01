"use client";

import Image, { StaticImageData } from "next/image";
import { MapPin, Flag, FileText, Copy } from "lucide-react";
import React from "react";
import { Button } from "../ui";
import { FaWhatsapp } from "react-icons/fa6";

export const PropertyCard = ({
  title = "",
  image,
  landmarks,
  bank,
  amounts,
  contact,
  location,
  propertySize,
  allocation,
  titleDetails,
}: {
  image?: string | StaticImageData;
  title?: string;
  landmarks?: string[];
  bank?: {
    name: string;
    accountNumber: string;
  };
  amounts?: {
    instantPayment: string;
    instalment: string;
  };
  contact?: {
    phone: string;
    whatsapp: string;
  };
  location?: string;
  propertySize?: string;
  allocation?: string;
  titleDetails?: string[];
}) => {
  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(bank?.accountNumber || "");
  };

  const handleWhatsAppContact = () => {
    window.open(`https://wa.me/${contact?.whatsapp}`, "_blank");
  };

  return (
    <div className="max-w-[MIN(100%,608px)] flex flex-col w-full min-w-[MIN(90%,590px)] p-2 backdrop-blur-sm  bg-[rgba(255,255,255,0.32)]  rounded-3xl overflow-hidden shadow-2xl">
      <div className="relative">
        <div className="w-full relative rounded-[16px] overflow-hidden aspect-[592/323] h-auto">
          {image && (
            <Image
              src={image}
              alt={title}
              width={592}
              height={323}
              placeholder="blur"
              className="w-full h-full"
              unoptimized
            />
          )}
        </div>
        <div className=" flex items-center justify-between text-white p-4">
          <h1 className="text-[28px] font-bold">{title}</h1>
          <div className="flex items-center gap-4">
            {amounts?.instantPayment && (
              <div className="text-start">
                <div className="text-xl font-bold">
                  {amounts.instantPayment}
                </div>
                <div className="text-sm opacity-90">Instant payment</div>
              </div>
            )}
            {amounts?.instalment && (
              <div className="text-start">
                <div className="text-xl font-bold">{amounts?.instalment}</div>
                <div className="text-sm opacity-90">Instalment</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full gap-4">
        <div className="flex gap-1 flex-1 ">
          {/* Landmarks Section */}
          <div className="flex flex-col gap-1 flex-1">
            <div className="bg-white rounded-tl-2xl flex-1">
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Flag className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Landmarks</h3>
                </div>
                <ol className="space-y-2 list text-sm text-gray-700 list-disc list-inside">
                  {landmarks?.map((landmark, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 list-disc list-inside"
                    >
                      • {landmark}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            {/* Bank Details */}
            <div className="bg-white rounded-bl-2xl ">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-sm items-center gap-3">
                    <div className="size-12 bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">FB</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        First Bank
                      </div>
                      <div className="font-bold text-gray-800">
                        0393 3983 37
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyAccountNumber}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white flex-1 rounded-r-2xl">
            <div className="p-2 space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {propertySize}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-medium text-gray-800">{location}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 mt-1 flex-shrink-0">
                    <div className="w-3 h-3 bg-gray-600 rounded-sm"></div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">
                      Property allocation
                    </div>
                    <div className="font-medium text-gray-800">
                      {allocation}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-gray-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-600">Title</div>
                    <div className=" text-gray-800">
                      {titleDetails?.map((detail, index) => (
                        <span key={`details-${index}`} className="block">
                          {detail} <br />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Contact */}
        <button
          onClick={handleWhatsAppContact}
          className="w-fit mt-auto p-2 border border-transparent hover:border-green-600 text-white rounded-xl flex items-center justify-center gap-2"
        >
          <FaWhatsapp className="size-4 text-green-500" />
          <span className="font-semibold text-sm">090 2727 2727</span>
        </button>
      </div>
    </div>
  );
};
