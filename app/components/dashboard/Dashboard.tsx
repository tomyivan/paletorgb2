"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ColorPalette } from "./ColorPalette";
import { useColor } from "@hooks/useColor";
import { useFileStore } from "@store/file.store";
import { ColorPorcentage } from "./ColorPorcentage";
import { CardColor } from "./CardColor";
export const Dashboard = () => {
    const { file, type } = useFileStore();
    const { colors, countColors, handleImage } = useColor();
    const [ color, setColor ] = useState<string>("");
    useEffect(() => {
        if (file) {
            handleImage(file, type);
        }
    }, [file, type]);
    return (<section className="flex-1 flex flex-col gap-2 p-4 bg-zinc-50 dark:bg-black text-gray-700 dark:text-zinc-50">
        <div className="flex flex-col w-full text-2xl font-semibold">
            Paleta extraida de la imagen.
            <span className="text-xs text-gray-500 dark:text-zinc-400">
                {
                    countColors === 0 ? "Suba una imagen para generar la paleta de colores." : 
                    `${countColors} colores dominants, ordenador por cobertura de color.`
                }
            </span>
        </div>
        {
            file && colors.length > 0 ?
            <>
                <ColorPalette 
                    colors={colors.map(colorData => colorData.color)}
                    onClick={(color) => setColor(color)}
                />
                <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <CardColor
                        color={color}
                    />
                    <ColorPorcentage
                        colors={colors}
                    />
                </div>
            </>
            :
            
            <Image 
                src={`picture.svg`}
                alt="Globe"
                width={300}
                height={300}
                className="mx-auto mt-20"
            />
        }
    </section>)
}