export type Comment = {
  id: string;
  content: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  upvotes: number;
  postedAt: string;
  imageUrl: string;
  comments: Comment[];
};
