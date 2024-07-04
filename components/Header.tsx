import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { PiSignInBold } from "react-icons/pi";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  const user = await checkUser();

  return (
    <nav>
      <h2>Expense Tracker</h2>
      <section>
        <SignedOut>
          <SignInButton>
            <button className="btn btn-nav">
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
