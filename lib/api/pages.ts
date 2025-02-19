import { notFound } from "next/navigation";

import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

type Page = {
	slug: string;
	title: string;
	description: string;
	content: string;
};

const pagesDirectory = join(process.cwd(), "content/pages");

export function getPageSlugs() {
	return fs.readdirSync(pagesDirectory);
}

export function getPageBySlug(slug: string) {
	const realSlug = slug.replace(/\.md$/, "");
	const fullPath = join(pagesDirectory, `${realSlug}.md`);

	if (!fs.existsSync(fullPath)) {
		return notFound();
	}

	const fileContents = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(fileContents);

	return { ...data, slug: realSlug, content } as Page;
}

export function getAllPages(): Page[] {
	const slugs = getPageSlugs();
	const pages = slugs.map((slug) => getPageBySlug(slug));
	return pages;
}
