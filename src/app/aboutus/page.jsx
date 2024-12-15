import Footer from "../components/Footer/Footer";

const page = () => {
    return (
        <div className="space-y-40">
            <div>
                <section className="bg-gray-100 py-10">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="text-center mb-10">
                            <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
                            <p className="mt-4 text-gray-600">
                                Discover who we are and what drives us.
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-10">
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800">Our Story</h2>
                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    It all started with a simple idea: to create meaningful solutions
                                    for everyday challenges.
                                </p>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
                                <p className="mt-4 text-gray-600 leading-relaxed">
                                    Our mission is to empower individuals and businesses with
                                    cutting-edge solutions tailored to their needs.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default page;