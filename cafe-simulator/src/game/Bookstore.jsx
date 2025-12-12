import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { X, Book } from 'lucide-react';

export function Bookstore({ onClose }) {
    const { books, addBook } = useGameStore();
    const [newBookTitle, setNewBookTitle] = useState('');

    const handleAddBook = () => {
        if (newBookTitle.trim()) {
            addBook({ id: Date.now(), title: newBookTitle });
            setNewBookTitle('');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-3d">
            <Card className="w-full max-w-md relative max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 button-3d">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-cafe-rose mb-6 font-serif text-center layer-2">Bookstore Corner</h2>

                <div className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newBookTitle}
                            onChange={(e) => setNewBookTitle(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-full border-2 border-rose-200 focus:border-cafe-rose outline-none bg-white/50 focus:bg-white transition-all element-3d"
                            placeholder="Enter book title..."
                            onKeyPress={(e) => e.key === 'Enter' && handleAddBook()}
                        />
                        <Button onClick={handleAddBook} disabled={!newBookTitle.trim()}>Add</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    {books.length === 0 && (
                        <motion.p 
                            className="text-center text-gray-400 italic"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            No books yet.
                        </motion.p>
                    )}
                    <AnimatePresence>
                        {books.map((book) => (
                            <motion.div 
                                key={book.id} 
                                className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50 shadow-sm element-3d"
                                initial={{ opacity: 0, x: -20, rotateY: -90 }}
                                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                exit={{ opacity: 0, x: 20, rotateY: 90 }}
                                whileHover={{ scale: 1.02, translateZ: 15 }}
                                transition={{ type: "spring", stiffness: 100 }}
                            >
                                <Book size={20} className="text-cafe-rose" />
                                <span className="text-cafe-brown font-medium">{book.title}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </Card>
        </div>
    );
}
