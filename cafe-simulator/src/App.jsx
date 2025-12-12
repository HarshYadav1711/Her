
import { useState, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { useGameStore } from './store/useGameStore';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { ThemeToggle } from './components/ThemeToggle';
import { DrinkMaker } from './game/DrinkMaker';
import { DecorShop } from './game/DecorShop';
import { decorItems } from './game/data';
import { Bookstore } from './game/Bookstore';
import { recipes } from './game/recipes';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const { cafeName, setCafeName, money, reputation, unlockedItems } = useGameStore();
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
      <div className="min-h-screen flex items-center justify-center p-4 font-sans perspective-3d">
        <Card className="max-w-md w-full text-center space-y-8 p-10 backdrop-blur-xl">
          <motion.div 
            className="text-6xl mb-4 drink-cup-3d"
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity }
            }}
          >
            ☕
          </motion.div>
          <h1 className="text-3xl font-bold text-cafe-rose font-serif layer-2">Welcome to Your Dream Café</h1>
          <p className="text-cafe-brown">What would you like to name your special place?</p>
          <motion.input
            type="text"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full px-6 py-3 rounded-full border-2 border-rose-200 focus:border-cafe-rose outline-none text-center text-xl bg-white/50 text-cafe-brown placeholder-rose-300 transition-all focus:shadow-lg element-3d"
            placeholder="e.g. Chai & Chapters"
            whileFocus={{ scale: 1.05, translateZ: 10 }}
            onKeyPress={(e) => e.key === 'Enter' && inputName.trim() && handleStart()}
          />
          <Button onClick={handleStart} disabled={!inputName.trim()} className="w-full">
            Open Café
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 font-sans relative overflow-hidden">
      <header className="flex justify-between items-center mb-12 sticky top-4 z-50 glass-panel px-8 py-4 rounded-full max-w-5xl mx-auto card-3d">
        <h1 className="text-2xl font-bold text-cafe-rose font-serif layer-2">{cafeName}</h1>
        <div className="flex gap-4">
          <motion.span 
            className="bg-white px-4 py-2 rounded-full shadow-lg text-cafe-brown font-bold border-2 border-rose-100 button-3d"
            whileHover={{ scale: 1.05, translateZ: 10 }}
          >
            💰 {money}
          </motion.span>
          <motion.span 
            className="bg-white px-4 py-2 rounded-full shadow-lg text-cafe-brown font-bold border-2 border-rose-100 button-3d"
            whileHover={{ scale: 1.05, translateZ: 10 }}
          >
            ⭐ {reputation}
          </motion.span>
          <ThemeToggle />
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 perspective-3d">
        <div className="md:col-span-2 space-y-8">
          <Card className="h-[500px] flex items-center justify-center bg-gradient-to-b from-cafe-cream to-rose-50 border-none relative overflow-hidden shadow-2xl group scene-3d">
            {/* 3D Background Layers */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cafe-rose to-transparent layer-1" />
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/10 to-transparent pointer-events-none floor-3d" />
            
            {/* 3D Wall Pattern */}
            <div className="absolute inset-0 opacity-5 layer-1" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(225, 29, 72, 0.1) 10px, rgba(225, 29, 72, 0.1) 20px)',
              transform: 'translateZ(-50px)'
            }} />
            
            <p className="text-cafe-brown/30 absolute top-4 left-4 font-serif italic layer-2 z-10">Café Interior</p>

            {/* Placed Decor with 3D Effect */}
            {unlockedItems.map((itemId, index) => {
              const item = decorItems.find(i => i.id === itemId);
              if (!item) return null;
              return (
                <motion.div
                  key={itemId}
                  initial={{ scale: 0, rotateY: -180 }}
                  animate={{ scale: 1, rotateY: 0 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute text-4xl decor-3d layer-3"
                  style={{
                    bottom: '20px',
                    left: `${20 + (index * 15)}% `,
                    zIndex: 2,
                    transform: 'translateZ(30px)'
                  }}
                  title={item.name}
                >
                  {item.icon}
                </motion.div>
              );
            })}

            {/* Customer Display with 3D Effect */}
            <AnimatePresence>
              {currentCustomer && (
                <motion.div
                  initial={{ x: -100, opacity: 0, rotateY: -90 }}
                  animate={{ x: 0, opacity: 1, rotateY: 0 }}
                  exit={{ x: 100, opacity: 0, rotateY: 90 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="absolute bottom-10 flex flex-col items-center cursor-pointer z-10 customer-3d layer-4"
                  style={{ left: '50%', transform: 'translateX(-50%) translateZ(50px)' }}
                  onClick={() => setIsDrinkMakerOpen(true)}
                >
                  <motion.div 
                    className="w-24 h-40 bg-gradient-to-b from-cafe-rose/30 to-cafe-rose/10 rounded-t-full rounded-b-lg border-2 border-cafe-rose mb-2 flex items-center justify-center shadow-lg element-3d"
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                  >
                    <span className="text-2xl">👤</span>
                  </motion.div>
                  <motion.div 
                    className="bg-white px-4 py-2 rounded-full shadow-lg text-sm border-2 border-rose-200 font-bold button-3d"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Order: {currentCustomer.recipe.name}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {!currentCustomer && (
              <motion.p 
                className="text-gray-400 italic layer-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Waiting for customers...
              </motion.p>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="card-3d">
            <h2 className="text-xl font-bold text-cafe-brown mb-4 font-serif layer-2">Actions</h2>
            <div className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-start button-3d"
                onClick={() => setIsDrinkMakerOpen(true)}
                disabled={!currentCustomer}
              >
                Make Drink {currentCustomer && '(!)'}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start button-3d"
                onClick={() => setIsDecorShopOpen(true)}
              >
                Decor Shop
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start button-3d"
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
