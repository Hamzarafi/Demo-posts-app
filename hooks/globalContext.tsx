import { createContext, useContext } from "react";
export type GlobalContent = {
  posts: PostType[];
  setPosts: (c: PostType[]) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  posts: [],
  setPosts: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
