import { Link } from "react-router-dom";

export function HomePost({ title, description, date, author, image, to }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 py-6 border-b">

      <div className="flex flex-col gap-3 md:w-[60%]">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-sm text-[#7492b3]">
          By <span className="font-medium">{author}</span> · {date}
        </p>
        <Link to={to}>
          <button className="w-fit mt-2 py-2 px-5 bg-[#d5dfeb] text-sm rounded-md hover:bg-[#a4b6c8] transition-colors">
            Read More
          </button>
        </Link>
      </div>

      <div className="w-full md:w-[300px] h-[200px] rounded-lg overflow-hidden">
        <img
          src={image}
          alt={`Thumbnail for ${title}`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
