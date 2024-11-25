import { UpdateWorkflow } from "@/actions/workflows/update-workflow";
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react"
import { CheckIcon } from "lucide-react"
import { toast } from "sonner";

const SaveButton = ({workflowId} : {workflowId: string}) => {
    const { toObject } = useReactFlow();

    const saveMutation = useMutation({
        mutationFn: UpdateWorkflow,
        onSuccess: () => {
            toast.success('Flow saved successfully.', { id: 'save-workflow'})
        },
        onError: () => {
            toast.error('Something went wrong.', { id: 'save-workflow'})
        }
    })

  return (
    <Button 
        disabled={saveMutation.isPending}
        variant={"outline"} 
        onClick={() => {
        const workflowDefinition = JSON.stringify(toObject());
        toast.loading('Saving workflow...', { id: 'save-workflow' });
        saveMutation.mutate({
            id: workflowId,
            definition: workflowDefinition,
        })
        }} 
        className="flex items-center gap-2">
        <CheckIcon size={16}
    />
        Save
    </Button>
  )
}
export default SaveButton