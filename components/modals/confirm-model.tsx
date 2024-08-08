"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React from "react";

interface ConfirmModalProps{
    children : React.ReactNode , 
    onConfirm : () => void,
}
export const ConfirmModal = ({children , onConfirm} : ConfirmModalProps)=>{
    return(
      <AlertDialog>
        <AlertDialogTrigger asChild>
            {children}
        </AlertDialogTrigger>
     <AlertDialogContent className="bg-white p-4 rounded-lg shadow-md max-w-xs w-full mx-auto fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
  <AlertDialogHeader className="text-center">
    <AlertDialogTitle className="text-lg font-semibold">Are you sure?</AlertDialogTitle>
    <AlertDialogDescription className="text-sm text-gray-500 mt-2">
      This action cannot be undone.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter className="mt-4 flex justify-end gap-2">
    <AlertDialogCancel className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
      Cancel
    </AlertDialogCancel>
    <AlertDialogAction onClick={onConfirm} className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
      Continue
    </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>

      </AlertDialog>
    )
}