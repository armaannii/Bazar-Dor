import { Iproduct } from "@/type/type";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Type {
    id: number,
    image: string,
    nameBn: string,
    today: number,
    change: {
        dir: string,
        pct: number
    },
}

const Marquee = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
    const resData: Iproduct[] = await res.json();
    // console.log(resData)
    return (
        <div className="py-2">
            <MarqueeText duration={12}>
                {
                    resData.map(data => <div key={data.id} className="flex gap-2 pr-8">
                        <span> {data.image} </span> 
                        <span> {data.nameBn} </span> 
                        <span> {`${data.today} টাকা/কেজি`} </span>
                        {data.change.dir === "up" ? <div className="flex items-center gap-1 text-red-500">
                            <TbTriangleFilled /> {data.change.pct} %
                        </div> : <div className="flex items-center gap-1 text-green-500">
                            <TbTriangleInvertedFilled /> {data.change.pct} %
                        </div>}
                    </div>)
                }
            </MarqueeText>
        </div>
    )
}

export default Marquee

