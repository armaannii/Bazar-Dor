import Image from 'next/image';

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className='bg-base-200 py-10'>
            <div className='flex items-center justify-between max-w-6xl mx-auto bg-white rounded-2xl px-4  border border-gray-200'>
                <div>
                    <span className='text-green-700 bg-green-100 rounded-2xl px-2'> {date} </span>
                    <h1 className='text-4xl font-bold mt-3 mb-5'> আজকের বাজারের দাম এক নজরে </h1>
                    <p className='text-gray-500 mb-5'> চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক <br></br> এবং দামের পরিবর্তন এক জায়গায়। </p>
                    <button className='btn bg-green-700 text-white px-8 rounded-lg'> সব পণ্য দেখুন </button>
                </div>
                <Image src="/bazar-hero.png" width={300} height={200} alt='Hero Image'></Image>
            </div>
        </div>
    )
}

export default Hero