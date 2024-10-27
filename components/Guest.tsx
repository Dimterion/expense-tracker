import Image from "next/image";
import { TiArrowForward } from "react-icons/ti";
import { SignInButton } from "@clerk/nextjs";
import coverImage from "@/assets/images/cover_img.jpg";

const Guest = () => {
  return (
    <section className="guest-section">
      <h1 className="guest-h1">Expense Tracker App</h1>
      <h2 className="guest-h2">Manage your expenses and create a budget*</h2>
      <Image
        className="guest-img"
        src={coverImage}
        alt="Expense Tracker logo"
        width={300}
        height={300}
        priority
      />
      <p className="guest-paragraph">
        Please sign in to continue
        <TiArrowForward className="guest-btnArrow" />
      </p>
      <SignInButton>
        <button className="guest-btn" aria-label="Sign in">
          Sign In
        </button>
      </SignInButton>
      <aside className="guest-aside">
        *Please note that the app is in Work In Progress state which means that
        it may change in the future and any saved data may be deleted from it.
      </aside>
    </section>
  );
};

export default Guest;
