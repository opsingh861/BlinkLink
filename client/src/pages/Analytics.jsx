import { PieChart } from "@/components/PieChart";

const Analytics = () => {
    return (
        <div className="flex m-2 p-4">
            <div className="border border-blue-500 w-1/3"></div>
            <div className="border border-red-400 w-1/2">
                <PieChart />
            </div>
        </div>
    );
};

export default Analytics;
