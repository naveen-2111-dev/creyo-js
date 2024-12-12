    "use client";

    import { useState } from "react";
    import Script from "next/script";
    import "tailwindcss/tailwind.css";

    const paymentpage = () => {
    const AMOUNT = 100;
    const [isprocessing, setisProcessing] = useState(false);

    const handlepayment = async () => {
        setisProcessing(!isprocessing);

        try {
        const response = await fetch("api/createorder", {
            method: "POST",
        });
        const data = await response.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZOR_KEY_ID,
            amount: AMOUNT * 100,
            currency: "INR",
            name: "creyo",
            description: "check transaction",
            order_id: data.orderId,
            handler: function (out) {
            console.log("payment success", out);
            },
            prefill: {
            name: "naveen",
            email: "nav@gmail.com",
            contact: "1234567890",
            },
            theme: {
            color: "#3399cc",
            },
        };

        const rzpl = new window.Razorpay(options);
        rzpl.open();
        } catch (error) {
        console.log(error);
        } finally {
        setisProcessing(false);
        }
    };

    return (
        <div className="flex  flex-col items-center justify-center min-h-screen bg-gray-100">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">payment page</h1>
            <p className="mb-4">Amount to pay ${AMOUNT}</p>
            <button
            className="px-4 py-2 bg-blue-500 text-white rounnded hover:bg-blue-600 disabled:bg-gray-400"
            onClick={handlepayment}
            disabled={isprocessing}
            >
            {isprocessing ? "processing..." : "pay now"}
            </button>
        </div>
        </div>
    );
    };

    export default paymentpage;
