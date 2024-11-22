import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

type Post = {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	content: string;
};

const postsDirectory = join(process.cwd(), "content/posts");

export function getPostSlugs() {
	return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(postsDirectory, `${realSlug}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return posts;
}

export function getMorePosts(title: string): Post[] {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		.filter((post) => post.title !== title)
		.sort(() => (Math.random() > 0.5 ? 1 : -1))
		.slice(0, 2);
	return posts;
}

export function getCategorizedPosts(tag: string) {
	const slugs = getPostSlugs();
	const posts = slugs
		.map((slug) => getPostBySlug(slug))
		.filter((post) => post.tags.includes(tag))
		// sort posts by date in descending order
		.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
	return posts;
}

export function getAllCategories(): string[] {
	const slugs = getPostSlugs();
	const posts = slugs.map((slug) => getPostBySlug(slug));
	const categories = Array.from(new Set(posts.flatMap((post) => post.tags)));
	return categories;
}
