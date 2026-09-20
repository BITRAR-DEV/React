import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

    if (!email || !senha) {
    return res
      .status(400)
      .json({ erro: "Email e Senha são obrigatórios" });
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });
    
    if (!usuario) {
        return res.status(401).json({
            erro: "Email ou Senha Incorretos"
        });
    }

    const resultado = await bcrypt.compare(senha, usuario.senha);

    if (!resultado) {
       return res.status(401).json({
            erro: "Email ou Senha Incorretos"
        }); 
    } else {
        return res.status(200).json({
            mensagem: "Login realizado com sucesso!"
        });
    };
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ erro: "Nome, Email e Senha são obrigatórios" });
  }

  
  try {
    const usuarioExistente = await prisma.usuario.findUnique({
        where: {
            email: email
        }
    })
    
    if (usuarioExistente) {
        return res.status(409).json({
            erro: "Já existe uma conta vínculada à esse email!"
        })
    }
    
    const senhaHash = await bcrypt.hash(senha, 12);

    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
      },
    });


    return res.status(201).json({
        mensagem: "Usuario criado com sucesso!"
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
