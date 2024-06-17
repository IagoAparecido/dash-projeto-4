import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex items-center w-full h-screen text-dark_gray">
      <div className="w-1/2 h-full sm:block hidden">
        <img
          className="w-full h-full object-cover"
          src="/imagem-login.png"
          alt="imagem de um cachorro"
        />
      </div>
      <div className="sm:w-1/2 w-full flex gap-3 flex-col justify-center items-center h-full">
        <h2>Logo</h2>
        <form className="flex flex-col space-y-4 w-full items-center justify-center pl-5 pr-5">
          <input
            type="text"
            className="border rounded p-2 lg:w-[400px] w-full bg-orange_light border-none"
            placeholder="Digite seu e-mail"
          />
          <input
            type="password"
            className="border rounded p-2 lg:w-[400px] w-full bg-orange_light border-none "
            placeholder="Digite sua senha"
          />
          <button className="bg-orange_primary text-white lg:w-[400px] w-full rounded p-2">
            <Link to="/home">Entrar</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
