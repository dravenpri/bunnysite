import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { IntroModal } from './components/IntroModal';
import { PromiseList } from './components/PromiseList';
import { AddPromise } from './components/AddPromise';
import { LoveLetter } from './components/LoveLetter';
import { initializeDatabase, fetchPromises, addPromise, deletePromise, type Promise } from './services/db';

const INITIAL_PROMISES = [
  "I promise always to be, completely and in every way, your Dravie forever",
  "I promise always to be honest to you, keeping every promise and not telling any lies",
  "I promise always to be by your side and to never abandon you, supporting you in every single way through everything",
  "I promise always to love you unconditionally, no matter the circumstances",
  "I promise always to try my best to make you the happiest bunny in the world, taking care of you as much as I can <3"
];

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [promises, setPromises] = useState<Promise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setup = async () => {
      await initializeDatabase();
      const existingPromises = await fetchPromises();
      
      if (existingPromises.length === 0) {
        for (const text of INITIAL_PROMISES) {
          await addPromise(text, true);
        }
        const initialPromises = await fetchPromises();
        setPromises(initialPromises);
      } else {
        setPromises(existingPromises);
      }
      setLoading(false);
    };
    
    setup();
  }, []);

  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  const handleAddPromise = async (text: string) => {
    const newPromise = await addPromise(text);
    if (newPromise) {
      const updatedPromises = await fetchPromises();
      setPromises(updatedPromises);
    }
  };

  const handleDeletePromise = async (id: string) => {
    const success = await deletePromise(id);
    if (success) {
      const updatedPromises = await fetchPromises();
      setPromises(updatedPromises);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      {showIntro && <IntroModal onClose={handleCloseIntro} />}
      
      <div className="max-w-3xl mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Dravie's Promises to Damaris</h1>
          <p className="text-xl text-gray-600 font-light">❤️ Bear and Bunny Forever and Always ❤️</p>
        </header>

        <div className="space-y-12">
          <AddPromise onAdd={handleAddPromise} />
          <PromiseList promises={promises} onDelete={handleDeletePromise} />
          <LoveLetter />
        </div>
      </div>
    </div>
  );
}

export default App;