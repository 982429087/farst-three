import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/isMoment.js
var require_isMoment = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/isMoment.js"(exports, module) {
    !function(e, n) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_isMoment = n();
    }(exports, function() {
      "use strict";
      return function(e, n, t) {
        t.isMoment = function(e2) {
          return t.isDayjs(e2);
        };
      };
    });
  }
});
export default require_isMoment();
//# sourceMappingURL=dayjs_plugin_isMoment__js.js.map
