"use client";

interface ColorPaletteProps {
    colors: string[];
    onClick?: (color: string) => void;
}

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, onClick }) => {
    return (
        <div className="flex">
            {colors.map((color, index) => (
                <div
                    key={index}
                    className="h-36 w-full shadow-md cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => onClick?.(color)}
                >
                    {
                        
                    }
                </div>
            ))}
        </div>
    );
};