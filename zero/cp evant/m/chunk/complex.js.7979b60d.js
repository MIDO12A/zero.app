var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function i(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t
}
function e(t) {
    var i = t.default;
    if ("function" == typeof i) {
        var e = function() {
            return i.apply(this, arguments)
        };
        e.prototype = i.prototype
    } else
        e = {};
    return Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    Object.keys(t).forEach((function(i) {
        var n = Object.getOwnPropertyDescriptor(t, i);
        Object.defineProperty(e, i, n.get ? n : {
            enumerable: !0,
            get: function() {
                return t[i]
            }
        })
    }
    )),
    e
}
var n, r = {
    exports: {}
};
/**
 * @license Complex.js v2.1.1 12/05/2020
 *
 * Copyright (c) 2020, Robert Eisele (robert@xarg.org)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 **/
n = r,
function(t) {
    var i = Math.cosh || function(t) {
        return Math.abs(t) < 1e-9 ? 1 - t : .5 * (Math.exp(t) + Math.exp(-t))
    }
      , e = Math.sinh || function(t) {
        return Math.abs(t) < 1e-9 ? t : .5 * (Math.exp(t) - Math.exp(-t))
    }
      , r = function() {
        throw SyntaxError("Invalid Param")
    };
    function s(t, i) {
        var e = Math.abs(t)
          , n = Math.abs(i);
        return 0 === t ? Math.log(n) : 0 === i ? Math.log(e) : e < 3e3 && n < 3e3 ? .5 * Math.log(t * t + i * i) : (t /= 2,
        i /= 2,
        .5 * Math.log(t * t + i * i) + Math.LN2)
    }
    function a(t, i) {
        if (!(this instanceof a))
            return new a(t,i);
        var e = function(t, i) {
            var e = {
                re: 0,
                im: 0
            };
            if (null == t)
                e.re = e.im = 0;
            else if (void 0 !== i)
                e.re = t,
                e.im = i;
            else
                switch (typeof t) {
                case "object":
                    if ("im"in t && "re"in t)
                        e.re = t.re,
                        e.im = t.im;
                    else if ("abs"in t && "arg"in t) {
                        if (!Number.isFinite(t.abs) && Number.isFinite(t.arg))
                            return a.INFINITY;
                        e.re = t.abs * Math.cos(t.arg),
                        e.im = t.abs * Math.sin(t.arg)
                    } else if ("r"in t && "phi"in t) {
                        if (!Number.isFinite(t.r) && Number.isFinite(t.phi))
                            return a.INFINITY;
                        e.re = t.r * Math.cos(t.phi),
                        e.im = t.r * Math.sin(t.phi)
                    } else
                        2 === t.length ? (e.re = t[0],
                        e.im = t[1]) : r();
                    break;
                case "string":
                    e.im = e.re = 0;
                    var n = t.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g)
                      , s = 1
                      , h = 0;
                    null === n && r();
                    for (var o = 0; o < n.length; o++) {
                        var u = n[o];
                        " " === u || "\t" === u || "\n" === u || ("+" === u ? s++ : "-" === u ? h++ : "i" === u || "I" === u ? (s + h === 0 && r(),
                        " " === n[o + 1] || isNaN(n[o + 1]) ? e.im += parseFloat((h % 2 ? "-" : "") + "1") : (e.im += parseFloat((h % 2 ? "-" : "") + n[o + 1]),
                        o++),
                        s = h = 0) : ((s + h === 0 || isNaN(u)) && r(),
                        "i" === n[o + 1] || "I" === n[o + 1] ? (e.im += parseFloat((h % 2 ? "-" : "") + u),
                        o++) : e.re += parseFloat((h % 2 ? "-" : "") + u),
                        s = h = 0))
                    }
                    s + h > 0 && r();
                    break;
                case "number":
                    e.im = 0,
                    e.re = t;
                    break;
                default:
                    r()
                }
            return isNaN(e.re) || isNaN(e.im),
            e
        }(t, i);
        this.re = e.re,
        this.im = e.im
    }
    a.prototype = {
        re: 0,
        im: 0,
        sign: function() {
            var t = this.abs();
            return new a(this.re / t,this.im / t)
        },
        add: function(t, i) {
            var e = new a(t,i);
            return this.isInfinite() && e.isInfinite() ? a.NAN : this.isInfinite() || e.isInfinite() ? a.INFINITY : new a(this.re + e.re,this.im + e.im)
        },
        sub: function(t, i) {
            var e = new a(t,i);
            return this.isInfinite() && e.isInfinite() ? a.NAN : this.isInfinite() || e.isInfinite() ? a.INFINITY : new a(this.re - e.re,this.im - e.im)
        },
        mul: function(t, i) {
            var e = new a(t,i);
            return this.isInfinite() && e.isZero() || this.isZero() && e.isInfinite() ? a.NAN : this.isInfinite() || e.isInfinite() ? a.INFINITY : 0 === e.im && 0 === this.im ? new a(this.re * e.re,0) : new a(this.re * e.re - this.im * e.im,this.re * e.im + this.im * e.re)
        },
        div: function(t, i) {
            var e = new a(t,i);
            if (this.isZero() && e.isZero() || this.isInfinite() && e.isInfinite())
                return a.NAN;
            if (this.isInfinite() || e.isZero())
                return a.INFINITY;
            if (this.isZero() || e.isInfinite())
                return a.ZERO;
            t = this.re,
            i = this.im;
            var n, r, s = e.re, h = e.im;
            return 0 === h ? new a(t / s,i / s) : Math.abs(s) < Math.abs(h) ? new a((t * (r = s / h) + i) / (n = s * r + h),(i * r - t) / n) : new a((t + i * (r = h / s)) / (n = h * r + s),(i - t * r) / n)
        },
        pow: function(t, i) {
            var e = new a(t,i);
            if (t = this.re,
            i = this.im,
            e.isZero())
                return a.ONE;
            if (0 === e.im) {
                if (0 === i && t > 0)
                    return new a(Math.pow(t, e.re),0);
                if (0 === t)
                    switch ((e.re % 4 + 4) % 4) {
                    case 0:
                        return new a(Math.pow(i, e.re),0);
                    case 1:
                        return new a(0,Math.pow(i, e.re));
                    case 2:
                        return new a(-Math.pow(i, e.re),0);
                    case 3:
                        return new a(0,-Math.pow(i, e.re))
                    }
            }
            if (0 === t && 0 === i && e.re > 0 && e.im >= 0)
                return a.ZERO;
            var n = Math.atan2(i, t)
              , r = s(t, i);
            return t = Math.exp(e.re * r - e.im * n),
            i = e.im * r + e.re * n,
            new a(t * Math.cos(i),t * Math.sin(i))
        },
        sqrt: function() {
            var t, i, e = this.re, n = this.im, r = this.abs();
            if (e >= 0) {
                if (0 === n)
                    return new a(Math.sqrt(e),0);
                t = .5 * Math.sqrt(2 * (r + e))
            } else
                t = Math.abs(n) / Math.sqrt(2 * (r - e));
            return i = e <= 0 ? .5 * Math.sqrt(2 * (r - e)) : Math.abs(n) / Math.sqrt(2 * (r + e)),
            new a(t,n < 0 ? -i : i)
        },
        exp: function() {
            var t = Math.exp(this.re);
            return this.im,
            new a(t * Math.cos(this.im),t * Math.sin(this.im))
        },
        expm1: function() {
            var t = this.re
              , i = this.im;
            return new a(Math.expm1(t) * Math.cos(i) + function(t) {
                var i = Math.PI / 4;
                if (-i > t || t > i)
                    return Math.cos(t) - 1;
                var e = t * t;
                return e * (e * (e * (e * (e * (e * (e * (e / 20922789888e3 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - .5)
            }(i),Math.exp(t) * Math.sin(i))
        },
        log: function() {
            var t = this.re
              , i = this.im;
            return new a(s(t, i),Math.atan2(i, t))
        },
        abs: function() {
            return t = this.re,
            i = this.im,
            e = Math.abs(t),
            n = Math.abs(i),
            e < 3e3 && n < 3e3 ? Math.sqrt(e * e + n * n) : (e < n ? (e = n,
            n = t / i) : n = i / t,
            e * Math.sqrt(1 + n * n));
            var t, i, e, n
        },
        arg: function() {
            return Math.atan2(this.im, this.re)
        },
        sin: function() {
            var t = this.re
              , n = this.im;
            return new a(Math.sin(t) * i(n),Math.cos(t) * e(n))
        },
        cos: function() {
            var t = this.re
              , n = this.im;
            return new a(Math.cos(t) * i(n),-Math.sin(t) * e(n))
        },
        tan: function() {
            var t = 2 * this.re
              , n = 2 * this.im
              , r = Math.cos(t) + i(n);
            return new a(Math.sin(t) / r,e(n) / r)
        },
        cot: function() {
            var t = 2 * this.re
              , n = 2 * this.im
              , r = Math.cos(t) - i(n);
            return new a(-Math.sin(t) / r,e(n) / r)
        },
        sec: function() {
            var t = this.re
              , n = this.im
              , r = .5 * i(2 * n) + .5 * Math.cos(2 * t);
            return new a(Math.cos(t) * i(n) / r,Math.sin(t) * e(n) / r)
        },
        csc: function() {
            var t = this.re
              , n = this.im
              , r = .5 * i(2 * n) - .5 * Math.cos(2 * t);
            return new a(Math.sin(t) * i(n) / r,-Math.cos(t) * e(n) / r)
        },
        asin: function() {
            var t = this.re
              , i = this.im
              , e = new a(i * i - t * t + 1,-2 * t * i).sqrt()
              , n = new a(e.re - i,e.im + t).log();
            return new a(n.im,-n.re)
        },
        acos: function() {
            var t = this.re
              , i = this.im
              , e = new a(i * i - t * t + 1,-2 * t * i).sqrt()
              , n = new a(e.re - i,e.im + t).log();
            return new a(Math.PI / 2 - n.im,n.re)
        },
        atan: function() {
            var t = this.re
              , i = this.im;
            if (0 === t) {
                if (1 === i)
                    return new a(0,1 / 0);
                if (-1 === i)
                    return new a(0,-1 / 0)
            }
            var e = t * t + (1 - i) * (1 - i)
              , n = new a((1 - i * i - t * t) / e,-2 * t / e).log();
            return new a(-.5 * n.im,.5 * n.re)
        },
        acot: function() {
            var t = this.re
              , i = this.im;
            if (0 === i)
                return new a(Math.atan2(1, t),0);
            var e = t * t + i * i;
            return 0 !== e ? new a(t / e,-i / e).atan() : new a(0 !== t ? t / 0 : 0,0 !== i ? -i / 0 : 0).atan()
        },
        asec: function() {
            var t = this.re
              , i = this.im;
            if (0 === t && 0 === i)
                return new a(0,1 / 0);
            var e = t * t + i * i;
            return 0 !== e ? new a(t / e,-i / e).acos() : new a(0 !== t ? t / 0 : 0,0 !== i ? -i / 0 : 0).acos()
        },
        acsc: function() {
            var t = this.re
              , i = this.im;
            if (0 === t && 0 === i)
                return new a(Math.PI / 2,1 / 0);
            var e = t * t + i * i;
            return 0 !== e ? new a(t / e,-i / e).asin() : new a(0 !== t ? t / 0 : 0,0 !== i ? -i / 0 : 0).asin()
        },
        sinh: function() {
            var t = this.re
              , n = this.im;
            return new a(e(t) * Math.cos(n),i(t) * Math.sin(n))
        },
        cosh: function() {
            var t = this.re
              , n = this.im;
            return new a(i(t) * Math.cos(n),e(t) * Math.sin(n))
        },
        tanh: function() {
            var t = 2 * this.re
              , n = 2 * this.im
              , r = i(t) + Math.cos(n);
            return new a(e(t) / r,Math.sin(n) / r)
        },
        coth: function() {
            var t = 2 * this.re
              , n = 2 * this.im
              , r = i(t) - Math.cos(n);
            return new a(e(t) / r,-Math.sin(n) / r)
        },
        csch: function() {
            var t = this.re
              , n = this.im
              , r = Math.cos(2 * n) - i(2 * t);
            return new a(-2 * e(t) * Math.cos(n) / r,2 * i(t) * Math.sin(n) / r)
        },
        sech: function() {
            var t = this.re
              , n = this.im
              , r = Math.cos(2 * n) + i(2 * t);
            return new a(2 * i(t) * Math.cos(n) / r,-2 * e(t) * Math.sin(n) / r)
        },
        asinh: function() {
            var t = this.im;
            this.im = -this.re,
            this.re = t;
            var i = this.asin();
            return this.re = -this.im,
            this.im = t,
            t = i.re,
            i.re = -i.im,
            i.im = t,
            i
        },
        acosh: function() {
            var t = this.acos();
            if (t.im <= 0) {
                var i = t.re;
                t.re = -t.im,
                t.im = i
            } else
                i = t.im,
                t.im = -t.re,
                t.re = i;
            return t
        },
        atanh: function() {
            var t = this.re
              , i = this.im
              , e = t > 1 && 0 === i
              , n = 1 - t
              , r = 1 + t
              , h = n * n + i * i
              , o = 0 !== h ? new a((r * n - i * i) / h,(i * n + r * i) / h) : new a(-1 !== t ? t / 0 : 0,0 !== i ? i / 0 : 0)
              , u = o.re;
            return o.re = s(o.re, o.im) / 2,
            o.im = Math.atan2(o.im, u) / 2,
            e && (o.im = -o.im),
            o
        },
        acoth: function() {
            var t = this.re
              , i = this.im;
            if (0 === t && 0 === i)
                return new a(0,Math.PI / 2);
            var e = t * t + i * i;
            return 0 !== e ? new a(t / e,-i / e).atanh() : new a(0 !== t ? t / 0 : 0,0 !== i ? -i / 0 : 0).atanh()
        },
        acsch: function() {
            var t = this.re
              , i = this.im;
            if (0 === i)
                return new a(0 !== t ? Math.log(t + Math.sqrt(t * t + 1)) : 1 / 0,0);
            var e = t * t + i * i;
            return 0 !== e ? new a(t / e,-i / e).asinh() : new a(0 !== t ? t / 0 : 0,0 !== i ? -i / 0 : 0).asinh()
        },
        asech: function() {
            var t = this.re
              , i = this.im;
            if (this.isZero())
                return a.INFINITY;
            var e = t * t + i * i;
            return 0 !== e ? new a(t / e,-i / e).acosh() : new a(0 !== t ? t / 0 : 0,0 !== i ? -i / 0 : 0).acosh()
        },
        inverse: function() {
            if (this.isZero())
                return a.INFINITY;
            if (this.isInfinite())
                return a.ZERO;
            var t = this.re
              , i = this.im
              , e = t * t + i * i;
            return new a(t / e,-i / e)
        },
        conjugate: function() {
            return new a(this.re,-this.im)
        },
        neg: function() {
            return new a(-this.re,-this.im)
        },
        ceil: function(t) {
            return t = Math.pow(10, t || 0),
            new a(Math.ceil(this.re * t) / t,Math.ceil(this.im * t) / t)
        },
        floor: function(t) {
            return t = Math.pow(10, t || 0),
            new a(Math.floor(this.re * t) / t,Math.floor(this.im * t) / t)
        },
        round: function(t) {
            return t = Math.pow(10, t || 0),
            new a(Math.round(this.re * t) / t,Math.round(this.im * t) / t)
        },
        equals: function(t, i) {
            var e = new a(t,i);
            return Math.abs(e.re - this.re) <= a.EPSILON && Math.abs(e.im - this.im) <= a.EPSILON
        },
        clone: function() {
            return new a(this.re,this.im)
        },
        toString: function() {
            var t = this.re
              , i = this.im
              , e = "";
            return this.isNaN() ? "NaN" : this.isInfinite() ? "Infinity" : (Math.abs(t) < a.EPSILON && (t = 0),
            Math.abs(i) < a.EPSILON && (i = 0),
            0 === i ? e + t : (0 !== t ? (e += t,
            e += " ",
            i < 0 ? (i = -i,
            e += "-") : e += "+",
            e += " ") : i < 0 && (i = -i,
            e += "-"),
            1 !== i && (e += i),
            e + "i"))
        },
        toVector: function() {
            return [this.re, this.im]
        },
        valueOf: function() {
            return 0 === this.im ? this.re : null
        },
        isNaN: function() {
            return isNaN(this.re) || isNaN(this.im)
        },
        isZero: function() {
            return 0 === this.im && 0 === this.re
        },
        isFinite: function() {
            return isFinite(this.re) && isFinite(this.im)
        },
        isInfinite: function() {
            return !(this.isNaN() || this.isFinite())
        }
    },
    a.ZERO = new a(0,0),
    a.ONE = new a(1,0),
    a.I = new a(0,1),
    a.PI = new a(Math.PI,0),
    a.E = new a(Math.E,0),
    a.INFINITY = new a(1 / 0,1 / 0),
    a.NAN = new a(NaN,NaN),
    a.EPSILON = 1e-15,
    Object.defineProperty(a, "__esModule", {
        value: !0
    }),
    a.default = a,
    a.Complex = a,
    n.exports = a
}();
const s = i(r.exports);
export {s as C, e as a, t as c, i as g};
