import { SignInButton } from "@clerk/nextjs";

const Guest = () => {
  return (
    <section className="guest-section">
      <h1>Welcome!</h1>
      <p className="guest-paragraph">
        Please sign in to manage your transactions.
      </p>
      <SignInButton>
        <button className="btn btn-guest">Sign In</button>
      </SignInButton>
    </section>
  );
};

export default Guest;
