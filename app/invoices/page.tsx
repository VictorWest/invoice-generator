"use client"
import Button from "@/components/button";
import { redirect } from "next/navigation";
import { FaPlus, FaFileInvoiceDollar } from "react-icons/fa";
import { v4 as uuid } from "uuid";

export default function Page(){
    const createNewInvoice = () => {
        const id = uuid().slice(0, 8)
        
        redirect(`/invoices/${id}/edit`)
    }

    return(
        <div className="bg-stone-100 px-20 py-10 text-black h-screen">
            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center">
                    <Button bgColour="#e7e5e4" title="All invoices" className="border border-stone-300" />
                    <Button bgColour="#e7e5e4" title="Outstanding" className="border border-stone-300" />
                    <Button bgColour="#e7e5e4" title="Paid" className="border border-stone-300" />
                </div>
                <div className="flex items-center gap-5">
                    <input className="px-2 py-3 bg-stone-200 rounded-md border-0 outline-0 text-xs" placeholder="Search by client name" />
                    <div onClick={createNewInvoice}><Button textColour="white" bgColour="black" title="New Invoice" /></div>
                </div>
            </div>
            <div className="bg-white rounded-xl flex flex-col items-center justify-center gap-3 mt-5 h-80">
                <FaFileInvoiceDollar className="text-3xl" />
                <p className="font-bold">Create your first invoice</p>
                <div onClick={createNewInvoice}><Button textColour="white" bgColour="#005F00" title={<p className="flex items-center gap-2"><span><FaPlus /></span>New Invoice</p>} /></div>
            </div>
        </div>
    )
}