
interface ButtonProps {
    children: string;
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary";
    disabled?: boolean;
    fullWidth?: boolean;

}
export const Button: React.FC<ButtonProps> = ({ children, onClick, size = "md", disabled = false, fullWidth = false, variant = "primary" }) => {
    return (
        <button
            className={`
                  rounded-md font-semibold text-white transition-colors ${fullWidth ? "w-full" : ""}
                  ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
                ${size === "sm" ? "text-sm py-1 px-1.5" : size === "md" ? "text-base py-2 px-2.5" : "text-lg py-3 px-3.5"}
                ${disabled ? "bg-gray-400 cursor-not-allowed" : variant === "primary" ? "bg-purple-500 hover:bg-purple-600" : "bg-gray-500 hover:bg-gray-600"}
            `}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}