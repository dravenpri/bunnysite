import React from 'react';
import { Trash2, Heart } from 'lucide-react';
import type { Promise } from '../services/db';

interface PromiseListProps {
  promises: Promise[];
  onDelete: (id: string) => void;
}

export const PromiseList: React.FC<PromiseListProps> = ({ promises, onDelete }) => {
  return (
    <div className="space-y-4">
      {promises.map((promise) => (
        <div
          key={promise.id}
          className={`group promise-card p-6 rounded-xl ${
            promise.is_permanent
              ? 'border-2 border-pink-200 bg-pink-50/50'
              : ''
          }`}
        >
          <div className="flex items-start gap-3">
            {promise.is_permanent && (
              <Heart className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
            )}
            <p className="text-gray-700 flex-grow">{promise.text}</p>
            {!promise.is_permanent && (
              <button
                onClick={() => promise.id && onDelete(promise.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-pink-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};