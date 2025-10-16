"use client"
import Input from "@/components/input";
import LineItem from "@/components/line-item";
import { InvoiceData, LineItemType } from "@/utils/interfaces/interfaces";
import { defaultInvoiceData, EMAIL_REGEX, invoiceTermsOptions, MOBILE_NUMBER_REGEX } from "@/utils/data";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";
import { FaImage, FaPlus } from "react-icons/fa6";
import { IoIosCheckbox } from "react-icons/io";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { formatCurrency } from "@/utils/helpers";
import SignaturePad from "@/components/signature-pad";

// To be changed 
const TAX_PERCENTGE = 0.2

export default function CreateInvoice({ id }:{ id:ParamValue }){
    // Data state management
    const [ invoiceData, setInvoiceData ] = useState<InvoiceData>(defaultInvoiceData)
    const [ lineItemIndex, setLineItemIndex ] = useState(1)
    const [ lineItems, setLineItems ] = useState<LineItemType[]>([])
    const [ calculateTotal, setCalculateTotal ] = useState({subtotal: 0, tax: 0, total: 0})

    // UX state management
    const [ inputIsInvalid, setInputIsInvalid ] = useState({ fromEmail: false, fromPhone: false, fromBusiness: false, billToEmail: false, billToPhone: false, billToMobile: false, billToFax: false})
    const [ showSignaturePad, setShowSignaturePad ] = useState(false)

    useEffect(() => {
        if (invoiceData?.fromEmail !== "" && !EMAIL_REGEX.test(invoiceData?.fromEmail)){
            setInputIsInvalid(prev => ({...prev, fromEmail: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, fromEmail: false}))
        }

        if (invoiceData?.billToEmail !== "" && !EMAIL_REGEX.test(invoiceData?.billToEmail)){
            setInputIsInvalid(prev => ({...prev, billToEmail: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, billToEmail: false}))
        }

        if (invoiceData?.fromPhone !== "" && !MOBILE_NUMBER_REGEX.test(invoiceData?.fromPhone)){
            setInputIsInvalid(prev => ({...prev, fromPhone: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, fromPhone: false}))
        }
        
        if (invoiceData?.fromBusiness !== "" && !MOBILE_NUMBER_REGEX.test(invoiceData?.fromBusiness || "")){
            setInputIsInvalid(prev => ({...prev, fromBusiness: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, fromBusiness: false}))
        }

        if (invoiceData?.billToFax !== "" && !MOBILE_NUMBER_REGEX.test(invoiceData?.billToFax || "")){
            setInputIsInvalid(prev => ({...prev, billToFax: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, billToFax: false}))
        }

        if (invoiceData?.billToMobile !== "" && !MOBILE_NUMBER_REGEX.test(invoiceData?.billToMobile || "")){
            setInputIsInvalid(prev => ({...prev, billToMobile: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, billToMobile: false}))
        }

        if (invoiceData?.billToPhone !== "" && !MOBILE_NUMBER_REGEX.test(invoiceData?.billToPhone)){
            setInputIsInvalid(prev => ({...prev, billToPhone: true}))
        } else {
            setInputIsInvalid(prev => ({...prev, billToPhone: false}))
        }

    }, [invoiceData?.fromEmail, invoiceData?.fromPhone, invoiceData?.fromBusiness, invoiceData?.billToEmail, invoiceData?.billToFax, invoiceData?.billToMobile, invoiceData?.billToPhone])

    useEffect(() => {
        const subtotal = lineItems.reduce((acc, item) => acc + item.amount, 0)
        const tax = lineItems.filter(item => item.tax).reduce((acc, item) => acc + (TAX_PERCENTGE * item.amount), 0)
        setCalculateTotal({ subtotal, tax, total: subtotal - tax })
    }, [lineItems])

    const addLineItem = () => {
        setLineItems(prev => ([...prev, { index: lineItemIndex, description: "", rate: 0, quantity: 0, amount: 0, tax: false }]))
        setLineItemIndex(prev => prev + 1)
    }

    const handleItemChange = (index: number, field: keyof LineItemType, value: string | number | boolean) => {
        setLineItems((prev) =>
            prev.map((item) => 
                item.index === index ? { ...item, [field]: value } : item
            )
        );
        handleCalculateTotal(index)
    }

    const handleCalculateTotal = (index: number) => {
        setLineItems(prev => 
            prev.map((item) => {
                if(item.index === index){
                    const amount = item.quantity * item.rate
                    return { ...item, amount }
                }
                return item                
            })
        )
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
                    <Input 
                        onChange={(e) => setInvoiceData((prev: any) => ({...prev, invoiceTitle: e.target.value}))} 
                        value={invoiceData?.invoiceTitle}
                        placeholder="Invoice" className="text-xl" />
                    <div className="border border-stone-300 rounded-md p-8 text-sm flex items-center gap-3">
                        <FaImage />
                        <p>Add Logo</p>
                    </div>
                </div>
                <div className="flex *:w-full gap-10 *:space-y-3">
                    <div>
                        <h2 className="text-xl font-bold">From</h2>
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, fromName: e.target.value}))} 
                            value={invoiceData?.fromName} 
                            label="Name*" placeholder="Businees Name" 
                        />
                        <Input
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, fromEmail: e.target.value}))} 
                            value={invoiceData?.fromEmail}
                            label="Email*" placeholder="name@businessname.com" 
                            inputIsInvalid={inputIsInvalid?.fromEmail}
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, fromAddress: e.target.value}))} 
                            value={invoiceData?.fromAddress}
                            label="Address*" placeholder="Street Name" 
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, fromPhone: e.target.value}))} 
                            value={invoiceData?.fromPhone}
                            label="Phone*" placeholder="(123) 456 789" 
                            inputIsInvalid={inputIsInvalid?.fromPhone}
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, fromBusiness: e.target.value}))} 
                            value={invoiceData?.fromBusiness}
                            label="Business Number" placeholder="123-45-6789" 
                            inputIsInvalid={inputIsInvalid?.fromBusiness}
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Bill To</h2>
                        <Input
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, billToName: e.target.value}))} 
                            value={invoiceData?.billToName}
                            label="Name*" placeholder="Businees Name" 
                        />
                        <Input
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, billToEmail: e.target.value}))} 
                            value={invoiceData?.billToEmail}
                            label="Email*" placeholder="name@businessname.com" 
                            inputIsInvalid={inputIsInvalid?.billToEmail}
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, billToAddress: e.target.value}))} 
                            value={invoiceData?.billToAddress}
                            label="Address*" placeholder="Street Name" 
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, billToPhone: e.target.value}))} 
                            value={invoiceData?.billToPhone}
                            label="Phone*" placeholder="(123) 456 789" 
                            inputIsInvalid={inputIsInvalid?.billToPhone}
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, billToMobile: e.target.value}))} 
                            value={invoiceData?.billToMobile}
                            label="Mobile" placeholder="(123) 456 789" 
                            inputIsInvalid={inputIsInvalid?.billToMobile}
                        />
                        <Input 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, billToFax: e.target.value}))} 
                            value={invoiceData?.billToFax}
                            label="Fax" placeholder="(123) 456 789" 
                            inputIsInvalid={inputIsInvalid?.billToFax}
                        />
                    </div>
                </div>
                <hr className="text-stone-300" />
                <div className="w-1/2 space-y-3">
                    <Input 
                        onChange={(e) => setInvoiceData((prev: any) => ({...prev, invoiceNumber: `INV-${e.target.value.replace(/\D/g, "")}` }))}
                        value={invoiceData?.invoiceNumber}
                        inputMode="numeric" label="Number" placeholder="INV0001" />
                    <Input 
                        onChange={(e) => setInvoiceData((prev: any) => ({...prev, date: e.target.value}))}
                        value={invoiceData?.date}
                        type="date" label="Date" placeholder="MM/DD/YYYY" />
                    <div className="flex items-center gap-5 text-xs">
                        <p className="w-20">Terms</p>
                        <select name="customerType" id="customerType" className="border border-stone-400 w-full px-2 py-3 outline-0 cursor-pointer rounded-md" 
                            value={invoiceData?.terms} 
                            onChange={(e) => setInvoiceData((prev: any) => ({...prev, terms: e.target.value}))}
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
                        {lineItems?.map((item, i) => (
                            <div key={i} className="relative">
                                <div onClick={() => removeLineItem(item.index)} className="absolute top-1/2 -translate-y-1/2 bg-stone-300 text-black px-3 py-2 border border-stone-400 w-fit hover:opacity-85 cursor-pointer rounded-md">
                                    X
                                </div>
                                <div className="flex items-center gap-20 py-2 px-10">
                                    <div className="flex-1">
                                        <Input 
                                            onChange={(e) => handleItemChange(item.index, "description", e.target.value)}
                                            value={item.description}
                                            placeholder="Item Description" /> 
                                    </div>
                                    
                                    <div className="flex items-center gap-5 *:w-20 *:text-end">
                                        <Input 
                                            onChange={(e) => handleItemChange(item.index, "rate", e.target.value.replace(/^0+(?=\d)/, ""))}
                                            value={item.rate}
                                            type="number" placeholder="0.00" 
                                        />
                                        <Input 
                                            onChange={(e) => handleItemChange(item.index, "quantity", e.target.value.replace(/^0+(?=\d)/, ""))}
                                            value={item.quantity}
                                            type="number" placeholder="0" 
                                        />
                                        <div className="text-center">{formatCurrency(item.amount)}</div>
                                        <div className="text-2xl flex justify-end" onClick={() => handleItemChange(item.index, "tax", !item.tax)}>
                                            {item.tax ? <IoIosCheckbox /> : <MdCheckBoxOutlineBlank />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div onClick={addLineItem} className="p-2 bg-black text-white rounded-md w-fit hover:opacity-85 cursor-pointer">
                            <FaPlus />
                        </div>
                    </div>
                </div>
                <hr className="text-stone-300" />
                <div className="flex justify-end gap-20 px-20 *:text-end text-sm">
                    <div>
                        <p>Subtotal</p>
                        <p>Tax ({TAX_PERCENTGE * 100}%)</p>
                        <p>Total</p>
                        <p className="font-bold mt-1">Balance Due</p>
                    </div>
                    <div>
                        <p>{formatCurrency(calculateTotal?.subtotal)}</p>
                        <p>{formatCurrency(calculateTotal?.tax)}</p>
                        <p>{formatCurrency(calculateTotal?.total)}</p>
                        <p className="font-bold mt-1">{formatCurrency(calculateTotal?.total)}</p>
                    </div>
                </div>
                <div className="space-y-3">
                    <h2 className="text-lg font-bold">Notes</h2>
                    <textarea className="border border-stone-400 rounded-md w-full h-20 resize-none"></textarea>
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">Signature</h2>
                    {!showSignaturePad && <div onClick={() => setShowSignaturePad(true)} className="p-2 bg-black text-white rounded-md w-fit hover:opacity-85 cursor-pointer">
                        <FaPlus />
                    </div>}
                </div>
                {showSignaturePad && <SignaturePad handleSetUrl={(url: string) => setInvoiceData(prev => ({...prev, signatureUrl: url}))} />}
                <div>
                    <h2 className="text-lg font-bold">Photos</h2>
                    <div className="mt-3 w-fit border border-stone-300 rounded-md p-8 text-sm flex items-center gap-3">
                        <FaImage />
                        <p>Add Logo</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center *:">
                <div>Clear Invoice</div>
                <div>Delete Invoice</div>
            </div>
        </div>
    )
}