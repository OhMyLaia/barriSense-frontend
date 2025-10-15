import { useState } from "react";

const InputQuejas = () => {
    const [queja, setQueja] = useState("");
    const [barrio, setBarrio] = useState(""); // Add barrio state
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!queja.trim()) {
            alert("Por favor, introduce una queja");
            return;
        }

        if (!barrio) {
            alert("Por favor, selecciona un barrio");
            return;
        }

        setIsLoading(true);

        try {
            //queja objeto
            const quejaObject = {
                barrio: barrio,
                contenido: queja
            };
            
            console.log("Guardando queja:", quejaObject);

            // Simular llamada a API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Limpiar el input después de guardar
            setQueja("");
            setBarrio(""); // Reset barrio selection
            alert("Queja guardada exitosamente");
        } catch (error) {
            console.error("Error al guardar la queja:", error);
            alert("Error al guardar la queja");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Registrar Queja
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="barris" className="block text-sm font-medium text-gray-700 mb-2">
                        Elije el barrio:
                    </label>
                    <select 
                        name="barris" 
                        id="barris"
                        value={barrio}
                        onChange={(e) => setBarrio(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                        disabled={isLoading}
                    >
                        <option value="">Selecciona un barrio</option>
                        {["Ciutat Vella", "Eixample", "Les Corts"].map(option =>
                            <option key={option} value={option}>{option}</option>
                        )}
                    </select>
                    
                    <label
                        htmlFor="queja"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Contenido de la queja
                    </label>
                    <textarea
                        id="queja"
                        value={queja}
                        onChange={(e) => setQueja(e.target.value)}
                        placeholder="Describe tu queja aquí..."
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical min-h-[100px]"
                        disabled={isLoading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading || !queja.trim() || !barrio}
                    className="w-full py-2 px-4 bg-blue-600 font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? "Guardando..." : "Guardar Queja"}
                </button>
            </form>
        </div>
    );
};

export default InputQuejas;