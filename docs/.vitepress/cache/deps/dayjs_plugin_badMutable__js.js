import {
  __commonJS
} from "./chunk-G3PMV62Z.js";

// ../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/badMutable.js
var require_badMutable = __commonJS({
  "../node_modules/.pnpm/dayjs@1.11.19/node_modules/dayjs/plugin/badMutable.js"(exports, module) {
    !function(t, i) {
      "object" == typeof exports && "undefined" != typeof module ? module.exports = i() : "function" == typeof define && define.amd ? define(i) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs_plugin_badMutable = i();
    }(exports, function() {
      "use strict";
      return function(t, i) {
        var n = i.prototype;
        n.$g = function(t2, i2, n2) {
          return this.$utils().u(t2) ? this[i2] : this.$set(n2, t2);
        }, n.set = function(t2, i2) {
          return this.$set(t2, i2);
        };
        var e = n.startOf;
        n.startOf = function(t2, i2) {
          return this.$d = e.bind(this)(t2, i2).toDate(), this.init(), this;
        };
        var s = n.add;
        n.add = function(t2, i2) {
          return this.$d = s.bind(this)(t2, i2).toDate(), this.init(), this;
        };
        var o = n.locale;
        n.locale = function(t2, i2) {
          return t2 ? (this.$L = o.bind(this)(t2, i2).$L, this) : this.$L;
        };
        var r = n.daysInMonth;
        n.daysInMonth = function() {
          return r.bind(this.clone())();
        };
        var u = n.isSame;
        n.isSame = function(t2, i2) {
          return u.bind(this.clone())(t2, i2);
        };
        var f = n.isBefore;
        n.isBefore = function(t2, i2) {
          return f.bind(this.clone())(t2, i2);
        };
        var d = n.isAfter;
        n.isAfter = function(t2, i2) {
          return d.bind(this.clone())(t2, i2);
        };
      };
    });
  }
});
export default require_badMutable();
//# sourceMappingURL=dayjs_plugin_badMutable__js.js.map
