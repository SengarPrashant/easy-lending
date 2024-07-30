import React, { useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import "./UserForm.scss";

const UserForm = ({
    formElements,
    confirmButton,
    action,
    handleTextChange,
    enableActionButton,
    checkConsent,
    loading
}) => {
    const [occupation, setOccupation] = useState("none");

    const selectOccupation = (event) => {
        setOccupation(event.target.value);
        handleTextChange('occupation', event);
    }

    return (
        <div className="row">
            {formElements.map((x, index) => (
                <Form.Group className="col-md-6 mb-3" key={index}>
                    <Form.Control
                        id={x.value}
                        type={x.type}
                        size="lg"
                        name={x.name}
                        placeholder={x.prop}
                        className="form-control"
                        onBlur={(event) => handleTextChange(x.value, event)}
                        style={{ padding: '1.5rem 1rem', textTransform: x.autoCapitalize ? 'uppercase' : 'none' }}
                        autoComplete="true"
                        required={x.required}
                        maxLength={x.maxLength !== undefined ? x.maxLength : "false"}
                        minLength={x.minLength !== undefined ? x.minLength : "false"}
                    />
                </Form.Group>
            ))}
            <select className="form-select col-md-6 form-select-lg mb-3" aria-label="Select Occupation" id="slctOccupation"
                onChange={(event) => selectOccupation(event)} defaultValue={occupation}
                style={{ marginLeft: 7, width: '49%', height: '11%' }}>
                <option value="none">Select Occupation</option>
                <option value="Salaried">Salaried</option>
                <option value="Self employed">Self-employed</option>
            </select>
            <div className="form-group col-10" style={{ width: '100%', textAlign: 'justify', display: 'flex' }}>
                <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" onClick={checkConsent}
                    aria-label="consent box" aria-describedby="lblConsent" />
                <label className="form-check-label" id="lblConsent" htmlFor="defaultCheck1" style={{ marginLeft: 10 }}>By providing your information, you consent to us using it to contact you for further communication and updates regarding our services. This includes checking your CIBIL score as part of our process to offer tailored financial advice and solutions. We value your privacy and will use your details solely for these purposes. If you have any questions or concerns, please let us know.
                </label>
            </div>
            <div className="form-group button-group" style={{ marginTop: 32, marginBottom:50 }}>
                <Button
                    variant="success"
                    disabled={!enableActionButton || loading}
                    className="button"
                    onClick={!loading ? action : () => { }}
                >
                    {!loading ? confirmButton : <><div className="spinner-border mr-2" role="status" style={{ marginRight: 5 }}></div>Please Wait...</>}
                </Button>
            </div>
        </div>
    )
}

export default UserForm;

UserForm.defaultProps = {
    formTitle: "",
    formElements: null,
    confirmButton: "Ok",
    cancelButton: "Cancel",
    className: ""
};

UserForm.propTypes = {
    formTitle: PropTypes.string,
    className: PropTypes.string
}