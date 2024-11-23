import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

export default function HeroPage() {
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const Decode = () => {
      try {
        const token = localStorage.getItem("AccessToken");
        const decode = jwtDecode(token);
        setMail(decode.email);
      } catch (error) {
        console.log(error);
      }
    };
    Decode();
  }, []);

  useEffect(() => {
    const response = async () => {
      try {
        const res = await fetch("api/welcome", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email: mail,
          }),
        });

        const data = await res.json();
        setName(data.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    response();
  }, [mail]);
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-500">Welcome, {name}</h1>
    </div>
  );
}
