"use client";

import { useEffect, useState } from "react";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

import ReviewSection from "./ReviewSection";

import { QuestionnaireData } from "../questionnaire/types";

import { validateStep } from "../questionnaire/validation";

export default function QuestionnaireReview() {

    const [data, setData] = useState<QuestionnaireData | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("questionnaire");
        if (saved) { setData(JSON.parse(saved)); }
    }, []);

    if (!data) { return (<p className="text-center text-gray-500">No questionnaire data found.</p>); }

    return (
        <div>

            {/* Hero */}

            <div className="text-center">

                <h1 className="text-5xl md:text-6xl">
                    Review Your Answers
                </h1>

                <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-gray-600">
                    Take one final look before continuing.
                </p>

            </div>

            <div className="mt-20 space-y-10">

                <ReviewSection title="About You" editHref="/services/onboarding/questionnaire?step=0" completed={validateStep(0, data)}>
                    <p><strong>Name:</strong> {data.name}</p>

                    <p><strong>Email:</strong> {data.email}</p>

                    <p><strong>Role:</strong> {data.role === "Other" ? data.otherrole : data.role}</p>

                    <p><strong>Have we worked together before?</strong> {data.workedTogether}</p>
                </ReviewSection>

                <ReviewSection title="Current Situation" editHref="/services/onboarding/questionnaire?step=1" completed={validateStep(1, data)}>
                    <p><strong>What brings you here today? </strong>{data.whatBringsYouHere}</p>
                    <p><strong>Your current situation: </strong>{data.currentSituation}</p>
                    <p><strong>Important Information: </strong>{data.importantInfo}</p>
                    <p><strong>Situation: </strong>{data.situationType === "Other" ? data.otherSituation : data.situationType}</p>
                    <p><strong>Urgency: </strong>{data.urgency}</p>
                    <p><strong>How ready are you to invest? </strong>{data.budgetComfort}</p>
                </ReviewSection>

                <ReviewSection title="Goals" editHref="/services/onboarding/questionnaire?step=2" completed={validateStep(2, data)}>
                    <p><strong>What does sucess look like? </strong>{data.successLooksLike}</p>
                    <p><strong>Goals: </strong>{data.goals?.join(", ") + ", " + data.otherGoal}</p>
                </ReviewSection>

                <ReviewSection title="Constraints" editHref="/services/onboarding/questionnaire?step=3" completed={validateStep(3, data)}>
                    <p><strong>Challenges: </strong>{data.challenges}</p>
                    <p>{data.blockers?.join(", ") + ", " + data.otherblocker}</p>
                </ReviewSection>

                <ReviewSection title="Resources & Experience" editHref="/services/onboarding/questionnaire?step=4" completed={validateStep(4, data)}>
                    <p><strong>Resources: </strong>{data.existingResources?.join(", ") + ", " + data.otherResource}</p>
                    <p><strong>Experience: </strong>{data.existingAttempts}</p>
                </ReviewSection>

                <ReviewSection title="Expectations & Preferences" editHref="/services/onboarding/questionnaire?step=5" completed={validateStep(5, data)}>
                    <p><strong>Expectations: </strong>{data.expectations?.join(", ") + ", " + data.otherexpectation}</p>
                    <p><strong>Not Wanted: </strong>{data.notWanted}</p>
                    <p><strong>How involved you are: </strong>{data.involvementLevel}</p>
                    <p><strong>Learning Preference: </strong>{data.learningPreferences?.join(", ")}</p>
                    <p><strong>Soluction Preference: </strong>{data.solutionPreference}</p>
                </ReviewSection>

                <ReviewSection title="Final Thoughts" editHref="/services/onboarding/questionnaire?step=6" completed={validateStep(6, data)}>
                    <p>{data.finalThoughts}</p>
                    <p>{data.anythingElse}</p>
                </ReviewSection>

            </div>

            {/* CTA */}

            <div className="mt-20 rounded-3xl border border-pink-200 bg-pink-50 p-10">
                <div className="text-center">
                    <h2 className="text-3xl"> Everything looks good? </h2>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600"> Continue to learn how the Discovery Process works. </p>
                </div>
                <div className="mt-10 flex flex-col items-center gap-4 md:flex-row md:justify-center">
                    <SecondaryButton href="/services/onboarding/questionnaire"> Back </SecondaryButton>
                    <PrimaryButton href="/services/onboarding/discovery-package"> Continue </PrimaryButton>
                </div>
            </div>

        </div>
    );
}