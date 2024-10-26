import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface AddPromiseProps {
  onAdd: (text: string) => void;
}

export const AddPromise: React.FC<AddPromiseProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new promise..."
        className="flex-1 px-6 py-3 border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white/80 backdrop-blur-sm"
      />
      <button
        type="submit"
        className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors flex items-center gap-2 shadow-md hover:shadow-lg"
      >
        <PlusCircle className="w-5 h-5" />
        Add Promise
      </button>
    </form>
  );
};