'use client';

import TooltipWrapper from "@/components/tool-tip-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { WorkflowStatus } from "@/types/workflow"
import { Workflow } from "@prisma/client";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { FileTextIcon, MoreVerticalIcon, PlayIcon, ShuffleIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteWorkflowDialog from "./delete-workflow-dialog";

const statusColors = {
    [WorkflowStatus.DRAFT]: "bg-yellow-400 text-yellow-400",
    [WorkflowStatus.PUBLISHED]: "bg-primary"
}

const WorkflowActions = ({workflowName, workflowId} : {workflowName: string, workflowId: string}) => {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
       <>
        <DeleteWorkflowDialog 
            open={showDeleteDialog}
            setOpen={setShowDeleteDialog}
            workflowName={workflowName}
            workflowId={workflowId}
        />

         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} size={'sm'}>
                    <TooltipWrapper content="More actions">
                        <div className="flex items-center justify-center w-full h-full">
                            <MoreVerticalIcon size={18} />
                        </div>
                    </TooltipWrapper>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    className="text-destructive flex items-center ga-2"
                    onSelect={() => setShowDeleteDialog((prev) => !prev)}
                >
                    <TrashIcon size={16}/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
       </>
    )
}

const WorkflowCard = ({ workflow } : { workflow: Workflow}) => {
    const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className="border border-separator shadow-sm rounded-lg overflow-hidden hover:shadow-md dark:shadow-primary/30">
        <CardContent className="p-4 flex items-center justify-between h-[100px]">
            <div className="flex items-center justify-end space-x-3">
                <div
                    className={cn(
                        "w-10 h-10 rounded-full flex items-center bg-red-700 justify-center",
                        statusColors[workflow.status as WorkflowStatus],
                    )}
                >
                    {isDraft ? (
                        <FileTextIcon className="h-5 w-5 text-white"/>
                    ) : (
                        <PlayIcon className="h-5 w-5 text-white"/>
                    )}
                </div>
                <div>
                    <h3 className="text-base font-bold text-muted-foreground flex items-center">
                        <Link
                            href={`/workflow/editor/${workflow.id}`}
                        >
                            {workflow.name}
                        </Link>
                        {isDraft && (
                            <span className="ml-2 px-2 py-0.5 text-sx font-medium bg-yellow-100 text-yellow-800 rounded-md">Draft</span>
                        )}
                    </h3>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <Link
                    href={`/workflow/editor/${workflow.id}`}
                    className={cn(
                        buttonVariants({
                            variant: "outline",
                            size: "sm",
                        }),
                        "flex items-center gap-2",
                    )}
                >
                    <ShuffleIcon  size={16}/>
                    Edit
                </Link>
                <WorkflowActions workflowName={workflow.name} workflowId={workflow.id} />
            </div>
        </CardContent>
    </Card>
  )
}
export default WorkflowCard