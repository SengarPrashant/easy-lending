import { Steps } from 'rsuite';

const StepIndicator = ({ currentStep, setStep }) => (
    <div style={{ width: '70%', alignItems: "center", display: 'inline-block', marginBottom: 40 }}>
        <Steps current={currentStep}>
            <Steps.Item title="Personal Details" />
            <Steps.Item title="Upload Documents" />
        </Steps>
    </div>
);

export default StepIndicator;