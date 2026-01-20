import React from "react";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3
                            className="text-lg font-bold mb-4"
                            style={{ color: "var(--kuwesa-gold)" }}
                        >
                            Kuwesa
                        </h3>
                        <p className="text-gray-400 text-sm">
                            Providing safe water solutions and supporting
                            artisans in Western Kenya.
                        </p>
                        <p className="text-gray-400 text-sm mt-4">
                            A US 501(c)(3) Organization and Kenyan Community
                            Based Organization
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">
                            Contact Kenya
                        </h4>
                        <p className="text-gray-400 text-sm">
                            P.O BOX 5, - (50309)
                        </p>
                        <p className="text-gray-400 text-sm">
                            KAIMOSI, KENYA
                        </p>
                        <p className="text-gray-400 text-sm">
                            Phone: 011-254-727 640 569
                        </p>
                        <p className="text-gray-400 text-sm">
                            Email: kuwesakenya@gmail.com
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Contact USA</h4>
                        <p className="text-gray-400 text-sm">
                            17 Palm Court
                        </p>
                        <p className="text-gray-400 text-sm">
                            Brooklyn, New York 11225
                        </p>
                        <p className="text-gray-400 text-sm mt-4">
                            Website: www.kuwesakenya.com
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
                    <p>
                        &copy; {new Date().getFullYear()} Kuwesa. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
