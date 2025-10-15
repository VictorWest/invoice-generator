"use client"
import CreateInvoice from "@/pages/CreateInvoice";
import { redirect, useParams } from "next/navigation";

export default function Page(){
    const router = useParams()
    const id = router.id;

    if (!id){
        redirect("/invoice")
    }

    return <CreateInvoice id={id} />
}