import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex h-screen flex-wrap">
      <div className="flex h-1/3 w-full flex-col items-center justify-center border border-red-500 lg:h-full lg:flex-1/3 gap-4">
        <div>  
          <h1 className="text-5xl">BrickBoned</h1>
          <p>Last played # days ago</p>
        </div>
        <div>
          <p>1v1 - (current)</p>
          <p>2v2 - (current)</p>
        </div>
      </div>
      <div className="h-2/3 w-full lg:h-full lg:flex-2/3 border border-blue-500">
        <div className="">
          <h1>below is the table</h1>
        </div>
      </div>
    </div>
  )
}
