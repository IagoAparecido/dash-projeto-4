import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { FaArrowLeft } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { api } from "../utils/api";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { FormatDate } from "../utils/FormatDate";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import CardPost from "../components/CardPost";

interface UserTypes {
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

export default function UserPosts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<UserTypes[]>([]);
  const [pageCount, setPageCount] = useState(0);

  const id = useParams<{ userId: string }>();
  const token = sessionStorage.getItem("token");

  const fetchPosts = async (page: number) => {
    try {
      const response = await fetch(
        `${api}/posts/user/${id.userId}?page=${page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setData(data.posts);
        setPageCount(data.totalPages);
      } else {
        console.error("Failed to fetch posts");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handlePageClick = ({ selected }: any) => {
    fetchPosts(selected);
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="bg-orange_light flex w-full h-screen">
      <SideBar />
      <div className="w-full  p-10 flex flex-col">
        <h1 className="text-3xl font-bold mb-4 flex gap-3 items-center">
          <Link to={"/home"} className="">
            <FaArrowLeft size={22} className="top-5 left-5" />
          </Link>
          Posts do usuário: {data[0]?.user.name}
        </h1>
        <div className="overflow-x-auto overflow-y-auto max-w-full flex flex-col gap-2">
          {loading && (
            <div className="flex justify-center rounded-lg">
              <div className="spinner p-5 m-10"></div>
            </div>
          )}

          {data.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg font-medium">Usuário não fez nenhum post</p>
            </div>
          ) : (
            data?.map((post, index) => (
              <CardPost
                key={index}
                name={post.name}
                type={post.type}
                city={post.city}
                createdAt={post.createdAt}
                images={post.images}
                postId={post.id}
                uf={post.uf}
                sex={post.sex}
                user={post.user}
              />
            ))
          )}
        </div>
        <div className="mt-4">
          <ReactPaginate
            previousLabel={"Anterior"}
            nextLabel={"Próximo"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"flex justify-center space-x-2 gap-2"}
            previousLinkClassName={"px-3 py-1 bg-orange_primary rounded"}
            nextLinkClassName={"px-3 py-1 bg-orange_primary rounded"}
            disabledClassName={"opacity-50 cursor-not-allowed"}
            activeClassName={"bg-orange_primary px-2 rounded text-white"}
          />
        </div>
      </div>
    </div>
  );
}
