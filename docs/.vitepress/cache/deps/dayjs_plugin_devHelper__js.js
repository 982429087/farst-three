import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/devHelper.js
var require_devHelper = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/devHelper.js"(exports, module) {
    !function(e, t) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).dayjs_plugin_devHelper = t();
    }(exports, function() {
      "use strict";
      return function(e, t, s) {
        if (!process || true) {
          var o = t.prototype, n = o.parse;
          o.parse = function(e2) {
            var t2 = e2.date;
            return "string" == typeof t2 && 13 === t2.length && console.warn("To parse a Unix timestamp like " + t2 + ", you should pass it as a Number. https://day.js.org/docs/en/parse/unix-timestamp-milliseconds"), "number" == typeof t2 && 4 === String(t2).length && console.warn("Guessing you may want to parse the Year " + t2 + ", you should pass it as a String " + t2 + ", not a Number. Otherwise, " + t2 + " will be treated as a Unix timestamp"), e2.args.length >= 2 && !s.p.customParseFormat && console.warn("To parse a date-time string like " + t2 + " using the given format, you should enable customParseFormat plugin first. https://day.js.org/docs/en/parse/string-format"), n.bind(this)(e2);
          };
          var a = s.locale;
          s.locale = function(e2, t2, o2) {
            return void 0 === t2 && "string" == typeof e2 && (s.Ls[e2] || console.warn("Guessing you may want to use locale " + e2 + ", you have to load it before using it. https://day.js.org/docs/en/i18n/loading-into-nodejs")), a(e2, t2, o2);
          };
          var i = o.diff;
          o.diff = function(e2, t2, o2) {
            return (!e2 || !s(e2).isValid()) && console.warn("Invalid usage: diff() requires a valid comparison date as the first argument. https://day.js.org/docs/en/display/difference"), i.call(this, e2, t2, o2);
          };
        }
      };
    });
  }
});
export default require_devHelper();
//# sourceMappingURL=dayjs_plugin_devHelper__js.js.map
