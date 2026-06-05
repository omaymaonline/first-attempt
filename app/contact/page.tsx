"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton"

export default function ContactPage() {
  return (

    <section className="px-6 py-24">

      <div className="mx-auto max-w-2xl">

        {/* Heading */}
        <div className="border-b border-gray-200 pb-1">

          <h1 className="text-5xl text-center leading-tight md:text-6xl">
            Contact Us
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
            Whether you have an idea, a technical problem,
            a collaboration opportunity, or simply wish to say
            as-salamu alaykum, you are warmly welcome to reach out.
          </p>

        </div>

        {/* Form */}
        <div className="mt-16 rounded-3xl border border-gray-200 bg-white/70 p-8 shadow-sm transition duration-500 hover:border-pink-200">

          <form className="space-y-15">

            {/* Name */}
            <div>

              <label htmlFor="name" className="mb-1 block text-xl text-gray-500">
                <b>Name</b>
              </label>

              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition placeholder:text-gray-300 focus:border-pink-400"
              />

            </div>

            {/* Email */}
            <div>

              <label htmlFor="email" className="mb-1 block text-xl text-gray-500">
                <b>Email</b>
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition placeholder:text-gray-300 focus:border-pink-400"
              />

            </div>

            {/* Subject */}
            <div>

              <label htmlFor="subject" className="mb-1 block text-xl text-gray-500">
                <b>Subject</b>
              </label>

              <input
                id="subject"
                type="text"
                placeholder="What would you like to discuss?"
                className="w-full border-b border-gray-300 bg-transparent px-0 py-4 text-lg outline-none transition placeholder:text-gray-300 focus:border-pink-400"
              />

            </div>

            {/* Message */}
            <div>

              <label htmlFor="message" className="mb-1 block text-xl text-gray-500">
                <b>Message</b>
              </label>

              <textarea
                id="message"
                rows={3}
                placeholder="Please write your message thoughtfully..."
                onInput={(e) => {
                  e.currentTarget.style.height = "auto";
                  e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
                }}
                className="w-full resize-none overflow-hidden border-b border-gray-300 bg-transparent px-0 py-4 text-lg leading-relaxed outline-none transition placeholder:text-gray-300 focus:border-pink-400"
              />

            </div>

            {/* Submit */}
            <div className="flex justify-center pt-4">

              <PrimaryButton type="submit">
                Submit
              </PrimaryButton>

            </div>

          </form>

        </div>

        {/* Notice */}
        <div className="mt-10 pt-10">

          <div className="space-y-4 text-sm leading-relaxed text-gray-500">

            <p>
              Please make sure the email address you provide
              belongs to you and is entered correctly.
              Responses will be sent to that address.
            </p>

            <p>
              To keep communication thoughtful and protected from spam and abuse, message submissions are limited to one submission per hour.
            </p>

            <p>
              You may also connect with me on{" "}
              <a href="https://linkedin.com/in/omaymaonline/" target="_blank" rel="noopener noreferrer" className="font-medium underline decoration-gray-300 underline-offset-4 transition duration-300 hover:text-pink-500 hover:decoration-pink-300">
                LinkedIn
              </a>.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}