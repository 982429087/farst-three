import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/objectSupport.js
var require_objectSupport = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/objectSupport.js"(exports, module) {
    !function(t, n) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_objectSupport = n();
    }(exports, function() {
      "use strict";
      return function(t, n, e) {
        var i = n.prototype, r = function(t2) {
          var n2, r2 = t2.date, o2 = t2.utc, u2 = {};
          if (!(null === (n2 = r2) || n2 instanceof Date || n2 instanceof Array || i.$utils().u(n2) || "Object" !== n2.constructor.name)) {
            if (!Object.keys(r2).length) return /* @__PURE__ */ new Date();
            var a2 = o2 ? e.utc() : e();
            Object.keys(r2).forEach(function(t3) {
              var n3, e2;
              u2[n3 = t3, e2 = i.$utils().p(n3), "date" === e2 ? "day" : e2] = r2[t3];
            });
            var c2 = u2.day || (u2.year || u2.month >= 0 ? 1 : a2.date()), s2 = u2.year || a2.year(), d = u2.month >= 0 ? u2.month : u2.year || u2.day ? 0 : a2.month(), f = u2.hour || 0, b = u2.minute || 0, h = u2.second || 0, y = u2.millisecond || 0;
            return o2 ? new Date(Date.UTC(s2, d, c2, f, b, h, y)) : new Date(s2, d, c2, f, b, h, y);
          }
          return r2;
        }, o = i.parse;
        i.parse = function(t2) {
          t2.date = r.bind(this)(t2), o.bind(this)(t2);
        };
        var u = i.set, a = i.add, c = i.subtract, s = function(t2, n2, e2, i2) {
          void 0 === i2 && (i2 = 1);
          var r2 = Object.keys(n2), o2 = this;
          return r2.forEach(function(e3) {
            o2 = t2.bind(o2)(n2[e3] * i2, e3);
          }), o2;
        };
        i.set = function(t2, n2) {
          return n2 = void 0 === n2 ? t2 : n2, "Object" === t2.constructor.name ? s.bind(this)(function(t3, n3) {
            return u.bind(this)(n3, t3);
          }, n2, t2) : u.bind(this)(t2, n2);
        }, i.add = function(t2, n2) {
          return "Object" === t2.constructor.name ? s.bind(this)(a, t2, n2) : a.bind(this)(t2, n2);
        }, i.subtract = function(t2, n2) {
          return "Object" === t2.constructor.name ? s.bind(this)(a, t2, n2, -1) : c.bind(this)(t2, n2);
        };
      };
    });
  }
});
export default require_objectSupport();
//# sourceMappingURL=dayjs_plugin_objectSupport__js.js.map
