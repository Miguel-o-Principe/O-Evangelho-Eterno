import React, { useState, KeyboardEvent } from 'react';

interface TagInputProps {
    tags: string[];
    onChange: (tags: string[]) => void;
    placeholder?: string;
}

export const TagInput = ({ tags, onChange, placeholder = 'Digite e pressione Enter...' }: TagInputProps) => {
    const [input, setInput] = useState('');

    const addTag = (raw: string) => {
        const value = raw.trim().toLowerCase().replace(/\s+/g, '-');
        if (value && !tags.includes(value)) {
            onChange([...tags, value]);
        }
        setInput('');
    };

    const removeTag = (tag: string) => {
        onChange(tags.filter(t => t !== tag));
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(input);
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            removeTag(tags[tags.length - 1]);
        }
    };

    return (
        <div>
            <label className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">
                Tags
            </label>
            <div className="flex flex-wrap gap-1.5 px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus-within:ring-2 focus-within:ring-primary/30 transition-all min-h-[42px]">
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full"
                    >
                        #{tag}
                        <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="hover:text-primary/60 transition-colors leading-none"
                        >
                            <span className="material-symbols-outlined text-[12px]">close</span>
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => input && addTag(input)}
                    placeholder={tags.length === 0 ? placeholder : ''}
                    className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">Enter ou vírgula para adicionar · Backspace para remover</p>
        </div>
    );
};
