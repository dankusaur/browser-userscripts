// ==UserScript==
// @name          render-images.reddit
// @namespace     Violentmonkey Scripts
// @match         *://old.reddit.com/*
// @run-at        document-end
// @grant         none
// @version       1.0
// @author        daboba
// @description   render comment images
// ==/UserScript==

const prerenderCommentsClass = "usertext-body";
const renderedCommentsClass = "usertext-body-rendered";

const replaceLink = (link) => {
    if (link !== undefined && link !== null && link.innerText === "<image>") {
      const image = document.createElement("img");
      image.src = link.href;
      image.style = "max-width:350px";
      link.replaceWith(image);
    }
}

const renderImages = () => {
  const comments = [...document.getElementsByClassName(prerenderCommentsClass)];
  console.log(`Rendering images for ${comments.length} comments.`);
  comments.forEach(comment => {
    comment.classList.remove(prerenderCommentsClass);
    comment.classList.add(renderedCommentsClass);
    const link = comment.getElementsByTagName("a")[0];
    replaceLink(link);
  });
};

const renderOnMutation = (mutations) => {
  let shouldRender = false;
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (!node.tagName) {
        continue;
      }
      if (node.getElementsByClassName(prerenderCommentsClass).length > 0) {
        shouldRender = true;
        break;
      }
    }
    if (shouldRender) {
      break;
    }
  }
  if (shouldRender) {
    renderImages();
  }
}

const observer = new MutationObserver(renderOnMutation);

renderImages();

observer.observe(document.body, {
  childList: true,
  subtree: true
});


