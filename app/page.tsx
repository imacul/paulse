import Image from "next/image";

export default function Home() {
  return (
     <div className="relative w-full bg-gray-100">
       <Image
       src="/background.jpeg"
       alt="Lamburghini image"
       width={30}
       height={30}
       quality={100}
       formats={['webp']}
       priority
       className="w-full h-screen bg-center object-cover"
       />
       <div className="absolute inset-0 bg-pink-500 bg-opacity-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl sm:5xl font-bold mb-4">Welcome to Paulse CMS  Emmanuel
        </h1>
        <p className="text-white font-semibold text-2xl" >(Content Management System)</p>

       </div>
     </div>
    )
};