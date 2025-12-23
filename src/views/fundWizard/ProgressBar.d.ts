interface ProgressBarProps {
  currentStep: number
  totalSteps?: number
}

declare const ProgressBar: React.FC<ProgressBarProps>
export default ProgressBar
