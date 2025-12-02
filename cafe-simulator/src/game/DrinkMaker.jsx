import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ingredientsList, recipes } from './recipes';
import { useGameStore } from '../store/useGameStore';
import { X } from 'lucide-react';

export function DrinkMaker({ onClose, customerOrder }) {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [result, setResult] = useState(null);
    const { addMoney, addReputation } = useGameStore();

    const handleAddIngredient = (id) => {
        if (result) return;
        setSelectedIngredients([...selectedIngredients, id]);
    };

    const handleServe = () => {
        // Basic recipe matching logic
        // Sort both arrays to ensure order doesn't matter
        const sortedSelected = [...selectedIngredients].sort();

        // Find matching recipe
        const match = recipes.find(recipe => {
            const sortedRecipe = [...recipe.ingredients].sort();
            return JSON.stringify(sortedRecipe) === JSON.stringify(sortedSelected);
        });

        if (match && match.id === customerOrder.id) {
            setResult('success');
            addMoney(match.price);
            addReputation(5);
        } else {
            setResult('failure');
        }

        // Auto close after delay
        setTimeout(() => {
            onClose(match && match.id === customerOrder.id);
        }, 2000);
    };

    const handleClear = () => {
        if (result) return;
        setSelectedIngredients([]);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl relative">
                <button onClick={() => onClose(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-cafe-rose mb-2 font-serif text-center drop-shadow-sm">Drink Station</h2>
                <p className="text-center text-cafe-brown mb-8 text-lg">Order: <span className="font-bold text-xl">{customerOrder.name}</span></p>

                <div className="flex gap-8">
                    {/* Ingredients Panel */}
                    <div className="flex-1 bg-white/30 p-4 rounded-2xl border border-white/40">
                        <h3 className="font-bold text-cafe-brown mb-4 text-lg">Ingredients</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {ingredientsList.map((ing) => (
                                <motion.button
                                    key={ing.id}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleAddIngredient(ing.id)}
                                    className="bg-white/60 p-3 rounded-xl border border-white/50 flex flex-col items-center gap-2 hover:bg-white hover:scale-105 transition-all shadow-sm"
                                    disabled={!!result}
                                >
                                    <span className="text-2xl">{ing.icon}</span>
                                    <span className="text-xs font-medium text-cafe-brown">{ing.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mixing Area */}
                    <div className="flex-1 bg-cafe-pink/20 rounded-2xl p-6 flex flex-col items-center justify-between border border-white/40 backdrop-blur-sm shadow-inner">
                        <div className="w-full">
                            <h3 className="font-bold text-cafe-brown mb-4 text-center">Mixing Cup</h3>
                            <div className="flex flex-wrap gap-2 justify-center min-h-[100px]">
                                <AnimatePresence>
                                    {selectedIngredients.map((ingId, idx) => {
                                        const ing = ingredientsList.find(i => i.id === ingId);
                                        return (
                                            <motion.div
                                                key={`${ingId}-${idx}`}
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="bg-white px-3 py-1 rounded-full shadow text-sm border border-rose-100 flex items-center gap-1"
                                            >
                                                <span>{ing?.icon}</span>
                                                <span>{ing?.name}</span>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                {selectedIngredients.length === 0 && (
                                    <p className="text-gray-400 text-sm italic mt-8">Tap ingredients to add...</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full space-y-2">
                            {result === 'success' && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-100 text-green-700 p-2 rounded text-center font-bold">
                                    Perfect! +${recipes.find(r => r.id === customerOrder.id)?.price}
                                </motion.div>
                            )}
                            {result === 'failure' && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-red-100 text-red-700 p-2 rounded text-center font-bold">
                                    Oops! Wrong recipe.
                                </motion.div>
                            )}

                            <div className="flex gap-2">
                                <Button variant="outline" onClick={handleClear} className="flex-1" disabled={!!result}>Clear</Button>
                                <Button onClick={handleServe} className="flex-1" disabled={selectedIngredients.length === 0 || !!result}>Serve</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
