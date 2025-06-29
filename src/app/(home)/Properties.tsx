import { PropertyCard } from "@/components/home";
import { Button } from "@/components/ui";
import React from "react";
import Property1 from "@/assets/properties/akuabiago.png"; // Assuming you have an image in your assets
import Property2 from "@/assets/properties/akuabiago2.png"; // Assuming you have an image in your assets
import Property3 from "@/assets/properties/akuabiago3.png"; // Assuming you have an image in your assets

const properties = [
  {
    image: Property1,
    title: "Akuabiago Estate",
    landmarks: [
      "Government house Asaba",
      "Few minutes drive to summit junction",
      "Few minutes drive to Asaba Shoprite",
      "Few minutes drive from Delta state University Anwai Campus",
    ],
    bank: {
      name: "First Bank",
      accountNumber: "0393 3983 37",
    },
    amounts: {
      instantPayment: "2.5M",
      instalment: "2.5M",
    },
    contact: {
      phone: "090 2727 2727",
      whatsapp: "090 2727 2727",
    },
    location: "Ugbolu-Illa Express road, Asaba",
    propertySize: "464sqm per plot",
    allocation: "Immediately",
    titleDetails: ["Registered survey", "Deed of Assignment"],
  },
  {
    image: Property2,
    title: "Sunshine Gardens",
    landmarks: [
      "Close to major highway",
      "Proximity to commercial centers",
      "Near new international airport",
    ],
    bank: {
      name: "Zenith Bank",
      accountNumber: "1234 5678 90",
    },
    amounts: {
      instantPayment: "3.0M",
      instalment: "3.2M",
    },
    contact: {
      phone: "081 2345 6789",
      whatsapp: "081 2345 6789",
    },
    location: "Lekki-Epe Expressway, Lagos",
    propertySize: "500sqm per plot",
    allocation: "Within 30 days",
    titleDetails: ["Certificate of Occupancy", "Deed of Assignment"],
  },
  {
    image: Property3,
    title: "Royal Palm Estate",
    landmarks: [
      "Walking distance to a reputable school",
      "Near recreational parks",
      "Easy access to public transport",
    ],
    bank: {
      name: "GTBank",
      accountNumber: "9876 5432 10",
    },
    amounts: {
      instantPayment: "1.8M",
      instalment: "2.0M",
    },
    contact: {
      phone: "070 1122 3344",
      whatsapp: "070 1122 3344",
    },
    location: "Port Harcourt-Aba Road, Rivers State",
    propertySize: "400sqm per plot",
    allocation: "Upon full payment",
    titleDetails: ["Registered Survey", "Power of Attorney"],
  },
];

const Properties = () => {
  return (
    <section
      id="properties"
      className="w-full flex flex-col bg-gradient-to-b from-[rgba(74,0,1,1)] via-[rgba(3,68,50,1)] to-[rgba(3,68,50,1)]  relative flex-1 py-10 px-2 s.m:px-[MIN(100px,10%)]"
    >
      <div className="custom-width flex flex-col gap-8">
        <div className="flex items-baseline w-full justify-between">
          <h2 className="text-center text-2xl font-bold text-white my-8">
            Properties on Sales
          </h2>
          <Button variant="secondary" className="rounded-sm">
            See All
          </Button>
        </div>
      </div>
      <div className="flex scroll-p-[MIN(100px,10%)] px-[MIN(100px,10%)] mx-auto w-fit gap-4 overflow-x-auto justify-start ">
        {properties.map((property, index) => (
          <PropertyCard key={`property-${index}`} {...property} />
        ))}
      </div>
    </section>
  );
};

export default Properties;
