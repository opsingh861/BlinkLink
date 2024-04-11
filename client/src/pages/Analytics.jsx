import { PieChart } from '@/components/PieChart';
import React from 'react';


const Analytics = () => {
    return (
        <div className="flex flex-row m-2 p-4">
            <div className="bg-red w-1/3">
            </div>
            <div className="bg-red w-1/2">
                <PieChart />
            </div>
        </div>
    );
};

export default Analytics;
