import { motion } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { Card } from './Card';
import { Button } from './Button';
import { X } from 'lucide-react';
import { skillTree, getSkillEffect, getSkillUnlocks } from '../game/skills';

export function SkillTree({ onClose }) {
    const { skills, player, upgradeSkill } = useGameStore();
    
    const handleUpgrade = (skillName) => {
        upgradeSkill(skillName);
    };
    
    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 perspective-3d">
            <Card className="w-full max-w-4xl relative max-h-[90vh] overflow-y-auto bg-gradient-to-br from-violet-900 to-indigo-900 border-2 border-violet-500/50">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white/70 hover:text-white z-10 button-3d"
                >
                    <X size={24} />
                </button>
                
                <h2 className="text-3xl font-bold text-violet-300 mb-2 font-serif text-center drop-shadow-lg">
                    🌳 Skill Tree
                </h2>
                <p className="text-center text-white/60 mb-6 text-sm">
                    Skill Points: <span className="text-violet-400 font-bold text-lg">{player.skillPoints}</span>
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(skillTree).map(([skillName, skillData]) => {
                        const currentLevel = skills[skillName];
                        const effect = getSkillEffect(skillName, currentLevel);
                        const unlocks = getSkillUnlocks(skillName, currentLevel);
                        const canUpgrade = player.skillPoints > 0 && currentLevel < skillData.maxLevel;
                        
                        return (
                            <motion.div
                                key={skillName}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-violet-900/30 rounded-xl border-2 border-violet-500/30 hover:border-violet-400/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{skillData.icon}</span>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-white">{skillData.name}</h3>
                                        <p className="text-xs text-white/60">{skillData.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-violet-400">Lv.{currentLevel}</div>
                                        <div className="text-xs text-white/50">/ {skillData.maxLevel}</div>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <div className="w-full h-2 bg-violet-900/50 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(currentLevel / skillData.maxLevel) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                
                                {effect && (
                                    <div className="mb-3 p-2 bg-violet-800/20 rounded text-sm text-white/80">
                                        <span className="text-violet-300 font-semibold">Current Effect:</span> {effect.description}
                                    </div>
                                )}
                                
                                {unlocks.length > 0 && (
                                    <div className="mb-3 p-2 bg-green-900/20 rounded text-xs text-green-300">
                                        <span className="font-semibold">Unlocked:</span> {unlocks.join(', ')}
                                    </div>
                                )}
                                
                                {canUpgrade && (
                                    <Button
                                        onClick={() => handleUpgrade(skillName)}
                                        className="w-full bg-gradient-to-r from-violet-600 to-purple-600"
                                    >
                                        ⬆ Upgrade (1 SP)
                                    </Button>
                                )}
                                
                                {!canUpgrade && currentLevel >= skillData.maxLevel && (
                                    <div className="text-center text-green-400 text-sm font-bold py-2">
                                        ✓ MAXED OUT
                                    </div>
                                )}
                                
                                {!canUpgrade && currentLevel < skillData.maxLevel && (
                                    <div className="text-center text-white/50 text-sm py-2">
                                        Need Skill Points
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </Card>
        </div>
    );
}

