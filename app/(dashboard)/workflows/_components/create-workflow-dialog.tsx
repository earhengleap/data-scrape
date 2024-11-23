"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Layers2Icon, Loader2 } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { CreateWorkflowSchema, CreateWorkflowSchemaType } from "@/schemas/worflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomDialogHeader from "./custom-dialog-header";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { CreateWorkflow } from "@/actions/workflows/create-workflow";
import { toast } from "sonner";

const CreateWorkflowDialog = ({ triggerText }: { triggerText?: string }) => {
    const [IsOpen, setIsOpen] = useState(false);
    
    const form = useForm<CreateWorkflowSchemaType>({
        resolver: zodResolver(CreateWorkflowSchema),
        defaultValues: {
            name: ""
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: CreateWorkflow,
        onSuccess: () => {
            toast.success("Workflow created successfully");
            setIsOpen(false);
        },
        onError: (error) => {
            toast.error("Failed to create workflow");
            console.error("Create workflow error:", error);
        },
    }) 

    const onSubmit = useCallback(
        (values: CreateWorkflowSchemaType) => {
            const toastId = toast.loading("Creating workflow...");
            mutate(values, {
                onSuccess: () => toast.dismiss(toastId),
                onError: () => toast.dismiss(toastId)
            });
        },
        [mutate]
    )

    return (
        <Dialog open={IsOpen} onOpenChange={(IsOpen) => {
            form.reset();
            setIsOpen(IsOpen);
        }}>
            <DialogTrigger asChild>
                <Button>{triggerText ?? "Create workflow"}</Button>
            </DialogTrigger>
            <DialogContent className="px-0">
                <CustomDialogHeader
                    icon={Layers2Icon}
                    title="Create workflow"
                    subTitle="Start building your workflow"
                />
                <div className="p-6">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-1 items-center">
                                            Name
                                            <p className="text-xs text-primary">(required)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Input 
                                                {...field} 
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Choose a descriptive and unique name
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex gap-1 items-center">
                                            Description
                                            <p className="text-xs text-primary">(optional)</p>
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                {...field} 
                                                className="resize-none"
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of what your workflow does.
                                            <br /> This is optional but can help you remember the workflow&apos;s purpose.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isPending}>
                                {!isPending && "Proceed"}
                                {isPending && <Loader2 className="animate-spin" />}
                            </Button>
                        </form>
                    </FormProvider>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateWorkflowDialog;