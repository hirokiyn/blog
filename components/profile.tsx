import Link from "next/link";

export function Profile() {
	return (
		<div className="flex items-center space-x-2">
			<img src="/logo.png" alt="logo" className="w-12 rounded-full" />
			<div className="grid">
				<span className="text-xl font-bold">hiroki</span>
				<div>
					<span>Founder of </span>
					<Link href="https://about.epismo.ai/en" target="_blank" className="underline">
						<span>Epismo</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
