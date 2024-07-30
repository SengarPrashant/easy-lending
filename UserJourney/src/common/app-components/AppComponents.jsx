import React from 'react';
import { Card, Modal, Button } from 'react-bootstrap';
import "./AppComponents.scss";

export const AppCard = ({
    cardClass = null,
    styleProp = {},
    onCardClick,
    children
}) => (
    <Card onClick={onCardClick} style={styleProp} className={`${cardClass ?? ""} app-card-main`}>
        <Card.Body>
            {children}
        </Card.Body>
    </Card>
);

export const AppModal = ({
    title = "",
    show = false,
    onClick,
    onClose,
    centered = false,
    confirmButton = "",
    cancelButton = "",
    children
}) => (
    <Modal show={show} onHide={onClose} centered={centered}>
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
            {confirmButton.length > 0 && (
                <Button variant="" size="lg" className="btn-view-doc" onClick={onClick}>
                    <svg
                        width="16px"
                        height="16px"
                        style={{ marginRight: 4 }}
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 3V10H20M6 7H5C4.44772 7 4 7.44772 4 8V20C4 20.5523 4.44772 21 5 21H14C14.5523 21 15 20.5523 15 20V19M8 4V16C8 16.5523 8.44772 17 9 17H19C19.5523 17 20 16.5523 20 16V9.38898C20 9.13879 19.9062 8.89769 19.7372 8.71326L14.7973 3.32428C14.6078 3.11765 14.3404 3 14.0601 3H9C8.44772 3 8 3.44772 8 4Z"
                        />
                    </svg>
                    {confirmButton}
                </Button>
            )}
            {cancelButton.length > 0 && (
                <Button variant="" size="lg" className="btn-close-modal" onClick={onClose}>
                    {cancelButton}
                </Button>
            )}
        </Modal.Footer>
    </Modal>
)

export const StatusIndicator = ({ status, color, className }) => {
    return (
        <div style={{ background: color }} className={`${className ?? ""} status-indicator1`}>
            <span>{status && status.toLocaleUpperCase()}</span>
        </div>
    )
}

