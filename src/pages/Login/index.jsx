import { Link,useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../services/api";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate()

    // Definindo a função handleSubmit no escopo do componente
    async function handleSubmit(event) {
        event.preventDefault();

        try {
        const {data: token} = await api.post("/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            localStorage.setItem('token',token)
            console.log(token);

            navigate('/Listar-usuarios')
            console.log("login realizado com sucesso!");
        } catch (err) {
            console.error("Erro ao realizar o login:", err);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg shadow-lg p-10 ">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
                    Login
                </button>
            </form>

            <Link
                to="/Cadastro"
                className="text-blue-700 hover:underline mt-4 block text-center"
            >
                Cadastra-se
            </Link>
        </div>
    </div>
    );
}

export default Login;
