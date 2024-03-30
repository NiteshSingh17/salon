import { ScreenContainer, ScreenHeader, StepsSlider } from '@salon/ui';
import { useState } from 'react';
import { GetTodayDate } from '../../utils/helper';
import { ConfirmBooking } from './confirmBooking';
import { CreateBookingForm } from './createBookingForm';

export const CreateBooking = () => {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    time: null,
    date: GetTodayDate(),
    services: [],
    selectedTime: null,
  });

  const [currentStep, setCurrentStep] = useState(0);

  return (
    <ScreenContainer>
      <ScreenHeader title="Create Booking" />
      <StepsSlider setCurrentStep={setCurrentStep} currentStep={currentStep}>
        <CreateBookingForm
          handleNext={() => setCurrentStep(1)}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
        <ConfirmBooking bookingData={bookingData} />
      </StepsSlider>
    </ScreenContainer>
  );
};
