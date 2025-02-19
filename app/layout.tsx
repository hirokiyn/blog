import Link from "next/link";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";
import { SpeedInsights } from "@/components/speed-insights";
import { ModeToggle } from "@/components/mode-toggle";
import { TITLE, DESCRIPTION } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50 ${inter.className}`}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<div className="mx-auto max-w-2xl px-4 py-10">
						<header>
							<div className="flex items-center justify-between">
								<nav className="mr-auto space-x-6 text-sm font-medium">
									<Link href="/">Home</Link>
									<Link href="/about">About</Link>
								</nav>
								<ModeToggle />
							</div>
						</header>
						<main>{children}</main>
					</div>
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
