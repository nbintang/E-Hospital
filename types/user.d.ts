export type UserProps = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile?: {  // Make profile optional
    fullname: string;
  } | null;
};
