import React, { useState } from 'react';

const Donate = () => {
    const [formData, setFormData] = useState({
        donorName: '',
        email: '',
        amount: '',
        category: 'General Welfare',
        paymentMethod: 'Bank Transfer',
        notes: ''
    });

    const [loading, setLoading] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/donations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setInvoiceData(data.invoice);
                setFormData({
                    donorName: '',
                    email: '',
                    amount: '',
                    category: 'General Welfare',
                    paymentMethod: 'Bank Transfer',
                    notes: ''
                });
            } else {
                setError(data.message || 'Something went wrong.');
            }
        } catch (err) {
            console.error('Donation submission error:', err);
            setError('Failed to connect to server. Make sure backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-lg border border-emerald-100">
                <div className="bg-emerald-800 py-4 px-6 text-center">
                    <h2 className="text-2xl font-bold text-white">Support Al-Khidmat Foundation</h2>
                    <p className="text-emerald-200 text-sm mt-1">Your contribution brings hope to lives.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name (Optional)</label>
                        <input
                            type="text"
                            name="donorName"
                            value={formData.donorName}
                            onChange={handleChange}
                            placeholder="Anonymous / Your Name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address (Optional)</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="guest@example.com"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Donation Amount (PKR) *</label>
                        <input
                            type="number"
                            name="amount"
                            required
                            min="1"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="e.g. 5000"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Donation Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 text-sm"
                        >
                            <option value="General Welfare">General Welfare</option>
                            <option value="Ration Drive">Ration Drive</option>
                            <option value="Medical Aid">Medical Aid</option>
                            <option value="Emergency Relief">Emergency Relief</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 text-sm"
                        >
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Easypaisa / JazzCash">Easypaisa / JazzCash</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Notes / Message (Optional)</label>
                        <textarea
                            name="notes"
                            rows="2"
                            value={formData.notes}
                            onChange={handleChange}
                            placeholder="Any special instruction..."
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 border p-2 text-sm"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition font-medium shadow-md text-sm"
                    >
                        {loading ? 'Processing...' : 'Donate Now'}
                    </button>
                </form>
            </div>

            {/* Success Invoice Modal */}
            {invoiceData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 border-t-4 border-emerald-600">
                        <div className="text-center mb-4">
                            <span className="text-4xl">🎉</span>
                            <h3 className="text-xl font-bold text-gray-900 mt-2">Donation Successful!</h3>
                            <p className="text-xs text-gray-500">Thank you for making a difference.</p>
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-lg space-y-2 text-sm text-gray-700 mb-4 border border-emerald-100">
                            <div className="flex justify-between">
                                <span className="font-semibold">Invoice ID:</span>
                                <span className="text-emerald-800 font-mono">{invoiceData.invoiceId}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Donor Name:</span>
                                <span>{invoiceData.donorName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Email:</span>
                                <span>{invoiceData.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Category:</span>
                                <span>{invoiceData.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-semibold">Payment via:</span>
                                <span>{invoiceData.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between border-t border-emerald-200 pt-2 font-bold text-emerald-900">
                                <span>Amount Donated:</span>
                                <span>PKR {invoiceData.amount}</span>
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={() => window.print()}
                                className="flex-1 bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition text-sm font-medium"
                            >
                                Print Invoice
                            </button>
                            <button
                                onClick={() => setInvoiceData(null)}
                                className="flex-1 bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition text-sm font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Donate;