import { useState, useEffect } from "react";
import { ContactData, initialContactData } from "./types";

export function useContactForm() {
  const [data, setData] = useState<ContactData>(initialContactData);

  useEffect(() => {
    const saved = localStorage.getItem("contactForm");
    if (saved) setData(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("contactForm", JSON.stringify(data));
  }, [data]);

  const clearDraft = () => {
    localStorage.removeItem("contactForm");
    setData(initialContactData);
  };

  return { data, setData, clearDraft };
}
