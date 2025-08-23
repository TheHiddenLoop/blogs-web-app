import { Outlet } from "react-router-dom"
import Sidebar from "../pages/Sidebar"
import Navbar from "../components/Navbar"

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-y-auto  h-[calc(100vh-70px)] mb-[45px] md:mb-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
