const __vite__mapDeps = (i, m=__vite__mapDeps, d=(m.f || (m.f = ["../../vip/js/index-Ck7eIWYS.js?v=offline2", "../../vip/css/index-DTjq876K.css?v=offline2"]))) => i.map(i => d[i]);
var Sd = Object.defineProperty
  , vd = Object.defineProperties;
var bd = Object.getOwnPropertyDescriptors;
var er = Object.getOwnPropertySymbols;
var wo = Object.prototype.hasOwnProperty
  , To = Object.prototype.propertyIsEnumerable;
var hi = (t, e, n) => e in t ? Sd(t, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: n
}) : t[e] = n
  , h = (t, e) => {
    for (var n in e || (e = {}))
        wo.call(e, n) && hi(t, n, e[n]);
    if (er)
        for (var n of er(e))
            To.call(e, n) && hi(t, n, e[n]);
    return t
}
  , R = (t, e) => vd(t, bd(e));
var Io = (t, e) => {
    var n = {};
    for (var r in t)
        wo.call(t, r) && e.indexOf(r) < 0 && (n[r] = t[r]);
    if (t != null && er)
        for (var r of er(t))
            e.indexOf(r) < 0 && To.call(t, r) && (n[r] = t[r]);
    return n
}
;
var _e = (t, e, n) => hi(t, typeof e != "symbol" ? e + "" : e, n);
var P = (t, e, n) => new Promise( (r, i) => {
    var s = c => {
        try {
            a(n.next(c))
        } catch (u) {
            i(u)
        }
    }
      , o = c => {
        try {
            a(n.throw(c))
        } catch (u) {
            i(u)
        }
    }
      , a = c => c.done ? r(c.value) : Promise.resolve(c.value).then(s, o);
    a((n = n.apply(t, e)).next())
}
);
(function() {
    try {
        var t = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {}
          , e = new t.Error().stack;
        e && (t._sentryDebugIds = t._sentryDebugIds || {},
        t._sentryDebugIds[e] = "9c513f18-5201-450e-84c3-821e78fac470",
        t._sentryDebugIdIdentifier = "sentry-dbid-9c513f18-5201-450e-84c3-821e78fac470")
    } catch (n) {}
}
)();
var Ed = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
Ed.SENTRY_RELEASE = {
    id: "e57f52a18017acf43f4f299d6f25fe56f6c57efe"
};
(function() {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload"))
        return;
    for (const i of document.querySelectorAll('link[rel="modulepreload"]'))
        r(i);
    new MutationObserver(i => {
        for (const s of i)
            if (s.type === "childList")
                for (const o of s.addedNodes)
                    o.tagName === "LINK" && o.rel === "modulepreload" && r(o)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(i) {
        const s = {};
        return i.integrity && (s.integrity = i.integrity),
        i.referrerPolicy && (s.referrerPolicy = i.referrerPolicy),
        i.crossOrigin === "use-credentials" ? s.credentials = "include" : i.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin",
        s
    }
    function r(i) {
        if (i.ep)
            return;
        i.ep = !0;
        const s = n(i);
        fetch(i.href, s)
    }
}
)();
( () => {
    let t = 0;
    const e = {}
      , n = ["buildRequest", "extractResponse", "getUid", "getTicket", "getArea", "getLanguage", "getDeviceId", "getDeviceIsSimulator", "getNative", "requestImageChooser", "requestImageChooserFromAlbum", "requestAudioChooser", "httpRequest", "openChargePage", "upgradeRewardEvent", "onImageChooserResult", "onAudioChooserResult", "isAuditedVersion", "openPersonPage"]
      , r = {
        getTicket: "ticket",
        getUid: "uid",
        getDeviceId: "deviceId",
        getArea: "area",
        getLanguage: "lang",
        getNative: "native",
        isAuditedVersion: "auditedVersion",
        requestImageChooser: "requestImageChooser",
        requestImageChooserFromAlbum: "requestImageChooserFromAlbum",
        requestAudioChooser: "requestAudioChooser",
        onImageChooserResult: "onImageChooserResult",
        onAudioChooserResult: "onAudioChooserResult",
        httpRequest: "httpRequest",
        getDeviceIsSimulator: "isSimulator"
    }
      , i = ["showShareButton", "getNative", "httpRequest", "getDeviceId", "getDeviceIsSimulator"]
      , s = {
        getNative: "native"
    }
      , o = ( () => {
        const u = {
            ios: /(iPhone|iPad|iPod|iOS)/i,
            android: /(Android)/i
        }
          , l = navigator.userAgent;
        return u.ios.test(l) ? "ios" : u.android.test(l) ? "android" : "other"
    }
    )();
    window.appSystem = o;
    const a = u => Object.prototype.toString.call(u) == "[object Function]"
      , c = u => {
        if (typeof u == "string")
            try {
                return typeof JSON.parse(u) == "object"
            } catch (l) {
                return !1
            }
        else
            return !1
    }
      , y = u => {
        switch (u) {
        case "getUid":
            return sessionStorage.getItem("uid") || "";
        case "getTicket":
            return sessionStorage.getItem("ticket") || "";
        case "getLanguage":
            return sessionStorage.getItem("language") || "en";
        case "getDeviceId":
            return sessionStorage.getItem("deviceId") || "";
        case "getArea":
            return sessionStorage.getItem("area") || "";
        case "getNative":
            return "web";
        case "getDeviceIsSimulator":
        case "isAuditedVersion":
            return !1;
        default:
            return ""
        }
    }
    ;
    window.shareInfo = u => {}
    ,
    window.onWebViewWillAppear = u => {}
    ,
    window.onStart = u => {}
    ,
    window.appCallJs = u => {
        u = c(u) ? JSON.parse(u) : u,
        e[u.id] && e[u.id](u.data),
        delete e[u.id]
    }
    ,
    window.getMessage = (u, l) => {
        l = c(l) ? JSON.parse(l) : l,
        e[u] && e[u](l),
        delete e[u]
    }
    ,
    window.appFun = function() {
        const u = arguments;
        try {
            return new Promise(l => {
                const d = Array.prototype.shift.call(u);
                let f = {};
                const p = a(u[0]) ? u[0] : u[1];
                if (a(u[0]) && (u[0] = void 0),
                o === "ios")
                    if (f = window.webkit && window.webkit.messageHandlers ? window.webkit.messageHandlers : window.ReactNativeWebView,
                    !f) {
                        const m = y(d);
                        p && p(m),
                        l(m);
                        return
                    } else if (n.indexOf(d) > -1) {
                        let m = t;
                        if (m = r[d] || m,
                        e[m] = function(g) {
                            p && p(g),
                            l(g)
                        }
                        ,
                        u[0] !== void 0) {
                            const g = {
                                id: m,
                                data: {}
                            };
                            if (c(u[0]) ? g.data = JSON.parse(u[0]) : g.data = u[0],
                            u[0] == "noParam" && (g.data = {}),
                            u[0] = JSON.stringify(g),
                            f.hasOwnProperty("postMessage"))
                                f.postMessage(JSON.stringify({
                                    type: d,
                                    data: u[0] || null
                                }));
                            else {
                                if (s[d])
                                    return;
                                f[d] && f[d].postMessage(u[0])
                            }
                        } else if (f.hasOwnProperty("postMessage"))
                            f.postMessage(JSON.stringify({
                                type: d,
                                data: u[0] || null
                            }));
                        else {
                            if (s[d])
                                return;
                            f[d] && f[d].postMessage(null)
                        }
                        t++
                    } else if (u[0] !== void 0)
                        if (f.hasOwnProperty("postMessage"))
                            f.postMessage(JSON.stringify({
                                type: d,
                                data: u[0] || null
                            }));
                        else {
                            if (s[d])
                                return;
                            f[d] && f[d].postMessage(u[0])
                        }
                    else if (f.hasOwnProperty("postMessage"))
                        f.postMessage(JSON.stringify({
                            type: d,
                            data: u[0] || null
                        }));
                    else {
                        if (s[d])
                            return;
                        f[d] && f[d].postMessage(null)
                    }
                else {
                    if (f = window.androidJsObj,
                    !f || typeof f[d] != "function") {
                        const m = y(d);
                        p && p(m),
                        l(m);
                        return
                    }
                    if (s[d]) {
                        p && p(s[d]),
                        l(s[d]);
                        return
                    }
                    if (i.indexOf(d) > -1) {
                        if (e[t] = m => {
                            p && p(m),
                            l(m)
                        }
                        ,
                        u[0] !== void 0) {
                            const m = {
                                id: t,
                                data: {}
                            };
                            c(u[0]) ? m.data = JSON.parse(u[0]) : m.data = u[0],
                            u[0] = JSON.stringify(m),
                            f[d](u[0])
                        } else
                            f[d]();
                        t++
                    } else
                        console.log(p, "kkkkkkkkk"),
                        u[0] !== void 0 && u[0] !== "noParam" ? p ? (p(f[d](u[0])),
                        l(!0)) : l(f[d](u[0])) : p ? (p(f[d]()),
                        l(!0)) : l(f[d]())
                }
            }
            )
        } catch (l) {
            console.log(l, "错误")
        }
    }
}
)();
const Yi = ( () => {
    const t = {
        VITE_APP_URL: "",
        VITE_APP_CDNURL: "",
        VITE_APP_QNURL: "",
        VITE_APP_QNURL_Habby: ""
    };
    return window.location.protocol,
    t.VITE_APP_URL = "https://jsonplaceholder.typicode.com",
    t.VITE_APP_QNURL = "https://jsonplaceholder.typicode.com",
    t.VITE_APP_CDNURL = "https://jsonplaceholder.typicode.com",
    t.VITE_APP_QNURL_Habby = void 0,
    t
}
)()
  , Ic = {
    routeTitle: {
        LevelInfo: "My level",
        roomReward: "Room Support",
        vip: "VIP Center",
        serverLaunchEvent: "Game carnival！",
        rechargeSpree: "Recharge Spree",
        discountEvent: `50% off
Big Sale！`
    },
    common: {
        common_0: "rank rewards",
        common_1: "opening the screen ad*{0}",
        common_2: "Naming rights to gifts*{0}",
        common_3: "banner*{0}",
        common_4: "Couple headwear*{0}",
        common_5: "Badge*{0}",
        common_6: "Ride*{0}",
        common_7: "Headwear*{0}",
        common_8: " {0} coins",
        common_9: "Custom Ride*{0}",
        common_10: "Custom Ride",
        common_11: "Custom Badge",
        common_12: "Custom Headwear",
        common_13: "pretty ID",
        common_14: "room theme",
        common_15: "Celebrity gift",
        common_16: "New user Badge",
        common_17: "Self-selection Ride*{0} days",
        common_18: "Music Ride",
        common_19: "Self-selection Headwear*{0}days",
        common_20: "automatically arrive",
        common_21: "Contact customer service",
        common_22: "backpack gift*{0}",
        common_23: "Lv.{0} exclusive ride",
        common_24: "permanent",
        common_25: "Value {0}w coins",
        common_26: "{0}w coins",
        common_27: "send",
        common_28: "received",
        common_29: "Naming rights",
        common_30: "Day",
        common_31: "Hour",
        common_32: "Min",
        common_33: "Sec",
        common_34: "None",
        common_35: "receive",
        common_36: "{0} gold coins backpack gift*{1}",
        common_37: "comfirm",
        common_38: "Badge",
        common_39: "Ride",
        common_40: "Headwear",
        common_41: "Cancel",
        common_42: "Confirm",
        common_43: "coins",
        common_44: "Rule",
        common_45: "More",
        common_46: "banner",
        common_47: "Days",
        common_48: "{0} gold coins backpack gift",
        common_49: "opening the screen ad",
        common_50: "normal",
        common_51: "lucky",
        common_52: "Countdown",
        common_53: "waiting for you",
        common_54: "national",
        common_55: "normal",
        common_56: "lucky",
        common_57: "Countdown",
        common_58: "Back",
        common_59: "Diamond",
        common_60: "Rules",
        common_61: "Bubble",
        common_62: "Entrance",
        common_63: "Room Frame",
        common_64: "lucky(hot)",
        common_65: "backpack gift",
        common_66: "Room background",
        common_67: "times"
    },
    vip: {
        vip_1: "VIP Sticker",
        vip_2: "Stranger restriction",
        vip_3: "Do not allow strangers to follow",
        vip_4: "Once enabled, only people you follow can follow you",
        vip_5: "Prohibits private messages from strangers",
        vip_6: "Once enabled, only users you follow will be able to send you private messages",
        vip_7: "The user has disabled follow permissions",
        vip_8: "The user has disabled private messages",
        vip_9: "VIP Tag",
        vip_10: "Frame",
        vip_11: "Entry",
        vip_12: "Profile",
        vip_13: "Bubble",
        vip_14: "Mic Wave",
        vip_15: "Badge",
        vip_16: "VIP Gifts",
        vip_17: "Featured names",
        vip_18: "Stranger Restriction",
        vip_19: "Visitor Records",
        vip_20: "Anti-Mute Mic",
        vip_21: "Anti-Kick",
        vip_22: "Identification",
        vip_23: "A VIP exclusive tag will appear before your name",
        vip_24: "VIP Exclusive frame",
        vip_25: "VIP Exclusive entry",
        vip_26: "VIP Special profile card style",
        vip_27: "VIPs will have a special background when posting on the public chat",
        vip_28: "VIPs have a special mic wave color when speaking from their seats",
        vip_29: "Exclusive privilege",
        vip_30: "VIP have exclusive badge",
        vip_31: "VIP's name will be displayed in a special color",
        vip_32: "VIP can use exclusive sticker",
        vip_33: "VIP can block contact from strangers",
        vip_34: "VIP can block contact from strangers",
        vip_35: "VIP members can view their visitors on their profile page.",
        vip_36: "VIP won't have their mic banned",
        vip_37: "VIP will not be kicked out of the room",
        vip_38: "VIPs can send exclusive gifts.",
        knight: "Knight",
        baron: "Baron",
        earl: "Earl",
        marquis: "Marquis",
        duke: "Duke",
        king: "King",
        not: "Not activated yet",
        privilege: "Exclusive privilege",
        badge: "Badge",
        entrance: "Entrance Effect",
        gift: "VIP Gift",
        seat: "VIP Seat",
        kick: "Anti Kick",
        mute: "Anti Mute",
        day: "{coin} Coins / 30 DAYS",
        join: "Join VIP",
        activated: "VIP is activated {day} days {hour} hours remaining",
        sure: "Are you sure to consume {co} coins to become {be} ?",
        cancel: "Cancel",
        confirm: "Confirm",
        success: "Purchase succeeded",
        enough: "Not enough coins, please rechage.",
        already: "You already have higher VIP",
        month: "{coins} Coins / Month",
        eachBa: "Each VIP level has a different badge. The higher the level, the more gorgeous the badge.",
        eachEn: "Each VIP level has a different Entrance Effect. Go into the live room with a entrance effect, show off your VIP.",
        becomingGift: "Becoming a VIP can give exclusive gifts.",
        becomingSeat: "Become a VIP and have an exclusive seat, attract attention from the crowd",
        becomingDuke: "Become Duke or above can avoid to be kick by broabcast.",
        speak: "Do you want to speak more freely in the live room? Become Duke or above can avoid to be mute by broabcast.",
        headwear: "Headwear",
        chat: "Chat Bubble",
        pe: "Profile Effect",
        evl1: "Each VIP level has a different headwear. The higher the level, the more gorgeous the headwear.",
        evl2: "Each VIP level has a different chat bubble. The higher the level, the more gorgeous the chat bubble.",
        evl3: "Each VIP level has a different profile effect. The higher the level, the more gorgeous the profile effect.",
        cs: "Coming soon",
        hn: "Highlight name",
        vdc: "VIP data card",
        lm: "Like Me",
        vf: "Visitor function",
        abm: "Anti-ban mic",
        Identification: "Identification",
        iden1: "Membership",
        iden2: "Customized Headwear",
        iden3: "Entrance Effects",
        iden4: "Mic Wave",
        iden5: "Exclusive Bubble",
        iden6: "Room Card",
        iden1_1: "Shown in Profile,Room Card,Room chat,Friend List and Ranking",
        iden2_1: "Shown in Profile,Room Card,Room chat,Friend List and Ranking",
        iden3_1: "Exclusive entrance effects when you enter any room",
        iden4_1: "VIP mic wave",
        iden5_1: "Colorful messages in chat",
        iden6_1: "Display member-specific profile card styles in the room",
        tips: "Membership of {0} is by monthly recharge only",
        ai: "Aristocratic icon",
        remaining: "Remaining time: <i>{0} day {1} hours</i>",
        days: "days"
    }
}
  , wd = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Ic
}, Symbol.toStringTag, {
    value: "Module"
}))
  , Et = VueI18n.createI18n({
    locale: "en",
    messages: {
        en: Ic
    },
    warnHtmlMessage: !1,
    warnHtmlInMessage: "off"
})
  , Td = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: Et
}, Symbol.toStringTag, {
    value: "Module"
}));
class Id {
    constructor(e) {
        _e(this, "isCanplay", !1);
        _e(this, "isError", !1);
        _e(this, "playing", !1);
        _e(this, "options");
        _e(this, "radio", 2);
        _e(this, "gl", null);
        _e(this, "canvas", null);
        _e(this, "video", null);
        _e(this, "operatingTime", 0);
        const n = {
            src: "",
            autoplay: !1,
            loop: !0,
            muted: !0,
            volume: 0,
            canvas: null,
            width: 750,
            height: 750,
            aFrame: {
                width: 750,
                height: 864,
                x: 750,
                y: 0
            },
            rgbFrame: {
                width: 750,
                height: 864,
                x: 0,
                y: 0
            },
            onError: function() {},
            onCanplay: function() {},
            onClose: function() {}
        };
        this.isCanplay = !1,
        this.isError = !1,
        this.options = h(h({}, n), e),
        this.radio = window.devicePixelRatio,
        this.loadAlphaVideo()
    }
    loadAlphaVideo() {
        return P(this, null, function*() {
            yield this.initVideo(),
            this.initWebgl(),
            this.options.autoplay && this.video && this.video.play()
        })
    }
    initVideo() {
        return new Promise(e => {
            const {onCanplay: n, onError: r, loop: i, muted: s, volume: o, src: a} = this.options
              , c = document.createElement("video");
            c.autoplay = !1,
            c.volume = o,
            c.muted = s,
            c.loop = i,
            c.setAttribute("x-webkit-airplay", "true"),
            c.setAttribute("webkit-playsinline", "true"),
            c.setAttribute("playsinline", "true"),
            c.style.display = "none",
            c.src = a,
            c.crossOrigin = "anonymous",
            c.addEventListener("canplay", () => {
                this.playing = !0,
                this.isCanplay = !0,
                n && n()
            }
            ),
            c.addEventListener("error", () => {
                this.isError = !0,
                r && r()
            }
            ),
            c.addEventListener("play", () => {
                console.log("play"),
                window.requestAnimationFrame( () => {
                    this.drawFrame()
                }
                )
            }
            ),
            c.addEventListener("ended", () => {
                console.log("ended"),
                this.close()
            }
            ),
            c.load(),
            document.body.appendChild(c),
            this.video = c,
            e(!0)
        }
        )
    }
    drawFrame() {
        this.playing && this.drawWebglFrame(),
        window.requestAnimationFrame( () => {
            this.drawFrame()
        }
        )
    }
    drawWebglFrame() {
        const e = this.gl;
        !e || !this.video || (e.texImage2D(e.TEXTURE_2D, 0, e.RGB, e.RGB, e.UNSIGNED_BYTE, this.video),
        e.drawArrays(e.TRIANGLE_STRIP, 0, 4))
    }
    play() {
        if (this.isCanplay)
            this.playing = !0,
            this.video && this.video.play();
        else {
            if (this.isError)
                return;
            window.requestAnimationFrame( () => {
                this.play()
            }
            )
        }
    }
    pause() {
        this.playing = !1,
        this.video && this.video.pause()
    }
    close() {
        this.video && (this.video.pause(),
        this.video = null),
        this.gl && (this.gl.clearColor(0, 0, 0, 0),
        this.gl.clear(this.gl.COLOR_BUFFER_BIT),
        this.gl = null),
        this.options.onClose()
    }
    initWebgl() {
        this.canvas = this.options.canvas,
        this.canvas || (this.canvas = document.createElement("canvas"),
        document.body.appendChild(this.canvas)),
        this.canvas.width = this.options.width * this.radio,
        this.canvas.height = this.options.height * this.radio,
        this.canvas.addEventListener("click", () => {
            const u = new Date().getTime();
            if (this.operatingTime !== 0 && u - this.operatingTime < 700) {
                this.close();
                return
            }
            this.operatingTime = u,
            this.playing ? this.pause() : this.play()
        }
        );
        const e = this.canvas.getContext("webgl", {
            antialias: !0
        });
        if (!e) {
            alert("no WebGL");
            return
        }
        e.viewport(0, 0, this.options.width * this.radio, this.options.height * this.radio);
        const n = this._initShaderProgram(e);
        e.linkProgram(n),
        e.useProgram(n);
        const r = this._initBuffer(e);
        e.bindBuffer(e.ARRAY_BUFFER, r.position);
        const i = e.getAttribLocation(n, "a_position");
        e.enableVertexAttribArray(i),
        e.vertexAttribPointer(i, 2, e.FLOAT, !1, 0, 0),
        e.bindBuffer(e.ARRAY_BUFFER, r.texture);
        const s = e.getAttribLocation(n, "a_texCoord");
        e.enableVertexAttribArray(s),
        e.vertexAttribPointer(s, 2, e.FLOAT, !1, 0, 0),
        e.bindBuffer(e.ARRAY_BUFFER, r.aplha);
        const o = e.getAttribLocation(n, "a_aplha");
        e.enableVertexAttribArray(o),
        e.vertexAttribPointer(o, 2, e.FLOAT, !1, 0, 0);
        const a = this._initTexture(e);
        e.bindTexture(e.TEXTURE_2D, a);
        const c = e.getUniformLocation(n, "u_scale");
        e.uniform2fv(c, [this.radio, this.radio]),
        this.gl = e
    }
    _createShader(e, n, r) {
        const i = e.createShader(n);
        return e.shaderSource(i, r),
        e.compileShader(i),
        e.getShaderParameter(i, e.COMPILE_STATUS) || console.error(e.getShaderInfoLog(i)),
        i
    }
    _initShaderProgram(e) {
        const n = `
       attribute vec2 a_position;
       attribute vec2 a_texCoord;
       attribute vec2 a_aplha;
       varying vec2 v_texCoord;
       varying vec2 v_aplha;
       uniform vec2 u_scale;

       void main(void) {
           gl_Position = vec4(a_position, 0.0, 1.0);
           v_texCoord = a_texCoord;
           v_aplha = a_aplha;
       }
       `
          , r = `
       precision lowp float;
       varying vec2 v_texCoord;
       varying vec2 v_aplha;
       uniform sampler2D u_sampler;

       void main(void) {
           gl_FragColor = vec4(texture2D(u_sampler, v_texCoord).rgb, texture2D(u_sampler, v_aplha).r);
       }
       `
          , i = this._createShader(e, e.VERTEX_SHADER, n)
          , s = this._createShader(e, e.FRAGMENT_SHADER, r)
          , o = e.createProgram();
        return e.attachShader(o, i),
        e.attachShader(o, s),
        e.linkProgram(o),
        o
    }
    _initBuffer(e) {
        const n = new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1])
          , r = e.createBuffer();
        e.bindBuffer(e.ARRAY_BUFFER, r),
        e.bufferData(e.ARRAY_BUFFER, n, e.STATIC_DRAW);
        const i = e.createBuffer()
          , s = (1 - this.options.rgbFrame.width / this.options.aFrame.x) * this.radio;
        console.log(s, this.options.aFrame.x, this.options.rgbFrame.width);
        const o = this.options.rgbFrame.width + this.options.aFrame.width
          , a = Math.max(this.options.rgbFrame.height, this.options.aFrame.height)
          , c = this.options.rgbFrame.x / o
          , u = this.options.rgbFrame.x === 0 ? this.options.rgbFrame.width / o - s : 1 - this.options.rgbFrame.width / o - this.options.rgbFrame.x / o
          , l = this.options.aFrame.y === 0 ? 1 : 1 - this.options.rgbFrame.y / a
          , d = this.options.rgbFrame.y === 0 ? 1 - this.options.rgbFrame.height / a : 1 - this.options.rgbFrame.height / a - this.options.rgbFrame.y / a;
        console.log(`rgbXS:${c}`, `rgbXE:${u}`, `rgbYS:${l}`, `rgbYE:${d}`);
        const f = this.options.aFrame.x === 0 ? 0 : this.options.aFrame.x / o - (this.options.aFrame.x - this.options.rgbFrame.width) / o
          , p = Math.min(1 - s, (this.options.aFrame.x + this.options.aFrame.width) / o)
          , m = this.options.aFrame.y === 0 ? 1 : 1 - this.options.aFrame.y / a
          , g = this.options.aFrame.y === 0 ? 1 - this.options.aFrame.height / a : 1 - this.options.aFrame.y / a - this.options.aFrame.height / a;
        console.log(`aXS:${f}`, `aXE:${p}`, `aYS:${m}`, `aYE:${g}`);
        const S = new Float32Array([c, l, u, l, c, d, u, d]);
        e.bindBuffer(e.ARRAY_BUFFER, i),
        e.bufferData(e.ARRAY_BUFFER, S, e.STATIC_DRAW);
        const _ = e.createBuffer()
          , E = new Float32Array([f, m, p, m, f, g, p, g]);
        return e.bindBuffer(e.ARRAY_BUFFER, _),
        e.bufferData(e.ARRAY_BUFFER, E, e.STATIC_DRAW),
        {
            position: r,
            texture: i,
            aplha: _
        }
    }
    _initTexture(e) {
        const n = e.createTexture();
        return e.bindTexture(e.TEXTURE_2D, n),
        e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, 1),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
        e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE),
        n
    }
}
const {t: Bw} = Et.global;
function Rd() {
    const t = navigator.userAgent;
    console.log("userAgent:", navigator.userAgent);
    const e = window.self !== window.top;
    return {
        trident: t.indexOf("Trident") > -1,
        presto: t.indexOf("Presto") > -1,
        webKit: t.indexOf("AppleWebKit") > -1,
        gecko: t.indexOf("Gecko") > -1 && t.indexOf("KHTML") == -1,
        mobile: !!t.match(/AppleWebKit.*Mobile.*/),
        ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: t.indexOf("Android") > -1 || t.indexOf("Adr") > -1,
        iPhone: t.indexOf("iPhone") > -1,
        iPad: t.indexOf("iPad") > -1,
        webApp: t.indexOf("Safari") == -1,
        weixin: t.indexOf("MicroMessenger") > -1,
        qq: !!t.match(/\sQQ/i),
        app: t.indexOf("HoFun") > -1 || t.indexOf("hoFun") > -1,
        isInIframe: e
    }
}
const _t = R(h({}, Rd()), {
    isWebp: !1
})
  , Rc = () => new Promise(t => {
    window.isSupportWebp = !1;
    const e = new Image;
    function n(r) {
        window.isSupportWebp = r && r.type === "load" ? e.width >= 1 : !1,
        t(window.isSupportWebp),
        _t.isWebp = window.isSupportWebp
    }
    e.onerror = n,
    e.onload = n,
    e.src = "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA="
}
)
  , mt = {
    uid: "",
    ticket: "",
    lang: "en"
}
  , kd = (t, e=7) => {
    const r = new Date().getTimezoneOffset() * 6e4;
    return t + r + e * 3600 * 1e3
}
  , Je = (t, e, n=!0) => {
    if (!t)
        return null;
    const r = e;
    let i = new Date;
    typeof t == "object" ? i = t : (typeof t == "string" && (/^[0-9]+$/.test(t) ? t = parseInt(t) : t = t.replace(new RegExp(/-/gm), "/")),
    typeof t == "number" && t.toString().length === 10 && (t = t * 1e3),
    n || (t = kd(new Date(t).getTime())),
    i = new Date(t));
    const s = {
        y: i.getFullYear(),
        m: i.getMonth() + 1,
        d: i.getDate(),
        h: i.getHours(),
        i: i.getMinutes(),
        s: i.getSeconds(),
        a: i.getDay()
    };
    return r.replace(/([ymdhisa])+/g, (a, c) => {
        const u = s[c];
        return u !== void 0 ? u.toString().padStart(2, "0") : ""
    }
    )
}
  , Ad = t => new Promise( (e, n) => {
    const r = document.createElement("video");
    r.preload = "metadata",
    r.muted = !0,
    r.onloadedmetadata = function() {
        const i = r.videoWidth > r.videoHeight ? r.videoHeight : r.videoWidth
          , s = {
            width: i,
            height: i
        };
        window.URL.revokeObjectURL(r.src),
        e(s)
    }
    ,
    r.onerror = function() {
        window.URL.revokeObjectURL(r.src),
        n(new Error("无法加载视频元数据"))
    }
    ,
    r.src = t
}
)
  , Wr = (t=null) => P(void 0, null, function*() {
    let e = sessionStorage.getItem("uid") || ""
      , n = sessionStorage.getItem("ticket") || ""
      , r = sessionStorage.getItem("language") || "";
    const i = (Math.random() * 10).toFixed(2);
    try {
        _t.app ? (t === null && (e.length === 0 || n.length === 0 || r.length === 0) && (console.log("发起请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "ALL"),
        e = yield window.appFun("getUid"),
        n = yield window.appFun("getTicket"),
        r = yield window.appFun("getLanguage"),
        console.log("完成请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "ALL")),
        t === "uid" && e.length === 0 && (console.log("发起请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "getUid"),
        e = yield window.appFun("getUid"),
        console.log("完成请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "getUid")),
        t === "ticket" && n.length === 0 && (console.log("发起请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "getTicket"),
        n = yield window.appFun("getTicket"),
        console.log("完成请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "getTicket")),
        t === "language" && r.length === 0 && (console.log("发起请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "getLanguage"),
        r = yield window.appFun("getLanguage"),
        console.log("完成请求客户端", i, Je(new Date().getTime(), "yyyy-mm-dd hh:ii:ss"), "getLanguage")),
        sessionStorage.setItem("uid", e),
        sessionStorage.setItem("ticket", n),
        sessionStorage.setItem("language", r)) : (sessionStorage.setItem("uid", e),
        sessionStorage.setItem("ticket", n),
        sessionStorage.setItem("language", r))
    } catch (s) {
        console.log("error", s)
    }
    return {
        uid: e,
        ticket: n,
        language: r
    }
})
  , Cd = t => P(void 0, null, function*() {
    try {
        const {language: e} = yield Wr("language")
          , n = yield Rc()
          , r = window.location.hash.split("#/")[1].split("?")[0];
        if (!r)
            return;
        const s = t[r];
        if (!s)
            return;
        let o = s[e] || s.en;
        if (console.log("perloadList:", o),
        !o)
            return;
        if (console.log("isWebp:", n),
        n) {
            const a = o.filter(c => c.split("?")[0].split(".")[c.split(".").length - 1] === "webp");
            o.forEach(c => {
                let u = "";
                c.split(".").forEach( (l, d) => {
                    d !== c.split(".").length - 1 && (u += l)
                }
                ),
                a.indexOf(u) < 0 || a.push(c)
            }
            ),
            o = a
        } else
            o = o.filter(a => a.split(".")[a.split(".").length - 1] !== "webp");
        console.log("perloadList", o),
        window.requestAnimationFrame( () => {
            const a = document.querySelector("head");
            a && o.forEach(c => {
                const u = document.createElement("link");
                console.log(c),
                u.href = c,
                u.as = "image",
                u.rel = "preload",
                u.setAttribute("fetchpriority", "high"),
                a.prepend(u)
            }
            )
        }
        )
    } catch (e) {
        console.log("preloadElementImage:error", e)
    }
})
  , Od = {}
  , xd = {
    setup() {
        const t = VueRouter.useRoute()
          , e = Vue.ref(!1)
          , n = Vue.ref();
        Vue.watch(t, () => {
            if (t.query.box) {
                e.value = !0;
                const i = t.query.fullScreen;
                n.value = i === "undefined" ? !1 : JSON.parse(i)
            }
        }
        , {
            immediate: !0
        });
        const r = Vue.ref(!1);
        return Vue.onMounted( () => P(this, null, function*() {
            const {language: i} = yield Wr("language");
            console.log(i, "lang");
            let s = document.documentElement;
            s.style.setProperty("--languageBody", i === "ar" || i === "fa" || i === "ur" ? "scale(-1, 1)" : "scale(1,1)"),
            s.style.setProperty("--languageSpan-direction", i === "ar" || i === "fa" || i === "ur" ? "rtl" : "ltr"),
            s.style.setProperty("--input-align", i === "ar" || i === "fa" || i === "ur" ? "right" : "left"),
            r.value = !0
        })),
        {
            isLoad: r,
            isFullScreen: n,
            isBoxOpen: e
        }
    }
}
  , Md = (t, e) => {
    const n = t.__vccOpts || t;
    for (const [r,i] of e)
        n[r] = i;
    return n
}
;
function Dd(t, e, n, r, i, s) {
    const o = Vue.resolveComponent("router-view");
    return Vue.openBlock(),
    Vue.createElementBlock("div", {
        class: Vue.normalizeClass(["main", r.isFullScreen ? "fullScreenBox" : "", r.isBoxOpen ? "boxOpen" : ""])
    }, [r.isLoad ? (Vue.openBlock(),
    Vue.createBlock(o, {
        key: 0
    }, {
        default: Vue.withCtx( ({Component: a}) => [(Vue.openBlock(),
        Vue.createBlock(Vue.KeepAlive, null, [t.$route.meta.keepAlive ? (Vue.openBlock(),
        Vue.createBlock(Vue.resolveDynamicComponent(a), {
            key: 0
        })) : Vue.createCommentVNode("", !0)], 1024)), t.$route.meta.keepAlive ? Vue.createCommentVNode("", !0) : (Vue.openBlock(),
        Vue.createBlock(Vue.resolveDynamicComponent(a), {
            key: 0
        }))]),
        _: 1
    })) : Vue.createCommentVNode("", !0)], 2)
}
const Pd = Md(xd, [["render", Dd]])
  , gt = Vue.createApp(Pd)
  , Nd = "modulepreload"
  , Ld = function(t, e) {
    return new URL(t,e).href
}
  , Ro = {}
  , Se = function(e, n, r) {
    let i = Promise.resolve();
    if (n && n.length > 0) {
        const o = document.getElementsByTagName("link")
          , a = document.querySelector("meta[property=csp-nonce]")
          , c = (a == null ? void 0 : a.nonce) || (a == null ? void 0 : a.getAttribute("nonce"));
        i = Promise.allSettled(n.map(u => {
            if (u = Ld(u, r),
            u in Ro)
                return;
            Ro[u] = !0;
            const l = u.split(/[?#]/)[0].endsWith(".css") || u.includes(".css?") || u.includes(".css#")
              , d = l ? '[rel="stylesheet"]' : "";
            if (!!r)
                for (let m = o.length - 1; m >= 0; m--) {
                    const g = o[m];
                    if (g.href === u && (!l || g.rel === "stylesheet"))
                        return
                }
            else if (document.querySelector(`link[href="${u}"]${d}`))
                return;
            const p = document.createElement("link");
            if (p.rel = l ? "stylesheet" : Nd,
            l || (p.as = "script"),
            p.crossOrigin = "",
            p.href = u,
            c && p.setAttribute("nonce", c),
            document.head.appendChild(p),
            l)
                return new Promise( (m, g) => {
                    p.addEventListener("load", m),
                    p.addEventListener("error", () => g(new Error(`Unable to preload CSS for ${u}`)))
                }
                )
        }
        ))
    }
    function s(o) {
        const a = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (a.payload = o,
        window.dispatchEvent(a),
        !a.defaultPrevented)
            throw o
    }
    return i.then(o => {
        for (const a of o || [])
            a.status === "rejected" && s(a.reason);
        return e().catch(s)
    }
    )
}
  , Fd = [{
    name: "vip",
    path: "/VIP_2025",
    component: () => Se( () => import("../../vip/js/index-Ck7eIWYS.js?v=offline2"), __vite__mapDeps([0, 1]), import.meta.url).then(t => {
        const e = "default";
        return t[e] && typeof t[e] == "object" && "__esModule"in t[e] ? t[e] : t
    }
    ),
    meta: {
        setTitle: !0
    }
}]
  , $d = []
  , ko = () => ({
    actRouter: Fd,
    modRouter: $d
})
  , Bd = Object.assign({
    "./ar-SA.ts": () => Se( () => import("../public/js/ar-SA-BDVvx-Bj.js"), [], import.meta.url),
    "./ar.ts": () => Se( () => import("../public/js/ar-BpVSKnxs.js"), [], import.meta.url),
    "./en.ts": () => Se( () => Promise.resolve().then( () => wd), void 0, import.meta.url),
    "./es.ts": () => Se( () => import("../public/js/es-uOWm1m_e.js"), [], import.meta.url),
    "./fa.ts": () => Se( () => import("../public/js/fa-CR_u9yx4.js"), [], import.meta.url),
    "./fr.ts": () => Se( () => import("../public/js/fr-NZXcoaDB.js"), [], import.meta.url),
    "./in.ts": () => Se( () => import("../public/js/in-B9a3tFQ1.js"), [], import.meta.url),
    "./index.ts": () => Se( () => Promise.resolve().then( () => Td), void 0, import.meta.url),
    "./pt-BR.ts": () => Se( () => import("../public/js/pt-BR-BYUxHs3T.js"), [], import.meta.url),
    "./pt.ts": () => Se( () => import("../public/js/pt-D8-BqWN8.js"), [], import.meta.url),
    "./tr.ts": () => Se( () => import("../public/js/tr-TFqA3H6K.js"), [], import.meta.url),
    "./ur.ts": () => Se( () => import("../public/js/ur-CD3l8c9N.js"), [], import.meta.url),
    "./vi.ts": () => Se( () => import("../public/js/vi-v7tLINka.js"), [], import.meta.url)
})
  , Ud = ["en", "ar", "pt", "fr", "fa", "ur"]
  , Ao = ["en"];
function Xi(t) {
    return Ao.includes(t) || !Ud.includes(t) || !Bd[`./${t}.ts`] ? Promise.resolve() : Bd[`./${t}.ts`]().then(e => {
        Et.global.setLocaleMessage(t, e.default),
        Et.global.locale = t,
        Ao.push(t)
    }
    ).catch( () => {
        sessionStorage.setItem("language", "en"),
        Et.global.locale = "en"
    }
    )
}
const kc = Object.prototype.toString;
function Ac(t) {
    switch (kc.call(t)) {
    case "[object Error]":
    case "[object Exception]":
    case "[object DOMException]":
        return !0;
    default:
        return Ge(t, Error)
    }
}
function an(t, e) {
    return kc.call(t) === `[object ${e}]`
}
function xs(t) {
    return an(t, "ErrorEvent")
}
function Co(t) {
    return an(t, "DOMError")
}
function Hd(t) {
    return an(t, "DOMException")
}
function $e(t) {
    return an(t, "String")
}
function Ms(t) {
    return typeof t == "object" && t !== null && "__sentry_template_string__"in t && "__sentry_template_values__"in t
}
function Ds(t) {
    return t === null || Ms(t) || typeof t != "object" && typeof t != "function"
}
function Xt(t) {
    return an(t, "Object")
}
function qr(t) {
    return typeof Event != "undefined" && Ge(t, Event)
}
function Wd(t) {
    return typeof Element != "undefined" && Ge(t, Element)
}
function qd(t) {
    return an(t, "RegExp")
}
function Vr(t) {
    return !!(t && t.then && typeof t.then == "function")
}
function Vd(t) {
    return Xt(t) && "nativeEvent"in t && "preventDefault"in t && "stopPropagation"in t
}
function Cc(t) {
    return typeof t == "number" && t !== t
}
function Ge(t, e) {
    try {
        return t instanceof e
    } catch (n) {
        return !1
    }
}
function Oc(t) {
    return !!(typeof t == "object" && t !== null && (t.__isVue || t._isVue))
}
function jt(t, e=0) {
    return typeof t != "string" || e === 0 || t.length <= e ? t : `${t.slice(0, e)}...`
}
function Oo(t, e) {
    if (!Array.isArray(t))
        return "";
    const n = [];
    for (let r = 0; r < t.length; r++) {
        const i = t[r];
        try {
            Oc(i) ? n.push("[VueViewModel]") : n.push(String(i))
        } catch (s) {
            n.push("[value cannot be serialized]")
        }
    }
    return n.join(e)
}
function jd(t, e, n=!1) {
    return $e(t) ? qd(e) ? e.test(t) : $e(e) ? n ? t === e : t.includes(e) : !1 : !1
}
function cn(t, e=[], n=!1) {
    return e.some(r => jd(t, r, n))
}
function zd(t, e, n=250, r, i, s, o) {
    if (!s.exception || !s.exception.values || !o || !Ge(o.originalException, Error))
        return;
    const a = s.exception.values.length > 0 ? s.exception.values[s.exception.values.length - 1] : void 0;
    a && (s.exception.values = Gd(Ki(t, e, i, o.originalException, r, s.exception.values, a, 0), n))
}
function Ki(t, e, n, r, i, s, o, a) {
    if (s.length >= n + 1)
        return s;
    let c = [...s];
    if (Ge(r[i], Error)) {
        xo(o, a);
        const u = t(e, r[i])
          , l = c.length;
        Mo(u, i, l, a),
        c = Ki(t, e, n, r[i], i, [u, ...c], u, l)
    }
    return Array.isArray(r.errors) && r.errors.forEach( (u, l) => {
        if (Ge(u, Error)) {
            xo(o, a);
            const d = t(e, u)
              , f = c.length;
            Mo(d, `errors[${l}]`, f, a),
            c = Ki(t, e, n, u, i, [d, ...c], d, f)
        }
    }
    ),
    c
}
function xo(t, e) {
    t.mechanism = t.mechanism || {
        type: "generic",
        handled: !0
    },
    t.mechanism = R(h(h({}, t.mechanism), t.type === "AggregateError" && {
        is_exception_group: !0
    }), {
        exception_id: e
    })
}
function Mo(t, e, n, r) {
    t.mechanism = t.mechanism || {
        type: "generic",
        handled: !0
    },
    t.mechanism = R(h({}, t.mechanism), {
        type: "chained",
        source: e,
        exception_id: n,
        parent_id: r
    })
}
function Gd(t, e) {
    return t.map(n => (n.value && (n.value = jt(n.value, e)),
    n))
}
function tr(t) {
    return t && t.Math == Math ? t : void 0
}
const L = typeof globalThis == "object" && tr(globalThis) || typeof window == "object" && tr(window) || typeof self == "object" && tr(self) || typeof global == "object" && tr(global) || function() {
    return this
}() || {};
function Ps() {
    return L
}
function xc(t, e, n) {
    const r = n || L
      , i = r.__SENTRY__ = r.__SENTRY__ || {};
    return i[t] || (i[t] = e())
}
const zt = Ps()
  , Yd = 80;
function at(t, e={}) {
    if (!t)
        return "<unknown>";
    try {
        let n = t;
        const r = 5
          , i = [];
        let s = 0
          , o = 0;
        const a = " > "
          , c = a.length;
        let u;
        const l = Array.isArray(e) ? e : e.keyAttrs
          , d = !Array.isArray(e) && e.maxStringLength || Yd;
        for (; n && s++ < r && (u = Xd(n, l),
        !(u === "html" || s > 1 && o + i.length * c + u.length >= d)); )
            i.push(u),
            o += u.length,
            n = n.parentNode;
        return i.reverse().join(a)
    } catch (n) {
        return "<unknown>"
    }
}
function Xd(t, e) {
    const n = t
      , r = [];
    let i, s, o, a, c;
    if (!n || !n.tagName)
        return "";
    if (zt.HTMLElement && n instanceof HTMLElement && n.dataset && n.dataset.sentryComponent)
        return n.dataset.sentryComponent;
    r.push(n.tagName.toLowerCase());
    const u = e && e.length ? e.filter(d => n.getAttribute(d)).map(d => [d, n.getAttribute(d)]) : null;
    if (u && u.length)
        u.forEach(d => {
            r.push(`[${d[0]}="${d[1]}"]`)
        }
        );
    else if (n.id && r.push(`#${n.id}`),
    i = n.className,
    i && $e(i))
        for (s = i.split(/\s+/),
        c = 0; c < s.length; c++)
            r.push(`.${s[c]}`);
    const l = ["aria-label", "type", "name", "title", "alt"];
    for (c = 0; c < l.length; c++)
        o = l[c],
        a = n.getAttribute(o),
        a && r.push(`[${o}="${a}"]`);
    return r.join("")
}
function Kd() {
    try {
        return zt.document.location.href
    } catch (t) {
        return ""
    }
}
function Jd(t) {
    return zt.document && zt.document.querySelector ? zt.document.querySelector(t) : null
}
function Mc(t) {
    if (!zt.HTMLElement)
        return null;
    let e = t;
    const n = 5;
    for (let r = 0; r < n; r++) {
        if (!e)
            return null;
        if (e instanceof HTMLElement && e.dataset.sentryComponent)
            return e.dataset.sentryComponent;
        e = e.parentNode
    }
    return null
}
const un = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__
  , Qd = "Sentry Logger "
  , Ji = ["debug", "info", "warn", "error", "log", "assert", "trace"]
  , vr = {};
function Be(t) {
    if (!("console"in L))
        return t();
    const e = L.console
      , n = {}
      , r = Object.keys(vr);
    r.forEach(i => {
        const s = vr[i];
        n[i] = e[i],
        e[i] = s
    }
    );
    try {
        return t()
    } finally {
        r.forEach(i => {
            e[i] = n[i]
        }
        )
    }
}
function Zd() {
    let t = !1;
    const e = {
        enable: () => {
            t = !0
        }
        ,
        disable: () => {
            t = !1
        }
        ,
        isEnabled: () => t
    };
    return un ? Ji.forEach(n => {
        e[n] = (...r) => {
            t && Be( () => {
                L.console[n](`${Qd}[${n}]:`, ...r)
            }
            )
        }
    }
    ) : Ji.forEach(n => {
        e[n] = () => {}
    }
    ),
    e
}
const y = Zd()
  , ef = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
function tf(t) {
    return t === "http" || t === "https"
}
function ln(t, e=!1) {
    const {host: n, path: r, pass: i, port: s, projectId: o, protocol: a, publicKey: c} = t;
    return `${a}://${c}${e && i ? `:${i}` : ""}@${n}${s ? `:${s}` : ""}/${r && `${r}/`}${o}`
}
function nf(t) {
    const e = ef.exec(t);
    if (!e) {
        Be( () => {
            console.error(`Invalid Sentry Dsn: ${t}`)
        }
        );
        return
    }
    const [n,r,i="",s,o="",a] = e.slice(1);
    let c = ""
      , u = a;
    const l = u.split("/");
    if (l.length > 1 && (c = l.slice(0, -1).join("/"),
    u = l.pop()),
    u) {
        const d = u.match(/^\d+/);
        d && (u = d[0])
    }
    return Dc({
        host: s,
        pass: i,
        path: c,
        projectId: u,
        port: o,
        protocol: n,
        publicKey: r
    })
}
function Dc(t) {
    return {
        protocol: t.protocol,
        publicKey: t.publicKey || "",
        pass: t.pass || "",
        host: t.host,
        port: t.port || "",
        path: t.path || "",
        projectId: t.projectId
    }
}
function rf(t) {
    if (!un)
        return !0;
    const {port: e, projectId: n, protocol: r} = t;
    return ["protocol", "publicKey", "host", "projectId"].find(o => t[o] ? !1 : (y.error(`Invalid Sentry Dsn: ${o} missing`),
    !0)) ? !1 : n.match(/^\d+$/) ? tf(r) ? e && isNaN(parseInt(e, 10)) ? (y.error(`Invalid Sentry Dsn: Invalid port ${e}`),
    !1) : !0 : (y.error(`Invalid Sentry Dsn: Invalid protocol ${r}`),
    !1) : (y.error(`Invalid Sentry Dsn: Invalid projectId ${n}`),
    !1)
}
function sf(t) {
    const e = typeof t == "string" ? nf(t) : Dc(t);
    if (!(!e || !rf(e)))
        return e
}
class Le extends Error {
    constructor(e, n="warn") {
        super(e),
        this.message = e,
        this.name = new.target.prototype.constructor.name,
        Object.setPrototypeOf(this, new.target.prototype),
        this.logLevel = n
    }
}
function ue(t, e, n) {
    if (!(e in t))
        return;
    const r = t[e]
      , i = n(r);
    typeof i == "function" && Pc(i, r),
    t[e] = i
}
function wt(t, e, n) {
    try {
        Object.defineProperty(t, e, {
            value: n,
            writable: !0,
            configurable: !0
        })
    } catch (r) {
        un && y.log(`Failed to add non-enumerable property "${e}" to object`, t)
    }
}
function Pc(t, e) {
    try {
        const n = e.prototype || {};
        t.prototype = e.prototype = n,
        wt(t, "__sentry_original__", e)
    } catch (n) {}
}
function Ns(t) {
    return t.__sentry_original__
}
function of(t) {
    return Object.keys(t).map(e => `${encodeURIComponent(e)}=${encodeURIComponent(t[e])}`).join("&")
}
function Nc(t) {
    if (Ac(t))
        return h({
            message: t.message,
            name: t.name,
            stack: t.stack
        }, Po(t));
    if (qr(t)) {
        const e = h({
            type: t.type,
            target: Do(t.target),
            currentTarget: Do(t.currentTarget)
        }, Po(t));
        return typeof CustomEvent != "undefined" && Ge(t, CustomEvent) && (e.detail = t.detail),
        e
    } else
        return t
}
function Do(t) {
    try {
        return Wd(t) ? at(t) : Object.prototype.toString.call(t)
    } catch (e) {
        return "<unknown>"
    }
}
function Po(t) {
    if (typeof t == "object" && t !== null) {
        const e = {};
        for (const n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
        return e
    } else
        return {}
}
function af(t, e=40) {
    const n = Object.keys(Nc(t));
    if (n.sort(),
    !n.length)
        return "[object has no keys]";
    if (n[0].length >= e)
        return jt(n[0], e);
    for (let r = n.length; r > 0; r--) {
        const i = n.slice(0, r).join(", ");
        if (!(i.length > e))
            return r === n.length ? i : jt(i, e)
    }
    return ""
}
function ye(t) {
    return Qi(t, new Map)
}
function Qi(t, e) {
    if (cf(t)) {
        const n = e.get(t);
        if (n !== void 0)
            return n;
        const r = {};
        e.set(t, r);
        for (const i of Object.keys(t))
            typeof t[i] != "undefined" && (r[i] = Qi(t[i], e));
        return r
    }
    if (Array.isArray(t)) {
        const n = e.get(t);
        if (n !== void 0)
            return n;
        const r = [];
        return e.set(t, r),
        t.forEach(i => {
            r.push(Qi(i, e))
        }
        ),
        r
    }
    return t
}
function cf(t) {
    if (!Xt(t))
        return !1;
    try {
        const e = Object.getPrototypeOf(t).constructor.name;
        return !e || e === "Object"
    } catch (e) {
        return !0
    }
}
const Lc = 50
  , No = /\(error: (.*)\)/
  , Lo = /captureMessage|captureException/;
function Fc(...t) {
    const e = t.sort( (n, r) => n[0] - r[0]).map(n => n[1]);
    return (n, r=0) => {
        const i = []
          , s = n.split(`
`);
        for (let o = r; o < s.length; o++) {
            const a = s[o];
            if (a.length > 1024)
                continue;
            const c = No.test(a) ? a.replace(No, "$1") : a;
            if (!c.match(/\S*Error: /)) {
                for (const u of e) {
                    const l = u(c);
                    if (l) {
                        i.push(l);
                        break
                    }
                }
                if (i.length >= Lc)
                    break
            }
        }
        return lf(i)
    }
}
function uf(t) {
    return Array.isArray(t) ? Fc(...t) : t
}
function lf(t) {
    if (!t.length)
        return [];
    const e = Array.from(t);
    return /sentryWrapped/.test(e[e.length - 1].function || "") && e.pop(),
    e.reverse(),
    Lo.test(e[e.length - 1].function || "") && (e.pop(),
    Lo.test(e[e.length - 1].function || "") && e.pop()),
    e.slice(0, Lc).map(n => R(h({}, n), {
        filename: n.filename || e[e.length - 1].filename,
        function: n.function || "?"
    }))
}
const mi = "<anonymous>";
function Ye(t) {
    try {
        return !t || typeof t != "function" ? mi : t.name || mi
    } catch (e) {
        return mi
    }
}
const mr = {}
  , Fo = {};
function kt(t, e) {
    mr[t] = mr[t] || [],
    mr[t].push(e)
}
function At(t, e) {
    Fo[t] || (e(),
    Fo[t] = !0)
}
function ke(t, e) {
    const n = t && mr[t];
    if (n)
        for (const r of n)
            try {
                r(e)
            } catch (i) {
                un && y.error(`Error while triggering instrumentation handler.
Type: ${t}
Name: ${Ye(r)}
Error:`, i)
            }
}
function df(t) {
    const e = "console";
    kt(e, t),
    At(e, ff)
}
function ff() {
    "console"in L && Ji.forEach(function(t) {
        t in L.console && ue(L.console, t, function(e) {
            return vr[t] = e,
            function(...n) {
                ke("console", {
                    args: n,
                    level: t
                });
                const i = vr[t];
                i && i.apply(L.console, n)
            }
        })
    })
}
function ie() {
    const t = L
      , e = t.crypto || t.msCrypto;
    let n = () => Math.random() * 16;
    try {
        if (e && e.randomUUID)
            return e.randomUUID().replace(/-/g, "");
        e && e.getRandomValues && (n = () => {
            const r = new Uint8Array(1);
            return e.getRandomValues(r),
            r[0]
        }
        )
    } catch (r) {}
    return ("10000000100040008000" + 1e11).replace(/[018]/g, r => (r ^ (n() & 15) >> r / 4).toString(16))
}
function $c(t) {
    return t.exception && t.exception.values ? t.exception.values[0] : void 0
}
function nt(t) {
    const {message: e, event_id: n} = t;
    if (e)
        return e;
    const r = $c(t);
    return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || n || "<unknown>" : n || "<unknown>"
}
function Zi(t, e, n) {
    const r = t.exception = t.exception || {}
      , i = r.values = r.values || []
      , s = i[0] = i[0] || {};
    s.value || (s.value = e || ""),
    s.type || (s.type = "Error")
}
function Dn(t, e) {
    const n = $c(t);
    if (!n)
        return;
    const r = {
        type: "generic",
        handled: !0
    }
      , i = n.mechanism;
    if (n.mechanism = h(h(h({}, r), i), e),
    e && "data"in e) {
        const s = h(h({}, i && i.data), e.data);
        n.mechanism.data = s
    }
}
function $o(t) {
    if (t && t.__sentry_captured__)
        return !0;
    try {
        wt(t, "__sentry_captured__", !0)
    } catch (e) {}
    return !1
}
function Ls(t) {
    return Array.isArray(t) ? t : [t]
}
const Ft = L
  , pf = 1e3;
let Bo, es, ts;
function Bc(t) {
    const e = "dom";
    kt(e, t),
    At(e, hf)
}
function hf() {
    if (!Ft.document)
        return;
    const t = ke.bind(null, "dom")
      , e = Uo(t, !0);
    Ft.document.addEventListener("click", e, !1),
    Ft.document.addEventListener("keypress", e, !1),
    ["EventTarget", "Node"].forEach(n => {
        const r = Ft[n] && Ft[n].prototype;
        !r || !r.hasOwnProperty || !r.hasOwnProperty("addEventListener") || (ue(r, "addEventListener", function(i) {
            return function(s, o, a) {
                if (s === "click" || s == "keypress")
                    try {
                        const c = this
                          , u = c.__sentry_instrumentation_handlers__ = c.__sentry_instrumentation_handlers__ || {}
                          , l = u[s] = u[s] || {
                            refCount: 0
                        };
                        if (!l.handler) {
                            const d = Uo(t);
                            l.handler = d,
                            i.call(this, s, d, a)
                        }
                        l.refCount++
                    } catch (c) {}
                return i.call(this, s, o, a)
            }
        }),
        ue(r, "removeEventListener", function(i) {
            return function(s, o, a) {
                if (s === "click" || s == "keypress")
                    try {
                        const c = this
                          , u = c.__sentry_instrumentation_handlers__ || {}
                          , l = u[s];
                        l && (l.refCount--,
                        l.refCount <= 0 && (i.call(this, s, l.handler, a),
                        l.handler = void 0,
                        delete u[s]),
                        Object.keys(u).length === 0 && delete c.__sentry_instrumentation_handlers__)
                    } catch (c) {}
                return i.call(this, s, o, a)
            }
        }))
    }
    )
}
function mf(t) {
    if (t.type !== es)
        return !1;
    try {
        if (!t.target || t.target._sentryId !== ts)
            return !1
    } catch (e) {}
    return !0
}
function gf(t, e) {
    return t !== "keypress" ? !1 : !e || !e.tagName ? !0 : !(e.tagName === "INPUT" || e.tagName === "TEXTAREA" || e.isContentEditable)
}
function Uo(t, e=!1) {
    return n => {
        if (!n || n._sentryCaptured)
            return;
        const r = yf(n);
        if (gf(n.type, r))
            return;
        wt(n, "_sentryCaptured", !0),
        r && !r._sentryId && wt(r, "_sentryId", ie());
        const i = n.type === "keypress" ? "input" : n.type;
        mf(n) || (t({
            event: n,
            name: i,
            global: e
        }),
        es = n.type,
        ts = r ? r._sentryId : void 0),
        clearTimeout(Bo),
        Bo = Ft.setTimeout( () => {
            ts = void 0,
            es = void 0
        }
        , pf)
    }
}
function yf(t) {
    try {
        return t.target
    } catch (e) {
        return null
    }
}
const ns = Ps();
function Uc() {
    if (!("fetch"in ns))
        return !1;
    try {
        return new Headers,
        new Request("http://www.example.com"),
        new Response,
        !0
    } catch (t) {
        return !1
    }
}
function rs(t) {
    return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
}
function _f() {
    if (typeof EdgeRuntime == "string")
        return !0;
    if (!Uc())
        return !1;
    if (rs(ns.fetch))
        return !0;
    let t = !1;
    const e = ns.document;
    if (e && typeof e.createElement == "function")
        try {
            const n = e.createElement("iframe");
            n.hidden = !0,
            e.head.appendChild(n),
            n.contentWindow && n.contentWindow.fetch && (t = rs(n.contentWindow.fetch)),
            e.head.removeChild(n)
        } catch (n) {
            un && y.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", n)
        }
    return t
}
function Fs(t) {
    const e = "fetch";
    kt(e, t),
    At(e, Sf)
}
function Sf() {
    _f() && ue(L, "fetch", function(t) {
        return function(...e) {
            const {method: n, url: r} = vf(e)
              , i = {
                args: e,
                fetchData: {
                    method: n,
                    url: r
                },
                startTimestamp: Date.now()
            };
            return ke("fetch", h({}, i)),
            t.apply(L, e).then(s => {
                const o = R(h({}, i), {
                    endTimestamp: Date.now(),
                    response: s
                });
                return ke("fetch", o),
                s
            }
            , s => {
                const o = R(h({}, i), {
                    endTimestamp: Date.now(),
                    error: s
                });
                throw ke("fetch", o),
                s
            }
            )
        }
    })
}
function is(t, e) {
    return !!t && typeof t == "object" && !!t[e]
}
function Ho(t) {
    return typeof t == "string" ? t : t ? is(t, "url") ? t.url : t.toString ? t.toString() : "" : ""
}
function vf(t) {
    if (t.length === 0)
        return {
            method: "GET",
            url: ""
        };
    if (t.length === 2) {
        const [n,r] = t;
        return {
            url: Ho(n),
            method: is(r, "method") ? String(r.method).toUpperCase() : "GET"
        }
    }
    const e = t[0];
    return {
        url: Ho(e),
        method: is(e, "method") ? String(e.method).toUpperCase() : "GET"
    }
}
let nr = null;
function Hc(t) {
    const e = "error";
    kt(e, t),
    At(e, bf)
}
function bf() {
    nr = L.onerror,
    L.onerror = function(t, e, n, r, i) {
        return ke("error", {
            column: r,
            error: i,
            line: n,
            msg: t,
            url: e
        }),
        nr && !nr.__SENTRY_LOADER__ ? nr.apply(this, arguments) : !1
    }
    ,
    L.onerror.__SENTRY_INSTRUMENTED__ = !0
}
let rr = null;
function Wc(t) {
    const e = "unhandledrejection";
    kt(e, t),
    At(e, Ef)
}
function Ef() {
    rr = L.onunhandledrejection,
    L.onunhandledrejection = function(t) {
        return ke("unhandledrejection", t),
        rr && !rr.__SENTRY_LOADER__ ? rr.apply(this, arguments) : !0
    }
    ,
    L.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0
}
const ir = Ps();
function wf() {
    const t = ir.chrome
      , e = t && t.app && t.app.runtime
      , n = "history"in ir && !!ir.history.pushState && !!ir.history.replaceState;
    return !e && n
}
const gn = L;
let sr;
function jr(t) {
    const e = "history";
    kt(e, t),
    At(e, Tf)
}
function Tf() {
    if (!wf())
        return;
    const t = gn.onpopstate;
    gn.onpopstate = function(...n) {
        const r = gn.location.href
          , i = sr;
        if (sr = r,
        ke("history", {
            from: i,
            to: r
        }),
        t)
            try {
                return t.apply(this, n)
            } catch (o) {}
    }
    ;
    function e(n) {
        return function(...r) {
            const i = r.length > 2 ? r[2] : void 0;
            if (i) {
                const s = sr
                  , o = String(i);
                sr = o,
                ke("history", {
                    from: s,
                    to: o
                })
            }
            return n.apply(this, r)
        }
    }
    ue(gn.history, "pushState", e),
    ue(gn.history, "replaceState", e)
}
const If = L
  , rt = "__sentry_xhr_v3__";
function $s(t) {
    const e = "xhr";
    kt(e, t),
    At(e, Rf)
}
function Rf() {
    if (!If.XMLHttpRequest)
        return;
    const t = XMLHttpRequest.prototype;
    ue(t, "open", function(e) {
        return function(...n) {
            const r = Date.now()
              , i = $e(n[0]) ? n[0].toUpperCase() : void 0
              , s = kf(n[1]);
            if (!i || !s)
                return e.apply(this, n);
            this[rt] = {
                method: i,
                url: s,
                request_headers: {}
            },
            i === "POST" && s.match(/sentry_key/) && (this.__sentry_own_request__ = !0);
            const o = () => {
                const a = this[rt];
                if (a && this.readyState === 4) {
                    try {
                        a.status_code = this.status
                    } catch (u) {}
                    const c = {
                        args: [i, s],
                        endTimestamp: Date.now(),
                        startTimestamp: r,
                        xhr: this
                    };
                    ke("xhr", c)
                }
            }
            ;
            return "onreadystatechange"in this && typeof this.onreadystatechange == "function" ? ue(this, "onreadystatechange", function(a) {
                return function(...c) {
                    return o(),
                    a.apply(this, c)
                }
            }) : this.addEventListener("readystatechange", o),
            ue(this, "setRequestHeader", function(a) {
                return function(...c) {
                    const [u,l] = c
                      , d = this[rt];
                    return d && $e(u) && $e(l) && (d.request_headers[u.toLowerCase()] = l),
                    a.apply(this, c)
                }
            }),
            e.apply(this, n)
        }
    }),
    ue(t, "send", function(e) {
        return function(...n) {
            const r = this[rt];
            if (!r)
                return e.apply(this, n);
            n[0] !== void 0 && (r.body = n[0]);
            const i = {
                args: [r.method, r.url],
                startTimestamp: Date.now(),
                xhr: this
            };
            return ke("xhr", i),
            e.apply(this, n)
        }
    })
}
function kf(t) {
    if ($e(t))
        return t;
    try {
        return t.toString()
    } catch (e) {}
}
function Af() {
    return typeof __SENTRY_BROWSER_BUNDLE__ != "undefined" && !!__SENTRY_BROWSER_BUNDLE__
}
function Cf() {
    return "npm"
}
function Of() {
    return !Af() && Object.prototype.toString.call(typeof process != "undefined" ? process : 0) === "[object process]"
}
function Wo() {
    return typeof window != "undefined" && (!Of() || xf())
}
function xf() {
    return L.process !== void 0 && L.process.type === "renderer"
}
function Mf() {
    const t = typeof WeakSet == "function"
      , e = t ? new WeakSet : [];
    function n(i) {
        if (t)
            return e.has(i) ? !0 : (e.add(i),
            !1);
        for (let s = 0; s < e.length; s++)
            if (e[s] === i)
                return !0;
        return e.push(i),
        !1
    }
    function r(i) {
        if (t)
            e.delete(i);
        else
            for (let s = 0; s < e.length; s++)
                if (e[s] === i) {
                    e.splice(s, 1);
                    break
                }
    }
    return [n, r]
}
function De(t, e=100, n=1 / 0) {
    try {
        return ss("", t, e, n)
    } catch (r) {
        return {
            ERROR: `**non-serializable** (${r})`
        }
    }
}
function qc(t, e=3, n=100 * 1024) {
    const r = De(t, e);
    return Lf(r) > n ? qc(t, e - 1, n) : r
}
function ss(t, e, n=1 / 0, r=1 / 0, i=Mf()) {
    const [s,o] = i;
    if (e == null || ["number", "boolean", "string"].includes(typeof e) && !Cc(e))
        return e;
    const a = Df(t, e);
    if (!a.startsWith("[object "))
        return a;
    if (e.__sentry_skip_normalization__)
        return e;
    const c = typeof e.__sentry_override_normalization_depth__ == "number" ? e.__sentry_override_normalization_depth__ : n;
    if (c === 0)
        return a.replace("object ", "");
    if (s(e))
        return "[Circular ~]";
    const u = e;
    if (u && typeof u.toJSON == "function")
        try {
            const p = u.toJSON();
            return ss("", p, c - 1, r, i)
        } catch (p) {}
    const l = Array.isArray(e) ? [] : {};
    let d = 0;
    const f = Nc(e);
    for (const p in f) {
        if (!Object.prototype.hasOwnProperty.call(f, p))
            continue;
        if (d >= r) {
            l[p] = "[MaxProperties ~]";
            break
        }
        const m = f[p];
        l[p] = ss(p, m, c - 1, r, i),
        d++
    }
    return o(e),
    l
}
function Df(t, e) {
    try {
        if (t === "domain" && e && typeof e == "object" && e._events)
            return "[Domain]";
        if (t === "domainEmitter")
            return "[DomainEmitter]";
        if (typeof global != "undefined" && e === global)
            return "[Global]";
        if (typeof window != "undefined" && e === window)
            return "[Window]";
        if (typeof document != "undefined" && e === document)
            return "[Document]";
        if (Oc(e))
            return "[VueViewModel]";
        if (Vd(e))
            return "[SyntheticEvent]";
        if (typeof e == "number" && e !== e)
            return "[NaN]";
        if (typeof e == "function")
            return `[Function: ${Ye(e)}]`;
        if (typeof e == "symbol")
            return `[${String(e)}]`;
        if (typeof e == "bigint")
            return `[BigInt: ${String(e)}]`;
        const n = Pf(e);
        return /^HTML(\w*)Element$/.test(n) ? `[HTMLElement: ${n}]` : `[object ${n}]`
    } catch (n) {
        return `**non-serializable** (${n})`
    }
}
function Pf(t) {
    const e = Object.getPrototypeOf(t);
    return e ? e.constructor.name : "null prototype"
}
function Nf(t) {
    return ~-encodeURI(t).split(/%..|./).length
}
function Lf(t) {
    return Nf(JSON.stringify(t))
}
var He;
(function(t) {
    t[t.PENDING = 0] = "PENDING";
    const n = 1;
    t[t.RESOLVED = n] = "RESOLVED";
    const r = 2;
    t[t.REJECTED = r] = "REJECTED"
}
)(He || (He = {}));
function Kt(t) {
    return new Ee(e => {
        e(t)
    }
    )
}
function Bs(t) {
    return new Ee( (e, n) => {
        n(t)
    }
    )
}
class Ee {
    constructor(e) {
        Ee.prototype.__init.call(this),
        Ee.prototype.__init2.call(this),
        Ee.prototype.__init3.call(this),
        Ee.prototype.__init4.call(this),
        this._state = He.PENDING,
        this._handlers = [];
        try {
            e(this._resolve, this._reject)
        } catch (n) {
            this._reject(n)
        }
    }
    then(e, n) {
        return new Ee( (r, i) => {
            this._handlers.push([!1, s => {
                if (!e)
                    r(s);
                else
                    try {
                        r(e(s))
                    } catch (o) {
                        i(o)
                    }
            }
            , s => {
                if (!n)
                    i(s);
                else
                    try {
                        r(n(s))
                    } catch (o) {
                        i(o)
                    }
            }
            ]),
            this._executeHandlers()
        }
        )
    }
    catch(e) {
        return this.then(n => n, e)
    }
    finally(e) {
        return new Ee( (n, r) => {
            let i, s;
            return this.then(o => {
                s = !1,
                i = o,
                e && e()
            }
            , o => {
                s = !0,
                i = o,
                e && e()
            }
            ).then( () => {
                if (s) {
                    r(i);
                    return
                }
                n(i)
            }
            )
        }
        )
    }
    __init() {
        this._resolve = e => {
            this._setResult(He.RESOLVED, e)
        }
    }
    __init2() {
        this._reject = e => {
            this._setResult(He.REJECTED, e)
        }
    }
    __init3() {
        this._setResult = (e, n) => {
            if (this._state === He.PENDING) {
                if (Vr(n)) {
                    n.then(this._resolve, this._reject);
                    return
                }
                this._state = e,
                this._value = n,
                this._executeHandlers()
            }
        }
    }
    __init4() {
        this._executeHandlers = () => {
            if (this._state === He.PENDING)
                return;
            const e = this._handlers.slice();
            this._handlers = [],
            e.forEach(n => {
                n[0] || (this._state === He.RESOLVED && n[1](this._value),
                this._state === He.REJECTED && n[2](this._value),
                n[0] = !0)
            }
            )
        }
    }
}
function Ff(t) {
    const e = [];
    function n() {
        return t === void 0 || e.length < t
    }
    function r(o) {
        return e.splice(e.indexOf(o), 1)[0]
    }
    function i(o) {
        if (!n())
            return Bs(new Le("Not adding Promise because buffer limit was reached."));
        const a = o();
        return e.indexOf(a) === -1 && e.push(a),
        a.then( () => r(a)).then(null, () => r(a).then(null, () => {}
        )),
        a
    }
    function s(o) {
        return new Ee( (a, c) => {
            let u = e.length;
            if (!u)
                return a(!0);
            const l = setTimeout( () => {
                o && o > 0 && a(!1)
            }
            , o);
            e.forEach(d => {
                Kt(d).then( () => {
                    --u || (clearTimeout(l),
                    a(!0))
                }
                , c)
            }
            )
        }
        )
    }
    return {
        $: e,
        add: i,
        drain: s
    }
}
function vt(t) {
    if (!t)
        return {};
    const e = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
    if (!e)
        return {};
    const n = e[6] || ""
      , r = e[8] || "";
    return {
        host: e[4],
        path: e[5],
        protocol: e[2],
        search: n,
        hash: r,
        relative: e[5] + n + r
    }
}
const $f = ["fatal", "error", "warning", "log", "info", "debug"];
function Bf(t) {
    return t === "warn" ? "warning" : $f.includes(t) ? t : "log"
}
const Vc = 1e3;
function Un() {
    return Date.now() / Vc
}
function Uf() {
    const {performance: t} = L;
    if (!t || !t.now)
        return Un;
    const e = Date.now() - t.now()
      , n = t.timeOrigin == null ? e : t.timeOrigin;
    return () => (n + t.now()) / Vc
}
const dn = Uf()
  , we = ( () => {
    const {performance: t} = L;
    if (!t || !t.now)
        return;
    const e = 3600 * 1e3
      , n = t.now()
      , r = Date.now()
      , i = t.timeOrigin ? Math.abs(t.timeOrigin + n - r) : e
      , s = i < e
      , o = t.timing && t.timing.navigationStart
      , c = typeof o == "number" ? Math.abs(o + n - r) : e
      , u = c < e;
    return s || u ? i <= c ? t.timeOrigin : o : r
}
)()
  , os = "baggage"
  , jc = "sentry-"
  , Hf = /^sentry-/
  , Wf = 8192;
function qf(t) {
    if (!$e(t) && !Array.isArray(t))
        return;
    let e = {};
    if (Array.isArray(t))
        e = t.reduce( (r, i) => {
            const s = qo(i);
            for (const o of Object.keys(s))
                r[o] = s[o];
            return r
        }
        , {});
    else {
        if (!t)
            return;
        e = qo(t)
    }
    const n = Object.entries(e).reduce( (r, [i,s]) => {
        if (i.match(Hf)) {
            const o = i.slice(jc.length);
            r[o] = s
        }
        return r
    }
    , {});
    if (Object.keys(n).length > 0)
        return n
}
function zc(t) {
    if (!t)
        return;
    const e = Object.entries(t).reduce( (n, [r,i]) => (i && (n[`${jc}${r}`] = i),
    n), {});
    return Vf(e)
}
function qo(t) {
    return t.split(",").map(e => e.split("=").map(n => decodeURIComponent(n.trim()))).reduce( (e, [n,r]) => (e[n] = r,
    e), {})
}
function Vf(t) {
    if (Object.keys(t).length !== 0)
        return Object.entries(t).reduce( (e, [n,r], i) => {
            const s = `${encodeURIComponent(n)}=${encodeURIComponent(r)}`
              , o = i === 0 ? s : `${e},${s}`;
            return o.length > Wf ? (un && y.warn(`Not adding key: ${n} with val: ${r} to baggage header due to exceeding baggage size limits.`),
            e) : o
        }
        , "")
}
const jf = new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$");
function zf(t) {
    if (!t)
        return;
    const e = t.match(jf);
    if (!e)
        return;
    let n;
    return e[3] === "1" ? n = !0 : e[3] === "0" && (n = !1),
    {
        traceId: e[1],
        parentSampled: n,
        parentSpanId: e[2]
    }
}
function Gf(t, e) {
    const n = zf(t)
      , r = qf(e)
      , {traceId: i, parentSpanId: s, parentSampled: o} = n || {};
    return n ? {
        traceId: i || ie(),
        parentSpanId: s || ie().substring(16),
        spanId: ie().substring(16),
        sampled: o,
        dsc: r || {}
    } : {
        traceId: i || ie(),
        spanId: ie().substring(16)
    }
}
function Us(t=ie(), e=ie().substring(16), n) {
    let r = "";
    return n !== void 0 && (r = n ? "-1" : "-0"),
    `${t}-${e}${r}`
}
function ut(t, e=[]) {
    return [t, e]
}
function Yf(t, e) {
    const [n,r] = t;
    return [n, [...r, e]]
}
function Vo(t, e) {
    const n = t[1];
    for (const r of n) {
        const i = r[0].type;
        if (e(r, i))
            return !0
    }
    return !1
}
function as(t, e) {
    return (e || new TextEncoder).encode(t)
}
function Xf(t, e) {
    const [n,r] = t;
    let i = JSON.stringify(n);
    function s(o) {
        typeof i == "string" ? i = typeof o == "string" ? i + o : [as(i, e), o] : i.push(typeof o == "string" ? as(o, e) : o)
    }
    for (const o of r) {
        const [a,c] = o;
        if (s(`
${JSON.stringify(a)}
`),
        typeof c == "string" || c instanceof Uint8Array)
            s(c);
        else {
            let u;
            try {
                u = JSON.stringify(c)
            } catch (l) {
                u = JSON.stringify(De(c))
            }
            s(u)
        }
    }
    return typeof i == "string" ? i : Kf(i)
}
function Kf(t) {
    const e = t.reduce( (i, s) => i + s.length, 0)
      , n = new Uint8Array(e);
    let r = 0;
    for (const i of t)
        n.set(i, r),
        r += i.length;
    return n
}
function Jf(t, e) {
    const n = typeof t.data == "string" ? as(t.data, e) : t.data;
    return [ye({
        type: "attachment",
        length: n.length,
        filename: t.filename,
        content_type: t.contentType,
        attachment_type: t.attachmentType
    }), n]
}
const Qf = {
    session: "session",
    sessions: "session",
    attachment: "attachment",
    transaction: "transaction",
    event: "error",
    client_report: "internal",
    user_report: "default",
    profile: "profile",
    replay_event: "replay",
    replay_recording: "replay",
    check_in: "monitor",
    feedback: "feedback",
    span: "span",
    statsd: "metric_bucket"
};
function jo(t) {
    return Qf[t]
}
function Hs(t) {
    if (!t || !t.sdk)
        return;
    const {name: e, version: n} = t.sdk;
    return {
        name: e,
        version: n
    }
}
function Gc(t, e, n, r) {
    const i = t.sdkProcessingMetadata && t.sdkProcessingMetadata.dynamicSamplingContext;
    return h(h(h({
        event_id: t.event_id,
        sent_at: new Date().toISOString()
    }, e && {
        sdk: e
    }), !!n && r && {
        dsn: ln(r)
    }), i && {
        trace: ye(h({}, i))
    })
}
function Zf(t, e, n) {
    const r = [{
        type: "client_report"
    }, {
        timestamp: Un(),
        discarded_events: t
    }];
    return ut(e ? {
        dsn: e
    } : {}, [r])
}
const ep = 60 * 1e3;
function tp(t, e=Date.now()) {
    const n = parseInt(`${t}`, 10);
    if (!isNaN(n))
        return n * 1e3;
    const r = Date.parse(`${t}`);
    return isNaN(r) ? ep : r - e
}
function np(t, e) {
    return t[e] || t.all || 0
}
function Yc(t, e, n=Date.now()) {
    return np(t, e) > n
}
function Xc(t, {statusCode: e, headers: n}, r=Date.now()) {
    const i = h({}, t)
      , s = n && n["x-sentry-rate-limits"]
      , o = n && n["retry-after"];
    if (s)
        for (const a of s.trim().split(",")) {
            const [c,u,,,l] = a.split(":", 5)
              , d = parseInt(c, 10)
              , f = (isNaN(d) ? 60 : d) * 1e3;
            if (!u)
                i.all = r + f;
            else
                for (const p of u.split(";"))
                    p === "metric_bucket" ? (!l || l.split(";").includes("custom")) && (i[p] = r + f) : i[p] = r + f
        }
    else
        o ? i.all = r + tp(o, r) : e === 429 && (i.all = r + 60 * 1e3);
    return i
}
function rp(t, e) {
    return t != null ? t : e()
}
function gi(t) {
    let e, n = t[0], r = 1;
    for (; r < t.length; ) {
        const i = t[r]
          , s = t[r + 1];
        if (r += 2,
        (i === "optionalAccess" || i === "optionalCall") && n == null)
            return;
        i === "access" || i === "optionalAccess" ? (e = n,
        n = s(n)) : (i === "call" || i === "optionalCall") && (n = s( (...o) => n.call(e, ...o)),
        e = void 0)
    }
    return n
}
const I = typeof __SENTRY_DEBUG__ == "undefined" || __SENTRY_DEBUG__
  , zr = "production";
function Ws() {
    return xc("globalEventProcessors", () => [])
}
function ip(t) {
    Ws().push(t)
}
function br(t, e, n, r=0) {
    return new Ee( (i, s) => {
        const o = t[r];
        if (e === null || typeof o != "function")
            i(e);
        else {
            const a = o(h({}, e), n);
            I && o.id && a === null && y.log(`Event processor "${o.id}" dropped event`),
            Vr(a) ? a.then(c => br(t, c, n, r + 1).then(i)).then(null, s) : br(t, a, n, r + 1).then(i).then(null, s)
        }
    }
    )
}
function Kc(t) {
    const e = dn()
      , n = {
        sid: ie(),
        init: !0,
        timestamp: e,
        started: e,
        duration: 0,
        status: "ok",
        errors: 0,
        ignoreDuration: !1,
        toJSON: () => sp(n)
    };
    return t && Tt(n, t),
    n
}
function Tt(t, e={}) {
    if (e.user && (!t.ipAddress && e.user.ip_address && (t.ipAddress = e.user.ip_address),
    !t.did && !e.did && (t.did = e.user.id || e.user.email || e.user.username)),
    t.timestamp = e.timestamp || dn(),
    e.abnormal_mechanism && (t.abnormal_mechanism = e.abnormal_mechanism),
    e.ignoreDuration && (t.ignoreDuration = e.ignoreDuration),
    e.sid && (t.sid = e.sid.length === 32 ? e.sid : ie()),
    e.init !== void 0 && (t.init = e.init),
    !t.did && e.did && (t.did = `${e.did}`),
    typeof e.started == "number" && (t.started = e.started),
    t.ignoreDuration)
        t.duration = void 0;
    else if (typeof e.duration == "number")
        t.duration = e.duration;
    else {
        const n = t.timestamp - t.started;
        t.duration = n >= 0 ? n : 0
    }
    e.release && (t.release = e.release),
    e.environment && (t.environment = e.environment),
    !t.ipAddress && e.ipAddress && (t.ipAddress = e.ipAddress),
    !t.userAgent && e.userAgent && (t.userAgent = e.userAgent),
    typeof e.errors == "number" && (t.errors = e.errors),
    e.status && (t.status = e.status)
}
function Jc(t, e) {
    let n = {};
    t.status === "ok" && (n = {
        status: "exited"
    }),
    Tt(t, n)
}
function sp(t) {
    return ye({
        sid: `${t.sid}`,
        init: t.init,
        started: new Date(t.started * 1e3).toISOString(),
        timestamp: new Date(t.timestamp * 1e3).toISOString(),
        status: t.status,
        errors: t.errors,
        did: typeof t.did == "number" || typeof t.did == "string" ? `${t.did}` : void 0,
        duration: t.duration,
        abnormal_mechanism: t.abnormal_mechanism,
        attrs: {
            release: t.release,
            environment: t.environment,
            ip_address: t.ipAddress,
            user_agent: t.userAgent
        }
    })
}
const op = 0
  , Qc = 1;
function qs(t) {
    const {spanId: e, traceId: n} = t.spanContext()
      , {data: r, op: i, parent_span_id: s, status: o, tags: a, origin: c} = le(t);
    return ye({
        data: r,
        op: i,
        parent_span_id: s,
        span_id: e,
        status: o,
        tags: a,
        trace_id: n,
        origin: c
    })
}
function Gr(t) {
    const {traceId: e, spanId: n} = t.spanContext()
      , r = Vs(t);
    return Us(e, n, r)
}
function Yr(t) {
    return typeof t == "number" ? zo(t) : Array.isArray(t) ? t[0] + t[1] / 1e9 : t instanceof Date ? zo(t.getTime()) : dn()
}
function zo(t) {
    return t > 9999999999 ? t / 1e3 : t
}
function le(t) {
    return ap(t) ? t.getSpanJSON() : typeof t.toJSON == "function" ? t.toJSON() : {}
}
function ap(t) {
    return typeof t.getSpanJSON == "function"
}
function Vs(t) {
    const {traceFlags: e} = t.spanContext();
    return !!(e & Qc)
}
function Zc(t, e, n, r, i, s) {
    const {normalizeDepth: o=3, normalizeMaxBreadth: a=1e3} = t
      , c = R(h({}, e), {
        event_id: e.event_id || n.event_id || ie(),
        timestamp: e.timestamp || Un()
    })
      , u = n.integrations || t.integrations.map(S => S.name);
    cp(c, t),
    dp(c, u),
    e.type === void 0 && up(c, t.stackParser);
    const l = pp(r, n.captureContext);
    n.mechanism && Dn(c, n.mechanism);
    const d = i && i.getEventProcessors ? i.getEventProcessors() : []
      , f = Rp().getScopeData();
    if (s) {
        const S = s.getScopeData();
        Ko(f, S)
    }
    if (l) {
        const S = l.getScopeData();
        Ko(f, S)
    }
    const p = [...n.attachments || [], ...f.attachments];
    p.length && (n.attachments = p),
    iu(c, f);
    const m = [...d, ...Ws(), ...f.eventProcessors];
    return br(m, c, n).then(S => (S && lp(S),
    typeof o == "number" && o > 0 ? fp(S, o, a) : S))
}
function cp(t, e) {
    const {environment: n, release: r, dist: i, maxValueLength: s=250} = e;
    "environment"in t || (t.environment = "environment"in e ? n : zr),
    t.release === void 0 && r !== void 0 && (t.release = r),
    t.dist === void 0 && i !== void 0 && (t.dist = i),
    t.message && (t.message = jt(t.message, s));
    const o = t.exception && t.exception.values && t.exception.values[0];
    o && o.value && (o.value = jt(o.value, s));
    const a = t.request;
    a && a.url && (a.url = jt(a.url, s))
}
const Go = new WeakMap;
function up(t, e) {
    const n = L._sentryDebugIds;
    if (!n)
        return;
    let r;
    const i = Go.get(e);
    i ? r = i : (r = new Map,
    Go.set(e, r));
    const s = Object.keys(n).reduce( (o, a) => {
        let c;
        const u = r.get(a);
        u ? c = u : (c = e(a),
        r.set(a, c));
        for (let l = c.length - 1; l >= 0; l--) {
            const d = c[l];
            if (d.filename) {
                o[d.filename] = n[a];
                break
            }
        }
        return o
    }
    , {});
    try {
        t.exception.values.forEach(o => {
            o.stacktrace.frames.forEach(a => {
                a.filename && (a.debug_id = s[a.filename])
            }
            )
        }
        )
    } catch (o) {}
}
function lp(t) {
    const e = {};
    try {
        t.exception.values.forEach(r => {
            r.stacktrace.frames.forEach(i => {
                i.debug_id && (i.abs_path ? e[i.abs_path] = i.debug_id : i.filename && (e[i.filename] = i.debug_id),
                delete i.debug_id)
            }
            )
        }
        )
    } catch (r) {}
    if (Object.keys(e).length === 0)
        return;
    t.debug_meta = t.debug_meta || {},
    t.debug_meta.images = t.debug_meta.images || [];
    const n = t.debug_meta.images;
    Object.keys(e).forEach(r => {
        n.push({
            type: "sourcemap",
            code_file: r,
            debug_id: e[r]
        })
    }
    )
}
function dp(t, e) {
    e.length > 0 && (t.sdk = t.sdk || {},
    t.sdk.integrations = [...t.sdk.integrations || [], ...e])
}
function fp(t, e, n) {
    if (!t)
        return null;
    const r = h(h(h(h(h({}, t), t.breadcrumbs && {
        breadcrumbs: t.breadcrumbs.map(i => h(h({}, i), i.data && {
            data: De(i.data, e, n)
        }))
    }), t.user && {
        user: De(t.user, e, n)
    }), t.contexts && {
        contexts: De(t.contexts, e, n)
    }), t.extra && {
        extra: De(t.extra, e, n)
    });
    return t.contexts && t.contexts.trace && r.contexts && (r.contexts.trace = t.contexts.trace,
    t.contexts.trace.data && (r.contexts.trace.data = De(t.contexts.trace.data, e, n))),
    t.spans && (r.spans = t.spans.map(i => {
        const s = le(i).data;
        return s && (i.data = De(s, e, n)),
        i
    }
    )),
    r
}
function pp(t, e) {
    if (!e)
        return t;
    const n = t ? t.clone() : new ze;
    return n.update(e),
    n
}
function hp(t) {
    if (t)
        return mp(t) ? {
            captureContext: t
        } : yp(t) ? {
            captureContext: t
        } : t
}
function mp(t) {
    return t instanceof ze || typeof t == "function"
}
const gp = ["user", "level", "extra", "contexts", "tags", "fingerprint", "requestSession", "propagationContext"];
function yp(t) {
    return Object.keys(t).some(e => gp.includes(e))
}
function Hn(t, e) {
    return be().captureException(t, hp(e))
}
function eu(t, e) {
    return be().captureEvent(t, e)
}
function ct(t, e) {
    be().addBreadcrumb(t, e)
}
function _p(t, e) {
    be().setContext(t, e)
}
function tu(t) {
    be().setUser(t)
}
function Sp(...t) {
    const e = be();
    if (t.length === 2) {
        const [n,r] = t;
        return n ? e.withScope( () => (e.getStackTop().scope = n,
        r(n))) : e.withScope(r)
    }
    return e.withScope(t[0])
}
function j() {
    return be().getClient()
}
function ve() {
    return be().getScope()
}
function Yo(t) {
    const e = j()
      , n = lt()
      , r = ve()
      , {release: i, environment: s=zr} = e && e.getOptions() || {}
      , {userAgent: o} = L.navigator || {}
      , a = Kc(h(h({
        release: i,
        environment: s,
        user: r.getUser() || n.getUser()
    }, o && {
        userAgent: o
    }), t))
      , c = n.getSession();
    return c && c.status === "ok" && Tt(c, {
        status: "exited"
    }),
    nu(),
    n.setSession(a),
    r.setSession(a),
    a
}
function nu() {
    const t = lt()
      , e = ve()
      , n = e.getSession() || t.getSession();
    n && Jc(n),
    ru(),
    t.setSession(),
    e.setSession()
}
function ru() {
    const t = lt()
      , e = ve()
      , n = j()
      , r = e.getSession() || t.getSession();
    r && n && n.captureSession && n.captureSession(r)
}
function Xo(t=!1) {
    if (t) {
        nu();
        return
    }
    ru()
}
function Er(t) {
    return t.transaction
}
function Xr(t, e, n) {
    const r = e.getOptions()
      , {publicKey: i} = e.getDsn() || {}
      , {segment: s} = n && n.getUser() || {}
      , o = ye({
        environment: r.environment || zr,
        release: r.release,
        user_segment: s,
        public_key: i,
        trace_id: t
    });
    return e.emit && e.emit("createDsc", o),
    o
}
function Jt(t) {
    const e = j();
    if (!e)
        return {};
    const n = Xr(le(t).trace_id || "", e, ve())
      , r = Er(t);
    if (!r)
        return n;
    const i = r && r._frozenDynamicSamplingContext;
    if (i)
        return i;
    const {sampleRate: s, source: o} = r.metadata;
    s != null && (n.sample_rate = `${s}`);
    const a = le(r);
    return o && o !== "url" && (n.transaction = a.description),
    n.sampled = String(Vs(r)),
    e.emit && e.emit("createDsc", n),
    n
}
function iu(t, e) {
    const {fingerprint: n, span: r, breadcrumbs: i, sdkProcessingMetadata: s} = e;
    vp(t, e),
    r && wp(t, r),
    Tp(t, n),
    bp(t, i),
    Ep(t, s)
}
function Ko(t, e) {
    const {extra: n, tags: r, user: i, contexts: s, level: o, sdkProcessingMetadata: a, breadcrumbs: c, fingerprint: u, eventProcessors: l, attachments: d, propagationContext: f, transactionName: p, span: m} = e;
    yn(t, "extra", n),
    yn(t, "tags", r),
    yn(t, "user", i),
    yn(t, "contexts", s),
    yn(t, "sdkProcessingMetadata", a),
    o && (t.level = o),
    p && (t.transactionName = p),
    m && (t.span = m),
    c.length && (t.breadcrumbs = [...t.breadcrumbs, ...c]),
    u.length && (t.fingerprint = [...t.fingerprint, ...u]),
    l.length && (t.eventProcessors = [...t.eventProcessors, ...l]),
    d.length && (t.attachments = [...t.attachments, ...d]),
    t.propagationContext = h(h({}, t.propagationContext), f)
}
function yn(t, e, n) {
    if (n && Object.keys(n).length) {
        t[e] = h({}, t[e]);
        for (const r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (t[e][r] = n[r])
    }
}
function vp(t, e) {
    const {extra: n, tags: r, user: i, contexts: s, level: o, transactionName: a} = e
      , c = ye(n);
    c && Object.keys(c).length && (t.extra = h(h({}, c), t.extra));
    const u = ye(r);
    u && Object.keys(u).length && (t.tags = h(h({}, u), t.tags));
    const l = ye(i);
    l && Object.keys(l).length && (t.user = h(h({}, l), t.user));
    const d = ye(s);
    d && Object.keys(d).length && (t.contexts = h(h({}, d), t.contexts)),
    o && (t.level = o),
    a && (t.transaction = a)
}
function bp(t, e) {
    const n = [...t.breadcrumbs || [], ...e];
    t.breadcrumbs = n.length ? n : void 0
}
function Ep(t, e) {
    t.sdkProcessingMetadata = h(h({}, t.sdkProcessingMetadata), e)
}
function wp(t, e) {
    t.contexts = h({
        trace: qs(e)
    }, t.contexts);
    const n = Er(e);
    if (n) {
        t.sdkProcessingMetadata = h({
            dynamicSamplingContext: Jt(e)
        }, t.sdkProcessingMetadata);
        const r = le(n).description;
        r && (t.tags = h({
            transaction: r
        }, t.tags))
    }
}
function Tp(t, e) {
    t.fingerprint = t.fingerprint ? Ls(t.fingerprint) : [],
    e && (t.fingerprint = t.fingerprint.concat(e)),
    t.fingerprint && !t.fingerprint.length && delete t.fingerprint
}
const Ip = 100;
let yi;
class ze {
    constructor() {
        this._notifyingListeners = !1,
        this._scopeListeners = [],
        this._eventProcessors = [],
        this._breadcrumbs = [],
        this._attachments = [],
        this._user = {},
        this._tags = {},
        this._extra = {},
        this._contexts = {},
        this._sdkProcessingMetadata = {},
        this._propagationContext = Jo()
    }
    static clone(e) {
        return e ? e.clone() : new ze
    }
    clone() {
        const e = new ze;
        return e._breadcrumbs = [...this._breadcrumbs],
        e._tags = h({}, this._tags),
        e._extra = h({}, this._extra),
        e._contexts = h({}, this._contexts),
        e._user = this._user,
        e._level = this._level,
        e._span = this._span,
        e._session = this._session,
        e._transactionName = this._transactionName,
        e._fingerprint = this._fingerprint,
        e._eventProcessors = [...this._eventProcessors],
        e._requestSession = this._requestSession,
        e._attachments = [...this._attachments],
        e._sdkProcessingMetadata = h({}, this._sdkProcessingMetadata),
        e._propagationContext = h({}, this._propagationContext),
        e._client = this._client,
        e
    }
    setClient(e) {
        this._client = e
    }
    getClient() {
        return this._client
    }
    addScopeListener(e) {
        this._scopeListeners.push(e)
    }
    addEventProcessor(e) {
        return this._eventProcessors.push(e),
        this
    }
    setUser(e) {
        return this._user = e || {
            email: void 0,
            id: void 0,
            ip_address: void 0,
            segment: void 0,
            username: void 0
        },
        this._session && Tt(this._session, {
            user: e
        }),
        this._notifyScopeListeners(),
        this
    }
    getUser() {
        return this._user
    }
    getRequestSession() {
        return this._requestSession
    }
    setRequestSession(e) {
        return this._requestSession = e,
        this
    }
    setTags(e) {
        return this._tags = h(h({}, this._tags), e),
        this._notifyScopeListeners(),
        this
    }
    setTag(e, n) {
        return this._tags = R(h({}, this._tags), {
            [e]: n
        }),
        this._notifyScopeListeners(),
        this
    }
    setExtras(e) {
        return this._extra = h(h({}, this._extra), e),
        this._notifyScopeListeners(),
        this
    }
    setExtra(e, n) {
        return this._extra = R(h({}, this._extra), {
            [e]: n
        }),
        this._notifyScopeListeners(),
        this
    }
    setFingerprint(e) {
        return this._fingerprint = e,
        this._notifyScopeListeners(),
        this
    }
    setLevel(e) {
        return this._level = e,
        this._notifyScopeListeners(),
        this
    }
    setTransactionName(e) {
        return this._transactionName = e,
        this._notifyScopeListeners(),
        this
    }
    setContext(e, n) {
        return n === null ? delete this._contexts[e] : this._contexts[e] = n,
        this._notifyScopeListeners(),
        this
    }
    setSpan(e) {
        return this._span = e,
        this._notifyScopeListeners(),
        this
    }
    getSpan() {
        return this._span
    }
    getTransaction() {
        const e = this._span;
        return e && e.transaction
    }
    setSession(e) {
        return e ? this._session = e : delete this._session,
        this._notifyScopeListeners(),
        this
    }
    getSession() {
        return this._session
    }
    update(e) {
        if (!e)
            return this;
        const n = typeof e == "function" ? e(this) : e;
        if (n instanceof ze) {
            const r = n.getScopeData();
            this._tags = h(h({}, this._tags), r.tags),
            this._extra = h(h({}, this._extra), r.extra),
            this._contexts = h(h({}, this._contexts), r.contexts),
            r.user && Object.keys(r.user).length && (this._user = r.user),
            r.level && (this._level = r.level),
            r.fingerprint.length && (this._fingerprint = r.fingerprint),
            n.getRequestSession() && (this._requestSession = n.getRequestSession()),
            r.propagationContext && (this._propagationContext = r.propagationContext)
        } else if (Xt(n)) {
            const r = e;
            this._tags = h(h({}, this._tags), r.tags),
            this._extra = h(h({}, this._extra), r.extra),
            this._contexts = h(h({}, this._contexts), r.contexts),
            r.user && (this._user = r.user),
            r.level && (this._level = r.level),
            r.fingerprint && (this._fingerprint = r.fingerprint),
            r.requestSession && (this._requestSession = r.requestSession),
            r.propagationContext && (this._propagationContext = r.propagationContext)
        }
        return this
    }
    clear() {
        return this._breadcrumbs = [],
        this._tags = {},
        this._extra = {},
        this._user = {},
        this._contexts = {},
        this._level = void 0,
        this._transactionName = void 0,
        this._fingerprint = void 0,
        this._requestSession = void 0,
        this._span = void 0,
        this._session = void 0,
        this._notifyScopeListeners(),
        this._attachments = [],
        this._propagationContext = Jo(),
        this
    }
    addBreadcrumb(e, n) {
        const r = typeof n == "number" ? n : Ip;
        if (r <= 0)
            return this;
        const i = h({
            timestamp: Un()
        }, e)
          , s = this._breadcrumbs;
        return s.push(i),
        this._breadcrumbs = s.length > r ? s.slice(-r) : s,
        this._notifyScopeListeners(),
        this
    }
    getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1]
    }
    clearBreadcrumbs() {
        return this._breadcrumbs = [],
        this._notifyScopeListeners(),
        this
    }
    addAttachment(e) {
        return this._attachments.push(e),
        this
    }
    getAttachments() {
        return this.getScopeData().attachments
    }
    clearAttachments() {
        return this._attachments = [],
        this
    }
    getScopeData() {
        const {_breadcrumbs: e, _attachments: n, _contexts: r, _tags: i, _extra: s, _user: o, _level: a, _fingerprint: c, _eventProcessors: u, _propagationContext: l, _sdkProcessingMetadata: d, _transactionName: f, _span: p} = this;
        return {
            breadcrumbs: e,
            attachments: n,
            contexts: r,
            tags: i,
            extra: s,
            user: o,
            level: a,
            fingerprint: c || [],
            eventProcessors: u,
            propagationContext: l,
            sdkProcessingMetadata: d,
            transactionName: f,
            span: p
        }
    }
    applyToEvent(e, n={}, r=[]) {
        iu(e, this.getScopeData());
        const i = [...r, ...Ws(), ...this._eventProcessors];
        return br(i, e, n)
    }
    setSDKProcessingMetadata(e) {
        return this._sdkProcessingMetadata = h(h({}, this._sdkProcessingMetadata), e),
        this
    }
    setPropagationContext(e) {
        return this._propagationContext = e,
        this
    }
    getPropagationContext() {
        return this._propagationContext
    }
    captureException(e, n) {
        const r = n && n.event_id ? n.event_id : ie();
        if (!this._client)
            return y.warn("No client configured on scope - will not capture exception!"),
            r;
        const i = new Error("Sentry syntheticException");
        return this._client.captureException(e, R(h({
            originalException: e,
            syntheticException: i
        }, n), {
            event_id: r
        }), this),
        r
    }
    captureMessage(e, n, r) {
        const i = r && r.event_id ? r.event_id : ie();
        if (!this._client)
            return y.warn("No client configured on scope - will not capture message!"),
            i;
        const s = new Error(e);
        return this._client.captureMessage(e, n, R(h({
            originalException: e,
            syntheticException: s
        }, r), {
            event_id: i
        }), this),
        i
    }
    captureEvent(e, n) {
        const r = n && n.event_id ? n.event_id : ie();
        return this._client ? (this._client.captureEvent(e, R(h({}, n), {
            event_id: r
        }), this),
        r) : (y.warn("No client configured on scope - will not capture event!"),
        r)
    }
    _notifyScopeListeners() {
        this._notifyingListeners || (this._notifyingListeners = !0,
        this._scopeListeners.forEach(e => {
            e(this)
        }
        ),
        this._notifyingListeners = !1)
    }
}
function Rp() {
    return yi || (yi = new ze),
    yi
}
function Jo() {
    return {
        traceId: ie(),
        spanId: ie().substring(16)
    }
}
const Pn = "7.120.3"
  , su = parseFloat(Pn)
  , kp = 100;
class ou {
    constructor(e, n, r, i=su) {
        this._version = i;
        let s;
        n ? s = n : (s = new ze,
        s.setClient(e));
        let o;
        r ? o = r : (o = new ze,
        o.setClient(e)),
        this._stack = [{
            scope: s
        }],
        e && this.bindClient(e),
        this._isolationScope = o
    }
    isOlderThan(e) {
        return this._version < e
    }
    bindClient(e) {
        const n = this.getStackTop();
        n.client = e,
        n.scope.setClient(e),
        e && e.setupIntegrations && e.setupIntegrations()
    }
    pushScope() {
        const e = this.getScope().clone();
        return this.getStack().push({
            client: this.getClient(),
            scope: e
        }),
        e
    }
    popScope() {
        return this.getStack().length <= 1 ? !1 : !!this.getStack().pop()
    }
    withScope(e) {
        const n = this.pushScope();
        let r;
        try {
            r = e(n)
        } catch (i) {
            throw this.popScope(),
            i
        }
        return Vr(r) ? r.then(i => (this.popScope(),
        i), i => {
            throw this.popScope(),
            i
        }
        ) : (this.popScope(),
        r)
    }
    getClient() {
        return this.getStackTop().client
    }
    getScope() {
        return this.getStackTop().scope
    }
    getIsolationScope() {
        return this._isolationScope
    }
    getStack() {
        return this._stack
    }
    getStackTop() {
        return this._stack[this._stack.length - 1]
    }
    captureException(e, n) {
        const r = this._lastEventId = n && n.event_id ? n.event_id : ie()
          , i = new Error("Sentry syntheticException");
        return this.getScope().captureException(e, R(h({
            originalException: e,
            syntheticException: i
        }, n), {
            event_id: r
        })),
        r
    }
    captureMessage(e, n, r) {
        const i = this._lastEventId = r && r.event_id ? r.event_id : ie()
          , s = new Error(e);
        return this.getScope().captureMessage(e, n, R(h({
            originalException: e,
            syntheticException: s
        }, r), {
            event_id: i
        })),
        i
    }
    captureEvent(e, n) {
        const r = n && n.event_id ? n.event_id : ie();
        return e.type || (this._lastEventId = r),
        this.getScope().captureEvent(e, R(h({}, n), {
            event_id: r
        })),
        r
    }
    lastEventId() {
        return this._lastEventId
    }
    addBreadcrumb(e, n) {
        const {scope: r, client: i} = this.getStackTop();
        if (!i)
            return;
        const {beforeBreadcrumb: s=null, maxBreadcrumbs: o=kp} = i.getOptions && i.getOptions() || {};
        if (o <= 0)
            return;
        const a = Un()
          , c = h({
            timestamp: a
        }, e)
          , u = s ? Be( () => s(c, n)) : c;
        u !== null && (i.emit && i.emit("beforeAddBreadcrumb", u, n),
        r.addBreadcrumb(u, o))
    }
    setUser(e) {
        this.getScope().setUser(e),
        this.getIsolationScope().setUser(e)
    }
    setTags(e) {
        this.getScope().setTags(e),
        this.getIsolationScope().setTags(e)
    }
    setExtras(e) {
        this.getScope().setExtras(e),
        this.getIsolationScope().setExtras(e)
    }
    setTag(e, n) {
        this.getScope().setTag(e, n),
        this.getIsolationScope().setTag(e, n)
    }
    setExtra(e, n) {
        this.getScope().setExtra(e, n),
        this.getIsolationScope().setExtra(e, n)
    }
    setContext(e, n) {
        this.getScope().setContext(e, n),
        this.getIsolationScope().setContext(e, n)
    }
    configureScope(e) {
        const {scope: n, client: r} = this.getStackTop();
        r && e(n)
    }
    run(e) {
        const n = Qo(this);
        try {
            e(this)
        } finally {
            Qo(n)
        }
    }
    getIntegration(e) {
        const n = this.getClient();
        if (!n)
            return null;
        try {
            return n.getIntegration(e)
        } catch (r) {
            return I && y.warn(`Cannot retrieve integration ${e.id} from the current Hub`),
            null
        }
    }
    startTransaction(e, n) {
        const r = this._callExtensionMethod("startTransaction", e, n);
        return I && !r && (this.getClient() ? y.warn(`Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`) : y.warn("Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'")),
        r
    }
    traceHeaders() {
        return this._callExtensionMethod("traceHeaders")
    }
    captureSession(e=!1) {
        if (e)
            return this.endSession();
        this._sendSessionUpdate()
    }
    endSession() {
        const n = this.getStackTop().scope
          , r = n.getSession();
        r && Jc(r),
        this._sendSessionUpdate(),
        n.setSession()
    }
    startSession(e) {
        const {scope: n, client: r} = this.getStackTop()
          , {release: i, environment: s=zr} = r && r.getOptions() || {}
          , {userAgent: o} = L.navigator || {}
          , a = Kc(h(h({
            release: i,
            environment: s,
            user: n.getUser()
        }, o && {
            userAgent: o
        }), e))
          , c = n.getSession && n.getSession();
        return c && c.status === "ok" && Tt(c, {
            status: "exited"
        }),
        this.endSession(),
        n.setSession(a),
        a
    }
    shouldSendDefaultPii() {
        const e = this.getClient()
          , n = e && e.getOptions();
        return !!(n && n.sendDefaultPii)
    }
    _sendSessionUpdate() {
        const {scope: e, client: n} = this.getStackTop()
          , r = e.getSession();
        r && n && n.captureSession && n.captureSession(r)
    }
    _callExtensionMethod(e, ...n) {
        const i = Wn().__SENTRY__;
        if (i && i.extensions && typeof i.extensions[e] == "function")
            return i.extensions[e].apply(this, n);
        I && y.warn(`Extension method ${e} couldn't be found, doing nothing.`)
    }
}
function Wn() {
    return L.__SENTRY__ = L.__SENTRY__ || {
        extensions: {},
        hub: void 0
    },
    L
}
function Qo(t) {
    const e = Wn()
      , n = cs(e);
    return au(e, t),
    n
}
function be() {
    const t = Wn();
    if (t.__SENTRY__ && t.__SENTRY__.acs) {
        const e = t.__SENTRY__.acs.getCurrentHub();
        if (e)
            return e
    }
    return Ap(t)
}
function lt() {
    return be().getIsolationScope()
}
function Ap(t=Wn()) {
    return (!Cp(t) || cs(t).isOlderThan(su)) && au(t, new ou),
    cs(t)
}
function Cp(t) {
    return !!(t && t.__SENTRY__ && t.__SENTRY__.hub)
}
function cs(t) {
    return xc("hub", () => new ou, t)
}
function au(t, e) {
    if (!t)
        return !1;
    const n = t.__SENTRY__ = t.__SENTRY__ || {};
    return n.hub = e,
    !0
}
function It(t) {
    return be().getScope().getTransaction()
}
let Zo = !1;
function Op() {
    Zo || (Zo = !0,
    Hc(us),
    Wc(us))
}
function us() {
    const t = It();
    if (t) {
        const e = "internal_error";
        I && y.log(`[Tracing] Transaction: ${e} -> Global error occured`),
        t.setStatus(e)
    }
}
us.tag = "sentry_tracingErrorCallback";
var ea;
(function(t) {
    const e = "ok";
    t.Ok = e;
    const n = "deadline_exceeded";
    t.DeadlineExceeded = n;
    const r = "unauthenticated";
    t.Unauthenticated = r;
    const i = "permission_denied";
    t.PermissionDenied = i;
    const s = "not_found";
    t.NotFound = s;
    const o = "resource_exhausted";
    t.ResourceExhausted = o;
    const a = "invalid_argument";
    t.InvalidArgument = a;
    const c = "unimplemented";
    t.Unimplemented = c;
    const u = "unavailable";
    t.Unavailable = u;
    const l = "internal_error";
    t.InternalError = l;
    const d = "unknown_error";
    t.UnknownError = d;
    const f = "cancelled";
    t.Cancelled = f;
    const p = "already_exists";
    t.AlreadyExists = p;
    const m = "failed_precondition";
    t.FailedPrecondition = m;
    const g = "aborted";
    t.Aborted = g;
    const S = "out_of_range";
    t.OutOfRange = S;
    const _ = "data_loss";
    t.DataLoss = _
}
)(ea || (ea = {}));
function xp(t) {
    if (t < 400 && t >= 100)
        return "ok";
    if (t >= 400 && t < 500)
        switch (t) {
        case 401:
            return "unauthenticated";
        case 403:
            return "permission_denied";
        case 404:
            return "not_found";
        case 409:
            return "already_exists";
        case 413:
            return "failed_precondition";
        case 429:
            return "resource_exhausted";
        default:
            return "invalid_argument"
        }
    if (t >= 500 && t < 600)
        switch (t) {
        case 501:
            return "unimplemented";
        case 503:
            return "unavailable";
        case 504:
            return "deadline_exceeded";
        default:
            return "internal_error"
        }
    return "unknown_error"
}
function js(t, e) {
    t.setTag("http.status_code", String(e)),
    t.setData("http.response.status_code", e);
    const n = xp(e);
    n !== "unknown_error" && t.setStatus(n)
}
function Ct(t) {
    if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__)
        return !1;
    const e = j()
      , n = t || e && e.getOptions();
    return !!n && (n.enableTracing || "tracesSampleRate"in n || "tracesSampler"in n)
}
function wr(t) {
    if (!Ct())
        return;
    const e = Dp(t)
      , n = be()
      , r = t.scope ? t.scope.getSpan() : ls();
    if (t.onlyIfParent && !r)
        return;
    const o = (t.scope || ve()).clone();
    return Mp(n, {
        parentSpan: r,
        spanContext: e,
        forceTransaction: t.forceTransaction,
        scope: o
    })
}
function ls() {
    return ve().getSpan()
}
function Mp(t, {parentSpan: e, spanContext: n, forceTransaction: r, scope: i}) {
    if (!Ct())
        return;
    const s = lt();
    let o;
    if (e && !r)
        o = e.startChild(n);
    else if (e) {
        const a = Jt(e)
          , {traceId: c, spanId: u} = e.spanContext()
          , l = Vs(e);
        o = t.startTransaction(R(h({
            traceId: c,
            parentSpanId: u,
            parentSampled: l
        }, n), {
            metadata: h({
                dynamicSamplingContext: a
            }, n.metadata)
        }))
    } else {
        const {traceId: a, dsc: c, parentSpanId: u, sampled: l} = h(h({}, s.getPropagationContext()), i.getPropagationContext());
        o = t.startTransaction(R(h({
            traceId: a,
            parentSpanId: u,
            parentSampled: l
        }, n), {
            metadata: h({
                dynamicSamplingContext: c
            }, n.metadata)
        }))
    }
    return i.setSpan(o),
    Pp(o, i, s),
    o
}
function Dp(t) {
    if (t.startTime) {
        const e = h({}, t);
        return e.startTimestamp = Yr(t.startTime),
        delete e.startTime,
        e
    }
    return t
}
const cu = "_sentryScope"
  , uu = "_sentryIsolationScope";
function Pp(t, e, n) {
    t && (wt(t, uu, n),
    wt(t, cu, e))
}
function Np(t) {
    return {
        scope: t[cu],
        isolationScope: t[uu]
    }
}
const Ae = "sentry.source"
  , Ut = "sentry.sample_rate"
  , or = "sentry.op"
  , Ve = "sentry.origin"
  , Lp = "profile_id";
class lu {
    constructor(e=1e3) {
        this._maxlen = e,
        this.spans = []
    }
    add(e) {
        this.spans.length > this._maxlen ? e.spanRecorder = void 0 : this.spans.push(e)
    }
}
class Kr {
    constructor(e={}) {
        this._traceId = e.traceId || ie(),
        this._spanId = e.spanId || ie().substring(16),
        this._startTime = e.startTimestamp || dn(),
        this.tags = e.tags ? h({}, e.tags) : {},
        this.data = e.data ? h({}, e.data) : {},
        this.instrumenter = e.instrumenter || "sentry",
        this._attributes = {},
        this.setAttributes(h({
            [Ve]: e.origin || "manual",
            [or]: e.op
        }, e.attributes)),
        this._name = e.name || e.description,
        e.parentSpanId && (this._parentSpanId = e.parentSpanId),
        "sampled"in e && (this._sampled = e.sampled),
        e.status && (this._status = e.status),
        e.endTimestamp && (this._endTime = e.endTimestamp),
        e.exclusiveTime !== void 0 && (this._exclusiveTime = e.exclusiveTime),
        this._measurements = e.measurements ? h({}, e.measurements) : {}
    }
    get name() {
        return this._name || ""
    }
    set name(e) {
        this.updateName(e)
    }
    get description() {
        return this._name
    }
    set description(e) {
        this._name = e
    }
    get traceId() {
        return this._traceId
    }
    set traceId(e) {
        this._traceId = e
    }
    get spanId() {
        return this._spanId
    }
    set spanId(e) {
        this._spanId = e
    }
    set parentSpanId(e) {
        this._parentSpanId = e
    }
    get parentSpanId() {
        return this._parentSpanId
    }
    get sampled() {
        return this._sampled
    }
    set sampled(e) {
        this._sampled = e
    }
    get attributes() {
        return this._attributes
    }
    set attributes(e) {
        this._attributes = e
    }
    get startTimestamp() {
        return this._startTime
    }
    set startTimestamp(e) {
        this._startTime = e
    }
    get endTimestamp() {
        return this._endTime
    }
    set endTimestamp(e) {
        this._endTime = e
    }
    get status() {
        return this._status
    }
    set status(e) {
        this._status = e
    }
    get op() {
        return this._attributes[or]
    }
    set op(e) {
        this.setAttribute(or, e)
    }
    get origin() {
        return this._attributes[Ve]
    }
    set origin(e) {
        this.setAttribute(Ve, e)
    }
    spanContext() {
        const {_spanId: e, _traceId: n, _sampled: r} = this;
        return {
            spanId: e,
            traceId: n,
            traceFlags: r ? Qc : op
        }
    }
    startChild(e) {
        const n = new Kr(R(h({}, e), {
            parentSpanId: this._spanId,
            sampled: this._sampled,
            traceId: this._traceId
        }));
        n.spanRecorder = this.spanRecorder,
        n.spanRecorder && n.spanRecorder.add(n);
        const r = Er(this);
        if (n.transaction = r,
        I && r) {
            const i = e && e.op || "< unknown op >"
              , s = le(n).description || "< unknown name >"
              , o = r.spanContext().spanId
              , a = `[Tracing] Starting '${i}' span on transaction '${s}' (${o}).`;
            y.log(a),
            this._logMessage = a
        }
        return n
    }
    setTag(e, n) {
        return this.tags = R(h({}, this.tags), {
            [e]: n
        }),
        this
    }
    setData(e, n) {
        return this.data = R(h({}, this.data), {
            [e]: n
        }),
        this
    }
    setAttribute(e, n) {
        n === void 0 ? delete this._attributes[e] : this._attributes[e] = n
    }
    setAttributes(e) {
        Object.keys(e).forEach(n => this.setAttribute(n, e[n]))
    }
    setStatus(e) {
        return this._status = e,
        this
    }
    setHttpStatus(e) {
        return js(this, e),
        this
    }
    setName(e) {
        this.updateName(e)
    }
    updateName(e) {
        return this._name = e,
        this
    }
    isSuccess() {
        return this._status === "ok"
    }
    finish(e) {
        return this.end(e)
    }
    end(e) {
        if (this._endTime)
            return;
        const n = Er(this);
        if (I && n && n.spanContext().spanId !== this._spanId) {
            const r = this._logMessage;
            r && y.log(r.replace("Starting", "Finishing"))
        }
        this._endTime = Yr(e)
    }
    toTraceparent() {
        return Gr(this)
    }
    toContext() {
        return ye({
            data: this._getData(),
            description: this._name,
            endTimestamp: this._endTime,
            op: this.op,
            parentSpanId: this._parentSpanId,
            sampled: this._sampled,
            spanId: this._spanId,
            startTimestamp: this._startTime,
            status: this._status,
            tags: this.tags,
            traceId: this._traceId
        })
    }
    updateWithContext(e) {
        return this.data = e.data || {},
        this._name = e.name || e.description,
        this._endTime = e.endTimestamp,
        this.op = e.op,
        this._parentSpanId = e.parentSpanId,
        this._sampled = e.sampled,
        this._spanId = e.spanId || this._spanId,
        this._startTime = e.startTimestamp || this._startTime,
        this._status = e.status,
        this.tags = e.tags || {},
        this._traceId = e.traceId || this._traceId,
        this
    }
    getTraceContext() {
        return qs(this)
    }
    getSpanJSON() {
        return ye({
            data: this._getData(),
            description: this._name,
            op: this._attributes[or],
            parent_span_id: this._parentSpanId,
            span_id: this._spanId,
            start_timestamp: this._startTime,
            status: this._status,
            tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
            timestamp: this._endTime,
            trace_id: this._traceId,
            origin: this._attributes[Ve],
            _metrics_summary: void 0,
            profile_id: this._attributes[Lp],
            exclusive_time: this._exclusiveTime,
            measurements: Object.keys(this._measurements).length > 0 ? this._measurements : void 0
        })
    }
    isRecording() {
        return !this._endTime && !!this._sampled
    }
    toJSON() {
        return this.getSpanJSON()
    }
    _getData() {
        const {data: e, _attributes: n} = this
          , r = Object.keys(e).length > 0
          , i = Object.keys(n).length > 0;
        if (!(!r && !i))
            return r && i ? h(h({}, e), n) : r ? e : n
    }
}
class du extends Kr {
    constructor(e, n) {
        super(e),
        this._contexts = {},
        this._hub = n || be(),
        this._name = e.name || "",
        this._metadata = h({}, e.metadata),
        this._trimEnd = e.trimEnd,
        this.transaction = this;
        const r = this._metadata.dynamicSamplingContext;
        r && (this._frozenDynamicSamplingContext = h({}, r))
    }
    get name() {
        return this._name
    }
    set name(e) {
        this.setName(e)
    }
    get metadata() {
        return h(h(h({
            source: "custom",
            spanMetadata: {}
        }, this._metadata), this._attributes[Ae] && {
            source: this._attributes[Ae]
        }), this._attributes[Ut] && {
            sampleRate: this._attributes[Ut]
        })
    }
    set metadata(e) {
        this._metadata = e
    }
    setName(e, n="custom") {
        this._name = e,
        this.setAttribute(Ae, n)
    }
    updateName(e) {
        return this._name = e,
        this
    }
    initSpanRecorder(e=1e3) {
        this.spanRecorder || (this.spanRecorder = new lu(e)),
        this.spanRecorder.add(this)
    }
    setContext(e, n) {
        n === null ? delete this._contexts[e] : this._contexts[e] = n
    }
    setMeasurement(e, n, r="") {
        this._measurements[e] = {
            value: n,
            unit: r
        }
    }
    setMetadata(e) {
        this._metadata = h(h({}, this._metadata), e)
    }
    end(e) {
        const n = Yr(e)
          , r = this._finishTransaction(n);
        if (r)
            return this._hub.captureEvent(r)
    }
    toContext() {
        const e = super.toContext();
        return ye(R(h({}, e), {
            name: this._name,
            trimEnd: this._trimEnd
        }))
    }
    updateWithContext(e) {
        return super.updateWithContext(e),
        this._name = e.name || "",
        this._trimEnd = e.trimEnd,
        this
    }
    getDynamicSamplingContext() {
        return Jt(this)
    }
    setHub(e) {
        this._hub = e
    }
    getProfileId() {
        if (this._contexts !== void 0 && this._contexts.profile !== void 0)
            return this._contexts.profile.profile_id
    }
    _finishTransaction(e) {
        if (this._endTime !== void 0)
            return;
        this._name || (I && y.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),
        this._name = "<unlabeled transaction>"),
        super.end(e);
        const n = this._hub.getClient();
        if (n && n.emit && n.emit("finishTransaction", this),
        this._sampled !== !0) {
            I && y.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),
            n && n.recordDroppedEvent("sample_rate", "transaction");
            return
        }
        const r = this.spanRecorder ? this.spanRecorder.spans.filter(l => l !== this && le(l).timestamp) : [];
        if (this._trimEnd && r.length > 0) {
            const l = r.map(d => le(d).timestamp).filter(Boolean);
            this._endTime = l.reduce( (d, f) => d > f ? d : f)
        }
        const {scope: i, isolationScope: s} = Np(this)
          , {metadata: o} = this
          , {source: a} = o
          , c = h({
            contexts: R(h({}, this._contexts), {
                trace: qs(this)
            }),
            spans: r,
            start_timestamp: this._startTime,
            tags: this.tags,
            timestamp: this._endTime,
            transaction: this._name,
            type: "transaction",
            sdkProcessingMetadata: h(R(h({}, o), {
                capturedSpanScope: i,
                capturedSpanIsolationScope: s
            }), ye({
                dynamicSamplingContext: Jt(this)
            })),
            _metrics_summary: void 0
        }, a && {
            transaction_info: {
                source: a
            }
        });
        return Object.keys(this._measurements).length > 0 && (I && y.log("[Measurements] Adding measurements to transaction", JSON.stringify(this._measurements, void 0, 2)),
        c.measurements = this._measurements),
        I && y.log(`[Tracing] Finishing ${this.op} transaction: ${this._name}.`),
        c
    }
}
const gr = {
    idleTimeout: 1e3,
    finalTimeout: 3e4,
    heartbeatInterval: 5e3
}
  , Fp = "finishReason"
  , Dt = ["heartbeatFailed", "idleTimeout", "documentHidden", "finalTimeout", "externalFinish", "cancelled"];
class $p extends lu {
    constructor(e, n, r, i) {
        super(i),
        this._pushActivity = e,
        this._popActivity = n,
        this.transactionSpanId = r
    }
    add(e) {
        if (e.spanContext().spanId !== this.transactionSpanId) {
            const n = e.end;
            e.end = (...r) => (this._popActivity(e.spanContext().spanId),
            n.apply(e, r)),
            le(e).timestamp === void 0 && this._pushActivity(e.spanContext().spanId)
        }
        super.add(e)
    }
}
class Bp extends du {
    constructor(e, n, r=gr.idleTimeout, i=gr.finalTimeout, s=gr.heartbeatInterval, o=!1, a=!1) {
        super(e, n),
        this._idleHub = n,
        this._idleTimeout = r,
        this._finalTimeout = i;
    }
}
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes: Fd
});
gt.use(router);
gt.use(Et);
gt.use(vant);
const pinia = Pinia.createPinia();
gt.use(pinia);
gt.mount('#app');

const request = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 10000
});

class playSvga {
    constructor() {
        this.player = null;
        this.parser = new SVGA.Parser();
    }
    showSvga({ svgaPath, domName }) {
        return new Promise((resolve, reject) => {
            try {
                const playerElement = document.querySelector(domName);
                if (!playerElement) {
                    console.error(`SVGA DOM element not found: ${domName}`);
                    reject(new Error(`DOM element not found: ${domName}`));
                    return;
                }
                
                // Determine if it's the header logo to use its specific legacy positioning
                const isHeader = domName === '.VIPRule_header_logo_svga';
                
                // Clear previous content and create canvas for SVGA
                // Only the header logo uses the specific 15px offset and smaller size
                const canvasStyle = isHeader 
                    ? 'position: absolute; top: 0px; left: 15px; width: 85%; height: 89%; pointer-events: none;'
                    : 'position: absolute; top: 80px; left: -100px; width: 100%; height: 100%; pointer-events: none;';
                
                playerElement.innerHTML = `<canvas style="${canvasStyle}"></canvas>`;
                const canvas = playerElement.querySelector('canvas');
                
                // Make parent container relative for absolute positioning
                playerElement.style.position = 'relative';
                playerElement.style.display = 'inline-block';
                
                // Create new player instance for each animation
                const player = new SVGA.Player(canvas);
                const parser = new SVGA.Parser();
                
                parser.load(svgaPath, (videoItem) => {
                    if (isHeader) {
                        // Use fixed dimensions for header canvas as requested
                        canvas.width = 250;
                        canvas.height = 210;
                    } else {
                        // For other elements (like popup), use the container's natural size
                        canvas.width = playerElement.clientWidth || 220;
                        canvas.height = playerElement.clientHeight || 200;
                    }
                    
                    player.setVideoItem(videoItem);
                    player.startAnimation();
                    resolve();
                }, (error) => {
                    console.error("SVGA loading error:", error, "Path:", svgaPath);
                    reject(error);
                });
            } catch (error) {
                console.error("SVGA initialization error:", error);
                reject(error);
            }
        });
    }
}

export { request as a, playSvga as S, Md as _ };

  