
import Iconbutton from "./Iconbutton";

const ConfirmationModal = ({modalData}) => {
    return ( 
        <div className="w-4/12 rounded-lg">
            <div className="flex flex-col gap-2">
                <p>
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>
                <div className="flex flex-row gap-2">
                    <Iconbutton onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}/>
                    
                    <button onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
                </div>
            </div>
        </div>
     );
}
 
export default ConfirmationModal;