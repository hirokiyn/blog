import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { parseISO, format } from "date-fns";

import { Profile } from "@/components/profile";
import { getPostBySlug, getAllPosts, getMorePosts } from "@/lib/api/posts";
import markdownToHtml from "@/lib/markdownToHtml";

interface PostProps {
	params: {
		slug: string[];
	};
}

export async function generateMetadata({ params }: PostProps): Promise<Metadata> {
	const slug = (await params)?.slug?.join("/");
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	return {
		title: post.title,
		description: post.description
	};
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
	const posts = getAllPosts();

	return posts.map((post) => ({
		slug: post.slug.split("/")
	}));
}

export default async function PostPage({ params }: PostProps) {
	const slug = (await params)?.slug?.join("/");
	const post = getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	const content = await markdownToHtml(post.content || "");
	const posts = getMorePosts(post.title);

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
				<Profile />
			</article>
			<div className="prose dark:prose-invert">
				<h2>More posts</h2>
				{posts.map((post) => (
					<article>
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
