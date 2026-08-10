import PrimaryButton from "@/components/buttons&links/PrimaryButton";

export default function Submit() {
    return (
        <section className="mx-20 mt-20 mb-20 rounded-3xl border border-pink-200 bg-pink-50 p-8">

            <h2 className="text-3xl">
                Ready to continue?
            </h2>

            <p className="mt-6 leading-relaxed text-gray-700">
                Once submitted, your questionnaire enters the
                discovery process, and you&apos;ll be taken to the submission and payment step.
            </p>

            <div className="mt-10 flex justify-center">

                <PrimaryButton href="/services/onboarding/payment">
                    Continue to Submission
                </PrimaryButton>

            </div>

        </section>
    );
}