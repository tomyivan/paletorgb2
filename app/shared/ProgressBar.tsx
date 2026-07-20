"use Client";
interface ProgressBarProps {
    porcentage: number;
    label: string;
    type?: "row" | "column";
    size?: "sm" | "md" | "lg";
    color?: string;
}
export const ProgressBar:React.FC<ProgressBarProps> = ({ porcentage, label, type="column", size="md", color="blue" }) => {

    return (<div className={`flex ${type === "row" ? "flex-row" : "flex-col"} w-full gap-2`}>
        <span  className={`text-xs ${type === "row" ? "w-1/12" : ""}`}>
            {label}
        </span>
        <div className="w-full flex justify-between items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                    className={ ` rounded-full ${size === "sm" ? "h-1" : size === "md" ? "h-2" : "h-3"}` }  
                    style={{ width: `${porcentage}%`,
                        backgroundColor: color
                }}
                ></div> 
            </div>
            <span className={`text-xs font-bold ${type === "row" ? "w-1/12 text-right" : ""}`}>{porcentage.toFixed(2)}%</span>
        </div>
    </div>
    )
}