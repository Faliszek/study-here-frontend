import { post } from ".";

type Response = {
  accessToken: string;
};

export function signIn(payload: { email: string; password: string }) {
  return post("/sign-in", payload).then(console.log);
}
