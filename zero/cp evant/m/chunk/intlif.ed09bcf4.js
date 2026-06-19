import {c as e} from "./complex.js.7979b60d.js";
import {s as t} from "./source-map.ac5a6fef.js";
var n = {
    exports: {}
}
  , r = {};
/*!
  * shared v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
Object.defineProperty(r, "__esModule", {
    value: !0
});
const o = "undefined" != typeof window;
const s = /\{([0-9a-zA-Z]+)\}/g;
const a = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag
  , i = e => JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const c = Object.assign;
let l;
const u = Object.prototype.hasOwnProperty;
const f = Array.isArray
  , m = e => "function" == typeof e
  , p = e => null !== e && "object" == typeof e
  , E = Object.prototype.toString
  , _ = e => E.call(e)
  , d = e => "[object Object]" === _(e);
r.assign = c,
r.createEmitter = function() {
    const e = new Map;
    return {
        events: e,
        on(t, n) {
            const r = e.get(t);
            r && r.push(n) || e.set(t, [n])
        },
        off(t, n) {
            const r = e.get(t);
            r && r.splice(r.indexOf(n) >>> 0, 1)
        },
        emit(t, n) {
            (e.get(t) || []).slice().map((e => e(n))),
            (e.get("*") || []).slice().map((e => e(t, n)))
        }
    }
}
,
r.escapeHtml = function(e) {
    return e.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;")
}
,
r.format = function(e, ...t) {
    return 1 === t.length && p(t[0]) && (t = t[0]),
    t && t.hasOwnProperty || (t = {}),
    e.replace(s, ( (e, n) => t.hasOwnProperty(n) ? t[n] : ""))
}
,
r.friendlyJSONstringify = i,
r.generateCodeFrame = function(e, t=0, n=e.length) {
    const r = e.split(/\r?\n/);
    let o = 0;
    const s = [];
    for (let a = 0; a < r.length; a++)
        if (o += r[a].length + 1,
        o >= t) {
            for (let e = a - 2; e <= a + 2 || n > o; e++) {
                if (e < 0 || e >= r.length)
                    continue;
                const i = e + 1;
                s.push(`${i}${" ".repeat(3 - String(i).length)}|  ${r[e]}`);
                const c = r[e].length;
                if (e === a) {
                    const e = t - (o - c) + 1
                      , r = Math.max(1, n > o ? c - e : n - t);
                    s.push("   |  " + " ".repeat(e) + "^".repeat(r))
                } else if (e > a) {
                    if (n > o) {
                        const e = Math.max(Math.min(n - o, c), 1);
                        s.push("   |  " + "^".repeat(e))
                    }
                    o += c + 1
                }
            }
            break
        }
    return s.join("\n")
}
,
r.generateFormatCacheKey = (e, t, n) => i({
    l: e,
    k: t,
    s: n
}),
r.getGlobalThis = () => l || (l = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== e ? e : {}),
r.hasOwn = function(e, t) {
    return u.call(e, t)
}
,
r.inBrowser = o,
r.isArray = f,
r.isBoolean = e => "boolean" == typeof e,
r.isDate = e => "[object Date]" === _(e),
r.isEmptyObject = e => d(e) && 0 === Object.keys(e).length,
r.isFunction = m,
r.isNumber = e => "number" == typeof e && isFinite(e),
r.isObject = p,
r.isPlainObject = d,
r.isPromise = e => p(e) && m(e.then) && m(e.catch),
r.isRegExp = e => "[object RegExp]" === _(e),
r.isString = e => "string" == typeof e,
r.isSymbol = e => "symbol" == typeof e,
r.makeSymbol = e => a ? Symbol(e) : e,
r.mark = undefined,
r.measure = undefined,
r.objectToString = E,
r.toDisplayString = e => null == e ? "" : f(e) || d(e) && e.toString === E ? JSON.stringify(e, null, 2) : String(e),
r.toTypeString = _,
r.warn = function(e, t) {
    "undefined" != typeof console && (console.warn("[intlify] " + e),
    t && console.warn(t.stack))
}
,
n.exports = r;
var g = {
    exports: {}
}
  , N = {}
  , L = {
    exports: {}
}
  , T = {};
/*!
  * message-compiler v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
Object.defineProperty(T, "__esModule", {
    value: !0
});
var b = n.exports
  , A = t;
const C = {
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14,
    __EXTEND_POINT__: 15
}
  , h = {
    [C.EXPECTED_TOKEN]: "Expected token: '{0}'",
    [C.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
    [C.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]: "Unterminated single quote in placeholder",
    [C.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
    [C.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
    [C.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
    [C.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
    [C.EMPTY_PLACEHOLDER]: "Empty placeholder",
    [C.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
    [C.INVALID_LINKED_FORMAT]: "Invalid linked format",
    [C.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
    [C.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
    [C.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
    [C.UNEXPECTED_LEXICAL_ANALYSIS]: "Unexpected lexical analysis in token: '{0}'"
};
function k(e, t, n={}) {
    const {domain: r, messages: o, args: s} = n
      , a = new SyntaxError(String(e));
    return a.code = e,
    t && (a.location = t),
    a.domain = r,
    a
}
const S = {
    start: {
        line: 1,
        column: 1,
        offset: 0
    },
    end: {
        line: 1,
        column: 1,
        offset: 0
    }
};
function O(e, t, n) {
    return {
        line: e,
        column: t,
        offset: n
    }
}
function y(e, t, n) {
    const r = {
        start: e,
        end: t
    };
    return null != n && (r.source = n),
    r
}
const I = " "
  , P = "\r"
  , D = "\n"
  , x = String.fromCharCode(8232)
  , M = String.fromCharCode(8233);
function F(e) {
    const t = e;
    let n = 0
      , r = 1
      , o = 1
      , s = 0;
    const a = e => t[e] === P && t[e + 1] === D
      , i = e => t[e] === M
      , c = e => t[e] === x
      , l = e => a(e) || (e => t[e] === D)(e) || i(e) || c(e)
      , u = e => a(e) || i(e) || c(e) ? D : t[e];
    function f() {
        return s = 0,
        l(n) && (r++,
        o = 0),
        a(n) && n++,
        n++,
        o++,
        t[n]
    }
    return {
        index: () => n,
        line: () => r,
        column: () => o,
        peekOffset: () => s,
        charAt: u,
        currentChar: () => u(n),
        currentPeek: () => u(n + s),
        next: f,
        peek: function() {
            return a(n + s) && s++,
            s++,
            t[n + s]
        },
        reset: function() {
            n = 0,
            r = 1,
            o = 1,
            s = 0
        },
        resetPeek: function(e=0) {
            s = e
        },
        skipToPeek: function() {
            const e = n + s;
            for (; e !== n; )
                f();
            s = 0
        }
    }
}
const R = void 0
  , v = "'"
  , U = "tokenizer";
function w(e, t={}) {
    const n = !1 !== t.location
      , r = F(e)
      , o = () => r.index()
      , s = () => O(r.line(), r.column(), r.index())
      , a = s()
      , i = o()
      , c = {
        currentType: 14,
        offset: i,
        startLoc: a,
        endLoc: a,
        lastType: 14,
        lastOffset: i,
        lastStartLoc: a,
        lastEndLoc: a,
        braceNest: 0,
        inLinked: !1,
        text: ""
    }
      , l = () => c
      , {onError: u} = t;
    function f(e, t, n, ...r) {
        const o = l();
        if (t.column += n,
        t.offset += n,
        u) {
            const n = k(e, y(o.startLoc, t), {
                domain: U,
                args: r
            });
            u(n)
        }
    }
    function m(e, t, r) {
        e.endLoc = s(),
        e.currentType = t;
        const o = {
            type: t
        };
        return n && (o.loc = y(e.startLoc, e.endLoc)),
        null != r && (o.value = r),
        o
    }
    const p = e => m(e, 14);
    function E(e, t) {
        return e.currentChar() === t ? (e.next(),
        t) : (f(C.EXPECTED_TOKEN, s(), 0, t),
        "")
    }
    function _(e) {
        let t = "";
        for (; e.currentPeek() === I || e.currentPeek() === D; )
            t += e.currentPeek(),
            e.peek();
        return t
    }
    function d(e) {
        const t = _(e);
        return e.skipToPeek(),
        t
    }
    function g(e) {
        if (e === R)
            return !1;
        const t = e.charCodeAt(0);
        return t >= 97 && t <= 122 || t >= 65 && t <= 90 || 95 === t
    }
    function N(e, t) {
        const {currentType: n} = t;
        if (2 !== n)
            return !1;
        _(e);
        const r = function(e) {
            if (e === R)
                return !1;
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57
        }("-" === e.currentPeek() ? e.peek() : e.currentPeek());
        return e.resetPeek(),
        r
    }
    function L(e) {
        _(e);
        const t = "|" === e.currentPeek();
        return e.resetPeek(),
        t
    }
    function T(e, t=!0) {
        const n = (t=!1, r="", o=!1) => {
            const s = e.currentPeek();
            return "{" === s ? "%" !== r && t : "@" !== s && s ? "%" === s ? (e.peek(),
            n(t, "%", !0)) : "|" === s ? !("%" !== r && !o) || !(r === I || r === D) : s === I ? (e.peek(),
            n(!0, I, o)) : s !== D || (e.peek(),
            n(!0, D, o)) : "%" === r || t
        }
          , r = n();
        return t && e.resetPeek(),
        r
    }
    function b(e, t) {
        const n = e.currentChar();
        return n === R ? R : t(n) ? (e.next(),
        n) : null
    }
    function A(e) {
        return b(e, (e => {
            const t = e.charCodeAt(0);
            return t >= 97 && t <= 122 || t >= 65 && t <= 90 || t >= 48 && t <= 57 || 95 === t || 36 === t
        }
        ))
    }
    function h(e) {
        return b(e, (e => {
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57
        }
        ))
    }
    function S(e) {
        return b(e, (e => {
            const t = e.charCodeAt(0);
            return t >= 48 && t <= 57 || t >= 65 && t <= 70 || t >= 97 && t <= 102
        }
        ))
    }
    function P(e) {
        let t = ""
          , n = "";
        for (; t = h(e); )
            n += t;
        return n
    }
    function x(e) {
        let t = "";
        for (; ; ) {
            const n = e.currentChar();
            if ("{" === n || "}" === n || "@" === n || "|" === n || !n)
                break;
            if ("%" === n) {
                if (!T(e))
                    break;
                t += n,
                e.next()
            } else if (n === I || n === D)
                if (T(e))
                    t += n,
                    e.next();
                else {
                    if (L(e))
                        break;
                    t += n,
                    e.next()
                }
            else
                t += n,
                e.next()
        }
        return t
    }
    function M(e) {
        const t = e.currentChar();
        switch (t) {
        case "\\":
        case "'":
            return e.next(),
            `\\${t}`;
        case "u":
            return w(e, t, 4);
        case "U":
            return w(e, t, 6);
        default:
            return f(C.UNKNOWN_ESCAPE_SEQUENCE, s(), 0, t),
            ""
        }
    }
    function w(e, t, n) {
        E(e, t);
        let r = "";
        for (let o = 0; o < n; o++) {
            const n = S(e);
            if (!n) {
                f(C.INVALID_UNICODE_ESCAPE_SEQUENCE, s(), 0, `\\${t}${r}${e.currentChar()}`);
                break
            }
            r += n
        }
        return `\\${t}${r}`
    }
    function j(e) {
        d(e);
        const t = E(e, "|");
        return d(e),
        t
    }
    function W(e, t) {
        let n = null;
        switch (e.currentChar()) {
        case "{":
            return t.braceNest >= 1 && f(C.NOT_ALLOW_NEST_PLACEHOLDER, s(), 0),
            e.next(),
            n = m(t, 2, "{"),
            d(e),
            t.braceNest++,
            n;
        case "}":
            return t.braceNest > 0 && 2 === t.currentType && f(C.EMPTY_PLACEHOLDER, s(), 0),
            e.next(),
            n = m(t, 3, "}"),
            t.braceNest--,
            t.braceNest > 0 && d(e),
            t.inLinked && 0 === t.braceNest && (t.inLinked = !1),
            n;
        case "@":
            return t.braceNest > 0 && f(C.UNTERMINATED_CLOSING_BRACE, s(), 0),
            n = $(e, t) || p(t),
            t.braceNest = 0,
            n;
        default:
            let r = !0
              , o = !0
              , a = !0;
            if (L(e))
                return t.braceNest > 0 && f(C.UNTERMINATED_CLOSING_BRACE, s(), 0),
                n = m(t, 1, j(e)),
                t.braceNest = 0,
                t.inLinked = !1,
                n;
            if (t.braceNest > 0 && (5 === t.currentType || 6 === t.currentType || 7 === t.currentType))
                return f(C.UNTERMINATED_CLOSING_BRACE, s(), 0),
                t.braceNest = 0,
                X(e, t);
            if (r = function(e, t) {
                const {currentType: n} = t;
                if (2 !== n)
                    return !1;
                _(e);
                const r = g(e.currentPeek());
                return e.resetPeek(),
                r
            }(e, t))
                return n = m(t, 5, function(e) {
                    d(e);
                    let t = ""
                      , n = "";
                    for (; t = A(e); )
                        n += t;
                    return e.currentChar() === R && f(C.UNTERMINATED_CLOSING_BRACE, s(), 0),
                    n
                }(e)),
                d(e),
                n;
            if (o = N(e, t))
                return n = m(t, 6, function(e) {
                    d(e);
                    let t = "";
                    return "-" === e.currentChar() ? (e.next(),
                    t += `-${P(e)}`) : t += P(e),
                    e.currentChar() === R && f(C.UNTERMINATED_CLOSING_BRACE, s(), 0),
                    t
                }(e)),
                d(e),
                n;
            if (a = function(e, t) {
                const {currentType: n} = t;
                if (2 !== n)
                    return !1;
                _(e);
                const r = e.currentPeek() === v;
                return e.resetPeek(),
                r
            }(e, t))
                return n = m(t, 7, function(e) {
                    d(e),
                    E(e, "'");
                    let t = ""
                      , n = "";
                    const r = e => e !== v && e !== D;
                    for (; t = b(e, r); )
                        n += "\\" === t ? M(e) : t;
                    const o = e.currentChar();
                    return o === D || o === R ? (f(C.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, s(), 0),
                    o === D && (e.next(),
                    E(e, "'")),
                    n) : (E(e, "'"),
                    n)
                }(e)),
                d(e),
                n;
            if (!r && !o && !a)
                return n = m(t, 13, function(e) {
                    d(e);
                    let t = ""
                      , n = "";
                    const r = e => "{" !== e && "}" !== e && e !== I && e !== D;
                    for (; t = b(e, r); )
                        n += t;
                    return n
                }(e)),
                f(C.INVALID_TOKEN_IN_PLACEHOLDER, s(), 0, n.value),
                d(e),
                n
        }
        return n
    }
    function $(e, t) {
        const {currentType: n} = t;
        let r = null;
        const o = e.currentChar();
        switch (8 !== n && 9 !== n && 12 !== n && 10 !== n || o !== D && o !== I || f(C.INVALID_LINKED_FORMAT, s(), 0),
        o) {
        case "@":
            return e.next(),
            r = m(t, 8, "@"),
            t.inLinked = !0,
            r;
        case ".":
            return d(e),
            e.next(),
            m(t, 9, ".");
        case ":":
            return d(e),
            e.next(),
            m(t, 10, ":");
        default:
            return L(e) ? (r = m(t, 1, j(e)),
            t.braceNest = 0,
            t.inLinked = !1,
            r) : function(e, t) {
                const {currentType: n} = t;
                if (8 !== n)
                    return !1;
                _(e);
                const r = "." === e.currentPeek();
                return e.resetPeek(),
                r
            }(e, t) || function(e, t) {
                const {currentType: n} = t;
                if (8 !== n && 12 !== n)
                    return !1;
                _(e);
                const r = ":" === e.currentPeek();
                return e.resetPeek(),
                r
            }(e, t) ? (d(e),
            $(e, t)) : function(e, t) {
                const {currentType: n} = t;
                if (9 !== n)
                    return !1;
                _(e);
                const r = g(e.currentPeek());
                return e.resetPeek(),
                r
            }(e, t) ? (d(e),
            m(t, 12, function(e) {
                let t = ""
                  , n = "";
                for (; t = A(e); )
                    n += t;
                return n
            }(e))) : function(e, t) {
                const {currentType: n} = t;
                if (10 !== n)
                    return !1;
                const r = () => {
                    const t = e.currentPeek();
                    return "{" === t ? g(e.peek()) : !("@" === t || "%" === t || "|" === t || ":" === t || "." === t || t === I || !t) && (t === D ? (e.peek(),
                    r()) : g(t))
                }
                  , o = r();
                return e.resetPeek(),
                o
            }(e, t) ? (d(e),
            "{" === o ? W(e, t) || r : m(t, 11, function(e) {
                const t = (n=!1, r) => {
                    const o = e.currentChar();
                    return "{" !== o && "%" !== o && "@" !== o && "|" !== o && o ? o === I ? r : o === D ? (r += o,
                    e.next(),
                    t(n, r)) : (r += o,
                    e.next(),
                    t(!0, r)) : r
                }
                ;
                return t(!1, "")
            }(e))) : (8 === n && f(C.INVALID_LINKED_FORMAT, s(), 0),
            t.braceNest = 0,
            t.inLinked = !1,
            X(e, t))
        }
    }
    function X(e, t) {
        let n = {
            type: 14
        };
        if (t.braceNest > 0)
            return W(e, t) || p(t);
        if (t.inLinked)
            return $(e, t) || p(t);
        switch (e.currentChar()) {
        case "{":
            return W(e, t) || p(t);
        case "}":
            return f(C.UNBALANCED_CLOSING_BRACE, s(), 0),
            e.next(),
            m(t, 3, "}");
        case "@":
            return $(e, t) || p(t);
        default:
            if (L(e))
                return n = m(t, 1, j(e)),
                t.braceNest = 0,
                t.inLinked = !1,
                n;
            const {isModulo: r, hasSpace: o} = function(e) {
                const t = _(e)
                  , n = "%" === e.currentPeek() && "{" === e.peek();
                return e.resetPeek(),
                {
                    isModulo: n,
                    hasSpace: t.length > 0
                }
            }(e);
            if (r)
                return o ? m(t, 0, x(e)) : m(t, 4, function(e) {
                    d(e);
                    const t = e.currentChar();
                    return "%" !== t && f(C.EXPECTED_TOKEN, s(), 0, t),
                    e.next(),
                    "%"
                }(e));
            if (T(e))
                return m(t, 0, x(e))
        }
        return n
    }
    return {
        nextToken: function() {
            const {currentType: e, offset: t, startLoc: n, endLoc: a} = c;
            return c.lastType = e,
            c.lastOffset = t,
            c.lastStartLoc = n,
            c.lastEndLoc = a,
            c.offset = o(),
            c.startLoc = s(),
            r.currentChar() === R ? m(c, 14) : X(r, c)
        },
        currentOffset: o,
        currentPosition: s,
        context: l
    }
}
const j = "parser"
  , W = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function $(e, t, n) {
    switch (e) {
    case "\\\\":
        return "\\";
    case "\\'":
        return "'";
    default:
        {
            const e = parseInt(t || n, 16);
            return e <= 55295 || e >= 57344 ? String.fromCodePoint(e) : "�"
        }
    }
}
function X(e={}) {
    const t = !1 !== e.location
      , {onError: n} = e;
    function r(e, t, r, o, ...s) {
        const a = e.currentPosition();
        if (a.offset += o,
        a.column += o,
        n) {
            const e = k(t, y(r, a), {
                domain: j,
                args: s
            });
            n(e)
        }
    }
    function o(e, n, r) {
        const o = {
            type: e,
            start: n,
            end: n
        };
        return t && (o.loc = {
            start: r,
            end: r
        }),
        o
    }
    function s(e, n, r, o) {
        e.end = n,
        o && (e.type = o),
        t && e.loc && (e.loc.end = r)
    }
    function a(e, t) {
        const n = e.context()
          , r = o(3, n.offset, n.startLoc);
        return r.value = t,
        s(r, e.currentOffset(), e.currentPosition()),
        r
    }
    function i(e, t) {
        const n = e.context()
          , {lastOffset: r, lastStartLoc: a} = n
          , i = o(5, r, a);
        return i.index = parseInt(t, 10),
        e.nextToken(),
        s(i, e.currentOffset(), e.currentPosition()),
        i
    }
    function c(e, t) {
        const n = e.context()
          , {lastOffset: r, lastStartLoc: a} = n
          , i = o(4, r, a);
        return i.key = t,
        e.nextToken(),
        s(i, e.currentOffset(), e.currentPosition()),
        i
    }
    function l(e, t) {
        const n = e.context()
          , {lastOffset: r, lastStartLoc: a} = n
          , i = o(9, r, a);
        return i.value = t.replace(W, $),
        e.nextToken(),
        s(i, e.currentOffset(), e.currentPosition()),
        i
    }
    function u(e) {
        const t = e.context()
          , n = o(6, t.offset, t.startLoc);
        let a = e.nextToken();
        if (9 === a.type) {
            const t = function(e) {
                const t = e.nextToken()
                  , n = e.context()
                  , {lastOffset: a, lastStartLoc: i} = n
                  , c = o(8, a, i);
                return 12 !== t.type ? (r(e, C.UNEXPECTED_EMPTY_LINKED_MODIFIER, n.lastStartLoc, 0),
                c.value = "",
                s(c, a, i),
                {
                    nextConsumeToken: t,
                    node: c
                }) : (null == t.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, n.lastStartLoc, 0, B(t)),
                c.value = t.value || "",
                s(c, e.currentOffset(), e.currentPosition()),
                {
                    node: c
                })
            }(e);
            n.modifier = t.node,
            a = t.nextConsumeToken || e.nextToken()
        }
        switch (10 !== a.type && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(a)),
        a = e.nextToken(),
        2 === a.type && (a = e.nextToken()),
        a.type) {
        case 11:
            null == a.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(a)),
            n.key = function(e, t) {
                const n = e.context()
                  , r = o(7, n.offset, n.startLoc);
                return r.value = t,
                s(r, e.currentOffset(), e.currentPosition()),
                r
            }(e, a.value || "");
            break;
        case 5:
            null == a.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(a)),
            n.key = c(e, a.value || "");
            break;
        case 6:
            null == a.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(a)),
            n.key = i(e, a.value || "");
            break;
        case 7:
            null == a.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(a)),
            n.key = l(e, a.value || "");
            break;
        default:
            r(e, C.UNEXPECTED_EMPTY_LINKED_KEY, t.lastStartLoc, 0);
            const u = e.context()
              , f = o(7, u.offset, u.startLoc);
            return f.value = "",
            s(f, u.offset, u.startLoc),
            n.key = f,
            s(n, u.offset, u.startLoc),
            {
                nextConsumeToken: a,
                node: n
            }
        }
        return s(n, e.currentOffset(), e.currentPosition()),
        {
            node: n
        }
    }
    function f(e) {
        const t = e.context()
          , n = o(2, 1 === t.currentType ? e.currentOffset() : t.offset, 1 === t.currentType ? t.endLoc : t.startLoc);
        n.items = [];
        let f = null;
        do {
            const o = f || e.nextToken();
            switch (f = null,
            o.type) {
            case 0:
                null == o.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(o)),
                n.items.push(a(e, o.value || ""));
                break;
            case 6:
                null == o.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(o)),
                n.items.push(i(e, o.value || ""));
                break;
            case 5:
                null == o.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(o)),
                n.items.push(c(e, o.value || ""));
                break;
            case 7:
                null == o.value && r(e, C.UNEXPECTED_LEXICAL_ANALYSIS, t.lastStartLoc, 0, B(o)),
                n.items.push(l(e, o.value || ""));
                break;
            case 8:
                const s = u(e);
                n.items.push(s.node),
                f = s.nextConsumeToken || null
            }
        } while (14 !== t.currentType && 1 !== t.currentType);
        return s(n, 1 === t.currentType ? t.lastOffset : e.currentOffset(), 1 === t.currentType ? t.lastEndLoc : e.currentPosition()),
        n
    }
    function m(e) {
        const t = e.context()
          , {offset: n, startLoc: a} = t
          , i = f(e);
        return 14 === t.currentType ? i : function(e, t, n, a) {
            const i = e.context();
            let c = 0 === a.items.length;
            const l = o(1, t, n);
            l.cases = [],
            l.cases.push(a);
            do {
                const t = f(e);
                c || (c = 0 === t.items.length),
                l.cases.push(t)
            } while (14 !== i.currentType);
            return c && r(e, C.MUST_HAVE_MESSAGES_IN_PLURAL, n, 0),
            s(l, e.currentOffset(), e.currentPosition()),
            l
        }(e, n, a, i)
    }
    return {
        parse: function(n) {
            const a = w(n, b.assign({}, e))
              , i = a.context()
              , c = o(0, i.offset, i.startLoc);
            return t && c.loc && (c.loc.source = n),
            c.body = m(a),
            14 !== i.currentType && r(a, C.UNEXPECTED_LEXICAL_ANALYSIS, i.lastStartLoc, 0, n[i.offset] || ""),
            s(c, a.currentOffset(), a.currentPosition()),
            c
        }
    }
}
function B(e) {
    if (14 === e.type)
        return "EOF";
    const t = (e.value || "").replace(/\r?\n/gu, "\\n");
    return t.length > 10 ? t.slice(0, 9) + "…" : t
}
function K(e, t) {
    for (let n = 0; n < e.length; n++)
        V(e[n], t)
}
function V(e, t) {
    switch (e.type) {
    case 1:
        K(e.cases, t),
        t.helper("plural");
        break;
    case 2:
        K(e.items, t);
        break;
    case 6:
        V(e.key, t),
        t.helper("linked"),
        t.helper("type");
        break;
    case 5:
        t.helper("interpolate"),
        t.helper("list");
        break;
    case 4:
        t.helper("interpolate"),
        t.helper("named")
    }
}
function G(e, t={}) {
    const n = function(e, t={}) {
        const n = {
            ast: e,
            helpers: new Set
        };
        return {
            context: () => n,
            helper: e => (n.helpers.add(e),
            e)
        }
    }(e);
    n.helper("normalize"),
    e.body && V(e.body, n);
    const r = n.context();
    e.helpers = Array.from(r.helpers)
}
function Y(e, t) {
    const {sourceMap: n, filename: r, breakLineCode: o, needIndent: s} = t
      , a = {
        source: e.loc.source,
        filename: r,
        code: "",
        column: 1,
        line: 1,
        offset: 0,
        map: void 0,
        breakLineCode: o,
        needIndent: s,
        indentLevel: 0
    };
    function i(e, t) {
        var n, r;
        a.code += e,
        a.map && (t && t.loc && t.loc !== S && (n = t.loc.start,
        r = function(e) {
            switch (e.type) {
            case 3:
            case 9:
            case 8:
            case 7:
                return e.value;
            case 5:
                return e.index.toString();
            case 4:
                return e.key;
            default:
                return
            }
        }(t),
        a.map.addMapping({
            name: r,
            source: a.filename,
            original: {
                line: n.line,
                column: n.column - 1
            },
            generated: {
                line: a.line,
                column: a.column - 1
            }
        })),
        function(e, t, n=t.length) {
            let r = 0
              , o = -1;
            for (let s = 0; s < n; s++)
                10 === t.charCodeAt(s) && (r++,
                o = s);
            e.offset += n,
            e.line += r,
            e.column = -1 === o ? e.column + n : n - o
        }(a, e))
    }
    function c(e, t=!0) {
        const n = t ? o : "";
        i(s ? n + "  ".repeat(e) : n)
    }
    return n && (a.map = new A.SourceMapGenerator,
    a.map.setSourceContent(r, a.source)),
    {
        context: () => a,
        push: i,
        indent: function(e=!0) {
            const t = ++a.indentLevel;
            e && c(t)
        },
        deindent: function(e=!0) {
            const t = --a.indentLevel;
            e && c(t)
        },
        newline: function() {
            c(a.indentLevel)
        },
        helper: e => `_${e}`,
        needIndent: () => a.needIndent
    }
}
function H(e, t) {
    const {helper: n} = e;
    switch (t.type) {
    case 0:
        !function(e, t) {
            t.body ? H(e, t.body) : e.push("null")
        }(e, t);
        break;
    case 1:
        !function(e, t) {
            const {helper: n, needIndent: r} = e;
            if (t.cases.length > 1) {
                e.push(`${n("plural")}([`),
                e.indent(r());
                const o = t.cases.length;
                for (let n = 0; n < o && (H(e, t.cases[n]),
                n !== o - 1); n++)
                    e.push(", ");
                e.deindent(r()),
                e.push("])")
            }
        }(e, t);
        break;
    case 2:
        !function(e, t) {
            const {helper: n, needIndent: r} = e;
            e.push(`${n("normalize")}([`),
            e.indent(r());
            const o = t.items.length;
            for (let s = 0; s < o && (H(e, t.items[s]),
            s !== o - 1); s++)
                e.push(", ");
            e.deindent(r()),
            e.push("])")
        }(e, t);
        break;
    case 6:
        !function(e, t) {
            const {helper: n} = e;
            e.push(`${n("linked")}(`),
            H(e, t.key),
            t.modifier ? (e.push(", "),
            H(e, t.modifier),
            e.push(", _type")) : e.push(", undefined, _type"),
            e.push(")")
        }(e, t);
        break;
    case 8:
    case 7:
    case 9:
    case 3:
        e.push(JSON.stringify(t.value), t);
        break;
    case 5:
        e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t);
        break;
    case 4:
        e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t)
    }
}
T.CompileErrorCodes = C,
T.ERROR_DOMAIN = j,
T.LocationStub = S,
T.baseCompile = function(e, t={}) {
    const n = b.assign({}, t)
      , r = X(n).parse(e);
    return G(r, n),
    ( (e, t={}) => {
        const n = b.isString(t.mode) ? t.mode : "normal"
          , r = b.isString(t.filename) ? t.filename : "message.intl"
          , o = !!t.sourceMap
          , s = null != t.breakLineCode ? t.breakLineCode : "arrow" === n ? ";" : "\n"
          , a = t.needIndent ? t.needIndent : "arrow" !== n
          , i = e.helpers || []
          , c = Y(e, {
            mode: n,
            filename: r,
            sourceMap: o,
            breakLineCode: s,
            needIndent: a
        });
        c.push("normal" === n ? "function __msg__ (ctx) {" : "(ctx) => {"),
        c.indent(a),
        i.length > 0 && (c.push(`const { ${i.map((e => `${e}: _${e}`)).join(", ")} } = ctx`),
        c.newline()),
        c.push("return "),
        H(c, e),
        c.deindent(a),
        c.push("}");
        const {code: l, map: u} = c.context();
        return {
            ast: e,
            code: l,
            map: u ? u.toJSON() : void 0
        }
    }
    )(r, n)
}
,
T.createCompileError = k,
T.createLocation = y,
T.createParser = X,
T.createPosition = O,
T.defaultOnError = function(e) {
    throw e
}
,
T.errorMessages = h,
L.exports = T;
var Q = {
    exports: {}
}
  , z = {};
/*!
  * devtools-if v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
Object.defineProperty(z, "__esModule", {
    value: !0
});
z.IntlifyDevToolsHooks = {
    I18nInit: "i18n:init",
    FunctionTranslate: "function:translate"
},
Q.exports = z,
/*!
  * core-base v9.2.2
  * (c) 2022 kazuya kawaguchi
  * Released under the MIT License.
  */
Object.defineProperty(N, "__esModule", {
    value: !0
});
var J = L.exports
  , q = n.exports
  , Z = Q.exports;
const ee = [];
ee[0] = {
    w: [0],
    i: [3, 0],
    "[": [4],
    o: [7]
},
ee[1] = {
    w: [1],
    ".": [2],
    "[": [4],
    o: [7]
},
ee[2] = {
    w: [2],
    i: [3, 0],
    0: [3, 0]
},
ee[3] = {
    i: [3, 0],
    0: [3, 0],
    w: [1, 1],
    ".": [2, 1],
    "[": [4, 1],
    o: [7, 1]
},
ee[4] = {
    "'": [5, 0],
    '"': [6, 0],
    "[": [4, 2],
    "]": [1, 3],
    o: 8,
    l: [4, 0]
},
ee[5] = {
    "'": [4, 0],
    o: 8,
    l: [5, 0]
},
ee[6] = {
    '"': [4, 0],
    o: 8,
    l: [6, 0]
};
const te = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function ne(e) {
    if (null == e)
        return "o";
    switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
        return e;
    case 95:
    case 36:
    case 45:
        return "i";
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
        return "w"
    }
    return "i"
}
function re(e) {
    const t = e.trim();
    return ("0" !== e.charAt(0) || !isNaN(parseInt(e))) && (n = t,
    te.test(n) ? function(e) {
        const t = e.charCodeAt(0);
        return t !== e.charCodeAt(e.length - 1) || 34 !== t && 39 !== t ? e : e.slice(1, -1)
    }(t) : "*" + t);
    var n
}
function oe(e) {
    const t = [];
    let n, r, o, s, a, i, c, l = -1, u = 0, f = 0;
    const m = [];
    function p() {
        const t = e[l + 1];
        if (5 === u && "'" === t || 6 === u && '"' === t)
            return l++,
            o = "\\" + t,
            m[0](),
            !0
    }
    for (m[0] = () => {
        void 0 === r ? r = o : r += o
    }
    ,
    m[1] = () => {
        void 0 !== r && (t.push(r),
        r = void 0)
    }
    ,
    m[2] = () => {
        m[0](),
        f++
    }
    ,
    m[3] = () => {
        if (f > 0)
            f--,
            u = 4,
            m[0]();
        else {
            if (f = 0,
            void 0 === r)
                return !1;
            if (r = re(r),
            !1 === r)
                return !1;
            m[1]()
        }
    }
    ; null !== u; )
        if (l++,
        n = e[l],
        "\\" !== n || !p()) {
            if (s = ne(n),
            c = ee[u],
            a = c[s] || c.l || 8,
            8 === a)
                return;
            if (u = a[0],
            void 0 !== a[1] && (i = m[a[1]],
            i && (o = n,
            !1 === i())))
                return;
            if (7 === u)
                return t
        }
}
const se = new Map;
function ae(e, t) {
    return q.isObject(e) ? e[t] : null
}
const ie = e => e
  , ce = e => ""
  , le = "text"
  , ue = e => 0 === e.length ? "" : e.join("")
  , fe = q.toDisplayString;
function me(e, t) {
    return e = Math.abs(e),
    2 === t ? e ? e > 1 ? 1 : 0 : 1 : e ? Math.min(e, 2) : 0
}
function pe(e={}) {
    const t = e.locale
      , n = function(e) {
        const t = q.isNumber(e.pluralIndex) ? e.pluralIndex : -1;
        return e.named && (q.isNumber(e.named.count) || q.isNumber(e.named.n)) ? q.isNumber(e.named.count) ? e.named.count : q.isNumber(e.named.n) ? e.named.n : t : t
    }(e)
      , r = q.isObject(e.pluralRules) && q.isString(t) && q.isFunction(e.pluralRules[t]) ? e.pluralRules[t] : me
      , o = q.isObject(e.pluralRules) && q.isString(t) && q.isFunction(e.pluralRules[t]) ? me : void 0
      , s = e.list || []
      , a = e.named || {};
    q.isNumber(e.pluralIndex) && function(e, t) {
        t.count || (t.count = e),
        t.n || (t.n = e)
    }(n, a);
    function i(t) {
        const n = q.isFunction(e.messages) ? e.messages(t) : !!q.isObject(e.messages) && e.messages[t];
        return n || (e.parent ? e.parent.message(t) : ce)
    }
    const c = q.isPlainObject(e.processor) && q.isFunction(e.processor.normalize) ? e.processor.normalize : ue
      , l = q.isPlainObject(e.processor) && q.isFunction(e.processor.interpolate) ? e.processor.interpolate : fe
      , u = {
        list: e => s[e],
        named: e => a[e],
        plural: e => e[r(n, e.length, o)],
        linked: (t, ...n) => {
            const [r,o] = n;
            let s = "text"
              , a = "";
            1 === n.length ? q.isObject(r) ? (a = r.modifier || a,
            s = r.type || s) : q.isString(r) && (a = r || a) : 2 === n.length && (q.isString(r) && (a = r || a),
            q.isString(o) && (s = o || s));
            let c = i(t)(u);
            return "vnode" === s && q.isArray(c) && a && (c = c[0]),
            a ? (l = a,
            e.modifiers ? e.modifiers[l] : ie)(c, s) : c;
            var l
        }
        ,
        message: i,
        type: q.isPlainObject(e.processor) && q.isString(e.processor.type) ? e.processor.type : le,
        interpolate: l,
        normalize: c
    };
    return u
}
let Ee = null;
const _e = de(Z.IntlifyDevToolsHooks.FunctionTranslate);
function de(e) {
    return t => Ee && Ee.emit(e, t)
}
const ge = {
    NOT_FOUND_KEY: 1,
    FALLBACK_TO_TRANSLATE: 2,
    CANNOT_FORMAT_NUMBER: 3,
    FALLBACK_TO_NUMBER_FORMAT: 4,
    CANNOT_FORMAT_DATE: 5,
    FALLBACK_TO_DATE_FORMAT: 6,
    __EXTEND_POINT__: 7
}
  , Ne = {
    [ge.NOT_FOUND_KEY]: "Not found '{key}' key in '{locale}' locale messages.",
    [ge.FALLBACK_TO_TRANSLATE]: "Fall back to translate '{key}' key with '{target}' locale.",
    [ge.CANNOT_FORMAT_NUMBER]: "Cannot format a number value due to not supported Intl.NumberFormat.",
    [ge.FALLBACK_TO_NUMBER_FORMAT]: "Fall back to number format '{key}' key with '{target}' locale.",
    [ge.CANNOT_FORMAT_DATE]: "Cannot format a date value due to not supported Intl.DateTimeFormat.",
    [ge.FALLBACK_TO_DATE_FORMAT]: "Fall back to datetime format '{key}' key with '{target}' locale."
};
function Le(e, t, n) {
    return [...new Set([n, ...q.isArray(t) ? t : q.isObject(t) ? Object.keys(t) : q.isString(t) ? [t] : [n]])]
}
function Te(e, t, n) {
    let r = !0;
    for (let o = 0; o < t.length && q.isBoolean(r); o++) {
        const s = t[o];
        q.isString(s) && (r = be(e, t[o], n))
    }
    return r
}
function be(e, t, n) {
    let r;
    const o = t.split("-");
    do {
        r = Ae(e, o.join("-"), n),
        o.splice(-1, 1)
    } while (o.length && !0 === r);
    return r
}
function Ae(e, t, n) {
    let r = !1;
    if (!e.includes(t) && (r = !0,
    t)) {
        r = "!" !== t[t.length - 1];
        const o = t.replace(/!/g, "");
        e.push(o),
        (q.isArray(n) || q.isPlainObject(n)) && n[o] && (r = n[o])
    }
    return r
}
const Ce = "9.2.2"
  , he = "en-US"
  , ke = e => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`;
let Se, Oe, ye;
let Ie = null;
let Pe = null;
let De = 0;
function xe(e, t, n, r, o) {
    const {missing: s, onWarn: a} = e;
    if (null !== s) {
        const r = s(e, n, t, o);
        return q.isString(r) ? r : t
    }
    return t
}
const Me = e => e;
let Fe = Object.create(null);
let Re = J.CompileErrorCodes.__EXTEND_POINT__;
const ve = () => ++Re
  , Ue = {
    INVALID_ARGUMENT: Re,
    INVALID_DATE_ARGUMENT: ve(),
    INVALID_ISO_DATE_ARGUMENT: ve(),
    __EXTEND_POINT__: ve()
};
function we(e) {
    return J.createCompileError(e, null, void 0)
}
Ue.INVALID_ARGUMENT,
Ue.INVALID_DATE_ARGUMENT,
Ue.INVALID_ISO_DATE_ARGUMENT;
const je = () => ""
  , We = e => q.isFunction(e);
function $e(e, t, n, r, o, s) {
    const {messages: a, onWarn: i, messageResolver: c, localeFallbacker: l} = e
      , u = l(e, r, n);
    let f, m = {}, p = null;
    for (let E = 0; E < u.length && (f = u[E],
    m = a[f] || {},
    null === (p = c(m, t)) && (p = m[t]),
    !q.isString(p) && !q.isFunction(p)); E++) {
        const n = xe(e, t, f, 0, "translate");
        n !== t && (p = n)
    }
    return [p, f, m]
}
function Xe(e, t, n, r, o, s) {
    const {messageCompiler: a, warnHtmlMessage: i} = e;
    if (We(r)) {
        const e = r;
        return e.locale = e.locale || n,
        e.key = e.key || t,
        e
    }
    if (null == a) {
        const e = () => r;
        return e.locale = n,
        e.key = t,
        e
    }
    const c = a(r, function(e, t, n, r, o, s) {
        return {
            warnHtmlMessage: o,
            onError: e => {
                throw s && s(e),
                e
            }
            ,
            onCacheKey: e => q.generateFormatCacheKey(t, n, e)
        }
    }(0, n, o, 0, i, s));
    return c.locale = n,
    c.key = t,
    c.source = r,
    c
}
function Be(...e) {
    const [t,n,r] = e
      , o = {};
    if (!q.isString(t) && !q.isNumber(t) && !We(t))
        throw we(Ue.INVALID_ARGUMENT);
    const s = q.isNumber(t) ? String(t) : (We(t),
    t);
    return q.isNumber(n) ? o.plural = n : q.isString(n) ? o.default = n : q.isPlainObject(n) && !q.isEmptyObject(n) ? o.named = n : q.isArray(n) && (o.list = n),
    q.isNumber(r) ? o.plural = r : q.isString(r) ? o.default = r : q.isPlainObject(r) && q.assign(o, r),
    [s, o]
}
const Ke = ["localeMatcher", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName", "formatMatcher", "hour12", "timeZone", "dateStyle", "timeStyle", "calendar", "dayPeriod", "numberingSystem", "hourCycle", "fractionalSecondDigits"];
function Ve(...e) {
    const [t,n,r,o] = e
      , s = {};
    let a, i = {};
    if (q.isString(t)) {
        const e = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
        if (!e)
            throw we(Ue.INVALID_ISO_DATE_ARGUMENT);
        const n = e[3] ? e[3].trim().startsWith("T") ? `${e[1].trim()}${e[3].trim()}` : `${e[1].trim()}T${e[3].trim()}` : e[1].trim();
        a = new Date(n);
        try {
            a.toISOString()
        } catch (c) {
            throw we(Ue.INVALID_ISO_DATE_ARGUMENT)
        }
    } else if (q.isDate(t)) {
        if (isNaN(t.getTime()))
            throw we(Ue.INVALID_DATE_ARGUMENT);
        a = t
    } else {
        if (!q.isNumber(t))
            throw we(Ue.INVALID_ARGUMENT);
        a = t
    }
    return q.isString(n) ? s.key = n : q.isPlainObject(n) && Object.keys(n).forEach((e => {
        Ke.includes(e) ? i[e] = n[e] : s[e] = n[e]
    }
    )),
    q.isString(r) ? s.locale = r : q.isPlainObject(r) && (i = r),
    q.isPlainObject(o) && (i = o),
    [s.key || "", a, s, i]
}
const Ge = ["localeMatcher", "style", "currency", "currencyDisplay", "currencySign", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits", "compactDisplay", "notation", "signDisplay", "unit", "unitDisplay", "roundingMode", "roundingPriority", "roundingIncrement", "trailingZeroDisplay"];
function Ye(...e) {
    const [t,n,r,o] = e
      , s = {};
    let a = {};
    if (!q.isNumber(t))
        throw we(Ue.INVALID_ARGUMENT);
    const i = t;
    return q.isString(n) ? s.key = n : q.isPlainObject(n) && Object.keys(n).forEach((e => {
        Ge.includes(e) ? a[e] = n[e] : s[e] = n[e]
    }
    )),
    q.isString(r) ? s.locale = r : q.isPlainObject(r) && (a = r),
    q.isPlainObject(o) && (a = o),
    [s.key || "", i, s, a]
}
N.CompileErrorCodes = J.CompileErrorCodes,
N.createCompileError = J.createCompileError,
N.CoreErrorCodes = Ue,
N.CoreWarnCodes = ge,
N.DATETIME_FORMAT_OPTIONS_KEYS = Ke,
N.DEFAULT_LOCALE = he,
N.DEFAULT_MESSAGE_DATA_TYPE = le,
N.MISSING_RESOLVE_VALUE = "",
N.NOT_REOSLVED = -1,
N.NUMBER_FORMAT_OPTIONS_KEYS = Ge,
N.VERSION = Ce,
N.clearCompileCache = function() {
    Fe = Object.create(null)
}
,
N.clearDateTimeFormat = function(e, t, n) {
    const r = e;
    for (const o in n) {
        const e = `${t}__${o}`;
        r.__datetimeFormatters.has(e) && r.__datetimeFormatters.delete(e)
    }
}
,
N.clearNumberFormat = function(e, t, n) {
    const r = e;
    for (const o in n) {
        const e = `${t}__${o}`;
        r.__numberFormatters.has(e) && r.__numberFormatters.delete(e)
    }
}
,
N.compileToFunction = function(e, t={}) {
    {
        const n = (t.onCacheKey || Me)(e)
          , r = Fe[n];
        if (r)
            return r;
        let o = !1;
        const s = t.onError || J.defaultOnError;
        t.onError = e => {
            o = !0,
            s(e)
        }
        ;
        const {code: a} = J.baseCompile(e, t)
          , i = new Function(`return ${a}`)();
        return o ? i : Fe[n] = i
    }
}
,
N.createCoreContext = function(e={}) {
    const t = q.isString(e.version) ? e.version : Ce
      , n = q.isString(e.locale) ? e.locale : he
      , r = q.isArray(e.fallbackLocale) || q.isPlainObject(e.fallbackLocale) || q.isString(e.fallbackLocale) || !1 === e.fallbackLocale ? e.fallbackLocale : n
      , o = q.isPlainObject(e.messages) ? e.messages : {
        [n]: {}
    }
      , s = q.isPlainObject(e.datetimeFormats) ? e.datetimeFormats : {
        [n]: {}
    }
      , a = q.isPlainObject(e.numberFormats) ? e.numberFormats : {
        [n]: {}
    }
      , i = q.assign({}, e.modifiers || {}, {
        upper: (e, t) => "text" === t && q.isString(e) ? e.toUpperCase() : "vnode" === t && q.isObject(e) && "__v_isVNode"in e ? e.children.toUpperCase() : e,
        lower: (e, t) => "text" === t && q.isString(e) ? e.toLowerCase() : "vnode" === t && q.isObject(e) && "__v_isVNode"in e ? e.children.toLowerCase() : e,
        capitalize: (e, t) => "text" === t && q.isString(e) ? ke(e) : "vnode" === t && q.isObject(e) && "__v_isVNode"in e ? ke(e.children) : e
    })
      , c = e.pluralRules || {}
      , l = q.isFunction(e.missing) ? e.missing : null
      , u = !q.isBoolean(e.missingWarn) && !q.isRegExp(e.missingWarn) || e.missingWarn
      , f = !q.isBoolean(e.fallbackWarn) && !q.isRegExp(e.fallbackWarn) || e.fallbackWarn
      , m = !!e.fallbackFormat
      , p = !!e.unresolving
      , E = q.isFunction(e.postTranslation) ? e.postTranslation : null
      , _ = q.isPlainObject(e.processor) ? e.processor : null
      , d = !q.isBoolean(e.warnHtmlMessage) || e.warnHtmlMessage
      , g = !!e.escapeParameter
      , N = q.isFunction(e.messageCompiler) ? e.messageCompiler : Se
      , L = q.isFunction(e.messageResolver) ? e.messageResolver : Oe || ae
      , T = q.isFunction(e.localeFallbacker) ? e.localeFallbacker : ye || Le
      , b = q.isObject(e.fallbackContext) ? e.fallbackContext : void 0
      , A = q.isFunction(e.onWarn) ? e.onWarn : q.warn
      , C = e
      , h = q.isObject(C.__datetimeFormatters) ? C.__datetimeFormatters : new Map
      , k = q.isObject(C.__numberFormatters) ? C.__numberFormatters : new Map
      , S = q.isObject(C.__meta) ? C.__meta : {};
    De++;
    const O = {
        version: t,
        cid: De,
        locale: n,
        fallbackLocale: r,
        messages: o,
        modifiers: i,
        pluralRules: c,
        missing: l,
        missingWarn: u,
        fallbackWarn: f,
        fallbackFormat: m,
        unresolving: p,
        postTranslation: E,
        processor: _,
        warnHtmlMessage: d,
        escapeParameter: g,
        messageCompiler: N,
        messageResolver: L,
        localeFallbacker: T,
        fallbackContext: b,
        onWarn: A,
        __meta: S
    };
    return O.datetimeFormats = s,
    O.numberFormats = a,
    O.__datetimeFormatters = h,
    O.__numberFormatters = k,
    O
}
,
N.createCoreError = we,
N.createMessageContext = pe,
N.datetime = function(e, ...t) {
    const {datetimeFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: a} = e
      , {__datetimeFormatters: i} = e
      , [c,l,u,f] = Ve(...t);
    q.isBoolean(u.missingWarn) ? u.missingWarn : e.missingWarn,
    q.isBoolean(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
    const m = !!u.part
      , p = q.isString(u.locale) ? u.locale : e.locale
      , E = a(e, o, p);
    if (!q.isString(c) || "" === c)
        return new Intl.DateTimeFormat(p,f).format(l);
    let _, d = {}, g = null;
    for (let T = 0; T < E.length && (_ = E[T],
    d = n[_] || {},
    g = d[c],
    !q.isPlainObject(g)); T++)
        xe(e, c, _, 0, "datetime format");
    if (!q.isPlainObject(g) || !q.isString(_))
        return r ? -1 : c;
    let N = `${_}__${c}`;
    q.isEmptyObject(f) || (N = `${N}__${JSON.stringify(f)}`);
    let L = i.get(N);
    return L || (L = new Intl.DateTimeFormat(_,q.assign({}, g, f)),
    i.set(N, L)),
    m ? L.formatToParts(l) : L.format(l)
}
,
N.fallbackWithLocaleChain = function(e, t, n) {
    const r = q.isString(n) ? n : he
      , o = e;
    o.__localeChainCache || (o.__localeChainCache = new Map);
    let s = o.__localeChainCache.get(r);
    if (!s) {
        s = [];
        let e = [n];
        for (; q.isArray(e); )
            e = Te(s, e, t);
        const a = q.isArray(t) || !q.isPlainObject(t) ? t : t.default ? t.default : null;
        e = q.isString(a) ? [a] : a,
        q.isArray(e) && Te(s, e, !1),
        o.__localeChainCache.set(r, s)
    }
    return s
}
,
N.fallbackWithSimple = Le,
N.getAdditionalMeta = () => Ie,
N.getDevToolsHook = function() {
    return Ee
}
,
N.getFallbackContext = () => Pe,
N.getWarnMessage = function(e, ...t) {
    return q.format(Ne[e], ...t)
}
,
N.handleMissing = xe,
N.initI18nDevTools = function(e, t, n) {
    Ee && Ee.emit(Z.IntlifyDevToolsHooks.I18nInit, {
        timestamp: Date.now(),
        i18n: e,
        version: t,
        meta: n
    })
}
,
N.isMessageFunction = We,
N.isTranslateFallbackWarn = function(e, t) {
    return e instanceof RegExp ? e.test(t) : e
}
,
N.isTranslateMissingWarn = function(e, t) {
    return e instanceof RegExp ? e.test(t) : e
}
,
N.number = function(e, ...t) {
    const {numberFormats: n, unresolving: r, fallbackLocale: o, onWarn: s, localeFallbacker: a} = e
      , {__numberFormatters: i} = e
      , [c,l,u,f] = Ye(...t);
    q.isBoolean(u.missingWarn) ? u.missingWarn : e.missingWarn,
    q.isBoolean(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn;
    const m = !!u.part
      , p = q.isString(u.locale) ? u.locale : e.locale
      , E = a(e, o, p);
    if (!q.isString(c) || "" === c)
        return new Intl.NumberFormat(p,f).format(l);
    let _, d = {}, g = null;
    for (let T = 0; T < E.length && (_ = E[T],
    d = n[_] || {},
    g = d[c],
    !q.isPlainObject(g)); T++)
        xe(e, c, _, 0, "number format");
    if (!q.isPlainObject(g) || !q.isString(_))
        return r ? -1 : c;
    let N = `${_}__${c}`;
    q.isEmptyObject(f) || (N = `${N}__${JSON.stringify(f)}`);
    let L = i.get(N);
    return L || (L = new Intl.NumberFormat(_,q.assign({}, g, f)),
    i.set(N, L)),
    m ? L.formatToParts(l) : L.format(l)
}
,
N.parse = oe,
N.parseDateTimeArgs = Ve,
N.parseNumberArgs = Ye,
N.parseTranslateArgs = Be,
N.registerLocaleFallbacker = function(e) {
    ye = e
}
,
N.registerMessageCompiler = function(e) {
    Se = e
}
,
N.registerMessageResolver = function(e) {
    Oe = e
}
,
N.resolveValue = function(e, t) {
    if (!q.isObject(e))
        return null;
    let n = se.get(t);
    if (n || (n = oe(t),
    n && se.set(t, n)),
    !n)
        return null;
    const r = n.length;
    let o = e
      , s = 0;
    for (; s < r; ) {
        const e = o[n[s]];
        if (void 0 === e)
            return null;
        o = e,
        s++
    }
    return o
}
,
N.resolveWithKeyValue = ae,
N.setAdditionalMeta = e => {
    Ie = e
}
,
N.setDevToolsHook = function(e) {
    Ee = e
}
,
N.setFallbackContext = e => {
    Pe = e
}
,
N.translate = function(e, ...t) {
    const {fallbackFormat: n, postTranslation: r, unresolving: o, messageCompiler: s, fallbackLocale: a, messages: i} = e
      , [c,l] = Be(...t)
      , u = q.isBoolean(l.missingWarn) ? l.missingWarn : e.missingWarn
      , f = q.isBoolean(l.fallbackWarn) ? l.fallbackWarn : e.fallbackWarn
      , m = q.isBoolean(l.escapeParameter) ? l.escapeParameter : e.escapeParameter
      , p = !!l.resolvedMessage
      , E = q.isString(l.default) || q.isBoolean(l.default) ? q.isBoolean(l.default) ? s ? c : () => c : l.default : n ? s ? c : () => c : ""
      , _ = n || "" !== E
      , d = q.isString(l.locale) ? l.locale : e.locale;
    m && function(e) {
        q.isArray(e.list) ? e.list = e.list.map((e => q.isString(e) ? q.escapeHtml(e) : e)) : q.isObject(e.named) && Object.keys(e.named).forEach((t => {
            q.isString(e.named[t]) && (e.named[t] = q.escapeHtml(e.named[t]))
        }
        ))
    }(l);
    let[g,N,L] = p ? [c, d, i[d] || {}] : $e(e, c, d, a, f, u)
      , T = g
      , b = c;
    if (p || q.isString(T) || We(T) || _ && (T = E,
    b = T),
    !(p || (q.isString(T) || We(T)) && q.isString(N)))
        return o ? -1 : c;
    let A = !1;
    const C = We(T) ? T : Xe(e, c, N, T, b, ( () => {
        A = !0
    }
    ));
    if (A)
        return T;
    const h = function(e, t, n, r) {
        const {modifiers: o, pluralRules: s, messageResolver: a, fallbackLocale: i, fallbackWarn: c, missingWarn: l, fallbackContext: u} = e
          , f = r => {
            let o = a(n, r);
            if (null == o && u) {
                const [,,e] = $e(u, r, t, i, c, l);
                o = a(e, r)
            }
            if (q.isString(o)) {
                let n = !1;
                const s = Xe(e, r, t, o, r, ( () => {
                    n = !0
                }
                ));
                return n ? je : s
            }
            return We(o) ? o : je
        }
          , m = {
            locale: t,
            modifiers: o,
            pluralRules: s,
            messages: f
        };
        e.processor && (m.processor = e.processor);
        r.list && (m.list = r.list);
        r.named && (m.named = r.named);
        q.isNumber(r.plural) && (m.pluralIndex = r.plural);
        return m
    }(e, N, L, l)
      , k = function(e, t, n) {
        const r = t(n);
        return r
    }(0, C, pe(h));
    return r ? r(k, c) : k
}
,
N.translateDevTools = _e,
N.updateFallbackLocale = function(e, t, n) {
    e.__localeChainCache = new Map,
    e.localeFallbacker(e, n, t)
}
,
g.exports = N;
export {g as c, n as s};
