"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Iproduct } from "@/type/type";
import { ArrowLeft, Link } from "lucide-react";

const SortBy = ({ data }: { data: Iproduct[] }) => {
    const [sortBy, setSortBy] = useState("default");

    const sortedData = [...data].sort((a, b) => {
        if (sortBy === "high-to-low") {
            return b.today - a.today;
        }

        if (sortBy === "low-to-high") {
            return a.today - b.today;
        }

        return 0;
    });

    const formatCount = (count: number) =>
        new Intl.NumberFormat("bn-BD").format(count);


    return (
        <div>
            <div className="flex justify-end items-center gap-2 sm:gap-3 my-5 sm:my-8 py-2 px-2 sm:px-3 bg-white rounded-xl border border-gray-200">
                <label htmlFor="sort" className="font-bold text-sm sm:text-base shrink-0">
                    সাজান
                </label>

                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white rounded-lg px-2 sm:px-5 py-2 my-2 mr-1 sm:mr-4 border border-gray-200 text-xs sm:text-sm min-w-0"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="high-to-low">
                        দাম: বেশি থেকে কম
                    </option>
                    <option value="low-to-high">
                        দাম: কম থেকে বেশি
                    </option>
                </select>
            </div>

            <p className="mt-5 sm:mt-6 mb-3 text-sm sm:text-base"> মোট {data && formatCount(data.length)}টি পণ্য দেখানো হচ্ছে </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 pb-10 sm:pb-15">
                {sortedData.length > 0 ? sortedData.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                )) : <div className="mx-auto py-10 sm:py-15 col-span-full">
                    <p className="text-xl sm:text-2xl">Product card not found</p>
                    <Link
                        href="/"
                        className="flex items-center gap-2 mt-5 bg-green-700 text-white font-bold px-4 py-3 text-sm sm:text-base"
                    >
                        <ArrowLeft size={14} />
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
                }
            </div>
        </div>
    );
};

export default SortBy;