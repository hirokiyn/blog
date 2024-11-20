import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Profile } from "@/components/profile";
import { getPageBySlug, getAllPages } from "@/lib/api/pages";
import markdownToHtml from "@/lib/markdownToHtml";

interface PageProps {
	params: {
		slug: string[];
	};
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const slug = (await params)?.slug?.join("/");
	const page = getPageBySlug(slug);

	if (!page) {
		return {};
	}

	return {
		title: page.title,
		description: page.description
	};
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
	const pages = getAllPages();

	return pages.map((page) => ({
		slug: page.slug.split("/")
	}));
}

export default async function PagePage({ params }: PageProps) {
	const slug = (await params)?.slug?.join("/");
	const page = getPageBySlug(slug);

	if (!page) {
		notFound();
	}

	const content = await markdownToHtml(page.content || "");

	return (
		<article className="prose py-6 dark:prose-invert">
			<h1>{page.title}</h1>
			{page.description && <p className="text-xl">{page.description}</p>}
			<hr />
			<div dangerouslySetInnerHTML={{ __html: content }} />
			<Profile />
		</article>
	);
}
