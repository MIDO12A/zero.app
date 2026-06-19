import {e as t, r as n, m as e, h as s, i as o, t as c, a, b as r, c as i, w as u, d as f, g as p, o as l, n as h, f as d, j as y} from "./vu.a13407ad.js";
/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let v;
const b = t => v = t
  , _ = Symbol();
function j(t) {
    return t && "object" == typeof t && "[object Object]" === Object.prototype.toString.call(t) && "function" != typeof t.toJSON
}
var O;
function $() {
    const s = t(!0)
      , o = s.run(( () => n({})));
    let c = []
      , a = [];
    const r = e({
        install(t) {
            b(r),
            r._a = t,
            t.provide(_, r),
            t.config.globalProperties.$pinia = r,
            a.forEach((t => c.push(t))),
            a = []
        },
        use(t) {
            return this._a ? c.push(t) : a.push(t),
            this
        },
        _p: c,
        _a: null,
        _e: s,
        _s: new Map,
        state: o
    });
    return r
}
!function(t) {
    t.direct = "direct",
    t.patchObject = "patch object",
    t.patchFunction = "patch function"
}(O || (O = {}));
const g = () => {}
;
function m(t, n, e, s=g) {
    t.push(n);
    const o = () => {
        const e = t.indexOf(n);
        e > -1 && (t.splice(e, 1),
        s())
    }
    ;
    return !e && p() && l(o),
    o
}
function P(t, ...n) {
    t.slice().forEach((t => {
        t(...n)
    }
    ))
}
const S = t => t();
function w(t, n) {
    t instanceof Map && n instanceof Map && n.forEach(( (n, e) => t.set(e, n))),
    t instanceof Set && n instanceof Set && n.forEach(t.add, t);
    for (const e in n) {
        if (!n.hasOwnProperty(e))
            continue;
        const s = n[e]
          , o = t[e];
        j(o) && j(s) && t.hasOwnProperty(e) && !a(s) && !r(s) ? t[e] = w(o, s) : t[e] = s
    }
    return t
}
const E = Symbol();
const {assign: x} = Object;
function I(e, s, o={}, i, p, l) {
    let d;
    const y = x({
        actions: {}
    }, o)
      , v = {
        deep: !0
    };
    let _, $, I, M = [], A = [];
    const F = i.state.value[e];
    let k;
    function C(t) {
        let n;
        _ = $ = !1,
        "function" == typeof t ? (t(i.state.value[e]),
        n = {
            type: O.patchFunction,
            storeId: e,
            events: I
        }) : (w(i.state.value[e], t),
        n = {
            type: O.patchObject,
            payload: t,
            storeId: e,
            events: I
        });
        const s = k = Symbol();
        h().then(( () => {
            k === s && (_ = !0)
        }
        )),
        $ = !0,
        P(M, n, i.state.value[e])
    }
    l || F || (i.state.value[e] = {}),
    n({});
    const J = l ? function() {
        const {state: t} = o
          , n = t ? t() : {};
        this.$patch((t => {
            x(t, n)
        }
        ))
    }
    : g;
    function N(t, n) {
        return function() {
            b(i);
            const s = Array.from(arguments)
              , o = []
              , c = [];
            let a;
            P(A, {
                args: s,
                name: t,
                store: q,
                after: function(t) {
                    o.push(t)
                },
                onError: function(t) {
                    c.push(t)
                }
            });
            try {
                a = n.apply(this && this.$id === e ? this : q, s)
            } catch (r) {
                throw P(c, r),
                r
            }
            return a instanceof Promise ? a.then((t => (P(o, t),
            t))).catch((t => (P(c, t),
            Promise.reject(t)))) : (P(o, a),
            a)
        }
    }
    const W = {
        _p: i,
        $id: e,
        $onAction: m.bind(null, A),
        $patch: C,
        $reset: J,
        $subscribe(t, n={}) {
            const s = m(M, t, n.detached, ( () => o()))
              , o = d.run(( () => u(( () => i.state.value[e]), (s => {
                ("sync" === n.flush ? $ : _) && t({
                    storeId: e,
                    type: O.direct,
                    events: I
                }, s)
            }
            ), x({}, v, n))));
            return s
        },
        $dispose: function() {
            d.stop(),
            M = [],
            A = [],
            i._s.delete(e)
        }
    }
      , q = f(W);
    i._s.set(e, q);
    const z = i._a && i._a.runWithContext || S
      , B = i._e.run(( () => (d = t(),
    z(( () => d.run(s))))));
    for (const t in B) {
        const n = B[t];
        if (a(n) && (!a(G = n) || !G.effect) || r(n))
            l || (!F || j(D = n) && D.hasOwnProperty(E) || (a(n) ? n.value = F[t] : w(n, F[t])),
            i.state.value[e][t] = n);
        else if ("function" == typeof n) {
            const e = N(t, n);
            B[t] = e,
            y.actions[t] = n
        }
    }
    var D, G;
    return x(q, B),
    x(c(q), B),
    Object.defineProperty(q, "$state", {
        get: () => i.state.value[e],
        set: t => {
            C((n => {
                x(n, t)
            }
            ))
        }
    }),
    i._p.forEach((t => {
        x(q, d.run(( () => t({
            store: q,
            app: i._a,
            pinia: i,
            options: y
        }))))
    }
    )),
    F && l && o.hydrate && o.hydrate(q.$state, F),
    _ = !0,
    $ = !0,
    q
}
function M(t, n, c) {
    let a, r;
    const i = "function" == typeof n;
    function u(t, c) {
        const u = s();
        (t = t || (u ? o(_, null) : null)) && b(t),
        (t = v)._s.has(a) || (i ? I(a, n, r, t) : function(t, n, s, o) {
            const {state: c, actions: a, getters: r} = n
              , i = s.state.value[t];
            let u;
            u = I(t, (function() {
                i || (s.state.value[t] = c ? c() : {});
                const n = d(s.state.value[t]);
                return x(n, a, Object.keys(r || {}).reduce(( (n, o) => (n[o] = e(y(( () => {
                    b(s);
                    const n = s._s.get(t);
                    return r[o].call(n, n)
                }
                ))),
                n)), {}))
            }
            ), n, s, 0, !0)
        }(a, r, t));
        return t._s.get(a)
    }
    return "string" == typeof t ? (a = t,
    r = i ? c : n) : (r = t,
    a = t.id),
    u.$id = a,
    u
}
function A(t) {
    {
        t = c(t);
        const n = {};
        for (const e in t) {
            const s = t[e];
            (a(s) || r(s)) && (n[e] = i(t, e))
        }
        return n
    }
}
export {$ as c, M as d, A as s};
