const packageData = require('./package.json');
console.log(
  `// ==UserScript==
// @name         mal-forum-thread-next-post
// @author       PythonCoderAS
// @description  A userscript for determining the next post in a counting game on the MyAnimeList forum games board.
// @grant        none
// @homepage     https://github.com/PythonCoderAS/mal-forum-thread-next-post#readme
// @homepageURL  https://github.com/PythonCoderAS/mal-forum-thread-next-post#readme
// @match        https://myanimelist.net/forum/?topicid=*
// @run-at       load
// @source       git+https://github.com/PythonCoderAS/mal-forum-thread-next-post.git
// @supportURL   https://github.com/PythonCoderAS/mal-forum-thread-next-post/issues
// @icon         https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://myanimelist.net&size=64
// @version      ${packageData.version}
// ==/UserScript==`
)
