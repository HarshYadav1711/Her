import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { StatBar } from './StatBar';
import { Card } from './Card';
import { X } from 'lucide-react';

export function PlayerStats({ onClose }) {
    const { player, skills, stats } = useGameStore();
    const xpPercentage = (player.xp / player.maxXP) * 100;
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-3d">
            <Card className="w-full max-w-2xl relative max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-amber-500/50">
                {onClose && (
                    <button 
                        onClick={onClose} 
                        className="absolute top-4 right-4 text-white/70 hover:text-white z-10 button-3d"
                    >
                        <X size={24} />
                    </button>
                )}
                
                <h2 className="text-3xl font-bold text-amber-400 mb-6 font-serif text-center drop-shadow-lg">
                    ⚔️ Player Stats
                </h2>
                
                {/* Level and XP */}
                <div className="mb-6 p-4 bg-slate-700/50 rounded-xl border border-amber-500/30">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-amber-300">Level {player.level}</h3>
                        <span className="text-sm text-white/70">XP: {player.xp} / {player.maxXP}</span>
                    </div>
                    <StatBar
                        label="Experience"
                        current={player.xp}
                        max={player.maxXP}
                        color="bg-gradient-to-r from-yellow-500 to-orange-500"
                        bgColor="bg-slate-600"
                        icon="⭐"
                    />
                </div>
                
                {/* HP and Stamina */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-slate-700/50 rounded-xl border border-red-500/30">
                        <StatBar
                            label="Health"
                            current={player.hp}
                            max={player.maxHP}
                            color="bg-gradient-to-r from-red-500 to-pink-500"
                            bgColor="bg-slate-600"
                            icon="❤️"
                        />
                    </div>
                    <div className="p-4 bg-slate-700/50 rounded-xl border border-blue-500/30">
                        <StatBar
                            label="Stamina"
                            current={player.stamina}
                            max={player.maxStamina}
                            color="bg-gradient-to-r from-blue-500 to-cyan-500"
                            bgColor="bg-slate-600"
                            icon="⚡"
                        />
                    </div>
                </div>
                
                {/* Skills */}
                <div className="mb-6">
                    <h3 className="text-xl font-bold text-amber-300 mb-4">Skills</h3>
                    <div className="space-y-3">
                        {Object.entries(skills).map(([skillName, level]) => (
                            <motion.div
                                key={skillName}
                                className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                                whileHover={{ scale: 1.02, borderColor: 'rgba(251, 191, 36, 0.5)' }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-semibold capitalize">
                                        {skillName.replace(/([A-Z])/g, ' $1').trim()}
                                    </span>
                                    <span className="text-amber-400 font-bold">Lv. {level}</span>
                                </div>
                                <StatBar
                                    label=""
                                    current={level}
                                    max={10}
                                    color="bg-gradient-to-r from-purple-500 to-pink-500"
                                    bgColor="bg-slate-600"
                                    showNumbers={false}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {/* Game Statistics */}
                <div className="p-4 bg-slate-700/50 rounded-xl border border-green-500/30">
                    <h3 className="text-xl font-bold text-green-300 mb-4">📊 Statistics</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-white/80">
                            <span className="text-white/50">Drinks Served:</span>
                            <span className="ml-2 font-bold text-green-400">{stats.drinksServed}</span>
                        </div>
                        <div className="text-white/80">
                            <span className="text-white/50">Perfect Drinks:</span>
                            <span className="ml-2 font-bold text-yellow-400">{stats.perfectDrinks}</span>
                        </div>
                        <div className="text-white/80">
                            <span className="text-white/50">Customers:</span>
                            <span className="ml-2 font-bold text-blue-400">{stats.customersServed}</span>
                        </div>
                        <div className="text-white/80">
                            <span className="text-white/50">Total Earnings:</span>
                            <span className="ml-2 font-bold text-amber-400">${stats.totalEarnings}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}

