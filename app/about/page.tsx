import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FaArrowUp } from "react-icons/fa";
import coverImage from "@/assets/images/expense_tracker_readme_header.svg";

export const metadata: Metadata = {
  title: "About",
};

const About = () => {
  return (
    <main className="aboutPage-main">
      <h2 className="aboutPage-h2">Expense Tracker App</h2>
      <Image
        className="aboutPage-img"
        src={coverImage}
        alt="Expense Tracker header image"
        width={1000}
        height={400}
        priority
      />
      <p className="aboutPage-paragraph">
        Expense Tracker is an application designed to help track users income
        and expenses
      </p>
      <h3>Features</h3>
      <ul className="aboutPage-ul">
        <li>
          Create account (standard login/password or Google authentication)
        </li>
        <li>Add transactions (expenses/income)</li>
        <li>Delete transactions (expenses/income)</li>
        <li>Track transactions history</li>
        <li>
          Track overall balance as well as current sum of expenses and income
        </li>
        <li>Manage account details</li>
        <li>
          A short demonstration can be seen in{" "}
          <a
            href="https://x.com/i/status/1822937099965788538"
            target="_blank"
            rel="noopener noreferrer"
          >
            this video
          </a>
        </li>
      </ul>
      <Link href="/" className="aboutPage-link">
        Home page
      </Link>
      <h3 className="aboutPage-h3">Contact info</h3>
      <a
        href="https://linktr.ee/dimterion"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          className="aboutPage-img"
          src="https://raw.githubusercontent.com/Dimterion/Dimterion/1521172f216f8f90db6b3b986c1cbb19994847eb/images/bio_link_image.svg"
          alt="Dimterion Bio Link Image"
          width={1000}
          height={400}
          priority
        />
      </a>
      <strong>
        <FaArrowUp /> Profile links (click the image above) <FaArrowUp />
      </strong>
      <aside className="aboutPage-aside">
        <strong>Privacy notice:</strong> this app is currently a portfolio
        project and is in a Work In Progress state. Users can create accounts
        and use the app, but please note that any data entered may be deleted or
        altered as the app evolves. Basic information such as email and name is
        collected for authentication purposes using{" "}
        <a href="https://clerk.com/" target="_blank" rel="noopener noreferrer">
          Clerk
        </a>
        . Data is stored using{" "}
        <a href="https://neon.tech/" target="_blank" rel="noopener noreferrer">
          Neon
        </a>
        .
      </aside>
    </main>
  );
};

export default About;
