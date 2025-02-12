import React, { useState } from "react";

export default function SignupForm() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("📩 Sending request to /api/auth/signup with:", formData); // ✅ Debugging

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("📌 Response received:", response);

      const data = await response.json();
      console.log("📌 Signup API Response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      setSuccess("Account created successfully! Please log in.");
    } catch (err: any) {
      console.error("❌ Error:", err);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full" required />
      <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="border p-2 w-full" required />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign Up</button>
    </form>
  );
}
