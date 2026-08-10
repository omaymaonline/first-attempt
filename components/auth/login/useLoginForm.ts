"use client";

import { useState } from "react";
import { LoginData, initialLoginData } from "./types";


export function useLoginForm() {
    const [data, setData] = useState<LoginData>(initialLoginData);
    return { data, setData };
}