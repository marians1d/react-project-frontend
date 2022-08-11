
export const Search = ({ submitHandler, suggestionsHandler }) => {
        const localHandler = (event) => {
            event.preventDefault();
            submitHandler(event.target.value);
        };

        const localSuggestionHandler = (event) => {
            suggestionsHandler(event.target.value);
        };

        return (
        <div>
            <form onSubmit={localHandler}>
                <input onChange={localSuggestionHandler} name="search" autoComplete="off" />
            </form>

            <ul>
                <li>
                    {}
                </li>
            </ul>
        </div>
    );
};
