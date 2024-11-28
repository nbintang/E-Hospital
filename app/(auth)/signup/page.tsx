import SignUpForm from "@/components/auth/signup";

export default function SignUpPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <SignUpForm />
    </div>
  );
}
