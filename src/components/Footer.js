import React from 'react';
import logo from '../assets/logo.png'; // 1. IMPORT your logo image

// Reusable SVG icons for a cleaner look
const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const Footer = () => {
    return (
        <footer className="bg-amber-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    
                    {/* Column 1: About & Contact */}
                    <div className="space-y-4">
                        {/* 2. REPLACE the h3 text with the img tag */}
                        <img src={logo} alt="Apsara Cafe Logo" className="h-15 w-auto mb-4" />
                        <p className="text-amber-100 text-sm">
                            Your favourite spot in Rohtak for authentic coffee, delicious shakes, and quick drive-through bites.
                        </p>
                        <div className="flex items-start mt-4">
                            <MapPinIcon />
                            <p className="text-sm">
                                3, Raj Garden, Delhi Bypass Road,<br />
                                Near Maharshi Dayanand University,<br />
                                Rohtak, Haryana 124001
                            </p>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon />
                            <a href="tel:09253764022" className="text-sm hover:underline">092537 64022</a>
                        </div>
                    </div>

                    {/* Column 2: Opening Hours */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
                        <div className="space-y-2 text-sm">
                            {['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                                <div key={day} className="flex justify-between">
                                    <span>{day}</span>
                                    <span className="text-amber-100">9:00 am – 10:00 pm</span>
                                </div>
                            ))}
                            <p className="text-xs text-amber-300 pt-2">*Hours might differ on holidays.</p>
                        </div>
                    </div>
                    
                    {/* Column 3: Map */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Find Us Here</h3>
                        <div className="w-full h-56 rounded-lg overflow-hidden shadow-lg">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3494.821473130283!2d76.60603787525389!3d28.87413477546028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d850424608e61%3A0x83f55a153381b82!2sMaharshi%20Dayanand%20University%2C%20Rohtak%2C%20Haryana%20124001!5e0!3m2!1sen!2sin!4v1723824558055!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Apsara Cafe Location"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="border-t border-amber-800 mt-12 pt-6 text-center text-sm text-amber-200">
                    <p>© {new Date().getFullYear()} Apsara Cafe. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;