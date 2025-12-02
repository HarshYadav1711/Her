// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Card({ children, className, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={twMerge("glass-panel p-6 rounded-2xl transition-all duration-300", className)}
            {...props}
        >
            {children}
        </motion.div>
    );
}
