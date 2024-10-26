import { neon } from '@neondatabase/serverless';

const DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('Database connection string not found! Please set VITE_DATABASE_URL environment variable.');
}

const sql = neon(DATABASE_URL);

export interface Promise {
  id?: string;
  text: string;
  is_permanent: boolean;
  created_at: Date;
}

export interface LoveLetter {
  id: string;
  content: string;
  updated_at: Date;
}

export const initializeDatabase = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS promises (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        text TEXT NOT NULL,
        is_permanent BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS love_letter (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content TEXT NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Check if love letter exists, if not create default
    const [letter] = await sql<LoveLetter[]>`
      SELECT * FROM love_letter LIMIT 1;
    `;

    if (!letter) {
      await sql`
        INSERT INTO love_letter (content)
        VALUES (${'My little strawberry,\nYou are truly God\'s most amazing gift to me, and I am so grateful to spend the rest of forever with you. Your perfect smile and laugh, your beautiful golden eyes and perfect body, your gorgeous and warming personality filled with nothing but compassion ... your everything is MY everything. You give me so, SO much purpose and inspiration to keep on working my hardest to be better every single day. There is nothing more perfect than, even if they tickle me like crazy, feeling your tummy kisses every morning and cuddling up with you while we laugh at dumb reels you sent me earlier in the day. You are the most wonderful and amazing person I\'ve met in my entire life, and I promise to always keep each and every single promise written on this site. You will always be my little bunny chop, stawberry, bella, and I will always be your snoopy, dravie, and bootyballs. I love you, my princesa. - Your Snoopy'});
      `;
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const fetchPromises = async (): Promise<Promise[]> => {
  try {
    const promises = await sql<Promise[]>`
      SELECT * FROM promises 
      ORDER BY is_permanent DESC, created_at ASC;
    `;
    return promises;
  } catch (error) {
    console.error('Error fetching promises:', error);
    return [];
  }
};

export const addPromise = async (text: string, isPermanent: boolean = false): Promise<Promise | null> => {
  try {
    const [promise] = await sql<Promise[]>`
      INSERT INTO promises (text, is_permanent)
      VALUES (${text}, ${isPermanent})
      RETURNING *;
    `;
    return promise;
  } catch (error) {
    console.error('Error adding promise:', error);
    return null;
  }
};

export const deletePromise = async (id: string): Promise<boolean> => {
  try {
    const result = await sql`
      DELETE FROM promises 
      WHERE id = ${id} AND is_permanent = false;
    `;
    return result.count > 0;
  } catch (error) {
    console.error('Error deleting promise:', error);
    return false;
  }
};

export const fetchLoveLetter = async (): Promise<string> => {
  try {
    const [letter] = await sql<LoveLetter[]>`
      SELECT content FROM love_letter 
      ORDER BY updated_at DESC 
      LIMIT 1;
    `;
    return letter?.content || '';
  } catch (error) {
    console.error('Error fetching love letter:', error);
    return '';
  }
};

export const updateLoveLetter = async (content: string): Promise<boolean> => {
  try {
    await sql`
      UPDATE love_letter 
      SET content = ${content}, 
          updated_at = CURRENT_TIMESTAMP;
    `;
    return true;
  } catch (error) {
    console.error('Error updating love letter:', error);
    return false;
  }
};