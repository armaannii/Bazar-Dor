import Link from 'next/link';
import React from 'react'

interface Icategory {
    id: string,
    icon: string,
    nameBn: string,
    slug: string,
}

const Navlinks = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    const data: Icategory[] = await res.json();
    // console.log("data", data)
    

    return (
    <div className='flex gap-8 py-4'>
        {
            data.map(category => <Link key={category.id} href={`/category/${category.slug}`}>
                {category.icon} {category.nameBn}
            </Link>)
        }
    </div>
  )
}

export default Navlinks