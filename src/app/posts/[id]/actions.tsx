'use client';
import { PiTrashSimpleFill } from 'react-icons/pi';
import { FaPencil } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ActionsProps = {
  post: {
    id: string;
  };
};
export default function Actions({ post }: ActionsProps) {
  const router = useRouter();
  const handleDelete = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + '/posts/' + post.id,
        {
          method: 'DELETE',
        },
      );
      if (response.ok) {
        alert('Post deleted successfully');
        router.push('/');
      } else {
        alert('Error deleting post');
      }
    } catch (error) {
      console.log(error);
      alert('Error deleting post');
    }
  };
  return (
    <>
      <Link href={`/posts/${post.id}/edit`}>
        <div className='p-2 bg-slate-200 rounded-full'>
          <FaPencil size={20} className=' text-slate-400 rounded-full' />
        </div>
      </Link>
      <div
        className='p-2 bg-slate-200 rounded-full cursor-pointer'
        onClick={handleDelete}
      >
        <PiTrashSimpleFill size={20} className='text-slate-400 rounded-full' />
      </div>
    </>
  );
}
