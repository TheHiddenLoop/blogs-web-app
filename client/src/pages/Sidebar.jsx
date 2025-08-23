import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  Settings,
  CalendarPlus,
  AlignRight,
  Menu,
  FilePlus,
  LogOut,
  PenSquare,
} from "lucide-react"
import { useAuthStore } from "../store/useAuthStore";

const sidebarItems = [
  { id: "dashboard", name: "Dashboard", icon: HomeIcon, path: "/" },
  { id: "date", name: "My Blogs", icon: CalendarPlus, path: "/all/blogs" },
  { id: "create", name: "Create", icon: FilePlus, path: "/create/blog" },
  { id: "setting", name: "Setting", icon: Settings, path: "/setting" },

]


export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const location = useLocation();
  const {logout} = useAuthStore();

  return (
    <>
      <aside
        className={`hidden md:flex ${
          isCollapsed ? "w-16" : "w-64"
        } bg-white border-r border-blue-200 transition-all duration-300 ease-in-out flex-shrink-0 flex flex-col h-screen`}
      >
        <div className="flex flex-col flex-1 pt-6">
          <div className="flex items-center justify-between px-4 mb-6">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-1">
                <PenSquare className="text-blue-700 font-bold" />
                Thinkscribe
              </h2>
            )}
            <button
              className="text-gray-500 hover:text-blue-600 p-2 rounded transition-colors"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <Menu className="h-5 w-5" /> : <AlignRight className="h-5 w-5" />}
            </button>
          </div>

          <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center px-2" : "gap-3 px-3"
                  } py-2 my-3 rounded-md text-left transition-colors border-l-4 ${
                    isActive
                      ? "border-blue-600 bg-blue-50 text-blue-600 font-medium"
                      : "border-transparent text-gray-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                  {!isCollapsed && item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="border-t border-blue-200 p-3">
          <button
            onClick={() => logout()}
            className={`w-full flex font-semibold items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            } py-2 rounded-md text-left text-gray-600 font-semibold hover:text-red-600 hover:bg-red-50 border-l-4 border-transparent hover:border-red-400 transition-colors`}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && "Logout"}
          </button>
        </div>
      </aside>

      <aside className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t border-blue-200 shadow-md py-2 md:hidden">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-blue-600" : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Icon className="h-6 w-6" />
            </Link>
          )
        })}
      </aside>
    </>
  )
}
