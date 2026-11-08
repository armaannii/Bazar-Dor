
"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Iproduct } from "@/type/type";

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
            <div className="flex justify-end items-center gap-3 my-8 py-2 bg-white rounded-xl border border-gray-200">
                <label htmlFor="sort" className="font-bold">
                    সাজান
                </label>

                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white rounded-lg px-5 py-2 my-2 mr-4 border border-gray-200"
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

            <p className="mt-6 mb-3"> মোট {data && formatCount(data.length)}টি পণ্য দেখানো হচ্ছে </p>
            <div className="grid grid-cols-3 gap-4 pb-15">
                {sortedData.map((product) => (
                    <div key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SortBy;
