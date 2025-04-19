// import { Button } from "@/app/_components/ui/button";
// import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
// import { ScrollArea } from "@/app/_components/ui/scroll-area";
// import { TRANSACTION_PAYMENT_METHOD_ICONS } from "@/app/_constants/transactions";
// import { getLastTransactions } from "@/app/_data/get-last-transactions";
// import { formatCurrency } from "@/app/_helpers/currency";
// import { Transaction, TransactionType } from "@prisma/client";
// import Image from "next/image";
// import Link from "next/link";

// interface LastTransactionsProps {
//    month: string;
//    year: string;
// }

// const LastTransactions = async ({ month, year }: LastTransactionsProps) => {
//    const lastTransactions = await getLastTransactions({ month, year });

//    const getAmountColor = (transaction: Transaction) => {
//       if (transaction.type === TransactionType.DEPOSIT) {
//          return "text-green-500";
//       }
//       if (transaction.type === TransactionType.EXPENSE) {
//          return "text-red-500";
//       }
//       return "text-white";
//    };

//    const getAmountPrefix = (transaction: Transaction) => {
//       if (transaction.type === TransactionType.DEPOSIT) {
//          return "+";
//       }
//       return "-";
//    };

//    return (
//       <ScrollArea className="h-full rounded-xl border pb-6">
//          <CardHeader className="flex-row items-center justify-between">
//             <CardTitle className="font-bol">Últimas transações</CardTitle>
//             <Button
//                asChild
//                variant="outline"
//                className="rounded-full font-bold"
//             >
//                <Link href="/transactions">Ver mais</Link>
//             </Button>
//          </CardHeader>

//          <div className="mx-6 mb-5 h-[1px] bg-white bg-opacity-10"></div>

//          <CardContent className="space-y-6">
//             {lastTransactions.map((transaction) => (
//                <div
//                   className="flex items-center justify-between"
//                   key={transaction.id}
//                >
//                   <div className="flex items-center gap-2">
//                      <div className="rounded-lg bg-white bg-opacity-[3%] p-3">
//                         <Image
//                            src={`/${TRANSACTION_PAYMENT_METHOD_ICONS[transaction.paymentMethod]}`}
//                            alt="pix"
//                            height={20}
//                            width={20}
//                         />
//                      </div>
//                      <div>
//                         <p className="text-sm font-bold">{transaction.name}</p>
//                         <p className="text-xs text-gray-400">
//                            {new Date(transaction.date).toLocaleDateString(
//                               "pt-BR",
//                               {
//                                  day: "2-digit",
//                                  month: "short",
//                                  year: "numeric",
//                               },
//                            )}
//                         </p>
//                      </div>
//                   </div>

//                   <p
//                      className={`text-sm font-bold ${getAmountColor(transaction)}`}
//                   >
//                      {getAmountPrefix(transaction)}
//                      {formatCurrency(Number(transaction.amount))}
//                   </p>
//                </div>
//             ))}
//          </CardContent>
//       </ScrollArea>
//    );
// };

// export default LastTransactions;
