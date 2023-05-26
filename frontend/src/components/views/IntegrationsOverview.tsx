import Card from "../ui/Card";

const IntegrationsOverview = () => {
    const integrationStep = [
        {
            step: "1",
            title: "Title",
            subtitle: "Subtitle",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            code: "hello"
        },
        {
            step: "2",
            title: "Title",
            subtitle: "Subtitle",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            code: "hello"
        }
    ]
    return (
        integrationStep.map(step => {
            return (
                <Card key={step.step}>
                    <div>
                        {step.step}

                    </div>
                </Card>
            )

        })
    )
}

export default IntegrationsOverview;