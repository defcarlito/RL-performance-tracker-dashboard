export default function Home() {
  return (
    <div className="flex flex-wrap h-screen bg-yellow-500">
      <div className="w-1/2 lg:flex-1 h-1/3 lg:h-full bg-red-500"></div>
      <div className="w-1/2 lg:flex-1 h-1/3 lg:h-full bg-blue-500"></div>
      <div className="w-full h-2/3 lg:flex-1 lg:h-full bg-green-500"></div>
    </div>
  )
}
