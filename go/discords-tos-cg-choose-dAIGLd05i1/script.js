document.addEventListener('DOMContentLoaded',function(){const loadingline=document.createElement('div');loadingline.className='loading-line';document.body.appendChild(loadingline);const links=[{name:"Discord's ToS",sub:'discord.com/terms',url:'https://discord.com/terms'},{name:"Discord's Community Guidelines",sub:'discord.com/guidelines',url:'https://discord.com/guidelines'}];const css=`
@import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');
*,*::before,*::after{box-sizing:border-box}
html{scroll-behavior:smooth}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-track{background:#1f232e}
::-webkit-scrollbar-thumb{background:rgba(114,93,230,.3);border-radius:20px}
body{margin:0;padding:0;background-color:#1f232e;background-image:radial-gradient(rgba(255,255,255,.2) 1px,transparent 0);background-size:clamp(15px,2vw,25px) clamp(15px,2vw,25px);font-family:'Segoe UI',system-ui,-apple-system,sans-serif;overflow-x:hidden;min-height:100vh;color:#fff}
.loading-line{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#725de6,#9b62da);z-index:1001;opacity:0;box-shadow:0 0 8px rgba(114,93,230,.5)}
.loading-line.animate{animation:loadLine 1.1s cubic-bezier(.22,.61,.36,1) forwards}
.main-sec{min-height:100vh;padding:24px;display:flex;justify-content:center;align-items:center}
.intro-box{background:rgba(255,255,255,.03);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:36px;width:100%;max-width:600px;text-align:center;opacity:0;animation:fadeBox .55s cubic-bezier(.16,1,.3,1) forwards}
.sub-text{font-family:'Mochiy Pop One',sans-serif;color:#a0a0a0;font-size:1.1rem;margin:0 0 25px;line-height:1.4;opacity:0;animation:revealUp .5s cubic-bezier(.16,1,.3,1) .15s forwards}
.link-list{display:flex;flex-direction:column;gap:12px;margin-bottom:20px;opacity:0;animation:revealUp .5s cubic-bezier(.16,1,.3,1) .25s forwards}
.link-btn{display:flex;align-items:center;gap:12px;padding:14px 20px;background:rgba(255,255,255,.03);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1px solid rgba(255,255,255,.08);border-radius:16px;color:#fff;text-decoration:none;font-weight:600;font-size:.95rem;cursor:pointer;transition:all .3s cubic-bezier(.165,.84,.44,1)}
.link-btn:hover{transform:translateY(-4px);border-color:rgba(114,93,230,.5);background:rgba(255,255,255,.06)}
.link-label{text-align:left;line-height:1.3}
.link-label small{display:block;color:#a0a0a0;font-weight:400;font-size:.7rem;margin-top:2px}
.divider{width:40px;height:1px;background:rgba(255,255,255,.1);margin:0 auto 18px;opacity:0;animation:revealUp .5s cubic-bezier(.16,1,.3,1) .35s forwards}
.btn-wrap{display:flex;justify-content:center;opacity:0;animation:revealUp .5s cubic-bezier(.16,1,.3,1) .4s forwards}
.nav-btn{padding:12px 32px;background:rgba(255,255,255,.08);color:#fff;border-radius:12px;font-weight:600;border:1px solid rgba(255,255,255,.1);cursor:pointer;font-size:.95rem;transition:all .3s ease;font-family:'Segoe UI',system-ui,-apple-system,sans-serif}
.nav-btn:hover{background:#fff;color:#1f232e;transform:translateY(-2px)}
.nav-btn:active{transform:translateY(0) scale(.97)}
@keyframes loadLine{0%{width:0;opacity:1}70%{width:85%;opacity:1}100%{width:100%;opacity:.6}}
@keyframes revealUp{from{opacity:0;transform:translateY(18px);filter:blur(4px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes fadeBox{from{opacity:0;transform:scale(.97) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
@media(max-width:768px){.intro-box{padding:32px 24px}.link-btn{padding:12px 16px}}
`;const sheet=document.createElement('style');sheet.textContent=css;document.head.appendChild(sheet);function initPage(){const mainsec=document.createElement('div');mainsec.className='main-sec';const box=document.createElement('div');box.className='intro-box';const subtitle=document.createElement('p');subtitle.className='sub-text';subtitle.textContent='Select a destination below';box.appendChild(subtitle);const list=document.createElement('div');list.className='link-list';for(let i=0;i<links.length;i+=1){const a=document.createElement('a');a.className='link-btn';a.href=links[i].url;a.target='_blank';a.rel='noopener';const lbl=document.createElement('div');lbl.className='link-label';lbl.innerHTML=links[i].name+'<small>'+links[i].sub+'</small>';a.appendChild(lbl);list.appendChild(a)}box.appendChild(list);const sep=document.createElement('div');sep.className='divider';box.appendChild(sep);const wrap=document.createElement('div');wrap.className='btn-wrap';const openBtn=document.createElement('button');openBtn.className='nav-btn';openBtn.textContent='Open All';openBtn.addEventListener('click',()=>{loadingline.classList.add('animate');window.open('https://discord.com/terms','_blank','noopener');setTimeout(()=>{window.location.href='https://discord.com/guidelines'},1100)});wrap.appendChild(openBtn);box.appendChild(wrap);mainsec.appendChild(box);document.body.appendChild(mainsec)}initPage()});