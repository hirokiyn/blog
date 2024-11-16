import { notFound } from "next/navigation";
import { allPosts } from "contentlayer/generated";
import { parseISO, format } from "date-fns";

import { Metadata } from "next";
import { Mdx } from "@/components/mdx-components";

interface PostProps {
	params: {
		slug: string[];
	};
}

async function getPostFromParams(params: PostProps["params"]) {
	const slug = params?.slug?.join("/");
	const post = allPosts.find((post) => post.slugAsParams === slug);

	if (!post) {
		null;
	}

	return post;
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
	const post = await getPostFromParams(params);

	if (!post) {
		return {};
	}

	return {
		title: post.title,
		description: post.description
	};
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
	return allPosts.map((post) => ({
		slug: post.slugAsParams.split("/")
	}));
}

export default async function PostPage({ params }: PostProps) {
	const post = await getPostFromParams(params);

	if (!post) {
		notFound();
	}

	return (
		<article className="prose dark:prose-invert py-6">
			<h1 className="mb-2">{post.title}</h1>
			{post.description && (
				<p className="mt-0 text-xl text-slate-700 dark:text-slate-200">
					{post.description}
				</p>
			)}
			{post.date && (
				<time dateTime={post.date}>{format(parseISO(post.date), "LLLL	d, yyyy")}</time>
			)}
			<hr className="my-4" />
			<Mdx code={post.body.code} />
		</article>
	);
}
