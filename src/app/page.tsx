'use client';
import PostCard from './post-card';
import { usePosts } from './common/usePosts';

export default function Home() {
  const { posts, isLoading } = usePosts();

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h2 className='text-6xl font-bold mb-10'>Posts</h2>
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
