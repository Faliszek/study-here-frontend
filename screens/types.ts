type User = {
  id: string;
  email: string;
};

interface PostT {
  id: string;
  content: string;
  author: User;
  date: number;
}
