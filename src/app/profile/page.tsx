"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Profile from "@/components/Profile";
import { SessionType } from "@/Types/typescript";

type PostsType = {
  _id: string;
}[];

// Main Component
const MyProfile = () => {
  // useState
  const [posts, setPosts] = useState<PostsType>([]);
  const [loading, setLoading] = useState(true);

  // useSession
  const { data: session } = useSession() as SessionType;

  // useRouter
  const router = useRouter();

  // useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}`);
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    session?.user?.id && fetchPosts();
    if (posts.length === 0) {
      setLoading(false);
    }
    if (session?.user === undefined) {
      router.replace("/");
    }
  }, []);

  // handleEdit
  const handleEdit = (post: { _id?: string }) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  // handleDelete
  const handleDelete = async (post: { _id?: string }) => {
    const confirmAlert = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (confirmAlert) {
      try {
        await fetch(`/api/prompt/${post._id?.toString()}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // return
  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      loading={loading}
    />
  );
};

export default MyProfile;
