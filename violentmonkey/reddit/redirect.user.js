// ==UserScript==
// @name          old_reddit_redirection
// @namespace     Violentmonkey Scripts
// @exclude-match *://www.reddit.com/media
// @exclude-match *://www.reddit.com/notifications
// @match         *://www.reddit.com/*
// @run-at        document-start
// @grant         none
// @version       1.0
// @author        daboba
// @description   redirect to old reddit
// ==/UserScript==

console.log("redirecting to old reddit");

const target = window.location.href.replace("www", "old");
window.location.replace(target);
