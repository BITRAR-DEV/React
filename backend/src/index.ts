import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import bcrypt from "bcrypt";
import session from "express-session";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

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

app.get("/me", async (req, res) => {
  try {
    const logado = req.session.usuarioId;

    if (!logado) {
      return res.status(401).json({
        erro: "Não logado"
      });
    };

    const dados = await prisma.usuario.findUnique({
      where: {
        id: logado
      },
      select: {
        id: true,
        nome: true,
        email: true
      }
    });

    return res.json(dados);
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
      req.session.usuarioId = usuario.id;
      return res.status(200).json({
          mensagem: "Login realizado com sucesso!",
          usuario: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
          }
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
