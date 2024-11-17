import Link from "next/link";

export function Profile() {
	return (
		<div className="flex items-center space-x-2">
			<img src="/logo.png" alt="logo" className="w-10 rounded-full" />
			<span className="text-xl font-bold">hiroki</span>
			<Link
				href="https://x.com/hirokiyn"
				target="_blank"
				className="text-slate-500 underline dark:text-slate-400"
			>
				@hirokiyn
			</Link>
		</div>
	);
}
