'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  
  // Hide navbar on the landing page
  if (pathname === '/') {
    return null;
  }
  
  return (
    <nav>
      <Link href="/">home</Link>
      <Link href="/about">about</Link>
      <Link href="/writings">writings</Link>
    </nav>
  );
} 