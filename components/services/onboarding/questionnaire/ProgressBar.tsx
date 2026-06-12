type Props = {
    currentStep: number;
    totalSteps: number;
    currentSection: string;
};

export default function ProgressBar({
    currentStep,
    totalSteps,
    currentSection,
}: Props) {
    const progress = ((currentStep + 1) / totalSteps) * 100;

    return (
        <div className="mb-12">

            <div className="mb-3 flex items-center justify-between">

                <p className="text-sm text-gray-500"> {currentSection} </p>

                <p className="text-sm text-gray-500"> {currentStep + 1} / {totalSteps} </p>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">

                <div className="h-full rounded-full bg-pink-500 transition-all duration-500" style={{ width: `${progress}%`, }} />

            </div>

        </div>
    );
}