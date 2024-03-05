import useSWR from 'swr';
import { Post } from '../types';

const getPosts = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts');
  const data = await response.json();
  return data as Post[];
};

export const usePosts = () => {
  const { data: posts, isLoading, mutate } = useSWR('/posts', getPosts);

  return { posts, isLoading, mutate };
};
