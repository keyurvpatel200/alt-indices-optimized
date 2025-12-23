# Fund Wizard

This is a static HTML-based wizard with 4 steps and a progress bar.

## Components

- **Step1**: First step with basic form inputs (1/4 steps)
- **Step2**: Second step with radio buttons and text area (2/4 steps)
- **Step3**: Third step with date, number, and range inputs (3/4 steps)
- **Step4**: Final step with summary and completion (4/4 steps)
- **Form**: Main form component that handles navigation between the four steps
- **ProgressBar**: Visual progress indicator with border-top styling

## Features

- **Static HTML Structure**: No dynamic API calls or complex state management
- **Progress Bar**: Visual indicator at the top that fills as user progresses
- **4-Step Process**: Simple navigation with Next/Back buttons
- **Responsive Design**: Works on different screen sizes
- **No Charts**: Clean, form-based interface without complex visualizations

## How to Access Fund Wizard

The Fund Wizard can be opened in two ways:

### 1. From Dashboard
- Navigate to the Dashboard
- Click the "Launch" dropdown button
- Select "Fund" from the dropdown menu
- The Fund Wizard modal will open

### 2. From Fund List
- Navigate to the Fund list page
- For any fund card, click the three-dot menu (⋯)
- Select "Fund Wizard" from the dropdown menu
- The Fund Wizard modal will open with the selected fund pre-loaded

## Dependencies

- **React**: For component structure
- **Reactstrap**: For form components and modal
- **CSS Transitions**: For smooth step transitions
- **Custom CSS**: For progress bar styling

## Implementation Details

### Modified Files:
- `src/views/dashboard/Dashboard.jsx` - Added Fund Wizard modal and trigger
- `src/views/fund/Fund.tsx` - Added Fund Wizard modal and functionality
- `src/views/fund/FundListView.tsx` - Added Fund Wizard option to dropdown menu

### New Files:
- `src/views/fundWizard/Form.jsx` - Main form component with 4-step navigation
- `src/views/fundWizard/Step1.jsx` - First step component
- `src/views/fundWizard/Step2.jsx` - Second step component
- `src/views/fundWizard/Step3.jsx` - Third step component
- `src/views/fundWizard/Step4.jsx` - Final step component
- `src/views/fundWizard/ProgressBar.jsx` - Progress bar component
- `src/views/fundWizard/ProgressBar.css` - Progress bar styles
- `src/views/fundWizard/index.jsx` - Export file

## Usage

```jsx
import FundWizard from './views/fundWizard'

// Use the FundWizard component with step management
<FundWizard
  step={currentStep}
  setStep={setCurrentStep}
  setModal={setModal}
  selectedFund={selectedFund} // Optional: pre-selected fund
/>
```

## Progress Bar Features

- **Fixed Position**: Stays at the top of the modal
- **Visual Progress**: Fills from 0% to 100% as user progresses
- **Step Indicators**: Shows numbered circles for each step
- **Border Top**: Green border on the progress fill as requested
- **Smooth Transitions**: Animated progress changes

## Step Structure

1. **Step 1**: Basic form inputs (text, select, checkboxes)
2. **Step 2**: Radio buttons and text area
3. **Step 3**: Date, number, range inputs
4. **Step 4**: Summary and completion with finish button
