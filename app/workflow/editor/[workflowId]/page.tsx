import db from "@/lib/db";
import { waitFor } from "@/lib/helper/wait-for";
import { auth } from "@clerk/nextjs/server";
import Editor from "../../_components/editor";

const EditorPage = async ({ params } : { params: Promise<{ workflowId: string }> }) => {
    const { workflowId } = await params;
    const { userId } = await auth(); 

    if (!userId) {
        return <div>User not authenticated.</div>
    }

    await waitFor(3000);

    const workflow = await db.workflow.findUnique({
        where: {
            id: workflowId,
            userId,
        }
    });

    if (!workflow) {
        return <div>Workflow not found.</div>
    }

    return(
        <Editor workflow={workflow} />
    )
}

export default EditorPage;