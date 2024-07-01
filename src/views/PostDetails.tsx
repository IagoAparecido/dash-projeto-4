import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { api } from "../utils/api";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FormatDate } from "../utils/FormatDate";
import { useNavigate } from "react-router-dom";

interface PostsTypes {
  id: string;
  name: string;
  age: string;
  createdAt: string;
  city: string;
  description: string;
  images: [{ url: string }];
  type: string;
  uf: string;
  user: { name: string };
  sex: string;
}

export default function PostDetails() {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [data, setData] = useState<PostsTypes | null>(null);

  const id = useParams<{ postId: string }>();
  const token = sessionStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${api}/posts/post/${id.postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleDeletePosts = async () => {
    setLoadingButton(true);
    try {
      const response = await fetch(`${api}/posts/post/${id.postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });

      if (response.ok) {
        setLoadingButton(false);
        navigate("/posts");
      } else {
        setLoadingButton(false);
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      setLoadingButton(false);
      console.error("Erro:", error);
    }
  };

  const nextImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage + 1) % (data?.images.length || 1)
    );
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) =>
        (prevImage - 1 + (data?.images.length || 1)) %
        (data?.images.length || 1)
    );
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="bg-orange_light flex w-full text-dark_gray">
      <SideBar />
      <div className="flex w-full items-center justify-center p-10">
        <div className="h-[630px] w-[500px] relative ">
          <img
            className="h-full w-full object-cover rounded-l-lg"
            src={`${api}/uploads/posts/${data!.images[currentImage]?.url}`}
            alt="Imagem do animal"
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
        <div className="w-1/2 h-full max-h-[630px] flex flex-col justify-center gap-5 bg-white px-10 py-5 ">
          <div className="flex gap-2 self-end mt-[-50px] mb-5">
            <p className="px-3 py-1 bg-orange_light text-orange_primary rounded-lg">
              {data!.type}
            </p>
            <p className="px-3 py-1 bg-orange_light text-orange_primary rounded-lg">
              {data!.age} Anos
            </p>
            <p className="px-3 py-1 bg-orange_light text-orange_primary rounded-lg items-center justify-center flex">
              {data!.sex == "Macho" ? (
                <BsGenderMale size={18} />
              ) : (
                <BsGenderFemale />
              )}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{data!.name}</h1>
            <h2 className="text-base font-medium font-roboto text-[#555555]">
              publicado em {FormatDate(data!.createdAt)}
            </h2>
            <p className="text-lg text-[#6F6D6D] ">{data!.description}</p>
            <p className="text-base font-medium font-roboto text-[#555555]">
              postagem feita por {data!.name}
            </p>
            <p className="flex items-center">
              <span className="text-orange_primary">
                <FaLocationDot />
              </span>
              <span className="ml-1 text-[#555555]">
                {data!.city} - {data!.uf}
              </span>
            </p>
          </div>
          <button
            disabled={loadingButton}
            onClick={() => handleDeletePosts()}
            className="bg-[#951919] flex justify-center hover:opacity-85 w-full self-center mt-5 text-white p-2 rounded-lg"
          >
            {loadingButton ? <div className="spinner"></div> : "Remover Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
