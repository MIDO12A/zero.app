import {h as a, __tla as w} from "./request.112a23fa.1779158834.js";
let s, t, r, n, o, u, l, T, c, i, E, m, g, G, p, k, R, b, h, d, v, P, S, y, O, C, q, N, _, x = Promise.all([( () => {
    try {
        return w
    } catch (e) {}
}
)()]).then(async () => {
    i = e => a("GET", "/user/getUserLevel", e),
    E = e => a("GET", "/user/checkUser", e),
    c = e => a("GET", "/user/blockUser", e),
    T = e => a("GET", "/user/getSuperAdminRole", e),
    N = e => a("GET", "/couple/getCpData", e),
    v = e => a("GET", "/userRanking/getRanking", e),
    S = e => a("GET", "/userRanking/getCpWeekRanking", e),
    O = e => a("GET", "/userRanking/getCpRankingReward", e),
    C = e => a("GET", "/userRanking/getCpGiftWeekRanking", e),
    q = e => a("GET", "/couple/getCpReward", e),
    y = e => a("POST", "/acc/h5/third/login", e),
    g = e => a("GET", "/accounts/delete/index", e),
    m = e => a("POST", "/accounts/delete/apply", e),
    n = e => a("GET", "/room/getRoomLevelExperience", e),
    u = e => a("GET", "/roomEvent/checkRoomEvent", e),
    o = e => a("GET", "/roomEvent/getRoomEventList", e),
    P = e => a("POST", "/roomEvent/submitRoomEvent", e, {
        "Content-Type": "multipart/form-data"
    }),
    l = e => a("GET", "/roomEvent/checkRoomId", e),
    p = e => a("GET", "/uniqueNumber/getUserTools", e),
    G = e => a("POST", "/uniqueNumber/checkNumber", e),
    R = e => a("POST", "/uniqueNumber/purchaseData", e),
    h = e => a("GET", "/uniqueNumber/check", e),
    k = e => a("POST", "/uniqueNumber/buy", e),
    d = e => a("POST", "/noble/all", e),
    b = e => a("POST", "/noble/buy", e),
    _ = e => a("GET", "brother/getBrotherReward", e),
    t = e => a("GET", "/clan/level/list", e),
    r = e => a("GET", "/clan/season/awardDetail", e),
    s = e => a("GET", "/clan/member/experience/daily/process", e)
}
);
export {s as A, t as B, r as C, x as __tla, n as a, o as b, u as c, l as d, T as e, c as f, i as g, E as h, m as i, g as j, G as k, p as l, k as m, R as n, b as o, h as p, d as q, v as r, P as s, S as t, y as u, O as v, C as w, q as x, N as y, _ as z};
