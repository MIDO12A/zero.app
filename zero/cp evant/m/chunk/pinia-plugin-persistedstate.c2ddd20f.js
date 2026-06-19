function e(e, r) {
    var t;
    return e = "object" == typeof (t = e) && null !== t ? e : Object.create(null),
    new Proxy(e,{
        get: (e, t, o) => "key" === t ? Reflect.get(e, t, o) : Reflect.get(e, t, o) || Reflect.get(r, t, o)
    })
}
function r(e, {storage: r, serializer: t, key: o, debug: s}) {
    try {
        const s = null == r ? void 0 : r.getItem(o);
        s && e.$patch(null == t ? void 0 : t.deserialize(s))
    } catch (n) {
        s && console.error(n)
    }
}
function t(e, {storage: r, serializer: t, key: o, paths: s, debug: n}) {
    try {
        const n = Array.isArray(s) ? function(e, r) {
            return r.reduce(( (r, t) => {
                const o = t.split(".");
                return function(e, r, t) {
                    return r.slice(0, -1).reduce(( (e, r) => /^(__proto__)$/.test(r) ? {} : e[r] = e[r] || {}), e)[r[r.length - 1]] = t,
                    e
                }(r, o, function(e, r) {
                    return r.reduce(( (e, r) => null == e ? void 0 : e[r]), e)
                }(e, o))
            }
            ), {})
        }(e, s) : e;
        r.setItem(o, t.serialize(n))
    } catch (i) {
        n && console.error(i)
    }
}
var o = function(o={}) {
    return s => {
        const {auto: n=!1} = o
          , {options: {persist: i=n}, store: a, pinia: l} = s;
        if (!i)
            return;
        if (!(a.$id in l.state.value)) {
            const e = l._s.get(a.$id.replace("__hot:", ""));
            return void (e && Promise.resolve().then(( () => e.$persist())))
        }
        const u = (Array.isArray(i) ? i.map((r => e(r, o))) : [e(i, o)]).map(( ({storage: e=localStorage, beforeRestore: r=null, afterRestore: t=null, serializer: s={
            serialize: JSON.stringify,
            deserialize: JSON.parse
        }, key: n=a.$id, paths: i=null, debug: l=!1}) => {
            var u;
            return {
                storage: e,
                beforeRestore: r,
                afterRestore: t,
                serializer: s,
                key: (null != (u = o.key) ? u : e => e)("string" == typeof n ? n : n(a.$id)),
                paths: i,
                debug: l
            }
        }
        ));
        a.$persist = () => {
            u.forEach((e => {
                t(a.$state, e)
            }
            ))
        }
        ,
        a.$hydrate = ({runHooks: e=!0}={}) => {
            u.forEach((t => {
                const {beforeRestore: o, afterRestore: n} = t;
                e && (null == o || o(s)),
                r(a, t),
                e && (null == n || n(s))
            }
            ))
        }
        ,
        u.forEach((e => {
            const {beforeRestore: o, afterRestore: n} = e;
            null == o || o(s),
            r(a, e),
            null == n || n(s),
            a.$subscribe(( (r, o) => {
                t(o, e)
            }
            ), {
                detached: !0
            })
        }
        ))
    }
}();
export {o as s};
