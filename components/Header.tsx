import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { PiSignInBold } from "react-icons/pi";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();

  return (
    <header className="header-header">
      <h1 className={`header-h1 ${user && "header-loggedIn"}`}>
        <a className="header-a" href="/">
          Expense Tracker
        </a>
      </h1>
      <nav>
        <SignedOut>
          <SignInButton>
            <button className="header-btn" aria-label="Sign in">
              <PiSignInBold />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                rootBox: "header-customClerkBtn",
              },
            }}
          />
        </SignedIn>
      </nav>
    </header>
  );
};

export default Header;
