import Image from 'next/image';

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
    });

    return (
        <div className='bg-base-200 pt-6 sm:pt-8 lg:pt-10 px-3 sm:px-5'>
            <div className='flex flex-col-reverse md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto bg-white rounded-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border border-gray-200'>
                <div className='w-full md:w-3/5 text-center md:text-left'>
                    <span className='text-green-700 bg-green-100 rounded-2xl px-2 text-sm sm:text-base'> {date} </span>
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 mb-5'> আজকের বাজারের দাম এক নজরে </h1>
                    <p className='text-gray-500 text-sm sm:text-base mb-5'> চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক <br className='hidden lg:block'></br> এবং দামের পরিবর্তন এক জায়গায়। </p>
                    <a href='#সব-পণ্য'><button className='btn bg-green-700 text-white px-8 rounded-lg w-full sm:w-auto'> সব পণ্য দেখুন </button></a>
                </div>
                <div className='w-full md:w-2/5 flex justify-center'>
                    <Image src="/bazar-hero.png" width={300} height={200} alt='Hero Image' className='w-48 sm:w-60 lg:w-[300px] h-auto'></Image>
                </div>
            </div>
        </div>
    )
}

export default Hero