import { useState } from 'react';
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md relative max-h-[80vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-cafe-rose mb-6 font-serif text-center">Bookstore Corner</h2>

                <div className="mb-6">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newBookTitle}
                            onChange={(e) => setNewBookTitle(e.target.value)}
                            className="flex-1 px-4 py-2 rounded-full border border-rose-200 focus:border-cafe-rose outline-none bg-white/50"
                            placeholder="Enter book title..."
                        />
                        <Button onClick={handleAddBook} disabled={!newBookTitle.trim()}>Add</Button>
                    </div>
                </div>

                <div className="space-y-2">
                    {books.length === 0 && <p className="text-center text-gray-400 italic">No books yet.</p>}
                    {books.map((book) => (
                        <div key={book.id} className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-white/50 shadow-sm hover:scale-[1.02] transition-transform">
                            <Book size={20} className="text-cafe-rose" />
                            <span className="text-cafe-brown font-medium">{book.title}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
