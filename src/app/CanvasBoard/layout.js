import { CanvasBar } from "./CanvasBar"
export default function Layout({children}) {
  

  return (
    <div className="flex h-full w-full "> 
      <main className="w-3/4 h-full">{children}</main>
      <CanvasBar className="w-1/4 h-full" />
    </div>
  )
}