"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import SecondaryButton from "@/components/buttons/SecondaryButton";

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

    const [currentStep, setCurrentStep] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    const canContinue = validateStep(currentStep, data);

    useEffect(() => {
        const step = searchParams.get("step");
        if (!step) return;
        const parsed = Number(step);
        if (!Number.isNaN(parsed) && parsed >= 0 && parsed < sections.length) {
            setCurrentStep(parsed);
        }
    }, [searchParams]);

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

    const scrollToSectionTop = () => {
        if (sectionRef.current) {
            const top = sectionRef.current.offsetTop;
            window.scrollTo({ top: top - 120, behavior: "smooth" });
        }
    };

    const goToStep = (step: number) => {
        setCurrentStep(step);
        router.push(`/services/onboarding/questionnaire?step=${step}`, { scroll: false });
    };

    useEffect(() => {
        if (!searchParams.get("step")) {
            router.replace("/services/onboarding/questionnaire?step=0", { scroll: false });
        }
    }, [searchParams, router]);

    useEffect(() => { scrollToSectionTop(); }, [currentStep]);

    const scrollToFirstError = () => {
        const fieldId = getFirstInvalidField(currentStep, data);
        if (!fieldId) return;
        document.getElementById(fieldId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const handleNext = () => {
        if (!canContinue) {
            scrollToFirstError();
            return;
        }
        if (currentStep === sections.length - 1) {
            router.push("/services/onboarding/questionnaire-review");
            return;
        }
        goToStep(Math.min(currentStep + 1, sections.length - 1));
    };

    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirmClear = () => {
        clearDraft();
        setCurrentStep(0);
        router.replace("/services/onboarding/questionnaire?step=0", { scroll: false });
        window.scrollTo({ top: 0, behavior: "smooth" });
        setShowConfirm(false);
    };

    return (
        <section ref={sectionRef} className="mt-20 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <ProgressBar currentStep={currentStep} totalSteps={sections.length} currentSection={sections[currentStep]} />

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

                <PrimaryButton disabled={false} onClick={handleNext} inactive={!canContinue}>
                    {currentStep === sections.length - 1 ? "Review Answers" : "Save & Continue"}
                </PrimaryButton>
            </div>

            <h6 className="mt-8 text-center text-sm text-gray-500">
                Your draft will remain available if you leave and return later.
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowConfirm(true);
                    }}
                    className="mt-8 text-sm text-red-200 hover:text-red-500"
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
