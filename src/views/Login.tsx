import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import "../App.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (email === "" || password === "") return;

    try {
      setLoading(true);

      const response = await login(email, password);

      if (response.ok) {
        navigate("/home");
        setLoading(false);
      } else {
        setError("Credenciais inválidas!");
        setTimeout(() => {
          setError("");
        }, 5000);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError("Erro ao realizar o login!");
      setTimeout(() => {
        setError("");
      }, 5000);
      setLoading(false);
    }
  };

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
        <img src="/logo.svg" alt="logo da aplicação" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full items-center justify-center pl-5 pr-5"
        >
          <input
            type="email"
            className="rounded h-[55px] pl-3 outline-none text-dark_gray lg:w-[400px] w-full bg-orange_light border-none"
            placeholder="Digite seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <input
            type="password"
            className="rounded h-[50px] pl-3 outline-none text-dark_gray lg:w-[400px] w-full bg-orange_light border-none"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          {error && (
            <span className="bg-red-600 rounded h-[50px] pl-3 outline-none lg:w-[400px] text-center flex justify-center items-center gap-2 text-base text-white">
              <IoIosWarning size={22} /> {error}
            </span>
          )}

          <button
            disabled={loading}
            className="bg-orange_primary font-semibold font-roboto h-[50px] pl-3 outline-none hover:opacity-85 flex items-center justify-center text-white lg:w-[400px] w-full rounded "
          >
            {loading ? <div className="spinner"></div> : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
