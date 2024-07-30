import { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function PersonalDetails({ initialValues, responseData }) {
    const [loading, setLoading] = useState(false);

    const getLoanStatus = (status) => {
        if (status === "Eligible")
            return <span style={{ backgroundColor: 'green', paddingRight: 10, paddingLeft: 10, color: 'white', borderRadius: 2, textTransform: 'uppercase' }}><small>{responseData.status}</small></span>
    }

    return (
        <>
            <Container style={{ paddingTop: '1em', paddingBottom: '2em' }}>
                {(!loading && initialValues) && <>
                    <Card key={Math.random()} style={{ borderRadius: 5, marginBottom: 16 }} className="shadow-sm">
                        <Card.Body>
                            <Row>
                                <Col sm={12} lg={4}>
                                    <strong>{initialValues.fullName}</strong>
                                    <div>Pan: <small style={{ textTransform: 'uppercase' }}>{initialValues.pan}</small></div>
                                    <div>Aadhaar: <small>{initialValues.aadhaar}</small></div>
                                    <div> <svg style={{ marginRight: 8 }} width="16px" height="16px" viewBox="0 0 28 28">
                                        <g id="phone" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g id="ic_fluent_phone_28_filled" fill="green" fill-rule="nonzero">
                                                <path d="M7.84951476,2.70321839 L9.78645772,2.11937383 C11.1089609,1.72073725 12.5219622,2.36497137 13.088316,3.62480045 L14.4461458,6.64523332 C14.9288844,7.71906404 14.6744902,8.98106875 13.8134316,9.78401765 L11.7464593,11.7114724 C11.4687963,11.9740537 11.6785347,12.998993 12.6913565,14.7532518 C13.7041783,16.5075106 14.4869326,17.201619 14.8481415,17.0939635 L17.5563375,16.2659826 C18.6819332,15.9218525 19.9017384,16.3322192 20.5904495,17.2867181 L22.5201201,19.9610886 C23.3262299,21.0782929 23.1812671,22.6195811 22.1809838,23.5668886 L20.6889924,24.979863 C19.7084001,25.9085296 18.3041887,26.2381717 17.0127872,25.8428632 C13.8869514,24.8860193 10.9918583,22.0457163 8.28853263,17.3634189 C5.58042572,12.6728401 4.55654474,8.71743221 5.26990283,5.48544144 C5.56257182,4.15936442 6.54930324,3.09513567 7.84951476,2.70321839 Z" id="🎨-Color">
                                                </path>
                                            </g>
                                        </g>
                                    </svg><small>{initialValues.mobile}</small></div>
                                    <div><svg fill="#ff4136" style={{ marginRight: 8 }} width="16px" height="16px" viewBox="0 0 96 96" ><path d="M90,12H6a5.9966,5.9966,0,0,0-6,6V78a5.9966,5.9966,0,0,0,6,6H90a5.9966,5.9966,0,0,0,6-6V18A5.9966,5.9966,0,0,0,90,12ZM84,24v2.5188L48,47.0918,12,26.5188V24ZM12,72V40.3381L45.0234,59.209a5.9961,5.9961,0,0,0,5.9532,0L84,40.3381V72Z" /></svg>
                                        <small>{initialValues.email}</small></div>

                                </Col>
                                <Col sm={12} lg={4}>
                                    <div>Request Id: <small>{responseData.requestId}</small></div>
                                    <div>Loan type: <small>Home Loan</small></div>
                                    <div>Occupation: <small>{initialValues.occupation}</small></div>
                                    <div>Annual Income: <small>₹{Number(initialValues.annualIncome).toLocaleString("en-IN")}</small></div>
                                </Col>
                                <Col sm={12} lg={4}>
                                    <div>Status: {getLoanStatus(responseData.status)}</div>
                                    <div>Loan Amount: <small>₹{Number(initialValues.amount).toLocaleString("en-IN")}</small></div>
                                    <div>Tenure: <small>{initialValues.tenureMonths} months</small></div>
                                    <div>Interest Rate: <small>{responseData.interestRate.toFixed(2)}%</small></div>
                                    <div>EMI: <small>₹{Number(responseData.emi.toFixed(2)).toLocaleString()}</small></div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </>}
            </Container>
        </>
    )
}

export default PersonalDetails;