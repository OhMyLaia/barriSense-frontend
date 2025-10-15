import { useState } from "react";
import FeedbackMap from "./FeedbackMap";
import TouristMap from "./TouristMap";
import MainMap from "./MainMap";

type TabType = 'overview' | 'feedback' | 'tourist';

const TabsContainer = () => {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const tabs = [
        { id: 'overview', label: 'Overview', component: MainMap },
        { id: 'feedback', label: 'Feedback by Districts', component: FeedbackMap },
        { id: 'tourist', label: 'Tourist Numbers', component: TouristMap },
    ];

    const ActiveMap = tabs.find(tab => tab.id === activeTab)?.component || MainMap;

    return (
        <div className="w-full h-full">
            <div className="flex border-b border-gray-200 bg-white">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as TabType)}
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