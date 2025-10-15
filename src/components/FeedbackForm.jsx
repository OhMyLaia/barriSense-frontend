import { useState } from "react";
import HoodSelect from "./HoodSelect";
import hoods from '../services/hoods.json'

export default function FeedbackForm({ userId, onSubmit }) {
    const [selectedHood, setSelectedHood] = useState({ id: "", name: "" });
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedHood.id || !content) return; // simple validation
        const feedback = {
            userId,
            hoodId: selectedHood.id,
            hoodName: selectedHood.name,
            content
        };
        onSubmit(feedback);
        setSelectedHood({ id: "", name: "" });
        setContent("");
    };

    return (
        <div className="feedback-form max-w-full h-1/2">
            <h2>Give Feedback</h2>
            <form onSubmit={handleSubmit}>
                <label>Choose a hood:</label>
                <HoodSelect onSelect={setSelectedHood} />

                <label>Content:</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your feedback..."
                />

                <button type="submit">Send</button>
            </form>
        </div>
    );
}