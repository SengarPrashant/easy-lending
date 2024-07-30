import React from 'react';
import "./Confirmation.scss";
import "../../assets/img/check.png"

const Confirmation = ({ arn }) => {
    return (
        <div className='confirmWrapper'>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="64px" height="64px" fill="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <circle style={{ fill: '#2eca6a' }} cx="25" cy="25" r="25">
                    </circle>
                    <polyline style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', strokeMiterlimit: 10 }} points=" 38,15 22,33 12,25 "></polyline>
                </g>
            </svg>
            <div class="confirmContainer">
                <h1 class="title">Congratulations !!!</h1>
                <p class="message">Reference Number: <strong>{arn}</strong></p>
                <p className='note'>Thank you for choosing us as your trusted partner in this important journey.</p>
                <p class="note">We will keep you updated with the latest information regarding your application status.</p>
            </div>
        </div>
    )
}

export default Confirmation;