import ProductCard from "@/components/ProductCard";


const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
    const { categoryId } = await params;
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`);
    const data = await res.json();
    // console.log(data);
    const category = data[0];
    console.log(category)

    const formatCount = (count: number) =>
        new Intl.NumberFormat("bn-BD").format(count);

    return (
        <div className="bg-base-200">
            <div className=" max-w-6xl mx-auto py-5">
                <div className="flex gap-3 items-center bg-white rounded-2xl p-5">
                    <span className="text-2xl"> {category.categoryIcon} </span>
                    <div>
                        <h4 className="text-xl font-bold"> {category.categoryNameBn} </h4>
                        <span> {formatCount(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন </span>
                    </div>
                </div>
                <p className="mt-6 mb-3"> মোট {formatCount(data.length)}টি পণ্য দেখানো হচ্ছে </p>
                <div className="grid grid-cols-3 gap-4 pb-15">
                    {
                        data.map(product => <div>
                            <ProductCard product={product}></ProductCard>
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryPage