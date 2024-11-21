import { Suspense } from "react";
import { UserWorkflowsSkeleton } from "./_components/user-workflows-skeleton";
import { UserWorkflows } from "./_components/user-workflows";

const WorkflowPage = () => {
    return (
        <div className="flex flex-col flex-1 h-full">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">Workflows</h1>
                    <p className="text-muted-foreground">Manage your workflows</p>
                </div>
            </div>
            <div className="h-full py-6">
            <Suspense fallback={<UserWorkflowsSkeleton />}>
                <UserWorkflows />
            </Suspense>
        </div>
        </div>
    )
}

export default WorkflowPage;