import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { X } from 'lucide-react';
import { decorItems } from './data';

export function DecorShop({ onClose }) {
    const { money, unlockedItems, spendMoney, unlockItem } = useGameStore();

    const handleBuy = (item) => {
        if (money >= item.price && !unlockedItems.includes(item.id)) {
            spendMoney(item.price);
            unlockItem(item.id);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-3d">
            <Card className="w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 button-3d">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-cafe-rose mb-6 font-serif text-center layer-2">Decor Shop</h2>
                <motion.p 
                    className="text-center text-cafe-brown mb-4 font-bold text-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Balance: ${money}
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {decorItems.map((item) => {
                        const isOwned = unlockedItems.includes(item.id);
                        return (
                            <motion.div 
                                key={item.id} 
                                className="border border-white/40 p-4 rounded-xl flex items-center justify-between bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-colors shadow-sm decor-3d"
                                whileHover={{ scale: 1.02, translateZ: 15 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <div className="flex items-center gap-3">
                                    <motion.span 
                                        className="text-3xl"
                                        animate={isOwned ? { rotate: [0, 10, -10, 0] } : {}}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                    >
                                        {item.icon}
                                    </motion.span>
                                    <div>
                                        <h3 className="font-bold text-cafe-brown">{item.name}</h3>
                                        <p className="text-sm text-gray-500">Price: ${item.price}</p>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => handleBuy(item)}
                                    disabled={isOwned || money < item.price}
                                    variant={isOwned ? "outline" : "primary"}
                                    className="px-4 py-1 text-sm"
                                >
                                    {isOwned ? "✓ Owned" : "Buy"}
                                </Button>
                            </motion.div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
