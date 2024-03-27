1. Start HTML document
2. Define the document structure with the necessary HTML elements:
    - Head section containing meta tags, title, and linked stylesheets
    - Body section with div elements for various sections of the page
3. Include required JavaScript libraries and scripts
4. Define JavaScript variables to reference DOM elements:
    - searchInput, fisrtContainer, favContainer, headingEle, iconelement
5. Define functions for fetching images and creating a slider, and for displaying the first image and related content
6. Attach an event listener to the search input field to handle keypress events:
    a. If the Enter key is pressed:
        i. Prevent the default action
        ii. Get the trimmed value of the input
        iii. If the input value is not empty:
            - Clear the input value
            - Construct a URL for fetching data using the input value
            - Define fetch options including authorization headers
            - Define an async function to fetch data from the URL using fetch API
            - Define another async function to display fetched data:
                - Call the fetch function and await the result
                - Display the first image and related content
                - Fetch additional images and create a slider
            - Call the display function
7. End event listener
8. End script
9. End body
10. End HTML document
