import LogoGeometry from "./LogoGeometry";

import { ComponentPropsWithoutRef } from "react";

type LogoProps = ComponentPropsWithoutRef<"div"> & {
    title?: string;
};

export default function Logo({ className = "", title = "Omayma Online", ...props
}: LogoProps) {
    return (
        <div
            {...props}
            className={`
                inline-flex
                aspect-[197.77957/156.09582]
                shrink-0
                items-center
                justify-center
                text-current
                ${className}
            `}
        >
            <LogoGeometry
                className="h-full w-full"
                role="img"
                aria-label={title}
            />
        </div>
    );
}