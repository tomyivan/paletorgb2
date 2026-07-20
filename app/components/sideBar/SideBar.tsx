"use client";
import { PreviewImg } from "@shared/PreviewImg";
import { InputFile } from "@shared/InputFile";
import { useState } from "react";
import { ProgressBar } from "@/app/shared/ProgressBar";
import { Button } from "@/app/shared/Button";
import { useFileStore } from "@store/file.store";
export const SideBar = () => {
    const [ currentImg, setCurrentImg ] = useState<File | null>(null);
    const [ method, setMethod ] = useState<"kmeans" | "frecuency" | null>(null);
    const { addFile, addType } = useFileStore();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {        
        if (event.target.files && event.target.files.length > 0) {
            if (event.target.files[0].type.startsWith("image/")) {
                setCurrentImg(event.target.files[0]);
            }else {
                alert("Por favor, selecciona una imagen válida.");
            }
        }
    }
    const handleMethodChange = (method: "kmeans" | "frecuency") => {
        if ( currentImg ) {
            setMethod(method);
            addType(method);
            addFile(currentImg);
        }else {
            alert("Por favor, selecciona una imagen antes de elegir un método.");
        }
    }
    return (
        <aside className="flex flex-col gap-2 w-xs h-[calc(100vh-3rem)] overflow-hidden hover:overflow-y-auto scrollbar-gutter-stable bg-slate-100 dark:bg-slate-900 dark:border-r dark:border-white/[.145] p-4">
            <InputFile 
                handleChange={handleFileChange} 
            />
            <PreviewImg 
                img={currentImg}
            />
            <div className="flex flex-col gap-2 w-full h-full text-gray-700 dark:text-zinc-50">
        <span  className=" text-xs ">
            EXTRACCION
        </span>
      
        <ProgressBar 
            label={"N.° de colores"}
            porcentage={ 10 }
        />
        <span  className="text-xs">
            Método
        </span>
        <div className="flex flex-row gap-2 items-center justify-center w-full">
            <Button 
                size="sm"
                fullWidth
                onClick={() => handleMethodChange("kmeans")}
                variant={ method === "kmeans" ? "primary" : "secondary" }
                disabled={ !currentImg }
            >
                K-means
            </Button>
            <Button 
                size="sm"
                fullWidth
                onClick={() => handleMethodChange("frecuency")}
                variant={ method === "frecuency" ? "primary" : "secondary" }
                disabled={ !currentImg }
            >
                Frecuencia
            </Button>
        </div>
        </div>

        </aside>
    )
}