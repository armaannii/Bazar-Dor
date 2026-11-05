import Hero from "@/components/Hero";
import Image from "next/image";

export default async function Home() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const resData = await res.json();
  console.log(resData)

  return (
    <div>
        <Hero></Hero>
        <div>

        </div>
    </div>
  );
}
