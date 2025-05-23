import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { parseISO, format } from "date-fns";

import { Profile } from "@/components/profile";
import { getPostBySlug, getAllPosts, getMorePosts } from "@/lib/api/posts";
import markdownToHtml from "@/lib/markdown-to-html";

type PostProps = {
	params: Promise<{
		slug: string;
	}>;
};

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
	const slug = (await params)?.slug;
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	return {
		title: post.title,
		description: post.description
	};
}

export function generateStaticParams(): PostProps["params"][] {
	const posts = getAllPosts();

	return posts.map((post) =>
		Promise.resolve({
			slug: post.slug
		})
	);
}

export default async function Post({ params }: PostProps) {
	const slug = (await params)?.slug;
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	const posts = getMorePosts(post.title);
	const content = await markdownToHtml(post.content || "");

	return (
		<>
			<article className="prose py-6 dark:prose-invert">
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
				<div dangerouslySetInnerHTML={{ __html: content }} />
				{post.tags && (
					<div className="flex items-center space-x-2">
						{post.tags.map((tag) => (
							<Link href={`/categories/${tag}`}>#{tag}</Link>
						))}
					</div>
				)}
			</article>
			<h2 className="pb-10">
				<Profile />
			</h2>
			<div className="prose dark:prose-invert">
				<h2>More posts</h2>
				{posts.map((post) => (
					<article key={post.slug}>
						<Link href={`/posts/${post.slug}`}>
							<h3>{post.title}</h3>
						</Link>
						{post.description && <p>{post.description}</p>}
					</article>
				))}
			</div>
		</>
	);
}
