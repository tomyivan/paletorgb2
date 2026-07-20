import { useState } from "react";
import { ColorsService } from "@services/colors";
import { ColorData } from "@domain/color.domain";
export const useColor = (  ) => {
    const [ colors, setColors ] = useState<ColorData[]>([]);
    const [ countColors, setCountColors ] = useState<number>(0);
    const handleImage = (file: File, type: "kmeans" | "frecuency") => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const imageData = ctx?.getImageData(0, 0, img.width, img.height);
            if (!imageData) return;
            const colorsService = new ColorsService(imageData.data, 10);
            const extractedColors = type === "kmeans" ? colorsService.kmeans(10) : colorsService.frecuency(10);
            setColors(extractedColors);
            setCountColors(extractedColors.length);
        };
    }
    return {
        colors,
        countColors,
        handleImage
    }
}