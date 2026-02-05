import type { FormPropsOrder } from "../models/FormPropsOrder"
import { Button, Label, Row } from "../../../shared/components"
import { FiPlus } from "react-icons/fi"
import { useState } from "react"
import { Flex } from "../../../shared/components"
import NoteCard from "./NoteCard"
import type { Note } from "../models/OrderModels"

export const FormTabNotes = ({ formData, updateField }: FormPropsOrder) => {
    const addNote = () => {
        const newNote = {
            id: Date.now(),
            content: "",
            type: "INTERNAL",
        }
        const updatedNotes = [...formData.notes, newNote]
        updateField("notes", updatedNotes)
    }
    const updateNote = (index: number, updatedNote: Note) => {
        const updatedNotes = [...formData.notes]
        updatedNotes[index] = updatedNote
        updateField("notes", updatedNotes)
    }
    const removeNote = (index: number) => {
        const updatedNotes = [...formData.notes]
        updatedNotes.splice(index, 1)
        updateField("notes", updatedNotes)
    }
    return (
        <div style={{ padding: '1rem 0' }}>
            <Row
                $align="center"
                $justify="space-between"
                fullWidth
                $gap="md"
                style={{ marginBottom: "24px" }}
            >
                <Label style={{ fontSize: '1.1rem', marginBottom: 0 }}>Notas ({formData.notes.length})</Label>
                <Button leftIcon={<FiPlus />} variant="primary" size="sm" onClick={addNote}>
                    Agregar Nota
                </Button>
            </Row>

            {formData.notes.length === 0 ? (
                <div style={{
                    padding: '3rem',
                    textAlign: 'center',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px dashed #d1d5db',
                    color: '#6b7280'
                }}>
                    <p style={{ marginBottom: '1rem' }}>No hay notas agregadas a esta orden.</p>
                    <Button variant="outline" size="sm" onClick={addNote} leftIcon={<FiPlus />}>
                        Crear primera nota
                    </Button>
                </div>
            ) : (
                <Flex direction="column" fullWidth gap="md">
                    {formData.notes.map((note: Note, index: number) => (
                        <NoteCard
                            key={note.id || index}
                            note={note}
                            index={index}
                            onUpdate={updateNote}
                            onRemove={removeNote}
                        />
                    ))}
                </Flex>
            )}
        </div>
    )
}
