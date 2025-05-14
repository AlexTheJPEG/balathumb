import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-5xl font-bold">Balathumb</h1>
      <div className="mt-16 flex items-start -ml-64">
        <Image
          className="mr-8"
          src="/bg/bg_green.png"
          alt="Green Background"
          width={640}
          height={360}
          quality={100}
        />
        <h2 className="text-3xl font-semibold pt-0">Jokers</h2>
      </div>
    </main>
  );
}
