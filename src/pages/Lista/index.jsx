import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function ListarUsuarios() {
  const [allUsers, setAllUsers] = useState([]); // Lista de usuários completa
  const [searchTerm, setSearchTerm] = useState(""); // Estado para pesquisa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token não encontrado. Faça login novamente.");
        }

        const { data } = await api.get("/listar-usuarios", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAllUsers(data.Users || []);
      } catch (err) {
        setError(err.message || "Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      setAllUsers(prevUsers => prevUsers.filter(user => user.id !== id)); // Remove o usuário da lista
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
    }
  }

  return (
    <div className="container mx-auto mt-8 p-4 max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Lista de Usuários
      </h2>

      {/* Campo de Pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar usuário..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && (
        <p className="text-center text-gray-600">Carregando usuários...</p>
      )}
      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {!loading && !error && (
        <div className="space-y-4 mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-md">
          {allUsers.length > 0 ? (
            allUsers
              .filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(user => (
                <div
                  key={user.id}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div>
                    <p className="text-gray-800 font-medium">
                      <strong>ID:</strong> {user.id}
                    </p>
                    <p className="text-gray-800 font-medium">
                      <strong>Nome:</strong> {user.name}
                    </p>
                    <p className="text-gray-800 font-medium">
                      <strong>Email:</strong> {user.email}
                    </p>
                  </div>

                  {/* Botões de ação */}
                  <div className="flex gap-2">
                    {/* Botão Editar */}
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                      onClick={() => navigate(`/editar-usuario/${user.id}`)}
                    >
                      Editar
                    </button>

                    {/* Botão Excluir */}
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(user.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-500">
              Nenhum usuário encontrado.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default ListarUsuarios;
