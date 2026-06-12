export type QuestionnaireData = {

    /* ABOUT YOU */

    name: string;
    email: string;
    role: string;
    otherrole: string;
    workedTogether: string;

    /* CURRENT SITUATION */

    whatBringsYouHere: string;
    currentSituation: string;
    importantInfo: string;

    situationType: string;
    otherSituation: string;
    urgency: string;
    budgetComfort: string;

    /* GOALS */

    successLooksLike: string;
    goals: string[];
    otherGoal: string;

    /* CONSTRAINTS */

    challenges: string;
    blockers: string[];
    otherblocker: string;

    /* RESOURCES */

    existingResources: string[];
    otherResource: string;
    existingAttempts: string;

    /* EXPECTATIONS */

    expectations: string[];
    otherexpectation: string;
    notWanted: string;

    involvementLevel: string;
    learningPreferences: string[];
    solutionPreference: string;

    /* FINAL THOUGHTS */

    finalThoughts: string;
    anythingElse: string;
};

export const initialQuestionnaireData: QuestionnaireData = {
    name: "",
    email: "",
    role: "",
    otherrole: "",
    workedTogether: "",

    whatBringsYouHere: "",
    currentSituation: "",
    importantInfo: "",
    situationType: "",
    otherSituation: "",
    urgency: "",
    budgetComfort: "",

    successLooksLike: "",
    goals: [],
    otherGoal: "",

    challenges: "",
    blockers: [],
    otherblocker: "",

    existingResources: [],
    otherResource: "",
    existingAttempts: "",

    expectations: [],
    otherexpectation: "",
    notWanted: "",
    involvementLevel: "",
    learningPreferences: [],
    solutionPreference: "",

    finalThoughts: "",
    anythingElse: "",
};