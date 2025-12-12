import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Calculate XP needed for next level
const getXPForLevel = (level) => Math.floor(100 * Math.pow(1.5, level - 1));

export const useGameStore = create(
    persist(
        (set, get) => ({
            // Basic Stats
            cafeName: '',
            money: 100,
            reputation: 0,
            
            // RPG Player Stats
            player: {
                level: 1,
                xp: 0,
                maxXP: 100,
                hp: 100,
                maxHP: 100,
                stamina: 100,
                maxStamina: 100,
                skillPoints: 0,
            },
            
            // Skills Tree
            skills: {
                brewing: 1,      // Increases drink quality and speed
                service: 1,      // Increases customer satisfaction
                efficiency: 1,   // Reduces ingredient usage
                charisma: 1,     // Increases tips and reputation
                management: 1,   // Unlocks new features
            },
            
            // Equipment/Upgrades
            equipment: {
                coffeeMachine: 'basic',      // basic, premium, professional
                blender: 'none',              // none, basic, premium
                teaSet: 'basic',              // basic, premium, ceremonial
                storage: 'small',             // small, medium, large
                decor: 'minimal',             // minimal, cozy, luxurious
            },
            
            // Quest System
            quests: {
                active: [],
                completed: [],
                daily: [],
            },
            
            // Inventory
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
            
            // Game Stats
            stats: {
                drinksServed: 0,
                perfectDrinks: 0,
                customersServed: 0,
                totalEarnings: 0,
                playTime: 0,
            },

            // Actions
            setCafeName: (name) => set({ cafeName: name }),
            addMoney: (amount) => set((state) => ({ 
                money: state.money + amount,
                stats: { ...state.stats, totalEarnings: state.stats.totalEarnings + amount }
            })),
            spendMoney: (amount) => set((state) => ({ money: state.money - amount })),
            addReputation: (amount) => set((state) => ({ reputation: state.reputation + amount })),
            unlockItem: (itemId) => set((state) => ({ unlockedItems: [...state.unlockedItems, itemId] })),
            placeDecor: (item) => set((state) => ({ placedDecor: [...state.placedDecor, item] })),
            addBook: (book) => set((state) => ({ books: [...state.books, book] })),
            
            // RPG Actions
            addXP: (amount) => {
                const state = get();
                let newXP = state.player.xp + amount;
                let newLevel = state.player.level;
                let newSkillPoints = state.player.skillPoints;
                
                // Level up check
                while (newXP >= state.player.maxXP) {
                    newXP -= state.player.maxXP;
                    newLevel += 1;
                    newSkillPoints += 1;
                    // Increase max HP and Stamina on level up
                    const hpIncrease = 10;
                    const staminaIncrease = 5;
                    set({
                        player: {
                            ...state.player,
                            level: newLevel,
                            xp: newXP,
                            maxXP: getXPForLevel(newLevel + 1),
                            maxHP: state.player.maxHP + hpIncrease,
                            hp: Math.min(state.player.hp + hpIncrease, state.player.maxHP + hpIncrease),
                            maxStamina: state.player.maxStamina + staminaIncrease,
                            stamina: Math.min(state.player.stamina + staminaIncrease, state.player.maxStamina + staminaIncrease),
                            skillPoints: newSkillPoints,
                        }
                    });
                    return;
                }
                
                set({
                    player: {
                        ...state.player,
                        xp: newXP,
                    }
                });
            },
            
            useStamina: (amount) => set((state) => ({
                player: {
                    ...state.player,
                    stamina: Math.max(0, state.player.stamina - amount)
                }
            })),
            
            restoreStamina: (amount) => set((state) => ({
                player: {
                    ...state.player,
                    stamina: Math.min(state.player.maxStamina, state.player.stamina + amount)
                }
            })),
            
            upgradeSkill: (skillName) => {
                const state = get();
                if (state.player.skillPoints > 0 && state.skills[skillName] < 10) {
                    set({
                        player: {
                            ...state.player,
                            skillPoints: state.player.skillPoints - 1
                        },
                        skills: {
                            ...state.skills,
                            [skillName]: state.skills[skillName] + 1
                        }
                    });
                }
            },
            
            upgradeEquipment: (equipmentType, newLevel) => {
                const state = get();
                set({
                    equipment: {
                        ...state.equipment,
                        [equipmentType]: newLevel
                    }
                });
            },
            
            addQuest: (quest) => set((state) => {
                if (quest.type === 'daily') {
                    return {
                        quests: {
                            ...state.quests,
                            daily: [...state.quests.daily, quest]
                        }
                    };
                }
                return {
                    quests: {
                        ...state.quests,
                        active: [...state.quests.active, quest]
                    }
                };
            }),
            
            completeQuest: (questId) => {
                const state = get();
                const quest = state.quests.active.find(q => q.id === questId);
                if (quest) {
                    set({
                        quests: {
                            ...state.quests,
                            active: state.quests.active.filter(q => q.id !== questId),
                            completed: [...state.quests.completed, quest]
                        },
                        money: state.money + (quest.reward?.money || 0),
                        player: {
                            ...state.player,
                            xp: state.player.xp + (quest.reward?.xp || 0)
                        }
                    });
                }
            },
            
            updateStats: (statUpdates) => set((state) => ({
                stats: {
                    ...state.stats,
                    ...statUpdates
                }
            })),
        }),
        {
            name: 'cafe-storage',
        }
    )
);
