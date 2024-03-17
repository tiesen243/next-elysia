"use client";

import { getQueryClient } from "@/components/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import { toast } from "sonner";

const Page: NextPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await api.post.getAll.get();
      return data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ title }: { title: string }) => {
      const { error } = await api.post.create.post({ title });
      if (error) throw new Error("Failed to create post");
    },
    onSuccess: () => {
      getQueryClient().invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created");
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <>
      <form
        action={(formData) => {
          const title = String(formData.get("title") ?? "");
          mutate({ title });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input type="text" name="title" />
        </div>

        <Button type="submit" disabled={isPending}>
          Create Post
        </Button>
      </form>

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data?.posts.map((post) => (
              <li key={post.id}>
                {post.id}. {post.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Page;
