"use client";

import { QuestionnaireData } from "@/components/services/onboarding/questionnaire/types";

import TextareaField from "@/components/fields/TextareaField";

type Props = {
    data: QuestionnaireData;
    setData: React.Dispatch<React.SetStateAction<QuestionnaireData>>;
};

export default function Constraints({
    data,
    setData,
}: Props) {


    return (
        <div className="space-y-12">

            <TextareaField
                label="Is there anything you think I should know? Something that feels important, even if it seems unrelated, feel free to mention it here."
                value={data.finalThoughts}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        finalThoughts: value,
                    }))
                }
                maxLength={2500}
            />

            <TextareaField
                label="Anything else? Example: links, references, examples, documents or inspiration?"
                value={data.anythingElse}
                onChange={(value) =>
                    setData((prev) => ({
                        ...prev,
                        anythingElse: value,
                    }))
                }
                maxLength={2500}
            />

        </div>
    );
}