import { useAppSelector } from "../store";

function ExamplePage() {
    const { data, currentToken, globalMode } = useAppSelector(
        (state) => state.auth
    );

    return (
        <div>
            ExamplePage
            <p>{globalMode ? "modo global" : "tenant"}</p>
            <pre>{JSON.stringify(currentToken, null, 2)}</pre>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default ExamplePage;
