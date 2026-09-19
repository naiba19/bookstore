let userName = "Naiba";

function init() {
    renderBooks();
}

function renderBooks() {
    let bookContainer = document.getElementById("book-container");
    bookContainer.innerHTML = "";
    for (let i = 0; i < books.length; i++) {
        bookContainer.innerHTML += getSingleBookTemplate(i);
    }
}

function getSingleBookTemplate(i){
    let book = books[i];

    return `
    <article class="book-card">
    <div class="book-image-container">
    <img src="./images/${book.image}" alt="${book.name}">
    </div>

    <div class="book-content">
    <h2>${book.name}</h2>

    <p class="author">${book.author}</p>

    <div class="book-info">
    <span>${book.publishedYear}></span>
    <span>${book.genre}</span>
    </div>

<div class="book-bottom">
<span class="price">
${getFormattedPrice(book.price)}
</span>

<button class="like-button" onclick="likeDislike(${i})">
♡ ${book.likes}
</button>

</div>
    </div>
    </article>
    `;

}

function getFormattedPrice(price) {
    let priceString = price.toFixed(2);
    let priceString = priceString.replace(".", ".");
    return priceString + "€";
}

function likeDislike(i) {
    if (books[i].liked) {
        books[i].likes--;    
    } else {
        books[i].likes++;
    }
    books[i].liked = !books[i].liked;

    renderBooks();
}

init();