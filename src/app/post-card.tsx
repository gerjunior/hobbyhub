'use client';

import Link from 'next/link';
import { Post } from './types';
import { formatDate } from './helpers/date';

type PostCardProps = {
  post: Post;
};
export default function PostCard({ post }: PostCardProps) {
  const formattedDate = formatDate(post.postedAt);

  return (
    <Link href={`/posts/${post.id}`} className='w-full'>
      <div className='w-full bg-white flex flex-col items-start justify-between gap-5 p-8 rounded-xl'>
        <p className='text-slate-600'>{formattedDate}</p>
        <p className='font-bold text-slate-950'>{post.title}</p>
        <p className='text-slate-600'>{post.upvotes} upvotes</p>
      </div>
    </Link>
  );
}
