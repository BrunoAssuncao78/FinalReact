
import { useState, useEffect } from "react";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ category: "", item: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Carregar menu existente do backend
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao carregar o menu!");
        }
        return response.json();
      })
      .then((data) => {
        setMenu(data || []); // Garante que `data` é um array
      })
      .catch((err) => {
        console.error("Erro ao carregar o menu:", err);
        setMenu([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // Atualizar valores do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Adicionar novo item ao menu
  const addMenuItem = (e) => {
    e.preventDefault();
    const { category, item } = form;

    if (!category || !item) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const newMenuItem = { category, item };

    fetch("http://localhost:3000/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar item ao menu.");
        }
        return response.json();
      })
      .then(({ item }) => {
        setMenu((prevMenu) => [...prevMenu, item]); // Adiciona o item retornado
        setForm({ category: "", item: "" }); // Limpa o formulário
        setError("");
        setSuccessMessage("Item adicionado com sucesso!");
        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Erro ao adicionar item:", err);
        setError("Erro ao adicionar o item. Tente novamente.");
      });
  };

  // Função para agrupar os itens por categoria
  const groupMenuByCategory = (menu) => {
    return menu.reduce((acc, item) => {
      const { category } = item;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item.item);
      return acc;
    }, {});
  };

  const groupedMenu = groupMenuByCategory(menu);

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh", padding: "20px" }}>
      {/* Layout usando flexbox */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {/* Conteúdo do menu */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2>Menu</h2>

          {loading ? (
            <p>Carregando menu...</p>
          ) : (
            Object.entries(groupedMenu).map(([category, items]) => (
              <div key={category} style={{ marginBottom: "20px" }}>
                <h3>
                  {category === "starter"
                    ? "Starter"
                    : category === "main"
                    ? "Menu"
                    : "Dessert"}
                  :
                </h3>
                <ul style={{ paddingLeft: "20px" }}>
                  {items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Formulário */}
        <form
          onSubmit={addMenuItem}
          style={{
            flex: 1,
            minWidth: "300px",
            padding: "20px",
            background: "white",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>Adicionar Novo Item ao Menu</h3>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="category">Categoria:</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Escolha uma categoria
              </option>
              <option value="starter">Entrada</option>
              <option value="main">Prato Principal</option>
              <option value="dessert">Sobremesa</option>
            </select>
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="item">Item:</label>
            <input
              id="item"
              type="text"
              name="item"
              placeholder="Digite o nome do item"
              value={form.item}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Adicionar
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </form>

        {/* Imagem ao lado */}
        <img
          src="../assets/istockphoto-1428412216-612x612.jpg" // Certifique-se de que a imagem está em `public/assets/`
          alt="Imagem de um jantar"
          style={{
            flex: 1,
            minWidth: "300px",
            maxWidth: "400px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
}
