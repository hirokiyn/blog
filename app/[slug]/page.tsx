import { notFound } from "next/navigation";
import { Metadata } from "next";

import { Profile } from "@/components/profile";
import { getPageBySlug, getAllPages } from "@/lib/api/pages";
import markdownToHtml from "@/lib/markdown-to-html";

type PageProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const slug = (await params)?.slug;
	const page = getPageBySlug(slug);

	if (!page) {
		return notFound();
	}

	return {
		title: page.title,
		description: page.description
	};
}

export function generateStaticParams(): PageProps["params"][] {
	const pages = getAllPages();

	return pages.map((page) =>
		Promise.resolve({
			slug: page.slug
		})
	);
}

export default async function Page({ params }: PageProps) {
	const slug = (await params)?.slug;
	const page = getPageBySlug(slug);

	if (!page) {
		return notFound();
	}

	const content = await markdownToHtml(page.content || "");

	return (
		<>
			<article className="prose py-6 dark:prose-invert">
				<h1>{page.title}</h1>
				{page.description && <p className="text-xl">{page.description}</p>}
				<hr />
				<div dangerouslySetInnerHTML={{ __html: content }} />
				<Profile />
			</article>
		</>
	);
}
