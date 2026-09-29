-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "banner" TEXT,
ADD COLUMN     "fotoPerfil" TEXT;

-- CreateTable
CREATE TABLE "JogoUsuario" (
    "id" SERIAL NOT NULL,
    "rawgId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "JogoUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JogoUsuario_usuarioId_rawgId_key" ON "JogoUsuario"("usuarioId", "rawgId");

-- AddForeignKey
ALTER TABLE "JogoUsuario" ADD CONSTRAINT "JogoUsuario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
