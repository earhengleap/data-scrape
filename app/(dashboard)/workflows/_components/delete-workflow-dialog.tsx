'use client';

import { DeleteWorkflow } from "@/actions/workflows/delete-workflow";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

const DeleteWorkflowDialog = ({ open, setOpen, workflowName, workflowId }: Props) => {
  const [confirmText, setConfirmText] = useState("");

  const deleteMutation = useMutation({
    mutationFn: (id: string) => DeleteWorkflow(id),
    onSuccess: () => {
      toast.success("Workflow deleted successfully");
      setConfirmText("");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to delete workflow");
    }
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirmText !== workflowName) {
      toast.error("Please enter the correct workflow name to confirm deletion");
      setConfirmText("");
      return;
    }
    
    const toastId = toast.loading("Deleting workflow...");
    deleteMutation.mutate(workflowId, {
      onSuccess: () => toast.dismiss(toastId),
      onError: () => toast.dismiss(toastId)
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Workflow</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this workflow? If you delete this workflow, 
            you will not be able to recover it.
            <br /><br />
            If you are sure, enter <strong>{workflowName}</strong> in the field below to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Input 
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="Enter workflow name to confirm"
          className="mt-4"
        />

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")} >Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkflowDialog;