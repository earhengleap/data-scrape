'use server';

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const DeleteWorkflow = async (id: string) => {
    const { userId } = await auth();

    if (!userId) {
        throw new Error("User unauthenticated :(");
    }

    await db.workflow.delete({
        where: {
            id, 
            userId,
        }
    })

    revalidatePath("/workflows");
}