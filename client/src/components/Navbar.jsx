import { Bell, Menu, Search, PenSquare, ChevronDown, ChevronUp, LogOut, User2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../atom/atoms";
import { useAuthStore } from "../store/useAuthStore";
import { authUserState } from "../atom/checkAuth";
import { useBlogsStore } from "../store/useBlogsStore"

export default function Navbar() {
  const [input, setInput] = useState('');
  const authUser = useRecoilValue(authUserState);
  const [visible, setVisible] = useState(false);
  const data = useRecoilValue(userState);
  const { logout } = useAuthStore();

  const { filterBlogs } = useBlogsStore();

  function handleChange(e) {
    const value = e.target.value;
    let type="search";
    setInput(value);
    filterBlogs(type, value);
  }

  return (
    <header className="px-4 sm:px-6 lg:px-10 py-4 border-b bg-white shadow-sm relative">
      <div className="flex justify-between items-center gap-6">
        <div className="flex items-center gap-4 select-none">
          <Link to={"/"}>
            <div className="flex items-center gap-2 text-2xl font-semibold text-blue-700 tracking-tight cursor-pointer">
              <PenSquare className="w-6 h-6 text-blue-700" />
              <span className="font-display tracking-wide">
                Think<span className="text-red-700">Scribe</span>
              </span>
            </div>
          </Link>
        </div>

        {authUser && (
          <>
            <div className="hidden sm:flex items-center bg-gray-100 px-3 py-1 border-2 rounded-md w-72 focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm h-6"
                onChange={handleChange}
                value={input}
              />
            </div>

            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-black" />

              <div
                onClick={() => setVisible(!visible)}
                className="flex items-center gap-1 cursor-pointer select-none"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-full border-2 border-blue-700 overflow-hidden">
                  <img
                    src={data.profilepic?.trim() ? data.profilepic : "images/user.png"}
                    alt="User profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                {visible ? <ChevronUp /> : <ChevronDown />}
              </div>
            </div>

            {visible && (
              <div className="absolute top-[69px] right-2 bg-white shadow-xl rounded-xl py-3 px-2 w-48 animate-fadeIn z-50">
                <ul className="flex flex-col">
                  <li className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200 cursor-pointer">
                    <User2 className="text-blue-600 group-hover:text-white" />
                    Profile
                  </li>
                  <li
                    onClick={() => logout()}
                    className="group flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200 cursor-pointer"
                  >
                    <LogOut className="text-red-600 group-hover:text-white" />
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
