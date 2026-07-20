import { ColorData } from "@domain/color.domain"
import { ProgressBar } from "@shared/ProgressBar"
interface ColorPorcentageProps {
    colors: ColorData[]
}
export const ColorPorcentage:React.FC<ColorPorcentageProps> = ({ colors }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            Cobertura de colores
            {
                colors.map((colorData, index) => (
                    <ProgressBar 
                        key={index}
                        porcentage={colorData.porcentage}
                        label={colorData.color}
                        color={colorData.color}
                        type="row"
                        size="md"
                    />
                ))
            }
        </div>
    )
}