import { z } from "zod"
import { ObjectId } from "mongodb"

/**
 * Zod schemas for input validation
 * These validate data coming from the client
 */
export const createNoteSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(100, "Title must be 100 characters or less"),
	content: z.string().max(500, "Content must be 500 characters or less"),
})

export const updateNoteSchema = z.object({
	id: z.string().min(1, "Note ID is required"),
	title: z.string().min(1).max(100).optional(),
	content: z.string().max(500).optional(),
})

export const deleteNoteSchema = z.object({
	id: z.string().min(1, "Note ID is required"),
})

/**
 * TypeScript types inferred from Zod schemas
 * This ensures our types always match our validation rules
 */
export type CreateNoteInput = z.infer<typeof createNoteSchema>
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>

/**
 * MongoDB document structure
 * This represents how data is stored in the database
 */
export interface NoteResponse {
	_id: ObjectId // MongoDB's internal ID
	title: string
	content: string
	author: string
	pinned: boolean
}

/**
 * Client-facing note type
 * This represents how data is sent to the browser
 */

export interface Note {
	id: string // ObjectId converted to string
	title: string
	content: string
	author: string
	pinned: boolean
}

/**
 * Document type without _id (for insertOne)
 */
export type NoteDocument = Omit<NoteResponse, "_id">

/**
 * Converter function: MongoDB document → Client-friendly note
 *
 * This is important because:
 * - ObjectId isn't JSON-serializable
 * - Dates need to be ISO strings for JSON
 */

export function documentToNote(doc: NoteResponse): Note {
	return {
		id: doc._id.toString(),
		title: doc.title,
		content: doc.content,
		author: doc.author,
		pinned: doc.pinned,
	}
}
