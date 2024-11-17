import { allPosts } from "@/.contentlayer/generated";
import Link from "next/link";

export default function Home() {
	allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

	return (
		<>
			<div className="flex items-center space-x-2 pt-10">
				<img src="/logo.png" alt="logo" className="w-10 rounded-full" />
				<h1 className="text-xl font-bold">hiroki</h1>
				<Link
					href="https://x.com/hirokiyn"
					target="_blank"
					className="text-slate-500 underline dark:text-slate-400"
				>
					@hirokiyn
				</Link>
			</div>
			<div className="prose dark:prose-invert">
				{allPosts.map((post) => (
					<article key={post._id}>
						<Link href={post.slug}>
							<h2>{post.title}</h2>
						</Link>
						{post.description && <p>{post.description}</p>}
					</article>
				))}
			</div>
		</>
	);
}
