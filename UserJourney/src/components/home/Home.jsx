import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import EligibilityForm from "../eligibility-form/EligibilityForm";
import "./Home.scss";
import StepIndicator from "../../common/stepIndicator/StepIndicator";
import UploadDocuments from "../uploadDocuments/UploadDocuments";
import Confirmation from "../confirmation/Confirmation";
import LoanApplicationHistory from "../application-history/LoanApplicationHistory";
import { axiosClient } from "../../config/axios-config";

const Home = () => {

    const INITIAL_STATE = {
        fullName: "",
        email: "",
        mobile: "",
        pan: "",
        aadhaar: "",
        annualIncome: "",
        amount: "",
        tenureMonths: "",
        consent: false,
        occupation: "",
    };
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({...INITIAL_STATE});

    const [loading, setLoading] = useState(false);
    const [enableActionButton, setEnableActionButton] = useState(false);
    const [responeData, setResponseData] = useState([]);
    const [pageMode, setPageMode] = useState("");
    const [loanARN, setLoanARN] = useState("");
    

   

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        if (mode !== null)
            setPageMode(mode)
    }, [])

    const handleTextChange = (key, event) => {
       formData[key] = event.target.value;
    }

    const enableDisableActionButton = () => {
        let _keys = Object.keys(formData);
        let _ifBlank = false;
        for (let index = 0; index < _keys.length; index++) {
            if (formData[_keys[index]] === "") {
                _ifBlank = true;
            }
        }

        if (_ifBlank)
            setEnableActionButton(false)
        else
            setEnableActionButton(true)
    }

    const setProgress = () => {
        let _step = currentStep + 1;
        setCurrentStep(_step);
    }

    const checkEligibility = () => {
        setLoading(true);
        console.log(formData)
        //here we can find values
        axiosClient.post('/products/H0001/eligibility', {
            ...formData
        }).then(res => {
            setResponseData(res.data.data);
            setProgress();
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
        })

    }

    const showFormStep = () => {
        if (pageMode === "") {
            if (currentStep === 0)
                return <EligibilityForm
                    setProgress={setProgress}
                    handleTextChange={(key, event) => handleTextChange(key, event)}
                    action={checkEligibility}
                    enableActionButton={enableActionButton}
                    checkConsent={checkConsent}
                    loading={loading}
                />
            else if (currentStep === 1)
                return <UploadDocuments initialValues={formData} moveToNextStep={setProgress} responseData={responeData} setLoanARN={setLoanARN} />
            else if (currentStep > 1)
                return <Confirmation arn={loanARN} />
        }
        else if (pageMode === "eligibility") {
            if (currentStep === 0)
                return <EligibilityForm
                    source="eligibility"
                    setProgress={setProgress}
                    handleTextChange={(key, event) => handleTextChange(key, event)}
                    action={checkEligibility}
                    enableActionButton={enableActionButton}
                    checkConsent={checkConsent}
                    loading={loading}
                />
            else if (currentStep > 0)
                return <Confirmation arn={responeData.requestId} />
        }
        else if (pageMode === "history") {
            return <LoanApplicationHistory />
        }
    }

    const checkConsent = (event) => {
        setFormData({...formData,consent:event.target.checked})
        enableDisableActionButton();
    }

    const setStep = (step) => {
        setCurrentStep(step)
    }

    return (
        <div>
            <Header />
            {currentStep <= 1 && pageMode === "" &&
                <div style={{ display: 'flex', justifyContent: "center" }}>
                    <StepIndicator currentStep={currentStep} setStep={setStep} />
                </div>
            }
            {showFormStep()}
        </div >
    )
}

export default Home;