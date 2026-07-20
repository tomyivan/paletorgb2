"use client";
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
export const NavBar = () => {

    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const handleTheme = () => {
        const html = document.querySelector("html");
        if (html) {
            html.classList.toggle("dark");
            const isDark = html.classList.contains("dark");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            setIsDarkMode(isDark);
            
        }
    }
    
    useEffect(() => {
        const html = document.querySelector("html");
        if (html) {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme === "dark") {
                html.classList.add("dark");
                setIsDarkMode(true);
            } else {
                html.classList.remove("dark");
                setIsDarkMode(false);
            }
        }
    }, []);

    return (
        <header 
            className="flex items-center justify-between p-4 h-16 w-full bg-slate-100 dark:bg-slate-900 dark:border-b dark:border-white/[.145]"
        >
            <div className="text-lg font-semibold text-gray-700 dark:text-zinc-50">
                PaletoRgb <span className="text-xs bg-purple-400 text-white px-2 py-1 rounded">Beta</span>
            </div>
            <div>
                <button 
                    onClick={handleTheme}
                    className="p-2 rounded-full cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                    {isDarkMode ? (
                        <Sun className="w-4 h-4 text-gray-700 dark:text-zinc-50" />
                    ) : (
                        <Moon className="w-4 h-4 text-gray-700 dark:text-zinc-50" />
                    )
                        }
                </button>
            </div>

        </header>
    )
}