import ProductCard from "@/components/ProductCard";
import SortBy from "@/components/sortBy";
import { Iproduct } from "@/type/type";


const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {

    const { categoryId } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}`);
    const data: Iproduct[] = await res.json();
    // console.log(data);
    const category = data[0];
    console.log(category)

    // const [data, setData] = useState<Iproduct[] | null>(null);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}`);
    //             if (!res.ok) throw new Error('Failed to fetch data');
    //             const result: Iproduct[] = await res.json();
    //             // set state...
    //             setData(result)
    //         } catch (error) {
    //             console.error('Fetch error:', error);
    //         }
    //     }
    //     fetchData();
    // }, []);
    // if (!data || data.length === 0) {
    //     return <div className="text-center py-8">
    //         <span className="loading loading-bars loading-lg"></span>;
    //     </div>
    // }
    // const category = data[0];



    const formatCount = (count: number) =>
        new Intl.NumberFormat("bn-BD").format(count);

    return (
        <div className="bg-base-200">
            <div className=" max-w-6xl mx-auto py-5">
                <div className="flex gap-3 items-center bg-white rounded-2xl p-5">
                    <span className="text-2xl"> {category.categoryIcon} </span>
                    <div>
                        <h4 className="text-xl font-bold"> {category.categoryNameBn} </h4>
                        <span> {data && formatCount(data.length)}টি পণ্যের আজকের দাম ও পরিবর্তন </span>
                    </div>
                </div>

                <div>
                    <SortBy data={data}></SortBy>
                </div>

                
                {/* <div className="grid grid-cols-3 gap-4 pb-15">
                    {
                        data && data.map(product => <div key={product.id}>
                            <ProductCard product={product}></ProductCard>
                        </div>)
                    }
                </div>  */}
            </div>
        </div>
    )
}

export default CategoryPage