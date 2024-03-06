'use client';
import Image from 'next/image';
import useSWR from 'swr';
import { AiOutlineLike } from 'react-icons/ai';
import { Post } from '@/app/types';
import { formatDate } from '@/app/helpers/date';
import Actions from './actions';
import { useState } from 'react';

type PageProps = {
  params: {
    id: string;
  };
};

const getPost = async (url: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`);
  const data = await response.json();
  return data as Post;
};

export default function Page({ params: { id } }: PageProps) {
  const { data: post, isLoading, mutate } = useSWR(`posts/${id}`, getPost);
  const [comment, setComment] = useState('');

  if (isLoading) {
    return <div className='h-screen w-full'>Loading...</div>;
  }

  if (!post) {
    return <div className='h-screen w-full'>Post not found</div>;
  }

  const formattedDate = formatDate(post.postedAt);

  const handleUpvote = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ upvotes: (post.upvotes || 0) + 1 }),
        },
      );

      if (response.ok) {
        await mutate({ ...post, upvotes: (post.upvotes || 0) + 1 });
      } else {
        console.error(response);
        alert('Failed to upvote post');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to upvote post');
    }
  };

  const handleAddComment = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') {
      return;
    }

    const newComment = {
      content: comment,
      id: Math.random().toString(36).substring(2, 9),
    };

    const comments = [...(post.comments || []), newComment];

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            comments,
          }),
        },
      );

      if (!response.ok) {
        console.error(response);
        alert('Failed to add comment');
      } else {
        await mutate({
          ...post,
          comments,
        });

        setComment('');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to add comment');
    }
  };

  return (
    <div className='h-screen w-full p-20'>
      <div className='bg-white flex flex-col items-start gap-5 p-5 rounded-md'>
        <p className='text-slate-600'>{formattedDate}</p>
        <p className='font-bold text-slate-950'>{post.title}</p>
        <p className='text-slate-600'>{post.content}</p>
        <Image src={post.imageUrl} alt={post.title} width={300} height={300} />
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='flex flex-row gap-3 items-center mt-5 select-none'>
            <AiOutlineLike
              size={20}
              onClick={handleUpvote}
              className='cursor-pointer'
            />
            <p className='text-slate-600'>{post.upvotes || 0} upvotes</p>
          </div>
          <div className='flex flex-row gap-2'>
            <Actions post={post} />
          </div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col gap-2 p-5 bg-slate-100 w-full'>
            {post.comments?.map((comment) => (
              <div key={comment.id} className='flex flex-col gap-2'>
                <p className='text-slate-600'>- {comment.content}</p>
              </div>
            ))}
            <input
              type='text'
              placeholder='Leave a comment'
              className='p-2 border-2'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyUp={handleAddComment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
