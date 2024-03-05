import Image from 'next/image';
import { AiOutlineLike } from 'react-icons/ai';
import { PiTrashSimpleFill } from 'react-icons/pi';
import { FaPencil } from 'react-icons/fa6';
import { Post } from '@/app/types';
import { formatDate } from '@/app/helpers/date';
import Link from 'next/link';

type PageProps = {
  params: {
    id: string;
  };
};

const getPost = async (id: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/posts/' + id,
  );
  const data = await response.json();
  return data as Post;
};

export default async function Page({ params: { id } }: PageProps) {
  const post = await getPost(id);
  const formattedDate = formatDate(post.postedAt);

  return (
    <div className='h-screen w-full p-20'>
      <div className='bg-white flex flex-col items-start gap-5 p-5 rounded-md'>
        <p className='text-slate-600'>{formattedDate}</p>
        <p className='font-bold text-slate-950'>{post.title}</p>
        <p className='text-slate-600'>{post.content}</p>
        <Image src={post.imageUrl} alt={post.title} width={300} height={300} />
        <div className='flex flex-row justify-between items-center w-full'>
          <div className='flex flex-row gap-3 items-center mt-5'>
            <AiOutlineLike size={20} />
            <p className='text-slate-600'>{post.upvotes} upvotes</p>
          </div>
          <div className='flex flex-row gap-2'>
            <Link href={`/posts/${post.id}/edit`}>
              <div className='p-2 bg-slate-200 rounded-full'>
                <FaPencil size={20} className=' text-slate-400 rounded-full' />
              </div>
            </Link>
            <div className='p-2 bg-slate-200 rounded-full'>
              <PiTrashSimpleFill
                size={20}
                className='text-slate-400 rounded-full'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
