'use server';

import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export const GetUserWorkflowsForUser = async () => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error('User unauthenticated :) Go back?')
    }

    return db.workflow.findMany({
        where: {
            userId,
        }, 
        orderBy: {
            createdAt: 'asc',
        }
    })
}