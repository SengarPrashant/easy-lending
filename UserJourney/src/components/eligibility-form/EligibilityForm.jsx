import React, { useState } from "react";
import UserForm from "../../common/form/UserForm";
import "./EligibilityForm.scss";

const EligibilityForm = ({ source = "", handleTextChange, action, enableActionButton, checkConsent, loading }) => {
    const formObj = [
        { prop: "Full Name", type: "text", name: "full-name", value: 'fullName', required: true, autoCapitalize: false },
        { prop: "Email", type: "email", name: "email", value: 'email', required: true, autoCapitalize: false },
        { prop: "Mobile Number", type: "tel", name: "mobile", value: 'mobile', required: true, autoCapitalize: false, maxLength: 10 },
        { prop: "PAN", type: "text", name: "pan", value: 'pan', required: true, autoCapitalize: true, minLength: 10 },
        { prop: "Aadhar Number", type: "number", name: "aadhar", value: 'aadhaar', required: true, autoCapitalize: false },
        { prop: "Annual Income", type: "number", name: "annual-income", value: 'annualIncome', required: true, autoCapitalize: false },
        { prop: "Loan Amount", type: "number", name: "amount", value: 'amount', required: true, autoCapitalize: false },
        { prop: "Tenure (months)", type: "number", name: "tenure", value: 'tenureMonths', required: true, autoCapitalize: false },
    ];

    return (
        <div className="form">
            <form className="form-a">
                <div className="row">
                    <UserForm
                        formTitle="Check your Eligibility"
                        formElements={formObj}
                        confirmButton={source.length ? "Check Eligibility" : "Next"}
                        action={action}
                        handleTextChange={(key, event) => handleTextChange(key, event)}
                        checkConsent={checkConsent}
                        enableActionButton={enableActionButton}
                        loading={loading}
                    />
                </div>
            </form>
        </div>

    )
}

export default EligibilityForm;