'use client';
import Card from "../ui/Card";
import CardDivider from "../ui/CardDivider";
import CodeBlock from "../ui/CodeBlock";

const IntegrationsOverview = () => {
    const integrationStep = [
        {
            title: "Title",
            subtitle: "Subtitle",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            code: `<div>
    <p>Hello</p>
</div>`
        },
        {
            title: "Title",
            subtitle: "Subtitle",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            code: `<ul>
    <li>This is code</li>
</ul>`
        }
    ]

    return (
        <div className="flex flex-col gap-8 mt-12">
            {integrationStep.map((step, i) => {
                return (
                    <Card key={i}>
                        <div className="flex items-center gap-3">
                            <div className="bg-paynes-gray w-9 h-9 rounded-2 text-white flex items-center justify-center text-h2">
                                {i + 1}
                            </div>
                            <h2 className="text-h2">
                                {step.title}
                            </h2>
                        </div>
                        <CardDivider />
                        <h3 className="text-h3 font-semibold">{step.subtitle}</h3>
                        <p>
                            {step.text}
                        </p>
                        <CodeBlock>
                            {step.code}
                        </CodeBlock>
                    </Card>
                )
            })}
        </div>

    )
}

export default IntegrationsOverview;