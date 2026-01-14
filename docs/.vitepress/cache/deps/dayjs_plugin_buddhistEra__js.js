import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/buddhistEra.js
var require_buddhistEra = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/buddhistEra.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_buddhistEra = e();
    }(exports, function() {
      "use strict";
      return function(t, e) {
        var n = e.prototype, i = n.format;
        n.format = function(t2) {
          var e2 = this, n2 = (t2 || "YYYY-MM-DDTHH:mm:ssZ").replace(/(\[[^\]]+])|BBBB|BB/g, function(t3, n3) {
            var i2, o = String(e2.$y + 543), f = "BB" === t3 ? [o.slice(-2), 2] : [o, 4];
            return n3 || (i2 = e2.$utils()).s.apply(i2, f.concat(["0"]));
          });
          return i.bind(this)(n2);
        };
      };
    });
  }
});
export default require_buddhistEra();
//# sourceMappingURL=dayjs_plugin_buddhistEra__js.js.map
