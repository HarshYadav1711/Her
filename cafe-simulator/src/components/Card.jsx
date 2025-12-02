import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={twMerge("bg-white p-6 rounded-2xl shadow-lg border border-rose-100", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
