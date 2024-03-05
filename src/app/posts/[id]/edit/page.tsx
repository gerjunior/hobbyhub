import Form from '@/app/common/form';
import { Post } from '@/app/types';

const getPost = async (id: string) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + '/posts/' + id,
  );
  const data = await response.json();
  return data as Post;
};

type UpdatePostProps = {
  params: {
    id: string;
  };
};

export default async function UpdatePost({ params }: UpdatePostProps) {
  const postId = params.id;
  const post = await getPost(postId);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <Form post={post} />
    </div>
  );
}
