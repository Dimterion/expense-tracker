import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Please sign in to manage your transactions.</p>
      <SignInButton>
        <button className="btn">Sign In</button>
      </SignInButton>
    </div>
  );
};

export default Guest;
