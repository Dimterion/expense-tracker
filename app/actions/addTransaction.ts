"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { TransactionData, TransactionResult } from "@/types/transaction";

async function addTransaction(formData: FormData): Promise<TransactionResult> {
  const textValue = formData.get("text");
  const amountValue = formData.get("amount");

  // Check for input values
  if (
    !textValue ||
    textValue === "" ||
    !amountValue ||
    amountValue === "0" ||
    amountValue === "-0"
  ) {
    return { error: "Text or amount is missing." };
  }

  const text: string = textValue.toString(); // Ensure text is a string
  const amount: number = parseFloat(amountValue.toString()); // Parse amount as number

  // Get logged in user
  const { userId } = auth();

  // Check for user
  if (!userId) {
    return { error: "User not found." };
  }

  try {
    const transactionData: TransactionData = await db.transaction.create({
      data: {
        text,
        amount,
        userId,
      },
    });

    revalidatePath("/");

    return { data: transactionData };
  } catch (error) {
    return { error: "Transaction not added." };
  }
}

export default addTransaction;
