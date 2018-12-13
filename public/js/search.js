// This was initially to make sure the form wasn't empty and create an alert if it was, but now I'm using the HTML require attribute, so this probably isn't necessary

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