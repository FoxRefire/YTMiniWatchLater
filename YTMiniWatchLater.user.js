// ==UserScript==
// @name        YTMiniWatchLater
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      FoxRefire
// @description 2024/9/5 4:55:49
// ==/UserScript==

function waitTargetElement(){
  return new Promise(resolve => {
    let interval = setInterval(() => {
      let target = document.querySelector("#items.ytd-mini-guide-renderer")
      if(target.querySelectorAll("ytd-mini-guide-entry-renderer")?.length >= 4){
        resolve(target)
        clearInterval(interval)
      }
    }, 150)
  })
}

function getWatchLaterLabel(){
  return new Promise(resolve => {
    let interval = setInterval(() => {
      let target = document.querySelector(".ytp-watch-later-title")
      if(target){
        resolve(target.innerText)
        clearInterval(interval)
      }
    }, 150)
  })
}

async function main(){
  let target = await waitTargetElement()
  let label = await getWatchLaterLabel()
  target.insertAdjacentHTML("beforeend", `
    <ytd-mini-guide-entry-renderer class="style-scope ytd-mini-guide-renderer" system-icons="" role="tab" tabindex="0" aria-selected="false" aria-label="${label}">
    <a id="endpoint" tabindex="-1" class="yt-simple-endpoint style-scope ytd-mini-guide-entry-renderer" title="${label}" href="/playlist?list=WL">
        <icon id="icon" class="guide-icon style-scope ytd-mini-guide-entry-renderer">
          <span class="yt-icon-shape yt-spec-icon-shape">
              <div style="width: 100%; height: 100%; display: block; fill: currentcolor;">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit; width: 100%; height: 100%;"><path d="M14.97 16.95 10 13.87V7h2v5.76l4.03 2.49-1.06 1.7zM12 3c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0-1c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"></path></svg>
              </div>
          </span>
        </icon>
        <span class="title style-scope ytd-mini-guide-entry-renderer">${label}</span>
    </a>
    </ytd-mini-guide-entry-renderer>
  `)
}

main()
