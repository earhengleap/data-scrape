'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ParamProps } from "@/types/app-node";
import { useId, useState, useEffect } from "react";

const StringParam = ({param, value, updateNodeParamValue, disabled} : ParamProps) => {

    const [internalValue, setInternalValue] = useState(value || '');
    const id = useId();

    // Update internal value when external value changes
    useEffect(() => {
        setInternalValue(value || '');
    }, [value]);

    let Component: React.ElementType = Input; // Use React.ElementType for the dynamic component
    if (param.variant === 'textarea') {
        Component = Textarea;
    }

    return (
        <div className="space-y-1 p-1 w-full">
            <Label htmlFor={id} className="text-xs flex">
                {param.name}
                {param.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Component 
                id={id} 
                disabled={disabled}
                className="text-xs"
                value={internalValue} 
                placeholder="Enter value here" 
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setInternalValue(e.target.value)
                }
                onBlur={() => updateNodeParamValue(internalValue)}
            />
            {param.helperText && (
                <p className="text-muted-foreground px-2">{param.helperText}</p>
            )}
        </div>
    )
}

export default StringParam;