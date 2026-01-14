import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/isoWeeksInYear.js
var require_isoWeeksInYear = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/isoWeeksInYear.js"(exports, module) {
    !function(e, n) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isoWeeksInYear = n();
    }(exports, function() {
      "use strict";
      return function(e, n) {
        n.prototype.isoWeeksInYear = function() {
          var e2 = this.isLeapYear(), n2 = this.endOf("y").day();
          return 4 === n2 || e2 && 5 === n2 ? 53 : 52;
        };
      };
    });
  }
});
export default require_isoWeeksInYear();
//# sourceMappingURL=dayjs_plugin_isoWeeksInYear__js.js.map
