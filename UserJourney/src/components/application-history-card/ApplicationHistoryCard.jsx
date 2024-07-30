import React from 'react';
import { Button } from 'react-bootstrap';
import { AppCard, StatusIndicator } from '../../common/app-components/AppComponents';
import { COLOR_MAP } from '../../common/utils';
import "./ApplicationHistoryCard.scss";

const ApplicationHistoryCard = ({
    reqId = "",
    arn = "",
    status = "",
    remarks = "",
    onCardClick,
    onButtonClick
}) => {
    const currentColor = COLOR_MAP[status];

    return (
        <AppCard styleProp={{ borderTop: `3px solid ${currentColor}` }} cardClass="app-card-container">
            <header className="app-card-title-container">
                <h5 className="app-card-title">
                    {reqId.length
                        ? <>Req #: {reqId}</>
                        : <>ARN: {arn}</>
                    }
                </h5>
                <StatusIndicator
                    status={status && status.toLocaleUpperCase()}
                    color={currentColor}
                    className="eligibility-status-indicator"
                />
            </header>

            <main className="app-card-body">
                <p>
                    {remarks}
                </p>
            </main>

            <footer className="app-card-footer">
                <Button
                    key={arn}
                    variant=""
                    size="lg"
                    className="btn-view-details"
                    onClick={onButtonClick}
                >
                    Details
                </Button>
            </footer>
        </AppCard>
    )
}

export default ApplicationHistoryCard;
