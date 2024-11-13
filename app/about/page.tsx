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
    </main>
  );
};

export default About;
