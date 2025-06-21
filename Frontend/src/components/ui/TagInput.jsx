import { useState, useCallback } from 'react';

export default function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = useCallback((e) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      const value = inputValue.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        setInputValue('');
      }
    }
  }, [inputValue, tags, setTags]);

  const removeTag = useCallback((tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  }, [tags, setTags]);

  return (
    <div className="flex flex-wrap gap-2 items-center border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center pl-2.5 pr-1 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          #{tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="flex-shrink-0 ml-0.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-600 hover:bg-indigo-200 hover:text-indigo-900 focus:outline-none"
          >
            <span className="sr-only">Remove tag</span>
            <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
              <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
            </svg>
          </button>
        </span>
      ))}
      <input
        type="text"
        className="flex-grow min-w-[100px] border-0 p-0 focus:ring-0 text-sm"
        placeholder={tags.length === 0 ? "Add tags (press enter)" : ""}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}