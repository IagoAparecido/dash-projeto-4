import { FormEvent, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { FaEdit, FaUser } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { api } from "../utils/api";
import { FormatDate } from "../utils/FormatDate";
import { MdPersonAddAlt1 } from "react-icons/md";
import { IoIosWarning } from "react-icons/io";

interface DataUsersTypes {
  email: string;
  name: string;
  created_at: string;
  id: string;
}

export default function Admin() {
  const [data, setData] = useState<DataUsersTypes[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DataUsersTypes | null>(null);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [editName, setEditName] = useState<string>("");
  const [editPassword, setEditPassword] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editConfirmPassword, setEditConfirmPassword] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);

  const token = sessionStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const offset = currentPage * usersPerPage;
  const currentPageUsers = data.slice(offset, offset + usersPerPage);
  const pageCount = Math.ceil(data.length / usersPerPage);

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

  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("As senhas devem iguais");
      setTimeout(() => {
        setError("");
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${api}/auth/register/admin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setLoading(false);
        setSuccess("Usuário criado com sucesso!");
        setEmail("");
        setName("");
        setConfirmPassword("");
        setPassword("");
        setTimeout(() => {
          setSuccess("");
          setShowModal(false);
        }, 4000);
        fetchUsers();
      } else if (response.status == 400) {
        setLoading(false);
        setError("E-mail já cadastrado");
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setLoading(false);
        setError("Erro ao cadastrar usuário");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (e) {
      console.error("Erro: ", e);
      setLoading(false);
      setError("Erro ao criar usuário!");
      setTimeout(() => {
        setError("");
      }, 5000);
      throw e;
    }
  };

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editPassword !== editConfirmPassword) {
      setError("As senhas devem iguais");
      setTimeout(() => {
        setError("");
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${api}/users/admin/${selectedUser?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({ name: editName, password: editPassword }),
      });

      if (response.ok) {
        setLoading(false);
        setSuccess("Usuário atualizado com sucesso!");
        setTimeout(() => {
          setSuccess("");
          setShowModal(false);
        }, 4000);
        fetchUsers();
      } else {
        setLoading(false);
        setError("Erro ao atualizar usuário");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (e) {
      console.error("Erro: ", e);
      setLoading(false);
      setError("Erro ao atualizar usuário!");
      setTimeout(() => {
        setError("");
      }, 5000);
      throw e;
    }
  };

  const openEditModal = (user: DataUsersTypes) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditPassword("");
    setEditConfirmPassword("");
    setShowModalEdit(true);
  };

  const handlePageClick = ({ selected }: any) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-orange_light flex text-dark_gray">
      <div className="bg-orange_light flex w-full h-screen">
        <SideBar />
        <div className="w-full p-10 flex flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-4">Usuários Admin</h1>
            <button
              className="bg-orange_primary flex justify-center items-center gap-2 px-2 py-1 rounded-md hover:opacity-90"
              onClick={() => setShowModal(true)}
            >
              <MdPersonAddAlt1 size={22} /> Adicionar usuário
            </button>

            {showModal ? (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="w-full flex items-center justify-end">
                          <button
                            className="self-end hover:opacity-85"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="text-3xl">×</span>
                          </button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="bg-orange_light p-4 w-[75px] rounded-full">
                            <MdPersonAddAlt1 size={40} />
                          </div>
                          <h1 className="text-xl font-bold">
                            Adicionar usuário
                          </h1>
                        </div>

                        <form
                          onSubmit={handleCreateUser}
                          className="flex flex-col gap-3 p-5"
                        >
                          <div className="flex flex-col">
                            <label className="text-sm">Nome</label>
                            <input
                              className="bg-orange_light p-2 rounded"
                              type="text"
                              placeholder="Digite o nome"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm">E-mail</label>
                            <input
                              className="bg-orange_light p-2 rounded"
                              type="email"
                              placeholder="Digite o e-mail"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col ">
                            <label className="text-sm">Senha</label>
                            <input
                              className="bg-orange_light p-2 rounded"
                              type="password"
                              placeholder="Digite a senha"
                              required
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col ">
                            <label className="text-sm">Confirmar Senha</label>
                            <input
                              type="password"
                              placeholder="Confirmar senha"
                              className="bg-orange_light p-2 rounded"
                              required
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                          {error && (
                            <span className="bg-red-600 rounded p-2 text-center flex justify-center items-center gap-2 text-base text-white">
                              <IoIosWarning size={22} /> {error}
                            </span>
                          )}
                          {success && (
                            <span className="bg-green-600 rounded p-2 text-center flex justify-center items-center gap-2 text-base text-white">
                              {success}
                            </span>
                          )}
                          <button
                            className="bg-orange_primary justify-center flex mt-2 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:opacity-90 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="spinner"></div>
                            ) : (
                              "Adicionar Usuário"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
            {showModalEdit && selectedUser && (
              <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-[700px] my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*body*/}
                      <div className="relative p-6 flex-auto">
                        <div className="w-full flex items-center justify-end">
                          <button
                            className="self-end hover:opacity-85"
                            onClick={() => setShowModalEdit(false)}
                          >
                            <span className="text-3xl">×</span>
                          </button>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                          <div className="bg-orange_light p-4 w-[75px] rounded-full">
                            <MdPersonAddAlt1 size={40} />
                          </div>
                          <h1 className="text-xl font-bold">Editar usuário</h1>
                        </div>

                        <form
                          onSubmit={handleUpdateUser}
                          className="flex flex-col gap-3 p-5"
                        >
                          <div className="flex flex-col">
                            <label className="text-sm">Nome</label>
                            <input
                              className="bg-orange_light p-2 rounded"
                              type="text"
                              placeholder="Digite o nome"
                              required
                              defaultValue={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-sm">E-mail</label>
                            <input
                              disabled
                              className="bg-orange_light p-2 rounded"
                              type="email"
                              placeholder="Digite o e-mail"
                              required
                              defaultValue={editEmail}
                            />
                          </div>
                          <div className="flex flex-col ">
                            <label className="text-sm">Senha</label>
                            <input
                              className="bg-orange_light p-2 rounded"
                              type="password"
                              placeholder="******"
                              required
                              onChange={(e) => setEditPassword(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col ">
                            <label className="text-sm">Confirmar Senha</label>
                            <input
                              type="password"
                              placeholder="******"
                              className="bg-orange_light p-2 rounded"
                              required
                              onChange={(e) =>
                                setEditConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                          {error && (
                            <span className="bg-red-600 rounded p-2 text-center flex justify-center items-center gap-2 text-base text-white">
                              <IoIosWarning size={22} /> {error}
                            </span>
                          )}
                          {success && (
                            <span className="bg-green-600 rounded p-2 text-center flex justify-center items-center gap-2 text-base text-white">
                              {success}
                            </span>
                          )}
                          <button
                            className="bg-orange_primary justify-center flex mt-2 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:opacity-90 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? (
                              <div className="spinner"></div>
                            ) : (
                              "Alterar Dados"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
              </>
            )}
          </div>
          <div className=" overflow-y-auto max-w-full">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
              <thead className="">
                <tr className="bg-orange_primary text-left text-lg">
                  <th className="py-3 px-4 font-semibold">Nome</th>
                  <th className="py-3 px-4 font-semibold">Email</th>
                  <th className="py-3 px-4 font-semibold">Data criação</th>

                  <th className="py-3 px-4 font-semibold ">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentPageUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`text-left border-b ${
                      index % 2 === 0 ? "bg-orange_light" : "white"
                    }`}
                  >
                    <td className="py-3 px-4 break-words max-w-32">
                      {user.name}
                    </td>
                    <td className="py-3 px-4 break-words max-w-32">
                      {user.email}
                    </td>
                    <td className="py-3 px-4 break-words max-w-32">
                      {FormatDate(user.created_at)}
                    </td>
                    <td className="py-3 px-4 flex space-x-2 self-center">
                      <button onClick={() => openEditModal(user)}>
                        <FaEdit size={18} className="text-gray-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {loadingPage && (
              <tr className="flex justify-center bg-white">
                <div className="spinner p-5 m-3"></div>
              </tr>
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
    </div>
  );
}
