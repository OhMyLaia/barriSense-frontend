import React from 'react'
import FeedbackForm from '../components/FeedbackForm';
import { axiosCreate } from '../config/axiosCrud'


function FeedbackPage() {

    const mockID = 1234;

    const submitForm = async (feedback) => {
        try {
            const data = await axiosCreate(axiosInstance, "/api/feedbacks/post", feedback);
            if (data) {
                console.log("Feedback submitted successfully:", data);
                // Optionally show a success message or redirect
            } else {
                console.error("Feedback submission failed");
            }
        } catch (error) {
            console.error("Unexpected error submitting feedback:", error);
        }
    };

    return (
        <div className='bg-red-500 w-full text-white m-50'>

            <FeedbackForm
                userId={mockID}
                onSubmit={submitForm}
            />
        </div>
    );
}

export default FeedbackPage;