'use server';

import { z } from "zod";
import { CreateWorkflowSchema } from "@/schemas/worflow";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export const CreateWorkflow = async (
    form: z.infer<typeof CreateWorkflowSchema>
) => {
    const { success, data } = CreateWorkflowSchema.safeParse(form);
    if (!success) {
        throw new Error('Invalid form data');
    }
    const { userId } = await auth();

    if (!userId) {
        throw new Error('User unauthenticated :(');
    }

    const result =  await db.workflow.create({
        data: {
            userId,
            status: "DRAFT",
            definition: "TODO",
            ...data,
        }
    });

    if (!result) {
        throw new Error('Failed to create workflow');
    }

    redirect(`/workflow/editor/${result.id}`);
}