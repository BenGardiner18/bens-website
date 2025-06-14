import Link from "next/link";

export default function About() {
  return (
    <>
      <h1 className="text-2xl font-bold">About</h1>
      
      <p>
        Hello, I&apos;m Ben.
      </p>
      
      <p>
        I enjoy writing code, learning new technologies, and building useful stuff.
        I just graduated from Boston University and now I&apos;m investing at <a href="https://genesisfund.co">Genesis Fund</a> and working at <a href="https://www.invoicecloud.net">InvoiceCloud</a>.
      </p>
      
      
      
      <p>
        You can find me working on various projects or <Link href="/writings">writing about them</Link>.
      </p>
    </>
  );
} 