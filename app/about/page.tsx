import Image from "next/image";
import coverImage from "@/assets/images/expense_tracker_readme_header.svg";

const About = async () => {
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
        and expenses.
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
      </ul>
    </main>
  );
};

export default About;
