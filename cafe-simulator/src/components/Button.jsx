// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Button({ children, className, onClick, variant = 'primary', disabled, ...props }) {
    const baseStyles = "px-6 py-2 rounded-full font-bold transition-colors duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
        primary: "bg-cafe-rose text-white hover:bg-rose-500",
        secondary: "bg-cafe-gold text-cafe-brown hover:bg-yellow-500",
        outline: "border-2 border-cafe-rose text-cafe-rose hover:bg-rose-50",
    };

    return (
        <motion.button
            whileHover={disabled ? {} : { scale: 1.05 }}
            whileTap={disabled ? {} : { scale: 0.95 }}
            className={twMerge(baseStyles, variants[variant], className)}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
}
