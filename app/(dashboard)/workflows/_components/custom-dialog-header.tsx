'use client';

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon, LucideIcon } from "lucide-react";

interface Props {
    title?: string;
    subTitle?: string;
    icon?: LucideIcon;

    iconClassName?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

const CustomDialogHeader = (props: Props) => {

    const Icon = props.icon;

    return (
        <DialogHeader className="py-6">
            <DialogTitle>
                <div className="flex flex-col items-center gap-2 mb-2">
                    {Icon && (
                        <Icon 
                            size={30}
                            className={cn("stroke-primary", props.iconClassName)}
                        />
                    )}
                    {props.title && (
                    <p className={cn("text-xl text-primary", props.titleClassName)}>
                        {props.title}
                    </p>
                    )}
                    {props.subTitle && (
                        <p className={cn("text-xl text-muted-foreground", props.subtitleClassName)}>{props.subTitle}</p>
                    )}
                </div>
            </DialogTitle>
            <Separator />
        </DialogHeader>
    )
}

export default CustomDialogHeader;