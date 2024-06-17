import { useState } from "react";
import SideBar from "../components/SideBar";
import { FaEdit, FaUser } from "react-icons/fa";
import ReactPaginate from "react-paginate";

export default function Admin() {
  const allUsers = [
    {
      name: "Katiana",
      email: "email@gmail.com",
    },
    { name: "Katiana", email: "email@gmail.com" },
    { name: "Katiana", email: "email@gmail.com" },
    {
      name: "Katiana",
      email: "email@gmail.com",
    },
    { name: "Katiana", email: "email@gmail.com" },
    { name: "Katiana", email: "email@gmail.com" },
    { name: "Katiana", email: "email@gmail.com" },
    {
      name: "Katiana",
      email: "email@gmail.com",
    },
    { name: "Katiana", email: "email@gmail.com" },
    { name: "Katiana", email: "email@gmail.com" },
    { name: "Katiana", email: "email@gmail.com" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const offset = currentPage * usersPerPage;
  const currentPageUsers = allUsers.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(allUsers.length / usersPerPage);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };
  return (
    <div className="bg-orange_light flex">
      <div className="bg-orange_light flex w-full h-screen">
        <SideBar />
        <div className="w-full p-10 flex flex-col">
          <h1 className="text-3xl font-bold mb-4">Usuários</h1>
          <div className=" overflow-y-auto max-w-full">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="">
                <tr className="bg-orange_primary text-left text-lg">
                  <th className="py-3 px-4 font-semibold">Nome</th>
                  <th className="py-3 px-4 font-semibold">Email</th>

                  <th className="py-3 px-4 font-semibold ">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPageUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`text-left border-b ${
                      index % 2 === 0 ? "bg-orange_light" : "bg-white"
                    }`}
                  >
                    <td className="py-3 px-4 break-words max-w-32">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 break-words max-w-32">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 flex space-x-2">
                      <FaUser className="text-gray-600" />
                      <FaEdit className="text-gray-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
    </div>
  );
}
