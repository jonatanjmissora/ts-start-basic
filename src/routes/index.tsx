import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<div className="flex-1 w-full">
			<section className="relative py-20 px-6 text-center overflow-hidden">
				HOME PAGE
			</section>
		</div>
	)
}
