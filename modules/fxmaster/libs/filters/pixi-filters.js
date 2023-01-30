/*!
 * pixi-filters - v4.1.6
 * Compiled Thu, 03 Feb 2022 14:30:04 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters = (function (e, n, t, r, o, i, l, a) {
  "use strict";
  var s = function (e, n) {
    return (s =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, n) {
          e.__proto__ = n;
        }) ||
      function (e, n) {
        for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
      })(e, n);
  };
  function u(e, n) {
    function t() {
      this.constructor = e;
    }
    s(e, n), (e.prototype = null === n ? Object.create(n) : ((t.prototype = n.prototype), new t()));
  }
  var f = function () {
    return (f =
      Object.assign ||
      function (e) {
        for (var n, t = arguments, r = 1, o = arguments.length; r < o; r++)
          for (var i in (n = t[r])) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
        return e;
      }).apply(this, arguments);
  };
  Object.create;
  Object.create;
  var c =
      "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",
    m = (function (e) {
      function n(n) {
        var t =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n",
          ) || this;
        return (
          (t.gamma = 1),
          (t.saturation = 1),
          (t.contrast = 1),
          (t.brightness = 1),
          (t.red = 1),
          (t.green = 1),
          (t.blue = 1),
          (t.alpha = 1),
          Object.assign(t, n),
          t
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          (this.uniforms.gamma = Math.max(this.gamma, 1e-4)),
            (this.uniforms.saturation = this.saturation),
            (this.uniforms.contrast = this.contrast),
            (this.uniforms.brightness = this.brightness),
            (this.uniforms.red = this.red),
            (this.uniforms.green = this.green),
            (this.uniforms.blue = this.blue),
            (this.uniforms.alpha = this.alpha),
            e.applyFilter(this, n, t, r);
        }),
        n
      );
    })(n.Filter),
    p = (function (e) {
      function n(n) {
        void 0 === n && (n = 0.5);
        var t =
          e.call(
            this,
            c,
            "\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n",
          ) || this;
        return (t.threshold = n), t;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "threshold", {
          get: function () {
            return this.uniforms.threshold;
          },
          set: function (e) {
            this.uniforms.threshold = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    d = (function (e) {
      function n(n, r, o) {
        void 0 === n && (n = 4), void 0 === r && (r = 3), void 0 === o && (o = !1);
        var i =
          e.call(
            this,
            c,
            o
              ? "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n"
              : "\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}",
          ) || this;
        return (
          (i._kernels = []),
          (i._blur = 4),
          (i._quality = 3),
          (i.uniforms.uOffset = new Float32Array(2)),
          (i._pixelSize = new t.Point()),
          (i.pixelSize = 1),
          (i._clamp = o),
          Array.isArray(n) ? (i.kernels = n) : ((i._blur = n), (i.quality = r)),
          i
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o,
            i = this._pixelSize.x / n._frame.width,
            l = this._pixelSize.y / n._frame.height;
          if (1 === this._quality || 0 === this._blur)
            (o = this._kernels[0] + 0.5),
              (this.uniforms.uOffset[0] = o * i),
              (this.uniforms.uOffset[1] = o * l),
              e.applyFilter(this, n, t, r);
          else {
            for (var a = e.getFilterTexture(), s = n, u = a, f = void 0, c = this._quality - 1, m = 0; m < c; m++)
              (o = this._kernels[m] + 0.5),
                (this.uniforms.uOffset[0] = o * i),
                (this.uniforms.uOffset[1] = o * l),
                e.applyFilter(this, s, u, 1),
                (f = s),
                (s = u),
                (u = f);
            (o = this._kernels[c] + 0.5),
              (this.uniforms.uOffset[0] = o * i),
              (this.uniforms.uOffset[1] = o * l),
              e.applyFilter(this, s, t, r),
              e.returnFilterTexture(a);
          }
        }),
        (n.prototype._updatePadding = function () {
          this.padding = Math.ceil(
            this._kernels.reduce(function (e, n) {
              return e + n + 0.5;
            }, 0),
          );
        }),
        (n.prototype._generateKernels = function () {
          var e = this._blur,
            n = this._quality,
            t = [e];
          if (e > 0) for (var r = e, o = e / n, i = 1; i < n; i++) (r -= o), t.push(r);
          (this._kernels = t), this._updatePadding();
        }),
        Object.defineProperty(n.prototype, "kernels", {
          get: function () {
            return this._kernels;
          },
          set: function (e) {
            Array.isArray(e) && e.length > 0
              ? ((this._kernels = e), (this._quality = e.length), (this._blur = Math.max.apply(Math, e)))
              : ((this._kernels = [0]), (this._quality = 1));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "clamp", {
          get: function () {
            return this._clamp;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "pixelSize", {
          get: function () {
            return this._pixelSize;
          },
          set: function (e) {
            "number" == typeof e
              ? ((this._pixelSize.x = e), (this._pixelSize.y = e))
              : Array.isArray(e)
              ? ((this._pixelSize.x = e[0]), (this._pixelSize.y = e[1]))
              : e instanceof t.Point
              ? ((this._pixelSize.x = e.x), (this._pixelSize.y = e.y))
              : ((this._pixelSize.x = 1), (this._pixelSize.y = 1));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "quality", {
          get: function () {
            return this._quality;
          },
          set: function (e) {
            (this._quality = Math.max(1, Math.round(e))), this._generateKernels();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "blur", {
          get: function () {
            return this._blur;
          },
          set: function (e) {
            (this._blur = e), this._generateKernels();
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    h = (function (e) {
      function n(t) {
        var o =
          e.call(
            this,
            c,
            "uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n",
          ) || this;
        (o.bloomScale = 1),
          (o.brightness = 1),
          (o._resolution = r.settings.FILTER_RESOLUTION),
          "number" == typeof t && (t = { threshold: t });
        var i = Object.assign(n.defaults, t);
        (o.bloomScale = i.bloomScale), (o.brightness = i.brightness);
        var l = i.kernels,
          a = i.blur,
          s = i.quality,
          u = i.pixelSize,
          f = i.resolution;
        return (
          (o._extractFilter = new p(i.threshold)),
          (o._extractFilter.resolution = f),
          (o._blurFilter = l ? new d(l) : new d(a, s)),
          (o.pixelSize = u),
          (o.resolution = f),
          o
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r, o) {
          var i = e.getFilterTexture();
          this._extractFilter.apply(e, n, i, 1, o);
          var l = e.getFilterTexture();
          this._blurFilter.apply(e, i, l, 1),
            (this.uniforms.bloomScale = this.bloomScale),
            (this.uniforms.brightness = this.brightness),
            (this.uniforms.bloomTexture = l),
            e.applyFilter(this, n, t, r),
            e.returnFilterTexture(l),
            e.returnFilterTexture(i);
        }),
        Object.defineProperty(n.prototype, "resolution", {
          get: function () {
            return this._resolution;
          },
          set: function (e) {
            (this._resolution = e),
              this._extractFilter && (this._extractFilter.resolution = e),
              this._blurFilter && (this._blurFilter.resolution = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "threshold", {
          get: function () {
            return this._extractFilter.threshold;
          },
          set: function (e) {
            this._extractFilter.threshold = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "kernels", {
          get: function () {
            return this._blurFilter.kernels;
          },
          set: function (e) {
            this._blurFilter.kernels = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "blur", {
          get: function () {
            return this._blurFilter.blur;
          },
          set: function (e) {
            this._blurFilter.blur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "quality", {
          get: function () {
            return this._blurFilter.quality;
          },
          set: function (e) {
            this._blurFilter.quality = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "pixelSize", {
          get: function () {
            return this._blurFilter.pixelSize;
          },
          set: function (e) {
            this._blurFilter.pixelSize = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = {
          threshold: 0.5,
          bloomScale: 1,
          brightness: 1,
          kernels: null,
          blur: 8,
          quality: 4,
          pixelSize: 1,
          resolution: r.settings.FILTER_RESOLUTION,
        }),
        n
      );
    })(n.Filter),
    g = (function (e) {
      function n(n) {
        void 0 === n && (n = 8);
        var t =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n",
          ) || this;
        return (t.size = n), t;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "size", {
          get: function () {
            return this.uniforms.pixelSize;
          },
          set: function (e) {
            this.uniforms.pixelSize = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    v = (function (e) {
      function n(n) {
        var t =
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n",
          ) || this;
        return (
          (t._thickness = 2),
          (t._angle = 0),
          (t.uniforms.lightColor = new Float32Array(3)),
          (t.uniforms.shadowColor = new Float32Array(3)),
          Object.assign(
            t,
            { rotation: 45, thickness: 2, lightColor: 16777215, lightAlpha: 0.7, shadowColor: 0, shadowAlpha: 0.7 },
            n,
          ),
          (t.padding = 1),
          t
        );
      }
      return (
        u(n, e),
        (n.prototype._updateTransform = function () {
          (this.uniforms.transformX = this._thickness * Math.cos(this._angle)),
            (this.uniforms.transformY = this._thickness * Math.sin(this._angle));
        }),
        Object.defineProperty(n.prototype, "rotation", {
          get: function () {
            return this._angle / t.DEG_TO_RAD;
          },
          set: function (e) {
            (this._angle = e * t.DEG_TO_RAD), this._updateTransform();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "thickness", {
          get: function () {
            return this._thickness;
          },
          set: function (e) {
            (this._thickness = e), this._updateTransform();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "lightColor", {
          get: function () {
            return o.rgb2hex(this.uniforms.lightColor);
          },
          set: function (e) {
            o.hex2rgb(e, this.uniforms.lightColor);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "lightAlpha", {
          get: function () {
            return this.uniforms.lightAlpha;
          },
          set: function (e) {
            this.uniforms.lightAlpha = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "shadowColor", {
          get: function () {
            return o.rgb2hex(this.uniforms.shadowColor);
          },
          set: function (e) {
            o.hex2rgb(e, this.uniforms.shadowColor);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "shadowAlpha", {
          get: function () {
            return this.uniforms.shadowAlpha;
          },
          set: function (e) {
            this.uniforms.shadowAlpha = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    y = (function (e) {
      function n(n, o, s, u) {
        void 0 === n && (n = 2),
          void 0 === o && (o = 4),
          void 0 === s && (s = r.settings.FILTER_RESOLUTION),
          void 0 === u && (u = 5);
        var f,
          c,
          m = e.call(this) || this;
        return (
          "number" == typeof n
            ? ((f = n), (c = n))
            : n instanceof t.Point
            ? ((f = n.x), (c = n.y))
            : Array.isArray(n) && ((f = n[0]), (c = n[1])),
          (m.blurXFilter = new a.BlurFilterPass(!0, f, o, s, u)),
          (m.blurYFilter = new a.BlurFilterPass(!1, c, o, s, u)),
          (m.blurYFilter.blendMode = i.BLEND_MODES.SCREEN),
          (m.defaultFilter = new l.AlphaFilter()),
          m
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o = e.getFilterTexture();
          this.defaultFilter.apply(e, n, t, r),
            this.blurXFilter.apply(e, n, o, 1),
            this.blurYFilter.apply(e, o, t, 0),
            e.returnFilterTexture(o);
        }),
        Object.defineProperty(n.prototype, "blur", {
          get: function () {
            return this.blurXFilter.blur;
          },
          set: function (e) {
            this.blurXFilter.blur = this.blurYFilter.blur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "blurX", {
          get: function () {
            return this.blurXFilter.blur;
          },
          set: function (e) {
            this.blurXFilter.blur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "blurY", {
          get: function () {
            return this.blurYFilter.blur;
          },
          set: function (e) {
            this.blurYFilter.blur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    b = (function (e) {
      function n(t) {
        var r =
          e.call(
            this,
            c,
            "uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n",
          ) || this;
        return (r.uniforms.dimensions = new Float32Array(2)), Object.assign(r, n.defaults, t), r;
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o = n.filterFrame,
            i = o.width,
            l = o.height;
          (this.uniforms.dimensions[0] = i), (this.uniforms.dimensions[1] = l), e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "radius", {
          get: function () {
            return this.uniforms.radius;
          },
          set: function (e) {
            this.uniforms.radius = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "strength", {
          get: function () {
            return this.uniforms.strength;
          },
          set: function (e) {
            this.uniforms.strength = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "center", {
          get: function () {
            return this.uniforms.center;
          },
          set: function (e) {
            this.uniforms.center = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = { center: [0.5, 0.5], radius: 100, strength: 1 }),
        n
      );
    })(n.Filter),
    x = (function (e) {
      function t(n, t, r) {
        void 0 === t && (t = !1), void 0 === r && (r = 1);
        var o =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}",
          ) || this;
        return (
          (o.mix = 1),
          (o._size = 0),
          (o._sliceSize = 0),
          (o._slicePixelSize = 0),
          (o._sliceInnerSize = 0),
          (o._nearest = !1),
          (o._scaleMode = null),
          (o._colorMap = null),
          (o._scaleMode = null),
          (o.nearest = t),
          (o.mix = r),
          (o.colorMap = n),
          o
        );
      }
      return (
        u(t, e),
        (t.prototype.apply = function (e, n, t, r) {
          (this.uniforms._mix = this.mix), e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(t.prototype, "colorSize", {
          get: function () {
            return this._size;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "colorMap", {
          get: function () {
            return this._colorMap;
          },
          set: function (e) {
            var t;
            e &&
              (e instanceof n.Texture || (e = n.Texture.from(e)),
              (null === (t = e) || void 0 === t ? void 0 : t.baseTexture) &&
                ((e.baseTexture.scaleMode = this._scaleMode),
                (e.baseTexture.mipmap = i.MIPMAP_MODES.OFF),
                (this._size = e.height),
                (this._sliceSize = 1 / this._size),
                (this._slicePixelSize = this._sliceSize / this._size),
                (this._sliceInnerSize = this._slicePixelSize * (this._size - 1)),
                (this.uniforms._size = this._size),
                (this.uniforms._sliceSize = this._sliceSize),
                (this.uniforms._slicePixelSize = this._slicePixelSize),
                (this.uniforms._sliceInnerSize = this._sliceInnerSize),
                (this.uniforms.colorMap = e)),
              (this._colorMap = e));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(t.prototype, "nearest", {
          get: function () {
            return this._nearest;
          },
          set: function (e) {
            (this._nearest = e), (this._scaleMode = e ? i.SCALE_MODES.NEAREST : i.SCALE_MODES.LINEAR);
            var n = this._colorMap;
            n &&
              n.baseTexture &&
              ((n.baseTexture._glTextures = {}),
              (n.baseTexture.scaleMode = this._scaleMode),
              (n.baseTexture.mipmap = i.MIPMAP_MODES.OFF),
              n._updateID++,
              n.baseTexture.emit("update", n.baseTexture));
          },
          enumerable: !1,
          configurable: !0,
        }),
        (t.prototype.updateColorMap = function () {
          var e = this._colorMap;
          e && e.baseTexture && (e._updateID++, e.baseTexture.emit("update", e.baseTexture), (this.colorMap = e));
        }),
        (t.prototype.destroy = function (n) {
          void 0 === n && (n = !1), this._colorMap && this._colorMap.destroy(n), e.prototype.destroy.call(this);
        }),
        t
      );
    })(n.Filter),
    _ = (function (e) {
      function n(n, t) {
        void 0 === n && (n = 0), void 0 === t && (t = 1);
        var r =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nuniform float alpha;\n\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    gl_FragColor = vec4(mix(currentColor.rgb, color.rgb, currentColor.a * alpha), currentColor.a);\n}\n",
          ) || this;
        return (
          (r._color = 0), (r._alpha = 1), (r.uniforms.color = new Float32Array(3)), (r.color = n), (r.alpha = t), r
        );
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "color", {
          get: function () {
            return this._color;
          },
          set: function (e) {
            var n = this.uniforms.color;
            "number" == typeof e
              ? (o.hex2rgb(e, n), (this._color = e))
              : ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (this._color = o.rgb2hex(n)));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "alpha", {
          get: function () {
            return this._alpha;
          },
          set: function (e) {
            (this.uniforms.alpha = e), (this._alpha = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    C = (function (e) {
      function n(n, t, r) {
        void 0 === n && (n = 16711680), void 0 === t && (t = 0), void 0 === r && (r = 0.4);
        var o =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n",
          ) || this;
        return (
          (o._originalColor = 16711680),
          (o._newColor = 0),
          (o.uniforms.originalColor = new Float32Array(3)),
          (o.uniforms.newColor = new Float32Array(3)),
          (o.originalColor = n),
          (o.newColor = t),
          (o.epsilon = r),
          o
        );
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "originalColor", {
          get: function () {
            return this._originalColor;
          },
          set: function (e) {
            var n = this.uniforms.originalColor;
            "number" == typeof e
              ? (o.hex2rgb(e, n), (this._originalColor = e))
              : ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (this._originalColor = o.rgb2hex(n)));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "newColor", {
          get: function () {
            return this._newColor;
          },
          set: function (e) {
            var n = this.uniforms.newColor;
            "number" == typeof e
              ? (o.hex2rgb(e, n), (this._newColor = e))
              : ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (this._newColor = o.rgb2hex(n)));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "epsilon", {
          get: function () {
            return this.uniforms.epsilon;
          },
          set: function (e) {
            this.uniforms.epsilon = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    S = (function (e) {
      function n(n, t, r) {
        void 0 === t && (t = 200), void 0 === r && (r = 200);
        var o =
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",
          ) || this;
        return (
          (o.uniforms.texelSize = new Float32Array(2)),
          (o.uniforms.matrix = new Float32Array(9)),
          void 0 !== n && (o.matrix = n),
          (o.width = t),
          (o.height = r),
          o
        );
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "matrix", {
          get: function () {
            return this.uniforms.matrix;
          },
          set: function (e) {
            var n = this;
            e.forEach(function (e, t) {
              n.uniforms.matrix[t] = e;
            });
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "width", {
          get: function () {
            return 1 / this.uniforms.texelSize[0];
          },
          set: function (e) {
            this.uniforms.texelSize[0] = 1 / e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "height", {
          get: function () {
            return 1 / this.uniforms.texelSize[1];
          },
          set: function (e) {
            this.uniforms.texelSize[1] = 1 / e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    F = (function (e) {
      function n() {
        return (
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n",
          ) || this
        );
      }
      return u(n, e), n;
    })(n.Filter),
    z = (function (e) {
      function n(t) {
        var r =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 dir = vec2(vTextureCoord.xy * filterArea.xy / dimensions - vec2(0.5, 0.5));\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0)\n    {\n        float _c = curvature > 0. ? curvature : 1.;\n        float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n        vec2 uv = dir * k;\n\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n",
          ) || this;
        return (
          (r.time = 0), (r.seed = 0), (r.uniforms.dimensions = new Float32Array(2)), Object.assign(r, n.defaults, t), r
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o = n.filterFrame,
            i = o.width,
            l = o.height;
          (this.uniforms.dimensions[0] = i),
            (this.uniforms.dimensions[1] = l),
            (this.uniforms.seed = this.seed),
            (this.uniforms.time = this.time),
            e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "curvature", {
          get: function () {
            return this.uniforms.curvature;
          },
          set: function (e) {
            this.uniforms.curvature = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "lineWidth", {
          get: function () {
            return this.uniforms.lineWidth;
          },
          set: function (e) {
            this.uniforms.lineWidth = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "lineContrast", {
          get: function () {
            return this.uniforms.lineContrast;
          },
          set: function (e) {
            this.uniforms.lineContrast = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "verticalLine", {
          get: function () {
            return this.uniforms.verticalLine;
          },
          set: function (e) {
            this.uniforms.verticalLine = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "noise", {
          get: function () {
            return this.uniforms.noise;
          },
          set: function (e) {
            this.uniforms.noise = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "noiseSize", {
          get: function () {
            return this.uniforms.noiseSize;
          },
          set: function (e) {
            this.uniforms.noiseSize = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "vignetting", {
          get: function () {
            return this.uniforms.vignetting;
          },
          set: function (e) {
            this.uniforms.vignetting = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "vignettingAlpha", {
          get: function () {
            return this.uniforms.vignettingAlpha;
          },
          set: function (e) {
            this.uniforms.vignettingAlpha = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "vignettingBlur", {
          get: function () {
            return this.uniforms.vignettingBlur;
          },
          set: function (e) {
            this.uniforms.vignettingBlur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = {
          curvature: 1,
          lineWidth: 1,
          lineContrast: 0.25,
          verticalLine: !1,
          noise: 0,
          noiseSize: 1,
          seed: 0,
          vignetting: 0.3,
          vignettingAlpha: 1,
          vignettingBlur: 0.3,
          time: 0,
        }),
        n
      );
    })(n.Filter),
    O = (function (e) {
      function n(n, t) {
        void 0 === n && (n = 1), void 0 === t && (t = 5);
        var r =
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",
          ) || this;
        return (r.scale = n), (r.angle = t), r;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "scale", {
          get: function () {
            return this.uniforms.scale;
          },
          set: function (e) {
            this.uniforms.scale = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "angle", {
          get: function () {
            return this.uniforms.angle;
          },
          set: function (e) {
            this.uniforms.angle = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    P = (function (e) {
      function i(o) {
        var l = e.call(this) || this;
        (l.angle = 45), (l._distance = 5), (l._resolution = r.settings.FILTER_RESOLUTION);
        var a = o ? f(f({}, i.defaults), o) : i.defaults,
          s = a.kernels,
          u = a.blur,
          m = a.quality,
          p = a.pixelSize,
          h = a.resolution;
        (l._tintFilter = new n.Filter(
          c,
          "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}",
        )),
          (l._tintFilter.uniforms.color = new Float32Array(4)),
          (l._tintFilter.uniforms.shift = new t.Point()),
          (l._tintFilter.resolution = h),
          (l._blurFilter = s ? new d(s) : new d(u, m)),
          (l.pixelSize = p),
          (l.resolution = h);
        var g = a.shadowOnly,
          v = a.rotation,
          y = a.distance,
          b = a.alpha,
          x = a.color;
        return (
          (l.shadowOnly = g), (l.rotation = v), (l.distance = y), (l.alpha = b), (l.color = x), l._updatePadding(), l
        );
      }
      return (
        u(i, e),
        (i.prototype.apply = function (e, n, t, r) {
          var o = e.getFilterTexture();
          this._tintFilter.apply(e, n, o, 1),
            this._blurFilter.apply(e, o, t, r),
            !0 !== this.shadowOnly && e.applyFilter(this, n, t, 0),
            e.returnFilterTexture(o);
        }),
        (i.prototype._updatePadding = function () {
          this.padding = this.distance + 2 * this.blur;
        }),
        (i.prototype._updateShift = function () {
          this._tintFilter.uniforms.shift.set(
            this.distance * Math.cos(this.angle),
            this.distance * Math.sin(this.angle),
          );
        }),
        Object.defineProperty(i.prototype, "resolution", {
          get: function () {
            return this._resolution;
          },
          set: function (e) {
            (this._resolution = e),
              this._tintFilter && (this._tintFilter.resolution = e),
              this._blurFilter && (this._blurFilter.resolution = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "distance", {
          get: function () {
            return this._distance;
          },
          set: function (e) {
            (this._distance = e), this._updatePadding(), this._updateShift();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "rotation", {
          get: function () {
            return this.angle / t.DEG_TO_RAD;
          },
          set: function (e) {
            (this.angle = e * t.DEG_TO_RAD), this._updateShift();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "alpha", {
          get: function () {
            return this._tintFilter.uniforms.alpha;
          },
          set: function (e) {
            this._tintFilter.uniforms.alpha = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "color", {
          get: function () {
            return o.rgb2hex(this._tintFilter.uniforms.color);
          },
          set: function (e) {
            o.hex2rgb(e, this._tintFilter.uniforms.color);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "kernels", {
          get: function () {
            return this._blurFilter.kernels;
          },
          set: function (e) {
            this._blurFilter.kernels = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "blur", {
          get: function () {
            return this._blurFilter.blur;
          },
          set: function (e) {
            (this._blurFilter.blur = e), this._updatePadding();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "quality", {
          get: function () {
            return this._blurFilter.quality;
          },
          set: function (e) {
            this._blurFilter.quality = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(i.prototype, "pixelSize", {
          get: function () {
            return this._blurFilter.pixelSize;
          },
          set: function (e) {
            this._blurFilter.pixelSize = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (i.defaults = {
          rotation: 45,
          distance: 5,
          color: 0,
          alpha: 0.5,
          shadowOnly: !1,
          kernels: null,
          blur: 2,
          quality: 3,
          pixelSize: 1,
          resolution: r.settings.FILTER_RESOLUTION,
        }),
        i
      );
    })(n.Filter),
    A = (function (e) {
      function n(n) {
        void 0 === n && (n = 5);
        var t =
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n",
          ) || this;
        return (t.strength = n), t;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "strength", {
          get: function () {
            return this.uniforms.strength;
          },
          set: function (e) {
            this.uniforms.strength = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    T = (function (e) {
      function r(t) {
        var o =
          e.call(
            this,
            c,
            "// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n",
          ) || this;
        return (
          (o.offset = 100),
          (o.fillMode = r.TRANSPARENT),
          (o.average = !1),
          (o.seed = 0),
          (o.minSize = 8),
          (o.sampleSize = 512),
          (o._slices = 0),
          (o._offsets = new Float32Array(1)),
          (o._sizes = new Float32Array(1)),
          (o._direction = -1),
          (o.uniforms.dimensions = new Float32Array(2)),
          (o._canvas = document.createElement("canvas")),
          (o._canvas.width = 4),
          (o._canvas.height = o.sampleSize),
          (o.texture = n.Texture.from(o._canvas, { scaleMode: i.SCALE_MODES.NEAREST })),
          Object.assign(o, r.defaults, t),
          o
        );
      }
      return (
        u(r, e),
        (r.prototype.apply = function (e, n, t, r) {
          var o = n.filterFrame,
            i = o.width,
            l = o.height;
          (this.uniforms.dimensions[0] = i),
            (this.uniforms.dimensions[1] = l),
            (this.uniforms.aspect = l / i),
            (this.uniforms.seed = this.seed),
            (this.uniforms.offset = this.offset),
            (this.uniforms.fillMode = this.fillMode),
            e.applyFilter(this, n, t, r);
        }),
        (r.prototype._randomizeSizes = function () {
          var e = this._sizes,
            n = this._slices - 1,
            t = this.sampleSize,
            r = Math.min(this.minSize / t, 0.9 / this._slices);
          if (this.average) {
            for (var o = this._slices, i = 1, l = 0; l < n; l++) {
              var a = i / (o - l),
                s = Math.max(a * (1 - 0.6 * Math.random()), r);
              (e[l] = s), (i -= s);
            }
            e[n] = i;
          } else {
            i = 1;
            var u = Math.sqrt(1 / this._slices);
            for (l = 0; l < n; l++) {
              s = Math.max(u * i * Math.random(), r);
              (e[l] = s), (i -= s);
            }
            e[n] = i;
          }
          this.shuffle();
        }),
        (r.prototype.shuffle = function () {
          for (var e = this._sizes, n = this._slices - 1; n > 0; n--) {
            var t = (Math.random() * n) >> 0,
              r = e[n];
            (e[n] = e[t]), (e[t] = r);
          }
        }),
        (r.prototype._randomizeOffsets = function () {
          for (var e = 0; e < this._slices; e++) this._offsets[e] = Math.random() * (Math.random() < 0.5 ? -1 : 1);
        }),
        (r.prototype.refresh = function () {
          this._randomizeSizes(), this._randomizeOffsets(), this.redraw();
        }),
        (r.prototype.redraw = function () {
          var e,
            n = this.sampleSize,
            t = this.texture,
            r = this._canvas.getContext("2d");
          r.clearRect(0, 0, 8, n);
          for (var o = 0, i = 0; i < this._slices; i++) {
            e = Math.floor(256 * this._offsets[i]);
            var l = this._sizes[i] * n,
              a = e > 0 ? e : 0,
              s = e < 0 ? -e : 0;
            (r.fillStyle = "rgba(" + a + ", " + s + ", 0, 1)"), r.fillRect(0, o >> 0, n, (l + 1) >> 0), (o += l);
          }
          t.baseTexture.update(), (this.uniforms.displacementMap = t);
        }),
        Object.defineProperty(r.prototype, "sizes", {
          get: function () {
            return this._sizes;
          },
          set: function (e) {
            for (var n = Math.min(this._slices, e.length), t = 0; t < n; t++) this._sizes[t] = e[t];
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(r.prototype, "offsets", {
          get: function () {
            return this._offsets;
          },
          set: function (e) {
            for (var n = Math.min(this._slices, e.length), t = 0; t < n; t++) this._offsets[t] = e[t];
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(r.prototype, "slices", {
          get: function () {
            return this._slices;
          },
          set: function (e) {
            this._slices !== e &&
              ((this._slices = e),
              (this.uniforms.slices = e),
              (this._sizes = this.uniforms.slicesWidth = new Float32Array(e)),
              (this._offsets = this.uniforms.slicesOffset = new Float32Array(e)),
              this.refresh());
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(r.prototype, "direction", {
          get: function () {
            return this._direction;
          },
          set: function (e) {
            if (this._direction !== e) {
              this._direction = e;
              var n = e * t.DEG_TO_RAD;
              (this.uniforms.sinDir = Math.sin(n)), (this.uniforms.cosDir = Math.cos(n));
            }
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(r.prototype, "red", {
          get: function () {
            return this.uniforms.red;
          },
          set: function (e) {
            this.uniforms.red = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(r.prototype, "green", {
          get: function () {
            return this.uniforms.green;
          },
          set: function (e) {
            this.uniforms.green = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(r.prototype, "blue", {
          get: function () {
            return this.uniforms.blue;
          },
          set: function (e) {
            this.uniforms.blue = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (r.prototype.destroy = function () {
          var e;
          null === (e = this.texture) || void 0 === e || e.destroy(!0),
            (this.texture = this._canvas = this.red = this.green = this.blue = this._sizes = this._offsets = null);
        }),
        (r.defaults = {
          slices: 5,
          offset: 100,
          direction: 0,
          fillMode: 0,
          average: !1,
          seed: 0,
          red: [0, 0],
          green: [0, 0],
          blue: [0, 0],
          minSize: 8,
          sampleSize: 512,
        }),
        (r.TRANSPARENT = 0),
        (r.ORIGINAL = 1),
        (r.LOOP = 2),
        (r.CLAMP = 3),
        (r.MIRROR = 4),
        r
      );
    })(n.Filter),
    w = (function (e) {
      function n(t) {
        var r = this,
          o = Object.assign({}, n.defaults, t),
          i = o.outerStrength,
          l = o.innerStrength,
          a = o.color,
          s = o.knockout,
          u = o.quality,
          f = Math.round(o.distance);
        return (
          ((r =
            e.call(
              this,
              c,
              "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n"
                .replace(/__ANGLE_STEP_SIZE__/gi, "" + (1 / u / f).toFixed(7))
                .replace(/__DIST__/gi, f.toFixed(0) + ".0"),
            ) || this).uniforms.glowColor = new Float32Array([0, 0, 0, 1])),
          Object.assign(r, { color: a, outerStrength: i, innerStrength: l, padding: f, knockout: s }),
          r
        );
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "color", {
          get: function () {
            return o.rgb2hex(this.uniforms.glowColor);
          },
          set: function (e) {
            o.hex2rgb(e, this.uniforms.glowColor);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "outerStrength", {
          get: function () {
            return this.uniforms.outerStrength;
          },
          set: function (e) {
            this.uniforms.outerStrength = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "innerStrength", {
          get: function () {
            return this.uniforms.innerStrength;
          },
          set: function (e) {
            this.uniforms.innerStrength = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "knockout", {
          get: function () {
            return this.uniforms.knockout;
          },
          set: function (e) {
            this.uniforms.knockout = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = {
          distance: 10,
          outerStrength: 4,
          innerStrength: 0,
          color: 16777215,
          quality: 0.1,
          knockout: !1,
        }),
        n
      );
    })(n.Filter),
    D = (function (e) {
      function n(r) {
        var o =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float alpha;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    // apply user alpha\n    mist *= alpha;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n\n}\n".replace(
              "${perlin}",
              "vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",
            ),
          ) || this;
        (o.parallel = !0), (o.time = 0), (o._angle = 0), (o.uniforms.dimensions = new Float32Array(2));
        var i = Object.assign(n.defaults, r);
        return (
          (o._angleLight = new t.Point()),
          (o.angle = i.angle),
          (o.gain = i.gain),
          (o.lacunarity = i.lacunarity),
          (o.alpha = i.alpha),
          (o.parallel = i.parallel),
          (o.center = i.center),
          (o.time = i.time),
          o
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o = n.filterFrame,
            i = o.width,
            l = o.height;
          (this.uniforms.light = this.parallel ? this._angleLight : this.center),
            (this.uniforms.parallel = this.parallel),
            (this.uniforms.dimensions[0] = i),
            (this.uniforms.dimensions[1] = l),
            (this.uniforms.aspect = l / i),
            (this.uniforms.time = this.time),
            (this.uniforms.alpha = this.alpha),
            e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "angle", {
          get: function () {
            return this._angle;
          },
          set: function (e) {
            this._angle = e;
            var n = e * t.DEG_TO_RAD;
            (this._angleLight.x = Math.cos(n)), (this._angleLight.y = Math.sin(n));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "gain", {
          get: function () {
            return this.uniforms.gain;
          },
          set: function (e) {
            this.uniforms.gain = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "lacunarity", {
          get: function () {
            return this.uniforms.lacunarity;
          },
          set: function (e) {
            this.uniforms.lacunarity = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "alpha", {
          get: function () {
            return this.uniforms.alpha;
          },
          set: function (e) {
            this.uniforms.alpha = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = { angle: 30, gain: 0.5, lacunarity: 2.5, time: 0, parallel: !0, center: [0, 0], alpha: 1 }),
        n
      );
    })(n.Filter),
    j = (function (e) {
      function n(n, r, o) {
        void 0 === n && (n = [0, 0]), void 0 === r && (r = 5), void 0 === o && (o = 0);
        var i =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n",
          ) || this;
        return (
          (i.kernelSize = 5),
          (i.uniforms.uVelocity = new Float32Array(2)),
          (i._velocity = new t.ObservablePoint(i.velocityChanged, i)),
          i.setVelocity(n),
          (i.kernelSize = r),
          (i.offset = o),
          i
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o = this.velocity,
            i = o.x,
            l = o.y;
          (this.uniforms.uKernelSize = 0 !== i || 0 !== l ? this.kernelSize : 0), e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "velocity", {
          get: function () {
            return this._velocity;
          },
          set: function (e) {
            this.setVelocity(e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.prototype.setVelocity = function (e) {
          if (Array.isArray(e)) {
            var n = e[0],
              t = e[1];
            this._velocity.set(n, t);
          } else this._velocity.copyFrom(e);
        }),
        (n.prototype.velocityChanged = function () {
          (this.uniforms.uVelocity[0] = this._velocity.x),
            (this.uniforms.uVelocity[1] = this._velocity.y),
            (this.padding = 1 + (Math.max(Math.abs(this._velocity.x), Math.abs(this._velocity.y)) >> 0));
        }),
        Object.defineProperty(n.prototype, "offset", {
          get: function () {
            return this.uniforms.uOffset;
          },
          set: function (e) {
            this.uniforms.uOffset = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    M = (function (e) {
      function n(n, t, r) {
        void 0 === t && (t = 0.05), void 0 === r && (r = n.length);
        var o =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n".replace(
              /%maxColors%/g,
              r.toFixed(0),
            ),
          ) || this;
        return (
          (o._replacements = []),
          (o._maxColors = 0),
          (o.epsilon = t),
          (o._maxColors = r),
          (o.uniforms.originalColors = new Float32Array(3 * r)),
          (o.uniforms.targetColors = new Float32Array(3 * r)),
          (o.replacements = n),
          o
        );
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "replacements", {
          get: function () {
            return this._replacements;
          },
          set: function (e) {
            var n = this.uniforms.originalColors,
              t = this.uniforms.targetColors,
              r = e.length;
            if (r > this._maxColors)
              throw new Error(
                "Length of replacements (" + r + ") exceeds the maximum colors length (" + this._maxColors + ")",
              );
            n[3 * r] = -1;
            for (var i = 0; i < r; i++) {
              var l = e[i],
                a = l[0];
              "number" == typeof a ? (a = o.hex2rgb(a)) : (l[0] = o.rgb2hex(a)),
                (n[3 * i] = a[0]),
                (n[3 * i + 1] = a[1]),
                (n[3 * i + 2] = a[2]);
              var s = l[1];
              "number" == typeof s ? (s = o.hex2rgb(s)) : (l[1] = o.rgb2hex(s)),
                (t[3 * i] = s[0]),
                (t[3 * i + 1] = s[1]),
                (t[3 * i + 2] = s[2]);
            }
            this._replacements = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.prototype.refresh = function () {
          this.replacements = this._replacements;
        }),
        Object.defineProperty(n.prototype, "maxColors", {
          get: function () {
            return this._maxColors;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "epsilon", {
          get: function () {
            return this.uniforms.epsilon;
          },
          set: function (e) {
            this.uniforms.epsilon = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    R = (function (e) {
      function n(t, r) {
        void 0 === r && (r = 0);
        var o =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n",
          ) || this;
        return (
          (o.seed = 0),
          (o.uniforms.dimensions = new Float32Array(2)),
          "number" == typeof t ? ((o.seed = t), (t = void 0)) : (o.seed = r),
          Object.assign(o, n.defaults, t),
          o
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o, i;
          (this.uniforms.dimensions[0] = null === (o = n.filterFrame) || void 0 === o ? void 0 : o.width),
            (this.uniforms.dimensions[1] = null === (i = n.filterFrame) || void 0 === i ? void 0 : i.height),
            (this.uniforms.seed = this.seed),
            e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "sepia", {
          get: function () {
            return this.uniforms.sepia;
          },
          set: function (e) {
            this.uniforms.sepia = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "noise", {
          get: function () {
            return this.uniforms.noise;
          },
          set: function (e) {
            this.uniforms.noise = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "noiseSize", {
          get: function () {
            return this.uniforms.noiseSize;
          },
          set: function (e) {
            this.uniforms.noiseSize = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "scratch", {
          get: function () {
            return this.uniforms.scratch;
          },
          set: function (e) {
            this.uniforms.scratch = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "scratchDensity", {
          get: function () {
            return this.uniforms.scratchDensity;
          },
          set: function (e) {
            this.uniforms.scratchDensity = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "scratchWidth", {
          get: function () {
            return this.uniforms.scratchWidth;
          },
          set: function (e) {
            this.uniforms.scratchWidth = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "vignetting", {
          get: function () {
            return this.uniforms.vignetting;
          },
          set: function (e) {
            this.uniforms.vignetting = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "vignettingAlpha", {
          get: function () {
            return this.uniforms.vignettingAlpha;
          },
          set: function (e) {
            this.uniforms.vignettingAlpha = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "vignettingBlur", {
          get: function () {
            return this.uniforms.vignettingBlur;
          },
          set: function (e) {
            this.uniforms.vignettingBlur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = {
          sepia: 0.3,
          noise: 0.3,
          noiseSize: 1,
          scratch: 0.5,
          scratchDensity: 0.3,
          scratchWidth: 1,
          vignetting: 0.3,
          vignettingAlpha: 1,
          vignettingBlur: 0.3,
        }),
        n
      );
    })(n.Filter),
    E = (function (e) {
      function n(t, r, o) {
        void 0 === t && (t = 1), void 0 === r && (r = 0), void 0 === o && (o = 0.1);
        var i =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n".replace(
              /\$\{angleStep\}/,
              n.getAngleStep(o),
            ),
          ) || this;
        return (
          (i._thickness = 1),
          (i.uniforms.thickness = new Float32Array([0, 0])),
          (i.uniforms.outlineColor = new Float32Array([0, 0, 0, 1])),
          Object.assign(i, { thickness: t, color: r, quality: o }),
          i
        );
      }
      return (
        u(n, e),
        (n.getAngleStep = function (e) {
          var t = Math.max(e * n.MAX_SAMPLES, n.MIN_SAMPLES);
          return ((2 * Math.PI) / t).toFixed(7);
        }),
        (n.prototype.apply = function (e, n, t, r) {
          (this.uniforms.thickness[0] = this._thickness / n._frame.width),
            (this.uniforms.thickness[1] = this._thickness / n._frame.height),
            e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "color", {
          get: function () {
            return o.rgb2hex(this.uniforms.outlineColor);
          },
          set: function (e) {
            o.hex2rgb(e, this.uniforms.outlineColor);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "thickness", {
          get: function () {
            return this._thickness;
          },
          set: function (e) {
            (this._thickness = e), (this.padding = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.MIN_SAMPLES = 1),
        (n.MAX_SAMPLES = 100),
        n
      );
    })(n.Filter),
    I = (function (e) {
      function n(n) {
        void 0 === n && (n = 10);
        var t =
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n",
          ) || this;
        return (t.size = n), t;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "size", {
          get: function () {
            return this.uniforms.size;
          },
          set: function (e) {
            "number" == typeof e && (e = [e, e]), (this.uniforms.size = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    k = (function (e) {
      function n(n, t, r, o) {
        void 0 === n && (n = 0), void 0 === t && (t = [0, 0]), void 0 === r && (r = 5), void 0 === o && (o = -1);
        var i =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n",
          ) || this;
        return (i._angle = 0), (i.angle = n), (i.center = t), (i.kernelSize = r), (i.radius = o), i;
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          (this.uniforms.uKernelSize = 0 !== this._angle ? this.kernelSize : 0), e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "angle", {
          get: function () {
            return this._angle;
          },
          set: function (e) {
            (this._angle = e), (this.uniforms.uRadian = (e * Math.PI) / 180);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "center", {
          get: function () {
            return this.uniforms.uCenter;
          },
          set: function (e) {
            this.uniforms.uCenter = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "radius", {
          get: function () {
            return this.uniforms.uRadius;
          },
          set: function (e) {
            (e < 0 || e === 1 / 0) && (e = -1), (this.uniforms.uRadius = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    L = (function (e) {
      function n(t) {
        var r =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n",
          ) || this;
        return (
          (r.time = 0),
          (r.uniforms.amplitude = new Float32Array(2)),
          (r.uniforms.waveLength = new Float32Array(2)),
          (r.uniforms.alpha = new Float32Array(2)),
          (r.uniforms.dimensions = new Float32Array(2)),
          Object.assign(r, n.defaults, t),
          r
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o, i;
          (this.uniforms.dimensions[0] = null === (o = n.filterFrame) || void 0 === o ? void 0 : o.width),
            (this.uniforms.dimensions[1] = null === (i = n.filterFrame) || void 0 === i ? void 0 : i.height),
            (this.uniforms.time = this.time),
            e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "mirror", {
          get: function () {
            return this.uniforms.mirror;
          },
          set: function (e) {
            this.uniforms.mirror = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "boundary", {
          get: function () {
            return this.uniforms.boundary;
          },
          set: function (e) {
            this.uniforms.boundary = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "amplitude", {
          get: function () {
            return this.uniforms.amplitude;
          },
          set: function (e) {
            (this.uniforms.amplitude[0] = e[0]), (this.uniforms.amplitude[1] = e[1]);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "waveLength", {
          get: function () {
            return this.uniforms.waveLength;
          },
          set: function (e) {
            (this.uniforms.waveLength[0] = e[0]), (this.uniforms.waveLength[1] = e[1]);
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "alpha", {
          get: function () {
            return this.uniforms.alpha;
          },
          set: function (e) {
            (this.uniforms.alpha[0] = e[0]), (this.uniforms.alpha[1] = e[1]);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = { mirror: !0, boundary: 0.5, amplitude: [0, 20], waveLength: [30, 100], alpha: [1, 1], time: 0 }),
        n
      );
    })(n.Filter),
    N = (function (e) {
      function n(n, t, r) {
        void 0 === n && (n = [-10, 0]), void 0 === t && (t = [0, 10]), void 0 === r && (r = [0, 0]);
        var o =
          e.call(
            this,
            c,
            "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",
          ) || this;
        return (o.red = n), (o.green = t), (o.blue = r), o;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "red", {
          get: function () {
            return this.uniforms.red;
          },
          set: function (e) {
            this.uniforms.red = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "green", {
          get: function () {
            return this.uniforms.green;
          },
          set: function (e) {
            this.uniforms.green = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "blue", {
          get: function () {
            return this.uniforms.blue;
          },
          set: function (e) {
            this.uniforms.blue = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    X = (function (e) {
      function n(t, r, o) {
        void 0 === t && (t = [0, 0]), void 0 === o && (o = 0);
        var i =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n",
          ) || this;
        return (i.center = t), Object.assign(i, n.defaults, r), (i.time = o), i;
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          (this.uniforms.time = this.time), e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "center", {
          get: function () {
            return this.uniforms.center;
          },
          set: function (e) {
            this.uniforms.center = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "amplitude", {
          get: function () {
            return this.uniforms.amplitude;
          },
          set: function (e) {
            this.uniforms.amplitude = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "wavelength", {
          get: function () {
            return this.uniforms.wavelength;
          },
          set: function (e) {
            this.uniforms.wavelength = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "brightness", {
          get: function () {
            return this.uniforms.brightness;
          },
          set: function (e) {
            this.uniforms.brightness = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "speed", {
          get: function () {
            return this.uniforms.speed;
          },
          set: function (e) {
            this.uniforms.speed = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "radius", {
          get: function () {
            return this.uniforms.radius;
          },
          set: function (e) {
            this.uniforms.radius = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = { amplitude: 30, wavelength: 160, brightness: 1, speed: 500, radius: -1 }),
        n
      );
    })(n.Filter),
    B = (function (e) {
      function n(n, t, r) {
        void 0 === t && (t = 0), void 0 === r && (r = 1);
        var o =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n",
          ) || this;
        return (
          (o._color = 0),
          (o.uniforms.dimensions = new Float32Array(2)),
          (o.uniforms.ambientColor = new Float32Array([0, 0, 0, r])),
          (o.texture = n),
          (o.color = t),
          o
        );
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o, i;
          (this.uniforms.dimensions[0] = null === (o = n.filterFrame) || void 0 === o ? void 0 : o.width),
            (this.uniforms.dimensions[1] = null === (i = n.filterFrame) || void 0 === i ? void 0 : i.height),
            e.applyFilter(this, n, t, r);
        }),
        Object.defineProperty(n.prototype, "texture", {
          get: function () {
            return this.uniforms.uLightmap;
          },
          set: function (e) {
            this.uniforms.uLightmap = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "color", {
          get: function () {
            return this._color;
          },
          set: function (e) {
            var n = this.uniforms.ambientColor;
            "number" == typeof e
              ? (o.hex2rgb(e, n), (this._color = e))
              : ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (n[3] = e[3]), (this._color = o.rgb2hex(n)));
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "alpha", {
          get: function () {
            return this.uniforms.ambientColor[3];
          },
          set: function (e) {
            this.uniforms.ambientColor[3] = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    G = (function (e) {
      function n(n, r, o, i) {
        void 0 === n && (n = 100), void 0 === r && (r = 600);
        var l =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",
          ) || this;
        return (
          (l.uniforms.blur = n),
          (l.uniforms.gradientBlur = r),
          (l.uniforms.start = o || new t.Point(0, window.innerHeight / 2)),
          (l.uniforms.end = i || new t.Point(600, window.innerHeight / 2)),
          (l.uniforms.delta = new t.Point(30, 30)),
          (l.uniforms.texSize = new t.Point(window.innerWidth, window.innerHeight)),
          l.updateDelta(),
          l
        );
      }
      return (
        u(n, e),
        (n.prototype.updateDelta = function () {
          (this.uniforms.delta.x = 0), (this.uniforms.delta.y = 0);
        }),
        Object.defineProperty(n.prototype, "blur", {
          get: function () {
            return this.uniforms.blur;
          },
          set: function (e) {
            this.uniforms.blur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "gradientBlur", {
          get: function () {
            return this.uniforms.gradientBlur;
          },
          set: function (e) {
            this.uniforms.gradientBlur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "start", {
          get: function () {
            return this.uniforms.start;
          },
          set: function (e) {
            (this.uniforms.start = e), this.updateDelta();
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "end", {
          get: function () {
            return this.uniforms.end;
          },
          set: function (e) {
            (this.uniforms.end = e), this.updateDelta();
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    K = (function (e) {
      function n() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        u(n, e),
        (n.prototype.updateDelta = function () {
          var e = this.uniforms.end.x - this.uniforms.start.x,
            n = this.uniforms.end.y - this.uniforms.start.y,
            t = Math.sqrt(e * e + n * n);
          (this.uniforms.delta.x = e / t), (this.uniforms.delta.y = n / t);
        }),
        n
      );
    })(G),
    q = (function (e) {
      function n() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        u(n, e),
        (n.prototype.updateDelta = function () {
          var e = this.uniforms.end.x - this.uniforms.start.x,
            n = this.uniforms.end.y - this.uniforms.start.y,
            t = Math.sqrt(e * e + n * n);
          (this.uniforms.delta.x = -n / t), (this.uniforms.delta.y = e / t);
        }),
        n
      );
    })(G),
    W = (function (e) {
      function n(n, t, r, o) {
        void 0 === n && (n = 100), void 0 === t && (t = 600);
        var i = e.call(this) || this;
        return (i.tiltShiftXFilter = new K(n, t, r, o)), (i.tiltShiftYFilter = new q(n, t, r, o)), i;
      }
      return (
        u(n, e),
        (n.prototype.apply = function (e, n, t, r) {
          var o = e.getFilterTexture();
          this.tiltShiftXFilter.apply(e, n, o, 1), this.tiltShiftYFilter.apply(e, o, t, r), e.returnFilterTexture(o);
        }),
        Object.defineProperty(n.prototype, "blur", {
          get: function () {
            return this.tiltShiftXFilter.blur;
          },
          set: function (e) {
            this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "gradientBlur", {
          get: function () {
            return this.tiltShiftXFilter.gradientBlur;
          },
          set: function (e) {
            this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "start", {
          get: function () {
            return this.tiltShiftXFilter.start;
          },
          set: function (e) {
            this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "end", {
          get: function () {
            return this.tiltShiftXFilter.end;
          },
          set: function (e) {
            this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        n
      );
    })(n.Filter),
    Y = (function (e) {
      function n(t) {
        var r =
          e.call(
            this,
            c,
            "varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n",
          ) || this;
        return Object.assign(r, n.defaults, t), r;
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "offset", {
          get: function () {
            return this.uniforms.offset;
          },
          set: function (e) {
            this.uniforms.offset = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "radius", {
          get: function () {
            return this.uniforms.radius;
          },
          set: function (e) {
            this.uniforms.radius = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "angle", {
          get: function () {
            return this.uniforms.angle;
          },
          set: function (e) {
            this.uniforms.angle = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = { radius: 200, angle: 4, padding: 20, offset: new t.Point() }),
        n
      );
    })(n.Filter),
    Z = (function (e) {
      function n(t) {
        var r,
          o = Object.assign(n.defaults, t),
          i = o.maxKernelSize,
          l = (function (e, n) {
            var t = {};
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && n.indexOf(r) < 0 && (t[r] = e[r]);
            if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
              var o = 0;
              for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
                n.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (t[r[o]] = e[r[o]]);
            }
            return t;
          })(o, ["maxKernelSize"]);
        return (
          (r =
            e.call(
              this,
              c,
              "varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = ${maxKernelSize};\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n".replace(
                "${maxKernelSize}",
                i.toFixed(1),
              ),
            ) || this),
          Object.assign(r, l),
          r
        );
      }
      return (
        u(n, e),
        Object.defineProperty(n.prototype, "center", {
          get: function () {
            return this.uniforms.uCenter;
          },
          set: function (e) {
            this.uniforms.uCenter = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "strength", {
          get: function () {
            return this.uniforms.uStrength;
          },
          set: function (e) {
            this.uniforms.uStrength = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "innerRadius", {
          get: function () {
            return this.uniforms.uInnerRadius;
          },
          set: function (e) {
            this.uniforms.uInnerRadius = e;
          },
          enumerable: !1,
          configurable: !0,
        }),
        Object.defineProperty(n.prototype, "radius", {
          get: function () {
            return this.uniforms.uRadius;
          },
          set: function (e) {
            (e < 0 || e === 1 / 0) && (e = -1), (this.uniforms.uRadius = e);
          },
          enumerable: !1,
          configurable: !0,
        }),
        (n.defaults = { strength: 0.1, center: [0, 0], innerRadius: 0, radius: -1, maxKernelSize: 32 }),
        n
      );
    })(n.Filter);
  return (
    (e.AdjustmentFilter = m),
    (e.AdvancedBloomFilter = h),
    (e.AsciiFilter = g),
    (e.BevelFilter = v),
    (e.BloomFilter = y),
    (e.BulgePinchFilter = b),
    (e.CRTFilter = z),
    (e.ColorMapFilter = x),
    (e.ColorOverlayFilter = _),
    (e.ColorReplaceFilter = C),
    (e.ConvolutionFilter = S),
    (e.CrossHatchFilter = F),
    (e.DotFilter = O),
    (e.DropShadowFilter = P),
    (e.EmbossFilter = A),
    (e.GlitchFilter = T),
    (e.GlowFilter = w),
    (e.GodrayFilter = D),
    (e.KawaseBlurFilter = d),
    (e.MotionBlurFilter = j),
    (e.MultiColorReplaceFilter = M),
    (e.OldFilmFilter = R),
    (e.OutlineFilter = E),
    (e.PixelateFilter = I),
    (e.RGBSplitFilter = N),
    (e.RadialBlurFilter = k),
    (e.ReflectionFilter = L),
    (e.ShockwaveFilter = X),
    (e.SimpleLightmapFilter = B),
    (e.TiltShiftAxisFilter = G),
    (e.TiltShiftFilter = W),
    (e.TiltShiftXFilter = K),
    (e.TiltShiftYFilter = q),
    (e.TwistFilter = Y),
    (e.ZoomBlurFilter = Z),
    Object.defineProperty(e, "__esModule", { value: !0 }),
    e
  );
})({}, PIXI, PIXI, PIXI, PIXI.utils, PIXI, PIXI.filters, PIXI.filters);
Object.assign(PIXI.filters, __filters);
//# sourceMappingURL=pixi-filters.js.map
