interface PostT {
  id: string;
  content: string;
  authorId: string;
  authorEmail: string;
  date: number;
  comments: Array<PostT>;
}
