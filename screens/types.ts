type User = {
  id: string;
  firstName: string;
  lastName: string;
};

interface Post {
  id: string;
  content: string;
  author: User;
  date: number;
}
