"use client"
import Input from "@/components/input";
import LineItem from "@/components/line-item";
import { LineItemType } from "@/interfaces/interfaces";
import { invoiceTermsOptions } from "@/utils/data";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa6";

export default function CreateInvoice({ id }:{ id:ParamValue }){
    const [ lineItemIndex, setLineItemIndex ] = useState(0)
    const [ lineItems, setLineItems ] = useState<LineItemType[]>([])

    const addLineItem = () => {
        setLineItems(prev => ([...prev, { index: lineItemIndex, description: "", quantity: 0, amount: 0, tax: false }]))
        setLineItemIndex(prev => prev + 1)
    }

    const removeLineItem = (index: number) => {
        setLineItems((prev: LineItemType[]) => {
            return prev.filter(item => item.index !== index)
        })
    }

    return (
        <div className="bg-stone-100 px-20 py-10 text-black">
            <div className="bg-white py-10 px-15 space-y-10">
                <div className="flex items-center justify-between">
                    <Input placeholder="Invoice" className="text-xl" />
                    <div className="border border-stone-300 rounded-md p-8 text-sm flex items-center gap-3">
                        <FaImage />
                        <p>Add Logo</p>
                    </div>
                </div>
                <div className="flex *:w-full gap-10 *:space-y-3">
                    <div>
                        <h2 className="text-xl font-bold">From</h2>
                        <Input label="Name" placeholder="Businees Name" />
                        <Input label="Email" placeholder="name@businessname.com" />
                        <Input label="Address" placeholder="Street Name" />
                        <Input label="Phone" placeholder="(123) 456 789" />
                        <Input label="Business Number" placeholder="123-45-6789" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Bill To</h2>
                        <Input label="Name" placeholder="Businees Name" />
                        <Input label="Email" placeholder="name@businessname.com" />
                        <Input label="Address" placeholder="Street Name" />
                        <Input label="Phone" placeholder="(123) 456 789" />
                        <Input label="Mobile" placeholder="(123) 456 789" />
                        <Input label="Fax" placeholder="(123) 456 789" />
                    </div>
                </div>
                <hr className="text-stone-300" />
                <div className="w-1/2 space-y-3">
                    <Input label="Number" placeholder="INV0001" />
                    <Input type="date" label="Date" placeholder="MM/DD/YYYY" />
                    <div className="flex items-center gap-5 text-xs">
                        <p className="w-20">Terms</p>
                        <select name="customerType" id="customerType" className="border border-stone-400 w-full px-2 py-3 outline-0 cursor-pointer rounded-md" 
                            // onChange={} 
                            // value={}
                        >
                            {invoiceTermsOptions.map((item, idx) => (
                                <option key={idx} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <hr className="text-stone-300" />
                <div className="text-xs">
                    <div className="flex *:flex *:gap-5 justify-between uppercase border-y py-2 px-10">
                        <p>Description</p>
                        <div className="*:w-20 *:text-end">
                            <p>Rate</p>
                            <p>Qty</p>
                            <p>Amount</p>
                            <p>Tax</p>
                        </div>
                    </div>
                    <div className="mt-5">    
                        {lineItems.map((item, i) => (
                            <div key={i} className="relative">
                                <div onClick={() => removeLineItem(item.index)} className="absolute top-1/2 -translate-y-1/2 bg-stone-300 text-black px-3 py-2 border border-stone-400 w-fit hover:opacity-85 cursor-pointer rounded-md">
                                    X
                                </div>
                                <LineItem />
                            </div>
                        ))}
                        <div onClick={addLineItem} className="p-2 bg-black text-white rounded-md w-fit hover:opacity-85 cursor-pointer">
                            <FaPlus />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}