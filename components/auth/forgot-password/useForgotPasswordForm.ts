"use client";

import { useState } from "react";
import { ForgotPasswordData, initialForgotPasswordData, } from "./types";

export function useForgotPasswordForm() {
    const [data, setData] = useState<ForgotPasswordData>(
        initialForgotPasswordData
    );

    return { data, setData, };
}