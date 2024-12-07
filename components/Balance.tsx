import { addCommas } from "@/lib/utils";
import getUserBalance from "@/app/actions/getUserBalance";

const Balance = async () => {
  const { balance } = await getUserBalance();

  return (
    <section>
      <h3 className="balance-h3">Your Balance:</h3>
      <h4 className="balance-h4">
        ${addCommas(Number(balance?.toFixed(2) ?? 0))}
      </h4>
    </section>
  );
};

export default Balance;
