import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({ component: App })

function App() {
	return (
		<div className="flex-1 w-full bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
			<section className="relative py-20 px-6 text-center overflow-hidden">
				HOLA MUNDO
			</section>
		</div>
	)
}
