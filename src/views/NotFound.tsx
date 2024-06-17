import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <h1 className="mt-8 font-bold text-3xl">404 - Página não encontrada!</h1>
      <Link
        className="text-xl hover:opacity-70 flex items-center gap-2"
        to={"/"}
      >
        <FaArrowLeft />
        Voltar
      </Link>
    </div>
  );
}
