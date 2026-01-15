import { ProductsSkeleton } from "@/components/ProductSkeltons"
import {
	notesQueryOptions,
	useSuspenseFilteredNotes,
} from "@/lib/queries/notes"
import { Note } from "@/lib/types/notes"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense } from "react"

export const Route = createFileRoute("/mongodb/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		context.queryClient.ensureQueryData(notesQueryOptions)
	},
})

function RouteComponent() {
	return (
		<article className="flex-1 w-full p-10 ">
			<div className="flex items-enter justify-between">
				<span className="text-2xl font-bold mb-4">NOTES PAGE</span>
				{/* <SearchInput /> */}
			</div>

			<Suspense fallback={<ProductsSkeleton />}>
				<NotesList />
			</Suspense>
		</article>
	)
}

export default function NotesList() {
	// const { q } = Route.useSearch()
	const notes = useSuspenseFilteredNotes().data

	return (
		<div className="flex flex-wrap gap-4 my-10">
			{notes.map((note: Note) => (
				<Link
					key={note.id}
					to="/fake-api/$productId"
					params={{ productId: note.id }}
				>
					<NoteElement note={note} />
				</Link>
			))}
		</div>
	)
}

const NoteElement = ({ note }: { note: Note }) => {
	return (
		<div className="flex flex-col justify-between gap-2 rounded-lg bg-blue-800 w-80 h-40 p-2 shadow-lg">
			<h2>{note.title}</h2>
			<p>{note.content}</p>
			<p>{note.author}</p>
			<p>{note.pinned ? "Pinned" : "Not Pinned"}</p>
		</div>
	)
}
