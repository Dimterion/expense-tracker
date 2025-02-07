import Link from "next/link";
import Image from "next/image";
import { TiArrowForward } from "react-icons/ti";
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
        width={300}
        height={300}
        priority
      />
      <p className="guest-paragraph">
        Sign in or continue without an account
        <TiArrowForward className="guest-btnArrow" />
      </p>
      <SignInButton>
        <button className="guest-btn" aria-label="Sign in">
          Sign In
        </button>
      </SignInButton>
      <Link href="/expense-tracker" className="guest-link">
        Expense Tracker
      </Link>
      <Link href="/about" className="guest-link">
        About
      </Link>
      <pre>Version 1.5</pre>
    </section>
  );
};

export default Guest;
