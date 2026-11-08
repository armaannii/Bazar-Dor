
import { Iproduct } from "@/type/type";
import { notFound } from "next/navigation";


const numberFormat = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 1,
});

const formatNumber = (value: number) => numberFormat.format(value);

const formatPrice = (value: number) => `${formatNumber(value)} টাকা`;

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    notFound();
  }

  const data: Iproduct = await res.json();

  const markets = data.markets ?? [];

  // Calculate minimum, maximum and average market prices
  const lowestPrice = markets.length
    ? Math.min(...markets.map((item) => item.min))
    : 0;

  const highestPrice = markets.length
    ? Math.max(...markets.map((item) => item.max))
    : 0;

  const averagePrice = markets.length
    ? markets.reduce(
        (total, item) => total + (item.min + item.max) / 2,
        0
      ) / markets.length
    : 0;

  const priceDifference = Math.abs(data.today - data.yesterday);

  const isUp = data.change.dir === "up";
  const isDown = data.change.dir === "down";

  const changeColor = isUp
    ? "text-red-500"
    : isDown
    ? "text-green-600"
    : "text-gray-500";

  const changeText = isUp
    ? "বেড়েছে"
    : isDown
    ? "কমেছে"
    : "অপরিবর্তিত রয়েছে";

  const unitLabel = data.unit === "kg" ? "কেজি" : data.unit;

  const summaryCards = [
    {
      title: "সর্বনিম্ন দাম",
      value: lowestPrice,
      description: "সারাদেশের সর্বনিম্ন বাজার দর",
      color: "text-green-600",
    },
    {
      title: "সর্বোচ্চ দাম",
      value: highestPrice,
      description: "সারাদেশের সর্বোচ্চ বাজার দর",
      color: "text-red-500",
    },
    {
      title: "গড় দাম",
      value: averagePrice,
      description: "প্রতি বাজারের গড় দামের ভিত্তিতে",
      color: "text-green-600",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f1f6f1] px-3 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-5">

        {/* Product Header */}
        <section className="rounded-xl border border-[#e5ece5] bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">

            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#f1f6f1] text-3xl sm:size-16">
                {data.image || data.categoryIcon}
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold text-[#25332a] sm:text-2xl">
                  {data.nameBn}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unitLabel} · {data.categoryNameBn}
                </p>

                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                  গতকালের তুলনায় আজ দাম{" "}
                  <span className={changeColor}>
                    {changeText}
                  </span>
                  {" · "}
                  {formatPrice(priceDifference)}
                </p>
              </div>
            </div>

            {/* Current Price */}
            <div className="shrink-0 rounded-xl bg-[#f1f6f1] px-3 py-3 text-center sm:px-5">
              <p className="text-[10px] text-gray-500 sm:text-xs">
                আজকের বাজার দর
              </p>

              <p className="text-2xl font-bold text-[#26362b] sm:text-3xl">
                {formatNumber(data.today)}
              </p>

              <p className="text-xs text-gray-500">
                টাকা / {unitLabel}
              </p>

              <p className={`mt-1 text-xs font-semibold ${changeColor}`}>
                {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
                {formatNumber(data.change.pct)}%
              </p>
            </div>

          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-xl border border-[#e5ece5] bg-white p-4 sm:p-5">
          <h2 className="mb-4 text-base font-semibold text-[#25332a]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-[#e7eee7] bg-[#fbfdfb] p-4"
              >
                <p className="text-xs font-medium text-gray-600">
                  {card.title}
                </p>

                <p className={`mt-1 text-xl font-bold ${card.color}`}>
                  {formatNumber(card.value)} টাকা
                </p>

                <p className="mt-1 text-[11px] text-gray-500">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Price Comparison */}
        <section className="rounded-xl border border-[#e5ece5] bg-white p-4 sm:p-5">
          <h2 className="mb-4 text-base font-semibold text-[#25332a]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">

              <thead>
                <tr className="border-b border-[#e7eee7] text-xs text-gray-500">
                  <th className="px-3 py-3 font-medium">
                    বাজার
                  </th>

                  <th className="px-3 py-3 font-medium">
                    বিভাগ
                  </th>

                  <th className="px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-3 py-3 text-right font-medium">
                    সর্বোচ্চ
                  </th>

                  <th className="px-3 py-3 text-right font-medium">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {markets.map((market, index) => {
                  const marketAverage =
                    (market.min + market.max) / 2;

                  return (
                    <tr
                      key={`${market.market}-${index}`}
                      className={`border-b border-[#dce5dc] transition-colors hover:bg-[#eaf2ea] ${
                        index % 2 === 0
                          ? "bg-[#fbfdfb]"
                          : "bg-[#f1f6f1]"
                      }`}
                    >
                      <td className="px-3 py-3 font-medium text-[#344338]">
                        {market.market}
                      </td>

                      <td className="px-3 py-3 text-gray-600">
                        {market.division}
                      </td>

                      <td className="px-3 py-3 text-right text-gray-700">
                        {formatPrice(market.min)}
                      </td>

                      <td className="px-3 py-3 text-right text-gray-700">
                        {formatPrice(market.max)}
                      </td>

                      <td className="px-3 py-3 text-right font-semibold text-[#344338]">
                        {formatPrice(marketAverage)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {markets.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              কোনো বাজারের তথ্য পাওয়া যায়নি।
            </p>
          )}
        </section>

      </div>
    </main>
  );
};

export default ProductDetailPage;
