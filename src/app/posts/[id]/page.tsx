import Image from 'next/image';
import { AiOutlineLike } from 'react-icons/ai';
import { Post } from '@/app/types';
import { formatDate } from '@/app/helpers/date';
import Actions from './actions';

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
            <Actions post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
