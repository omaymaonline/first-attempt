"use client";

import { QuestionnaireData } from "@/components/services/onboarding/questionnaire/types";

import ShortTextField from "@/components/fields/ShortTextField";
import SingleSelectCards from "@/components/cards/SingleSelectCards";

import { getStepErrors } from "../validation";

type Props = {
    data: QuestionnaireData;
    setData: React.Dispatch<React.SetStateAction<QuestionnaireData>>;
};

export default function AboutYou({
    data,
    setData,
}: Props) {
    const roles = [
        "Student",
        "Freelancer",
        "Business Owner",
        "Employee",
        "Creator",
        "Non-profit",
        "Other",
    ];

    const workedTogetherOptions = [
        "Yes",
        "No",
    ];

    const errors = getStepErrors(0, data);

    return (
        <div className="space-y-12">

            {/* Name */}

            <ShortTextField
                id="name"
                label="What should we call you?"
                placeholder="Your name"
                value={data.name}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        name: value,
                    }))
                }
                required
                error={errors.name}
            />

            {/* Email */}

            <ShortTextField
                id="email"
                label="Email"
                placeholder="you@example.com"
                type="email"
                value={data.email}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        email: value,
                    }))
                }
                required
                error={errors.email}
            />

            {/* Role */}

            <SingleSelectCards
                id="role"
                label="What best describes you?"
                required
                options={roles}
                value={data.role}
                onChange={(role) =>
                    setData((prev) => ({
                        ...prev,
                        role,
                    }))
                }
                error={errors.role}
            />

            {/* Show ShortTextField if "Other." is selected */}
            {data.role === "Other" && (
                <div className="mt-6">
                    <ShortTextField
                        id="otherrole"
                        label="Please specify"
                        value={data.otherrole || ""}
                        onChange={(value) =>
                            setData((prev) => ({
                                ...prev,
                                otherrole: value,
                            }))
                        }
                        placeholder="Write a short description..."
                        maxLength={150}
                        required
                        error={errors.otherrole}
                    />
                </div>
            )}


            {/* Worked Together */}
            <SingleSelectCards
                id="workedTogether"
                label="Have we worked together before?"
                required
                options={workedTogetherOptions}
                value={data.workedTogether}
                onChange={(workedTogether) =>
                    setData((prev) => ({
                        ...prev,
                        workedTogether,
                    }))
                }
                error={errors.workedTogether}
            />

        </div>
    );
}