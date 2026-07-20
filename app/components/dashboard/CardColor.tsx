"use client";

interface CardColorProps {
    color?: string;
}

const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    return {
        r: parseInt(clean.substring(0, 2), 16),
        g: parseInt(clean.substring(2, 4), 16),
        b: parseInt(clean.substring(4, 6), 16)
    };
}

const rgbToHsl = (r: number, g: number, b: number) => {
    const rN = r / 255;
    const gN = g / 255;
    const bN = b / 255;
    const max = Math.max(rN, gN, bN);
    const min = Math.min(rN, gN, bN);
    const l = (max + min) / 2;
    let h = 0;
    let s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
            case gN: h = (bN - rN) / d + 2; break;
            default: h = (rN - gN) / d + 4; break;
        }
        h *= 60;
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

export const CardColor: React.FC<CardColorProps> = ({ color }) => {
    const hex = color ? `#${color.replace("#", "").substring(0, 6)}` : null;
    const rgb = hex ? hexToRgb(hex) : null;
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    return (<div className="p-4 rounded-lg shadow-lg flex flex-col gap-3 w-full md:w-56">
        <div className="w-full h-full flex items-center justify-center p-2">
            <div
                className="w-full h-32 bg-gray-300 dark:bg-zinc-600 rounded-md"
                style={ color ? { backgroundColor: color } : undefined }
            ></div>
        </div>
        <div className="flex flex-col gap-1 text-xs text-gray-700 dark:text-zinc-50">
            <div className="flex justify-between">
                <span className="font-semibold">HEX</span>
                <span>{ hex ? hex.toUpperCase() : "-" }</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">RGB</span>
                <span>{ rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "-" }</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold">HSL</span>
                <span>{ hsl ? `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` : "-" }</span>
            </div>
        </div>
    </div>)
}