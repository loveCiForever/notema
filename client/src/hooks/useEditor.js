import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { fetchNote, saveNote } from '../services/noteService';

export default function useEditor(noteId) {
    const [content, setContent] = useState(null);
    const [status, setStatus] = useState('idle');

    // 1. Load note
    useEffect(() => {
        setStatus('loading');
        fetchNote(noteId).then(data => {
            setContent(data);
            setStatus('loaded');
        });
    }, [noteId]);

    // 2. Debounced save
    const debouncedSave = useCallback(
        debounce((newData) => {
            saveNote(noteId, newData).then(() => setStatus('saved'));
        }, 1000),
        [noteId]
    );

    const onChange = (newData) => {
        setContent(newData);
        setStatus('saving');
        debouncedSave(newData);
    };

    return { content, status, onChange };
}
