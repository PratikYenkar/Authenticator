import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedWebsite, SavedNote } from '../types';
import uuid from 'react-native-uuid';

interface PasswordState {
  websites: SavedWebsite[];
  notes: SavedNote[];
  addWebsite: (data: Omit<SavedWebsite, 'id' | 'createdAt'>) => void;
  addNote: (data: Omit<SavedNote, 'id' | 'createdAt'>) => void;
  removeWebsite: (id: string) => void;
  removeNote: (id: string) => void;
}

export const usePasswordStore = create<PasswordState>()(
  persist(
    set => ({
      websites: [],
      notes: [],

      addWebsite: data =>
        set(state => ({
          websites: [
            ...state.websites,
            { ...data, id: uuid.v4() as string, createdAt: Date.now() },
          ],
        })),

      addNote: data =>
        set(state => ({
          notes: [
            ...state.notes,
            { ...data, id: uuid.v4() as string, createdAt: Date.now() },
          ],
        })),

      removeWebsite: id =>
        set(state => ({ websites: state.websites.filter(w => w.id !== id) })),

      removeNote: id =>
        set(state => ({ notes: state.notes.filter(n => n.id !== id) })),
    }),
    {
      name: 'password_store_v1',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
