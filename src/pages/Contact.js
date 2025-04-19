import React, { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_dfspeci", // Replace with your service ID
        "template_nbv6h75", // Replace with your template ID
        form.current,
        "DbL3q_GugiXONVj1d" // Replace with your public key
      )
      .then(
        () => {
          console.log("SUCCESS!");
          setIsSubmitted(true); // Show success message
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Mail className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">gaddamabhiram@gmail.com</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <Phone className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">+91 9398982703</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 p-3 rounded-lg inline-block mb-4">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-gray-600">Guntur, Andhra Pradesh</p>
            </div>
          </div>

          {/* Contact Form */}
          {!isSubmitted ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Send Me a Message</h2>
              <form ref={form} onSubmit={sendEmail}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  Send Message <Send size={20} className="ml-2" />
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
              <p className="text-gray-600">
                Thanks for visiting my website. Your message has been sent
                successfully!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
