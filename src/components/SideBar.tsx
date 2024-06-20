import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMdExit, IoMdClose, IoMdMenu } from "react-icons/io";
import "../App.css";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function SideBar() {
  const [activeLink, setActiveLink] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const name = sessionStorage.getItem("name");
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <div className="h-screen flex">
      {isSidebarOpen && (
        <div className="w-[300px] relative bg-orange_primary flex flex-col items-center">
          <div className="absolute right-2 top-2">
            <IoMdClose
              className="text-white text-2xl cursor-pointer"
              onClick={() => setIsSidebarOpen(false)}
            />
          </div>
          <h2 className="h-52 text-center text-white text-xl flex items-center">
            Logo
          </h2>
          <div className="h-full w-full flex flex-col items-end">
            <div className="flex flex-col w-[90%] h-full justify-between items-center">
              <div className="flex flex-col gap-2 w-full text-lg">
                <Link
                  className={`p-4 w-full cursor-pointer rounded-l-2xl transition duration-150 hover:bg-orange_light hover:text-dark_gray ${
                    activeLink.includes("home") || activeLink.includes("user")
                      ? "bg-orange_light text-dark_gray"
                      : "text-white"
                  }`}
                  to={"/home"}
                  onClick={() => handleLinkClick("/home")}
                >
                  Todos os Usuários
                </Link>
                <Link
                  className={`p-4 w-full cursor-pointer rounded-l-2xl transition duration-150 hover:bg-orange_light hover:text-dark_gray ${
                    activeLink.includes("posts")
                      ? "bg-orange_light text-dark_gray"
                      : "text-white"
                  }`}
                  to={"/posts"}
                  onClick={() => handleLinkClick("/posts")}
                >
                  Todos os Posts
                </Link>
                <Link
                  className={`p-4 w-full cursor-pointer rounded-l-2xl transition duration-150 hover:bg-orange_light hover:text-dark_gray ${
                    activeLink === "/admin"
                      ? "bg-orange_light text-dark_gray"
                      : "text-white"
                  }`}
                  to={"/admin"}
                  onClick={() => handleLinkClick("/admin")}
                >
                  Administradores
                </Link>
              </div>
            </div>
          </div>
          <span className="flex justify-center items-center gap-2 text-white text-center font-bold text-xl">
            <FaUser /> {name}
          </span>
          <button
            onClick={() => handleLogout()}
            className="flex p-4 cursor-pointer rounded-2xl transition duration-150 hover:underline gap-2 items-center text-xl text-white mb-6"
          >
            Sair
            <IoMdExit />
          </button>
        </div>
      )}
      {!isSidebarOpen && (
        <div className="flex p-4">
          <IoMdMenu
            className="text-orange_primary hover:opacity-85 text-3xl cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
