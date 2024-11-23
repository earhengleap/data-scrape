import { GetUserWorkflowsForUser } from "@/actions/workflows/get-workflows-for-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { waitFor } from "@/lib/helper/wait-for"
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./create-workflow-dialog";
import WorkflowCard from "./workflow-card";

export const UserWorkflows = async () => {
   const workflows = await GetUserWorkflowsForUser();

    if (!workflows) { 
        return (
            <Alert variant={"destructive"}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                    Something went wrong. Please try again later.
                </AlertDescription>
            </Alert>
        )
    }

    if (workflows.length === 0) {
        return (
            <div className="flex flex-col gap-4 h-full items-center justify-center">
                <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
                    <InboxIcon size={40} className="stroke-primary"/>
                </div>
                <div className="flwx flex-col gap-1 text-center">
                    <p className="font-bold">No workflows created yet.</p>
                    <p className="text-sm text-muted-foreground">
                        Click on the button below to create your first workflow.
                    </p>
                </div>
                <CreateWorkflowDialog triggerText="Create your first workflow" />
            </div>
        )
    }

    return (
     <div className="grid grid-cols-1 gap-4">
        {workflows.map(workflow => (
            <WorkflowCard key={workflow.id} workflow={workflow} />
        ))}
     </div>
    )
}

