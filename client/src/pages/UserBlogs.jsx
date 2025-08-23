import React, { useEffect } from 'react'
import { AllBlogsCard } from '../components/AllBlogsCard'
import { useBlogsStore } from '../store/useBlogsStore'
import { blogAtom, commentAtom, likeAtom, loadingAtom } from '../atom/atom';
import { useRecoilValue } from 'recoil';

export function UserBlogs() {
  const { userBlogs, deleteBlogs } = useBlogsStore();
  const data = useRecoilValue(blogAtom);
  const loader = useRecoilValue(loadingAtom);

  useEffect(() => {
    userBlogs();
  }, []);

  const handleDelete = (id) => {
    deleteBlogs(id);
  }

  
  return (
    <div className='p-4 md:px-[3%] py-8 h-full '>
      <h1 className='text-2xl font-semibold mb-5'>All published blogs</h1>

      {data.length > 0 ? (
        data.map((e) => (
          <div className='mb-2' key={e._id}>
            <AllBlogsCard title={e.title} initialData={e} image={e.imagepost} auther={e.author?.name} createdAt={e.createdAt} autherProfile={e.author?.profilepic} handleDelete={() => handleDelete(e._id)} />
          </div>
        ))
      ) : (
        <div>No published blogs by user</div>
      )}
    </div>
  )
}
