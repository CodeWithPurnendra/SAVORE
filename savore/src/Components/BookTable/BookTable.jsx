import React, { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiUsers, FiUser, FiMail, FiPhone, FiCheckCircle } from 'react-icons/fi';

export default function BookTable({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        guests: '2',
        date: '',
        time: '7:00 PM',
        specialRequest: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 12-hour formatted time options
    const timeOptions = [
        '5:00 PM',
        '5:30 PM',
        '6:00 PM',
        '6:30 PM',
        '7:00 PM',
        '7:30 PM',
        '8:00 PM',
        '8:30 PM',
        '9:00 PM',
        '9:30 PM',
        '10:00 PM',
    ];

    // Close modal on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulated API call (Replace with Express endpoint POST /api/reservations)
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 2500);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md transition-opacity">

            {/* Modal Container */}
            <div
                className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-950/80 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center transition-colors cursor-pointer z-10"
                >
                    <FiX className="w-5 h-5" />
                </button>

                {/* Success Overlay */}
                {isSuccess ? (
                    <div className="py-12 flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-4">
                            <FiCheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-2">Table Reserved</h3>
                        <p className="text-neutral-400 text-xs max-w-xs">
                            Confirmation sent to <span className="text-amber-400">{formData.email}</span>. We look forward to hosting you!
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="mb-6">
                            <span className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold block mb-1">
                                Reservations
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-white">
                                Book Your Table
                            </h3>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Name & Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Name</label>
                                    <div className="relative">
                                        <FiUser className="absolute left-3.5 top-3.5 text-neutral-500 w-4 h-4" />
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Alex Mercer"
                                            className="w-full pl-10 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Phone</label>
                                    <div className="relative">
                                        <FiPhone className="absolute left-3.5 top-3.5 text-neutral-500 w-4 h-4" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full pl-10 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60 font-mono"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Email</label>
                                <div className="relative">
                                    <FiMail className="absolute left-3.5 top-3.5 text-neutral-500 w-4 h-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@example.com"
                                        className="w-full pl-10 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60"
                                    />
                                </div>
                            </div>

                            {/* Guests, Date, Time */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Guests</label>
                                    <div className="relative">
                                        <FiUsers className="absolute left-3.5 top-3.5 text-neutral-500 w-4 h-4" />
                                        <select
                                            name="guests"
                                            value={formData.guests}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-2 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Date</label>
                                    <div className="relative">
                                        <FiCalendar className="absolute left-3.5 top-3.5 text-neutral-500 w-4 h-4" />
                                        <input
                                            type="date"
                                            name="date"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-2 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60 [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Time</label>
                                    <div className="relative">
                                        <FiClock className="absolute left-3.5 top-3.5 text-neutral-500 w-4 h-4" />
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-2 py-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60 cursor-pointer"
                                        >
                                            {timeOptions.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Special Requests */}
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">Special Requests (Optional)</label>
                                <textarea
                                    name="specialRequest"
                                    rows="2"
                                    value={formData.specialRequest}
                                    onChange={handleChange}
                                    placeholder="Seating preferences, dietary notes..."
                                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500/60 resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold uppercase text-xs tracking-widest rounded-xl transition-colors cursor-pointer mt-2 disabled:opacity-50"
                            >
                                {isSubmitting ? 'Confirming...' : 'Confirm Reservation'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}