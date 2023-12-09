import PromptCard from "./PromptCard";
import Animation from "./Animation";
import { PostType, ProfileProps } from "@/Types/typescript";

// Main Component
const Profile = ({
  name,
  desc,
  data,
  handleDelete,
  handleEdit,
  loading,
}: ProfileProps) => {
  return (
    <section className="w-full">
      {loading && <Animation />}
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data?.map((post) => (
          <PromptCard
            key={post._id}
            post={post as PostType}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
