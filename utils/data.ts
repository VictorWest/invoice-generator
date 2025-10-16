import { ParamValue } from "next/dist/server/request/params";
import { InvoiceData } from "./interfaces/interfaces";

export const invoiceTermsOptions = ["None", "Custom", "On Receipt", "Next Day", "2 Days","3 Days","4 Days","5 Days","6 Days","7 Days","10 Days","14 Days","21 Days","30 Days","45 Days","60 Days","90 Days","120 Days","180 Days","365 Days"] as const

export type InvoiceTerms = typeof invoiceTermsOptions[number]

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/
export const MOBILE_NUMBER_REGEX = /^(?:\+1\s?)?(?:\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/

export const defaultInvoiceData: InvoiceData = {
  id: "" as ParamValue,
  invoiceTitle: "",
  fromName: "",
  fromEmail: "",
  fromAddress: "",
  fromPhone: "",
  fromBusiness: "",
  billToName: "",
  billToEmail: "",
  billToAddress: "",
  billToPhone: "",
  billToMobile: "",
  billToFax: "",
  invoiceNumber: "",
  date: new Date().toISOString().split("T")[0],
  terms: "On Receipt" as InvoiceTerms,
  lineItems: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  balance: 0,
  signatureUrl: ""
};