import Image from 'next/image'
import Navlinks from './Navlinks';
import Marquee from './Marquee';

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className='py-4 bg-base-200'>
      <div className='max-w-6xl mx-auto flex justify-between'>
        <div className='flex gap-2'>
          <Image src={"/logo-icon.png"} width={40} height={20} alt='logo' className='bg-green-500 rounded-lg p-1'></Image>
          <div>
            <h3 className='text-xl font-bold'> বাজার দর </h3>
            <span> {date} </span>
          </div>
        </div>
        <div className='flex gap-3'>
          <button className='btn'>সাইন ইন</button>
          <button className='btn'>সাইন আপ</button>
        </div>
      </div>

      <div className='border-t border-gray-100 mt-4'>
        <div className='max-w-6xl mx-auto'>
          <Navlinks />
        </div>
      </div>

      <div className='border-y border-gray-200'>
        <Marquee></Marquee>
      </div>
    </div>
  )
}

export default Header