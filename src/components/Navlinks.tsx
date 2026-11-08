"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Icategory {
    id: string;
    icon: string;
    nameBn: string;
    slug: string;
}

const Navlinks = () => {
    const pathname = usePathname();


    // const res = await fetch(`${process.env.PUBLIC_API_URL}/categories`);
    // const data: Icategory[] = await res.json();
    // console.log("first", data)

    const [data, setData] = useState<Icategory[] | null>(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                if (!res.ok) throw new Error('Failed to fetch data');
                const result: Icategory[] = await res.json();
                // set state...
                setData(result)
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex gap-2 sm:gap-4 lg:gap-8 overflow-x-auto py-3 sm:py-4 px-1 whitespace-nowrap scrollbar-thin">
            {data && data.map((category) => {
                const isActive =
                    pathname === `/category/${category.slug}`;

                return (
                    <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className={`shrink-0 rounded-lg px-2 sm:px-3 py-2 text-sm sm:text-base transition-colors ${isActive
                            ? "bg-green-700 text-white"
                            : " text-black hover:bg-green-100"
                            }`}
                    >
                        {category.icon} {category.nameBn}
                    </Link>
                );
            })}
        </div>
    );
};

export default Navlinks;