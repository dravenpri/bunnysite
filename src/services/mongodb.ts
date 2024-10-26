import axios from 'axios';

// Replace these with your MongoDB Data API values
const API_URL = 'YOUR_MONGODB_DATA_API_URL';
const API_KEY = 'YOUR_API_KEY';
const DATABASE = 'promises';
const COLLECTION = 'promises';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'api-key': API_KEY,
  },
});

export interface Promise {
  _id?: string;
  text: string;
  isPermanent: boolean;
  createdAt: Date;
}

export const fetchPromises = async (): Promise<Promise[]> => {
  try {
    const response = await api.post('/action/find', {
      database: DATABASE,
      collection: COLLECTION,
      sort: { createdAt: 1 }
    });
    return response.data.documents;
  } catch (error) {
    console.error('Error fetching promises:', error);
    return [];
  }
};

export const addPromise = async (text: string, isPermanent: boolean = false): Promise<Promise | null> => {
  try {
    const promise = {
      text,
      isPermanent,
      createdAt: new Date(),
    };
    
    const response = await api.post('/action/insertOne', {
      database: DATABASE,
      collection: COLLECTION,
      document: promise,
    });
    
    return response.data.insertedId ? { ...promise, _id: response.data.insertedId } : null;
  } catch (error) {
    console.error('Error adding promise:', error);
    return null;
  }
};

export const deletePromise = async (id: string): Promise<boolean> => {
  try {
    const response = await api.post('/action/deleteOne', {
      database: DATABASE,
      collection: COLLECTION,
      filter: { _id: { $oid: id } },
    });
    
    return response.data.deletedCount === 1;
  } catch (error) {
    console.error('Error deleting promise:', error);
    return false;
  }
};