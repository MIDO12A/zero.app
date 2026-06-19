import {D as y, P as b, a as v} from "./svga.4d571be2.js";
import {w as S, d as J, r as L, s as _, f as B, bt as N, aX as R, aQ as d, ao as g, z as j, I as U, am as H, an as k} from "./vu.a13407ad.js";
import {a as C, i as h, _ as I, __tla as O} from "../assets/index.99b34229.1779158834.js";
let f, W = Promise.all([( () => {
    try {
        return O
    } catch (l) {}
}
)()]).then(async () => {
    const l = {
        props: {
            uid: Number,
            avatar: String,
            headwearUrl: String,
            headwearVggUrl: String,
            dynamicHeader: {
                type: Boolean,
                default: () => !1
            },
            original: {
                type: Boolean,
                default: () => !1
            },
            isJump: {
                type: Boolean,
                default: () => !0
            },
            isRoomJump: {
                type: Boolean,
                default: () => !1
            },
            length: {
                type: Number,
                default: () => 1
            },
            isRound: {
                type: Boolean,
                default: () => !1
            },
            isBorder: {
                type: Boolean,
                default: () => !1
            },
            borderWidth: {
                type: Number,
                default: () => .04
            },
            borderColor: {
                type: String,
                default: () => "#fff"
            },
            ratio: {
                type: Number,
                default: () => .7
            },
            poRatio: {
                type: Number,
                default: () => .15
            }
        },
        name: "headwear",
        setup(a) {
            S(a, t => {
                a = t,
                r.avatarLength = a.length * (a.original ? 1 : a.ratio) + "rem",
                r.shiftingLength = a.length * (a.original ? 0 : a.poRatio) + "rem",
                r.headwearLength = 1 * a.length + "rem"
            }
            );
            const r = J({
                avatarLength: a.length * (a.original ? 1 : a.ratio) + "rem",
                headwearLength: 1 * a.length + "rem",
                shiftingLength: a.length * (a.original ? 0 : a.poRatio) + "rem",
                bdLength: a.borderWidth + "rem",
                bdColor: a.borderColor,
                male: C("/components/biggerHead.png")
            })
              , p = L(null);
            a.dynamicHeader != null && a.dynamicHeader == 1 && _( () => {
                const {startSvga: t} = {
                    startSvga: async function(o, n) {
                        try {
                            const i = new y;
                            let s = await i.find(o);
                            s || (s = await new b({
                                isDisableImageBitmapShim: !0
                            }).load(o),
                            await i.insert(o, s));
                            const c = new v(n);
                            await c.mount(s),
                            c.onStart,
                            c.start()
                        } catch (i) {
                            console.error(i)
                        }
                    }
                };
                t(a.headwearVggUrl, p.value)
            }
            );
            const e = t => {
                if (!a.isJump)
                    return !1;
                const o = {
                    skiptype: 1,
                    name: "userInfo",
                    data: {
                        uid: t
                    }
                };
                h() ? window.location.href = " jsaction://?onJumpWhere=" + JSON.stringify(o) : window.android.jump(JSON.stringify(o))
            }
            ;
            return {
                canvas: p,
                ...B(r),
                props: a,
                jumpUserInfo: e,
                jumpType: t => {
                    a.isRoomJump ? (o => {
                        if (!a.isRoomJump)
                            return !1;
                        const n = {
                            skiptype: 2,
                            name: "room",
                            data: {
                                uid: o.toString()
                            }
                        };
                        h() ? window.location.href = " jsaction://?onJumpWhere=" + JSON.stringify(n) : window.android.jump(JSON.stringify(n))
                    }
                    )(t) : e(t)
                }
            }
        }
    }
      , m = () => {
        N(a => ({
            "07aeca91": a.headwearLength,
            "10ee160b": a.avatarLength,
            "63d63c92": a.shiftingLength,
            "687ae434": a.bdLength,
            "7b1e16aa": a.borderColor
        }))
    }
      , u = l.setup;
    l.setup = u ? (a, r) => (m(),
    u(a, r)) : m;
    const w = {
        key: 0,
        ref: "canvas",
        class: "headwear"
    };
    f = I(l, [["render", function(a, r, p, e, t, o) {
        var i;
        const n = R("van-image");
        return d(),
        g("a", {
            class: "headwear-component",
            onClick: r[0] || (r[0] = s => e.jumpType(e.props.uid))
        }, [j(n, {
            class: U(["avatar", e.props.isBorder ? "headwear-border" : ""]),
            round: !e.props.isRound,
            "lazy-load": "",
            fit: "cover",
            position: "center",
            src: e.props.avatar || a.male,
            "loading-icon": a.male,
            "error-icon": a.male,
            "show-error": !1,
            "show-loading": !1
        }, null, 8, ["class", "round", "src", "loading-icon", "error-icon"]), e.props.headwearVggUrl != null && e.props.dynamicHeader != null && e.props.dynamicHeader ? (d(),
        g("canvas", w, null, 512)) : e.props.headwearUrl != null ? (d(),
        H(n, {
            key: 1,
            class: "headwear",
            fit: "cover",
            position: "center",
            "lazy-load": "",
            src: (i = e.props.headwearUrl) != null ? i : a.male,
            "loading-icon": a.male,
            "error-icon": a.male,
            "show-error": !1,
            "show-loading": !1
        }, null, 8, ["src", "loading-icon", "error-icon"])) : k("", !0)])
    }
    ], ["__scopeId", "data-v-f1d1bd51"]])
}
);
export {W as __tla, f as h};
