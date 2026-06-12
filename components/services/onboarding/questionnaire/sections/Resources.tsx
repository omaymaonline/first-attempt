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
    const had = [
        "Website",
        "Brand",
        "Social Media",
        "Email List",
        "Customers",
        "Products",
        "Team",
        "Systems",
        "Other",
    ];

    const errors = getStepErrors(4, data);

    return (
        <div className="space-y-12">

            <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6">
                <p className="leading-relaxed text-gray-700"> This section prevents us from recommending same things you already have. </p>
            </div>


            <MultiSelectCards
                id="existingResources"
                label="Do you already have:"
                options={had}
                values={data.existingResources}
                onChange={(existingResources) =>
                    setData((prev) => ({
                        ...prev,
                        existingResources,
                    }))
                }
                required
                error={errors.existingResources}
            />

            {/* Show ShortTextField if "Other" is one of the selected goals */}
            {Array.isArray(data.existingResources) && data.existingResources.includes("Other") && (
                <div className="mt-6">
                    <ShortTextField
                        id="otherResource"
                        label="Please specify"
                        value={data.otherResource || ""}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                otherResource: value,
                            }))
                        }
                        placeholder="Write a short description..."
                        maxLength={150}
                        required
                        error={errors.otherResource}
                    />
                </div>
            )}


            <TextareaField
                id="existingAttempts"
                label="What do you already use or want to?"
                note="Any tools, frameworks, ideas..? Describe how you used them, why they worked for you, or why you wanted to use them. Jump everything down."
                value={data.existingAttempts}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        existingAttempts: value,
                    }))
                }
                maxLength={2500}
                required
                error={errors.existingAttempts}
            />

        </div>
    );
}