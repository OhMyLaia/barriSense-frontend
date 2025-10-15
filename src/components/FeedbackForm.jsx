import { useState } from "react";
import HoodSelect from "./HoodSelect";
import hoods from '../services/hoods.json'

function FeedbackForm({ userId, onSubmit }) {
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
        console.log(feedback)
    };

    return (
        <div className="feedback-form max-w-lg w-full mx-auto mt-10 p-6 bg-white mb-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Nova queixa</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <HoodSelect onSelect={setSelectedHood} className="border border-gray-300 rounded py-1 shadow w-fit px-4" />
                </div>

                <div className="flex flex-col">
                    {/* <label className="mb-2 font-medium text-gray-700">Desfoga't</label> */}
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Estic descontent/a amb..."
                        className="border border-gray-300 rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
                >
                    Enviar
                </button>
            </form>
        </div>
    );
}

export default FeedbackForm;