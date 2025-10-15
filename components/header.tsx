import Button from "./button";

export default function Header(){
    return(
        <div className="px-20 py-5 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Invoice Generator</h1>
            <div className="flex gap-5 items-center">
                <p>Login</p>
                <p>Sign Up</p>
                <Button textColour="black" bgColour="white" title="Upgrade Now" />
            </div>
        </div>
    )
}