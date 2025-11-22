// ==UserScript==
// @name          old_reddit_comment_images
// @namespace     Violentmonkey Scripts
// @match         *://old.reddit.com/*
// @run-at        document-end
// @grant         none
// @version       1.0
// @author        daboba
// @description   render comment images
// ==/UserScript==

console.log("rendering images");

const comments = [...document.getElementsByClassName("usertext-body")];
comments.forEach(comment => {
  const link = comment.querySelector("a")
  if (link !== undefined && link !== null && link.innerText === "<image>") {
    const image = document.createElement("img");
    image.src = link.href;
    image.style = "max-width:350px";
    link.replaceWith(image);
  }
});
