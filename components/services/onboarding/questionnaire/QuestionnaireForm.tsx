"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PrimaryButton from "@/components/buttons&links/PrimaryButton";
import SecondaryButton from "@/components/buttons&links/SecondaryButton";

import ProgressBar from "@/components/services/onboarding/questionnaire/ProgressBar";

import AboutYou from "@/components/services/onboarding/questionnaire/sections/AboutYou";
import CurrentSituation from "@/components/services/onboarding/questionnaire/sections/CurrentSituation";
import Goals from "@/components/services/onboarding/questionnaire/sections/Goals";
import Constraints from "@/components/services/onboarding/questionnaire/sections/Constraints";
import Resources from "@/components/services/onboarding/questionnaire/sections/Resources";
import Expectations from "@/components/services/onboarding/questionnaire/sections/Expectations";
import FinalThoughts from "@/components/services/onboarding/questionnaire/sections/FinalThoughts";

import { validateStep, getFirstInvalidField } from "@/components/services/onboarding/questionnaire/validation";
import { useQuestionnaire } from "./hooks/useQuestionnaire";
import ConfirmDialog from "./hooks/ConfirmDialog";

const sections = [
    "About You",
    "Current Situation",
    "Goals",
    "Constraints",
    "Resources & Experience",
    "Expectations & Preferences",
    "Final Thoughts",
];

export default function QuestionnaireForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data, setData, clearDraft } = useQuestionnaire();

    const sectionRef = useRef<HTMLElement>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // Derive current step from URL
    const stepParam = searchParams.get("step");
    const currentStep =
        stepParam !== null
            ? Math.min(Math.max(Number(stepParam) || 0, 0), sections.length - 1)
            : 0;

    const canContinue = validateStep(currentStep, data);

    // Ensure step param exists in URL
    useEffect(() => {
        if (!searchParams.get("step")) {
            router.replace("/services/onboarding/questionnaire?step=0", { scroll: false });
        }
    }, [searchParams, router]);

    // Scroll to section top when step changes
    useEffect(() => {
        if (sectionRef.current) {
            const top = sectionRef.current.offsetTop;
            window.scrollTo({ top: top - 120, behavior: "smooth" });
        }
    }, [currentStep]);

    // Render section by step
    const renderSection = () => {
        switch (currentStep) {
            case 0: return <AboutYou data={data} setData={setData} />;
            case 1: return <CurrentSituation data={data} setData={setData} />;
            case 2: return <Goals data={data} setData={setData} />;
            case 3: return <Constraints data={data} setData={setData} />;
            case 4: return <Resources data={data} setData={setData} />;
            case 5: return <Expectations data={data} setData={setData} />;
            case 6: return <FinalThoughts data={data} setData={setData} />;
            default: return null;
        }
    };

    // Navigation helpers
    const goToStep = (step: number) => {
        if (step !== currentStep) {
            router.push(`/services/onboarding/questionnaire?step=${step}`, { scroll: false });
        }
    };

    const scrollToFirstError = () => {
        const fieldId = getFirstInvalidField(currentStep, data);
        if (fieldId) {
            document.getElementById(fieldId)?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleNext = () => {
        if (!canContinue) {
            scrollToFirstError();
            return;
        }
        if (currentStep === sections.length - 1) {
            router.push("/services/onboarding/discovery-package");
        } else {
            goToStep(Math.min(currentStep + 1, sections.length - 1));
        }
    };

    const handleConfirmClear = () => {
        clearDraft();
        router.replace("/services/onboarding/questionnaire?step=0", { scroll: false });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowConfirm(false);
    };

    // Render
    return (
        <section ref={sectionRef} className="mt-20 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <ProgressBar
                currentStep={currentStep}
                totalSteps={sections.length}
                currentSection={sections[currentStep]}
            />

            {renderSection()}

            {!canContinue && (
                <p className="mt-20 text-sm text-right text-[#ff56ad]">
                    Please complete the required fields before continuing.
                </p>
            )}

            <div className="mt-16 flex items-center justify-between">
                <SecondaryButton onClick={() => goToStep(Math.max(currentStep - 1, 0))}>
                    Previous
                </SecondaryButton>

                <PrimaryButton onClick={handleNext} inactive={!canContinue}>
                    {currentStep === sections.length - 1 ? "Submit" : "Save & Continue"}
                </PrimaryButton>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
                Your draft will remain available if you leave and return later.
            </p>

            <h6 className="text-center mt-8">
                <a
                    href="/services/onboarding/questionnaire-review"
                    className="text-sm text-gray-300 hover:text-gray-500 hover:underline"
                >
                    Review Answers before submitting
                </a>
            </h6>

            <h6 className="text-center">
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowConfirm(true);
                    }}
                    className="mt-8 text-sm text-red-200 hover:text-red-500 hover:underline"
                >
                    Clear Draft
                </a>

                <ConfirmDialog
                    open={showConfirm}
                    title="Clear Draft"
                    message="Are you sure you want to clear your draft? This action cannot be undone."
                    onConfirm={handleConfirmClear}
                    onCancel={() => setShowConfirm(false)}
                />
            </h6>
        </section>
    );
}
