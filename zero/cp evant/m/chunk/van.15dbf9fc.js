import {u as e, i as t, k as n, j as r, r as o, d as i, l as a, p as s, q as f, s as c, n as u, a as l, w as p, v as d, x as m, y as h} from "./vu.a13407ad.js";
import {a as v} from "./complex.js.7979b60d.js";
var g = "undefined" != typeof window;
function y(e) {
    return g ? requestAnimationFrame(e) : -1
}
function b(e) {
    g && cancelAnimationFrame(e)
}
function w(e) {
    y(( () => y(e)))
}
var x = (e, t) => ({
    top: 0,
    left: 0,
    right: e,
    bottom: t,
    width: e,
    height: t
})
  , O = t => {
    const n = e(t);
    if (n === window) {
        const e = n.innerWidth
          , t = n.innerHeight;
        return x(e, t)
    }
    return (null == n ? void 0 : n.getBoundingClientRect) ? n.getBoundingClientRect() : x(0, 0)
}
;
function j(e=!1) {
    const t = o(e);
    return [t, (e=!t.value) => {
        t.value = e
    }
    ]
}
function E(e) {
    const i = t(e, null);
    if (i) {
        const e = d()
          , {link: t, unlink: o, internalChildren: a} = i;
        t(e),
        n(( () => o(e)));
        return {
            parent: i,
            index: r(( () => a.indexOf(e)))
        }
    }
    return {
        parent: null,
        index: o(-1)
    }
}
function S(e) {
    const t = []
      , n = e => {
        Array.isArray(e) && e.forEach((e => {
            var r;
            h(e) && (t.push(e),
            (null == (r = e.component) ? void 0 : r.subTree) && (t.push(e.component.subTree),
            n(e.component.subTree.children)),
            e.children && n(e.children))
        }
        ))
    }
    ;
    return n(e),
    t
}
var k = (e, t) => {
    const n = e.indexOf(t);
    return -1 === n ? e.findIndex((e => void 0 !== t.key && null !== t.key && e.type === t.type && e.key === t.key)) : n
}
;
function M(e, t, n) {
    const r = S(e.subTree.children);
    n.sort(( (e, t) => k(r, e.vnode) - k(r, t.vnode)));
    const o = n.map((e => e.proxy));
    t.sort(( (e, t) => o.indexOf(e) - o.indexOf(t)))
}
function C(e) {
    const t = i([])
      , n = i([])
      , r = d();
    return {
        children: t,
        linkChildren: o => {
            m(e, Object.assign({
                link: e => {
                    e.proxy && (n.push(e),
                    t.push(e.proxy),
                    M(r, t, n))
                }
                ,
                unlink: e => {
                    const r = n.indexOf(e);
                    t.splice(r, 1),
                    n.splice(r, 1)
                }
                ,
                children: t,
                internalChildren: n
            }, o))
        }
    }
}
var P, L, T = 1e3, D = 60 * T, A = 60 * D, q = 24 * A;
function R(e) {
    let t, n, i, c;
    const u = o(e.time)
      , l = r(( () => {
        return {
            total: e = u.value,
            days: Math.floor(e / q),
            hours: Math.floor(e % q / A),
            minutes: Math.floor(e % A / D),
            seconds: Math.floor(e % D / T),
            milliseconds: Math.floor(e % T)
        };
        var e
    }
    ))
      , p = () => {
        i = !1,
        b(t)
    }
      , d = () => Math.max(n - Date.now(), 0)
      , m = t => {
        var n, r;
        u.value = t,
        null == (n = e.onChange) || n.call(e, l.value),
        0 === t && (p(),
        null == (r = e.onFinish) || r.call(e))
    }
      , h = () => {
        t = y(( () => {
            i && (m(d()),
            u.value > 0 && h())
        }
        ))
    }
      , v = () => {
        t = y(( () => {
            if (i) {
                const n = d();
                e = n,
                t = u.value,
                (Math.floor(e / 1e3) !== Math.floor(t / 1e3) || 0 === n) && m(n),
                u.value > 0 && v()
            }
            var e, t
        }
        ))
    }
      , w = () => {
        g && (e.millisecond ? h() : v())
    }
    ;
    return a(p),
    s(( () => {
        c && (i = !0,
        c = !1,
        w())
    }
    )),
    f(( () => {
        i && (p(),
        c = !0)
    }
    )),
    {
        start: () => {
            i || (n = Date.now() + u.value,
            i = !0,
            w())
        }
        ,
        pause: p,
        reset: (t=e.time) => {
            p(),
            u.value = t
        }
        ,
        current: l
    }
}
function W(e) {
    let t;
    c(( () => {
        e(),
        u(( () => {
            t = !0
        }
        ))
    }
    )),
    s(( () => {
        t && e()
    }
    ))
}
function V(t, r, o={}) {
    if (!g)
        return;
    const {target: i=window, passive: a=!1, capture: s=!1} = o;
    let c, u = !1;
    const d = n => {
        if (u)
            return;
        const o = e(n);
        o && !c && (o.addEventListener(t, r, {
            capture: s,
            passive: a
        }),
        c = !0)
    }
      , m = n => {
        if (u)
            return;
        const o = e(n);
        o && c && (o.removeEventListener(t, r, s),
        c = !1)
    }
    ;
    let h;
    return n(( () => m(i))),
    f(( () => m(i))),
    W(( () => d(i))),
    l(i) && (h = p(i, ( (e, t) => {
        m(t),
        d(e)
    }
    ))),
    () => {
        null == h || h(),
        m(i),
        u = !0
    }
}
function H(t, n, r={}) {
    if (!g)
        return;
    const {eventName: o="click"} = r;
    V(o, (r => {
        (Array.isArray(t) ? t : [t]).every((t => {
            const n = e(t);
            return n && !n.contains(r.target)
        }
        )) && n(r)
    }
    ), {
        target: document
    })
}
function F() {
    if (!P && (P = o(0),
    L = o(0),
    g)) {
        const e = () => {
            P.value = window.innerWidth,
            L.value = window.innerHeight
        }
        ;
        e(),
        window.addEventListener("resize", e, {
            passive: !0
        }),
        window.addEventListener("orientationchange", e, {
            passive: !0
        })
    }
    return {
        width: P,
        height: L
    }
}
var I, N = /scroll|auto|overlay/i, B = g ? window : void 0;
function _(e) {
    return "HTML" !== e.tagName && "BODY" !== e.tagName && 1 === e.nodeType
}
function z(e, t=B) {
    let n = e;
    for (; n && n !== t && _(n); ) {
        const {overflowY: e} = window.getComputedStyle(n);
        if (N.test(e))
            return n;
        n = n.parentNode
    }
    return t
}
function U(e, t=B) {
    const n = o();
    return c(( () => {
        e.value && (n.value = z(e.value, t))
    }
    )),
    n
}
function Y() {
    if (!I && (I = o("visible"),
    g)) {
        const e = () => {
            I.value = document.hidden ? "hidden" : "visible"
        }
        ;
        e(),
        window.addEventListener("visibilitychange", e)
    }
    return I
}
var J = Symbol("van-field");
function X(e) {
    const n = t(J, null);
    n && !n.customValue.value && (n.customValue.value = e,
    p(e, ( () => {
        n.resetValidation(),
        n.validateWithTrigger("onChange")
    }
    )))
}
const K = Object.freeze(Object.defineProperty({
    __proto__: null,
    CUSTOM_FIELD_INJECTION_KEY: J,
    cancelRaf: b,
    doubleRaf: w,
    flattenVNodes: S,
    getScrollParent: z,
    inBrowser: g,
    onMountedOrActivated: W,
    raf: y,
    sortChildren: M,
    supportsPassive: !0,
    useChildren: C,
    useClickAway: H,
    useCountDown: R,
    useCustomFieldValue: X,
    useEventListener: V,
    usePageVisibility: Y,
    useParent: E,
    useRect: O,
    useScrollParent: U,
    useToggle: j,
    useWindowSize: F
}, Symbol.toStringTag, {
    value: "Module"
}));
function G(e) {
    if (null == e)
        return window;
    if ("[object Window]" !== e.toString()) {
        var t = e.ownerDocument;
        return t && t.defaultView || window
    }
    return e
}
function Q(e) {
    return e instanceof G(e).Element || e instanceof Element
}
function Z(e) {
    return e instanceof G(e).HTMLElement || e instanceof HTMLElement
}
function $(e) {
    return "undefined" != typeof ShadowRoot && (e instanceof G(e).ShadowRoot || e instanceof ShadowRoot)
}
var ee = Math.round;
function te() {
    var e = navigator.userAgentData;
    return null != e && e.brands ? e.brands.map((function(e) {
        return e.brand + "/" + e.version
    }
    )).join(" ") : navigator.userAgent
}
function ne(e, t, n) {
    void 0 === t && (t = !1),
    void 0 === n && (n = !1);
    var r = e.getBoundingClientRect()
      , o = 1
      , i = 1;
    t && Z(e) && (o = e.offsetWidth > 0 && ee(r.width) / e.offsetWidth || 1,
    i = e.offsetHeight > 0 && ee(r.height) / e.offsetHeight || 1);
    var a = (Q(e) ? G(e) : window).visualViewport
      , s = !!/^((?!chrome|android).)*safari/i.test(te()) && n
      , f = (r.left + (s && a ? a.offsetLeft : 0)) / o
      , c = (r.top + (s && a ? a.offsetTop : 0)) / i
      , u = r.width / o
      , l = r.height / i;
    return {
        width: u,
        height: l,
        top: c,
        right: f + u,
        bottom: c + l,
        left: f,
        x: f,
        y: c
    }
}
function re(e) {
    var t = G(e);
    return {
        scrollLeft: t.pageXOffset,
        scrollTop: t.pageYOffset
    }
}
function oe(e) {
    return e ? (e.nodeName || "").toLowerCase() : null
}
function ie(e) {
    return ((Q(e) ? e.ownerDocument : e.document) || window.document).documentElement
}
function ae(e) {
    return G(e).getComputedStyle(e)
}
function se(e) {
    var t = ae(e)
      , n = t.overflow
      , r = t.overflowX
      , o = t.overflowY;
    return /auto|scroll|overlay|hidden/.test(n + o + r)
}
function fe(e, t, n) {
    void 0 === n && (n = !1);
    var r, o, i = Z(t), a = Z(t) && function(e) {
        var t = e.getBoundingClientRect()
          , n = ee(t.width) / e.offsetWidth || 1
          , r = ee(t.height) / e.offsetHeight || 1;
        return 1 !== n || 1 !== r
    }(t), s = ie(t), f = ne(e, a, n), c = {
        scrollLeft: 0,
        scrollTop: 0
    }, u = {
        x: 0,
        y: 0
    };
    return (i || !i && !n) && (("body" !== oe(t) || se(s)) && (c = (r = t) !== G(r) && Z(r) ? {
        scrollLeft: (o = r).scrollLeft,
        scrollTop: o.scrollTop
    } : re(r)),
    Z(t) ? ((u = ne(t, !0)).x += t.clientLeft,
    u.y += t.clientTop) : s && (u.x = function(e) {
        return ne(ie(e)).left + re(e).scrollLeft
    }(s))),
    {
        x: f.left + c.scrollLeft - u.x,
        y: f.top + c.scrollTop - u.y,
        width: f.width,
        height: f.height
    }
}
function ce(e) {
    var t = ne(e)
      , n = e.offsetWidth
      , r = e.offsetHeight;
    return Math.abs(t.width - n) <= 1 && (n = t.width),
    Math.abs(t.height - r) <= 1 && (r = t.height),
    {
        x: e.offsetLeft,
        y: e.offsetTop,
        width: n,
        height: r
    }
}
function ue(e) {
    return "html" === oe(e) ? e : e.assignedSlot || e.parentNode || ($(e) ? e.host : null) || ie(e)
}
function le(e) {
    return ["html", "body", "#document"].indexOf(oe(e)) >= 0 ? e.ownerDocument.body : Z(e) && se(e) ? e : le(ue(e))
}
function pe(e, t) {
    var n;
    void 0 === t && (t = []);
    var r = le(e)
      , o = r === (null == (n = e.ownerDocument) ? void 0 : n.body)
      , i = G(r)
      , a = o ? [i].concat(i.visualViewport || [], se(r) ? r : []) : r
      , s = t.concat(a);
    return o ? s : s.concat(pe(ue(a)))
}
function de(e) {
    return ["table", "td", "th"].indexOf(oe(e)) >= 0
}
function me(e) {
    return Z(e) && "fixed" !== ae(e).position ? e.offsetParent : null
}
function he(e) {
    for (var t = G(e), n = me(e); n && de(n) && "static" === ae(n).position; )
        n = me(n);
    return n && ("html" === oe(n) || "body" === oe(n) && "static" === ae(n).position) ? t : n || function(e) {
        var t = /firefox/i.test(te());
        if (/Trident/i.test(te()) && Z(e) && "fixed" === ae(e).position)
            return null;
        var n = ue(e);
        for ($(n) && (n = n.host); Z(n) && ["html", "body"].indexOf(oe(n)) < 0; ) {
            var r = ae(n);
            if ("none" !== r.transform || "none" !== r.perspective || "paint" === r.contain || -1 !== ["transform", "perspective"].indexOf(r.willChange) || t && "filter" === r.willChange || t && r.filter && "none" !== r.filter)
                return n;
            n = n.parentNode
        }
        return null
    }(e) || t
}
var ve = "top"
  , ge = "bottom"
  , ye = "right"
  , be = "left"
  , we = "auto"
  , xe = "start"
  , Oe = "end"
  , je = [].concat([ve, ge, ye, be], [we]).reduce((function(e, t) {
    return e.concat([t, t + "-" + xe, t + "-" + Oe])
}
), [])
  , Ee = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
function Se(e) {
    var t = new Map
      , n = new Set
      , r = [];
    function o(e) {
        n.add(e.name),
        [].concat(e.requires || [], e.requiresIfExists || []).forEach((function(e) {
            if (!n.has(e)) {
                var r = t.get(e);
                r && o(r)
            }
        }
        )),
        r.push(e)
    }
    return e.forEach((function(e) {
        t.set(e.name, e)
    }
    )),
    e.forEach((function(e) {
        n.has(e.name) || o(e)
    }
    )),
    r
}
function ke(e) {
    for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
        n[r - 1] = arguments[r];
    return [].concat(n).reduce((function(e, t) {
        return e.replace(/%s/, t)
    }
    ), e)
}
var Me = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s'
  , Ce = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available'
  , Pe = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Le(e) {
    return e.split("-")[0]
}
function Te(e) {
    return e.split("-")[1]
}
var De = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element."
  , Ae = {
    placement: "bottom",
    modifiers: [],
    strategy: "absolute"
};
function qe() {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
    return !t.some((function(e) {
        return !(e && "function" == typeof e.getBoundingClientRect)
    }
    ))
}
function Re(e) {
    void 0 === e && (e = {});
    var t = e
      , n = t.defaultModifiers
      , r = void 0 === n ? [] : n
      , o = t.defaultOptions
      , i = void 0 === o ? Ae : o;
    return function(e, t, n) {
        void 0 === n && (n = i);
        var o, a, s = {
            placement: "bottom",
            orderedModifiers: [],
            options: Object.assign({}, Ae, i),
            modifiersData: {},
            elements: {
                reference: e,
                popper: t
            },
            attributes: {},
            styles: {}
        }, f = [], c = !1, u = {
            state: s,
            setOptions: function(n) {
                var o = "function" == typeof n ? n(s.options) : n;
                l(),
                s.options = Object.assign({}, i, s.options, o),
                s.scrollParents = {
                    reference: Q(e) ? pe(e) : e.contextElement ? pe(e.contextElement) : [],
                    popper: pe(t)
                };
                var a = function(e) {
                    var t = Se(e);
                    return Ee.reduce((function(e, n) {
                        return e.concat(t.filter((function(e) {
                            return e.phase === n
                        }
                        )))
                    }
                    ), [])
                }(function(e) {
                    var t = e.reduce((function(e, t) {
                        var n = e[t.name];
                        return e[t.name] = n ? Object.assign({}, n, t, {
                            options: Object.assign({}, n.options, t.options),
                            data: Object.assign({}, n.data, t.data)
                        }) : t,
                        e
                    }
                    ), {});
                    return Object.keys(t).map((function(e) {
                        return t[e]
                    }
                    ))
                }([].concat(r, s.options.modifiers)));
                (s.orderedModifiers = a.filter((function(e) {
                    return e.enabled
                }
                )),
                function(e) {
                    e.forEach((function(t) {
                        [].concat(Object.keys(t), Pe).filter((function(e, t, n) {
                            return n.indexOf(e) === t
                        }
                        )).forEach((function(n) {
                            switch (n) {
                            case "name":
                                "string" != typeof t.name && console.error(ke(Me, String(t.name), '"name"', '"string"', '"' + String(t.name) + '"'));
                                break;
                            case "enabled":
                                "boolean" != typeof t.enabled && console.error(ke(Me, t.name, '"enabled"', '"boolean"', '"' + String(t.enabled) + '"'));
                                break;
                            case "phase":
                                Ee.indexOf(t.phase) < 0 && console.error(ke(Me, t.name, '"phase"', "either " + Ee.join(", "), '"' + String(t.phase) + '"'));
                                break;
                            case "fn":
                                "function" != typeof t.fn && console.error(ke(Me, t.name, '"fn"', '"function"', '"' + String(t.fn) + '"'));
                                break;
                            case "effect":
                                null != t.effect && "function" != typeof t.effect && console.error(ke(Me, t.name, '"effect"', '"function"', '"' + String(t.fn) + '"'));
                                break;
                            case "requires":
                                null == t.requires || Array.isArray(t.requires) || console.error(ke(Me, t.name, '"requires"', '"array"', '"' + String(t.requires) + '"'));
                                break;
                            case "requiresIfExists":
                                Array.isArray(t.requiresIfExists) || console.error(ke(Me, t.name, '"requiresIfExists"', '"array"', '"' + String(t.requiresIfExists) + '"'));
                                break;
                            case "options":
                            case "data":
                                break;
                            default:
                                console.error('PopperJS: an invalid property has been provided to the "' + t.name + '" modifier, valid properties are ' + Pe.map((function(e) {
                                    return '"' + e + '"'
                                }
                                )).join(", ") + '; but "' + n + '" was provided.')
                            }
                            t.requires && t.requires.forEach((function(n) {
                                null == e.find((function(e) {
                                    return e.name === n
                                }
                                )) && console.error(ke(Ce, String(t.name), n, n))
                            }
                            ))
                        }
                        ))
                    }
                    ))
                }((c = [].concat(a, s.options.modifiers),
                p = function(e) {
                    return e.name
                }
                ,
                d = new Set,
                c.filter((function(e) {
                    var t = p(e);
                    if (!d.has(t))
                        return d.add(t),
                        !0
                }
                )))),
                Le(s.options.placement) === we) && (s.orderedModifiers.find((function(e) {
                    return "flip" === e.name
                }
                )) || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" ")));
                var c, p, d, m = ae(t);
                return [m.marginTop, m.marginRight, m.marginBottom, m.marginLeft].some((function(e) {
                    return parseFloat(e)
                }
                )) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" ")),
                s.orderedModifiers.forEach((function(e) {
                    var t = e.name
                      , n = e.options
                      , r = void 0 === n ? {} : n
                      , o = e.effect;
                    if ("function" == typeof o) {
                        var i = o({
                            state: s,
                            name: t,
                            instance: u,
                            options: r
                        })
                          , a = function() {};
                        f.push(i || a)
                    }
                }
                )),
                u.update()
            },
            forceUpdate: function() {
                if (!c) {
                    var e = s.elements
                      , t = e.reference
                      , n = e.popper;
                    if (qe(t, n)) {
                        s.rects = {
                            reference: fe(t, he(n), "fixed" === s.options.strategy),
                            popper: ce(n)
                        },
                        s.reset = !1,
                        s.placement = s.options.placement,
                        s.orderedModifiers.forEach((function(e) {
                            return s.modifiersData[e.name] = Object.assign({}, e.data)
                        }
                        ));
                        for (var r = 0, o = 0; o < s.orderedModifiers.length; o++) {
                            if ((r += 1) > 100) {
                                console.error("Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.");
                                break
                            }
                            if (!0 !== s.reset) {
                                var i = s.orderedModifiers[o]
                                  , a = i.fn
                                  , f = i.options
                                  , l = void 0 === f ? {} : f
                                  , p = i.name;
                                "function" == typeof a && (s = a({
                                    state: s,
                                    options: l,
                                    name: p,
                                    instance: u
                                }) || s)
                            } else
                                s.reset = !1,
                                o = -1
                        }
                    } else
                        console.error(De)
                }
            },
            update: (o = function() {
                return new Promise((function(e) {
                    u.forceUpdate(),
                    e(s)
                }
                ))
            }
            ,
            function() {
                return a || (a = new Promise((function(e) {
                    Promise.resolve().then((function() {
                        a = void 0,
                        e(o())
                    }
                    ))
                }
                ))),
                a
            }
            ),
            destroy: function() {
                l(),
                c = !0
            }
        };
        if (!qe(e, t))
            return console.error(De),
            u;
        function l() {
            f.forEach((function(e) {
                return e()
            }
            )),
            f = []
        }
        return u.setOptions(n).then((function(e) {
            !c && n.onFirstUpdate && n.onFirstUpdate(e)
        }
        )),
        u
    }
}
var We = {
    passive: !0
};
var Ve = {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto"
};
function He(e) {
    var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, s = e.position, f = e.gpuAcceleration, c = e.adaptive, u = e.roundOffsets, l = e.isFixed, p = a.x, d = void 0 === p ? 0 : p, m = a.y, h = void 0 === m ? 0 : m, v = "function" == typeof u ? u({
        x: d,
        y: h
    }) : {
        x: d,
        y: h
    };
    d = v.x,
    h = v.y;
    var g = a.hasOwnProperty("x")
      , y = a.hasOwnProperty("y")
      , b = be
      , w = ve
      , x = window;
    if (c) {
        var O = he(n)
          , j = "clientHeight"
          , E = "clientWidth";
        if (O === G(n) && "static" !== ae(O = ie(n)).position && "absolute" === s && (j = "scrollHeight",
        E = "scrollWidth"),
        o === ve || (o === be || o === ye) && i === Oe)
            w = ge,
            h -= (l && O === x && x.visualViewport ? x.visualViewport.height : O[j]) - r.height,
            h *= f ? 1 : -1;
        if (o === be || (o === ve || o === ge) && i === Oe)
            b = ye,
            d -= (l && O === x && x.visualViewport ? x.visualViewport.width : O[E]) - r.width,
            d *= f ? 1 : -1
    }
    var S, k = Object.assign({
        position: s
    }, c && Ve), M = !0 === u ? function(e) {
        var t = e.x
          , n = e.y
          , r = window.devicePixelRatio || 1;
        return {
            x: ee(t * r) / r || 0,
            y: ee(n * r) / r || 0
        }
    }({
        x: d,
        y: h
    }) : {
        x: d,
        y: h
    };
    return d = M.x,
    h = M.y,
    f ? Object.assign({}, k, ((S = {})[w] = y ? "0" : "",
    S[b] = g ? "0" : "",
    S.transform = (x.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + h + "px)" : "translate3d(" + d + "px, " + h + "px, 0)",
    S)) : Object.assign({}, k, ((t = {})[w] = y ? h + "px" : "",
    t[b] = g ? d + "px" : "",
    t.transform = "",
    t))
}
var Fe = Re({
    defaultModifiers: [{
        name: "eventListeners",
        enabled: !0,
        phase: "write",
        fn: function() {},
        effect: function(e) {
            var t = e.state
              , n = e.instance
              , r = e.options
              , o = r.scroll
              , i = void 0 === o || o
              , a = r.resize
              , s = void 0 === a || a
              , f = G(t.elements.popper)
              , c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
            return i && c.forEach((function(e) {
                e.addEventListener("scroll", n.update, We)
            }
            )),
            s && f.addEventListener("resize", n.update, We),
            function() {
                i && c.forEach((function(e) {
                    e.removeEventListener("scroll", n.update, We)
                }
                )),
                s && f.removeEventListener("resize", n.update, We)
            }
        },
        data: {}
    }, {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function(e) {
            var t = e.state
              , n = e.name;
            t.modifiersData[n] = function(e) {
                var t, n = e.reference, r = e.element, o = e.placement, i = o ? Le(o) : null, a = o ? Te(o) : null, s = n.x + n.width / 2 - r.width / 2, f = n.y + n.height / 2 - r.height / 2;
                switch (i) {
                case ve:
                    t = {
                        x: s,
                        y: n.y - r.height
                    };
                    break;
                case ge:
                    t = {
                        x: s,
                        y: n.y + n.height
                    };
                    break;
                case ye:
                    t = {
                        x: n.x + n.width,
                        y: f
                    };
                    break;
                case be:
                    t = {
                        x: n.x - r.width,
                        y: f
                    };
                    break;
                default:
                    t = {
                        x: n.x,
                        y: n.y
                    }
                }
                var c = i ? function(e) {
                    return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
                }(i) : null;
                if (null != c) {
                    var u = "y" === c ? "height" : "width";
                    switch (a) {
                    case xe:
                        t[c] = t[c] - (n[u] / 2 - r[u] / 2);
                        break;
                    case Oe:
                        t[c] = t[c] + (n[u] / 2 - r[u] / 2)
                    }
                }
                return t
            }({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement
            })
        },
        data: {}
    }, {
        name: "computeStyles",
        enabled: !0,
        phase: "beforeWrite",
        fn: function(e) {
            var t = e.state
              , n = e.options
              , r = n.gpuAcceleration
              , o = void 0 === r || r
              , i = n.adaptive
              , a = void 0 === i || i
              , s = n.roundOffsets
              , f = void 0 === s || s
              , c = ae(t.elements.popper).transitionProperty || "";
            a && ["transform", "top", "right", "bottom", "left"].some((function(e) {
                return c.indexOf(e) >= 0
            }
            )) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', "\n\n", 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", "\n\n", "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
            var u = {
                placement: Le(t.placement),
                variation: Te(t.placement),
                popper: t.elements.popper,
                popperRect: t.rects.popper,
                gpuAcceleration: o,
                isFixed: "fixed" === t.options.strategy
            };
            null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, He(Object.assign({}, u, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: a,
                roundOffsets: f
            })))),
            null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, He(Object.assign({}, u, {
                offsets: t.modifiersData.arrow,
                position: "absolute",
                adaptive: !1,
                roundOffsets: f
            })))),
            t.attributes.popper = Object.assign({}, t.attributes.popper, {
                "data-popper-placement": t.placement
            })
        },
        data: {}
    }, {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function(e) {
            var t = e.state;
            Object.keys(t.elements).forEach((function(e) {
                var n = t.styles[e] || {}
                  , r = t.attributes[e] || {}
                  , o = t.elements[e];
                Z(o) && oe(o) && (Object.assign(o.style, n),
                Object.keys(r).forEach((function(e) {
                    var t = r[e];
                    !1 === t ? o.removeAttribute(e) : o.setAttribute(e, !0 === t ? "" : t)
                }
                )))
            }
            ))
        },
        effect: function(e) {
            var t = e.state
              , n = {
                popper: {
                    position: t.options.strategy,
                    left: "0",
                    top: "0",
                    margin: "0"
                },
                arrow: {
                    position: "absolute"
                },
                reference: {}
            };
            return Object.assign(t.elements.popper.style, n.popper),
            t.styles = n,
            t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
            function() {
                Object.keys(t.elements).forEach((function(e) {
                    var r = t.elements[e]
                      , o = t.attributes[e] || {}
                      , i = Object.keys(t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]).reduce((function(e, t) {
                        return e[t] = "",
                        e
                    }
                    ), {});
                    Z(r) && oe(r) && (Object.assign(r.style, i),
                    Object.keys(o).forEach((function(e) {
                        r.removeAttribute(e)
                    }
                    )))
                }
                ))
            }
        },
        requires: ["computeStyles"]
    }]
});
var Ie = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: function(e) {
        var t = e.state
          , n = e.options
          , r = e.name
          , o = n.offset
          , i = void 0 === o ? [0, 0] : o
          , a = je.reduce((function(e, n) {
            return e[n] = function(e, t, n) {
                var r = Le(e)
                  , o = [be, ve].indexOf(r) >= 0 ? -1 : 1
                  , i = "function" == typeof n ? n(Object.assign({}, t, {
                    placement: e
                })) : n
                  , a = i[0]
                  , s = i[1];
                return a = a || 0,
                s = (s || 0) * o,
                [be, ye].indexOf(r) >= 0 ? {
                    x: s,
                    y: a
                } : {
                    x: a,
                    y: s
                }
            }(n, t.rects, i),
            e
        }
        ), {})
          , s = a[t.placement]
          , f = s.x
          , c = s.y;
        null != t.modifiersData.popperOffsets && (t.modifiersData.popperOffsets.x += f,
        t.modifiersData.popperOffsets.y += c),
        t.modifiersData[r] = a
    }
};
const Ne = v(K);
export {J as C, O as a, C as b, E as c, V as d, b as e, U as f, z as g, Y as h, w as i, X as j, g as k, j as l, R as m, H as n, W as o, Ie as p, Fe as q, y as r, Ne as s, F as u};
