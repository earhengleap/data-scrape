'use server';

import prisma from "@/lib/db";
import db from "@/lib/db";
import { waitFor } from "@/lib/helper/wait-for";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const UpdateWorkflow = async ({id, definition} : {id: string, definition: string}) => {
    await waitFor(3000);
    const { userId } = await auth(); 
    
    if (!userId) {
        throw new Error('User unauthenticated :(.');
    }

    const workflow = await db.workflow.findUnique({
        where: {
            id,
            userId,
        }
    })

    if(!workflow) throw new Error('Workflow not found.');
    if (workflow.status !== WorkflowStatus.DRAFT) {
        throw new Error('Workflow is not in a draft state.');
    }

    await db.workflow.update({
        data: {
            definition,
        },
        where: {
            id,
            userId,
        }
    })
    revalidatePath("/workflows");
}