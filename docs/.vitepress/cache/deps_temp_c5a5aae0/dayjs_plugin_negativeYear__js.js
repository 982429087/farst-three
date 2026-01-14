import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/negativeYear.js
var require_negativeYear = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/negativeYear.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_negativeYear = t();
    }(exports, function() {
      "use strict";
      return function(e, t, n) {
        var i = t.prototype, o = function(e2) {
          var t2 = e2.date, i2 = e2.utc;
          if ("string" == typeof t2 && "-" === t2.charAt(0)) {
            var o2 = t2.slice(1), r2 = n(o2), f = (r2 = i2 ? n.utc(o2) : n(o2)).year();
            return -1 !== t2.indexOf("-" + f) ? n(r2).subtract(2 * f, "year").toDate() : t2;
          }
          return t2;
        }, r = i.parse;
        i.parse = function(e2) {
          e2.date = o.bind(this)(e2), r.bind(this)(e2);
        };
      };
    });
  }
});
export default require_negativeYear();
//# sourceMappingURL=dayjs_plugin_negativeYear__js.js.map
