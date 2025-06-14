import { getMarkdownBySlug, getAllMarkdownSlugs } from '@/lib/markdown';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const slugs = getAllMarkdownSlugs('writings');
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getMarkdownBySlug(slug, 'writings');
    
    return (
      <article>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        {post.date && (
          <p>
            <em>{new Date(post.date).toLocaleDateString()}</em>
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    );
  } catch {
    notFound();
  }
} 