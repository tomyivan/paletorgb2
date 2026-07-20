"use client";
interface PreviewImgProps {
    img?: File | null;
}
export const PreviewImg: React.FC<PreviewImgProps> = ({ img }) => {
    return (<div className="flex flex-col gap-2 w-full h-full text-gray-700 dark:text-zinc-50">
        <span  className="text-xs ">
            MINIATURA
        </span>
      
        <div className="flex flex-col items-center justify-center w-full h-50 rounded-lg "
            style={{
                background: "repeating-linear-gradient(135deg, #0f172b 0px, #0f172b 10px, #1E2A4A 10px, #1E2A4A 20px)",
            }}
        >
            {
                img ? (
                    <div className="bg-black w-full h-full">
                            <img 
                                src={URL.createObjectURL(img)}
                                alt="Preview"
                                className="w-full h-full object-contain rounded-lg"
                            />
                    </div>
                ):(
                        <span className="bg-slate-900 p-1">
                            Vista previa
                        </span>
                    )
            }
            
        </div>
        </div>
    )
}