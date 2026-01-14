import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/toArray.js
var require_toArray = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/toArray.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_toArray = e();
    }(exports, function() {
      "use strict";
      return function(t, e) {
        e.prototype.toArray = function() {
          return [this.$y, this.$M, this.$D, this.$H, this.$m, this.$s, this.$ms];
        };
      };
    });
  }
});
export default require_toArray();
//# sourceMappingURL=dayjs_plugin_toArray__js.js.map
