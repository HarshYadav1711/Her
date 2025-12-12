import { motion } from 'framer-motion';

export function StatBar({ 
    label, 
    current, 
    max, 
    color = 'bg-blue-500', 
    bgColor = 'bg-gray-700',
    showNumbers = true,
    icon = null,
    className = ''
}) {
    const percentage = Math.min(100, (current / max) * 100);
    
    return (
        <div className={`w-full ${className}`}>
            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                    {icon && <span className="text-sm">{icon}</span>}
                    <span className="text-xs font-bold text-white uppercase tracking-wide">{label}</span>
                </div>
                {showNumbers && (
                    <span className="text-xs font-bold text-white">
                        {Math.floor(current)} / {max}
                    </span>
                )}
            </div>
            <div className={`w-full h-4 ${bgColor} rounded-full overflow-hidden border-2 border-gray-800 shadow-inner`}>
                <motion.div
                    className={`h-full ${color} rounded-full relative overflow-hidden`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
            </div>
        </div>
    );
}

