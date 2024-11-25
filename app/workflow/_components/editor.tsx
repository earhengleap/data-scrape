'use client';

import { Workflow } from "@prisma/client"
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./flow-editor";
import TopBar from "./topbar/top-bar";
import TaskMenu from "./task-menu";

const Editor = ({workflow} : {workflow: Workflow}) => {
  return (
    <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <TopBar title="Workflow editor" subtitle={workflow.name} workflowId={workflow.id} />
            <section className="flex h-full overflow-auto">
                <TaskMenu />
                <FlowEditor workflow={workflow} />
            </section>
        </div>
    </ReactFlowProvider>
  )
}
export default Editor;