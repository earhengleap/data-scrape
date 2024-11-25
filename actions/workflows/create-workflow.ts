//actions/workflows/create-workflow.ts

'use server';

import { z } from "zod";
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from "@/schemas/worflow";
import { auth } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { WorkflowStatus } from "@/types/workflow";
import { AppNode } from "@/types/app-node";
import { Edge } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/create-flow-node";
import { TaskType } from "@/types/task";

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

    const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
        nodes: [],
        edges: [],
    }

    initialFlow.nodes.push(CreateFlowNode(TaskType.LAUNCH_BROWSER));
    
    const result =  await db.workflow.create({
        data: {
            userId,
            status: WorkflowStatus.DRAFT,
            definition: JSON.stringify(initialFlow),
            ...data,
        }
    });

    if (!result) {
        throw new Error('Failed to create workflow.');
    }

    redirect(`/workflow/editor/${result.id}`);
}

