import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
    persist(
        (set) => ({
            cafeName: '',
            money: 100,
            reputation: 0,
            inventory: {
                coffee: 10,
                milk: 10,
                sugar: 10,
                lemon: 10,
                ice: 10,
                roseSyrup: 5,
                cardamom: 5,
            },
            unlockedItems: [],
            placedDecor: [],
            books: [],

            setCafeName: (name) => set({ cafeName: name }),
            addMoney: (amount) => set((state) => ({ money: state.money + amount })),
            spendMoney: (amount) => set((state) => ({ money: state.money - amount })),
            addReputation: (amount) => set((state) => ({ reputation: state.reputation + amount })),
            unlockItem: (itemId) => set((state) => ({ unlockedItems: [...state.unlockedItems, itemId] })),
            placeDecor: (item) => set((state) => ({ placedDecor: [...state.placedDecor, item] })),
            addBook: (book) => set((state) => ({ books: [...state.books, book] })),
        }),
        {
            name: 'cafe-storage',
        }
    )
);
