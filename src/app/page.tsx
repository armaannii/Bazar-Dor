import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { Iproduct } from "@/type/type";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const data: Iproduct[] = await res.json();
  const priceUpData: Iproduct[] = data.filter((item: Iproduct) => item.change && item.change.dir === "up");
  const priceDownData: Iproduct[] = data.filter((item: Iproduct) => item.change && item.change.dir === "down");
  // console.log("down", priceDownData);

  const formatCount = (count: number) =>
    new Intl.NumberFormat("bn-BD").format(count);

  return (
    <div className="bg-base-200">
      <Hero></Hero>
      <div className="max-w-6xl mx-auto px-3 py-8 sm:px-5 sm:py-10 lg:px-0 lg:py-15">
        {/* আজ দাম বেড়েছে */}
        <h2 className="mb-4">
          <span className="text-red-600"> ▲ </span>
          <span className="text-xl sm:text-2xl font-bold"> আজ দাম বেড়েছে </span>
        </h2>
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceUpData.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* আজ দাম কমেছে */}
        <h2 className="mt-10 sm:mt-12 lg:mt-15 mb-4">
          <span className="text-green-600"> ▼ </span>
          <span className="text-xl sm:text-2xl font-bold"> আজ দাম কমেছে </span>
        </h2>
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {priceDownData.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* সব পণ্য*/}
        <section id="সব-পণ্য">
          <h2 className="mt-10 sm:mt-12 lg:mt-15 mb-4">
            <p className="text-xl sm:text-2xl font-bold"> সব পণ্য </p>
            <p className="text-sm sm:text-base text-gray-400"> মোট {formatCount(data.length)} টি পণ্য দেখানো হচ্ছে </p>
          </h2>
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}