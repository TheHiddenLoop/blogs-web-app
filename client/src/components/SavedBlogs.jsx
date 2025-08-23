import { Trash } from "lucide-react";
import { Link } from "react-router-dom";

export function SavedBlogs({image, title, to, onclick}) {
  
  return (
    <div className="flex justify-between items-center border-2 rounded-lg overflow-hidden w-full md:max-w-[650px] h-[110px] bg-white shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.02]">
      
      <div className="flex">
        <img
          src={image}
          alt="blogs"
          className="h-[110px] w-[110px] object-cover"
        />
        <h3 className="text-base md:text-lg font-semibold px-4 pt-2">
          {title}
        </h3>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 p-3  text-gray-700">
        <button
          className="text-red-500 hover:text-red-700 transition ml-10"
          aria-label="Delete blog"
        >
          <Trash size={20} onClick={onclick}/>
        </button>
        <Link to={to}>
          <button className="text-blue-600 text-sm md:text-base font-medium hover:underline">
          Read Blog
        </button>
        </Link>
      </div>
    </div>
  );
}
