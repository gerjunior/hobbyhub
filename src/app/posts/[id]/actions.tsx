'use client';
import { PiTrashSimpleFill } from 'react-icons/pi';
import { FaPencil } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePosts } from '@/app/common/usePosts';

type ActionsProps = {
  post: {
    id: string;
  };
};
export default function Actions({ post }: ActionsProps) {
  const router = useRouter();
  const { mutate } = usePosts();

  async function handleDelete(postId: string) {
    await mutate((posts) => {
      return posts?.filter((p) => p.id !== postId);
    }, false);

    router.push('/');
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/posts/' + postId,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        console.error(response);
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete post');
    }
  }
  return (
    <>
      <Link href={`/posts/${post.id}/edit`}>
        <div className='p-2 bg-slate-200 rounded-full'>
          <FaPencil size={20} className=' text-slate-400 rounded-full' />
        </div>
      </Link>
      <div
        className='p-2 bg-slate-200 rounded-full cursor-pointer'
        onClick={() => handleDelete(post.id)}
      >
        <PiTrashSimpleFill size={20} className='text-slate-400 rounded-full' />
      </div>
    </>
  );
}
