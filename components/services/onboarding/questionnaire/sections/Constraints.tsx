"use client";

import { QuestionnaireData } from "@/components/services/onboarding/questionnaire/types";

import ShortTextField from "@/components/fields/ShortTextField";
import TextareaField from "@/components/fields/TextareaField";
import MultiSelectCards from "@/components/cards/MultiSelectCards";

import { getStepErrors } from "../validation";

type Props = {
    data: QuestionnaireData;
    setData: React.Dispatch<React.SetStateAction<QuestionnaireData>>;
};

export default function Constraints({
    data,
    setData,
}: Props) {
    const blockers = [
        "Time",
        "Budget",
        "Knowledge",
        "Confidence",
        "Team",
        "Technology",
        "Organisation",
        "Clarity",
        "Other",
    ];

    const errors = getStepErrors(3, data);

    return (
        <div className="space-y-12">

            <TextareaField
                id="challenges"
                label="What challenges are you facing?"
                note="What is currently holding you back? Anything making progress difficult for you? What have you already tried and didn't work? Why didn't it?"
                value={data.challenges}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        challenges: value,
                    }))
                }
                maxLength={2500}
                required
                error={errors.challenges}
            />

            <MultiSelectCards
                id="blockers"
                label="Which of these apply?"
                options={blockers}
                values={data.blockers}
                onChange={(blockers) =>
                    setData((prev) => ({
                        ...prev,
                        blockers,
                    }))
                }
                required
                error={errors.blockers}
            />

            {/* Show ShortTextField if "Other" is one of the selected goals */}
            {Array.isArray(data.blockers) && data.blockers.includes("Other") && (
                <div className="mt-6">
                    <ShortTextField
                        id="otherblocker"
                        label="Please specify"
                        value={data.otherblocker || ""}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                otherblocker: value,
                            }))
                        }
                        placeholder="Write a short description..."
                        maxLength={150}
                        required
                        error={errors.otherblocker}
                    />
                </div>
            )}

        </div>
    );
}