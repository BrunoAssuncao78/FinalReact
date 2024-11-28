import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken";

const app = express();
const SECRET_KEY = "your_secret_key";
const FILE_PATH_MENU = "./data/menu.json";
const FILE_PATH_USERS = "./data/users.json";

// Middleware
app.use(bodyParser.json());
app.use(express.static("./images"));

// CORS Configurations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Responde rápido para OPTIONS
  }
  next();
});

// Função para criar token JWT
const createJSONToken = (email) => {
  return jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
};

// Rotas para o menu
app.get("/menu", async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_PATH_MENU);
    const menu = JSON.parse(fileContent);
    res.status(200).json(menu);
  } catch (error) {
    console.error("Erro ao carregar o menu:", error);
    res.status(500).json({ message: "Erro ao carregar o menu." });
  }
});

app.post("/menu", async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_PATH_MENU);
    const menu = JSON.parse(fileContent);

    const newMenuItem = req.body;
    menu.push(newMenuItem);

    await fs.writeFile(FILE_PATH_MENU, JSON.stringify(menu, null, 2));
    res.status(201).json({ item: newMenuItem });
  } catch (error) {
    console.error("Erro ao adicionar o item ao menu:", error);
    res.status(500).json({ message: "Erro ao adicionar o item." });
  }
});

// Rotas de usuários
app.post("/signup", async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_PATH_USERS);
    const users = JSON.parse(fileContent);

    const newUser = req.body;
    users.push(newUser);

    await fs.writeFile(FILE_PATH_USERS, JSON.stringify(users, null, 2));
    res.status(201).json({ message: "Usuário cadastrado!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro ao cadastrar o usuário." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_PATH_USERS);
    const users = JSON.parse(fileContent);

    const { email, password } = req.body;
    const login = users.find((u) => u.email === email && u.password === password);

    if (!login) {
      return res.status(422).json({
        message: "Credenciais inválidas.",
        errors: { credentials: "Email ou senha incorretos." },
      });
    }

    const token = createJSONToken(email);

    res.json({
      token,
      name: login.name,
      role: login.role,
    });
  } catch (error) {
    console.error("Erro ao realizar login:", error);
    res.status(500).json({ message: "Erro ao realizar login." });
  }
});

// Rota para 404
app.use((req, res) => {
  res.status(404).json({ message: "404 - Não encontrado." });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000...");
});
