import { Loader, Search } from "lucide-react";
import { HomePost } from "../components/HomePost";
import { useBlogsStore } from "../store/useBlogsStore";
import { useRecoilValue } from "recoil";
import { blogAtom, loadingAtom } from "../atom/atom";
import { useEffect } from "react";

export function Home() { 
  const btn = ["All", "Technology", "Travel", "Food", "Lifecycle"];

  const { allBlogs } = useBlogsStore();
  const data = useRecoilValue(blogAtom);
  const loader = useRecoilValue(loadingAtom);

  useEffect(() => {
    allBlogs();
  }, []);

  


  return (
    <div className="p-4 md:px-[10%] py-8 h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-4">Latest Posts</h1>

        <div className="md:hidden flex items-center bg-gray-100 px-3 py-2 border-2 rounded-md w-full focus-within:ring-2 focus-within:ring-blue-500 focus-within:outline-none">
          <Search className="w-6 h-6 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm h-6"
          />
        </div>

        <div className="flex flex-wrap gap-3 mt-6">
          {btn.map((e, i) => (
            <button
              key={i}
              className="py-2 px-5 bg-[#d5dfeb] text-sm rounded-lg hover:bg-[#a4b6c8] transition"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center py-9">
        {loader && <Loader size={30} className={`animate-spin transition-opacity duration-300 ease-in-out ${loader ? 'opacity-100' : 'opacity-0'}`} />}
      </div>

      <div>
        {data?.map((e) => (
          <HomePost
            key={e._id}
            to={`/artical/${e._id}`}
            title={e.title}
            description={`${e.story?.slice(0, 160) ?? ""}...`}
            author={e.author?.name}
            date={e.date}
            image={e.imagepost}
          />
        ))}
      </div>

    </div>
  );
}
