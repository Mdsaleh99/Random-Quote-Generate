const quote = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById("copy");
const tiwtterShareBtn = document.getElementById("twitter");
const quoteExportBtn = document.getElementById("export");

async function generateNewRandomQuote() {
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    JSON.stringify(responseData);
    // console.log(responseData);

    quote.textContent = responseData.data.content;
    quoteAuthor.textContent = `- ${responseData.data.author}`;
  } catch (error) {
    alert("Error", error);
    console.log(error);
  }
}

newQuoteBtn.addEventListener("click", generateNewRandomQuote);
copyBtn.addEventListener("click", () => {
  const combinedText = `"${quote.textContent}",   ${quoteAuthor.textContent}`;
  navigator.clipboard
    .writeText(combinedText)
    .then(() => alert("Quote is copied"))
    .catch((err) => console.log("Failed to copy", err));
});

function exportQuote() {
  const content = `Quote: ${quote.textContent}\n\nAuthor: ${quoteAuthor.textContent}`;
  const blob = new Blob([content], { type: "text/plain" });
  const blobUrl = URL.createObjectURL(blob); // temporary URL for the Blob
  console.log(blobUrl);

  const link = document.createElement("a"); //  temporary download link
  link.href = blobUrl;
  link.download = "Quote.txt";
  document.body.appendChild(link); // Append to the document temporarily and trigger the download
  link.click();

  // Revoke the object URL and remove the link
  URL.revokeObjectURL(blobUrl);
  document.body.removeChild(link);
}

quoteExportBtn.addEventListener("click", exportQuote)

tiwtterShareBtn.addEventListener("click", shareOnTwitter)

function shareOnTwitter() {
  const tweetText = `"${quote.textContent}" Author: ${quoteAuthor.textContent}`;
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`
  console.log(tweetURL);

  window.open(tweetURL, "_blank");
}


/*
https://developer.x.com/en/docs/x-for-websites/tweet-button/guides/web-intent
1. What is a Blob?
    A Blob (Binary Large Object) is a way to store raw binary data in JavaScript. It can hold text, images, audio, or any file-like data. You can create a Blob using the Blob constructor.  https://developer.mozilla.org/en-US/docs/Web/API/Blob

2. What is URL.createObjectURL?
    The URL.createObjectURL(blob) method takes a Blob and creates a temporary URL that can be used to access the Blob data.    https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static

3. What is encodeURIComponent()?
    encodeURIComponent() is a JavaScript function that makes text safe for URLs by converting special characters into a format that can be used in a URL.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    The <a> tag is created temporarily, used for the download, and then removed.
    URL.revokeObjectURL(url); properly clears memory after usage.
    No multiple <a> tags are appended inside quoteExportBtn.
*/