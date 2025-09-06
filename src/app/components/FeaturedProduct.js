"use client";
import React from "react";
import { Carousel } from "@material-tailwind/react";

const featuredProducts = [
  {
    id: 1,
    title: "HPLC System Pro 3000",
    description:
      "High-performance liquid chromatography system with advanced detection capabilities",
    price: "$12,500",
    image: "/img (1).png",
  },
  {
    id: 2,
    title: "Eppendorf Filter Tips",
    description:
      "Premium quality filter tips for precision pipetting, sterile and DNase/RNase free",
    price: "$85 / box",
    image: "/img (2).png",
  },
  {
    id: 3,
    title: "PCR Thermal Cycler",
    description:
      "Fast and reliable thermal cycling with intuitive touchscreen interface",
    price: "$4,999",
    image: "/img.png",
  }
  // {
  //   id: 4,
  //   title: "Centrifuge Max 5000",
  //   description:
  //     "High-speed centrifuge ideal for labs requiring efficiency and reliability",
  //   price: "$2,200",
  //   image: "/img (1).png",
  // },
  // {
  //   id: 5,
  //   title: "Microscope UltraZoom",
  //   description:
  //     "Advanced microscope with HD imaging and multi-level magnification",
  //   price: "$1,750",
  //   image: "/img.png",
  // },
  // {
  //   id: 6,
  //   title: "Autoclave QuickSteril",
  //   description:
  //     "Compact autoclave unit for quick sterilization of lab tools",
  //   price: "$3,800",
  //   image: "/img (2).png",
  // },
];

const Card = ({ product }) => (
  <div className="shadow-md border  w-full max-w-sm bg-white">
    <img
      src={product.image}
      alt={product.title}
      className=" w-full h-48 object-cover"
    />
    <div className="mt-4 p-4">
      <h3 className="font-semibold text-lg text-gray-800">
        {product.title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-blue-600 font-bold">{product.price}</span>
        <span className="text-blue-500 text-xl">→</span>
      </div>
    </div>
  </div>
);

const FeaturedProducts = () => {
  const grouped = featuredProducts.reduce((acc, _, i, arr) => {
    if (i % 3 === 0) acc.push(arr.slice(i, i + 3));
    return acc;
  }, []);

  return (
    <div className="px-4 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Featured Products
      </h2>
      <Carousel
        className="rounded-xl"
        navigation={({ setActiveIndex, activeIndex, length }) => (
          <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2">
            {new Array(length).fill(0).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 w-2 rounded-full transition-all ${activeIndex === i ? "bg-pink-500 w-4" : "bg-gray-300"}`}
              />
            ))}
          </div>
        )}
      >
        {grouped.map((group, idx) => (
          <div
            key={idx}
            className="flex justify-center gap-6 px-2 md:px-4"
          >
            {group.map((product) => (
              <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3" key={product.id}>
                <Card product={product} />
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;
