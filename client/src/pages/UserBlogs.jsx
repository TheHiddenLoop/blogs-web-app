import React from 'react'
import { AllBlogsCard } from '../components/AllBlogsCard'

export function UserBlogs() {
  return (
    <div className='p-4 md:px-[10%] py-8 h-full'>
      <h1 className='text-2xl font-semibold mb-5'>All published blogs</h1>
      
      <div className='mb-2'>
        <AllBlogsCard />
      </div>
      <div className='mb-2'>
        <AllBlogsCard />
      </div>
      
      
    </div>
  )
}
