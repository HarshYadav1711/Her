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

    // Group ingredients by category
    const ingredientsByCategory = ingredientsList.reduce((acc, ing) => {
        const category = ing.category || 'other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(ing);
        return acc;
    }, {});

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-3d">
            <Card className="w-full max-w-5xl relative max-h-[90vh] overflow-y-auto card-3d">
                <button 
                    onClick={() => onClose(false)} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 button-3d"
                >
                    <X size={24} />
                </button>

                <h2 className="text-3xl font-bold text-cafe-rose mb-2 font-serif text-center drop-shadow-sm layer-2">Drink Station</h2>
                <p className="text-center text-cafe-brown mb-6 text-lg">
                    Order: <span className="font-bold text-xl text-cafe-rose">{customerOrder.name}</span>
                </p>
                {customerOrder.description && (
                    <p className="text-center text-gray-500 text-sm italic mb-6">{customerOrder.description}</p>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Ingredients Panel */}
                    <div className="flex-1 bg-white/30 p-4 rounded-2xl border border-white/40 backdrop-blur-sm scene-3d">
                        <h3 className="font-bold text-cafe-brown mb-4 text-lg layer-2">Ingredients</h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
                                <div key={category} className="space-y-2">
                                    <h4 className="text-xs font-semibold text-cafe-rose uppercase tracking-wide">
                                        {category}
                                    </h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {ingredients.map((ing) => (
                                            <motion.button
                                                key={ing.id}
                                                whileHover={{ scale: 1.1, translateZ: 15 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleAddIngredient(ing.id)}
                                                className="bg-white/60 p-2 rounded-xl border border-white/50 flex flex-col items-center gap-1 hover:bg-white hover:shadow-lg transition-all shadow-sm ingredient-3d"
                                                disabled={!!result}
                                            >
                                                <span className="text-xl">{ing.icon}</span>
                                                <span className="text-xs font-medium text-cafe-brown text-center leading-tight">
                                                    {ing.name}
                                                </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mixing Area */}
                    <div className="flex-1 bg-gradient-to-b from-cafe-pink/30 to-rose-50/30 rounded-2xl p-6 flex flex-col items-center justify-between border border-white/40 backdrop-blur-sm shadow-inner scene-3d">
                        <div className="w-full">
                            <h3 className="font-bold text-cafe-brown mb-4 text-center layer-2">Mixing Cup</h3>
                            
                            {/* 3D Drink Cup Visual */}
                            <div className="relative mb-4 flex justify-center">
                                <motion.div
                                    className="drink-cup-3d w-24 h-32 bg-gradient-to-b from-amber-200 to-amber-400 rounded-t-full rounded-b-lg border-4 border-amber-600 shadow-xl"
                                    animate={selectedIngredients.length > 0 ? {
                                        rotateY: [0, 360],
                                        scale: [1, 1.1, 1]
                                    } : {}}
                                    transition={{ duration: 2, repeat: selectedIngredients.length > 0 ? Infinity : 0 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-t-full" />
                                </motion.div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 justify-center min-h-[80px] p-4 bg-white/20 rounded-xl border border-white/30">
                                <AnimatePresence mode="popLayout">
                                    {selectedIngredients.map((ingId, idx) => {
                                        const ing = ingredientsList.find(i => i.id === ingId);
                                        return (
                                            <motion.div
                                                key={`${ingId}-${idx}`}
                                                initial={{ scale: 0, opacity: 0, rotateY: -90 }}
                                                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                                exit={{ scale: 0, opacity: 0, rotateY: 90 }}
                                                layout
                                                className="bg-white px-3 py-1.5 rounded-full shadow-md text-sm border-2 border-rose-200 flex items-center gap-1.5 element-3d"
                                            >
                                                <span className="text-base">{ing?.icon}</span>
                                                <span className="font-medium text-cafe-brown">{ing?.name}</span>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                                {selectedIngredients.length === 0 && (
                                    <motion.p 
                                        className="text-gray-400 text-sm italic mt-4"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        Tap ingredients to add...
                                    </motion.p>
                                )}
                            </div>
                        </div>

                        <div className="w-full space-y-3 mt-4">
                            {result === 'success' && (
                                <motion.div 
                                    initial={{ scale: 0, rotateY: -180 }} 
                                    animate={{ scale: 1, rotateY: 0 }}
                                    className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 p-3 rounded-xl text-center font-bold border-2 border-green-300 shadow-lg element-3d"
                                >
                                    ✨ Perfect! +${recipes.find(r => r.id === customerOrder.id)?.price} & +5 Reputation
                                </motion.div>
                            )}
                            {result === 'failure' && (
                                <motion.div 
                                    initial={{ scale: 0, rotateX: -180 }} 
                                    animate={{ scale: 1, rotateX: 0 }}
                                    className="bg-gradient-to-r from-red-100 to-rose-100 text-red-800 p-3 rounded-xl text-center font-bold border-2 border-red-300 shadow-lg element-3d"
                                >
                                    ❌ Oops! Wrong recipe. Try again!
                                </motion.div>
                            )}

                            <div className="flex gap-3">
                                <Button 
                                    variant="outline" 
                                    onClick={handleClear} 
                                    className="flex-1 button-3d" 
                                    disabled={!!result || selectedIngredients.length === 0}
                                >
                                    Clear
                                </Button>
                                <Button 
                                    onClick={handleServe} 
                                    className="flex-1 button-3d" 
                                    disabled={selectedIngredients.length === 0 || !!result}
                                >
                                    🎯 Serve Drink
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
