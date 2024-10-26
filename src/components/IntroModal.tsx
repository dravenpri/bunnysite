import React from 'react';
import { Heart } from 'lucide-react';

interface IntroModalProps {
  onClose: () => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="intro-modal rounded-2xl p-8 max-w-lg w-full shadow-xl">
        <div className="text-center">
          <Heart className="w-16 h-16 text-pink-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-800 mb-6">My Promises to You</h2>
          <div className="prose text-gray-600 mb-8 space-y-4">
            <p>
              My beautiful bunny chop, I created this special place to keep all the promises
              I make to you. Some promises are permanent and irremovable, they'll always be there for my bunny. 
              Others I'll add as our love grows more and more every day.
            </p>
            <p>
              You're the best thing to ever happen to me, my gorgeous princesa. All of these promises are a reflection of 
              how much you mean to me and how much love I have for you. Thank you for being so, so perfect in every way :).
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors shadow-md hover:shadow-lg font-medium"
          >
            Begin Our Journey Together ❤️
          </button>
        </div>
      </div>
    </div>
  );
};