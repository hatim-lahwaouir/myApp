import { useState } from "react";

interface PopupProps {
    trigger: boolean;
    children: React.ReactNode;
    close:any
}

const Popup: React.FC<PopupProps> = ({ close, trigger, children }) => {



    return (trigger) ?  (<div className="w-[100%] h-[100vh] fixed left-0 top-0 bg-black bg-opacity-20  flex justify-center items-center" onClick={() => close()} >
        {children}
    </div>
    ) : null

}




export default Popup