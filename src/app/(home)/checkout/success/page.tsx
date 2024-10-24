import Image from "next/image";
const page = () => {
  return (
    <div className="min-h-screen px-8 my-20 justify-center flex flex-col items-start w-full md:px-16 md:my-24">
      <div className="flex w-full flex-col items-center justify-center gap-16">
        <div className="w-[150px] h-[150px] relative overflow-hidden rounded-full">
          <Image
            src="/images/checked.png"
            alt="Success icon"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-semibold text-white md:text-3xl">
            Thank you for your purchase
          </h1>
          <p className="text-base text-white font-medium">
            Your digital art is now available in your collection, check your
            account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
