import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";
import bcrypt from "bcrypt";
import session from "express-session";
import { use } from "react";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true,
  }),
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
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
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
        erro: "Não logado",
      });
    }

    const dados = await prisma.usuario.findUnique({
      where: {
        id: logado,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        nick: true,
      },
    });

    return res.json(dados);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.get("/jogos", async (req, res) => {
  try {
    const jogos = await prisma.jogoUsuario.findMany();

    return res.json(jogos);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao buscar jogos",
    });
  }
});

app.get("/usuarios/:nick", async (req, res) => {
  const { nick } = req.params;

  const usuario = await prisma.usuario.findUnique({
    where: {
      nick: nick,
    },
  });
  return res.json(usuario);
});

app.get("/jogos/:nick", async (req, res) => {
  try {
    const { nick } = req.params;

    const usuario = await prisma.usuario.findUnique({
      where: {
        nick: nick,
      },
      select: {
        jogos: {
          select: {
            rawgId: true,
          },
        },
      },
    });

    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
      });
    }

    return res.json(usuario.jogos);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      erro: "Erro ao buscar jogos",
    });
  }
});

app.post("/logout", async (req, res) => {
  req.session.destroy((erro) => {
    if (erro) {
      return res.status(500).json({
        erro: "Erro ao fazer logout",
      });
    }
    return res.json({
      mensagem: "Logout realizado com sucesso",
    });
  });
});

app.post("/jogos/:rawgId", async (req, res) => {
  const userId = req.session.usuarioId;
  const rawgId = Number(req.params.rawgId);

  if (!userId) {
    return res.status(401).json({ erro: "Não logado!" });
  }

  const jogoExistente = await prisma.jogoUsuario.findUnique({
    where: {
      usuarioId_rawgId: {
        usuarioId: userId,
        rawgId: rawgId,
      },
    },
  });

  if (jogoExistente) {
    return res.status(409).json({
      erro: "Esse jogo já está na sua lista",
    });
  }

  try {
    const jogos = await prisma.jogoUsuario.create({
      data: {
        rawgId,
        usuarioId: userId,
      },
    });

    return res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.delete("/jogosdel/:rawgId", async (req, res) => {
  const userId = req.session.usuarioId;
  const rawgId = Number(req.params.rawgId);

  if (!userId) {
    return res.status(401).json({ erro: "Não logado!" });
  }

  const jogoExistente = await prisma.jogoUsuario.findUnique({
    where: {
      usuarioId_rawgId: {
        usuarioId: userId,
        rawgId: rawgId,
      },
    },
  });

  if (!jogoExistente) {
    return res.status(409).json({
      erro: "Esse jogo não está na sua lista",
    });
  }

  try {
    const jogos = await prisma.jogoUsuario.delete({
      where: {
        usuarioId_rawgId: {
          usuarioId: userId,
          rawgId: rawgId,
        },
      },
    });

    return res.json(jogos);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.patch("/perfil", async (req, res) => {
  const { fotoPerfil, banner } = req.body;

  const userId = req.session.usuarioId;

  if (!userId) {
    return res.status(401).json({ erro: "Não logado" });
  }

  try {
    const usuario = await prisma.usuario.update({
      where: {
        id: userId,
      },
      data: {
        ...(fotoPerfil !== undefined && { fotoPerfil }),
        ...(banner !== undefined && { banner }),
      },
    });

    return res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.post("/login", async (req, res) => {
  const { loginID, senha } = req.body;

  if (!loginID || !senha) {
    return res
      .status(400)
      .json({ erro: "Email ou Nick e Senha são obrigatórios" });
  }

  try {
    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [
          {
            email: {
              equals: loginID,
              mode: "insensitive",
            },
          },
          {
            nick: {
              equals: loginID,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!usuario) {
      return res.status(401).json({
        erro: "Email, Nick ou Senha Incorretos",
      });
    }

    const resultado = await bcrypt.compare(senha, usuario.senha);

    if (!resultado) {
      return res.status(401).json({
        erro: "Email ou Senha Incorretos",
      });
    } else {
      req.session.usuarioId = usuario.id;
      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
          nick: usuario.nick,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro interno no Servidor" });
  }
});

app.post("/usuarios", async (req, res) => {
  const { nome, email, senha, nick } = req.body;

  if (!nome || !email || !senha || !nick) {
    return res
      .status(400)
      .json({ erro: "Nome, Nick, Email e Senha são obrigatórios" });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        nick: nick,
      },
    });

    const emailExistente = await prisma.usuario.findUnique({
      where: {
        email: email,
      },
    });

    if (usuarioExistente) {
      return res.status(409).json({
        erro: "Já existe uma conta vínculada à esse nick!",
      });
    }

    if (emailExistente) {
      return res.status(409).json({
        erro: "Já existe uma conta vínculada à esse email!",
      });
    }

    const senhaHash = await bcrypt.hash(senha, 12);

    await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        nick,
      },
    });

    return res.status(201).json({
      mensagem: "Usuario criado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
