import Form from './form';

export default async function Post() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h2 className='text-6xl font-bold text-center mt-12 mb-12 w-full'>
        Create a new post
      </h2>
      <Form />
    </div>
  );
}
