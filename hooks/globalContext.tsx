import { createContext, useContext } from "react";
export type GlobalContent = {
  posts: PostType[];
  setPosts: (c: PostType[]) => void;
  selectedUser: string;
  setSelectedUser: (c: string) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  posts: [],
  setPosts: () => {},
  selectedUser: "All",
  setSelectedUser: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
