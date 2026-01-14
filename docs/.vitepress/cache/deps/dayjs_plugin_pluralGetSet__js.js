import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/pluralGetSet.js
var require_pluralGetSet = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/pluralGetSet.js"(exports, module) {
    !function(e, o) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = o() : "function" == typeof define && define.amd ? define(o) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_pluralGetSet = o();
    }(exports, function() {
      "use strict";
      return function(e, o) {
        var s = o.prototype;
        ["milliseconds", "seconds", "minutes", "hours", "days", "weeks", "isoWeeks", "months", "quarters", "years", "dates"].forEach(function(e2) {
          s[e2] = s[e2.replace(/s$/, "")];
        });
      };
    });
  }
});
export default require_pluralGetSet();
//# sourceMappingURL=dayjs_plugin_pluralGetSet__js.js.map
