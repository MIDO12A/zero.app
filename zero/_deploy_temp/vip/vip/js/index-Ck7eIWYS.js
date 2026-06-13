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
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-29-Bon-1_K1.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "vip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-30-DmyLOviK.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-31-cYeNNrKu.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-102-BQFbnqUS.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip1.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip1.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-34-4mZBBpND.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "vip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "vip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }]
    },
    2: {
        money: "15000000",
        bg: new URL("" + new URL("../png/svip22.png",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP2 PNG reference
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-35-BInlw8AR.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-36-tMVkl0-F.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-37-D0fqiJ60.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-103-BSB0lUAT.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip2.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip2.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-40-BKlyHiua.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "vip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "svip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }]
    },
    3: {
        money: "50000000",
        bg: new URL("" + new URL("../png/svip33.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP3 PNG reference
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-41-Cro1qVPj.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-42-B1-sFKZf.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-43-CPdzaJcg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-104-B-QPyC4z.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip3.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip3.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-46-CYbVphbo.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "svip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }]
    },
    4: {
        money: "150000000",
        bg: new URL("" + new URL("../png/svip44.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: new URL("" + new URL("../png/isvip4.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-47-B_a8Om46.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-48-CuSL1ATp.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-49-CHVsc3OB.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-105-WE33IqYV.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip4.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip4.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-52-Y5mVhxSd.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "svip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }]
    },
    5: {
        money: "350000000",
        bg: new URL("" + new URL("../png/svip55.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP5 PNG reference
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-53-BOXsDluI.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-54-CLRljx0w.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-55-Da8sAuRn.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-106-DR9O6fFw.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip5.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip5.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-58-DWuJCq4H.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "vip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }]
    },
    6: {
        money: "750000000",
        bg: new URL("" + new URL("../png/svip66.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP6 PNG reference
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-59-CM89O9W0.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-60-B1XdFraZ.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-61-B8oYHV-V.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-107-CCV-omu7.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip6.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip6.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-64-DL4Eck9I.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "vip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "svip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }, {
            name: "svip_20",
            img: new URL("data:image/png;base64,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",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_36"
        }]
    },
    7: {
        money: "1500000000",
        bg: new URL("" + new URL("../png/svip77.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", // Removed SVIP7 PNG reference
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/icon-78-CspnwbkF.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-79-CkQ5pQx_.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-80-DU_tPdsV.png",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-108-DO4bdKkA.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip7.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip7.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/icon-83-CK9jTYwK.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "svip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }, {
            name: "svip_20",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAwFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALCQcfGhNPQy8KCw5oWkB5aEwXGB2VfFaehl9YTkOrkWgVGB26n3LDpnrNrnoaGyPUs37auoUhIyvjwIfixp8lKDLryJEZGyLwyInxy4wiJCyjkXlaU0toX1QwMTjCrI7OtZPXvpl7b2HjyKH0zIxMR0WsmHz2zpA+PD3y06PpzKONfmofISgYGiD405clKDEsLzn4z4783rL83K340pT51Zv62KS4oX8XxZw6AAAAOXRSTlMABg8bJzU9QERKVFldZWh0eYuMjZCapq2xuMDJ0NPa2+fq7O3t7/Dw8vLz9PT09/f5+vr8/f39/v5k0/wrAAAFFUlEQVR42r2ae1fqMAzA72CwMrmAMHm4CwrIRN5IRzc65vf/VjcpoKAeGl7LHyB42O8kaR5N++cPUYxU2jQzmaySTMY00ynjzzXFSJsZ6xfJmOkrgVLpXwGfoHTqch2OEnacS/QxzKxFkqxp3BpxPuYkxJkYii9++uZENayz5BRlUlnrTMmS17NpXSAmzVQZ6yLJGLdnUCjnu4PumGswdJTrMI5TjCsxgGLczucE71+RAZQbxCAxKlPWlSV1S6cfcb5pXV1+GCxt3UDSZ61eu+y2w7DtOvY565hkLLsegkQoy4Z9ssFIXi+Ndow1yLSE37Ga5zULNN9TFHE+1UDGOl47wGgGKBWKKhRFSorRcvK5XP6htY5BSuwxmE2GvcBjBFUIithgqyh0tk9jDlLmj4H3JlcrLyjoVaEoUkdG8etzMY5lNwhegXEU8qkKIUZs9IZz4CL5EQQTZHSPmOsrVggx4gCjdfAo1t0yXo85/jMbUzKjC2vqQBGr4IkFMvpeUCPkSUpGacO6ze9/cdcRA2QMPfHICLmFklGWEBm5vc+5phgrxkw0GaF6GZT8gOG375CmmA2BIceik9P91qDmXwzxvY+PwkPGaiA6d6RcTMqNGHtfn2pC9JGxEKJAy5KkJB/vQypCTJAxITHQKSSXHEAKQiyQ8QEs0o8NYv8ADPnFGKxUEIpFTOwodH5n5TKs0VhK+RkgPWS8eWKA2m3+r/G8zu+NMGxYltxBgDHeBmFPmdBdr12t53WQaRhOFWS1C5A5MOZj0ZwryHy9XmohusWFtQohK4SwbYDIFwiQOMYA/Ramvy8vGgS9sAmQN2T0MAjj9Ray1EKyJ0Aqgr8iYyB4YacDvES6VpIIQV/nKpx3kdHlHCpIbqMDMK4FGa6kvOcqQOQrF1il8sBoA2R5BQg2WznLlXIoOAaI7He4qlIOqOCCPlE0vRgCbWmYh4r+PuMvYDQ59LiqUqylqn4eXtsXQ1yAlCx7PuYvMTDePf7EdlU/tK0SvLpaiG4JVwFSt5jHZ8iIx/xJVakiuAK+t+pRGFYvjpMiNFwjVuMBBKGUL1xVKeZAixSObIuNAFLUQnRphY3geS+c9wEhF1zcQ5vqgD+UFa0HeG+zi3OXVY2iCecTZMD7By7ZSDGgRbKnBGsBRFvi7ekHBiEw4H2yYQBiBHowF/4aaatjmlC0yoIvkNHnfLFDhHXYBLEG/vlAKFra8nvX8QdYTt46fs12Ntu5Mu6zci7yXKaFGNpGIvfkj5Exn/mHrWLpGRnP+m1dRtsSsSffewdGPPZn/74KLSu3MFDCdp7WEh31PHv0O0NUpOcH76tV3GpUHx6qjdYck28Utijb07SuTa34fn/DEKoigkoomOUx4hmBodrUo0558rvIGPj+/T/FkHEUqo0ppOC/J4yLjtnL9+fw4K7vQwX5Wx+iImu1/X2u0hC7rUNKp8lEMVRglhzEOCXbIktKu50Dn/R6vr+3l5KQis8Zrh2xF6v5ILU9B8fbDuzUIc7RLfZdpXL3bRMhzxp6UbYoxWcoLECIlmu1hqOwXTpphEOZFijGOoYlHG0hYfsURUiq7CDgeEmHmKeNosBcaC1sWDbBQjHX4RjyBhPIn1NII3MLxvcxdxKDzmRGtskMnxMZoydzIJDM0UYyhzSJHDclc3CWzBFgMoeZyRzLJnPAnMxReUKH/slcX0jmIkZCV0qSuRyT0DWfhC4sJXT1KqlLZFe4DvcfwkGNUYrQyzAAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_36"
        }, {
            name: "svip_21",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAWEg09NCdTRTNjVUB4ZkyJdlaZhGGljmqxmG+9pHzGqXrPs4bVuInbvY3hwpLmxpTpyZXw0qTuy5D01aX10ZX405f83K730I751p372aUHuiviAAAAHHRSTlMACRsnOUBETlVbZG11foiSnaixucLN1uDj6/T+gLR4TgAABF9JREFUeNq9mteWgyAQQNcY0dh7Q+X//3IZiMYkSjHKPK3rCdepwMDfn6JY1s2274vY9s2y/s4UOv7d2ZA7JZ1F2AQsoN85EsIZHMtWQHC7WVcjjmO0EAcxN00E942mGs4h0VHGujsH5a5MsZ0fxL5YDXVlfmWoUH5nyClnMGSUcxhiylkMEeU8hoByIoNSLshBxay0nJPFutYhu26xndPly2A35wK5XW2sDYPZziViX6/IhyoXKfKmylWKvKlymSIrVVQUQT76TRWFHPHasfVWz26ax0grVxQUScdxTNZMjHEbalTjncr4iFefXo8YR6/HEjMpH8p1cttafj/2yxguxtPkLu9ChpimCWdI0V73XQMV80NEB2xfQUCNNbX9BNJJXXMXWCscqYVmVQpChmx5lcDogZtjhqkDBXvtxBaq6RizKt0wDIub3X4c2Ru/ogxCSOlJ7bWXiREMwFXxKGNYzJJTQ44pe4waAoJTJMnHvQBGLR2Zq4K6+S/4fgyQkVsJpZhachi6WOiU/ak9gu/nIeUXrzCqJgbBuGBW8gqADEPtC5yyD0EN/e1XJkSETBgYNIC5lYKaUYbC24UIakrQDfkXuaM+qL0CIosMHUtQFHeMQnZccxNWYPT9oxQcTS0TtBNzBrcSyrgyjbvt+S+Iu1FvXc/l//TAz8X684ecDfwo+cM25DO4QlpO6ix62RdFJZhoavMQOQUdCD8/131+fp9w14ALm+3w+oSUzKmvoAx4KhAwTpfDoOmrhlbMFYTXY3io1SA01fDEotLjJWQmzNKsrRk2lEFjgNZjFvGRGgRl7RMC0ZtwQlNV3Qx5HwclUCgxHrNuT5ENCHg3ymruwxBUIAVLFi8Bow/lV1DkUPdpek4D8dUhS/RCORlItAqBKtlIBb/ilYbkjh6E1/RdM3+WgRYgvXsEUg6rwiiUACpN4hyBgBN8FQaqaYw16BCkW8qwRGKIwXC/1tsSTVQWJFA1p0owa9kSnyQKkAxS5SGA3CTR1cgXPQ+o+5lokreEZqCUSkopKaN3nUMz45wonSRTAlgYJeI1kSi8EJ8lKl8YvrDyQ+LVnXBz8qSQfN8a8YQnHEiWRJKNQ9yxQtwnO9/q9rDyli3uZO0ON+NTSrOdbBmU4Id0WS/dnjwqMs9MG+FLJZVvUBQ2WmHL1tY4+3IN7FRaJN86qLSH+ARI0+FjpxDCTBKrNIuUNth8p4Dx204BwTxSI5XmmmLzhk6ATFbL0QTmqkBpY6rcK4haRunn5SjsVMZCsVug3CxAac9WDW207FR6T7HvodH28NgWaByh0vhsN6TcwdHpewQVxxQxeF0cvm+9KK0ODmKjPyXS6KrptXCoa56MSqcLqduM8goO8bX6qdqNzqCW5rpz+7lli4LI0+1xG2k+G2mjmzkQMHO0YeaQxshxk5mDMzNHgGYOM80cy5o5YDZzVG7o0N/M9QUzFzEMXSkxcznG0DUfQxeWDF29MnWJ7ITrcP8I7NwOmhdxcQAAAABJRU5ErkJggg==",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_37"
        }]
    },
    8: {
        money: "3000000000",
        bg: new URL("" + new URL("../png/svip88.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
        logo: "", 
        accessoryList: [{
            name: "svip_9",
            peculiarityId: 5,
            img: new URL("" + new URL("../png/svip81.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_10",
            peculiarityId: 1,
            img: new URL("" + new URL("../png/icon-35-DmyLOviK.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_11",
            peculiarityId: 2,
            img: new URL("" + new URL("../png/icon-35-cYeNNrKu.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            img1: new URL("" + new URL("../png/icon-108-DO4bdKkA.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_12",
            peculiarityId: 3,
            img: new URL("" + new URL("../png/2/svip8.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_13",
            peculiarityId: 6,
            img: new URL("" + new URL("../png/1/svip8.png",import.meta.url).href,import.meta.url).href
        }, {
            name: "svip_14",
            peculiarityId: 4,
            img: new URL("" + new URL("../png/svip82.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href
        }],
        privilegeList: [{
            name: "svip_15",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAMFBMVEUAAAAAAAAAAAAAAABTRzWRfFy+onfgv4zbu4/tyZMYDjT50pT72aZAMkerkHhsWFxVyO2VAAAACnRSTlMACiZJYH2fyfD6MztEKwAAA6NJREFUeNqlmEtTE0EQgAP8gWD+ALB/gGQTKMtjDv6AVHGBG+Up3uIBK9w8WPLyiJigV9yqyMFSoBrxYAFJ2eIVkNIr8iivPlCc7dkkuz2zj4xdVGWXzJd+TE9Pz6RSGhkcsWwhuZHBVDK5QeOl5IYTAH0+gKB0rApbkeGeiRhGS0QyIUQE02+HylBIrOwI0cctE4VkezQrxLQ+O0bSvZmlNS1WiaomE49ke1bC1WSSINmelQTVDCRDRn2IlQzJ9WyX37JMUqQbgOD/x+5DR5ang9/pEzJf7RKAzaI2OYN2jfsJxAday4LxKgcI3NPFjMWrCve6L7dxXxcztrZq4DM/jx90K42FGMD/hqgLs9ULktNNfTRCzvAyUYtGhjRZPA8l256YWVl5eMe2C9jUZDNPsCpUCl7KLJfGeZDJf574k7DRSZmNWdzVLACerf6EEQlQ4d9r1kq+JkYu/XGcr6fiYbuorhmlro6JgZcOyRfxOK1WWgUpdwhi3qjIgKrkudORn6qaUSXGZdg67iKNmqImyxHh/Kq0SVp3BFtFjlg8xFJJo+Z9AlT4xFh8It/Rr78EOKOH3/A6Bql6Iz8DvPXYTY4E3wsA0vlzgB3Hs6zEpp+7Igeuu8nyy4MrkchNaU7jHHbEHyk8gVeRyCTMCRWPhIpV4Q08EYpe8GRO8Yk8Iz+EVWTbpvCflTKOVIUDDXfsouMcijzGY2edr7IUX8XHLrL13fXibx0F0uBrOcVrBcXIm/k6HogPbEUiAHLm51xkDdGdV14wdYhQQ1lzRUpUxFINE0GisRekhBvGc2ye8qWBLXdsHeVLMxKpyizZRmkR5Q4Lco4tsfL2mYdcXzuI0sq9yFU5hU/JFjxHPEAyjCdMlpWLW/iRbPHEtfIE37NyESxK4xSrAHLBCiavYwUyxkWWTiUijCwxhBXYBZyjYY8d5wfhazzF0ryMT+EntyLJtLykFNhVGgyLOYO+ykcKK8pmEYxyvo6rfuQIsahsSawo38WWv8DW+ZocVbfXMSRvPLlCnFa3V74nzSIutolDVPbKtKZVEGqwvSWhoiSn7fnKYuAzd+P7pjRK7YaE72P5WezIflF7wFA22MJCm2iWQhpSpeUteHr2S2Ftr6aBnZipt9yGJKyF7bcTy5C+6Y2S/2mtDRp4g2OCyWHE4MhjcLAyOb4ZHBJNjqIGB16TY7XB4d3kisDkIsLgusPkUsXk6sbkgsjkGsrkssvkSi3+4u4f5qLWJMum2W8AAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_30"
        }, {
            name: "svip_16",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAhFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANCwguJx1URjNuXkWHdFaeiGSxl2y5nXXCpXbJsIvMq3jSuJDVtYHfvYfkxJDqy5rwzJPy0Z3vzqDMrYjz0Z/4z4750pT61Zv83Kz72qj83bH72KMaDjfevZIyJEJeS1eBa2i3mn+Xf3Z0X19QRGhkAAAAHnRSTlMABw8bKDY+QURLVmFteomPmqClq7PCytTk6PP1+f1+rF0aAAAEE0lEQVR42r2aC3OiMBCAiwRBEUV8W4SEaGvv/v//u92Ang+ySRWyM53pxE6+7tPNJh8fluINfMaCYKgkCBjzB95Hl+L5LAhbJGB+R6CB3wq4gvzB+zqQhAvnHX08NgytZMi8vhGvY36FeBFj44tn3/xSjfAl+Y0yg2H4ogyt45mFbwizM1UQviWB1z/DhvK6O+wd0wXDROmGQVO8jhhA8frzuYX3O2QApYcctMzKQdixDPp0OuF8FnYuTwbzwx7E7y96tXHMwl6E/crro1FkvarzPa3IeLkry2KzjO8As3Velvk6sVWFViTJZYlSFOsrZpQdCrVYylVkpwqpyDiX8kI5ZPWO8ba4MKScW6lCK7IQsFF+qimF+r+TQ6Eg+Qk+EvnIRhU6R7ZCyPPxePz+uVBqxun8dTx+5VKIiU2u0DmyE0LAdog5ISUd71GNs1o6/sCniUU1NlTGDRfiu97xCymHNTCKZuV4EoJPLOqkoaIsOBefxxsK2upvs/ANjDyyqC2EtUbJLF1yoJwvmyq/lD8XaC4436VpOktGpL08IgkPKBIpV/MApSyv5gNGJTHERLkca7bxKGtNdopRFBVS/jSOVtZqAiGHDyqBCJQ80dtLl4lxg4A9K8CIvQrZk1pQIf0pkMFrBPzK5USbjxqXRFtEfC4zkAXugf/rXkoFgeSUauNqM1ey2CFlF2mconPJFJWYRRfL1ZSmwMjaQrA0v2wbpbyqqqnGKbosWQFj+T/M5nlDqSG1gTa3dXkBkLUmU3R+hxJYxA+lHWJojZDFHiDbRXzvQ4DsNZ7X+R2tFbV8SWHAtn5dRQARGs/rIDuAtEV+DWmLRq0mTJvvWKGylnUB/mgvPwDZaHJeB5mi8VuiBcOq7e9nEF18poHovrCiLVKaNLgRzIf5s2wqbZ6EQy0knECfUPJbqZofzIgnwUTS1HwCAg1EKQUX/EGqduFcV7tISBivSnEtTA+kJ5ZYx+ErECj2iFgYBSFjopmgIdpYuheEUB2LoYuQ0gaC5iN7CRNEk98PEE5DWP8Q1g1EGCB+BxBDePiG1k6WHUAGREeEgvXrbYhn6ITtIHSgB6bDiS2EMioztcJdQHyyTe0I4pmOJx1AAuPRAdvFyMSIsOczHB2oTNH1LPffO6DuzjQsIuwFPUuRmSAZQNam4RphrylADlOaofqamelgShyxI+xWi02WaiXbIGMbGacFRD5O1AmlXcqr5BPz3IOaFiQEBY/BamiQ2ExwqNISr0gMzg9iq1kUPfgYT9NMK+l0bDuGdDFUczMedDLodDOydTN8djJGd3Mh4OZqw80ljZPrJjcXZ26uAN1cZrq5lnVzwezmqtzRpb+b5wtuHmI4elLi5nGMo2c+jh4sOXp65eoRWQfP4f4BNnQ++ydhrQwAAAAASUVORK5CYII=",import.meta.url).href,
            peculiarityId: 7,
            title: "svip_38"
        }, {
            name: "svip_17",
            img: new URL("" + new URL("../png/icon-17-CpKZqulg.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_31"
        }, {
            name: "svip_19",
            img: new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAAYFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAVEg08MyRaSzhsW0GAblCSf2KhimaslG23nHPBpnzKrX/Rs4TYuo3ev4zixJTnxpPrx43y0qXwy5D31qT1zo783K74z43505f72aX61p6M9+54AAAAG3RSTlMACRsnOUBETldfZ3B7hI2YoquzvsTP3OHl8fXX+76OAAAECklEQVR42r2a6ZqrIAyGx1pw39faqvd/l5OAnW4qwaHk1/H0eXgnXyCBwM8P0Rzn5LrnP3Pdk+P8mDQY/8xW7AwkU4RVwB/o/xwFwQTHcQkIqZvzbcRxjBbiIOakiZCx0XSDHTIdZ5wzO2hnMsVl/zD3y27Qnfkvg0L5P0NNMcFQUcww9immGHsUc4wdikEGUL6wBomr0mGGzfluQDbD4jLj9iHYiX3BTlSxgqIdhjYP7t9eDt9Nyg8ItiUWL27ShlwOGw0j2Dy3vrZgW47w5vZnFVICwQDI3Hu6rmw5UtyeLIf/aBYEWKHpypYjAY7dxtxLelTMZwEycs+v53m6CP14lESc5MqeI60YwgPKmLEUGDUOfZmmCedCdrler5eM4Mrm1GoBEst/JrdxbFg2LjK1AIngr7hKK9SubK6RASCLFj740LMEI87xCyA+i653i5Rr5bwHWSZRICA+Br2Jkw4YHWMValWjYrUqG29nxie5MBoNDIvzCgjT9Zoy1gkf0J9OlSe3M0oOELkefFwfEF+vEwhg1JwIOSlqVYB69akfpMCYL4jzGsGYSoxVjXJV+3JJvfbqCLpyG6XNy0SNyrpeUhkl8FKvvfzLqztjnkvhW5zlRVFkqVyB5cIoVbl4t5DwfElWuODC8iLCIa3LffgZP+ecq1KLoiL6WdP3TeaxsFlC/rAKMHEae8otBbG083z+YEDUY1qxp0F4JRlzW+ZZlhVVt2ASEoRWdwvBaJKH+F4qOFNIqcKkDUSIjEv0riBSWk4oKiRIibnqs+Cm6EpMgFC2W6J8rA1WX0FDwo6VAvFRrDVZAoyUZwYSwtRtV3/BtZMYgmzm2RxmdWFILoCMq7MonqCImYGIwrE6iwKsx4YgmG27NVc8gFwMQQKRdlcWNwfIaAiyFI46+PgBIdwQhDeC8jFdwZOR4Anx8OPVq1kXYjIOhnKXKOjCmek1g8k9nxKiccRKsGRVrzMCIK061escepOPRRkvO3AjlfG+KCFVvUzkDI8ShLO2ztG6es+HFUAS5eTSO1tXb3WFw4bpFirjrne47t/kisCRgSvjrtXu8IDxEvhyhAMrqf1BD0oEif15wvq3x9lCcUCh65XOy5b4HiLc9FPU0tHrDZKiIymxWUTWK1qOjE+MlpPU0tCL45GxlMOGteiGhIyklk6rq8TMPlRFUfWyS6HeqTjavS6vX45do+zqqLfb7oGund8/ELdWvdl+7uDQUwvPegkZ6pjQ83KPNiCDOM2S8EBX7QsdyM8upPle6lo/1Uaj007L1k7z2Uob3c6FgJ2rDTuXNFaum+xcnNm5ArRzmWnnWtbOBbOdq3JLl/52ni/YeYhh6UmJnccxlp75WHqwZOnpla1HZAaew/0CmbLa3iM2WWsAAAAASUVORK5CYII=",import.meta.url).href,
            title: "svip_35",
            peculiarityId: 7
        }, {
            name: "svip_1",
            img: new URL("" + new URL("../png/icon-6-DjHc-s-i.png?imageslim|imageView2/0/format/webp",import.meta.url).href,import.meta.url).href,
            peculiarityId: 7,
            title: "svip_32"
        }, {
            name: "svip_18",
            img: new URL("" + new URL("../png/icon-19-glxr5_Db.png",import.meta.url).href,import.meta.url).href,
            title: "svip_33",
            peculiarityId: 7
        }]
    }
})
  , v = {
    1: "/vip/png/svga/m/svip_svga_medal_1.svga",
    2: "/vip/png/svga/m/svip_svga_medal_2.svga",
    3: "/vip/png/svga/m/svip_svga_medal_3.svga",
    4: "/vip/png/svga/m/svip_svga_medal_4.svga",
    5: "/vip/png/svga/m/svip_svga_medal_5.svga",
    6: "/vip/png/svga/m/svip_svga_medal_6.svga",
    7: "/vip/png/svga/m/svip_svga_medal_7.svga",
    8: "/vip/png/svga/m/svip_svga_medal_8.svga",
    
}
  , h = {
    1: "/vip/png/svga/h/svip1.svga",
    2: "/vip/png/svga/h/svip2.svga",
    3: "/vip/png/svga/h/svip3.svga",
    4: "/vip/png/svga/h/svip4.svga",
    5: "/vip/png/svga/h/svip5.svga",
    6: "/vip/png/svga/h/svip6.svga",
    7: "/vip/png/svga/h/svip7.svga",
    8: "/vip/png/svga/h/svip8.svga",
    
}
  , E_ = {
    1: "/vip/png/svga/e/svip1.svga",
    2: "/vip/png/svga/e/svip2.svga",
    3: "/vip/png/svga/e/svip3.svga",
    4: "/vip/png/svga/e/svip4.svga",
    5: "/vip/png/svga/e/svip5.svga",
    6: "/vip/png/svga/e/svip6.svga",
    7: "/vip/png/svga/e/svip7.svga",
    8: "/vip/png/svga/e/svip8.svga",
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
  , Le = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAPdklEQVR4AcyXeXRUVZrAf/e92lJJyEoISyKEfY8IIgrKKMgRBWyVIK1ij0szNjo2jrTa5/QMjoyKC+ACot2tuI2yONJujB5kETHIInuEkARCQvbKUqnU/t6dr3IGVJpW7Pln7qnv3bfc+93ft9ylDP6fl/8T4JpJpD1+sWPC67PH/ObD+bOe2vjIr1ZtfPj2tz5dMGfl+nnT/vXFKflFi4cxeCH83eP87I4yWMobNw2+efuyuR9e9Ls/Hv/t6k+23PLK0uXXPnXfgqsW3XP7Vf8x75bJT947d/qSBY/OfWvF6rvf/PP+once+Pb9B8ctXTEheYQGxc8o5w34cg+879027pFZ6589Ouulde+Mu++R6womT8zwXNDdML0OlBGVYZtBNQJ1aIcPMzNE+nCPc1DR6AHTn5j/29kvL9pT/MxNm567MvVSaXRev/MCXDKh1xWj//0Pu6Y9v+rxQdPu6uHKyEZ1+sECreRnYisRwyn3otKwOr8rDUrHwPJL3Uhavttxyb1TJ85e8vCWT+4f+8pDGaTxE0W0/e0WWqNW3zHl93NWvPHZqDsfGuJI7wYqDmYUrZXAeaDdT8fRgzRt/2/qP19H7cYPaNj6BYGSI2i/H2xb+ojYMZQREENqyRqonFMeu+3uW5/55dcrr0sfyY+UHwM01t0947lr/u3pRRnDRrlsHQEtmpRDPAKth3awc9mDbH7oZnYvup+DK5Zy+NXXOfanVRxZuZK9Tyxiy4IF7H/6eXy7BNYySNhkxmxUJISyGxg6c9TASXfdvPGZS51jRPM5f38TcO3cGxdPe2zZfSl5BSoRJoUbbJO2sm/Y/C+z2PTIHPw738OZfIrM0T0YPn8Zlz27idFPfkLv2b+gyyAD09VK3a4DbP3D83w+fzHNpdWSmw5sw0BpE62CFFw1OHv6Q/+04Z07R194LkLjXC9fLxp9x1UPPDDflZONaAKcKBvKP3iLj+65nnhTMYMmWRTe6mDYzEKGzn2W9NEX484IkZxr0WvqPQyc8wDDJ3kpvNag34UmwVO1bLhvOYff2ilrTrKAisGmR3LVot/kYVkDxw1ZuzCddM4qxlnPLCz09L5i7rwlaQMGm7bkjMIikUcHVz3HrhX/zIiJQS663aDgcieunr1IK/w9hunGCB2HeC22VQORSjzdLsQ79Da8Xhd54s0xE50M7Kc5tPJ9dry4AZRXjE6GxOw36hl5y4i+o+8YuZSzyl8Bjrv6mifyL78yTRFFYQqcSfmGdRxc/ygT/tFmwHUG3u4gGY+7168xtHg5Xi1eSSwvfpT2Y9gt2JEqnHmjiHYbT8ROxuXSFMh0GDPVTdmmLexf84XAST5jg46LOh8Xz7r81iWjHBP4XvkB4OKLnaNHFt12I2a7dGqXgWyCdWXsfuV3XHani9wJLpw5PSD3XlyD3saVNla8dgIV82HERawWlNWGirdiWo2oUBUZl1xDzqylJE9egOozhIxCmHCjk8Pvrqe1rAxNCFuHseJBsoY6HBNmXLxI+M5wnbmRlwydMHlezojuTqWa5bEVrdrZsfJxxk6N0nWEE51+A6rrC7iTJwmAH9V+CGKVIFBYfoiLJGqrFQQW8yQ6Ugyhj3BllZB++US8Y6aQ3ddk7GQn219cD0qhiKBUVJzSQsHVvcct7s9A/recAZwOqYMnjrpGmd9Kw5Mo24f/5GHCLRvInejCzJmG6SmCjioI74T4YVAnAD+adlkXA9JPjNIN2IaAaWkXlNAHyzA69mL4v8RqfBsH5TjyBpIzzMYVq6D+4EkMK4opHjTEwPQ+fmfB2OxZorjzdwZw2vi0AV37+7slLNaxvTLoIU5+9S79x0vnlBRc7pHojn0SzoQBLfK9VbInIU1y3yRwjQJZh21XS7iqsMSzduwEnSI5qu0mTMlN3XYCpw7gdMUZONyk+guJghEWo6VtcI+kRxkXDHVP6qSTyxnApF6ZlyR3a0bpCoiWg3WEYPkWsnLjhMMuiNXJAEdA1YFdL9/rUVadSLXkeCV2XLwZOYYKl0rulcqACamU2d2GEVMQFx0Bg2hDiFgghhU1SO+hCNWVYPuOYIWkbUxyP9pMRrY1bHE2qUg5A5jW1TPYsCVUUVnlY5JLoRYkyXBFTEJHmog3S+hiNdjhE6hIuQCcEKmGaKU8HxeoCuxoBfFwNXZEPBzrQNkxxKUiFrRFsOptXMpLa7UFkhEJL7odcazWVkmDNmjqEGmlS5rLa3UjDylnALt0ScnWIWkQFIkGsTqCuExbcsPAbOug5sAx7MTGH69ER49J8ouEj0EkAXoKwk3irTDOKCKGpIISz5oC7sCujYMPtGliJPei6msfrlYnZouJV2vi1T7sylaojGBXxHH5tZnkJEP4MBKXTtFiXDiICoppAZFoRHJFYYcskgwHFVv2YgVzBM7CigTRsRDEwlLHUFGN6gyjQ0JuynslHjEkE2yspsR3CTHg9GRSXSo6T0UIVYYIHo/Ld/FmTZxoqSYm9sZKbVSLrbxuXNLlO0BRZesOC90eEglgBCMkhcFotwVCk+uFPa9sQ4XzMIXNiChUQoIKWSXEEIVuBrsu3ik0WeJJjSEnBKU02jAItXXh0Ooyunltou1aViXxiuhwRMDRpMSjIAsCSJ+EzfL0HWDUL16JxLFbW1D+JlTIh3IorJDCDmt65DhpP9FCfZm8a9SSTxZWg8buFNA+GzrEWzEb8SFKLtqQIUwNDlBOg5bWKCnKIjlJIZEFxDiniSkPnVGQ9LAssJQBYTqL3HXWhKsblR11YTVLqyY5t7U24MhIJRwSmLAla1U7w4eaxGU2GlpGFEXK1hg2YqXCIUoNGUwSFy21TgTIAypJ4D0KPCYuj4vevRRKKQwRucGZ4YZoDNNS6LjC6XTREVHaLcMi5QxgvNEfiEckjh2S1JKC2tdGWs9sQn5wWBpTwpDsjeMwIsSTTLTDIOElnGDLPht321LbAgKWQOFNQnvT0Kk5qLR8VOYgbEcKjiQx1m1giMTExWkF2cSCQcTPssBrzHQvDQ1R7XE4O4QPI3FJSLg9dryhVGjc6TIJwGi1SEkNEba96IhGhxW2uD1U5ZcBCzA8TpTHFCAT5XVhdEmV911R6RdgZgxBZYxEZY+GrmPQUtvdLqO93Y0jxYlKsjFTIeQxycw1BE4LvMZygc7rQVN5S8zjcdQmuM4Aej3sq99WhsrqgxJXE1VQV0X2yD74mw3i8myEDOoO12OmDIXMfBAYndUXnTUMsuW8mXOp1OPk2yWyb48S7w3D9g4Tjw7CcHWjtawCV7KJkQIxcX9aYU9ZzmowDbCdgpPjJRDzEm0O15QUh2rlzXce7Aizu62yJdxWZ6KTU9G2hpY4qe4wkew8JAqiDAx/mNr9pzC6T0TnXCFAk1BdpU65UPbuJOr3t2NHMlHOXuLlfhhJ3cRr4D+8GVd7G+7kGIZbEe6SRWqeQdQKYbgckOrCHDqQqi+PJ7i2L0R2UrkTdrnKr+wANTE4dPzjg6jeI4k6nShZQuInT5A/RgCdcu6LKnpIiI68v4t45T5RUUfkZDn1Gzay++m3+WrJWvY89yE7H1tO6Ruv4vvyP4kcXUtg9xr2rdtG154ys5wKnyODbuOHo5sqcZuIQ2wZMxd/qwPfcZ+cH3lPkDp/ZwATxH6LlztOBaje7sPRfxBRl8bZbhMv28sFU8RDKbmYzhh5MiE2rdjDly99zo43N7H7vw7SdqqF7O7Qo7tJtCbC0Y+Ps+OPxWx9ZgfbV5bTM8uFM1vT5Mmg5xXjMXyHcMnMdYgjjJ652L1HcPgvBwja6lQoxMZOOrmcAZR7okHeCVvqxMlNpbTVpwvkECxxv+nvQJ/YSv5NIzAvGkGXgS4uu9pLwQCDARcZjJ3tZOxNbgZdqMgfYjFUIj7uCgdjRpqMGmEybnwKSTkK3bWQvEuuwvTtlokYQBkeYpm9oO8/cPi9/UTlEOEP6ZfnHKAjwZOQHwAmPgRj1sPaRh99ZwftKg81olAmhRdDzAod30rmuDSyfvkrwvmjcORm0iUfMnKR5LdQDgvbrTGTbYyMqOQpAuAl1rOArhOvJaufLCkNO9GREHZyMpFu/TD7z6B8/T5iR6oJBeyy5iSWJsBOyw8AEy+tXaxrDsQ/NWVJP/bqp7S1p0Dh5RK7nuA1ULoRw9tO1ojx5Iy7Fwrux++dSbMxhmZXAW1yGAhkDCDW53JcY4vIvW422cMHSqqUo30l2HYU28ySTWCIGHgZx1dvxf/NMcJRMx4OMG/eFgIJjtNinL45XReB1XvohDm1ja5jOmxS9sZmqr5pRg2aSlK/CaI4D0M3oqJlaH2S5ExZVQYU0uOS6+Xv5mwumD6D7pPGkDMylRSPnHTqi7Hq9mGHW1BmMs70vjj6TCTKAEqWv0vw4CEC7Uo3BDyPz9zDZ6c5Ttd/BZj4MOq1bY3pPQdMq27SdYbM9oZNO+Xv4noCLTmQfDFxR38slYkyJKxa9u1oKTpwBNVcgvLthcYD0CRwoRYMyRfDLf26FELeVdjZ46kpPsGx5X9GtTbTETBk59ArZ37x4KOJsc+WcwImGl35wYGjbbY5sa6Bo5Y2Zda1UL78TUqefY3gzgAq1BNNPyyzL7ajuyyQ6ViebOJJ8pw0FCttNDp7CrrXLyD/arS3kIZtlZQsWUbrls8wbYPWZqxTTbFn6D/9PqUW2olxzxbj7Bfff75zd+Roa4zLapusD5vbtXY4PLhq6qlZ8xolTz9F1arVtG3bS6SylUjIgW3ky8I8HJL6YOlsInK8b/xyJ8dffY1jLzxB6KvPSEucmGIm9bWRttr6+K9nFtsLitautb4/7vfvfxQw0fD2nfgObuX6+garqLo6VOFrNyXoDjyRCNbR/bR9+gFVf3qZqueep2rJ01Qte5LqF56neuUK6tasIrTzc5yNVbglCsFIEqfqiVWUW+821ujCWcW8yk+UnwRM9F8IdtFXrAvU2iOra4LzTlZah+rrlBUMemWPNnGZSSTJmpZEnCQieIw4HofC1G6iYQ/NPpOqqkhbeWnHmoryyITrtzJ79j5OcB7lvABP6ykqITDzK1bsjOoLK6ojw0uOts8//G3o/ZKjHUdKjwVaysqjoWPl0XBpabSj5HC4ruRwsPjA/uBL3x4Jz6ioiPefsdmeNWcPX5/Wdz71zwI8rXDhFuJzdvDtzdtYdsPn3HDtR/HBvvpoz9KT0T5lpbG+5afi+cV/sfKmfmxdetNm+zezt/PBHXtpPN3/59R/F+C5BigqJnT319TfuZeau4ppXojE+1wNf+a7/wEAAP//MkpEFAAAAAZJREFUAwB//CW6+qfbZQAAAABJRU5ErkJggg=="
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
