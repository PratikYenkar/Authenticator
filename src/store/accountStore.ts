import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Account, DeletedAccount } from '../types';
import { keychainStorage } from '../utils/storage';
import { getServiceColor } from '../utils/serviceLogos';
import uuid from 'react-native-uuid';

interface AccountState {
  accounts: Account[];
  recentlyDeleted: DeletedAccount[];
  addAccount: (account: Omit<Account, 'id' | 'createdAt' | 'logoColor'>) => void;
  removeAccount: (id: string) => void;
  updateAccount: (id: string, data: Partial<Account>) => void;
  restoreAccount: (id: string) => void;
  permanentDelete: (id: string) => void;
  importAccounts: (accounts: Account[]) => void;
  clearAll: () => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      accounts: [],
      recentlyDeleted: [],

      addAccount: data => {
        const newAccount: Account = {
          ...data,
          id: uuid.v4() as string,
          createdAt: Date.now(),
          logoColor: getServiceColor(data.issuer),
        };
        set(state => ({ accounts: [...state.accounts, newAccount] }));
      },

      removeAccount: id => {
        const account = get().accounts.find(a => a.id === id);
        if (account) {
          set(state => ({
            accounts: state.accounts.filter(a => a.id !== id),
            recentlyDeleted: [
              ...state.recentlyDeleted,
              { ...account, deletedAt: Date.now() },
            ],
          }));
        }
      },

      updateAccount: (id, data) => {
        set(state => ({
          accounts: state.accounts.map(a =>
            a.id === id ? { ...a, ...data } : a,
          ),
        }));
      },

      restoreAccount: id => {
        const deleted = get().recentlyDeleted.find(a => a.id === id);
        if (deleted) {
          const { deletedAt, ...account } = deleted;
          set(state => ({
            accounts: [...state.accounts, account],
            recentlyDeleted: state.recentlyDeleted.filter(a => a.id !== id),
          }));
        }
      },

      permanentDelete: id => {
        set(state => ({
          recentlyDeleted: state.recentlyDeleted.filter(a => a.id !== id),
        }));
      },

      importAccounts: accounts => {
        set(state => ({
          accounts: [
            ...state.accounts,
            ...accounts.filter(
              na => !state.accounts.find(a => a.secret === na.secret),
            ),
          ],
        }));
      },

      clearAll: () => set({ accounts: [], recentlyDeleted: [] }),
    }),
    {
      name: 'totp_accounts_v1',
      storage: createJSONStorage(() => keychainStorage),
    },
  ),
);
