import React, { useEffect } from 'react'
import { AllBlogsCard } from '../components/AllBlogsCard'
import { useBlogsStore } from '../store/useBlogsStore'
import { blogAtom, loadingAtom } from '../atom/atom';
import { useRecoilValue } from 'recoil';

export function UserBlogs() {
  const {userBlogs, deleteBlogs} = useBlogsStore();
    const data = useRecoilValue(blogAtom);
    const loader = useRecoilValue(loadingAtom);

    useEffect(()=>{
      userBlogs();
    },[]);

    const handleDelete =(id)=>{
      deleteBlogs(id);
    }
  return (
    <div className='p-4 md:px-[10%] py-8 h-full'>
      <h1 className='text-2xl font-semibold mb-5'>All published blogs</h1>
      
      {data.map((e)=>(
        <div className='mb-2' key={e._id}>
        <AllBlogsCard title={e.title} image={e.imagepost} auther={e.author?.name} createdAt={e.createdAt} autherProfile={e.author?.profilepic} handleDelete={() => handleDelete(e._id)}/>
        </div>
      ))}
    </div>
  )
}
