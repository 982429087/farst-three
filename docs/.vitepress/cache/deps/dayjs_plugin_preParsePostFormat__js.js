import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/preParsePostFormat.js
var require_preParsePostFormat = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/preParsePostFormat.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_preParsePostFormat = e();
    }(exports, function() {
      "use strict";
      return function(t, e) {
        var o = e.prototype.parse;
        e.prototype.parse = function(t2) {
          if ("string" == typeof t2.date) {
            var e2 = this.$locale();
            t2.date = e2 && e2.preparse ? e2.preparse(t2.date) : t2.date;
          }
          return o.bind(this)(t2);
        };
        var r = e.prototype.format;
        e.prototype.format = function() {
          for (var t2 = arguments.length, e2 = new Array(t2), o2 = 0; o2 < t2; o2++) e2[o2] = arguments[o2];
          var a2 = r.call.apply(r, [this].concat(e2)), p = this.$locale();
          return p && p.postformat ? p.postformat(a2) : a2;
        };
        var a = e.prototype.fromToBase;
        a && (e.prototype.fromToBase = function(t2, e2, o2, r2) {
          var p = this.$locale() || o2.$locale();
          return a.call(this, t2, e2, o2, r2, p && p.postformat);
        });
      };
    });
  }
});
export default require_preParsePostFormat();
//# sourceMappingURL=dayjs_plugin_preParsePostFormat__js.js.map
