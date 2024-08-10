"use client";

import { useConfettiStore } from "@/hooks/use-confetti-hook";
import ReactConfetti from "react-confetti";

export const ConfettiProvider = ()=>{
    const {isOpen , onClose} = useConfettiStore();
    if(!isOpen) return null;

    return(
       isOpen &&  <ReactConfetti
        className="pointer-events-none z-[100]"
        numberOfPieces={1000}
        recycle={false}
        onConfettiComplete={()=>{
             onClose();
        }}
        />
    )
}