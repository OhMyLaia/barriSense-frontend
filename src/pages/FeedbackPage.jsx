import React from 'react'
import FeedbackForm from '../components/FeedbackForm';
import { axiosCreate } from '../config/axiosCrud';
import { api } from '../config/api-connection-config';


function FeedbackPage() {

    const mockID = 1234;

    const submitForm = async (feedback) => {
        try {
            const data = await axiosCreate(api, "/api/feedbacks/post", feedback);
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
        <div className='min-h-screen flex items-center justify-center bg-gray-200'>

            <div className='
                flex
                flex-col
                justify-center
                items-center
                text-center
                bg-white/40 rounded w-1/2
                text-white mt-50 m-2 px-20'>
                <div>
                    <FeedbackForm
                        userId={mockID}
                        onSubmit={submitForm}
                    />
                </div>
            </div>
        </div>
    );
}

export default FeedbackPage;