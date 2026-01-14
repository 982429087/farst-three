import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/bigIntSupport.js
var require_bigIntSupport = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/bigIntSupport.js"(exports, module) {
    !function(n, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (n = "undefined" != typeof globalThis ? globalThis : n || self).dayjs_plugin_bigIntSupport = e();
    }(exports, function() {
      "use strict";
      var n = function(n2) {
        return "bigint" == typeof n2;
      };
      return function(e, t, i) {
        var o = t.prototype, u = function(e2) {
          var t2 = e2.date;
          return n(t2) ? Number(t2) : t2;
        }, r = o.parse;
        o.parse = function(n2) {
          n2.date = u.bind(this)(n2), r.bind(this)(n2);
        };
        var f = i.unix;
        i.unix = function(e2) {
          var t2 = n(e2) ? Number(e2) : e2;
          return f(t2);
        };
      };
    });
  }
});
export default require_bigIntSupport();
//# sourceMappingURL=dayjs_plugin_bigIntSupport__js.js.map
