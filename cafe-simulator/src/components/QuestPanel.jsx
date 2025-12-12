import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Card } from './Card';
import { Button } from './Button';
import { X, CheckCircle, Clock } from 'lucide-react';
import { checkQuestProgress } from '../game/quests';

export function QuestPanel({ onClose }) {
    const { quests, completeQuest, stats, player } = useGameStore();
    const allQuests = [...quests.active, ...quests.daily];
    
    const handleComplete = (quest) => {
        if (checkQuestProgress(quest, { stats, player })) {
            completeQuest(quest.id);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-3d">
            <Card className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-purple-500/50">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white/70 hover:text-white z-10 button-3d"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-3xl font-bold text-purple-300 mb-6 font-serif text-center drop-shadow-lg">
                    📜 Quests
                </h2>
                
                {allQuests.length === 0 ? (
                    <p className="text-center text-white/50 italic py-8">No active quests. Check back later!</p>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {allQuests.map((quest) => {
                                const isComplete = checkQuestProgress(quest, { stats, player });
                                const isDaily = quest.type === 'daily';
                                
                                return (
                                    <motion.div
                                        key={quest.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`p-4 rounded-xl border-2 ${
                                            isComplete 
                                                ? 'bg-green-900/30 border-green-500/50' 
                                                : isDaily
                                                ? 'bg-blue-900/30 border-blue-500/50'
                                                : 'bg-purple-900/30 border-purple-500/50'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                {isDaily && <Clock size={16} className="text-blue-400" />}
                                                {isComplete && <CheckCircle size={16} className="text-green-400" />}
                                                <h3 className="text-lg font-bold text-white">{quest.title}</h3>
                                            </div>
                                            {isDaily && (
                                                <span className="text-xs text-blue-300 bg-blue-900/50 px-2 py-1 rounded">
                                                    DAILY
                                                </span>
                                            )}
                                        </div>
                                        
                                        <p className="text-white/70 text-sm mb-3">{quest.description}</p>
                                        
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-white/50">
                                                Objective: {JSON.stringify(quest.objective)}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {quest.reward.money > 0 && (
                                                    <span className="text-yellow-400 text-sm font-bold">
                                                        💰 +{quest.reward.money}
                                                    </span>
                                                )}
                                                {quest.reward.xp > 0 && (
                                                    <span className="text-orange-400 text-sm font-bold">
                                                        ⭐ +{quest.reward.xp} XP
                                                    </span>
                                                )}
                                                {quest.reward.skillPoints > 0 && (
                                                    <span className="text-purple-400 text-sm font-bold">
                                                        ✨ +{quest.reward.skillPoints} SP
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {isComplete && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="mt-3"
                                            >
                                                <Button
                                                    onClick={() => handleComplete(quest)}
                                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                                                >
                                                    ✓ Claim Reward
                                                </Button>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </Card>
        </div>
    );
}

