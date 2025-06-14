import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* <nav>
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/writings">writings</Link>
      </nav> */}
      
      <h1>Ben Gardiner</h1>
      
      <p>
        Welcome to my website.
      </p>
      
      <p>
        I write code, think about things, and occasionally put words together.
      </p>
      
      <p>
        <Link href="/about">Learn more about me</Link> or check out my <Link href="/writings">writings</Link>.
      </p>
    </>
  );
}
