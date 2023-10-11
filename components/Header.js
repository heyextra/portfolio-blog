import Link from 'next/link';

export default function Header({ name, blogTitle }) {
  return (
    <header className="pt-20 pb-12 w-full lg:w-[80vw]">
      <h1 className='text-5xl'>{name}</h1>
      <h1 className={"text-lg lg:text-2xl mb-12 "}>
          {blogTitle}
        </h1>
      <p className="text-2xl dark:text-white text-center flex gap-5">
        <Link href="/">
          Blog
        </Link>
        <Link href="/projects">
          Projects
        </Link>
      </p>
    </header>
  );
}
