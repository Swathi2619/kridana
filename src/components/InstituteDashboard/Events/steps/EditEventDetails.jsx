import React, { useState, useEffect } from "react";
    import { db } from "../../../../firebase";
    import { doc, getDoc, setDoc } from "firebase/firestore";
    import { useNavigate } from "react-router-dom";

    export default function EditEventDetails({ eventId, goBack, setActiveMenu }) {

        const navigate = useNavigate();

        const [form, setForm] = useState({
            organizerName: "",
            volunteersName: "",
            registrationFees: "",
            contactNumber: "",
            email: "",
            emergencyNumber: "",
            documents: "",
            dates: "",
            timings: "",
            address: ""
        });

        const [customers, setCustomers] = useState([]);
        const [management, setManagement] = useState([]);

        useEffect(() => {

            const fetchData = async () => {

                if (!eventId) return;

                const ref = doc(db, "events", eventId);
                const snap = await getDoc(ref);

                if (snap.exists()) {
                    const data = snap.data();

                    setForm(data.form || {});
                    setCustomers(data.customers || []);
                    setManagement(data.management || []);
                }

            };

            fetchData();

        }, [eventId]);


        const handleChange = (e) => {
            setForm({ ...form, [e.target.name]: e.target.value });
        };


        const handleSave = async () => {

            if (!eventId) return;

            await setDoc(
                doc(db, "events", eventId),
                {
                    form,
                    customers,
                    management
                },
                { merge: true }
            );

            alert("Event Updated Successfully");
        };


        const removeCustomer = (index) => {
            setCustomers(customers.filter((_, i) => i !== index));
        };

        const removeManagement = (index) => {
            setManagement(management.filter((_, i) => i !== index));
        };


        return (

            <div className="w-full flex justify-center">

                <div className="w-full max-w-6xl">

                    {/* TITLE */}
                    <h2 className="text-xl font-semibold mb-6">
                        Edit Event Details
                    </h2>

                    {/* FORM GRID */}

                    <div className="grid md:grid-cols-2 gap-6">

                        {/* Organizer Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Organizer Name
                            </label>
                            <input
                                name="organizerName"
                                value={form.organizerName}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            />
                        </div>

                        {/* Volunteers Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Volunteers Name
                            </label>
                            <input
                                name="volunteersName"
                                value={form.volunteersName}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                            />
                        </div>

                        {/* Registration Fees */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Registration Fees
                            </label>
                            <input
                                name="registrationFees"
                                value={form.registrationFees}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Contact Number
                            </label>
                            <input
                                name="contactNumber"
                                value={form.contactNumber}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                E – Mail I’d
                            </label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Emergency Contact */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Emergency Contact Number
                            </label>
                            <input
                                name="emergencyNumber"
                                value={form.emergencyNumber}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Documents */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Additional Documents
                            </label>
                            <input
                                name="documents"
                                value={form.documents}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Dates */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Start date – End date
                            </label>
                            <input
                                name="dates"
                                value={form.dates}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Timings */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Timings
                            </label>
                            <input
                                name="timings"
                                value={form.timings}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Address
                            </label>
                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full border border-orange-300 rounded-md p-2"
                            />
                        </div>

                    </div>


                    {/* CUSTOMERS + MANAGEMENT */}

                    <div className="grid md:grid-cols-2 gap-6 mt-10">

                        {/* CUSTOMERS CARD */}

                        <div className="border border-orange-300 rounded-lg">

                            <div className="flex justify-between items-center px-4 py-2 border-b border-orange-300">

                                <h3 className="font-semibold text-sm">
                                    Edit Customer Details
                                </h3>

                                <button
                                    onClick={() => setActiveMenu("Customer Details")}
                                    className="bg-orange-500 text-white text-xs px-3 py-1 rounded"
                                >
                                    + Add Customers
                                </button>
                            </div>

                            <div className="p-3 space-y-3">

                                {customers.map((c, i) => (

                                    <div
                                        key={i}
                                        className="flex justify-between items-center"
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="w-7 h-7 rounded-full bg-gray-300"></div>

                                            <span className="text-sm">{c.name}</span>

                                        </div>

                                        <button
                                            onClick={() => removeCustomer(i)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* MANAGEMENT CARD */}

                        <div className="border border-orange-300 rounded-lg">

                            <div className="flex justify-between items-center px-4 py-2 border-b border-orange-300">

                                <h3 className="font-semibold text-sm">
                                    Edit Management Details
                                </h3>

                                <button
                                    onClick={() => setActiveMenu("Management Details")}
                                    className="bg-orange-500 text-white text-xs px-3 py-1 rounded"
                                >
                                    + Add Management
                                </button>

                            </div>

                            <div className="p-3 space-y-3">

                                {management.map((m, i) => (

                                    <div
                                        key={i}
                                        className="flex justify-between items-center"
                                    >

                                        <div className="flex items-center gap-3">

                                            <div className="w-7 h-7 rounded-full bg-gray-300"></div>

                                            <span className="text-sm">{m.name}</span>

                                        </div>

                                        <button
                                            onClick={() => removeManagement(i)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                ))}

                            </div>

                        </div>

                    </div>


                    {/* FOOTER BUTTONS */}

                    <div className="flex justify-end gap-4 mt-8">

                        <button
                            onClick={goBack}
                            className="px-6 py-2 border rounded-md"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="px-6 py-2 bg-orange-500 text-white rounded-md"
                        >
                            Save
                        </button>

                    </div>

                </div>

            </div>

        );

    }