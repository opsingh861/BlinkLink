const ComingSoon = () => {
    return (
        <section className="flex flex-col items-center justify-center h-screen w-full bg-white text-gray-800 gap-2 max-w-1/2 max-h-1/2">
            <h1 className="text-6xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-violet-500 to-violet-900 gradient animate-pulse h-16">
                Coming Soon
            </h1>

            <p className="text-lg font-medium text-gray-600 text-center">
                This page is under construction. Please check back later.
            </p>
        </section>
    );
};

export default ComingSoon;
