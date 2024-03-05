'use client';
export default function Form() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      imageUrl: formData.get('imageUrl'),
      upvotes: 0,
      postedAt: new Date().toISOString(),
    };
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Post created successfully');
        form.reset();
      } else {
        alert('Error creating post');
      }
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <div className='w-full sm:w-96 md:w-full md:max-w-[60%] lg:w-[52rem] bg-white px-10 pt-10 pb-8 sm:rounded-xl flex flex-col items-center'>
      <form
        className='w-full flex flex-col gap-4 mt-12'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          name='title'
          placeholder='Set a title for your post'
          className='p-4 rounded-lg bg-gray-50'
          required
        />
        <textarea
          name='content'
          placeholder='Type your post content here'
          className='p-4 rounded-lg bg-gray-50'
          required
          rows={4}
        />
        <input
          type='text'
          name='imageUrl'
          placeholder='Image URL'
          className='p-4 rounded-lg bg-gray-50'
        />
        <div className='w-full flex flex-col items-center gap-3'>
          <button
            className='bg-blue-500 text-white p-4 rounded-lg w-full'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
