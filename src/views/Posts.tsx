import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import CardPost from "../components/CardPost";
import ReactPaginate from "react-paginate";
import { api } from "../utils/api";

interface PostsTypes {
  id: string;
  name: string;
  createdAt: string;
  city: string;
  description: string;
  images: [{ url: string }];
  type: string;
  uf: string;
  user: { name: string };
  sex: string;
}

export default function Posts() {
  const [data, setData] = useState<PostsTypes[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);

  const token = sessionStorage.getItem("token");

  const fetchPosts = async (page: number) => {
    try {
      const response = await fetch(`${api}/posts?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });

      if (response.ok) {
        setLoading(false);
        const data = await response.json();

        setData(data.posts);
        setPageCount(data.totalPages);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handlePageClick = ({ selected }: any) => {
    fetchPosts(selected);
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);
  return (
    <div className="bg-orange_light flex w-full h-screen">
      <SideBar />
      <div className="w-full  p-10 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Usuários</h1>
        <div className="overflow-x-auto overflow-y-auto max-w-full flex flex-col gap-2">
          {loading && (
            <div className="flex justify-center rounded-lg">
              <div className="spinner p-5 m-10"></div>
            </div>
          )}
          {data.map((post, index) => (
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
          ))}
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
