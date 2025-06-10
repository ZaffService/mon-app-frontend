(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}})();function c(e,t="info"){document.querySelectorAll(".toast").forEach(o=>o.remove());const r=document.createElement("div"),a={success:"#25D366",error:"#ef4444",info:"#8696a0",warning:"#f59e0b"};r.className="toast fixed right-4 top-4 p-4 rounded-lg text-white shadow-lg transform translate-x-full transition-all duration-300 z-50",r.style.backgroundColor=a[t],r.innerHTML=`
    <div class="flex items-center">
      <i class="fas ${t==="success"?"fa-check-circle":t==="error"?"fa-exclamation-circle":t==="warning"?"fa-exclamation-triangle":"fa-info-circle"} mr-2"></i>
      <span>${e}</span>
    </div>
  `,document.body.appendChild(r),setTimeout(()=>{r.style.transform="translateX(0)"},100),setTimeout(()=>{r.style.transform="translateX(100%)",setTimeout(()=>r.remove(),300)},3e3)}function O(e,t,n=null){if(!("Notification"in window)){console.log("Ce navigateur ne supporte pas les notifications");return}if(Notification.permission==="granted"){const r=new Notification(e,{body:t,icon:n||"/placeholder.svg?height=64&width=64",badge:"/placeholder.svg?height=32&width=32",tag:"whatsapp-message",requireInteraction:!1,silent:!1});setTimeout(()=>{r.close()},5e3),r.onclick=()=>{window.focus(),r.close()}}else Notification.permission!=="denied"&&Notification.requestPermission().then(r=>{r==="granted"&&O(e,t,n)});G(e,t,n)}function G(e,t,n){const r=document.getElementById("notificationContainer");if(!r)return;const a=document.createElement("div");a.className="bg-[#202c33] border border-gray-600 rounded-lg p-4 shadow-lg max-w-sm transform translate-x-full transition-all duration-300",a.innerHTML=`
    <div class="flex items-start space-x-3">
      ${n?`<img src="${n}" alt="Avatar" class="w-10 h-10 rounded-full object-cover flex-shrink-0">`:'<div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"><i class="fas fa-comment text-white"></i></div>'}
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-medium text-sm truncate">${e}</h4>
        <p class="text-gray-400 text-sm mt-1 line-clamp-2">${t}</p>
      </div>
      <button class="text-gray-400 hover:text-white flex-shrink-0" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times text-sm"></i>
      </button>
    </div>
  `,r.appendChild(a),setTimeout(()=>{a.style.transform="translateX(0)"},100),setTimeout(()=>{a.style.transform="translateX(100%)",setTimeout(()=>{a.parentElement&&a.remove()},300)},5e3),K()}function K(){try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createOscillator(),n=e.createGain();t.connect(n),n.connect(e.destination),t.frequency.setValueAtTime(800,e.currentTime),t.frequency.setValueAtTime(600,e.currentTime+.1),n.gain.setValueAtTime(.1,e.currentTime),n.gain.exponentialRampToValueAtTime(.01,e.currentTime+.2),t.start(e.currentTime),t.stop(e.currentTime+.2)}catch(e){console.log("Impossible de jouer le son de notification:",e)}}async function _(){try{return await Notification.requestPermission()==="granted"}catch(e){return console.error("Erreur permissions notifications:",e),!1}}const h="https://votre-backend.onrender.com",Z={async getChats(){try{return await(await fetch(`${h}/chats`)).json()}catch(e){throw console.error("Erreur getChats:",e),e}},async updateUserStatus(e,t){try{const n=await fetch(`${h}/chats/${e}`);if(!n.ok)throw new Error("Erreur réseau");const a={...await n.json(),isOnline:t,lastSeen:new Date().toISOString()},o=await fetch(`${h}/chats/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!o.ok)throw new Error("Erreur mise à jour statut");return await o.json()}catch(n){throw console.error("Erreur updateUserStatus:",n),n}}},{getChats:A,updateUserStatus:Q}=Z;async function j(e){try{const t=await fetch(`${h}/chats/${e}`);if(!t.ok)throw new Error("Erreur réseau");return(await t.json()).messages||[]}catch(t){return console.error("Erreur getMessages:",t),[]}}async function L(e,t){try{const n=await fetch(`${h}/chats/${e}`);if(!n.ok)return console.error(`Chat ${e} non trouvé, création...`),await Y(e,t);const r=await n.json();r.messages=r.messages||[],r.messages.push(t);const a=await fetch(`${h}/chats/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok)throw new Error("Erreur mise à jour");return await a.json()}catch(n){throw console.error("Erreur addMessage:",n),n}}async function C(e,t){try{const n=await fetch(`${h}/chats/${e}`);if(!n.ok)return console.warn(`Chat ${e} non trouvé pour mise à jour`),null;const r=await n.json();Object.assign(r,t);const a=await fetch(`${h}/chats/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!a.ok)throw new Error("Erreur mise à jour");return await a.json()}catch(n){return console.error("Erreur updateChat:",n),null}}async function Y(e,t){try{const n={id:e,name:`User ${e}`,avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",messages:[t],lastMessage:t.text,time:t.time,lastMessageTime:t.timestamp,unread:0,isOnline:!1},r=await fetch(`${h}/chats`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});if(!r.ok)throw new Error("Erreur création chat");return await r.json()}catch(n){throw console.error("Erreur createChatForUser:",n),n}}let F=null;function ee(){const e=localStorage.getItem("currentUser");if(e)try{const t=JSON.parse(e);return H(t),t}catch(t){console.error("Erreur parsing user:",t),localStorage.removeItem("currentUser")}return null}function g(){return F||ee()}function H(e){F=e,e?(localStorage.setItem("currentUser",JSON.stringify(e)),Q(e.id,"en ligne").catch(console.error)):localStorage.removeItem("currentUser")}function te(){window.refreshInterval&&clearInterval(window.refreshInterval),localStorage.removeItem("currentUser"),window.location.reload()}async function ne(e,t){try{if(!e||!t)return c("Veuillez remplir tous les champs","error"),null;if(t.length!==9||!/^\d+$/.test(t))return c("Le numéro doit contenir exactement 9 chiffres","error"),null;const r=(await A()).find(a=>a.name.toLowerCase().trim()===e.toLowerCase().trim()&&a.phone.trim()===t.trim());return r?(H(r),c(`Bienvenue ${r.name}!`,"success"),r):(c("Nom ou téléphone incorrect","error"),null)}catch(n){return console.error("Erreur de connexion:",n),c("Erreur de connexion au serveur","error"),null}}function re(e){const t=document.createElement("div");t.className="min-h-screen flex items-center justify-center bg-[#111b21] px-4",t.innerHTML=`
    <div class="max-w-md w-full bg-[#222e35] rounded-lg shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fab fa-whatsapp text-3xl text-white"></i>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">WhatsApp Web</h1>
        <p class="text-gray-400">Connectez-vous pour continuer</p>
      </div>
      
      <form id="loginForm" class="space-y-4">
        <div>
          <input 
            type="text" 
            id="nameInput"
            placeholder="Votre nom" 
            class="w-full px-4 py-3 bg-[#2a3942] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
            required
          >
        </div>
        
        <div>
          <input 
            type="tel" 
            id="phoneInput"
            placeholder="Numéro de téléphone (9 chiffres)" 
            class="w-full px-4 py-3 bg-[#2a3942] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#25D366] transition-all"
            maxlength="9"
            required
          >
        </div>
        
        <button 
          type="submit"
          id="loginButton"
          class="w-full py-3 bg-[#25D366] hover:bg-[#1ea952] text-white rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Se connecter
        </button>
      </form>
      
      <div class="mt-6 p-4 bg-[#2a3942] rounded-lg">
        <p class="text-sm text-gray-400 mb-2">Comptes de test :</p>
        <div class="space-y-1 text-xs text-gray-500">
          <div>Zafe - 777867740</div>
          <div>Abdallah - 778123456</div>
          <div>Ousmane Marra - 776543210</div>
          <div>Maman Dié ODC - 775555555</div>
          <div>Zeynabe Ba - 774444444</div>
        </div>
      </div>
    </div>
  `;const n=t.querySelector("#loginForm"),r=t.querySelector("#nameInput"),a=t.querySelector("#phoneInput"),o=t.querySelector("#loginButton");return a.addEventListener("input",i=>{i.target.value=i.target.value.replace(/[^0-9]/g,"")}),n.addEventListener("submit",async i=>{i.preventDefault();const u=r.value.trim(),b=a.value.trim();if(!u||!b){c("Veuillez remplir tous les champs","error");return}o.disabled=!0,o.innerHTML=`
      <div class="flex items-center justify-center">
        <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
        Connexion...
      </div>
    `;try{const E=await ne(u,b);E&&e&&e(E)}finally{o.disabled=!1,o.textContent="Se connecter"}}),t}let l=null,B=null,m=null;function ae(e){if(l){c("Un appel est déjà en cours","error");return}console.log("Initialisation appel audio avec:",e.name),q(e,"audio")}function se(e){if(l){c("Un appel est déjà en cours","error");return}console.log("Initialisation appel vidéo avec:",e.name),q(e,"video")}async function q(e,t){if(l={contact:e,type:t,startTime:Date.now(),status:"calling"},t==="video")try{console.log("Demande d'accès à la caméra..."),m=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),console.log("✅ Accès caméra accordé")}catch(r){console.error("❌ Erreur accès caméra:",r),c("Veuillez autoriser l'accès à la caméra","error");return}oe(e,t),t==="video"&&m&&ie(),ue();const n=Math.random()*3e3+2e3;B=setTimeout(()=>{l&&l.status==="calling"&&le()},n)}function oe(e,t){const n=document.getElementById("callInterface");n&&n.remove();const r=document.createElement("div");r.id="callInterface",r.className="fixed inset-0 bg-gray-900 z-50",t==="video"?r.innerHTML=`
      <div class="w-full h-full relative">
        <!-- Vidéo principale (contact) -->






        <div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
          <!-- Placeholder du contact -->
          <div class="text-center">
            <img src="${e.avatar}" alt="${e.name}" 


                 class="w-32 h-32 rounded-full mb-4 object-cover shadow-2xl mx-auto">
            <h2 class="text-3xl font-light mb-2 text-white">${e.name}</h2>
            <p id="callStatus" class="text-lg text-gray-300">Appel vidéo en cours...</p>
          </div>
        </div>
        



        <!-- VOTRE VIDÉO (caméra locale) -->
        <div class="absolute top-4 right-4 w-48 h-36 bg-black rounded-lg overflow-hidden border-2 border-white shadow-xl">
          <video id="localVideo" 
                 class="w-full h-full object-cover" 
                 autoplay 
                 muted 
                 playsinline>
          </video>



        </div>
        

        <!-- Contrôles -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">


          <button id="muteBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
            <i class="fas fa-microphone text-xl text-white"></i>
          </button>
          


          <button id="cameraBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
            <i class="fas fa-video text-xl text-white"></i>
          </button>
          


          <button id="hangupBtn" class="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
            <i class="fas fa-phone text-xl text-white transform rotate-135"></i>
          </button>
        </div>
        


        <!-- Durée -->
        <div id="callDuration" class="absolute top-4 left-4 bg-black bg-opacity-70 px-4 py-2 rounded-full text-white font-mono">
          00:00
        </div>
      </div>
    `:r.innerHTML=`


      <div class="w-full h-full flex items-center justify-center">
        <div class="text-center">
          <img src="${e.avatar}" alt="${e.name}" 










               class="w-40 h-40 rounded-full mb-6 object-cover shadow-2xl mx-auto">
          <h2 class="text-4xl font-light mb-4 text-white">${e.name}</h2>
          <p id="callStatus" class="text-xl text-gray-300 mb-8">Appel en cours...</p>
          



          <div class="flex space-x-8 justify-center">
            <button id="muteBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
              <i class="fas fa-microphone text-xl text-white"></i>
            </button>
            
            <button id="speakerBtn" class="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
              <i class="fas fa-volume-up text-xl text-white"></i>
            </button>
            
            <button id="hangupBtn" class="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition-colors">
              <i class="fas fa-phone text-xl text-white transform rotate-135"></i>
            </button>
          </div>
          



          <div id="callDuration" class="mt-8 text-2xl text-gray-400 font-mono">00:00</div>
        </div>


      </div>
    `,document.body.appendChild(r),ce()}function ie(){const e=document.getElementById("localVideo");e&&m?(console.log("🎥 Configuration de votre caméra..."),e.srcObject=m,e.play().then(()=>{console.log("✅ Votre caméra est active")}).catch(t=>{console.error("❌ Erreur démarrage caméra:",t)})):console.error("❌ Vidéo ou stream manquant")}function ce(){const e=document.getElementById("muteBtn"),t=document.getElementById("cameraBtn"),n=document.getElementById("speakerBtn"),r=document.getElementById("hangupBtn");let a=!1,o=!1;e&&e.addEventListener("click",()=>{a=!a,m&&m.getAudioTracks().forEach(i=>{i.enabled=!a}),e.innerHTML=`<i class="fas fa-microphone${a?"-slash":""} text-xl text-white"></i>`,e.classList.toggle("bg-red-500",a),c(a?"🔇 Micro coupé":"🎤 Micro activé","info")}),t&&t.addEventListener("click",()=>{o=!o,m&&m.getVideoTracks().forEach(i=>{i.enabled=!o}),t.innerHTML=`<i class="fas fa-video${o?"-slash":""} text-xl text-white"></i>`,t.classList.toggle("bg-red-500",o),c(o?"📹 Caméra désactivée":"🎥 Caméra activée","info")}),n&&n.addEventListener("click",()=>{c("🔊 Haut-parleur","info")}),r&&r.addEventListener("click",me)}function le(){if(!l)return;l.status="connected",l.connectedTime=Date.now(),fe();const e=document.getElementById("callStatus");e&&(e.textContent=l.type==="video"?"📹 Appel vidéo connecté":"📞 Appel connecté"),de(),c("✅ Appel connecté","success")}function de(){const e=document.getElementById("callDuration");if(!e||!l)return;const t=()=>{if(!l||l.status!=="connected")return;const n=Math.floor((Date.now()-l.connectedTime)/1e3),r=Math.floor(n/60),a=n%60;e.textContent=`${r.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`};t(),l.timerInterval=setInterval(t,1e3)}function ue(){console.log("🔔 Sonnerie...")}function fe(){console.log("🔕 Arrêt sonnerie")}async function me(){if(!l)return;const e=l.status==="connected",t=e&&l.connectedTime?Math.floor((Date.now()-l.connectedTime)/1e3):0;B&&(clearTimeout(B),B=null),l.timerInterval&&clearInterval(l.timerInterval),m&&(m.getTracks().forEach(r=>{r.stop()}),m=null),e&&await ge(l.contact,l.type,t);const n=document.getElementById("callInterface");if(n&&n.remove(),t>0){const r=Math.floor(t/60),a=t%60;c(`📞 Appel terminé - ${r}:${a.toString().padStart(2,"0")}`,"info")}else c("📞 Appel annulé","info");l=null}async function ge(e,t,n){try{const r=g();if(!r||!window.currentChat)return;const a=Math.floor(n/60),o=n%60,i=`${a}:${o.toString().padStart(2,"0")}`,u={id:Date.now(),senderId:r.id,receiverId:e.id,text:`${t==="video"?"📹 Appel vidéo":"📞 Appel vocal"} - ${i}`,sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:"call",callType:t,duration:n,status:"sent"};window.sendMessage&&await window.sendMessage(u)}catch(r){console.error("Erreur envoi message d'appel:",r)}}const U=new Map;let T=null,$=null,k=null;function pe(e,t){$=e,k=t,T&&clearInterval(T),T=setInterval(he,2e3),console.log("Synchronisation temps réel initialisée")}async function he(){try{const e=ve();if(!e)return;const n=await(await fetch("http://localhost:5001/chats")).json();for(const r of n){if(r.id===e.id)continue;const a=r.messages||[],o=U.get(r.id)||0;if(a.length>o){const i=a.slice(o);for(const u of i)u.receiverId===e.id&&u.senderId===r.id&&$&&$(u);U.set(r.id,a.length)}}if(k)for(const r of n)r.id!==e.id&&k(r.id,r.isOnline||!1)}catch(e){console.error("Erreur synchronisation temps réel:",e)}}function ve(){const e=localStorage.getItem("currentUser");return e?JSON.parse(e):null}async function V(e,t,n){try{await L(e,n);const r={...n,sent:!1,senderId:e,receiverId:t};await L(t,r);const a={lastMessage:n.type==="text"?n.text:ye(n),time:n.time,lastMessageTime:n.timestamp};return await C(e,a),await C(t,a),console.log("Message envoyé avec succès"),!0}catch(r){throw console.error("Erreur envoi message:",r),r}}function ye(e){switch(e.type){case"image":return"📷 Photo";case"video":return"🎥 Vidéo";case"audio":return"🎵 Audio";case"voice":return"🎤 Message vocal";case"document":return`📎 ${e.fileName}`;default:return e.text}}function xe(){console.log("Audio recorder configuré")}let v=[],s=null;window.currentChat=null;document.addEventListener("DOMContentLoaded",()=>{console.log("Application démarrée"),we()});async function we(){const e=document.getElementById("mainContainer"),t=document.getElementById("loginContainer"),n=g();n?(console.log("Utilisateur connecté:",n.name),a()):(console.log("Aucun utilisateur connecté"),r());function r(){e.style.display="none",t.style.display="block",t.innerHTML="";const o=re(i=>{console.log("Connexion réussie pour:",i.name),a()});t.appendChild(o)}function a(){t.style.display="none",e.style.display="flex",be()}}async function be(){try{await Ee(),Ie(),Ue(),R(),pe(Ke,_e),Ze(),xe(),console.log("Interface principale initialisée")}catch(e){console.error("Erreur initialisation:",e),c("Erreur de chargement","error")}}async function Ee(){try{if(v=await A(),y(),s){const e=await j(s.id);w(e)}}catch(e){console.error("Erreur chargement chats:",e),c("Impossible de charger les conversations","error")}}function Ie(){const e=document.getElementById("userAvatarButton");e&&e.addEventListener("click",Ne);const t=document.getElementById("backToChats");t&&t.addEventListener("click",P);const n=document.getElementById("logoutButton");n&&n.addEventListener("click",te);const r=document.getElementById("backButton");r&&r.addEventListener("click",Re),Pe(),ze(),Be(),Ce(),Me(),Te(),window.addEventListener("resize",Je),_(),Ge()}function Be(){const e=document.getElementById("searchInput");e&&e.addEventListener("input",t=>{const n=t.target.value.toLowerCase().trim();ke(n)})}function Ce(){const e=document.querySelectorAll(".filter-tab");e.forEach(t=>{t.addEventListener("click",()=>{e.forEach(r=>{r.classList.remove("active","bg-green-600","text-white"),r.classList.add("text-gray-400")}),t.classList.add("active","bg-green-600","text-white"),t.classList.remove("text-gray-400");const n=t.dataset.filter;Ae(n)})})}function Me(){const e=document.getElementById("voiceCallBtn"),t=document.getElementById("videoCallBtn");e&&e.addEventListener("click",()=>{s&&ae(s)}),t&&t.addEventListener("click",()=>{s&&se(s)})}function Te(){const e=document.getElementById("attachBtn"),t=document.getElementById("fileInput");e&&t&&(e.addEventListener("click",()=>{t.click()}),t.addEventListener("change",Se))}async function Se(e){const t=e.target.files[0];if(!(!t||!s))try{const n=await Le(t),r={id:Date.now(),text:t.name,sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:$e(t.type),fileData:n,fileName:t.name,fileSize:t.size,status:"sent"};await J(r),e.target.value=""}catch(n){console.error("Erreur upload fichier:",n),c("Erreur lors de l'envoi du fichier","error")}}function Le(e){return new Promise((t,n)=>{const r=new FileReader;r.readAsDataURL(e),r.onload=()=>t(r.result),r.onerror=a=>n(a)})}function $e(e){return e.startsWith("image/")?"image":e.startsWith("video/")?"video":e.startsWith("audio/")?"audio":"document"}function ke(e){document.querySelectorAll(".chat-item").forEach(n=>{var o,i;const r=((o=n.querySelector(".chat-name"))==null?void 0:o.textContent.toLowerCase())||"",a=((i=n.querySelector(".chat-message"))==null?void 0:i.textContent.toLowerCase())||"";r.includes(e)||a.includes(e)?n.style.display="block":n.style.display="none"})}function Ae(e){const t=g();if(!t)return;let n=v.filter(r=>r.id!==t.id);switch(e){case"unread":n=n.filter(r=>r.unread>0);break;case"favorites":n=n.filter(r=>r.isFavorite);break;case"groups":n=n.filter(r=>r.isGroup);break}je(n)}function je(e){const t=document.getElementById("chatList");t&&(t.innerHTML="",e.forEach(n=>{const r=z(n);t.appendChild(r)}))}function Ne(){const e=document.getElementById("sidebar"),t=document.getElementById("profilePanel"),n=document.getElementById("chatArea");e.style.display="none",n.style.display="none",t.style.display="flex",De()}function P(){const e=document.getElementById("sidebar"),t=document.getElementById("profilePanel"),n=document.getElementById("chatArea");t.style.display="none",e.style.display="flex",s&&(n.style.display="flex")}function De(){const e=g();if(e){const t=document.getElementById("profileImage"),n=document.getElementById("profileName");t&&(t.src=e.avatar,t.alt=e.name),n&&(n.textContent=e.name)}}function Ue(){const e=g(),t=document.querySelectorAll(".user-avatar img");e&&t.length>0&&t.forEach(n=>{n.src=e.avatar,n.alt=e.name})}function R(){const e=document.getElementById("messagesArea");e&&(e.innerHTML=`
      <div class="flex items-center justify-center h-full text-gray-500">
        <div class="text-center">
          <div class="text-8xl mb-4 opacity-30">
            <i class="fab fa-whatsapp text-green-500"></i>
          </div>
          <h2 class="text-3xl mb-4 font-light">WhatsApp Web</h2>
          <p class="text-gray-400 mb-2">Sélectionnez une conversation pour commencer</p>
          <div class="mt-8 flex justify-center">
            <div class="flex items-center text-gray-500 text-sm">
              <i class="fas fa-lock mr-2"></i>
              <span>Vos messages sont chiffrés de bout en bout</span>
            </div>
          </div>
        </div>
      </div>
    `)}function y(){const e=document.getElementById("chatList");if(!e)return;const t=g();if(!t)return;e.innerHTML="";const n=v.filter(r=>r.id!==t.id);n.sort((r,a)=>{const o=new Date(r.lastMessageTime||r.time);return new Date(a.lastMessageTime||a.time)-o}),n.forEach(r=>{const a=z(r);e.appendChild(a)})}function z(e){const t=document.createElement("div");t.className="chat-item px-4 py-3 cursor-pointer hover:bg-[#202c33] transition-colors border-b border-gray-700",t.dataset.chatId=e.id;const n=e.unread>0,r=e.isOnline;return t.innerHTML=`
    <div class="flex items-center space-x-3">
      <div class="relative">
        <img src="${e.avatar}" alt="${e.name}" class="w-12 h-12 rounded-full object-cover">
        ${r?'<div class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#222e35]"></div>':""}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between items-start">
          <h3 class="chat-name font-medium text-white truncate ${n?"font-semibold":""}">${e.name}</h3>
          <div class="flex flex-col items-end space-y-1">
            <span class="text-xs ${n?"text-green-400":"text-gray-400"}">${e.time}</span>
            ${n?`<span class="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">${e.unread}</span>`:""}
          </div>
        </div>
        <div class="mt-1">
          <p class="chat-message text-sm ${n?"text-white font-medium":"text-gray-400"} truncate">${e.lastMessage}</p>
        </div>
      </div>
    </div>
  `,t.addEventListener("click",()=>Oe(e.id)),t}async function Oe(e){var t;P(),s=v.find(n=>n.id===e),window.currentChat=s,s&&(s.unread>0&&(s.unread=0,await C(s)),document.querySelectorAll(".chat-item").forEach(n=>{n.classList.remove("bg-[#202c33]")}),(t=document.querySelector(`[data-chat-id="${e}"]`))==null||t.classList.add("bg-[#202c33]"),N()&&(document.getElementById("sidebar").style.display="none"),document.getElementById("chatArea").style.display="flex",Fe(),await w(),Ve(),y())}function Fe(){const e=document.getElementById("chatHeader"),t=document.getElementById("chatAvatar"),n=document.getElementById("chatName"),r=document.getElementById("chatStatus");e&&s&&(e.style.display="flex",t.innerHTML=`<img src="${s.avatar}" alt="${s.name}" class="w-10 h-10 rounded-full object-cover">`,n.textContent=s.name,r.textContent=s.isOnline?"en ligne":s.status)}async function w(){const e=document.getElementById("messagesArea");if(!(!e||!s))try{const t=await j(s.id);s.messages=t,e.innerHTML="",t.forEach(n=>{const r=He(n);e.appendChild(r)}),e.scrollTop=e.scrollHeight}catch(t){console.error("Erreur lors du rendu des messages:",t),c("Erreur lors du chargement des messages","error")}}function He(e){const t=g(),n=e.senderId===t.id||e.sent===!0,r=document.createElement("div");r.className=`flex mb-4 ${n?"justify-end":"justify-start"}`,r.dataset.messageId=e.id;let a="";switch(e.type){case"image":a=`
        <img src="${e.fileData}" alt="${e.fileName}" class="max-w-xs rounded-lg mb-2 cursor-pointer" onclick="openImageModal('${e.fileData}')">
        <p class="text-sm">${e.text}</p>
      `;break;case"video":a=`
        <video src="${e.fileData}" controls class="max-w-xs rounded-lg mb-2">
          Votre navigateur ne supporte pas la lecture vidéo.
        </video>
        <p class="text-sm">${e.text}</p>
      `;break;case"audio":a=`
        <audio src="${e.fileData}" controls class="mb-2">
          Votre navigateur ne supporte pas la lecture audio.
        </audio>
        <p class="text-sm">${e.text}</p>
      `;break;case"document":a=`
        <div class="flex items-center space-x-2 mb-2 p-2 bg-gray-700 rounded">
          <i class="fas fa-file text-blue-400"></i>
          <div>
            <p class="text-sm font-medium">${e.fileName}</p>
            <p class="text-xs text-gray-400">${qe(e.fileSize)}</p>
          </div>
        </div>
      `;break;case"voice":a=`
        <div class="voice-message flex items-center gap-3 p-3 min-w-[200px]">
          <button class="play-button w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors">
            <i class="fas fa-play text-sm"></i>
          </button>
          <div class="voice-content flex-1">
            <div class="voice-waveform flex items-center gap-1 h-6 mb-1">
              ${Array(25).fill().map((o,i)=>`
                <div class="waveform-bar bg-gray-400 rounded-full transition-all duration-200" 
                     style="width: 2px; height: ${Math.random()*16+4}px;"></div>
              `).join("")}
            </div>
            <div class="flex justify-between items-center">
              <span class="duration text-xs text-gray-300">0:05</span>
            </div>
          </div>
        </div>
      `,setTimeout(()=>{const o=document.querySelector(`[data-message-id="${e.id}"]`);if(o){let M=function(){if(!e.fileData)return console.error("Pas de données audio disponibles"),null;try{return d=new Audio,d.src=e.fileData,d.preload="metadata",d.onerror=f=>{console.error("Erreur chargement audio:",f),E.textContent="Erreur"},d.onloadedmetadata=()=>{d.duration&&!isNaN(d.duration)&&isFinite(d.duration)?E.textContent=We(d.duration):E.textContent="0:05"},d.onended=()=>{x=!1,u.innerHTML='<i class="fas fa-play text-sm"></i>',clearInterval(I),b.forEach(f=>{f.style.backgroundColor="#9ca3af"})},d.onpause=()=>{x=!1,u.innerHTML='<i class="fas fa-play text-sm"></i>',clearInterval(I)},d}catch(f){return console.error("Erreur création audio:",f),null}};var i=M;const u=o.querySelector(".play-button"),b=o.querySelectorAll(".waveform-bar"),E=o.querySelector(".duration");let x=!1,I=null,d=null;u.onclick=async()=>{try{if(!d&&(d=M(),!d)){c("Impossible de lire le message vocal","error");return}if(x)d.pause(),u.innerHTML='<i class="fas fa-play text-sm"></i>',clearInterval(I),b.forEach(f=>{f.style.backgroundColor="#9ca3af"}),x=!1;else try{await d.play(),u.innerHTML='<i class="fas fa-pause text-sm"></i>',x=!0,I=setInterval(()=>{b.forEach(f=>{const X=Math.random()*16+4;f.style.height=`${X}px`,f.style.backgroundColor="#10b981"})},100)}catch(f){console.error("Erreur lecture:",f),c("Erreur de lecture audio","error"),u.innerHTML='<i class="fas fa-play text-sm"></i>',x=!1}}catch(f){console.error("Erreur gestion lecture:",f),c("Erreur de lecture audio","error"),u.innerHTML='<i class="fas fa-play text-sm"></i>',x=!1}},M()}},100);break;default:a=`<p class="text-sm">${e.text}</p>`}return r.innerHTML=`
  <div class="max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${n?"bg-[#005c4b] text-white":"bg-[#202c33] text-white"} shadow-md">
    ${a}
    <div class="flex justify-end items-center mt-1 space-x-1">
      <span class="text-xs text-gray-300">${e.time}</span>
      ${n?`<i class="fas fa-check-double text-xs ${e.status==="read"?"text-blue-400":"text-gray-400"}"></i>`:""}
    </div>
  </div>
`,r}function qe(e){if(e===0)return"0 Bytes";const t=1024,n=["Bytes","KB","MB","GB"],r=Math.floor(Math.log(e)/Math.log(t));return Number.parseFloat((e/Math.pow(t,r)).toFixed(2))+" "+n[r]}function Ve(){const e=document.getElementById("messageInput");e&&(e.style.display="flex")}function Pe(){const e=document.getElementById("messageText"),t=document.getElementById("sendButton"),n=document.getElementById("voiceBtn");if(!e||!t)return;async function r(){const a=e.value.trim();if(!(!a||!s))try{const o=g();if(!o)return;const i={id:Date.now(),senderId:o.id,receiverId:s.id,text:a,sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:"text",status:"sent"};e.value="",s.messages=s.messages||[],s.messages.push(i),s.lastMessage=a,s.time=i.time,s.lastMessageTime=i.timestamp,await V(o.id,s.id,i)}catch(o){console.error("Erreur envoi message:",o),c("Erreur lors de l'envoi","error")}}t.addEventListener("click",r),e.addEventListener("keypress",a=>{a.key==="Enter"&&!a.shiftKey&&(a.preventDefault(),r())}),n&&n.addEventListener("click",D)}async function J(e){if(s)try{s.messages.push(e),s.lastMessage=e.type==="text"?e.text:`📎 ${e.fileName||"Fichier"}`,s.time=e.time,s.lastMessageTime=e.timestamp,await L(s.id,e),await C(s),w(),y()}catch(t){console.error("Erreur envoi message:",t),c("Erreur lors de l'envoi","error")}}function Re(){N()&&(document.getElementById("sidebar").style.display="flex",document.getElementById("chatArea").style.display="none"),s=null,window.currentChat=null,document.getElementById("chatHeader").style.display="none",document.getElementById("messageInput").style.display="none",R()}function ze(){const e=document.querySelectorAll(".nav-item");e.forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.view;switch(console.log("Navigation vers:",n),e.forEach(r=>r.classList.remove("active")),t.classList.add("active"),n){case"chats":break;case"status":c("Fonctionnalité Statuts bientôt disponible","info");break;case"communities":c("Fonctionnalité Communautés bientôt disponible","info");break;case"settings":c("Fonctionnalité Paramètres bientôt disponible","info");break}})})}function Je(){!N()&&s&&(document.getElementById("sidebar").style.display="flex",document.getElementById("chatArea").style.display="flex")}function N(){return window.innerWidth<768}let p=null,S=[];async function D(){try{if(!s){c("Sélectionnez une conversation d'abord","error");return}const e=await navigator.mediaDevices.getUserMedia({audio:!0});p=new MediaRecorder(e),S=[],p.ondataavailable=n=>{S.push(n.data)},p.onstop=async()=>{const n=new Blob(S,{type:"audio/mp3"});await Xe(n,s),e.getTracks().forEach(r=>r.stop())},p.start(),c("Enregistrement en cours... Cliquez à nouveau pour arrêter","info");const t=document.getElementById("voiceBtn");t.innerHTML='<i class="fas fa-stop text-xl text-red-500"></i>',t.onclick=W}catch(e){console.error("Erreur enregistrement vocal:",e),c("Impossible d'accéder au microphone","error")}}function W(){if(p&&p.state==="recording"){p.stop();const e=document.getElementById("voiceBtn");e.innerHTML='<i class="fas fa-microphone text-xl"></i>',e.onclick=D,c("Message vocal envoyé","success")}}function We(e){if(!e||!isFinite(e)||isNaN(e))return"0:05";const t=Math.floor(e/60),n=Math.floor(e%60);return`${t}:${n.toString().padStart(2,"0")}`}async function Xe(e,t){try{const n=g();if(!n||!t)return;const r=await new Promise(o=>{const i=new FileReader;i.onloadend=()=>o(i.result),i.readAsDataURL(e)}),a={id:Date.now(),senderId:n.id,receiverId:t.id,text:"Message vocal",sent:!0,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),timestamp:new Date().toISOString(),type:"voice",fileData:r,status:"sent"};await J(a)}catch(n){console.error("Erreur envoi message vocal:",n),c("Erreur lors de l'envoi du message vocal","error")}}function Ge(){const e=document.getElementById("voiceBtn");e&&e.addEventListener("click",()=>{p&&p.state==="recording"?W():D()})}function Ke(e){const t=g();if(t)try{const n=v.find(r=>r.id===e.senderId||r.id===e.receiverId);if(!n)return;n.messages=n.messages||[],n.messages.push(e),n.lastMessage=e.text,n.time=e.time,n.lastMessageTime=e.timestamp,e.senderId!==t.id&&(!s||s.id!==n.id)&&(n.unread=(n.unread||0)+1,O(n.name,e.text)),s&&(s.id===n.id||s.id===e.senderId)&&w(),y()}catch(n){console.error("Erreur lors du traitement du nouveau message:",n)}}function _e(e,t){try{const n=v.find(r=>r.id===e);if(n&&(n.isOnline=t,n.status=t?"en ligne":"hors ligne",y(),s&&s.id===e)){const r=document.getElementById("chatStatus");r&&(r.textContent=n.status)}}catch(n){console.error("Erreur mise à jour statut:",n)}}function Ze(){window.refreshInterval&&clearInterval(window.refreshInterval),window.refreshInterval=setInterval(async()=>{try{if(s){const t=await j(s.id);JSON.stringify(s.messages)!==JSON.stringify(t)&&(s.messages=t,w())}const e=await A();JSON.stringify(v)!==JSON.stringify(e)&&(v=e,y())}catch(e){console.error("Erreur rafraîchissement:",e)}},2e3)}window.renderMessages=w;window.renderChatList=y;window.sendVoiceMessage=async function(e){if(s)try{const t=g();if(!t)return;s.messages=s.messages||[],s.messages.push(e),s.lastMessage="🎤 Message vocal",s.time=e.time,s.lastMessageTime=e.timestamp,w(),y(),await V(t.id,s.id,e)}catch(t){console.error("Erreur envoi message vocal:",t),c("Erreur lors de l'envoi du message vocal","error")}};
//# sourceMappingURL=index-91c0eb6c.js.map
