import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { PiSignInBold } from "react-icons/pi";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className="header-nav">
      <h1>Expense Tracker</h1>
      <section>
        <SignedOut>
          <SignInButton>
            <button className="header-btn">
              <PiSignInBold />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </section>
    </nav>
  );
};

export default Header;
