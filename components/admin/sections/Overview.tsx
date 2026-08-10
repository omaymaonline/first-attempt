type Props = { userName: string; };

export default function Overview({ userName, }: Props) {
    return (
        <section>

            <h1 className="text-3xl font-semibold">
                Overview
            </h1>

            <p className="mt-4 text-gray-500">
                Overview content will appear here.
                <br />
                for e.g. hello, {userName}
            </p>

        </section>
    );
}