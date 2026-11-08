import ProductCard from "@/components/ProductCard";
import SortBy from "@/components/sortBy";
import { Iproduct } from "@/type/type";


const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {

    const { categoryId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}`);
    const data: Iproduct[] = await res.json();
    // console.log(data);
    const category = data[0];
    // console.log(category)



    const formatCount = (count: number) =>
        new Intl.NumberFormat("bn-BD").format(count);

    return (
        <div className="bg-base-200 min-h-screen">
            <div className="max-w-6xl mx-auto py-5 px-3 sm:px-5 lg:px-0">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center bg-white rounded-2xl p-4 sm:p-5">
                    <span className="text-2xl shrink-0"> {category.categoryIcon} </span>
                    <div className="min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold break-words"> {category.categoryNameBn} </h4>
                        <span className="text-sm sm:text-base"> {data && formatCount(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন </span>
                    </div>
                </div>

                <div className="mt-4">
                    <SortBy data={data}></SortBy>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage