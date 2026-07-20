"use client";
import { ImagePlus } from "lucide-react";
import { useRef, useState } from "react";
interface InputFileProps {
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputFile:React.FC<InputFileProps> = ({ handleChange }) => {
    const [ isDragging, setIsDragging ] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    }

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            if (handleChange) {
                const fakeEvent = {
                    target: {
                        files: event.dataTransfer.files
                    }
                } as React.ChangeEvent<HTMLInputElement>;
                handleChange(fakeEvent);
            }
        }

    }

    return ( <div className="flex flex-col gap-2 w-full h-full text-gray-700 dark:text-zinc-50">
        <label htmlFor="file-input" className="cursor-pointer text-xs ">
            IMAGEN
        </label>
        <input 
            type="file"
            id="file-input"
            name="file-input"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            ref={fileInputRef}
        />
        <div className={`
                    flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                    ${isDragging 
                        ? "border-green-500 bg-green-50/50 dark:bg-green-950/20" 
                        : "border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                    }
                `}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <ImagePlus 
                width={ 50 }
                height={50}
            />
            
            <span className="text-lg font-medium ">
                Arrastra una imagen aquí <br />
                <span className="text-xs text-gray-500 dark:text-gray-400 ">
                    o haz click para seleccionar un archivo
                </span>
            </span>
        </div>
        </div>
    )
}