import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props {
  postId: string;
}

export default function CardPost({ postId }: Props) {
  return (
    <Link
      to={`/posts/${postId}`}
      className="bg-white flex gap-5 p-5 items-center relative cursor-pointer hover:opacity-85 rounded-lg"
    >
      <img className="w-[100px] h-[100px] rounded-lg" src="" alt="" />

      <div className="flex flex-col">
        <p className="font-bold">Nome</p>
        <p className="text-sm">data</p>
        <p className="text-sm">post by</p>
        <p className="text-sm flex items-center gap-2">
          <FaLocationDot />
          local
        </p>
      </div>
      <div className="pl-[150px] mt-[-70px] top-5 flex gap-5">
        <p className="bg-orange_light text-orange_primary px-3 py-1 rounded-lg">
          tipo
        </p>
        <p className="bg-orange_light text-orange_primary px-3 py-1 rounded-lg">
          sexo
        </p>
      </div>

      <span className="absolute right-5 text-orange_primary">
        <IoIosArrowForward size={22} />
      </span>
    </Link>
  );
}
