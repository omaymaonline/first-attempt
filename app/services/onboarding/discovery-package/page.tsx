import Process from "@/components/services/onboarding/discovery-package/Process";
import Pricing from "@/components/services/onboarding/discovery-package/Pricing";
import ReviewAnswers from "@/components/services/onboarding/discovery-package/Review&Submit";

export default function DiscoveryPackage() {
    return (
        <div className="space-y-12">

            <div className="text-center">

                <h1 className="mt-30 text-5xl md:text-6xl"> Discovery Package </h1>

                <p className="mx-auto mt-4 max-w-2xl text-xl leading-relaxed text-gray-600">
                    You&apos;ve successfully completed the questionnaire.
                </p>

            </div>

            <Process />

            <Pricing />

            <ReviewAnswers />

        </div>
    );
}