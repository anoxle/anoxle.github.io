(function() {
  document.body.innerHTML = "";
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.background = "#0F0F0F";
  document.body.style.overflow = "hidden";
  document.documentElement.style.margin = "0";
  document.documentElement.style.padding = "0";
  document.documentElement.style.background = "#0F0F0F";
  document.documentElement.style.overflow = "hidden";

  var homeUrl = window.NF_HOME || window.location.origin;

  var wrap = document.createElement("div");
  wrap.id = "nf404";
  wrap.style.cssText = "position:fixed;inset:0;background:#0F0F0F;z-index:999999;font-family:'Courier New',Courier,monospace;overflow:hidden";
  document.body.appendChild(wrap);

  var style = document.createElement("style");
  style.textContent = "#nf404 *{margin:0;padding:0;box-sizing:border-box}#nf404 .nf-label{font-size:14px;font-weight:700;letter-spacing:.25em;color:#d4d4d4;padding:28px 32px;user-select:none;display:inline-block}#nf404 .nf-label .cur{display:inline-block;width:8px;height:14px;background:#d4d4d4;margin-left:2px;vertical-align:middle;animation:nfblink .7s step-end infinite}#nf404 .tc{opacity:0;animation:nfsc .01s forwards}#nf404 .sub-info{color:#555;font-size:12px;padding:0 32px;letter-spacing:.12em;line-height:1.8}#nf404 .sub-info .ref-url{color:#444}#nf404 .home-link{color:#777;font-size:12px;padding:16px 32px;letter-spacing:.12em;cursor:pointer;display:inline-block;text-decoration:none;transition:color .25s ease}#nf404 .home-link:hover{color:#d4d4d4}@keyframes nfblink{0%,100%{opacity:1}50%{opacity:0}}@keyframes nfsc{to{opacity:1}}";
  wrap.appendChild(style);

  var box = document.createElement("div");
  box.className = "nf-label";
  wrap.appendChild(box);

  var msg = "PAGE NOT FOUND";
  let cur = document.createElement("span");
  cur.className = "cur";
  box.appendChild(cur);

  var n = 0;
  function doType() {
    if (n >= msg.length) {
      setTimeout(showInfo, 300);
      return;
    }
    let sp = document.createElement("span");
    sp.textContent = msg[n];
    sp.className = "tc";
    box.insertBefore(sp, cur);
    n++;
    setTimeout(doType, 70 + Math.random() * 50);
  }

  function showInfo() {
    var ref = document.referrer;
    var info = document.createElement("div");
    info.className = "sub-info";

    if (ref && ref.length > 0) {
      info.innerHTML = 'Request from: <span class="ref-url">' + ref + "</span>";
    } else {
      info.textContent = "No referring page detected.";
    }
    wrap.appendChild(info);

    var link = document.createElement("a");
    link.className = "home-link";
    link.href = homeUrl;
    link.textContent = "< Back to Home";
    wrap.appendChild(link);
  }

  setTimeout(doType, 400);
})();