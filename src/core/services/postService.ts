import api from "@/core/services/api";
import type { PostListType } from "@/core/types";

/** Get list of posts */
export async function fetchPosts(): Promise<PostListType[]> {
  const { data } = await api.get<PostListType[]>("/posts");
  return data;
}