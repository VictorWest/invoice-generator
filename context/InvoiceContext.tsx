"use client"
import { defaultInvoiceData, DiscountData, TaxData } from "@/utils/data";
import { InvoiceData, LineItemType } from "@/utils/interfaces/interfaces";
import { ParamValue } from "next/dist/server/request/params";
import { createContext, useContext, useState } from "react";

const InvoiceContext = createContext<any>(null)

export const InvoiceProvider = ({ children }: any) => {
    const [ selectedCurrency, setSelectedCurrency ] = useState({ name: "USD", symbol: "$" })
    const [ invoiceData, setInvoiceData ] = useState<InvoiceData>(defaultInvoiceData)
    const [ lineItemIndex, setLineItemIndex ] = useState(1)
    const [ lineItems, setLineItems ] = useState<LineItemType[]>([])
    const [ taxData, setTaxData ] = useState<TaxData>({ type: "Deducted", label: "Tax", rate: 0, inclusive: false })
    const [ discountData, setDiscountData ] = useState<DiscountData>({ type: "None", amount: 0, calculatedAmount: 0 })
    const [ calculateTotal, setCalculateTotal ] = useState({subtotal: 0, tax: 0, total: 0})
    const [ templateColour, setTemplateColour ] = useState("white")
    
    const [uploadedImage, setUploadedImage] = useState(null);

    return(
        <InvoiceContext.Provider value={{ 
                                            selectedCurrency, setSelectedCurrency,
                                            invoiceData, setInvoiceData,
                                            lineItemIndex, setLineItemIndex,
                                            lineItems, setLineItems,
                                            taxData, setTaxData,
                                            discountData, setDiscountData,
                                            calculateTotal, setCalculateTotal,
                                            uploadedImage, setUploadedImage,
                                            templateColour, setTemplateColour
                                        }}>
            { children }
        </InvoiceContext.Provider>
    )
}

export const UseInvoiceContext = () => useContext(InvoiceContext)