import { Dispatch, FormEventHandler, ReactNode, SetStateAction } from "react";

// Profile Props
export type ProfileProps = {
  name: string;
  desc: string;
  data: {
    _id: string;
  }[];
  handleDelete: (arg: object) => void;
  handleEdit: (arg: object) => void;
  loading: boolean;
};

// The PostType In Profile page
export type PostType = {
  _id: string;
  creator: {
    image: string;
    username: string;
    email: string;
    id: string;
  };
  prompt: string;
  tag: string;
};

// ==================
// Feed Component
export type PromptCardListProps = {
  data?: {
    _id: string;
    creator: {
      image: string;
      username: string;
      email: string;
    };
  }[];
  handleTagClick?: (arg?: string) => void;
};

// useState in Feed
export type UseStateProps = {
  id: string;
  image: string;
  username: string;
  email: string;
  tag: string;
  prompt: string;
  _id: string;
  creator: {
    id: string;
    image: string;
    username: string;
    email: string;
  };
}[];

// ====================
// Form Component
export type FormProps = {
  type?: string;
  post?: {
    prompt: string;
    tag: string;
  };
  setPost?: any;
  submitting?: boolean;
  handleSubmit?: FormEventHandler<HTMLFormElement> | undefined;
};

// ================
// PromptCard
export type PromptCardProps = {
  post: {
    creator: {
      image: string;
      username: string;
      email: string;
      id: string;
      _id?: string;
    };
    prompt: string;
    tag: string;
  };
  handleTagClick?: (arg?: string) => void;
  handleDelete?: () => void;
  handleEdit?: () => void;
};

// SessionProps
export type SessionType = {
  data: {
    user?: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
    };
  };
};

// ===================
// ProviderComponent
export type ProviderProps = {
  session?: null | undefined;
  children: ReactNode;
};
