import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import coverImage from "@/assets/images/cover_img.jpg";

const Guest = () => {
  return (
    <section className="guest-section">
      <h1 className="guest-h1">Expense Tracker App</h1>
      <h2 className="guest-h2">Manage your expenses and create a budget</h2>
      <Image
        className="guest-img"
        src={coverImage}
        alt="Expense Tracker logo"
      />
      <p className="guest-paragraph">Please sign in to continue</p>
      <SignInButton>
        <button className="guest-btn" aria-label="Sign in">
          Sign In
        </button>
      </SignInButton>
    </section>
  );
};

export default Guest;
