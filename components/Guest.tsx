import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <section className="guest-section">
      <h2>Welcome!</h2>
      <p className="guest-paragraph">
        Please sign in to manage your transactions.
      </p>
      <SignInButton>
        <button className="guest-btn">Sign In</button>
      </SignInButton>
    </section>
  );
};

export default Guest;
