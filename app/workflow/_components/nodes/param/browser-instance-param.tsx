'use client';

import { ParamProps } from "@/types/app-node";


const BrowserInstanceParam = ({ param} : ParamProps) => {
  return (
    <div className="text-xs">{param.name}</div>
  )
}
export default BrowserInstanceParam