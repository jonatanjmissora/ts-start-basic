import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogMedia,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteMongoNote } from "@/lib/queries/notes"
import { Note } from "@/lib/types/notes"
import { useQueryClient } from "@tanstack/react-query"
import { Loader, Trash2, Trash2Icon } from "lucide-react"
import { useState } from "react"

export function AlertDialogDelete({ note }: { note: Note }) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const { mutateAsync: deleteMongoNote, isPending } =
		useDeleteMongoNote(queryClient)

	const handleDelete = () => {
		deleteMongoNote(
			{ data: { id: note.id } },
			{
				onSuccess: () => {
					setOpen(false)
					// sonner mesage goes here
				},
				onError: error => {
					alert(`COMPONENT: ${error}`)
					// sonner error message goes here
				},
			}
		)
	}

	return (
		<AlertDialog open={open}>
			<AlertDialogTrigger asChild>
				<button className="cursor-pointer" onClick={() => setOpen(true)}>
					<Trash2 size={20} />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent
				size="sm"
				setOpen={setOpen}
				className={"bg-blue-950 border border-blue-900 p-20"}
			>
				<AlertDialogHeader>
					<AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
						<Trash2Icon />
					</AlertDialogMedia>
					<AlertDialogTitle>¿ Eliminar {note.title} ?</AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel
						variant="outline"
						className="bg-blue-900 text-white border border-blue-900"
						onClick={() => setOpen(false)}
					>
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction variant="destructive" onClick={handleDelete}>
						{isPending ? (
							<div className="flex items-center gap-1">
								Eliminar
								<Loader size={20} className="animate-spin" />
							</div>
						) : (
							"Eliminar"
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
