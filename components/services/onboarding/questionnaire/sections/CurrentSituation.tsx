"use client";

import { QuestionnaireData } from "@/components/services/onboarding/questionnaire/types";

import TextareaField from "@/components/fields/TextareaField";
import SingleSelectCards from "@/components/cards/SingleSelectCards";
import ShortTextField from "@/components/fields/ShortTextField";

import { getStepErrors } from "../validation";

type Props = {
    data: QuestionnaireData;
    setData: React.Dispatch<React.SetStateAction<QuestionnaireData>>;
};

export default function CurrentSituation({
    data,
    setData,
}: Props) {
    const situationOptions = [
        "I want to start something.",
        "I already started but feel stuck.",
        "My systems feel messy.",
        "I need an online presence.",
        "I need technical guidance.",
        "I am exploring possibilities.",
        "Other",
    ];

    const urgencyOptions = [
        "Just exploring",
        "This month",
        "Within 3 months",
        "Immediately",
    ];

    const budgetOptions = [
        "I am exploring options.",
        "I am comfortable investing in the right solution.",
        "I have a specific budget in mind.",
        "Not sure yet.",
    ];

    const errors = getStepErrors(1, data);


    return (
        <div className="space-y-12">

            {/* What brings you here */}
            <TextareaField
                id="whatBringsYouHere"
                label="What brings you here today?"
                value={data.whatBringsYouHere}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        whatBringsYouHere: value,
                    }))
                }
                maxLength={2000}
                required
                error={errors.whatBringsYouHere}
            />

            {/* Current Situation */}
            <TextareaField
                id="currentSituation"
                label="Describe your current situation."
                value={data.currentSituation}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        currentSituation: value,
                    }))
                }
                maxLength={3000}
                required
                error={errors.currentSituation}
            />

            {/* Important Information */}
            <TextareaField
                label="Is there anything important you feel I should know?"
                value={data.importantInfo}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        importantInfo: value,
                    }))
                }
                maxLength={2000}
            />

            {/* Situation Type */}

            <SingleSelectCards
                id="situationType"
                label="Which of these feels closest?"
                required
                options={situationOptions}
                value={data.situationType}
                onChange={(situationType) =>
                    setData((prev) => ({
                        ...prev,
                        situationType,
                    }))
                }
                error={errors.situationType}
            />

            {/* Show ShortTextField if "Other." is selected */}
            {data.situationType === "Other" && (
                <div className="mt-6">
                    <ShortTextField
                        id="otherSituation"
                        label="Please specify"
                        value={data.otherSituation || ""}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                otherSituation: value,
                            }))
                        }
                        placeholder="Write a short description..."
                        maxLength={150}
                        required
                        error={errors.otherSituation}
                    />
                </div>
            )}


            {/* Urgency */}
            <SingleSelectCards
                id="urgency"
                label="How urgent is this?"
                required
                options={urgencyOptions}
                value={data.urgency}
                onChange={(urgency) =>
                    setData((prev) => ({
                        ...prev,
                        urgency,
                    }))
                }
                error={errors.urgency}
            />


            {/* Budget Comfort */}

            <SingleSelectCards
                id="budgetComfort"
                label="This helps me understand your situation. It is not a commitment and does not lock you into any pricing."
                required
                options={budgetOptions}
                value={data.budgetComfort}
                onChange={(budgetComfort) =>
                    setData((prev) => ({
                        ...prev,
                        budgetComfort,
                    }))
                }
                error={errors.budgetComfort}
            />

        </div>

    );
}