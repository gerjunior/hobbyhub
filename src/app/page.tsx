'use client';
import { useState } from 'react';
import PostCard from './post-card';
import { usePosts } from './common/usePosts';

export default function Home() {
  const [orderBy, setOrderBy] = useState<'newest' | 'most_popular'>('newest');
  const { posts, isLoading } = usePosts();

  const orderedPosts = posts?.sort((a, b) => {
    if (orderBy === 'newest') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    } else {
      return b.upvotes - a.upvotes;
    }
  });

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='flex gap-2 items-center w-full text-slate-500 mb-5 ml-10'>
        <span>Order by: </span>
        <button
          className='p-2 bg-green-700 text-white rounded-lg'
          onClick={() => setOrderBy('newest')}
        >
          Newest
        </button>
        <button
          className='p-2 bg-cyan-600 text-white rounded-lg'
          onClick={() => setOrderBy('most_popular')}
        >
          Most Popular
        </button>
      </div>
      <div className='w-full flex flex-col items-center gap-5'>
        {!isLoading &&
          !!orderedPosts &&
          orderedPosts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}

        {!orderedPosts?.length && !isLoading && <div>No posts found</div>}

        {isLoading && <div>Loading...</div>}
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
