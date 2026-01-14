import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/toObject.js
var require_toObject = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/toObject.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_toObject = e();
    }(exports, function() {
      "use strict";
      return function(t, e) {
        e.prototype.toObject = function() {
          return { years: this.$y, months: this.$M, date: this.$D, hours: this.$H, minutes: this.$m, seconds: this.$s, milliseconds: this.$ms };
        };
      };
    });
  }
});
export default require_toObject();
//# sourceMappingURL=dayjs_plugin_toObject__js.js.map
