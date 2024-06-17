import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function PostDetails() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ["/imagem-post1.png", "/imagem-post.png", "/imagem-post3.png"];

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  return (
    <div className="bg-orange_light flex w-full text-dark_gray">
      <SideBar />
      <div className="flex w-full items-center justify-center p-10">
        <div className="h-[630px] w-[500px] relative ">
          <img
            className="h-full w-full object-cover rounded-l-lg"
            src={images[currentImage]}
            alt=""
          />
          <Link to={"/posts"}>
            <FaArrowLeft
              color="white"
              size={28}
              className="absolute top-5 left-5"
            />
          </Link>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
          >
            {"<"}
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
          >
            {">"}
          </button>
        </div>
        <div className="w-1/2 h-full max-h-[630px] flex flex-col justify-center gap-5 bg-white p-5">
          <div className="flex gap-2 self-end mt-[-50px] mb-5">
            <p className="px-3 py-1 bg-orange_light text-orange_primary rounded-lg">
              Cachorro
            </p>
            <p className="px-3 py-1 bg-orange_light text-orange_primary rounded-lg">
              Idade
            </p>
            <p className="px-3 py-1 bg-orange_light text-orange_primary rounded-lg">
              Sexo
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">Nome</h1>
            <h2 className="text-sm">publicado em 25/25/2525</h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              consequuntur dolor sit beatae earum, quae rerum odit. Facilis
              laboriosam culpa quae officia aspernatur itaque dolores at,
              perspiciatis quos nesciunt ducimus!
            </p>
            <p className="text-lg">post by Kati</p>
            <p className="flex items-center">
              <span className="text-orange_primary">
                <FaLocationDot />
              </span>
              <span className="ml-1">local</span>
            </p>
          </div>
          <button className="bg-[#A81E1E] hover:opacity-85 w-2/3 self-center mt-5 text-white p-2 rounded-lg">
            Remover Post
          </button>
        </div>
      </div>
    </div>
  );
}
