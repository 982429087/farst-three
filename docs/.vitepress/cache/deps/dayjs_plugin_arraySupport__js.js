import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/arraySupport.js
var require_arraySupport = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/arraySupport.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_arraySupport = t();
    }(exports, function() {
      "use strict";
      return function(e, t, n) {
        var o = t.prototype, i = function(e2) {
          var t2 = e2.date, o2 = e2.utc;
          return Array.isArray(t2) ? o2 ? t2.length ? new Date(Date.UTC.apply(null, t2)) : /* @__PURE__ */ new Date() : 1 === t2.length ? n(String(t2[0])).toDate() : new (Function.prototype.bind.apply(Date, [null].concat(t2)))() : t2;
        }, a = o.parse;
        o.parse = function(e2) {
          e2.date = i.bind(this)(e2), a.bind(this)(e2);
        };
      };
    });
  }
});
export default require_arraySupport();
//# sourceMappingURL=dayjs_plugin_arraySupport__js.js.map
