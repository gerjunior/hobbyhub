'use client';
import { useState } from 'react';
import PostCard from './post-card';
import { usePosts } from './common/usePosts';

export default function Home() {
  const [orderBy, setOrderBy] = useState<'newest' | 'most_popular'>('newest');
  const [search, setSearch] = useState<string>('');
  const { posts: originalPosts, isLoading } = usePosts();

  const orderedPosts = originalPosts?.sort((a, b) => {
    if (orderBy === 'newest') {
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    } else {
      return b.upvotes - a.upvotes;
    }
  });

  const posts = orderedPosts?.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <div className='flex flex-row justify-between w-full mb-5 ml-10'>
        <div className='flex gap-2 items-center w-full text-slate-500'>
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
        <input
          type='text'
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='p-2 rounded-lg bg-gray-100 mr-10 w-96'
        />
      </div>
      <div className='w-full flex flex-col items-center gap-5'>
        {!isLoading &&
          !!posts &&
          posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}

        {!posts?.length && !isLoading && <div>No posts found</div>}

        {isLoading && <div>Loading...</div>}
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
