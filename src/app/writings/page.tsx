import Link from 'next/link';
import { getAllMarkdown } from '@/lib/markdown';

export default async function Writings() {
  const posts = await getAllMarkdown('writings');
  
  return (
    <>
      <h1 className="text-2xl font-bold">Writings</h1>
      
      <p>
        Here are some things I&apos;ve written:
      </p>
      
      {posts.length === 0 ? (
        <p>
          <em>No writings yet. Add some markdown files to the content/writings/ folder.</em>
        </p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writings/${post.slug}`}>
                <strong>{post.title}</strong>
              </Link>
              {post.excerpt && (
                <>
                  <br />
                  <span>{post.excerpt}</span>
                </>
              )}
              {post.date && (
                <>
                  <br />
                  <em>{new Date(post.date).toLocaleDateString()}</em>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      
      <p>
        <Link href="/">← Back to home</Link>
      </p>
    </>
  );
} 