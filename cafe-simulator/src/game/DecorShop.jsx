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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-cafe-rose mb-6 font-serif text-center">Decor Shop</h2>
                <p className="text-center text-cafe-brown mb-4">Balance: ${money}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {decorItems.map((item) => {
                        const isOwned = unlockedItems.includes(item.id);
                        return (
                            <div key={item.id} className="border border-rose-100 p-4 rounded-xl flex items-center justify-between bg-cafe-cream">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{item.icon}</span>
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
                                    {isOwned ? "Owned" : "Buy"}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}
