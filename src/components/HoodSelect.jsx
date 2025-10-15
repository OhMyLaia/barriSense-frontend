import { useState } from "react";
import hoods from "../services/hoods.json";

export default function HoodSelect({ onSelect }) {
    const [selectedHood, setSelectedHood] = useState({ id: "", name: "" });

    const handleChange = (e) => {
        const selected = hoods.find(h => h.codi_barri === e.target.value);
        const hoodObj = { id: selected.codi_barri, name: selected.nom_barri };
        setSelectedHood(hoodObj);
        onSelect(hoodObj);
    };

    return (
        // Added daisyUI classes for proper styling
        <select 
            value={selectedHood.id} 
            onChange={handleChange}
            className="select select-bordered w-full bg-blue-100 text-black max-w-xs"
        >
            <option value="" disabled>
                Selecciona un barri
            </option>

            {hoods.map((hood) => (
                <option key={hood.codi_barri} value={hood.codi_barri}>
                    {hood.nom_barri}
                </option>
            ))}
        </select>
    );
}