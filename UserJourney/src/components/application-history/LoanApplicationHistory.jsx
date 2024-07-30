import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import ApplicationHistoryCard from "../application-history-card/ApplicationHistoryCard";
import mockData from "../../service/mocks/application-history-mock.json";
import { AppModal, StatusIndicator } from "../../common/app-components/AppComponents";
import { COLOR_MAP } from "../../common/utils";
import { axiosClient } from "../../config/axios-config";
import "./LoanApplicationHistory.scss";

const LoanApplicationHistory = () => {
    const USER_ID = "ABCDEFGDFG"; //axjoni, ABCDEFGDFG;

    const [formData, setFormData] = useState({
        arn: "",
        status: "",
        statusColor: "",
        name: "",
        email: "",
        pan: "",
        aadhar: "",
        occupation: "",
        annualIncome: "",
        loanAmount: "",
        tenure: "",
        emi: "",
        remarks: "",
        base64Data: null,
    });

    const [loanApplicationCardFlag, setLoanApplicationCardFlag] = useState(false),
        [modalOpen, setModalOpen] = useState(false),
        [eligibilityHistoryData, setEligibilityHistoryData] = useState(),
        [loanApplicationHistoryData, setLoanApplicationHistoryDataHistoryData] = useState();

    const lblDataFormFirstColMap = [
        { label: "Name", value: formData.name },
        { label: "Email", value: formData.email },
        { label: "PAN", value: formData.pan },
        { label: "Aadhar", value: formData.aadhar },
        { label: "Occupation", value: formData.occupation }
    ];

    const lblDataFormSecondColMap = [
        { label: "Annual Income", value: formData.annualIncome.toLocaleString("en-IN") },
        { label: "Loan Amount", value: formData.loanAmount.toLocaleString("en-IN") },
        { label: "Tenure (months)", value: formData.tenure },
        { label: "EMI", value: Number(formData.emi).toLocaleString("en-IN") },
        {
            label: "Status",
            value: <StatusIndicator
                status={formData.status && formData.status.toLocaleUpperCase()}
                color={formData.statusColor}
            />
        }
    ];


    useEffect(() => {
        getHistoryData();
    }, []);


    const getHistoryData = async () => {
        const response = await axiosClient.get(`/${USER_ID}/history`);
        const eligibilityData = response.data.data.eligibilityChecks;
        const loanApplicationData = response.data.data.loanApplications;

        if (eligibilityData)
            setEligibilityHistoryData(eligibilityData);

        if (loanApplicationData)
            setLoanApplicationHistoryDataHistoryData(loanApplicationData);
    }

    const openModal = (e) => {
        const id = e.target.parentElement.parentElement.getElementsByClassName('app-card-title')[0].innerText.split(':')[1].trim();
        if (id.length) {
            setLoanApplicationCardFlag(false);
            let userData = eligibilityHistoryData.find(x => x.requestId === id);

            if (!userData) {
                userData = loanApplicationHistoryData.find(x => x.arn === id);
                setLoanApplicationCardFlag(true);
            }

            setFormData({
                ...formData,
                arn: id,
                status: userData.status,
                statusColor: COLOR_MAP[userData.status],
                remarks: userData.remarks,
                name: userData.fullName,
                email: userData.email,
                pan: userData.pan,
                aadhar: userData.aadhaar,
                occupation: userData.occupation,
                annualIncome: userData.annualIncome,
                loanAmount: userData.amount,
                tenure: userData.tenureMonths,
                emi: userData.emi,
                base64Data: userData.documentsBase64
            });
        }

        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const downloadFiles = (files = []) => {
        files.forEach(fileData => {
            const [filename, mimeType, base64String] = fileData.split('|');
            // Create a Blob from the base64 string
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: mimeType });

            // Create a link element and trigger the download
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();

            // Clean up the URL object
            URL.revokeObjectURL(link.href);
        });
    }


    return (
        <div className="history-page">
            <div className="history-title eligibility-history-page-title">
                <h4>Loan Eligibility History</h4>
            </div>

            <div className="eligibility-history-cards history-cards">
                {!eligibilityHistoryData
                    ? <Spinner animation="border" />
                    : eligibilityHistoryData.map(
                        response =>
                            <ApplicationHistoryCard
                                key={response.requestId}
                                reqId={response.requestId}
                                status={response.status}
                                remarks={response.remarks}
                                onButtonClick={e => openModal(e)}
                            />
                    )}
            </div>

            <div className="history-title application-history-page-title">
                <h4>Loan Application History</h4>
            </div>

            <div className="application-history-cards history-cards">
                {!loanApplicationHistoryData
                    ? <Spinner animation="border" />
                    : loanApplicationHistoryData.map(
                        response =>
                            <ApplicationHistoryCard
                                key={response.requestId}
                                arn={response.arn}
                                status={response.status}
                                remarks={response.remarks}
                                onButtonClick={e => openModal(e)}
                            />
                    )}
            </div>


            <AppModal
                arn={formData.arn}
                title={formData.arn}
                show={modalOpen}
                centered={true}
                confirmButton={loanApplicationCardFlag ? "View Documents" : ""}
                onClick={() => downloadFiles(formData.base64Data)}
                cancelButton="Close"
                onClose={closeModal}
            >
                <div className="app-modal-body">
                    <div className="data-grid">
                        <div className="data-grid-col-1">
                            {lblDataFormFirstColMap.map(x => (
                                <div className="info-box">
                                    <div className="info-lbl">{x.label}</div>
                                    <div className="info-data">{x.value}</div>
                                </div>
                            ))}
                        </div>

                        <div className="data-grid-col-2">
                            {lblDataFormSecondColMap.map(x => (
                                <div className="info-box">
                                    <div className="info-lbl">{x.label}</div>
                                    <div className="info-data">{x.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="info-box-remarks">
                        <div className="info-lbl">Remarks</div>
                        <div className="info-data">{formData.remarks}</div>
                    </div>
                </div>
            </AppModal>
        </div>
    )
}

export default LoanApplicationHistory;