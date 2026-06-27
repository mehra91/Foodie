import { useState } from "react";
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [data, setData] = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setData({...data, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
    setSent(true);
     setData({ name: "", email: "", subject: "", message: "" });
  } catch (err) {
    alert("Failed to send! Try again.");
  }
  setLoading(false);
};

  return (
    <div className="min-h-screen bg-[#faf8f5] py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Get in touch</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Contact Us</h1>
          <p className="text-gray-400 text-xs sm:text-sm">Have a question? We'd love to hear from you.</p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            { icon:"📍", title:"Address", info:"123 MG Road, Aligarh, UP" },
            { icon:"📞", title:"Phone", info:"+91 90580 44137" },
            { icon:"✉️", title:"Email", info:"pm7300779625@gmail.com" },
            { icon:"🕐", title:"Hours", info:"Mon–Sun: 10am – 10pm" },
          ].map(item => (
            <div key={item.title} className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-100">
              <p className="text-base sm:text-lg mb-1">{item.icon}</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-700">{item.title}</p>
              <p className="text-xs text-gray-400">{item.info}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-5">Send us a message</h2>

          {sent && (
            <div className="bg-green-50 text-green-600 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm mb-4">
              ✓ Message sent! We'll get back to you within 24 hours.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Full Name</label>
              <input name="name" onChange={onChange} value={data.name} required
                placeholder="Priyanshu Mehra"
                className="w-full h-10 sm:h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm outline-none focus:border-orange-400 transition"/>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email</label>
              <input name="email" type="email" onChange={onChange} value={data.email} required
                placeholder="you@example.com"
                className="w-full h-10 sm:h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm outline-none focus:border-orange-400 transition"/>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-xs text-gray-400 mb-1 block">Subject</label>
            <input name="subject" onChange={onChange} value={data.subject} required
              placeholder="Order issue, feedback..."
              className="w-full h-10 sm:h-11 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm outline-none focus:border-orange-400 transition"/>
          </div>

          <div className="mb-4 sm:mb-5">
            <label className="text-xs text-gray-400 mb-1 block">Message</label>
            <textarea name="message" onChange={onChange} value={data.message} required rows={4}
              placeholder="Tell us how we can help..."
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-sm outline-none focus:border-orange-400 transition resize-none"/>
          </div>

          <button type="submit" disabled={loading}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-3 rounded-xl transition cursor-pointer border-none disabled:opacity-70 w-full sm:w-auto">
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;