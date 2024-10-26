import React, { useState, useEffect } from 'react';
import { Heart, Edit2, Save } from 'lucide-react';
import { fetchLoveLetter, updateLoveLetter } from '../services/db';

export const LoveLetter: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [letter, setLetter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLetter = async () => {
      const content = await fetchLoveLetter();
      setLetter(content);
      setIsLoading(false);
    };
    loadLetter();
  }, []);

  const handleSave = async () => {
    const success = await updateLoveLetter(letter);
    if (success) {
      setIsEditing(false);
    } else {
      alert('Failed to save the love letter. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="mt-16 flex justify-center">
        <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="w-8 h-8 text-pink-500" />
          My Love Letter to You
        </h2>
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
        >
          {isEditing ? (
            <>
              <Save className="w-5 h-5" />
              Save Letter
            </>
          ) : (
            <>
              <Edit2 className="w-5 h-5" />
              Edit Letter
            </>
          )}
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={
            "My little strawberry,\nYou are truly God's most amazing gift to me, and I am so grateful to spend the rest of forever with you. Your perfect smile and laugh, your beautiful golden eyes and perfect body, your gorgeous and warming personality filled with nothing but compassion ... your everything is MY everything. You give me so, SO much purpose and inspiration to keep on working my hardest to be better every single day. There is nothing more perfect than, even if they tickle me like crazy, feeling your tummy kisses every morning and cuddling up with you while we laugh at dumb reels you sent me earlier in the day. You are the most wonderful and amazing person I've met in my entire life, and I promise to always keep each and every single promise written on this site. You will always be my little bunny chop, stawberry, bella, and I will always be your snoopy, dravie, and bootyballs. I love you, my princesa. - Your Snoopy"
          }
          onChange={(e) => setLetter(e.target.value)}
          className="w-full h-64 p-6 rounded-xl promise-card focus:outline-none focus:ring-2 focus:ring-pink-300 love-letter"
          placeholder="Write your love letter here..."
        />
      ) : (
        <div className="w-full p-6 rounded-xl promise-card love-letter whitespace-pre-line">
          {letter}
        </div>
      )}
    </div>
  );
};
