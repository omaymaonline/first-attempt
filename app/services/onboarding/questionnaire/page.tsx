import { Suspense } from "react";

import Hero from "@/components/services/onboarding/questionnaire/Hero";
import QuestionnaireForm from "@/components/services/onboarding/questionnaire/QuestionnaireForm";

export default function QuestionnairePage() {
    return (
        <section className="px-6 py-24">
            <div className="mx-auto max-w-4xl">

                <Hero />

                <Suspense fallback={null}>
                    <QuestionnaireForm />
                </Suspense>

            </div>
        </section>
    );
}