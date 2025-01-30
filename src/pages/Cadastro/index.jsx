import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "../../services/api";

function Cadastro() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    // Definindo a função handleSubmit no escopo do componente
    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await api.post("/cadastro", {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            console.log("Cadastro realizado com sucesso!");
        } catch (err) {
            console.error("Erro ao realizar o cadastro:", err);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg shadow-lg p-10 ">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input
                    ref={nameRef}
                    placeholder="Nome"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    ref={emailRef}
                    placeholder="Email"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />
                <input
                    ref={passwordRef}
                    placeholder="Senha"
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                />

                <button className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:underline">
                    Cadastrar-se
                </button>
            </form>

            <Link
                to="/Login"
                className="text-blue-700 hover:underline mt-4 block text-center"
            >
                Já tem uma conta? Faça Login
            </Link>
        </div>
    </div>
    );
}

export default Cadastro;
