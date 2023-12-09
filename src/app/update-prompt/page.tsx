"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Form from "@/components/Form";
import Animation from "@/components/Animation";

// Main Component
const EditPrompt = () => {
  // useState
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const [loading, setLoading] = useState(true);

  // searchParams
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  // useEffect
  useEffect(() => {
    const getPromptDetails = async () => {
      const response: any = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data?.prompt,
        tag: data?.tag,
      });
      setLoading(false);
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  // useRouter
  const router = useRouter();

  // updatePromt
  const updatePrompt = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("PromptId not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
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

  // Return
  return (
    <>
      {loading && <Animation />}
      <Form
        type="Edit"
        post={post}
        submitting={submitting}
        setPost={setPost}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default EditPrompt;
