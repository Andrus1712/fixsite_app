import { useState } from "react";
import { FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";
import {
    Card,
    Button,
    Badge,
    TextArea,
    Select,
    Flex,
    Row
} from "../../../shared/components";
import type { Note } from "../models/OrderModels";

interface NoteCardProps {
    note: Note;
    index: number;
    onUpdate: (index: number, updatedNote: Note) => void;
    onRemove: (index: number) => void;
}

const NoteCard = ({ note, index, onUpdate, onRemove }: NoteCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState(note);

    const handleSave = () => {
        onUpdate(index, editValues);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditValues(note);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <Card padding="medium" variant="outlined" style={{ marginBottom: "1rem" }}>
                <Flex direction="column" gap="md">
                    <Select
                        label="Visibilidad"
                        value={editValues.type}
                        onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
                        options={[
                            { value: "INTERNAL", label: "Interno - Visible solo para staff" },
                            { value: "PUBLIC", label: "Público - Visible para el cliente" },
                        ]}
                        fullWidth
                    />
                    <TextArea
                        label="Contenido"
                        value={editValues.content}
                        onChange={(e) => setEditValues({ ...editValues, content: e.target.value })}
                        placeholder="Escriba la nota aquí..."
                        fullWidth
                        resize="vertical"
                        autoFocus
                    />
                    <Row $justify="flex-end" $gap="sm" style={{ marginTop: "8px" }}>
                        <Button variant="outline" size="sm" onClick={handleCancel} leftIcon={<FiX />}>
                            Cancelar
                        </Button>
                        <Button variant="primary" size="sm" onClick={handleSave} leftIcon={<FiSave />}>
                            Guardar
                        </Button>
                    </Row>
                </Flex>
            </Card>
        );
    }

    return (
        <Card padding="medium" variant="elevated" style={{ marginBottom: "1rem" }}>
            <Flex direction="column" gap="sm">
                <Row $justify="space-between" $align="center">
                    <Badge variant={note.type === 'INTERNAL' ? 'info' : 'success'}>
                        {note.type === 'INTERNAL' ? 'INTERNO' : 'PÚBLICO'}
                    </Badge>
                    <Row $gap="xs">
                        <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} style={{ padding: '6px' }}>
                            <FiEdit2 />
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => onRemove(index)} style={{ padding: '6px' }}>
                            <FiTrash2 />
                        </Button>
                    </Row>
                </Row>
                <div style={{ whiteSpace: 'pre-wrap', color: '#374151', fontSize: '14px', marginTop: '8px', lineHeight: '1.5' }}>
                    {note.content || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Sin contenido...</span>}
                </div>
                {note.timestamp && (
                    <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '8px', textAlign: 'right' }}>
                        {new Date(note.timestamp).toLocaleString()}
                    </div>
                )}
            </Flex>
        </Card>
    );
};

export default NoteCard;