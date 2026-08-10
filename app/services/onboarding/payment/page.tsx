import Pricing from "@/components/services/onboarding/discovery-package/Pricing";
import Payment from "@/components/services/onboarding/payment/Payment";

export default function PaymentPage() {
    return (
        <section className="px-6 py-24">

            <div className="mx-auto max-w-4xl">

                <Pricing />

                <Payment />

            </div>

        </section>
    );
}