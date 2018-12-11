const formElement = document.getElementById("search");

if (formElement) {
    formElement.addEventListener("submit", event => {
        
        const input = document.getElementById("input");
        const query = input.value;
        
        if (!query) {
            alert("Please enter a movie to search for");
            event.preventDefault();
        }

    });
}