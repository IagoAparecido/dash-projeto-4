import { useState } from "react";
import SideBar from "../components/SideBar";
import CardPost from "../components/CardPost";
import ReactPaginate from "react-paginate";

export default function Posts() {
  const allPosts = [
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
    {
      name: "Katiana",
      email: "email@gmail.com",
      posts: 3,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const offset = currentPage * usersPerPage;
  const currentPageUsers = allPosts.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(allPosts.length / usersPerPage);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-orange_light flex w-full h-screen">
      <SideBar />
      <div className="w-full  p-10 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Usuários</h1>
        <div className="overflow-x-auto overflow-y-auto max-w-full flex flex-col gap-2">
          {currentPageUsers.map((user, index) => (
            <CardPost postId="1" />
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
