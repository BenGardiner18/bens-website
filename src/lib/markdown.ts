import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

const contentDirectory = path.join(process.cwd(), 'content');

export interface MarkdownData {
  slug: string;
  title: string;
  date?: string;
  content: string;
  excerpt?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export async function getMarkdownBySlug(slug: string, folder: string = 'wiki'): Promise<MarkdownData> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, folder, `${realSlug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Markdown file not found: ${fullPath}`);
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  
  const htmlContent = processedContent.toString();
  
  return {
    slug: realSlug,
    title: data.title || realSlug.replace(/-/g, ' '),
    date: data.date || null,
    content: htmlContent,
    excerpt: data.excerpt || null,
    ...data,
  };
}

export function getAllMarkdownSlugs(folder: string = 'wiki'): string[] {
  const fullPath = path.join(contentDirectory, folder);
  
  if (!fs.existsSync(fullPath)) {
    return [];
  }
  
  const files = fs.readdirSync(fullPath);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export async function getAllMarkdown(folder: string = 'wiki'): Promise<MarkdownData[]> {
  const slugs = getAllMarkdownSlugs(folder);
  const posts = await Promise.all(
    slugs.map((slug) => getMarkdownBySlug(slug, folder))
  );
  
  return posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });
} 