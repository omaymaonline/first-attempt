import { useEffect, useState } from "react";

import { QuestionnaireData, initialQuestionnaireData } from "@/components/services/onboarding/questionnaire/types";

export function useQuestionnaire() {
    const [data, setData] = useState<QuestionnaireData>(initialQuestionnaireData);

    useEffect(() => {
        const savedDraft = localStorage.getItem("questionnaire");
        if (savedDraft) { setData(JSON.parse(savedDraft)); }
    }, []);

    useEffect(() => { localStorage.setItem("questionnaire", JSON.stringify(data)); }, [data]);

    const clearDraft = () => {
        localStorage.removeItem("questionnaire");
        setData(initialQuestionnaireData);
    };

    return { data, setData, clearDraft, };
}