
import { useState, useEffect } from 'react';
import { useGameStore } from './store/useGameStore';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { DrinkMaker } from './game/DrinkMaker';
import { DecorShop, decorItems } from './game/DecorShop';
import { Bookstore } from './game/Bookstore';
import { recipes } from './game/recipes';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { cafeName, setCafeName, money, reputation, placedDecor, unlockedItems } = useGameStore();
  const [inputName, setInputName] = useState('');
  const [isDrinkMakerOpen, setIsDrinkMakerOpen] = useState(false);
  const [isDecorShopOpen, setIsDecorShopOpen] = useState(false);
  const [isBookstoreOpen, setIsBookstoreOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  // Simulate customer arrival
  useEffect(() => {
    if (!cafeName || currentCustomer || isDrinkMakerOpen || isDecorShopOpen || isBookstoreOpen) return;

    const timer = setTimeout(() => {
      if (Math.random() > 0.3) { // 70% chance
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        setCurrentCustomer({
          id: randomRecipe.id,
          name: `Customer wants ${randomRecipe.name} `,
          recipe: randomRecipe
        });
      }
    }, 5000); // Check every 5 seconds

    return () => clearTimeout(timer);
  }, [cafeName, currentCustomer, isDrinkMakerOpen, isDecorShopOpen, isBookstoreOpen]);

  const handleStart = () => {
    if (inputName.trim()) {
      setCafeName(inputName);
    }
  };

  const handleDrinkComplete = (success) => {
    setIsDrinkMakerOpen(false);
    if (success) {
      setCurrentCustomer(null); // Customer leaves happy
    }
    // If failed, customer might stay or leave? Let's say they leave for now.
    if (!success) {
      setCurrentCustomer(null);
    }
  };

  if (!cafeName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cafe-pink p-4 font-sans">
        <Card className="max-w-md w-full text-center space-y-6">
          <h1 className="text-3xl font-bold text-cafe-rose font-serif">Welcome to Your Dream Café</h1>
          <p className="text-cafe-brown">What would you like to name your special place?</p>
          <input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border-2 border-rose-200 focus:border-cafe-rose outline-none text-center text-lg bg-cafe-cream text-cafe-brown placeholder-rose-300"
            placeholder="e.g. Chai & Chapters"
          />
          <Button onClick={handleStart} disabled={!inputName.trim()} className="w-full">
            Open Café
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cafe-pink p-8 font-sans relative overflow-hidden">
      <header className="flex justify-between items-center mb-8 relative z-10">
        <h1 className="text-2xl font-bold text-cafe-rose font-serif">{cafeName}</h1>
        <div className="flex gap-4">
          <span className="bg-white px-4 py-1 rounded-full shadow text-cafe-brown font-bold border border-rose-100">
            💰 {money}
          </span>
          <span className="bg-white px-4 py-1 rounded-full shadow text-cafe-brown font-bold border border-rose-100">
            ⭐ {reputation}
          </span>
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        <div className="md:col-span-2 space-y-8">
          <Card className="h-96 flex items-center justify-center bg-cafe-cream border-2 border-dashed border-rose-200 relative overflow-hidden">
            <p className="text-gray-400 absolute top-4 left-4">Café Interior</p>

            {/* Placed Decor */}
            {unlockedItems.map((itemId, index) => {
              const item = decorItems.find(i => i.id === itemId);
              if (!item) return null;
              // Simple random positioning for demo, or just list them at bottom
              return (
                <motion.div
                  key={itemId}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute text-4xl"
                  style={{
                    bottom: '20px',
                    left: `${20 + (index * 15)}% `,
                    zIndex: 1
                  }}
                  title={item.name}
                >
                  {item.icon}
                </motion.div>
              );
            })}

            {/* Customer Display */}
            <AnimatePresence>
              {currentCustomer && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="absolute bottom-10 flex flex-col items-center cursor-pointer z-10"
                  style={{ left: '50%', transform: 'translateX(-50%)' }}
                  onClick={() => setIsDrinkMakerOpen(true)}
                >
                  <div className="w-24 h-40 bg-cafe-rose/20 rounded-t-full rounded-b-lg border-2 border-cafe-rose mb-2 flex items-center justify-center">
                    Customer
                  </div>
                  <div className="bg-white px-3 py-1 rounded-full shadow text-sm border border-rose-100 animate-bounce">
                    Order: {currentCustomer.recipe.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!currentCustomer && (
              <p className="text-gray-400 italic">Waiting for customers...</p>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h2 className="text-xl font-bold text-cafe-brown mb-4 font-serif">Actions</h2>
            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={() => setIsDrinkMakerOpen(true)}
                disabled={!currentCustomer}
              >
                Make Drink {currentCustomer && '(!)'}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsDecorShopOpen(true)}
              >
                Decor Shop
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => setIsBookstoreOpen(true)}
              >
                Bookstore Corner
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <AnimatePresence>
        {isDrinkMakerOpen && currentCustomer && (
          <DrinkMaker
            customerOrder={currentCustomer.recipe}
            onClose={handleDrinkComplete}
          />
        )}
        {isDecorShopOpen && (
          <DecorShop onClose={() => setIsDecorShopOpen(false)} />
        )}
        {isBookstoreOpen && (
          <Bookstore onClose={() => setIsBookstoreOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
