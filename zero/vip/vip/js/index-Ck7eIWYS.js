import {a as R, S as I, _ as E} from "../../assets/js/main-CP82bJIf.js?v=offline2";
var w = function(A, _, gen) {
  if (typeof gen === "undefined" && typeof _ === "function") { gen = _; _ = null; }
  return new Promise(function(resolve, reject) {
    var g = typeof gen === "function" ? gen.call(A || this) : null;
    if (!g) { resolve(); return; }
    function step(val) {
      try {
        var result = g.next(val);
        if (result.done) resolve(result.value);
        else Promise.resolve(result.value).then(step, function(err) { g.throw(err); });
      } catch(e) { reject(e); }
    }
    step();
  });
};
(function() {
    try {
        var A = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {}
          , i = new A.Error().stack;
        i && (A._sentryDebugIds = A._sentryDebugIds || {},
        A._sentryDebugIds[i] = "dc874957-131a-4be3-8c7d-c295bea5d1f8",
        A._sentryDebugIdIdentifier = "sentry-dbid-dc874957-131a-4be3-8c7d-c295bea5d1f8")
    } catch (r) {}
}
)();
const D = Vue.reactive({
    1: {
        money: "7500000",
        bg: new URL("" + new URL("../png/svip11.png",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP1 PNG reference
        accessoryList: [],
        privilegeList: []
    },
    2: {
        money: "15000000",
        bg: new URL("" + new URL("../png/svip22.png",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP2 PNG reference
        accessoryList: [],
        privilegeList: []
    },
    3: {
        money: "50000000",
        bg: new URL("" + new URL("../png/svip33.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP3 PNG reference
        accessoryList: [],
        privilegeList: []
    },
    4: {
        money: "150000000",
        bg: new URL("" + new URL("../png/svip44.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: new URL("" + new URL("../png/isvip4.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        accessoryList: [],
        privilegeList: []
    },
    5: {
        money: "350000000",
        bg: new URL("" + new URL("../png/svip55.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP5 PNG reference
        accessoryList: [],
        privilegeList: []
    },
    6: {
        money: "750000000",
        bg: new URL("" + new URL("../png/svip66.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP6 PNG reference
        accessoryList: [],
        privilegeList: []
    },
    7: {
        money: "1500000000",
        bg: new URL("" + new URL("../png/svip77.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP7 PNG reference
        accessoryList: [],
        privilegeList: []
    },
    8: {
        money: "3000000000",
        bg: new URL("" + new URL("../png/svip88.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", 
        accessoryList: [],
        privilegeList: []
    }
})
   , v = {
    1: "/png/svga/m/svip_svga_medal_1.svga",
    2: "/png/svga/m/svip_svga_medal_2.svga",
    3: "/png/svga/m/svip_svga_medal_3.svga",
    4: "/png/svga/m/svip_svga_medal_4.svga",
    5: "/png/svga/m/svip_svga_medal_5.svga",
    6: "/png/svga/m/svip_svga_medal_6.svga",
    7: "/png/svga/m/svip_svga_medal_7.svga",
    8: "/png/svga/m/svip_svga_medal_8.svga",
    
}
   , h = {
    1: "/png/svga/h/svip1.svga",
    2: "/png/svga/h/svip2.svga",
    3: "/png/svga/h/svip3.svga",
    4: "/png/svga/h/svip4.svga",
    5: "/png/svga/h/svip5.svga",
    6: "/png/svga/h/svip6.svga",
    7: "/png/svga/h/svip7.svga",
    8: "/png/svga/h/svip8.svga",
    
}
   , E_ = {
    1: "/png/svga/e/svip1.svga",
    2: "/png/svga/e/svip2.svga",
    3: "/png/svga/e/svip3.svga",
    4: "/png/svga/e/svip4.svga",
    5: "/png/svga/e/svip5.svga",
    6: "/png/svga/e/svip6.svga",
    7: "/png/svga/e/svip7.svga",
    8: "/png/svga/e/svip8.svga",
};
(function() {
  var load = function() {
    if (!window.__VIP_BRIDGE) { setTimeout(load, 50); return; }
    window.__VIP_BRIDGE.getVIPConfig().then(function(c) {
      if (!c || !c.length) return;
      for (var i = 0; i < c.length; i++) {
        var t = c[i], k = t.tier;
        if (t.tier == null) continue;
        if (!D[k]) { D[k] = Vue.reactive({ accessoryList: [], privilegeList: [] }); }
        if (t.price != null) D[k].money = String(t.price);
        if (t.bg_url) D[k].bg = t.bg_url;
        if (t.logo_url) D[k].logo = t.logo_url;
        if (t.image_url && !D[k].logo) D[k].logo = t.image_url;
        if (t.medal_url) v[k] = t.medal_url;
        if (t.headwear_url) h[k] = t.headwear_url;
        if (t.entrance_url) E_[k] = t.entrance_url;
        if (t.accessories) {
          try {
            var list = typeof t.accessories === "string" ? JSON.parse(t.accessories) : t.accessories;
            if (Array.isArray(list)) D[k].accessoryList = list;
          } catch(e) {}
        }
        if (t.items) {
          try {
            var list = typeof t.items === "string" ? JSON.parse(t.items) : t.items;
            if (Array.isArray(list)) D[k].privilegeList = list;
          } catch(e) {}
        }
        if ((!t.items || !D[k].privilegeList.length) && t.benefits) {
          try {
            var list = typeof t.benefits === "string" ? JSON.parse(t.benefits) : t.benefits;
            if (Array.isArray(list)) {
              D[k].privilegeList = list.map(function(b) { return { name: b, img: "", peculiarityId: 0, title: "" }; });
            }
          } catch(e) {}
        }
      }
    }).catch(function() {});
  };
  load();
})();
function M() {
    return R({
        url: "user/v4/get",
        method: "GET"
    })
}
function x(A) {
    return R({
        url: "/vip/purse",
        method: "POST",
        data: A
    })
}
const G = {
    name: "showPeculiarity",
    props: {
        show: {
            type: Boolean,
            default: !1
        },
        curVipTip: {
            type: Number,
            default: 1
        },
        info: {
            type: Object,
            default: () => ({
                name: "",
                peculiarityId: 0,
                img: "",
                img1: "",
                title: "",
                text: "",
                avatar: ""
            })
        }
    },
    setup(A) {
        const i = Vue.ref(!1)
          , r = Vue.toRefs(A);
        console.log(r, "showPropsshowPropsshowProps");
        let e;
        e = new I,
        Vue.watch(r.show, n => {
            n && r.info.value.peculiarityId == 1 && (i.value = !0,
            setTimeout( () => {
                i.value = !1,
                p(h[r.curVipTip.value], ".showPeculiarity_level_chatting_headwear_svga")
            }
            , 100)),
            n && r.info.value.peculiarityId == 2 && setTimeout( () => {
                p(E_[r.curVipTip.value], ".showPeculiarity_level_chatting_Entrance_svga")
            }
            , 100)
        }
        ),
        Vue.onMounted( () => {
            r.info.value.peculiarityId == 1 && setTimeout( () => {
                p(h[r.curVipTip.value], ".showPeculiarity_level_chatting_headwear_svga")
            }
            , 100),
            r.info.value.peculiarityId == 2 && setTimeout( () => {
                p(E_[r.curVipTip.value], ".showPeculiarity_level_chatting_Entrance_svga")
            }
            , 100)
        }
        );
        const p = (n, dom) => {
            setTimeout( () => w(this, null, function*() {
                const o = document.querySelector(dom);
                n && o && (yield e.showSvga({
                    svgaPath: n || "",
                    domName: dom
                }),
                window.requestAnimationFrame( () => {
                    console.log(e.player),
                    e.player && (e.player.loops = 0,
                    e.player.stopAnimation(),
                    e.player.startAnimation())
                }
                ))
            }), 200)
        }
        ;
        return {
            isLoad: i
        }
    }
}
  , P = {
    class: "showPeculiarity"
}
  , z = {
    key: 0,
    class: "showPeculiarity_level"
}
  , K = {
    class: "showPeculiarity_level_Explanation"
}
  , q = {
    class: "showPeculiarity_level_chatting"
}
  , Y = {
    class: "showPeculiarity_level_chatting_box"
}
  , N = ["src"]
  , O = ["src"]
  , W = {
    class: "showPeculiarity_level_chatting_box"
}
  , H = ["src"]
  , j = ["src"]
  , Q = {
    key: 1,
    class: "showPeculiarity_level"
}
  , Z = {
    class: "showPeculiarity_level_Explanation"
}
  , b = {
    class: "showPeculiarity_level_chatting"
}
  , T = {
    class: "showPeculiarity_level_chatting_box"
}
  , X = ["src"]
  , J = {
    class: "showPeculiarity_level_chatting_box"
}
  , _ = ["src"]
  , $ = {
    key: 2,
    class: "showPeculiarity_level"
}
  , ee = {
    class: "showPeculiarity_level_Explanation"
}
  , ie = {
    class: "showPeculiarity_level_chatting"
}
  , te = {
    class: "showPeculiarity_level_chatting_Entrance"
}
  , Ae = {
    key: 3,
    class: "showPeculiarity_level"
}
  , re = {
    class: "showPeculiarity_level_Explanation"
}
  , le = {
    class: "showPeculiarity_level_chatting"
}
  , ne = {
    class: "showPeculiarity_level_chatting_card"
}
  , oe = {
    class: "showPeculiarity_level"
}
  , ae = {
    class: "showPeculiarity_level_Explanation"
}
  , me = {
    class: "showPeculiarity_level_chatting"
}
  , pe = {
    key: 0,
    class: "showPeculiarity_level_chatting_headwear"
}
  , ue = ["src"]
  , se = {
    key: 4,
    class: "showPeculiarity_level"
}
  , ce = {
    class: "showPeculiarity_level_Explanation"
}
  , ge = {
    class: "showPeculiarity_level_chatting"
}
  , Ve = {
    class: "showPeculiarity_level_chatting_rhythm"
}
  , we = ["src"]
  , ye = {
    key: 5,
    class: "showPeculiarity_level"
}
  , de = {
    class: "showPeculiarity_level_Explanation"
}
  , ve = {
    class: "showPeculiarity_level_chatting"
}
  , he = {
    class: "showPeculiarity_level_chatting_name"
}
  , Re = ["src"];
function Ie(A, i, r, e, p, n) {
    return Vue.openBlock(),
    Vue.createElementBlock("div", P, [i[5] || (i[5] = Vue.createElementVNode("div", {
        class: "showPeculiarity_title"
    }, [Vue.createElementVNode("span", null, [Vue.createElementVNode("i", null, "Exclusive privilege")])], -1)), r.info.peculiarityId == 5 ? (Vue.openBlock(),
    Vue.createElementBlock("div", z, [Vue.createElementVNode("div", K, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.vip_23")), 1)]), Vue.createElementVNode("div", q, [Vue.createElementVNode("div", Y, [Vue.createElementVNode("span", null, [Vue.createElementVNode("img", {
        src: r.info.img,
        alt: ""
    }, null, 8, O), i[0] || (i[0] = Vue.createTextVNode("xxxx Welcome to hila. "))])]), Vue.createElementVNode("div", W, [Vue.createElementVNode("span", null, [Vue.createElementVNode("img", {
        src: r.info.img,
        alt: ""
    }, null, 8, j), i[1] || (i[1] = Vue.createTextVNode("hila official enter the room "))])])])])) : Vue.createCommentVNode("", !0), r.info.peculiarityId == 6 ? (Vue.openBlock(),
    Vue.createElementBlock("div", Q, [Vue.createElementVNode("div", Z, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.vip_27")), 1)]), Vue.createElementVNode("div", b, [Vue.createElementVNode("div", T, [Vue.createElementVNode("span", null, [Vue.createElementVNode("img", {
        src: r.info.avatar,
        alt: ""
    }, null, 8, X)]), Vue.createElementVNode("span", {
        style: Vue.normalizeStyle({
            background: `url(${r.info.img})`,
            paddingTop: "8px"
        })
    }, "Welcome ", 4)]), Vue.createElementVNode("div", J, [Vue.createElementVNode("span", null, [Vue.createElementVNode("img", {
        src: r.info.avatar,
        alt: ""
    }, null, 8, _)]), i[2] || (i[2] = Vue.createElementVNode("span", null, "hila official enter the room ", -1))])])])) : Vue.createCommentVNode("", !0), r.info.peculiarityId == 2 ? (Vue.openBlock(),
    Vue.createElementBlock("div", $, [Vue.createElementVNode("div", ee, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.vip_25")), 1)]), Vue.createElementVNode("div", ie, [Vue.createElementVNode("div", te, [Vue.createElementVNode("span", {
        style: Vue.normalizeStyle({
            background: `url(${r.info.img1})`,
            paddingTop: "8px"
        })
    }, i[3] || (i[3] = [Vue.createElementVNode("i", null, "user name is coming", -1)]), 4)])])])) : Vue.createCommentVNode("", !0), r.info.peculiarityId == 3 ? (Vue.openBlock(),
    Vue.createElementBlock("div", Ae, [Vue.createElementVNode("div", re, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.vip_26")), 1)]), Vue.createElementVNode("div", le, [Vue.createElementVNode("div", ne, [Vue.createElementVNode("span", {
        style: Vue.normalizeStyle({
            background: `url(${r.info.img})`
        })
    }, null, 4)])])])) : Vue.createCommentVNode("", !0), Vue.withDirectives(Vue.createElementVNode("div", oe, [Vue.createElementVNode("div", ae, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.vip_24")), 1)]), Vue.createElementVNode("div", me, [Vue.createVNode(Vue.Transition, null, {
        default: Vue.withCtx( () => [e.isLoad ? Vue.createCommentVNode("", !0) : (Vue.openBlock(),
        Vue.createElementBlock("div", pe, [i[4] || (i[4] = Vue.createElementVNode("div", {
            class: "showPeculiarity_level_chatting_headwear_svga"
        }, null, -1))]))]),
        _: 1
    })])], 512), [[Vue.vShow, r.info.peculiarityId == 1]]), r.info.peculiarityId == 4 ? (Vue.openBlock(),
    Vue.createElementBlock("div", se, [Vue.createElementVNode("div", ce, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.vip_28")), 1)]), Vue.createElementVNode("div", ge, [Vue.createElementVNode("div", Ve, [Vue.createElementVNode("span", {
        style: Vue.normalizeStyle({
            background: `url(${r.info.img})`
        })
    }, null, 4)])])])) : Vue.createCommentVNode("", !0), r.info.peculiarityId == 7 ? (Vue.openBlock(),
    Vue.createElementBlock("div", ye, [Vue.createElementVNode("div", de, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t(`vip.${r.info.title}`)), 1)]), Vue.createElementVNode("div", ve, [Vue.createElementVNode("div", he, null)])])) : Vue.createCommentVNode("", !0)])
}
const Ee = E(G, [["render", Ie], ["__scopeId", "data-v-69b069e3"]])
  , fe = {
    name: "svip",
    components: {
        ShowPeculiarity: Ee
    },
    setup() {
        sessionStorage.getItem("language");
        let A;
        Vue.onMounted( () => {
            setTimeout( () => {
                A = new I,
                i(v[1] || "https://jsonplaceholder.typicode.com")
            }
            , 1e3)
        }
        );
        const i = l => w(this, null, function*() {
            const m = document.querySelector(".VIPRule_header_logo_svga");
            l && m && (yield A.showSvga({
                svgaPath: l || "",
                domName: ".VIPRule_header_logo_svga"
            }),
            window.requestAnimationFrame( () => {
                console.log(A.player),
                A.player && (A.player.loops = 0,
                A.player.stopAnimation(),
                A.player.startAnimation())
            }
            ))
        })
          , r = () => {
            window.appFun("closeWin")
        }
          , e = Vue.reactive({
            avatar: "",
            vipList: []
        })
          , p = Vue.computed( () => {
            let l = 0
              , m = 0
              , V = ""
              , d = "";
            return e.vipList && e.vipList.forEach(c => {
                c.vipGrade === n.value && (l = c.vipDay || 0,
                m = c.vipHour || 0,
                d = c.vipExpireTime,
                V = c.vipOpeningTime)
            }
            ),
            {
                day: l,
                hours: m,
                vipExpireTime: d,
                vipOpeningTime: V
            }
        }
        )
          , n = Vue.ref(1)
          , o = Vue.ref(!1)
          , s = l => {
            n.value === l || o.value || (o.value = !0,
            n.value = l,
            setTimeout( () => {
                o.value = !1,
                window.requestAnimationFrame( () => {
                    i(v[n.value])
                }
                )
            }
            , 700))
        }
          , t = Vue.ref(!0)
          , a = Vue.ref(0)
          , f = l => {
            a.value === l || !t.value || (t.value = !1,
            a.value = l,
            setTimeout( () => {
                t.value = !0
            }
            , 700))
        }
          , U = Vue.computed( () => D[n.value])
          , u = Vue.reactive({
            showPeculiarity: !1,
            showPrivilegeInfo: !1,
            showBuy: !1,
            showSuccess: !1,
            showNotEnough: !1
        })
          , L = Vue.ref(1)
          , g = Vue.ref()
          , C = l => {
            g.value = l,
            g.value.avatar = e.avatar,
            l.peculiarityId && (u.showPeculiarity = !0),
            console.log(u.showPeculiarity)
        }
          , B = Vue.ref()
          , k = l => {
            l.peculiarityId && (u.showPeculiarity = !0),
            g.value = l
        }
          , S = () => {
            console.log("确认购买"),
            x({
                vipDay: 30,
                vipGrade: n.value
            }).then(l => {
                console.log(l);
                const m = l.data && l.data.code;
                const V = l.data && l.data.message;
                m === 200 ? (u.showBuy = !1,
                u.showSuccess = !0,
                window.appFun("refreshCurrentUserInfo"),
                y()) : m === 10049 ? (u.showBuy = !1,
                u.showNotEnough = !0) : vant.showToast(V)
            }
            )
        }
          , F = () => {
            console.log("跳转充值"),
            u.showNotEnough = !1,
            window.appFun("openChargePage")
        }
          , y = () => {
            M().then(l => {
                try {
                    const m = l.data && l.data.data;
                    if (m) {
                        e.vipList = m.vipList || [];
                        e.avatar = m.avatar || "";
                    }
                } catch (m) {
                    console.log("/user/v4/get error:", m)
                }
            }
            )
        }
        ;
        return Vue.onMounted( () => {
            y()
        }
        ),
        {
            switchVipTip: s,
            curVipTip: n,
            isLoad: o,
            curShowPrivilege: a,
            switchShowPrivilege: f,
            curShowVipInfo: U,
            userInfo: e,
            confirmRechage: F,
            confirmBuy: S,
            isLoadPrivilege: t,
            curVipTime: p,
            popupStatus: u,
            curShowPeculiarityInfo: g,
            showPeculiarityFn: C,
            showPrivilegeFn: k,
            curShowPrivilegeInfo: B,
            breackFn: r,
            curShowPeculiarityIndex: L
        }
    }
}
  , Ue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUBAMAAADuRQ3yAAAAFVBMVEUAAAD///////////////////////9Iz20EAAAABnRSTlMA8RY80IO2eH1OAAAAX0lEQVRIx2MYBaNgFIwCioFqELEqmcUSFYhUapiWFkCsoWlpBkQbmkK8oU7EG6owaugAGcpEvKGsUEMpV4rpAGp7i4F51NhBYywDdQsiRPFGeaGJWRSPglEwCkYBJQAAxIspLyEzN94AAAAASUVORK5CYII="
  , Le = "data:image/png;base64,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"
  , Ce = {
    class: "vip"
}
  , Be = {
    key: 0
}
  , ke = {
    class: "VIPRule_header_info"
}
  , Se = {
    class: "VIPRule_header_logo"
}
  , Fe = ["src"]
  , De = {
    class: "VIPRule_tipList"
}
  , Me = ["onClick"]
  , xe = {
    key: 0,
    class: "VIPRule_content"
}
  , Ge = {
    class: "VIPRule_content_title"
}
  , Pe = {
    key: 0,
    class: "VIPRule_content_decorationList"
}
  , ze = ["onClick"]
  , Ke = ["src"]
  , qe = {
    class: "VIPRule_content_title"
}
  , Ye = {
    key: 0,
    class: "VIPRule_content_privilegeList"
}
  , Ne = ["onClick"]
  , Oe = ["src"]
  , je = {
    class: "buyContent"
}
  , Qe = {
    class: "btns"
}
  , Ze = {
    class: "successContent"
}
  , be = {
    class: "btns"
}
  , Te = {
    class: "notEnough"
}
  , Xe = {
    class: "btns"
}
  , Je = {
    class: "showPeculiarity showPrivilege"
}
  , _e = {
    class: "showPeculiarity_img"
}
  , $e = ["src"];
function ei(A, i, r, e, p, n) {
    const o = Vue.resolveComponent("van-popup")
      , s = Vue.resolveComponent("ShowPeculiarity");
    return Vue.openBlock(),
    Vue.createElementBlock("div", Ce, [Vue.createElementVNode("div", {
        class: "VIPRule_header",
        style: Vue.normalizeStyle({
            background: `url(${e.curShowVipInfo.bg})`
        })
    }, [Vue.createVNode(Vue.Transition, null, {
        default: Vue.withCtx( () => [e.isLoad ? Vue.createCommentVNode("", !0) : (Vue.openBlock(),
        Vue.createElementBlock("section", Be, [Vue.createElementVNode("div", ke, [Vue.createElementVNode("span", {
            onClick: i[0] || (i[0] = () => e.breackFn())
        }, i[14] || (i[14] = [Vue.createElementVNode("img", {
            src: Ue,
            alt: ""
        }, null, -1)]))]), Vue.createElementVNode("div", Se, [i[15] || (i[15] = Vue.createElementVNode("div", {
            class: "VIPRule_header_logo_svga"
        }, null, -1))])]))]),
        _: 1
    })], 4), Vue.createElementVNode("div", De, [(Vue.openBlock(),
    Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(8, t => Vue.createElementVNode("div", {
        class: Vue.normalizeClass(["VIPRule_tipList_item", e.curVipTip === t ? `VIPRule_tipList_item_active_${t}` : ""]),
        onClick: () => e.switchVipTip(t),
        key: `VIPRule_tipList_item_${t}`
    }, [Vue.createElementVNode("span", null, " SVIP" + Vue.toDisplayString(t), 1)], 10, Me)), 64))]), Vue.createVNode(Vue.Transition, {
        name: "box"
    }, {
        default: Vue.withCtx( () => [e.isLoad ? Vue.createCommentVNode("", !0) : (Vue.openBlock(),
        Vue.createElementBlock("div", xe, [Vue.createElementVNode("div", Ge, [Vue.createElementVNode("span", null, [Vue.createElementVNode("i", null, Vue.toDisplayString(A.$t("vip.Identification")), 1)])]), Vue.createVNode(Vue.Transition, {
            name: "box"
        }, {
            default: Vue.withCtx( () => [e.isLoadPrivilege ? (Vue.openBlock(),
            Vue.createElementBlock("div", Pe, [(Vue.openBlock(!0),
            Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(e.curShowVipInfo.accessoryList, (t, a) => (Vue.openBlock(),
            Vue.createElementBlock("div", {
                key: `VIPRule_content_decorationList_item_${a}`,
                class: "VIPRule_content_decorationList_item"
            }, [Vue.createElementVNode("span", {
                onClick: () => e.showPeculiarityFn(t)
            }, [Vue.createElementVNode("img", {
                src: t.img,
                alt: ""
            }, null, 8, Ke)], 8, ze), Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t(`vip.${t.name}`)), 1)]))), 128))])) : Vue.createCommentVNode("", !0)]),
            _: 1
        }), Vue.createElementVNode("div", qe, [Vue.createElementVNode("span", null, [Vue.createElementVNode("i", null, Vue.toDisplayString(A.$t("vip.privilege")), 1)])]), Vue.createVNode(Vue.Transition, {
            name: "box"
        }, {
            default: Vue.withCtx( () => [e.isLoadPrivilege ? (Vue.openBlock(),
            Vue.createElementBlock("div", Ye, [(Vue.openBlock(!0),
            Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(e.curShowVipInfo.privilegeList, (t, a) => (Vue.openBlock(),
            Vue.createElementBlock("div", {
                key: `VIPRule_content_privilegeList_item_${a}`,
                class: "VIPRule_content_privilegeList_item",
                onClick: () => e.showPrivilegeFn(t)
            }, [Vue.createElementVNode("span", null, [Vue.createElementVNode("img", {
                src: t.img,
                alt: ""
            }, null, 8, Oe)]), Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t(`vip.${t.name}`)), 1)], 8, Ne))), 128))])) : Vue.createCommentVNode("", !0)]),
            _: 1
        })]))]),
        _: 1
    }), Vue.createVNode(o, {
        show: e.popupStatus.showBuy,
        "onUpdate:show": i[4] || (i[4] = t => e.popupStatus.showBuy = t),
        round: ""
    }, {
        default: Vue.withCtx( () => [Vue.createElementVNode("div", je, [Vue.createElementVNode("span", null, [Vue.createElementVNode("h2", null, Vue.toDisplayString(A.$t("vip.sure", {
            co: e.curShowVipInfo.money,
            be: `VIP${e.curVipTip}`
        })), 1)]), Vue.createElementVNode("div", Qe, [Vue.createElementVNode("div", {
            class: "cancel",
            onClick: i[2] || (i[2] = t => e.popupStatus.showBuy = !1)
        }, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.cancel")), 1)]), Vue.createElementVNode("div", {
            class: "confirm",
            onClick: i[3] || (i[3] = (...t) => e.confirmBuy && e.confirmBuy(...t))
        }, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.confirm")), 1)])])])]),
        _: 1
    }, 8, ["show"]), Vue.createVNode(o, {
        show: e.popupStatus.showSuccess,
        "onUpdate:show": i[6] || (i[6] = t => e.popupStatus.showSuccess = t),
        round: ""
    }, {
        default: Vue.withCtx( () => [Vue.createElementVNode("div", Ze, [Vue.createElementVNode("span", null, [Vue.createElementVNode("h2", null, Vue.toDisplayString(A.$t("vip.success")), 1)]), Vue.createElementVNode("div", be, [Vue.createElementVNode("div", {
            class: "confirm",
            onClick: i[5] || (i[5] = t => e.popupStatus.showSuccess = !1)
        }, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.confirm")), 1)])])])]),
        _: 1
    }, 8, ["show"]), Vue.createVNode(o, {
        show: e.popupStatus.showNotEnough,
        "onUpdate:show": i[9] || (i[9] = t => e.popupStatus.showNotEnough = t),
        round: ""
    }, {
        default: Vue.withCtx( () => [Vue.createElementVNode("div", Te, [Vue.createElementVNode("span", null, [Vue.createElementVNode("h2", null, Vue.toDisplayString(A.$t("vip.enough")), 1)]), Vue.createElementVNode("div", Xe, [Vue.createElementVNode("div", {
            class: "cancel",
            onClick: i[7] || (i[7] = t => e.popupStatus.showNotEnough = !1)
        }, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.cancel")), 1)]), Vue.createElementVNode("div", {
            class: "confirm",
            onClick: i[8] || (i[8] = (...t) => e.confirmRechage && e.confirmRechage(...t))
        }, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.confirm")), 1)])])])]),
        _: 1
    }, 8, ["show"]), Vue.createVNode(o, {
        show: e.popupStatus.showPeculiarity,
        "onUpdate:show": i[11] || (i[11] = t => e.popupStatus.showPeculiarity = t),
        position: "bottom"
    }, {
        default: Vue.withCtx( () => [Vue.createVNode(s, {
            show: e.popupStatus.showPeculiarity,
            "onUpdate:show": i[10] || (i[10] = t => e.popupStatus.showPeculiarity = t),
            curVipTip: e.curVipTip,
            info: e.curShowPeculiarityInfo
        }, null, 8, ["show", "curVipTip", "info"])]),
        _: 1
    }, 8, ["show"]), Vue.createVNode(o, {
        show: e.popupStatus.showPrivilegeInfo,
        "onUpdate:show": i[13] || (i[13] = t => e.popupStatus.showPrivilegeInfo = t)
    }, {
        default: Vue.withCtx( () => [Vue.createElementVNode("div", Je, [Vue.createElementVNode("div", _e, [Vue.createElementVNode("span", null, [Vue.createElementVNode("img", {
            src: e.curShowPrivilegeInfo.img,
            alt: ""
        }, null, 8, $e)])]), Vue.createElementVNode("div", {
            class: "showPeculiarity_btn",
            onClick: i[12] || (i[12] = () => e.popupStatus.showPrivilegeInfo = !1)
        }, [Vue.createElementVNode("span", null, Vue.toDisplayString(A.$t("vip.confirm")), 1)])])]),
        _: 1
    }, 8, ["show"])])
}
const Ai = E(fe, [["render", ei], ["__scopeId", "data-v-4977d9e3"]]);
export {Ai as default};
//# sourceMappingURL=index-Ck7eIWYS.js.map
