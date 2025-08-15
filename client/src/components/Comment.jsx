import React from 'react';

export function Comment() {
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
        <img
          src="https://t4.ftcdn.net/jpg/05/11/55/89/360_F_511558939_ydD0Jfnj5wDgHSnQr7TwCIcpYVNyqTK7.jpg"
          alt="User avatar"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800">
          Alex Johnson <span className="text-xs font-normal text-gray-500 ml-2">1 day ago</span>
        </p>
        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque possimus praesentium officiis, id incidunt quod aut sed nihil consequuntur velit!
        </p>
      </div>
    </div>
  );
}
