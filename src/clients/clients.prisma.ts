import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const authorsClient = prisma.author;
const phrasesClient = prisma.phrase;
const oppositionsClient = {
    opposition: prisma.opposition,
    authors: prisma.author
};

export {authorsClient, phrasesClient, oppositionsClient};