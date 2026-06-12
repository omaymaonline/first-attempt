import SecondaryButton from "@/components/buttons/SecondaryButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";

export default function ReviewAnswers() {
    return (
        <section className="mx-10 mt-20 mb-20">

            <div className="grid gap-6 md:grid-cols-2">

                {/* Review */}

                <div className="rounded-3xl border border-gray-200 p-8">

                    <h2 className="text-3xl">
                        Review your answers
                    </h2>

                    <p className="mt-6 leading-relaxed text-gray-600">
                        Your answers are automatically saved as a draft.

                        If you&apos;d like to change, refine, or double-check
                        anything before submitting, you can review everything
                        first.
                    </p>

                    <div className="mt-10 flex justify-center">

                        <SecondaryButton href="/services/onboarding/questionnaire-review">
                            Review Answers
                        </SecondaryButton>

                    </div>

                </div>

                {/* Submit */}

                <div className="rounded-3xl border border-pink-200 bg-pink-50 p-8">

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

                </div>

            </div>

        </section>
    );
}