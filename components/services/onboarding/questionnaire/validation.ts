import { QuestionnaireData } from "./types";

function validateOtherSingle(selected: string, otherValue: string) {
    if (!selected) return false;
    if (selected === "Other") { return otherValue.trim().length >= 2; }
    return true;
}

function validateOtherMulti(values: string[], otherValue: string) {
    if (values.length === 0) { return false; }
    if (values.includes("Other")) { return otherValue.trim().length >= 2; }
    return true;
}


function requiredText(value: string, message: string, minLength = 1) { return value.trim().length >= minLength ? "" : message; }
function requiredSingleChoice(value: string) { return value ? "" : "Please choose an option."; }
function requiredMultiChoice(values: string[]) { return values.length > 0 ? "" : "Please choose at least one option."; }
function requiredOther(value: string) { return value.trim().length >= 2 ? "" : "Please provide more details."; }


export function getFirstInvalidField(step: number, data: QuestionnaireData): string | null {
    const errors = getStepErrors(step, data);
    const firstError = Object.entries(errors).find(([, value]) => value);
    return firstError ? firstError[0] : null;
}

export function getStepErrors(step: number, data: QuestionnaireData) {
    switch (step) {

        case 0:
            return {
                name: requiredText(data.name, "Please enter your name.", 2),
                email: !data.email.trim()
                    ? "Please enter your email."
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
                        ? "Please enter a valid email address."
                        : "",

                role: requiredSingleChoice(data.role),
                otherrole: data.role === "Other" ? requiredOther(data.otherrole) : "",
                workedTogether: requiredSingleChoice(data.workedTogether),
            };

        case 1:
            return {
                whatBringsYouHere: requiredText(data.whatBringsYouHere, "Please describe what brings you here (min 30 characters).", 30),
                currentSituation: requiredText(data.currentSituation, "Please describe your current situation (min 50 characters).", 50),
                situationType: requiredSingleChoice(data.situationType),
                otherSituation: data.situationType === "Other" ? requiredOther(data.otherSituation) : "",
                urgency: requiredSingleChoice(data.urgency),
                budgetComfort: requiredSingleChoice(data.budgetComfort),
            };


        case 2:
            return {
                successLooksLike: requiredText(data.successLooksLike, "Please describe what success looks like (min 50 characters).", 50),
                goals: requiredMultiChoice(data.goals),
                otherGoal: data.goals.includes("Other") ? requiredOther(data.otherGoal) : "",
            };


        case 3:
            return {
                challenges: requiredText(data.challenges, "Please describe your challenges (min 30 characters).", 30),
                blockers: requiredMultiChoice(data.blockers),
                otherblocker: data.blockers.includes("Other") ? requiredOther(data.otherblocker) : "",
            };


        case 4:
            return {
                existingResources: requiredMultiChoice(data.existingResources),
                otherResource: data.existingResources.includes("Other") ? requiredOther(data.otherResource) : "",
                existingAttempts: requiredText(data.existingAttempts, "Please describe your existing attempts (min 30 characters).", 30),
            };


        case 5:
            return {
                expectations: requiredMultiChoice(data.expectations),
                otherexpectation: data.expectations.includes("Other") ? requiredOther(data.otherexpectation) : "",
                notWanted: requiredText(data.notWanted, "Please describe what you do NOT want (min 10 characters).", 10),
                involvementLevel: requiredSingleChoice(data.involvementLevel),
                learningPreferences: requiredMultiChoice(data.learningPreferences),
                solutionPreference: requiredSingleChoice(data.solutionPreference),
            };


        case 6: return {};

        default: return {};
    }
}

export function validateStep(
    step: number,
    data: QuestionnaireData
) {
    switch (step) {

        case 0:
            return (
                data.name.trim().length >= 2 &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
                data.role.trim().length > 0 &&
                validateOtherSingle(data.role, data.otherrole) &&
                data.workedTogether.trim().length > 0
            );

        case 1:
            return (
                data.whatBringsYouHere.trim().length >= 30 &&
                data.currentSituation.trim().length >= 50 &&
                data.situationType.trim().length > 0 &&
                validateOtherSingle(data.situationType, data.otherSituation) &&
                data.urgency.trim().length > 0 &&
                data.budgetComfort.trim().length > 0
            );

        case 2:
            return (
                data.successLooksLike.trim().length >= 50 &&
                data.goals.length > 0 &&
                validateOtherMulti(data.goals, data.otherGoal)
            );

        case 3: return (
            data.challenges.trim().length >= 30 &&
            validateOtherMulti(data.blockers, data.otherblocker)
        );

        case 4: return (
            validateOtherMulti(data.existingResources, data.otherResource) &&
            data.existingAttempts.trim().length >= 30
        );

        case 5:
            return (
                validateOtherMulti(data.expectations, data.otherexpectation) &&
                data.notWanted.trim().length >= 10 &&
                data.involvementLevel.trim().length > 0 &&
                data.learningPreferences.length > 0 &&
                data.solutionPreference.trim().length > 0
            );

        case 6: return true;

        default: return false;
    }
}