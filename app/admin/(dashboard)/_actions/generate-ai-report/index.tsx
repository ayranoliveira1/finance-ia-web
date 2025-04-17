// "use server";

// import OpenAI from "openai";
// import { db } from "@/app/_lib/prisma";
// import { auth, clerkClient } from "@clerk/nextjs/server";
// import { generateAiReportSchema, GenerateAiReportType } from "./sxhema";

// export const generateAiReport = async ({
//    year,
//    month,
// }: GenerateAiReportType) => {
//    generateAiReportSchema.parse({ month, year });

//    const { userId } = await auth();
//    if (!userId) {
//       throw new Error("Unauthorized");
//    }

//    const user = (await clerkClient()).users.getUser(userId);
//    if (!user) {
//       throw new Error("User not found");
//    }

//    const hashPrimiumPlan =
//       (await user).publicMetadata.subscriptionPlan === "premium";
//    if (!hashPrimiumPlan) {
//       throw new Error("You need to be a premium user to generate AI reports");
//    }

//    const openAi = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//    });

//    const transactions = await db.transaction.findMany({
//       where: {
//          userId,
//          date: {
//             gte: new Date(`${year}-${month}-01`),
//             lt: new Date(`${year}-${month}-31`),
//          },
//       },
//    });

//    const content = `Gere um relatório com insights sobre as minhas finanças, com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas: ${transactions
//       .map(
//          (transaction) =>
//             `${transaction.date.toLocaleDateString("pt-BR")}-${transaction.type}-${transaction.amount}=${transaction.category}`,
//       )
//       .join(";")}`;

//    const completion = await openAi.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//          {
//             role: "system",
//             content:
//                "Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.",
//          },
//          {
//             role: "user",
//             content,
//          },
//       ],
//    });

//    return completion.choices[0].message.content;
// };
