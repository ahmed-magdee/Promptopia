"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import { SessionType } from "@/Types/typescript";

// Main Component
const CreatePrompt = () => {
  // useState
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  // useRouter
  const router = useRouter();

  // session
  const { data: session } = useSession() as SessionType;

  // createPrompt
  const createPrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: `#${post.tag}`,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  // useEffect
  useEffect(() => {
    if (session?.user === undefined) {
      router.replace("/");
    }
  }, []);

  // Return
  return (
    <Form
      type="Create"
      post={post}
      submitting={submitting}
      setPost={setPost}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
