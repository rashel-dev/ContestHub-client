import React from "react";
import { Link } from "react-router";
import Logo from "../ui/Logo";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-base-200">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-base-content/70 text-sm leading-relaxed">
                            Join exciting contests, showcase your skills, and win amazing prizes. ContestHub is your gateway to competitive excellence.
                        </p>
                        {/* Social Media Links */}
                        <div className="flex gap-3 pt-2">
                            <a
                                href="https://www.facebook.com/mrashel.dev/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Facebook"
                            >
                                <FaFacebookF size={16} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Twitter"
                            >
                                <FaTwitter size={16} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={16} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mohammad-rashel/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn size={16} />
                            </a>
                            <a
                                href="https://github.com/rashel-dev"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                                aria-label="GitHub"
                            >
                                <FaGithub size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-base-content">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/contest" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Contests
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/leaderboard" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Leaderboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/blog" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-base-content">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/faq" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link to="/help" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link to="/terms" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link to="/privacy" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-base-content/70 hover:text-primary transition-colors duration-200 text-sm flex items-center gap-2 group">
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200"></span>
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-base-content">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-base-content/70 text-sm">
                                <MdLocationOn className="text-primary mt-1 shrink-0" size={18} />
                                <span>Chandgaon, Chattogram, Bangladesh</span>
                            </li>
                            <li className="flex items-center gap-3 text-base-content/70 text-sm">
                                <MdEmail className="text-primary shrink-0" size={18} />
                                <a href="mailto:mrashel.dev@gmail.com" className="hover:text-primary transition-colors duration-200">
                                    mrashel.dev@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-base-content/70 text-sm">
                                <MdPhone className="text-primary shrink-0" size={18} />
                                <a href="tel:+8801851588329" className="hover:text-primary transition-colors duration-200">
                                    +8801851588329
                                </a>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-2 text-base-content">Newsletter</h4>
                            <div className="flex gap-2">
                                <input type="email" placeholder="Your email" className="input input-bordered input-sm flex-1 text-sm" />
                                <button className="btn btn-primary btn-sm">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-300">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-base-content/60 text-sm text-center md:text-left">
                            © {currentYear} <span className="font-semibold text-primary">ContestHub</span>. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/sitemap" className="text-base-content/60 hover:text-primary transition-colors duration-200">
                                Sitemap
                            </Link>
                            <Link to="/accessibility" className="text-base-content/60 hover:text-primary transition-colors duration-200">
                                Accessibility
                            </Link>
                            <Link to="/cookies" className="text-base-content/60 hover:text-primary transition-colors duration-200">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
