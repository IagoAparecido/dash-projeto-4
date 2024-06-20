import React, { FormEvent, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { FaEdit, FaUser } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { api } from "../utils/api";
import { FormatDate } from "../utils/FormatDate";
import { MdBlock } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";
import { BiCheck } from "react-icons/bi";

interface DataUsersTypes {
  email: string;
  name: string;
  created_at: string;
  id: string;
  status: string;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<DataUsersTypes[]>([]);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [showModalBlock, setShowModalBlock] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  const [nameUser, setNameUser] = useState<string>("");
  const [statusUser, setStatusUser] = useState<string>("");
  console.log(data);

  const usersPerPage = 10;
  const offset = currentPage * usersPerPage;
  const currentPageUsers = data.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(data.length / usersPerPage);

  const token = sessionStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${api}/users/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
        setLoadingPage(false);
      }
    } catch (e) {
      console.error("Erro: ", e);
      throw e;
    }
  };

  const handleBlockUsers = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${api}/users/user/block/${idUser}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });

      if (response.ok) {
        setShowModalBlock(false);
        setSuccess("usuário bloqueado com sucesso!");
        setTimeout(() => {
          setSuccess("");
        }, 5000);
        fetchUsers();
      } else {
        setShowModalBlock(false);
        setError("Erro ao bloquear usuário!");
        setTimeout(() => {
          setError("");
        }, 5000);
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      setShowModalBlock(false);
      setError("Erro ao bloquear usuário!");
      setTimeout(() => {
        setError("");
      }, 5000);
      console.error("Erro:", error);
    }
  };

  const openBlock = (id: string, name: string, status: string) => {
    setIdUser(id);
    setNameUser(name);
    setStatusUser(status);
    setShowModalBlock(true);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  return (
    <div className="bg-orange_light flex w-full h-screen text-dark_gray">
      <SideBar />
      <div className="w-full p-10 flex flex-col">
        <h1 className="text-3xl font-bold mb-4">Usuários</h1>
        {error && (
          <span className="bg-red-600 rounded p-2 flex items-center gap-2 text-base text-white mb-2">
            <IoIosWarning size={22} /> {error}
          </span>
        )}
        {success && (
          <span className="bg-green-600 rounded p-2 flex items-center gap-2 text-base text-white mb-2">
            <BiCheck size={22} />{" "}
            {statusUser == "UNAUTHORIZED"
              ? "Usuário desbloqueado com sucesso."
              : "Usuário bloqueado com sucesso."}
          </span>
        )}
        <div className="overflow-x-auto overflow-y-auto max-w-full">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
            <thead className="">
              <tr className="bg-orange_primary text-left text-lg">
                <th className="py-3 px-4 font-semibold">Nome</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">Data de criação</th>
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
                  <td className="py-3 relative px-4 break-words max-w-32">
                    {user.status == "UNAUTHORIZED" && (
                      <span className="absolute top-0 text-xs text-red-600">
                        Usuário bloqueado
                      </span>
                    )}
                    {user.name}
                  </td>
                  <td className="py-3 px-4 break-words max-w-32">
                    {user.email}
                  </td>
                  <td className="py-3 px-4 break-words max-w-32">
                    {FormatDate(user.created_at)}
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    <FaUser
                      size={18}
                      className="text-gray-600 cursor-pointer"
                    />
                    <MdBlock
                      onClick={() => openBlock(user.id, user.name, user.status)}
                      size={18}
                      className="text-red-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loadingPage && (
            <div className="flex justify-center">
              <div className="spinner p-5 m-3"></div>
            </div>
          )}
        </div>

        {showModalBlock ? (
          <>
            <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*body*/}
                  <div className="relative w-[400px] gap-2 p-6 flex flex-col justify-center items-center">
                    {statusUser == "UNAUTHORIZED" ? (
                      <h1>Desloquear usuário: {nameUser}</h1>
                    ) : (
                      <h1>Bloquear usuário: {nameUser}</h1>
                    )}
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={handleBlockUsers}
                        className="bg-green-500 px-2 py-1 rounded"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setShowModalBlock(false)}
                        className="bg-red-500 px-2 py-1 rounded"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
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
