"use client";

import { Iproduct } from "@/type/type";
import { useEffect, useState } from "react";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const Marquee = () => {
    const [data, setData] = useState<Iproduct[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                // Fixed: Fetching products endpoint instead of categories (based on your commented-out code)
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const result: Iproduct[] = await res.json();
                setData(result);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // 1. If it's still loading or data is empty, don't render the marquee package yet
    if (loading || !data || data.length === 0) {
        return <div className="py-2 text-center text-gray-400 text-xs sm:text-sm">Loading market prices...</div>;
    }

    return (
        <div className="py-2 sm:py-3 overflow-hidden text-xs sm:text-sm lg:text-base">
            <MarqueeText duration={12}>
                {data.map((product) => (
                    <div key={product.id} className="flex items-center gap-1.5 sm:gap-2 pr-5 sm:pr-8 whitespace-nowrap">
                        <span>{product.image}</span>
                        <span className="font-medium">{product.nameBn}</span>
                        <span>{`${product.today} টাকা/কেজি`}</span>

                        {product.change?.dir === "up" ? (
                            <div className="flex items-center gap-1 text-red-500">
                                <TbTriangleFilled /> {product.change.pct} %
                            </div>
                        ) : (
                            <div className="flex items-center gap-1 text-green-500">
                                <TbTriangleInvertedFilled /> {product.change.pct} %
                            </div>
                        )}
                    </div>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;