export default function Pricing() {
    return (
        <div className="mx-10 rounded-3xl border border-gray-200 p-8">

            <h2 className="text-3xl">
                Pricing & Commitment
            </h2>

            <div className="mt-8 space-y-6 text-lg leading-relaxed text-gray-700">

                <p>
                    The Discovery Process begins with a
                    <span className="font-medium"> 1,500 DZD commitment fee</span>.
                </p>

                <p>
                    This fee protects both sides, reserves review time,
                    and helps filter unserious inquiries.
                </p>

                <p>
                    The commitment fee is deducted from the final
                    Discovery Package price.
                </p>

                <p>
                    Final pricing depends on the scope, complexity,
                    and deliverables required.
                </p>

            </div>

            {/* Example */}

            <div className="mt-10 rounded-2xl border border-pink-200 bg-pink-50 p-6">

                <p className="mb-6 text-sm uppercase tracking-[0.2em] text-pink-600">
                    Example
                </p>

                <div className="space-y-4">

                    <div className="flex justify-between">

                        <span>Discovery Package</span>

                        <span>6,000 DZD</span>

                    </div>

                    <div className="flex justify-between text-pink-600">

                        <span>Commitment Fee</span>

                        <span>-1,500 DZD</span>

                    </div>

                    <div className="flex justify-between border-t border-pink-200 pt-4 font-medium">

                        <span>Remaining Balance</span>

                        <span>4,500 DZD</span>

                    </div>

                </div>

            </div>

        </div>
    );
}