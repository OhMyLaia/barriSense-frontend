import { useState } from "react";
import MapQuejas from "./MapQuejas";
import OtroMap from "./OtroMap";

const TabsContainer = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'quejas', label: 'Quejas por distrito', component: MapQuejas },
        { id: 'maparandom', label: 'Otromapa', component: OtroMap },
    ];

    const ActiveMap = tabs.find(tab => tab.id === activeTab)?.component || MapQuejas;

    return (
        <div className="w-full h-full">
            <div className="flex border-b border-gray-200 bg-white">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="flex-1">
                <ActiveMap />
            </div>
        </div>
    );
};

export default TabsContainer;