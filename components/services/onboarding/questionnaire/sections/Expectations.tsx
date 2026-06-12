"use client";

import { QuestionnaireData } from "@/components/services/onboarding/questionnaire/types";

import ShortTextField from "@/components/fields/ShortTextField";
import TextareaField from "@/components/fields/TextareaField";
import SingleSelectCards from "@/components/cards/SingleSelectCards";
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
    const expectations = [
        "Roadmap & Clarity",
        "Second Opinion",
        "Website recommendation and planning",
        "Business guidance",
        "Technical guidance",
        "Learning path",
        "Implementation help and support",
        "System Organisation",
        "Other",
    ];

    const involvement = [
        "I want to learn and do most things myself.",
        "I want guidance while implementing.",
        "I want someone to build most of it.",
        "Not sure yet.",
    ];

    const learning = [
        "Videos",
        "Reading",
        "Templates",
        "Step-by-step instructions",
        "Live discussions",
    ];

    const solution = [
        "Simplest possible",
        "Balanced",
        "Long-term scalable",
        "Not sure",
    ];

    const errors = getStepErrors(5, data);

    return (
        <div className="space-y-12">

            <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6">
                <p className="leading-relaxed text-gray-700"> Since different people need different things, help me understand what would be most valuable to you. </p>
            </div>

            <MultiSelectCards
                id="expectations"
                label="At the end of this process, what would make you feel this was worth your investment?"
                options={expectations}
                values={data.expectations}
                onChange={(expectations) =>
                    setData((prev) => ({
                        ...prev,
                        expectations,
                    }))
                }
                required
                error={errors.expectations}
            />

            {/* Show ShortTextField if "Other" is one of the selected goals */}
            {Array.isArray(data.expectations) && data.expectations.includes("Other") && (
                <div className="mt-6">
                    <ShortTextField
                        id="otherexpectation"
                        label="Please specify"
                        value={data.otherexpectation || ""}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                otherexpectation: value,
                            }))
                        }
                        placeholder="Write a short description..."
                        maxLength={150}
                        required
                        error={errors.otherexpectation}
                    />
                </div>
            )}

            <TextareaField
                id="notWanted"
                label="What do you NOT want? Why? Examples: social media, subscriptions, complexity... etc"
                value={data.notWanted}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        notWanted: value,
                    }))
                }
                maxLength={1500}
                required
                error={errors.notWanted}
            />

            <SingleSelectCards
                id="involvementLevel"
                label="How involved do you want to be?"
                options={involvement}
                value={data.involvementLevel}
                onChange={(involvementLevel) =>
                    setData((prev) => ({
                        ...prev,
                        involvementLevel,
                    }))
                }
                required
                error={errors.involvementLevel}
            />


            <MultiSelectCards
                id="learningPreferences"
                label="How do you prefer learning?"
                options={learning}
                values={data.learningPreferences}
                onChange={(learningPreferences) =>
                    setData((prev) => ({
                        ...prev,
                        learningPreferences,
                    }))
                }
                required
                error={errors.learningPreferences}
            />

            <SingleSelectCards
                id="solutionPreference"
                label="What kind of solution do you prefer?"
                required
                options={solution}
                value={data.solutionPreference}
                onChange={(solutionPreference) =>
                    setData((prev) => ({
                        ...prev,
                        solutionPreference,
                    }))
                }
                error={errors.solutionPreference}
            />


        </div>
    );
}