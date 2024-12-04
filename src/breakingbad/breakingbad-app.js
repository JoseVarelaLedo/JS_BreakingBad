/**
 * @returns { Promise<Object> } quote information
 */
const fetchQuote = async () => {
    const response = await fetch ('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await response.json();
    return data [0];
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingbadApp = async (element ) => {

    document.querySelector ('#app-title').innerHTML = 'Breaking Bad App';
    element.innerHTML = 'Loading...';

    const quoteLabel = document.createElement ('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';

    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren ( quoteLabel, authorLabel, nextQuoteButton );
    }  
    
    nextQuoteButton.addEventListener ('click', async () => {
        element.innerHTML = 'Loading...';
        fetchQuote()
        .then (  renderQuote );
    });

    fetchQuote()
        .then (  renderQuote );
}