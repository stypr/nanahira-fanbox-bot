const api_server = "https://api.fanbox.cc";

// sha256-utf8: https://username1565.github.io/sha256/sha256_utf8.html
var sha256=function(r){function n(r,n){var t=(65535&r)+(65535&n);return(r>>16)+(n>>16)+(t>>16)<<16|65535&t}function t(r,n){return r>>>n|r<<32-n}function e(r,n){return r>>>n}return function(r){for(var n="0123456789abcdef",t="",e=0;e<4*r.length;e++)t+=n.charAt(r[e>>2]>>8*(3-e%4)+4&15)+n.charAt(r[e>>2]>>8*(3-e%4)&15);return t}(function(r,a){var o,f,u,h,c,i,C,g,v,d,A,l,m,S,y,w,b,p,s=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),j=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),k=new Array(64);r[a>>5]|=128<<24-a%32,r[15+(a+64>>9<<4)]=a;for(var q=0;q<r.length;q+=16){o=j[0],f=j[1],u=j[2],h=j[3],c=j[4],i=j[5],C=j[6],g=j[7];for(var x=0;x<64;x++)k[x]=x<16?r[x+q]:n(n(n(t(p=k[x-2],17)^t(p,19)^e(p,10),k[x-7]),t(b=k[x-15],7)^t(b,18)^e(b,3)),k[x-16]),v=n(n(n(n(g,t(w=c,6)^t(w,11)^t(w,25)),(y=c)&i^~y&C),s[x]),k[x]),d=n(t(S=o,2)^t(S,13)^t(S,22),(A=o)&(l=f)^A&(m=u)^l&m),g=C,C=i,i=c,c=n(h,v),h=u,u=f,f=o,o=n(v,d);j[0]=n(o,j[0]),j[1]=n(f,j[1]),j[2]=n(u,j[2]),j[3]=n(h,j[3]),j[4]=n(c,j[4]),j[5]=n(i,j[5]),j[6]=n(C,j[6]),j[7]=n(g,j[7])}return j}(function(r){for(var n=Array(),t=0;t<8*r.length;t+=8)n[t>>5]|=(255&r.charCodeAt(t/8))<<24-t%32;return n}(r=function(r){r=r.replace(/\r\n/g,"\n");for(var n="",t=0;t<r.length;t++){var e=r.charCodeAt(t);e<128?n+=String.fromCharCode(e):(127<e&&e<2048?n+=String.fromCharCode(e>>6|192):(n+=String.fromCharCode(e>>12|224),n+=String.fromCharCode(e>>6&63|128)),n+=String.fromCharCode(63&e|128))}return n}(r)),8*r.length))};

// html for the layout
var message = `
<style>
.background {
  width: 100%;
  height: 100%;
  position:fixed;
  top: 0;
  left: 0;
  background: url(https://pbs.twimg.com/profile_banners/231926590/1635175744/1500x500);
  opacity: 0.3;
}

.popup {
  font-size: 15pt;
  position: fixed;
  padding: 10px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  line-height: 1em;
}

.popup input {
  font-size: 9pt;
  text-align: center;
  padding: 10px;
  width: calc(100% - 20px);
  border: 1px solid #333;
}

#message{
  text-align: center;
}

.fade{
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 2s linear;
}
</style>
<div class="background"></div>
<div class="popup">
    Send DM to the bot with the following message.<br><hr>
    <input
        type="input"
        class="sha256"
        onclick="this.select();document.execCommand('copy');msg=document.querySelector('#message');msg.classList.add('fade');msg.innerHTML='Copied to clipboard.';"
        value="[sha256_value]"
        readonly="readonly"
    />
    <div id="message"></div>
</div>
`;

// fanbox API to check the hash
var generate_hash = function(){
    fetch(`${api_server}/post.listCreator?creatorId=nanahira&limit=10`, {
        "headers": {
            "accept": "application/json",
            "Referer": document.domain,
        },
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    })
    .then((r) => r.json())
    .then((r) => {
        let result = "";
        for(let i in r.body.items){
            result += r.body.items[i].id.toString();
            result += r.body.items[i].title;
            result += r.body.items[i].excerpt;
        }
        document.body.innerHTML = message.replace("[sha256_value]", sha256(result));
    })
    .catch((e) => {
        alert("error");
    });
}

generate_hash();
// import('//fe.gy/nanahira-fanbox-bot/script/nanahira.js');
