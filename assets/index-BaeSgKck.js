(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&a(m)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const E=document.querySelector(".startGame"),_=document.querySelector(".welcome__container"),w=document.querySelector(".endGame__modalContainer"),l=document.querySelector(".endGame__text"),q=document.querySelector(".endGameStartAgain"),p=document.querySelector("#invisible"),g=document.querySelector(".question__container"),M=document.querySelector(".question__text"),c=document.querySelectorAll(".answer__text"),b=document.querySelector(".answer__container"),y=document.querySelectorAll(".lifeline__img"),u=document.querySelectorAll(".moneyTree__text");if(!E)throw new Error("there is an error with the selector");if(!M||!c)throw new Error("there is an error with the questions or answers");if(!y||!u)throw new Error("there is an error with the lifelines or moneytree");if(!p||!_)throw new Error("there is an error with invisible or welcome container");if(!w||!g||!b)throw new Error("there is something wrong with the modal");if(!l||!q)throw new Error("there is something wrong with the modal");const L=document.querySelector(".moneyTree__container--mobile"),S=document.querySelector(".moneyTree__text--mobile");if(!L||!S)throw new Error(" there is something wrong with the mobile money tree indicator");let n=0,s=[],d="",A="https://opentdb.com/api.php?amount=15&type=multiple";const H=async e=>{const i=await(await fetch(e)).json();return console.log("returned object",i),i.results.forEach(a=>{s.push(a),s.push(a)}),s};H(A);const f=e=>{M.innerHTML=s[n].question;for(let t=0;t<e.length;t++)c[t].innerHTML=e[t]},T=e=>{const t=[];return e.forEach(i=>{p.innerHTML=i,t.push(p.innerHTML)}),t},h=e=>{let t=[];return t.push(e.correct_answer),d=T(t)[0],e.incorrect_answers.forEach(i=>{t.push(i)}),t.sort(),t=T(t),t},C=()=>{n=n+1,n===15?k():(f(h(s[n])),v(),c.forEach(e=>{e.style.display="block"})),console.log(d)},G=e=>{e.currentTarget.innerHTML===d?C():k()},k=()=>{s=[],x(),n===14?l.innerHTML="CONGRATULATIONS YOU HAVE WON":n===0?l.innerHTML="Unfortunately you failed to answer a single question correctly. you therfore go away with nothing":n>0&&n<4?l.innerHTML="You did not answer enough questions to get to the first safe point, therefore you win zero money":n>=4&&n<8?l.innerHTML="Congratulations you have won £1000":n>=9&&n<14&&(l.innerHTML="Unfortunately that answer was incorrect, however you did win quite a lot of money and will be taking home £32,000"),w.style.display="block",H(A),f(h(s[0]))},x=()=>{g.style.display="none",b.style.display="none",y.forEach(e=>{e.style.display="none"}),L.style.display="none"},v=()=>{u[u.length-n-1].style.backgroundColor="purple",L.style.display="block",S.innerHTML=u[14-n].innerHTML},N=()=>{let e=0;for(;e<4;)c[e].innerHTML!==s[n].correct_answer&&(c[e].style.display="none",e++),e++},I=()=>{n=n+1,f(h(s[n]))},P=e=>{const t=e.currentTarget;switch(t.id){case"fiftyFifty":N(),t.style.display="none";break;case"skip":I(),t.style.display="none";break}},U=()=>{_.style.display="none",g.style.display="block",b.style.display="block",c.forEach(e=>{e.style.display="block"}),y.forEach(e=>{e.style.display="block"}),w.style.display="none"},O=()=>{n=0,U(),v(),f(h(s[n])),u.forEach(e=>{e.style.backgroundColor="navy"}),console.log(d)};E.addEventListener("click",O);c.forEach(e=>{e.addEventListener("click",G)});y.forEach(e=>{e.addEventListener("click",P)});q.addEventListener("click",O);
