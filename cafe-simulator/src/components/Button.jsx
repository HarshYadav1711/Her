// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export function Button({ children, className, onClick, variant = 'primary', disabled, ...props }) {
    const baseStyles = "px-6 py-2 rounded-full font-bold transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
    const variants = {
        primary: "bg-gradient-to-r from-cafe-rose to-pink-600 text-white hover:brightness-110 hover:shadow-rose-500/30",
        secondary: "bg-gradient-to-r from-cafe-gold to-orange-500 text-white hover:brightness-110 hover:shadow-orange-500/30",
        outline: "border-2 border-cafe-rose text-cafe-rose hover:bg-cafe-rose/10 backdrop-blur-sm",
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
