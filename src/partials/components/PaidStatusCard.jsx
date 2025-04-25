import React, { useEffect, useState } from 'react'
import './stylings/Paid_status_card.css'

const PaidStatusCard = ({payStatus}) => {
    const [paidStatusIcon, setPaidStatusIcon] = useState("");

    //Will pick which icon depending on status.
    function CheckPaidStatus() {
        switch(payStatus.status){
            case "Paid":
                setPaidStatusIcon("/public/images/paid_status_icons/Check_Icon.svg");
                break
            case "Unpaid":
                setPaidStatusIcon("/public/images/paid_status_icons/Exx_Icon.svg");
                break
            case "Overdue":
                setPaidStatusIcon("/public/images/paid_status_icons/Exclamation_Icon.svg");
                break
            default:
                setPaidStatusIcon("/public/images/paid_status_icons/Exx_Icon.svg");
                break
        }
    }

    //Runs everytime the status changes.
    useEffect(() => {
        CheckPaidStatus();
    }, [payStatus])

    return (
        <>
            <div className='paidStatusCard-wrapper'>
                <header className='paidStatusCard-header'>
                    <p className='paidStatusCard-header-para' >{payStatus.status}</p>
                    <img className='paidStatusCard-header-img' src={paidStatusIcon} alt="Icon of paid, unpaid or overdue status of payment." />
                </header>
                <footer className='paidStatusCard-footer'>
                    <h6 className='paidStatusCard-footer-amount'> {payStatus.amount}</h6>
                    <p className='paidStatusCard-footer-lastMonth'>Last Month: {payStatus.lastMonth}</p>
                </footer>
            </div>
        </>
    )
}

export default PaidStatusCard