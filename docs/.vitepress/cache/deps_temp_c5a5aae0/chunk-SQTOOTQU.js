import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/dayOfYear.js
var require_dayOfYear = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/dayOfYear.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_dayOfYear = t();
    }(exports, function() {
      "use strict";
      return function(e, t, n) {
        t.prototype.dayOfYear = function(e2) {
          var t2 = Math.round((n(this).startOf("day") - n(this).startOf("year")) / 864e5) + 1;
          return null == e2 ? t2 : this.add(e2 - t2, "day");
        };
      };
    });
  }
});

export {
  require_dayOfYear
};
//# sourceMappingURL=chunk-SQTOOTQU.js.map
