import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authorsClient = prisma.author;
const phrasesClient = prisma.phrase;
const oppositionsClient = prisma.opposition;

export {authorsClient, phrasesClient, oppositionsClient};