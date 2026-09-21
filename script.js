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

function getSingleBookTemplate(i) {
    let book = books[i];

    return `
        <article class="book-card">
            ${getBookImageTemplate(book)}
            <div class="book-content">
                <h2>${book.name}</h2>
                ${getBookInfoTemplate(book)}
                ${getBookBottomTemplate(book, i)}
                ${getCommentsSectionTemplate(i)}
            </div>
        </article>
    `;
}

function getBookImageTemplate(book) {
    return `
        <div class="book-image-container">
            <img src="./images/${book.image}" alt="${book.name}">
        </div>
    `;
}

function getBookInfoTemplate(book) {
    return `
        <div class="book-info">
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Published year:</strong> ${book.publishedYear}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
        </div>
    `;
}

function getBookBottomTemplate(book, i) {
    return `
        <div class="book-bottom">
            <span class="price">
                ${getFormattedPrice(book.price)}
            </span>
            <button class="like-button ${book.liked ? "liked" : ""}" onclick="likeDislike(${i})">
                ${book.liked ? "♥" : "♡"} ${book.likes}
            </button>
        </div>
    `;
}

function getCommentsSectionTemplate(i) {
    return `
        <div class="comments-section">
            <h3>Comments:</h3>
            <div class="comments-box">
                ${getCommentsTemplate(i)}
            </div>
            ${getCommentInputTemplate(i)}
        </div>
    `;
}

function getCommentInputTemplate(i) {
    return `
        <div class="comment-input">
            <input id="comment-input-${i}" type="text" placeholder="Write your comment...">
            <button onclick="addComment(${i})">➤</button>
        </div>
    `;
}

function getCommentsTemplate(i) {
    let htmlText = "";

    for (let j = 0; j < books[i].comments.length; j++) {
        htmlText += getSingleCommentTemplate(books[i].comments[j]);
    }

    if (htmlText === "") {
        return "Write your comments.";
    }

    return htmlText;
}

function getSingleCommentTemplate(comment) {
    return `
        <div class="single-comment">
            <p>${comment.name}</p>
            <p>${comment.comment}</p>
        </div>
    `;
}

function getFormattedPrice(price) {
    let priceString = price.toFixed(2);
    priceString = priceString.replace(".", ",");
    return priceString + " €";
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

function addComment(i) {
    let input = document.getElementById(`comment-input-${i}`);
    let commentText = input.value.trim();
    if (commentText === "") {
        return;
    }
    books[i].comments.push({
        name: userName,
        comment: commentText
    });
    input.value = "";
    renderBooks();
}

init();
