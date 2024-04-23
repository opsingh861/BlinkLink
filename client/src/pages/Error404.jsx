import Button from "@/components/Button";
import { meditation } from "@/lib/imagesExport";

const Error404 = () => {
    return (
        <section className="flex flex-col items-center justify-center h-screen w-full bg-white text-gray-800 gap-2 max-w-1/2 max-h-1/2">
            <img src={meditation} className="h-2/5" />
            <h1 className="text-6xl font-semibold text-gray-800 mb-4">
                Something&apos;s wrong here.
            </h1>
            <p className="text-lg font-medium text-gray-600 text-center">
                This is a 404 error, which means you&apos;ve clicked on a bad
                link or entered an invalid URL.
            </p>
            <Button
                label="Go Back"
                onClick={() => {
                    window.history.back();
                }}
                className="bg-blue-500 hover:bg-blue-600 mt-4 rounded-md text-white px-4 py-2 font-semibold"
            />
        </section>
    );
};

export default Error404;
