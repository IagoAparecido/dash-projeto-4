import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FormatDate } from "../utils/FormatDate";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { api } from "../utils/api";

interface Props {
  postId: string;
  name: string;
  createdAt: string;
  city: string;
  images: [{ url: string }];
  type: string;
  uf: string;
  user: { name: string };
  sex: string;
}

export default function CardPost({
  postId,
  uf,
  city,
  type,
  name,
  user,
  createdAt,
  sex,
  images,
}: Props) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };
  return (
    <Link
      to={`/posts/${postId}`}
      className="bg-white flex text-dark_gray gap-5 p-5 items-center relative cursor-pointer hover:opacity-85 rounded-lg"
    >
      <img
        className="w-[100px] h-[100px] rounded-lg object-cover"
        src={`${api}/uploads/posts/${images[0].url}`}
        alt=""
      />

      <div className="flex flex-col">
        <p className="font-bold">{truncateText(name, 50)}</p>
        <p className="text-sm">Data da postagem: {FormatDate(createdAt)}</p>
        <p className="text-sm">Postagem feita por: {user.name}</p>
        <p className="text-sm flex items-center gap-1">
          <FaLocationDot />
          {city} | {uf}
        </p>
      </div>
      <div className="pl-[150px] mt-[-70px] top-5 flex gap-5">
        <p className="bg-orange_light text-orange_primary px-3 py-1 rounded-lg">
          {type}
        </p>
        <p className="bg-orange_light flex justify-center items-center text-orange_primary px-3 py-1 rounded-lg">
          {sex == "Macho" ? <BsGenderMale size={18} /> : <BsGenderFemale />}
        </p>
      </div>

      <span className="absolute right-5 text-orange_primary">
        <IoIosArrowForward size={22} />
      </span>
    </Link>
  );
}
