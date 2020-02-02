interface PostFirebase {
  content: string;
  authorId: string;
  authorEmail: string;
  date: number;
  comments: Array<PostT>;
}

type PostT = {
  id: string;
} & PostFirebase;
