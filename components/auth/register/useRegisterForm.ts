"use client";

import { useState } from "react";
import { RegisterData, initialRegisterData } from "./types";


export function useRegisterForm() {
    const [data, setData] = useState<RegisterData>(initialRegisterData);
    return { data, setData };
}