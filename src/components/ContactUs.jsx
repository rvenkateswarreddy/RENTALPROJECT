import React, { useRef } from "react";
import emailjs from "emailjs-com";

import "./Contact.css"; // Import the CSS file for styling
import toast from "react-hot-toast";

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_v8r8oom",
        "template_8o86q5g",
        form.current,
        "GLqnWv9lQro_m3sHo"
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
          toast.success("Email sent successfully!"); // Display success toast
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email."); // Display error toast
        }
      );
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns, feel free to reach out to us. We
        will get back to you as soon as possible.
      </p>

      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <label htmlFor="user_name">Name:</label>
        <input
          className="text-black"
          type="text"
          id="user_name"
          name="user_name"
          required
        />

        <label htmlFor="user_email">Email:</label>
        <input
          className="text-black"
          type="email"
          id="user_email"
          name="user_email"
          required
        />

        <label htmlFor="message">Message:</label>
        <textarea
          className="text-black"
          id="message"
          name="message"
          required
        ></textarea>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
};

export default ContactUs;
