import PostCard from './post-card';
import { Post } from './types';

const getPosts = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts');
  const data = await response.json();
  return data as Post[];
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h2 className='text-6xl font-bold mb-10'>Posts</h2>
      <div className='w-full flex flex-col items-center gap-5'>
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })}
      </div>
    </main>
  );
}

export const dynamic = 'force-dynamic';
