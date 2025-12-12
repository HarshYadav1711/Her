import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
    persist(
        (set) => ({
            cafeName: '',
            money: 100,
            reputation: 0,
            inventory: {
                // Bases
                coffee: 10,
                blackTea: 10,
                greenTea: 10,
                matcha: 5,
                water: 20,
                // Dairy
                milk: 10,
                foam: 5,
                yogurt: 5,
                whippedCream: 5,
                // Sweeteners
                sugar: 10,
                honey: 5,
                // Flavors
                vanilla: 5,
                chocolate: 5,
                roseSyrup: 5,
                caramel: 5,
                // Spices
                cardamom: 5,
                cinnamon: 5,
                turmeric: 3,
                jasmine: 3,
                // Fruits & Additions
                lemon: 10,
                berries: 5,
                ice: 15,
                tapioca: 3,
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
