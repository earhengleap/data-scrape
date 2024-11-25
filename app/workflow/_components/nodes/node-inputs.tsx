import { ReactNode } from "react"
import { Handle, Position, useEdges } from "@xyflow/react"
import { cn } from "@/lib/utils"
import { TaskParam } from "@/types/task"
import NodeParamField from "./node-param-field"
import { ColorForHandle } from "./common"

export const NodeInputs = ({children} : {children: ReactNode}) => {
  return (
    <div className="flex flex-col devide-y ga-2">
        {children}
    </div>
  )
}

export const NodeInput = ({ input, nodeId } : { input: TaskParam, nodeId: string}) => {
    const  edges = useEdges();
    const isConnected = edges.some(
        (edge) => edge.target === nodeId && edge.targetHandle === input.name
    )
    return (
        <div className="flex justify-start relative p-3 bg-secondary w-full">
            <NodeParamField param={input} nodeId={nodeId} disabled={isConnected}/>
            {!input.hideHandle && (
                <Handle 
                id={input.name}
                type="target"
                position={Position.Left}
                className={cn(
                    "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
                    ColorForHandle[input.type]
                )}
                />  
            )}
        </div>
    )
}