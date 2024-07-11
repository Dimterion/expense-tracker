import { addCommas } from "@/lib/utils";
import getUserBalance from "@/app/actions/getUserBalance";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <section>
      <h3 className="balance-h3">Your Balance:</h3>
      <h2 className="balance-h2">
        ${addCommas(Number(balance?.toFixed(2) ?? 0))}
      </h2>
    </section>
  );
};

export default Balance;
