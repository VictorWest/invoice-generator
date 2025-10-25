import PreviewInvoice from "@/pages/PreviewInvoice";
import { homePageRoute } from "@/utils/routeMap";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page(){
    const session = await getServerSession()

    if (!session){
        redirect(homePageRoute)
    } 

    return <PreviewInvoice />
}