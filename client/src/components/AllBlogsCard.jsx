import React, { useState } from "react";
import { Pencil, Trash2, MessageSquare, Heart, SquarePen } from "lucide-react";

export function AllBlogsCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col sm:flex-row justify-between cursor-pointer border-[2px] border-gray-300 transition-transform rounded-md duration-300 hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-[120px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center p-3 sm:p-5">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJahkR9xsWhp7lm8_2sSBETZVZa0APvJ22oQ&s"
          alt="blog"
          className="h-[70px] sm:h-[80px] border-2 rounded-md object-cover"
        />
        <div className="text-gray-700 text-[1rem] sm:text-[1.2rem] ml-4 flex flex-col gap-2 sm:gap-4">
          <p className="font-semibold">What is Hello World</p>
          <p className="text-xs sm:text-sm text-gray-500">2 hours ago</p>
        </div>
      </div>

      <div className="p-3 sm:p-5 flex flex-col gap-3 sm:gap-4 items-end sm:items-end">
        <div className="flex items-center gap-2 sm:gap-3">
          {isHovered ? (
            <>
              <SquarePen
                size={22}
                className="text-gray-500 hover:text-blue-500 transition-colors"
              />
              <Trash2
                size={22}
                className="text-gray-500 hover:text-red-500 transition-colors"
              />
            </>
          ) : (
            <span className="text-xs sm:text-sm text-gray-600">Programmer</span>
          )}

          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJahkR9xsWhp7lm8_2sSBETZVZa0APvJ22oQ&s"
            alt="profile"
            className="h-[26px] w-[26px] sm:h-[30px] sm:w-[30px] border-2 rounded-full"
          />
        </div>
        <div className="flex gap-3 sm:gap-4 text-gray-500 items-center">
          <span className="flex items-center gap-1">
            450
            <MessageSquare
              size={18}
              className="hover:text-green-500 transition-colors"
            />
          </span>
          <span className="flex items-center gap-1">
            450
            <Heart
              size={18}
              className="hover:text-pink-500 transition-colors"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
