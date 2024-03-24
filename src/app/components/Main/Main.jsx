import TopBar from "./TopBar"
import Banner from "./Banner"
import { DisplayList } from "./DisplayList"

export default function Main() {
  return (
    <main className="relative flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 h-full p-2 min-h-screen flex flex-col rounded-lg ">
      <TopBar />
      <Banner />
      <DisplayList />
      <div>
        casfa
      </div>
    </main>
  )
}