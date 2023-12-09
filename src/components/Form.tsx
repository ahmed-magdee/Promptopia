import { FormProps } from "@/Types/typescript";
import Link from "next/link";

// Main Component
const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
  // textarea Handler
  const textAreaHandler = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setPost({ ...post, prompt: value });
  };

  // inputHandler
  const inputHandler = (e: { target: { value: any } }) => {
    const { value } = e.target;
    setPost({ ...post, tag: value });
  };

  // return
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with world, and let your imagination
        run wild AI-powered platform.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        {/* TextArea */}
        <label htmlFor="prompt">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>
          <textarea
            name="prompt"
            id="prompt"
            value={post?.prompt}
            placeholder="Write your ptompt here"
            onChange={textAreaHandler}
            required
            className="form_textarea"
          />
        </label>

        {/* TextArea */}
        <label htmlFor="tag">
          <span className="font-normal">(#product, #webdeveloper, #idea)</span>
          <input
            name="tag"
            id="tag"
            value={post?.tag}
            placeholder="#tag"
            onChange={inputHandler}
            required
            className="form_input"
          />
        </label>

        {/* To Cancel Or Send */}
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href={"/"} className="text-gray-500 text-ellipsis">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
            disabled={submitting}
          >
            {submitting ? `${type} ...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
