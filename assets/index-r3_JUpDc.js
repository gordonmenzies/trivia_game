(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))L(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const f of r.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&L(f)}).observe(document,{childList:!0,subtree:!0});function s(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function L(o){if(o.ep)return;o.ep=!0;const r=s(o);fetch(o.href,r)}})();const q=document.querySelector(".startGame"),E=document.querySelector(".welcome__container"),m=document.querySelector(".endGame__modalContainer"),c=document.querySelector(".endGame__text"),_=document.querySelector(".endGameStartAgain"),h=document.querySelector("#invisible"),w=document.querySelector(".question__container"),M=document.querySelector(".question__text"),l=document.querySelectorAll(".answer__text"),p=document.querySelector(".answer__container"),u=document.querySelectorAll(".lifeline__img"),a=document.querySelectorAll(".moneyTree__text");if(!q)throw new Error("there is an error with the selector");if(!M||!l)throw new Error("there is an error with the questions or answers");if(!u||!a)throw new Error("there is an error with the lifelines or moneytree");if(!h||!E)throw new Error("there is an error with invisible or welcome container");if(!m||!w||!p)throw new Error("there is something wrong with the modal");if(!c||!_)throw new Error("there is something wrong with the modal");const g=document.querySelector(".moneyTree__container--mobile"),S=document.querySelector(".moneyTree__text--mobile");if(!g||!S)throw new Error(" there is something wrong with the mobile money tree indicator");let n=0,i=[],b="",A="https://opentdb.com/api.php?amount=15&type=multiple";async function H(e){return fetch(e).then(t=>{if(!t.ok)throw new Error("Network response was not ok");return t.json()}).then(t=>{console.log("returned object",t),t.results.forEach(s=>{i.push(s)}),console.log("question array",i)}),i}H(A);const y=e=>{M.innerHTML=i[n].question;for(let t=0;t<e.length;t++)l[t].innerHTML=e[t]},T=e=>{const t=[];return e.forEach(s=>{h.innerHTML=s,t.push(h.innerHTML)}),t},d=e=>{let t=[];return t.push(e.correct_answer),b=T(t)[0],e.incorrect_answers.forEach(s=>{t.push(s)}),t.sort(),t=T(t),t},C=()=>{n=n+1,n===15?k():(y(d(i[n])),v(),l.forEach(e=>{e.style.display="block"}))},G=e=>{e.currentTarget.innerHTML===b?C():k()},k=()=>{i=[],x(),n===14?c.innerHTML="CONGRATULATIONS YOU HAVE WON":n===0?c.innerHTML="Unfortunately you failed to answer a single question correctly. you therfore go away with nothing":n>0&&n<4?c.innerHTML="You did not answer enough questions to get to the first safe point, therefore you win zero money":n>=4&&n<8?c.innerHTML="Congratulations you have won £1000":n>=9&&n<14&&(c.innerHTML="Unfortunately that answer was incorrect, however you did win quite a lot of money and will be taking home £32,000"),m.style.display="block",H(A),y(d(i[0]))},x=()=>{w.style.display="none",p.style.display="none",u.forEach(e=>{e.style.display="none"}),g.style.display="none"},v=()=>{a[a.length-n-1].style.backgroundColor="purple",g.style.display="block",S.innerHTML=a[14-n].innerHTML},N=()=>{let e=0;for(;e<4;)l[e].innerHTML!==i[n].correct_answer&&(l[e].style.display="none",e++),e++},I=()=>{n=n+1,y(d(i[n]))},P=e=>{const t=e.currentTarget;switch(t.id){case"fiftyFifty":N(),t.style.display="none";break;case"skip":I(),t.style.display="none";break}},U=()=>{E.style.display="none",w.style.display="block",p.style.display="block",l.forEach(e=>{e.style.display="block"}),u.forEach(e=>{e.style.display="block"}),m.style.display="none"},O=()=>{n=0,U(),v(),y(d(i[n])),a.forEach(e=>{e.style.backgroundColor="navy"}),console.log(b)};q.addEventListener("click",O);l.forEach(e=>{e.addEventListener("click",G)});u.forEach(e=>{e.addEventListener("click",P)});_.addEventListener("click",O);
