const Error404 = () => {
    return (
        <section className="flex flex-col items-center justify-center h-screen w-full bg-white text-gray-800 gap-2 max-w-1/2 max-h-1/2">
            <img src="src/assets/meditation.png" className="h-2/5" />
            <h1 className="text-6xl font-semibold text-gray-800 mb-4">
                Something&apos;s wrong here.
            </h1>
            <p className="text-lg font-medium text-gray-600 text-center">
                This is a 404 error, which means you&apos;ve clicked on a bad
                link or entered an invalid URL.
            </p>
        </section>
    );
};

export default Error404;
