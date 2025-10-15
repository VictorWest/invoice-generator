import React from "react";

export default function Button({textColour, bgColour, title} : {textColour:string, bgColour:string, title:React.ReactNode}){
    return(
        <div style={{ color: textColour, background: bgColour }} className="px-5 py-2 rounded-md cursor-pointer hover:opacity-90">
            {title}
        </div>
    )
}