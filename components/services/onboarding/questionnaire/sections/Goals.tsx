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

export default function Goals({
    data,
    setData,
}: Props) {
    const goalOptions = [
        "Start a business",
        "Grow a business",
        "Build a website",
        "Organise operations",
        "Create content",
        "Build a system",
        "Learn a skill",
        "Improve productivity",
        "Understand my options",
        "Other",
    ];

    const errors = getStepErrors(2, data);

    return (
        <div className="space-y-12">

            <TextareaField
                id="successLooksLike"
                label="What would success look like?"
                note={`Imagine we meet again in six months. What would make you say: "Working on this was worth it"?`}
                value={data.successLooksLike}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        successLooksLike: value,
                    }))
                }
                maxLength={2500}
                required
                error={errors.successLooksLike}
            />

            <MultiSelectCards
                id="goals"
                label="What are you trying to achieve?"
                required
                options={goalOptions}
                values={data.goals}
                onChange={(goals) =>
                    setData((prev) => ({
                        ...prev,
                        goals,
                    }))
                }
                error={errors.goals}
            />

            {/* Show ShortTextField if "Other" is one of the selected goals */}
            {Array.isArray(data.goals) && data.goals.includes("Other") && (
                <div className="mt-6">
                    <ShortTextField
                        id="otherGoal"
                        label="Please specify"
                        value={data.otherGoal || ""}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                otherGoal: value,
                            }))
                        }
                        placeholder="Write a short description..."
                        maxLength={150}
                        required
                        error={errors.otherGoal}
                    />
                </div>
            )}


        </div>
    );
}