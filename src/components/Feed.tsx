"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import {
  PostType,
  PromptCardListProps,
  UseStateProps,
} from "@/Types/typescript";
import Animation from "./Animation";

// List Component
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  // return
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post as PostType}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

// Main Component
const Feed = () => {
  // useState
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<[] | UseStateProps>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | number>(
    0
  );
  const [searchedResults, setSearchedResults] = useState<[] | UseStateProps>(
    []
  );

  // useEffect
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    };
    fetchPosts();
    if (posts.length === 0) {
      setLoading(false);
    }
  }, []);

  // filteredPrompts
  const filteredPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // {i} for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  // handelSearchText
  const handelSearchText = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filteredPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // handleTagClick
  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    const searchResult = filteredPrompts(tag);

    setSearchedResults(searchResult);
  };

  // return
  return (
    <section className="feed">
      {loading && <Animation />}
      <form className="relative w-full flex-center">
        <input
          id="search"
          name="search"
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handelSearchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchedResults.length !== 0 ? searchedResults : posts}
        handleTagClick={handleTagClick as (arg: string | undefined) => void}
      />
    </section>
  );
};

export default Feed;
