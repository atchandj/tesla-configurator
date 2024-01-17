var qE = Object.defineProperty,
  WE = Object.defineProperties;
var GE = Object.getOwnPropertyDescriptors;
var oa = Object.getOwnPropertySymbols;
var Zm = Object.prototype.hasOwnProperty,
  Km = Object.prototype.propertyIsEnumerable;
var Qm = (t, e, i) =>
    e in t
      ? qE(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  C = (t, e) => {
    for (var i in (e ||= {})) Zm.call(e, i) && Qm(t, i, e[i]);
    if (oa) for (var i of oa(e)) Km.call(e, i) && Qm(t, i, e[i]);
    return t;
  },
  ae = (t, e) => WE(t, GE(e));
var sa = (t, e) => {
  var i = {};
  for (var n in t) Zm.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
  if (t != null && oa)
    for (var n of oa(t)) e.indexOf(n) < 0 && Km.call(t, n) && (i[n] = t[n]);
  return i;
};
var vt = (t, e, i) =>
  new Promise((n, r) => {
    var o = (l) => {
        try {
          a(i.next(l));
        } catch (c) {
          r(c);
        }
      },
      s = (l) => {
        try {
          a(i.throw(l));
        } catch (c) {
          r(c);
        }
      },
      a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
    a((i = i.apply(t, e)).next());
  });
var Xm = null;
var qd = 1;
function Qe(t) {
  let e = Xm;
  return (Xm = t), e;
}
var Jm = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function YE(t) {
  if (!(Yd(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === qd)) {
    if (!t.producerMustRecompute(t) && !Wd(t)) {
      (t.dirty = !1), (t.lastCleanEpoch = qd);
      return;
    }
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = qd);
  }
}
function eg(t) {
  return t && (t.nextProducerIndex = 0), Qe(t);
}
function tg(t, e) {
  if (
    (Qe(e),
    !(
      !t ||
      t.producerNode === void 0 ||
      t.producerIndexOfThis === void 0 ||
      t.producerLastReadVersion === void 0
    ))
  ) {
    if (Yd(t))
      for (let i = t.nextProducerIndex; i < t.producerNode.length; i++)
        Gd(t.producerNode[i], t.producerIndexOfThis[i]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function Wd(t) {
  aa(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let i = t.producerNode[e],
      n = t.producerLastReadVersion[e];
    if (n !== i.version || (YE(i), n !== i.version)) return !0;
  }
  return !1;
}
function ng(t) {
  if ((aa(t), Yd(t)))
    for (let e = 0; e < t.producerNode.length; e++)
      Gd(t.producerNode[e], t.producerIndexOfThis[e]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function Gd(t, e) {
  if ((QE(t), aa(t), t.liveConsumerNode.length === 1))
    for (let n = 0; n < t.producerNode.length; n++)
      Gd(t.producerNode[n], t.producerIndexOfThis[n]);
  let i = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[e] = t.liveConsumerNode[i]),
    (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[i]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    e < t.liveConsumerNode.length)
  ) {
    let n = t.liveConsumerIndexOfThis[e],
      r = t.liveConsumerNode[e];
    aa(r), (r.producerIndexOfThis[n] = e);
  }
}
function Yd(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function aa(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function QE(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function ZE() {
  throw new Error();
}
var KE = ZE;
function ig(t) {
  KE = t;
}
function L(t) {
  return typeof t == "function";
}
function dr(t) {
  let i = t((n) => {
    Error.call(n), (n.stack = new Error().stack);
  });
  return (
    (i.prototype = Object.create(Error.prototype)),
    (i.prototype.constructor = i),
    i
  );
}
var la = dr(
  (t) =>
    function (i) {
      t(this),
        (this.message = i
          ? `${i.length} errors occurred during unsubscription:
${i.map((n, r) => `${r + 1}) ${n.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = i);
    }
);
function mi(t, e) {
  if (t) {
    let i = t.indexOf(e);
    0 <= i && t.splice(i, 1);
  }
}
var ce = class t {
  constructor(e) {
    (this.initialTeardown = e),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let e;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: i } = this;
      if (i)
        if (((this._parentage = null), Array.isArray(i)))
          for (let o of i) o.remove(this);
        else i.remove(this);
      let { initialTeardown: n } = this;
      if (L(n))
        try {
          n();
        } catch (o) {
          e = o instanceof la ? o.errors : [o];
        }
      let { _finalizers: r } = this;
      if (r) {
        this._finalizers = null;
        for (let o of r)
          try {
            rg(o);
          } catch (s) {
            (e = e ?? []),
              s instanceof la ? (e = [...e, ...s.errors]) : e.push(s);
          }
      }
      if (e) throw new la(e);
    }
  }
  add(e) {
    var i;
    if (e && e !== this)
      if (this.closed) rg(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this)) return;
          e._addParent(this);
        }
        (this._finalizers =
          (i = this._finalizers) !== null && i !== void 0 ? i : []).push(e);
      }
  }
  _hasParent(e) {
    let { _parentage: i } = this;
    return i === e || (Array.isArray(i) && i.includes(e));
  }
  _addParent(e) {
    let { _parentage: i } = this;
    this._parentage = Array.isArray(i) ? (i.push(e), i) : i ? [i, e] : e;
  }
  _removeParent(e) {
    let { _parentage: i } = this;
    i === e ? (this._parentage = null) : Array.isArray(i) && mi(i, e);
  }
  remove(e) {
    let { _finalizers: i } = this;
    i && mi(i, e), e instanceof t && e._removeParent(this);
  }
};
ce.EMPTY = (() => {
  let t = new ce();
  return (t.closed = !0), t;
})();
var Qd = ce.EMPTY;
function ca(t) {
  return (
    t instanceof ce ||
    (t && "closed" in t && L(t.remove) && L(t.add) && L(t.unsubscribe))
  );
}
function rg(t) {
  L(t) ? t() : t.unsubscribe();
}
var Pt = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var ur = {
  setTimeout(t, e, ...i) {
    let { delegate: n } = ur;
    return n?.setTimeout ? n.setTimeout(t, e, ...i) : setTimeout(t, e, ...i);
  },
  clearTimeout(t) {
    let { delegate: e } = ur;
    return (e?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0,
};
function da(t) {
  ur.setTimeout(() => {
    let { onUnhandledError: e } = Pt;
    if (e) e(t);
    else throw t;
  });
}
function Io() {}
var og = (() => Zd("C", void 0, void 0))();
function sg(t) {
  return Zd("E", void 0, t);
}
function ag(t) {
  return Zd("N", t, void 0);
}
function Zd(t, e, i) {
  return { kind: t, value: e, error: i };
}
var gi = null;
function fr(t) {
  if (Pt.useDeprecatedSynchronousErrorHandling) {
    let e = !gi;
    if ((e && (gi = { errorThrown: !1, error: null }), t(), e)) {
      let { errorThrown: i, error: n } = gi;
      if (((gi = null), i)) throw n;
    }
  } else t();
}
function lg(t) {
  Pt.useDeprecatedSynchronousErrorHandling &&
    gi &&
    ((gi.errorThrown = !0), (gi.error = t));
}
var bi = class extends ce {
    constructor(e) {
      super(),
        (this.isStopped = !1),
        e
          ? ((this.destination = e), ca(e) && e.add(this))
          : (this.destination = eC);
    }
    static create(e, i, n) {
      return new xn(e, i, n);
    }
    next(e) {
      this.isStopped ? Xd(ag(e), this) : this._next(e);
    }
    error(e) {
      this.isStopped
        ? Xd(sg(e), this)
        : ((this.isStopped = !0), this._error(e));
    }
    complete() {
      this.isStopped ? Xd(og, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(e) {
      this.destination.next(e);
    }
    _error(e) {
      try {
        this.destination.error(e);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  XE = Function.prototype.bind;
function Kd(t, e) {
  return XE.call(t, e);
}
var Jd = class {
    constructor(e) {
      this.partialObserver = e;
    }
    next(e) {
      let { partialObserver: i } = this;
      if (i.next)
        try {
          i.next(e);
        } catch (n) {
          ua(n);
        }
    }
    error(e) {
      let { partialObserver: i } = this;
      if (i.error)
        try {
          i.error(e);
        } catch (n) {
          ua(n);
        }
      else ua(e);
    }
    complete() {
      let { partialObserver: e } = this;
      if (e.complete)
        try {
          e.complete();
        } catch (i) {
          ua(i);
        }
    }
  },
  xn = class extends bi {
    constructor(e, i, n) {
      super();
      let r;
      if (L(e) || !e)
        r = { next: e ?? void 0, error: i ?? void 0, complete: n ?? void 0 };
      else {
        let o;
        this && Pt.useDeprecatedNextContext
          ? ((o = Object.create(e)),
            (o.unsubscribe = () => this.unsubscribe()),
            (r = {
              next: e.next && Kd(e.next, o),
              error: e.error && Kd(e.error, o),
              complete: e.complete && Kd(e.complete, o),
            }))
          : (r = e);
      }
      this.destination = new Jd(r);
    }
  };
function ua(t) {
  Pt.useDeprecatedSynchronousErrorHandling ? lg(t) : da(t);
}
function JE(t) {
  throw t;
}
function Xd(t, e) {
  let { onStoppedNotification: i } = Pt;
  i && ur.setTimeout(() => i(t, e));
}
var eC = { closed: !0, next: Io, error: JE, complete: Io };
var hr = (() =>
  (typeof Symbol == "function" && Symbol.observable) || "@@observable")();
function it(t) {
  return t;
}
function eu(...t) {
  return tu(t);
}
function tu(t) {
  return t.length === 0
    ? it
    : t.length === 1
    ? t[0]
    : function (i) {
        return t.reduce((n, r) => r(n), i);
      };
}
var U = (() => {
  class t {
    constructor(i) {
      i && (this._subscribe = i);
    }
    lift(i) {
      let n = new t();
      return (n.source = this), (n.operator = i), n;
    }
    subscribe(i, n, r) {
      let o = nC(i) ? i : new xn(i, n, r);
      return (
        fr(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(i) {
      try {
        return this._subscribe(i);
      } catch (n) {
        i.error(n);
      }
    }
    forEach(i, n) {
      return (
        (n = cg(n)),
        new n((r, o) => {
          let s = new xn({
            next: (a) => {
              try {
                i(a);
              } catch (l) {
                o(l), s.unsubscribe();
              }
            },
            error: o,
            complete: r,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(i) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(i);
    }
    [hr]() {
      return this;
    }
    pipe(...i) {
      return tu(i)(this);
    }
    toPromise(i) {
      return (
        (i = cg(i)),
        new i((n, r) => {
          let o;
          this.subscribe(
            (s) => (o = s),
            (s) => r(s),
            () => n(o)
          );
        })
      );
    }
  }
  return (t.create = (e) => new t(e)), t;
})();
function cg(t) {
  var e;
  return (e = t ?? Pt.Promise) !== null && e !== void 0 ? e : Promise;
}
function tC(t) {
  return t && L(t.next) && L(t.error) && L(t.complete);
}
function nC(t) {
  return (t && t instanceof bi) || (tC(t) && ca(t));
}
function nu(t) {
  return L(t?.lift);
}
function Q(t) {
  return (e) => {
    if (nu(e))
      return e.lift(function (i) {
        try {
          return t(i, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function G(t, e, i, n, r) {
  return new iu(t, e, i, n, r);
}
var iu = class extends bi {
  constructor(e, i, n, r, o, s) {
    super(e),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = i
        ? function (a) {
            try {
              i(a);
            } catch (l) {
              e.error(l);
            }
          }
        : super._next),
      (this._error = r
        ? function (a) {
            try {
              r(a);
            } catch (l) {
              e.error(l);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = n
        ? function () {
            try {
              n();
            } catch (a) {
              e.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: i } = this;
      super.unsubscribe(),
        !i && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }
};
function pr() {
  return Q((t, e) => {
    let i = null;
    t._refCount++;
    let n = G(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        i = null;
        return;
      }
      let r = t._connection,
        o = i;
      (i = null), r && (!o || r === o) && r.unsubscribe(), e.unsubscribe();
    });
    t.subscribe(n), n.closed || (i = t.connect());
  });
}
var mr = class extends U {
  constructor(e, i) {
    super(),
      (this.source = e),
      (this.subjectFactory = i),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      nu(e) && (this.lift = e.lift);
  }
  _subscribe(e) {
    return this.getSubject().subscribe(e);
  }
  getSubject() {
    let e = this._subject;
    return (
      (!e || e.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: e } = this;
    (this._subject = this._connection = null), e?.unsubscribe();
  }
  connect() {
    let e = this._connection;
    if (!e) {
      e = this._connection = new ce();
      let i = this.getSubject();
      e.add(
        this.source.subscribe(
          G(
            i,
            void 0,
            () => {
              this._teardown(), i.complete();
            },
            (n) => {
              this._teardown(), i.error(n);
            },
            () => this._teardown()
          )
        )
      ),
        e.closed && ((this._connection = null), (e = ce.EMPTY));
    }
    return e;
  }
  refCount() {
    return pr()(this);
  }
};
var dg = dr(
  (t) =>
    function () {
      t(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var F = (() => {
    class t extends U {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(i) {
        let n = new fa(this, this);
        return (n.operator = i), n;
      }
      _throwIfClosed() {
        if (this.closed) throw new dg();
      }
      next(i) {
        fr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let n of this.currentObservers) n.next(i);
          }
        });
      }
      error(i) {
        fr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = i);
            let { observers: n } = this;
            for (; n.length; ) n.shift().error(i);
          }
        });
      }
      complete() {
        fr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: i } = this;
            for (; i.length; ) i.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var i;
        return (
          ((i = this.observers) === null || i === void 0 ? void 0 : i.length) >
          0
        );
      }
      _trySubscribe(i) {
        return this._throwIfClosed(), super._trySubscribe(i);
      }
      _subscribe(i) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(i),
          this._innerSubscribe(i)
        );
      }
      _innerSubscribe(i) {
        let { hasError: n, isStopped: r, observers: o } = this;
        return n || r
          ? Qd
          : ((this.currentObservers = null),
            o.push(i),
            new ce(() => {
              (this.currentObservers = null), mi(o, i);
            }));
      }
      _checkFinalizedStatuses(i) {
        let { hasError: n, thrownError: r, isStopped: o } = this;
        n ? i.error(r) : o && i.complete();
      }
      asObservable() {
        let i = new U();
        return (i.source = this), i;
      }
    }
    return (t.create = (e, i) => new fa(e, i)), t;
  })(),
  fa = class extends F {
    constructor(e, i) {
      super(), (this.destination = e), (this.source = i);
    }
    next(e) {
      var i, n;
      (n =
        (i = this.destination) === null || i === void 0 ? void 0 : i.next) ===
        null ||
        n === void 0 ||
        n.call(i, e);
    }
    error(e) {
      var i, n;
      (n =
        (i = this.destination) === null || i === void 0 ? void 0 : i.error) ===
        null ||
        n === void 0 ||
        n.call(i, e);
    }
    complete() {
      var e, i;
      (i =
        (e = this.destination) === null || e === void 0
          ? void 0
          : e.complete) === null ||
        i === void 0 ||
        i.call(e);
    }
    _subscribe(e) {
      var i, n;
      return (n =
        (i = this.source) === null || i === void 0
          ? void 0
          : i.subscribe(e)) !== null && n !== void 0
        ? n
        : Qd;
    }
  };
var Me = class extends F {
  constructor(e) {
    super(), (this._value = e);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(e) {
    let i = super._subscribe(e);
    return !i.closed && e.next(this._value), i;
  }
  getValue() {
    let { hasError: e, thrownError: i, _value: n } = this;
    if (e) throw i;
    return this._throwIfClosed(), n;
  }
  next(e) {
    super.next((this._value = e));
  }
};
var So = {
  now() {
    return (So.delegate || Date).now();
  },
  delegate: void 0,
};
var ha = class extends F {
  constructor(e = 1 / 0, i = 1 / 0, n = So) {
    super(),
      (this._bufferSize = e),
      (this._windowTime = i),
      (this._timestampProvider = n),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = i === 1 / 0),
      (this._bufferSize = Math.max(1, e)),
      (this._windowTime = Math.max(1, i));
  }
  next(e) {
    let {
      isStopped: i,
      _buffer: n,
      _infiniteTimeWindow: r,
      _timestampProvider: o,
      _windowTime: s,
    } = this;
    i || (n.push(e), !r && n.push(o.now() + s)),
      this._trimBuffer(),
      super.next(e);
  }
  _subscribe(e) {
    this._throwIfClosed(), this._trimBuffer();
    let i = this._innerSubscribe(e),
      { _infiniteTimeWindow: n, _buffer: r } = this,
      o = r.slice();
    for (let s = 0; s < o.length && !e.closed; s += n ? 1 : 2) e.next(o[s]);
    return this._checkFinalizedStatuses(e), i;
  }
  _trimBuffer() {
    let {
        _bufferSize: e,
        _timestampProvider: i,
        _buffer: n,
        _infiniteTimeWindow: r,
      } = this,
      o = (r ? 1 : 2) * e;
    if ((e < 1 / 0 && o < n.length && n.splice(0, n.length - o), !r)) {
      let s = i.now(),
        a = 0;
      for (let l = 1; l < n.length && n[l] <= s; l += 2) a = l;
      a && n.splice(0, a + 1);
    }
  }
};
var pa = class extends ce {
  constructor(e, i) {
    super();
  }
  schedule(e, i = 0) {
    return this;
  }
};
var To = {
  setInterval(t, e, ...i) {
    let { delegate: n } = To;
    return n?.setInterval ? n.setInterval(t, e, ...i) : setInterval(t, e, ...i);
  },
  clearInterval(t) {
    let { delegate: e } = To;
    return (e?.clearInterval || clearInterval)(t);
  },
  delegate: void 0,
};
var ma = class extends pa {
  constructor(e, i) {
    super(e, i), (this.scheduler = e), (this.work = i), (this.pending = !1);
  }
  schedule(e, i = 0) {
    var n;
    if (this.closed) return this;
    this.state = e;
    let r = this.id,
      o = this.scheduler;
    return (
      r != null && (this.id = this.recycleAsyncId(o, r, i)),
      (this.pending = !0),
      (this.delay = i),
      (this.id =
        (n = this.id) !== null && n !== void 0
          ? n
          : this.requestAsyncId(o, this.id, i)),
      this
    );
  }
  requestAsyncId(e, i, n = 0) {
    return To.setInterval(e.flush.bind(e, this), n);
  }
  recycleAsyncId(e, i, n = 0) {
    if (n != null && this.delay === n && this.pending === !1) return i;
    i != null && To.clearInterval(i);
  }
  execute(e, i) {
    if (this.closed) return new Error("executing a cancelled action");
    this.pending = !1;
    let n = this._execute(e, i);
    if (n) return n;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(e, i) {
    let n = !1,
      r;
    try {
      this.work(e);
    } catch (o) {
      (n = !0), (r = o || new Error("Scheduled action threw falsy error"));
    }
    if (n) return this.unsubscribe(), r;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: e, scheduler: i } = this,
        { actions: n } = i;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        mi(n, this),
        e != null && (this.id = this.recycleAsyncId(i, e, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var gr = class t {
  constructor(e, i = t.now) {
    (this.schedulerActionCtor = e), (this.now = i);
  }
  schedule(e, i = 0, n) {
    return new this.schedulerActionCtor(this, e).schedule(n, i);
  }
};
gr.now = So.now;
var ga = class extends gr {
  constructor(e, i = gr.now) {
    super(e, i), (this.actions = []), (this._active = !1);
  }
  flush(e) {
    let { actions: i } = this;
    if (this._active) {
      i.push(e);
      return;
    }
    let n;
    this._active = !0;
    do if ((n = e.execute(e.state, e.delay))) break;
    while ((e = i.shift()));
    if (((this._active = !1), n)) {
      for (; (e = i.shift()); ) e.unsubscribe();
      throw n;
    }
  }
};
var Mo = new ga(ma),
  ug = Mo;
var Ge = new U((t) => t.complete());
function ba(t) {
  return t && L(t.schedule);
}
function ru(t) {
  return t[t.length - 1];
}
function va(t) {
  return L(ru(t)) ? t.pop() : void 0;
}
function Qt(t) {
  return ba(ru(t)) ? t.pop() : void 0;
}
function fg(t, e) {
  return typeof ru(t) == "number" ? t.pop() : e;
}
function pg(t, e, i, n) {
  function r(o) {
    return o instanceof i
      ? o
      : new i(function (s) {
          s(o);
        });
  }
  return new (i || (i = Promise))(function (o, s) {
    function a(d) {
      try {
        c(n.next(d));
      } catch (u) {
        s(u);
      }
    }
    function l(d) {
      try {
        c(n.throw(d));
      } catch (u) {
        s(u);
      }
    }
    function c(d) {
      d.done ? o(d.value) : r(d.value).then(a, l);
    }
    c((n = n.apply(t, e || [])).next());
  });
}
function hg(t) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    i = e && t[e],
    n = 0;
  if (i) return i.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function () {
        return (
          t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function vi(t) {
  return this instanceof vi ? ((this.v = t), this) : new vi(t);
}
function mg(t, e, i) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = i.apply(t, e || []),
    r,
    o = [];
  return (
    (r = {}),
    s("next"),
    s("throw"),
    s("return"),
    (r[Symbol.asyncIterator] = function () {
      return this;
    }),
    r
  );
  function s(f) {
    n[f] &&
      (r[f] = function (h) {
        return new Promise(function (p, m) {
          o.push([f, h, p, m]) > 1 || a(f, h);
        });
      });
  }
  function a(f, h) {
    try {
      l(n[f](h));
    } catch (p) {
      u(o[0][3], p);
    }
  }
  function l(f) {
    f.value instanceof vi
      ? Promise.resolve(f.value.v).then(c, d)
      : u(o[0][2], f);
  }
  function c(f) {
    a("next", f);
  }
  function d(f) {
    a("throw", f);
  }
  function u(f, h) {
    f(h), o.shift(), o.length && a(o[0][0], o[0][1]);
  }
}
function gg(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator],
    i;
  return e
    ? e.call(t)
    : ((t = typeof hg == "function" ? hg(t) : t[Symbol.iterator]()),
      (i = {}),
      n("next"),
      n("throw"),
      n("return"),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i);
  function n(o) {
    i[o] =
      t[o] &&
      function (s) {
        return new Promise(function (a, l) {
          (s = t[o](s)), r(a, l, s.done, s.value);
        });
      };
  }
  function r(o, s, a, l) {
    Promise.resolve(l).then(function (c) {
      o({ value: c, done: a });
    }, s);
  }
}
var br = (t) => t && typeof t.length == "number" && typeof t != "function";
function ya(t) {
  return L(t?.then);
}
function _a(t) {
  return L(t[hr]);
}
function xa(t) {
  return Symbol.asyncIterator && L(t?.[Symbol.asyncIterator]);
}
function wa(t) {
  return new TypeError(
    `You provided ${
      t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function iC() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var Ea = iC();
function Ca(t) {
  return L(t?.[Ea]);
}
function Da(t) {
  return mg(this, arguments, function* () {
    let i = t.getReader();
    try {
      for (;;) {
        let { value: n, done: r } = yield vi(i.read());
        if (r) return yield vi(void 0);
        yield yield vi(n);
      }
    } finally {
      i.releaseLock();
    }
  });
}
function Ia(t) {
  return L(t?.getReader);
}
function he(t) {
  if (t instanceof U) return t;
  if (t != null) {
    if (_a(t)) return rC(t);
    if (br(t)) return oC(t);
    if (ya(t)) return sC(t);
    if (xa(t)) return bg(t);
    if (Ca(t)) return aC(t);
    if (Ia(t)) return lC(t);
  }
  throw wa(t);
}
function rC(t) {
  return new U((e) => {
    let i = t[hr]();
    if (L(i.subscribe)) return i.subscribe(e);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function oC(t) {
  return new U((e) => {
    for (let i = 0; i < t.length && !e.closed; i++) e.next(t[i]);
    e.complete();
  });
}
function sC(t) {
  return new U((e) => {
    t.then(
      (i) => {
        e.closed || (e.next(i), e.complete());
      },
      (i) => e.error(i)
    ).then(null, da);
  });
}
function aC(t) {
  return new U((e) => {
    for (let i of t) if ((e.next(i), e.closed)) return;
    e.complete();
  });
}
function bg(t) {
  return new U((e) => {
    cC(t, e).catch((i) => e.error(i));
  });
}
function lC(t) {
  return bg(Da(t));
}
function cC(t, e) {
  var i, n, r, o;
  return pg(this, void 0, void 0, function* () {
    try {
      for (i = gg(t); (n = yield i.next()), !n.done; ) {
        let s = n.value;
        if ((e.next(s), e.closed)) return;
      }
    } catch (s) {
      r = { error: s };
    } finally {
      try {
        n && !n.done && (o = i.return) && (yield o.call(i));
      } finally {
        if (r) throw r.error;
      }
    }
    e.complete();
  });
}
function dt(t, e, i, n = 0, r = !1) {
  let o = e.schedule(function () {
    i(), r ? t.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if ((t.add(o), !r)) return o;
}
function Sa(t, e = 0) {
  return Q((i, n) => {
    i.subscribe(
      G(
        n,
        (r) => dt(n, t, () => n.next(r), e),
        () => dt(n, t, () => n.complete(), e),
        (r) => dt(n, t, () => n.error(r), e)
      )
    );
  });
}
function Ta(t, e = 0) {
  return Q((i, n) => {
    n.add(t.schedule(() => i.subscribe(n), e));
  });
}
function vg(t, e) {
  return he(t).pipe(Ta(e), Sa(e));
}
function yg(t, e) {
  return he(t).pipe(Ta(e), Sa(e));
}
function _g(t, e) {
  return new U((i) => {
    let n = 0;
    return e.schedule(function () {
      n === t.length
        ? i.complete()
        : (i.next(t[n++]), i.closed || this.schedule());
    });
  });
}
function xg(t, e) {
  return new U((i) => {
    let n;
    return (
      dt(i, e, () => {
        (n = t[Ea]()),
          dt(
            i,
            e,
            () => {
              let r, o;
              try {
                ({ value: r, done: o } = n.next());
              } catch (s) {
                i.error(s);
                return;
              }
              o ? i.complete() : i.next(r);
            },
            0,
            !0
          );
      }),
      () => L(n?.return) && n.return()
    );
  });
}
function Ma(t, e) {
  if (!t) throw new Error("Iterable cannot be null");
  return new U((i) => {
    dt(i, e, () => {
      let n = t[Symbol.asyncIterator]();
      dt(
        i,
        e,
        () => {
          n.next().then((r) => {
            r.done ? i.complete() : i.next(r.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function wg(t, e) {
  return Ma(Da(t), e);
}
function Eg(t, e) {
  if (t != null) {
    if (_a(t)) return vg(t, e);
    if (br(t)) return _g(t, e);
    if (ya(t)) return yg(t, e);
    if (xa(t)) return Ma(t, e);
    if (Ca(t)) return xg(t, e);
    if (Ia(t)) return wg(t, e);
  }
  throw wa(t);
}
function we(t, e) {
  return e ? Eg(t, e) : he(t);
}
function N(...t) {
  let e = Qt(t);
  return we(t, e);
}
function Zt(t, e) {
  let i = L(t) ? t : () => t,
    n = (r) => r.error(i());
  return new U(e ? (r) => e.schedule(n, 0, r) : n);
}
function Aa(t) {
  return !!t && (t instanceof U || (L(t.lift) && L(t.subscribe)));
}
var wn = dr(
  (t) =>
    function () {
      t(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function Cg(t) {
  return t instanceof Date && !isNaN(t);
}
function $(t, e) {
  return Q((i, n) => {
    let r = 0;
    i.subscribe(
      G(n, (o) => {
        n.next(t.call(e, o, r++));
      })
    );
  });
}
var { isArray: dC } = Array;
function uC(t, e) {
  return dC(e) ? t(...e) : t(e);
}
function vr(t) {
  return $((e) => uC(t, e));
}
var { isArray: fC } = Array,
  { getPrototypeOf: hC, prototype: pC, keys: mC } = Object;
function Ra(t) {
  if (t.length === 1) {
    let e = t[0];
    if (fC(e)) return { args: e, keys: null };
    if (gC(e)) {
      let i = mC(e);
      return { args: i.map((n) => e[n]), keys: i };
    }
  }
  return { args: t, keys: null };
}
function gC(t) {
  return t && typeof t == "object" && hC(t) === pC;
}
function Oa(t, e) {
  return t.reduce((i, n, r) => ((i[n] = e[r]), i), {});
}
function yr(...t) {
  let e = Qt(t),
    i = va(t),
    { args: n, keys: r } = Ra(t);
  if (n.length === 0) return we([], e);
  let o = new U(bC(n, e, r ? (s) => Oa(r, s) : it));
  return i ? o.pipe(vr(i)) : o;
}
function bC(t, e, i = it) {
  return (n) => {
    Dg(
      e,
      () => {
        let { length: r } = t,
          o = new Array(r),
          s = r,
          a = r;
        for (let l = 0; l < r; l++)
          Dg(
            e,
            () => {
              let c = we(t[l], e),
                d = !1;
              c.subscribe(
                G(
                  n,
                  (u) => {
                    (o[l] = u), d || ((d = !0), a--), a || n.next(i(o.slice()));
                  },
                  () => {
                    --s || n.complete();
                  }
                )
              );
            },
            n
          );
      },
      n
    );
  };
}
function Dg(t, e, i) {
  t ? dt(i, t, e) : e();
}
function Ig(t, e, i, n, r, o, s, a) {
  let l = [],
    c = 0,
    d = 0,
    u = !1,
    f = () => {
      u && !l.length && !c && e.complete();
    },
    h = (m) => (c < n ? p(m) : l.push(m)),
    p = (m) => {
      o && e.next(m), c++;
      let g = !1;
      he(i(m, d++)).subscribe(
        G(
          e,
          (b) => {
            r?.(b), o ? h(b) : e.next(b);
          },
          () => {
            g = !0;
          },
          void 0,
          () => {
            if (g)
              try {
                for (c--; l.length && c < n; ) {
                  let b = l.shift();
                  s ? dt(e, s, () => p(b)) : p(b);
                }
                f();
              } catch (b) {
                e.error(b);
              }
          }
        )
      );
    };
  return (
    t.subscribe(
      G(e, h, () => {
        (u = !0), f();
      })
    ),
    () => {
      a?.();
    }
  );
}
function Ee(t, e, i = 1 / 0) {
  return L(e)
    ? Ee((n, r) => $((o, s) => e(n, o, r, s))(he(t(n, r))), i)
    : (typeof e == "number" && (i = e), Q((n, r) => Ig(n, r, t, i)));
}
function Bn(t = 1 / 0) {
  return Ee(it, t);
}
function Sg() {
  return Bn(1);
}
function Un(...t) {
  return Sg()(we(t, Qt(t)));
}
function ka(t) {
  return new U((e) => {
    he(t()).subscribe(e);
  });
}
function yi(...t) {
  let e = va(t),
    { args: i, keys: n } = Ra(t),
    r = new U((o) => {
      let { length: s } = i;
      if (!s) {
        o.complete();
        return;
      }
      let a = new Array(s),
        l = s,
        c = s;
      for (let d = 0; d < s; d++) {
        let u = !1;
        he(i[d]).subscribe(
          G(
            o,
            (f) => {
              u || ((u = !0), c--), (a[d] = f);
            },
            () => l--,
            void 0,
            () => {
              (!l || !u) && (c || o.next(n ? Oa(n, a) : a), o.complete());
            }
          )
        );
      }
    });
  return e ? r.pipe(vr(e)) : r;
}
var vC = ["addListener", "removeListener"],
  yC = ["addEventListener", "removeEventListener"],
  _C = ["on", "off"];
function Kt(t, e, i, n) {
  if ((L(i) && ((n = i), (i = void 0)), n)) return Kt(t, e, i).pipe(vr(n));
  let [r, o] = EC(t)
    ? yC.map((s) => (a) => t[s](e, a, i))
    : xC(t)
    ? vC.map(Tg(t, e))
    : wC(t)
    ? _C.map(Tg(t, e))
    : [];
  if (!r && br(t)) return Ee((s) => Kt(s, e, i))(he(t));
  if (!r) throw new TypeError("Invalid event target");
  return new U((s) => {
    let a = (...l) => s.next(1 < l.length ? l : l[0]);
    return r(a), () => o(a);
  });
}
function Tg(t, e) {
  return (i) => (n) => t[i](e, n);
}
function xC(t) {
  return L(t.addListener) && L(t.removeListener);
}
function wC(t) {
  return L(t.on) && L(t.off);
}
function EC(t) {
  return L(t.addEventListener) && L(t.removeEventListener);
}
function Ao(t = 0, e, i = ug) {
  let n = -1;
  return (
    e != null && (ba(e) ? (i = e) : (n = e)),
    new U((r) => {
      let o = Cg(t) ? +t - i.now() : t;
      o < 0 && (o = 0);
      let s = 0;
      return i.schedule(function () {
        r.closed ||
          (r.next(s++), 0 <= n ? this.schedule(void 0, n) : r.complete());
      }, o);
    })
  );
}
function Hn(...t) {
  let e = Qt(t),
    i = fg(t, 1 / 0),
    n = t;
  return n.length ? (n.length === 1 ? he(n[0]) : Bn(i)(we(n, e))) : Ge;
}
function De(t, e) {
  return Q((i, n) => {
    let r = 0;
    i.subscribe(G(n, (o) => t.call(e, o, r++) && n.next(o)));
  });
}
function Mg(t) {
  return Q((e, i) => {
    let n = !1,
      r = null,
      o = null,
      s = !1,
      a = () => {
        if ((o?.unsubscribe(), (o = null), n)) {
          n = !1;
          let c = r;
          (r = null), i.next(c);
        }
        s && i.complete();
      },
      l = () => {
        (o = null), s && i.complete();
      };
    e.subscribe(
      G(
        i,
        (c) => {
          (n = !0), (r = c), o || he(t(c)).subscribe((o = G(i, a, l)));
        },
        () => {
          (s = !0), (!n || !o || o.closed) && i.complete();
        }
      )
    );
  });
}
function Na(t, e = Mo) {
  return Mg(() => Ao(t, e));
}
function $n(t) {
  return Q((e, i) => {
    let n = null,
      r = !1,
      o;
    (n = e.subscribe(
      G(i, void 0, void 0, (s) => {
        (o = he(t(s, $n(t)(e)))),
          n ? (n.unsubscribe(), (n = null), o.subscribe(i)) : (r = !0);
      })
    )),
      r && (n.unsubscribe(), (n = null), o.subscribe(i));
  });
}
function Ag(t, e, i, n, r) {
  return (o, s) => {
    let a = i,
      l = e,
      c = 0;
    o.subscribe(
      G(
        s,
        (d) => {
          let u = c++;
          (l = a ? t(l, d, u) : ((a = !0), d)), n && s.next(l);
        },
        r &&
          (() => {
            a && s.next(l), s.complete();
          })
      )
    );
  };
}
function zn(t, e) {
  return L(e) ? Ee(t, e, 1) : Ee(t, 1);
}
function _i(t, e = Mo) {
  return Q((i, n) => {
    let r = null,
      o = null,
      s = null,
      a = () => {
        if (r) {
          r.unsubscribe(), (r = null);
          let c = o;
          (o = null), n.next(c);
        }
      };
    function l() {
      let c = s + t,
        d = e.now();
      if (d < c) {
        (r = this.schedule(void 0, c - d)), n.add(r);
        return;
      }
      a();
    }
    i.subscribe(
      G(
        n,
        (c) => {
          (o = c), (s = e.now()), r || ((r = e.schedule(l, t)), n.add(r));
        },
        () => {
          a(), n.complete();
        },
        void 0,
        () => {
          o = r = null;
        }
      )
    );
  });
}
function qn(t) {
  return Q((e, i) => {
    let n = !1;
    e.subscribe(
      G(
        i,
        (r) => {
          (n = !0), i.next(r);
        },
        () => {
          n || i.next(t), i.complete();
        }
      )
    );
  });
}
function Ae(t) {
  return t <= 0
    ? () => Ge
    : Q((e, i) => {
        let n = 0;
        e.subscribe(
          G(i, (r) => {
            ++n <= t && (i.next(r), t <= n && i.complete());
          })
        );
      });
}
function ou(t) {
  return $(() => t);
}
function Ro(t, e = it) {
  return (
    (t = t ?? CC),
    Q((i, n) => {
      let r,
        o = !0;
      i.subscribe(
        G(n, (s) => {
          let a = e(s);
          (o || !t(r, a)) && ((o = !1), (r = a), n.next(s));
        })
      );
    })
  );
}
function CC(t, e) {
  return t === e;
}
function Pa(t = DC) {
  return Q((e, i) => {
    let n = !1;
    e.subscribe(
      G(
        i,
        (r) => {
          (n = !0), i.next(r);
        },
        () => (n ? i.complete() : i.error(t()))
      )
    );
  });
}
function DC() {
  return new wn();
}
function Wn(t) {
  return Q((e, i) => {
    try {
      e.subscribe(i);
    } finally {
      i.add(t);
    }
  });
}
function Xt(t, e) {
  let i = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? De((r, o) => t(r, o, n)) : it,
      Ae(1),
      i ? qn(e) : Pa(() => new wn())
    );
}
function _r(t) {
  return t <= 0
    ? () => Ge
    : Q((e, i) => {
        let n = [];
        e.subscribe(
          G(
            i,
            (r) => {
              n.push(r), t < n.length && n.shift();
            },
            () => {
              for (let r of n) i.next(r);
              i.complete();
            },
            void 0,
            () => {
              n = null;
            }
          )
        );
      });
}
function su(t, e) {
  let i = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? De((r, o) => t(r, o, n)) : it,
      _r(1),
      i ? qn(e) : Pa(() => new wn())
    );
}
function au(t, e) {
  return Q(Ag(t, e, arguments.length >= 2, !0));
}
function Rg(t = {}) {
  let {
    connector: e = () => new F(),
    resetOnError: i = !0,
    resetOnComplete: n = !0,
    resetOnRefCountZero: r = !0,
  } = t;
  return (o) => {
    let s,
      a,
      l,
      c = 0,
      d = !1,
      u = !1,
      f = () => {
        a?.unsubscribe(), (a = void 0);
      },
      h = () => {
        f(), (s = l = void 0), (d = u = !1);
      },
      p = () => {
        let m = s;
        h(), m?.unsubscribe();
      };
    return Q((m, g) => {
      c++, !u && !d && f();
      let b = (l = l ?? e());
      g.add(() => {
        c--, c === 0 && !u && !d && (a = lu(p, r));
      }),
        b.subscribe(g),
        !s &&
          c > 0 &&
          ((s = new xn({
            next: (x) => b.next(x),
            error: (x) => {
              (u = !0), f(), (a = lu(h, i, x)), b.error(x);
            },
            complete: () => {
              (d = !0), f(), (a = lu(h, n)), b.complete();
            },
          })),
          he(m).subscribe(s));
    })(o);
  };
}
function lu(t, e, ...i) {
  if (e === !0) {
    t();
    return;
  }
  if (e === !1) return;
  let n = new xn({
    next: () => {
      n.unsubscribe(), t();
    },
  });
  return he(e(...i)).subscribe(n);
}
function Fa(t, e, i) {
  let n,
    r = !1;
  return (
    t && typeof t == "object"
      ? ({
          bufferSize: n = 1 / 0,
          windowTime: e = 1 / 0,
          refCount: r = !1,
          scheduler: i,
        } = t)
      : (n = t ?? 1 / 0),
    Rg({
      connector: () => new ha(n, e, i),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: r,
    })
  );
}
function xi(t) {
  return De((e, i) => t <= i);
}
function En(...t) {
  let e = Qt(t);
  return Q((i, n) => {
    (e ? Un(t, i, e) : Un(t, i)).subscribe(n);
  });
}
function Je(t, e) {
  return Q((i, n) => {
    let r = null,
      o = 0,
      s = !1,
      a = () => s && !r && n.complete();
    i.subscribe(
      G(
        n,
        (l) => {
          r?.unsubscribe();
          let c = 0,
            d = o++;
          he(t(l, d)).subscribe(
            (r = G(
              n,
              (u) => n.next(e ? e(l, u, d, c++) : u),
              () => {
                (r = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function Se(t) {
  return Q((e, i) => {
    he(t).subscribe(G(i, () => i.complete(), Io)), !i.closed && e.subscribe(i);
  });
}
function Ne(t, e, i) {
  let n = L(t) || e || i ? { next: t, error: e, complete: i } : t;
  return n
    ? Q((r, o) => {
        var s;
        (s = n.subscribe) === null || s === void 0 || s.call(n);
        let a = !0;
        r.subscribe(
          G(
            o,
            (l) => {
              var c;
              (c = n.next) === null || c === void 0 || c.call(n, l), o.next(l);
            },
            () => {
              var l;
              (a = !1),
                (l = n.complete) === null || l === void 0 || l.call(n),
                o.complete();
            },
            (l) => {
              var c;
              (a = !1),
                (c = n.error) === null || c === void 0 || c.call(n, l),
                o.error(l);
            },
            () => {
              var l, c;
              a && ((l = n.unsubscribe) === null || l === void 0 || l.call(n)),
                (c = n.finalize) === null || c === void 0 || c.call(n);
            }
          )
        );
      })
    : it;
}
function ye(t) {
  for (let e in t) if (t[e] === ye) return e;
  throw Error("Could not find renamed property on target object.");
}
function La(t, e) {
  for (let i in e) e.hasOwnProperty(i) && !t.hasOwnProperty(i) && (t[i] = e[i]);
}
function ot(t) {
  if (typeof t == "string") return t;
  if (Array.isArray(t)) return "[" + t.map(ot).join(", ") + "]";
  if (t == null) return "" + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (e == null) return "" + e;
  let i = e.indexOf(`
`);
  return i === -1 ? e : e.substring(0, i);
}
function Og(t, e) {
  return t == null || t === ""
    ? e === null
      ? ""
      : e
    : e == null || e === ""
    ? t
    : t + " " + e;
}
var IC = ye({ __forward_ref__: ye });
function Mt(t) {
  return (
    (t.__forward_ref__ = Mt),
    (t.toString = function () {
      return ot(this());
    }),
    t
  );
}
function rt(t) {
  return pb(t) ? t() : t;
}
function pb(t) {
  return (
    typeof t == "function" && t.hasOwnProperty(IC) && t.__forward_ref__ === Mt
  );
}
function mb(t) {
  return t && !!t.ɵproviders;
}
var gb = "https://g.co/ng/security#xss",
  E = class extends Error {
    constructor(e, i) {
      super(hl(e, i)), (this.code = e);
    }
  };
function hl(t, e) {
  return `${`NG0${Math.abs(t)}`}${e ? ": " + e : ""}`;
}
var SC = ye({ ɵcmp: ye }),
  TC = ye({ ɵdir: ye }),
  MC = ye({ ɵpipe: ye }),
  AC = ye({ ɵmod: ye }),
  Ga = ye({ ɵfac: ye }),
  Oo = ye({ __NG_ELEMENT_ID__: ye }),
  kg = ye({ __NG_ENV_ID__: ye });
function Cn(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t);
}
function RC(t) {
  return typeof t == "function"
    ? t.name || t.toString()
    : typeof t == "object" && t != null && typeof t.type == "function"
    ? t.type.name || t.type.toString()
    : Cn(t);
}
function OC(t, e) {
  let i = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
  throw new E(-200, `Circular dependency in DI detected for ${t}${i}`);
}
function bf(t, e) {
  let i = e ? ` in ${e}` : "";
  throw new E(-201, !1);
}
function kC(t, e) {
  t == null && NC(e, t, null, "!=");
}
function NC(t, e, i, n) {
  throw new Error(
    `ASSERTION ERROR: ${t}` +
      (n == null ? "" : ` [Expected=> ${i} ${n} ${e} <=Actual]`)
  );
}
function D(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function z(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function pl(t) {
  return Ng(t, vb) || Ng(t, yb);
}
function bb(t) {
  return pl(t) !== null;
}
function Ng(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function PC(t) {
  let e = t && (t[vb] || t[yb]);
  return e || null;
}
function Pg(t) {
  return t && (t.hasOwnProperty(Fg) || t.hasOwnProperty(FC)) ? t[Fg] : null;
}
var vb = ye({ ɵprov: ye }),
  Fg = ye({ ɵinj: ye }),
  yb = ye({ ngInjectableDef: ye }),
  FC = ye({ ngInjectorDef: ye }),
  te = (function (t) {
    return (
      (t[(t.Default = 0)] = "Default"),
      (t[(t.Host = 1)] = "Host"),
      (t[(t.Self = 2)] = "Self"),
      (t[(t.SkipSelf = 4)] = "SkipSelf"),
      (t[(t.Optional = 8)] = "Optional"),
      t
    );
  })(te || {}),
  Iu;
function LC() {
  return Iu;
}
function ut(t) {
  let e = Iu;
  return (Iu = t), e;
}
function _b(t, e, i) {
  let n = pl(t);
  if (n && n.providedIn == "root")
    return n.value === void 0 ? (n.value = n.factory()) : n.value;
  if (i & te.Optional) return null;
  if (e !== void 0) return e;
  bf(ot(t), "Injector");
}
var Lt = globalThis;
var S = class {
  constructor(e, i) {
    (this._desc = e),
      (this.ngMetadataName = "InjectionToken"),
      (this.ɵprov = void 0),
      typeof i == "number"
        ? (this.__NG_ELEMENT_ID__ = i)
        : i !== void 0 &&
          (this.ɵprov = D({
            token: this,
            providedIn: i.providedIn || "root",
            factory: i.factory,
          }));
  }
  get multi() {
    return this;
  }
  toString() {
    return `InjectionToken ${this._desc}`;
  }
};
var jC = {},
  Po = jC,
  VC = "__NG_DI_FLAG__",
  Ya = "ngTempTokenPath",
  BC = "ngTokenPath",
  UC = /\n/gm,
  HC = "\u0275",
  Lg = "__source",
  ko;
function Gn(t) {
  let e = ko;
  return (ko = t), e;
}
function $C(t, e = te.Default) {
  if (ko === void 0) throw new E(-203, !1);
  return ko === null
    ? _b(t, void 0, e)
    : ko.get(t, e & te.Optional ? null : void 0, e);
}
function v(t, e = te.Default) {
  return (LC() || $C)(rt(t), e);
}
function w(t, e = te.Default) {
  return v(t, ml(e));
}
function ml(t) {
  return typeof t > "u" || typeof t == "number"
    ? t
    : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function Su(t) {
  let e = [];
  for (let i = 0; i < t.length; i++) {
    let n = rt(t[i]);
    if (Array.isArray(n)) {
      if (n.length === 0) throw new E(900, !1);
      let r,
        o = te.Default;
      for (let s = 0; s < n.length; s++) {
        let a = n[s],
          l = zC(a);
        typeof l == "number" ? (l === -1 ? (r = a.token) : (o |= l)) : (r = a);
      }
      e.push(v(r, o));
    } else e.push(v(n));
  }
  return e;
}
function zC(t) {
  return t[VC];
}
function qC(t, e, i, n) {
  let r = t[Ya];
  throw (
    (e[Lg] && r.unshift(e[Lg]),
    (t.message = WC(
      `
` + t.message,
      r,
      i,
      n
    )),
    (t[BC] = r),
    (t[Ya] = null),
    t)
  );
}
function WC(t, e, i, n = null) {
  t =
    t &&
    t.charAt(0) ===
      `
` &&
    t.charAt(1) == HC
      ? t.slice(2)
      : t;
  let r = ot(e);
  if (Array.isArray(e)) r = e.map(ot).join(" -> ");
  else if (typeof e == "object") {
    let o = [];
    for (let s in e)
      if (e.hasOwnProperty(s)) {
        let a = e[s];
        o.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : ot(a)));
      }
    r = `{${o.join(", ")}}`;
  }
  return `${i}${n ? "(" + n + ")" : ""}[${r}]: ${t.replace(
    UC,
    `
  `
  )}`;
}
function gl(t) {
  return { toString: t }.toString();
}
var xb = (function (t) {
    return (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t;
  })(xb || {}),
  nn = (function (t) {
    return (
      (t[(t.Emulated = 0)] = "Emulated"),
      (t[(t.None = 2)] = "None"),
      (t[(t.ShadowDom = 3)] = "ShadowDom"),
      t
    );
  })(nn || {}),
  Dr = {},
  St = [];
function wb(t, e, i) {
  let n = t.length;
  for (;;) {
    let r = t.indexOf(e, i);
    if (r === -1) return r;
    if (r === 0 || t.charCodeAt(r - 1) <= 32) {
      let o = e.length;
      if (r + o === n || t.charCodeAt(r + o) <= 32) return r;
    }
    i = r + 1;
  }
}
function Tu(t, e, i) {
  let n = 0;
  for (; n < i.length; ) {
    let r = i[n];
    if (typeof r == "number") {
      if (r !== 0) break;
      n++;
      let o = i[n++],
        s = i[n++],
        a = i[n++];
      t.setAttribute(e, s, a, o);
    } else {
      let o = r,
        s = i[++n];
      GC(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s), n++;
    }
  }
  return n;
}
function Eb(t) {
  return t === 3 || t === 4 || t === 6;
}
function GC(t) {
  return t.charCodeAt(0) === 64;
}
function Fo(t, e) {
  if (!(e === null || e.length === 0))
    if (t === null || t.length === 0) t = e.slice();
    else {
      let i = -1;
      for (let n = 0; n < e.length; n++) {
        let r = e[n];
        typeof r == "number"
          ? (i = r)
          : i === 0 ||
            (i === -1 || i === 2
              ? jg(t, i, r, null, e[++n])
              : jg(t, i, r, null, null));
      }
    }
  return t;
}
function jg(t, e, i, n, r) {
  let o = 0,
    s = t.length;
  if (e === -1) s = -1;
  else
    for (; o < t.length; ) {
      let a = t[o++];
      if (typeof a == "number") {
        if (a === e) {
          s = -1;
          break;
        } else if (a > e) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < t.length; ) {
    let a = t[o];
    if (typeof a == "number") break;
    if (a === i) {
      if (n === null) {
        r !== null && (t[o + 1] = r);
        return;
      } else if (n === t[o + 1]) {
        t[o + 2] = r;
        return;
      }
    }
    o++, n !== null && o++, r !== null && o++;
  }
  s !== -1 && (t.splice(s, 0, e), (o = s + 1)),
    t.splice(o++, 0, i),
    n !== null && t.splice(o++, 0, n),
    r !== null && t.splice(o++, 0, r);
}
var Cb = "ng-template";
function YC(t, e, i) {
  let n = 0,
    r = !0;
  for (; n < t.length; ) {
    let o = t[n++];
    if (typeof o == "string" && r) {
      let s = t[n++];
      if (i && o === "class" && wb(s.toLowerCase(), e, 0) !== -1) return !0;
    } else if (o === 1) {
      for (; n < t.length && typeof (o = t[n++]) == "string"; )
        if (o.toLowerCase() === e) return !0;
      return !1;
    } else typeof o == "number" && (r = !1);
  }
  return !1;
}
function Db(t) {
  return t.type === 4 && t.value !== Cb;
}
function QC(t, e, i) {
  let n = t.type === 4 && !i ? Cb : t.value;
  return e === n;
}
function ZC(t, e, i) {
  let n = 4,
    r = t.attrs || [],
    o = JC(r),
    s = !1;
  for (let a = 0; a < e.length; a++) {
    let l = e[a];
    if (typeof l == "number") {
      if (!s && !Ft(n) && !Ft(l)) return !1;
      if (s && Ft(l)) continue;
      (s = !1), (n = l | (n & 1));
      continue;
    }
    if (!s)
      if (n & 4) {
        if (
          ((n = 2 | (n & 1)),
          (l !== "" && !QC(t, l, i)) || (l === "" && e.length === 1))
        ) {
          if (Ft(n)) return !1;
          s = !0;
        }
      } else {
        let c = n & 8 ? l : e[++a];
        if (n & 8 && t.attrs !== null) {
          if (!YC(t.attrs, c, i)) {
            if (Ft(n)) return !1;
            s = !0;
          }
          continue;
        }
        let d = n & 8 ? "class" : l,
          u = KC(d, r, Db(t), i);
        if (u === -1) {
          if (Ft(n)) return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let f;
          u > o ? (f = "") : (f = r[u + 1].toLowerCase());
          let h = n & 8 ? f : null;
          if ((h && wb(h, c, 0) !== -1) || (n & 2 && c !== f)) {
            if (Ft(n)) return !1;
            s = !0;
          }
        }
      }
  }
  return Ft(n) || s;
}
function Ft(t) {
  return (t & 1) === 0;
}
function KC(t, e, i, n) {
  if (e === null) return -1;
  let r = 0;
  if (n || !i) {
    let o = !1;
    for (; r < e.length; ) {
      let s = e[r];
      if (s === t) return r;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = e[++r];
        for (; typeof a == "string"; ) a = e[++r];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          r += 4;
          continue;
        }
      }
      r += o ? 1 : 2;
    }
    return -1;
  } else return eD(e, t);
}
function Ib(t, e, i = !1) {
  for (let n = 0; n < e.length; n++) if (ZC(t, e[n], i)) return !0;
  return !1;
}
function XC(t) {
  let e = t.attrs;
  if (e != null) {
    let i = e.indexOf(5);
    if (!(i & 1)) return e[i + 1];
  }
  return null;
}
function JC(t) {
  for (let e = 0; e < t.length; e++) {
    let i = t[e];
    if (Eb(i)) return e;
  }
  return t.length;
}
function eD(t, e) {
  let i = t.indexOf(4);
  if (i > -1)
    for (i++; i < t.length; ) {
      let n = t[i];
      if (typeof n == "number") return -1;
      if (n === e) return i;
      i++;
    }
  return -1;
}
function tD(t, e) {
  e: for (let i = 0; i < e.length; i++) {
    let n = e[i];
    if (t.length === n.length) {
      for (let r = 0; r < t.length; r++) if (t[r] !== n[r]) continue e;
      return !0;
    }
  }
  return !1;
}
function Vg(t, e) {
  return t ? ":not(" + e.trim() + ")" : e;
}
function nD(t) {
  let e = t[0],
    i = 1,
    n = 2,
    r = "",
    o = !1;
  for (; i < t.length; ) {
    let s = t[i];
    if (typeof s == "string")
      if (n & 2) {
        let a = t[++i];
        r += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else n & 8 ? (r += "." + s) : n & 4 && (r += " " + s);
    else
      r !== "" && !Ft(s) && ((e += Vg(o, r)), (r = "")),
        (n = s),
        (o = o || !Ft(n));
    i++;
  }
  return r !== "" && (e += Vg(o, r)), e;
}
function iD(t) {
  return t.map(nD).join(",");
}
function rD(t) {
  let e = [],
    i = [],
    n = 1,
    r = 2;
  for (; n < t.length; ) {
    let o = t[n];
    if (typeof o == "string")
      r === 2 ? o !== "" && e.push(o, t[++n]) : r === 8 && i.push(o);
    else {
      if (!Ft(r)) break;
      r = o;
    }
    n++;
  }
  return { attrs: e, classes: i };
}
function Re(t) {
  return gl(() => {
    let e = Ob(t),
      i = ae(C({}, e), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === xb.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (e.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || nn.Emulated,
        styles: t.styles || St,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: "",
      });
    kb(i);
    let n = t.dependencies;
    return (
      (i.directiveDefs = Ug(n, !1)), (i.pipeDefs = Ug(n, !0)), (i.id = aD(i)), i
    );
  });
}
function oD(t) {
  return Ci(t) || Tb(t);
}
function sD(t) {
  return t !== null;
}
function q(t) {
  return gl(() => ({
    type: t.type,
    bootstrap: t.bootstrap || St,
    declarations: t.declarations || St,
    imports: t.imports || St,
    exports: t.exports || St,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function Bg(t, e) {
  if (t == null) return Dr;
  let i = {};
  for (let n in t)
    if (t.hasOwnProperty(n)) {
      let r = t[n],
        o = r;
      Array.isArray(r) && ((o = r[1]), (r = r[0])), (i[r] = n), e && (e[r] = o);
    }
  return i;
}
function W(t) {
  return gl(() => {
    let e = Ob(t);
    return kb(e), e;
  });
}
function Sb(t) {
  return {
    type: t.type,
    name: t.name,
    factory: null,
    pure: t.pure !== !1,
    standalone: t.standalone === !0,
    onDestroy: t.type.prototype.ngOnDestroy || null,
  };
}
function Ci(t) {
  return t[SC] || null;
}
function Tb(t) {
  return t[TC] || null;
}
function Mb(t) {
  return t[MC] || null;
}
function Ab(t) {
  let e = Ci(t) || Tb(t) || Mb(t);
  return e !== null ? e.standalone : !1;
}
function Rb(t, e) {
  let i = t[AC] || null;
  if (!i && e === !0)
    throw new Error(`Type ${ot(t)} does not have '\u0275mod' property.`);
  return i;
}
function Ob(t) {
  let e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || Dr,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || St,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Bg(t.inputs, e),
    outputs: Bg(t.outputs),
    debugInfo: null,
  };
}
function kb(t) {
  t.features?.forEach((e) => e(t));
}
function Ug(t, e) {
  if (!t) return null;
  let i = e ? Mb : oD;
  return () => (typeof t == "function" ? t() : t).map((n) => i(n)).filter(sD);
}
function aD(t) {
  let e = 0,
    i = [
      t.selectors,
      t.ngContentSelectors,
      t.hostVars,
      t.hostAttrs,
      t.consts,
      t.vars,
      t.decls,
      t.encapsulation,
      t.standalone,
      t.signals,
      t.exportAs,
      JSON.stringify(t.inputs),
      JSON.stringify(t.outputs),
      Object.getOwnPropertyNames(t.type.prototype),
      !!t.contentQueries,
      !!t.viewQuery,
    ].join("|");
  for (let r of i) e = (Math.imul(31, e) + r.charCodeAt(0)) << 0;
  return (e += 2147483647 + 1), "c" + e;
}
var Tn = 0,
  Y = 1,
  B = 2,
  Fe = 3,
  jt = 4,
  yt = 5,
  Ir = 6,
  Lo = 7,
  et = 8,
  Sr = 9,
  Dn = 10,
  Le = 11,
  jo = 12,
  Hg = 13,
  kr = 14,
  Tt = 15,
  Go = 16,
  xr = 17,
  tn = 18,
  bl = 19,
  Nb = 20,
  No = 21,
  cu = 22,
  Di = 23,
  st = 25,
  Pb = 1;
var Ii = 7,
  Qa = 8,
  Tr = 9,
  tt = 10,
  Mr = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      (t[(t.HasChildViewsToRefresh = 4)] = "HasChildViewsToRefresh"),
      t
    );
  })(Mr || {});
function Yn(t) {
  return Array.isArray(t) && typeof t[Pb] == "object";
}
function Vt(t) {
  return Array.isArray(t) && t[Pb] === !0;
}
function Fb(t) {
  return (t.flags & 4) !== 0;
}
function vl(t) {
  return t.componentOffset > -1;
}
function vf(t) {
  return (t.flags & 1) === 1;
}
function Qn(t) {
  return !!t.template;
}
function lD(t) {
  return (t[B] & 512) !== 0;
}
function Si(t, e) {
  let i = t.hasOwnProperty(Ga);
  return i ? t[Ga] : null;
}
var Mu = class {
  constructor(e, i, n) {
    (this.previousValue = e), (this.currentValue = i), (this.firstChange = n);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Ye() {
  return Lb;
}
function Lb(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = dD), cD;
}
Ye.ngInherit = !0;
function cD() {
  let t = Vb(this),
    e = t?.current;
  if (e) {
    let i = t.previous;
    if (i === Dr) t.previous = e;
    else for (let n in e) i[n] = e[n];
    (t.current = null), this.ngOnChanges(e);
  }
}
function dD(t, e, i, n) {
  let r = this.declaredInputs[i],
    o = Vb(t) || uD(t, { previous: Dr, current: null }),
    s = o.current || (o.current = {}),
    a = o.previous,
    l = a[r];
  (s[r] = new Mu(l && l.currentValue, e, a === Dr)), (t[n] = e);
}
var jb = "__ngSimpleChanges__";
function Vb(t) {
  return t[jb] || null;
}
function uD(t, e) {
  return (t[jb] = e);
}
var $g = null;
var Jt = function (t, e, i) {
    $g?.(t, e, i);
  },
  fD = "svg",
  hD = "math",
  pD = !1;
function mD() {
  return pD;
}
function rn(t) {
  for (; Array.isArray(t); ) t = t[Tn];
  return t;
}
function Bb(t, e) {
  return rn(e[t]);
}
function At(t, e) {
  return rn(e[t.index]);
}
function yf(t, e) {
  return t.data[e];
}
function Ub(t, e) {
  return t[e];
}
function Kn(t, e) {
  let i = e[t];
  return Yn(i) ? i : i[Tn];
}
function gD(t) {
  return (t[B] & 4) === 4;
}
function _f(t) {
  return (t[B] & 128) === 128;
}
function bD(t) {
  return Vt(t[Fe]);
}
function Za(t, e) {
  return e == null ? null : t[e];
}
function Hb(t) {
  t[xr] = 0;
}
function vD(t) {
  t[B] & 1024 || ((t[B] |= 1024), _f(t) && Vo(t));
}
function yD(t, e) {
  for (; t > 0; ) (e = e[kr]), t--;
  return e;
}
function $b(t) {
  return t[B] & 9216 || t[Di]?.dirty;
}
function Au(t) {
  $b(t)
    ? Vo(t)
    : t[B] & 64 &&
      (mD()
        ? ((t[B] |= 1024), Vo(t))
        : t[Dn].changeDetectionScheduler?.notify());
}
function Vo(t) {
  t[Dn].changeDetectionScheduler?.notify();
  let e = t[Fe];
  for (
    ;
    e !== null &&
    !((Vt(e) && e[B] & Mr.HasChildViewsToRefresh) || (Yn(e) && e[B] & 8192));

  ) {
    if (Vt(e)) e[B] |= Mr.HasChildViewsToRefresh;
    else if (((e[B] |= 8192), !_f(e))) break;
    e = e[Fe];
  }
}
function _D(t, e) {
  if ((t[B] & 256) === 256) throw new E(911, !1);
  t[No] === null && (t[No] = []), t[No].push(e);
}
var X = { lFrame: Jb(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function xD() {
  return X.lFrame.elementDepthCount;
}
function wD() {
  X.lFrame.elementDepthCount++;
}
function ED() {
  X.lFrame.elementDepthCount--;
}
function zb() {
  return X.bindingsEnabled;
}
function qb() {
  return X.skipHydrationRootTNode !== null;
}
function CD(t) {
  return X.skipHydrationRootTNode === t;
}
function DD() {
  X.skipHydrationRootTNode = null;
}
function ne() {
  return X.lFrame.lView;
}
function Ze() {
  return X.lFrame.tView;
}
function an(t) {
  return (X.lFrame.contextLView = t), t[et];
}
function ln(t) {
  return (X.lFrame.contextLView = null), t;
}
function ht() {
  let t = Wb();
  for (; t !== null && t.type === 64; ) t = t.parent;
  return t;
}
function Wb() {
  return X.lFrame.currentTNode;
}
function ID() {
  let t = X.lFrame,
    e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function Yo(t, e) {
  let i = X.lFrame;
  (i.currentTNode = t), (i.isParent = e);
}
function Gb() {
  return X.lFrame.isParent;
}
function Yb() {
  X.lFrame.isParent = !1;
}
function SD() {
  return X.lFrame.contextLView;
}
function TD() {
  let t = X.lFrame,
    e = t.bindingRootIndex;
  return e === -1 && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
}
function Qb() {
  return X.lFrame.bindingIndex;
}
function MD(t) {
  return (X.lFrame.bindingIndex = t);
}
function Nr() {
  return X.lFrame.bindingIndex++;
}
function xf(t) {
  let e = X.lFrame,
    i = e.bindingIndex;
  return (e.bindingIndex = e.bindingIndex + t), i;
}
function AD() {
  return X.lFrame.inI18n;
}
function RD(t, e) {
  let i = X.lFrame;
  (i.bindingIndex = i.bindingRootIndex = t), Ru(e);
}
function OD() {
  return X.lFrame.currentDirectiveIndex;
}
function Ru(t) {
  X.lFrame.currentDirectiveIndex = t;
}
function kD(t) {
  let e = X.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e];
}
function Zb() {
  return X.lFrame.currentQueryIndex;
}
function wf(t) {
  X.lFrame.currentQueryIndex = t;
}
function ND(t) {
  let e = t[Y];
  return e.type === 2 ? e.declTNode : e.type === 1 ? t[yt] : null;
}
function Kb(t, e, i) {
  if (i & te.SkipSelf) {
    let r = e,
      o = t;
    for (; (r = r.parent), r === null && !(i & te.Host); )
      if (((r = ND(o)), r === null || ((o = o[kr]), r.type & 10))) break;
    if (r === null) return !1;
    (e = r), (t = o);
  }
  let n = (X.lFrame = Xb());
  return (n.currentTNode = e), (n.lView = t), !0;
}
function Ef(t) {
  let e = Xb(),
    i = t[Y];
  (X.lFrame = e),
    (e.currentTNode = i.firstChild),
    (e.lView = t),
    (e.tView = i),
    (e.contextLView = t),
    (e.bindingIndex = i.bindingStartIndex),
    (e.inI18n = !1);
}
function Xb() {
  let t = X.lFrame,
    e = t === null ? null : t.child;
  return e === null ? Jb(t) : e;
}
function Jb(t) {
  let e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1,
  };
  return t !== null && (t.child = e), e;
}
function ev() {
  let t = X.lFrame;
  return (X.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var tv = ev;
function Cf() {
  let t = ev();
  (t.isParent = !0),
    (t.tView = null),
    (t.selectedIndex = -1),
    (t.contextLView = null),
    (t.elementDepthCount = 0),
    (t.currentDirectiveIndex = -1),
    (t.currentNamespace = null),
    (t.bindingRootIndex = -1),
    (t.bindingIndex = -1),
    (t.currentQueryIndex = 0);
}
function PD(t) {
  return (X.lFrame.contextLView = yD(t, X.lFrame.contextLView))[et];
}
function Mn() {
  return X.lFrame.selectedIndex;
}
function Ti(t) {
  X.lFrame.selectedIndex = t;
}
function Df() {
  let t = X.lFrame;
  return yf(t.tView, t.selectedIndex);
}
function FD() {
  return X.lFrame.currentNamespace;
}
var nv = !0;
function If() {
  return nv;
}
function Sf(t) {
  nv = t;
}
function LD(t, e, i) {
  let { ngOnChanges: n, ngOnInit: r, ngDoCheck: o } = e.type.prototype;
  if (n) {
    let s = Lb(e);
    (i.preOrderHooks ??= []).push(t, s),
      (i.preOrderCheckHooks ??= []).push(t, s);
  }
  r && (i.preOrderHooks ??= []).push(0 - t, r),
    o &&
      ((i.preOrderHooks ??= []).push(t, o),
      (i.preOrderCheckHooks ??= []).push(t, o));
}
function Tf(t, e) {
  for (let i = e.directiveStart, n = e.directiveEnd; i < n; i++) {
    let o = t.data[i].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: l,
        ngAfterViewChecked: c,
        ngOnDestroy: d,
      } = o;
    s && (t.contentHooks ??= []).push(-i, s),
      a &&
        ((t.contentHooks ??= []).push(i, a),
        (t.contentCheckHooks ??= []).push(i, a)),
      l && (t.viewHooks ??= []).push(-i, l),
      c &&
        ((t.viewHooks ??= []).push(i, c), (t.viewCheckHooks ??= []).push(i, c)),
      d != null && (t.destroyHooks ??= []).push(i, d);
  }
}
function Ua(t, e, i) {
  iv(t, e, 3, i);
}
function Ha(t, e, i, n) {
  (t[B] & 3) === i && iv(t, e, i, n);
}
function du(t, e) {
  let i = t[B];
  (i & 3) === e && ((i &= 16383), (i += 1), (t[B] = i));
}
function iv(t, e, i, n) {
  let r = n !== void 0 ? t[xr] & 65535 : 0,
    o = n ?? -1,
    s = e.length - 1,
    a = 0;
  for (let l = r; l < s; l++)
    if (typeof e[l + 1] == "number") {
      if (((a = e[l]), n != null && a >= n)) break;
    } else
      e[l] < 0 && (t[xr] += 65536),
        (a < o || o == -1) &&
          (jD(t, i, e, l), (t[xr] = (t[xr] & 4294901760) + l + 2)),
        l++;
}
function zg(t, e) {
  Jt(4, t, e);
  let i = Qe(null);
  try {
    e.call(t);
  } finally {
    Qe(i), Jt(5, t, e);
  }
}
function jD(t, e, i, n) {
  let r = i[n] < 0,
    o = i[n + 1],
    s = r ? -i[n] : i[n],
    a = t[s];
  r
    ? t[B] >> 14 < t[xr] >> 16 &&
      (t[B] & 3) === e &&
      ((t[B] += 16384), zg(a, o))
    : zg(a, o);
}
var Cr = -1,
  Mi = class {
    constructor(e, i, n) {
      (this.factory = e),
        (this.resolving = !1),
        (this.canSeeViewProviders = i),
        (this.injectImpl = n);
    }
  };
function VD(t) {
  return t instanceof Mi;
}
function BD(t) {
  return (t.flags & 8) !== 0;
}
function UD(t) {
  return (t.flags & 16) !== 0;
}
function rv(t) {
  return t !== Cr;
}
function Ka(t) {
  let e = t & 32767;
  return t & 32767;
}
function HD(t) {
  return t >> 16;
}
function Xa(t, e) {
  let i = HD(t),
    n = e;
  for (; i > 0; ) (n = n[kr]), i--;
  return n;
}
var Ou = !0;
function Ja(t) {
  let e = Ou;
  return (Ou = t), e;
}
var $D = 256,
  ov = $D - 1,
  sv = 5,
  zD = 0,
  en = {};
function qD(t, e, i) {
  let n;
  typeof i == "string"
    ? (n = i.charCodeAt(0) || 0)
    : i.hasOwnProperty(Oo) && (n = i[Oo]),
    n == null && (n = i[Oo] = zD++);
  let r = n & ov,
    o = 1 << r;
  e.data[t + (r >> sv)] |= o;
}
function el(t, e) {
  let i = av(t, e);
  if (i !== -1) return i;
  let n = e[Y];
  n.firstCreatePass &&
    ((t.injectorIndex = e.length),
    uu(n.data, t),
    uu(e, null),
    uu(n.blueprint, null));
  let r = Mf(t, e),
    o = t.injectorIndex;
  if (rv(r)) {
    let s = Ka(r),
      a = Xa(r, e),
      l = a[Y].data;
    for (let c = 0; c < 8; c++) e[o + c] = a[s + c] | l[s + c];
  }
  return (e[o + 8] = r), o;
}
function uu(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function av(t, e) {
  return t.injectorIndex === -1 ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    e[t.injectorIndex + 8] === null
    ? -1
    : t.injectorIndex;
}
function Mf(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let i = 0,
    n = null,
    r = e;
  for (; r !== null; ) {
    if (((n = fv(r)), n === null)) return Cr;
    if ((i++, (r = r[kr]), n.injectorIndex !== -1))
      return n.injectorIndex | (i << 16);
  }
  return Cr;
}
function ku(t, e, i) {
  qD(t, e, i);
}
function WD(t, e) {
  if (e === "class") return t.classes;
  if (e === "style") return t.styles;
  let i = t.attrs;
  if (i) {
    let n = i.length,
      r = 0;
    for (; r < n; ) {
      let o = i[r];
      if (Eb(o)) break;
      if (o === 0) r = r + 2;
      else if (typeof o == "number")
        for (r++; r < n && typeof i[r] == "string"; ) r++;
      else {
        if (o === e) return i[r + 1];
        r = r + 2;
      }
    }
  }
  return null;
}
function lv(t, e, i) {
  if (i & te.Optional || t !== void 0) return t;
  bf(e, "NodeInjector");
}
function cv(t, e, i, n) {
  if (
    (i & te.Optional && n === void 0 && (n = null), !(i & (te.Self | te.Host)))
  ) {
    let r = t[Sr],
      o = ut(void 0);
    try {
      return r ? r.get(e, n, i & te.Optional) : _b(e, n, i & te.Optional);
    } finally {
      ut(o);
    }
  }
  return lv(n, e, i);
}
function dv(t, e, i, n = te.Default, r) {
  if (t !== null) {
    if (e[B] & 2048 && !(n & te.Self)) {
      let s = ZD(t, e, i, n, en);
      if (s !== en) return s;
    }
    let o = uv(t, e, i, n, en);
    if (o !== en) return o;
  }
  return cv(e, i, n, r);
}
function uv(t, e, i, n, r) {
  let o = YD(i);
  if (typeof o == "function") {
    if (!Kb(e, t, n)) return n & te.Host ? lv(r, i, n) : cv(e, i, n, r);
    try {
      let s;
      if (((s = o(n)), s == null && !(n & te.Optional))) bf(i);
      else return s;
    } finally {
      tv();
    }
  } else if (typeof o == "number") {
    let s = null,
      a = av(t, e),
      l = Cr,
      c = n & te.Host ? e[Tt][yt] : null;
    for (
      (a === -1 || n & te.SkipSelf) &&
      ((l = a === -1 ? Mf(t, e) : e[a + 8]),
      l === Cr || !Wg(n, !1)
        ? (a = -1)
        : ((s = e[Y]), (a = Ka(l)), (e = Xa(l, e))));
      a !== -1;

    ) {
      let d = e[Y];
      if (qg(o, a, d.data)) {
        let u = GD(a, e, i, s, n, c);
        if (u !== en) return u;
      }
      (l = e[a + 8]),
        l !== Cr && Wg(n, e[Y].data[a + 8] === c) && qg(o, a, e)
          ? ((s = d), (a = Ka(l)), (e = Xa(l, e)))
          : (a = -1);
    }
  }
  return r;
}
function GD(t, e, i, n, r, o) {
  let s = e[Y],
    a = s.data[t + 8],
    l = n == null ? vl(a) && Ou : n != s && (a.type & 3) !== 0,
    c = r & te.Host && o === a,
    d = $a(a, s, i, l, c);
  return d !== null ? Ai(e, s, d, a) : en;
}
function $a(t, e, i, n, r) {
  let o = t.providerIndexes,
    s = e.data,
    a = o & 1048575,
    l = t.directiveStart,
    c = t.directiveEnd,
    d = o >> 20,
    u = n ? a : a + d,
    f = r ? a + d : c;
  for (let h = u; h < f; h++) {
    let p = s[h];
    if ((h < l && i === p) || (h >= l && p.type === i)) return h;
  }
  if (r) {
    let h = s[l];
    if (h && Qn(h) && h.type === i) return l;
  }
  return null;
}
function Ai(t, e, i, n) {
  let r = t[i],
    o = e.data;
  if (VD(r)) {
    let s = r;
    s.resolving && OC(RC(o[i]));
    let a = Ja(s.canSeeViewProviders);
    s.resolving = !0;
    let l,
      c = s.injectImpl ? ut(s.injectImpl) : null,
      d = Kb(t, n, te.Default);
    try {
      (r = t[i] = s.factory(void 0, o, t, n)),
        e.firstCreatePass && i >= n.directiveStart && LD(i, o[i], e);
    } finally {
      c !== null && ut(c), Ja(a), (s.resolving = !1), tv();
    }
  }
  return r;
}
function YD(t) {
  if (typeof t == "string") return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(Oo) ? t[Oo] : void 0;
  return typeof e == "number" ? (e >= 0 ? e & ov : QD) : e;
}
function qg(t, e, i) {
  let n = 1 << t;
  return !!(i[e + (t >> sv)] & n);
}
function Wg(t, e) {
  return !(t & te.Self) && !(t & te.Host && e);
}
var Ei = class {
  constructor(e, i) {
    (this._tNode = e), (this._lView = i);
  }
  get(e, i, n) {
    return dv(this._tNode, this._lView, e, ml(n), i);
  }
};
function QD() {
  return new Ei(ht(), ne());
}
function cn(t) {
  return gl(() => {
    let e = t.prototype.constructor,
      i = e[Ga] || Nu(e),
      n = Object.prototype,
      r = Object.getPrototypeOf(t.prototype).constructor;
    for (; r && r !== n; ) {
      let o = r[Ga] || Nu(r);
      if (o && o !== i) return o;
      r = Object.getPrototypeOf(r);
    }
    return (o) => new o();
  });
}
function Nu(t) {
  return pb(t)
    ? () => {
        let e = Nu(rt(t));
        return e && e();
      }
    : Si(t);
}
function ZD(t, e, i, n, r) {
  let o = t,
    s = e;
  for (; o !== null && s !== null && s[B] & 2048 && !(s[B] & 512); ) {
    let a = uv(o, s, i, n | te.Self, en);
    if (a !== en) return a;
    let l = o.parent;
    if (!l) {
      let c = s[Nb];
      if (c) {
        let d = c.get(i, en, n);
        if (d !== en) return d;
      }
      (l = fv(s)), (s = s[kr]);
    }
    o = l;
  }
  return r;
}
function fv(t) {
  let e = t[Y],
    i = e.type;
  return i === 2 ? e.declTNode : i === 1 ? t[yt] : null;
}
function Fi(t) {
  return WD(ht(), t);
}
function KD(t) {
  return typeof t == "function";
}
function XD(t, e, i) {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; n++) {
    let r = t[n],
      o = e[n];
    if ((i && ((r = i(r)), (o = i(o))), o !== r)) return !1;
  }
  return !0;
}
function JD(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function Af(t, e) {
  t.forEach((i) => (Array.isArray(i) ? Af(i, e) : e(i)));
}
function hv(t, e, i) {
  e >= t.length ? t.push(i) : t.splice(e, 0, i);
}
function tl(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function pv(t, e) {
  let i = [];
  for (let n = 0; n < t; n++) i.push(e);
  return i;
}
function eI(t, e, i, n) {
  let r = t.length;
  if (r == e) t.push(i, n);
  else if (r === 1) t.push(n, t[0]), (t[0] = i);
  else {
    for (r--, t.push(t[r - 1], t[r]); r > e; ) {
      let o = r - 2;
      (t[r] = t[o]), r--;
    }
    (t[e] = i), (t[e + 1] = n);
  }
}
function tI(t, e, i) {
  let n = Qo(t, e);
  return n >= 0 ? (t[n | 1] = i) : ((n = ~n), eI(t, n, e, i)), n;
}
function fu(t, e) {
  let i = Qo(t, e);
  if (i >= 0) return t[i | 1];
}
function Qo(t, e) {
  return nI(t, e, 1);
}
function nI(t, e, i) {
  let n = 0,
    r = t.length >> i;
  for (; r !== n; ) {
    let o = n + ((r - n) >> 1),
      s = t[o << i];
    if (e === s) return o << i;
    s > e ? (r = o) : (n = o + 1);
  }
  return ~(r << i);
}
var Ar = new S("ENVIRONMENT_INITIALIZER"),
  mv = new S("INJECTOR", -1),
  gv = new S("INJECTOR_DEF_TYPES"),
  nl = class {
    get(e, i = Po) {
      if (i === Po) {
        let n = new Error(`NullInjectorError: No provider for ${ot(e)}!`);
        throw ((n.name = "NullInjectorError"), n);
      }
      return i;
    }
  };
function Pr(t) {
  return { ɵproviders: t };
}
function Rf(...t) {
  return { ɵproviders: bv(!0, t), ɵfromNgModule: !0 };
}
function bv(t, ...e) {
  let i = [],
    n = new Set(),
    r,
    o = (s) => {
      i.push(s);
    };
  return (
    Af(e, (s) => {
      let a = s;
      Pu(a, o, [], n) && ((r ||= []), r.push(a));
    }),
    r !== void 0 && vv(r, o),
    i
  );
}
function vv(t, e) {
  for (let i = 0; i < t.length; i++) {
    let { ngModule: n, providers: r } = t[i];
    Of(r, (o) => {
      e(o, n);
    });
  }
}
function Pu(t, e, i, n) {
  if (((t = rt(t)), !t)) return !1;
  let r = null,
    o = Pg(t),
    s = !o && Ci(t);
  if (!o && !s) {
    let l = t.ngModule;
    if (((o = Pg(l)), o)) r = l;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    r = t;
  }
  let a = n.has(r);
  if (s) {
    if (a) return !1;
    if ((n.add(r), s.dependencies)) {
      let l =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let c of l) Pu(c, e, i, n);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      n.add(r);
      let c;
      try {
        Af(o.imports, (d) => {
          Pu(d, e, i, n) && ((c ||= []), c.push(d));
        });
      } finally {
      }
      c !== void 0 && vv(c, e);
    }
    if (!a) {
      let c = Si(r) || (() => new r());
      e({ provide: r, useFactory: c, deps: St }, r),
        e({ provide: gv, useValue: r, multi: !0 }, r),
        e({ provide: Ar, useValue: () => v(r), multi: !0 }, r);
    }
    let l = o.providers;
    if (l != null && !a) {
      let c = t;
      Of(l, (d) => {
        e(d, c);
      });
    }
  } else return !1;
  return r !== t && t.providers !== void 0;
}
function Of(t, e) {
  for (let i of t)
    mb(i) && (i = i.ɵproviders), Array.isArray(i) ? Of(i, e) : e(i);
}
var iI = ye({ provide: String, useValue: ye });
function yv(t) {
  return t !== null && typeof t == "object" && iI in t;
}
function rI(t) {
  return !!(t && t.useExisting);
}
function oI(t) {
  return !!(t && t.useFactory);
}
function Rr(t) {
  return typeof t == "function";
}
function sI(t) {
  return !!t.useClass;
}
var yl = new S("Set Injector scope."),
  za = {},
  aI = {},
  hu;
function kf() {
  return hu === void 0 && (hu = new nl()), hu;
}
var ft = class {},
  Bo = class extends ft {
    get destroyed() {
      return this._destroyed;
    }
    constructor(e, i, n, r) {
      super(),
        (this.parent = i),
        (this.source = n),
        (this.scopes = r),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Lu(e, (s) => this.processProvider(s)),
        this.records.set(mv, wr(void 0, this)),
        r.has("environment") && this.records.set(ft, wr(void 0, this));
      let o = this.records.get(yl);
      o != null && typeof o.value == "string" && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(gv, St, te.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      try {
        for (let i of this._ngOnDestroyHooks) i.ngOnDestroy();
        let e = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let i of e) i();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear();
      }
    }
    onDestroy(e) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(e),
        () => this.removeOnDestroy(e)
      );
    }
    runInContext(e) {
      this.assertNotDestroyed();
      let i = Gn(this),
        n = ut(void 0),
        r;
      try {
        return e();
      } finally {
        Gn(i), ut(n);
      }
    }
    get(e, i = Po, n = te.Default) {
      if ((this.assertNotDestroyed(), e.hasOwnProperty(kg))) return e[kg](this);
      n = ml(n);
      let r,
        o = Gn(this),
        s = ut(void 0);
      try {
        if (!(n & te.SkipSelf)) {
          let l = this.records.get(e);
          if (l === void 0) {
            let c = fI(e) && pl(e);
            c && this.injectableDefInScope(c)
              ? (l = wr(Fu(e), za))
              : (l = null),
              this.records.set(e, l);
          }
          if (l != null) return this.hydrate(e, l);
        }
        let a = n & te.Self ? kf() : this.parent;
        return (i = n & te.Optional && i === Po ? null : i), a.get(e, i);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Ya] = a[Ya] || []).unshift(ot(e)), o)) throw a;
          return qC(a, e, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        ut(s), Gn(o);
      }
    }
    resolveInjectorInitializers() {
      let e = Gn(this),
        i = ut(void 0),
        n;
      try {
        let r = this.get(Ar, St, te.Self);
        for (let o of r) o();
      } finally {
        Gn(e), ut(i);
      }
    }
    toString() {
      let e = [],
        i = this.records;
      for (let n of i.keys()) e.push(ot(n));
      return `R3Injector[${e.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new E(205, !1);
    }
    processProvider(e) {
      e = rt(e);
      let i = Rr(e) ? e : rt(e && e.provide),
        n = cI(e);
      if (!Rr(e) && e.multi === !0) {
        let r = this.records.get(i);
        r ||
          ((r = wr(void 0, za, !0)),
          (r.factory = () => Su(r.multi)),
          this.records.set(i, r)),
          (i = e),
          r.multi.push(e);
      } else {
        let r = this.records.get(i);
      }
      this.records.set(i, n);
    }
    hydrate(e, i) {
      return (
        i.value === za && ((i.value = aI), (i.value = i.factory())),
        typeof i.value == "object" &&
          i.value &&
          uI(i.value) &&
          this._ngOnDestroyHooks.add(i.value),
        i.value
      );
    }
    injectableDefInScope(e) {
      if (!e.providedIn) return !1;
      let i = rt(e.providedIn);
      return typeof i == "string"
        ? i === "any" || this.scopes.has(i)
        : this.injectorDefTypes.has(i);
    }
    removeOnDestroy(e) {
      let i = this._onDestroyHooks.indexOf(e);
      i !== -1 && this._onDestroyHooks.splice(i, 1);
    }
  };
function Fu(t) {
  let e = pl(t),
    i = e !== null ? e.factory : Si(t);
  if (i !== null) return i;
  if (t instanceof S) throw new E(204, !1);
  if (t instanceof Function) return lI(t);
  throw new E(204, !1);
}
function lI(t) {
  let e = t.length;
  if (e > 0) {
    let n = pv(e, "?");
    throw new E(204, !1);
  }
  let i = PC(t);
  return i !== null ? () => i.factory(t) : () => new t();
}
function cI(t) {
  if (yv(t)) return wr(void 0, t.useValue);
  {
    let e = _v(t);
    return wr(e, za);
  }
}
function _v(t, e, i) {
  let n;
  if (Rr(t)) {
    let r = rt(t);
    return Si(r) || Fu(r);
  } else if (yv(t)) n = () => rt(t.useValue);
  else if (oI(t)) n = () => t.useFactory(...Su(t.deps || []));
  else if (rI(t)) n = () => v(rt(t.useExisting));
  else {
    let r = rt(t && (t.useClass || t.provide));
    if (dI(t)) n = () => new r(...Su(t.deps));
    else return Si(r) || Fu(r);
  }
  return n;
}
function wr(t, e, i = !1) {
  return { factory: t, value: e, multi: i ? [] : void 0 };
}
function dI(t) {
  return !!t.deps;
}
function uI(t) {
  return (
    t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
  );
}
function fI(t) {
  return typeof t == "function" || (typeof t == "object" && t instanceof S);
}
function Lu(t, e) {
  for (let i of t)
    Array.isArray(i) ? Lu(i, e) : i && mb(i) ? Lu(i.ɵproviders, e) : e(i);
}
function An(t, e) {
  t instanceof Bo && t.assertNotDestroyed();
  let i,
    n = Gn(t),
    r = ut(void 0);
  try {
    return e();
  } finally {
    Gn(n), ut(r);
  }
}
function Gg(t, e = null, i = null, n) {
  let r = xv(t, e, i, n);
  return r.resolveInjectorInitializers(), r;
}
function xv(t, e = null, i = null, n, r = new Set()) {
  let o = [i || St, Rf(t)];
  return (
    (n = n || (typeof t == "object" ? void 0 : ot(t))),
    new Bo(o, e || kf(), n || null, r)
  );
}
var Bt = (() => {
  let e = class e {
    static create(n, r) {
      if (Array.isArray(n)) return Gg({ name: "" }, r, n, "");
      {
        let o = n.name ?? "";
        return Gg({ name: o }, n.parent, n.providers, o);
      }
    }
  };
  (e.THROW_IF_NOT_FOUND = Po),
    (e.NULL = new nl()),
    (e.ɵprov = D({ token: e, providedIn: "any", factory: () => v(mv) })),
    (e.__NG_ELEMENT_ID__ = -1);
  let t = e;
  return t;
})();
var ju;
function wv(t) {
  ju = t;
}
function hI() {
  if (ju !== void 0) return ju;
  if (typeof document < "u") return document;
  throw new E(210, !1);
}
var _l = new S("AppId", { providedIn: "root", factory: () => pI }),
  pI = "ng",
  Nf = new S("Platform Initializer"),
  dn = new S("Platform ID", {
    providedIn: "platform",
    factory: () => "unknown",
  });
var at = new S("AnimationModuleType"),
  Zo = new S("CSP nonce", {
    providedIn: "root",
    factory: () =>
      hI().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
      null,
  });
function Ev(t) {
  return t instanceof Function ? t() : t;
}
function Cv(t) {
  return (t.flags & 128) === 128;
}
var In = (function (t) {
  return (
    (t[(t.Important = 1)] = "Important"), (t[(t.DashCase = 2)] = "DashCase"), t
  );
})(In || {});
var Dv = new Map(),
  mI = 0;
function gI() {
  return mI++;
}
function bI(t) {
  Dv.set(t[bl], t);
}
function vI(t) {
  Dv.delete(t[bl]);
}
var Yg = "__ngContext__";
function Ri(t, e) {
  Yn(e) ? ((t[Yg] = e[bl]), bI(e)) : (t[Yg] = e);
}
var yI;
function Pf(t, e) {
  return yI(t, e);
}
function Ff(t) {
  let e = t[Fe];
  return Vt(e) ? e[Fe] : e;
}
function Iv(t) {
  return Tv(t[jo]);
}
function Sv(t) {
  return Tv(t[jt]);
}
function Tv(t) {
  for (; t !== null && !Vt(t); ) t = t[jt];
  return t;
}
function Er(t, e, i, n, r) {
  if (n != null) {
    let o,
      s = !1;
    Vt(n) ? (o = n) : Yn(n) && ((s = !0), (n = n[Tn]));
    let a = rn(n);
    t === 0 && i !== null
      ? r == null
        ? Ov(e, i, a)
        : il(e, i, a, r || null, !0)
      : t === 1 && i !== null
      ? il(e, i, a, r || null, !0)
      : t === 2
      ? PI(e, a, s)
      : t === 3 && e.destroyNode(a),
      o != null && LI(e, t, o, i, r);
  }
}
function _I(t, e) {
  return t.createText(e);
}
function xI(t, e, i) {
  t.setValue(e, i);
}
function Mv(t, e, i) {
  return t.createElement(e, i);
}
function wI(t, e) {
  let i = e[Le];
  Ko(t, e, i, 2, null, null), (e[Tn] = null), (e[yt] = null);
}
function EI(t, e, i, n, r, o) {
  (n[Tn] = r), (n[yt] = e), Ko(t, n, i, 1, r, o);
}
function CI(t, e) {
  Ko(t, e, e[Le], 2, null, null);
}
function DI(t) {
  let e = t[jo];
  if (!e) return pu(t[Y], t);
  for (; e; ) {
    let i = null;
    if (Yn(e)) i = e[jo];
    else {
      let n = e[tt];
      n && (i = n);
    }
    if (!i) {
      for (; e && !e[jt] && e !== t; ) Yn(e) && pu(e[Y], e), (e = e[Fe]);
      e === null && (e = t), Yn(e) && pu(e[Y], e), (i = e && e[jt]);
    }
    e = i;
  }
}
function II(t, e, i, n) {
  let r = tt + n,
    o = i.length;
  n > 0 && (i[r - 1][jt] = e),
    n < o - tt
      ? ((e[jt] = i[r]), hv(i, tt + n, e))
      : (i.push(e), (e[jt] = null)),
    (e[Fe] = i);
  let s = e[Go];
  s !== null && i !== s && SI(s, e);
  let a = e[tn];
  a !== null && a.insertView(t), Au(e), (e[B] |= 128);
}
function SI(t, e) {
  let i = t[Tr],
    r = e[Fe][Fe][Tt];
  e[Tt] !== r && (t[B] |= Mr.HasTransplantedViews),
    i === null ? (t[Tr] = [e]) : i.push(e);
}
function Av(t, e) {
  let i = t[Tr],
    n = i.indexOf(e),
    r = e[Fe];
  i.splice(n, 1);
}
function Uo(t, e) {
  if (t.length <= tt) return;
  let i = tt + e,
    n = t[i];
  if (n) {
    let r = n[Go];
    r !== null && r !== t && Av(r, n), e > 0 && (t[i - 1][jt] = n[jt]);
    let o = tl(t, tt + e);
    wI(n[Y], n);
    let s = o[tn];
    s !== null && s.detachView(o[Y]),
      (n[Fe] = null),
      (n[jt] = null),
      (n[B] &= -129);
  }
  return n;
}
function xl(t, e) {
  if (!(e[B] & 256)) {
    let i = e[Le];
    i.destroyNode && Ko(t, e, i, 3, null, null), DI(e);
  }
}
function pu(t, e) {
  if (!(e[B] & 256)) {
    (e[B] &= -129),
      (e[B] |= 256),
      e[Di] && ng(e[Di]),
      MI(t, e),
      TI(t, e),
      e[Y].type === 1 && e[Le].destroy();
    let i = e[Go];
    if (i !== null && Vt(e[Fe])) {
      i !== e[Fe] && Av(i, e);
      let n = e[tn];
      n !== null && n.detachView(t);
    }
    vI(e);
  }
}
function TI(t, e) {
  let i = t.cleanup,
    n = e[Lo];
  if (i !== null)
    for (let o = 0; o < i.length - 1; o += 2)
      if (typeof i[o] == "string") {
        let s = i[o + 3];
        s >= 0 ? n[s]() : n[-s].unsubscribe(), (o += 2);
      } else {
        let s = n[i[o + 1]];
        i[o].call(s);
      }
  n !== null && (e[Lo] = null);
  let r = e[No];
  if (r !== null) {
    e[No] = null;
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      s();
    }
  }
}
function MI(t, e) {
  let i;
  if (t != null && (i = t.destroyHooks) != null)
    for (let n = 0; n < i.length; n += 2) {
      let r = e[i[n]];
      if (!(r instanceof Mi)) {
        let o = i[n + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = r[o[s]],
              l = o[s + 1];
            Jt(4, a, l);
            try {
              l.call(a);
            } finally {
              Jt(5, a, l);
            }
          }
        else {
          Jt(4, r, o);
          try {
            o.call(r);
          } finally {
            Jt(5, r, o);
          }
        }
      }
    }
}
function Rv(t, e, i) {
  return AI(t, e.parent, i);
}
function AI(t, e, i) {
  let n = e;
  for (; n !== null && n.type & 40; ) (e = n), (n = e.parent);
  if (n === null) return i[Tn];
  {
    let { componentOffset: r } = n;
    if (r > -1) {
      let { encapsulation: o } = t.data[n.directiveStart + r];
      if (o === nn.None || o === nn.Emulated) return null;
    }
    return At(n, i);
  }
}
function il(t, e, i, n, r) {
  t.insertBefore(e, i, n, r);
}
function Ov(t, e, i) {
  t.appendChild(e, i);
}
function Qg(t, e, i, n, r) {
  n !== null ? il(t, e, i, n, r) : Ov(t, e, i);
}
function RI(t, e, i, n) {
  t.removeChild(e, i, n);
}
function Lf(t, e) {
  return t.parentNode(e);
}
function OI(t, e) {
  return t.nextSibling(e);
}
function kv(t, e, i) {
  return NI(t, e, i);
}
function kI(t, e, i) {
  return t.type & 40 ? At(t, i) : null;
}
var NI = kI,
  Zg;
function jf(t, e, i, n) {
  let r = Rv(t, n, e),
    o = e[Le],
    s = n.parent || e[yt],
    a = kv(s, n, e);
  if (r != null)
    if (Array.isArray(i))
      for (let l = 0; l < i.length; l++) Qg(o, r, i[l], a, !1);
    else Qg(o, r, i, a, !1);
  Zg !== void 0 && Zg(o, n, e, i, r);
}
function qa(t, e) {
  if (e !== null) {
    let i = e.type;
    if (i & 3) return At(e, t);
    if (i & 4) return Vu(-1, t[e.index]);
    if (i & 8) {
      let n = e.child;
      if (n !== null) return qa(t, n);
      {
        let r = t[e.index];
        return Vt(r) ? Vu(-1, r) : rn(r);
      }
    } else {
      if (i & 32) return Pf(e, t)() || rn(t[e.index]);
      {
        let n = Nv(t, e);
        if (n !== null) {
          if (Array.isArray(n)) return n[0];
          let r = Ff(t[Tt]);
          return qa(r, n);
        } else return qa(t, e.next);
      }
    }
  }
  return null;
}
function Nv(t, e) {
  if (e !== null) {
    let n = t[Tt][yt],
      r = e.projection;
    return n.projection[r];
  }
  return null;
}
function Vu(t, e) {
  let i = tt + t + 1;
  if (i < e.length) {
    let n = e[i],
      r = n[Y].firstChild;
    if (r !== null) return qa(n, r);
  }
  return e[Ii];
}
function PI(t, e, i) {
  let n = Lf(t, e);
  n && RI(t, n, e, i);
}
function Vf(t, e, i, n, r, o, s) {
  for (; i != null; ) {
    let a = n[i.index],
      l = i.type;
    if (
      (s && e === 0 && (a && Ri(rn(a), n), (i.flags |= 2)),
      (i.flags & 32) !== 32)
    )
      if (l & 8) Vf(t, e, i.child, n, r, o, !1), Er(e, t, r, a, o);
      else if (l & 32) {
        let c = Pf(i, n),
          d;
        for (; (d = c()); ) Er(e, t, r, d, o);
        Er(e, t, r, a, o);
      } else l & 16 ? Pv(t, e, n, i, r, o) : Er(e, t, r, a, o);
    i = s ? i.projectionNext : i.next;
  }
}
function Ko(t, e, i, n, r, o) {
  Vf(i, n, t.firstChild, e, r, o, !1);
}
function FI(t, e, i) {
  let n = e[Le],
    r = Rv(t, i, e),
    o = i.parent || e[yt],
    s = kv(o, i, e);
  Pv(n, 0, e, i, r, s);
}
function Pv(t, e, i, n, r, o) {
  let s = i[Tt],
    l = s[yt].projection[n.projection];
  if (Array.isArray(l))
    for (let c = 0; c < l.length; c++) {
      let d = l[c];
      Er(e, t, r, d, o);
    }
  else {
    let c = l,
      d = s[Fe];
    Cv(n) && (c.flags |= 128), Vf(t, e, c, d, r, o, !0);
  }
}
function LI(t, e, i, n, r) {
  let o = i[Ii],
    s = rn(i);
  o !== s && Er(e, t, n, o, r);
  for (let a = tt; a < i.length; a++) {
    let l = i[a];
    Ko(l[Y], l, t, e, n, o);
  }
}
function jI(t, e, i, n, r) {
  if (e) r ? t.addClass(i, n) : t.removeClass(i, n);
  else {
    let o = n.indexOf("-") === -1 ? void 0 : In.DashCase;
    r == null
      ? t.removeStyle(i, n, o)
      : (typeof r == "string" &&
          r.endsWith("!important") &&
          ((r = r.slice(0, -10)), (o |= In.Important)),
        t.setStyle(i, n, r, o));
  }
}
function VI(t, e, i) {
  t.setAttribute(e, "style", i);
}
function Fv(t, e, i) {
  i === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", i);
}
function Lv(t, e, i) {
  let { mergedAttrs: n, classes: r, styles: o } = i;
  n !== null && Tu(t, e, n),
    r !== null && Fv(t, e, r),
    o !== null && VI(t, e, o);
}
var ja;
function BI() {
  if (ja === void 0 && ((ja = null), Lt.trustedTypes))
    try {
      ja = Lt.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return ja;
}
function Kg(t) {
  return BI()?.createScriptURL(t) || t;
}
var rl = class {
  constructor(e) {
    this.changingThisBreaksApplicationSecurity = e;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${gb})`;
  }
};
function Xo(t) {
  return t instanceof rl ? t.changingThisBreaksApplicationSecurity : t;
}
function Bf(t, e) {
  let i = UI(t);
  if (i != null && i !== e) {
    if (i === "ResourceURL" && e === "URL") return !0;
    throw new Error(`Required a safe ${e}, got a ${i} (see ${gb})`);
  }
  return i === e;
}
function UI(t) {
  return (t instanceof rl && t.getTypeName()) || null;
}
var HI = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function jv(t) {
  return (t = String(t)), t.match(HI) ? t : "unsafe:" + t;
}
var wl = (function (t) {
  return (
    (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HTML = 1)] = "HTML"),
    (t[(t.STYLE = 2)] = "STYLE"),
    (t[(t.SCRIPT = 3)] = "SCRIPT"),
    (t[(t.URL = 4)] = "URL"),
    (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    t
  );
})(wl || {});
function Uf(t) {
  let e = Bv();
  return e ? e.sanitize(wl.URL, t) || "" : Bf(t, "URL") ? Xo(t) : jv(Cn(t));
}
function $I(t) {
  let e = Bv();
  if (e) return Kg(e.sanitize(wl.RESOURCE_URL, t) || "");
  if (Bf(t, "ResourceURL")) return Kg(Xo(t));
  throw new E(904, !1);
}
function zI(t, e) {
  return (e === "src" &&
    (t === "embed" ||
      t === "frame" ||
      t === "iframe" ||
      t === "media" ||
      t === "script")) ||
    (e === "href" && (t === "base" || t === "link"))
    ? $I
    : Uf;
}
function Vv(t, e, i) {
  return zI(e, i)(t);
}
function Bv() {
  let t = ne();
  return t && t[Dn].sanitizer;
}
var Bu = class {};
var qI = "h",
  WI = "b";
var GI = (t, e, i) => null;
function Hf(t, e, i = !1) {
  return GI(t, e, i);
}
var Uu = class {},
  ol = class {};
function YI(t) {
  let e = Error(`No component factory found for ${ot(t)}.`);
  return (e[QI] = t), e;
}
var QI = "ngComponent";
var Hu = class {
    resolveComponentFactory(e) {
      throw YI(e);
    }
  },
  Xn = (() => {
    let e = class e {};
    e.NULL = new Hu();
    let t = e;
    return t;
  })();
function ZI() {
  return Fr(ht(), ne());
}
function Fr(t, e) {
  return new Z(At(t, e));
}
var Z = (() => {
  let e = class e {
    constructor(n) {
      this.nativeElement = n;
    }
  };
  e.__NG_ELEMENT_ID__ = ZI;
  let t = e;
  return t;
})();
function KI(t) {
  return t instanceof Z ? t.nativeElement : t;
}
var Oi = class {},
  un = (() => {
    let e = class e {
      constructor() {
        this.destroyNode = null;
      }
    };
    e.__NG_ELEMENT_ID__ = () => XI();
    let t = e;
    return t;
  })();
function XI() {
  let t = ne(),
    e = ht(),
    i = Kn(e.index, t);
  return (Yn(i) ? i : t)[Le];
}
var JI = (() => {
    let e = class e {};
    e.ɵprov = D({ token: e, providedIn: "root", factory: () => null });
    let t = e;
    return t;
  })(),
  mu = {};
function sl(t, e, i, n, r = !1) {
  for (; i !== null; ) {
    let o = e[i.index];
    o !== null && n.push(rn(o)), Vt(o) && eS(o, n);
    let s = i.type;
    if (s & 8) sl(t, e, i.child, n);
    else if (s & 32) {
      let a = Pf(i, e),
        l;
      for (; (l = a()); ) n.push(l);
    } else if (s & 16) {
      let a = Nv(e, i);
      if (Array.isArray(a)) n.push(...a);
      else {
        let l = Ff(e[Tt]);
        sl(l[Y], l, a, n, !0);
      }
    }
    i = r ? i.projectionNext : i.next;
  }
  return n;
}
function eS(t, e) {
  for (let i = tt; i < t.length; i++) {
    let n = t[i],
      r = n[Y].firstChild;
    r !== null && sl(n[Y], n, r, e);
  }
  t[Ii] !== t[Tn] && e.push(t[Ii]);
}
var Uv = [];
function tS(t) {
  return t[Di] ?? nS(t);
}
function nS(t) {
  let e = Uv.pop() ?? Object.create(rS);
  return (e.lView = t), e;
}
function iS(t) {
  t.lView[Di] !== t && ((t.lView = null), Uv.push(t));
}
var rS = ae(C({}, Jm), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      Vo(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[Di] = this;
    },
  }),
  oS = "ngOriginalError";
function gu(t) {
  return t[oS];
}
var Sn = class {
    constructor() {
      this._console = console;
    }
    handleError(e) {
      let i = this._findOriginalError(e);
      this._console.error("ERROR", e),
        i && this._console.error("ORIGINAL ERROR", i);
    }
    _findOriginalError(e) {
      let i = e && gu(e);
      for (; i && gu(i); ) i = gu(i);
      return i || null;
    }
  },
  Hv = new S("", {
    providedIn: "root",
    factory: () => w(Sn).handleError.bind(void 0),
  });
var $v = !1,
  sS = new S("", { providedIn: "root", factory: () => $v });
var Ut = {};
function O(t) {
  zv(Ze(), ne(), Mn() + t, !1);
}
function zv(t, e, i, n) {
  if (!n)
    if ((e[B] & 3) === 3) {
      let o = t.preOrderCheckHooks;
      o !== null && Ua(e, o, i);
    } else {
      let o = t.preOrderHooks;
      o !== null && Ha(e, o, 0, i);
    }
  Ti(i);
}
function y(t, e = te.Default) {
  let i = ne();
  if (i === null) return v(t, e);
  let n = ht();
  return dv(n, i, rt(t), e);
}
function aS(t, e) {
  let i = t.hostBindingOpCodes;
  if (i !== null)
    try {
      for (let n = 0; n < i.length; n++) {
        let r = i[n];
        if (r < 0) Ti(~r);
        else {
          let o = r,
            s = i[++n],
            a = i[++n];
          RD(s, o);
          let l = e[o];
          a(2, l);
        }
      }
    } finally {
      Ti(-1);
    }
}
function El(t, e, i, n, r, o, s, a, l, c, d) {
  let u = e.blueprint.slice();
  return (
    (u[Tn] = r),
    (u[B] = n | 4 | 128 | 8 | 64),
    (c !== null || (t && t[B] & 2048)) && (u[B] |= 2048),
    Hb(u),
    (u[Fe] = u[kr] = t),
    (u[et] = i),
    (u[Dn] = s || (t && t[Dn])),
    (u[Le] = a || (t && t[Le])),
    (u[Sr] = l || (t && t[Sr]) || null),
    (u[yt] = o),
    (u[bl] = gI()),
    (u[Ir] = d),
    (u[Nb] = c),
    (u[Tt] = e.type == 2 ? t[Tt] : u),
    u
  );
}
function Jo(t, e, i, n, r) {
  let o = t.data[e];
  if (o === null) (o = lS(t, e, i, n, r)), AD() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = i), (o.value = n), (o.attrs = r);
    let s = ID();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Yo(o, !0), o;
}
function lS(t, e, i, n, r) {
  let o = Wb(),
    s = Gb(),
    a = s ? o : o && o.parent,
    l = (t.data[e] = pS(t, a, i, e, n, r));
  return (
    t.firstChild === null && (t.firstChild = l),
    o !== null &&
      (s
        ? o.child == null && l.parent !== null && (o.child = l)
        : o.next === null && ((o.next = l), (l.prev = o))),
    l
  );
}
function qv(t, e, i, n) {
  if (i === 0) return -1;
  let r = e.length;
  for (let o = 0; o < i; o++) e.push(n), t.blueprint.push(n), t.data.push(null);
  return r;
}
function Wv(t, e, i, n, r) {
  let o = Mn(),
    s = n & 2;
  try {
    Ti(-1), s && e.length > st && zv(t, e, st, !1), Jt(s ? 2 : 0, r), i(n, r);
  } finally {
    Ti(o), Jt(s ? 3 : 1, r);
  }
}
function Gv(t, e, i) {
  if (Fb(e)) {
    let n = Qe(null);
    try {
      let r = e.directiveStart,
        o = e.directiveEnd;
      for (let s = r; s < o; s++) {
        let a = t.data[s];
        a.contentQueries && a.contentQueries(1, i[s], s);
      }
    } finally {
      Qe(n);
    }
  }
}
function Yv(t, e, i) {
  zb() && (_S(t, e, i, At(i, e)), (i.flags & 64) === 64 && ey(t, e, i));
}
function Qv(t, e, i = At) {
  let n = e.localNames;
  if (n !== null) {
    let r = e.index + 1;
    for (let o = 0; o < n.length; o += 2) {
      let s = n[o + 1],
        a = s === -1 ? i(e, t) : t[s];
      t[r++] = a;
    }
  }
}
function Zv(t) {
  let e = t.tView;
  return e === null || e.incompleteFirstPass
    ? (t.tView = $f(
        1,
        null,
        t.template,
        t.decls,
        t.vars,
        t.directiveDefs,
        t.pipeDefs,
        t.viewQuery,
        t.schemas,
        t.consts,
        t.id
      ))
    : e;
}
function $f(t, e, i, n, r, o, s, a, l, c, d) {
  let u = st + n,
    f = u + r,
    h = cS(u, f),
    p = typeof c == "function" ? c() : c;
  return (h[Y] = {
    type: t,
    blueprint: h,
    template: i,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: h.slice().fill(null, u),
    bindingStartIndex: u,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof o == "function" ? o() : o,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: l,
    consts: p,
    incompleteFirstPass: !1,
    ssrId: d,
  });
}
function cS(t, e) {
  let i = [];
  for (let n = 0; n < e; n++) i.push(n < t ? null : Ut);
  return i;
}
function dS(t, e, i, n) {
  let o = n.get(sS, $v) || i === nn.ShadowDom,
    s = t.selectRootElement(e, o);
  return uS(s), s;
}
function uS(t) {
  fS(t);
}
var fS = (t) => null;
function hS(t, e, i, n) {
  let r = ry(e);
  r.push(i), t.firstCreatePass && oy(t).push(n, r.length - 1);
}
function pS(t, e, i, n, r, o) {
  let s = e ? e.injectorIndex : -1,
    a = 0;
  return (
    qb() && (a |= 128),
    {
      type: i,
      index: n,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: r,
      attrs: o,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: e,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Xg(t, e, i, n) {
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      i = i === null ? {} : i;
      let o = t[r];
      n === null ? Jg(i, e, r, o) : n.hasOwnProperty(r) && Jg(i, e, n[r], o);
    }
  return i;
}
function Jg(t, e, i, n) {
  t.hasOwnProperty(i) ? t[i].push(e, n) : (t[i] = [e, n]);
}
function mS(t, e, i) {
  let n = e.directiveStart,
    r = e.directiveEnd,
    o = t.data,
    s = e.attrs,
    a = [],
    l = null,
    c = null;
  for (let d = n; d < r; d++) {
    let u = o[d],
      f = i ? i.get(u) : null,
      h = f ? f.inputs : null,
      p = f ? f.outputs : null;
    (l = Xg(u.inputs, d, l, h)), (c = Xg(u.outputs, d, c, p));
    let m = l !== null && s !== null && !Db(e) ? RS(l, d, s) : null;
    a.push(m);
  }
  l !== null &&
    (l.hasOwnProperty("class") && (e.flags |= 8),
    l.hasOwnProperty("style") && (e.flags |= 16)),
    (e.initialInputs = a),
    (e.inputs = l),
    (e.outputs = c);
}
function gS(t) {
  return t === "class"
    ? "className"
    : t === "for"
    ? "htmlFor"
    : t === "formaction"
    ? "formAction"
    : t === "innerHtml"
    ? "innerHTML"
    : t === "readonly"
    ? "readOnly"
    : t === "tabindex"
    ? "tabIndex"
    : t;
}
function Kv(t, e, i, n, r, o, s, a) {
  let l = At(e, i),
    c = e.inputs,
    d;
  !a && c != null && (d = c[n])
    ? (zf(t, i, d, n, r), vl(e) && bS(i, e.index))
    : e.type & 3
    ? ((n = gS(n)),
      (r = s != null ? s(r, e.value || "", n) : r),
      o.setProperty(l, n, r))
    : e.type & 12;
}
function bS(t, e) {
  let i = Kn(e, t);
  i[B] & 16 || (i[B] |= 64);
}
function Xv(t, e, i, n) {
  if (zb()) {
    let r = n === null ? null : { "": -1 },
      o = wS(t, i),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && Jv(t, e, i, s, r, a),
      r && ES(i, n, r);
  }
  i.mergedAttrs = Fo(i.mergedAttrs, i.attrs);
}
function Jv(t, e, i, n, r, o) {
  for (let c = 0; c < n.length; c++) ku(el(i, e), t, n[c].type);
  DS(i, t.data.length, n.length);
  for (let c = 0; c < n.length; c++) {
    let d = n[c];
    d.providersResolver && d.providersResolver(d);
  }
  let s = !1,
    a = !1,
    l = qv(t, e, n.length, null);
  for (let c = 0; c < n.length; c++) {
    let d = n[c];
    (i.mergedAttrs = Fo(i.mergedAttrs, d.hostAttrs)),
      IS(t, i, e, l, d),
      CS(l, d, r),
      d.contentQueries !== null && (i.flags |= 4),
      (d.hostBindings !== null || d.hostAttrs !== null || d.hostVars !== 0) &&
        (i.flags |= 64);
    let u = d.type.prototype;
    !s &&
      (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(i.index), (s = !0)),
      !a &&
        (u.ngOnChanges || u.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(i.index), (a = !0)),
      l++;
  }
  mS(t, i, o);
}
function vS(t, e, i, n, r) {
  let o = r.hostBindings;
  if (o) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    let a = ~e.index;
    yS(s) != a && s.push(a), s.push(i, n, o);
  }
}
function yS(t) {
  let e = t.length;
  for (; e > 0; ) {
    let i = t[--e];
    if (typeof i == "number" && i < 0) return i;
  }
  return 0;
}
function _S(t, e, i, n) {
  let r = i.directiveStart,
    o = i.directiveEnd;
  vl(i) && SS(e, i, t.data[r + i.componentOffset]),
    t.firstCreatePass || el(i, e),
    Ri(n, e);
  let s = i.initialInputs;
  for (let a = r; a < o; a++) {
    let l = t.data[a],
      c = Ai(e, t, a, i);
    if ((Ri(c, e), s !== null && AS(e, a - r, c, l, i, s), Qn(l))) {
      let d = Kn(i.index, e);
      d[et] = Ai(e, t, a, i);
    }
  }
}
function ey(t, e, i) {
  let n = i.directiveStart,
    r = i.directiveEnd,
    o = i.index,
    s = OD();
  try {
    Ti(o);
    for (let a = n; a < r; a++) {
      let l = t.data[a],
        c = e[a];
      Ru(a),
        (l.hostBindings !== null || l.hostVars !== 0 || l.hostAttrs !== null) &&
          xS(l, c);
    }
  } finally {
    Ti(-1), Ru(s);
  }
}
function xS(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e);
}
function wS(t, e) {
  let i = t.directiveRegistry,
    n = null,
    r = null;
  if (i)
    for (let o = 0; o < i.length; o++) {
      let s = i[o];
      if (Ib(e, s.selectors, !1))
        if ((n || (n = []), Qn(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (r = r || new Map()),
              s.findHostDirectiveDefs(s, a, r),
              n.unshift(...a, s);
            let l = a.length;
            $u(t, e, l);
          } else n.unshift(s), $u(t, e, 0);
        else
          (r = r || new Map()), s.findHostDirectiveDefs?.(s, n, r), n.push(s);
    }
  return n === null ? null : [n, r];
}
function $u(t, e, i) {
  (e.componentOffset = i), (t.components ??= []).push(e.index);
}
function ES(t, e, i) {
  if (e) {
    let n = (t.localNames = []);
    for (let r = 0; r < e.length; r += 2) {
      let o = i[e[r + 1]];
      if (o == null) throw new E(-301, !1);
      n.push(e[r], o);
    }
  }
}
function CS(t, e, i) {
  if (i) {
    if (e.exportAs)
      for (let n = 0; n < e.exportAs.length; n++) i[e.exportAs[n]] = t;
    Qn(e) && (i[""] = t);
  }
}
function DS(t, e, i) {
  (t.flags |= 1),
    (t.directiveStart = e),
    (t.directiveEnd = e + i),
    (t.providerIndexes = e);
}
function IS(t, e, i, n, r) {
  t.data[n] = r;
  let o = r.factory || (r.factory = Si(r.type, !0)),
    s = new Mi(o, Qn(r), y);
  (t.blueprint[n] = s), (i[n] = s), vS(t, e, n, qv(t, i, r.hostVars, Ut), r);
}
function SS(t, e, i) {
  let n = At(e, t),
    r = Zv(i),
    o = t[Dn].rendererFactory,
    s = 16;
  i.signals ? (s = 4096) : i.onPush && (s = 64);
  let a = Cl(
    t,
    El(t, r, null, s, n, e, null, o.createRenderer(n, i), null, null, null)
  );
  t[e.index] = a;
}
function TS(t, e, i, n, r, o) {
  let s = At(t, e);
  MS(e[Le], s, o, t.value, i, n, r);
}
function MS(t, e, i, n, r, o, s) {
  if (o == null) t.removeAttribute(e, r, i);
  else {
    let a = s == null ? Cn(o) : s(o, n || "", r);
    t.setAttribute(e, r, a, i);
  }
}
function AS(t, e, i, n, r, o) {
  let s = o[e];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let l = s[a++],
        c = s[a++],
        d = s[a++];
      ty(n, i, l, c, d);
    }
}
function ty(t, e, i, n, r) {
  let o = Qe(null);
  try {
    let s = t.inputTransforms;
    s !== null && s.hasOwnProperty(n) && (r = s[n].call(e, r)),
      t.setInput !== null ? t.setInput(e, r, i, n) : (e[n] = r);
  } finally {
    Qe(o);
  }
}
function RS(t, e, i) {
  let n = null,
    r = 0;
  for (; r < i.length; ) {
    let o = i[r];
    if (o === 0) {
      r += 4;
      continue;
    } else if (o === 5) {
      r += 2;
      continue;
    }
    if (typeof o == "number") break;
    if (t.hasOwnProperty(o)) {
      n === null && (n = []);
      let s = t[o];
      for (let a = 0; a < s.length; a += 2)
        if (s[a] === e) {
          n.push(o, s[a + 1], i[r + 1]);
          break;
        }
    }
    r += 2;
  }
  return n;
}
function ny(t, e, i, n) {
  return [t, !0, 0, e, null, n, null, i, null, null];
}
function iy(t, e) {
  let i = t.contentQueries;
  if (i !== null) {
    let n = Qe(null);
    try {
      for (let r = 0; r < i.length; r += 2) {
        let o = i[r],
          s = i[r + 1];
        if (s !== -1) {
          let a = t.data[s];
          wf(o), a.contentQueries(2, e[s], s);
        }
      }
    } finally {
      Qe(n);
    }
  }
}
function Cl(t, e) {
  return t[jo] ? (t[Hg][jt] = e) : (t[jo] = e), (t[Hg] = e), e;
}
function zu(t, e, i) {
  wf(0);
  let n = Qe(null);
  try {
    e(t, i);
  } finally {
    Qe(n);
  }
}
function ry(t) {
  return t[Lo] || (t[Lo] = []);
}
function oy(t) {
  return t.cleanup || (t.cleanup = []);
}
function sy(t, e) {
  let i = t[Sr],
    n = i ? i.get(Sn, null) : null;
  n && n.handleError(e);
}
function zf(t, e, i, n, r) {
  for (let o = 0; o < i.length; ) {
    let s = i[o++],
      a = i[o++],
      l = e[s],
      c = t.data[s];
    ty(c, l, n, a, r);
  }
}
function qf(t, e, i) {
  let n = Bb(e, t);
  xI(t[Le], n, i);
}
var OS = 100;
function kS(t, e = !0) {
  let i = t[Dn],
    n = i.rendererFactory,
    r = i.afterRenderEventManager,
    o = !1;
  o || (n.begin?.(), r?.begin());
  try {
    NS(t);
  } catch (s) {
    throw (e && sy(t, s), s);
  } finally {
    o || (n.end?.(), i.inlineEffectRunner?.flush(), r?.end());
  }
}
function NS(t) {
  qu(t, 0);
  let e = 0;
  for (; $b(t); ) {
    if (e === OS) throw new E(103, !1);
    e++, qu(t, 1);
  }
}
function PS(t, e, i, n) {
  let r = e[B];
  if ((r & 256) === 256) return;
  let o = !1;
  !o && e[Dn].inlineEffectRunner?.flush(), Ef(e);
  let s = null,
    a = null;
  !o && FS(t) && ((a = tS(e)), (s = eg(a)));
  try {
    Hb(e), MD(t.bindingStartIndex), i !== null && Wv(t, e, i, 2, n);
    let l = (r & 3) === 3;
    if (!o)
      if (l) {
        let u = t.preOrderCheckHooks;
        u !== null && Ua(e, u, null);
      } else {
        let u = t.preOrderHooks;
        u !== null && Ha(e, u, 0, null), du(e, 0);
      }
    if ((LS(e), ay(e, 0), t.contentQueries !== null && iy(t, e), !o))
      if (l) {
        let u = t.contentCheckHooks;
        u !== null && Ua(e, u);
      } else {
        let u = t.contentHooks;
        u !== null && Ha(e, u, 1), du(e, 1);
      }
    aS(t, e);
    let c = t.components;
    c !== null && cy(e, c, 0);
    let d = t.viewQuery;
    if ((d !== null && zu(2, d, n), !o))
      if (l) {
        let u = t.viewCheckHooks;
        u !== null && Ua(e, u);
      } else {
        let u = t.viewHooks;
        u !== null && Ha(e, u, 2), du(e, 2);
      }
    if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[cu])) {
      for (let u of e[cu]) u();
      e[cu] = null;
    }
    o || (e[B] &= -73);
  } catch (l) {
    throw (Vo(e), l);
  } finally {
    a !== null && (tg(a, s), iS(a)), Cf();
  }
}
function FS(t) {
  return t.type !== 2;
}
function ay(t, e) {
  for (let i = Iv(t); i !== null; i = Sv(i)) {
    i[B] &= ~Mr.HasChildViewsToRefresh;
    for (let n = tt; n < i.length; n++) {
      let r = i[n];
      ly(r, e);
    }
  }
}
function LS(t) {
  for (let e = Iv(t); e !== null; e = Sv(e)) {
    if (!(e[B] & Mr.HasTransplantedViews)) continue;
    let i = e[Tr];
    for (let n = 0; n < i.length; n++) {
      let r = i[n],
        o = r[Fe];
      vD(r);
    }
  }
}
function jS(t, e, i) {
  let n = Kn(e, t);
  ly(n, i);
}
function ly(t, e) {
  _f(t) && qu(t, e);
}
function qu(t, e) {
  let n = t[Y],
    r = t[B],
    o = t[Di],
    s = !!(e === 0 && r & 16);
  if (
    ((s ||= !!(r & 64 && e === 0)),
    (s ||= !!(r & 1024)),
    (s ||= !!(o?.dirty && Wd(o))),
    o && (o.dirty = !1),
    (t[B] &= -9217),
    s)
  )
    PS(n, t, n.template, t[et]);
  else if (r & 8192) {
    ay(t, 1);
    let a = n.components;
    a !== null && cy(t, a, 1);
  }
}
function cy(t, e, i) {
  for (let n = 0; n < e.length; n++) jS(t, e[n], i);
}
function Wf(t) {
  for (t[Dn].changeDetectionScheduler?.notify(); t; ) {
    t[B] |= 64;
    let e = Ff(t);
    if (lD(t) && !e) return t;
    t = e;
  }
  return null;
}
var ki = class {
    get rootNodes() {
      let e = this._lView,
        i = e[Y];
      return sl(i, e, i.firstChild, []);
    }
    constructor(e, i, n = !0) {
      (this._lView = e),
        (this._cdRefInjectingView = i),
        (this.notifyErrorHandler = n),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[et];
    }
    set context(e) {
      this._lView[et] = e;
    }
    get destroyed() {
      return (this._lView[B] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let e = this._lView[Fe];
        if (Vt(e)) {
          let i = e[Qa],
            n = i ? i.indexOf(this) : -1;
          n > -1 && (Uo(e, n), tl(i, n));
        }
        this._attachedToViewContainer = !1;
      }
      xl(this._lView[Y], this._lView);
    }
    onDestroy(e) {
      _D(this._lView, e);
    }
    markForCheck() {
      Wf(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[B] &= -129;
    }
    reattach() {
      Au(this._lView), (this._lView[B] |= 128);
    }
    detectChanges() {
      (this._lView[B] |= 1024), kS(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new E(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), CI(this._lView[Y], this._lView);
    }
    attachToAppRef(e) {
      if (this._attachedToViewContainer) throw new E(902, !1);
      (this._appRef = e), Au(this._lView);
    }
  },
  lt = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = VS;
    let t = e;
    return t;
  })();
function VS(t) {
  return BS(ht(), ne(), (t & 16) === 16);
}
function BS(t, e, i) {
  if (vl(t) && !i) {
    let n = Kn(t.index, e);
    return new ki(n, n);
  } else if (t.type & 47) {
    let n = e[Tt];
    return new ki(n, e);
  }
  return null;
}
var eb = new Set();
function es(t) {
  eb.has(t) ||
    (eb.add(t),
    performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
var Wu = class extends F {
  constructor(e = !1) {
    super(), (this.__isAsync = e);
  }
  emit(e) {
    super.next(e);
  }
  subscribe(e, i, n) {
    let r = e,
      o = i || (() => null),
      s = n;
    if (e && typeof e == "object") {
      let l = e;
      (r = l.next?.bind(l)), (o = l.error?.bind(l)), (s = l.complete?.bind(l));
    }
    this.__isAsync && ((o = bu(o)), r && (r = bu(r)), s && (s = bu(s)));
    let a = super.subscribe({ next: r, error: o, complete: s });
    return e instanceof ce && e.add(a), a;
  }
};
function bu(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
var le = Wu;
function tb(...t) {}
function US() {
  let t = typeof Lt.requestAnimationFrame == "function",
    e = Lt[t ? "requestAnimationFrame" : "setTimeout"],
    i = Lt[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && e && i) {
    let n = e[Zone.__symbol__("OriginalDelegate")];
    n && (e = n);
    let r = i[Zone.__symbol__("OriginalDelegate")];
    r && (i = r);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: i };
}
var R = class t {
    constructor({
      enableLongStackTrace: e = !1,
      shouldCoalesceEventChangeDetection: i = !1,
      shouldCoalesceRunChangeDetection: n = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new le(!1)),
        (this.onMicrotaskEmpty = new le(!1)),
        (this.onStable = new le(!1)),
        (this.onError = new le(!1)),
        typeof Zone > "u")
      )
        throw new E(908, !1);
      Zone.assertZonePatched();
      let r = this;
      (r._nesting = 0),
        (r._outer = r._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (r._inner = r._inner.fork(new Zone.TaskTrackingZoneSpec())),
        e &&
          Zone.longStackTraceZoneSpec &&
          (r._inner = r._inner.fork(Zone.longStackTraceZoneSpec)),
        (r.shouldCoalesceEventChangeDetection = !n && i),
        (r.shouldCoalesceRunChangeDetection = n),
        (r.lastRequestAnimationFrameId = -1),
        (r.nativeRequestAnimationFrame = US().nativeRequestAnimationFrame),
        zS(r);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new E(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new E(909, !1);
    }
    run(e, i, n) {
      return this._inner.run(e, i, n);
    }
    runTask(e, i, n, r) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + r, e, HS, tb, tb);
      try {
        return o.runTask(s, i, n);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(e, i, n) {
      return this._inner.runGuarded(e, i, n);
    }
    runOutsideAngular(e) {
      return this._outer.run(e);
    }
  },
  HS = {};
function Gf(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if ((t._nesting--, !t.hasPendingMicrotasks))
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function $S(t) {
  t.isCheckStableRunning ||
    t.lastRequestAnimationFrameId !== -1 ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      Lt,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            "fakeTopEventTask",
            () => {
              (t.lastRequestAnimationFrameId = -1),
                Gu(t),
                (t.isCheckStableRunning = !0),
                Gf(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {}
          )),
          t.fakeTopEventTask.invoke();
      }
    )),
    Gu(t));
}
function zS(t) {
  let e = () => {
    $S(t);
  };
  t._inner = t._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (i, n, r, o, s, a) => {
      if (qS(a)) return i.invokeTask(r, o, s, a);
      try {
        return nb(t), i.invokeTask(r, o, s, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && o.type === "eventTask") ||
          t.shouldCoalesceRunChangeDetection) &&
          e(),
          ib(t);
      }
    },
    onInvoke: (i, n, r, o, s, a, l) => {
      try {
        return nb(t), i.invoke(r, o, s, a, l);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), ib(t);
      }
    },
    onHasTask: (i, n, r, o) => {
      i.hasTask(r, o),
        n === r &&
          (o.change == "microTask"
            ? ((t._hasPendingMicrotasks = o.microTask), Gu(t), Gf(t))
            : o.change == "macroTask" &&
              (t.hasPendingMacrotasks = o.macroTask));
    },
    onHandleError: (i, n, r, o) => (
      i.handleError(r, o), t.runOutsideAngular(() => t.onError.emit(o)), !1
    ),
  });
}
function Gu(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    t.lastRequestAnimationFrameId !== -1)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function nb(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function ib(t) {
  t._nesting--, Gf(t);
}
function qS(t) {
  return !Array.isArray(t) || t.length !== 1
    ? !1
    : t[0].data?.__ignore_ng_zone__ === !0;
}
var WS = (() => {
  let e = class e {
    constructor() {
      (this.renderDepth = 0),
        (this.handler = null),
        (this.internalCallbacks = []);
    }
    begin() {
      this.handler?.validateBegin(), this.renderDepth++;
    }
    end() {
      if ((this.renderDepth--, this.renderDepth === 0)) {
        for (let n of this.internalCallbacks) n();
        (this.internalCallbacks.length = 0), this.handler?.execute();
      }
    }
    ngOnDestroy() {
      this.handler?.destroy(),
        (this.handler = null),
        (this.internalCallbacks.length = 0);
    }
  };
  e.ɵprov = D({ token: e, providedIn: "root", factory: () => new e() });
  let t = e;
  return t;
})();
function GS(t, e) {
  let i = Kn(e, t),
    n = i[Y];
  YS(n, i);
  let r = i[Tn];
  r !== null && i[Ir] === null && (i[Ir] = Hf(r, i[Sr])), Yf(n, i, i[et]);
}
function YS(t, e) {
  for (let i = e.length; i < t.blueprint.length; i++) e.push(t.blueprint[i]);
}
function Yf(t, e, i) {
  Ef(e);
  try {
    let n = t.viewQuery;
    n !== null && zu(1, n, i);
    let r = t.template;
    r !== null && Wv(t, e, r, 1, i),
      t.firstCreatePass && (t.firstCreatePass = !1),
      t.staticContentQueries && iy(t, e),
      t.staticViewQueries && zu(2, t.viewQuery, i);
    let o = t.components;
    o !== null && QS(e, o);
  } catch (n) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      n)
    );
  } finally {
    (e[B] &= -5), Cf();
  }
}
function QS(t, e) {
  for (let i = 0; i < e.length; i++) GS(t, e[i]);
}
function Yu(t, e, i) {
  let n = i ? t.styles : null,
    r = i ? t.classes : null,
    o = 0;
  if (e !== null)
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if (typeof a == "number") o = a;
      else if (o == 1) r = Og(r, a);
      else if (o == 2) {
        let l = a,
          c = e[++s];
        n = Og(n, l + ": " + c + ";");
      }
    }
  i ? (t.styles = n) : (t.stylesWithoutHost = n),
    i ? (t.classes = r) : (t.classesWithoutHost = r);
}
var al = class extends Xn {
  constructor(e) {
    super(), (this.ngModule = e);
  }
  resolveComponentFactory(e) {
    let i = Ci(e);
    return new Ho(i, this.ngModule);
  }
};
function rb(t) {
  let e = [];
  for (let i in t)
    if (t.hasOwnProperty(i)) {
      let n = t[i];
      e.push({ propName: n, templateName: i });
    }
  return e;
}
function ZS(t) {
  let e = t.toLowerCase();
  return e === "svg" ? fD : e === "math" ? hD : null;
}
var Qu = class {
    constructor(e, i) {
      (this.injector = e), (this.parentInjector = i);
    }
    get(e, i, n) {
      n = ml(n);
      let r = this.injector.get(e, mu, n);
      return r !== mu || i === mu ? r : this.parentInjector.get(e, i, n);
    }
  },
  Ho = class extends ol {
    get inputs() {
      let e = this.componentDef,
        i = e.inputTransforms,
        n = rb(e.inputs);
      if (i !== null)
        for (let r of n)
          i.hasOwnProperty(r.propName) && (r.transform = i[r.propName]);
      return n;
    }
    get outputs() {
      return rb(this.componentDef.outputs);
    }
    constructor(e, i) {
      super(),
        (this.componentDef = e),
        (this.ngModule = i),
        (this.componentType = e.type),
        (this.selector = iD(e.selectors)),
        (this.ngContentSelectors = e.ngContentSelectors
          ? e.ngContentSelectors
          : []),
        (this.isBoundToModule = !!i);
    }
    create(e, i, n, r) {
      r = r || this.ngModule;
      let o = r instanceof ft ? r : r?.injector;
      o &&
        this.componentDef.getStandaloneInjector !== null &&
        (o = this.componentDef.getStandaloneInjector(o) || o);
      let s = o ? new Qu(e, o) : e,
        a = s.get(Oi, null);
      if (a === null) throw new E(407, !1);
      let l = s.get(JI, null),
        c = s.get(WS, null),
        d = s.get(Bu, null),
        u = {
          rendererFactory: a,
          sanitizer: l,
          inlineEffectRunner: null,
          afterRenderEventManager: c,
          changeDetectionScheduler: d,
        },
        f = a.createRenderer(null, this.componentDef),
        h = this.componentDef.selectors[0][0] || "div",
        p = n ? dS(f, n, this.componentDef.encapsulation, s) : Mv(f, h, ZS(h)),
        m = 512;
      this.componentDef.signals
        ? (m |= 4096)
        : this.componentDef.onPush || (m |= 16);
      let g = null;
      p !== null && (g = Hf(p, s, !0));
      let b = $f(0, null, null, 1, 0, null, null, null, null, null, null),
        x = El(null, b, null, m, null, null, u, f, s, null, g);
      Ef(x);
      let P, I;
      try {
        let re = this.componentDef,
          H,
          se = null;
        re.findHostDirectiveDefs
          ? ((H = []),
            (se = new Map()),
            re.findHostDirectiveDefs(re, H, se),
            H.push(re))
          : (H = [re]);
        let Ue = KS(x, p),
          nt = XS(Ue, p, re, H, x, u, f);
        (I = yf(b, st)),
          p && tT(f, re, p, n),
          i !== void 0 && nT(I, this.ngContentSelectors, i),
          (P = eT(nt, re, H, se, x, [iT])),
          Yf(b, x, null);
      } finally {
        Cf();
      }
      return new Zu(this.componentType, P, Fr(I, x), x, I);
    }
  },
  Zu = class extends Uu {
    constructor(e, i, n, r, o) {
      super(),
        (this.location = n),
        (this._rootLView = r),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = i),
        (this.hostView = this.changeDetectorRef = new ki(r, void 0, !1)),
        (this.componentType = e);
    }
    setInput(e, i) {
      let n = this._tNode.inputs,
        r;
      if (n !== null && (r = n[e])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(e) &&
            Object.is(this.previousInputValues.get(e), i))
        )
          return;
        let o = this._rootLView;
        zf(o[Y], o, r, e, i), this.previousInputValues.set(e, i);
        let s = Kn(this._tNode.index, o);
        Wf(s);
      }
    }
    get injector() {
      return new Ei(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(e) {
      this.hostView.onDestroy(e);
    }
  };
function KS(t, e) {
  let i = t[Y],
    n = st;
  return (t[n] = e), Jo(i, n, 2, "#host", null);
}
function XS(t, e, i, n, r, o, s) {
  let a = r[Y];
  JS(n, t, e, s);
  let l = null;
  e !== null && (l = Hf(e, r[Sr]));
  let c = o.rendererFactory.createRenderer(e, i),
    d = 16;
  i.signals ? (d = 4096) : i.onPush && (d = 64);
  let u = El(r, Zv(i), null, d, r[t.index], t, o, c, null, null, l);
  return (
    a.firstCreatePass && $u(a, t, n.length - 1), Cl(r, u), (r[t.index] = u)
  );
}
function JS(t, e, i, n) {
  for (let r of t) e.mergedAttrs = Fo(e.mergedAttrs, r.hostAttrs);
  e.mergedAttrs !== null &&
    (Yu(e, e.mergedAttrs, !0), i !== null && Lv(n, i, e));
}
function eT(t, e, i, n, r, o) {
  let s = ht(),
    a = r[Y],
    l = At(s, r);
  Jv(a, r, s, i, null, n);
  for (let d = 0; d < i.length; d++) {
    let u = s.directiveStart + d,
      f = Ai(r, a, u, s);
    Ri(f, r);
  }
  ey(a, r, s), l && Ri(l, r);
  let c = Ai(r, a, s.directiveStart + s.componentOffset, s);
  if (((t[et] = r[et] = c), o !== null)) for (let d of o) d(c, e);
  return Gv(a, s, t), c;
}
function tT(t, e, i, n) {
  if (n) Tu(t, i, ["ng-version", "17.0.8"]);
  else {
    let { attrs: r, classes: o } = rD(e.selectors[0]);
    r && Tu(t, i, r), o && o.length > 0 && Fv(t, i, o.join(" "));
  }
}
function nT(t, e, i) {
  let n = (t.projection = []);
  for (let r = 0; r < e.length; r++) {
    let o = i[r];
    n.push(o != null ? Array.from(o) : null);
  }
}
function iT() {
  let t = ht();
  Tf(ne()[Y], t);
}
function rT(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function Oe(t) {
  let e = rT(t.type),
    i = !0,
    n = [t];
  for (; e; ) {
    let r;
    if (Qn(t)) r = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp) throw new E(903, !1);
      r = e.ɵdir;
    }
    if (r) {
      if (i) {
        n.push(r);
        let s = t;
        (s.inputs = Va(t.inputs)),
          (s.inputTransforms = Va(t.inputTransforms)),
          (s.declaredInputs = Va(t.declaredInputs)),
          (s.outputs = Va(t.outputs));
        let a = r.hostBindings;
        a && lT(t, a);
        let l = r.viewQuery,
          c = r.contentQueries;
        if (
          (l && sT(t, l),
          c && aT(t, c),
          La(t.inputs, r.inputs),
          La(t.declaredInputs, r.declaredInputs),
          La(t.outputs, r.outputs),
          r.inputTransforms !== null &&
            (s.inputTransforms === null && (s.inputTransforms = {}),
            La(s.inputTransforms, r.inputTransforms)),
          Qn(r) && r.data.animation)
        ) {
          let d = t.data;
          d.animation = (d.animation || []).concat(r.data.animation);
        }
      }
      let o = r.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(t), a === Oe && (i = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  oT(n);
}
function oT(t) {
  let e = 0,
    i = null;
  for (let n = t.length - 1; n >= 0; n--) {
    let r = t[n];
    (r.hostVars = e += r.hostVars),
      (r.hostAttrs = Fo(r.hostAttrs, (i = Fo(i, r.hostAttrs))));
  }
}
function Va(t) {
  return t === Dr ? {} : t === St ? [] : t;
}
function sT(t, e) {
  let i = t.viewQuery;
  i
    ? (t.viewQuery = (n, r) => {
        e(n, r), i(n, r);
      })
    : (t.viewQuery = e);
}
function aT(t, e) {
  let i = t.contentQueries;
  i
    ? (t.contentQueries = (n, r, o) => {
        e(n, r, o), i(n, r, o);
      })
    : (t.contentQueries = e);
}
function lT(t, e) {
  let i = t.hostBindings;
  i
    ? (t.hostBindings = (n, r) => {
        e(n, r), i(n, r);
      })
    : (t.hostBindings = e);
}
function Ht(t) {
  let e = t.inputConfig,
    i = {};
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let r = e[n];
      Array.isArray(r) && r[2] && (i[n] = r[2]);
    }
  t.inputTransforms = i;
}
function cT(t, e, i) {
  return (t[e] = i);
}
function on(t, e, i) {
  let n = t[e];
  return Object.is(n, i) ? !1 : ((t[e] = i), !0);
}
function Qf(t, e, i, n) {
  let r = on(t, e, i);
  return on(t, e + 1, n) || r;
}
function dT(t, e, i, n, r) {
  let o = Qf(t, e, i, n);
  return on(t, e + 2, r) || o;
}
function je(t, e, i, n) {
  let r = ne(),
    o = Nr();
  if (on(r, o, e)) {
    let s = Ze(),
      a = Df();
    TS(a, r, t, e, i, n);
  }
  return je;
}
function uT(t, e, i, n) {
  return on(t, Nr(), i) ? e + Cn(i) + n : Ut;
}
function fT(t, e, i, n, r, o) {
  let s = Qb(),
    a = Qf(t, s, i, r);
  return xf(2), a ? e + Cn(i) + n + Cn(r) + o : Ut;
}
function hT(t, e, i, n, r, o, s, a) {
  let l = Qb(),
    c = dT(t, l, i, r, s);
  return xf(3), c ? e + Cn(i) + n + Cn(r) + o + Cn(s) + a : Ut;
}
function Ba(t, e) {
  return (t << 17) | (e << 2);
}
function Ni(t) {
  return (t >> 17) & 32767;
}
function pT(t) {
  return (t & 2) == 2;
}
function mT(t, e) {
  return (t & 131071) | (e << 17);
}
function Ku(t) {
  return t | 2;
}
function Or(t) {
  return (t & 131068) >> 2;
}
function vu(t, e) {
  return (t & -131069) | (e << 2);
}
function gT(t) {
  return (t & 1) === 1;
}
function Xu(t) {
  return t | 1;
}
function bT(t, e, i, n, r, o) {
  let s = o ? e.classBindings : e.styleBindings,
    a = Ni(s),
    l = Or(s);
  t[n] = i;
  let c = !1,
    d;
  if (Array.isArray(i)) {
    let u = i;
    (d = u[1]), (d === null || Qo(u, d) > 0) && (c = !0);
  } else d = i;
  if (r)
    if (l !== 0) {
      let f = Ni(t[a + 1]);
      (t[n + 1] = Ba(f, a)),
        f !== 0 && (t[f + 1] = vu(t[f + 1], n)),
        (t[a + 1] = mT(t[a + 1], n));
    } else
      (t[n + 1] = Ba(a, 0)), a !== 0 && (t[a + 1] = vu(t[a + 1], n)), (a = n);
  else
    (t[n + 1] = Ba(l, 0)),
      a === 0 ? (a = n) : (t[l + 1] = vu(t[l + 1], n)),
      (l = n);
  c && (t[n + 1] = Ku(t[n + 1])),
    ob(t, d, n, !0, o),
    ob(t, d, n, !1, o),
    vT(e, d, t, n, o),
    (s = Ba(a, l)),
    o ? (e.classBindings = s) : (e.styleBindings = s);
}
function vT(t, e, i, n, r) {
  let o = r ? t.residualClasses : t.residualStyles;
  o != null &&
    typeof e == "string" &&
    Qo(o, e) >= 0 &&
    (i[n + 1] = Xu(i[n + 1]));
}
function ob(t, e, i, n, r) {
  let o = t[i + 1],
    s = e === null,
    a = n ? Ni(o) : Or(o),
    l = !1;
  for (; a !== 0 && (l === !1 || s); ) {
    let c = t[a],
      d = t[a + 1];
    yT(c, e) && ((l = !0), (t[a + 1] = n ? Xu(d) : Ku(d))),
      (a = n ? Ni(d) : Or(d));
  }
  l && (t[i + 1] = n ? Ku(o) : Xu(o));
}
function yT(t, e) {
  return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
    ? !0
    : Array.isArray(t) && typeof e == "string"
    ? Qo(t, e) >= 0
    : !1;
}
function de(t, e, i) {
  let n = ne(),
    r = Nr();
  if (on(n, r, e)) {
    let o = Ze(),
      s = Df();
    Kv(o, s, n, t, e, n[Le], i, !1);
  }
  return de;
}
function sb(t, e, i, n, r) {
  let o = e.inputs,
    s = r ? "class" : "style";
  zf(t, i, o[s], s, n);
}
function ts(t, e, i) {
  return dy(t, e, i, !1), ts;
}
function Ie(t, e) {
  return dy(t, e, null, !0), Ie;
}
function dy(t, e, i, n) {
  let r = ne(),
    o = Ze(),
    s = xf(2);
  if ((o.firstUpdatePass && xT(o, t, s, n), e !== Ut && on(r, s, e))) {
    let a = o.data[Mn()];
    IT(o, a, r, r[Le], t, (r[s + 1] = ST(e, i)), n, s);
  }
}
function _T(t, e) {
  return e >= t.expandoStartIndex;
}
function xT(t, e, i, n) {
  let r = t.data;
  if (r[i + 1] === null) {
    let o = r[Mn()],
      s = _T(t, i);
    TT(o, n) && e === null && !s && (e = !1),
      (e = wT(r, o, e, n)),
      bT(r, o, e, i, s, n);
  }
}
function wT(t, e, i, n) {
  let r = kD(t),
    o = n ? e.residualClasses : e.residualStyles;
  if (r === null)
    (n ? e.classBindings : e.styleBindings) === 0 &&
      ((i = yu(null, t, e, i, n)), (i = $o(i, e.attrs, n)), (o = null));
  else {
    let s = e.directiveStylingLast;
    if (s === -1 || t[s] !== r)
      if (((i = yu(r, t, e, i, n)), o === null)) {
        let l = ET(t, e, n);
        l !== void 0 &&
          Array.isArray(l) &&
          ((l = yu(null, t, e, l[1], n)),
          (l = $o(l, e.attrs, n)),
          CT(t, e, n, l));
      } else o = DT(t, e, n);
  }
  return (
    o !== void 0 && (n ? (e.residualClasses = o) : (e.residualStyles = o)), i
  );
}
function ET(t, e, i) {
  let n = i ? e.classBindings : e.styleBindings;
  if (Or(n) !== 0) return t[Ni(n)];
}
function CT(t, e, i, n) {
  let r = i ? e.classBindings : e.styleBindings;
  t[Ni(r)] = n;
}
function DT(t, e, i) {
  let n,
    r = e.directiveEnd;
  for (let o = 1 + e.directiveStylingLast; o < r; o++) {
    let s = t[o].hostAttrs;
    n = $o(n, s, i);
  }
  return $o(n, e.attrs, i);
}
function yu(t, e, i, n, r) {
  let o = null,
    s = i.directiveEnd,
    a = i.directiveStylingLast;
  for (
    a === -1 ? (a = i.directiveStart) : a++;
    a < s && ((o = e[a]), (n = $o(n, o.hostAttrs, r)), o !== t);

  )
    a++;
  return t !== null && (i.directiveStylingLast = a), n;
}
function $o(t, e, i) {
  let n = i ? 1 : 2,
    r = -1;
  if (e !== null)
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      typeof s == "number"
        ? (r = s)
        : r === n &&
          (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]),
          tI(t, s, i ? !0 : e[++o]));
    }
  return t === void 0 ? null : t;
}
function IT(t, e, i, n, r, o, s, a) {
  if (!(e.type & 3)) return;
  let l = t.data,
    c = l[a + 1],
    d = gT(c) ? ab(l, e, i, r, Or(c), s) : void 0;
  if (!ll(d)) {
    ll(o) || (pT(c) && (o = ab(l, null, i, r, a, s)));
    let u = Bb(Mn(), i);
    jI(n, s, u, r, o);
  }
}
function ab(t, e, i, n, r, o) {
  let s = e === null,
    a;
  for (; r > 0; ) {
    let l = t[r],
      c = Array.isArray(l),
      d = c ? l[1] : l,
      u = d === null,
      f = i[r + 1];
    f === Ut && (f = u ? St : void 0);
    let h = u ? fu(f, n) : d === n ? f : void 0;
    if ((c && !ll(h) && (h = fu(l, n)), ll(h) && ((a = h), s))) return a;
    let p = t[r + 1];
    r = s ? Ni(p) : Or(p);
  }
  if (e !== null) {
    let l = o ? e.residualClasses : e.residualStyles;
    l != null && (a = fu(l, n));
  }
  return a;
}
function ll(t) {
  return t !== void 0;
}
function ST(t, e) {
  return (
    t == null ||
      t === "" ||
      (typeof e == "string"
        ? (t = t + e)
        : typeof t == "object" && (t = ot(Xo(t)))),
    t
  );
}
function TT(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0;
}
var o5 = new RegExp(`^(\\d+)*(${WI}|${qI})*(.*)`);
var MT = (t, e) => null;
function zo(t, e) {
  return MT(t, e);
}
var Ju = class {
  destroy(e) {}
  updateValue(e, i) {}
  swap(e, i) {
    let n = Math.min(e, i),
      r = Math.max(e, i),
      o = this.detach(r);
    if (r - n > 1) {
      let s = this.detach(n);
      this.attach(n, o), this.attach(r, s);
    } else this.attach(n, o);
  }
  move(e, i) {
    this.attach(i, this.detach(e));
  }
};
function _u(t, e, i, n, r) {
  return t === i && Object.is(e, n) ? 1 : Object.is(r(t, e), r(i, n)) ? -1 : 0;
}
function AT(t, e, i) {
  let n,
    r,
    o = 0,
    s = t.length - 1;
  if (Array.isArray(e)) {
    let a = e.length - 1;
    for (; o <= s && o <= a; ) {
      let l = t.at(o),
        c = e[o],
        d = _u(o, l, o, c, i);
      if (d !== 0) {
        d < 0 && t.updateValue(o, c), o++;
        continue;
      }
      let u = t.at(s),
        f = e[a],
        h = _u(s, u, a, f, i);
      if (h !== 0) {
        h < 0 && t.updateValue(s, f), s--, a--;
        continue;
      }
      let p = i(o, l),
        m = i(s, u),
        g = i(o, c);
      if (Object.is(g, m)) {
        let b = i(a, f);
        Object.is(b, p)
          ? (t.swap(o, s), t.updateValue(s, f), a--, s--)
          : t.move(s, o),
          t.updateValue(o, c),
          o++;
        continue;
      }
      if (((n ??= new cl()), (r ??= cb(t, o, s, i)), ef(t, n, o, g)))
        t.updateValue(o, c), o++, s++;
      else if (r.has(g)) n.set(p, t.detach(o)), s--;
      else {
        let b = t.create(o, e[o]);
        t.attach(o, b), o++, s++;
      }
    }
    for (; o <= a; ) lb(t, n, i, o, e[o]), o++;
  } else if (e != null) {
    let a = e[Symbol.iterator](),
      l = a.next();
    for (; !l.done && o <= s; ) {
      let c = t.at(o),
        d = l.value,
        u = _u(o, c, o, d, i);
      if (u !== 0) u < 0 && t.updateValue(o, d), o++, (l = a.next());
      else {
        (n ??= new cl()), (r ??= cb(t, o, s, i));
        let f = i(o, d);
        if (ef(t, n, o, f)) t.updateValue(o, d), o++, s++, (l = a.next());
        else if (!r.has(f))
          t.attach(o, t.create(o, d)), o++, s++, (l = a.next());
        else {
          let h = i(o, c);
          n.set(h, t.detach(o)), s--;
        }
      }
    }
    for (; !l.done; ) lb(t, n, i, t.length, l.value), (l = a.next());
  }
  for (; o <= s; ) t.destroy(t.detach(s--));
  n?.forEach((a) => {
    t.destroy(a);
  });
}
function ef(t, e, i, n) {
  return e !== void 0 && e.has(n)
    ? (t.attach(i, e.get(n)), e.delete(n), !0)
    : !1;
}
function lb(t, e, i, n, r) {
  if (ef(t, e, n, i(n, r))) t.updateValue(n, r);
  else {
    let o = t.create(n, r);
    t.attach(n, o);
  }
}
function cb(t, e, i, n) {
  let r = new Set();
  for (let o = e; o <= i; o++) r.add(n(o, t.at(o)));
  return r;
}
var cl = class {
  constructor() {
    (this.kvMap = new Map()), (this._vMap = void 0);
  }
  has(e) {
    return this.kvMap.has(e);
  }
  delete(e) {
    if (!this.has(e)) return !1;
    let i = this.kvMap.get(e);
    return (
      this._vMap !== void 0 && this._vMap.has(i)
        ? (this.kvMap.set(e, this._vMap.get(i)), this._vMap.delete(i))
        : this.kvMap.delete(e),
      !0
    );
  }
  get(e) {
    return this.kvMap.get(e);
  }
  set(e, i) {
    if (this.kvMap.has(e)) {
      let n = this.kvMap.get(e);
      this._vMap === void 0 && (this._vMap = new Map());
      let r = this._vMap;
      for (; r.has(n); ) n = r.get(n);
      r.set(n, i);
    } else this.kvMap.set(e, i);
  }
  forEach(e) {
    for (let [i, n] of this.kvMap)
      if ((e(n, i), this._vMap !== void 0)) {
        let r = this._vMap;
        for (; r.has(n); ) (n = r.get(n)), e(n, i);
      }
  }
};
function Dl(t, e, i, n) {
  let r = e.tView,
    s = t[B] & 4096 ? 4096 : 16,
    a = El(
      t,
      r,
      i,
      s,
      null,
      e,
      null,
      null,
      null,
      n?.injector ?? null,
      n?.dehydratedView ?? null
    ),
    l = t[e.index];
  a[Go] = l;
  let c = t[tn];
  return c !== null && (a[tn] = c.createEmbeddedView(r)), Yf(r, a, i), a;
}
function uy(t, e) {
  let i = tt + e;
  if (i < t.length) return t[i];
}
function qo(t, e) {
  return !e || e.firstChild === null || Cv(t);
}
function Il(t, e, i, n = !0) {
  let r = e[Y];
  if ((II(r, e, t, i), n)) {
    let s = Vu(i, t),
      a = e[Le],
      l = Lf(a, t[Ii]);
    l !== null && EI(r, t[yt], a, e, l, s);
  }
  let o = e[Ir];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function fy(t, e) {
  let i = Uo(t, e);
  return i !== void 0 && xl(i[Y], i), i;
}
var $t = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = RT;
  let t = e;
  return t;
})();
function RT() {
  let t = ht();
  return py(t, ne());
}
var OT = $t,
  hy = class extends OT {
    constructor(e, i, n) {
      super(),
        (this._lContainer = e),
        (this._hostTNode = i),
        (this._hostLView = n);
    }
    get element() {
      return Fr(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new Ei(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let e = Mf(this._hostTNode, this._hostLView);
      if (rv(e)) {
        let i = Xa(e, this._hostLView),
          n = Ka(e),
          r = i[Y].data[n + 8];
        return new Ei(r, i);
      } else return new Ei(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(e) {
      let i = db(this._lContainer);
      return (i !== null && i[e]) || null;
    }
    get length() {
      return this._lContainer.length - tt;
    }
    createEmbeddedView(e, i, n) {
      let r, o;
      typeof n == "number"
        ? (r = n)
        : n != null && ((r = n.index), (o = n.injector));
      let s = zo(this._lContainer, e.ssrId),
        a = e.createEmbeddedViewImpl(i || {}, o, s);
      return this.insertImpl(a, r, qo(this._hostTNode, s)), a;
    }
    createComponent(e, i, n, r, o) {
      let s = e && !KD(e),
        a;
      if (s) a = i;
      else {
        let p = i || {};
        (a = p.index),
          (n = p.injector),
          (r = p.projectableNodes),
          (o = p.environmentInjector || p.ngModuleRef);
      }
      let l = s ? e : new Ho(Ci(e)),
        c = n || this.parentInjector;
      if (!o && l.ngModule == null) {
        let m = (s ? c : this.parentInjector).get(ft, null);
        m && (o = m);
      }
      let d = Ci(l.componentType ?? {}),
        u = zo(this._lContainer, d?.id ?? null),
        f = u?.firstChild ?? null,
        h = l.create(c, r, f, o);
      return this.insertImpl(h.hostView, a, qo(this._hostTNode, u)), h;
    }
    insert(e, i) {
      return this.insertImpl(e, i, !0);
    }
    insertImpl(e, i, n) {
      let r = e._lView;
      if (bD(r)) {
        let a = this.indexOf(e);
        if (a !== -1) this.detach(a);
        else {
          let l = r[Fe],
            c = new hy(l, l[yt], l[Fe]);
          c.detach(c.indexOf(e));
        }
      }
      let o = this._adjustIndex(i),
        s = this._lContainer;
      return Il(s, r, o, n), e.attachToViewContainerRef(), hv(xu(s), o, e), e;
    }
    move(e, i) {
      return this.insert(e, i);
    }
    indexOf(e) {
      let i = db(this._lContainer);
      return i !== null ? i.indexOf(e) : -1;
    }
    remove(e) {
      let i = this._adjustIndex(e, -1),
        n = Uo(this._lContainer, i);
      n && (tl(xu(this._lContainer), i), xl(n[Y], n));
    }
    detach(e) {
      let i = this._adjustIndex(e, -1),
        n = Uo(this._lContainer, i);
      return n && tl(xu(this._lContainer), i) != null ? new ki(n) : null;
    }
    _adjustIndex(e, i = 0) {
      return e ?? this.length + i;
    }
  };
function db(t) {
  return t[Qa];
}
function xu(t) {
  return t[Qa] || (t[Qa] = []);
}
function py(t, e) {
  let i,
    n = e[t.index];
  return (
    Vt(n) ? (i = n) : ((i = ny(n, e, null, t)), (e[t.index] = i), Cl(e, i)),
    NT(i, e, t, n),
    new hy(i, t, e)
  );
}
function kT(t, e) {
  let i = t[Le],
    n = i.createComment(""),
    r = At(e, t),
    o = Lf(i, r);
  return il(i, o, n, OI(i, r), !1), n;
}
var NT = LT,
  PT = (t, e, i) => !1;
function FT(t, e, i) {
  return PT(t, e, i);
}
function LT(t, e, i, n) {
  if (t[Ii]) return;
  let r;
  i.type & 8 ? (r = rn(n)) : (r = kT(e, i)), (t[Ii] = r);
}
function jT(t, e, i, n, r, o, s, a, l) {
  let c = e.consts,
    d = Jo(e, t, 4, s || null, Za(c, a));
  Xv(e, i, d, Za(c, l)), Tf(e, d);
  let u = (d.tView = $f(
    2,
    d,
    n,
    r,
    o,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    c,
    null
  ));
  return (
    e.queries !== null &&
      (e.queries.template(e, d), (u.queries = e.queries.embeddedTView(d))),
    d
  );
}
function ge(t, e, i, n, r, o, s, a) {
  let l = ne(),
    c = Ze(),
    d = t + st,
    u = c.firstCreatePass ? jT(d, c, l, e, i, n, r, o, s) : c.data[d];
  Yo(u, !1);
  let f = VT(c, l, u, t);
  If() && jf(c, l, f, u), Ri(f, l);
  let h = ny(f, l, f, u);
  return (
    (l[d] = h),
    Cl(l, h),
    FT(h, u, l),
    vf(u) && Yv(c, l, u),
    s != null && Qv(l, u, a),
    ge
  );
}
var VT = BT;
function BT(t, e, i, n) {
  return Sf(!0), e[Le].createComment("");
}
function be(t, e, i) {
  es("NgControlFlow");
  let n = ne(),
    r = Nr(),
    o = of(n, st + t),
    s = 0;
  if (on(n, r, e)) {
    let a = Qe(null);
    try {
      if ((fy(o, s), e !== -1)) {
        let l = sf(n[Y], st + e),
          c = zo(o, l.tView.ssrId),
          d = Dl(n, l, i, { dehydratedView: c });
        Il(o, d, s, qo(l, c));
      }
    } finally {
      Qe(a);
    }
  } else {
    let a = uy(o, s);
    a !== void 0 && (a[et] = i);
  }
}
var tf = class {
  constructor(e, i, n) {
    (this.lContainer = e), (this.$implicit = i), (this.$index = n);
  }
  get $count() {
    return this.lContainer.length - tt;
  }
};
var nf = class {
  constructor(e, i, n) {
    (this.hasEmptyBlock = e), (this.trackByFn = i), (this.liveCollection = n);
  }
};
function Lr(t, e, i, n, r, o, s, a, l, c, d) {
  es("NgControlFlow");
  let u = l !== void 0,
    f = ne(),
    h = a ? s.bind(f[Tt][et]) : s,
    p = new nf(u, h);
  (f[st + t] = p), ge(t + 1, e, i, n, r, o), u && ge(t + 2, l, c, d);
}
var rf = class extends Ju {
  constructor(e, i, n) {
    super(),
      (this.lContainer = e),
      (this.hostLView = i),
      (this.templateTNode = n),
      (this.needsIndexUpdate = !1);
  }
  get length() {
    return this.lContainer.length - tt;
  }
  at(e) {
    return this.getLView(e)[et].$implicit;
  }
  attach(e, i) {
    let n = i[Ir];
    (this.needsIndexUpdate ||= e !== this.length),
      Il(this.lContainer, i, e, qo(this.templateTNode, n));
  }
  detach(e) {
    return (
      (this.needsIndexUpdate ||= e !== this.length - 1), UT(this.lContainer, e)
    );
  }
  create(e, i) {
    let n = zo(this.lContainer, this.templateTNode.tView.ssrId);
    return Dl(
      this.hostLView,
      this.templateTNode,
      new tf(this.lContainer, i, e),
      { dehydratedView: n }
    );
  }
  destroy(e) {
    xl(e[Y], e);
  }
  updateValue(e, i) {
    this.getLView(e)[et].$implicit = i;
  }
  reset() {
    this.needsIndexUpdate = !1;
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let e = 0; e < this.length; e++) this.getLView(e)[et].$index = e;
  }
  getLView(e) {
    return HT(this.lContainer, e);
  }
};
function jr(t) {
  let e = Qe(null),
    i = Mn();
  try {
    let n = ne(),
      r = n[Y],
      o = n[i];
    if (o.liveCollection === void 0) {
      let a = i + 1,
        l = of(n, a),
        c = sf(r, a);
      o.liveCollection = new rf(l, n, c);
    } else o.liveCollection.reset();
    let s = o.liveCollection;
    if ((AT(s, t, o.trackByFn), s.updateIndexes(), o.hasEmptyBlock)) {
      let a = Nr(),
        l = s.length === 0;
      if (on(n, a, l)) {
        let c = i + 2,
          d = of(n, c);
        if (l) {
          let u = sf(r, c),
            f = zo(d, u.tView.ssrId),
            h = Dl(n, u, void 0, { dehydratedView: f });
          Il(d, h, 0, qo(u, f));
        } else fy(d, 0);
      }
    }
  } finally {
    Qe(e);
  }
}
function of(t, e) {
  return t[e];
}
function UT(t, e) {
  return Uo(t, e);
}
function HT(t, e) {
  return uy(t, e);
}
function sf(t, e) {
  return yf(t, e);
}
function $T(t, e, i, n, r, o) {
  let s = e.consts,
    a = Za(s, r),
    l = Jo(e, t, 2, n, a);
  return (
    Xv(e, i, l, Za(s, o)),
    l.attrs !== null && Yu(l, l.attrs, !1),
    l.mergedAttrs !== null && Yu(l, l.mergedAttrs, !0),
    e.queries !== null && e.queries.elementStart(e, l),
    l
  );
}
function M(t, e, i, n) {
  let r = ne(),
    o = Ze(),
    s = st + t,
    a = r[Le],
    l = o.firstCreatePass ? $T(s, o, r, e, i, n) : o.data[s],
    c = zT(o, r, l, a, e, t);
  r[s] = c;
  let d = vf(l);
  return (
    Yo(l, !0),
    Lv(a, c, l),
    (l.flags & 32) !== 32 && If() && jf(o, r, c, l),
    xD() === 0 && Ri(c, r),
    wD(),
    d && (Yv(o, r, l), Gv(o, l, r)),
    n !== null && Qv(r, l),
    M
  );
}
function T() {
  let t = ht();
  Gb() ? Yb() : ((t = t.parent), Yo(t, !1));
  let e = t;
  CD(e) && DD(), ED();
  let i = Ze();
  return (
    i.firstCreatePass && (Tf(i, t), Fb(t) && i.queries.elementEnd(t)),
    e.classesWithoutHost != null &&
      BD(e) &&
      sb(i, e, ne(), e.classesWithoutHost, !0),
    e.stylesWithoutHost != null &&
      UD(e) &&
      sb(i, e, ne(), e.stylesWithoutHost, !1),
    T
  );
}
function ve(t, e, i, n) {
  return M(t, e, i, n), T(), ve;
}
var zT = (t, e, i, n, r, o) => (Sf(!0), Mv(n, r, FD()));
function Li() {
  return ne();
}
function Vr(t, e, i) {
  let n = ne(),
    r = Nr();
  if (on(n, r, e)) {
    let o = Ze(),
      s = Df();
    Kv(o, s, n, t, e, n[Le], i, !0);
  }
  return Vr;
}
var wi = void 0;
function qT(t) {
  let e = t,
    i = Math.floor(Math.abs(t)),
    n = t.toString().replace(/^[^.]*\.?/, "").length;
  return i === 1 && n === 0 ? 1 : 5;
}
var WT = [
    "en",
    [["a", "p"], ["AM", "PM"], wi],
    [["AM", "PM"], wi, wi],
    [
      ["S", "M", "T", "W", "T", "F", "S"],
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    ],
    wi,
    [
      ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ],
    wi,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", wi, "{1} 'at' {0}", wi],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    qT,
  ],
  wu = {};
function Sl(t) {
  let e = GT(t),
    i = ub(e);
  if (i) return i;
  let n = e.split("-")[0];
  if (((i = ub(n)), i)) return i;
  if (n === "en") return WT;
  throw new E(701, !1);
}
function ub(t) {
  return (
    t in wu ||
      (wu[t] =
        Lt.ng &&
        Lt.ng.common &&
        Lt.ng.common.locales &&
        Lt.ng.common.locales[t]),
    wu[t]
  );
}
var ji = (function (t) {
  return (
    (t[(t.LocaleId = 0)] = "LocaleId"),
    (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
    (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
    (t[(t.DaysFormat = 3)] = "DaysFormat"),
    (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
    (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
    (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
    (t[(t.Eras = 7)] = "Eras"),
    (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
    (t[(t.WeekendRange = 9)] = "WeekendRange"),
    (t[(t.DateFormat = 10)] = "DateFormat"),
    (t[(t.TimeFormat = 11)] = "TimeFormat"),
    (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
    (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
    (t[(t.NumberFormats = 14)] = "NumberFormats"),
    (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
    (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
    (t[(t.CurrencyName = 17)] = "CurrencyName"),
    (t[(t.Currencies = 18)] = "Currencies"),
    (t[(t.Directionality = 19)] = "Directionality"),
    (t[(t.PluralCase = 20)] = "PluralCase"),
    (t[(t.ExtraData = 21)] = "ExtraData"),
    t
  );
})(ji || {});
function GT(t) {
  return t.toLowerCase().replace(/_/g, "-");
}
var dl = "en-US",
  YT = "USD";
var QT = dl;
function ZT(t) {
  kC(t, "Expected localeId to be defined"),
    typeof t == "string" && (QT = t.toLowerCase().replace(/_/g, "-"));
}
function Vi(t) {
  return !!t && typeof t.then == "function";
}
function my(t) {
  return !!t && typeof t.subscribe == "function";
}
function ue(t, e, i, n) {
  let r = ne(),
    o = Ze(),
    s = ht();
  return XT(o, r, r[Le], s, t, e, n), ue;
}
function KT(t, e, i, n) {
  let r = t.cleanup;
  if (r != null)
    for (let o = 0; o < r.length - 1; o += 2) {
      let s = r[o];
      if (s === i && r[o + 1] === n) {
        let a = e[Lo],
          l = r[o + 2];
        return a.length > l ? a[l] : null;
      }
      typeof s == "string" && (o += 2);
    }
  return null;
}
function XT(t, e, i, n, r, o, s) {
  let a = vf(n),
    c = t.firstCreatePass && oy(t),
    d = e[et],
    u = ry(e),
    f = !0;
  if (n.type & 3 || s) {
    let m = At(n, e),
      g = s ? s(m) : m,
      b = u.length,
      x = s ? (I) => s(rn(I[n.index])) : n.index,
      P = null;
    if ((!s && a && (P = KT(t, e, r, n.index)), P !== null)) {
      let I = P.__ngLastListenerFn__ || P;
      (I.__ngNextListenerFn__ = o), (P.__ngLastListenerFn__ = o), (f = !1);
    } else {
      o = hb(n, e, d, o, !1);
      let I = i.listen(g, r, o);
      u.push(o, I), c && c.push(r, x, b, b + 1);
    }
  } else o = hb(n, e, d, o, !1);
  let h = n.outputs,
    p;
  if (f && h !== null && (p = h[r])) {
    let m = p.length;
    if (m)
      for (let g = 0; g < m; g += 2) {
        let b = p[g],
          x = p[g + 1],
          re = e[b][x].subscribe(o),
          H = u.length;
        u.push(o, re), c && c.push(r, n.index, H, -(H + 1));
      }
  }
}
function fb(t, e, i, n) {
  try {
    return Jt(6, e, i), i(n) !== !1;
  } catch (r) {
    return sy(t, r), !1;
  } finally {
    Jt(7, e, i);
  }
}
function hb(t, e, i, n, r) {
  return function o(s) {
    if (s === Function) return n;
    let a = t.componentOffset > -1 ? Kn(t.index, e) : e;
    Wf(a);
    let l = fb(e, i, n, s),
      c = o.__ngNextListenerFn__;
    for (; c; ) (l = fb(e, i, c, s) && l), (c = c.__ngNextListenerFn__);
    return r && l === !1 && s.preventDefault(), l;
  };
}
function pe(t = 1) {
  return PD(t);
}
function JT(t, e) {
  let i = null,
    n = XC(t);
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    if (o === "*") {
      i = r;
      continue;
    }
    if (n === null ? Ib(t, o, !0) : tD(n, o)) return r;
  }
  return i;
}
function zt(t) {
  let e = ne()[Tt][yt];
  if (!e.projection) {
    let i = t ? t.length : 1,
      n = (e.projection = pv(i, null)),
      r = n.slice(),
      o = e.child;
    for (; o !== null; ) {
      let s = t ? JT(o, t) : 0;
      s !== null && (r[s] ? (r[s].projectionNext = o) : (n[s] = o), (r[s] = o)),
        (o = o.next);
    }
  }
}
function He(t, e = 0, i) {
  let n = ne(),
    r = Ze(),
    o = Jo(r, st + t, 16, null, i || null);
  o.projection === null && (o.projection = e),
    Yb(),
    (!n[Ir] || qb()) && (o.flags & 32) !== 32 && FI(r, n, o);
}
function eM(t, e, i, n) {
  i >= t.data.length && ((t.data[i] = null), (t.blueprint[i] = null)),
    (e[i] = n);
}
function Bi(t) {
  let e = SD();
  return Ub(e, st + t);
}
function ie(t, e = "") {
  let i = ne(),
    n = Ze(),
    r = t + st,
    o = n.firstCreatePass ? Jo(n, r, 1, e, null) : n.data[r],
    s = tM(n, i, o, e, t);
  (i[r] = s), If() && jf(n, i, s, o), Yo(o, !1);
}
var tM = (t, e, i, n, r) => (Sf(!0), _I(e[Le], n));
function ct(t) {
  return Rn("", t, ""), ct;
}
function Rn(t, e, i) {
  let n = ne(),
    r = uT(n, t, e, i);
  return r !== Ut && qf(n, Mn(), r), Rn;
}
function Zf(t, e, i, n, r) {
  let o = ne(),
    s = fT(o, t, e, i, n, r);
  return s !== Ut && qf(o, Mn(), s), Zf;
}
function Kf(t, e, i, n, r, o, s) {
  let a = ne(),
    l = hT(a, t, e, i, n, r, o, s);
  return l !== Ut && qf(a, Mn(), l), Kf;
}
function nM(t, e, i) {
  let n = Ze();
  if (n.firstCreatePass) {
    let r = Qn(t);
    af(i, n.data, n.blueprint, r, !0), af(e, n.data, n.blueprint, r, !1);
  }
}
function af(t, e, i, n, r) {
  if (((t = rt(t)), Array.isArray(t)))
    for (let o = 0; o < t.length; o++) af(t[o], e, i, n, r);
  else {
    let o = Ze(),
      s = ne(),
      a = ht(),
      l = Rr(t) ? t : rt(t.provide),
      c = _v(t),
      d = a.providerIndexes & 1048575,
      u = a.directiveStart,
      f = a.providerIndexes >> 20;
    if (Rr(t) || !t.multi) {
      let h = new Mi(c, r, y),
        p = Cu(l, e, r ? d : d + f, u);
      p === -1
        ? (ku(el(a, s), o, l),
          Eu(o, t, e.length),
          e.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          r && (a.providerIndexes += 1048576),
          i.push(h),
          s.push(h))
        : ((i[p] = h), (s[p] = h));
    } else {
      let h = Cu(l, e, d + f, u),
        p = Cu(l, e, d, d + f),
        m = h >= 0 && i[h],
        g = p >= 0 && i[p];
      if ((r && !g) || (!r && !m)) {
        ku(el(a, s), o, l);
        let b = oM(r ? rM : iM, i.length, r, n, c);
        !r && g && (i[p].providerFactory = b),
          Eu(o, t, e.length, 0),
          e.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          r && (a.providerIndexes += 1048576),
          i.push(b),
          s.push(b);
      } else {
        let b = gy(i[r ? p : h], c, !r && n);
        Eu(o, t, h > -1 ? h : p, b);
      }
      !r && n && g && i[p].componentProviders++;
    }
  }
}
function Eu(t, e, i, n) {
  let r = Rr(e),
    o = sI(e);
  if (r || o) {
    let l = (o ? rt(e.useClass) : e).prototype.ngOnDestroy;
    if (l) {
      let c = t.destroyHooks || (t.destroyHooks = []);
      if (!r && e.multi) {
        let d = c.indexOf(i);
        d === -1 ? c.push(i, [n, l]) : c[d + 1].push(n, l);
      } else c.push(i, l);
    }
  }
}
function gy(t, e, i) {
  return i && t.componentProviders++, t.multi.push(e) - 1;
}
function Cu(t, e, i, n) {
  for (let r = i; r < n; r++) if (e[r] === t) return r;
  return -1;
}
function iM(t, e, i, n) {
  return lf(this.multi, []);
}
function rM(t, e, i, n) {
  let r = this.multi,
    o;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = Ai(i, i[Y], this.providerFactory.index, n);
    (o = a.slice(0, s)), lf(r, o);
    for (let l = s; l < a.length; l++) o.push(a[l]);
  } else (o = []), lf(r, o);
  return o;
}
function lf(t, e) {
  for (let i = 0; i < t.length; i++) {
    let n = t[i];
    e.push(n());
  }
  return e;
}
function oM(t, e, i, n, r) {
  let o = new Mi(t, i, y);
  return (
    (o.multi = []),
    (o.index = e),
    (o.componentProviders = 0),
    gy(o, r, n && !i),
    o
  );
}
function $e(t, e = []) {
  return (i) => {
    i.providersResolver = (n, r) => nM(n, r ? r(t) : t, e);
  };
}
var Zn = class {},
  Wo = class {};
var cf = class extends Zn {
    constructor(e, i, n) {
      super(),
        (this._parent = i),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new al(this));
      let r = Rb(e);
      (this._bootstrapComponents = Ev(r.bootstrap)),
        (this._r3Injector = xv(
          e,
          i,
          [
            { provide: Zn, useValue: this },
            { provide: Xn, useValue: this.componentFactoryResolver },
            ...n,
          ],
          ot(e),
          new Set(["environment"])
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(e));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let e = this._r3Injector;
      !e.destroyed && e.destroy(),
        this.destroyCbs.forEach((i) => i()),
        (this.destroyCbs = null);
    }
    onDestroy(e) {
      this.destroyCbs.push(e);
    }
  },
  df = class extends Wo {
    constructor(e) {
      super(), (this.moduleType = e);
    }
    create(e) {
      return new cf(this.moduleType, e, []);
    }
  };
var ul = class extends Zn {
  constructor(e) {
    super(),
      (this.componentFactoryResolver = new al(this)),
      (this.instance = null);
    let i = new Bo(
      [
        ...e.providers,
        { provide: Zn, useValue: this },
        { provide: Xn, useValue: this.componentFactoryResolver },
      ],
      e.parent || kf(),
      e.debugName,
      new Set(["environment"])
    );
    (this.injector = i),
      e.runEnvironmentInitializers && i.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
};
function Xf(t, e, i = null) {
  return new ul({
    providers: t,
    parent: e,
    debugName: i,
    runEnvironmentInitializers: !0,
  }).injector;
}
var sM = (() => {
  let e = class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = bv(!1, n.type),
          o =
            r.length > 0
              ? Xf([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  e.ɵprov = D({
    token: e,
    providedIn: "environment",
    factory: () => new e(v(ft)),
  });
  let t = e;
  return t;
})();
function qt(t) {
  es("NgStandalone"),
    (t.getStandaloneInjector = (e) =>
      e.get(sM).getOrCreateStandaloneInjector(t));
}
function aM(t, e) {
  let i = t[e];
  return i === Ut ? void 0 : i;
}
function lM(t, e, i, n, r, o, s) {
  let a = e + i;
  return Qf(t, a, r, o)
    ? cT(t, a + 2, s ? n.call(s, r, o) : n(r, o))
    : aM(t, a + 2);
}
function Jn(t, e) {
  let i = Ze(),
    n,
    r = t + st;
  i.firstCreatePass
    ? ((n = cM(e, i.pipeRegistry)),
      (i.data[r] = n),
      n.onDestroy && (i.destroyHooks ??= []).push(r, n.onDestroy))
    : (n = i.data[r]);
  let o = n.factory || (n.factory = Si(n.type, !0)),
    s,
    a = ut(y);
  try {
    let l = Ja(!1),
      c = o();
    return Ja(l), eM(i, ne(), r, c), c;
  } finally {
    ut(a);
  }
}
function cM(t, e) {
  if (e)
    for (let i = e.length - 1; i >= 0; i--) {
      let n = e[i];
      if (t === n.name) return n;
    }
}
function ei(t, e, i, n) {
  let r = t + st,
    o = ne(),
    s = Ub(o, r);
  return dM(o, r) ? lM(o, TD(), e, s.transform, i, n, s) : s.transform(i, n);
}
function dM(t, e) {
  return t[Y].data[e].pure;
}
function uM() {
  return this._results[Symbol.iterator]();
}
var Pi = class t {
    get changes() {
      return (this._changes ??= new le());
    }
    constructor(e = !1) {
      (this._emitDistinctChangesOnly = e),
        (this.dirty = !0),
        (this._results = []),
        (this._changesDetected = !1),
        (this._changes = void 0),
        (this.length = 0),
        (this.first = void 0),
        (this.last = void 0);
      let i = t.prototype;
      i[Symbol.iterator] || (i[Symbol.iterator] = uM);
    }
    get(e) {
      return this._results[e];
    }
    map(e) {
      return this._results.map(e);
    }
    filter(e) {
      return this._results.filter(e);
    }
    find(e) {
      return this._results.find(e);
    }
    reduce(e, i) {
      return this._results.reduce(e, i);
    }
    forEach(e) {
      this._results.forEach(e);
    }
    some(e) {
      return this._results.some(e);
    }
    toArray() {
      return this._results.slice();
    }
    toString() {
      return this._results.toString();
    }
    reset(e, i) {
      this.dirty = !1;
      let n = JD(e);
      (this._changesDetected = !XD(this._results, n, i)) &&
        ((this._results = n),
        (this.length = n.length),
        (this.last = n[this.length - 1]),
        (this.first = n[0]));
    }
    notifyOnChanges() {
      this._changes !== void 0 &&
        (this._changesDetected || !this._emitDistinctChangesOnly) &&
        this._changes.emit(this);
    }
    setDirty() {
      this.dirty = !0;
    }
    destroy() {
      this._changes !== void 0 &&
        (this._changes.complete(), this._changes.unsubscribe());
    }
  },
  sn = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = pM;
    let t = e;
    return t;
  })(),
  fM = sn,
  hM = class extends fM {
    constructor(e, i, n) {
      super(),
        (this._declarationLView = e),
        (this._declarationTContainer = i),
        (this.elementRef = n);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(e, i) {
      return this.createEmbeddedViewImpl(e, i);
    }
    createEmbeddedViewImpl(e, i, n) {
      let r = Dl(this._declarationLView, this._declarationTContainer, e, {
        injector: i,
        dehydratedView: n,
      });
      return new ki(r);
    }
  };
function pM() {
  return Tl(ht(), ne());
}
function Tl(t, e) {
  return t.type & 4 ? new hM(e, t, Fr(t, e)) : null;
}
var uf = class t {
    constructor(e) {
      (this.queryList = e), (this.matches = null);
    }
    clone() {
      return new t(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  ff = class t {
    constructor(e = []) {
      this.queries = e;
    }
    createEmbeddedView(e) {
      let i = e.queries;
      if (i !== null) {
        let n = e.contentQueries !== null ? e.contentQueries[0] : i.length,
          r = [];
        for (let o = 0; o < n; o++) {
          let s = i.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          r.push(a.clone());
        }
        return new t(r);
      }
      return null;
    }
    insertView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    detachView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    dirtyQueriesWithMatches(e) {
      for (let i = 0; i < this.queries.length; i++)
        _y(e, i).matches !== null && this.queries[i].setDirty();
    }
  },
  fl = class {
    constructor(e, i, n = null) {
      (this.predicate = e), (this.flags = i), (this.read = n);
    }
  },
  hf = class t {
    constructor(e = []) {
      this.queries = e;
    }
    elementStart(e, i) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementStart(e, i);
    }
    elementEnd(e) {
      for (let i = 0; i < this.queries.length; i++)
        this.queries[i].elementEnd(e);
    }
    embeddedTView(e) {
      let i = null;
      for (let n = 0; n < this.length; n++) {
        let r = i !== null ? i.length : 0,
          o = this.getByIndex(n).embeddedTView(e, r);
        o &&
          ((o.indexInDeclarationView = n), i !== null ? i.push(o) : (i = [o]));
      }
      return i !== null ? new t(i) : null;
    }
    template(e, i) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].template(e, i);
    }
    getByIndex(e) {
      return this.queries[e];
    }
    get length() {
      return this.queries.length;
    }
    track(e) {
      this.queries.push(e);
    }
  },
  pf = class t {
    constructor(e, i = -1) {
      (this.metadata = e),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = i);
    }
    elementStart(e, i) {
      this.isApplyingToNode(i) && this.matchTNode(e, i);
    }
    elementEnd(e) {
      this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
    }
    template(e, i) {
      this.elementStart(e, i);
    }
    embeddedTView(e, i) {
      return this.isApplyingToNode(e)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-e.index, i),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(e) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let i = this._declarationNodeIndex,
          n = e.parent;
        for (; n !== null && n.type & 8 && n.index !== i; ) n = n.parent;
        return i === (n !== null ? n.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(e, i) {
      let n = this.metadata.predicate;
      if (Array.isArray(n))
        for (let r = 0; r < n.length; r++) {
          let o = n[r];
          this.matchTNodeWithReadOption(e, i, mM(i, o)),
            this.matchTNodeWithReadOption(e, i, $a(i, e, o, !1, !1));
        }
      else
        n === sn
          ? i.type & 4 && this.matchTNodeWithReadOption(e, i, -1)
          : this.matchTNodeWithReadOption(e, i, $a(i, e, n, !1, !1));
    }
    matchTNodeWithReadOption(e, i, n) {
      if (n !== null) {
        let r = this.metadata.read;
        if (r !== null)
          if (r === Z || r === $t || (r === sn && i.type & 4))
            this.addMatch(i.index, -2);
          else {
            let o = $a(i, e, r, !1, !1);
            o !== null && this.addMatch(i.index, o);
          }
        else this.addMatch(i.index, n);
      }
    }
    addMatch(e, i) {
      this.matches === null ? (this.matches = [e, i]) : this.matches.push(e, i);
    }
  };
function mM(t, e) {
  let i = t.localNames;
  if (i !== null) {
    for (let n = 0; n < i.length; n += 2) if (i[n] === e) return i[n + 1];
  }
  return null;
}
function gM(t, e) {
  return t.type & 11 ? Fr(t, e) : t.type & 4 ? Tl(t, e) : null;
}
function bM(t, e, i, n) {
  return i === -1 ? gM(e, t) : i === -2 ? vM(t, e, n) : Ai(t, t[Y], i, e);
}
function vM(t, e, i) {
  if (i === Z) return Fr(e, t);
  if (i === sn) return Tl(e, t);
  if (i === $t) return py(e, t);
}
function by(t, e, i, n) {
  let r = e[tn].queries[n];
  if (r.matches === null) {
    let o = t.data,
      s = i.matches,
      a = [];
    for (let l = 0; l < s.length; l += 2) {
      let c = s[l];
      if (c < 0) a.push(null);
      else {
        let d = o[c];
        a.push(bM(e, d, s[l + 1], i.metadata.read));
      }
    }
    r.matches = a;
  }
  return r.matches;
}
function mf(t, e, i, n) {
  let r = t.queries.getByIndex(i),
    o = r.matches;
  if (o !== null) {
    let s = by(t, e, r, i);
    for (let a = 0; a < o.length; a += 2) {
      let l = o[a];
      if (l > 0) n.push(s[a / 2]);
      else {
        let c = o[a + 1],
          d = e[-l];
        for (let u = tt; u < d.length; u++) {
          let f = d[u];
          f[Go] === f[Fe] && mf(f[Y], f, c, n);
        }
        if (d[Tr] !== null) {
          let u = d[Tr];
          for (let f = 0; f < u.length; f++) {
            let h = u[f];
            mf(h[Y], h, c, n);
          }
        }
      }
    }
  }
  return n;
}
function _e(t) {
  let e = ne(),
    i = Ze(),
    n = Zb();
  wf(n + 1);
  let r = _y(i, n);
  if (t.dirty && gD(e) === ((r.metadata.flags & 2) === 2)) {
    if (r.matches === null) t.reset([]);
    else {
      let o = r.crossesNgTemplate ? mf(i, e, n, []) : by(i, e, r, n);
      t.reset(o, KI), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function Ke(t, e, i) {
  let n = Ze();
  n.firstCreatePass &&
    (yy(n, new fl(t, e, i), -1), (e & 2) === 2 && (n.staticViewQueries = !0)),
    vy(n, ne(), e);
}
function _t(t, e, i, n) {
  let r = Ze();
  if (r.firstCreatePass) {
    let o = ht();
    yy(r, new fl(e, i, n), o.index),
      _M(r, t),
      (i & 2) === 2 && (r.staticContentQueries = !0);
  }
  vy(r, ne(), i);
}
function xe() {
  return yM(ne(), Zb());
}
function yM(t, e) {
  return t[tn].queries[e].queryList;
}
function vy(t, e, i) {
  let n = new Pi((i & 4) === 4);
  hS(t, e, n, n.destroy),
    e[tn] === null && (e[tn] = new ff()),
    e[tn].queries.push(new uf(n));
}
function yy(t, e, i) {
  t.queries === null && (t.queries = new hf()), t.queries.track(new pf(e, i));
}
function _M(t, e) {
  let i = t.contentQueries || (t.contentQueries = []),
    n = i.length ? i[i.length - 1] : -1;
  e !== n && i.push(t.queries.length - 1, e);
}
function _y(t, e) {
  return t.queries.getByIndex(e);
}
function xy(t, e) {
  return Tl(t, e);
}
var Ml = (() => {
    let e = class e {
      log(n) {
        console.log(n);
      }
      warn(n) {
        console.warn(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "platform" }));
    let t = e;
    return t;
  })(),
  gf = class {
    constructor(e, i) {
      (this.ngModuleFactory = e), (this.componentFactories = i);
    }
  },
  Jf = (() => {
    let e = class e {
      compileModuleSync(n) {
        return new df(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = Rb(n),
          s = Ev(o.declarations).reduce((a, l) => {
            let c = Ci(l);
            return c && a.push(new Ho(c)), a;
          }, []);
        return new gf(r, s);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var Ui = (() => {
  let e = class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Me(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var wy = new S("");
var Ey = new S("Application Initializer"),
  Cy = (() => {
    let e = class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, r) => {
            (this.resolve = n), (this.reject = r);
          })),
          (this.appInits = w(Ey, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let s = o();
          if (Vi(s)) n.push(s);
          else if (my(s)) {
            let a = new Promise((l, c) => {
              s.subscribe({ complete: l, error: c });
            });
            n.push(a);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Al = new S("appBootstrapListener");
function xM() {
  ig(() => {
    throw new E(600, !1);
  });
}
function wM(t) {
  return t.isBoundToModule;
}
function EM(t, e, i) {
  try {
    let n = i();
    return Vi(n)
      ? n.catch((r) => {
          throw (e.runOutsideAngular(() => t.handleError(r)), r);
        })
      : n;
  } catch (n) {
    throw (e.runOutsideAngular(() => t.handleError(n)), n);
  }
}
var fn = (() => {
  let e = class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = w(Hv)),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = w(Ui).hasPendingTasks.pipe($((n) => !n))),
        (this._injector = w(ft));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      let o = n instanceof ol;
      if (!this._injector.get(Cy).done) {
        let p =
          "Cannot bootstrap as there are still asynchronous initializers running." +
          (!o && Ab(n)
            ? ""
            : " Bootstrap components in the `ngDoBootstrap` method of the root module.");
        throw new E(405, !1);
      }
      let a;
      o ? (a = n) : (a = this._injector.get(Xn).resolveComponentFactory(n)),
        this.componentTypes.push(a.componentType);
      let l = wM(a) ? void 0 : this._injector.get(Zn),
        c = r || a.selector,
        d = a.create(Bt.NULL, [], c, l),
        u = d.location.nativeElement,
        f = d.injector.get(wy, null);
      return (
        f?.registerApplication(u),
        d.onDestroy(() => {
          this.detachView(d.hostView),
            Du(this.components, d),
            f?.unregisterApplication(u);
        }),
        this._loadComponent(d),
        d
      );
    }
    tick() {
      if (this._runningTick) throw new E(101, !1);
      try {
        this._runningTick = !0;
        for (let n of this._views) n.detectChanges();
      } catch (n) {
        this.internalErrorHandler(n);
      } finally {
        this._runningTick = !1;
      }
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      Du(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let r = this._injector.get(Al, []);
      [...this._bootstrapListeners, ...r].forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Du(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new E(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function Du(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
var CM = (() => {
  let e = class e {
    constructor() {
      (this.zone = w(R)), (this.applicationRef = w(fn));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.zone.run(() => {
                this.applicationRef.tick();
              });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function DM(t) {
  return [
    { provide: R, useFactory: t },
    {
      provide: Ar,
      multi: !0,
      useFactory: () => {
        let e = w(CM, { optional: !0 });
        return () => e.initialize();
      },
    },
    {
      provide: Ar,
      multi: !0,
      useFactory: () => {
        let e = w(MM);
        return () => {
          e.initialize();
        };
      },
    },
    { provide: Hv, useFactory: IM },
  ];
}
function IM() {
  let t = w(R),
    e = w(Sn);
  return (i) => t.runOutsideAngular(() => e.handleError(i));
}
function SM(t) {
  let e = DM(() => new R(TM(t)));
  return Pr([[], e]);
}
function TM(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var MM = (() => {
  let e = class e {
    constructor() {
      (this.subscription = new ce()),
        (this.initialized = !1),
        (this.zone = w(R)),
        (this.pendingTasks = w(Ui));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              R.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            R.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function AM() {
  return (typeof $localize < "u" && $localize.locale) || dl;
}
var ns = new S("LocaleId", {
    providedIn: "root",
    factory: () => w(ns, te.Optional | te.SkipSelf) || AM(),
  }),
  Dy = new S("DefaultCurrencyCode", { providedIn: "root", factory: () => YT });
var Iy = new S("PlatformDestroyListeners");
var Wa = null;
function RM(t = [], e) {
  return Bt.create({
    name: e,
    providers: [
      { provide: yl, useValue: "platform" },
      { provide: Iy, useValue: new Set([() => (Wa = null)]) },
      ...t,
    ],
  });
}
function OM(t = []) {
  if (Wa) return Wa;
  let e = RM(t);
  return (Wa = e), xM(), kM(e), e;
}
function kM(t) {
  t.get(Nf, null)?.forEach((i) => i());
}
function Sy(t) {
  try {
    let { rootComponent: e, appProviders: i, platformProviders: n } = t,
      r = OM(n),
      o = [SM(), ...(i || [])],
      a = new ul({
        providers: o,
        parent: r,
        debugName: "",
        runEnvironmentInitializers: !1,
      }).injector,
      l = a.get(R);
    return l.run(() => {
      a.resolveInjectorInitializers();
      let c = a.get(Sn, null),
        d;
      l.runOutsideAngular(() => {
        d = l.onError.subscribe({
          next: (h) => {
            c.handleError(h);
          },
        });
      });
      let u = () => a.destroy(),
        f = r.get(Iy);
      return (
        f.add(u),
        a.onDestroy(() => {
          d.unsubscribe(), f.delete(u);
        }),
        EM(c, l, () => {
          let h = a.get(Cy);
          return (
            h.runInitializers(),
            h.donePromise.then(() => {
              let p = a.get(ns, dl);
              ZT(p || dl);
              let m = a.get(fn);
              return e !== void 0 && m.bootstrap(e), m;
            })
          );
        })
      );
    });
  } catch (e) {
    return Promise.reject(e);
  }
}
function xt(t) {
  return typeof t == "boolean" ? t : t != null && t !== "false";
}
var nh = null;
function On() {
  return nh;
}
function Oy(t) {
  nh || (nh = t);
}
var Rl = class {},
  J = new S("DocumentToken"),
  ky = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("Not implemented");
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => w(PM))(),
        providedIn: "platform",
      }));
    let t = e;
    return t;
  })();
var PM = (() => {
  let e = class e extends ky {
    constructor() {
      super(),
        (this._doc = w(J)),
        (this._location = window.location),
        (this._history = window.history);
    }
    getBaseHrefFromDOM() {
      return On().getBaseHref(this._doc);
    }
    onPopState(n) {
      let r = On().getGlobalEventTarget(this._doc, "window");
      return (
        r.addEventListener("popstate", n, !1),
        () => r.removeEventListener("popstate", n)
      );
    }
    onHashChange(n) {
      let r = On().getGlobalEventTarget(this._doc, "window");
      return (
        r.addEventListener("hashchange", n, !1),
        () => r.removeEventListener("hashchange", n)
      );
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(n) {
      this._location.pathname = n;
    }
    pushState(n, r, o) {
      this._history.pushState(n, r, o);
    }
    replaceState(n, r, o) {
      this._history.replaceState(n, r, o);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(n = 0) {
      this._history.go(n);
    }
    getState() {
      return this._history.state;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({
      token: e,
      factory: () => (() => new e())(),
      providedIn: "platform",
    }));
  let t = e;
  return t;
})();
function Ny(t, e) {
  if (t.length == 0) return e;
  if (e.length == 0) return t;
  let i = 0;
  return (
    t.endsWith("/") && i++,
    e.startsWith("/") && i++,
    i == 2 ? t + e.substring(1) : i == 1 ? t + e : t + "/" + e
  );
}
function Ty(t) {
  let e = t.match(/#|\?|$/),
    i = (e && e.index) || t.length,
    n = i - (t[i - 1] === "/" ? 1 : 0);
  return t.slice(0, n) + t.slice(i);
}
function Hi(t) {
  return t && t[0] !== "?" ? "?" + t : t;
}
var Ur = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("Not implemented");
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => w(Py))(),
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  FM = new S("appBaseHref"),
  Py = (() => {
    let e = class e extends Ur {
      constructor(n, r) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            r ??
            this._platformLocation.getBaseHrefFromDOM() ??
            w(J).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Ny(this._baseHref, n);
      }
      path(n = !1) {
        let r =
            this._platformLocation.pathname + Hi(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${r}${o}` : r;
      }
      pushState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + Hi(s));
        this._platformLocation.pushState(n, r, a);
      }
      replaceState(n, r, o, s) {
        let a = this.prepareExternalUrl(o + Hi(s));
        this._platformLocation.replaceState(n, r, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(ky), v(FM, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var $i = (() => {
  let e = class e {
    constructor(n) {
      (this._subject = new le()),
        (this._urlChangeListeners = []),
        (this._urlChangeSubscription = null),
        (this._locationStrategy = n);
      let r = this._locationStrategy.getBaseHref();
      (this._basePath = VM(Ty(My(r)))),
        this._locationStrategy.onPopState((o) => {
          this._subject.emit({
            url: this.path(!0),
            pop: !0,
            state: o.state,
            type: o.type,
          });
        });
    }
    ngOnDestroy() {
      this._urlChangeSubscription?.unsubscribe(),
        (this._urlChangeListeners = []);
    }
    path(n = !1) {
      return this.normalize(this._locationStrategy.path(n));
    }
    getState() {
      return this._locationStrategy.getState();
    }
    isCurrentPathEqualTo(n, r = "") {
      return this.path() == this.normalize(n + Hi(r));
    }
    normalize(n) {
      return e.stripTrailingSlash(jM(this._basePath, My(n)));
    }
    prepareExternalUrl(n) {
      return (
        n && n[0] !== "/" && (n = "/" + n),
        this._locationStrategy.prepareExternalUrl(n)
      );
    }
    go(n, r = "", o = null) {
      this._locationStrategy.pushState(o, "", n, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Hi(r)), o);
    }
    replaceState(n, r = "", o = null) {
      this._locationStrategy.replaceState(o, "", n, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(n + Hi(r)), o);
    }
    forward() {
      this._locationStrategy.forward();
    }
    back() {
      this._locationStrategy.back();
    }
    historyGo(n = 0) {
      this._locationStrategy.historyGo?.(n);
    }
    onUrlChange(n) {
      return (
        this._urlChangeListeners.push(n),
        this._urlChangeSubscription ||
          (this._urlChangeSubscription = this.subscribe((r) => {
            this._notifyUrlChangeListeners(r.url, r.state);
          })),
        () => {
          let r = this._urlChangeListeners.indexOf(n);
          this._urlChangeListeners.splice(r, 1),
            this._urlChangeListeners.length === 0 &&
              (this._urlChangeSubscription?.unsubscribe(),
              (this._urlChangeSubscription = null));
        }
      );
    }
    _notifyUrlChangeListeners(n = "", r) {
      this._urlChangeListeners.forEach((o) => o(n, r));
    }
    subscribe(n, r, o) {
      return this._subject.subscribe({ next: n, error: r, complete: o });
    }
  };
  (e.normalizeQueryParams = Hi),
    (e.joinWithSlash = Ny),
    (e.stripTrailingSlash = Ty),
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ur));
    }),
    (e.ɵprov = D({ token: e, factory: () => LM(), providedIn: "root" }));
  let t = e;
  return t;
})();
function LM() {
  return new $i(v(Ur));
}
function jM(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let i = e.substring(t.length);
  return i === "" || ["/", ";", "?", "#"].includes(i[0]) ? i : e;
}
function My(t) {
  return t.replace(/\/index.html$/, "");
}
function VM(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, i] = t.split(/\/\/[^\/]+/);
    return i;
  }
  return t;
}
var Fy = {
    ADP: [void 0, void 0, 0],
    AFN: [void 0, "\u060B", 0],
    ALL: [void 0, void 0, 0],
    AMD: [void 0, "\u058F", 2],
    AOA: [void 0, "Kz"],
    ARS: [void 0, "$"],
    AUD: ["A$", "$"],
    AZN: [void 0, "\u20BC"],
    BAM: [void 0, "KM"],
    BBD: [void 0, "$"],
    BDT: [void 0, "\u09F3"],
    BHD: [void 0, void 0, 3],
    BIF: [void 0, void 0, 0],
    BMD: [void 0, "$"],
    BND: [void 0, "$"],
    BOB: [void 0, "Bs"],
    BRL: ["R$"],
    BSD: [void 0, "$"],
    BWP: [void 0, "P"],
    BYN: [void 0, void 0, 2],
    BYR: [void 0, void 0, 0],
    BZD: [void 0, "$"],
    CAD: ["CA$", "$", 2],
    CHF: [void 0, void 0, 2],
    CLF: [void 0, void 0, 4],
    CLP: [void 0, "$", 0],
    CNY: ["CN\xA5", "\xA5"],
    COP: [void 0, "$", 2],
    CRC: [void 0, "\u20A1", 2],
    CUC: [void 0, "$"],
    CUP: [void 0, "$"],
    CZK: [void 0, "K\u010D", 2],
    DJF: [void 0, void 0, 0],
    DKK: [void 0, "kr", 2],
    DOP: [void 0, "$"],
    EGP: [void 0, "E\xA3"],
    ESP: [void 0, "\u20A7", 0],
    EUR: ["\u20AC"],
    FJD: [void 0, "$"],
    FKP: [void 0, "\xA3"],
    GBP: ["\xA3"],
    GEL: [void 0, "\u20BE"],
    GHS: [void 0, "GH\u20B5"],
    GIP: [void 0, "\xA3"],
    GNF: [void 0, "FG", 0],
    GTQ: [void 0, "Q"],
    GYD: [void 0, "$", 2],
    HKD: ["HK$", "$"],
    HNL: [void 0, "L"],
    HRK: [void 0, "kn"],
    HUF: [void 0, "Ft", 2],
    IDR: [void 0, "Rp", 2],
    ILS: ["\u20AA"],
    INR: ["\u20B9"],
    IQD: [void 0, void 0, 0],
    IRR: [void 0, void 0, 0],
    ISK: [void 0, "kr", 0],
    ITL: [void 0, void 0, 0],
    JMD: [void 0, "$"],
    JOD: [void 0, void 0, 3],
    JPY: ["\xA5", void 0, 0],
    KHR: [void 0, "\u17DB"],
    KMF: [void 0, "CF", 0],
    KPW: [void 0, "\u20A9", 0],
    KRW: ["\u20A9", void 0, 0],
    KWD: [void 0, void 0, 3],
    KYD: [void 0, "$"],
    KZT: [void 0, "\u20B8"],
    LAK: [void 0, "\u20AD", 0],
    LBP: [void 0, "L\xA3", 0],
    LKR: [void 0, "Rs"],
    LRD: [void 0, "$"],
    LTL: [void 0, "Lt"],
    LUF: [void 0, void 0, 0],
    LVL: [void 0, "Ls"],
    LYD: [void 0, void 0, 3],
    MGA: [void 0, "Ar", 0],
    MGF: [void 0, void 0, 0],
    MMK: [void 0, "K", 0],
    MNT: [void 0, "\u20AE", 2],
    MRO: [void 0, void 0, 0],
    MUR: [void 0, "Rs", 2],
    MXN: ["MX$", "$"],
    MYR: [void 0, "RM"],
    NAD: [void 0, "$"],
    NGN: [void 0, "\u20A6"],
    NIO: [void 0, "C$"],
    NOK: [void 0, "kr", 2],
    NPR: [void 0, "Rs"],
    NZD: ["NZ$", "$"],
    OMR: [void 0, void 0, 3],
    PHP: ["\u20B1"],
    PKR: [void 0, "Rs", 2],
    PLN: [void 0, "z\u0142"],
    PYG: [void 0, "\u20B2", 0],
    RON: [void 0, "lei"],
    RSD: [void 0, void 0, 0],
    RUB: [void 0, "\u20BD"],
    RWF: [void 0, "RF", 0],
    SBD: [void 0, "$"],
    SEK: [void 0, "kr", 2],
    SGD: [void 0, "$"],
    SHP: [void 0, "\xA3"],
    SLE: [void 0, void 0, 2],
    SLL: [void 0, void 0, 0],
    SOS: [void 0, void 0, 0],
    SRD: [void 0, "$"],
    SSP: [void 0, "\xA3"],
    STD: [void 0, void 0, 0],
    STN: [void 0, "Db"],
    SYP: [void 0, "\xA3", 0],
    THB: [void 0, "\u0E3F"],
    TMM: [void 0, void 0, 0],
    TND: [void 0, void 0, 3],
    TOP: [void 0, "T$"],
    TRL: [void 0, void 0, 0],
    TRY: [void 0, "\u20BA"],
    TTD: [void 0, "$"],
    TWD: ["NT$", "$", 2],
    TZS: [void 0, void 0, 2],
    UAH: [void 0, "\u20B4"],
    UGX: [void 0, void 0, 0],
    USD: ["$"],
    UYI: [void 0, void 0, 0],
    UYU: [void 0, "$"],
    UYW: [void 0, void 0, 4],
    UZS: [void 0, void 0, 2],
    VEF: [void 0, "Bs", 2],
    VND: ["\u20AB", void 0, 0],
    VUV: [void 0, void 0, 0],
    XAF: ["FCFA", void 0, 0],
    XCD: ["EC$", "$"],
    XOF: ["F\u202FCFA", void 0, 0],
    XPF: ["CFPF", void 0, 0],
    XXX: ["\xA4"],
    YER: [void 0, void 0, 0],
    ZAR: [void 0, "R"],
    ZMK: [void 0, void 0, 0],
    ZMW: [void 0, "ZK"],
    ZWD: [void 0, void 0, 0],
  },
  Ly = (function (t) {
    return (
      (t[(t.Decimal = 0)] = "Decimal"),
      (t[(t.Percent = 1)] = "Percent"),
      (t[(t.Currency = 2)] = "Currency"),
      (t[(t.Scientific = 3)] = "Scientific"),
      t
    );
  })(Ly || {});
var hn = (function (t) {
  return (
    (t[(t.Decimal = 0)] = "Decimal"),
    (t[(t.Group = 1)] = "Group"),
    (t[(t.List = 2)] = "List"),
    (t[(t.PercentSign = 3)] = "PercentSign"),
    (t[(t.PlusSign = 4)] = "PlusSign"),
    (t[(t.MinusSign = 5)] = "MinusSign"),
    (t[(t.Exponential = 6)] = "Exponential"),
    (t[(t.SuperscriptingExponent = 7)] = "SuperscriptingExponent"),
    (t[(t.PerMille = 8)] = "PerMille"),
    (t[(t.Infinity = 9)] = "Infinity"),
    (t[(t.NaN = 10)] = "NaN"),
    (t[(t.TimeSeparator = 11)] = "TimeSeparator"),
    (t[(t.CurrencyDecimal = 12)] = "CurrencyDecimal"),
    (t[(t.CurrencyGroup = 13)] = "CurrencyGroup"),
    t
  );
})(hn || {});
function is(t, e) {
  let i = Sl(t),
    n = i[ji.NumberSymbols][e];
  if (typeof n > "u") {
    if (e === hn.CurrencyDecimal) return i[ji.NumberSymbols][hn.Decimal];
    if (e === hn.CurrencyGroup) return i[ji.NumberSymbols][hn.Group];
  }
  return n;
}
function BM(t, e) {
  return Sl(t)[ji.NumberFormats][e];
}
function UM(t) {
  return Sl(t)[ji.Currencies];
}
function HM(t, e, i = "en") {
  let n = UM(i)[t] || Fy[t] || [],
    r = n[1];
  return e === "narrow" && typeof r == "string" ? r : n[0] || t;
}
var $M = 2;
function zM(t) {
  let e,
    i = Fy[t];
  return i && (e = i[2]), typeof e == "number" ? e : $M;
}
var qM = /^(\d+)?\.((\d+)(-(\d+))?)?$/,
  Ay = 22,
  Ol = ".",
  rs = "0",
  WM = ";",
  GM = ",",
  eh = "#",
  Ry = "\xA4";
function YM(t, e, i, n, r, o, s = !1) {
  let a = "",
    l = !1;
  if (!isFinite(t)) a = is(i, hn.Infinity);
  else {
    let c = XM(t);
    s && (c = KM(c));
    let d = e.minInt,
      u = e.minFrac,
      f = e.maxFrac;
    if (o) {
      let x = o.match(qM);
      if (x === null) throw new Error(`${o} is not a valid digit info`);
      let P = x[1],
        I = x[3],
        re = x[5];
      P != null && (d = th(P)),
        I != null && (u = th(I)),
        re != null ? (f = th(re)) : I != null && u > f && (f = u);
    }
    JM(c, u, f);
    let h = c.digits,
      p = c.integerLen,
      m = c.exponent,
      g = [];
    for (l = h.every((x) => !x); p < d; p++) h.unshift(0);
    for (; p < 0; p++) h.unshift(0);
    p > 0 ? (g = h.splice(p, h.length)) : ((g = h), (h = [0]));
    let b = [];
    for (
      h.length >= e.lgSize && b.unshift(h.splice(-e.lgSize, h.length).join(""));
      h.length > e.gSize;

    )
      b.unshift(h.splice(-e.gSize, h.length).join(""));
    h.length && b.unshift(h.join("")),
      (a = b.join(is(i, n))),
      g.length && (a += is(i, r) + g.join("")),
      m && (a += is(i, hn.Exponential) + "+" + m);
  }
  return (
    t < 0 && !l ? (a = e.negPre + a + e.negSuf) : (a = e.posPre + a + e.posSuf),
    a
  );
}
function QM(t, e, i, n, r) {
  let o = BM(e, Ly.Currency),
    s = ZM(o, is(e, hn.MinusSign));
  return (
    (s.minFrac = zM(n)),
    (s.maxFrac = s.minFrac),
    YM(t, s, e, hn.CurrencyGroup, hn.CurrencyDecimal, r)
      .replace(Ry, i)
      .replace(Ry, "")
      .trim()
  );
}
function ZM(t, e = "-") {
  let i = {
      minInt: 1,
      minFrac: 0,
      maxFrac: 0,
      posPre: "",
      posSuf: "",
      negPre: "",
      negSuf: "",
      gSize: 0,
      lgSize: 0,
    },
    n = t.split(WM),
    r = n[0],
    o = n[1],
    s =
      r.indexOf(Ol) !== -1
        ? r.split(Ol)
        : [
            r.substring(0, r.lastIndexOf(rs) + 1),
            r.substring(r.lastIndexOf(rs) + 1),
          ],
    a = s[0],
    l = s[1] || "";
  i.posPre = a.substring(0, a.indexOf(eh));
  for (let d = 0; d < l.length; d++) {
    let u = l.charAt(d);
    u === rs
      ? (i.minFrac = i.maxFrac = d + 1)
      : u === eh
      ? (i.maxFrac = d + 1)
      : (i.posSuf += u);
  }
  let c = a.split(GM);
  if (
    ((i.gSize = c[1] ? c[1].length : 0),
    (i.lgSize = c[2] || c[1] ? (c[2] || c[1]).length : 0),
    o)
  ) {
    let d = r.length - i.posPre.length - i.posSuf.length,
      u = o.indexOf(eh);
    (i.negPre = o.substring(0, u).replace(/'/g, "")),
      (i.negSuf = o.slice(u + d).replace(/'/g, ""));
  } else (i.negPre = e + i.posPre), (i.negSuf = i.posSuf);
  return i;
}
function KM(t) {
  if (t.digits[0] === 0) return t;
  let e = t.digits.length - t.integerLen;
  return (
    t.exponent
      ? (t.exponent += 2)
      : (e === 0 ? t.digits.push(0, 0) : e === 1 && t.digits.push(0),
        (t.integerLen += 2)),
    t
  );
}
function XM(t) {
  let e = Math.abs(t) + "",
    i = 0,
    n,
    r,
    o,
    s,
    a;
  for (
    (r = e.indexOf(Ol)) > -1 && (e = e.replace(Ol, "")),
      (o = e.search(/e/i)) > 0
        ? (r < 0 && (r = o), (r += +e.slice(o + 1)), (e = e.substring(0, o)))
        : r < 0 && (r = e.length),
      o = 0;
    e.charAt(o) === rs;
    o++
  );
  if (o === (a = e.length)) (n = [0]), (r = 1);
  else {
    for (a--; e.charAt(a) === rs; ) a--;
    for (r -= o, n = [], s = 0; o <= a; o++, s++) n[s] = Number(e.charAt(o));
  }
  return (
    r > Ay && ((n = n.splice(0, Ay - 1)), (i = r - 1), (r = 1)),
    { digits: n, exponent: i, integerLen: r }
  );
}
function JM(t, e, i) {
  if (e > i)
    throw new Error(
      `The minimum number of digits after fraction (${e}) is higher than the maximum (${i}).`
    );
  let n = t.digits,
    r = n.length - t.integerLen,
    o = Math.min(Math.max(e, r), i),
    s = o + t.integerLen,
    a = n[s];
  if (s > 0) {
    n.splice(Math.max(t.integerLen, s));
    for (let u = s; u < n.length; u++) n[u] = 0;
  } else {
    (r = Math.max(0, r)),
      (t.integerLen = 1),
      (n.length = Math.max(1, (s = o + 1))),
      (n[0] = 0);
    for (let u = 1; u < s; u++) n[u] = 0;
  }
  if (a >= 5)
    if (s - 1 < 0) {
      for (let u = 0; u > s; u--) n.unshift(0), t.integerLen++;
      n.unshift(1), t.integerLen++;
    } else n[s - 1]++;
  for (; r < Math.max(0, o); r++) n.push(0);
  let l = o !== 0,
    c = e + t.integerLen,
    d = n.reduceRight(function (u, f, h, p) {
      return (
        (f = f + u),
        (p[h] = f < 10 ? f : f - 10),
        l && (p[h] === 0 && h >= c ? p.pop() : (l = !1)),
        f >= 10 ? 1 : 0
      );
    }, 0);
  d && (n.unshift(d), t.integerLen++);
}
function th(t) {
  let e = parseInt(t);
  if (isNaN(e)) throw new Error("Invalid integer literal when parsing " + t);
  return e;
}
function Nl(t, e) {
  e = encodeURIComponent(e);
  for (let i of t.split(";")) {
    let n = i.indexOf("="),
      [r, o] = n == -1 ? [i, ""] : [i.slice(0, n), i.slice(n + 1)];
    if (r.trim() === e) return decodeURIComponent(o);
  }
  return null;
}
var jy = (() => {
  let e = class e {
    constructor(n) {
      (this._viewContainerRef = n),
        (this._viewRef = null),
        (this.ngTemplateOutletContext = null),
        (this.ngTemplateOutlet = null),
        (this.ngTemplateOutletInjector = null);
    }
    ngOnChanges(n) {
      if (this._shouldRecreateView(n)) {
        let r = this._viewContainerRef;
        if (
          (this._viewRef && r.remove(r.indexOf(this._viewRef)),
          !this.ngTemplateOutlet)
        ) {
          this._viewRef = null;
          return;
        }
        let o = this._createContextForwardProxy();
        this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, o, {
          injector: this.ngTemplateOutletInjector ?? void 0,
        });
      }
    }
    _shouldRecreateView(n) {
      return !!n.ngTemplateOutlet || !!n.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (n, r, o) =>
            this.ngTemplateOutletContext
              ? Reflect.set(this.ngTemplateOutletContext, r, o)
              : !1,
          get: (n, r, o) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, r, o);
          },
        }
      );
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(y($t));
  }),
    (e.ɵdir = W({
      type: e,
      selectors: [["", "ngTemplateOutlet", ""]],
      inputs: {
        ngTemplateOutletContext: "ngTemplateOutletContext",
        ngTemplateOutlet: "ngTemplateOutlet",
        ngTemplateOutletInjector: "ngTemplateOutletInjector",
      },
      standalone: !0,
      features: [Ye],
    }));
  let t = e;
  return t;
})();
function eA(t, e) {
  return new E(2100, !1);
}
var Pl = (() => {
  let e = class e {
    constructor(n, r = "USD") {
      (this._locale = n), (this._defaultCurrencyCode = r);
    }
    transform(n, r = this._defaultCurrencyCode, o = "symbol", s, a) {
      if (!tA(n)) return null;
      (a = a || this._locale),
        typeof o == "boolean" && (o = o ? "symbol" : "code");
      let l = r || this._defaultCurrencyCode;
      o !== "code" &&
        (o === "symbol" || o === "symbol-narrow"
          ? (l = HM(l, o === "symbol" ? "wide" : "narrow", a))
          : (l = o));
      try {
        let c = nA(n);
        return QM(c, a, l, r, s);
      } catch (c) {
        throw eA(e, c.message);
      }
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(y(ns, 16), y(Dy, 16));
  }),
    (e.ɵpipe = Sb({ name: "currency", type: e, pure: !0, standalone: !0 }));
  let t = e;
  return t;
})();
function tA(t) {
  return !(t == null || t === "" || t !== t);
}
function nA(t) {
  if (typeof t == "string" && !isNaN(Number(t) - parseFloat(t)))
    return Number(t);
  if (typeof t != "number") throw new Error(`${t} is not a number`);
  return t;
}
var zi = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({}));
    let t = e;
    return t;
  })(),
  ih = "browser",
  iA = "server";
function Vy(t) {
  return t === ih;
}
function rh(t) {
  return t === iA;
}
var Br = class {};
var ss = class {},
  jl = class {},
  qi = class t {
    constructor(e) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        e
          ? typeof e == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  e
                    .split(
                      `
`
                    )
                    .forEach((i) => {
                      let n = i.indexOf(":");
                      if (n > 0) {
                        let r = i.slice(0, n),
                          o = r.toLowerCase(),
                          s = i.slice(n + 1).trim();
                        this.maybeSetNormalizedName(r, o),
                          this.headers.has(o)
                            ? this.headers.get(o).push(s)
                            : this.headers.set(o, [s]);
                      }
                    });
              })
            : typeof Headers < "u" && e instanceof Headers
            ? ((this.headers = new Map()),
              e.forEach((i, n) => {
                this.setHeaderEntries(n, i);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(e).forEach(([i, n]) => {
                    this.setHeaderEntries(i, n);
                  });
              })
          : (this.headers = new Map());
    }
    has(e) {
      return this.init(), this.headers.has(e.toLowerCase());
    }
    get(e) {
      this.init();
      let i = this.headers.get(e.toLowerCase());
      return i && i.length > 0 ? i[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(e) {
      return this.init(), this.headers.get(e.toLowerCase()) || null;
    }
    append(e, i) {
      return this.clone({ name: e, value: i, op: "a" });
    }
    set(e, i) {
      return this.clone({ name: e, value: i, op: "s" });
    }
    delete(e, i) {
      return this.clone({ name: e, value: i, op: "d" });
    }
    maybeSetNormalizedName(e, i) {
      this.normalizedNames.has(i) || this.normalizedNames.set(i, e);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof t
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
          (this.lazyUpdate = null)));
    }
    copyFrom(e) {
      e.init(),
        Array.from(e.headers.keys()).forEach((i) => {
          this.headers.set(i, e.headers.get(i)),
            this.normalizedNames.set(i, e.normalizedNames.get(i));
        });
    }
    clone(e) {
      let i = new t();
      return (
        (i.lazyInit =
          this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
        (i.lazyUpdate = (this.lazyUpdate || []).concat([e])),
        i
      );
    }
    applyUpdate(e) {
      let i = e.name.toLowerCase();
      switch (e.op) {
        case "a":
        case "s":
          let n = e.value;
          if ((typeof n == "string" && (n = [n]), n.length === 0)) return;
          this.maybeSetNormalizedName(e.name, i);
          let r = (e.op === "a" ? this.headers.get(i) : void 0) || [];
          r.push(...n), this.headers.set(i, r);
          break;
        case "d":
          let o = e.value;
          if (!o) this.headers.delete(i), this.normalizedNames.delete(i);
          else {
            let s = this.headers.get(i);
            if (!s) return;
            (s = s.filter((a) => o.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(i), this.normalizedNames.delete(i))
                : this.headers.set(i, s);
          }
          break;
      }
    }
    setHeaderEntries(e, i) {
      let n = (Array.isArray(i) ? i : [i]).map((o) => o.toString()),
        r = e.toLowerCase();
      this.headers.set(r, n), this.maybeSetNormalizedName(e, r);
    }
    forEach(e) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((i) =>
          e(this.normalizedNames.get(i), this.headers.get(i))
        );
    }
  };
var sh = class {
  encodeKey(e) {
    return By(e);
  }
  encodeValue(e) {
    return By(e);
  }
  decodeKey(e) {
    return decodeURIComponent(e);
  }
  decodeValue(e) {
    return decodeURIComponent(e);
  }
};
function sA(t, e) {
  let i = new Map();
  return (
    t.length > 0 &&
      t
        .replace(/^\?/, "")
        .split("&")
        .forEach((r) => {
          let o = r.indexOf("="),
            [s, a] =
              o == -1
                ? [e.decodeKey(r), ""]
                : [e.decodeKey(r.slice(0, o)), e.decodeValue(r.slice(o + 1))],
            l = i.get(s) || [];
          l.push(a), i.set(s, l);
        }),
    i
  );
}
var aA = /%(\d[a-f0-9])/gi,
  lA = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function By(t) {
  return encodeURIComponent(t).replace(aA, (e, i) => lA[i] ?? e);
}
function Ll(t) {
  return `${t}`;
}
var ti = class t {
  constructor(e = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = e.encoder || new sh()),
      e.fromString)
    ) {
      if (e.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = sA(e.fromString, this.encoder);
    } else
      e.fromObject
        ? ((this.map = new Map()),
          Object.keys(e.fromObject).forEach((i) => {
            let n = e.fromObject[i],
              r = Array.isArray(n) ? n.map(Ll) : [Ll(n)];
            this.map.set(i, r);
          }))
        : (this.map = null);
  }
  has(e) {
    return this.init(), this.map.has(e);
  }
  get(e) {
    this.init();
    let i = this.map.get(e);
    return i ? i[0] : null;
  }
  getAll(e) {
    return this.init(), this.map.get(e) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(e, i) {
    return this.clone({ param: e, value: i, op: "a" });
  }
  appendAll(e) {
    let i = [];
    return (
      Object.keys(e).forEach((n) => {
        let r = e[n];
        Array.isArray(r)
          ? r.forEach((o) => {
              i.push({ param: n, value: o, op: "a" });
            })
          : i.push({ param: n, value: r, op: "a" });
      }),
      this.clone(i)
    );
  }
  set(e, i) {
    return this.clone({ param: e, value: i, op: "s" });
  }
  delete(e, i) {
    return this.clone({ param: e, value: i, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((e) => {
          let i = this.encoder.encodeKey(e);
          return this.map
            .get(e)
            .map((n) => i + "=" + this.encoder.encodeValue(n))
            .join("&");
        })
        .filter((e) => e !== "")
        .join("&")
    );
  }
  clone(e) {
    let i = new t({ encoder: this.encoder });
    return (
      (i.cloneFrom = this.cloneFrom || this),
      (i.updates = (this.updates || []).concat(e)),
      i
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
        this.updates.forEach((e) => {
          switch (e.op) {
            case "a":
            case "s":
              let i = (e.op === "a" ? this.map.get(e.param) : void 0) || [];
              i.push(Ll(e.value)), this.map.set(e.param, i);
              break;
            case "d":
              if (e.value !== void 0) {
                let n = this.map.get(e.param) || [],
                  r = n.indexOf(Ll(e.value));
                r !== -1 && n.splice(r, 1),
                  n.length > 0
                    ? this.map.set(e.param, n)
                    : this.map.delete(e.param);
              } else {
                this.map.delete(e.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var ah = class {
  constructor() {
    this.map = new Map();
  }
  set(e, i) {
    return this.map.set(e, i), this;
  }
  get(e) {
    return (
      this.map.has(e) || this.map.set(e, e.defaultValue()), this.map.get(e)
    );
  }
  delete(e) {
    return this.map.delete(e), this;
  }
  has(e) {
    return this.map.has(e);
  }
  keys() {
    return this.map.keys();
  }
};
function cA(t) {
  switch (t) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function Uy(t) {
  return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
}
function Hy(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function $y(t) {
  return typeof FormData < "u" && t instanceof FormData;
}
function dA(t) {
  return typeof URLSearchParams < "u" && t instanceof URLSearchParams;
}
var os = class t {
    constructor(e, i, n, r) {
      (this.url = i),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = e.toUpperCase());
      let o;
      if (
        (cA(this.method) || r
          ? ((this.body = n !== void 0 ? n : null), (o = r))
          : (o = n),
        o &&
          ((this.reportProgress = !!o.reportProgress),
          (this.withCredentials = !!o.withCredentials),
          o.responseType && (this.responseType = o.responseType),
          o.headers && (this.headers = o.headers),
          o.context && (this.context = o.context),
          o.params && (this.params = o.params),
          (this.transferCache = o.transferCache)),
        this.headers || (this.headers = new qi()),
        this.context || (this.context = new ah()),
        !this.params)
      )
        (this.params = new ti()), (this.urlWithParams = i);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = i;
        else {
          let a = i.indexOf("?"),
            l = a === -1 ? "?" : a < i.length - 1 ? "&" : "";
          this.urlWithParams = i + l + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : Uy(this.body) ||
          Hy(this.body) ||
          $y(this.body) ||
          dA(this.body) ||
          typeof this.body == "string"
        ? this.body
        : this.body instanceof ti
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || $y(this.body)
        ? null
        : Hy(this.body)
        ? this.body.type || null
        : Uy(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof ti
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(e = {}) {
      let i = e.method || this.method,
        n = e.url || this.url,
        r = e.responseType || this.responseType,
        o = e.body !== void 0 ? e.body : this.body,
        s =
          e.withCredentials !== void 0
            ? e.withCredentials
            : this.withCredentials,
        a =
          e.reportProgress !== void 0 ? e.reportProgress : this.reportProgress,
        l = e.headers || this.headers,
        c = e.params || this.params,
        d = e.context ?? this.context;
      return (
        e.setHeaders !== void 0 &&
          (l = Object.keys(e.setHeaders).reduce(
            (u, f) => u.set(f, e.setHeaders[f]),
            l
          )),
        e.setParams &&
          (c = Object.keys(e.setParams).reduce(
            (u, f) => u.set(f, e.setParams[f]),
            c
          )),
        new t(i, n, o, {
          params: c,
          headers: l,
          context: d,
          reportProgress: a,
          responseType: r,
          withCredentials: s,
        })
      );
    }
  },
  Hr = (function (t) {
    return (
      (t[(t.Sent = 0)] = "Sent"),
      (t[(t.UploadProgress = 1)] = "UploadProgress"),
      (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
      (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
      (t[(t.Response = 4)] = "Response"),
      (t[(t.User = 5)] = "User"),
      t
    );
  })(Hr || {}),
  as = class {
    constructor(e, i = 200, n = "OK") {
      (this.headers = e.headers || new qi()),
        (this.status = e.status !== void 0 ? e.status : i),
        (this.statusText = e.statusText || n),
        (this.url = e.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  lh = class t extends as {
    constructor(e = {}) {
      super(e), (this.type = Hr.ResponseHeader);
    }
    clone(e = {}) {
      return new t({
        headers: e.headers || this.headers,
        status: e.status !== void 0 ? e.status : this.status,
        statusText: e.statusText || this.statusText,
        url: e.url || this.url || void 0,
      });
    }
  },
  Vl = class t extends as {
    constructor(e = {}) {
      super(e),
        (this.type = Hr.Response),
        (this.body = e.body !== void 0 ? e.body : null);
    }
    clone(e = {}) {
      return new t({
        body: e.body !== void 0 ? e.body : this.body,
        headers: e.headers || this.headers,
        status: e.status !== void 0 ? e.status : this.status,
        statusText: e.statusText || this.statusText,
        url: e.url || this.url || void 0,
      });
    }
  },
  Bl = class extends as {
    constructor(e) {
      super(e, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              e.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              e.url || "(unknown url)"
            }: ${e.status} ${e.statusText}`),
        (this.error = e.error || null);
    }
  };
function oh(t, e) {
  return {
    body: e,
    headers: t.headers,
    context: t.context,
    observe: t.observe,
    params: t.params,
    reportProgress: t.reportProgress,
    responseType: t.responseType,
    withCredentials: t.withCredentials,
    transferCache: t.transferCache,
  };
}
var ch = (() => {
  let e = class e {
    constructor(n) {
      this.handler = n;
    }
    request(n, r, o = {}) {
      let s;
      if (n instanceof os) s = n;
      else {
        let c;
        o.headers instanceof qi ? (c = o.headers) : (c = new qi(o.headers));
        let d;
        o.params &&
          (o.params instanceof ti
            ? (d = o.params)
            : (d = new ti({ fromObject: o.params }))),
          (s = new os(n, r, o.body !== void 0 ? o.body : null, {
            headers: c,
            context: o.context,
            params: d,
            reportProgress: o.reportProgress,
            responseType: o.responseType || "json",
            withCredentials: o.withCredentials,
            transferCache: o.transferCache,
          }));
      }
      let a = N(s).pipe(zn((c) => this.handler.handle(c)));
      if (n instanceof os || o.observe === "events") return a;
      let l = a.pipe(De((c) => c instanceof Vl));
      switch (o.observe || "body") {
        case "body":
          switch (s.responseType) {
            case "arraybuffer":
              return l.pipe(
                $((c) => {
                  if (c.body !== null && !(c.body instanceof ArrayBuffer))
                    throw new Error("Response is not an ArrayBuffer.");
                  return c.body;
                })
              );
            case "blob":
              return l.pipe(
                $((c) => {
                  if (c.body !== null && !(c.body instanceof Blob))
                    throw new Error("Response is not a Blob.");
                  return c.body;
                })
              );
            case "text":
              return l.pipe(
                $((c) => {
                  if (c.body !== null && typeof c.body != "string")
                    throw new Error("Response is not a string.");
                  return c.body;
                })
              );
            case "json":
            default:
              return l.pipe($((c) => c.body));
          }
        case "response":
          return l;
        default:
          throw new Error(`Unreachable: unhandled observe type ${o.observe}}`);
      }
    }
    delete(n, r = {}) {
      return this.request("DELETE", n, r);
    }
    get(n, r = {}) {
      return this.request("GET", n, r);
    }
    head(n, r = {}) {
      return this.request("HEAD", n, r);
    }
    jsonp(n, r) {
      return this.request("JSONP", n, {
        params: new ti().append(r, "JSONP_CALLBACK"),
        observe: "body",
        responseType: "json",
      });
    }
    options(n, r = {}) {
      return this.request("OPTIONS", n, r);
    }
    patch(n, r, o = {}) {
      return this.request("PATCH", n, oh(o, r));
    }
    post(n, r, o = {}) {
      return this.request("POST", n, oh(o, r));
    }
    put(n, r, o = {}) {
      return this.request("PUT", n, oh(o, r));
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(ss));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
function Gy(t, e) {
  return e(t);
}
function uA(t, e) {
  return (i, n) => e.intercept(i, { handle: (r) => t(r, n) });
}
function fA(t, e, i) {
  return (n, r) => An(i, () => e(n, (o) => t(o, r)));
}
var hA = new S(""),
  dh = new S(""),
  pA = new S(""),
  mA = new S("");
function gA() {
  let t = null;
  return (e, i) => {
    t === null && (t = (w(hA, { optional: !0 }) ?? []).reduceRight(uA, Gy));
    let n = w(Ui),
      r = n.add();
    return t(e, i).pipe(Wn(() => n.remove(r)));
  };
}
var zy = (() => {
  let e = class e extends ss {
    constructor(n, r) {
      super(),
        (this.backend = n),
        (this.injector = r),
        (this.chain = null),
        (this.pendingTasks = w(Ui));
      let o = w(mA, { optional: !0 });
      this.backend = o ?? n;
    }
    handle(n) {
      if (this.chain === null) {
        let o = Array.from(
          new Set([...this.injector.get(dh), ...this.injector.get(pA, [])])
        );
        this.chain = o.reduceRight((s, a) => fA(s, a, this.injector), Gy);
      }
      let r = this.pendingTasks.add();
      return this.chain(n, (o) => this.backend.handle(o)).pipe(
        Wn(() => this.pendingTasks.remove(r))
      );
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(jl), v(ft));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
var bA = /^\)\]\}',?\n/;
function vA(t) {
  return "responseURL" in t && t.responseURL
    ? t.responseURL
    : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
    ? t.getResponseHeader("X-Request-URL")
    : null;
}
var qy = (() => {
    let e = class e {
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new E(-2800, !1);
        let r = this.xhrFactory;
        return (r.ɵloadImpl ? we(r.ɵloadImpl()) : N(null)).pipe(
          Je(
            () =>
              new U((s) => {
                let a = r.build();
                if (
                  (a.open(n.method, n.urlWithParams),
                  n.withCredentials && (a.withCredentials = !0),
                  n.headers.forEach((g, b) =>
                    a.setRequestHeader(g, b.join(","))
                  ),
                  n.headers.has("Accept") ||
                    a.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !n.headers.has("Content-Type"))
                ) {
                  let g = n.detectContentTypeHeader();
                  g !== null && a.setRequestHeader("Content-Type", g);
                }
                if (n.responseType) {
                  let g = n.responseType.toLowerCase();
                  a.responseType = g !== "json" ? g : "text";
                }
                let l = n.serializeBody(),
                  c = null,
                  d = () => {
                    if (c !== null) return c;
                    let g = a.statusText || "OK",
                      b = new qi(a.getAllResponseHeaders()),
                      x = vA(a) || n.url;
                    return (
                      (c = new lh({
                        headers: b,
                        status: a.status,
                        statusText: g,
                        url: x,
                      })),
                      c
                    );
                  },
                  u = () => {
                    let { headers: g, status: b, statusText: x, url: P } = d(),
                      I = null;
                    b !== 204 &&
                      (I =
                        typeof a.response > "u" ? a.responseText : a.response),
                      b === 0 && (b = I ? 200 : 0);
                    let re = b >= 200 && b < 300;
                    if (n.responseType === "json" && typeof I == "string") {
                      let H = I;
                      I = I.replace(bA, "");
                      try {
                        I = I !== "" ? JSON.parse(I) : null;
                      } catch (se) {
                        (I = H),
                          re && ((re = !1), (I = { error: se, text: I }));
                      }
                    }
                    re
                      ? (s.next(
                          new Vl({
                            body: I,
                            headers: g,
                            status: b,
                            statusText: x,
                            url: P || void 0,
                          })
                        ),
                        s.complete())
                      : s.error(
                          new Bl({
                            error: I,
                            headers: g,
                            status: b,
                            statusText: x,
                            url: P || void 0,
                          })
                        );
                  },
                  f = (g) => {
                    let { url: b } = d(),
                      x = new Bl({
                        error: g,
                        status: a.status || 0,
                        statusText: a.statusText || "Unknown Error",
                        url: b || void 0,
                      });
                    s.error(x);
                  },
                  h = !1,
                  p = (g) => {
                    h || (s.next(d()), (h = !0));
                    let b = { type: Hr.DownloadProgress, loaded: g.loaded };
                    g.lengthComputable && (b.total = g.total),
                      n.responseType === "text" &&
                        a.responseText &&
                        (b.partialText = a.responseText),
                      s.next(b);
                  },
                  m = (g) => {
                    let b = { type: Hr.UploadProgress, loaded: g.loaded };
                    g.lengthComputable && (b.total = g.total), s.next(b);
                  };
                return (
                  a.addEventListener("load", u),
                  a.addEventListener("error", f),
                  a.addEventListener("timeout", f),
                  a.addEventListener("abort", f),
                  n.reportProgress &&
                    (a.addEventListener("progress", p),
                    l !== null &&
                      a.upload &&
                      a.upload.addEventListener("progress", m)),
                  a.send(l),
                  s.next({ type: Hr.Sent }),
                  () => {
                    a.removeEventListener("error", f),
                      a.removeEventListener("abort", f),
                      a.removeEventListener("load", u),
                      a.removeEventListener("timeout", f),
                      n.reportProgress &&
                        (a.removeEventListener("progress", p),
                        l !== null &&
                          a.upload &&
                          a.upload.removeEventListener("progress", m)),
                      a.readyState !== a.DONE && a.abort();
                  }
                );
              })
          )
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Br));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Yy = new S("XSRF_ENABLED"),
  yA = "XSRF-TOKEN",
  _A = new S("XSRF_COOKIE_NAME", { providedIn: "root", factory: () => yA }),
  xA = "X-XSRF-TOKEN",
  wA = new S("XSRF_HEADER_NAME", { providedIn: "root", factory: () => xA }),
  Ul = class {},
  EA = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this.doc = n),
          (this.platform = r),
          (this.cookieName = o),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = Nl(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J), v(dn), v(_A));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function CA(t, e) {
  let i = t.url.toLowerCase();
  if (
    !w(Yy) ||
    t.method === "GET" ||
    t.method === "HEAD" ||
    i.startsWith("http://") ||
    i.startsWith("https://")
  )
    return e(t);
  let n = w(Ul).getToken(),
    r = w(wA);
  return (
    n != null &&
      !t.headers.has(r) &&
      (t = t.clone({ headers: t.headers.set(r, n) })),
    e(t)
  );
}
var Qy = (function (t) {
  return (
    (t[(t.Interceptors = 0)] = "Interceptors"),
    (t[(t.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (t[(t.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (t[(t.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (t[(t.JsonpSupport = 4)] = "JsonpSupport"),
    (t[(t.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (t[(t.Fetch = 6)] = "Fetch"),
    t
  );
})(Qy || {});
function DA(t, e) {
  return { ɵkind: t, ɵproviders: e };
}
function IA(...t) {
  let e = [
    ch,
    qy,
    zy,
    { provide: ss, useExisting: zy },
    { provide: jl, useExisting: qy },
    { provide: dh, useValue: CA, multi: !0 },
    { provide: Yy, useValue: !0 },
    { provide: Ul, useClass: EA },
  ];
  for (let i of t) e.push(...i.ɵproviders);
  return Pr(e);
}
var Wy = new S("LEGACY_INTERCEPTOR_FN");
function SA() {
  return DA(Qy.LegacyInterceptors, [
    { provide: Wy, useFactory: gA },
    { provide: dh, useExisting: Wy, multi: !0 },
  ]);
}
var Zy = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({ providers: [IA(SA())] }));
  let t = e;
  return t;
})();
var hh = class extends Rl {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  ph = class t extends hh {
    static makeCurrent() {
      Oy(new t());
    }
    onAndCancel(e, i, n) {
      return (
        e.addEventListener(i, n),
        () => {
          e.removeEventListener(i, n);
        }
      );
    }
    dispatchEvent(e, i) {
      e.dispatchEvent(i);
    }
    remove(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    createElement(e, i) {
      return (i = i || this.getDefaultDocument()), i.createElement(e);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(e) {
      return e instanceof DocumentFragment;
    }
    getGlobalEventTarget(e, i) {
      return i === "window"
        ? window
        : i === "document"
        ? e
        : i === "body"
        ? e.body
        : null;
    }
    getBaseHref(e) {
      let i = AA();
      return i == null ? null : RA(i);
    }
    resetBaseElement() {
      ls = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(e) {
      return Nl(document.cookie, e);
    }
  },
  ls = null;
function AA() {
  return (
    (ls = ls || document.querySelector("base")),
    ls ? ls.getAttribute("href") : null
  );
}
function RA(t) {
  return new URL(t, document.baseURI).pathname;
}
var OA = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  mh = new S("EventManagerPlugins"),
  Jy = (() => {
    let e = class e {
      constructor(n, r) {
        (this._zone = r),
          (this._eventNameToPlugin = new Map()),
          n.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, r, o) {
        return this._findPluginFor(r).addEventListener(n, r, o);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let r = this._eventNameToPlugin.get(n);
        if (r) return r;
        if (((r = this._plugins.find((s) => s.supports(n))), !r))
          throw new E(5101, !1);
        return this._eventNameToPlugin.set(n, r), r;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(mh), v(R));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Hl = class {
    constructor(e) {
      this._doc = e;
    }
  },
  uh = "ng-app-id",
  e_ = (() => {
    let e = class e {
      constructor(n, r, o, s = {}) {
        (this.doc = n),
          (this.appId = r),
          (this.nonce = o),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = rh(s)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, 1) === 1 && this.onStyleAdded(r);
      }
      removeStyles(n) {
        for (let r of n)
          this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((r) => r.remove()), n.clear());
        for (let r of this.getAllStyles()) this.onStyleRemoved(r);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let r of this.getAllStyles()) this.addStyleToHost(n, r);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let r of this.hostNodes) this.addStyleToHost(r, n);
      }
      onStyleRemoved(n) {
        let r = this.styleRef;
        r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${uh}="${this.appId}"]`);
        if (n?.length) {
          let r = new Map();
          return (
            n.forEach((o) => {
              o.textContent != null && r.set(o.textContent, o);
            }),
            r
          );
        }
        return null;
      }
      changeUsageCount(n, r) {
        let o = this.styleRef;
        if (o.has(n)) {
          let s = o.get(n);
          return (s.usage += r), s.usage;
        }
        return o.set(n, { usage: r, elements: [] }), r;
      }
      getStyleElement(n, r) {
        let o = this.styleNodesInDOM,
          s = o?.get(r);
        if (s?.parentNode === n) return o.delete(r), s.removeAttribute(uh), s;
        {
          let a = this.doc.createElement("style");
          return (
            this.nonce && a.setAttribute("nonce", this.nonce),
            (a.textContent = r),
            this.platformIsServer && a.setAttribute(uh, this.appId),
            n.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(n, r) {
        let o = this.getStyleElement(n, r),
          s = this.styleRef,
          a = s.get(r)?.elements;
        a ? a.push(o) : s.set(r, { elements: [o], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J), v(_l), v(Zo, 8), v(dn));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  fh = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/MathML/",
  },
  bh = /%COMP%/g,
  t_ = "%COMP%",
  kA = `_nghost-${t_}`,
  NA = `_ngcontent-${t_}`,
  PA = !0,
  FA = new S("RemoveStylesOnCompDestroy", {
    providedIn: "root",
    factory: () => PA,
  });
function LA(t) {
  return NA.replace(bh, t);
}
function jA(t) {
  return kA.replace(bh, t);
}
function n_(t, e) {
  return e.map((i) => i.replace(bh, t));
}
var $l = (() => {
    let e = class e {
      constructor(n, r, o, s, a, l, c, d = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = r),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = a),
          (this.platformId = l),
          (this.ngZone = c),
          (this.nonce = d),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = rh(l)),
          (this.defaultRenderer = new cs(n, a, c, this.platformIsServer));
      }
      createRenderer(n, r) {
        if (!n || !r) return this.defaultRenderer;
        this.platformIsServer &&
          r.encapsulation === nn.ShadowDom &&
          (r = ae(C({}, r), { encapsulation: nn.Emulated }));
        let o = this.getOrCreateRenderer(n, r);
        return (
          o instanceof zl
            ? o.applyToHost(n)
            : o instanceof ds && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, r) {
        let o = this.rendererByCompId,
          s = o.get(r.id);
        if (!s) {
          let a = this.doc,
            l = this.ngZone,
            c = this.eventManager,
            d = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            f = this.platformIsServer;
          switch (r.encapsulation) {
            case nn.Emulated:
              s = new zl(c, d, r, this.appId, u, a, l, f);
              break;
            case nn.ShadowDom:
              return new gh(c, d, n, r, a, l, this.nonce, f);
            default:
              s = new ds(c, d, r, u, a, l, f);
              break;
          }
          o.set(r.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Jy), v(e_), v(_l), v(FA), v(J), v(dn), v(R), v(Zo));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  cs = class {
    constructor(e, i, n, r) {
      (this.eventManager = e),
        (this.doc = i),
        (this.ngZone = n),
        (this.platformIsServer = r),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(e, i) {
      return i
        ? this.doc.createElementNS(fh[i] || i, e)
        : this.doc.createElement(e);
    }
    createComment(e) {
      return this.doc.createComment(e);
    }
    createText(e) {
      return this.doc.createTextNode(e);
    }
    appendChild(e, i) {
      (Ky(e) ? e.content : e).appendChild(i);
    }
    insertBefore(e, i, n) {
      e && (Ky(e) ? e.content : e).insertBefore(i, n);
    }
    removeChild(e, i) {
      e && e.removeChild(i);
    }
    selectRootElement(e, i) {
      let n = typeof e == "string" ? this.doc.querySelector(e) : e;
      if (!n) throw new E(-5104, !1);
      return i || (n.textContent = ""), n;
    }
    parentNode(e) {
      return e.parentNode;
    }
    nextSibling(e) {
      return e.nextSibling;
    }
    setAttribute(e, i, n, r) {
      if (r) {
        i = r + ":" + i;
        let o = fh[r];
        o ? e.setAttributeNS(o, i, n) : e.setAttribute(i, n);
      } else e.setAttribute(i, n);
    }
    removeAttribute(e, i, n) {
      if (n) {
        let r = fh[n];
        r ? e.removeAttributeNS(r, i) : e.removeAttribute(`${n}:${i}`);
      } else e.removeAttribute(i);
    }
    addClass(e, i) {
      e.classList.add(i);
    }
    removeClass(e, i) {
      e.classList.remove(i);
    }
    setStyle(e, i, n, r) {
      r & (In.DashCase | In.Important)
        ? e.style.setProperty(i, n, r & In.Important ? "important" : "")
        : (e.style[i] = n);
    }
    removeStyle(e, i, n) {
      n & In.DashCase ? e.style.removeProperty(i) : (e.style[i] = "");
    }
    setProperty(e, i, n) {
      e != null && (e[i] = n);
    }
    setValue(e, i) {
      e.nodeValue = i;
    }
    listen(e, i, n) {
      if (
        typeof e == "string" &&
        ((e = On().getGlobalEventTarget(this.doc, e)), !e)
      )
        throw new Error(`Unsupported event target ${e} for event ${i}`);
      return this.eventManager.addEventListener(
        e,
        i,
        this.decoratePreventDefault(n)
      );
    }
    decoratePreventDefault(e) {
      return (i) => {
        if (i === "__ngUnwrap__") return e;
        (this.platformIsServer ? this.ngZone.runGuarded(() => e(i)) : e(i)) ===
          !1 && i.preventDefault();
      };
    }
  };
function Ky(t) {
  return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var gh = class extends cs {
    constructor(e, i, n, r, o, s, a, l) {
      super(e, o, s, l),
        (this.sharedStylesHost = i),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = n_(r.id, r.styles);
      for (let d of c) {
        let u = document.createElement("style");
        a && u.setAttribute("nonce", a),
          (u.textContent = d),
          this.shadowRoot.appendChild(u);
      }
    }
    nodeOrShadowRoot(e) {
      return e === this.hostEl ? this.shadowRoot : e;
    }
    appendChild(e, i) {
      return super.appendChild(this.nodeOrShadowRoot(e), i);
    }
    insertBefore(e, i, n) {
      return super.insertBefore(this.nodeOrShadowRoot(e), i, n);
    }
    removeChild(e, i) {
      return super.removeChild(this.nodeOrShadowRoot(e), i);
    }
    parentNode(e) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  ds = class extends cs {
    constructor(e, i, n, r, o, s, a, l) {
      super(e, o, s, a),
        (this.sharedStylesHost = i),
        (this.removeStylesOnCompDestroy = r),
        (this.styles = l ? n_(l, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  zl = class extends ds {
    constructor(e, i, n, r, o, s, a, l) {
      let c = r + "-" + n.id;
      super(e, i, n, o, s, a, l, c),
        (this.contentAttr = LA(c)),
        (this.hostAttr = jA(c));
    }
    applyToHost(e) {
      this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
    }
    createElement(e, i) {
      let n = super.createElement(e, i);
      return super.setAttribute(n, this.contentAttr, ""), n;
    }
  },
  VA = (() => {
    let e = class e extends Hl {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, r, o) {
        return (
          n.addEventListener(r, o, !1), () => this.removeEventListener(n, r, o)
        );
      }
      removeEventListener(n, r, o) {
        return n.removeEventListener(r, o);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Xy = ["alt", "control", "meta", "shift"],
  BA = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  UA = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  HA = (() => {
    let e = class e extends Hl {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, r, o) {
        let s = e.parseEventName(r),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => On().onAndCancel(n, s.domEventName, a));
      }
      static parseEventName(n) {
        let r = n.toLowerCase().split("."),
          o = r.shift();
        if (r.length === 0 || !(o === "keydown" || o === "keyup")) return null;
        let s = e._normalizeKey(r.pop()),
          a = "",
          l = r.indexOf("code");
        if (
          (l > -1 && (r.splice(l, 1), (a = "code.")),
          Xy.forEach((d) => {
            let u = r.indexOf(d);
            u > -1 && (r.splice(u, 1), (a += d + "."));
          }),
          (a += s),
          r.length != 0 || s.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = a), c;
      }
      static matchEventFullKeyCode(n, r) {
        let o = BA[n.key] || n.key,
          s = "";
        return (
          r.indexOf("code.") > -1 && ((o = n.code), (s = "code.")),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === " " ? (o = "space") : o === "." && (o = "dot"),
              Xy.forEach((a) => {
                if (a !== o) {
                  let l = UA[a];
                  l(n) && (s += a + ".");
                }
              }),
              (s += o),
              s === r)
        );
      }
      static eventCallback(n, r, o) {
        return (s) => {
          e.matchEventFullKeyCode(s, n) && o.runGuarded(() => r(s));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function i_(t, e) {
  return Sy(C({ rootComponent: t }, $A(e)));
}
function $A(t) {
  return {
    appProviders: [...YA, ...(t?.providers ?? [])],
    platformProviders: GA,
  };
}
function zA() {
  ph.makeCurrent();
}
function qA() {
  return new Sn();
}
function WA() {
  return wv(document), document;
}
var GA = [
  { provide: dn, useValue: ih },
  { provide: Nf, useValue: zA, multi: !0 },
  { provide: J, useFactory: WA, deps: [] },
];
var YA = [
  { provide: yl, useValue: "root" },
  { provide: Sn, useFactory: qA, deps: [] },
  { provide: mh, useClass: VA, multi: !0, deps: [J, R, dn] },
  { provide: mh, useClass: HA, multi: !0, deps: [J] },
  $l,
  e_,
  Jy,
  { provide: Oi, useExisting: $l },
  { provide: Br, useClass: OA, deps: [] },
  [],
];
function QA() {
  return new vh(v(J));
}
var vh = (() => {
  let e = class e {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(J));
  }),
    (e.ɵprov = D({
      token: e,
      factory: function (r) {
        let o = null;
        return r ? (o = new r()) : (o = QA()), o;
      },
      providedIn: "root",
    }));
  let t = e;
  return t;
})();
var K = "primary",
  Ds = Symbol("RouteTitle"),
  Eh = class {
    constructor(e) {
      this.params = e || {};
    }
    has(e) {
      return Object.prototype.hasOwnProperty.call(this.params, e);
    }
    get(e) {
      if (this.has(e)) {
        let i = this.params[e];
        return Array.isArray(i) ? i[0] : i;
      }
      return null;
    }
    getAll(e) {
      if (this.has(e)) {
        let i = this.params[e];
        return Array.isArray(i) ? i : [i];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function Gr(t) {
  return new Eh(t);
}
function XA(t, e, i) {
  let n = i.path.split("/");
  if (
    n.length > t.length ||
    (i.pathMatch === "full" && (e.hasChildren() || n.length < t.length))
  )
    return null;
  let r = {};
  for (let o = 0; o < n.length; o++) {
    let s = n[o],
      a = t[o];
    if (s.startsWith(":")) r[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: t.slice(0, n.length), posParams: r };
}
function JA(t, e) {
  if (t.length !== e.length) return !1;
  for (let i = 0; i < t.length; ++i) if (!pn(t[i], e[i])) return !1;
  return !0;
}
function pn(t, e) {
  let i = t ? Ch(t) : void 0,
    n = e ? Ch(e) : void 0;
  if (!i || !n || i.length != n.length) return !1;
  let r;
  for (let o = 0; o < i.length; o++)
    if (((r = i[o]), !c_(t[r], e[r]))) return !1;
  return !0;
}
function Ch(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function c_(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let i = [...t].sort(),
      n = [...e].sort();
    return i.every((r, o) => n[o] === r);
  } else return t === e;
}
function d_(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function ri(t) {
  return Aa(t) ? t : Vi(t) ? we(Promise.resolve(t)) : N(t);
}
var eR = { exact: f_, subset: h_ },
  u_ = { exact: tR, subset: nR, ignored: () => !0 };
function r_(t, e, i) {
  return (
    eR[i.paths](t.root, e.root, i.matrixParams) &&
    u_[i.queryParams](t.queryParams, e.queryParams) &&
    !(i.fragment === "exact" && t.fragment !== e.fragment)
  );
}
function tR(t, e) {
  return pn(t, e);
}
function f_(t, e, i) {
  if (
    !Gi(t.segments, e.segments) ||
    !Gl(t.segments, e.segments, i) ||
    t.numberOfChildren !== e.numberOfChildren
  )
    return !1;
  for (let n in e.children)
    if (!t.children[n] || !f_(t.children[n], e.children[n], i)) return !1;
  return !0;
}
function nR(t, e) {
  return (
    Object.keys(e).length <= Object.keys(t).length &&
    Object.keys(e).every((i) => c_(t[i], e[i]))
  );
}
function h_(t, e, i) {
  return p_(t, e, e.segments, i);
}
function p_(t, e, i, n) {
  if (t.segments.length > i.length) {
    let r = t.segments.slice(0, i.length);
    return !(!Gi(r, i) || e.hasChildren() || !Gl(r, i, n));
  } else if (t.segments.length === i.length) {
    if (!Gi(t.segments, i) || !Gl(t.segments, i, n)) return !1;
    for (let r in e.children)
      if (!t.children[r] || !h_(t.children[r], e.children[r], n)) return !1;
    return !0;
  } else {
    let r = i.slice(0, t.segments.length),
      o = i.slice(t.segments.length);
    return !Gi(t.segments, r) || !Gl(t.segments, r, n) || !t.children[K]
      ? !1
      : p_(t.children[K], e, o, n);
  }
}
function Gl(t, e, i) {
  return e.every((n, r) => u_[i](t[r].parameters, n.parameters));
}
var ni = class {
    constructor(e = new fe([], {}), i = {}, n = null) {
      (this.root = e), (this.queryParams = i), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        this._queryParamMap || (this._queryParamMap = Gr(this.queryParams)),
        this._queryParamMap
      );
    }
    toString() {
      return oR.serialize(this);
    }
  },
  fe = class {
    constructor(e, i) {
      (this.segments = e),
        (this.children = i),
        (this.parent = null),
        Object.values(i).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Yl(this);
    }
  },
  Wi = class {
    constructor(e, i) {
      (this.path = e), (this.parameters = i);
    }
    get parameterMap() {
      return (
        this._parameterMap || (this._parameterMap = Gr(this.parameters)),
        this._parameterMap
      );
    }
    toString() {
      return g_(this);
    }
  };
function iR(t, e) {
  return Gi(t, e) && t.every((i, n) => pn(i.parameters, e[n].parameters));
}
function Gi(t, e) {
  return t.length !== e.length ? !1 : t.every((i, n) => i.path === e[n].path);
}
function rR(t, e) {
  let i = [];
  return (
    Object.entries(t.children).forEach(([n, r]) => {
      n === K && (i = i.concat(e(r, n)));
    }),
    Object.entries(t.children).forEach(([n, r]) => {
      n !== K && (i = i.concat(e(r, n)));
    }),
    i
  );
}
var Qh = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => new Zl())(),
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  Zl = class {
    parse(e) {
      let i = new Ih(e);
      return new ni(
        i.parseRootSegment(),
        i.parseQueryParams(),
        i.parseFragment()
      );
    }
    serialize(e) {
      let i = `/${us(e.root, !0)}`,
        n = lR(e.queryParams),
        r = typeof e.fragment == "string" ? `#${sR(e.fragment)}` : "";
      return `${i}${n}${r}`;
    }
  },
  oR = new Zl();
function Yl(t) {
  return t.segments.map((e) => g_(e)).join("/");
}
function us(t, e) {
  if (!t.hasChildren()) return Yl(t);
  if (e) {
    let i = t.children[K] ? us(t.children[K], !1) : "",
      n = [];
    return (
      Object.entries(t.children).forEach(([r, o]) => {
        r !== K && n.push(`${r}:${us(o, !1)}`);
      }),
      n.length > 0 ? `${i}(${n.join("//")})` : i
    );
  } else {
    let i = rR(t, (n, r) =>
      r === K ? [us(t.children[K], !1)] : [`${r}:${us(n, !1)}`]
    );
    return Object.keys(t.children).length === 1 && t.children[K] != null
      ? `${Yl(t)}/${i[0]}`
      : `${Yl(t)}/(${i.join("//")})`;
  }
}
function m_(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function ql(t) {
  return m_(t).replace(/%3B/gi, ";");
}
function sR(t) {
  return encodeURI(t);
}
function Dh(t) {
  return m_(t)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function Ql(t) {
  return decodeURIComponent(t);
}
function o_(t) {
  return Ql(t.replace(/\+/g, "%20"));
}
function g_(t) {
  return `${Dh(t.path)}${aR(t.parameters)}`;
}
function aR(t) {
  return Object.keys(t)
    .map((e) => `;${Dh(e)}=${Dh(t[e])}`)
    .join("");
}
function lR(t) {
  let e = Object.keys(t)
    .map((i) => {
      let n = t[i];
      return Array.isArray(n)
        ? n.map((r) => `${ql(i)}=${ql(r)}`).join("&")
        : `${ql(i)}=${ql(n)}`;
    })
    .filter((i) => !!i);
  return e.length ? `?${e.join("&")}` : "";
}
var cR = /^[^\/()?;#]+/;
function yh(t) {
  let e = t.match(cR);
  return e ? e[0] : "";
}
var dR = /^[^\/()?;=#]+/;
function uR(t) {
  let e = t.match(dR);
  return e ? e[0] : "";
}
var fR = /^[^=?&#]+/;
function hR(t) {
  let e = t.match(fR);
  return e ? e[0] : "";
}
var pR = /^[^&#]+/;
function mR(t) {
  let e = t.match(pR);
  return e ? e[0] : "";
}
var Ih = class {
  constructor(e) {
    (this.url = e), (this.remaining = e);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new fe([], {})
        : new fe([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let e = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(e);
      while (this.consumeOptional("&"));
    return e;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let e = [];
    for (
      this.peekStartsWith("(") || e.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), e.push(this.parseSegment());
    let i = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (i = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith("(") && (n = this.parseParens(!1)),
      (e.length > 0 || Object.keys(i).length > 0) && (n[K] = new fe(e, i)),
      n
    );
  }
  parseSegment() {
    let e = yh(this.remaining);
    if (e === "" && this.peekStartsWith(";")) throw new E(4009, !1);
    return this.capture(e), new Wi(Ql(e), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(";"); ) this.parseParam(e);
    return e;
  }
  parseParam(e) {
    let i = uR(this.remaining);
    if (!i) return;
    this.capture(i);
    let n = "";
    if (this.consumeOptional("=")) {
      let r = yh(this.remaining);
      r && ((n = r), this.capture(n));
    }
    e[Ql(i)] = Ql(n);
  }
  parseQueryParam(e) {
    let i = hR(this.remaining);
    if (!i) return;
    this.capture(i);
    let n = "";
    if (this.consumeOptional("=")) {
      let s = mR(this.remaining);
      s && ((n = s), this.capture(n));
    }
    let r = o_(i),
      o = o_(n);
    if (e.hasOwnProperty(r)) {
      let s = e[r];
      Array.isArray(s) || ((s = [s]), (e[r] = s)), s.push(o);
    } else e[r] = o;
  }
  parseParens(e) {
    let i = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let n = yh(this.remaining),
        r = this.remaining[n.length];
      if (r !== "/" && r !== ")" && r !== ";") throw new E(4010, !1);
      let o;
      n.indexOf(":") > -1
        ? ((o = n.slice(0, n.indexOf(":"))), this.capture(o), this.capture(":"))
        : e && (o = K);
      let s = this.parseChildren();
      (i[o] = Object.keys(s).length === 1 ? s[K] : new fe([], s)),
        this.consumeOptional("//");
    }
    return i;
  }
  peekStartsWith(e) {
    return this.remaining.startsWith(e);
  }
  consumeOptional(e) {
    return this.peekStartsWith(e)
      ? ((this.remaining = this.remaining.substring(e.length)), !0)
      : !1;
  }
  capture(e) {
    if (!this.consumeOptional(e)) throw new E(4011, !1);
  }
};
function b_(t) {
  return t.segments.length > 0 ? new fe([], { [K]: t }) : t;
}
function v_(t) {
  let e = {};
  for (let n of Object.keys(t.children)) {
    let r = t.children[n],
      o = v_(r);
    if (n === K && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) e[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (e[n] = o);
  }
  let i = new fe(t.segments, e);
  return gR(i);
}
function gR(t) {
  if (t.numberOfChildren === 1 && t.children[K]) {
    let e = t.children[K];
    return new fe(t.segments.concat(e.segments), e.children);
  }
  return t;
}
function Yr(t) {
  return t instanceof ni;
}
function bR(t, e, i = null, n = null) {
  let r = y_(t);
  return __(r, e, i, n);
}
function y_(t) {
  let e;
  function i(o) {
    let s = {};
    for (let l of o.children) {
      let c = i(l);
      s[l.outlet] = c;
    }
    let a = new fe(o.url, s);
    return o === t && (e = a), a;
  }
  let n = i(t.root),
    r = b_(n);
  return e ?? r;
}
function __(t, e, i, n) {
  let r = t;
  for (; r.parent; ) r = r.parent;
  if (e.length === 0) return _h(r, r, r, i, n);
  let o = vR(e);
  if (o.toRoot()) return _h(r, r, new fe([], {}), i, n);
  let s = yR(o, r, t),
    a = s.processChildren
      ? ps(s.segmentGroup, s.index, o.commands)
      : w_(s.segmentGroup, s.index, o.commands);
  return _h(r, s.segmentGroup, a, i, n);
}
function Kl(t) {
  return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function bs(t) {
  return typeof t == "object" && t != null && t.outlets;
}
function _h(t, e, i, n, r) {
  let o = {};
  n &&
    Object.entries(n).forEach(([l, c]) => {
      o[l] = Array.isArray(c) ? c.map((d) => `${d}`) : `${c}`;
    });
  let s;
  t === e ? (s = i) : (s = x_(t, e, i));
  let a = b_(v_(s));
  return new ni(a, o, r);
}
function x_(t, e, i) {
  let n = {};
  return (
    Object.entries(t.children).forEach(([r, o]) => {
      o === e ? (n[r] = i) : (n[r] = x_(o, e, i));
    }),
    new fe(t.segments, n)
  );
}
var Xl = class {
  constructor(e, i, n) {
    if (
      ((this.isAbsolute = e),
      (this.numberOfDoubleDots = i),
      (this.commands = n),
      e && n.length > 0 && Kl(n[0]))
    )
      throw new E(4003, !1);
    let r = n.find(bs);
    if (r && r !== d_(n)) throw new E(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function vR(t) {
  if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
    return new Xl(!0, 0, t);
  let e = 0,
    i = !1,
    n = t.reduce((r, o, s) => {
      if (typeof o == "object" && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([l, c]) => {
              a[l] = typeof c == "string" ? c.split("/") : c;
            }),
            [...r, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...r, o.segmentPath];
      }
      return typeof o != "string"
        ? [...r, o]
        : s === 0
        ? (o.split("/").forEach((a, l) => {
            (l == 0 && a === ".") ||
              (l == 0 && a === ""
                ? (i = !0)
                : a === ".."
                ? e++
                : a != "" && r.push(a));
          }),
          r)
        : [...r, o];
    }, []);
  return new Xl(i, e, n);
}
var qr = class {
  constructor(e, i, n) {
    (this.segmentGroup = e), (this.processChildren = i), (this.index = n);
  }
};
function yR(t, e, i) {
  if (t.isAbsolute) return new qr(e, !0, 0);
  if (!i) return new qr(e, !1, NaN);
  if (i.parent === null) return new qr(i, !0, 0);
  let n = Kl(t.commands[0]) ? 0 : 1,
    r = i.segments.length - 1 + n;
  return _R(i, r, t.numberOfDoubleDots);
}
function _R(t, e, i) {
  let n = t,
    r = e,
    o = i;
  for (; o > r; ) {
    if (((o -= r), (n = n.parent), !n)) throw new E(4005, !1);
    r = n.segments.length;
  }
  return new qr(n, !1, r - o);
}
function xR(t) {
  return bs(t[0]) ? t[0].outlets : { [K]: t };
}
function w_(t, e, i) {
  if ((t || (t = new fe([], {})), t.segments.length === 0 && t.hasChildren()))
    return ps(t, e, i);
  let n = wR(t, e, i),
    r = i.slice(n.commandIndex);
  if (n.match && n.pathIndex < t.segments.length) {
    let o = new fe(t.segments.slice(0, n.pathIndex), {});
    return (
      (o.children[K] = new fe(t.segments.slice(n.pathIndex), t.children)),
      ps(o, 0, r)
    );
  } else
    return n.match && r.length === 0
      ? new fe(t.segments, {})
      : n.match && !t.hasChildren()
      ? Sh(t, e, i)
      : n.match
      ? ps(t, 0, r)
      : Sh(t, e, i);
}
function ps(t, e, i) {
  if (i.length === 0) return new fe(t.segments, {});
  {
    let n = xR(i),
      r = {};
    if (
      Object.keys(n).some((o) => o !== K) &&
      t.children[K] &&
      t.numberOfChildren === 1 &&
      t.children[K].segments.length === 0
    ) {
      let o = ps(t.children[K], e, i);
      return new fe(t.segments, o.children);
    }
    return (
      Object.entries(n).forEach(([o, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (r[o] = w_(t.children[o], e, s));
      }),
      Object.entries(t.children).forEach(([o, s]) => {
        n[o] === void 0 && (r[o] = s);
      }),
      new fe(t.segments, r)
    );
  }
}
function wR(t, e, i) {
  let n = 0,
    r = e,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; r < t.segments.length; ) {
    if (n >= i.length) return o;
    let s = t.segments[r],
      a = i[n];
    if (bs(a)) break;
    let l = `${a}`,
      c = n < i.length - 1 ? i[n + 1] : null;
    if (r > 0 && l === void 0) break;
    if (l && c && typeof c == "object" && c.outlets === void 0) {
      if (!a_(l, c, s)) return o;
      n += 2;
    } else {
      if (!a_(l, {}, s)) return o;
      n++;
    }
    r++;
  }
  return { match: !0, pathIndex: r, commandIndex: n };
}
function Sh(t, e, i) {
  let n = t.segments.slice(0, e),
    r = 0;
  for (; r < i.length; ) {
    let o = i[r];
    if (bs(o)) {
      let l = ER(o.outlets);
      return new fe(n, l);
    }
    if (r === 0 && Kl(i[0])) {
      let l = t.segments[e];
      n.push(new Wi(l.path, s_(i[0]))), r++;
      continue;
    }
    let s = bs(o) ? o.outlets[K] : `${o}`,
      a = r < i.length - 1 ? i[r + 1] : null;
    s && a && Kl(a)
      ? (n.push(new Wi(s, s_(a))), (r += 2))
      : (n.push(new Wi(s, {})), r++);
  }
  return new fe(n, {});
}
function ER(t) {
  let e = {};
  return (
    Object.entries(t).forEach(([i, n]) => {
      typeof n == "string" && (n = [n]),
        n !== null && (e[i] = Sh(new fe([], {}), 0, n));
    }),
    e
  );
}
function s_(t) {
  let e = {};
  return Object.entries(t).forEach(([i, n]) => (e[i] = `${n}`)), e;
}
function a_(t, e, i) {
  return t == i.path && pn(e, i.parameters);
}
var ms = "imperative",
  Rt = class {
    constructor(e, i) {
      (this.id = e), (this.url = i);
    }
  },
  vs = class extends Rt {
    constructor(e, i, n = "imperative", r = null) {
      super(e, i),
        (this.type = 0),
        (this.navigationTrigger = n),
        (this.restoredState = r);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  kn = class extends Rt {
    constructor(e, i, n) {
      super(e, i), (this.urlAfterRedirects = n), (this.type = 1);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  ii = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i), (this.reason = n), (this.code = r), (this.type = 2);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Yi = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i), (this.reason = n), (this.code = r), (this.type = 16);
    }
  },
  ys = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i), (this.error = n), (this.target = r), (this.type = 3);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Jl = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 4);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Th = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 7);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Mh = class extends Rt {
    constructor(e, i, n, r, o) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.shouldActivate = o),
        (this.type = 8);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  Ah = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 5);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Rh = class extends Rt {
    constructor(e, i, n, r) {
      super(e, i),
        (this.urlAfterRedirects = n),
        (this.state = r),
        (this.type = 6);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  Oh = class {
    constructor(e) {
      (this.route = e), (this.type = 9);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  kh = class {
    constructor(e) {
      (this.route = e), (this.type = 10);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  Nh = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 11);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Ph = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 12);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Fh = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 13);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  Lh = class {
    constructor(e) {
      (this.snapshot = e), (this.type = 14);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  };
var _s = class {},
  xs = class {
    constructor(e) {
      this.url = e;
    }
  };
var jh = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new sc()),
        (this.attachRef = null);
    }
  },
  sc = (() => {
    let e = class e {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(n, r) {
        let o = this.getOrCreateContext(n);
        (o.outlet = r), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let r = this.getContext(n);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let r = this.getContext(n);
        return r || ((r = new jh()), this.contexts.set(n, r)), r;
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  ec = class {
    constructor(e) {
      this._root = e;
    }
    get root() {
      return this._root.value;
    }
    parent(e) {
      let i = this.pathFromRoot(e);
      return i.length > 1 ? i[i.length - 2] : null;
    }
    children(e) {
      let i = Vh(e, this._root);
      return i ? i.children.map((n) => n.value) : [];
    }
    firstChild(e) {
      let i = Vh(e, this._root);
      return i && i.children.length > 0 ? i.children[0].value : null;
    }
    siblings(e) {
      let i = Bh(e, this._root);
      return i.length < 2
        ? []
        : i[i.length - 2].children.map((r) => r.value).filter((r) => r !== e);
    }
    pathFromRoot(e) {
      return Bh(e, this._root).map((i) => i.value);
    }
  };
function Vh(t, e) {
  if (t === e.value) return e;
  for (let i of e.children) {
    let n = Vh(t, i);
    if (n) return n;
  }
  return null;
}
function Bh(t, e) {
  if (t === e.value) return [e];
  for (let i of e.children) {
    let n = Bh(t, i);
    if (n.length) return n.unshift(e), n;
  }
  return [];
}
var wt = class {
  constructor(e, i) {
    (this.value = e), (this.children = i);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function zr(t) {
  let e = {};
  return t && t.children.forEach((i) => (e[i.value.outlet] = i)), e;
}
var tc = class extends ec {
  constructor(e, i) {
    super(e), (this.snapshot = i), Kh(this, e);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function E_(t, e) {
  let i = CR(t, e),
    n = new Me([new Wi("", {})]),
    r = new Me({}),
    o = new Me({}),
    s = new Me({}),
    a = new Me(""),
    l = new Qi(n, r, s, a, o, K, e, i.root);
  return (l.snapshot = i.root), new tc(new wt(l, []), i);
}
function CR(t, e) {
  let i = {},
    n = {},
    r = {},
    o = "",
    s = new ws([], i, r, o, n, K, e, null, {});
  return new nc("", new wt(s, []));
}
var Qi = class {
  constructor(e, i, n, r, o, s, a, l) {
    (this.urlSubject = e),
      (this.paramsSubject = i),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = r),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = l),
      (this.title = this.dataSubject?.pipe($((c) => c[Ds])) ?? N(void 0)),
      (this.url = e),
      (this.params = i),
      (this.queryParams = n),
      (this.fragment = r),
      (this.data = o);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      this._paramMap || (this._paramMap = this.params.pipe($((e) => Gr(e)))),
      this._paramMap
    );
  }
  get queryParamMap() {
    return (
      this._queryParamMap ||
        (this._queryParamMap = this.queryParams.pipe($((e) => Gr(e)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Zh(t, e, i = "emptyOnly") {
  let n,
    { routeConfig: r } = t;
  return (
    e !== null &&
    (i === "always" ||
      r?.path === "" ||
      (!e.component && !e.routeConfig?.loadComponent))
      ? (n = {
          params: C(C({}, e.params), t.params),
          data: C(C({}, e.data), t.data),
          resolve: C(C(C(C({}, t.data), e.data), r?.data), t._resolvedData),
        })
      : (n = {
          params: C({}, t.params),
          data: C({}, t.data),
          resolve: C(C({}, t.data), t._resolvedData ?? {}),
        }),
    r && D_(r) && (n.resolve[Ds] = r.title),
    n
  );
}
var ws = class {
    get title() {
      return this.data?.[Ds];
    }
    constructor(e, i, n, r, o, s, a, l, c) {
      (this.url = e),
        (this.params = i),
        (this.queryParams = n),
        (this.fragment = r),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = l),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (
        this._paramMap || (this._paramMap = Gr(this.params)), this._paramMap
      );
    }
    get queryParamMap() {
      return (
        this._queryParamMap || (this._queryParamMap = Gr(this.queryParams)),
        this._queryParamMap
      );
    }
    toString() {
      let e = this.url.map((n) => n.toString()).join("/"),
        i = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${e}', path:'${i}')`;
    }
  },
  nc = class extends ec {
    constructor(e, i) {
      super(i), (this.url = e), Kh(this, i);
    }
    toString() {
      return C_(this._root);
    }
  };
function Kh(t, e) {
  (e.value._routerState = t), e.children.forEach((i) => Kh(t, i));
}
function C_(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(C_).join(", ")} } ` : "";
  return `${t.value}${e}`;
}
function xh(t) {
  if (t.snapshot) {
    let e = t.snapshot,
      i = t._futureSnapshot;
    (t.snapshot = i),
      pn(e.queryParams, i.queryParams) ||
        t.queryParamsSubject.next(i.queryParams),
      e.fragment !== i.fragment && t.fragmentSubject.next(i.fragment),
      pn(e.params, i.params) || t.paramsSubject.next(i.params),
      JA(e.url, i.url) || t.urlSubject.next(i.url),
      pn(e.data, i.data) || t.dataSubject.next(i.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function Uh(t, e) {
  let i = pn(t.params, e.params) && iR(t.url, e.url),
    n = !t.parent != !e.parent;
  return i && !n && (!t.parent || Uh(t.parent, e.parent));
}
function D_(t) {
  return typeof t.title == "string" || t.title === null;
}
var Xh = (() => {
    let e = class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = K),
          (this.activateEvents = new le()),
          (this.deactivateEvents = new le()),
          (this.attachEvents = new le()),
          (this.detachEvents = new le()),
          (this.parentContexts = w(sc)),
          (this.location = w($t)),
          (this.changeDetector = w(lt)),
          (this.environmentInjector = w(ft)),
          (this.inputBinder = w(Jh, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: r, previousValue: o } = n.name;
          if (r) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new E(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new E(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new E(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, r) {
        (this.activated = n),
          (this._activatedRoute = r),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, r) {
        if (this.isActivated) throw new E(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          a = n.snapshot.component,
          l = this.parentContexts.getOrCreateContext(this.name).children,
          c = new Hh(n, l, o.injector);
        (this.activated = o.createComponent(a, {
          index: o.length,
          injector: c,
          environmentInjector: r ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name" },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        standalone: !0,
        features: [Ye],
      }));
    let t = e;
    return t;
  })(),
  Hh = class {
    constructor(e, i, n) {
      (this.route = e), (this.childContexts = i), (this.parent = n);
    }
    get(e, i) {
      return e === Qi
        ? this.route
        : e === sc
        ? this.childContexts
        : this.parent.get(e, i);
    }
  },
  Jh = new S("");
function DR(t, e, i) {
  let n = Es(t, e._root, i ? i._root : void 0);
  return new tc(n, e);
}
function Es(t, e, i) {
  if (i && t.shouldReuseRoute(e.value, i.value.snapshot)) {
    let n = i.value;
    n._futureSnapshot = e.value;
    let r = IR(t, e, i);
    return new wt(n, r);
  } else {
    if (t.shouldAttach(e.value)) {
      let o = t.retrieve(e.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = e.value),
          (s.children = e.children.map((a) => Es(t, a))),
          s
        );
      }
    }
    let n = SR(e.value),
      r = e.children.map((o) => Es(t, o));
    return new wt(n, r);
  }
}
function IR(t, e, i) {
  return e.children.map((n) => {
    for (let r of i.children)
      if (t.shouldReuseRoute(n.value, r.value.snapshot)) return Es(t, n, r);
    return Es(t, n);
  });
}
function SR(t) {
  return new Qi(
    new Me(t.url),
    new Me(t.params),
    new Me(t.queryParams),
    new Me(t.fragment),
    new Me(t.data),
    t.outlet,
    t.component,
    t
  );
}
var I_ = "ngNavigationCancelingError";
function S_(t, e) {
  let { redirectTo: i, navigationBehaviorOptions: n } = Yr(e)
      ? { redirectTo: e, navigationBehaviorOptions: void 0 }
      : e,
    r = T_(!1, 0, e);
  return (r.url = i), (r.navigationBehaviorOptions = n), r;
}
function T_(t, e, i) {
  let n = new Error("NavigationCancelingError: " + (t || ""));
  return (n[I_] = !0), (n.cancellationCode = e), i && (n.url = i), n;
}
function TR(t) {
  return M_(t) && Yr(t.url);
}
function M_(t) {
  return t && t[I_];
}
var MR = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵcmp = Re({
      type: e,
      selectors: [["ng-component"]],
      standalone: !0,
      features: [qt],
      decls: 1,
      vars: 0,
      template: function (r, o) {
        r & 1 && ve(0, "router-outlet");
      },
      dependencies: [Xh],
      encapsulation: 2,
    }));
  let t = e;
  return t;
})();
function AR(t, e) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = Xf(t.providers, e, `Route: ${t.path}`)),
    t._injector ?? e
  );
}
function ep(t) {
  let e = t.children && t.children.map(ep),
    i = e ? ae(C({}, t), { children: e }) : C({}, t);
  return (
    !i.component &&
      !i.loadComponent &&
      (e || i.loadChildren) &&
      i.outlet &&
      i.outlet !== K &&
      (i.component = MR),
    i
  );
}
function mn(t) {
  return t.outlet || K;
}
function RR(t, e) {
  let i = t.filter((n) => mn(n) === e);
  return i.push(...t.filter((n) => mn(n) !== e)), i;
}
function Is(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let i = e.routeConfig;
    if (i?._loadedInjector) return i._loadedInjector;
    if (i?._injector) return i._injector;
  }
  return null;
}
var OR = (t, e, i, n) =>
    $(
      (r) => (
        new $h(e, r.targetRouterState, r.currentRouterState, i, n).activate(t),
        r
      )
    ),
  $h = class {
    constructor(e, i, n, r, o) {
      (this.routeReuseStrategy = e),
        (this.futureState = i),
        (this.currState = n),
        (this.forwardEvent = r),
        (this.inputBindingEnabled = o);
    }
    activate(e) {
      let i = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(i, n, e),
        xh(this.futureState.root),
        this.activateChildRoutes(i, n, e);
    }
    deactivateChildRoutes(e, i, n) {
      let r = zr(i);
      e.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, r[s], n), delete r[s];
      }),
        Object.values(r).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, n);
        });
    }
    deactivateRoutes(e, i, n) {
      let r = e.value,
        o = i ? i.value : null;
      if (r === o)
        if (r.component) {
          let s = n.getContext(r.outlet);
          s && this.deactivateChildRoutes(e, i, s.children);
        } else this.deactivateChildRoutes(e, i, n);
      else o && this.deactivateRouteAndItsChildren(i, n);
    }
    deactivateRouteAndItsChildren(e, i) {
      e.value.component &&
      this.routeReuseStrategy.shouldDetach(e.value.snapshot)
        ? this.detachAndStoreRouteSubtree(e, i)
        : this.deactivateRouteAndOutlet(e, i);
    }
    detachAndStoreRouteSubtree(e, i) {
      let n = i.getContext(e.value.outlet),
        r = n && e.value.component ? n.children : i,
        o = zr(e);
      for (let s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], r);
      if (n && n.outlet) {
        let s = n.outlet.detach(),
          a = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {
          componentRef: s,
          route: e,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(e, i) {
      let n = i.getContext(e.value.outlet),
        r = n && e.value.component ? n.children : i,
        o = zr(e);
      for (let s of Object.keys(o)) this.deactivateRouteAndItsChildren(o[s], r);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(e, i, n) {
      let r = zr(i);
      e.children.forEach((o) => {
        this.activateRoutes(o, r[o.value.outlet], n),
          this.forwardEvent(new Lh(o.value.snapshot));
      }),
        e.children.length && this.forwardEvent(new Ph(e.value.snapshot));
    }
    activateRoutes(e, i, n) {
      let r = e.value,
        o = i ? i.value : null;
      if ((xh(r), r === o))
        if (r.component) {
          let s = n.getOrCreateContext(r.outlet);
          this.activateChildRoutes(e, i, s.children);
        } else this.activateChildRoutes(e, i, n);
      else if (r.component) {
        let s = n.getOrCreateContext(r.outlet);
        if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(r.snapshot);
          this.routeReuseStrategy.store(r.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            xh(a.route.value),
            this.activateChildRoutes(e, null, s.children);
        } else {
          let a = Is(r.snapshot);
          (s.attachRef = null),
            (s.route = r),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(r, s.injector),
            this.activateChildRoutes(e, null, s.children);
        }
      } else this.activateChildRoutes(e, null, n);
    }
  },
  ic = class {
    constructor(e) {
      (this.path = e), (this.route = this.path[this.path.length - 1]);
    }
  },
  Wr = class {
    constructor(e, i) {
      (this.component = e), (this.route = i);
    }
  };
function kR(t, e, i) {
  let n = t._root,
    r = e ? e._root : null;
  return fs(n, r, i, [n.value]);
}
function NR(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !e || e.length === 0 ? null : { node: t, guards: e };
}
function Zr(t, e) {
  let i = Symbol(),
    n = e.get(t, i);
  return n === i ? (typeof t == "function" && !bb(t) ? t : e.get(t)) : n;
}
function fs(
  t,
  e,
  i,
  n,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = zr(e);
  return (
    t.children.forEach((s) => {
      PR(s, o[s.value.outlet], i, n.concat([s.value]), r),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => gs(a, i.getContext(s), r)),
    r
  );
}
function PR(
  t,
  e,
  i,
  n,
  r = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = t.value,
    s = e ? e.value : null,
    a = i ? i.getContext(t.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let l = FR(s, o, o.routeConfig.runGuardsAndResolvers);
    l
      ? r.canActivateChecks.push(new ic(n))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? fs(t, e, a ? a.children : null, n, r) : fs(t, e, i, n, r),
      l &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        r.canDeactivateChecks.push(new Wr(a.outlet.component, s));
  } else
    s && gs(e, a, r),
      r.canActivateChecks.push(new ic(n)),
      o.component
        ? fs(t, null, a ? a.children : null, n, r)
        : fs(t, null, i, n, r);
  return r;
}
function FR(t, e, i) {
  if (typeof i == "function") return i(t, e);
  switch (i) {
    case "pathParamsChange":
      return !Gi(t.url, e.url);
    case "pathParamsOrQueryParamsChange":
      return !Gi(t.url, e.url) || !pn(t.queryParams, e.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !Uh(t, e) || !pn(t.queryParams, e.queryParams);
    case "paramsChange":
    default:
      return !Uh(t, e);
  }
}
function gs(t, e, i) {
  let n = zr(t),
    r = t.value;
  Object.entries(n).forEach(([o, s]) => {
    r.component
      ? e
        ? gs(s, e.children.getContext(o), i)
        : gs(s, null, i)
      : gs(s, e, i);
  }),
    r.component
      ? e && e.outlet && e.outlet.isActivated
        ? i.canDeactivateChecks.push(new Wr(e.outlet.component, r))
        : i.canDeactivateChecks.push(new Wr(null, r))
      : i.canDeactivateChecks.push(new Wr(null, r));
}
function Ss(t) {
  return typeof t == "function";
}
function LR(t) {
  return typeof t == "boolean";
}
function jR(t) {
  return t && Ss(t.canLoad);
}
function VR(t) {
  return t && Ss(t.canActivate);
}
function BR(t) {
  return t && Ss(t.canActivateChild);
}
function UR(t) {
  return t && Ss(t.canDeactivate);
}
function HR(t) {
  return t && Ss(t.canMatch);
}
function A_(t) {
  return t instanceof wn || t?.name === "EmptyError";
}
var Wl = Symbol("INITIAL_VALUE");
function Qr() {
  return Je((t) =>
    yr(t.map((e) => e.pipe(Ae(1), En(Wl)))).pipe(
      $((e) => {
        for (let i of e)
          if (i !== !0) {
            if (i === Wl) return Wl;
            if (i === !1 || i instanceof ni) return i;
          }
        return !0;
      }),
      De((e) => e !== Wl),
      Ae(1)
    )
  );
}
function $R(t, e) {
  return Ee((i) => {
    let {
      targetSnapshot: n,
      currentSnapshot: r,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = i;
    return s.length === 0 && o.length === 0
      ? N(ae(C({}, i), { guardsResult: !0 }))
      : zR(s, n, r, t).pipe(
          Ee((a) => (a && LR(a) ? qR(n, o, t, e) : N(a))),
          $((a) => ae(C({}, i), { guardsResult: a }))
        );
  });
}
function zR(t, e, i, n) {
  return we(t).pipe(
    Ee((r) => ZR(r.component, r.route, i, e, n)),
    Xt((r) => r !== !0, !0)
  );
}
function qR(t, e, i, n) {
  return we(e).pipe(
    zn((r) =>
      Un(
        GR(r.route.parent, n),
        WR(r.route, n),
        QR(t, r.path, i),
        YR(t, r.route, i)
      )
    ),
    Xt((r) => r !== !0, !0)
  );
}
function WR(t, e) {
  return t !== null && e && e(new Fh(t)), N(!0);
}
function GR(t, e) {
  return t !== null && e && e(new Nh(t)), N(!0);
}
function YR(t, e, i) {
  let n = e.routeConfig ? e.routeConfig.canActivate : null;
  if (!n || n.length === 0) return N(!0);
  let r = n.map((o) =>
    ka(() => {
      let s = Is(e) ?? i,
        a = Zr(o, s),
        l = VR(a) ? a.canActivate(e, t) : An(s, () => a(e, t));
      return ri(l).pipe(Xt());
    })
  );
  return N(r).pipe(Qr());
}
function QR(t, e, i) {
  let n = e[e.length - 1],
    o = e
      .slice(0, e.length - 1)
      .reverse()
      .map((s) => NR(s))
      .filter((s) => s !== null)
      .map((s) =>
        ka(() => {
          let a = s.guards.map((l) => {
            let c = Is(s.node) ?? i,
              d = Zr(l, c),
              u = BR(d) ? d.canActivateChild(n, t) : An(c, () => d(n, t));
            return ri(u).pipe(Xt());
          });
          return N(a).pipe(Qr());
        })
      );
  return N(o).pipe(Qr());
}
function ZR(t, e, i, n, r) {
  let o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return N(!0);
  let s = o.map((a) => {
    let l = Is(e) ?? r,
      c = Zr(a, l),
      d = UR(c) ? c.canDeactivate(t, e, i, n) : An(l, () => c(t, e, i, n));
    return ri(d).pipe(Xt());
  });
  return N(s).pipe(Qr());
}
function KR(t, e, i, n) {
  let r = e.canLoad;
  if (r === void 0 || r.length === 0) return N(!0);
  let o = r.map((s) => {
    let a = Zr(s, t),
      l = jR(a) ? a.canLoad(e, i) : An(t, () => a(e, i));
    return ri(l);
  });
  return N(o).pipe(Qr(), R_(n));
}
function R_(t) {
  return eu(
    Ne((e) => {
      if (Yr(e)) throw S_(t, e);
    }),
    $((e) => e === !0)
  );
}
function XR(t, e, i, n) {
  let r = e.canMatch;
  if (!r || r.length === 0) return N(!0);
  let o = r.map((s) => {
    let a = Zr(s, t),
      l = HR(a) ? a.canMatch(e, i) : An(t, () => a(e, i));
    return ri(l);
  });
  return N(o).pipe(Qr(), R_(n));
}
var Cs = class {
    constructor(e) {
      this.segmentGroup = e || null;
    }
  },
  rc = class extends Error {
    constructor(e) {
      super(), (this.urlTree = e);
    }
  };
function $r(t) {
  return Zt(new Cs(t));
}
function JR(t) {
  return Zt(new E(4e3, !1));
}
function eO(t) {
  return Zt(T_(!1, 3));
}
var zh = class {
    constructor(e, i) {
      (this.urlSerializer = e), (this.urlTree = i);
    }
    lineralizeSegments(e, i) {
      let n = [],
        r = i.root;
      for (;;) {
        if (((n = n.concat(r.segments)), r.numberOfChildren === 0)) return N(n);
        if (r.numberOfChildren > 1 || !r.children[K]) return JR(e.redirectTo);
        r = r.children[K];
      }
    }
    applyRedirectCommands(e, i, n) {
      let r = this.applyRedirectCreateUrlTree(
        i,
        this.urlSerializer.parse(i),
        e,
        n
      );
      if (i.startsWith("/")) throw new rc(r);
      return r;
    }
    applyRedirectCreateUrlTree(e, i, n, r) {
      let o = this.createSegmentGroup(e, i.root, n, r);
      return new ni(
        o,
        this.createQueryParams(i.queryParams, this.urlTree.queryParams),
        i.fragment
      );
    }
    createQueryParams(e, i) {
      let n = {};
      return (
        Object.entries(e).forEach(([r, o]) => {
          if (typeof o == "string" && o.startsWith(":")) {
            let a = o.substring(1);
            n[r] = i[a];
          } else n[r] = o;
        }),
        n
      );
    }
    createSegmentGroup(e, i, n, r) {
      let o = this.createSegments(e, i.segments, n, r),
        s = {};
      return (
        Object.entries(i.children).forEach(([a, l]) => {
          s[a] = this.createSegmentGroup(e, l, n, r);
        }),
        new fe(o, s)
      );
    }
    createSegments(e, i, n, r) {
      return i.map((o) =>
        o.path.startsWith(":")
          ? this.findPosParam(e, o, r)
          : this.findOrReturn(o, n)
      );
    }
    findPosParam(e, i, n) {
      let r = n[i.path.substring(1)];
      if (!r) throw new E(4001, !1);
      return r;
    }
    findOrReturn(e, i) {
      let n = 0;
      for (let r of i) {
        if (r.path === e.path) return i.splice(n), r;
        n++;
      }
      return e;
    }
  },
  qh = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function tO(t, e, i, n, r) {
  let o = tp(t, e, i);
  return o.matched
    ? ((n = AR(e, n)),
      XR(n, e, i, r).pipe($((s) => (s === !0 ? o : C({}, qh)))))
    : N(o);
}
function tp(t, e, i) {
  if (e.path === "**") return nO(i);
  if (e.path === "")
    return e.pathMatch === "full" && (t.hasChildren() || i.length > 0)
      ? C({}, qh)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: i,
          parameters: {},
          positionalParamSegments: {},
        };
  let r = (e.matcher || XA)(i, t, e);
  if (!r) return C({}, qh);
  let o = {};
  Object.entries(r.posParams ?? {}).forEach(([a, l]) => {
    o[a] = l.path;
  });
  let s =
    r.consumed.length > 0
      ? C(C({}, o), r.consumed[r.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: r.consumed,
    remainingSegments: i.slice(r.consumed.length),
    parameters: s,
    positionalParamSegments: r.posParams ?? {},
  };
}
function nO(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? d_(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function l_(t, e, i, n) {
  return i.length > 0 && oO(t, i, n)
    ? {
        segmentGroup: new fe(e, rO(n, new fe(i, t.children))),
        slicedSegments: [],
      }
    : i.length === 0 && sO(t, i, n)
    ? {
        segmentGroup: new fe(t.segments, iO(t, e, i, n, t.children)),
        slicedSegments: i,
      }
    : { segmentGroup: new fe(t.segments, t.children), slicedSegments: i };
}
function iO(t, e, i, n, r) {
  let o = {};
  for (let s of n)
    if (ac(t, i, s) && !r[mn(s)]) {
      let a = new fe([], {});
      o[mn(s)] = a;
    }
  return C(C({}, r), o);
}
function rO(t, e) {
  let i = {};
  i[K] = e;
  for (let n of t)
    if (n.path === "" && mn(n) !== K) {
      let r = new fe([], {});
      i[mn(n)] = r;
    }
  return i;
}
function oO(t, e, i) {
  return i.some((n) => ac(t, e, n) && mn(n) !== K);
}
function sO(t, e, i) {
  return i.some((n) => ac(t, e, n));
}
function ac(t, e, i) {
  return (t.hasChildren() || e.length > 0) && i.pathMatch === "full"
    ? !1
    : i.path === "";
}
function aO(t, e, i, n) {
  return mn(t) !== n && (n === K || !ac(e, i, t)) ? !1 : tp(e, t, i).matched;
}
function lO(t, e, i) {
  return e.length === 0 && !t.children[i];
}
var Wh = class {};
function cO(t, e, i, n, r, o, s = "emptyOnly") {
  return new Gh(t, e, i, n, r, s, o).recognize();
}
var dO = 31,
  Gh = class {
    constructor(e, i, n, r, o, s, a) {
      (this.injector = e),
        (this.configLoader = i),
        (this.rootComponentType = n),
        (this.config = r),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new zh(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(e) {
      return new E(4002, `'${e.segmentGroup}'`);
    }
    recognize() {
      let e = l_(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(e).pipe(
        $((i) => {
          let n = new ws(
              [],
              Object.freeze({}),
              Object.freeze(C({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              K,
              this.rootComponentType,
              null,
              {}
            ),
            r = new wt(n, i),
            o = new nc("", r),
            s = bR(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(o._root, null),
            { state: o, tree: s }
          );
        })
      );
    }
    match(e) {
      return this.processSegmentGroup(this.injector, this.config, e, K).pipe(
        $n((n) => {
          if (n instanceof rc)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof Cs ? this.noMatchError(n) : n;
        })
      );
    }
    inheritParamsAndData(e, i) {
      let n = e.value,
        r = Zh(n, i, this.paramsInheritanceStrategy);
      (n.params = Object.freeze(r.params)),
        (n.data = Object.freeze(r.data)),
        e.children.forEach((o) => this.inheritParamsAndData(o, n));
    }
    processSegmentGroup(e, i, n, r) {
      return n.segments.length === 0 && n.hasChildren()
        ? this.processChildren(e, i, n)
        : this.processSegment(e, i, n, n.segments, r, !0).pipe(
            $((o) => (o instanceof wt ? [o] : []))
          );
    }
    processChildren(e, i, n) {
      let r = [];
      for (let o of Object.keys(n.children))
        o === "primary" ? r.unshift(o) : r.push(o);
      return we(r).pipe(
        zn((o) => {
          let s = n.children[o],
            a = RR(i, o);
          return this.processSegmentGroup(e, a, s, o);
        }),
        au((o, s) => (o.push(...s), o)),
        qn(null),
        su(),
        Ee((o) => {
          if (o === null) return $r(n);
          let s = O_(o);
          return uO(s), N(s);
        })
      );
    }
    processSegment(e, i, n, r, o, s) {
      return we(i).pipe(
        zn((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? e,
            i,
            a,
            n,
            r,
            o,
            s
          ).pipe(
            $n((l) => {
              if (l instanceof Cs) return N(null);
              throw l;
            })
          )
        ),
        Xt((a) => !!a),
        $n((a) => {
          if (A_(a)) return lO(n, r, o) ? N(new Wh()) : $r(n);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(e, i, n, r, o, s, a) {
      return aO(n, r, o, s)
        ? n.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(e, r, n, o, s)
          : this.allowRedirects && a
          ? this.expandSegmentAgainstRouteUsingRedirect(e, r, i, n, o, s)
          : $r(r)
        : $r(r);
    }
    expandSegmentAgainstRouteUsingRedirect(e, i, n, r, o, s) {
      let {
        matched: a,
        consumedSegments: l,
        positionalParamSegments: c,
        remainingSegments: d,
      } = tp(i, r, o);
      if (!a) return $r(i);
      r.redirectTo.startsWith("/") &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > dO && (this.allowRedirects = !1));
      let u = this.applyRedirects.applyRedirectCommands(l, r.redirectTo, c);
      return this.applyRedirects
        .lineralizeSegments(r, u)
        .pipe(Ee((f) => this.processSegment(e, n, i, f.concat(d), s, !1)));
    }
    matchSegmentAgainstRoute(e, i, n, r, o) {
      let s = tO(i, n, r, e, this.urlSerializer);
      return (
        n.path === "**" && (i.children = {}),
        s.pipe(
          Je((a) =>
            a.matched
              ? ((e = n._injector ?? e),
                this.getChildConfig(e, n, r).pipe(
                  Je(({ routes: l }) => {
                    let c = n._loadedInjector ?? e,
                      {
                        consumedSegments: d,
                        remainingSegments: u,
                        parameters: f,
                      } = a,
                      h = new ws(
                        d,
                        f,
                        Object.freeze(C({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        hO(n),
                        mn(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        pO(n)
                      ),
                      { segmentGroup: p, slicedSegments: m } = l_(i, d, u, l);
                    if (m.length === 0 && p.hasChildren())
                      return this.processChildren(c, l, p).pipe(
                        $((b) => (b === null ? null : new wt(h, b)))
                      );
                    if (l.length === 0 && m.length === 0)
                      return N(new wt(h, []));
                    let g = mn(n) === o;
                    return this.processSegment(c, l, p, m, g ? K : o, !0).pipe(
                      $((b) => new wt(h, b instanceof wt ? [b] : []))
                    );
                  })
                ))
              : $r(i)
          )
        )
      );
    }
    getChildConfig(e, i, n) {
      return i.children
        ? N({ routes: i.children, injector: e })
        : i.loadChildren
        ? i._loadedRoutes !== void 0
          ? N({ routes: i._loadedRoutes, injector: i._loadedInjector })
          : KR(e, i, n, this.urlSerializer).pipe(
              Ee((r) =>
                r
                  ? this.configLoader.loadChildren(e, i).pipe(
                      Ne((o) => {
                        (i._loadedRoutes = o.routes),
                          (i._loadedInjector = o.injector);
                      })
                    )
                  : eO(i)
              )
            )
        : N({ routes: [], injector: e });
    }
  };
function uO(t) {
  t.sort((e, i) =>
    e.value.outlet === K
      ? -1
      : i.value.outlet === K
      ? 1
      : e.value.outlet.localeCompare(i.value.outlet)
  );
}
function fO(t) {
  let e = t.value.routeConfig;
  return e && e.path === "";
}
function O_(t) {
  let e = [],
    i = new Set();
  for (let n of t) {
    if (!fO(n)) {
      e.push(n);
      continue;
    }
    let r = e.find((o) => n.value.routeConfig === o.value.routeConfig);
    r !== void 0 ? (r.children.push(...n.children), i.add(r)) : e.push(n);
  }
  for (let n of i) {
    let r = O_(n.children);
    e.push(new wt(n.value, r));
  }
  return e.filter((n) => !i.has(n));
}
function hO(t) {
  return t.data || {};
}
function pO(t) {
  return t.resolve || {};
}
function mO(t, e, i, n, r, o) {
  return Ee((s) =>
    cO(t, e, i, n, s.extractedUrl, r, o).pipe(
      $(({ state: a, tree: l }) =>
        ae(C({}, s), { targetSnapshot: a, urlAfterRedirects: l })
      )
    )
  );
}
function gO(t, e) {
  return Ee((i) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: r },
    } = i;
    if (!r.length) return N(i);
    let o = new Set(r.map((l) => l.route)),
      s = new Set();
    for (let l of o) if (!s.has(l)) for (let c of k_(l)) s.add(c);
    let a = 0;
    return we(s).pipe(
      zn((l) =>
        o.has(l)
          ? bO(l, n, t, e)
          : ((l.data = Zh(l, l.parent, t).resolve), N(void 0))
      ),
      Ne(() => a++),
      _r(1),
      Ee((l) => (a === s.size ? N(i) : Ge))
    );
  });
}
function k_(t) {
  let e = t.children.map((i) => k_(i)).flat();
  return [t, ...e];
}
function bO(t, e, i, n) {
  let r = t.routeConfig,
    o = t._resolve;
  return (
    r?.title !== void 0 && !D_(r) && (o[Ds] = r.title),
    vO(o, t, e, n).pipe(
      $(
        (s) => (
          (t._resolvedData = s), (t.data = Zh(t, t.parent, i).resolve), null
        )
      )
    )
  );
}
function vO(t, e, i, n) {
  let r = Ch(t);
  if (r.length === 0) return N({});
  let o = {};
  return we(r).pipe(
    Ee((s) =>
      yO(t[s], e, i, n).pipe(
        Xt(),
        Ne((a) => {
          o[s] = a;
        })
      )
    ),
    _r(1),
    ou(o),
    $n((s) => (A_(s) ? Ge : Zt(s)))
  );
}
function yO(t, e, i, n) {
  let r = Is(e) ?? n,
    o = Zr(t, r),
    s = o.resolve ? o.resolve(e, i) : An(r, () => o(e, i));
  return ri(s);
}
function wh(t) {
  return Je((e) => {
    let i = t(e);
    return i ? we(i).pipe($(() => e)) : N(e);
  });
}
var N_ = (() => {
    let e = class e {
      buildTitle(n) {
        let r,
          o = n.root;
        for (; o !== void 0; )
          (r = this.getResolvedTitleForRoute(o) ?? r),
            (o = o.children.find((s) => s.outlet === K));
        return r;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Ds];
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => w(_O))(),
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  _O = (() => {
    let e = class e extends N_ {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let r = this.buildTitle(n);
        r !== void 0 && this.title.setTitle(r);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(vh));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  np = new S("", { providedIn: "root", factory: () => ({}) }),
  ip = new S("ROUTES"),
  xO = (() => {
    let e = class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = w(Jf));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return N(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let r = ri(n.loadComponent()).pipe(
            $(P_),
            Ne((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = s);
            }),
            Wn(() => {
              this.componentLoaders.delete(n);
            })
          ),
          o = new mr(r, () => new F()).pipe(pr());
        return this.componentLoaders.set(n, o), o;
      }
      loadChildren(n, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return N({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let s = wO(r, this.compiler, n, this.onLoadEndListener).pipe(
            Wn(() => {
              this.childrenLoaders.delete(r);
            })
          ),
          a = new mr(s, () => new F()).pipe(pr());
        return this.childrenLoaders.set(r, a), a;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function wO(t, e, i, n) {
  return ri(t.loadChildren()).pipe(
    $(P_),
    Ee((r) =>
      r instanceof Wo || Array.isArray(r) ? N(r) : we(e.compileModuleAsync(r))
    ),
    $((r) => {
      n && n(t);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(r)
          ? ((s = r), (a = !0))
          : ((o = r.create(i).injector),
            (s = o.get(ip, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(ep), injector: o }
      );
    })
  );
}
function EO(t) {
  return t && typeof t == "object" && "default" in t;
}
function P_(t) {
  return EO(t) ? t.default : t;
}
var rp = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => w(CO))(),
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  CO = (() => {
    let e = class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, r) {
        return n;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  DO = new S("");
var IO = (() => {
  let e = class e {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new F()),
        (this.transitionAbortSubject = new F()),
        (this.configLoader = w(xO)),
        (this.environmentInjector = w(ft)),
        (this.urlSerializer = w(Qh)),
        (this.rootContexts = w(sc)),
        (this.location = w($i)),
        (this.inputBindingEnabled = w(Jh, { optional: !0 }) !== null),
        (this.titleStrategy = w(N_)),
        (this.options = w(np, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || "emptyOnly"),
        (this.urlHandlingStrategy = w(rp)),
        (this.createViewTransition = w(DO, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => N(void 0)),
        (this.rootComponentType = null);
      let n = (o) => this.events.next(new Oh(o)),
        r = (o) => this.events.next(new kh(o));
      (this.configLoader.onLoadEndListener = r),
        (this.configLoader.onLoadStartListener = n);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(n) {
      let r = ++this.navigationId;
      this.transitions?.next(
        ae(C(C({}, this.transitions.value), n), { id: r })
      );
    }
    setupNavigations(n, r, o) {
      return (
        (this.transitions = new Me({
          id: 0,
          currentUrlTree: r,
          currentRawUrl: r,
          extractedUrl: this.urlHandlingStrategy.extract(r),
          urlAfterRedirects: this.urlHandlingStrategy.extract(r),
          rawUrl: r,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: ms,
          restoredState: null,
          currentSnapshot: o.snapshot,
          targetSnapshot: null,
          currentRouterState: o,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          De((s) => s.id !== 0),
          $((s) =>
            ae(C({}, s), {
              extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
            })
          ),
          Je((s) => {
            this.currentTransition = s;
            let a = !1,
              l = !1;
            return N(s).pipe(
              Ne((c) => {
                this.currentNavigation = {
                  id: c.id,
                  initialUrl: c.rawUrl,
                  extractedUrl: c.extractedUrl,
                  trigger: c.source,
                  extras: c.extras,
                  previousNavigation: this.lastSuccessfulNavigation
                    ? ae(C({}, this.lastSuccessfulNavigation), {
                        previousNavigation: null,
                      })
                    : null,
                };
              }),
              Je((c) => {
                let d =
                    !n.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  u = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                if (!d && u !== "reload") {
                  let f = "";
                  return (
                    this.events.next(
                      new Yi(c.id, this.urlSerializer.serialize(c.rawUrl), f, 0)
                    ),
                    c.resolve(null),
                    Ge
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                  return N(c).pipe(
                    Je((f) => {
                      let h = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new vs(
                            f.id,
                            this.urlSerializer.serialize(f.extractedUrl),
                            f.source,
                            f.restoredState
                          )
                        ),
                        h !== this.transitions?.getValue()
                          ? Ge
                          : Promise.resolve(f)
                      );
                    }),
                    mO(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      n.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    Ne((f) => {
                      (s.targetSnapshot = f.targetSnapshot),
                        (s.urlAfterRedirects = f.urlAfterRedirects),
                        (this.currentNavigation = ae(
                          C({}, this.currentNavigation),
                          { finalUrl: f.urlAfterRedirects }
                        ));
                      let h = new Jl(
                        f.id,
                        this.urlSerializer.serialize(f.extractedUrl),
                        this.urlSerializer.serialize(f.urlAfterRedirects),
                        f.targetSnapshot
                      );
                      this.events.next(h);
                    })
                  );
                if (
                  d &&
                  this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                ) {
                  let {
                      id: f,
                      extractedUrl: h,
                      source: p,
                      restoredState: m,
                      extras: g,
                    } = c,
                    b = new vs(f, this.urlSerializer.serialize(h), p, m);
                  this.events.next(b);
                  let x = E_(h, this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = s =
                      ae(C({}, c), {
                        targetSnapshot: x,
                        urlAfterRedirects: h,
                        extras: ae(C({}, g), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = h),
                    N(s)
                  );
                } else {
                  let f = "";
                  return (
                    this.events.next(
                      new Yi(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        f,
                        1
                      )
                    ),
                    c.resolve(null),
                    Ge
                  );
                }
              }),
              Ne((c) => {
                let d = new Th(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot
                );
                this.events.next(d);
              }),
              $(
                (c) => (
                  (this.currentTransition = s =
                    ae(C({}, c), {
                      guards: kR(
                        c.targetSnapshot,
                        c.currentSnapshot,
                        this.rootContexts
                      ),
                    })),
                  s
                )
              ),
              $R(this.environmentInjector, (c) => this.events.next(c)),
              Ne((c) => {
                if (((s.guardsResult = c.guardsResult), Yr(c.guardsResult)))
                  throw S_(this.urlSerializer, c.guardsResult);
                let d = new Mh(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot,
                  !!c.guardsResult
                );
                this.events.next(d);
              }),
              De((c) =>
                c.guardsResult
                  ? !0
                  : (this.cancelNavigationTransition(c, "", 3), !1)
              ),
              wh((c) => {
                if (c.guards.canActivateChecks.length)
                  return N(c).pipe(
                    Ne((d) => {
                      let u = new Ah(
                        d.id,
                        this.urlSerializer.serialize(d.extractedUrl),
                        this.urlSerializer.serialize(d.urlAfterRedirects),
                        d.targetSnapshot
                      );
                      this.events.next(u);
                    }),
                    Je((d) => {
                      let u = !1;
                      return N(d).pipe(
                        gO(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector
                        ),
                        Ne({
                          next: () => (u = !0),
                          complete: () => {
                            u || this.cancelNavigationTransition(d, "", 2);
                          },
                        })
                      );
                    }),
                    Ne((d) => {
                      let u = new Rh(
                        d.id,
                        this.urlSerializer.serialize(d.extractedUrl),
                        this.urlSerializer.serialize(d.urlAfterRedirects),
                        d.targetSnapshot
                      );
                      this.events.next(u);
                    })
                  );
              }),
              wh((c) => {
                let d = (u) => {
                  let f = [];
                  u.routeConfig?.loadComponent &&
                    !u.routeConfig._loadedComponent &&
                    f.push(
                      this.configLoader.loadComponent(u.routeConfig).pipe(
                        Ne((h) => {
                          u.component = h;
                        }),
                        $(() => {})
                      )
                    );
                  for (let h of u.children) f.push(...d(h));
                  return f;
                };
                return yr(d(c.targetSnapshot.root)).pipe(qn(null), Ae(1));
              }),
              wh(() => this.afterPreactivation()),
              Je(() => {
                let { currentSnapshot: c, targetSnapshot: d } = s,
                  u = this.createViewTransition?.(
                    this.environmentInjector,
                    c.root,
                    d.root
                  );
                return u ? we(u).pipe($(() => s)) : N(s);
              }),
              $((c) => {
                let d = DR(
                  n.routeReuseStrategy,
                  c.targetSnapshot,
                  c.currentRouterState
                );
                return (
                  (this.currentTransition = s =
                    ae(C({}, c), { targetRouterState: d })),
                  (this.currentNavigation.targetRouterState = d),
                  s
                );
              }),
              Ne(() => {
                this.events.next(new _s());
              }),
              OR(
                this.rootContexts,
                n.routeReuseStrategy,
                (c) => this.events.next(c),
                this.inputBindingEnabled
              ),
              Ae(1),
              Ne({
                next: (c) => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new kn(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects)
                      )
                    ),
                    this.titleStrategy?.updateTitle(
                      c.targetRouterState.snapshot
                    ),
                    c.resolve(!0);
                },
                complete: () => {
                  a = !0;
                },
              }),
              Se(
                this.transitionAbortSubject.pipe(
                  Ne((c) => {
                    throw c;
                  })
                )
              ),
              Wn(() => {
                if (!a && !l) {
                  let c = "";
                  this.cancelNavigationTransition(s, c, 1);
                }
                this.currentNavigation?.id === s.id &&
                  (this.currentNavigation = null);
              }),
              $n((c) => {
                if (((l = !0), M_(c)))
                  this.events.next(
                    new ii(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      c.message,
                      c.cancellationCode
                    )
                  ),
                    TR(c) ? this.events.next(new xs(c.url)) : s.resolve(!1);
                else {
                  this.events.next(
                    new ys(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      c,
                      s.targetSnapshot ?? void 0
                    )
                  );
                  try {
                    s.resolve(n.errorHandler(c));
                  } catch (d) {
                    s.reject(d);
                  }
                }
                return Ge;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(n, r, o) {
      let s = new ii(n.id, this.urlSerializer.serialize(n.extractedUrl), r, o);
      this.events.next(s), n.resolve(!1);
    }
    isUpdatingInternalState() {
      return (
        this.currentTransition?.extractedUrl.toString() !==
        this.currentTransition?.currentUrlTree.toString()
      );
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy
          .extract(this.urlSerializer.parse(this.location.path(!0)))
          .toString() !== this.currentTransition?.extractedUrl.toString() &&
        !this.currentTransition?.extras.skipLocationChange
      );
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function SO(t) {
  return t !== ms;
}
var TO = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => w(MO))(),
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  Yh = class {
    shouldDetach(e) {
      return !1;
    }
    store(e, i) {}
    shouldAttach(e) {
      return !1;
    }
    retrieve(e) {
      return null;
    }
    shouldReuseRoute(e, i) {
      return e.routeConfig === i.routeConfig;
    }
  },
  MO = (() => {
    let e = class e extends Yh {};
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = cn(e)))(o || e);
      };
    })()),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  F_ = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({
        token: e,
        factory: () => (() => w(AO))(),
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  AO = (() => {
    let e = class e extends F_ {
      constructor() {
        super(...arguments),
          (this.location = w($i)),
          (this.urlSerializer = w(Qh)),
          (this.options = w(np, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = w(rp)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new ni()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = E_(this.currentUrlTree, null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((r) => {
          r.type === "popstate" && n(r.url, r.state);
        });
      }
      handleRouterEvent(n, r) {
        if (n instanceof vs) this.stateMemento = this.createStateMemento();
        else if (n instanceof Yi) this.rawUrlTree = r.initialUrl;
        else if (n instanceof Jl) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !r.extras.skipLocationChange
          ) {
            let o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
            this.setBrowserUrl(o, r);
          }
        } else
          n instanceof _s
            ? ((this.currentUrlTree = r.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                r.finalUrl,
                r.initialUrl
              )),
              (this.routerState = r.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                (r.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, r)))
            : n instanceof ii && (n.code === 3 || n.code === 2)
            ? this.restoreHistory(r)
            : n instanceof ys
            ? this.restoreHistory(r, !0)
            : n instanceof kn &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, r) {
        let o = this.urlSerializer.serialize(n);
        if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
          let s = this.browserPageId,
            a = C(C({}, r.extras.state), this.generateNgRouterState(r.id, s));
          this.location.replaceState(o, "", a);
        } else {
          let s = C(
            C({}, r.extras.state),
            this.generateNgRouterState(r.id, this.browserPageId + 1)
          );
          this.location.go(o, "", s);
        }
      }
      restoreHistory(n, r = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let o = this.browserPageId,
            s = this.currentPageId - o;
          s !== 0
            ? this.location.historyGo(s)
            : this.currentUrlTree === n.finalUrl &&
              s === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (r && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, r) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: r }
          : { navigationId: n };
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = cn(e)))(o || e);
      };
    })()),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  hs = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = "COMPLETE"),
      (t[(t.FAILED = 1)] = "FAILED"),
      (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
      t
    );
  })(hs || {});
function RO(t, e) {
  t.events
    .pipe(
      De(
        (i) =>
          i instanceof kn ||
          i instanceof ii ||
          i instanceof ys ||
          i instanceof Yi
      ),
      $((i) =>
        i instanceof kn || i instanceof Yi
          ? hs.COMPLETE
          : (i instanceof ii ? i.code === 0 || i.code === 1 : !1)
          ? hs.REDIRECTING
          : hs.FAILED
      ),
      De((i) => i !== hs.REDIRECTING),
      Ae(1)
    )
    .subscribe(() => {
      e();
    });
}
function OO(t) {
  throw t;
}
var kO = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  NO = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  Ot = (() => {
    let e = class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = w(Ml)),
          (this.stateManager = w(F_)),
          (this.options = w(np, { optional: !0 }) || {}),
          (this.pendingTasks = w(Ui)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = w(IO)),
          (this.urlSerializer = w(Qh)),
          (this.location = w($i)),
          (this.urlHandlingStrategy = w(rp)),
          (this._events = new F()),
          (this.errorHandler = this.options.errorHandler || OO),
          (this.navigated = !1),
          (this.routeReuseStrategy = w(TO)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = w(ip, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!w(Jh, { optional: !0 })),
          (this.eventsSubscription = new ce()),
          (this.isNgZoneEnabled = w(R) instanceof R && R.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((r) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (o !== null && s !== null) {
              if (
                (this.stateManager.handleRouterEvent(r, s),
                r instanceof ii && r.code !== 0 && r.code !== 1)
              )
                this.navigated = !0;
              else if (r instanceof kn) this.navigated = !0;
              else if (r instanceof xs) {
                let a = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                  l = {
                    skipLocationChange: o.extras.skipLocationChange,
                    replaceUrl:
                      this.urlUpdateStrategy === "eager" || SO(o.source),
                  };
                this.scheduleNavigation(a, ms, null, l, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            FO(r) && this._events.next(r);
          } catch (o) {
            this.navigationTransitions.transitionAbortSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              ms,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ||
          (this.nonRouterCurrentEntryChangeSubscription =
            this.stateManager.registerNonRouterCurrentEntryChangeListener(
              (n, r) => {
                setTimeout(() => {
                  this.navigateToSyncWithBrowser(n, "popstate", r);
                }, 0);
              }
            ));
      }
      navigateToSyncWithBrowser(n, r, o) {
        let s = { replaceUrl: !0 },
          a = o?.navigationId ? o : null;
        if (o) {
          let c = C({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (s.state = c);
        }
        let l = this.parseUrl(n);
        this.scheduleNavigation(l, r, a, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(ep)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, r = {}) {
        let {
            relativeTo: o,
            queryParams: s,
            fragment: a,
            queryParamsHandling: l,
            preserveFragment: c,
          } = r,
          d = c ? this.currentUrlTree.fragment : a,
          u = null;
        switch (l) {
          case "merge":
            u = C(C({}, this.currentUrlTree.queryParams), s);
            break;
          case "preserve":
            u = this.currentUrlTree.queryParams;
            break;
          default:
            u = s || null;
        }
        u !== null && (u = this.removeEmptyProps(u));
        let f;
        try {
          let h = o ? o.snapshot : this.routerState.snapshot.root;
          f = y_(h);
        } catch {
          (typeof n[0] != "string" || !n[0].startsWith("/")) && (n = []),
            (f = this.currentUrlTree.root);
        }
        return __(f, n, u, d ?? null);
      }
      navigateByUrl(n, r = { skipLocationChange: !1 }) {
        let o = Yr(n) ? n : this.parseUrl(n),
          s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(s, ms, null, r);
      }
      navigate(n, r = { skipLocationChange: !1 }) {
        return PO(n), this.navigateByUrl(this.createUrlTree(n, r), r);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, r) {
        let o;
        if (
          (r === !0 ? (o = C({}, kO)) : r === !1 ? (o = C({}, NO)) : (o = r),
          Yr(n))
        )
          return r_(this.currentUrlTree, n, o);
        let s = this.parseUrl(n);
        return r_(this.currentUrlTree, s, o);
      }
      removeEmptyProps(n) {
        return Object.keys(n).reduce((r, o) => {
          let s = n[o];
          return s != null && (r[o] = s), r;
        }, {});
      }
      scheduleNavigation(n, r, o, s, a) {
        if (this.disposed) return Promise.resolve(!1);
        let l, c, d;
        a
          ? ((l = a.resolve), (c = a.reject), (d = a.promise))
          : (d = new Promise((f, h) => {
              (l = f), (c = h);
            }));
        let u = this.pendingTasks.add();
        return (
          RO(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(u));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: r,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: s,
            resolve: l,
            reject: c,
            promise: d,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          d.catch((f) => Promise.reject(f))
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function PO(t) {
  for (let e = 0; e < t.length; e++) if (t[e] == null) throw new E(4008, !1);
}
function FO(t) {
  return !(t instanceof _s) && !(t instanceof xs);
}
var oc = (() => {
    let e = class e {
      constructor(n, r, o, s, a, l) {
        (this.router = n),
          (this.route = r),
          (this.tabIndexAttribute = o),
          (this.renderer = s),
          (this.el = a),
          (this.locationStrategy = l),
          (this.href = null),
          (this.commands = null),
          (this.onChanges = new F()),
          (this.preserveFragment = !1),
          (this.skipLocationChange = !1),
          (this.replaceUrl = !1);
        let c = a.nativeElement.tagName?.toLowerCase();
        (this.isAnchorElement = c === "a" || c === "area"),
          this.isAnchorElement
            ? (this.subscription = n.events.subscribe((d) => {
                d instanceof kn && this.updateHref();
              }))
            : this.setTabIndexIfNotOnNativeEl("0");
      }
      setTabIndexIfNotOnNativeEl(n) {
        this.tabIndexAttribute != null ||
          this.isAnchorElement ||
          this.applyAttributeValue("tabindex", n);
      }
      ngOnChanges(n) {
        this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
      }
      set routerLink(n) {
        n != null
          ? ((this.commands = Array.isArray(n) ? n : [n]),
            this.setTabIndexIfNotOnNativeEl("0"))
          : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
      }
      onClick(n, r, o, s, a) {
        if (
          this.urlTree === null ||
          (this.isAnchorElement &&
            (n !== 0 ||
              r ||
              o ||
              s ||
              a ||
              (typeof this.target == "string" && this.target != "_self")))
        )
          return !0;
        let l = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
        };
        return (
          this.router.navigateByUrl(this.urlTree, l), !this.isAnchorElement
        );
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      updateHref() {
        this.href =
          this.urlTree !== null && this.locationStrategy
            ? this.locationStrategy?.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              )
            : null;
        let n =
          this.href === null
            ? null
            : Vv(
                this.href,
                this.el.nativeElement.tagName.toLowerCase(),
                "href"
              );
        this.applyAttributeValue("href", n);
      }
      applyAttributeValue(n, r) {
        let o = this.renderer,
          s = this.el.nativeElement;
        r !== null ? o.setAttribute(s, n, r) : o.removeAttribute(s, n);
      }
      get urlTree() {
        return this.commands === null
          ? null
          : this.router.createUrlTree(this.commands, {
              relativeTo:
                this.relativeTo !== void 0 ? this.relativeTo : this.route,
              queryParams: this.queryParams,
              fragment: this.fragment,
              queryParamsHandling: this.queryParamsHandling,
              preserveFragment: this.preserveFragment,
            });
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Ot), y(Qi), Fi("tabindex"), y(un), y(Z), y(Ur));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["", "routerLink", ""]],
        hostVars: 1,
        hostBindings: function (r, o) {
          r & 1 &&
            ue("click", function (a) {
              return o.onClick(
                a.button,
                a.ctrlKey,
                a.shiftKey,
                a.altKey,
                a.metaKey
              );
            }),
            r & 2 && je("target", o.target);
        },
        inputs: {
          target: "target",
          queryParams: "queryParams",
          fragment: "fragment",
          queryParamsHandling: "queryParamsHandling",
          state: "state",
          relativeTo: "relativeTo",
          preserveFragment: ["preserveFragment", "preserveFragment", xt],
          skipLocationChange: ["skipLocationChange", "skipLocationChange", xt],
          replaceUrl: ["replaceUrl", "replaceUrl", xt],
          routerLink: "routerLink",
        },
        standalone: !0,
        features: [Ht, Ye],
      }));
    let t = e;
    return t;
  })(),
  L_ = (() => {
    let e = class e {
      get isActive() {
        return this._isActive;
      }
      constructor(n, r, o, s, a) {
        (this.router = n),
          (this.element = r),
          (this.renderer = o),
          (this.cdr = s),
          (this.link = a),
          (this.classes = []),
          (this._isActive = !1),
          (this.routerLinkActiveOptions = { exact: !1 }),
          (this.isActiveChange = new le()),
          (this.routerEventsSubscription = n.events.subscribe((l) => {
            l instanceof kn && this.update();
          }));
      }
      ngAfterContentInit() {
        N(this.links.changes, N(null))
          .pipe(Bn())
          .subscribe((n) => {
            this.update(), this.subscribeToEachLinkOnChanges();
          });
      }
      subscribeToEachLinkOnChanges() {
        this.linkInputChangesSubscription?.unsubscribe();
        let n = [...this.links.toArray(), this.link]
          .filter((r) => !!r)
          .map((r) => r.onChanges);
        this.linkInputChangesSubscription = we(n)
          .pipe(Bn())
          .subscribe((r) => {
            this._isActive !== this.isLinkActive(this.router)(r) &&
              this.update();
          });
      }
      set routerLinkActive(n) {
        let r = Array.isArray(n) ? n : n.split(" ");
        this.classes = r.filter((o) => !!o);
      }
      ngOnChanges(n) {
        this.update();
      }
      ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe(),
          this.linkInputChangesSubscription?.unsubscribe();
      }
      update() {
        !this.links ||
          !this.router.navigated ||
          queueMicrotask(() => {
            let n = this.hasActiveLinks();
            this._isActive !== n &&
              ((this._isActive = n),
              this.cdr.markForCheck(),
              this.classes.forEach((r) => {
                n
                  ? this.renderer.addClass(this.element.nativeElement, r)
                  : this.renderer.removeClass(this.element.nativeElement, r);
              }),
              n && this.ariaCurrentWhenActive !== void 0
                ? this.renderer.setAttribute(
                    this.element.nativeElement,
                    "aria-current",
                    this.ariaCurrentWhenActive.toString()
                  )
                : this.renderer.removeAttribute(
                    this.element.nativeElement,
                    "aria-current"
                  ),
              this.isActiveChange.emit(n));
          });
      }
      isLinkActive(n) {
        let r = LO(this.routerLinkActiveOptions)
          ? this.routerLinkActiveOptions
          : this.routerLinkActiveOptions.exact || !1;
        return (o) => (o.urlTree ? n.isActive(o.urlTree, r) : !1);
      }
      hasActiveLinks() {
        let n = this.isLinkActive(this.router);
        return (this.link && n(this.link)) || this.links.some(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Ot), y(Z), y(un), y(lt), y(oc, 8));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["", "routerLinkActive", ""]],
        contentQueries: function (r, o, s) {
          if ((r & 1 && _t(s, oc, 5), r & 2)) {
            let a;
            _e((a = xe())) && (o.links = a);
          }
        },
        inputs: {
          routerLinkActiveOptions: "routerLinkActiveOptions",
          ariaCurrentWhenActive: "ariaCurrentWhenActive",
          routerLinkActive: "routerLinkActive",
        },
        outputs: { isActiveChange: "isActiveChange" },
        exportAs: ["routerLinkActive"],
        standalone: !0,
        features: [Ye],
      }));
    let t = e;
    return t;
  })();
function LO(t) {
  return !!t.paths;
}
var jO = new S("");
function j_(t, ...e) {
  return Pr([
    { provide: ip, multi: !0, useValue: t },
    [],
    { provide: Qi, useFactory: VO, deps: [Ot] },
    { provide: Al, multi: !0, useFactory: BO },
    e.map((i) => i.ɵproviders),
  ]);
}
function VO(t) {
  return t.routerState.root;
}
function BO() {
  let t = w(Bt);
  return (e) => {
    let i = t.get(fn);
    if (e !== i.components[0]) return;
    let n = t.get(Ot),
      r = t.get(UO);
    t.get(HO) === 1 && n.initialNavigation(),
      t.get($O, null, te.Optional)?.setUpPreloading(),
      t.get(jO, null, te.Optional)?.init(),
      n.resetRootComponentType(i.componentTypes[0]),
      r.closed || (r.next(), r.complete(), r.unsubscribe());
  };
}
var UO = new S("", { factory: () => new F() }),
  HO = new S("", { providedIn: "root", factory: () => 1 });
var $O = new S("");
var Y_ = (() => {
    let e = class e {
      constructor(n, r) {
        (this._renderer = n),
          (this._elementRef = r),
          (this.onChange = (o) => {}),
          (this.onTouched = () => {});
      }
      setProperty(n, r) {
        this._renderer.setProperty(this._elementRef.nativeElement, n, r);
      }
      registerOnTouched(n) {
        this.onTouched = n;
      }
      registerOnChange(n) {
        this.onChange = n;
      }
      setDisabledState(n) {
        this.setProperty("disabled", n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(un), y(Z));
    }),
      (e.ɵdir = W({ type: e }));
    let t = e;
    return t;
  })(),
  yc = (() => {
    let e = class e extends Y_ {};
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = cn(e)))(o || e);
      };
    })()),
      (e.ɵdir = W({ type: e, features: [Oe] }));
    let t = e;
    return t;
  })(),
  Rs = new S("NgValueAccessor"),
  zO = { provide: Rs, useExisting: Mt(() => sp), multi: !0 },
  sp = (() => {
    let e = class e extends yc {
      writeValue(n) {
        this.setProperty("checked", n);
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = cn(e)))(o || e);
      };
    })()),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["input", "type", "checkbox", "formControlName", ""],
          ["input", "type", "checkbox", "formControl", ""],
          ["input", "type", "checkbox", "ngModel", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ue("change", function (a) {
              return o.onChange(a.target.checked);
            })("blur", function () {
              return o.onTouched();
            });
        },
        features: [$e([zO]), Oe],
      }));
    let t = e;
    return t;
  })(),
  qO = { provide: Rs, useExisting: Mt(() => Q_), multi: !0 };
function WO() {
  let t = On() ? On().getUserAgent() : "";
  return /android (\d+)/.test(t.toLowerCase());
}
var GO = new S("CompositionEventMode"),
  Q_ = (() => {
    let e = class e extends Y_ {
      constructor(n, r, o) {
        super(n, r),
          (this._compositionMode = o),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !WO());
      }
      writeValue(n) {
        let r = n ?? "";
        this.setProperty("value", r);
      }
      _handleInput(n) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(n);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(n) {
        (this._composing = !1), this._compositionMode && this.onChange(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(un), y(Z), y(GO, 8));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["input", "formControlName", "", 3, "type", "checkbox"],
          ["textarea", "formControlName", ""],
          ["input", "formControl", "", 3, "type", "checkbox"],
          ["textarea", "formControl", ""],
          ["input", "ngModel", "", 3, "type", "checkbox"],
          ["textarea", "ngModel", ""],
          ["", "ngDefaultControl", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ue("input", function (a) {
              return o._handleInput(a.target.value);
            })("blur", function () {
              return o.onTouched();
            })("compositionstart", function () {
              return o._compositionStart();
            })("compositionend", function (a) {
              return o._compositionEnd(a.target.value);
            });
        },
        features: [$e([qO]), Oe],
      }));
    let t = e;
    return t;
  })();
function oi(t) {
  return (
    t == null || ((typeof t == "string" || Array.isArray(t)) && t.length === 0)
  );
}
function Z_(t) {
  return t != null && typeof t.length == "number";
}
var _c = new S("NgValidators"),
  ap = new S("NgAsyncValidators"),
  YO =
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  cc = class {
    static min(e) {
      return QO(e);
    }
    static max(e) {
      return ZO(e);
    }
    static required(e) {
      return K_(e);
    }
    static requiredTrue(e) {
      return KO(e);
    }
    static email(e) {
      return XO(e);
    }
    static minLength(e) {
      return JO(e);
    }
    static maxLength(e) {
      return ek(e);
    }
    static pattern(e) {
      return tk(e);
    }
    static nullValidator(e) {
      return dc(e);
    }
    static compose(e) {
      return i0(e);
    }
    static composeAsync(e) {
      return r0(e);
    }
  };
function QO(t) {
  return (e) => {
    if (oi(e.value) || oi(t)) return null;
    let i = parseFloat(e.value);
    return !isNaN(i) && i < t ? { min: { min: t, actual: e.value } } : null;
  };
}
function ZO(t) {
  return (e) => {
    if (oi(e.value) || oi(t)) return null;
    let i = parseFloat(e.value);
    return !isNaN(i) && i > t ? { max: { max: t, actual: e.value } } : null;
  };
}
function K_(t) {
  return oi(t.value) ? { required: !0 } : null;
}
function KO(t) {
  return t.value === !0 ? null : { required: !0 };
}
function XO(t) {
  return oi(t.value) || YO.test(t.value) ? null : { email: !0 };
}
function JO(t) {
  return (e) =>
    oi(e.value) || !Z_(e.value)
      ? null
      : e.value.length < t
      ? { minlength: { requiredLength: t, actualLength: e.value.length } }
      : null;
}
function ek(t) {
  return (e) =>
    Z_(e.value) && e.value.length > t
      ? { maxlength: { requiredLength: t, actualLength: e.value.length } }
      : null;
}
function tk(t) {
  if (!t) return dc;
  let e, i;
  return (
    typeof t == "string"
      ? ((i = ""),
        t.charAt(0) !== "^" && (i += "^"),
        (i += t),
        t.charAt(t.length - 1) !== "$" && (i += "$"),
        (e = new RegExp(i)))
      : ((i = t.toString()), (e = t)),
    (n) => {
      if (oi(n.value)) return null;
      let r = n.value;
      return e.test(r)
        ? null
        : { pattern: { requiredPattern: i, actualValue: r } };
    }
  );
}
function dc(t) {
  return null;
}
function X_(t) {
  return t != null;
}
function J_(t) {
  return Vi(t) ? we(t) : t;
}
function e0(t) {
  let e = {};
  return (
    t.forEach((i) => {
      e = i != null ? C(C({}, e), i) : e;
    }),
    Object.keys(e).length === 0 ? null : e
  );
}
function t0(t, e) {
  return e.map((i) => i(t));
}
function nk(t) {
  return !t.validate;
}
function n0(t) {
  return t.map((e) => (nk(e) ? e : (i) => e.validate(i)));
}
function i0(t) {
  if (!t) return null;
  let e = t.filter(X_);
  return e.length == 0
    ? null
    : function (i) {
        return e0(t0(i, e));
      };
}
function lp(t) {
  return t != null ? i0(n0(t)) : null;
}
function r0(t) {
  if (!t) return null;
  let e = t.filter(X_);
  return e.length == 0
    ? null
    : function (i) {
        let n = t0(i, e).map(J_);
        return yi(n).pipe($(e0));
      };
}
function cp(t) {
  return t != null ? r0(n0(t)) : null;
}
function B_(t, e) {
  return t === null ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
}
function o0(t) {
  return t._rawValidators;
}
function s0(t) {
  return t._rawAsyncValidators;
}
function op(t) {
  return t ? (Array.isArray(t) ? t : [t]) : [];
}
function uc(t, e) {
  return Array.isArray(t) ? t.includes(e) : t === e;
}
function U_(t, e) {
  let i = op(e);
  return (
    op(t).forEach((r) => {
      uc(i, r) || i.push(r);
    }),
    i
  );
}
function H_(t, e) {
  return op(e).filter((i) => !uc(t, i));
}
var fc = class {
    constructor() {
      (this._rawValidators = []),
        (this._rawAsyncValidators = []),
        (this._onDestroyCallbacks = []);
    }
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _setValidators(e) {
      (this._rawValidators = e || []),
        (this._composedValidatorFn = lp(this._rawValidators));
    }
    _setAsyncValidators(e) {
      (this._rawAsyncValidators = e || []),
        (this._composedAsyncValidatorFn = cp(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _registerOnDestroy(e) {
      this._onDestroyCallbacks.push(e);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((e) => e()),
        (this._onDestroyCallbacks = []);
    }
    reset(e = void 0) {
      this.control && this.control.reset(e);
    }
    hasError(e, i) {
      return this.control ? this.control.hasError(e, i) : !1;
    }
    getError(e, i) {
      return this.control ? this.control.getError(e, i) : null;
    }
  },
  si = class extends fc {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  Zi = class extends fc {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  hc = class {
    constructor(e) {
      this._cd = e;
    }
    get isTouched() {
      return !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return !!this._cd?.submitted;
    }
  },
  ik = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  G4 = ae(C({}, ik), { "[class.ng-submitted]": "isSubmitted" }),
  xc = (() => {
    let e = class e extends hc {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Zi, 2));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["", "formControlName", ""],
          ["", "ngModel", ""],
          ["", "formControl", ""],
        ],
        hostVars: 14,
        hostBindings: function (r, o) {
          r & 2 &&
            Ie("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
              "ng-pristine",
              o.isPristine
            )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
              "ng-invalid",
              o.isInvalid
            )("ng-pending", o.isPending);
        },
        features: [Oe],
      }));
    let t = e;
    return t;
  })(),
  wc = (() => {
    let e = class e extends hc {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(si, 10));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["", "formGroupName", ""],
          ["", "formArrayName", ""],
          ["", "ngModelGroup", ""],
          ["", "formGroup", ""],
          ["form", 3, "ngNoForm", ""],
          ["", "ngForm", ""],
        ],
        hostVars: 16,
        hostBindings: function (r, o) {
          r & 2 &&
            Ie("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
              "ng-pristine",
              o.isPristine
            )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
              "ng-invalid",
              o.isInvalid
            )("ng-pending", o.isPending)("ng-submitted", o.isSubmitted);
        },
        features: [Oe],
      }));
    let t = e;
    return t;
  })();
var Ts = "VALID",
  lc = "INVALID",
  Kr = "PENDING",
  Ms = "DISABLED";
function a0(t) {
  return (Ec(t) ? t.validators : t) || null;
}
function rk(t) {
  return Array.isArray(t) ? lp(t) : t || null;
}
function l0(t, e) {
  return (Ec(e) ? e.asyncValidators : t) || null;
}
function ok(t) {
  return Array.isArray(t) ? cp(t) : t || null;
}
function Ec(t) {
  return t != null && !Array.isArray(t) && typeof t == "object";
}
function sk(t, e, i) {
  let n = t.controls;
  if (!(e ? Object.keys(n) : n).length) throw new E(1e3, "");
  if (!n[i]) throw new E(1001, "");
}
function ak(t, e, i) {
  t._forEachChild((n, r) => {
    if (i[r] === void 0) throw new E(1002, "");
  });
}
var pc = class {
    constructor(e, i) {
      (this._pendingDirty = !1),
        (this._hasOwnPendingAsyncValidator = !1),
        (this._pendingTouched = !1),
        (this._onCollectionChange = () => {}),
        (this._parent = null),
        (this.pristine = !0),
        (this.touched = !1),
        (this._onDisabledChange = []),
        this._assignValidators(e),
        this._assignAsyncValidators(i);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(e) {
      this._rawValidators = this._composedValidatorFn = e;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(e) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
    }
    get parent() {
      return this._parent;
    }
    get valid() {
      return this.status === Ts;
    }
    get invalid() {
      return this.status === lc;
    }
    get pending() {
      return this.status == Kr;
    }
    get disabled() {
      return this.status === Ms;
    }
    get enabled() {
      return this.status !== Ms;
    }
    get dirty() {
      return !this.pristine;
    }
    get untouched() {
      return !this.touched;
    }
    get updateOn() {
      return this._updateOn
        ? this._updateOn
        : this.parent
        ? this.parent.updateOn
        : "change";
    }
    setValidators(e) {
      this._assignValidators(e);
    }
    setAsyncValidators(e) {
      this._assignAsyncValidators(e);
    }
    addValidators(e) {
      this.setValidators(U_(e, this._rawValidators));
    }
    addAsyncValidators(e) {
      this.setAsyncValidators(U_(e, this._rawAsyncValidators));
    }
    removeValidators(e) {
      this.setValidators(H_(e, this._rawValidators));
    }
    removeAsyncValidators(e) {
      this.setAsyncValidators(H_(e, this._rawAsyncValidators));
    }
    hasValidator(e) {
      return uc(this._rawValidators, e);
    }
    hasAsyncValidator(e) {
      return uc(this._rawAsyncValidators, e);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(e = {}) {
      (this.touched = !0),
        this._parent && !e.onlySelf && this._parent.markAsTouched(e);
    }
    markAllAsTouched() {
      this.markAsTouched({ onlySelf: !0 }),
        this._forEachChild((e) => e.markAllAsTouched());
    }
    markAsUntouched(e = {}) {
      (this.touched = !1),
        (this._pendingTouched = !1),
        this._forEachChild((i) => {
          i.markAsUntouched({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    markAsDirty(e = {}) {
      (this.pristine = !1),
        this._parent && !e.onlySelf && this._parent.markAsDirty(e);
    }
    markAsPristine(e = {}) {
      (this.pristine = !0),
        (this._pendingDirty = !1),
        this._forEachChild((i) => {
          i.markAsPristine({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    markAsPending(e = {}) {
      (this.status = Kr),
        e.emitEvent !== !1 && this.statusChanges.emit(this.status),
        this._parent && !e.onlySelf && this._parent.markAsPending(e);
    }
    disable(e = {}) {
      let i = this._parentMarkedDirty(e.onlySelf);
      (this.status = Ms),
        (this.errors = null),
        this._forEachChild((n) => {
          n.disable(ae(C({}, e), { onlySelf: !0 }));
        }),
        this._updateValue(),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._updateAncestors(ae(C({}, e), { skipPristineCheck: i })),
        this._onDisabledChange.forEach((n) => n(!0));
    }
    enable(e = {}) {
      let i = this._parentMarkedDirty(e.onlySelf);
      (this.status = Ts),
        this._forEachChild((n) => {
          n.enable(ae(C({}, e), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent }),
        this._updateAncestors(ae(C({}, e), { skipPristineCheck: i })),
        this._onDisabledChange.forEach((n) => n(!1));
    }
    _updateAncestors(e) {
      this._parent &&
        !e.onlySelf &&
        (this._parent.updateValueAndValidity(e),
        e.skipPristineCheck || this._parent._updatePristine(),
        this._parent._updateTouched());
    }
    setParent(e) {
      this._parent = e;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(e = {}) {
      this._setInitialStatus(),
        this._updateValue(),
        this.enabled &&
          (this._cancelExistingSubscription(),
          (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Ts || this.status === Kr) &&
            this._runAsyncValidator(e.emitEvent)),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
    }
    _updateTreeValidity(e = { emitEvent: !0 }) {
      this._forEachChild((i) => i._updateTreeValidity(e)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? Ms : Ts;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(e) {
      if (this.asyncValidator) {
        (this.status = Kr), (this._hasOwnPendingAsyncValidator = !0);
        let i = J_(this.asyncValidator(this));
        this._asyncValidationSubscription = i.subscribe((n) => {
          (this._hasOwnPendingAsyncValidator = !1),
            this.setErrors(n, { emitEvent: e });
        });
      }
    }
    _cancelExistingSubscription() {
      this._asyncValidationSubscription &&
        (this._asyncValidationSubscription.unsubscribe(),
        (this._hasOwnPendingAsyncValidator = !1));
    }
    setErrors(e, i = {}) {
      (this.errors = e), this._updateControlsErrors(i.emitEvent !== !1);
    }
    get(e) {
      let i = e;
      return i == null ||
        (Array.isArray(i) || (i = i.split(".")), i.length === 0)
        ? null
        : i.reduce((n, r) => n && n._find(r), this);
    }
    getError(e, i) {
      let n = i ? this.get(i) : this;
      return n && n.errors ? n.errors[e] : null;
    }
    hasError(e, i) {
      return !!this.getError(e, i);
    }
    get root() {
      let e = this;
      for (; e._parent; ) e = e._parent;
      return e;
    }
    _updateControlsErrors(e) {
      (this.status = this._calculateStatus()),
        e && this.statusChanges.emit(this.status),
        this._parent && this._parent._updateControlsErrors(e);
    }
    _initObservables() {
      (this.valueChanges = new le()), (this.statusChanges = new le());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? Ms
        : this.errors
        ? lc
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(Kr)
        ? Kr
        : this._anyControlsHaveStatus(lc)
        ? lc
        : Ts;
    }
    _anyControlsHaveStatus(e) {
      return this._anyControls((i) => i.status === e);
    }
    _anyControlsDirty() {
      return this._anyControls((e) => e.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((e) => e.touched);
    }
    _updatePristine(e = {}) {
      (this.pristine = !this._anyControlsDirty()),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    _updateTouched(e = {}) {
      (this.touched = this._anyControlsTouched()),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    _registerOnCollectionChange(e) {
      this._onCollectionChange = e;
    }
    _setUpdateStrategy(e) {
      Ec(e) && e.updateOn != null && (this._updateOn = e.updateOn);
    }
    _parentMarkedDirty(e) {
      let i = this._parent && this._parent.dirty;
      return !e && !!i && !this._parent._anyControlsDirty();
    }
    _find(e) {
      return null;
    }
    _assignValidators(e) {
      (this._rawValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedValidatorFn = rk(this._rawValidators));
    }
    _assignAsyncValidators(e) {
      (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedAsyncValidatorFn = ok(this._rawAsyncValidators));
    }
  },
  mc = class extends pc {
    constructor(e, i, n) {
      super(a0(i), l0(n, i)),
        (this.controls = e),
        this._initObservables(),
        this._setUpdateStrategy(i),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    registerControl(e, i) {
      return this.controls[e]
        ? this.controls[e]
        : ((this.controls[e] = i),
          i.setParent(this),
          i._registerOnCollectionChange(this._onCollectionChange),
          i);
    }
    addControl(e, i, n = {}) {
      this.registerControl(e, i),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(e, i = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        this.updateValueAndValidity({ emitEvent: i.emitEvent }),
        this._onCollectionChange();
    }
    setControl(e, i, n = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        i && this.registerControl(e, i),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    contains(e) {
      return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
    }
    setValue(e, i = {}) {
      ak(this, !0, e),
        Object.keys(e).forEach((n) => {
          sk(this, !0, n),
            this.controls[n].setValue(e[n], {
              onlySelf: !0,
              emitEvent: i.emitEvent,
            });
        }),
        this.updateValueAndValidity(i);
    }
    patchValue(e, i = {}) {
      e != null &&
        (Object.keys(e).forEach((n) => {
          let r = this.controls[n];
          r && r.patchValue(e[n], { onlySelf: !0, emitEvent: i.emitEvent });
        }),
        this.updateValueAndValidity(i));
    }
    reset(e = {}, i = {}) {
      this._forEachChild((n, r) => {
        n.reset(e ? e[r] : null, { onlySelf: !0, emitEvent: i.emitEvent });
      }),
        this._updatePristine(i),
        this._updateTouched(i),
        this.updateValueAndValidity(i);
    }
    getRawValue() {
      return this._reduceChildren(
        {},
        (e, i, n) => ((e[n] = i.getRawValue()), e)
      );
    }
    _syncPendingControls() {
      let e = this._reduceChildren(!1, (i, n) =>
        n._syncPendingControls() ? !0 : i
      );
      return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
    }
    _forEachChild(e) {
      Object.keys(this.controls).forEach((i) => {
        let n = this.controls[i];
        n && e(n, i);
      });
    }
    _setUpControls() {
      this._forEachChild((e) => {
        e.setParent(this),
          e._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(e) {
      for (let [i, n] of Object.entries(this.controls))
        if (this.contains(i) && e(n)) return !0;
      return !1;
    }
    _reduceValue() {
      let e = {};
      return this._reduceChildren(
        e,
        (i, n, r) => ((n.enabled || this.disabled) && (i[r] = n.value), i)
      );
    }
    _reduceChildren(e, i) {
      let n = e;
      return (
        this._forEachChild((r, o) => {
          n = i(n, r, o);
        }),
        n
      );
    }
    _allControlsDisabled() {
      for (let e of Object.keys(this.controls))
        if (this.controls[e].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(e) {
      return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
    }
  };
var Cc = new S("CallSetDisabledState", {
    providedIn: "root",
    factory: () => dp,
  }),
  dp = "always";
function lk(t, e) {
  return [...e.path, t];
}
function gc(t, e, i = dp) {
  up(t, e),
    e.valueAccessor.writeValue(t.value),
    (t.disabled || i === "always") &&
      e.valueAccessor.setDisabledState?.(t.disabled),
    dk(t, e),
    fk(t, e),
    uk(t, e),
    ck(t, e);
}
function $_(t, e, i = !0) {
  let n = () => {};
  e.valueAccessor &&
    (e.valueAccessor.registerOnChange(n), e.valueAccessor.registerOnTouched(n)),
    vc(t, e),
    t &&
      (e._invokeOnDestroyCallbacks(), t._registerOnCollectionChange(() => {}));
}
function bc(t, e) {
  t.forEach((i) => {
    i.registerOnValidatorChange && i.registerOnValidatorChange(e);
  });
}
function ck(t, e) {
  if (e.valueAccessor.setDisabledState) {
    let i = (n) => {
      e.valueAccessor.setDisabledState(n);
    };
    t.registerOnDisabledChange(i),
      e._registerOnDestroy(() => {
        t._unregisterOnDisabledChange(i);
      });
  }
}
function up(t, e) {
  let i = o0(t);
  e.validator !== null
    ? t.setValidators(B_(i, e.validator))
    : typeof i == "function" && t.setValidators([i]);
  let n = s0(t);
  e.asyncValidator !== null
    ? t.setAsyncValidators(B_(n, e.asyncValidator))
    : typeof n == "function" && t.setAsyncValidators([n]);
  let r = () => t.updateValueAndValidity();
  bc(e._rawValidators, r), bc(e._rawAsyncValidators, r);
}
function vc(t, e) {
  let i = !1;
  if (t !== null) {
    if (e.validator !== null) {
      let r = o0(t);
      if (Array.isArray(r) && r.length > 0) {
        let o = r.filter((s) => s !== e.validator);
        o.length !== r.length && ((i = !0), t.setValidators(o));
      }
    }
    if (e.asyncValidator !== null) {
      let r = s0(t);
      if (Array.isArray(r) && r.length > 0) {
        let o = r.filter((s) => s !== e.asyncValidator);
        o.length !== r.length && ((i = !0), t.setAsyncValidators(o));
      }
    }
  }
  let n = () => {};
  return bc(e._rawValidators, n), bc(e._rawAsyncValidators, n), i;
}
function dk(t, e) {
  e.valueAccessor.registerOnChange((i) => {
    (t._pendingValue = i),
      (t._pendingChange = !0),
      (t._pendingDirty = !0),
      t.updateOn === "change" && c0(t, e);
  });
}
function uk(t, e) {
  e.valueAccessor.registerOnTouched(() => {
    (t._pendingTouched = !0),
      t.updateOn === "blur" && t._pendingChange && c0(t, e),
      t.updateOn !== "submit" && t.markAsTouched();
  });
}
function c0(t, e) {
  t._pendingDirty && t.markAsDirty(),
    t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
    e.viewToModelUpdate(t._pendingValue),
    (t._pendingChange = !1);
}
function fk(t, e) {
  let i = (n, r) => {
    e.valueAccessor.writeValue(n), r && e.viewToModelUpdate(n);
  };
  t.registerOnChange(i),
    e._registerOnDestroy(() => {
      t._unregisterOnChange(i);
    });
}
function d0(t, e) {
  t == null, up(t, e);
}
function hk(t, e) {
  return vc(t, e);
}
function pk(t, e) {
  if (!t.hasOwnProperty("model")) return !1;
  let i = t.model;
  return i.isFirstChange() ? !0 : !Object.is(e, i.currentValue);
}
function mk(t) {
  return Object.getPrototypeOf(t.constructor) === yc;
}
function u0(t, e) {
  t._syncPendingControls(),
    e.forEach((i) => {
      let n = i.control;
      n.updateOn === "submit" &&
        n._pendingChange &&
        (i.viewToModelUpdate(n._pendingValue), (n._pendingChange = !1));
    });
}
function gk(t, e) {
  if (!e) return null;
  Array.isArray(e);
  let i, n, r;
  return (
    e.forEach((o) => {
      o.constructor === Q_ ? (i = o) : mk(o) ? (n = o) : (r = o);
    }),
    r || n || i || null
  );
}
function bk(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
var vk = { provide: si, useExisting: Mt(() => Ki) },
  As = (() => Promise.resolve())(),
  Ki = (() => {
    let e = class e extends si {
      constructor(n, r, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._directives = new Set()),
          (this.ngSubmit = new le()),
          (this.form = new mc({}, lp(n), cp(r)));
      }
      ngAfterViewInit() {
        this._setUpdateStrategy();
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      get controls() {
        return this.form.controls;
      }
      addControl(n) {
        As.then(() => {
          let r = this._findContainer(n.path);
          (n.control = r.registerControl(n.name, n.control)),
            gc(n.control, n, this.callSetDisabledState),
            n.control.updateValueAndValidity({ emitEvent: !1 }),
            this._directives.add(n);
        });
      }
      getControl(n) {
        return this.form.get(n.path);
      }
      removeControl(n) {
        As.then(() => {
          let r = this._findContainer(n.path);
          r && r.removeControl(n.name), this._directives.delete(n);
        });
      }
      addFormGroup(n) {
        As.then(() => {
          let r = this._findContainer(n.path),
            o = new mc({});
          d0(o, n),
            r.registerControl(n.name, o),
            o.updateValueAndValidity({ emitEvent: !1 });
        });
      }
      removeFormGroup(n) {
        As.then(() => {
          let r = this._findContainer(n.path);
          r && r.removeControl(n.name);
        });
      }
      getFormGroup(n) {
        return this.form.get(n.path);
      }
      updateModel(n, r) {
        As.then(() => {
          this.form.get(n.path).setValue(r);
        });
      }
      setValue(n) {
        this.control.setValue(n);
      }
      onSubmit(n) {
        return (
          (this.submitted = !0),
          u0(this.form, this._directives),
          this.ngSubmit.emit(n),
          n?.target?.method === "dialog"
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(n = void 0) {
        this.form.reset(n), (this.submitted = !1);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.form._updateOn = this.options.updateOn);
      }
      _findContainer(n) {
        return n.pop(), n.length ? this.form.get(n) : this.form;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(_c, 10), y(ap, 10), y(Cc, 8));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
          ["ng-form"],
          ["", "ngForm", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ue("submit", function (a) {
              return o.onSubmit(a);
            })("reset", function () {
              return o.onReset();
            });
        },
        inputs: { options: ["ngFormOptions", "options"] },
        outputs: { ngSubmit: "ngSubmit" },
        exportAs: ["ngForm"],
        features: [$e([vk]), Oe],
      }));
    let t = e;
    return t;
  })();
function z_(t, e) {
  let i = t.indexOf(e);
  i > -1 && t.splice(i, 1);
}
function q_(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    Object.keys(t).length === 2 &&
    "value" in t &&
    "disabled" in t
  );
}
var f0 = class extends pc {
  constructor(e = null, i, n) {
    super(a0(i), l0(n, i)),
      (this.defaultValue = null),
      (this._onChange = []),
      (this._pendingChange = !1),
      this._applyFormState(e),
      this._setUpdateStrategy(i),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      Ec(i) &&
        (i.nonNullable || i.initialValueIsDefault) &&
        (q_(e) ? (this.defaultValue = e.value) : (this.defaultValue = e));
  }
  setValue(e, i = {}) {
    (this.value = this._pendingValue = e),
      this._onChange.length &&
        i.emitModelToViewChange !== !1 &&
        this._onChange.forEach((n) =>
          n(this.value, i.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(i);
  }
  patchValue(e, i = {}) {
    this.setValue(e, i);
  }
  reset(e = this.defaultValue, i = {}) {
    this._applyFormState(e),
      this.markAsPristine(i),
      this.markAsUntouched(i),
      this.setValue(this.value, i),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(e) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(e) {
    this._onChange.push(e);
  }
  _unregisterOnChange(e) {
    z_(this._onChange, e);
  }
  registerOnDisabledChange(e) {
    this._onDisabledChange.push(e);
  }
  _unregisterOnDisabledChange(e) {
    z_(this._onDisabledChange, e);
  }
  _forEachChild(e) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(e) {
    q_(e)
      ? ((this.value = this._pendingValue = e.value),
        e.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = e);
  }
};
var yk = (t) => t instanceof f0;
var _k = { provide: Zi, useExisting: Mt(() => Os) },
  W_ = (() => Promise.resolve())(),
  Os = (() => {
    let e = class e extends Zi {
      constructor(n, r, o, s, a, l) {
        super(),
          (this._changeDetectorRef = a),
          (this.callSetDisabledState = l),
          (this.control = new f0()),
          (this._registered = !1),
          (this.name = ""),
          (this.update = new le()),
          (this._parent = n),
          this._setValidators(r),
          this._setAsyncValidators(o),
          (this.valueAccessor = gk(this, s));
      }
      ngOnChanges(n) {
        if ((this._checkForErrors(), !this._registered || "name" in n)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let r = n.name.previousValue;
            this.formDirective.removeControl({
              name: r,
              path: this._getPath(r),
            });
          }
          this._setUpControl();
        }
        "isDisabled" in n && this._updateDisabled(n),
          pk(n, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(n) {
        (this.viewModel = n), this.update.emit(n);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone()
            ? this._setUpStandalone()
            : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        gc(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(n) {
        W_.then(() => {
          this.control.setValue(n, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(n) {
        let r = n.isDisabled.currentValue,
          o = r !== 0 && xt(r);
        W_.then(() => {
          o && !this.control.disabled
            ? this.control.disable()
            : !o && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(n) {
        return this._parent ? lk(n, this._parent) : [n];
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        y(si, 9),
        y(_c, 10),
        y(ap, 10),
        y(Rs, 10),
        y(lt, 8),
        y(Cc, 8)
      );
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""],
        ],
        inputs: {
          name: "name",
          isDisabled: ["disabled", "isDisabled"],
          model: ["ngModel", "model"],
          options: ["ngModelOptions", "options"],
        },
        outputs: { update: "ngModelChange" },
        exportAs: ["ngModel"],
        features: [$e([_k]), Oe, Ye],
      }));
    let t = e;
    return t;
  })(),
  Dc = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
        hostAttrs: ["novalidate", ""],
      }));
    let t = e;
    return t;
  })();
var xk = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({}));
  let t = e;
  return t;
})();
var wk = { provide: si, useExisting: Mt(() => fp) },
  fp = (() => {
    let e = class e extends si {
      constructor(n, r, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._onCollectionChange = () => this._updateDomValue()),
          (this.directives = []),
          (this.form = null),
          (this.ngSubmit = new le()),
          this._setValidators(n),
          this._setAsyncValidators(r);
      }
      ngOnChanges(n) {
        this._checkFormPresent(),
          n.hasOwnProperty("form") &&
            (this._updateValidators(),
            this._updateDomValue(),
            this._updateRegistrations(),
            (this._oldForm = this.form));
      }
      ngOnDestroy() {
        this.form &&
          (vc(this.form, this),
          this.form._onCollectionChange === this._onCollectionChange &&
            this.form._registerOnCollectionChange(() => {}));
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      addControl(n) {
        let r = this.form.get(n.path);
        return (
          gc(r, n, this.callSetDisabledState),
          r.updateValueAndValidity({ emitEvent: !1 }),
          this.directives.push(n),
          r
        );
      }
      getControl(n) {
        return this.form.get(n.path);
      }
      removeControl(n) {
        $_(n.control || null, n, !1), bk(this.directives, n);
      }
      addFormGroup(n) {
        this._setUpFormContainer(n);
      }
      removeFormGroup(n) {
        this._cleanUpFormContainer(n);
      }
      getFormGroup(n) {
        return this.form.get(n.path);
      }
      addFormArray(n) {
        this._setUpFormContainer(n);
      }
      removeFormArray(n) {
        this._cleanUpFormContainer(n);
      }
      getFormArray(n) {
        return this.form.get(n.path);
      }
      updateModel(n, r) {
        this.form.get(n.path).setValue(r);
      }
      onSubmit(n) {
        return (
          (this.submitted = !0),
          u0(this.form, this.directives),
          this.ngSubmit.emit(n),
          n?.target?.method === "dialog"
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(n = void 0) {
        this.form.reset(n), (this.submitted = !1);
      }
      _updateDomValue() {
        this.directives.forEach((n) => {
          let r = n.control,
            o = this.form.get(n.path);
          r !== o &&
            ($_(r || null, n),
            yk(o) && (gc(o, n, this.callSetDisabledState), (n.control = o)));
        }),
          this.form._updateTreeValidity({ emitEvent: !1 });
      }
      _setUpFormContainer(n) {
        let r = this.form.get(n.path);
        d0(r, n), r.updateValueAndValidity({ emitEvent: !1 });
      }
      _cleanUpFormContainer(n) {
        if (this.form) {
          let r = this.form.get(n.path);
          r && hk(r, n) && r.updateValueAndValidity({ emitEvent: !1 });
        }
      }
      _updateRegistrations() {
        this.form._registerOnCollectionChange(this._onCollectionChange),
          this._oldForm && this._oldForm._registerOnCollectionChange(() => {});
      }
      _updateValidators() {
        up(this.form, this), this._oldForm && vc(this._oldForm, this);
      }
      _checkFormPresent() {
        this.form;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(_c, 10), y(ap, 10), y(Cc, 8));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["", "formGroup", ""]],
        hostBindings: function (r, o) {
          r & 1 &&
            ue("submit", function (a) {
              return o.onSubmit(a);
            })("reset", function () {
              return o.onReset();
            });
        },
        inputs: { form: ["formGroup", "form"] },
        outputs: { ngSubmit: "ngSubmit" },
        exportAs: ["ngForm"],
        features: [$e([wk]), Oe, Ye],
      }));
    let t = e;
    return t;
  })();
var Ek = { provide: Rs, useExisting: Mt(() => Xr), multi: !0 };
function h0(t, e) {
  return t == null
    ? `${e}`
    : (e && typeof e == "object" && (e = "Object"), `${t}: ${e}`.slice(0, 50));
}
function Ck(t) {
  return t.split(":")[0];
}
var Xr = (() => {
    let e = class e extends yc {
      constructor() {
        super(...arguments),
          (this._optionMap = new Map()),
          (this._idCounter = 0),
          (this._compareWith = Object.is);
      }
      set compareWith(n) {
        this._compareWith = n;
      }
      writeValue(n) {
        this.value = n;
        let r = this._getOptionId(n),
          o = h0(r, n);
        this.setProperty("value", o);
      }
      registerOnChange(n) {
        this.onChange = (r) => {
          (this.value = this._getOptionValue(r)), n(this.value);
        };
      }
      _registerOption() {
        return (this._idCounter++).toString();
      }
      _getOptionId(n) {
        for (let r of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(r), n)) return r;
        return null;
      }
      _getOptionValue(n) {
        let r = Ck(n);
        return this._optionMap.has(r) ? this._optionMap.get(r) : n;
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = cn(e)))(o || e);
      };
    })()),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["select", "formControlName", "", 3, "multiple", ""],
          ["select", "formControl", "", 3, "multiple", ""],
          ["select", "ngModel", "", 3, "multiple", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ue("change", function (a) {
              return o.onChange(a.target.value);
            })("blur", function () {
              return o.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        features: [$e([Ek]), Oe],
      }));
    let t = e;
    return t;
  })(),
  Ic = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._element = n),
          (this._renderer = r),
          (this._select = o),
          this._select && (this.id = this._select._registerOption());
      }
      set ngValue(n) {
        this._select != null &&
          (this._select._optionMap.set(this.id, n),
          this._setElementValue(h0(this.id, n)),
          this._select.writeValue(this._select.value));
      }
      set value(n) {
        this._setElementValue(n),
          this._select && this._select.writeValue(this._select.value);
      }
      _setElementValue(n) {
        this._renderer.setProperty(this._element.nativeElement, "value", n);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z), y(un), y(Xr, 9));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
      }));
    let t = e;
    return t;
  })(),
  Dk = { provide: Rs, useExisting: Mt(() => p0), multi: !0 };
function G_(t, e) {
  return t == null
    ? `${e}`
    : (typeof e == "string" && (e = `'${e}'`),
      e && typeof e == "object" && (e = "Object"),
      `${t}: ${e}`.slice(0, 50));
}
function Ik(t) {
  return t.split(":")[0];
}
var p0 = (() => {
    let e = class e extends yc {
      constructor() {
        super(...arguments),
          (this._optionMap = new Map()),
          (this._idCounter = 0),
          (this._compareWith = Object.is);
      }
      set compareWith(n) {
        this._compareWith = n;
      }
      writeValue(n) {
        this.value = n;
        let r;
        if (Array.isArray(n)) {
          let o = n.map((s) => this._getOptionId(s));
          r = (s, a) => {
            s._setSelected(o.indexOf(a.toString()) > -1);
          };
        } else
          r = (o, s) => {
            o._setSelected(!1);
          };
        this._optionMap.forEach(r);
      }
      registerOnChange(n) {
        this.onChange = (r) => {
          let o = [],
            s = r.selectedOptions;
          if (s !== void 0) {
            let a = s;
            for (let l = 0; l < a.length; l++) {
              let c = a[l],
                d = this._getOptionValue(c.value);
              o.push(d);
            }
          } else {
            let a = r.options;
            for (let l = 0; l < a.length; l++) {
              let c = a[l];
              if (c.selected) {
                let d = this._getOptionValue(c.value);
                o.push(d);
              }
            }
          }
          (this.value = o), n(o);
        };
      }
      _registerOption(n) {
        let r = (this._idCounter++).toString();
        return this._optionMap.set(r, n), r;
      }
      _getOptionId(n) {
        for (let r of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(r)._value, n)) return r;
        return null;
      }
      _getOptionValue(n) {
        let r = Ik(n);
        return this._optionMap.has(r) ? this._optionMap.get(r)._value : n;
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = cn(e)))(o || e);
      };
    })()),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["select", "multiple", "", "formControlName", ""],
          ["select", "multiple", "", "formControl", ""],
          ["select", "multiple", "", "ngModel", ""],
        ],
        hostBindings: function (r, o) {
          r & 1 &&
            ue("change", function (a) {
              return o.onChange(a.target);
            })("blur", function () {
              return o.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        features: [$e([Dk]), Oe],
      }));
    let t = e;
    return t;
  })(),
  Sc = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._element = n),
          (this._renderer = r),
          (this._select = o),
          this._select && (this.id = this._select._registerOption(this));
      }
      set ngValue(n) {
        this._select != null &&
          ((this._value = n),
          this._setElementValue(G_(this.id, n)),
          this._select.writeValue(this._select.value));
      }
      set value(n) {
        this._select
          ? ((this._value = n),
            this._setElementValue(G_(this.id, n)),
            this._select.writeValue(this._select.value))
          : this._setElementValue(n);
      }
      _setElementValue(n) {
        this._renderer.setProperty(this._element.nativeElement, "value", n);
      }
      _setSelected(n) {
        this._renderer.setProperty(this._element.nativeElement, "selected", n);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z), y(un), y(p0, 9));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
      }));
    let t = e;
    return t;
  })();
var Sk = (() => {
  let e = class e {
    constructor() {
      this._validator = dc;
    }
    ngOnChanges(n) {
      if (this.inputName in n) {
        let r = this.normalizeInput(n[this.inputName].currentValue);
        (this._enabled = this.enabled(r)),
          (this._validator = this._enabled ? this.createValidator(r) : dc),
          this._onChange && this._onChange();
      }
    }
    validate(n) {
      return this._validator(n);
    }
    registerOnValidatorChange(n) {
      this._onChange = n;
    }
    enabled(n) {
      return n != null;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵdir = W({ type: e, features: [Ye] }));
  let t = e;
  return t;
})();
var Tk = { provide: _c, useExisting: Mt(() => ks), multi: !0 };
var ks = (() => {
  let e = class e extends Sk {
    constructor() {
      super(...arguments),
        (this.inputName = "required"),
        (this.normalizeInput = xt),
        (this.createValidator = (n) => K_);
    }
    enabled(n) {
      return n;
    }
  };
  (e.ɵfac = (() => {
    let n;
    return function (o) {
      return (n || (n = cn(e)))(o || e);
    };
  })()),
    (e.ɵdir = W({
      type: e,
      selectors: [
        ["", "required", "", "formControlName", "", 3, "type", "checkbox"],
        ["", "required", "", "formControl", "", 3, "type", "checkbox"],
        ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
      ],
      hostVars: 1,
      hostBindings: function (r, o) {
        r & 2 && je("required", o._enabled ? "" : null);
      },
      inputs: { required: "required" },
      features: [$e([Tk]), Oe],
    }));
  let t = e;
  return t;
})();
var Mk = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({ imports: [xk] }));
  let t = e;
  return t;
})();
var Tc = (() => {
  let e = class e {
    static withConfig(n) {
      return {
        ngModule: e,
        providers: [{ provide: Cc, useValue: n.callSetDisabledState ?? dp }],
      };
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({ imports: [Mk] }));
  let t = e;
  return t;
})();
function ze(t) {
  return t != null && `${t}` != "false";
}
function ai(t, e = 0) {
  return Ak(t) ? Number(t) : e;
}
function Ak(t) {
  return !isNaN(parseFloat(t)) && !isNaN(Number(t));
}
function Jr(t) {
  return Array.isArray(t) ? t : [t];
}
function Pe(t) {
  return t == null ? "" : typeof t == "string" ? t : `${t}px`;
}
function pt(t) {
  return t instanceof Z ? t.nativeElement : t;
}
var mp;
try {
  mp = typeof Intl < "u" && Intl.v8BreakIterator;
} catch {
  mp = !1;
}
var Ce = (() => {
  let e = class e {
    constructor(n) {
      (this._platformId = n),
        (this.isBrowser = this._platformId
          ? Vy(this._platformId)
          : typeof document == "object" && !!document),
        (this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent)),
        (this.TRIDENT =
          this.isBrowser && /(msie|trident)/i.test(navigator.userAgent)),
        (this.BLINK =
          this.isBrowser &&
          !!(window.chrome || mp) &&
          typeof CSS < "u" &&
          !this.EDGE &&
          !this.TRIDENT),
        (this.WEBKIT =
          this.isBrowser &&
          /AppleWebKit/i.test(navigator.userAgent) &&
          !this.BLINK &&
          !this.EDGE &&
          !this.TRIDENT),
        (this.IOS =
          this.isBrowser &&
          /iPad|iPhone|iPod/.test(navigator.userAgent) &&
          !("MSStream" in window)),
        (this.FIREFOX =
          this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent)),
        (this.ANDROID =
          this.isBrowser &&
          /android/i.test(navigator.userAgent) &&
          !this.TRIDENT),
        (this.SAFARI =
          this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(dn));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var eo,
  m0 = [
    "color",
    "button",
    "checkbox",
    "date",
    "datetime-local",
    "email",
    "file",
    "hidden",
    "image",
    "month",
    "number",
    "password",
    "radio",
    "range",
    "reset",
    "search",
    "submit",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ];
function gp() {
  if (eo) return eo;
  if (typeof document != "object" || !document) return (eo = new Set(m0)), eo;
  let t = document.createElement("input");
  return (
    (eo = new Set(m0.filter((e) => (t.setAttribute("type", e), t.type === e)))),
    eo
  );
}
var Ns;
function Rk() {
  if (Ns == null && typeof window < "u")
    try {
      window.addEventListener(
        "test",
        null,
        Object.defineProperty({}, "passive", { get: () => (Ns = !0) })
      );
    } finally {
      Ns = Ns || !1;
    }
  return Ns;
}
function gn(t) {
  return Rk() ? t : !!t.capture;
}
var Xi;
function g0() {
  if (Xi == null) {
    if (
      typeof document != "object" ||
      !document ||
      typeof Element != "function" ||
      !Element
    )
      return (Xi = !1), Xi;
    if ("scrollBehavior" in document.documentElement.style) Xi = !0;
    else {
      let t = Element.prototype.scrollTo;
      t ? (Xi = !/\{\s*\[native code\]\s*\}/.test(t.toString())) : (Xi = !1);
    }
  }
  return Xi;
}
var pp;
function Ok() {
  if (pp == null) {
    let t = typeof document < "u" ? document.head : null;
    pp = !!(t && (t.createShadowRoot || t.attachShadow));
  }
  return pp;
}
function b0(t) {
  if (Ok()) {
    let e = t.getRootNode ? t.getRootNode() : null;
    if (typeof ShadowRoot < "u" && ShadowRoot && e instanceof ShadowRoot)
      return e;
  }
  return null;
}
function Wt(t) {
  return t.composedPath ? t.composedPath()[0] : t.target;
}
function Ps() {
  return (
    (typeof __karma__ < "u" && !!__karma__) ||
    (typeof jasmine < "u" && !!jasmine) ||
    (typeof jest < "u" && !!jest) ||
    (typeof Mocha < "u" && !!Mocha)
  );
}
var v0 = gn({ passive: !0 }),
  y0 = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._ngZone = r),
          (this._monitoredElements = new Map());
      }
      monitor(n) {
        if (!this._platform.isBrowser) return Ge;
        let r = pt(n),
          o = this._monitoredElements.get(r);
        if (o) return o.subject;
        let s = new F(),
          a = "cdk-text-field-autofilled",
          l = (c) => {
            c.animationName === "cdk-text-field-autofill-start" &&
            !r.classList.contains(a)
              ? (r.classList.add(a),
                this._ngZone.run(() =>
                  s.next({ target: c.target, isAutofilled: !0 })
                ))
              : c.animationName === "cdk-text-field-autofill-end" &&
                r.classList.contains(a) &&
                (r.classList.remove(a),
                this._ngZone.run(() =>
                  s.next({ target: c.target, isAutofilled: !1 })
                ));
          };
        return (
          this._ngZone.runOutsideAngular(() => {
            r.addEventListener("animationstart", l, v0),
              r.classList.add("cdk-text-field-autofill-monitored");
          }),
          this._monitoredElements.set(r, {
            subject: s,
            unlisten: () => {
              r.removeEventListener("animationstart", l, v0);
            },
          }),
          s
        );
      }
      stopMonitoring(n) {
        let r = pt(n),
          o = this._monitoredElements.get(r);
        o &&
          (o.unlisten(),
          o.subject.complete(),
          r.classList.remove("cdk-text-field-autofill-monitored"),
          r.classList.remove("cdk-text-field-autofilled"),
          this._monitoredElements.delete(r));
      }
      ngOnDestroy() {
        this._monitoredElements.forEach((n, r) => this.stopMonitoring(r));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ce), v(R));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var _0 = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({}));
  let t = e;
  return t;
})();
function Mc(t, ...e) {
  return e.length
    ? e.some((i) => t[i])
    : t.altKey || t.shiftKey || t.ctrlKey || t.metaKey;
}
var x0 = (() => {
    let e = class e {
      create(n) {
        return typeof MutationObserver > "u" ? null : new MutationObserver(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Nk = (() => {
    let e = class e {
      constructor(n) {
        (this._mutationObserverFactory = n),
          (this._observedElements = new Map());
      }
      ngOnDestroy() {
        this._observedElements.forEach((n, r) => this._cleanupObserver(r));
      }
      observe(n) {
        let r = pt(n);
        return new U((o) => {
          let a = this._observeElement(r).subscribe(o);
          return () => {
            a.unsubscribe(), this._unobserveElement(r);
          };
        });
      }
      _observeElement(n) {
        if (this._observedElements.has(n))
          this._observedElements.get(n).count++;
        else {
          let r = new F(),
            o = this._mutationObserverFactory.create((s) => r.next(s));
          o && o.observe(n, { characterData: !0, childList: !0, subtree: !0 }),
            this._observedElements.set(n, { observer: o, stream: r, count: 1 });
        }
        return this._observedElements.get(n).stream;
      }
      _unobserveElement(n) {
        this._observedElements.has(n) &&
          (this._observedElements.get(n).count--,
          this._observedElements.get(n).count || this._cleanupObserver(n));
      }
      _cleanupObserver(n) {
        if (this._observedElements.has(n)) {
          let { observer: r, stream: o } = this._observedElements.get(n);
          r && r.disconnect(), o.complete(), this._observedElements.delete(n);
        }
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(x0));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  w0 = (() => {
    let e = class e {
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        (this._disabled = n),
          this._disabled ? this._unsubscribe() : this._subscribe();
      }
      get debounce() {
        return this._debounce;
      }
      set debounce(n) {
        (this._debounce = ai(n)), this._subscribe();
      }
      constructor(n, r, o) {
        (this._contentObserver = n),
          (this._elementRef = r),
          (this._ngZone = o),
          (this.event = new le()),
          (this._disabled = !1),
          (this._currentSubscription = null);
      }
      ngAfterContentInit() {
        !this._currentSubscription && !this.disabled && this._subscribe();
      }
      ngOnDestroy() {
        this._unsubscribe();
      }
      _subscribe() {
        this._unsubscribe();
        let n = this._contentObserver.observe(this._elementRef);
        this._ngZone.runOutsideAngular(() => {
          this._currentSubscription = (
            this.debounce ? n.pipe(_i(this.debounce)) : n
          ).subscribe(this.event);
        });
      }
      _unsubscribe() {
        this._currentSubscription?.unsubscribe();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Nk), y(Z), y(R));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["", "cdkObserveContent", ""]],
        inputs: {
          disabled: ["cdkObserveContentDisabled", "disabled", xt],
          debounce: "debounce",
        },
        outputs: { event: "cdkObserveContent" },
        exportAs: ["cdkObserveContent"],
        features: [Ht],
      }));
    let t = e;
    return t;
  })(),
  to = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ providers: [x0] }));
    let t = e;
    return t;
  })();
var E0 = new Set(),
  Ji,
  Fk = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._nonce = r),
          (this._matchMedia =
            this._platform.isBrowser && window.matchMedia
              ? window.matchMedia.bind(window)
              : jk);
      }
      matchMedia(n) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && Lk(n, this._nonce),
          this._matchMedia(n)
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ce), v(Zo, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function Lk(t, e) {
  if (!E0.has(t))
    try {
      Ji ||
        ((Ji = document.createElement("style")),
        e && (Ji.nonce = e),
        Ji.setAttribute("type", "text/css"),
        document.head.appendChild(Ji)),
        Ji.sheet &&
          (Ji.sheet.insertRule(`@media ${t} {body{ }}`, 0), E0.add(t));
    } catch (i) {
      console.error(i);
    }
}
function jk(t) {
  return {
    matches: t === "all" || t === "",
    media: t,
    addListener: () => {},
    removeListener: () => {},
  };
}
var D0 = (() => {
  let e = class e {
    constructor(n, r) {
      (this._mediaMatcher = n),
        (this._zone = r),
        (this._queries = new Map()),
        (this._destroySubject = new F());
    }
    ngOnDestroy() {
      this._destroySubject.next(), this._destroySubject.complete();
    }
    isMatched(n) {
      return C0(Jr(n)).some((o) => this._registerQuery(o).mql.matches);
    }
    observe(n) {
      let o = C0(Jr(n)).map((a) => this._registerQuery(a).observable),
        s = yr(o);
      return (
        (s = Un(s.pipe(Ae(1)), s.pipe(xi(1), _i(0)))),
        s.pipe(
          $((a) => {
            let l = { matches: !1, breakpoints: {} };
            return (
              a.forEach(({ matches: c, query: d }) => {
                (l.matches = l.matches || c), (l.breakpoints[d] = c);
              }),
              l
            );
          })
        )
      );
    }
    _registerQuery(n) {
      if (this._queries.has(n)) return this._queries.get(n);
      let r = this._mediaMatcher.matchMedia(n),
        s = {
          observable: new U((a) => {
            let l = (c) => this._zone.run(() => a.next(c));
            return (
              r.addListener(l),
              () => {
                r.removeListener(l);
              }
            );
          }).pipe(
            En(r),
            $(({ matches: a }) => ({ query: n, matches: a })),
            Se(this._destroySubject)
          ),
          mql: r,
        };
      return this._queries.set(n, s), s;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(Fk), v(R));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function C0(t) {
  return t
    .map((e) => e.split(","))
    .reduce((e, i) => e.concat(i))
    .map((e) => e.trim());
}
var vp = class {
  constructor(e) {
    (this._items = e),
      (this._activeItemIndex = -1),
      (this._activeItem = null),
      (this._wrap = !1),
      (this._letterKeyStream = new F()),
      (this._typeaheadSubscription = ce.EMPTY),
      (this._vertical = !0),
      (this._allowedModifierKeys = []),
      (this._homeAndEnd = !1),
      (this._pageUpAndDown = { enabled: !1, delta: 10 }),
      (this._skipPredicateFn = (i) => i.disabled),
      (this._pressedLetters = []),
      (this.tabOut = new F()),
      (this.change = new F()),
      e instanceof Pi &&
        (this._itemChangesSubscription = e.changes.subscribe((i) => {
          if (this._activeItem) {
            let r = i.toArray().indexOf(this._activeItem);
            r > -1 &&
              r !== this._activeItemIndex &&
              (this._activeItemIndex = r);
          }
        }));
  }
  skipPredicate(e) {
    return (this._skipPredicateFn = e), this;
  }
  withWrap(e = !0) {
    return (this._wrap = e), this;
  }
  withVerticalOrientation(e = !0) {
    return (this._vertical = e), this;
  }
  withHorizontalOrientation(e) {
    return (this._horizontal = e), this;
  }
  withAllowedModifierKeys(e) {
    return (this._allowedModifierKeys = e), this;
  }
  withTypeAhead(e = 200) {
    return (
      this._typeaheadSubscription.unsubscribe(),
      (this._typeaheadSubscription = this._letterKeyStream
        .pipe(
          Ne((i) => this._pressedLetters.push(i)),
          _i(e),
          De(() => this._pressedLetters.length > 0),
          $(() => this._pressedLetters.join(""))
        )
        .subscribe((i) => {
          let n = this._getItemsArray();
          for (let r = 1; r < n.length + 1; r++) {
            let o = (this._activeItemIndex + r) % n.length,
              s = n[o];
            if (
              !this._skipPredicateFn(s) &&
              s.getLabel().toUpperCase().trim().indexOf(i) === 0
            ) {
              this.setActiveItem(o);
              break;
            }
          }
          this._pressedLetters = [];
        })),
      this
    );
  }
  cancelTypeahead() {
    return (this._pressedLetters = []), this;
  }
  withHomeAndEnd(e = !0) {
    return (this._homeAndEnd = e), this;
  }
  withPageUpDown(e = !0, i = 10) {
    return (this._pageUpAndDown = { enabled: e, delta: i }), this;
  }
  setActiveItem(e) {
    let i = this._activeItem;
    this.updateActiveItem(e),
      this._activeItem !== i && this.change.next(this._activeItemIndex);
  }
  onKeydown(e) {
    let i = e.keyCode,
      r = ["altKey", "ctrlKey", "metaKey", "shiftKey"].every(
        (o) => !e[o] || this._allowedModifierKeys.indexOf(o) > -1
      );
    switch (i) {
      case 9:
        this.tabOut.next();
        return;
      case 40:
        if (this._vertical && r) {
          this.setNextItemActive();
          break;
        } else return;
      case 38:
        if (this._vertical && r) {
          this.setPreviousItemActive();
          break;
        } else return;
      case 39:
        if (this._horizontal && r) {
          this._horizontal === "rtl"
            ? this.setPreviousItemActive()
            : this.setNextItemActive();
          break;
        } else return;
      case 37:
        if (this._horizontal && r) {
          this._horizontal === "rtl"
            ? this.setNextItemActive()
            : this.setPreviousItemActive();
          break;
        } else return;
      case 36:
        if (this._homeAndEnd && r) {
          this.setFirstItemActive();
          break;
        } else return;
      case 35:
        if (this._homeAndEnd && r) {
          this.setLastItemActive();
          break;
        } else return;
      case 33:
        if (this._pageUpAndDown.enabled && r) {
          let o = this._activeItemIndex - this._pageUpAndDown.delta;
          this._setActiveItemByIndex(o > 0 ? o : 0, 1);
          break;
        } else return;
      case 34:
        if (this._pageUpAndDown.enabled && r) {
          let o = this._activeItemIndex + this._pageUpAndDown.delta,
            s = this._getItemsArray().length;
          this._setActiveItemByIndex(o < s ? o : s - 1, -1);
          break;
        } else return;
      default:
        (r || Mc(e, "shiftKey")) &&
          (e.key && e.key.length === 1
            ? this._letterKeyStream.next(e.key.toLocaleUpperCase())
            : ((i >= 65 && i <= 90) || (i >= 48 && i <= 57)) &&
              this._letterKeyStream.next(String.fromCharCode(i)));
        return;
    }
    (this._pressedLetters = []), e.preventDefault();
  }
  get activeItemIndex() {
    return this._activeItemIndex;
  }
  get activeItem() {
    return this._activeItem;
  }
  isTyping() {
    return this._pressedLetters.length > 0;
  }
  setFirstItemActive() {
    this._setActiveItemByIndex(0, 1);
  }
  setLastItemActive() {
    this._setActiveItemByIndex(this._items.length - 1, -1);
  }
  setNextItemActive() {
    this._activeItemIndex < 0
      ? this.setFirstItemActive()
      : this._setActiveItemByDelta(1);
  }
  setPreviousItemActive() {
    this._activeItemIndex < 0 && this._wrap
      ? this.setLastItemActive()
      : this._setActiveItemByDelta(-1);
  }
  updateActiveItem(e) {
    let i = this._getItemsArray(),
      n = typeof e == "number" ? e : i.indexOf(e),
      r = i[n];
    (this._activeItem = r ?? null), (this._activeItemIndex = n);
  }
  destroy() {
    this._typeaheadSubscription.unsubscribe(),
      this._itemChangesSubscription?.unsubscribe(),
      this._letterKeyStream.complete(),
      this.tabOut.complete(),
      this.change.complete(),
      (this._pressedLetters = []);
  }
  _setActiveItemByDelta(e) {
    this._wrap ? this._setActiveInWrapMode(e) : this._setActiveInDefaultMode(e);
  }
  _setActiveInWrapMode(e) {
    let i = this._getItemsArray();
    for (let n = 1; n <= i.length; n++) {
      let r = (this._activeItemIndex + e * n + i.length) % i.length,
        o = i[r];
      if (!this._skipPredicateFn(o)) {
        this.setActiveItem(r);
        return;
      }
    }
  }
  _setActiveInDefaultMode(e) {
    this._setActiveItemByIndex(this._activeItemIndex + e, e);
  }
  _setActiveItemByIndex(e, i) {
    let n = this._getItemsArray();
    if (n[e]) {
      for (; this._skipPredicateFn(n[e]); ) if (((e += i), !n[e])) return;
      this.setActiveItem(e);
    }
  }
  _getItemsArray() {
    return this._items instanceof Pi ? this._items.toArray() : this._items;
  }
};
var Rc = class extends vp {
  constructor() {
    super(...arguments), (this._origin = "program");
  }
  setFocusOrigin(e) {
    return (this._origin = e), this;
  }
  setActiveItem(e) {
    super.setActiveItem(e),
      this.activeItem && this.activeItem.focus(this._origin);
  }
};
function yp(t) {
  return t.buttons === 0 || t.detail === 0;
}
function _p(t) {
  let e =
    (t.touches && t.touches[0]) || (t.changedTouches && t.changedTouches[0]);
  return (
    !!e &&
    e.identifier === -1 &&
    (e.radiusX == null || e.radiusX === 1) &&
    (e.radiusY == null || e.radiusY === 1)
  );
}
var iN = new S("cdk-input-modality-detector-options"),
  rN = { ignoreKeys: [18, 17, 224, 91, 16] },
  T0 = 650,
  no = gn({ passive: !0, capture: !0 }),
  oN = (() => {
    let e = class e {
      get mostRecentModality() {
        return this._modality.value;
      }
      constructor(n, r, o, s) {
        (this._platform = n),
          (this._mostRecentTarget = null),
          (this._modality = new Me(null)),
          (this._lastTouchMs = 0),
          (this._onKeydown = (a) => {
            this._options?.ignoreKeys?.some((l) => l === a.keyCode) ||
              (this._modality.next("keyboard"),
              (this._mostRecentTarget = Wt(a)));
          }),
          (this._onMousedown = (a) => {
            Date.now() - this._lastTouchMs < T0 ||
              (this._modality.next(yp(a) ? "keyboard" : "mouse"),
              (this._mostRecentTarget = Wt(a)));
          }),
          (this._onTouchstart = (a) => {
            if (_p(a)) {
              this._modality.next("keyboard");
              return;
            }
            (this._lastTouchMs = Date.now()),
              this._modality.next("touch"),
              (this._mostRecentTarget = Wt(a));
          }),
          (this._options = C(C({}, rN), s)),
          (this.modalityDetected = this._modality.pipe(xi(1))),
          (this.modalityChanged = this.modalityDetected.pipe(Ro())),
          n.isBrowser &&
            r.runOutsideAngular(() => {
              o.addEventListener("keydown", this._onKeydown, no),
                o.addEventListener("mousedown", this._onMousedown, no),
                o.addEventListener("touchstart", this._onTouchstart, no);
            });
      }
      ngOnDestroy() {
        this._modality.complete(),
          this._platform.isBrowser &&
            (document.removeEventListener("keydown", this._onKeydown, no),
            document.removeEventListener("mousedown", this._onMousedown, no),
            document.removeEventListener("touchstart", this._onTouchstart, no));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ce), v(R), v(J), v(iN, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var sN = new S("cdk-focus-monitor-default-options"),
  Ac = gn({ passive: !0, capture: !0 }),
  M0 = (() => {
    let e = class e {
      constructor(n, r, o, s, a) {
        (this._ngZone = n),
          (this._platform = r),
          (this._inputModalityDetector = o),
          (this._origin = null),
          (this._windowFocused = !1),
          (this._originFromTouchInteraction = !1),
          (this._elementInfo = new Map()),
          (this._monitoredElementCount = 0),
          (this._rootNodeFocusListenerCount = new Map()),
          (this._windowFocusListener = () => {
            (this._windowFocused = !0),
              (this._windowFocusTimeoutId = window.setTimeout(
                () => (this._windowFocused = !1)
              ));
          }),
          (this._stopInputModalityDetector = new F()),
          (this._rootNodeFocusAndBlurListener = (l) => {
            let c = Wt(l);
            for (let d = c; d; d = d.parentElement)
              l.type === "focus" ? this._onFocus(l, d) : this._onBlur(l, d);
          }),
          (this._document = s),
          (this._detectionMode = a?.detectionMode || 0);
      }
      monitor(n, r = !1) {
        let o = pt(n);
        if (!this._platform.isBrowser || o.nodeType !== 1) return N();
        let s = b0(o) || this._getDocument(),
          a = this._elementInfo.get(o);
        if (a) return r && (a.checkChildren = !0), a.subject;
        let l = { checkChildren: r, subject: new F(), rootNode: s };
        return (
          this._elementInfo.set(o, l),
          this._registerGlobalListeners(l),
          l.subject
        );
      }
      stopMonitoring(n) {
        let r = pt(n),
          o = this._elementInfo.get(r);
        o &&
          (o.subject.complete(),
          this._setClasses(r),
          this._elementInfo.delete(r),
          this._removeGlobalListeners(o));
      }
      focusVia(n, r, o) {
        let s = pt(n),
          a = this._getDocument().activeElement;
        s === a
          ? this._getClosestElementsInfo(s).forEach(([l, c]) =>
              this._originChanged(l, r, c)
            )
          : (this._setOrigin(r), typeof s.focus == "function" && s.focus(o));
      }
      ngOnDestroy() {
        this._elementInfo.forEach((n, r) => this.stopMonitoring(r));
      }
      _getDocument() {
        return this._document || document;
      }
      _getWindow() {
        return this._getDocument().defaultView || window;
      }
      _getFocusOrigin(n) {
        return this._origin
          ? this._originFromTouchInteraction
            ? this._shouldBeAttributedToTouch(n)
              ? "touch"
              : "program"
            : this._origin
          : this._windowFocused && this._lastFocusOrigin
          ? this._lastFocusOrigin
          : n && this._isLastInteractionFromInputLabel(n)
          ? "mouse"
          : "program";
      }
      _shouldBeAttributedToTouch(n) {
        return (
          this._detectionMode === 1 ||
          !!n?.contains(this._inputModalityDetector._mostRecentTarget)
        );
      }
      _setClasses(n, r) {
        n.classList.toggle("cdk-focused", !!r),
          n.classList.toggle("cdk-touch-focused", r === "touch"),
          n.classList.toggle("cdk-keyboard-focused", r === "keyboard"),
          n.classList.toggle("cdk-mouse-focused", r === "mouse"),
          n.classList.toggle("cdk-program-focused", r === "program");
      }
      _setOrigin(n, r = !1) {
        this._ngZone.runOutsideAngular(() => {
          if (
            ((this._origin = n),
            (this._originFromTouchInteraction = n === "touch" && r),
            this._detectionMode === 0)
          ) {
            clearTimeout(this._originTimeoutId);
            let o = this._originFromTouchInteraction ? T0 : 1;
            this._originTimeoutId = setTimeout(() => (this._origin = null), o);
          }
        });
      }
      _onFocus(n, r) {
        let o = this._elementInfo.get(r),
          s = Wt(n);
        !o ||
          (!o.checkChildren && r !== s) ||
          this._originChanged(r, this._getFocusOrigin(s), o);
      }
      _onBlur(n, r) {
        let o = this._elementInfo.get(r);
        !o ||
          (o.checkChildren &&
            n.relatedTarget instanceof Node &&
            r.contains(n.relatedTarget)) ||
          (this._setClasses(r), this._emitOrigin(o, null));
      }
      _emitOrigin(n, r) {
        n.subject.observers.length && this._ngZone.run(() => n.subject.next(r));
      }
      _registerGlobalListeners(n) {
        if (!this._platform.isBrowser) return;
        let r = n.rootNode,
          o = this._rootNodeFocusListenerCount.get(r) || 0;
        o ||
          this._ngZone.runOutsideAngular(() => {
            r.addEventListener("focus", this._rootNodeFocusAndBlurListener, Ac),
              r.addEventListener(
                "blur",
                this._rootNodeFocusAndBlurListener,
                Ac
              );
          }),
          this._rootNodeFocusListenerCount.set(r, o + 1),
          ++this._monitoredElementCount === 1 &&
            (this._ngZone.runOutsideAngular(() => {
              this._getWindow().addEventListener(
                "focus",
                this._windowFocusListener
              );
            }),
            this._inputModalityDetector.modalityDetected
              .pipe(Se(this._stopInputModalityDetector))
              .subscribe((s) => {
                this._setOrigin(s, !0);
              }));
      }
      _removeGlobalListeners(n) {
        let r = n.rootNode;
        if (this._rootNodeFocusListenerCount.has(r)) {
          let o = this._rootNodeFocusListenerCount.get(r);
          o > 1
            ? this._rootNodeFocusListenerCount.set(r, o - 1)
            : (r.removeEventListener(
                "focus",
                this._rootNodeFocusAndBlurListener,
                Ac
              ),
              r.removeEventListener(
                "blur",
                this._rootNodeFocusAndBlurListener,
                Ac
              ),
              this._rootNodeFocusListenerCount.delete(r));
        }
        --this._monitoredElementCount ||
          (this._getWindow().removeEventListener(
            "focus",
            this._windowFocusListener
          ),
          this._stopInputModalityDetector.next(),
          clearTimeout(this._windowFocusTimeoutId),
          clearTimeout(this._originTimeoutId));
      }
      _originChanged(n, r, o) {
        this._setClasses(n, r),
          this._emitOrigin(o, r),
          (this._lastFocusOrigin = r);
      }
      _getClosestElementsInfo(n) {
        let r = [];
        return (
          this._elementInfo.forEach((o, s) => {
            (s === n || (o.checkChildren && s.contains(n))) && r.push([s, o]);
          }),
          r
        );
      }
      _isLastInteractionFromInputLabel(n) {
        let { _mostRecentTarget: r, mostRecentModality: o } =
          this._inputModalityDetector;
        if (
          o !== "mouse" ||
          !r ||
          r === n ||
          (n.nodeName !== "INPUT" && n.nodeName !== "TEXTAREA") ||
          n.disabled
        )
          return !1;
        let s = n.labels;
        if (s) {
          for (let a = 0; a < s.length; a++) if (s[a].contains(r)) return !0;
        }
        return !1;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(R), v(Ce), v(oN), v(J, 8), v(sN, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var I0 = "cdk-high-contrast-black-on-white",
  S0 = "cdk-high-contrast-white-on-black",
  bp = "cdk-high-contrast-active",
  xp = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = n),
          (this._document = r),
          (this._breakpointSubscription = w(D0)
            .observe("(forced-colors: active)")
            .subscribe(() => {
              this._hasCheckedHighContrastMode &&
                ((this._hasCheckedHighContrastMode = !1),
                this._applyBodyHighContrastModeCssClasses());
            }));
      }
      getHighContrastMode() {
        if (!this._platform.isBrowser) return 0;
        let n = this._document.createElement("div");
        (n.style.backgroundColor = "rgb(1,2,3)"),
          (n.style.position = "absolute"),
          this._document.body.appendChild(n);
        let r = this._document.defaultView || window,
          o = r && r.getComputedStyle ? r.getComputedStyle(n) : null,
          s = ((o && o.backgroundColor) || "").replace(/ /g, "");
        switch ((n.remove(), s)) {
          case "rgb(0,0,0)":
          case "rgb(45,50,54)":
          case "rgb(32,32,32)":
            return 2;
          case "rgb(255,255,255)":
          case "rgb(255,250,239)":
            return 1;
        }
        return 0;
      }
      ngOnDestroy() {
        this._breakpointSubscription.unsubscribe();
      }
      _applyBodyHighContrastModeCssClasses() {
        if (
          !this._hasCheckedHighContrastMode &&
          this._platform.isBrowser &&
          this._document.body
        ) {
          let n = this._document.body.classList;
          n.remove(bp, I0, S0), (this._hasCheckedHighContrastMode = !0);
          let r = this.getHighContrastMode();
          r === 1 ? n.add(bp, I0) : r === 2 && n.add(bp, S0);
        }
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ce), v(J));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  A0 = (() => {
    let e = class e {
      constructor(n) {
        n._applyBodyHighContrastModeCssClasses();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(xp));
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [to] }));
    let t = e;
    return t;
  })();
var aN = new S("cdk-dir-doc", { providedIn: "root", factory: lN });
function lN() {
  return w(J);
}
var cN =
  /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function dN(t) {
  let e = t?.toLowerCase() || "";
  return e === "auto" && typeof navigator < "u" && navigator?.language
    ? cN.test(navigator.language)
      ? "rtl"
      : "ltr"
    : e === "rtl"
    ? "rtl"
    : "ltr";
}
var er = (() => {
  let e = class e {
    constructor(n) {
      if (((this.value = "ltr"), (this.change = new le()), n)) {
        let r = n.body ? n.body.dir : null,
          o = n.documentElement ? n.documentElement.dir : null;
        this.value = dN(r || o || "ltr");
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(aN, 8));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var li = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({}));
  let t = e;
  return t;
})();
var bn = "*";
function O0(t, e) {
  return { type: 7, name: t, definitions: e, options: {} };
}
function k0(t, e = null) {
  return { type: 4, styles: e, timings: t };
}
function N0(t, e = null) {
  return { type: 2, steps: t, options: e };
}
function io(t) {
  return { type: 6, styles: t, offset: null };
}
function P0(t, e, i) {
  return { type: 0, name: t, styles: e, options: i };
}
function F0(t, e, i = null) {
  return { type: 1, expr: t, animation: e, options: i };
}
var ci = class {
    constructor(e = 0, i = 0) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this._started = !1),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._position = 0),
        (this.parentPlayer = null),
        (this.totalTime = e + i);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    onStart(e) {
      this._originalOnStartFns.push(e), this._onStartFns.push(e);
    }
    onDone(e) {
      this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    hasStarted() {
      return this._started;
    }
    init() {}
    play() {
      this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
        (this._started = !0);
    }
    triggerMicrotask() {
      queueMicrotask(() => this._onFinish());
    }
    _onStart() {
      this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
    }
    pause() {}
    restart() {}
    finish() {
      this._onFinish();
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this.hasStarted() || this._onStart(),
        this.finish(),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    reset() {
      (this._started = !1),
        (this._finished = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    setPosition(e) {
      this._position = this.totalTime ? e * this.totalTime : 1;
    }
    getPosition() {
      return this.totalTime ? this._position / this.totalTime : 1;
    }
    triggerCallback(e) {
      let i = e == "start" ? this._onStartFns : this._onDoneFns;
      i.forEach((n) => n()), (i.length = 0);
    }
  },
  Fs = class {
    constructor(e) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._onDestroyFns = []),
        (this.parentPlayer = null),
        (this.totalTime = 0),
        (this.players = e);
      let i = 0,
        n = 0,
        r = 0,
        o = this.players.length;
      o == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((s) => {
            s.onDone(() => {
              ++i == o && this._onFinish();
            }),
              s.onDestroy(() => {
                ++n == o && this._onDestroy();
              }),
              s.onStart(() => {
                ++r == o && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (s, a) => Math.max(s, a.totalTime),
          0
        ));
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    init() {
      this.players.forEach((e) => e.init());
    }
    onStart(e) {
      this._onStartFns.push(e);
    }
    _onStart() {
      this.hasStarted() ||
        ((this._started = !0),
        this._onStartFns.forEach((e) => e()),
        (this._onStartFns = []));
    }
    onDone(e) {
      this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    hasStarted() {
      return this._started;
    }
    play() {
      this.parentPlayer || this.init(),
        this._onStart(),
        this.players.forEach((e) => e.play());
    }
    pause() {
      this.players.forEach((e) => e.pause());
    }
    restart() {
      this.players.forEach((e) => e.restart());
    }
    finish() {
      this._onFinish(), this.players.forEach((e) => e.finish());
    }
    destroy() {
      this._onDestroy();
    }
    _onDestroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._onFinish(),
        this.players.forEach((e) => e.destroy()),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    reset() {
      this.players.forEach((e) => e.reset()),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1);
    }
    setPosition(e) {
      let i = e * this.totalTime;
      this.players.forEach((n) => {
        let r = n.totalTime ? Math.min(1, i / n.totalTime) : 1;
        n.setPosition(r);
      });
    }
    getPosition() {
      let e = this.players.reduce(
        (i, n) => (i === null || n.totalTime > i.totalTime ? n : i),
        null
      );
      return e != null ? e.getPosition() : 0;
    }
    beforeDestroy() {
      this.players.forEach((e) => {
        e.beforeDestroy && e.beforeDestroy();
      });
    }
    triggerCallback(e) {
      let i = e == "start" ? this._onStartFns : this._onDoneFns;
      i.forEach((n) => n()), (i.length = 0);
    }
  },
  Oc = "!";
function L0(t) {
  return new E(3e3, !1);
}
function uN() {
  return new E(3100, !1);
}
function fN() {
  return new E(3101, !1);
}
function hN(t) {
  return new E(3001, !1);
}
function pN(t) {
  return new E(3003, !1);
}
function mN(t) {
  return new E(3004, !1);
}
function gN(t, e) {
  return new E(3005, !1);
}
function bN() {
  return new E(3006, !1);
}
function vN() {
  return new E(3007, !1);
}
function yN(t, e) {
  return new E(3008, !1);
}
function _N(t) {
  return new E(3002, !1);
}
function xN(t, e, i, n, r) {
  return new E(3010, !1);
}
function wN() {
  return new E(3011, !1);
}
function EN() {
  return new E(3012, !1);
}
function CN() {
  return new E(3200, !1);
}
function DN() {
  return new E(3202, !1);
}
function IN() {
  return new E(3013, !1);
}
function SN(t) {
  return new E(3014, !1);
}
function TN(t) {
  return new E(3015, !1);
}
function MN(t) {
  return new E(3016, !1);
}
function AN(t, e) {
  return new E(3404, !1);
}
function RN(t) {
  return new E(3502, !1);
}
function ON(t) {
  return new E(3503, !1);
}
function kN() {
  return new E(3300, !1);
}
function NN(t) {
  return new E(3504, !1);
}
function PN(t) {
  return new E(3301, !1);
}
function FN(t, e) {
  return new E(3302, !1);
}
function LN(t) {
  return new E(3303, !1);
}
function jN(t, e) {
  return new E(3400, !1);
}
function VN(t) {
  return new E(3401, !1);
}
function BN(t) {
  return new E(3402, !1);
}
function UN(t, e) {
  return new E(3505, !1);
}
function di(t) {
  switch (t.length) {
    case 0:
      return new ci();
    case 1:
      return t[0];
    default:
      return new Fs(t);
  }
}
function K0(t, e, i = new Map(), n = new Map()) {
  let r = [],
    o = [],
    s = -1,
    a = null;
  if (
    (e.forEach((l) => {
      let c = l.get("offset"),
        d = c == s,
        u = (d && a) || new Map();
      l.forEach((f, h) => {
        let p = h,
          m = f;
        if (h !== "offset")
          switch (((p = t.normalizePropertyName(p, r)), m)) {
            case Oc:
              m = i.get(h);
              break;
            case bn:
              m = n.get(h);
              break;
            default:
              m = t.normalizeStyleValue(h, p, m, r);
              break;
          }
        u.set(p, m);
      }),
        d || o.push(u),
        (a = u),
        (s = c);
    }),
    r.length)
  )
    throw RN(r);
  return o;
}
function zp(t, e, i, n) {
  switch (e) {
    case "start":
      t.onStart(() => n(i && Ep(i, "start", t)));
      break;
    case "done":
      t.onDone(() => n(i && Ep(i, "done", t)));
      break;
    case "destroy":
      t.onDestroy(() => n(i && Ep(i, "destroy", t)));
      break;
  }
}
function Ep(t, e, i) {
  let n = i.totalTime,
    r = !!i.disabled,
    o = qp(
      t.element,
      t.triggerName,
      t.fromState,
      t.toState,
      e || t.phaseName,
      n ?? t.totalTime,
      r
    ),
    s = t._data;
  return s != null && (o._data = s), o;
}
function qp(t, e, i, n, r = "", o = 0, s) {
  return {
    element: t,
    triggerName: e,
    fromState: i,
    toState: n,
    phaseName: r,
    totalTime: o,
    disabled: !!s,
  };
}
function Ct(t, e, i) {
  let n = t.get(e);
  return n || t.set(e, (n = i)), n;
}
function j0(t) {
  let e = t.indexOf(":"),
    i = t.substring(1, e),
    n = t.slice(e + 1);
  return [i, n];
}
var HN = (() => (typeof document > "u" ? null : document.documentElement))();
function Wp(t) {
  let e = t.parentNode || t.host || null;
  return e === HN ? null : e;
}
function $N(t) {
  return t.substring(1, 6) == "ebkit";
}
var tr = null,
  V0 = !1;
function zN(t) {
  tr ||
    ((tr = qN() || {}), (V0 = tr.style ? "WebkitAppearance" in tr.style : !1));
  let e = !0;
  return (
    tr.style &&
      !$N(t) &&
      ((e = t in tr.style),
      !e &&
        V0 &&
        (e = "Webkit" + t.charAt(0).toUpperCase() + t.slice(1) in tr.style)),
    e
  );
}
function qN() {
  return typeof document < "u" ? document.body : null;
}
function X0(t, e) {
  for (; e; ) {
    if (e === t) return !0;
    e = Wp(e);
  }
  return !1;
}
function J0(t, e, i) {
  if (i) return Array.from(t.querySelectorAll(e));
  let n = t.querySelector(e);
  return n ? [n] : [];
}
var Gp = (() => {
    let e = class e {
      validateStyleProperty(n) {
        return zN(n);
      }
      matchesElement(n, r) {
        return !1;
      }
      containsElement(n, r) {
        return X0(n, r);
      }
      getParentElement(n) {
        return Wp(n);
      }
      query(n, r, o) {
        return J0(n, r, o);
      }
      computeStyle(n, r, o) {
        return o || "";
      }
      animate(n, r, o, s, a, l = [], c) {
        return new ci(o, s);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  $s = (() => {
    let e = class e {};
    e.NOOP = new Gp();
    let t = e;
    return t;
  })(),
  rr = class {};
var WN = 1e3,
  ex = "{{",
  GN = "}}",
  tx = "ng-enter",
  Mp = "ng-leave",
  kc = "ng-trigger",
  jc = ".ng-trigger",
  B0 = "ng-animating",
  Ap = ".ng-animating";
function Pn(t) {
  if (typeof t == "number") return t;
  let e = t.match(/^(-?[\.\d]+)(m?s)/);
  return !e || e.length < 2 ? 0 : Rp(parseFloat(e[1]), e[2]);
}
function Rp(t, e) {
  switch (e) {
    case "s":
      return t * WN;
    default:
      return t;
  }
}
function Vc(t, e, i) {
  return t.hasOwnProperty("duration") ? t : YN(t, e, i);
}
function YN(t, e, i) {
  let n =
      /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
    r,
    o = 0,
    s = "";
  if (typeof t == "string") {
    let a = t.match(n);
    if (a === null) return e.push(L0(t)), { duration: 0, delay: 0, easing: "" };
    r = Rp(parseFloat(a[1]), a[2]);
    let l = a[3];
    l != null && (o = Rp(parseFloat(l), a[4]));
    let c = a[5];
    c && (s = c);
  } else r = t;
  if (!i) {
    let a = !1,
      l = e.length;
    r < 0 && (e.push(uN()), (a = !0)),
      o < 0 && (e.push(fN()), (a = !0)),
      a && e.splice(l, 0, L0(t));
  }
  return { duration: r, delay: o, easing: s };
}
function zs(t, e = {}) {
  return (
    Object.keys(t).forEach((i) => {
      e[i] = t[i];
    }),
    e
  );
}
function nx(t) {
  let e = new Map();
  return (
    Object.keys(t).forEach((i) => {
      let n = t[i];
      e.set(i, n);
    }),
    e
  );
}
function QN(t) {
  return t.length ? (t[0] instanceof Map ? t : t.map((e) => nx(e))) : [];
}
function oo(t, e = new Map(), i) {
  if (i) for (let [n, r] of i) e.set(n, r);
  for (let [n, r] of t) e.set(n, r);
  return e;
}
function vn(t, e, i) {
  e.forEach((n, r) => {
    let o = Yp(r);
    i && !i.has(r) && i.set(r, t.style[o]), (t.style[o] = n);
  });
}
function ir(t, e) {
  e.forEach((i, n) => {
    let r = Yp(n);
    t.style[r] = "";
  });
}
function Ls(t) {
  return Array.isArray(t) ? (t.length == 1 ? t[0] : N0(t)) : t;
}
function ZN(t, e, i) {
  let n = e.params || {},
    r = ix(t);
  r.length &&
    r.forEach((o) => {
      n.hasOwnProperty(o) || i.push(hN(o));
    });
}
var Op = new RegExp(`${ex}\\s*(.+?)\\s*${GN}`, "g");
function ix(t) {
  let e = [];
  if (typeof t == "string") {
    let i;
    for (; (i = Op.exec(t)); ) e.push(i[1]);
    Op.lastIndex = 0;
  }
  return e;
}
function Vs(t, e, i) {
  let n = t.toString(),
    r = n.replace(Op, (o, s) => {
      let a = e[s];
      return a == null && (i.push(pN(s)), (a = "")), a.toString();
    });
  return r == n ? t : r;
}
function Bc(t) {
  let e = [],
    i = t.next();
  for (; !i.done; ) e.push(i.value), (i = t.next());
  return e;
}
var KN = /-+([a-z0-9])/g;
function Yp(t) {
  return t.replace(KN, (...e) => e[1].toUpperCase());
}
function XN(t, e) {
  return t === 0 || e === 0;
}
function JN(t, e, i) {
  if (i.size && e.length) {
    let n = e[0],
      r = [];
    if (
      (i.forEach((o, s) => {
        n.has(s) || r.push(s), n.set(s, o);
      }),
      r.length)
    )
      for (let o = 1; o < e.length; o++) {
        let s = e[o];
        r.forEach((a) => s.set(a, rx(t, a)));
      }
  }
  return e;
}
function Et(t, e, i) {
  switch (e.type) {
    case 7:
      return t.visitTrigger(e, i);
    case 0:
      return t.visitState(e, i);
    case 1:
      return t.visitTransition(e, i);
    case 2:
      return t.visitSequence(e, i);
    case 3:
      return t.visitGroup(e, i);
    case 4:
      return t.visitAnimate(e, i);
    case 5:
      return t.visitKeyframes(e, i);
    case 6:
      return t.visitStyle(e, i);
    case 8:
      return t.visitReference(e, i);
    case 9:
      return t.visitAnimateChild(e, i);
    case 10:
      return t.visitAnimateRef(e, i);
    case 11:
      return t.visitQuery(e, i);
    case 12:
      return t.visitStagger(e, i);
    default:
      throw mN(e.type);
  }
}
function rx(t, e) {
  return window.getComputedStyle(t)[e];
}
var e1 = new Set([
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "left",
    "top",
    "bottom",
    "right",
    "fontSize",
    "outlineWidth",
    "outlineOffset",
    "paddingTop",
    "paddingLeft",
    "paddingBottom",
    "paddingRight",
    "marginTop",
    "marginLeft",
    "marginBottom",
    "marginRight",
    "borderRadius",
    "borderWidth",
    "borderTopWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "textIndent",
    "perspective",
  ]),
  Uc = class extends rr {
    normalizePropertyName(e, i) {
      return Yp(e);
    }
    normalizeStyleValue(e, i, n, r) {
      let o = "",
        s = n.toString().trim();
      if (e1.has(i) && n !== 0 && n !== "0")
        if (typeof n == "number") o = "px";
        else {
          let a = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
          a && a[1].length == 0 && r.push(gN(e, n));
        }
      return s + o;
    }
  };
var Hc = "*";
function t1(t, e) {
  let i = [];
  return (
    typeof t == "string"
      ? t.split(/\s*,\s*/).forEach((n) => n1(n, i, e))
      : i.push(t),
    i
  );
}
function n1(t, e, i) {
  if (t[0] == ":") {
    let l = i1(t, i);
    if (typeof l == "function") {
      e.push(l);
      return;
    }
    t = l;
  }
  let n = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (n == null || n.length < 4) return i.push(TN(t)), e;
  let r = n[1],
    o = n[2],
    s = n[3];
  e.push(U0(r, s));
  let a = r == Hc && s == Hc;
  o[0] == "<" && !a && e.push(U0(s, r));
}
function i1(t, e) {
  switch (t) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (i, n) => parseFloat(n) > parseFloat(i);
    case ":decrement":
      return (i, n) => parseFloat(n) < parseFloat(i);
    default:
      return e.push(MN(t)), "* => *";
  }
}
var Nc = new Set(["true", "1"]),
  Pc = new Set(["false", "0"]);
function U0(t, e) {
  let i = Nc.has(t) || Pc.has(t),
    n = Nc.has(e) || Pc.has(e);
  return (r, o) => {
    let s = t == Hc || t == r,
      a = e == Hc || e == o;
    return (
      !s && i && typeof r == "boolean" && (s = r ? Nc.has(t) : Pc.has(t)),
      !a && n && typeof o == "boolean" && (a = o ? Nc.has(e) : Pc.has(e)),
      s && a
    );
  };
}
var ox = ":self",
  r1 = new RegExp(`s*${ox}s*,?`, "g");
function sx(t, e, i, n) {
  return new kp(t).build(e, i, n);
}
var H0 = "",
  kp = class {
    constructor(e) {
      this._driver = e;
    }
    build(e, i, n) {
      let r = new Np(i);
      return this._resetContextStyleTimingState(r), Et(this, Ls(e), r);
    }
    _resetContextStyleTimingState(e) {
      (e.currentQuerySelector = H0),
        (e.collectedStyles = new Map()),
        e.collectedStyles.set(H0, new Map()),
        (e.currentTime = 0);
    }
    visitTrigger(e, i) {
      let n = (i.queryCount = 0),
        r = (i.depCount = 0),
        o = [],
        s = [];
      return (
        e.name.charAt(0) == "@" && i.errors.push(bN()),
        e.definitions.forEach((a) => {
          if ((this._resetContextStyleTimingState(i), a.type == 0)) {
            let l = a,
              c = l.name;
            c
              .toString()
              .split(/\s*,\s*/)
              .forEach((d) => {
                (l.name = d), o.push(this.visitState(l, i));
              }),
              (l.name = c);
          } else if (a.type == 1) {
            let l = this.visitTransition(a, i);
            (n += l.queryCount), (r += l.depCount), s.push(l);
          } else i.errors.push(vN());
        }),
        {
          type: 7,
          name: e.name,
          states: o,
          transitions: s,
          queryCount: n,
          depCount: r,
          options: null,
        }
      );
    }
    visitState(e, i) {
      let n = this.visitStyle(e.styles, i),
        r = (e.options && e.options.params) || null;
      if (n.containsDynamicStyles) {
        let o = new Set(),
          s = r || {};
        if (
          (n.styles.forEach((a) => {
            a instanceof Map &&
              a.forEach((l) => {
                ix(l).forEach((c) => {
                  s.hasOwnProperty(c) || o.add(c);
                });
              });
          }),
          o.size)
        ) {
          let a = Bc(o.values());
          i.errors.push(yN(e.name, a));
        }
      }
      return {
        type: 0,
        name: e.name,
        style: n,
        options: r ? { params: r } : null,
      };
    }
    visitTransition(e, i) {
      (i.queryCount = 0), (i.depCount = 0);
      let n = Et(this, Ls(e.animation), i);
      return {
        type: 1,
        matchers: t1(e.expr, i.errors),
        animation: n,
        queryCount: i.queryCount,
        depCount: i.depCount,
        options: nr(e.options),
      };
    }
    visitSequence(e, i) {
      return {
        type: 2,
        steps: e.steps.map((n) => Et(this, n, i)),
        options: nr(e.options),
      };
    }
    visitGroup(e, i) {
      let n = i.currentTime,
        r = 0,
        o = e.steps.map((s) => {
          i.currentTime = n;
          let a = Et(this, s, i);
          return (r = Math.max(r, i.currentTime)), a;
        });
      return (i.currentTime = r), { type: 3, steps: o, options: nr(e.options) };
    }
    visitAnimate(e, i) {
      let n = l1(e.timings, i.errors);
      i.currentAnimateTimings = n;
      let r,
        o = e.styles ? e.styles : io({});
      if (o.type == 5) r = this.visitKeyframes(o, i);
      else {
        let s = e.styles,
          a = !1;
        if (!s) {
          a = !0;
          let c = {};
          n.easing && (c.easing = n.easing), (s = io(c));
        }
        i.currentTime += n.duration + n.delay;
        let l = this.visitStyle(s, i);
        (l.isEmptyStep = a), (r = l);
      }
      return (
        (i.currentAnimateTimings = null),
        { type: 4, timings: n, style: r, options: null }
      );
    }
    visitStyle(e, i) {
      let n = this._makeStyleAst(e, i);
      return this._validateStyleAst(n, i), n;
    }
    _makeStyleAst(e, i) {
      let n = [],
        r = Array.isArray(e.styles) ? e.styles : [e.styles];
      for (let a of r)
        typeof a == "string"
          ? a === bn
            ? n.push(a)
            : i.errors.push(_N(a))
          : n.push(nx(a));
      let o = !1,
        s = null;
      return (
        n.forEach((a) => {
          if (
            a instanceof Map &&
            (a.has("easing") && ((s = a.get("easing")), a.delete("easing")), !o)
          ) {
            for (let l of a.values())
              if (l.toString().indexOf(ex) >= 0) {
                o = !0;
                break;
              }
          }
        }),
        {
          type: 6,
          styles: n,
          easing: s,
          offset: e.offset,
          containsDynamicStyles: o,
          options: null,
        }
      );
    }
    _validateStyleAst(e, i) {
      let n = i.currentAnimateTimings,
        r = i.currentTime,
        o = i.currentTime;
      n && o > 0 && (o -= n.duration + n.delay),
        e.styles.forEach((s) => {
          typeof s != "string" &&
            s.forEach((a, l) => {
              let c = i.collectedStyles.get(i.currentQuerySelector),
                d = c.get(l),
                u = !0;
              d &&
                (o != r &&
                  o >= d.startTime &&
                  r <= d.endTime &&
                  (i.errors.push(xN(l, d.startTime, d.endTime, o, r)),
                  (u = !1)),
                (o = d.startTime)),
                u && c.set(l, { startTime: o, endTime: r }),
                i.options && ZN(a, i.options, i.errors);
            });
        });
    }
    visitKeyframes(e, i) {
      let n = { type: 5, styles: [], options: null };
      if (!i.currentAnimateTimings) return i.errors.push(wN()), n;
      let r = 1,
        o = 0,
        s = [],
        a = !1,
        l = !1,
        c = 0,
        d = e.steps.map((b) => {
          let x = this._makeStyleAst(b, i),
            P = x.offset != null ? x.offset : a1(x.styles),
            I = 0;
          return (
            P != null && (o++, (I = x.offset = P)),
            (l = l || I < 0 || I > 1),
            (a = a || I < c),
            (c = I),
            s.push(I),
            x
          );
        });
      l && i.errors.push(EN()), a && i.errors.push(CN());
      let u = e.steps.length,
        f = 0;
      o > 0 && o < u ? i.errors.push(DN()) : o == 0 && (f = r / (u - 1));
      let h = u - 1,
        p = i.currentTime,
        m = i.currentAnimateTimings,
        g = m.duration;
      return (
        d.forEach((b, x) => {
          let P = f > 0 ? (x == h ? 1 : f * x) : s[x],
            I = P * g;
          (i.currentTime = p + m.delay + I),
            (m.duration = I),
            this._validateStyleAst(b, i),
            (b.offset = P),
            n.styles.push(b);
        }),
        n
      );
    }
    visitReference(e, i) {
      return {
        type: 8,
        animation: Et(this, Ls(e.animation), i),
        options: nr(e.options),
      };
    }
    visitAnimateChild(e, i) {
      return i.depCount++, { type: 9, options: nr(e.options) };
    }
    visitAnimateRef(e, i) {
      return {
        type: 10,
        animation: this.visitReference(e.animation, i),
        options: nr(e.options),
      };
    }
    visitQuery(e, i) {
      let n = i.currentQuerySelector,
        r = e.options || {};
      i.queryCount++, (i.currentQuery = e);
      let [o, s] = o1(e.selector);
      (i.currentQuerySelector = n.length ? n + " " + o : o),
        Ct(i.collectedStyles, i.currentQuerySelector, new Map());
      let a = Et(this, Ls(e.animation), i);
      return (
        (i.currentQuery = null),
        (i.currentQuerySelector = n),
        {
          type: 11,
          selector: o,
          limit: r.limit || 0,
          optional: !!r.optional,
          includeSelf: s,
          animation: a,
          originalSelector: e.selector,
          options: nr(e.options),
        }
      );
    }
    visitStagger(e, i) {
      i.currentQuery || i.errors.push(IN());
      let n =
        e.timings === "full"
          ? { duration: 0, delay: 0, easing: "full" }
          : Vc(e.timings, i.errors, !0);
      return {
        type: 12,
        animation: Et(this, Ls(e.animation), i),
        timings: n,
        options: null,
      };
    }
  };
function o1(t) {
  let e = !!t.split(/\s*,\s*/).find((i) => i == ox);
  return (
    e && (t = t.replace(r1, "")),
    (t = t
      .replace(/@\*/g, jc)
      .replace(/@\w+/g, (i) => jc + "-" + i.slice(1))
      .replace(/:animating/g, Ap)),
    [t, e]
  );
}
function s1(t) {
  return t ? zs(t) : null;
}
var Np = class {
  constructor(e) {
    (this.errors = e),
      (this.queryCount = 0),
      (this.depCount = 0),
      (this.currentTransition = null),
      (this.currentQuery = null),
      (this.currentQuerySelector = null),
      (this.currentAnimateTimings = null),
      (this.currentTime = 0),
      (this.collectedStyles = new Map()),
      (this.options = null),
      (this.unsupportedCSSPropertiesFound = new Set());
  }
};
function a1(t) {
  if (typeof t == "string") return null;
  let e = null;
  if (Array.isArray(t))
    t.forEach((i) => {
      if (i instanceof Map && i.has("offset")) {
        let n = i;
        (e = parseFloat(n.get("offset"))), n.delete("offset");
      }
    });
  else if (t instanceof Map && t.has("offset")) {
    let i = t;
    (e = parseFloat(i.get("offset"))), i.delete("offset");
  }
  return e;
}
function l1(t, e) {
  if (t.hasOwnProperty("duration")) return t;
  if (typeof t == "number") {
    let o = Vc(t, e).duration;
    return Cp(o, 0, "");
  }
  let i = t;
  if (i.split(/\s+/).some((o) => o.charAt(0) == "{" && o.charAt(1) == "{")) {
    let o = Cp(0, 0, "");
    return (o.dynamic = !0), (o.strValue = i), o;
  }
  let r = Vc(i, e);
  return Cp(r.duration, r.delay, r.easing);
}
function nr(t) {
  return t ? ((t = zs(t)), t.params && (t.params = s1(t.params))) : (t = {}), t;
}
function Cp(t, e, i) {
  return { duration: t, delay: e, easing: i };
}
function Qp(t, e, i, n, r, o, s = null, a = !1) {
  return {
    type: 1,
    element: t,
    keyframes: e,
    preStyleProps: i,
    postStyleProps: n,
    duration: r,
    delay: o,
    totalTime: r + o,
    easing: s,
    subTimeline: a,
  };
}
var Bs = class {
    constructor() {
      this._map = new Map();
    }
    get(e) {
      return this._map.get(e) || [];
    }
    append(e, i) {
      let n = this._map.get(e);
      n || this._map.set(e, (n = [])), n.push(...i);
    }
    has(e) {
      return this._map.has(e);
    }
    clear() {
      this._map.clear();
    }
  },
  c1 = 1,
  d1 = ":enter",
  u1 = new RegExp(d1, "g"),
  f1 = ":leave",
  h1 = new RegExp(f1, "g");
function ax(t, e, i, n, r, o = new Map(), s = new Map(), a, l, c = []) {
  return new Pp().buildKeyframes(t, e, i, n, r, o, s, a, l, c);
}
var Pp = class {
    buildKeyframes(e, i, n, r, o, s, a, l, c, d = []) {
      c = c || new Bs();
      let u = new Fp(e, i, c, r, o, d, []);
      u.options = l;
      let f = l.delay ? Pn(l.delay) : 0;
      u.currentTimeline.delayNextStep(f),
        u.currentTimeline.setStyles([s], null, u.errors, l),
        Et(this, n, u);
      let h = u.timelines.filter((p) => p.containsAnimation());
      if (h.length && a.size) {
        let p;
        for (let m = h.length - 1; m >= 0; m--) {
          let g = h[m];
          if (g.element === i) {
            p = g;
            break;
          }
        }
        p &&
          !p.allowOnlyTimelineStyles() &&
          p.setStyles([a], null, u.errors, l);
      }
      return h.length
        ? h.map((p) => p.buildKeyframes())
        : [Qp(i, [], [], [], 0, f, "", !1)];
    }
    visitTrigger(e, i) {}
    visitState(e, i) {}
    visitTransition(e, i) {}
    visitAnimateChild(e, i) {
      let n = i.subInstructions.get(i.element);
      if (n) {
        let r = i.createSubContext(e.options),
          o = i.currentTimeline.currentTime,
          s = this._visitSubInstructions(n, r, r.options);
        o != s && i.transformIntoNewTimeline(s);
      }
      i.previousNode = e;
    }
    visitAnimateRef(e, i) {
      let n = i.createSubContext(e.options);
      n.transformIntoNewTimeline(),
        this._applyAnimationRefDelays([e.options, e.animation.options], i, n),
        this.visitReference(e.animation, n),
        i.transformIntoNewTimeline(n.currentTimeline.currentTime),
        (i.previousNode = e);
    }
    _applyAnimationRefDelays(e, i, n) {
      for (let r of e) {
        let o = r?.delay;
        if (o) {
          let s =
            typeof o == "number" ? o : Pn(Vs(o, r?.params ?? {}, i.errors));
          n.delayNextStep(s);
        }
      }
    }
    _visitSubInstructions(e, i, n) {
      let o = i.currentTimeline.currentTime,
        s = n.duration != null ? Pn(n.duration) : null,
        a = n.delay != null ? Pn(n.delay) : null;
      return (
        s !== 0 &&
          e.forEach((l) => {
            let c = i.appendInstructionToTimeline(l, s, a);
            o = Math.max(o, c.duration + c.delay);
          }),
        o
      );
    }
    visitReference(e, i) {
      i.updateOptions(e.options, !0),
        Et(this, e.animation, i),
        (i.previousNode = e);
    }
    visitSequence(e, i) {
      let n = i.subContextCount,
        r = i,
        o = e.options;
      if (
        o &&
        (o.params || o.delay) &&
        ((r = i.createSubContext(o)),
        r.transformIntoNewTimeline(),
        o.delay != null)
      ) {
        r.previousNode.type == 6 &&
          (r.currentTimeline.snapshotCurrentStyles(), (r.previousNode = $c));
        let s = Pn(o.delay);
        r.delayNextStep(s);
      }
      e.steps.length &&
        (e.steps.forEach((s) => Et(this, s, r)),
        r.currentTimeline.applyStylesToKeyframe(),
        r.subContextCount > n && r.transformIntoNewTimeline()),
        (i.previousNode = e);
    }
    visitGroup(e, i) {
      let n = [],
        r = i.currentTimeline.currentTime,
        o = e.options && e.options.delay ? Pn(e.options.delay) : 0;
      e.steps.forEach((s) => {
        let a = i.createSubContext(e.options);
        o && a.delayNextStep(o),
          Et(this, s, a),
          (r = Math.max(r, a.currentTimeline.currentTime)),
          n.push(a.currentTimeline);
      }),
        n.forEach((s) => i.currentTimeline.mergeTimelineCollectedStyles(s)),
        i.transformIntoNewTimeline(r),
        (i.previousNode = e);
    }
    _visitTiming(e, i) {
      if (e.dynamic) {
        let n = e.strValue,
          r = i.params ? Vs(n, i.params, i.errors) : n;
        return Vc(r, i.errors);
      } else return { duration: e.duration, delay: e.delay, easing: e.easing };
    }
    visitAnimate(e, i) {
      let n = (i.currentAnimateTimings = this._visitTiming(e.timings, i)),
        r = i.currentTimeline;
      n.delay && (i.incrementTime(n.delay), r.snapshotCurrentStyles());
      let o = e.style;
      o.type == 5
        ? this.visitKeyframes(o, i)
        : (i.incrementTime(n.duration),
          this.visitStyle(o, i),
          r.applyStylesToKeyframe()),
        (i.currentAnimateTimings = null),
        (i.previousNode = e);
    }
    visitStyle(e, i) {
      let n = i.currentTimeline,
        r = i.currentAnimateTimings;
      !r && n.hasCurrentStyleProperties() && n.forwardFrame();
      let o = (r && r.easing) || e.easing;
      e.isEmptyStep
        ? n.applyEmptyStep(o)
        : n.setStyles(e.styles, o, i.errors, i.options),
        (i.previousNode = e);
    }
    visitKeyframes(e, i) {
      let n = i.currentAnimateTimings,
        r = i.currentTimeline.duration,
        o = n.duration,
        a = i.createSubContext().currentTimeline;
      (a.easing = n.easing),
        e.styles.forEach((l) => {
          let c = l.offset || 0;
          a.forwardTime(c * o),
            a.setStyles(l.styles, l.easing, i.errors, i.options),
            a.applyStylesToKeyframe();
        }),
        i.currentTimeline.mergeTimelineCollectedStyles(a),
        i.transformIntoNewTimeline(r + o),
        (i.previousNode = e);
    }
    visitQuery(e, i) {
      let n = i.currentTimeline.currentTime,
        r = e.options || {},
        o = r.delay ? Pn(r.delay) : 0;
      o &&
        (i.previousNode.type === 6 ||
          (n == 0 && i.currentTimeline.hasCurrentStyleProperties())) &&
        (i.currentTimeline.snapshotCurrentStyles(), (i.previousNode = $c));
      let s = n,
        a = i.invokeQuery(
          e.selector,
          e.originalSelector,
          e.limit,
          e.includeSelf,
          !!r.optional,
          i.errors
        );
      i.currentQueryTotal = a.length;
      let l = null;
      a.forEach((c, d) => {
        i.currentQueryIndex = d;
        let u = i.createSubContext(e.options, c);
        o && u.delayNextStep(o),
          c === i.element && (l = u.currentTimeline),
          Et(this, e.animation, u),
          u.currentTimeline.applyStylesToKeyframe();
        let f = u.currentTimeline.currentTime;
        s = Math.max(s, f);
      }),
        (i.currentQueryIndex = 0),
        (i.currentQueryTotal = 0),
        i.transformIntoNewTimeline(s),
        l &&
          (i.currentTimeline.mergeTimelineCollectedStyles(l),
          i.currentTimeline.snapshotCurrentStyles()),
        (i.previousNode = e);
    }
    visitStagger(e, i) {
      let n = i.parentContext,
        r = i.currentTimeline,
        o = e.timings,
        s = Math.abs(o.duration),
        a = s * (i.currentQueryTotal - 1),
        l = s * i.currentQueryIndex;
      switch (o.duration < 0 ? "reverse" : o.easing) {
        case "reverse":
          l = a - l;
          break;
        case "full":
          l = n.currentStaggerTime;
          break;
      }
      let d = i.currentTimeline;
      l && d.delayNextStep(l);
      let u = d.currentTime;
      Et(this, e.animation, i),
        (i.previousNode = e),
        (n.currentStaggerTime =
          r.currentTime - u + (r.startTime - n.currentTimeline.startTime));
    }
  },
  $c = {},
  Fp = class t {
    constructor(e, i, n, r, o, s, a, l) {
      (this._driver = e),
        (this.element = i),
        (this.subInstructions = n),
        (this._enterClassName = r),
        (this._leaveClassName = o),
        (this.errors = s),
        (this.timelines = a),
        (this.parentContext = null),
        (this.currentAnimateTimings = null),
        (this.previousNode = $c),
        (this.subContextCount = 0),
        (this.options = {}),
        (this.currentQueryIndex = 0),
        (this.currentQueryTotal = 0),
        (this.currentStaggerTime = 0),
        (this.currentTimeline = l || new zc(this._driver, i, 0)),
        a.push(this.currentTimeline);
    }
    get params() {
      return this.options.params;
    }
    updateOptions(e, i) {
      if (!e) return;
      let n = e,
        r = this.options;
      n.duration != null && (r.duration = Pn(n.duration)),
        n.delay != null && (r.delay = Pn(n.delay));
      let o = n.params;
      if (o) {
        let s = r.params;
        s || (s = this.options.params = {}),
          Object.keys(o).forEach((a) => {
            (!i || !s.hasOwnProperty(a)) && (s[a] = Vs(o[a], s, this.errors));
          });
      }
    }
    _copyOptions() {
      let e = {};
      if (this.options) {
        let i = this.options.params;
        if (i) {
          let n = (e.params = {});
          Object.keys(i).forEach((r) => {
            n[r] = i[r];
          });
        }
      }
      return e;
    }
    createSubContext(e = null, i, n) {
      let r = i || this.element,
        o = new t(
          this._driver,
          r,
          this.subInstructions,
          this._enterClassName,
          this._leaveClassName,
          this.errors,
          this.timelines,
          this.currentTimeline.fork(r, n || 0)
        );
      return (
        (o.previousNode = this.previousNode),
        (o.currentAnimateTimings = this.currentAnimateTimings),
        (o.options = this._copyOptions()),
        o.updateOptions(e),
        (o.currentQueryIndex = this.currentQueryIndex),
        (o.currentQueryTotal = this.currentQueryTotal),
        (o.parentContext = this),
        this.subContextCount++,
        o
      );
    }
    transformIntoNewTimeline(e) {
      return (
        (this.previousNode = $c),
        (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
        this.timelines.push(this.currentTimeline),
        this.currentTimeline
      );
    }
    appendInstructionToTimeline(e, i, n) {
      let r = {
          duration: i ?? e.duration,
          delay: this.currentTimeline.currentTime + (n ?? 0) + e.delay,
          easing: "",
        },
        o = new Lp(
          this._driver,
          e.element,
          e.keyframes,
          e.preStyleProps,
          e.postStyleProps,
          r,
          e.stretchStartingKeyframe
        );
      return this.timelines.push(o), r;
    }
    incrementTime(e) {
      this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
    }
    delayNextStep(e) {
      e > 0 && this.currentTimeline.delayNextStep(e);
    }
    invokeQuery(e, i, n, r, o, s) {
      let a = [];
      if ((r && a.push(this.element), e.length > 0)) {
        (e = e.replace(u1, "." + this._enterClassName)),
          (e = e.replace(h1, "." + this._leaveClassName));
        let l = n != 1,
          c = this._driver.query(this.element, e, l);
        n !== 0 &&
          (c = n < 0 ? c.slice(c.length + n, c.length) : c.slice(0, n)),
          a.push(...c);
      }
      return !o && a.length == 0 && s.push(SN(i)), a;
    }
  },
  zc = class t {
    constructor(e, i, n, r) {
      (this._driver = e),
        (this.element = i),
        (this.startTime = n),
        (this._elementTimelineStylesLookup = r),
        (this.duration = 0),
        (this.easing = null),
        (this._previousKeyframe = new Map()),
        (this._currentKeyframe = new Map()),
        (this._keyframes = new Map()),
        (this._styleSummary = new Map()),
        (this._localTimelineStyles = new Map()),
        (this._pendingStyles = new Map()),
        (this._backFill = new Map()),
        (this._currentEmptyStepKeyframe = null),
        this._elementTimelineStylesLookup ||
          (this._elementTimelineStylesLookup = new Map()),
        (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(i)),
        this._globalTimelineStyles ||
          ((this._globalTimelineStyles = this._localTimelineStyles),
          this._elementTimelineStylesLookup.set(i, this._localTimelineStyles)),
        this._loadKeyframe();
    }
    containsAnimation() {
      switch (this._keyframes.size) {
        case 0:
          return !1;
        case 1:
          return this.hasCurrentStyleProperties();
        default:
          return !0;
      }
    }
    hasCurrentStyleProperties() {
      return this._currentKeyframe.size > 0;
    }
    get currentTime() {
      return this.startTime + this.duration;
    }
    delayNextStep(e) {
      let i = this._keyframes.size === 1 && this._pendingStyles.size;
      this.duration || i
        ? (this.forwardTime(this.currentTime + e),
          i && this.snapshotCurrentStyles())
        : (this.startTime += e);
    }
    fork(e, i) {
      return (
        this.applyStylesToKeyframe(),
        new t(
          this._driver,
          e,
          i || this.currentTime,
          this._elementTimelineStylesLookup
        )
      );
    }
    _loadKeyframe() {
      this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
        (this._currentKeyframe = this._keyframes.get(this.duration)),
        this._currentKeyframe ||
          ((this._currentKeyframe = new Map()),
          this._keyframes.set(this.duration, this._currentKeyframe));
    }
    forwardFrame() {
      (this.duration += c1), this._loadKeyframe();
    }
    forwardTime(e) {
      this.applyStylesToKeyframe(), (this.duration = e), this._loadKeyframe();
    }
    _updateStyle(e, i) {
      this._localTimelineStyles.set(e, i),
        this._globalTimelineStyles.set(e, i),
        this._styleSummary.set(e, { time: this.currentTime, value: i });
    }
    allowOnlyTimelineStyles() {
      return this._currentEmptyStepKeyframe !== this._currentKeyframe;
    }
    applyEmptyStep(e) {
      e && this._previousKeyframe.set("easing", e);
      for (let [i, n] of this._globalTimelineStyles)
        this._backFill.set(i, n || bn), this._currentKeyframe.set(i, bn);
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    }
    setStyles(e, i, n, r) {
      i && this._previousKeyframe.set("easing", i);
      let o = (r && r.params) || {},
        s = p1(e, this._globalTimelineStyles);
      for (let [a, l] of s) {
        let c = Vs(l, o, n);
        this._pendingStyles.set(a, c),
          this._localTimelineStyles.has(a) ||
            this._backFill.set(a, this._globalTimelineStyles.get(a) ?? bn),
          this._updateStyle(a, c);
      }
    }
    applyStylesToKeyframe() {
      this._pendingStyles.size != 0 &&
        (this._pendingStyles.forEach((e, i) => {
          this._currentKeyframe.set(i, e);
        }),
        this._pendingStyles.clear(),
        this._localTimelineStyles.forEach((e, i) => {
          this._currentKeyframe.has(i) || this._currentKeyframe.set(i, e);
        }));
    }
    snapshotCurrentStyles() {
      for (let [e, i] of this._localTimelineStyles)
        this._pendingStyles.set(e, i), this._updateStyle(e, i);
    }
    getFinalKeyframe() {
      return this._keyframes.get(this.duration);
    }
    get properties() {
      let e = [];
      for (let i in this._currentKeyframe) e.push(i);
      return e;
    }
    mergeTimelineCollectedStyles(e) {
      e._styleSummary.forEach((i, n) => {
        let r = this._styleSummary.get(n);
        (!r || i.time > r.time) && this._updateStyle(n, i.value);
      });
    }
    buildKeyframes() {
      this.applyStylesToKeyframe();
      let e = new Set(),
        i = new Set(),
        n = this._keyframes.size === 1 && this.duration === 0,
        r = [];
      this._keyframes.forEach((a, l) => {
        let c = oo(a, new Map(), this._backFill);
        c.forEach((d, u) => {
          d === Oc ? e.add(u) : d === bn && i.add(u);
        }),
          n || c.set("offset", l / this.duration),
          r.push(c);
      });
      let o = e.size ? Bc(e.values()) : [],
        s = i.size ? Bc(i.values()) : [];
      if (n) {
        let a = r[0],
          l = new Map(a);
        a.set("offset", 0), l.set("offset", 1), (r = [a, l]);
      }
      return Qp(
        this.element,
        r,
        o,
        s,
        this.duration,
        this.startTime,
        this.easing,
        !1
      );
    }
  },
  Lp = class extends zc {
    constructor(e, i, n, r, o, s, a = !1) {
      super(e, i, s.delay),
        (this.keyframes = n),
        (this.preStyleProps = r),
        (this.postStyleProps = o),
        (this._stretchStartingKeyframe = a),
        (this.timings = {
          duration: s.duration,
          delay: s.delay,
          easing: s.easing,
        });
    }
    containsAnimation() {
      return this.keyframes.length > 1;
    }
    buildKeyframes() {
      let e = this.keyframes,
        { delay: i, duration: n, easing: r } = this.timings;
      if (this._stretchStartingKeyframe && i) {
        let o = [],
          s = n + i,
          a = i / s,
          l = oo(e[0]);
        l.set("offset", 0), o.push(l);
        let c = oo(e[0]);
        c.set("offset", $0(a)), o.push(c);
        let d = e.length - 1;
        for (let u = 1; u <= d; u++) {
          let f = oo(e[u]),
            h = f.get("offset"),
            p = i + h * n;
          f.set("offset", $0(p / s)), o.push(f);
        }
        (n = s), (i = 0), (r = ""), (e = o);
      }
      return Qp(
        this.element,
        e,
        this.preStyleProps,
        this.postStyleProps,
        n,
        i,
        r,
        !0
      );
    }
  };
function $0(t, e = 3) {
  let i = Math.pow(10, e - 1);
  return Math.round(t * i) / i;
}
function p1(t, e) {
  let i = new Map(),
    n;
  return (
    t.forEach((r) => {
      if (r === "*") {
        n = n || e.keys();
        for (let o of n) i.set(o, bn);
      } else oo(r, i);
    }),
    i
  );
}
function z0(t, e, i, n, r, o, s, a, l, c, d, u, f) {
  return {
    type: 0,
    element: t,
    triggerName: e,
    isRemovalTransition: r,
    fromState: i,
    fromStyles: o,
    toState: n,
    toStyles: s,
    timelines: a,
    queriedElements: l,
    preStyleProps: c,
    postStyleProps: d,
    totalTime: u,
    errors: f,
  };
}
var Dp = {},
  qc = class {
    constructor(e, i, n) {
      (this._triggerName = e), (this.ast = i), (this._stateStyles = n);
    }
    match(e, i, n, r) {
      return m1(this.ast.matchers, e, i, n, r);
    }
    buildStyles(e, i, n) {
      let r = this._stateStyles.get("*");
      return (
        e !== void 0 && (r = this._stateStyles.get(e?.toString()) || r),
        r ? r.buildStyles(i, n) : new Map()
      );
    }
    build(e, i, n, r, o, s, a, l, c, d) {
      let u = [],
        f = (this.ast.options && this.ast.options.params) || Dp,
        h = (a && a.params) || Dp,
        p = this.buildStyles(n, h, u),
        m = (l && l.params) || Dp,
        g = this.buildStyles(r, m, u),
        b = new Set(),
        x = new Map(),
        P = new Map(),
        I = r === "void",
        re = { params: g1(m, f), delay: this.ast.options?.delay },
        H = d ? [] : ax(e, i, this.ast.animation, o, s, p, g, re, c, u),
        se = 0;
      if (
        (H.forEach((nt) => {
          se = Math.max(nt.duration + nt.delay, se);
        }),
        u.length)
      )
        return z0(i, this._triggerName, n, r, I, p, g, [], [], x, P, se, u);
      H.forEach((nt) => {
        let gt = nt.element,
          qm = Ct(x, gt, new Set());
        nt.preStyleProps.forEach((hi) => qm.add(hi));
        let Do = Ct(P, gt, new Set());
        nt.postStyleProps.forEach((hi) => Do.add(hi)), gt !== i && b.add(gt);
      });
      let Ue = Bc(b.values());
      return z0(i, this._triggerName, n, r, I, p, g, H, Ue, x, P, se);
    }
  };
function m1(t, e, i, n, r) {
  return t.some((o) => o(e, i, n, r));
}
function g1(t, e) {
  let i = zs(e);
  for (let n in t) t.hasOwnProperty(n) && t[n] != null && (i[n] = t[n]);
  return i;
}
var jp = class {
  constructor(e, i, n) {
    (this.styles = e), (this.defaultParams = i), (this.normalizer = n);
  }
  buildStyles(e, i) {
    let n = new Map(),
      r = zs(this.defaultParams);
    return (
      Object.keys(e).forEach((o) => {
        let s = e[o];
        s !== null && (r[o] = s);
      }),
      this.styles.styles.forEach((o) => {
        typeof o != "string" &&
          o.forEach((s, a) => {
            s && (s = Vs(s, r, i));
            let l = this.normalizer.normalizePropertyName(a, i);
            (s = this.normalizer.normalizeStyleValue(a, l, s, i)), n.set(a, s);
          });
      }),
      n
    );
  }
};
function b1(t, e, i) {
  return new Vp(t, e, i);
}
var Vp = class {
  constructor(e, i, n) {
    (this.name = e),
      (this.ast = i),
      (this._normalizer = n),
      (this.transitionFactories = []),
      (this.states = new Map()),
      i.states.forEach((r) => {
        let o = (r.options && r.options.params) || {};
        this.states.set(r.name, new jp(r.style, o, n));
      }),
      q0(this.states, "true", "1"),
      q0(this.states, "false", "0"),
      i.transitions.forEach((r) => {
        this.transitionFactories.push(new qc(e, r, this.states));
      }),
      (this.fallbackTransition = v1(e, this.states, this._normalizer));
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(e, i, n, r) {
    return this.transitionFactories.find((s) => s.match(e, i, n, r)) || null;
  }
  matchStyles(e, i, n) {
    return this.fallbackTransition.buildStyles(e, i, n);
  }
};
function v1(t, e, i) {
  let o = {
    type: 1,
    animation: { type: 2, steps: [], options: null },
    matchers: [(s, a) => !0],
    options: null,
    queryCount: 0,
    depCount: 0,
  };
  return new qc(t, o, e);
}
function q0(t, e, i) {
  t.has(e) ? t.has(i) || t.set(i, t.get(e)) : t.has(i) && t.set(e, t.get(i));
}
var y1 = new Bs(),
  Bp = class {
    constructor(e, i, n) {
      (this.bodyNode = e),
        (this._driver = i),
        (this._normalizer = n),
        (this._animations = new Map()),
        (this._playersById = new Map()),
        (this.players = []);
    }
    register(e, i) {
      let n = [],
        r = [],
        o = sx(this._driver, i, n, r);
      if (n.length) throw ON(n);
      r.length && void 0, this._animations.set(e, o);
    }
    _buildPlayer(e, i, n) {
      let r = e.element,
        o = K0(this._normalizer, e.keyframes, i, n);
      return this._driver.animate(r, o, e.duration, e.delay, e.easing, [], !0);
    }
    create(e, i, n = {}) {
      let r = [],
        o = this._animations.get(e),
        s,
        a = new Map();
      if (
        (o
          ? ((s = ax(
              this._driver,
              i,
              o,
              tx,
              Mp,
              new Map(),
              new Map(),
              n,
              y1,
              r
            )),
            s.forEach((d) => {
              let u = Ct(a, d.element, new Map());
              d.postStyleProps.forEach((f) => u.set(f, null));
            }))
          : (r.push(kN()), (s = [])),
        r.length)
      )
        throw NN(r);
      a.forEach((d, u) => {
        d.forEach((f, h) => {
          d.set(h, this._driver.computeStyle(u, h, bn));
        });
      });
      let l = s.map((d) => {
          let u = a.get(d.element);
          return this._buildPlayer(d, new Map(), u);
        }),
        c = di(l);
      return (
        this._playersById.set(e, c),
        c.onDestroy(() => this.destroy(e)),
        this.players.push(c),
        c
      );
    }
    destroy(e) {
      let i = this._getPlayer(e);
      i.destroy(), this._playersById.delete(e);
      let n = this.players.indexOf(i);
      n >= 0 && this.players.splice(n, 1);
    }
    _getPlayer(e) {
      let i = this._playersById.get(e);
      if (!i) throw PN(e);
      return i;
    }
    listen(e, i, n, r) {
      let o = qp(i, "", "", "");
      return zp(this._getPlayer(e), n, o, r), () => {};
    }
    command(e, i, n, r) {
      if (n == "register") {
        this.register(e, r[0]);
        return;
      }
      if (n == "create") {
        let s = r[0] || {};
        this.create(e, i, s);
        return;
      }
      let o = this._getPlayer(e);
      switch (n) {
        case "play":
          o.play();
          break;
        case "pause":
          o.pause();
          break;
        case "reset":
          o.reset();
          break;
        case "restart":
          o.restart();
          break;
        case "finish":
          o.finish();
          break;
        case "init":
          o.init();
          break;
        case "setPosition":
          o.setPosition(parseFloat(r[0]));
          break;
        case "destroy":
          this.destroy(e);
          break;
      }
    }
  },
  W0 = "ng-animate-queued",
  _1 = ".ng-animate-queued",
  Ip = "ng-animate-disabled",
  x1 = ".ng-animate-disabled",
  w1 = "ng-star-inserted",
  E1 = ".ng-star-inserted",
  C1 = [],
  lx = {
    namespaceId: "",
    setForRemoval: !1,
    setForMove: !1,
    hasAnimation: !1,
    removedBeforeQueried: !1,
  },
  D1 = {
    namespaceId: "",
    setForMove: !1,
    setForRemoval: !1,
    hasAnimation: !1,
    removedBeforeQueried: !0,
  },
  Gt = "__ng_removed",
  Us = class {
    get params() {
      return this.options.params;
    }
    constructor(e, i = "") {
      this.namespaceId = i;
      let n = e && e.hasOwnProperty("value"),
        r = n ? e.value : e;
      if (((this.value = S1(r)), n)) {
        let o = zs(e);
        delete o.value, (this.options = o);
      } else this.options = {};
      this.options.params || (this.options.params = {});
    }
    absorbOptions(e) {
      let i = e.params;
      if (i) {
        let n = this.options.params;
        Object.keys(i).forEach((r) => {
          n[r] == null && (n[r] = i[r]);
        });
      }
    }
  },
  js = "void",
  Sp = new Us(js),
  Up = class {
    constructor(e, i, n) {
      (this.id = e),
        (this.hostElement = i),
        (this._engine = n),
        (this.players = []),
        (this._triggers = new Map()),
        (this._queue = []),
        (this._elementListeners = new Map()),
        (this._hostClassName = "ng-tns-" + e),
        kt(i, this._hostClassName);
    }
    listen(e, i, n, r) {
      if (!this._triggers.has(i)) throw FN(n, i);
      if (n == null || n.length == 0) throw LN(i);
      if (!T1(n)) throw jN(n, i);
      let o = Ct(this._elementListeners, e, []),
        s = { name: i, phase: n, callback: r };
      o.push(s);
      let a = Ct(this._engine.statesByElement, e, new Map());
      return (
        a.has(i) || (kt(e, kc), kt(e, kc + "-" + i), a.set(i, Sp)),
        () => {
          this._engine.afterFlush(() => {
            let l = o.indexOf(s);
            l >= 0 && o.splice(l, 1), this._triggers.has(i) || a.delete(i);
          });
        }
      );
    }
    register(e, i) {
      return this._triggers.has(e) ? !1 : (this._triggers.set(e, i), !0);
    }
    _getTrigger(e) {
      let i = this._triggers.get(e);
      if (!i) throw VN(e);
      return i;
    }
    trigger(e, i, n, r = !0) {
      let o = this._getTrigger(i),
        s = new Hs(this.id, i, e),
        a = this._engine.statesByElement.get(e);
      a ||
        (kt(e, kc),
        kt(e, kc + "-" + i),
        this._engine.statesByElement.set(e, (a = new Map())));
      let l = a.get(i),
        c = new Us(n, this.id);
      if (
        (!(n && n.hasOwnProperty("value")) && l && c.absorbOptions(l.options),
        a.set(i, c),
        l || (l = Sp),
        !(c.value === js) && l.value === c.value)
      ) {
        if (!R1(l.params, c.params)) {
          let m = [],
            g = o.matchStyles(l.value, l.params, m),
            b = o.matchStyles(c.value, c.params, m);
          m.length
            ? this._engine.reportError(m)
            : this._engine.afterFlush(() => {
                ir(e, g), vn(e, b);
              });
        }
        return;
      }
      let f = Ct(this._engine.playersByElement, e, []);
      f.forEach((m) => {
        m.namespaceId == this.id &&
          m.triggerName == i &&
          m.queued &&
          m.destroy();
      });
      let h = o.matchTransition(l.value, c.value, e, c.params),
        p = !1;
      if (!h) {
        if (!r) return;
        (h = o.fallbackTransition), (p = !0);
      }
      return (
        this._engine.totalQueuedPlayers++,
        this._queue.push({
          element: e,
          triggerName: i,
          transition: h,
          fromState: l,
          toState: c,
          player: s,
          isFallbackTransition: p,
        }),
        p ||
          (kt(e, W0),
          s.onStart(() => {
            ro(e, W0);
          })),
        s.onDone(() => {
          let m = this.players.indexOf(s);
          m >= 0 && this.players.splice(m, 1);
          let g = this._engine.playersByElement.get(e);
          if (g) {
            let b = g.indexOf(s);
            b >= 0 && g.splice(b, 1);
          }
        }),
        this.players.push(s),
        f.push(s),
        s
      );
    }
    deregister(e) {
      this._triggers.delete(e),
        this._engine.statesByElement.forEach((i) => i.delete(e)),
        this._elementListeners.forEach((i, n) => {
          this._elementListeners.set(
            n,
            i.filter((r) => r.name != e)
          );
        });
    }
    clearElementCache(e) {
      this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
      let i = this._engine.playersByElement.get(e);
      i &&
        (i.forEach((n) => n.destroy()),
        this._engine.playersByElement.delete(e));
    }
    _signalRemovalForInnerTriggers(e, i) {
      let n = this._engine.driver.query(e, jc, !0);
      n.forEach((r) => {
        if (r[Gt]) return;
        let o = this._engine.fetchNamespacesByElement(r);
        o.size
          ? o.forEach((s) => s.triggerLeaveAnimation(r, i, !1, !0))
          : this.clearElementCache(r);
      }),
        this._engine.afterFlushAnimationsDone(() =>
          n.forEach((r) => this.clearElementCache(r))
        );
    }
    triggerLeaveAnimation(e, i, n, r) {
      let o = this._engine.statesByElement.get(e),
        s = new Map();
      if (o) {
        let a = [];
        if (
          (o.forEach((l, c) => {
            if ((s.set(c, l.value), this._triggers.has(c))) {
              let d = this.trigger(e, c, js, r);
              d && a.push(d);
            }
          }),
          a.length)
        )
          return (
            this._engine.markElementAsRemoved(this.id, e, !0, i, s),
            n && di(a).onDone(() => this._engine.processLeaveNode(e)),
            !0
          );
      }
      return !1;
    }
    prepareLeaveAnimationListeners(e) {
      let i = this._elementListeners.get(e),
        n = this._engine.statesByElement.get(e);
      if (i && n) {
        let r = new Set();
        i.forEach((o) => {
          let s = o.name;
          if (r.has(s)) return;
          r.add(s);
          let l = this._triggers.get(s).fallbackTransition,
            c = n.get(s) || Sp,
            d = new Us(js),
            u = new Hs(this.id, s, e);
          this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: s,
              transition: l,
              fromState: c,
              toState: d,
              player: u,
              isFallbackTransition: !0,
            });
        });
      }
    }
    removeNode(e, i) {
      let n = this._engine;
      if (
        (e.childElementCount && this._signalRemovalForInnerTriggers(e, i),
        this.triggerLeaveAnimation(e, i, !0))
      )
        return;
      let r = !1;
      if (n.totalAnimations) {
        let o = n.players.length ? n.playersByQueriedElement.get(e) : [];
        if (o && o.length) r = !0;
        else {
          let s = e;
          for (; (s = s.parentNode); )
            if (n.statesByElement.get(s)) {
              r = !0;
              break;
            }
        }
      }
      if ((this.prepareLeaveAnimationListeners(e), r))
        n.markElementAsRemoved(this.id, e, !1, i);
      else {
        let o = e[Gt];
        (!o || o === lx) &&
          (n.afterFlush(() => this.clearElementCache(e)),
          n.destroyInnerAnimations(e),
          n._onRemovalComplete(e, i));
      }
    }
    insertNode(e, i) {
      kt(e, this._hostClassName);
    }
    drainQueuedTransitions(e) {
      let i = [];
      return (
        this._queue.forEach((n) => {
          let r = n.player;
          if (r.destroyed) return;
          let o = n.element,
            s = this._elementListeners.get(o);
          s &&
            s.forEach((a) => {
              if (a.name == n.triggerName) {
                let l = qp(
                  o,
                  n.triggerName,
                  n.fromState.value,
                  n.toState.value
                );
                (l._data = e), zp(n.player, a.phase, l, a.callback);
              }
            }),
            r.markedForDestroy
              ? this._engine.afterFlush(() => {
                  r.destroy();
                })
              : i.push(n);
        }),
        (this._queue = []),
        i.sort((n, r) => {
          let o = n.transition.ast.depCount,
            s = r.transition.ast.depCount;
          return o == 0 || s == 0
            ? o - s
            : this._engine.driver.containsElement(n.element, r.element)
            ? 1
            : -1;
        })
      );
    }
    destroy(e) {
      this.players.forEach((i) => i.destroy()),
        this._signalRemovalForInnerTriggers(this.hostElement, e);
    }
  },
  Hp = class {
    _onRemovalComplete(e, i) {
      this.onRemovalComplete(e, i);
    }
    constructor(e, i, n) {
      (this.bodyNode = e),
        (this.driver = i),
        (this._normalizer = n),
        (this.players = []),
        (this.newHostElements = new Map()),
        (this.playersByElement = new Map()),
        (this.playersByQueriedElement = new Map()),
        (this.statesByElement = new Map()),
        (this.disabledNodes = new Set()),
        (this.totalAnimations = 0),
        (this.totalQueuedPlayers = 0),
        (this._namespaceLookup = {}),
        (this._namespaceList = []),
        (this._flushFns = []),
        (this._whenQuietFns = []),
        (this.namespacesByHostElement = new Map()),
        (this.collectedEnterElements = []),
        (this.collectedLeaveElements = []),
        (this.onRemovalComplete = (r, o) => {});
    }
    get queuedPlayers() {
      let e = [];
      return (
        this._namespaceList.forEach((i) => {
          i.players.forEach((n) => {
            n.queued && e.push(n);
          });
        }),
        e
      );
    }
    createNamespace(e, i) {
      let n = new Up(e, i, this);
      return (
        this.bodyNode && this.driver.containsElement(this.bodyNode, i)
          ? this._balanceNamespaceList(n, i)
          : (this.newHostElements.set(i, n), this.collectEnterElement(i)),
        (this._namespaceLookup[e] = n)
      );
    }
    _balanceNamespaceList(e, i) {
      let n = this._namespaceList,
        r = this.namespacesByHostElement;
      if (n.length - 1 >= 0) {
        let s = !1,
          a = this.driver.getParentElement(i);
        for (; a; ) {
          let l = r.get(a);
          if (l) {
            let c = n.indexOf(l);
            n.splice(c + 1, 0, e), (s = !0);
            break;
          }
          a = this.driver.getParentElement(a);
        }
        s || n.unshift(e);
      } else n.push(e);
      return r.set(i, e), e;
    }
    register(e, i) {
      let n = this._namespaceLookup[e];
      return n || (n = this.createNamespace(e, i)), n;
    }
    registerTrigger(e, i, n) {
      let r = this._namespaceLookup[e];
      r && r.register(i, n) && this.totalAnimations++;
    }
    destroy(e, i) {
      e &&
        (this.afterFlush(() => {}),
        this.afterFlushAnimationsDone(() => {
          let n = this._fetchNamespace(e);
          this.namespacesByHostElement.delete(n.hostElement);
          let r = this._namespaceList.indexOf(n);
          r >= 0 && this._namespaceList.splice(r, 1),
            n.destroy(i),
            delete this._namespaceLookup[e];
        }));
    }
    _fetchNamespace(e) {
      return this._namespaceLookup[e];
    }
    fetchNamespacesByElement(e) {
      let i = new Set(),
        n = this.statesByElement.get(e);
      if (n) {
        for (let r of n.values())
          if (r.namespaceId) {
            let o = this._fetchNamespace(r.namespaceId);
            o && i.add(o);
          }
      }
      return i;
    }
    trigger(e, i, n, r) {
      if (Fc(i)) {
        let o = this._fetchNamespace(e);
        if (o) return o.trigger(i, n, r), !0;
      }
      return !1;
    }
    insertNode(e, i, n, r) {
      if (!Fc(i)) return;
      let o = i[Gt];
      if (o && o.setForRemoval) {
        (o.setForRemoval = !1), (o.setForMove = !0);
        let s = this.collectedLeaveElements.indexOf(i);
        s >= 0 && this.collectedLeaveElements.splice(s, 1);
      }
      if (e) {
        let s = this._fetchNamespace(e);
        s && s.insertNode(i, n);
      }
      r && this.collectEnterElement(i);
    }
    collectEnterElement(e) {
      this.collectedEnterElements.push(e);
    }
    markElementAsDisabled(e, i) {
      i
        ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), kt(e, Ip))
        : this.disabledNodes.has(e) &&
          (this.disabledNodes.delete(e), ro(e, Ip));
    }
    removeNode(e, i, n) {
      if (Fc(i)) {
        let r = e ? this._fetchNamespace(e) : null;
        r ? r.removeNode(i, n) : this.markElementAsRemoved(e, i, !1, n);
        let o = this.namespacesByHostElement.get(i);
        o && o.id !== e && o.removeNode(i, n);
      } else this._onRemovalComplete(i, n);
    }
    markElementAsRemoved(e, i, n, r, o) {
      this.collectedLeaveElements.push(i),
        (i[Gt] = {
          namespaceId: e,
          setForRemoval: r,
          hasAnimation: n,
          removedBeforeQueried: !1,
          previousTriggersValues: o,
        });
    }
    listen(e, i, n, r, o) {
      return Fc(i) ? this._fetchNamespace(e).listen(i, n, r, o) : () => {};
    }
    _buildInstruction(e, i, n, r, o) {
      return e.transition.build(
        this.driver,
        e.element,
        e.fromState.value,
        e.toState.value,
        n,
        r,
        e.fromState.options,
        e.toState.options,
        i,
        o
      );
    }
    destroyInnerAnimations(e) {
      let i = this.driver.query(e, jc, !0);
      i.forEach((n) => this.destroyActiveAnimationsForElement(n)),
        this.playersByQueriedElement.size != 0 &&
          ((i = this.driver.query(e, Ap, !0)),
          i.forEach((n) => this.finishActiveQueriedAnimationOnElement(n)));
    }
    destroyActiveAnimationsForElement(e) {
      let i = this.playersByElement.get(e);
      i &&
        i.forEach((n) => {
          n.queued ? (n.markedForDestroy = !0) : n.destroy();
        });
    }
    finishActiveQueriedAnimationOnElement(e) {
      let i = this.playersByQueriedElement.get(e);
      i && i.forEach((n) => n.finish());
    }
    whenRenderingDone() {
      return new Promise((e) => {
        if (this.players.length) return di(this.players).onDone(() => e());
        e();
      });
    }
    processLeaveNode(e) {
      let i = e[Gt];
      if (i && i.setForRemoval) {
        if (((e[Gt] = lx), i.namespaceId)) {
          this.destroyInnerAnimations(e);
          let n = this._fetchNamespace(i.namespaceId);
          n && n.clearElementCache(e);
        }
        this._onRemovalComplete(e, i.setForRemoval);
      }
      e.classList?.contains(Ip) && this.markElementAsDisabled(e, !1),
        this.driver.query(e, x1, !0).forEach((n) => {
          this.markElementAsDisabled(n, !1);
        });
    }
    flush(e = -1) {
      let i = [];
      if (
        (this.newHostElements.size &&
          (this.newHostElements.forEach((n, r) =>
            this._balanceNamespaceList(n, r)
          ),
          this.newHostElements.clear()),
        this.totalAnimations && this.collectedEnterElements.length)
      )
        for (let n = 0; n < this.collectedEnterElements.length; n++) {
          let r = this.collectedEnterElements[n];
          kt(r, w1);
        }
      if (
        this._namespaceList.length &&
        (this.totalQueuedPlayers || this.collectedLeaveElements.length)
      ) {
        let n = [];
        try {
          i = this._flushAnimations(n, e);
        } finally {
          for (let r = 0; r < n.length; r++) n[r]();
        }
      } else
        for (let n = 0; n < this.collectedLeaveElements.length; n++) {
          let r = this.collectedLeaveElements[n];
          this.processLeaveNode(r);
        }
      if (
        ((this.totalQueuedPlayers = 0),
        (this.collectedEnterElements.length = 0),
        (this.collectedLeaveElements.length = 0),
        this._flushFns.forEach((n) => n()),
        (this._flushFns = []),
        this._whenQuietFns.length)
      ) {
        let n = this._whenQuietFns;
        (this._whenQuietFns = []),
          i.length
            ? di(i).onDone(() => {
                n.forEach((r) => r());
              })
            : n.forEach((r) => r());
      }
    }
    reportError(e) {
      throw BN(e);
    }
    _flushAnimations(e, i) {
      let n = new Bs(),
        r = [],
        o = new Map(),
        s = [],
        a = new Map(),
        l = new Map(),
        c = new Map(),
        d = new Set();
      this.disabledNodes.forEach((A) => {
        d.add(A);
        let k = this.driver.query(A, _1, !0);
        for (let j = 0; j < k.length; j++) d.add(k[j]);
      });
      let u = this.bodyNode,
        f = Array.from(this.statesByElement.keys()),
        h = Q0(f, this.collectedEnterElements),
        p = new Map(),
        m = 0;
      h.forEach((A, k) => {
        let j = tx + m++;
        p.set(k, j), A.forEach((oe) => kt(oe, j));
      });
      let g = [],
        b = new Set(),
        x = new Set();
      for (let A = 0; A < this.collectedLeaveElements.length; A++) {
        let k = this.collectedLeaveElements[A],
          j = k[Gt];
        j &&
          j.setForRemoval &&
          (g.push(k),
          b.add(k),
          j.hasAnimation
            ? this.driver.query(k, E1, !0).forEach((oe) => b.add(oe))
            : x.add(k));
      }
      let P = new Map(),
        I = Q0(f, Array.from(b));
      I.forEach((A, k) => {
        let j = Mp + m++;
        P.set(k, j), A.forEach((oe) => kt(oe, j));
      }),
        e.push(() => {
          h.forEach((A, k) => {
            let j = p.get(k);
            A.forEach((oe) => ro(oe, j));
          }),
            I.forEach((A, k) => {
              let j = P.get(k);
              A.forEach((oe) => ro(oe, j));
            }),
            g.forEach((A) => {
              this.processLeaveNode(A);
            });
        });
      let re = [],
        H = [];
      for (let A = this._namespaceList.length - 1; A >= 0; A--)
        this._namespaceList[A].drainQueuedTransitions(i).forEach((j) => {
          let oe = j.player,
            We = j.element;
          if ((re.push(oe), this.collectedEnterElements.length)) {
            let Xe = We[Gt];
            if (Xe && Xe.setForMove) {
              if (
                Xe.previousTriggersValues &&
                Xe.previousTriggersValues.has(j.triggerName)
              ) {
                let pi = Xe.previousTriggersValues.get(j.triggerName),
                  It = this.statesByElement.get(j.element);
                if (It && It.has(j.triggerName)) {
                  let ra = It.get(j.triggerName);
                  (ra.value = pi), It.set(j.triggerName, ra);
                }
              }
              oe.destroy();
              return;
            }
          }
          let Yt = !u || !this.driver.containsElement(u, We),
            bt = P.get(We),
            Vn = p.get(We),
            Te = this._buildInstruction(j, n, Vn, bt, Yt);
          if (Te.errors && Te.errors.length) {
            H.push(Te);
            return;
          }
          if (Yt) {
            oe.onStart(() => ir(We, Te.fromStyles)),
              oe.onDestroy(() => vn(We, Te.toStyles)),
              r.push(oe);
            return;
          }
          if (j.isFallbackTransition) {
            oe.onStart(() => ir(We, Te.fromStyles)),
              oe.onDestroy(() => vn(We, Te.toStyles)),
              r.push(oe);
            return;
          }
          let Ym = [];
          Te.timelines.forEach((Xe) => {
            (Xe.stretchStartingKeyframe = !0),
              this.disabledNodes.has(Xe.element) || Ym.push(Xe);
          }),
            (Te.timelines = Ym),
            n.append(We, Te.timelines);
          let zE = { instruction: Te, player: oe, element: We };
          s.push(zE),
            Te.queriedElements.forEach((Xe) => Ct(a, Xe, []).push(oe)),
            Te.preStyleProps.forEach((Xe, pi) => {
              if (Xe.size) {
                let It = l.get(pi);
                It || l.set(pi, (It = new Set())),
                  Xe.forEach((ra, zd) => It.add(zd));
              }
            }),
            Te.postStyleProps.forEach((Xe, pi) => {
              let It = c.get(pi);
              It || c.set(pi, (It = new Set())),
                Xe.forEach((ra, zd) => It.add(zd));
            });
        });
      if (H.length) {
        let A = [];
        H.forEach((k) => {
          A.push(UN(k.triggerName, k.errors));
        }),
          re.forEach((k) => k.destroy()),
          this.reportError(A);
      }
      let se = new Map(),
        Ue = new Map();
      s.forEach((A) => {
        let k = A.element;
        n.has(k) &&
          (Ue.set(k, k),
          this._beforeAnimationBuild(A.player.namespaceId, A.instruction, se));
      }),
        r.forEach((A) => {
          let k = A.element;
          this._getPreviousPlayers(
            k,
            !1,
            A.namespaceId,
            A.triggerName,
            null
          ).forEach((oe) => {
            Ct(se, k, []).push(oe), oe.destroy();
          });
        });
      let nt = g.filter((A) => Z0(A, l, c)),
        gt = new Map();
      Y0(gt, this.driver, x, c, bn).forEach((A) => {
        Z0(A, l, c) && nt.push(A);
      });
      let Do = new Map();
      h.forEach((A, k) => {
        Y0(Do, this.driver, new Set(A), l, Oc);
      }),
        nt.forEach((A) => {
          let k = gt.get(A),
            j = Do.get(A);
          gt.set(
            A,
            new Map([...(k?.entries() ?? []), ...(j?.entries() ?? [])])
          );
        });
      let hi = [],
        Wm = [],
        Gm = {};
      s.forEach((A) => {
        let { element: k, player: j, instruction: oe } = A;
        if (n.has(k)) {
          if (d.has(k)) {
            j.onDestroy(() => vn(k, oe.toStyles)),
              (j.disabled = !0),
              j.overrideTotalTime(oe.totalTime),
              r.push(j);
            return;
          }
          let We = Gm;
          if (Ue.size > 1) {
            let bt = k,
              Vn = [];
            for (; (bt = bt.parentNode); ) {
              let Te = Ue.get(bt);
              if (Te) {
                We = Te;
                break;
              }
              Vn.push(bt);
            }
            Vn.forEach((Te) => Ue.set(Te, We));
          }
          let Yt = this._buildAnimation(j.namespaceId, oe, se, o, Do, gt);
          if ((j.setRealPlayer(Yt), We === Gm)) hi.push(j);
          else {
            let bt = this.playersByElement.get(We);
            bt && bt.length && (j.parentPlayer = di(bt)), r.push(j);
          }
        } else
          ir(k, oe.fromStyles),
            j.onDestroy(() => vn(k, oe.toStyles)),
            Wm.push(j),
            d.has(k) && r.push(j);
      }),
        Wm.forEach((A) => {
          let k = o.get(A.element);
          if (k && k.length) {
            let j = di(k);
            A.setRealPlayer(j);
          }
        }),
        r.forEach((A) => {
          A.parentPlayer ? A.syncPlayerEvents(A.parentPlayer) : A.destroy();
        });
      for (let A = 0; A < g.length; A++) {
        let k = g[A],
          j = k[Gt];
        if ((ro(k, Mp), j && j.hasAnimation)) continue;
        let oe = [];
        if (a.size) {
          let Yt = a.get(k);
          Yt && Yt.length && oe.push(...Yt);
          let bt = this.driver.query(k, Ap, !0);
          for (let Vn = 0; Vn < bt.length; Vn++) {
            let Te = a.get(bt[Vn]);
            Te && Te.length && oe.push(...Te);
          }
        }
        let We = oe.filter((Yt) => !Yt.destroyed);
        We.length ? M1(this, k, We) : this.processLeaveNode(k);
      }
      return (
        (g.length = 0),
        hi.forEach((A) => {
          this.players.push(A),
            A.onDone(() => {
              A.destroy();
              let k = this.players.indexOf(A);
              this.players.splice(k, 1);
            }),
            A.play();
        }),
        hi
      );
    }
    afterFlush(e) {
      this._flushFns.push(e);
    }
    afterFlushAnimationsDone(e) {
      this._whenQuietFns.push(e);
    }
    _getPreviousPlayers(e, i, n, r, o) {
      let s = [];
      if (i) {
        let a = this.playersByQueriedElement.get(e);
        a && (s = a);
      } else {
        let a = this.playersByElement.get(e);
        if (a) {
          let l = !o || o == js;
          a.forEach((c) => {
            c.queued || (!l && c.triggerName != r) || s.push(c);
          });
        }
      }
      return (
        (n || r) &&
          (s = s.filter(
            (a) => !((n && n != a.namespaceId) || (r && r != a.triggerName))
          )),
        s
      );
    }
    _beforeAnimationBuild(e, i, n) {
      let r = i.triggerName,
        o = i.element,
        s = i.isRemovalTransition ? void 0 : e,
        a = i.isRemovalTransition ? void 0 : r;
      for (let l of i.timelines) {
        let c = l.element,
          d = c !== o,
          u = Ct(n, c, []);
        this._getPreviousPlayers(c, d, s, a, i.toState).forEach((h) => {
          let p = h.getRealPlayer();
          p.beforeDestroy && p.beforeDestroy(), h.destroy(), u.push(h);
        });
      }
      ir(o, i.fromStyles);
    }
    _buildAnimation(e, i, n, r, o, s) {
      let a = i.triggerName,
        l = i.element,
        c = [],
        d = new Set(),
        u = new Set(),
        f = i.timelines.map((p) => {
          let m = p.element;
          d.add(m);
          let g = m[Gt];
          if (g && g.removedBeforeQueried) return new ci(p.duration, p.delay);
          let b = m !== l,
            x = A1((n.get(m) || C1).map((se) => se.getRealPlayer())).filter(
              (se) => {
                let Ue = se;
                return Ue.element ? Ue.element === m : !1;
              }
            ),
            P = o.get(m),
            I = s.get(m),
            re = K0(this._normalizer, p.keyframes, P, I),
            H = this._buildPlayer(p, re, x);
          if ((p.subTimeline && r && u.add(m), b)) {
            let se = new Hs(e, a, m);
            se.setRealPlayer(H), c.push(se);
          }
          return H;
        });
      c.forEach((p) => {
        Ct(this.playersByQueriedElement, p.element, []).push(p),
          p.onDone(() => I1(this.playersByQueriedElement, p.element, p));
      }),
        d.forEach((p) => kt(p, B0));
      let h = di(f);
      return (
        h.onDestroy(() => {
          d.forEach((p) => ro(p, B0)), vn(l, i.toStyles);
        }),
        u.forEach((p) => {
          Ct(r, p, []).push(h);
        }),
        h
      );
    }
    _buildPlayer(e, i, n) {
      return i.length > 0
        ? this.driver.animate(e.element, i, e.duration, e.delay, e.easing, n)
        : new ci(e.duration, e.delay);
    }
  },
  Hs = class {
    constructor(e, i, n) {
      (this.namespaceId = e),
        (this.triggerName = i),
        (this.element = n),
        (this._player = new ci()),
        (this._containsRealPlayer = !1),
        (this._queuedCallbacks = new Map()),
        (this.destroyed = !1),
        (this.parentPlayer = null),
        (this.markedForDestroy = !1),
        (this.disabled = !1),
        (this.queued = !0),
        (this.totalTime = 0);
    }
    setRealPlayer(e) {
      this._containsRealPlayer ||
        ((this._player = e),
        this._queuedCallbacks.forEach((i, n) => {
          i.forEach((r) => zp(e, n, void 0, r));
        }),
        this._queuedCallbacks.clear(),
        (this._containsRealPlayer = !0),
        this.overrideTotalTime(e.totalTime),
        (this.queued = !1));
    }
    getRealPlayer() {
      return this._player;
    }
    overrideTotalTime(e) {
      this.totalTime = e;
    }
    syncPlayerEvents(e) {
      let i = this._player;
      i.triggerCallback && e.onStart(() => i.triggerCallback("start")),
        e.onDone(() => this.finish()),
        e.onDestroy(() => this.destroy());
    }
    _queueEvent(e, i) {
      Ct(this._queuedCallbacks, e, []).push(i);
    }
    onDone(e) {
      this.queued && this._queueEvent("done", e), this._player.onDone(e);
    }
    onStart(e) {
      this.queued && this._queueEvent("start", e), this._player.onStart(e);
    }
    onDestroy(e) {
      this.queued && this._queueEvent("destroy", e), this._player.onDestroy(e);
    }
    init() {
      this._player.init();
    }
    hasStarted() {
      return this.queued ? !1 : this._player.hasStarted();
    }
    play() {
      !this.queued && this._player.play();
    }
    pause() {
      !this.queued && this._player.pause();
    }
    restart() {
      !this.queued && this._player.restart();
    }
    finish() {
      this._player.finish();
    }
    destroy() {
      (this.destroyed = !0), this._player.destroy();
    }
    reset() {
      !this.queued && this._player.reset();
    }
    setPosition(e) {
      this.queued || this._player.setPosition(e);
    }
    getPosition() {
      return this.queued ? 0 : this._player.getPosition();
    }
    triggerCallback(e) {
      let i = this._player;
      i.triggerCallback && i.triggerCallback(e);
    }
  };
function I1(t, e, i) {
  let n = t.get(e);
  if (n) {
    if (n.length) {
      let r = n.indexOf(i);
      n.splice(r, 1);
    }
    n.length == 0 && t.delete(e);
  }
  return n;
}
function S1(t) {
  return t ?? null;
}
function Fc(t) {
  return t && t.nodeType === 1;
}
function T1(t) {
  return t == "start" || t == "done";
}
function G0(t, e) {
  let i = t.style.display;
  return (t.style.display = e ?? "none"), i;
}
function Y0(t, e, i, n, r) {
  let o = [];
  i.forEach((l) => o.push(G0(l)));
  let s = [];
  n.forEach((l, c) => {
    let d = new Map();
    l.forEach((u) => {
      let f = e.computeStyle(c, u, r);
      d.set(u, f), (!f || f.length == 0) && ((c[Gt] = D1), s.push(c));
    }),
      t.set(c, d);
  });
  let a = 0;
  return i.forEach((l) => G0(l, o[a++])), s;
}
function Q0(t, e) {
  let i = new Map();
  if ((t.forEach((a) => i.set(a, [])), e.length == 0)) return i;
  let n = 1,
    r = new Set(e),
    o = new Map();
  function s(a) {
    if (!a) return n;
    let l = o.get(a);
    if (l) return l;
    let c = a.parentNode;
    return i.has(c) ? (l = c) : r.has(c) ? (l = n) : (l = s(c)), o.set(a, l), l;
  }
  return (
    e.forEach((a) => {
      let l = s(a);
      l !== n && i.get(l).push(a);
    }),
    i
  );
}
function kt(t, e) {
  t.classList?.add(e);
}
function ro(t, e) {
  t.classList?.remove(e);
}
function M1(t, e, i) {
  di(i).onDone(() => t.processLeaveNode(e));
}
function A1(t) {
  let e = [];
  return cx(t, e), e;
}
function cx(t, e) {
  for (let i = 0; i < t.length; i++) {
    let n = t[i];
    n instanceof Fs ? cx(n.players, e) : e.push(n);
  }
}
function R1(t, e) {
  let i = Object.keys(t),
    n = Object.keys(e);
  if (i.length != n.length) return !1;
  for (let r = 0; r < i.length; r++) {
    let o = i[r];
    if (!e.hasOwnProperty(o) || t[o] !== e[o]) return !1;
  }
  return !0;
}
function Z0(t, e, i) {
  let n = i.get(t);
  if (!n) return !1;
  let r = e.get(t);
  return r ? n.forEach((o) => r.add(o)) : e.set(t, n), i.delete(t), !0;
}
var so = class {
  constructor(e, i, n) {
    (this._driver = i),
      (this._normalizer = n),
      (this._triggerCache = {}),
      (this.onRemovalComplete = (r, o) => {}),
      (this._transitionEngine = new Hp(e.body, i, n)),
      (this._timelineEngine = new Bp(e.body, i, n)),
      (this._transitionEngine.onRemovalComplete = (r, o) =>
        this.onRemovalComplete(r, o));
  }
  registerTrigger(e, i, n, r, o) {
    let s = e + "-" + r,
      a = this._triggerCache[s];
    if (!a) {
      let l = [],
        c = [],
        d = sx(this._driver, o, l, c);
      if (l.length) throw AN(r, l);
      c.length && void 0,
        (a = b1(r, d, this._normalizer)),
        (this._triggerCache[s] = a);
    }
    this._transitionEngine.registerTrigger(i, r, a);
  }
  register(e, i) {
    this._transitionEngine.register(e, i);
  }
  destroy(e, i) {
    this._transitionEngine.destroy(e, i);
  }
  onInsert(e, i, n, r) {
    this._transitionEngine.insertNode(e, i, n, r);
  }
  onRemove(e, i, n) {
    this._transitionEngine.removeNode(e, i, n);
  }
  disableAnimations(e, i) {
    this._transitionEngine.markElementAsDisabled(e, i);
  }
  process(e, i, n, r) {
    if (n.charAt(0) == "@") {
      let [o, s] = j0(n),
        a = r;
      this._timelineEngine.command(o, i, s, a);
    } else this._transitionEngine.trigger(e, i, n, r);
  }
  listen(e, i, n, r, o) {
    if (n.charAt(0) == "@") {
      let [s, a] = j0(n);
      return this._timelineEngine.listen(s, i, a, o);
    }
    return this._transitionEngine.listen(e, i, n, r, o);
  }
  flush(e = -1) {
    this._transitionEngine.flush(e);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(e) {
    this._transitionEngine.afterFlushAnimationsDone(e);
  }
};
function O1(t, e) {
  let i = null,
    n = null;
  return (
    Array.isArray(e) && e.length
      ? ((i = Tp(e[0])), e.length > 1 && (n = Tp(e[e.length - 1])))
      : e instanceof Map && (i = Tp(e)),
    i || n ? new k1(t, i, n) : null
  );
}
var k1 = (() => {
  let e = class e {
    constructor(n, r, o) {
      (this._element = n),
        (this._startStyles = r),
        (this._endStyles = o),
        (this._state = 0);
      let s = e.initialStylesByElement.get(n);
      s || e.initialStylesByElement.set(n, (s = new Map())),
        (this._initialStyles = s);
    }
    start() {
      this._state < 1 &&
        (this._startStyles &&
          vn(this._element, this._startStyles, this._initialStyles),
        (this._state = 1));
    }
    finish() {
      this.start(),
        this._state < 2 &&
          (vn(this._element, this._initialStyles),
          this._endStyles &&
            (vn(this._element, this._endStyles), (this._endStyles = null)),
          (this._state = 1));
    }
    destroy() {
      this.finish(),
        this._state < 3 &&
          (e.initialStylesByElement.delete(this._element),
          this._startStyles &&
            (ir(this._element, this._startStyles), (this._endStyles = null)),
          this._endStyles &&
            (ir(this._element, this._endStyles), (this._endStyles = null)),
          vn(this._element, this._initialStyles),
          (this._state = 3));
    }
  };
  e.initialStylesByElement = new WeakMap();
  let t = e;
  return t;
})();
function Tp(t) {
  let e = null;
  return (
    t.forEach((i, n) => {
      N1(n) && ((e = e || new Map()), e.set(n, i));
    }),
    e
  );
}
function N1(t) {
  return t === "display" || t === "position";
}
var Wc = class {
    constructor(e, i, n, r) {
      (this.element = e),
        (this.keyframes = i),
        (this.options = n),
        (this._specialStyles = r),
        (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._initialized = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this.time = 0),
        (this.parentPlayer = null),
        (this.currentSnapshot = new Map()),
        (this._duration = n.duration),
        (this._delay = n.delay || 0),
        (this.time = this._duration + this._delay);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    init() {
      this._buildPlayer(), this._preparePlayerBeforeStart();
    }
    _buildPlayer() {
      if (this._initialized) return;
      this._initialized = !0;
      let e = this.keyframes;
      (this.domPlayer = this._triggerWebAnimation(
        this.element,
        e,
        this.options
      )),
        (this._finalKeyframe = e.length ? e[e.length - 1] : new Map());
      let i = () => this._onFinish();
      this.domPlayer.addEventListener("finish", i),
        this.onDestroy(() => {
          this.domPlayer.removeEventListener("finish", i);
        });
    }
    _preparePlayerBeforeStart() {
      this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
    }
    _convertKeyframesToObject(e) {
      let i = [];
      return (
        e.forEach((n) => {
          i.push(Object.fromEntries(n));
        }),
        i
      );
    }
    _triggerWebAnimation(e, i, n) {
      return e.animate(this._convertKeyframesToObject(i), n);
    }
    onStart(e) {
      this._originalOnStartFns.push(e), this._onStartFns.push(e);
    }
    onDone(e) {
      this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    play() {
      this._buildPlayer(),
        this.hasStarted() ||
          (this._onStartFns.forEach((e) => e()),
          (this._onStartFns = []),
          (this._started = !0),
          this._specialStyles && this._specialStyles.start()),
        this.domPlayer.play();
    }
    pause() {
      this.init(), this.domPlayer.pause();
    }
    finish() {
      this.init(),
        this._specialStyles && this._specialStyles.finish(),
        this._onFinish(),
        this.domPlayer.finish();
    }
    reset() {
      this._resetDomPlayerState(),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    _resetDomPlayerState() {
      this.domPlayer && this.domPlayer.cancel();
    }
    restart() {
      this.reset(), this.play();
    }
    hasStarted() {
      return this._started;
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._resetDomPlayerState(),
        this._onFinish(),
        this._specialStyles && this._specialStyles.destroy(),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    setPosition(e) {
      this.domPlayer === void 0 && this.init(),
        (this.domPlayer.currentTime = e * this.time);
    }
    getPosition() {
      return +(this.domPlayer.currentTime ?? 0) / this.time;
    }
    get totalTime() {
      return this._delay + this._duration;
    }
    beforeDestroy() {
      let e = new Map();
      this.hasStarted() &&
        this._finalKeyframe.forEach((n, r) => {
          r !== "offset" && e.set(r, this._finished ? n : rx(this.element, r));
        }),
        (this.currentSnapshot = e);
    }
    triggerCallback(e) {
      let i = e === "start" ? this._onStartFns : this._onDoneFns;
      i.forEach((n) => n()), (i.length = 0);
    }
  },
  Gc = class {
    validateStyleProperty(e) {
      return !0;
    }
    validateAnimatableStyleProperty(e) {
      return !0;
    }
    matchesElement(e, i) {
      return !1;
    }
    containsElement(e, i) {
      return X0(e, i);
    }
    getParentElement(e) {
      return Wp(e);
    }
    query(e, i, n) {
      return J0(e, i, n);
    }
    computeStyle(e, i, n) {
      return window.getComputedStyle(e)[i];
    }
    animate(e, i, n, r, o, s = []) {
      let a = r == 0 ? "both" : "forwards",
        l = { duration: n, delay: r, fill: a };
      o && (l.easing = o);
      let c = new Map(),
        d = s.filter((h) => h instanceof Wc);
      XN(n, r) &&
        d.forEach((h) => {
          h.currentSnapshot.forEach((p, m) => c.set(m, p));
        });
      let u = QN(i).map((h) => oo(h));
      u = JN(e, u, c);
      let f = O1(e, u);
      return new Wc(e, u, l, f);
    }
  };
var Lc = "@",
  dx = "@.disabled",
  Yc = class {
    constructor(e, i, n, r) {
      (this.namespaceId = e),
        (this.delegate = i),
        (this.engine = n),
        (this._onDestroy = r),
        (this.ɵtype = 0);
    }
    get data() {
      return this.delegate.data;
    }
    destroyNode(e) {
      this.delegate.destroyNode?.(e);
    }
    destroy() {
      this.engine.destroy(this.namespaceId, this.delegate),
        this.engine.afterFlushAnimationsDone(() => {
          queueMicrotask(() => {
            this.delegate.destroy();
          });
        }),
        this._onDestroy?.();
    }
    createElement(e, i) {
      return this.delegate.createElement(e, i);
    }
    createComment(e) {
      return this.delegate.createComment(e);
    }
    createText(e) {
      return this.delegate.createText(e);
    }
    appendChild(e, i) {
      this.delegate.appendChild(e, i),
        this.engine.onInsert(this.namespaceId, i, e, !1);
    }
    insertBefore(e, i, n, r = !0) {
      this.delegate.insertBefore(e, i, n),
        this.engine.onInsert(this.namespaceId, i, e, r);
    }
    removeChild(e, i, n) {
      this.engine.onRemove(this.namespaceId, i, this.delegate);
    }
    selectRootElement(e, i) {
      return this.delegate.selectRootElement(e, i);
    }
    parentNode(e) {
      return this.delegate.parentNode(e);
    }
    nextSibling(e) {
      return this.delegate.nextSibling(e);
    }
    setAttribute(e, i, n, r) {
      this.delegate.setAttribute(e, i, n, r);
    }
    removeAttribute(e, i, n) {
      this.delegate.removeAttribute(e, i, n);
    }
    addClass(e, i) {
      this.delegate.addClass(e, i);
    }
    removeClass(e, i) {
      this.delegate.removeClass(e, i);
    }
    setStyle(e, i, n, r) {
      this.delegate.setStyle(e, i, n, r);
    }
    removeStyle(e, i, n) {
      this.delegate.removeStyle(e, i, n);
    }
    setProperty(e, i, n) {
      i.charAt(0) == Lc && i == dx
        ? this.disableAnimations(e, !!n)
        : this.delegate.setProperty(e, i, n);
    }
    setValue(e, i) {
      this.delegate.setValue(e, i);
    }
    listen(e, i, n) {
      return this.delegate.listen(e, i, n);
    }
    disableAnimations(e, i) {
      this.engine.disableAnimations(e, i);
    }
  },
  $p = class extends Yc {
    constructor(e, i, n, r, o) {
      super(i, n, r, o), (this.factory = e), (this.namespaceId = i);
    }
    setProperty(e, i, n) {
      i.charAt(0) == Lc
        ? i.charAt(1) == "." && i == dx
          ? ((n = n === void 0 ? !0 : !!n), this.disableAnimations(e, n))
          : this.engine.process(this.namespaceId, e, i.slice(1), n)
        : this.delegate.setProperty(e, i, n);
    }
    listen(e, i, n) {
      if (i.charAt(0) == Lc) {
        let r = P1(e),
          o = i.slice(1),
          s = "";
        return (
          o.charAt(0) != Lc && ([o, s] = F1(o)),
          this.engine.listen(this.namespaceId, r, o, s, (a) => {
            let l = a._data || -1;
            this.factory.scheduleListenerCallback(l, n, a);
          })
        );
      }
      return this.delegate.listen(e, i, n);
    }
  };
function P1(t) {
  switch (t) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return t;
  }
}
function F1(t) {
  let e = t.indexOf("."),
    i = t.substring(0, e),
    n = t.slice(e + 1);
  return [i, n];
}
var Qc = class {
  constructor(e, i, n) {
    (this.delegate = e),
      (this.engine = i),
      (this._zone = n),
      (this._currentId = 0),
      (this._microtaskId = 1),
      (this._animationCallbacksBuffer = []),
      (this._rendererCache = new Map()),
      (this._cdRecurDepth = 0),
      (i.onRemovalComplete = (r, o) => {
        let s = o?.parentNode(r);
        s && o.removeChild(s, r);
      });
  }
  createRenderer(e, i) {
    let n = "",
      r = this.delegate.createRenderer(e, i);
    if (!e || !i?.data?.animation) {
      let c = this._rendererCache,
        d = c.get(r);
      if (!d) {
        let u = () => c.delete(r);
        (d = new Yc(n, r, this.engine, u)), c.set(r, d);
      }
      return d;
    }
    let o = i.id,
      s = i.id + "-" + this._currentId;
    this._currentId++, this.engine.register(s, e);
    let a = (c) => {
      Array.isArray(c)
        ? c.forEach(a)
        : this.engine.registerTrigger(o, s, e, c.name, c);
    };
    return i.data.animation.forEach(a), new $p(this, s, r, this.engine);
  }
  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  scheduleListenerCallback(e, i, n) {
    if (e >= 0 && e < this._microtaskId) {
      this._zone.run(() => i(n));
      return;
    }
    let r = this._animationCallbacksBuffer;
    r.length == 0 &&
      queueMicrotask(() => {
        this._zone.run(() => {
          r.forEach((o) => {
            let [s, a] = o;
            s(a);
          }),
            (this._animationCallbacksBuffer = []);
        });
      }),
      r.push([i, n]);
  }
  end() {
    this._cdRecurDepth--,
      this._cdRecurDepth == 0 &&
        this._zone.runOutsideAngular(() => {
          this._scheduleCountTask(), this.engine.flush(this._microtaskId);
        }),
      this.delegate.end && this.delegate.end();
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};
var j1 = (() => {
  let e = class e extends so {
    constructor(n, r, o, s) {
      super(n, r, o);
    }
    ngOnDestroy() {
      this.flush();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(J), v($s), v(rr), v(fn));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
function V1() {
  return new Uc();
}
function B1(t, e, i) {
  return new Qc(t, e, i);
}
var ux = [
    { provide: rr, useFactory: V1 },
    { provide: so, useClass: j1 },
    { provide: Oi, useFactory: B1, deps: [$l, so, R] },
  ],
  U1 = [
    { provide: $s, useFactory: () => new Gc() },
    { provide: at, useValue: "BrowserAnimations" },
    ...ux,
  ],
  d8 = [
    { provide: $s, useClass: Gp },
    { provide: at, useValue: "NoopAnimations" },
    ...ux,
  ];
function fx() {
  return [...U1];
}
function H1() {
  return !0;
}
var $1 = new S("mat-sanity-checks", { providedIn: "root", factory: H1 }),
  ke = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._sanityChecks = r),
          (this._document = o),
          (this._hasDoneGlobalChecks = !1),
          n._applyBodyHighContrastModeCssClasses(),
          this._hasDoneGlobalChecks || (this._hasDoneGlobalChecks = !0);
      }
      _checkIsEnabled(n) {
        return Ps()
          ? !1
          : typeof this._sanityChecks == "boolean"
          ? this._sanityChecks
          : !!this._sanityChecks[n];
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(xp), v($1, 8), v(J));
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [li, li] }));
    let t = e;
    return t;
  })();
function Jp(t) {
  return class extends t {
    get disabled() {
      return this._disabled;
    }
    set disabled(e) {
      this._disabled = ze(e);
    }
    constructor(...e) {
      super(...e), (this._disabled = !1);
    }
  };
}
function em(t) {
  return class extends t {
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(e) {
      this._disableRipple = ze(e);
    }
    constructor(...e) {
      super(...e), (this._disableRipple = !1);
    }
  };
}
function tm(t, e = 0) {
  return class extends t {
    get tabIndex() {
      return this.disabled ? -1 : this._tabIndex;
    }
    set tabIndex(i) {
      this._tabIndex = i != null ? ai(i) : this.defaultTabIndex;
    }
    constructor(...i) {
      super(...i), (this._tabIndex = e), (this.defaultTabIndex = e);
    }
  };
}
function nm(t) {
  return class extends t {
    updateErrorState() {
      let e = this.errorState,
        i = this._parentFormGroup || this._parentForm,
        n = this.errorStateMatcher || this._defaultErrorStateMatcher,
        r = this.ngControl ? this.ngControl.control : null,
        o = n.isErrorState(r, i);
      o !== e && ((this.errorState = o), this.stateChanges.next());
    }
    constructor(...e) {
      super(...e), (this.errorState = !1);
    }
  };
}
var vx = (() => {
  let e = class e {
    isErrorState(n, r) {
      return !!(n && n.invalid && (n.touched || (r && r.submitted)));
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var Zp = class {
    constructor(e, i, n, r = !1) {
      (this._renderer = e),
        (this.element = i),
        (this.config = n),
        (this._animationForciblyDisabledThroughCss = r),
        (this.state = 3);
    }
    fadeOut() {
      this._renderer.fadeOutRipple(this);
    }
  },
  hx = gn({ passive: !0, capture: !0 }),
  Kp = class {
    constructor() {
      (this._events = new Map()),
        (this._delegateEventHandler = (e) => {
          let i = Wt(e);
          i &&
            this._events.get(e.type)?.forEach((n, r) => {
              (r === i || r.contains(i)) && n.forEach((o) => o.handleEvent(e));
            });
        });
    }
    addHandler(e, i, n, r) {
      let o = this._events.get(i);
      if (o) {
        let s = o.get(n);
        s ? s.add(r) : o.set(n, new Set([r]));
      } else
        this._events.set(i, new Map([[n, new Set([r])]])),
          e.runOutsideAngular(() => {
            document.addEventListener(i, this._delegateEventHandler, hx);
          });
    }
    removeHandler(e, i, n) {
      let r = this._events.get(e);
      if (!r) return;
      let o = r.get(i);
      o &&
        (o.delete(n),
        o.size === 0 && r.delete(i),
        r.size === 0 &&
          (this._events.delete(e),
          document.removeEventListener(e, this._delegateEventHandler, hx)));
    }
  },
  px = { enterDuration: 225, exitDuration: 150 },
  z1 = 800,
  mx = gn({ passive: !0, capture: !0 }),
  gx = ["mousedown", "touchstart"],
  bx = ["mouseup", "mouseleave", "touchend", "touchcancel"],
  qs = class qs {
    constructor(e, i, n, r) {
      (this._target = e),
        (this._ngZone = i),
        (this._platform = r),
        (this._isPointerDown = !1),
        (this._activeRipples = new Map()),
        (this._pointerUpEventsRegistered = !1),
        r.isBrowser && (this._containerElement = pt(n));
    }
    fadeInRipple(e, i, n = {}) {
      let r = (this._containerRect =
          this._containerRect ||
          this._containerElement.getBoundingClientRect()),
        o = C(C({}, px), n.animation);
      n.centered && ((e = r.left + r.width / 2), (i = r.top + r.height / 2));
      let s = n.radius || q1(e, i, r),
        a = e - r.left,
        l = i - r.top,
        c = o.enterDuration,
        d = document.createElement("div");
      d.classList.add("mat-ripple-element"),
        (d.style.left = `${a - s}px`),
        (d.style.top = `${l - s}px`),
        (d.style.height = `${s * 2}px`),
        (d.style.width = `${s * 2}px`),
        n.color != null && (d.style.backgroundColor = n.color),
        (d.style.transitionDuration = `${c}ms`),
        this._containerElement.appendChild(d);
      let u = window.getComputedStyle(d),
        f = u.transitionProperty,
        h = u.transitionDuration,
        p =
          f === "none" ||
          h === "0s" ||
          h === "0s, 0s" ||
          (r.width === 0 && r.height === 0),
        m = new Zp(this, d, n, p);
      (d.style.transform = "scale3d(1, 1, 1)"),
        (m.state = 0),
        n.persistent || (this._mostRecentTransientRipple = m);
      let g = null;
      return (
        !p &&
          (c || o.exitDuration) &&
          this._ngZone.runOutsideAngular(() => {
            let b = () => this._finishRippleTransition(m),
              x = () => this._destroyRipple(m);
            d.addEventListener("transitionend", b),
              d.addEventListener("transitioncancel", x),
              (g = { onTransitionEnd: b, onTransitionCancel: x });
          }),
        this._activeRipples.set(m, g),
        (p || !c) && this._finishRippleTransition(m),
        m
      );
    }
    fadeOutRipple(e) {
      if (e.state === 2 || e.state === 3) return;
      let i = e.element,
        n = C(C({}, px), e.config.animation);
      (i.style.transitionDuration = `${n.exitDuration}ms`),
        (i.style.opacity = "0"),
        (e.state = 2),
        (e._animationForciblyDisabledThroughCss || !n.exitDuration) &&
          this._finishRippleTransition(e);
    }
    fadeOutAll() {
      this._getActiveRipples().forEach((e) => e.fadeOut());
    }
    fadeOutAllNonPersistent() {
      this._getActiveRipples().forEach((e) => {
        e.config.persistent || e.fadeOut();
      });
    }
    setupTriggerEvents(e) {
      let i = pt(e);
      !this._platform.isBrowser ||
        !i ||
        i === this._triggerElement ||
        (this._removeTriggerEvents(),
        (this._triggerElement = i),
        gx.forEach((n) => {
          qs._eventManager.addHandler(this._ngZone, n, i, this);
        }));
    }
    handleEvent(e) {
      e.type === "mousedown"
        ? this._onMousedown(e)
        : e.type === "touchstart"
        ? this._onTouchStart(e)
        : this._onPointerUp(),
        this._pointerUpEventsRegistered ||
          (this._ngZone.runOutsideAngular(() => {
            bx.forEach((i) => {
              this._triggerElement.addEventListener(i, this, mx);
            });
          }),
          (this._pointerUpEventsRegistered = !0));
    }
    _finishRippleTransition(e) {
      e.state === 0
        ? this._startFadeOutTransition(e)
        : e.state === 2 && this._destroyRipple(e);
    }
    _startFadeOutTransition(e) {
      let i = e === this._mostRecentTransientRipple,
        { persistent: n } = e.config;
      (e.state = 1), !n && (!i || !this._isPointerDown) && e.fadeOut();
    }
    _destroyRipple(e) {
      let i = this._activeRipples.get(e) ?? null;
      this._activeRipples.delete(e),
        this._activeRipples.size || (this._containerRect = null),
        e === this._mostRecentTransientRipple &&
          (this._mostRecentTransientRipple = null),
        (e.state = 3),
        i !== null &&
          (e.element.removeEventListener("transitionend", i.onTransitionEnd),
          e.element.removeEventListener(
            "transitioncancel",
            i.onTransitionCancel
          )),
        e.element.remove();
    }
    _onMousedown(e) {
      let i = yp(e),
        n =
          this._lastTouchStartEvent &&
          Date.now() < this._lastTouchStartEvent + z1;
      !this._target.rippleDisabled &&
        !i &&
        !n &&
        ((this._isPointerDown = !0),
        this.fadeInRipple(e.clientX, e.clientY, this._target.rippleConfig));
    }
    _onTouchStart(e) {
      if (!this._target.rippleDisabled && !_p(e)) {
        (this._lastTouchStartEvent = Date.now()), (this._isPointerDown = !0);
        let i = e.changedTouches;
        if (i)
          for (let n = 0; n < i.length; n++)
            this.fadeInRipple(
              i[n].clientX,
              i[n].clientY,
              this._target.rippleConfig
            );
      }
    }
    _onPointerUp() {
      this._isPointerDown &&
        ((this._isPointerDown = !1),
        this._getActiveRipples().forEach((e) => {
          let i =
            e.state === 1 || (e.config.terminateOnPointerUp && e.state === 0);
          !e.config.persistent && i && e.fadeOut();
        }));
    }
    _getActiveRipples() {
      return Array.from(this._activeRipples.keys());
    }
    _removeTriggerEvents() {
      let e = this._triggerElement;
      e &&
        (gx.forEach((i) => qs._eventManager.removeHandler(i, e, this)),
        this._pointerUpEventsRegistered &&
          bx.forEach((i) => e.removeEventListener(i, this, mx)));
    }
  };
qs._eventManager = new Kp();
var Xp = qs;
function q1(t, e, i) {
  let n = Math.max(Math.abs(t - i.left), Math.abs(t - i.right)),
    r = Math.max(Math.abs(e - i.top), Math.abs(e - i.bottom));
  return Math.sqrt(n * n + r * r);
}
var im = new S("mat-ripple-global-options"),
  rm = (() => {
    let e = class e {
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        n && this.fadeOutAllNonPersistent(),
          (this._disabled = n),
          this._setupTriggerEventsIfEnabled();
      }
      get trigger() {
        return this._trigger || this._elementRef.nativeElement;
      }
      set trigger(n) {
        (this._trigger = n), this._setupTriggerEventsIfEnabled();
      }
      constructor(n, r, o, s, a) {
        (this._elementRef = n),
          (this._animationMode = a),
          (this.radius = 0),
          (this._disabled = !1),
          (this._isInitialized = !1),
          (this._globalOptions = s || {}),
          (this._rippleRenderer = new Xp(this, r, n, o));
      }
      ngOnInit() {
        (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
      }
      ngOnDestroy() {
        this._rippleRenderer._removeTriggerEvents();
      }
      fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
      }
      fadeOutAllNonPersistent() {
        this._rippleRenderer.fadeOutAllNonPersistent();
      }
      get rippleConfig() {
        return {
          centered: this.centered,
          radius: this.radius,
          color: this.color,
          animation: C(
            C(
              C({}, this._globalOptions.animation),
              this._animationMode === "NoopAnimations"
                ? { enterDuration: 0, exitDuration: 0 }
                : {}
            ),
            this.animation
          ),
          terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
        };
      }
      get rippleDisabled() {
        return this.disabled || !!this._globalOptions.disabled;
      }
      _setupTriggerEventsIfEnabled() {
        !this.disabled &&
          this._isInitialized &&
          this._rippleRenderer.setupTriggerEvents(this.trigger);
      }
      launch(n, r = 0, o) {
        return typeof n == "number"
          ? this._rippleRenderer.fadeInRipple(
              n,
              r,
              C(C({}, this.rippleConfig), o)
            )
          : this._rippleRenderer.fadeInRipple(
              0,
              0,
              C(C({}, this.rippleConfig), n)
            );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z), y(R), y(Ce), y(im, 8), y(at, 8));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["", "mat-ripple", ""],
          ["", "matRipple", ""],
        ],
        hostAttrs: [1, "mat-ripple"],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && Ie("mat-ripple-unbounded", o.unbounded);
        },
        inputs: {
          color: ["matRippleColor", "color"],
          unbounded: ["matRippleUnbounded", "unbounded"],
          centered: ["matRippleCentered", "centered"],
          radius: ["matRippleRadius", "radius"],
          animation: ["matRippleAnimation", "animation"],
          disabled: ["matRippleDisabled", "disabled"],
          trigger: ["matRippleTrigger", "trigger"],
        },
        exportAs: ["matRipple"],
      }));
    let t = e;
    return t;
  })(),
  Ws = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [ke, ke] }));
    let t = e;
    return t;
  })();
var W1 = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({ imports: [ke] }));
  let t = e;
  return t;
})();
var om = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({ imports: [Ws, ke, W1] }));
  let t = e;
  return t;
})();
var sm = class {
    constructor(e) {
      (this._box = e),
        (this._destroyed = new F()),
        (this._resizeSubject = new F()),
        (this._elementObservables = new Map()),
        typeof ResizeObserver < "u" &&
          (this._resizeObserver = new ResizeObserver((i) =>
            this._resizeSubject.next(i)
          ));
    }
    observe(e) {
      return (
        this._elementObservables.has(e) ||
          this._elementObservables.set(
            e,
            new U((i) => {
              let n = this._resizeSubject.subscribe(i);
              return (
                this._resizeObserver?.observe(e, { box: this._box }),
                () => {
                  this._resizeObserver?.unobserve(e),
                    n.unsubscribe(),
                    this._elementObservables.delete(e);
                }
              );
            }).pipe(
              De((i) => i.some((n) => n.target === e)),
              Fa({ bufferSize: 1, refCount: !0 }),
              Se(this._destroyed)
            )
          ),
        this._elementObservables.get(e)
      );
    }
    destroy() {
      this._destroyed.next(),
        this._destroyed.complete(),
        this._resizeSubject.complete(),
        this._elementObservables.clear();
    }
  },
  _x = (() => {
    let e = class e {
      constructor() {
        (this._observers = new Map()),
          (this._ngZone = w(R)),
          typeof ResizeObserver < "u";
      }
      ngOnDestroy() {
        for (let [, n] of this._observers) n.destroy();
        this._observers.clear(), typeof ResizeObserver < "u";
      }
      observe(n, r) {
        let o = r?.box || "content-box";
        return (
          this._observers.has(o) || this._observers.set(o, new sm(o)),
          this._observers.get(o).observe(n)
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var G1 = ["notch"],
  Y1 = ["matFormFieldNotchedOutline", ""],
  Q1 = ["*"],
  Z1 = ["textField"],
  K1 = ["iconPrefixContainer"],
  X1 = ["textPrefixContainer"];
function J1(t, e) {
  t & 1 && ve(0, "span", 16);
}
function eP(t, e) {
  if (
    (t & 1 && (M(0, "label", 14), He(1, 1), ge(2, J1, 1, 0, "span", 15), T()),
    t & 2)
  ) {
    let i = pe(2);
    de("floating", i._shouldLabelFloat())("monitorResize", i._hasOutline())(
      "id",
      i._labelId
    ),
      je("for", i._control.id),
      O(2),
      be(2, !i.hideRequiredMarker && i._control.required ? 2 : -1);
  }
}
function tP(t, e) {
  if ((t & 1 && ge(0, eP, 3, 5, "label", 14), t & 2)) {
    let i = pe();
    be(0, i._hasFloatingLabel() ? 0 : -1);
  }
}
function nP(t, e) {
  t & 1 && ve(0, "div", 17);
}
function iP(t, e) {}
function rP(t, e) {
  if ((t & 1 && ge(0, iP, 0, 0, "ng-template", 9), t & 2)) {
    pe(2);
    let i = Bi(1);
    de("ngTemplateOutlet", i);
  }
}
function oP(t, e) {
  if ((t & 1 && (M(0, "div", 5), ge(1, rP, 1, 1, null, 9), T()), t & 2)) {
    let i = pe();
    de("matFormFieldNotchedOutlineOpen", i._shouldLabelFloat()),
      O(1),
      be(1, i._forceDisplayInfixLabel() ? -1 : 1);
  }
}
function sP(t, e) {
  t & 1 && (M(0, "div", 18, 19), He(2, 2), T());
}
function aP(t, e) {
  t & 1 && (M(0, "div", 20, 21), He(2, 3), T());
}
function lP(t, e) {}
function cP(t, e) {
  if ((t & 1 && ge(0, lP, 0, 0, "ng-template", 9), t & 2)) {
    pe();
    let i = Bi(1);
    de("ngTemplateOutlet", i);
  }
}
function dP(t, e) {
  t & 1 && (M(0, "div", 22), He(1, 4), T());
}
function uP(t, e) {
  t & 1 && (M(0, "div", 23), He(1, 5), T());
}
function fP(t, e) {
  t & 1 && ve(0, "div", 12);
}
function hP(t, e) {
  if ((t & 1 && (M(0, "div", 24), He(1, 6), T()), t & 2)) {
    let i = pe();
    de("@transitionMessages", i._subscriptAnimationState);
  }
}
function pP(t, e) {
  if ((t & 1 && (M(0, "mat-hint", 26), ie(1), T()), t & 2)) {
    let i = pe(2);
    de("id", i._hintLabelId), O(1), ct(i.hintLabel);
  }
}
function mP(t, e) {
  if (
    (t & 1 &&
      (M(0, "div", 25),
      ge(1, pP, 2, 2, "mat-hint", 26),
      He(2, 7),
      ve(3, "div", 27),
      He(4, 8),
      T()),
    t & 2)
  ) {
    let i = pe();
    de("@transitionMessages", i._subscriptAnimationState),
      O(1),
      be(1, i.hintLabel ? 1 : -1);
  }
}
var gP = [
    "*",
    [["mat-label"]],
    [
      ["", "matPrefix", ""],
      ["", "matIconPrefix", ""],
    ],
    [["", "matTextPrefix", ""]],
    [["", "matTextSuffix", ""]],
    [
      ["", "matSuffix", ""],
      ["", "matIconSuffix", ""],
    ],
    [["mat-error"], ["", "matError", ""]],
    [["mat-hint", 3, "align", "end"]],
    [["mat-hint", "align", "end"]],
  ],
  bP = [
    "*",
    "mat-label",
    "[matPrefix], [matIconPrefix]",
    "[matTextPrefix]",
    "[matTextSuffix]",
    "[matSuffix], [matIconSuffix]",
    "mat-error, [matError]",
    "mat-hint:not([align='end'])",
    "mat-hint[align='end']",
  ],
  ao = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = W({ type: e, selectors: [["mat-label"]] }));
    let t = e;
    return t;
  })();
var vP = new S("MatError");
var yP = 0,
  xx = (() => {
    let e = class e {
      constructor() {
        (this.align = "start"), (this.id = `mat-mdc-hint-${yP++}`);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["mat-hint"]],
        hostAttrs: [
          1,
          "mat-mdc-form-field-hint",
          "mat-mdc-form-field-bottom-align",
        ],
        hostVars: 4,
        hostBindings: function (r, o) {
          r & 2 &&
            (Vr("id", o.id),
            je("align", null),
            Ie("mat-mdc-form-field-hint-end", o.align === "end"));
        },
        inputs: { align: "align", id: "id" },
      }));
    let t = e;
    return t;
  })(),
  _P = new S("MatPrefix");
var xP = new S("MatSuffix");
var Mx = new S("FloatingLabelParent"),
  wx = (() => {
    let e = class e {
      get floating() {
        return this._floating;
      }
      set floating(n) {
        (this._floating = n), this.monitorResize && this._handleResize();
      }
      get monitorResize() {
        return this._monitorResize;
      }
      set monitorResize(n) {
        (this._monitorResize = n),
          this._monitorResize
            ? this._subscribeToResize()
            : this._resizeSubscription.unsubscribe();
      }
      constructor(n) {
        (this._elementRef = n),
          (this._floating = !1),
          (this._monitorResize = !1),
          (this._resizeObserver = w(_x)),
          (this._ngZone = w(R)),
          (this._parent = w(Mx)),
          (this._resizeSubscription = new ce());
      }
      ngOnDestroy() {
        this._resizeSubscription.unsubscribe();
      }
      getWidth() {
        return wP(this._elementRef.nativeElement);
      }
      get element() {
        return this._elementRef.nativeElement;
      }
      _handleResize() {
        setTimeout(() => this._parent._handleLabelResized());
      }
      _subscribeToResize() {
        this._resizeSubscription.unsubscribe(),
          this._ngZone.runOutsideAngular(() => {
            this._resizeSubscription = this._resizeObserver
              .observe(this._elementRef.nativeElement, { box: "border-box" })
              .subscribe(() => this._handleResize());
          });
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["label", "matFormFieldFloatingLabel", ""]],
        hostAttrs: [1, "mdc-floating-label", "mat-mdc-floating-label"],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && Ie("mdc-floating-label--float-above", o.floating);
        },
        inputs: { floating: "floating", monitorResize: "monitorResize" },
      }));
    let t = e;
    return t;
  })();
function wP(t) {
  let e = t;
  if (e.offsetParent !== null) return e.scrollWidth;
  let i = e.cloneNode(!0);
  i.style.setProperty("position", "absolute"),
    i.style.setProperty("transform", "translate(-9999px, -9999px)"),
    document.documentElement.appendChild(i);
  let n = i.scrollWidth;
  return i.remove(), n;
}
var Ex = "mdc-line-ripple--active",
  Zc = "mdc-line-ripple--deactivating",
  Cx = (() => {
    let e = class e {
      constructor(n, r) {
        (this._elementRef = n),
          (this._handleTransitionEnd = (o) => {
            let s = this._elementRef.nativeElement.classList,
              a = s.contains(Zc);
            o.propertyName === "opacity" && a && s.remove(Ex, Zc);
          }),
          r.runOutsideAngular(() => {
            n.nativeElement.addEventListener(
              "transitionend",
              this._handleTransitionEnd
            );
          });
      }
      activate() {
        let n = this._elementRef.nativeElement.classList;
        n.remove(Zc), n.add(Ex);
      }
      deactivate() {
        this._elementRef.nativeElement.classList.add(Zc);
      }
      ngOnDestroy() {
        this._elementRef.nativeElement.removeEventListener(
          "transitionend",
          this._handleTransitionEnd
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z), y(R));
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [["div", "matFormFieldLineRipple", ""]],
        hostAttrs: [1, "mdc-line-ripple"],
      }));
    let t = e;
    return t;
  })(),
  Dx = (() => {
    let e = class e {
      constructor(n, r) {
        (this._elementRef = n), (this._ngZone = r), (this.open = !1);
      }
      ngAfterViewInit() {
        let n = this._elementRef.nativeElement.querySelector(
          ".mdc-floating-label"
        );
        n
          ? (this._elementRef.nativeElement.classList.add(
              "mdc-notched-outline--upgraded"
            ),
            typeof requestAnimationFrame == "function" &&
              ((n.style.transitionDuration = "0s"),
              this._ngZone.runOutsideAngular(() => {
                requestAnimationFrame(() => (n.style.transitionDuration = ""));
              })))
          : this._elementRef.nativeElement.classList.add(
              "mdc-notched-outline--no-label"
            );
      }
      _setNotchWidth(n) {
        !this.open || !n
          ? (this._notch.nativeElement.style.width = "")
          : (this._notch.nativeElement.style.width = `calc(${n}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + ${
              8 + 1
            }px)`);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z), y(R));
    }),
      (e.ɵcmp = Re({
        type: e,
        selectors: [["div", "matFormFieldNotchedOutline", ""]],
        viewQuery: function (r, o) {
          if ((r & 1 && Ke(G1, 5), r & 2)) {
            let s;
            _e((s = xe())) && (o._notch = s.first);
          }
        },
        hostAttrs: [1, "mdc-notched-outline"],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && Ie("mdc-notched-outline--notched", o.open);
        },
        inputs: { open: ["matFormFieldNotchedOutlineOpen", "open"] },
        attrs: Y1,
        ngContentSelectors: Q1,
        decls: 5,
        vars: 0,
        consts: [
          [1, "mdc-notched-outline__leading"],
          [1, "mdc-notched-outline__notch"],
          ["notch", ""],
          [1, "mdc-notched-outline__trailing"],
        ],
        template: function (r, o) {
          r & 1 &&
            (zt(),
            ve(0, "div", 0),
            M(1, "div", 1, 2),
            He(3),
            T(),
            ve(4, "div", 3));
        },
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  EP = {
    transitionMessages: O0("transitionMessages", [
      P0("enter", io({ opacity: 1, transform: "translateY(0%)" })),
      F0("void => enter", [
        io({ opacity: 0, transform: "translateY(-5px)" }),
        k0("300ms cubic-bezier(0.55, 0, 0.55, 0.2)"),
      ]),
    ]),
  },
  Kc = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵdir = W({ type: e }));
    let t = e;
    return t;
  })();
var Xc = new S("MatFormField"),
  CP = new S("MAT_FORM_FIELD_DEFAULT_OPTIONS"),
  Ix = 0,
  Sx = "fill",
  DP = "auto",
  Tx = "fixed",
  IP = "translateY(-50%)",
  Jc = (() => {
    let e = class e {
      get hideRequiredMarker() {
        return this._hideRequiredMarker;
      }
      set hideRequiredMarker(n) {
        this._hideRequiredMarker = ze(n);
      }
      get floatLabel() {
        return this._floatLabel || this._defaults?.floatLabel || DP;
      }
      set floatLabel(n) {
        n !== this._floatLabel &&
          ((this._floatLabel = n), this._changeDetectorRef.markForCheck());
      }
      get appearance() {
        return this._appearance;
      }
      set appearance(n) {
        let r = this._appearance,
          o = n || this._defaults?.appearance || Sx;
        (this._appearance = o),
          this._appearance === "outline" &&
            this._appearance !== r &&
            (this._needsOutlineLabelOffsetUpdateOnStable = !0);
      }
      get subscriptSizing() {
        return this._subscriptSizing || this._defaults?.subscriptSizing || Tx;
      }
      set subscriptSizing(n) {
        this._subscriptSizing = n || this._defaults?.subscriptSizing || Tx;
      }
      get hintLabel() {
        return this._hintLabel;
      }
      set hintLabel(n) {
        (this._hintLabel = n), this._processHints();
      }
      get _control() {
        return this._explicitFormFieldControl || this._formFieldControl;
      }
      set _control(n) {
        this._explicitFormFieldControl = n;
      }
      constructor(n, r, o, s, a, l, c, d) {
        (this._elementRef = n),
          (this._changeDetectorRef = r),
          (this._ngZone = o),
          (this._dir = s),
          (this._platform = a),
          (this._defaults = l),
          (this._animationMode = c),
          (this._hideRequiredMarker = !1),
          (this.color = "primary"),
          (this._appearance = Sx),
          (this._subscriptSizing = null),
          (this._hintLabel = ""),
          (this._hasIconPrefix = !1),
          (this._hasTextPrefix = !1),
          (this._hasIconSuffix = !1),
          (this._hasTextSuffix = !1),
          (this._labelId = `mat-mdc-form-field-label-${Ix++}`),
          (this._hintLabelId = `mat-mdc-hint-${Ix++}`),
          (this._subscriptAnimationState = ""),
          (this._destroyed = new F()),
          (this._isFocused = null),
          (this._needsOutlineLabelOffsetUpdateOnStable = !1),
          l &&
            (l.appearance && (this.appearance = l.appearance),
            (this._hideRequiredMarker = !!l?.hideRequiredMarker),
            l.color && (this.color = l.color));
      }
      ngAfterViewInit() {
        this._updateFocusState(),
          (this._subscriptAnimationState = "enter"),
          this._changeDetectorRef.detectChanges();
      }
      ngAfterContentInit() {
        this._assertFormFieldControl(),
          this._initializeControl(),
          this._initializeSubscript(),
          this._initializePrefixAndSuffix(),
          this._initializeOutlineLabelOffsetSubscriptions();
      }
      ngAfterContentChecked() {
        this._assertFormFieldControl();
      }
      ngOnDestroy() {
        this._destroyed.next(), this._destroyed.complete();
      }
      getLabelId() {
        return this._hasFloatingLabel() ? this._labelId : null;
      }
      getConnectedOverlayOrigin() {
        return this._textField || this._elementRef;
      }
      _animateAndLockLabel() {
        this._hasFloatingLabel() && (this.floatLabel = "always");
      }
      _initializeControl() {
        let n = this._control;
        n.controlType &&
          this._elementRef.nativeElement.classList.add(
            `mat-mdc-form-field-type-${n.controlType}`
          ),
          n.stateChanges.subscribe(() => {
            this._updateFocusState(),
              this._syncDescribedByIds(),
              this._changeDetectorRef.markForCheck();
          }),
          n.ngControl &&
            n.ngControl.valueChanges &&
            n.ngControl.valueChanges
              .pipe(Se(this._destroyed))
              .subscribe(() => this._changeDetectorRef.markForCheck());
      }
      _checkPrefixAndSuffixTypes() {
        (this._hasIconPrefix = !!this._prefixChildren.find((n) => !n._isText)),
          (this._hasTextPrefix = !!this._prefixChildren.find((n) => n._isText)),
          (this._hasIconSuffix = !!this._suffixChildren.find(
            (n) => !n._isText
          )),
          (this._hasTextSuffix = !!this._suffixChildren.find((n) => n._isText));
      }
      _initializePrefixAndSuffix() {
        this._checkPrefixAndSuffixTypes(),
          Hn(
            this._prefixChildren.changes,
            this._suffixChildren.changes
          ).subscribe(() => {
            this._checkPrefixAndSuffixTypes(),
              this._changeDetectorRef.markForCheck();
          });
      }
      _initializeSubscript() {
        this._hintChildren.changes.subscribe(() => {
          this._processHints(), this._changeDetectorRef.markForCheck();
        }),
          this._errorChildren.changes.subscribe(() => {
            this._syncDescribedByIds(), this._changeDetectorRef.markForCheck();
          }),
          this._validateHints(),
          this._syncDescribedByIds();
      }
      _assertFormFieldControl() {
        this._control;
      }
      _updateFocusState() {
        this._control.focused && !this._isFocused
          ? ((this._isFocused = !0), this._lineRipple?.activate())
          : !this._control.focused &&
            (this._isFocused || this._isFocused === null) &&
            ((this._isFocused = !1), this._lineRipple?.deactivate()),
          this._textField?.nativeElement.classList.toggle(
            "mdc-text-field--focused",
            this._control.focused
          );
      }
      _initializeOutlineLabelOffsetSubscriptions() {
        this._prefixChildren.changes.subscribe(
          () => (this._needsOutlineLabelOffsetUpdateOnStable = !0)
        ),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.pipe(Se(this._destroyed)).subscribe(() => {
              this._needsOutlineLabelOffsetUpdateOnStable &&
                ((this._needsOutlineLabelOffsetUpdateOnStable = !1),
                this._updateOutlineLabelOffset());
            });
          }),
          this._dir.change
            .pipe(Se(this._destroyed))
            .subscribe(
              () => (this._needsOutlineLabelOffsetUpdateOnStable = !0)
            );
      }
      _shouldAlwaysFloat() {
        return this.floatLabel === "always";
      }
      _hasOutline() {
        return this.appearance === "outline";
      }
      _forceDisplayInfixLabel() {
        return (
          !this._platform.isBrowser &&
          this._prefixChildren.length &&
          !this._shouldLabelFloat()
        );
      }
      _hasFloatingLabel() {
        return !!this._labelChildNonStatic || !!this._labelChildStatic;
      }
      _shouldLabelFloat() {
        return this._control.shouldLabelFloat || this._shouldAlwaysFloat();
      }
      _shouldForward(n) {
        let r = this._control ? this._control.ngControl : null;
        return r && r[n];
      }
      _getDisplayedMessages() {
        return this._errorChildren &&
          this._errorChildren.length > 0 &&
          this._control.errorState
          ? "error"
          : "hint";
      }
      _handleLabelResized() {
        this._refreshOutlineNotchWidth();
      }
      _refreshOutlineNotchWidth() {
        !this._hasOutline() || !this._floatingLabel || !this._shouldLabelFloat()
          ? this._notchedOutline?._setNotchWidth(0)
          : this._notchedOutline?._setNotchWidth(
              this._floatingLabel.getWidth()
            );
      }
      _processHints() {
        this._validateHints(), this._syncDescribedByIds();
      }
      _validateHints() {
        this._hintChildren;
      }
      _syncDescribedByIds() {
        if (this._control) {
          let n = [];
          if (
            (this._control.userAriaDescribedBy &&
              typeof this._control.userAriaDescribedBy == "string" &&
              n.push(...this._control.userAriaDescribedBy.split(" ")),
            this._getDisplayedMessages() === "hint")
          ) {
            let r = this._hintChildren
                ? this._hintChildren.find((s) => s.align === "start")
                : null,
              o = this._hintChildren
                ? this._hintChildren.find((s) => s.align === "end")
                : null;
            r ? n.push(r.id) : this._hintLabel && n.push(this._hintLabelId),
              o && n.push(o.id);
          } else
            this._errorChildren &&
              n.push(...this._errorChildren.map((r) => r.id));
          this._control.setDescribedByIds(n);
        }
      }
      _updateOutlineLabelOffset() {
        if (
          !this._platform.isBrowser ||
          !this._hasOutline() ||
          !this._floatingLabel
        )
          return;
        let n = this._floatingLabel.element;
        if (!(this._iconPrefixContainer || this._textPrefixContainer)) {
          n.style.transform = "";
          return;
        }
        if (!this._isAttachedToDom()) {
          this._needsOutlineLabelOffsetUpdateOnStable = !0;
          return;
        }
        let r = this._iconPrefixContainer?.nativeElement,
          o = this._textPrefixContainer?.nativeElement,
          s = r?.getBoundingClientRect().width ?? 0,
          a = o?.getBoundingClientRect().width ?? 0,
          l = this._dir.value === "rtl" ? "-1" : "1",
          c = `${s + a}px`,
          u = `calc(${l} * (${c} + var(--mat-mdc-form-field-label-offset-x, 0px)))`;
        n.style.transform = `var(
        --mat-mdc-form-field-label-transform,
        ${IP} translateX(${u})
    )`;
      }
      _isAttachedToDom() {
        let n = this._elementRef.nativeElement;
        if (n.getRootNode) {
          let r = n.getRootNode();
          return r && r !== n;
        }
        return document.documentElement.contains(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        y(Z),
        y(lt),
        y(R),
        y(er),
        y(Ce),
        y(CP, 8),
        y(at, 8),
        y(J)
      );
    }),
      (e.ɵcmp = Re({
        type: e,
        selectors: [["mat-form-field"]],
        contentQueries: function (r, o, s) {
          if (
            (r & 1 &&
              (_t(s, ao, 5),
              _t(s, ao, 7),
              _t(s, Kc, 5),
              _t(s, _P, 5),
              _t(s, xP, 5),
              _t(s, vP, 5),
              _t(s, xx, 5)),
            r & 2)
          ) {
            let a;
            _e((a = xe())) && (o._labelChildNonStatic = a.first),
              _e((a = xe())) && (o._labelChildStatic = a.first),
              _e((a = xe())) && (o._formFieldControl = a.first),
              _e((a = xe())) && (o._prefixChildren = a),
              _e((a = xe())) && (o._suffixChildren = a),
              _e((a = xe())) && (o._errorChildren = a),
              _e((a = xe())) && (o._hintChildren = a);
          }
        },
        viewQuery: function (r, o) {
          if (
            (r & 1 &&
              (Ke(Z1, 5),
              Ke(K1, 5),
              Ke(X1, 5),
              Ke(wx, 5),
              Ke(Dx, 5),
              Ke(Cx, 5)),
            r & 2)
          ) {
            let s;
            _e((s = xe())) && (o._textField = s.first),
              _e((s = xe())) && (o._iconPrefixContainer = s.first),
              _e((s = xe())) && (o._textPrefixContainer = s.first),
              _e((s = xe())) && (o._floatingLabel = s.first),
              _e((s = xe())) && (o._notchedOutline = s.first),
              _e((s = xe())) && (o._lineRipple = s.first);
          }
        },
        hostAttrs: [1, "mat-mdc-form-field"],
        hostVars: 42,
        hostBindings: function (r, o) {
          r & 2 &&
            Ie("mat-mdc-form-field-label-always-float", o._shouldAlwaysFloat())(
              "mat-mdc-form-field-has-icon-prefix",
              o._hasIconPrefix
            )("mat-mdc-form-field-has-icon-suffix", o._hasIconSuffix)(
              "mat-form-field-invalid",
              o._control.errorState
            )("mat-form-field-disabled", o._control.disabled)(
              "mat-form-field-autofilled",
              o._control.autofilled
            )(
              "mat-form-field-no-animations",
              o._animationMode === "NoopAnimations"
            )("mat-form-field-appearance-fill", o.appearance == "fill")(
              "mat-form-field-appearance-outline",
              o.appearance == "outline"
            )(
              "mat-form-field-hide-placeholder",
              o._hasFloatingLabel() && !o._shouldLabelFloat()
            )("mat-focused", o._control.focused)(
              "mat-primary",
              o.color !== "accent" && o.color !== "warn"
            )("mat-accent", o.color === "accent")(
              "mat-warn",
              o.color === "warn"
            )("ng-untouched", o._shouldForward("untouched"))(
              "ng-touched",
              o._shouldForward("touched")
            )("ng-pristine", o._shouldForward("pristine"))(
              "ng-dirty",
              o._shouldForward("dirty")
            )("ng-valid", o._shouldForward("valid"))(
              "ng-invalid",
              o._shouldForward("invalid")
            )("ng-pending", o._shouldForward("pending"));
        },
        inputs: {
          hideRequiredMarker: "hideRequiredMarker",
          color: "color",
          floatLabel: "floatLabel",
          appearance: "appearance",
          subscriptSizing: "subscriptSizing",
          hintLabel: "hintLabel",
        },
        exportAs: ["matFormField"],
        features: [
          $e([
            { provide: Xc, useExisting: e },
            { provide: Mx, useExisting: e },
          ]),
        ],
        ngContentSelectors: bP,
        decls: 18,
        vars: 21,
        consts: [
          ["labelTemplate", ""],
          [1, "mat-mdc-text-field-wrapper", "mdc-text-field", 3, "click"],
          ["textField", ""],
          ["class", "mat-mdc-form-field-focus-overlay"],
          [1, "mat-mdc-form-field-flex"],
          [
            "matFormFieldNotchedOutline",
            "",
            3,
            "matFormFieldNotchedOutlineOpen",
          ],
          ["class", "mat-mdc-form-field-icon-prefix"],
          ["class", "mat-mdc-form-field-text-prefix"],
          [1, "mat-mdc-form-field-infix"],
          [3, "ngTemplateOutlet"],
          ["class", "mat-mdc-form-field-text-suffix"],
          ["class", "mat-mdc-form-field-icon-suffix"],
          ["matFormFieldLineRipple", ""],
          [
            1,
            "mat-mdc-form-field-subscript-wrapper",
            "mat-mdc-form-field-bottom-align",
          ],
          [
            "matFormFieldFloatingLabel",
            "",
            3,
            "floating",
            "monitorResize",
            "id",
          ],
          [
            "aria-hidden",
            "true",
            "class",
            "mat-mdc-form-field-required-marker mdc-floating-label--required",
          ],
          [
            "aria-hidden",
            "true",
            1,
            "mat-mdc-form-field-required-marker",
            "mdc-floating-label--required",
          ],
          [1, "mat-mdc-form-field-focus-overlay"],
          [1, "mat-mdc-form-field-icon-prefix"],
          ["iconPrefixContainer", ""],
          [1, "mat-mdc-form-field-text-prefix"],
          ["textPrefixContainer", ""],
          [1, "mat-mdc-form-field-text-suffix"],
          [1, "mat-mdc-form-field-icon-suffix"],
          [1, "mat-mdc-form-field-error-wrapper"],
          [1, "mat-mdc-form-field-hint-wrapper"],
          [3, "id"],
          [1, "mat-mdc-form-field-hint-spacer"],
        ],
        template: function (r, o) {
          if (
            (r & 1 &&
              (zt(gP),
              ge(0, tP, 1, 1, "ng-template", null, 0, xy),
              M(2, "div", 1, 2),
              ue("click", function (a) {
                return o._control.onContainerClick(a);
              }),
              ge(4, nP, 1, 0, "div", 3),
              M(5, "div", 4),
              ge(6, oP, 2, 2, "div", 5)(7, sP, 3, 0, "div", 6)(
                8,
                aP,
                3,
                0,
                "div",
                7
              ),
              M(9, "div", 8),
              ge(10, cP, 1, 1, null, 9),
              He(11),
              T(),
              ge(12, dP, 2, 0, "div", 10)(13, uP, 2, 0, "div", 11),
              T(),
              ge(14, fP, 1, 0, "div", 12),
              T(),
              M(15, "div", 13),
              ge(16, hP, 2, 1)(17, mP, 5, 2),
              T()),
            r & 2)
          ) {
            let s;
            O(2),
              Ie("mdc-text-field--filled", !o._hasOutline())(
                "mdc-text-field--outlined",
                o._hasOutline()
              )("mdc-text-field--no-label", !o._hasFloatingLabel())(
                "mdc-text-field--disabled",
                o._control.disabled
              )("mdc-text-field--invalid", o._control.errorState),
              O(2),
              be(4, !o._hasOutline() && !o._control.disabled ? 4 : -1),
              O(2),
              be(6, o._hasOutline() ? 6 : -1),
              O(1),
              be(7, o._hasIconPrefix ? 7 : -1),
              O(1),
              be(8, o._hasTextPrefix ? 8 : -1),
              O(2),
              be(10, !o._hasOutline() || o._forceDisplayInfixLabel() ? 10 : -1),
              O(2),
              be(12, o._hasTextSuffix ? 12 : -1),
              O(1),
              be(13, o._hasIconSuffix ? 13 : -1),
              O(1),
              be(14, o._hasOutline() ? -1 : 14),
              O(1),
              Ie(
                "mat-mdc-form-field-subscript-dynamic-size",
                o.subscriptSizing === "dynamic"
              ),
              O(1),
              be(
                16,
                (s = o._getDisplayedMessages()) === "error"
                  ? 16
                  : s === "hint"
                  ? 17
                  : -1
              );
          }
        },
        dependencies: [jy, xx, wx, Dx, Cx],
        styles: [
          '.mdc-text-field{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:0;border-bottom-left-radius:0;display:inline-flex;align-items:baseline;padding:0 16px;position:relative;box-sizing:border-box;overflow:hidden;will-change:opacity,transform,color}.mdc-text-field .mdc-floating-label{top:50%;transform:translateY(-50%);pointer-events:none}.mdc-text-field__input{height:28px;width:100%;min-width:0;border:none;border-radius:0;background:none;appearance:none;padding:0}.mdc-text-field__input::-ms-clear{display:none}.mdc-text-field__input::-webkit-calendar-picker-indicator{display:none}.mdc-text-field__input:focus{outline:none}.mdc-text-field__input:invalid{box-shadow:none}@media all{.mdc-text-field__input::placeholder{opacity:0}}@media all{.mdc-text-field__input:-ms-input-placeholder{opacity:0}}@media all{.mdc-text-field--no-label .mdc-text-field__input::placeholder,.mdc-text-field--focused .mdc-text-field__input::placeholder{opacity:1}}@media all{.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder{opacity:1}}.mdc-text-field__affix{height:28px;opacity:0;white-space:nowrap}.mdc-text-field--label-floating .mdc-text-field__affix,.mdc-text-field--no-label .mdc-text-field__affix{opacity:1}@supports(-webkit-hyphens: none){.mdc-text-field--outlined .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field__affix--prefix,.mdc-text-field__affix--prefix[dir=rtl]{padding-left:2px;padding-right:0}.mdc-text-field--end-aligned .mdc-text-field__affix--prefix{padding-left:0;padding-right:12px}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--end-aligned .mdc-text-field__affix--prefix[dir=rtl]{padding-left:12px;padding-right:0}.mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field__affix--suffix,.mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:12px}.mdc-text-field--end-aligned .mdc-text-field__affix--suffix{padding-left:2px;padding-right:0}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--end-aligned .mdc-text-field__affix--suffix[dir=rtl]{padding-left:0;padding-right:2px}.mdc-text-field--filled{height:56px}.mdc-text-field--filled::before{display:inline-block;width:0;height:40px;content:"";vertical-align:0}.mdc-text-field--filled .mdc-floating-label{left:16px;right:initial}[dir=rtl] .mdc-text-field--filled .mdc-floating-label,.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:16px}.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{height:100%}.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label{display:none}.mdc-text-field--filled.mdc-text-field--no-label::before{display:none}@supports(-webkit-hyphens: none){.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__affix{align-items:center;align-self:center;display:inline-flex;height:100%}}.mdc-text-field--outlined{height:56px;overflow:visible}.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) scale(1)}.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) scale(0.75)}.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--outlined .mdc-text-field__input{height:100%}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-shape-small, 4px))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:4px;border-top-right-radius:var(--mdc-shape-small, 4px);border-bottom-right-radius:4px;border-bottom-right-radius:var(--mdc-shape-small, 4px);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:4px;border-top-left-radius:var(--mdc-shape-small, 4px);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:4px;border-bottom-left-radius:var(--mdc-shape-small, 4px)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-shape-small, 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-shape-small, 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-shape-small, 4px))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-shape-small, 4px) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:1px}.mdc-text-field--outlined .mdc-floating-label{left:4px;right:initial}[dir=rtl] .mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:4px}.mdc-text-field--outlined .mdc-text-field__input{display:flex;border:none !important;background-color:rgba(0,0,0,0)}.mdc-text-field--outlined .mdc-notched-outline{z-index:1}.mdc-text-field--textarea{flex-direction:column;align-items:center;width:auto;height:auto;padding:0}.mdc-text-field--textarea .mdc-floating-label{top:19px}.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above){transform:none}.mdc-text-field--textarea .mdc-text-field__input{flex-grow:1;height:auto;min-height:1.5rem;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--filled::before{display:none}.mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--float-above{transform:translateY(-10.25px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input{margin-top:23px;margin-bottom:9px}.mdc-text-field--textarea.mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-27.25px) scale(1)}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-24.75px) scale(0.75)}.mdc-text-field--textarea.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--textarea.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-text-field__input{margin-top:16px;margin-bottom:16px}.mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label{top:18px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field__input{margin-bottom:2px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter{align-self:flex-end;padding:0 16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::after{display:inline-block;width:0;height:16px;content:"";vertical-align:-16px}.mdc-text-field--textarea.mdc-text-field--with-internal-counter .mdc-text-field-character-counter::before{display:none}.mdc-text-field__resizer{align-self:stretch;display:inline-flex;flex-direction:column;flex-grow:1;max-height:100%;max-width:100%;min-height:56px;min-width:fit-content;min-width:-moz-available;min-width:-webkit-fill-available;overflow:hidden;resize:both}.mdc-text-field--filled .mdc-text-field__resizer{transform:translateY(-1px)}.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--filled .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateY(1px)}.mdc-text-field--outlined .mdc-text-field__resizer{transform:translateX(-1px) translateY(-1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer,.mdc-text-field--outlined .mdc-text-field__resizer[dir=rtl]{transform:translateX(1px) translateY(-1px)}.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter{transform:translateX(1px) translateY(1px)}[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input,[dir=rtl] .mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter,.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field__input[dir=rtl],.mdc-text-field--outlined .mdc-text-field__resizer .mdc-text-field-character-counter[dir=rtl]{transform:translateX(-1px) translateY(1px)}.mdc-text-field--with-leading-icon{padding-left:0;padding-right:16px}[dir=rtl] .mdc-text-field--with-leading-icon,.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:16px;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 48px);left:48px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label[dir=rtl]{left:initial;right:48px}.mdc-text-field--with-leading-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label{left:36px;right:initial}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label[dir=rtl]{left:initial;right:36px}.mdc-text-field--with-leading-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{transform:translateY(-37.25px) translateX(-32px) scale(1)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-37.25px) translateX(32px) scale(1)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--float-above{font-size:.75rem}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{transform:translateY(-34.75px) translateX(-32px) scale(0.75)}[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,[dir=rtl] .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl],.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above[dir=rtl]{transform:translateY(-34.75px) translateX(32px) scale(0.75)}.mdc-text-field--with-leading-icon.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above,.mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:1rem}.mdc-text-field--with-trailing-icon{padding-left:16px;padding-right:0}[dir=rtl] .mdc-text-field--with-trailing-icon,.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0;padding-right:16px}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 64px)}.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 64px/0.75)}.mdc-text-field--with-trailing-icon.mdc-text-field--outlined :not(.mdc-notched-outline--notched) .mdc-notched-outline__notch{max-width:calc(100% - 60px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label{max-width:calc(100% - 96px)}.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon.mdc-text-field--filled .mdc-floating-label--float-above{max-width:calc(100%/0.75 - 96px/0.75)}.mdc-text-field-helper-line{display:flex;justify-content:space-between;box-sizing:border-box}.mdc-text-field+.mdc-text-field-helper-line{padding-right:16px;padding-left:16px}.mdc-form-field>.mdc-text-field+label{align-self:flex-start}.mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--focused .mdc-notched-outline__trailing{border-width:2px}.mdc-text-field--focused+.mdc-text-field-helper-line .mdc-text-field-helper-text:not(.mdc-text-field-helper-text--validation-msg){opacity:1}.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:2px}.mdc-text-field--focused.mdc-text-field--outlined.mdc-text-field--textarea .mdc-notched-outline--notched .mdc-notched-outline__notch{padding-top:0}.mdc-text-field--invalid+.mdc-text-field-helper-line .mdc-text-field-helper-text--validation-msg{opacity:1}.mdc-text-field--disabled{pointer-events:none}@media screen and (forced-colors: active){.mdc-text-field--disabled .mdc-text-field__input{background-color:Window}.mdc-text-field--disabled .mdc-floating-label{z-index:1}}.mdc-text-field--disabled .mdc-floating-label{cursor:default}.mdc-text-field--disabled.mdc-text-field--filled .mdc-text-field__ripple{display:none}.mdc-text-field--disabled .mdc-text-field__input{pointer-events:auto}.mdc-text-field--end-aligned .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--end-aligned .mdc-text-field__input[dir=rtl]{text-align:left}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix{direction:ltr}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{padding-left:0;padding-right:2px}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{padding-left:12px;padding-right:0}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--leading,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--leading{order:1}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--suffix{order:2}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__input,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__input{order:3}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__affix--prefix{order:4}[dir=rtl] .mdc-text-field--ltr-text .mdc-text-field__icon--trailing,.mdc-text-field--ltr-text[dir=rtl] .mdc-text-field__icon--trailing{order:5}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__input,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__input{text-align:right}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--prefix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--prefix{padding-right:12px}[dir=rtl] .mdc-text-field--ltr-text.mdc-text-field--end-aligned .mdc-text-field__affix--suffix,.mdc-text-field--ltr-text.mdc-text-field--end-aligned[dir=rtl] .mdc-text-field__affix--suffix{padding-left:2px}.mdc-floating-label{position:absolute;left:0;-webkit-transform-origin:left top;transform-origin:left top;line-height:1.15rem;text-align:left;text-overflow:ellipsis;white-space:nowrap;cursor:text;overflow:hidden;will-change:transform}[dir=rtl] .mdc-floating-label,.mdc-floating-label[dir=rtl]{right:0;left:auto;-webkit-transform-origin:right top;transform-origin:right top;text-align:right}.mdc-floating-label--float-above{cursor:auto}.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after{margin-left:1px;margin-right:0px;content:"*"}[dir=rtl] .mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)::after,.mdc-floating-label--required:not(.mdc-floating-label--hide-required-marker)[dir=rtl]::after{margin-left:0;margin-right:1px}.mdc-notched-outline{display:flex;position:absolute;top:0;right:0;left:0;box-sizing:border-box;width:100%;max-width:100%;height:100%;text-align:left;pointer-events:none}[dir=rtl] .mdc-notched-outline,.mdc-notched-outline[dir=rtl]{text-align:right}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{box-sizing:border-box;height:100%;pointer-events:none}.mdc-notched-outline__trailing{flex-grow:1}.mdc-notched-outline__notch{flex:0 0 auto;width:auto}.mdc-notched-outline .mdc-floating-label{display:inline-block;position:relative;max-width:100%}.mdc-notched-outline .mdc-floating-label--float-above{text-overflow:clip}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:133.3333333333%}.mdc-notched-outline--notched .mdc-notched-outline__notch{padding-left:0;padding-right:8px;border-top:none}[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch,.mdc-notched-outline--notched .mdc-notched-outline__notch[dir=rtl]{padding-left:8px;padding-right:0}.mdc-notched-outline--no-label .mdc-notched-outline__notch{display:none}.mdc-line-ripple::before,.mdc-line-ripple::after{position:absolute;bottom:0;left:0;width:100%;border-bottom-style:solid;content:""}.mdc-line-ripple::before{z-index:1}.mdc-line-ripple::after{transform:scaleX(0);opacity:0;z-index:2}.mdc-line-ripple--active::after{transform:scaleX(1);opacity:1}.mdc-line-ripple--deactivating::after{opacity:0}.mdc-floating-label--float-above{transform:translateY(-106%) scale(0.75)}.mdc-notched-outline__leading,.mdc-notched-outline__notch,.mdc-notched-outline__trailing{border-top:1px solid;border-bottom:1px solid}.mdc-notched-outline__leading{border-left:1px solid;border-right:none;width:12px}[dir=rtl] .mdc-notched-outline__leading,.mdc-notched-outline__leading[dir=rtl]{border-left:none;border-right:1px solid}.mdc-notched-outline__trailing{border-left:none;border-right:1px solid}[dir=rtl] .mdc-notched-outline__trailing,.mdc-notched-outline__trailing[dir=rtl]{border-left:1px solid;border-right:none}.mdc-notched-outline__notch{max-width:calc(100% - 12px*2)}.mdc-line-ripple::before{border-bottom-width:1px}.mdc-line-ripple::after{border-bottom-width:2px}.mdc-text-field--filled{border-top-left-radius:var(--mdc-filled-text-field-container-shape);border-top-right-radius:var(--mdc-filled-text-field-container-shape);border-bottom-right-radius:0;border-bottom-left-radius:0}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-caret-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-filled-text-field-error-caret-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-filled-text-field-input-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-filled-text-field-disabled-input-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-label-text-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-focus-label-text-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-disabled-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-label-text-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-filled-text-field-error-focus-label-text-color)}.mdc-text-field--filled .mdc-floating-label{font-family:var(--mdc-filled-text-field-label-text-font);font-size:var(--mdc-filled-text-field-label-text-size);font-weight:var(--mdc-filled-text-field-label-text-weight);letter-spacing:var(--mdc-filled-text-field-label-text-tracking)}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}}.mdc-text-field--filled:not(.mdc-text-field--disabled){background-color:var(--mdc-filled-text-field-container-color)}.mdc-text-field--filled.mdc-text-field--disabled{background-color:var(--mdc-filled-text-field-disabled-container-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-hover-active-indicator-color)}.mdc-text-field--filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-focus-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-disabled-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before{border-bottom-color:var(--mdc-filled-text-field-error-hover-active-indicator-color)}.mdc-text-field--filled.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after{border-bottom-color:var(--mdc-filled-text-field-error-focus-active-indicator-color)}.mdc-text-field--filled .mdc-line-ripple::before{border-bottom-width:var(--mdc-filled-text-field-active-indicator-height)}.mdc-text-field--filled .mdc-line-ripple::after{border-bottom-width:var(--mdc-filled-text-field-focus-active-indicator-height)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-caret-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-text-field__input{caret-color:var(--mdc-outlined-text-field-error-caret-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input{color:var(--mdc-outlined-text-field-input-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input{color:var(--mdc-outlined-text-field-disabled-input-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-label-text-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-focus-label-text-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-disabled-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-label-text-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label--float-above{color:var(--mdc-outlined-text-field-error-focus-label-text-color)}.mdc-text-field--outlined .mdc-floating-label{font-family:var(--mdc-outlined-text-field-label-text-font);font-size:var(--mdc-outlined-text-field-label-text-size);font-weight:var(--mdc-outlined-text-field-label-text-weight);letter-spacing:var(--mdc-outlined-text-field-label-text-tracking)}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}@media all{.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder{color:var(--mdc-outlined-text-field-input-text-placeholder-color)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading[dir=rtl]{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading{width:max(12px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch{max-width:calc(100% - max(12px,var(--mdc-outlined-text-field-container-shape))*2)}}.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing{border-top-left-radius:0;border-top-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-right-radius:var(--mdc-outlined-text-field-container-shape);border-bottom-left-radius:0}[dir=rtl] .mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing,.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__trailing[dir=rtl]{border-top-left-radius:var(--mdc-outlined-text-field-container-shape);border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:var(--mdc-outlined-text-field-container-shape)}@supports(top: max(0%)){.mdc-text-field--outlined{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}@supports(top: max(0%)){.mdc-text-field--outlined+.mdc-text-field-helper-line{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-left:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-leading-icon{padding-right:max(16px,var(--mdc-outlined-text-field-container-shape))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-right:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-leading-icon,.mdc-text-field--outlined.mdc-text-field--with-leading-icon[dir=rtl]{padding-left:max(16px,var(--mdc-outlined-text-field-container-shape))}}.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-right:0}@supports(top: max(0%)){.mdc-text-field--outlined.mdc-text-field--with-trailing-icon{padding-left:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-left:0}@supports(top: max(0%)){[dir=rtl] .mdc-text-field--outlined.mdc-text-field--with-trailing-icon,.mdc-text-field--outlined.mdc-text-field--with-trailing-icon[dir=rtl]{padding-right:max(16px,calc(var(--mdc-outlined-text-field-container-shape) + 4px))}}.mdc-text-field--outlined.mdc-text-field--with-leading-icon.mdc-text-field--with-trailing-icon{padding-left:0;padding-right:0}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-hover-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-focus-outline-color)}.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--disabled .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-disabled-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-notched-outline .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-hover-outline-color)}.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__leading,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__notch,.mdc-text-field--outlined.mdc-text-field--invalid:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline__trailing{border-color:var(--mdc-outlined-text-field-error-focus-outline-color)}.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-outline-width)}.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__leading,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__notch,.mdc-text-field--outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mdc-notched-outline__trailing{border-width:var(--mdc-outlined-text-field-focus-outline-width)}.mat-mdc-form-field-textarea-control{vertical-align:middle;resize:vertical;box-sizing:border-box;height:auto;margin:0;padding:0;border:none;overflow:auto}.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:inherit;letter-spacing:inherit;text-decoration:inherit;text-transform:inherit;border:none}.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;line-height:normal;pointer-events:all}.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label{cursor:inherit}.mdc-text-field--no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control{height:auto}.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color]{height:23px}.mat-mdc-text-field-wrapper{height:auto;flex:auto}.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-left:0;--mat-mdc-form-field-label-offset-x: -16px}.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-right:0}[dir=rtl] .mat-mdc-text-field-wrapper{padding-left:16px;padding-right:16px}[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper{padding-left:0}[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper{padding-right:0}.mat-form-field-disabled .mdc-text-field__input::placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder{color:var(--mat-form-field-disabled-input-text-placeholder-color)}.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms;opacity:1}.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label{left:auto;right:auto}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input{display:inline-block}.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch{padding-top:0}.mat-mdc-text-field-wrapper::before{content:none}.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:1px solid rgba(0,0,0,0)}[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch{border-left:none;border-right:1px solid rgba(0,0,0,0)}.mat-mdc-form-field-infix{min-height:var(--mat-form-field-container-height);padding-top:var(--mat-form-field-filled-with-label-container-padding-top);padding-bottom:var(--mat-form-field-filled-with-label-container-padding-bottom)}.mdc-text-field--outlined .mat-mdc-form-field-infix,.mdc-text-field--no-label .mat-mdc-form-field-infix{padding-top:var(--mat-form-field-container-vertical-padding);padding-bottom:var(--mat-form-field-container-vertical-padding)}.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label{top:calc(var(--mat-form-field-container-height)/2)}.mdc-text-field--filled .mat-mdc-floating-label{display:var(--mat-form-field-filled-label-display, block)}.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{--mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--mat-form-field-container-height) / 2) * -1)) scale(var(--mat-mdc-form-field-floating-label-scale, 0.75));transform:var(--mat-mdc-form-field-label-transform)}.mat-mdc-form-field-subscript-wrapper{box-sizing:border-box;width:100%;position:relative}.mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-error-wrapper{position:absolute;top:0;left:0;right:0;padding:0 16px}.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper{position:static}.mat-mdc-form-field-bottom-align::before{content:"";display:inline-block;height:16px}.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before{content:unset}.mat-mdc-form-field-hint-end{order:1}.mat-mdc-form-field-hint-wrapper{display:flex}.mat-mdc-form-field-hint-spacer{flex:1 0 1em}.mat-mdc-form-field-error{display:block;color:var(--mat-form-field-error-text-color)}.mat-mdc-form-field-subscript-wrapper,.mat-mdc-form-field-bottom-align::before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-subscript-text-font);line-height:var(--mat-form-field-subscript-text-line-height);font-size:var(--mat-form-field-subscript-text-size);letter-spacing:var(--mat-form-field-subscript-text-tracking);font-weight:var(--mat-form-field-subscript-text-weight)}.mat-mdc-form-field-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;opacity:0;pointer-events:none;background-color:var(--mat-form-field-state-layer-color)}.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-hover-state-layer-opacity)}.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay{opacity:var(--mat-form-field-focus-state-layer-opacity)}select.mat-mdc-form-field-input-control{-moz-appearance:none;-webkit-appearance:none;background-color:rgba(0,0,0,0);display:inline-flex;box-sizing:border-box}select.mat-mdc-form-field-input-control:not(:disabled){cursor:pointer}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option{color:var(--mat-form-field-select-option-text-color)}select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled{color:var(--mat-form-field-select-disabled-option-text-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{content:"";width:0;height:0;border-left:5px solid rgba(0,0,0,0);border-right:5px solid rgba(0,0,0,0);border-top:5px solid;position:absolute;right:0;top:50%;margin-top:-2.5px;pointer-events:none;color:var(--mat-form-field-enabled-select-arrow-color)}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after{right:auto;left:0}.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after{color:var(--mat-form-field-focus-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after{color:var(--mat-form-field-disabled-select-arrow-color)}.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:15px}[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control{padding-right:0;padding-left:15px}.cdk-high-contrast-active .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper{outline:solid 1px}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper{outline-color:GrayText}.cdk-high-contrast-active .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper{outline:dashed 3px}.cdk-high-contrast-active .mat-mdc-form-field.mat-focused .mdc-notched-outline{border:dashed 3px}.mat-mdc-form-field-input-control[type=date],.mat-mdc-form-field-input-control[type=datetime],.mat-mdc-form-field-input-control[type=datetime-local],.mat-mdc-form-field-input-control[type=month],.mat-mdc-form-field-input-control[type=week],.mat-mdc-form-field-input-control[type=time]{line-height:1}.mat-mdc-form-field-input-control::-webkit-datetime-edit{line-height:1;padding:0;margin-bottom:-2px}.mat-mdc-form-field{--mat-mdc-form-field-floating-label-scale: 0.75;display:inline-flex;flex-direction:column;min-width:0;text-align:left;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:var(--mat-form-field-container-text-font);line-height:var(--mat-form-field-container-text-line-height);font-size:var(--mat-form-field-container-text-size);letter-spacing:var(--mat-form-field-container-text-tracking);font-weight:var(--mat-form-field-container-text-weight)}[dir=rtl] .mat-mdc-form-field{text-align:right}.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above{font-size:calc(var(--mat-form-field-outlined-label-text-populated-size)*var(--mat-mdc-form-field-floating-label-scale))}.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above{font-size:var(--mat-form-field-outlined-label-text-populated-size)}.mat-mdc-form-field-flex{display:inline-flex;align-items:baseline;box-sizing:border-box;width:100%}.mat-mdc-text-field-wrapper{width:100%}.mat-mdc-form-field-icon-prefix,.mat-mdc-form-field-icon-suffix{align-self:center;line-height:0;pointer-events:auto;position:relative;z-index:1}.mat-mdc-form-field-icon-prefix,[dir=rtl] .mat-mdc-form-field-icon-suffix{padding:0 4px 0 0}.mat-mdc-form-field-icon-suffix,[dir=rtl] .mat-mdc-form-field-icon-prefix{padding:0 0 0 4px}.mat-mdc-form-field-icon-prefix>.mat-icon,.mat-mdc-form-field-icon-suffix>.mat-icon{padding:12px;box-sizing:content-box}.mat-mdc-form-field-subscript-wrapper .mat-icon,.mat-mdc-form-field label .mat-icon{width:1em;height:1em;font-size:inherit}.mat-mdc-form-field-infix{flex:auto;min-width:0;width:180px;position:relative;box-sizing:border-box}.mat-mdc-form-field .mdc-notched-outline__notch{margin-left:-1px;-webkit-clip-path:inset(-9em -999em -9em 1px);clip-path:inset(-9em -999em -9em 1px)}[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch{margin-left:0;margin-right:-1px;-webkit-clip-path:inset(-9em 1px -9em -999em);clip-path:inset(-9em 1px -9em -999em)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition:opacity 67ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input::placeholder{transition-delay:40ms;transition-duration:110ms}}@media all{.mdc-text-field--no-label .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder,.mdc-text-field--focused .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__input:-ms-input-placeholder{transition-delay:40ms;transition-duration:110ms}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field__affix{transition:opacity 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled.mdc-ripple-upgraded--background-focused .mdc-text-field__ripple::before,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before{transition-duration:75ms}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea{transition:none}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--filled .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-filled 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-filled{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 10.25px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--textarea.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-textarea-outlined 250ms 1}@keyframes mdc-floating-label-shake-float-above-textarea-outlined{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 24.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon{0%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - 32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}[dir=rtl] .mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined .mdc-floating-label--shake,.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-text-field--with-leading-icon.mdc-text-field--outlined[dir=rtl] .mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-text-field-outlined-leading-icon 250ms 1}@keyframes mdc-floating-label-shake-float-above-text-field-outlined-leading-icon-rtl{0%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}100%{transform:translateX(calc(0% - -32px)) translateY(calc(0% - 34.75px)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-floating-label{transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1),color 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-floating-label--shake{animation:mdc-floating-label-shake-float-above-standard 250ms 1}@keyframes mdc-floating-label-shake-float-above-standard{0%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}33%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(calc(4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}66%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(calc(-4% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}100%{transform:translateX(calc(0% - 0%)) translateY(calc(0% - 106%)) scale(0.75)}}.mat-mdc-form-field:not(.mat-form-field-no-animations) .mdc-line-ripple::after{transition:transform 180ms cubic-bezier(0.4, 0, 0.2, 1),opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-notched-outline .mdc-floating-label{max-width:calc(100% + 1px)}.mdc-notched-outline--upgraded .mdc-floating-label--float-above{max-width:calc(133.3333333333% + 1px)}',
        ],
        encapsulation: 2,
        data: { animation: [EP.transitionMessages] },
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  Fn = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [ke, zi, to, ke] }));
    let t = e;
    return t;
  })();
var SP = new S("MAT_INPUT_VALUE_ACCESSOR"),
  TP = [
    "button",
    "checkbox",
    "file",
    "hidden",
    "image",
    "radio",
    "range",
    "reset",
    "submit",
  ],
  MP = 0,
  AP = nm(
    class {
      constructor(t, e, i, n) {
        (this._defaultErrorStateMatcher = t),
          (this._parentForm = e),
          (this._parentFormGroup = i),
          (this.ngControl = n),
          (this.stateChanges = new F());
      }
    }
  ),
  ed = (() => {
    let e = class e extends AP {
      get disabled() {
        return this._disabled;
      }
      set disabled(n) {
        (this._disabled = ze(n)),
          this.focused && ((this.focused = !1), this.stateChanges.next());
      }
      get id() {
        return this._id;
      }
      set id(n) {
        this._id = n || this._uid;
      }
      get required() {
        return (
          this._required ??
          this.ngControl?.control?.hasValidator(cc.required) ??
          !1
        );
      }
      set required(n) {
        this._required = ze(n);
      }
      get type() {
        return this._type;
      }
      set type(n) {
        (this._type = n || "text"),
          this._validateType(),
          !this._isTextarea &&
            gp().has(this._type) &&
            (this._elementRef.nativeElement.type = this._type);
      }
      get value() {
        return this._inputValueAccessor.value;
      }
      set value(n) {
        n !== this.value &&
          ((this._inputValueAccessor.value = n), this.stateChanges.next());
      }
      get readonly() {
        return this._readonly;
      }
      set readonly(n) {
        this._readonly = ze(n);
      }
      constructor(n, r, o, s, a, l, c, d, u, f) {
        super(l, s, a, o),
          (this._elementRef = n),
          (this._platform = r),
          (this._autofillMonitor = d),
          (this._formField = f),
          (this._uid = `mat-input-${MP++}`),
          (this.focused = !1),
          (this.stateChanges = new F()),
          (this.controlType = "mat-input"),
          (this.autofilled = !1),
          (this._disabled = !1),
          (this._type = "text"),
          (this._readonly = !1),
          (this._neverEmptyInputTypes = [
            "date",
            "datetime",
            "datetime-local",
            "month",
            "time",
            "week",
          ].filter((m) => gp().has(m))),
          (this._iOSKeyupListener = (m) => {
            let g = m.target;
            !g.value &&
              g.selectionStart === 0 &&
              g.selectionEnd === 0 &&
              (g.setSelectionRange(1, 1), g.setSelectionRange(0, 0));
          });
        let h = this._elementRef.nativeElement,
          p = h.nodeName.toLowerCase();
        (this._inputValueAccessor = c || h),
          (this._previousNativeValue = this.value),
          (this.id = this.id),
          r.IOS &&
            u.runOutsideAngular(() => {
              n.nativeElement.addEventListener("keyup", this._iOSKeyupListener);
            }),
          (this._isServer = !this._platform.isBrowser),
          (this._isNativeSelect = p === "select"),
          (this._isTextarea = p === "textarea"),
          (this._isInFormField = !!f),
          this._isNativeSelect &&
            (this.controlType = h.multiple
              ? "mat-native-select-multiple"
              : "mat-native-select");
      }
      ngAfterViewInit() {
        this._platform.isBrowser &&
          this._autofillMonitor
            .monitor(this._elementRef.nativeElement)
            .subscribe((n) => {
              (this.autofilled = n.isAutofilled), this.stateChanges.next();
            });
      }
      ngOnChanges() {
        this.stateChanges.next();
      }
      ngOnDestroy() {
        this.stateChanges.complete(),
          this._platform.isBrowser &&
            this._autofillMonitor.stopMonitoring(
              this._elementRef.nativeElement
            ),
          this._platform.IOS &&
            this._elementRef.nativeElement.removeEventListener(
              "keyup",
              this._iOSKeyupListener
            );
      }
      ngDoCheck() {
        this.ngControl &&
          (this.updateErrorState(),
          this.ngControl.disabled !== null &&
            this.ngControl.disabled !== this.disabled &&
            ((this.disabled = this.ngControl.disabled),
            this.stateChanges.next())),
          this._dirtyCheckNativeValue(),
          this._dirtyCheckPlaceholder();
      }
      focus(n) {
        this._elementRef.nativeElement.focus(n);
      }
      _focusChanged(n) {
        n !== this.focused && ((this.focused = n), this.stateChanges.next());
      }
      _onInput() {}
      _dirtyCheckNativeValue() {
        let n = this._elementRef.nativeElement.value;
        this._previousNativeValue !== n &&
          ((this._previousNativeValue = n), this.stateChanges.next());
      }
      _dirtyCheckPlaceholder() {
        let n = this._getPlaceholder();
        if (n !== this._previousPlaceholder) {
          let r = this._elementRef.nativeElement;
          (this._previousPlaceholder = n),
            n
              ? r.setAttribute("placeholder", n)
              : r.removeAttribute("placeholder");
        }
      }
      _getPlaceholder() {
        return this.placeholder || null;
      }
      _validateType() {
        TP.indexOf(this._type) > -1;
      }
      _isNeverEmpty() {
        return this._neverEmptyInputTypes.indexOf(this._type) > -1;
      }
      _isBadInput() {
        let n = this._elementRef.nativeElement.validity;
        return n && n.badInput;
      }
      get empty() {
        return (
          !this._isNeverEmpty() &&
          !this._elementRef.nativeElement.value &&
          !this._isBadInput() &&
          !this.autofilled
        );
      }
      get shouldLabelFloat() {
        if (this._isNativeSelect) {
          let n = this._elementRef.nativeElement,
            r = n.options[0];
          return (
            this.focused ||
            n.multiple ||
            !this.empty ||
            !!(n.selectedIndex > -1 && r && r.label)
          );
        } else return this.focused || !this.empty;
      }
      setDescribedByIds(n) {
        n.length
          ? this._elementRef.nativeElement.setAttribute(
              "aria-describedby",
              n.join(" ")
            )
          : this._elementRef.nativeElement.removeAttribute("aria-describedby");
      }
      onContainerClick() {
        this.focused || this.focus();
      }
      _isInlineSelect() {
        let n = this._elementRef.nativeElement;
        return this._isNativeSelect && (n.multiple || n.size > 1);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        y(Z),
        y(Ce),
        y(Zi, 10),
        y(Ki, 8),
        y(fp, 8),
        y(vx),
        y(SP, 10),
        y(y0),
        y(R),
        y(Xc, 8)
      );
    }),
      (e.ɵdir = W({
        type: e,
        selectors: [
          ["input", "matInput", ""],
          ["textarea", "matInput", ""],
          ["select", "matNativeControl", ""],
          ["input", "matNativeControl", ""],
          ["textarea", "matNativeControl", ""],
        ],
        hostAttrs: [1, "mat-mdc-input-element"],
        hostVars: 18,
        hostBindings: function (r, o) {
          r & 1 &&
            ue("focus", function () {
              return o._focusChanged(!0);
            })("blur", function () {
              return o._focusChanged(!1);
            })("input", function () {
              return o._onInput();
            }),
            r & 2 &&
              (Vr("id", o.id)("disabled", o.disabled)("required", o.required),
              je("name", o.name || null)(
                "readonly",
                (o.readonly && !o._isNativeSelect) || null
              )("aria-invalid", o.empty && o.required ? null : o.errorState)(
                "aria-required",
                o.required
              )("id", o.id),
              Ie("mat-input-server", o._isServer)(
                "mat-mdc-form-field-textarea-control",
                o._isInFormField && o._isTextarea
              )("mat-mdc-form-field-input-control", o._isInFormField)(
                "mdc-text-field__input",
                o._isInFormField
              )("mat-mdc-native-select-inline", o._isInlineSelect()));
        },
        inputs: {
          disabled: "disabled",
          id: "id",
          placeholder: "placeholder",
          name: "name",
          required: "required",
          type: "type",
          errorStateMatcher: "errorStateMatcher",
          userAriaDescribedBy: ["aria-describedby", "userAriaDescribedBy"],
          value: "value",
          readonly: "readonly",
        },
        exportAs: ["matInput"],
        features: [$e([{ provide: Kc, useExisting: e }]), Oe, Ye],
      }));
    let t = e;
    return t;
  })(),
  td = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [ke, Fn, Fn, _0, ke] }));
    let t = e;
    return t;
  })();
var RP = 20,
  Ox = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._ngZone = n),
          (this._platform = r),
          (this._scrolled = new F()),
          (this._globalSubscription = null),
          (this._scrolledCount = 0),
          (this.scrollContainers = new Map()),
          (this._document = o);
      }
      register(n) {
        this.scrollContainers.has(n) ||
          this.scrollContainers.set(
            n,
            n.elementScrolled().subscribe(() => this._scrolled.next(n))
          );
      }
      deregister(n) {
        let r = this.scrollContainers.get(n);
        r && (r.unsubscribe(), this.scrollContainers.delete(n));
      }
      scrolled(n = RP) {
        return this._platform.isBrowser
          ? new U((r) => {
              this._globalSubscription || this._addGlobalListener();
              let o =
                n > 0
                  ? this._scrolled.pipe(Na(n)).subscribe(r)
                  : this._scrolled.subscribe(r);
              return (
                this._scrolledCount++,
                () => {
                  o.unsubscribe(),
                    this._scrolledCount--,
                    this._scrolledCount || this._removeGlobalListener();
                }
              );
            })
          : N();
      }
      ngOnDestroy() {
        this._removeGlobalListener(),
          this.scrollContainers.forEach((n, r) => this.deregister(r)),
          this._scrolled.complete();
      }
      ancestorScrolled(n, r) {
        let o = this.getAncestorScrollContainers(n);
        return this.scrolled(r).pipe(De((s) => !s || o.indexOf(s) > -1));
      }
      getAncestorScrollContainers(n) {
        let r = [];
        return (
          this.scrollContainers.forEach((o, s) => {
            this._scrollableContainsElement(s, n) && r.push(s);
          }),
          r
        );
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _scrollableContainsElement(n, r) {
        let o = pt(r),
          s = n.getElementRef().nativeElement;
        do if (o == s) return !0;
        while ((o = o.parentElement));
        return !1;
      }
      _addGlobalListener() {
        this._globalSubscription = this._ngZone.runOutsideAngular(() => {
          let n = this._getWindow();
          return Kt(n.document, "scroll").subscribe(() =>
            this._scrolled.next()
          );
        });
      }
      _removeGlobalListener() {
        this._globalSubscription &&
          (this._globalSubscription.unsubscribe(),
          (this._globalSubscription = null));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(R), v(Ce), v(J, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var OP = 20,
  lo = (() => {
    let e = class e {
      constructor(n, r, o) {
        (this._platform = n),
          (this._change = new F()),
          (this._changeListener = (s) => {
            this._change.next(s);
          }),
          (this._document = o),
          r.runOutsideAngular(() => {
            if (n.isBrowser) {
              let s = this._getWindow();
              s.addEventListener("resize", this._changeListener),
                s.addEventListener("orientationchange", this._changeListener);
            }
            this.change().subscribe(() => (this._viewportSize = null));
          });
      }
      ngOnDestroy() {
        if (this._platform.isBrowser) {
          let n = this._getWindow();
          n.removeEventListener("resize", this._changeListener),
            n.removeEventListener("orientationchange", this._changeListener);
        }
        this._change.complete();
      }
      getViewportSize() {
        this._viewportSize || this._updateViewportSize();
        let n = {
          width: this._viewportSize.width,
          height: this._viewportSize.height,
        };
        return this._platform.isBrowser || (this._viewportSize = null), n;
      }
      getViewportRect() {
        let n = this.getViewportScrollPosition(),
          { width: r, height: o } = this.getViewportSize();
        return {
          top: n.top,
          left: n.left,
          bottom: n.top + o,
          right: n.left + r,
          height: o,
          width: r,
        };
      }
      getViewportScrollPosition() {
        if (!this._platform.isBrowser) return { top: 0, left: 0 };
        let n = this._document,
          r = this._getWindow(),
          o = n.documentElement,
          s = o.getBoundingClientRect(),
          a = -s.top || n.body.scrollTop || r.scrollY || o.scrollTop || 0,
          l = -s.left || n.body.scrollLeft || r.scrollX || o.scrollLeft || 0;
        return { top: a, left: l };
      }
      change(n = OP) {
        return n > 0 ? this._change.pipe(Na(n)) : this._change;
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _updateViewportSize() {
        let n = this._getWindow();
        this._viewportSize = this._platform.isBrowser
          ? { width: n.innerWidth, height: n.innerHeight }
          : { width: 0, height: 0 };
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ce), v(R), v(J, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var nd = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({}));
    let t = e;
    return t;
  })(),
  am = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [li, nd, li, nd] }));
    let t = e;
    return t;
  })();
var Gs = class {
    attach(e) {
      return (this._attachedHost = e), e.attach(this);
    }
    detach() {
      let e = this._attachedHost;
      e != null && ((this._attachedHost = null), e.detach());
    }
    get isAttached() {
      return this._attachedHost != null;
    }
    setAttachedHost(e) {
      this._attachedHost = e;
    }
  },
  lm = class extends Gs {
    constructor(e, i, n, r, o) {
      super(),
        (this.component = e),
        (this.viewContainerRef = i),
        (this.injector = n),
        (this.componentFactoryResolver = r),
        (this.projectableNodes = o);
    }
  },
  Ys = class extends Gs {
    constructor(e, i, n, r) {
      super(),
        (this.templateRef = e),
        (this.viewContainerRef = i),
        (this.context = n),
        (this.injector = r);
    }
    get origin() {
      return this.templateRef.elementRef;
    }
    attach(e, i = this.context) {
      return (this.context = i), super.attach(e);
    }
    detach() {
      return (this.context = void 0), super.detach();
    }
  },
  cm = class extends Gs {
    constructor(e) {
      super(), (this.element = e instanceof Z ? e.nativeElement : e);
    }
  },
  dm = class {
    constructor() {
      (this._isDisposed = !1), (this.attachDomPortal = null);
    }
    hasAttached() {
      return !!this._attachedPortal;
    }
    attach(e) {
      if (e instanceof lm)
        return (this._attachedPortal = e), this.attachComponentPortal(e);
      if (e instanceof Ys)
        return (this._attachedPortal = e), this.attachTemplatePortal(e);
      if (this.attachDomPortal && e instanceof cm)
        return (this._attachedPortal = e), this.attachDomPortal(e);
    }
    detach() {
      this._attachedPortal &&
        (this._attachedPortal.setAttachedHost(null),
        (this._attachedPortal = null)),
        this._invokeDisposeFn();
    }
    dispose() {
      this.hasAttached() && this.detach(),
        this._invokeDisposeFn(),
        (this._isDisposed = !0);
    }
    setDisposeFn(e) {
      this._disposeFn = e;
    }
    _invokeDisposeFn() {
      this._disposeFn && (this._disposeFn(), (this._disposeFn = null));
    }
  };
var id = class extends dm {
  constructor(e, i, n, r, o) {
    super(),
      (this.outletElement = e),
      (this._componentFactoryResolver = i),
      (this._appRef = n),
      (this._defaultInjector = r),
      (this.attachDomPortal = (s) => {
        this._document;
        let a = s.element;
        a.parentNode;
        let l = this._document.createComment("dom-portal");
        a.parentNode.insertBefore(l, a),
          this.outletElement.appendChild(a),
          (this._attachedPortal = s),
          super.setDisposeFn(() => {
            l.parentNode && l.parentNode.replaceChild(a, l);
          });
      }),
      (this._document = o);
  }
  attachComponentPortal(e) {
    let n = (
        e.componentFactoryResolver || this._componentFactoryResolver
      ).resolveComponentFactory(e.component),
      r;
    return (
      e.viewContainerRef
        ? ((r = e.viewContainerRef.createComponent(
            n,
            e.viewContainerRef.length,
            e.injector || e.viewContainerRef.injector,
            e.projectableNodes || void 0
          )),
          this.setDisposeFn(() => r.destroy()))
        : ((r = n.create(e.injector || this._defaultInjector || Bt.NULL)),
          this._appRef.attachView(r.hostView),
          this.setDisposeFn(() => {
            this._appRef.viewCount > 0 && this._appRef.detachView(r.hostView),
              r.destroy();
          })),
      this.outletElement.appendChild(this._getComponentRootNode(r)),
      (this._attachedPortal = e),
      r
    );
  }
  attachTemplatePortal(e) {
    let i = e.viewContainerRef,
      n = i.createEmbeddedView(e.templateRef, e.context, {
        injector: e.injector,
      });
    return (
      n.rootNodes.forEach((r) => this.outletElement.appendChild(r)),
      n.detectChanges(),
      this.setDisposeFn(() => {
        let r = i.indexOf(n);
        r !== -1 && i.remove(r);
      }),
      (this._attachedPortal = e),
      n
    );
  }
  dispose() {
    super.dispose(), this.outletElement.remove();
  }
  _getComponentRootNode(e) {
    return e.hostView.rootNodes[0];
  }
};
var rd = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({}));
  let t = e;
  return t;
})();
var Nx = g0(),
  um = class {
    constructor(e, i) {
      (this._viewportRuler = e),
        (this._previousHTMLStyles = { top: "", left: "" }),
        (this._isEnabled = !1),
        (this._document = i);
    }
    attach() {}
    enable() {
      if (this._canBeEnabled()) {
        let e = this._document.documentElement;
        (this._previousScrollPosition =
          this._viewportRuler.getViewportScrollPosition()),
          (this._previousHTMLStyles.left = e.style.left || ""),
          (this._previousHTMLStyles.top = e.style.top || ""),
          (e.style.left = Pe(-this._previousScrollPosition.left)),
          (e.style.top = Pe(-this._previousScrollPosition.top)),
          e.classList.add("cdk-global-scrollblock"),
          (this._isEnabled = !0);
      }
    }
    disable() {
      if (this._isEnabled) {
        let e = this._document.documentElement,
          i = this._document.body,
          n = e.style,
          r = i.style,
          o = n.scrollBehavior || "",
          s = r.scrollBehavior || "";
        (this._isEnabled = !1),
          (n.left = this._previousHTMLStyles.left),
          (n.top = this._previousHTMLStyles.top),
          e.classList.remove("cdk-global-scrollblock"),
          Nx && (n.scrollBehavior = r.scrollBehavior = "auto"),
          window.scroll(
            this._previousScrollPosition.left,
            this._previousScrollPosition.top
          ),
          Nx && ((n.scrollBehavior = o), (r.scrollBehavior = s));
      }
    }
    _canBeEnabled() {
      if (
        this._document.documentElement.classList.contains(
          "cdk-global-scrollblock"
        ) ||
        this._isEnabled
      )
        return !1;
      let i = this._document.body,
        n = this._viewportRuler.getViewportSize();
      return i.scrollHeight > n.height || i.scrollWidth > n.width;
    }
  };
var fm = class {
    constructor(e, i, n, r) {
      (this._scrollDispatcher = e),
        (this._ngZone = i),
        (this._viewportRuler = n),
        (this._config = r),
        (this._scrollSubscription = null),
        (this._detach = () => {
          this.disable(),
            this._overlayRef.hasAttached() &&
              this._ngZone.run(() => this._overlayRef.detach());
        });
    }
    attach(e) {
      this._overlayRef, (this._overlayRef = e);
    }
    enable() {
      if (this._scrollSubscription) return;
      let e = this._scrollDispatcher
        .scrolled(0)
        .pipe(
          De(
            (i) =>
              !i ||
              !this._overlayRef.overlayElement.contains(
                i.getElementRef().nativeElement
              )
          )
        );
      this._config && this._config.threshold && this._config.threshold > 1
        ? ((this._initialScrollPosition =
            this._viewportRuler.getViewportScrollPosition().top),
          (this._scrollSubscription = e.subscribe(() => {
            let i = this._viewportRuler.getViewportScrollPosition().top;
            Math.abs(i - this._initialScrollPosition) > this._config.threshold
              ? this._detach()
              : this._overlayRef.updatePosition();
          })))
        : (this._scrollSubscription = e.subscribe(this._detach));
    }
    disable() {
      this._scrollSubscription &&
        (this._scrollSubscription.unsubscribe(),
        (this._scrollSubscription = null));
    }
    detach() {
      this.disable(), (this._overlayRef = null);
    }
  },
  od = class {
    enable() {}
    disable() {}
    attach() {}
  };
function hm(t, e) {
  return e.some((i) => {
    let n = t.bottom < i.top,
      r = t.top > i.bottom,
      o = t.right < i.left,
      s = t.left > i.right;
    return n || r || o || s;
  });
}
function Px(t, e) {
  return e.some((i) => {
    let n = t.top < i.top,
      r = t.bottom > i.bottom,
      o = t.left < i.left,
      s = t.right > i.right;
    return n || r || o || s;
  });
}
var pm = class {
    constructor(e, i, n, r) {
      (this._scrollDispatcher = e),
        (this._viewportRuler = i),
        (this._ngZone = n),
        (this._config = r),
        (this._scrollSubscription = null);
    }
    attach(e) {
      this._overlayRef, (this._overlayRef = e);
    }
    enable() {
      if (!this._scrollSubscription) {
        let e = this._config ? this._config.scrollThrottle : 0;
        this._scrollSubscription = this._scrollDispatcher
          .scrolled(e)
          .subscribe(() => {
            if (
              (this._overlayRef.updatePosition(),
              this._config && this._config.autoClose)
            ) {
              let i = this._overlayRef.overlayElement.getBoundingClientRect(),
                { width: n, height: r } = this._viewportRuler.getViewportSize();
              hm(i, [
                { width: n, height: r, bottom: r, right: n, top: 0, left: 0 },
              ]) &&
                (this.disable(),
                this._ngZone.run(() => this._overlayRef.detach()));
            }
          });
      }
    }
    disable() {
      this._scrollSubscription &&
        (this._scrollSubscription.unsubscribe(),
        (this._scrollSubscription = null));
    }
    detach() {
      this.disable(), (this._overlayRef = null);
    }
  },
  kP = (() => {
    let e = class e {
      constructor(n, r, o, s) {
        (this._scrollDispatcher = n),
          (this._viewportRuler = r),
          (this._ngZone = o),
          (this.noop = () => new od()),
          (this.close = (a) =>
            new fm(
              this._scrollDispatcher,
              this._ngZone,
              this._viewportRuler,
              a
            )),
          (this.block = () => new um(this._viewportRuler, this._document)),
          (this.reposition = (a) =>
            new pm(
              this._scrollDispatcher,
              this._viewportRuler,
              this._ngZone,
              a
            )),
          (this._document = s);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(Ox), v(lo), v(R), v(J));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  mm = class {
    constructor(e) {
      if (
        ((this.scrollStrategy = new od()),
        (this.panelClass = ""),
        (this.hasBackdrop = !1),
        (this.backdropClass = "cdk-overlay-dark-backdrop"),
        (this.disposeOnNavigation = !1),
        e)
      ) {
        let i = Object.keys(e);
        for (let n of i) e[n] !== void 0 && (this[n] = e[n]);
      }
    }
  };
var gm = class {
  constructor(e, i) {
    (this.connectionPair = e), (this.scrollableViewProperties = i);
  }
};
var Bx = (() => {
    let e = class e {
      constructor(n) {
        (this._attachedOverlays = []), (this._document = n);
      }
      ngOnDestroy() {
        this.detach();
      }
      add(n) {
        this.remove(n), this._attachedOverlays.push(n);
      }
      remove(n) {
        let r = this._attachedOverlays.indexOf(n);
        r > -1 && this._attachedOverlays.splice(r, 1),
          this._attachedOverlays.length === 0 && this.detach();
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  NP = (() => {
    let e = class e extends Bx {
      constructor(n, r) {
        super(n),
          (this._ngZone = r),
          (this._keydownListener = (o) => {
            let s = this._attachedOverlays;
            for (let a = s.length - 1; a > -1; a--)
              if (s[a]._keydownEvents.observers.length > 0) {
                let l = s[a]._keydownEvents;
                this._ngZone ? this._ngZone.run(() => l.next(o)) : l.next(o);
                break;
              }
          });
      }
      add(n) {
        super.add(n),
          this._isAttached ||
            (this._ngZone
              ? this._ngZone.runOutsideAngular(() =>
                  this._document.body.addEventListener(
                    "keydown",
                    this._keydownListener
                  )
                )
              : this._document.body.addEventListener(
                  "keydown",
                  this._keydownListener
                ),
            (this._isAttached = !0));
      }
      detach() {
        this._isAttached &&
          (this._document.body.removeEventListener(
            "keydown",
            this._keydownListener
          ),
          (this._isAttached = !1));
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J), v(R, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  PP = (() => {
    let e = class e extends Bx {
      constructor(n, r, o) {
        super(n),
          (this._platform = r),
          (this._ngZone = o),
          (this._cursorStyleIsSet = !1),
          (this._pointerDownListener = (s) => {
            this._pointerDownEventTarget = Wt(s);
          }),
          (this._clickListener = (s) => {
            let a = Wt(s),
              l =
                s.type === "click" && this._pointerDownEventTarget
                  ? this._pointerDownEventTarget
                  : a;
            this._pointerDownEventTarget = null;
            let c = this._attachedOverlays.slice();
            for (let d = c.length - 1; d > -1; d--) {
              let u = c[d];
              if (
                u._outsidePointerEvents.observers.length < 1 ||
                !u.hasAttached()
              )
                continue;
              if (u.overlayElement.contains(a) || u.overlayElement.contains(l))
                break;
              let f = u._outsidePointerEvents;
              this._ngZone ? this._ngZone.run(() => f.next(s)) : f.next(s);
            }
          });
      }
      add(n) {
        if ((super.add(n), !this._isAttached)) {
          let r = this._document.body;
          this._ngZone
            ? this._ngZone.runOutsideAngular(() => this._addEventListeners(r))
            : this._addEventListeners(r),
            this._platform.IOS &&
              !this._cursorStyleIsSet &&
              ((this._cursorOriginalValue = r.style.cursor),
              (r.style.cursor = "pointer"),
              (this._cursorStyleIsSet = !0)),
            (this._isAttached = !0);
        }
      }
      detach() {
        if (this._isAttached) {
          let n = this._document.body;
          n.removeEventListener("pointerdown", this._pointerDownListener, !0),
            n.removeEventListener("click", this._clickListener, !0),
            n.removeEventListener("auxclick", this._clickListener, !0),
            n.removeEventListener("contextmenu", this._clickListener, !0),
            this._platform.IOS &&
              this._cursorStyleIsSet &&
              ((n.style.cursor = this._cursorOriginalValue),
              (this._cursorStyleIsSet = !1)),
            (this._isAttached = !1);
        }
      }
      _addEventListeners(n) {
        n.addEventListener("pointerdown", this._pointerDownListener, !0),
          n.addEventListener("click", this._clickListener, !0),
          n.addEventListener("auxclick", this._clickListener, !0),
          n.addEventListener("contextmenu", this._clickListener, !0);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J), v(Ce), v(R, 8));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Ux = (() => {
    let e = class e {
      constructor(n, r) {
        (this._platform = r), (this._document = n);
      }
      ngOnDestroy() {
        this._containerElement?.remove();
      }
      getContainerElement() {
        return (
          this._containerElement || this._createContainer(),
          this._containerElement
        );
      }
      _createContainer() {
        let n = "cdk-overlay-container";
        if (this._platform.isBrowser || Ps()) {
          let o = this._document.querySelectorAll(
            `.${n}[platform="server"], .${n}[platform="test"]`
          );
          for (let s = 0; s < o.length; s++) o[s].remove();
        }
        let r = this._document.createElement("div");
        r.classList.add(n),
          Ps()
            ? r.setAttribute("platform", "test")
            : this._platform.isBrowser || r.setAttribute("platform", "server"),
          this._document.body.appendChild(r),
          (this._containerElement = r);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(J), v(Ce));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  bm = class {
    constructor(e, i, n, r, o, s, a, l, c, d = !1) {
      (this._portalOutlet = e),
        (this._host = i),
        (this._pane = n),
        (this._config = r),
        (this._ngZone = o),
        (this._keyboardDispatcher = s),
        (this._document = a),
        (this._location = l),
        (this._outsideClickDispatcher = c),
        (this._animationsDisabled = d),
        (this._backdropElement = null),
        (this._backdropClick = new F()),
        (this._attachments = new F()),
        (this._detachments = new F()),
        (this._locationChanges = ce.EMPTY),
        (this._backdropClickHandler = (u) => this._backdropClick.next(u)),
        (this._backdropTransitionendHandler = (u) => {
          this._disposeBackdrop(u.target);
        }),
        (this._keydownEvents = new F()),
        (this._outsidePointerEvents = new F()),
        r.scrollStrategy &&
          ((this._scrollStrategy = r.scrollStrategy),
          this._scrollStrategy.attach(this)),
        (this._positionStrategy = r.positionStrategy);
    }
    get overlayElement() {
      return this._pane;
    }
    get backdropElement() {
      return this._backdropElement;
    }
    get hostElement() {
      return this._host;
    }
    attach(e) {
      !this._host.parentElement &&
        this._previousHostParent &&
        this._previousHostParent.appendChild(this._host);
      let i = this._portalOutlet.attach(e);
      return (
        this._positionStrategy && this._positionStrategy.attach(this),
        this._updateStackingOrder(),
        this._updateElementSize(),
        this._updateElementDirection(),
        this._scrollStrategy && this._scrollStrategy.enable(),
        this._ngZone.onStable.pipe(Ae(1)).subscribe(() => {
          this.hasAttached() && this.updatePosition();
        }),
        this._togglePointerEvents(!0),
        this._config.hasBackdrop && this._attachBackdrop(),
        this._config.panelClass &&
          this._toggleClasses(this._pane, this._config.panelClass, !0),
        this._attachments.next(),
        this._keyboardDispatcher.add(this),
        this._config.disposeOnNavigation &&
          (this._locationChanges = this._location.subscribe(() =>
            this.dispose()
          )),
        this._outsideClickDispatcher.add(this),
        typeof i?.onDestroy == "function" &&
          i.onDestroy(() => {
            this.hasAttached() &&
              this._ngZone.runOutsideAngular(() =>
                Promise.resolve().then(() => this.detach())
              );
          }),
        i
      );
    }
    detach() {
      if (!this.hasAttached()) return;
      this.detachBackdrop(),
        this._togglePointerEvents(!1),
        this._positionStrategy &&
          this._positionStrategy.detach &&
          this._positionStrategy.detach(),
        this._scrollStrategy && this._scrollStrategy.disable();
      let e = this._portalOutlet.detach();
      return (
        this._detachments.next(),
        this._keyboardDispatcher.remove(this),
        this._detachContentWhenStable(),
        this._locationChanges.unsubscribe(),
        this._outsideClickDispatcher.remove(this),
        e
      );
    }
    dispose() {
      let e = this.hasAttached();
      this._positionStrategy && this._positionStrategy.dispose(),
        this._disposeScrollStrategy(),
        this._disposeBackdrop(this._backdropElement),
        this._locationChanges.unsubscribe(),
        this._keyboardDispatcher.remove(this),
        this._portalOutlet.dispose(),
        this._attachments.complete(),
        this._backdropClick.complete(),
        this._keydownEvents.complete(),
        this._outsidePointerEvents.complete(),
        this._outsideClickDispatcher.remove(this),
        this._host?.remove(),
        (this._previousHostParent = this._pane = this._host = null),
        e && this._detachments.next(),
        this._detachments.complete();
    }
    hasAttached() {
      return this._portalOutlet.hasAttached();
    }
    backdropClick() {
      return this._backdropClick;
    }
    attachments() {
      return this._attachments;
    }
    detachments() {
      return this._detachments;
    }
    keydownEvents() {
      return this._keydownEvents;
    }
    outsidePointerEvents() {
      return this._outsidePointerEvents;
    }
    getConfig() {
      return this._config;
    }
    updatePosition() {
      this._positionStrategy && this._positionStrategy.apply();
    }
    updatePositionStrategy(e) {
      e !== this._positionStrategy &&
        (this._positionStrategy && this._positionStrategy.dispose(),
        (this._positionStrategy = e),
        this.hasAttached() && (e.attach(this), this.updatePosition()));
    }
    updateSize(e) {
      (this._config = C(C({}, this._config), e)), this._updateElementSize();
    }
    setDirection(e) {
      (this._config = ae(C({}, this._config), { direction: e })),
        this._updateElementDirection();
    }
    addPanelClass(e) {
      this._pane && this._toggleClasses(this._pane, e, !0);
    }
    removePanelClass(e) {
      this._pane && this._toggleClasses(this._pane, e, !1);
    }
    getDirection() {
      let e = this._config.direction;
      return e ? (typeof e == "string" ? e : e.value) : "ltr";
    }
    updateScrollStrategy(e) {
      e !== this._scrollStrategy &&
        (this._disposeScrollStrategy(),
        (this._scrollStrategy = e),
        this.hasAttached() && (e.attach(this), e.enable()));
    }
    _updateElementDirection() {
      this._host.setAttribute("dir", this.getDirection());
    }
    _updateElementSize() {
      if (!this._pane) return;
      let e = this._pane.style;
      (e.width = Pe(this._config.width)),
        (e.height = Pe(this._config.height)),
        (e.minWidth = Pe(this._config.minWidth)),
        (e.minHeight = Pe(this._config.minHeight)),
        (e.maxWidth = Pe(this._config.maxWidth)),
        (e.maxHeight = Pe(this._config.maxHeight));
    }
    _togglePointerEvents(e) {
      this._pane.style.pointerEvents = e ? "" : "none";
    }
    _attachBackdrop() {
      let e = "cdk-overlay-backdrop-showing";
      (this._backdropElement = this._document.createElement("div")),
        this._backdropElement.classList.add("cdk-overlay-backdrop"),
        this._animationsDisabled &&
          this._backdropElement.classList.add(
            "cdk-overlay-backdrop-noop-animation"
          ),
        this._config.backdropClass &&
          this._toggleClasses(
            this._backdropElement,
            this._config.backdropClass,
            !0
          ),
        this._host.parentElement.insertBefore(
          this._backdropElement,
          this._host
        ),
        this._backdropElement.addEventListener(
          "click",
          this._backdropClickHandler
        ),
        !this._animationsDisabled && typeof requestAnimationFrame < "u"
          ? this._ngZone.runOutsideAngular(() => {
              requestAnimationFrame(() => {
                this._backdropElement && this._backdropElement.classList.add(e);
              });
            })
          : this._backdropElement.classList.add(e);
    }
    _updateStackingOrder() {
      this._host.nextSibling && this._host.parentNode.appendChild(this._host);
    }
    detachBackdrop() {
      let e = this._backdropElement;
      if (e) {
        if (this._animationsDisabled) {
          this._disposeBackdrop(e);
          return;
        }
        e.classList.remove("cdk-overlay-backdrop-showing"),
          this._ngZone.runOutsideAngular(() => {
            e.addEventListener(
              "transitionend",
              this._backdropTransitionendHandler
            );
          }),
          (e.style.pointerEvents = "none"),
          (this._backdropTimeout = this._ngZone.runOutsideAngular(() =>
            setTimeout(() => {
              this._disposeBackdrop(e);
            }, 500)
          ));
      }
    }
    _toggleClasses(e, i, n) {
      let r = Jr(i || []).filter((o) => !!o);
      r.length && (n ? e.classList.add(...r) : e.classList.remove(...r));
    }
    _detachContentWhenStable() {
      this._ngZone.runOutsideAngular(() => {
        let e = this._ngZone.onStable
          .pipe(Se(Hn(this._attachments, this._detachments)))
          .subscribe(() => {
            (!this._pane || !this._host || this._pane.children.length === 0) &&
              (this._pane &&
                this._config.panelClass &&
                this._toggleClasses(this._pane, this._config.panelClass, !1),
              this._host &&
                this._host.parentElement &&
                ((this._previousHostParent = this._host.parentElement),
                this._host.remove()),
              e.unsubscribe());
          });
      });
    }
    _disposeScrollStrategy() {
      let e = this._scrollStrategy;
      e && (e.disable(), e.detach && e.detach());
    }
    _disposeBackdrop(e) {
      e &&
        (e.removeEventListener("click", this._backdropClickHandler),
        e.removeEventListener(
          "transitionend",
          this._backdropTransitionendHandler
        ),
        e.remove(),
        this._backdropElement === e && (this._backdropElement = null)),
        this._backdropTimeout &&
          (clearTimeout(this._backdropTimeout),
          (this._backdropTimeout = void 0));
    }
  },
  Fx = "cdk-overlay-connected-position-bounding-box",
  FP = /([A-Za-z%]+)$/,
  vm = class {
    get positions() {
      return this._preferredPositions;
    }
    constructor(e, i, n, r, o) {
      (this._viewportRuler = i),
        (this._document = n),
        (this._platform = r),
        (this._overlayContainer = o),
        (this._lastBoundingBoxSize = { width: 0, height: 0 }),
        (this._isPushed = !1),
        (this._canPush = !0),
        (this._growAfterOpen = !1),
        (this._hasFlexibleDimensions = !0),
        (this._positionLocked = !1),
        (this._viewportMargin = 0),
        (this._scrollables = []),
        (this._preferredPositions = []),
        (this._positionChanges = new F()),
        (this._resizeSubscription = ce.EMPTY),
        (this._offsetX = 0),
        (this._offsetY = 0),
        (this._appliedPanelClasses = []),
        (this.positionChanges = this._positionChanges),
        this.setOrigin(e);
    }
    attach(e) {
      this._overlayRef && this._overlayRef,
        this._validatePositions(),
        e.hostElement.classList.add(Fx),
        (this._overlayRef = e),
        (this._boundingBox = e.hostElement),
        (this._pane = e.overlayElement),
        (this._isDisposed = !1),
        (this._isInitialRender = !0),
        (this._lastPosition = null),
        this._resizeSubscription.unsubscribe(),
        (this._resizeSubscription = this._viewportRuler
          .change()
          .subscribe(() => {
            (this._isInitialRender = !0), this.apply();
          }));
    }
    apply() {
      if (this._isDisposed || !this._platform.isBrowser) return;
      if (
        !this._isInitialRender &&
        this._positionLocked &&
        this._lastPosition
      ) {
        this.reapplyLastPosition();
        return;
      }
      this._clearPanelClasses(),
        this._resetOverlayElementStyles(),
        this._resetBoundingBoxStyles(),
        (this._viewportRect = this._getNarrowedViewportRect()),
        (this._originRect = this._getOriginRect()),
        (this._overlayRect = this._pane.getBoundingClientRect()),
        (this._containerRect = this._overlayContainer
          .getContainerElement()
          .getBoundingClientRect());
      let e = this._originRect,
        i = this._overlayRect,
        n = this._viewportRect,
        r = this._containerRect,
        o = [],
        s;
      for (let a of this._preferredPositions) {
        let l = this._getOriginPoint(e, r, a),
          c = this._getOverlayPoint(l, i, a),
          d = this._getOverlayFit(c, i, n, a);
        if (d.isCompletelyWithinViewport) {
          (this._isPushed = !1), this._applyPosition(a, l);
          return;
        }
        if (this._canFitWithFlexibleDimensions(d, c, n)) {
          o.push({
            position: a,
            origin: l,
            overlayRect: i,
            boundingBoxRect: this._calculateBoundingBoxRect(l, a),
          });
          continue;
        }
        (!s || s.overlayFit.visibleArea < d.visibleArea) &&
          (s = {
            overlayFit: d,
            overlayPoint: c,
            originPoint: l,
            position: a,
            overlayRect: i,
          });
      }
      if (o.length) {
        let a = null,
          l = -1;
        for (let c of o) {
          let d =
            c.boundingBoxRect.width *
            c.boundingBoxRect.height *
            (c.position.weight || 1);
          d > l && ((l = d), (a = c));
        }
        (this._isPushed = !1), this._applyPosition(a.position, a.origin);
        return;
      }
      if (this._canPush) {
        (this._isPushed = !0), this._applyPosition(s.position, s.originPoint);
        return;
      }
      this._applyPosition(s.position, s.originPoint);
    }
    detach() {
      this._clearPanelClasses(),
        (this._lastPosition = null),
        (this._previousPushAmount = null),
        this._resizeSubscription.unsubscribe();
    }
    dispose() {
      this._isDisposed ||
        (this._boundingBox &&
          or(this._boundingBox.style, {
            top: "",
            left: "",
            right: "",
            bottom: "",
            height: "",
            width: "",
            alignItems: "",
            justifyContent: "",
          }),
        this._pane && this._resetOverlayElementStyles(),
        this._overlayRef && this._overlayRef.hostElement.classList.remove(Fx),
        this.detach(),
        this._positionChanges.complete(),
        (this._overlayRef = this._boundingBox = null),
        (this._isDisposed = !0));
    }
    reapplyLastPosition() {
      if (this._isDisposed || !this._platform.isBrowser) return;
      let e = this._lastPosition;
      if (e) {
        (this._originRect = this._getOriginRect()),
          (this._overlayRect = this._pane.getBoundingClientRect()),
          (this._viewportRect = this._getNarrowedViewportRect()),
          (this._containerRect = this._overlayContainer
            .getContainerElement()
            .getBoundingClientRect());
        let i = this._getOriginPoint(this._originRect, this._containerRect, e);
        this._applyPosition(e, i);
      } else this.apply();
    }
    withScrollableContainers(e) {
      return (this._scrollables = e), this;
    }
    withPositions(e) {
      return (
        (this._preferredPositions = e),
        e.indexOf(this._lastPosition) === -1 && (this._lastPosition = null),
        this._validatePositions(),
        this
      );
    }
    withViewportMargin(e) {
      return (this._viewportMargin = e), this;
    }
    withFlexibleDimensions(e = !0) {
      return (this._hasFlexibleDimensions = e), this;
    }
    withGrowAfterOpen(e = !0) {
      return (this._growAfterOpen = e), this;
    }
    withPush(e = !0) {
      return (this._canPush = e), this;
    }
    withLockedPosition(e = !0) {
      return (this._positionLocked = e), this;
    }
    setOrigin(e) {
      return (this._origin = e), this;
    }
    withDefaultOffsetX(e) {
      return (this._offsetX = e), this;
    }
    withDefaultOffsetY(e) {
      return (this._offsetY = e), this;
    }
    withTransformOriginOn(e) {
      return (this._transformOriginSelector = e), this;
    }
    _getOriginPoint(e, i, n) {
      let r;
      if (n.originX == "center") r = e.left + e.width / 2;
      else {
        let s = this._isRtl() ? e.right : e.left,
          a = this._isRtl() ? e.left : e.right;
        r = n.originX == "start" ? s : a;
      }
      i.left < 0 && (r -= i.left);
      let o;
      return (
        n.originY == "center"
          ? (o = e.top + e.height / 2)
          : (o = n.originY == "top" ? e.top : e.bottom),
        i.top < 0 && (o -= i.top),
        { x: r, y: o }
      );
    }
    _getOverlayPoint(e, i, n) {
      let r;
      n.overlayX == "center"
        ? (r = -i.width / 2)
        : n.overlayX === "start"
        ? (r = this._isRtl() ? -i.width : 0)
        : (r = this._isRtl() ? 0 : -i.width);
      let o;
      return (
        n.overlayY == "center"
          ? (o = -i.height / 2)
          : (o = n.overlayY == "top" ? 0 : -i.height),
        { x: e.x + r, y: e.y + o }
      );
    }
    _getOverlayFit(e, i, n, r) {
      let o = jx(i),
        { x: s, y: a } = e,
        l = this._getOffset(r, "x"),
        c = this._getOffset(r, "y");
      l && (s += l), c && (a += c);
      let d = 0 - s,
        u = s + o.width - n.width,
        f = 0 - a,
        h = a + o.height - n.height,
        p = this._subtractOverflows(o.width, d, u),
        m = this._subtractOverflows(o.height, f, h),
        g = p * m;
      return {
        visibleArea: g,
        isCompletelyWithinViewport: o.width * o.height === g,
        fitsInViewportVertically: m === o.height,
        fitsInViewportHorizontally: p == o.width,
      };
    }
    _canFitWithFlexibleDimensions(e, i, n) {
      if (this._hasFlexibleDimensions) {
        let r = n.bottom - i.y,
          o = n.right - i.x,
          s = Lx(this._overlayRef.getConfig().minHeight),
          a = Lx(this._overlayRef.getConfig().minWidth),
          l = e.fitsInViewportVertically || (s != null && s <= r),
          c = e.fitsInViewportHorizontally || (a != null && a <= o);
        return l && c;
      }
      return !1;
    }
    _pushOverlayOnScreen(e, i, n) {
      if (this._previousPushAmount && this._positionLocked)
        return {
          x: e.x + this._previousPushAmount.x,
          y: e.y + this._previousPushAmount.y,
        };
      let r = jx(i),
        o = this._viewportRect,
        s = Math.max(e.x + r.width - o.width, 0),
        a = Math.max(e.y + r.height - o.height, 0),
        l = Math.max(o.top - n.top - e.y, 0),
        c = Math.max(o.left - n.left - e.x, 0),
        d = 0,
        u = 0;
      return (
        r.width <= o.width
          ? (d = c || -s)
          : (d = e.x < this._viewportMargin ? o.left - n.left - e.x : 0),
        r.height <= o.height
          ? (u = l || -a)
          : (u = e.y < this._viewportMargin ? o.top - n.top - e.y : 0),
        (this._previousPushAmount = { x: d, y: u }),
        { x: e.x + d, y: e.y + u }
      );
    }
    _applyPosition(e, i) {
      if (
        (this._setTransformOrigin(e),
        this._setOverlayElementStyles(i, e),
        this._setBoundingBoxStyles(i, e),
        e.panelClass && this._addPanelClasses(e.panelClass),
        (this._lastPosition = e),
        this._positionChanges.observers.length)
      ) {
        let n = this._getScrollVisibility(),
          r = new gm(e, n);
        this._positionChanges.next(r);
      }
      this._isInitialRender = !1;
    }
    _setTransformOrigin(e) {
      if (!this._transformOriginSelector) return;
      let i = this._boundingBox.querySelectorAll(this._transformOriginSelector),
        n,
        r = e.overlayY;
      e.overlayX === "center"
        ? (n = "center")
        : this._isRtl()
        ? (n = e.overlayX === "start" ? "right" : "left")
        : (n = e.overlayX === "start" ? "left" : "right");
      for (let o = 0; o < i.length; o++)
        i[o].style.transformOrigin = `${n} ${r}`;
    }
    _calculateBoundingBoxRect(e, i) {
      let n = this._viewportRect,
        r = this._isRtl(),
        o,
        s,
        a;
      if (i.overlayY === "top")
        (s = e.y), (o = n.height - s + this._viewportMargin);
      else if (i.overlayY === "bottom")
        (a = n.height - e.y + this._viewportMargin * 2),
          (o = n.height - a + this._viewportMargin);
      else {
        let h = Math.min(n.bottom - e.y + n.top, e.y),
          p = this._lastBoundingBoxSize.height;
        (o = h * 2),
          (s = e.y - h),
          o > p &&
            !this._isInitialRender &&
            !this._growAfterOpen &&
            (s = e.y - p / 2);
      }
      let l = (i.overlayX === "start" && !r) || (i.overlayX === "end" && r),
        c = (i.overlayX === "end" && !r) || (i.overlayX === "start" && r),
        d,
        u,
        f;
      if (c)
        (f = n.width - e.x + this._viewportMargin),
          (d = e.x - this._viewportMargin);
      else if (l) (u = e.x), (d = n.right - e.x);
      else {
        let h = Math.min(n.right - e.x + n.left, e.x),
          p = this._lastBoundingBoxSize.width;
        (d = h * 2),
          (u = e.x - h),
          d > p &&
            !this._isInitialRender &&
            !this._growAfterOpen &&
            (u = e.x - p / 2);
      }
      return { top: s, left: u, bottom: a, right: f, width: d, height: o };
    }
    _setBoundingBoxStyles(e, i) {
      let n = this._calculateBoundingBoxRect(e, i);
      !this._isInitialRender &&
        !this._growAfterOpen &&
        ((n.height = Math.min(n.height, this._lastBoundingBoxSize.height)),
        (n.width = Math.min(n.width, this._lastBoundingBoxSize.width)));
      let r = {};
      if (this._hasExactPosition())
        (r.top = r.left = "0"),
          (r.bottom = r.right = r.maxHeight = r.maxWidth = ""),
          (r.width = r.height = "100%");
      else {
        let o = this._overlayRef.getConfig().maxHeight,
          s = this._overlayRef.getConfig().maxWidth;
        (r.height = Pe(n.height)),
          (r.top = Pe(n.top)),
          (r.bottom = Pe(n.bottom)),
          (r.width = Pe(n.width)),
          (r.left = Pe(n.left)),
          (r.right = Pe(n.right)),
          i.overlayX === "center"
            ? (r.alignItems = "center")
            : (r.alignItems = i.overlayX === "end" ? "flex-end" : "flex-start"),
          i.overlayY === "center"
            ? (r.justifyContent = "center")
            : (r.justifyContent =
                i.overlayY === "bottom" ? "flex-end" : "flex-start"),
          o && (r.maxHeight = Pe(o)),
          s && (r.maxWidth = Pe(s));
      }
      (this._lastBoundingBoxSize = n), or(this._boundingBox.style, r);
    }
    _resetBoundingBoxStyles() {
      or(this._boundingBox.style, {
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        height: "",
        width: "",
        alignItems: "",
        justifyContent: "",
      });
    }
    _resetOverlayElementStyles() {
      or(this._pane.style, {
        top: "",
        left: "",
        bottom: "",
        right: "",
        position: "",
        transform: "",
      });
    }
    _setOverlayElementStyles(e, i) {
      let n = {},
        r = this._hasExactPosition(),
        o = this._hasFlexibleDimensions,
        s = this._overlayRef.getConfig();
      if (r) {
        let d = this._viewportRuler.getViewportScrollPosition();
        or(n, this._getExactOverlayY(i, e, d)),
          or(n, this._getExactOverlayX(i, e, d));
      } else n.position = "static";
      let a = "",
        l = this._getOffset(i, "x"),
        c = this._getOffset(i, "y");
      l && (a += `translateX(${l}px) `),
        c && (a += `translateY(${c}px)`),
        (n.transform = a.trim()),
        s.maxHeight &&
          (r ? (n.maxHeight = Pe(s.maxHeight)) : o && (n.maxHeight = "")),
        s.maxWidth &&
          (r ? (n.maxWidth = Pe(s.maxWidth)) : o && (n.maxWidth = "")),
        or(this._pane.style, n);
    }
    _getExactOverlayY(e, i, n) {
      let r = { top: "", bottom: "" },
        o = this._getOverlayPoint(i, this._overlayRect, e);
      if (
        (this._isPushed &&
          (o = this._pushOverlayOnScreen(o, this._overlayRect, n)),
        e.overlayY === "bottom")
      ) {
        let s = this._document.documentElement.clientHeight;
        r.bottom = `${s - (o.y + this._overlayRect.height)}px`;
      } else r.top = Pe(o.y);
      return r;
    }
    _getExactOverlayX(e, i, n) {
      let r = { left: "", right: "" },
        o = this._getOverlayPoint(i, this._overlayRect, e);
      this._isPushed &&
        (o = this._pushOverlayOnScreen(o, this._overlayRect, n));
      let s;
      if (
        (this._isRtl()
          ? (s = e.overlayX === "end" ? "left" : "right")
          : (s = e.overlayX === "end" ? "right" : "left"),
        s === "right")
      ) {
        let a = this._document.documentElement.clientWidth;
        r.right = `${a - (o.x + this._overlayRect.width)}px`;
      } else r.left = Pe(o.x);
      return r;
    }
    _getScrollVisibility() {
      let e = this._getOriginRect(),
        i = this._pane.getBoundingClientRect(),
        n = this._scrollables.map((r) =>
          r.getElementRef().nativeElement.getBoundingClientRect()
        );
      return {
        isOriginClipped: Px(e, n),
        isOriginOutsideView: hm(e, n),
        isOverlayClipped: Px(i, n),
        isOverlayOutsideView: hm(i, n),
      };
    }
    _subtractOverflows(e, ...i) {
      return i.reduce((n, r) => n - Math.max(r, 0), e);
    }
    _getNarrowedViewportRect() {
      let e = this._document.documentElement.clientWidth,
        i = this._document.documentElement.clientHeight,
        n = this._viewportRuler.getViewportScrollPosition();
      return {
        top: n.top + this._viewportMargin,
        left: n.left + this._viewportMargin,
        right: n.left + e - this._viewportMargin,
        bottom: n.top + i - this._viewportMargin,
        width: e - 2 * this._viewportMargin,
        height: i - 2 * this._viewportMargin,
      };
    }
    _isRtl() {
      return this._overlayRef.getDirection() === "rtl";
    }
    _hasExactPosition() {
      return !this._hasFlexibleDimensions || this._isPushed;
    }
    _getOffset(e, i) {
      return i === "x"
        ? e.offsetX == null
          ? this._offsetX
          : e.offsetX
        : e.offsetY == null
        ? this._offsetY
        : e.offsetY;
    }
    _validatePositions() {}
    _addPanelClasses(e) {
      this._pane &&
        Jr(e).forEach((i) => {
          i !== "" &&
            this._appliedPanelClasses.indexOf(i) === -1 &&
            (this._appliedPanelClasses.push(i), this._pane.classList.add(i));
        });
    }
    _clearPanelClasses() {
      this._pane &&
        (this._appliedPanelClasses.forEach((e) => {
          this._pane.classList.remove(e);
        }),
        (this._appliedPanelClasses = []));
    }
    _getOriginRect() {
      let e = this._origin;
      if (e instanceof Z) return e.nativeElement.getBoundingClientRect();
      if (e instanceof Element) return e.getBoundingClientRect();
      let i = e.width || 0,
        n = e.height || 0;
      return {
        top: e.y,
        bottom: e.y + n,
        left: e.x,
        right: e.x + i,
        height: n,
        width: i,
      };
    }
  };
function or(t, e) {
  for (let i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
  return t;
}
function Lx(t) {
  if (typeof t != "number" && t != null) {
    let [e, i] = t.split(FP);
    return !i || i === "px" ? parseFloat(e) : null;
  }
  return t || null;
}
function jx(t) {
  return {
    top: Math.floor(t.top),
    right: Math.floor(t.right),
    bottom: Math.floor(t.bottom),
    left: Math.floor(t.left),
    width: Math.floor(t.width),
    height: Math.floor(t.height),
  };
}
var Vx = "cdk-global-overlay-wrapper",
  ym = class {
    constructor() {
      (this._cssPosition = "static"),
        (this._topOffset = ""),
        (this._bottomOffset = ""),
        (this._alignItems = ""),
        (this._xPosition = ""),
        (this._xOffset = ""),
        (this._width = ""),
        (this._height = ""),
        (this._isDisposed = !1);
    }
    attach(e) {
      let i = e.getConfig();
      (this._overlayRef = e),
        this._width && !i.width && e.updateSize({ width: this._width }),
        this._height && !i.height && e.updateSize({ height: this._height }),
        e.hostElement.classList.add(Vx),
        (this._isDisposed = !1);
    }
    top(e = "") {
      return (
        (this._bottomOffset = ""),
        (this._topOffset = e),
        (this._alignItems = "flex-start"),
        this
      );
    }
    left(e = "") {
      return (this._xOffset = e), (this._xPosition = "left"), this;
    }
    bottom(e = "") {
      return (
        (this._topOffset = ""),
        (this._bottomOffset = e),
        (this._alignItems = "flex-end"),
        this
      );
    }
    right(e = "") {
      return (this._xOffset = e), (this._xPosition = "right"), this;
    }
    start(e = "") {
      return (this._xOffset = e), (this._xPosition = "start"), this;
    }
    end(e = "") {
      return (this._xOffset = e), (this._xPosition = "end"), this;
    }
    width(e = "") {
      return (
        this._overlayRef
          ? this._overlayRef.updateSize({ width: e })
          : (this._width = e),
        this
      );
    }
    height(e = "") {
      return (
        this._overlayRef
          ? this._overlayRef.updateSize({ height: e })
          : (this._height = e),
        this
      );
    }
    centerHorizontally(e = "") {
      return this.left(e), (this._xPosition = "center"), this;
    }
    centerVertically(e = "") {
      return this.top(e), (this._alignItems = "center"), this;
    }
    apply() {
      if (!this._overlayRef || !this._overlayRef.hasAttached()) return;
      let e = this._overlayRef.overlayElement.style,
        i = this._overlayRef.hostElement.style,
        n = this._overlayRef.getConfig(),
        { width: r, height: o, maxWidth: s, maxHeight: a } = n,
        l =
          (r === "100%" || r === "100vw") &&
          (!s || s === "100%" || s === "100vw"),
        c =
          (o === "100%" || o === "100vh") &&
          (!a || a === "100%" || a === "100vh"),
        d = this._xPosition,
        u = this._xOffset,
        f = this._overlayRef.getConfig().direction === "rtl",
        h = "",
        p = "",
        m = "";
      l
        ? (m = "flex-start")
        : d === "center"
        ? ((m = "center"), f ? (p = u) : (h = u))
        : f
        ? d === "left" || d === "end"
          ? ((m = "flex-end"), (h = u))
          : (d === "right" || d === "start") && ((m = "flex-start"), (p = u))
        : d === "left" || d === "start"
        ? ((m = "flex-start"), (h = u))
        : (d === "right" || d === "end") && ((m = "flex-end"), (p = u)),
        (e.position = this._cssPosition),
        (e.marginLeft = l ? "0" : h),
        (e.marginTop = c ? "0" : this._topOffset),
        (e.marginBottom = this._bottomOffset),
        (e.marginRight = l ? "0" : p),
        (i.justifyContent = m),
        (i.alignItems = c ? "flex-start" : this._alignItems);
    }
    dispose() {
      if (this._isDisposed || !this._overlayRef) return;
      let e = this._overlayRef.overlayElement.style,
        i = this._overlayRef.hostElement,
        n = i.style;
      i.classList.remove(Vx),
        (n.justifyContent =
          n.alignItems =
          e.marginTop =
          e.marginBottom =
          e.marginLeft =
          e.marginRight =
          e.position =
            ""),
        (this._overlayRef = null),
        (this._isDisposed = !0);
    }
  },
  LP = (() => {
    let e = class e {
      constructor(n, r, o, s) {
        (this._viewportRuler = n),
          (this._document = r),
          (this._platform = o),
          (this._overlayContainer = s);
      }
      global() {
        return new ym();
      }
      flexibleConnectedTo(n) {
        return new vm(
          n,
          this._viewportRuler,
          this._document,
          this._platform,
          this._overlayContainer
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(v(lo), v(J), v(Ce), v(Ux));
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  jP = 0,
  co = (() => {
    let e = class e {
      constructor(n, r, o, s, a, l, c, d, u, f, h, p) {
        (this.scrollStrategies = n),
          (this._overlayContainer = r),
          (this._componentFactoryResolver = o),
          (this._positionBuilder = s),
          (this._keyboardDispatcher = a),
          (this._injector = l),
          (this._ngZone = c),
          (this._document = d),
          (this._directionality = u),
          (this._location = f),
          (this._outsideClickDispatcher = h),
          (this._animationsModuleType = p);
      }
      create(n) {
        let r = this._createHostElement(),
          o = this._createPaneElement(r),
          s = this._createPortalOutlet(o),
          a = new mm(n);
        return (
          (a.direction = a.direction || this._directionality.value),
          new bm(
            s,
            r,
            o,
            a,
            this._ngZone,
            this._keyboardDispatcher,
            this._document,
            this._location,
            this._outsideClickDispatcher,
            this._animationsModuleType === "NoopAnimations"
          )
        );
      }
      position() {
        return this._positionBuilder;
      }
      _createPaneElement(n) {
        let r = this._document.createElement("div");
        return (
          (r.id = `cdk-overlay-${jP++}`),
          r.classList.add("cdk-overlay-pane"),
          n.appendChild(r),
          r
        );
      }
      _createHostElement() {
        let n = this._document.createElement("div");
        return this._overlayContainer.getContainerElement().appendChild(n), n;
      }
      _createPortalOutlet(n) {
        return (
          this._appRef || (this._appRef = this._injector.get(fn)),
          new id(
            n,
            this._componentFactoryResolver,
            this._appRef,
            this._injector,
            this._document
          )
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        v(kP),
        v(Ux),
        v(Xn),
        v(LP),
        v(NP),
        v(Bt),
        v(R),
        v(J),
        v(er),
        v($i),
        v(PP),
        v(at, 8)
      );
    }),
      (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var VP = new S("cdk-connected-overlay-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    let t = w(co);
    return () => t.scrollStrategies.reposition();
  },
});
function BP(t) {
  return () => t.scrollStrategies.reposition();
}
var UP = { provide: VP, deps: [co], useFactory: BP },
  Hx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ providers: [co, UP], imports: [li, rd, am, am] }));
    let t = e;
    return t;
  })();
var HP = new S("mat-select-scroll-strategy", {
  providedIn: "root",
  factory: () => {
    let t = w(co);
    return () => t.scrollStrategies.reposition();
  },
});
function $P(t) {
  return () => t.scrollStrategies.reposition();
}
var zP = { provide: HP, deps: [co], useFactory: $P };
var sd = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({
      providers: [zP],
      imports: [zi, Hx, om, ke, nd, Fn, om, ke],
    }));
  let t = e;
  return t;
})();
var ad = class {
  constructor(e, i) {
    (this.model = e), (this.color = i), (this.towHitch = !1), (this.yoke = !1);
  }
};
var mt = (() => {
  let e = class e {
    constructor(n) {
      (this.http = n), (this.currentTeslaCar$ = new Me(null));
    }
    getModels() {
      return this.http.get("/models");
    }
    getOptions(n) {
      return this.http.get("/options/" + n);
    }
    getCurrentCarAsObservable() {
      return this.currentTeslaCar$;
    }
    getCurrentCar() {
      return this.currentTeslaCar$.getValue();
    }
    selectCar(n) {
      this.currentTeslaCar$.next(n);
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(v(ch));
  }),
    (e.ɵprov = D({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var $x = (t, e) => e.code;
function qP(t, e) {
  if ((t & 1 && (M(0, "option", 2), ie(1), T()), t & 2)) {
    let i = e.$implicit;
    de("value", i.code), O(1), Rn(" ", i.description, " ");
  }
}
function WP(t, e) {
  if ((t & 1 && (M(0, "option", 2), ie(1), T()), t & 2)) {
    let i = e.$implicit;
    de("value", i.code), O(1), ct(i.description);
  }
}
function GP(t, e) {
  if (t & 1) {
    let i = Li();
    M(0, "mat-form-field")(1, "mat-label"),
      ie(2, "Color"),
      T(),
      M(3, "select", 3),
      ue("ngModelChange", function (r) {
        an(i);
        let o = pe();
        return ln((o.selectedColor = r));
      })("change", function () {
        an(i);
        let r = pe();
        return ln(r.onColorChange());
      }),
      Lr(4, WP, 2, 2, "option", 2, $x),
      T()();
  }
  if (t & 2) {
    let i = pe();
    O(3), de("ngModel", i.selectedColor), O(1), jr(i.selectedModel.colors);
  }
}
var zx = (() => {
  let e = class e {
    constructor(n) {
      (this.teslaCarService = n),
        (this.models = []),
        (this.selectedModel = null),
        (this.selectedModelCode = ""),
        (this.selectedColor = "");
    }
    ngOnInit() {
      yi([
        this.teslaCarService.getCurrentCarAsObservable().pipe(Ae(1)),
        this.teslaCarService.getModels(),
      ]).subscribe((n) => {
        let r = n[0];
        (this.models = n[1]),
          r &&
            ((this.selectedModel = this.findModelFromCode(r.model)),
            this.selectedModel &&
              ((this.selectedModelCode = this.selectedModel.code),
              (this.selectedColor = r.color),
              !this.selectedColor &&
                this.selectedModel.colors.length &&
                (this.selectedColor = this.selectedModel.colors[0].code)));
      }),
        this.teslaCarService.getModels().subscribe((n) => {
          this.models = n;
        });
    }
    findModelFromCode(n) {
      return this.models.find((r) => r.code === n);
    }
    onModelChange() {
      if (
        ((this.selectedModel = this.models.find(
          (n) => n.code === this.selectedModelCode
        )),
        this.selectedModel && this.selectedModel.colors.length)
      ) {
        this.selectedColor = this.selectedModel.colors[0].code;
        let n = new ad(this.selectedModelCode, this.selectedColor);
        this.teslaCarService.selectCar(n);
      }
    }
    onColorChange() {
      let n = this.teslaCarService.getCurrentCar();
      n && ((n.color = this.selectedColor), this.teslaCarService.selectCar(n));
    }
    getImageSrc() {
      return `https://interstate21.com/tesla-app/images/${this.selectedModelCode}/${this.selectedColor}.jpg`;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(y(mt));
  }),
    (e.ɵcmp = Re({
      type: e,
      selectors: [["app-step1"]],
      standalone: !0,
      features: [qt],
      decls: 11,
      vars: 2,
      consts: [
        [1, "step1"],
        [
          "matNativeControl",
          "",
          "id",
          "modelSelect",
          "name",
          "model",
          "required",
          "",
          3,
          "ngModel",
          "ngModelChange",
          "change",
        ],
        [3, "value"],
        [
          "matNativeControl",
          "",
          "id",
          "colorSelect",
          "required",
          "",
          "name",
          "color",
          3,
          "ngModel",
          "ngModelChange",
          "change",
        ],
      ],
      template: function (r, o) {
        r & 1 &&
          (M(0, "div", 0)(1, "h1"),
          ie(2, "Step 1: Choose your model and color"),
          T(),
          M(3, "form")(4, "mat-form-field")(5, "mat-label"),
          ie(6, "Model"),
          T(),
          M(7, "select", 1),
          ue("ngModelChange", function (a) {
            return (o.selectedModelCode = a);
          })("change", function () {
            return o.onModelChange();
          }),
          Lr(8, qP, 2, 2, "option", 2, $x),
          T()(),
          ge(10, GP, 6, 1, "mat-form-field"),
          T()()),
          r & 2 &&
            (O(7),
            de("ngModel", o.selectedModelCode),
            O(1),
            jr(o.models),
            O(2),
            be(10, o.selectedModel != null ? 10 : -1));
      },
      dependencies: [
        Fn,
        Jc,
        ao,
        sd,
        td,
        ed,
        Tc,
        Dc,
        Ic,
        Sc,
        Xr,
        xc,
        wc,
        ks,
        Os,
        Ki,
      ],
      styles: [
        ".step1[_ngcontent-%COMP%]{padding:15px}.step1[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] + mat-form-field[_ngcontent-%COMP%]{margin-left:8px}",
      ],
    }));
  let t = e;
  return t;
})();
var YP = (t, e) => e.id;
function QP(t, e) {
  if ((t & 1 && (M(0, "option", 2), ie(1), T()), t & 2)) {
    let i = e.$implicit;
    de("value", i.id), O(1), Rn(" ", i.description, " ");
  }
}
function ZP(t, e) {
  if ((t & 1 && (M(0, "p"), ie(1), Jn(2, "currency"), T()), t & 2)) {
    let i = pe();
    O(1),
      Kf(
        " Range: ",
        i.selectedConfig.range,
        " - Max speed: ",
        i.selectedConfig.speed,
        " - Costs: ",
        ei(2, 3, i.selectedConfig.price, "USD"),
        " "
      );
  }
}
function KP(t, e) {
  if (t & 1) {
    let i = Li();
    M(0, "input", 3),
      ue("ngModelChange", function (r) {
        an(i);
        let o = pe();
        return ln((o.includeTow = r));
      })("change", function () {
        an(i);
        let r = pe();
        return ln(r.onIncludeTowChange());
      }),
      T(),
      M(1, "label"),
      ie(2, "Tow Hitch?"),
      T(),
      ve(3, "br");
  }
  if (t & 2) {
    let i = pe();
    de("ngModel", i.includeTow);
  }
}
function XP(t, e) {
  if (t & 1) {
    let i = Li();
    M(0, "input", 4),
      ue("ngModelChange", function (r) {
        an(i);
        let o = pe();
        return ln((o.includeYoke = r));
      })("change", function () {
        an(i);
        let r = pe();
        return ln(r.onIncludeYokeChange());
      }),
      T(),
      M(1, "label"),
      ie(2, "Yoke steering wheel?"),
      T(),
      ve(3, "br");
  }
  if (t & 2) {
    let i = pe();
    de("ngModel", i.includeYoke);
  }
}
var qx = (() => {
  let e = class e {
    constructor(n, r) {
      (this.teslaCarService = n),
        (this.router = r),
        (this.selectedConfigId = ""),
        (this.includeYoke = !1),
        (this.includeTow = !1);
    }
    ngOnInit() {
      this.teslaCarService
        .getCurrentCarAsObservable()
        .pipe(
          Ae(1),
          Ee((n) =>
            n
              ? ((this.teslaCar = n), this.teslaCarService.getOptions(n.model))
              : Zt(() => new Error("Tesla car not initialized"))
          )
        )
        .subscribe({
          next: (n) => {
            (this.option = n),
              (this.selectedConfig = this.option.configs.find(
                (r) => r.id === this.teslaCar?.configId
              )),
              (this.selectedConfigId = this.teslaCar?.configId + ""),
              (this.includeTow = !!this.teslaCar?.towHitch),
              (this.includeYoke = !!this.teslaCar?.yoke);
          },
          error: () => this.router.navigate(["/step1"]),
        });
    }
    onConfigChange() {
      (this.selectedConfig = this.option?.configs.find(
        (n) => n.id === +this.selectedConfigId
      )),
        this.teslaCar &&
          ((this.teslaCar.configId = +this.selectedConfigId),
          this.teslaCarService.selectCar(this.teslaCar));
    }
    onIncludeYokeChange() {
      this.teslaCar &&
        ((this.teslaCar.yoke = this.includeYoke),
        this.teslaCarService.selectCar(this.teslaCar));
    }
    onIncludeTowChange() {
      this.teslaCar &&
        ((this.teslaCar.towHitch = this.includeTow),
        this.teslaCarService.selectCar(this.teslaCar));
    }
    getImageSrc() {
      return `https://interstate21.com/tesla-app/images/${this.teslaCar?.model}/${this.teslaCar?.color}.jpg`;
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(y(mt), y(Ot));
  }),
    (e.ɵcmp = Re({
      type: e,
      selectors: [["app-step2"]],
      standalone: !0,
      features: [qt],
      decls: 14,
      vars: 4,
      consts: [
        [1, "step2"],
        [
          "matNativeControl",
          "",
          "id",
          "configSelect",
          "name",
          "config",
          "required",
          "",
          3,
          "ngModel",
          "ngModelChange",
          "change",
        ],
        [3, "value"],
        [
          "type",
          "checkbox",
          "name",
          "towHitch",
          3,
          "ngModel",
          "ngModelChange",
          "change",
        ],
        [
          "type",
          "checkbox",
          "id",
          "includeYoke",
          "name",
          "yoke",
          3,
          "ngModel",
          "ngModelChange",
          "change",
        ],
      ],
      template: function (r, o) {
        r & 1 &&
          (M(0, "div", 0)(1, "h1"),
          ie(2, "Step 2: Select your config and options"),
          T(),
          M(3, "form")(4, "mat-form-field")(5, "mat-label"),
          ie(6, "Config"),
          T(),
          M(7, "select", 1),
          ue("ngModelChange", function (a) {
            return (o.selectedConfigId = a);
          })("change", function () {
            return o.onConfigChange();
          }),
          Lr(8, QP, 2, 2, "option", 2, YP),
          T()(),
          ve(10, "br"),
          ge(11, ZP, 3, 6, "p")(12, KP, 4, 1)(13, XP, 4, 1),
          T()()),
          r & 2 &&
            (O(7),
            de("ngModel", o.selectedConfigId),
            O(1),
            jr(o.option == null ? null : o.option.configs),
            O(3),
            be(11, o.selectedConfig ? 11 : -1),
            O(1),
            be(12, o.option != null && o.option.towHitch ? 12 : -1),
            O(1),
            be(13, o.option != null && o.option.yoke ? 13 : -1));
      },
      dependencies: [
        Fn,
        Jc,
        ao,
        sd,
        td,
        ed,
        Tc,
        Dc,
        Ic,
        Sc,
        sp,
        Xr,
        xc,
        wc,
        ks,
        Os,
        Ki,
        Pl,
      ],
      styles: [".step2[_ngcontent-%COMP%]{padding:15px}"],
    }));
  let t = e;
  return t;
})();
var Wx = (() => {
    let e = class e {
      constructor() {
        (this._vertical = !1), (this._inset = !1);
      }
      get vertical() {
        return this._vertical;
      }
      set vertical(n) {
        this._vertical = ze(n);
      }
      get inset() {
        return this._inset;
      }
      set inset(n) {
        this._inset = ze(n);
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵcmp = Re({
        type: e,
        selectors: [["mat-divider"]],
        hostAttrs: ["role", "separator", 1, "mat-divider"],
        hostVars: 7,
        hostBindings: function (r, o) {
          r & 2 &&
            (je("aria-orientation", o.vertical ? "vertical" : "horizontal"),
            Ie("mat-divider-vertical", o.vertical)(
              "mat-divider-horizontal",
              !o.vertical
            )("mat-divider-inset", o.inset));
        },
        inputs: { vertical: "vertical", inset: "inset" },
        decls: 0,
        vars: 0,
        template: function (r, o) {},
        styles: [
          ".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color);border-top-width:var(--mat-divider-width)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color);border-right-width:var(--mat-divider-width)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}",
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  Gx = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [ke, ke] }));
    let t = e;
    return t;
  })();
function eF(t, e) {
  if (
    (t & 1 &&
      (M(0, "tr")(1, "td")(2, "strong"),
      ie(3, "Tow hitch package"),
      T()(),
      M(4, "td"),
      ie(5),
      Jn(6, "currency"),
      T()()),
    t & 2)
  ) {
    let i = pe();
    O(5), ct(ei(6, 1, i.optionPrice, "USD"));
  }
}
function tF(t, e) {
  if (
    (t & 1 &&
      (M(0, "tr")(1, "td")(2, "strong"),
      ie(3, "Yoke steering wheel package"),
      T()(),
      M(4, "td"),
      ie(5),
      Jn(6, "currency"),
      T()()),
    t & 2)
  ) {
    let i = pe();
    O(5), ct(ei(6, 1, i.optionPrice, "USD"));
  }
}
var Yx = (() => {
  let e = class e {
    constructor(n, r) {
      (this.teslaCarService = n),
        (this.router = r),
        (this.totalCost = 0),
        (this.optionPrice = 1e3);
    }
    ngOnInit() {
      this.teslaCarService
        .getCurrentCarAsObservable()
        .pipe(
          Ae(1),
          Ee((n) =>
            !n || !n.model || !n.color || !n.configId
              ? Zt(() => new Error("Tesla car not initialized"))
              : ((this.teslaCar = n),
                yi({
                  modelList: this.teslaCarService.getModels(),
                  optionList: this.teslaCarService.getOptions(n.model),
                }))
          )
        )
        .subscribe({
          next: (n) => {
            (this.currentModel = n.modelList.find(
              (r) => r.code === this.teslaCar?.model
            )),
              (this.currentColor = this.currentModel?.colors.find(
                (r) => r.code === this.teslaCar?.color
              )),
              (this.currentConfig = n.optionList.configs.find(
                (r) => r.id === this.teslaCar?.configId
              )),
              this.currentColor && (this.totalCost += this.currentColor?.price),
              this.currentConfig &&
                (this.totalCost += this.currentConfig?.price),
              this.teslaCar?.towHitch && (this.totalCost += this.optionPrice),
              this.teslaCar?.yoke && (this.totalCost += this.optionPrice);
          },
          error: () => this.router.navigate(["/step1"]),
        });
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(y(mt), y(Ot));
  }),
    (e.ɵcmp = Re({
      type: e,
      selectors: [["app-step3"]],
      standalone: !0,
      features: [qt],
      decls: 35,
      vars: 19,
      consts: [[1, "step3"]],
      template: function (r, o) {
        r & 1 &&
          (M(0, "div", 0)(1, "h1"),
          ie(2, "Step 3: Summary"),
          T(),
          M(3, "h2"),
          ie(4),
          T(),
          M(5, "table")(6, "tr")(7, "td")(8, "strong"),
          ie(9),
          T()(),
          M(10, "td"),
          ie(11),
          Jn(12, "currency"),
          T()(),
          M(13, "tr")(14, "td"),
          ie(15),
          T(),
          ve(16, "td"),
          T(),
          M(17, "tr")(18, "td")(19, "strong"),
          ie(20),
          T()(),
          M(21, "td"),
          ie(22),
          Jn(23, "currency"),
          T()(),
          ge(24, eF, 7, 4, "tr")(25, tF, 7, 4, "tr"),
          T(),
          ve(26, "mat-divider"),
          M(27, "table")(28, "tr")(29, "td")(30, "strong"),
          ie(31, "TOTAL COST"),
          T()(),
          M(32, "td"),
          ie(33),
          Jn(34, "currency"),
          T()()()()),
          r & 2 &&
            (O(4),
            Rn(
              "Your Tesla ",
              o.currentModel == null ? null : o.currentModel.description,
              ""
            ),
            O(5),
            ct(o.currentConfig == null ? null : o.currentConfig.description),
            O(2),
            ct(
              ei(
                12,
                10,
                o.currentConfig == null ? null : o.currentConfig.price,
                "USD"
              )
            ),
            O(4),
            Zf(
              " Range: ",
              o.currentConfig == null ? null : o.currentConfig.range,
              " miles - Max speed: ",
              o.currentConfig == null ? null : o.currentConfig.speed,
              " "
            ),
            O(5),
            ct(o.currentColor == null ? null : o.currentColor.description),
            O(2),
            ct(
              ei(
                23,
                13,
                o.currentColor == null ? null : o.currentColor.price,
                "USD"
              )
            ),
            O(2),
            be(24, o.teslaCar != null && o.teslaCar.towHitch ? 24 : -1),
            O(1),
            be(25, o.teslaCar != null && o.teslaCar.yoke ? 25 : -1),
            O(8),
            ct(ei(34, 16, o.totalCost, "USD")));
      },
      dependencies: [Pl, Gx, Wx],
      styles: [
        ".step3[_ngcontent-%COMP%]{padding:15px}.step3[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:0 25px 0 10px;min-width:250px}",
      ],
    }));
  let t = e;
  return t;
})();
var Qx = (t, e) => {
  let i = w(mt),
    n = w(Ot),
    r = i.getCurrentCar();
  return r && r.model && r.color ? !0 : (n.navigateByUrl("/step1"), !1);
};
var Zx = (t, e) => {
  let i = w(mt),
    n = w(Ot),
    r = i.getCurrentCar();
  return r && r.model && r.color && r.configId
    ? !0
    : (n.navigateByUrl("/step1"), !1);
};
var Kx = [
  { path: "", redirectTo: "/step1", pathMatch: "full" },
  { path: "step1", component: zx },
  { path: "step2", component: qx, canActivate: [Qx] },
  { path: "step3", component: Yx, canActivate: [Zx] },
  { path: "**", redirectTo: "/step1" },
];
var Xx = { providers: [j_(Kx), fx(), Rf(Zy), mt] };
var Jx = (() => {
  let e = class e {};
  (e.ɵfac = function (r) {
    return new (r || e)();
  }),
    (e.ɵmod = q({ type: e })),
    (e.ɵinj = z({ imports: [ke, Ws, ke] }));
  let t = e;
  return t;
})();
var wm = ["*"],
  nF = ["tabListContainer"],
  iF = ["tabList"],
  rF = ["tabListInner"],
  oF = ["nextPaginator"],
  sF = ["previousPaginator"];
var aF = ["mat-tab-nav-bar", ""],
  lF = ["mat-tab-link", ""];
var _m = "mdc-tab-indicator--active",
  ew = "mdc-tab-indicator--no-transition",
  xm = class {
    constructor(e) {
      this._items = e;
    }
    hide() {
      this._items.forEach((e) => e.deactivateInkBar());
    }
    alignToElement(e) {
      let i = this._items.find((r) => r.elementRef.nativeElement === e),
        n = this._currentItem;
      if (i !== n && (n?.deactivateInkBar(), i)) {
        let r = n?.elementRef.nativeElement.getBoundingClientRect?.();
        i.activateInkBar(r), (this._currentItem = i);
      }
    }
  };
function cF(t) {
  return class extends t {
    constructor(...e) {
      super(...e), (this._fitToContent = !1);
    }
    get fitInkBarToContent() {
      return this._fitToContent;
    }
    set fitInkBarToContent(e) {
      let i = ze(e);
      this._fitToContent !== i &&
        ((this._fitToContent = i),
        this._inkBarElement && this._appendInkBarElement());
    }
    activateInkBar(e) {
      let i = this.elementRef.nativeElement;
      if (!e || !i.getBoundingClientRect || !this._inkBarContentElement) {
        i.classList.add(_m);
        return;
      }
      let n = i.getBoundingClientRect(),
        r = e.width / n.width,
        o = e.left - n.left;
      i.classList.add(ew),
        this._inkBarContentElement.style.setProperty(
          "transform",
          `translateX(${o}px) scaleX(${r})`
        ),
        i.getBoundingClientRect(),
        i.classList.remove(ew),
        i.classList.add(_m),
        this._inkBarContentElement.style.setProperty("transform", "");
    }
    deactivateInkBar() {
      this.elementRef.nativeElement.classList.remove(_m);
    }
    ngOnInit() {
      this._createInkBarElement();
    }
    ngOnDestroy() {
      this._inkBarElement?.remove(),
        (this._inkBarElement = this._inkBarContentElement = null);
    }
    _createInkBarElement() {
      let e = this.elementRef.nativeElement.ownerDocument || document;
      (this._inkBarElement = e.createElement("span")),
        (this._inkBarContentElement = e.createElement("span")),
        (this._inkBarElement.className = "mdc-tab-indicator"),
        (this._inkBarContentElement.className =
          "mdc-tab-indicator__content mdc-tab-indicator__content--underline"),
        this._inkBarElement.appendChild(this._inkBarContentElement),
        this._appendInkBarElement();
    }
    _appendInkBarElement() {
      this._inkBarElement;
      let e = this._fitToContent
        ? this.elementRef.nativeElement.querySelector(".mdc-tab__content")
        : this.elementRef.nativeElement;
      e.appendChild(this._inkBarElement);
    }
  };
}
var tw = gn({ passive: !0 }),
  dF = 650,
  uF = 100,
  fF = (() => {
    let e = class e {
      get disablePagination() {
        return this._disablePagination;
      }
      set disablePagination(n) {
        this._disablePagination = ze(n);
      }
      get selectedIndex() {
        return this._selectedIndex;
      }
      set selectedIndex(n) {
        (n = ai(n)),
          this._selectedIndex != n &&
            ((this._selectedIndexChanged = !0),
            (this._selectedIndex = n),
            this._keyManager && this._keyManager.updateActiveItem(n));
      }
      constructor(n, r, o, s, a, l, c) {
        (this._elementRef = n),
          (this._changeDetectorRef = r),
          (this._viewportRuler = o),
          (this._dir = s),
          (this._ngZone = a),
          (this._platform = l),
          (this._animationMode = c),
          (this._scrollDistance = 0),
          (this._selectedIndexChanged = !1),
          (this._destroyed = new F()),
          (this._showPaginationControls = !1),
          (this._disableScrollAfter = !0),
          (this._disableScrollBefore = !0),
          (this._stopScrolling = new F()),
          (this._disablePagination = !1),
          (this._selectedIndex = 0),
          (this.selectFocusedIndex = new le()),
          (this.indexFocused = new le()),
          a.runOutsideAngular(() => {
            Kt(n.nativeElement, "mouseleave")
              .pipe(Se(this._destroyed))
              .subscribe(() => {
                this._stopInterval();
              });
          });
      }
      ngAfterViewInit() {
        Kt(this._previousPaginator.nativeElement, "touchstart", tw)
          .pipe(Se(this._destroyed))
          .subscribe(() => {
            this._handlePaginatorPress("before");
          }),
          Kt(this._nextPaginator.nativeElement, "touchstart", tw)
            .pipe(Se(this._destroyed))
            .subscribe(() => {
              this._handlePaginatorPress("after");
            });
      }
      ngAfterContentInit() {
        let n = this._dir ? this._dir.change : N("ltr"),
          r = this._viewportRuler.change(150),
          o = () => {
            this.updatePagination(), this._alignInkBarToSelectedTab();
          };
        (this._keyManager = new Rc(this._items)
          .withHorizontalOrientation(this._getLayoutDirection())
          .withHomeAndEnd()
          .withWrap()
          .skipPredicate(() => !1)),
          this._keyManager.updateActiveItem(this._selectedIndex),
          this._ngZone.onStable.pipe(Ae(1)).subscribe(o),
          Hn(n, r, this._items.changes, this._itemsResized())
            .pipe(Se(this._destroyed))
            .subscribe(() => {
              this._ngZone.run(() => {
                Promise.resolve().then(() => {
                  (this._scrollDistance = Math.max(
                    0,
                    Math.min(this._getMaxScrollDistance(), this._scrollDistance)
                  )),
                    o();
                });
              }),
                this._keyManager.withHorizontalOrientation(
                  this._getLayoutDirection()
                );
            }),
          this._keyManager.change.subscribe((s) => {
            this.indexFocused.emit(s), this._setTabFocus(s);
          });
      }
      _itemsResized() {
        return typeof ResizeObserver != "function"
          ? Ge
          : this._items.changes.pipe(
              En(this._items),
              Je(
                (n) =>
                  new U((r) =>
                    this._ngZone.runOutsideAngular(() => {
                      let o = new ResizeObserver((s) => r.next(s));
                      return (
                        n.forEach((s) => o.observe(s.elementRef.nativeElement)),
                        () => {
                          o.disconnect();
                        }
                      );
                    })
                  )
              ),
              xi(1),
              De((n) =>
                n.some(
                  (r) => r.contentRect.width > 0 && r.contentRect.height > 0
                )
              )
            );
      }
      ngAfterContentChecked() {
        this._tabLabelCount != this._items.length &&
          (this.updatePagination(),
          (this._tabLabelCount = this._items.length),
          this._changeDetectorRef.markForCheck()),
          this._selectedIndexChanged &&
            (this._scrollToLabel(this._selectedIndex),
            this._checkScrollingControls(),
            this._alignInkBarToSelectedTab(),
            (this._selectedIndexChanged = !1),
            this._changeDetectorRef.markForCheck()),
          this._scrollDistanceChanged &&
            (this._updateTabScrollPosition(),
            (this._scrollDistanceChanged = !1),
            this._changeDetectorRef.markForCheck());
      }
      ngOnDestroy() {
        this._keyManager?.destroy(),
          this._destroyed.next(),
          this._destroyed.complete(),
          this._stopScrolling.complete();
      }
      _handleKeydown(n) {
        if (!Mc(n))
          switch (n.keyCode) {
            case 13:
            case 32:
              if (this.focusIndex !== this.selectedIndex) {
                let r = this._items.get(this.focusIndex);
                r &&
                  !r.disabled &&
                  (this.selectFocusedIndex.emit(this.focusIndex),
                  this._itemSelected(n));
              }
              break;
            default:
              this._keyManager.onKeydown(n);
          }
      }
      _onContentChanges() {
        let n = this._elementRef.nativeElement.textContent;
        n !== this._currentTextContent &&
          ((this._currentTextContent = n || ""),
          this._ngZone.run(() => {
            this.updatePagination(),
              this._alignInkBarToSelectedTab(),
              this._changeDetectorRef.markForCheck();
          }));
      }
      updatePagination() {
        this._checkPaginationEnabled(),
          this._checkScrollingControls(),
          this._updateTabScrollPosition();
      }
      get focusIndex() {
        return this._keyManager ? this._keyManager.activeItemIndex : 0;
      }
      set focusIndex(n) {
        !this._isValidIndex(n) ||
          this.focusIndex === n ||
          !this._keyManager ||
          this._keyManager.setActiveItem(n);
      }
      _isValidIndex(n) {
        return this._items ? !!this._items.toArray()[n] : !0;
      }
      _setTabFocus(n) {
        if (
          (this._showPaginationControls && this._scrollToLabel(n),
          this._items && this._items.length)
        ) {
          this._items.toArray()[n].focus();
          let r = this._tabListContainer.nativeElement;
          this._getLayoutDirection() == "ltr"
            ? (r.scrollLeft = 0)
            : (r.scrollLeft = r.scrollWidth - r.offsetWidth);
        }
      }
      _getLayoutDirection() {
        return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
      }
      _updateTabScrollPosition() {
        if (this.disablePagination) return;
        let n = this.scrollDistance,
          r = this._getLayoutDirection() === "ltr" ? -n : n;
        (this._tabList.nativeElement.style.transform = `translateX(${Math.round(
          r
        )}px)`),
          (this._platform.TRIDENT || this._platform.EDGE) &&
            (this._tabListContainer.nativeElement.scrollLeft = 0);
      }
      get scrollDistance() {
        return this._scrollDistance;
      }
      set scrollDistance(n) {
        this._scrollTo(n);
      }
      _scrollHeader(n) {
        let r = this._tabListContainer.nativeElement.offsetWidth,
          o = ((n == "before" ? -1 : 1) * r) / 3;
        return this._scrollTo(this._scrollDistance + o);
      }
      _handlePaginatorClick(n) {
        this._stopInterval(), this._scrollHeader(n);
      }
      _scrollToLabel(n) {
        if (this.disablePagination) return;
        let r = this._items ? this._items.toArray()[n] : null;
        if (!r) return;
        let o = this._tabListContainer.nativeElement.offsetWidth,
          { offsetLeft: s, offsetWidth: a } = r.elementRef.nativeElement,
          l,
          c;
        this._getLayoutDirection() == "ltr"
          ? ((l = s), (c = l + a))
          : ((c = this._tabListInner.nativeElement.offsetWidth - s),
            (l = c - a));
        let d = this.scrollDistance,
          u = this.scrollDistance + o;
        l < d
          ? (this.scrollDistance -= d - l)
          : c > u && (this.scrollDistance += Math.min(c - u, l - d));
      }
      _checkPaginationEnabled() {
        if (this.disablePagination) this._showPaginationControls = !1;
        else {
          let n =
            this._tabListInner.nativeElement.scrollWidth >
            this._elementRef.nativeElement.offsetWidth;
          n || (this.scrollDistance = 0),
            n !== this._showPaginationControls &&
              this._changeDetectorRef.markForCheck(),
            (this._showPaginationControls = n);
        }
      }
      _checkScrollingControls() {
        this.disablePagination
          ? (this._disableScrollAfter = this._disableScrollBefore = !0)
          : ((this._disableScrollBefore = this.scrollDistance == 0),
            (this._disableScrollAfter =
              this.scrollDistance == this._getMaxScrollDistance()),
            this._changeDetectorRef.markForCheck());
      }
      _getMaxScrollDistance() {
        let n = this._tabListInner.nativeElement.scrollWidth,
          r = this._tabListContainer.nativeElement.offsetWidth;
        return n - r || 0;
      }
      _alignInkBarToSelectedTab() {
        let n =
            this._items && this._items.length
              ? this._items.toArray()[this.selectedIndex]
              : null,
          r = n ? n.elementRef.nativeElement : null;
        r ? this._inkBar.alignToElement(r) : this._inkBar.hide();
      }
      _stopInterval() {
        this._stopScrolling.next();
      }
      _handlePaginatorPress(n, r) {
        (r && r.button != null && r.button !== 0) ||
          (this._stopInterval(),
          Ao(dF, uF)
            .pipe(Se(Hn(this._stopScrolling, this._destroyed)))
            .subscribe(() => {
              let { maxScrollDistance: o, distance: s } = this._scrollHeader(n);
              (s === 0 || s >= o) && this._stopInterval();
            }));
      }
      _scrollTo(n) {
        if (this.disablePagination)
          return { maxScrollDistance: 0, distance: 0 };
        let r = this._getMaxScrollDistance();
        return (
          (this._scrollDistance = Math.max(0, Math.min(r, n))),
          (this._scrollDistanceChanged = !0),
          this._checkScrollingControls(),
          { maxScrollDistance: r, distance: this._scrollDistance }
        );
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(y(Z), y(lt), y(lo), y(er, 8), y(R), y(Ce), y(at, 8));
    }),
      (e.ɵdir = W({
        type: e,
        inputs: { disablePagination: "disablePagination" },
      }));
    let t = e;
    return t;
  })();
var hF = new S("MAT_TABS_CONFIG");
var rw = 0,
  Em = (() => {
    let e = class e extends fF {
      get fitInkBarToContent() {
        return this._fitInkBarToContent.value;
      }
      set fitInkBarToContent(n) {
        this._fitInkBarToContent.next(ze(n)),
          this._changeDetectorRef.markForCheck();
      }
      get stretchTabs() {
        return this._stretchTabs;
      }
      set stretchTabs(n) {
        this._stretchTabs = ze(n);
      }
      get animationDuration() {
        return this._animationDuration;
      }
      set animationDuration(n) {
        this._animationDuration = /^\d+$/.test(n + "") ? n + "ms" : n;
      }
      get backgroundColor() {
        return this._backgroundColor;
      }
      set backgroundColor(n) {
        let r = this._elementRef.nativeElement.classList;
        r.remove(
          "mat-tabs-with-background",
          `mat-background-${this.backgroundColor}`
        ),
          n && r.add("mat-tabs-with-background", `mat-background-${n}`),
          (this._backgroundColor = n);
      }
      get disableRipple() {
        return this._disableRipple;
      }
      set disableRipple(n) {
        this._disableRipple = ze(n);
      }
      constructor(n, r, o, s, a, l, c, d) {
        super(n, s, a, r, o, l, c),
          (this._fitInkBarToContent = new Me(!1)),
          (this._stretchTabs = !0),
          (this._disableRipple = !1),
          (this.color = "primary"),
          (this.disablePagination =
            d && d.disablePagination != null ? d.disablePagination : !1),
          (this.fitInkBarToContent =
            d && d.fitInkBarToContent != null ? d.fitInkBarToContent : !1),
          (this.stretchTabs = d && d.stretchTabs != null ? d.stretchTabs : !0);
      }
      _itemSelected() {}
      ngAfterContentInit() {
        (this._inkBar = new xm(this._items)),
          this._items.changes
            .pipe(En(null), Se(this._destroyed))
            .subscribe(() => {
              this.updateActiveLink();
            }),
          super.ngAfterContentInit();
      }
      ngAfterViewInit() {
        this.tabPanel, super.ngAfterViewInit();
      }
      updateActiveLink() {
        if (!this._items) return;
        let n = this._items.toArray();
        for (let r = 0; r < n.length; r++)
          if (n[r].active) {
            (this.selectedIndex = r),
              this._changeDetectorRef.markForCheck(),
              this.tabPanel && (this.tabPanel._activeTabId = n[r].id);
            return;
          }
        (this.selectedIndex = -1), this._inkBar.hide();
      }
      _getRole() {
        return this.tabPanel
          ? "tablist"
          : this._elementRef.nativeElement.getAttribute("role");
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        y(Z),
        y(er, 8),
        y(R),
        y(lt),
        y(lo),
        y(Ce),
        y(at, 8),
        y(hF, 8)
      );
    }),
      (e.ɵcmp = Re({
        type: e,
        selectors: [["", "mat-tab-nav-bar", ""]],
        contentQueries: function (r, o, s) {
          if ((r & 1 && _t(s, Cm, 5), r & 2)) {
            let a;
            _e((a = xe())) && (o._items = a);
          }
        },
        viewQuery: function (r, o) {
          if (
            (r & 1 && (Ke(nF, 7), Ke(iF, 7), Ke(rF, 7), Ke(oF, 5), Ke(sF, 5)),
            r & 2)
          ) {
            let s;
            _e((s = xe())) && (o._tabListContainer = s.first),
              _e((s = xe())) && (o._tabList = s.first),
              _e((s = xe())) && (o._tabListInner = s.first),
              _e((s = xe())) && (o._nextPaginator = s.first),
              _e((s = xe())) && (o._previousPaginator = s.first);
          }
        },
        hostAttrs: [1, "mat-mdc-tab-nav-bar", "mat-mdc-tab-header"],
        hostVars: 17,
        hostBindings: function (r, o) {
          r & 2 &&
            (je("role", o._getRole()),
            ts("--mat-tab-animation-duration", o.animationDuration),
            Ie(
              "mat-mdc-tab-header-pagination-controls-enabled",
              o._showPaginationControls
            )("mat-mdc-tab-header-rtl", o._getLayoutDirection() == "rtl")(
              "mat-mdc-tab-nav-bar-stretch-tabs",
              o.stretchTabs
            )("mat-primary", o.color !== "warn" && o.color !== "accent")(
              "mat-accent",
              o.color === "accent"
            )("mat-warn", o.color === "warn")(
              "_mat-animation-noopable",
              o._animationMode === "NoopAnimations"
            ));
        },
        inputs: {
          color: "color",
          fitInkBarToContent: "fitInkBarToContent",
          stretchTabs: ["mat-stretch-tabs", "stretchTabs"],
          animationDuration: "animationDuration",
          backgroundColor: "backgroundColor",
          disableRipple: "disableRipple",
          tabPanel: "tabPanel",
        },
        exportAs: ["matTabNavBar", "matTabNav"],
        features: [Oe],
        attrs: aF,
        ngContentSelectors: wm,
        decls: 13,
        vars: 8,
        consts: [
          [
            "aria-hidden",
            "true",
            "type",
            "button",
            "mat-ripple",
            "",
            "tabindex",
            "-1",
            1,
            "mat-mdc-tab-header-pagination",
            "mat-mdc-tab-header-pagination-before",
            3,
            "matRippleDisabled",
            "disabled",
            "click",
            "mousedown",
            "touchend",
          ],
          ["previousPaginator", ""],
          [1, "mat-mdc-tab-header-pagination-chevron"],
          [1, "mat-mdc-tab-link-container", 3, "keydown"],
          ["tabListContainer", ""],
          [1, "mat-mdc-tab-list", 3, "cdkObserveContent"],
          ["tabList", ""],
          [1, "mat-mdc-tab-links"],
          ["tabListInner", ""],
          [
            "aria-hidden",
            "true",
            "type",
            "button",
            "mat-ripple",
            "",
            "tabindex",
            "-1",
            1,
            "mat-mdc-tab-header-pagination",
            "mat-mdc-tab-header-pagination-after",
            3,
            "matRippleDisabled",
            "disabled",
            "mousedown",
            "click",
            "touchend",
          ],
          ["nextPaginator", ""],
        ],
        template: function (r, o) {
          r & 1 &&
            (zt(),
            M(0, "button", 0, 1),
            ue("click", function () {
              return o._handlePaginatorClick("before");
            })("mousedown", function (a) {
              return o._handlePaginatorPress("before", a);
            })("touchend", function () {
              return o._stopInterval();
            }),
            ve(2, "div", 2),
            T(),
            M(3, "div", 3, 4),
            ue("keydown", function (a) {
              return o._handleKeydown(a);
            }),
            M(5, "div", 5, 6),
            ue("cdkObserveContent", function () {
              return o._onContentChanges();
            }),
            M(7, "div", 7, 8),
            He(9),
            T()()(),
            M(10, "button", 9, 10),
            ue("mousedown", function (a) {
              return o._handlePaginatorPress("after", a);
            })("click", function () {
              return o._handlePaginatorClick("after");
            })("touchend", function () {
              return o._stopInterval();
            }),
            ve(12, "div", 2),
            T()),
            r & 2 &&
              (Ie(
                "mat-mdc-tab-header-pagination-disabled",
                o._disableScrollBefore
              ),
              de(
                "matRippleDisabled",
                o._disableScrollBefore || o.disableRipple
              )("disabled", o._disableScrollBefore || null),
              O(10),
              Ie(
                "mat-mdc-tab-header-pagination-disabled",
                o._disableScrollAfter
              ),
              de("matRippleDisabled", o._disableScrollAfter || o.disableRipple)(
                "disabled",
                o._disableScrollAfter || null
              ));
        },
        dependencies: [rm, w0],
        styles: [
          ".mdc-tab{min-width:90px;padding-right:24px;padding-left:24px;display:flex;flex:1 0 auto;justify-content:center;box-sizing:border-box;margin:0;padding-top:0;padding-bottom:0;border:none;outline:none;text-align:center;white-space:nowrap;cursor:pointer;-webkit-appearance:none;z-index:1}.mdc-tab::-moz-focus-inner{padding:0;border:0}.mdc-tab[hidden]{display:none}.mdc-tab--min-width{flex:0 1 auto}.mdc-tab__content{display:flex;align-items:center;justify-content:center;height:inherit;pointer-events:none}.mdc-tab__text-label{transition:150ms color linear;display:inline-block;line-height:1;z-index:2}.mdc-tab__icon{transition:150ms color linear;z-index:2}.mdc-tab--stacked .mdc-tab__content{flex-direction:column;align-items:center;justify-content:center}.mdc-tab--stacked .mdc-tab__text-label{padding-top:6px;padding-bottom:4px}.mdc-tab--active .mdc-tab__text-label,.mdc-tab--active .mdc-tab__icon{transition-delay:100ms}.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label{padding-left:8px;padding-right:0}[dir=rtl] .mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label,.mdc-tab:not(.mdc-tab--stacked) .mdc-tab__icon+.mdc-tab__text-label[dir=rtl]{padding-left:0;padding-right:8px}.mdc-tab-indicator{display:flex;position:absolute;top:0;left:0;justify-content:center;width:100%;height:100%;pointer-events:none;z-index:1}.mdc-tab-indicator__content{transform-origin:left;opacity:0}.mdc-tab-indicator__content--underline{align-self:flex-end;box-sizing:border-box;width:100%;border-top-style:solid}.mdc-tab-indicator__content--icon{align-self:center;margin:0 auto}.mdc-tab-indicator--active .mdc-tab-indicator__content{opacity:1}.mdc-tab-indicator .mdc-tab-indicator__content{transition:250ms transform cubic-bezier(0.4, 0, 0.2, 1)}.mdc-tab-indicator--no-transition .mdc-tab-indicator__content{transition:none}.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition:150ms opacity linear}.mdc-tab-indicator--active.mdc-tab-indicator--fade .mdc-tab-indicator__content{transition-delay:100ms}.mat-mdc-tab-ripple{position:absolute;top:0;left:0;bottom:0;right:0;pointer-events:none}.mat-mdc-tab-header{display:flex;overflow:hidden;position:relative;flex-shrink:0}.mdc-tab-indicator .mdc-tab-indicator__content{transition-duration:var(--mat-tab-animation-duration, 250ms)}.mat-mdc-tab-header-pagination{-webkit-user-select:none;user-select:none;position:relative;display:none;justify-content:center;align-items:center;min-width:32px;cursor:pointer;z-index:2;-webkit-tap-highlight-color:rgba(0,0,0,0);touch-action:none;box-sizing:content-box;background:none;border:none;outline:0;padding:0}.mat-mdc-tab-header-pagination::-moz-focus-inner{border:0}.mat-mdc-tab-header-pagination .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination{display:flex}.mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after{padding-left:4px}.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(-135deg)}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,.mat-mdc-tab-header-pagination-after{padding-right:4px}.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron{transform:rotate(45deg)}.mat-mdc-tab-header-pagination-chevron{border-style:solid;border-width:2px 2px 0 0;height:8px;width:8px;border-color:var(--mat-tab-header-pagination-icon-color)}.mat-mdc-tab-header-pagination-disabled{box-shadow:none;cursor:default;pointer-events:none}.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron{opacity:.4}.mat-mdc-tab-list{flex-grow:1;position:relative;transition:transform 500ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-mdc-tab-list{transition:none}._mat-animation-noopable span.mdc-tab-indicator__content,._mat-animation-noopable span.mdc-tab__text-label{transition:none}.mat-mdc-tab-links{display:flex;flex:1 0 auto}[mat-align-tabs=center]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:center}[mat-align-tabs=end]>.mat-mdc-tab-link-container .mat-mdc-tab-links{justify-content:flex-end}.mat-mdc-tab-link-container{display:flex;flex-grow:1;overflow:hidden;z-index:1;border-bottom-style:solid;border-bottom-width:var(--mat-tab-header-divider-height);border-bottom-color:var(--mat-tab-header-divider-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination{background-color:var(--mat-tab-header-with-background-background-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background.mat-primary>.mat-mdc-tab-link-container .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab__text-label{color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background:not(.mat-primary)>.mat-mdc-tab-link-container .mat-mdc-tab-link:not(.mdc-tab--active) .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-focus-indicator::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-focus-indicator::before{border-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mdc-tab__ripple::before,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-ripple-element,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mdc-tab__ripple::before{background-color:var(--mat-tab-header-with-background-foreground-color)}.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-link-container .mat-mdc-tab-header-pagination-chevron,.mat-mdc-tab-nav-bar.mat-tabs-with-background>.mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron{color:var(--mat-tab-header-with-background-foreground-color)}",
        ],
        encapsulation: 2,
      }));
    let t = e;
    return t;
  })(),
  pF = cF(tm(em(Jp(class {})))),
  Cm = (() => {
    let e = class e extends pF {
      get active() {
        return this._isActive;
      }
      set active(n) {
        let r = ze(n);
        r !== this._isActive &&
          ((this._isActive = r), this._tabNavBar.updateActiveLink());
      }
      get rippleDisabled() {
        return (
          this.disabled ||
          this.disableRipple ||
          this._tabNavBar.disableRipple ||
          !!this.rippleConfig.disabled
        );
      }
      constructor(n, r, o, s, a, l) {
        super(),
          (this._tabNavBar = n),
          (this.elementRef = r),
          (this._focusMonitor = a),
          (this._destroyed = new F()),
          (this._isActive = !1),
          (this.id = `mat-tab-link-${rw++}`),
          (this.rippleConfig = o || {}),
          (this.tabIndex = parseInt(s) || 0),
          l === "NoopAnimations" &&
            (this.rippleConfig.animation = {
              enterDuration: 0,
              exitDuration: 0,
            }),
          n._fitInkBarToContent.pipe(Se(this._destroyed)).subscribe((c) => {
            this.fitInkBarToContent = c;
          });
      }
      focus() {
        this.elementRef.nativeElement.focus();
      }
      ngAfterViewInit() {
        this._focusMonitor.monitor(this.elementRef);
      }
      ngOnDestroy() {
        this._destroyed.next(),
          this._destroyed.complete(),
          super.ngOnDestroy(),
          this._focusMonitor.stopMonitoring(this.elementRef);
      }
      _handleFocus() {
        this._tabNavBar.focusIndex = this._tabNavBar._items
          .toArray()
          .indexOf(this);
      }
      _handleKeydown(n) {
        (n.keyCode === 32 || n.keyCode === 13) &&
          (this.disabled
            ? n.preventDefault()
            : this._tabNavBar.tabPanel &&
              this.elementRef.nativeElement.click());
      }
      _getAriaControls() {
        return this._tabNavBar.tabPanel
          ? this._tabNavBar.tabPanel?.id
          : this.elementRef.nativeElement.getAttribute("aria-controls");
      }
      _getAriaSelected() {
        return this._tabNavBar.tabPanel
          ? this.active
            ? "true"
            : "false"
          : this.elementRef.nativeElement.getAttribute("aria-selected");
      }
      _getAriaCurrent() {
        return this.active && !this._tabNavBar.tabPanel ? "page" : null;
      }
      _getRole() {
        return this._tabNavBar.tabPanel
          ? "tab"
          : this.elementRef.nativeElement.getAttribute("role");
      }
      _getTabIndex() {
        return this._tabNavBar.tabPanel
          ? this._isActive && !this.disabled
            ? 0
            : -1
          : this.tabIndex;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)(
        y(Em),
        y(Z),
        y(im, 8),
        Fi("tabindex"),
        y(M0),
        y(at, 8)
      );
    }),
      (e.ɵcmp = Re({
        type: e,
        selectors: [
          ["", "mat-tab-link", ""],
          ["", "matTabLink", ""],
        ],
        hostAttrs: [
          1,
          "mdc-tab",
          "mat-mdc-tab-link",
          "mat-mdc-focus-indicator",
        ],
        hostVars: 11,
        hostBindings: function (r, o) {
          r & 1 &&
            ue("focus", function () {
              return o._handleFocus();
            })("keydown", function (a) {
              return o._handleKeydown(a);
            }),
            r & 2 &&
              (je("aria-controls", o._getAriaControls())(
                "aria-current",
                o._getAriaCurrent()
              )("aria-disabled", o.disabled)(
                "aria-selected",
                o._getAriaSelected()
              )("id", o.id)("tabIndex", o._getTabIndex())("role", o._getRole()),
              Ie("mat-mdc-tab-disabled", o.disabled)(
                "mdc-tab--active",
                o.active
              ));
        },
        inputs: {
          disabled: "disabled",
          disableRipple: "disableRipple",
          tabIndex: "tabIndex",
          active: "active",
          id: "id",
        },
        exportAs: ["matTabLink"],
        features: [Oe],
        attrs: lF,
        ngContentSelectors: wm,
        decls: 5,
        vars: 2,
        consts: [
          [1, "mdc-tab__ripple"],
          [
            "mat-ripple",
            "",
            1,
            "mat-mdc-tab-ripple",
            3,
            "matRippleTrigger",
            "matRippleDisabled",
          ],
          [1, "mdc-tab__content"],
          [1, "mdc-tab__text-label"],
        ],
        template: function (r, o) {
          r & 1 &&
            (zt(),
            ve(0, "span", 0)(1, "div", 1),
            M(2, "span", 2)(3, "span", 3),
            He(4),
            T()()),
            r & 2 &&
              (O(1),
              de("matRippleTrigger", o.elementRef.nativeElement)(
                "matRippleDisabled",
                o.rippleDisabled
              ));
        },
        dependencies: [rm],
        styles: [
          '.mat-mdc-tab-link{-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-decoration:none;background:none;font-family:var(--mat-tab-header-label-text-font);font-size:var(--mat-tab-header-label-text-size);letter-spacing:var(--mat-tab-header-label-text-tracking);line-height:var(--mat-tab-header-label-text-line-height);font-weight:var(--mat-tab-header-label-text-weight)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-color:var(--mdc-tab-indicator-active-indicator-color)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-top-width:var(--mdc-tab-indicator-active-indicator-height)}.mat-mdc-tab-link .mdc-tab-indicator__content--underline{border-radius:var(--mdc-tab-indicator-active-indicator-shape)}.mat-mdc-tab-link:not(.mdc-tab--stacked){height:var(--mdc-secondary-navigation-tab-container-height)}.mat-mdc-tab-link:not(:disabled).mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled.mdc-tab--active .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):hover:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):focus:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:not(:disabled):active:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link:disabled:not(.mdc-tab--active) .mdc-tab__icon{fill:currentColor}.mat-mdc-tab-link.mdc-tab{flex-grow:0}.mat-mdc-tab-link:hover .mdc-tab__text-label{color:var(--mat-tab-header-inactive-hover-label-text-color)}.mat-mdc-tab-link:focus .mdc-tab__text-label{color:var(--mat-tab-header-inactive-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__text-label{color:var(--mat-tab-header-active-label-text-color)}.mat-mdc-tab-link.mdc-tab--active .mdc-tab__ripple::before,.mat-mdc-tab-link.mdc-tab--active .mat-ripple-element{background-color:var(--mat-tab-header-active-ripple-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab__text-label{color:var(--mat-tab-header-active-hover-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:hover .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-hover-indicator-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab__text-label{color:var(--mat-tab-header-active-focus-label-text-color)}.mat-mdc-tab-link.mdc-tab--active:focus .mdc-tab-indicator__content--underline{border-color:var(--mat-tab-header-active-focus-indicator-color)}.mat-mdc-tab-link.mat-mdc-tab-disabled{opacity:.4;pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__content{pointer-events:none}.mat-mdc-tab-link.mat-mdc-tab-disabled .mdc-tab__ripple::before,.mat-mdc-tab-link.mat-mdc-tab-disabled .mat-ripple-element{background-color:var(--mat-tab-header-disabled-ripple-color)}.mat-mdc-tab-link .mdc-tab__ripple::before{content:"";display:block;position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;pointer-events:none;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-link .mdc-tab__text-label{color:var(--mat-tab-header-inactive-label-text-color);display:inline-flex;align-items:center}.mat-mdc-tab-link .mdc-tab__content{position:relative;pointer-events:auto}.mat-mdc-tab-link:hover .mdc-tab__ripple::before{opacity:.04}.mat-mdc-tab-link.cdk-program-focused .mdc-tab__ripple::before,.mat-mdc-tab-link.cdk-keyboard-focused .mdc-tab__ripple::before{opacity:.12}.mat-mdc-tab-link .mat-ripple-element{opacity:.12;background-color:var(--mat-tab-header-inactive-ripple-color)}.mat-mdc-tab-header.mat-mdc-tab-nav-bar-stretch-tabs .mat-mdc-tab-link{flex-grow:1}.mat-mdc-tab-link::before{margin:5px}@media(max-width: 599px){.mat-mdc-tab-link{min-width:72px}}',
        ],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  ow = (() => {
    let e = class e {
      constructor() {
        this.id = `mat-tab-nav-panel-${rw++}`;
      }
    };
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵcmp = Re({
        type: e,
        selectors: [["mat-tab-nav-panel"]],
        hostAttrs: ["role", "tabpanel", 1, "mat-mdc-tab-nav-panel"],
        hostVars: 2,
        hostBindings: function (r, o) {
          r & 2 && je("aria-labelledby", o._activeTabId)("id", o.id);
        },
        inputs: { id: "id" },
        exportAs: ["matTabNavPanel"],
        ngContentSelectors: wm,
        decls: 1,
        vars: 0,
        template: function (r, o) {
          r & 1 && (zt(), He(0));
        },
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  sw = (() => {
    let e = class e {};
    (e.ɵfac = function (r) {
      return new (r || e)();
    }),
      (e.ɵmod = q({ type: e })),
      (e.ɵinj = z({ imports: [zi, ke, rd, Ws, to, A0, ke] }));
    let t = e;
    return t;
  })();
function gF(t, e) {
  if ((t & 1 && ve(0, "img", 6), t & 2)) {
    let i = pe();
    de(
      "src",
      "https://interstate21.com/tesla-app/images/" +
        (i.currentCar == null ? null : i.currentCar.model) +
        "/" +
        (i.currentCar == null ? null : i.currentCar.color) +
        ".jpg",
      Uf
    );
  }
}
var aw = (() => {
  let e = class e {
    constructor(n) {
      (this.teslaCarService = n), (this.currentCar = null);
    }
    ngOnInit() {
      this.currentCarSubscription = this.teslaCarService
        .getCurrentCarAsObservable()
        .subscribe((n) => {
          console.log(n), (this.currentCar = n);
        });
    }
    isStep2Disabled() {
      return (
        !this.currentCar || !this.currentCar.model || !this.currentCar.color
      );
    }
    isStep3Disabled() {
      return (
        !this.currentCar ||
        !this.currentCar.model ||
        !this.currentCar.color ||
        !this.currentCar.configId
      );
    }
    ngOnDestroy() {
      this.currentCarSubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (r) {
    return new (r || e)(y(mt));
  }),
    (e.ɵcmp = Re({
      type: e,
      selectors: [["app-root"]],
      standalone: !0,
      features: [qt],
      decls: 11,
      vars: 4,
      consts: [
        ["mat-tab-nav-bar", "", 3, "tabPanel"],
        [
          "id",
          "step1",
          "mat-tab-link",
          "",
          "routerLinkActive",
          "mdc-tab--active mdc-tab-indicator--active",
          "routerLink",
          "/step1",
        ],
        [
          "id",
          "step2",
          "mat-tab-link",
          "",
          "routerLinkActive",
          "mdc-tab--active mdc-tab-indicator--active",
          "routerLink",
          "/step2",
          3,
          "disabled",
        ],
        [
          "id",
          "step3",
          "mat-tab-link",
          "",
          "routerLinkActive",
          "mdc-tab--active mdc-tab-indicator--active",
          "routerLink",
          "/step3",
          3,
          "disabled",
        ],
        ["tabPanel", ""],
        ["style", "width: 100%", 3, "src"],
        [2, "width", "100%", 3, "src"],
      ],
      template: function (r, o) {
        if (
          (r & 1 &&
            (M(0, "nav", 0)(1, "a", 1),
            ie(2, "Step 1"),
            T(),
            M(3, "a", 2),
            ie(4, "Step 2"),
            T(),
            M(5, "a", 3),
            ie(6, "Step 3"),
            T()(),
            M(7, "mat-tab-nav-panel", null, 4),
            ve(9, "router-outlet"),
            ge(10, gF, 1, 1, "img", 5),
            T()),
          r & 2)
        ) {
          let s = Bi(8);
          de("tabPanel", s),
            O(3),
            de("disabled", o.isStep2Disabled()),
            O(2),
            de("disabled", o.isStep3Disabled()),
            O(5),
            be(
              10,
              o.currentCar != null &&
                o.currentCar.model &&
                o.currentCar != null &&
                o.currentCar.color
                ? 10
                : -1
            );
        }
      },
      dependencies: [Xh, oc, L_, sw, Em, ow, Cm, Jx],
      styles: [
        `[_nghost-%COMP%] {
    --bright-blue: oklch(51.01% 0.274 263.83);
    --electric-violet: oklch(53.18% 0.28 296.97);
    --french-violet: oklch(47.66% 0.246 305.88);
    --vivid-pink: oklch(69.02% 0.277 332.77);
    --hot-red: oklch(61.42% 0.238 15.34);
    --orange-red: oklch(63.32% 0.24 31.68);

    --gray-900: oklch(19.37% 0.006 300.98);
    --gray-700: oklch(36.98% 0.014 302.71);
    --gray-400: oklch(70.9% 0.015 304.04);

    --red-to-pink-to-purple-vertical-gradient: linear-gradient(
      180deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --red-to-pink-to-purple-horizontal-gradient: linear-gradient(
      90deg,
      var(--orange-red) 0%,
      var(--vivid-pink) 50%,
      var(--electric-violet) 100%
    );

    --pill-accent: var(--bright-blue);

    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1[_ngcontent-%COMP%] {
    font-size: 3.125rem;
    color: var(--gray-900);
    font-weight: 500;
    line-height: 100%;
    letter-spacing: -0.125rem;
    margin: 0;
    font-family: "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol";
  }

  p[_ngcontent-%COMP%] {
    margin: 0;
    color: var(--gray-700);
  }

  main[_ngcontent-%COMP%] {
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    box-sizing: inherit;
    position: relative;
  }

  .angular-logo[_ngcontent-%COMP%] {
    max-width: 9.2rem;
  }

  .content[_ngcontent-%COMP%] {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 700px;
    margin-bottom: 3rem;
  }

  .content[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
    margin-top: 1.75rem;
  }

  .content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {
    margin-top: 1.5rem;
  }

  .divider[_ngcontent-%COMP%] {
    width: 1px;
    background: var(--red-to-pink-to-purple-vertical-gradient);
    margin-inline: 0.5rem;
  }`,
      ],
    }));
  let t = e;
  return t;
})();
var bF = /(%?)(%([sdijo]))/g;
function vF(t, e) {
  switch (e) {
    case "s":
      return t;
    case "d":
    case "i":
      return Number(t);
    case "j":
      return JSON.stringify(t);
    case "o": {
      if (typeof t == "string") return t;
      let i = JSON.stringify(t);
      return i === "{}" || i === "[]" || /^\[object .+?\]$/.test(i) ? t : i;
    }
  }
}
function ui(t, ...e) {
  if (e.length === 0) return t;
  let i = 0,
    n = t.replace(bF, (r, o, s, a) => {
      let l = e[i],
        c = vF(l, a);
      return o ? r : (i++, c);
    });
  return (
    i < e.length && (n += ` ${e.slice(i).join(" ")}`),
    (n = n.replace(/%{2,2}/g, "%")),
    n
  );
}
var yF = 2;
function _F(t) {
  if (!t.stack) return;
  let e = t.stack.split(`
`);
  e.splice(1, yF),
    (t.stack = e.join(`
`));
}
var xF = class extends Error {
    constructor(t, ...e) {
      super(t),
        (this.message = t),
        (this.name = "Invariant Violation"),
        (this.message = ui(t, ...e)),
        _F(this);
    }
  },
  qe = (t, e, ...i) => {
    if (!t) throw new xF(e, ...i);
  };
qe.as = (t, e, i, ...n) => {
  if (!e) {
    let r = n.length === 0 ? i : ui(i, n),
      o;
    try {
      o = Reflect.construct(t, [r]);
    } catch {
      o = t(r);
    }
    throw o;
  }
};
function uo() {
  if (typeof navigator < "u" && navigator.product === "ReactNative") return !0;
  if (typeof process < "u") {
    let t = process.type;
    return t === "renderer" || t === "worker"
      ? !1
      : !!(process.versions && process.versions.node);
  }
  return !1;
}
var Dt = (t) =>
  vt(void 0, null, function* () {
    try {
      return {
        error: null,
        data: yield t().catch((i) => {
          throw i;
        }),
      };
    } catch (e) {
      return { error: e, data: null };
    }
  });
var wF = "[MSW]";
function Dm(t, ...e) {
  let i = ui(t, ...e);
  return `${wF} ${i}`;
}
function EF(t, ...e) {
  console.warn(Dm(t, ...e));
}
function CF(t, ...e) {
  console.error(Dm(t, ...e));
}
var ee = { formatMessage: Dm, warn: EF, error: CF };
var DF = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  lw = (t, e, i) =>
    DF(void 0, null, function* () {
      let n = null,
        r = null;
      for (let o of e)
        if (
          ((r = yield o.run({ request: t, resolutionContext: i })),
          r !== null && (n = o),
          r?.response)
        )
          break;
      return n
        ? { handler: n, parsedResult: r?.parsedResult, response: r?.response }
        : null;
    });
var IF = Object.create,
  cw = Object.defineProperty,
  SF = Object.getOwnPropertyDescriptor,
  dw = Object.getOwnPropertyNames,
  TF = Object.getPrototypeOf,
  MF = Object.prototype.hasOwnProperty,
  AF = (t, e) =>
    function () {
      return e || (0, t[dw(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  RF = (t, e, i, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let r of dw(e))
        !MF.call(t, r) &&
          r !== i &&
          cw(t, r, {
            get: () => e[r],
            enumerable: !(n = SF(e, r)) || n.enumerable,
          });
    return t;
  },
  OF = (t, e, i) => (
    (i = t != null ? IF(TF(t)) : {}),
    RF(
      e || !t || !t.__esModule
        ? cw(i, "default", { value: t, enumerable: !0 })
        : i,
      t
    )
  ),
  kF = AF({
    "node_modules/js-levenshtein/index.js"(t, e) {
      "use strict";
      e.exports = (function () {
        function i(n, r, o, s, a) {
          return n < r || o < r ? (n > o ? o + 1 : n + 1) : s === a ? r : r + 1;
        }
        return function (n, r) {
          if (n === r) return 0;
          if (n.length > r.length) {
            var o = n;
            (n = r), (r = o);
          }
          for (
            var s = n.length, a = r.length;
            s > 0 && n.charCodeAt(s - 1) === r.charCodeAt(a - 1);

          )
            s--, a--;
          for (var l = 0; l < s && n.charCodeAt(l) === r.charCodeAt(l); ) l++;
          if (((s -= l), (a -= l), s === 0 || a < 3)) return a;
          var c = 0,
            d,
            u,
            f,
            h,
            p,
            m,
            g,
            b,
            x,
            P,
            I,
            re,
            H = [];
          for (d = 0; d < s; d++) H.push(d + 1), H.push(n.charCodeAt(l + d));
          for (var se = H.length - 1; c < a - 3; )
            for (
              x = r.charCodeAt(l + (u = c)),
                P = r.charCodeAt(l + (f = c + 1)),
                I = r.charCodeAt(l + (h = c + 2)),
                re = r.charCodeAt(l + (p = c + 3)),
                m = c += 4,
                d = 0;
              d < se;
              d += 2
            )
              (g = H[d]),
                (b = H[d + 1]),
                (u = i(g, u, f, x, b)),
                (f = i(u, f, h, P, b)),
                (h = i(f, h, p, I, b)),
                (m = i(h, p, m, re, b)),
                (H[d] = m),
                (p = h),
                (h = f),
                (f = u),
                (u = g);
          for (; c < a; )
            for (x = r.charCodeAt(l + (u = c)), m = ++c, d = 0; d < se; d += 2)
              (g = H[d]), (H[d] = m = i(g, u, m, x, H[d + 1])), (u = g);
          return m;
        };
      })();
    },
  }),
  NF = OF(kF(), 1),
  uw = NF.default;
function fw() {
  qe(
    typeof URL < "u",
    ee.formatMessage(
      `Global "URL" class is not defined. This likely means that you're running MSW in an environment that doesn't support all Node.js standard API (e.g. React Native). If that's the case, please use an appropriate polyfill for the "URL" class, like "react-native-url-polyfill".`
    )
  );
}
var PF = class extends Error {
    constructor(t, e, i) {
      super(
        `Possible EventEmitter memory leak detected. ${i} ${e.toString()} listeners added. Use emitter.setMaxListeners() to increase limit`
      ),
        (this.emitter = t),
        (this.type = e),
        (this.count = i),
        (this.name = "MaxListenersExceededWarning");
    }
  },
  hw = class {
    static listenerCount(t, e) {
      return t.listenerCount(e);
    }
    constructor() {
      (this.events = new Map()),
        (this.maxListeners = hw.defaultMaxListeners),
        (this.hasWarnedAboutPotentialMemoryLeak = !1);
    }
    _emitInternalEvent(t, e, i) {
      this.emit(t, e, i);
    }
    _getListeners(t) {
      return Array.prototype.concat.apply([], this.events.get(t)) || [];
    }
    _removeListener(t, e) {
      let i = t.indexOf(e);
      return i > -1 && t.splice(i, 1), [];
    }
    _wrapOnceListener(t, e) {
      let i = (...n) => (this.removeListener(t, i), e.apply(this, n));
      return Object.defineProperty(i, "name", { value: e.name }), i;
    }
    setMaxListeners(t) {
      return (this.maxListeners = t), this;
    }
    getMaxListeners() {
      return this.maxListeners;
    }
    eventNames() {
      return Array.from(this.events.keys());
    }
    emit(t, ...e) {
      let i = this._getListeners(t);
      return (
        i.forEach((n) => {
          n.apply(this, e);
        }),
        i.length > 0
      );
    }
    addListener(t, e) {
      this._emitInternalEvent("newListener", t, e);
      let i = this._getListeners(t).concat(e);
      if (
        (this.events.set(t, i),
        this.maxListeners > 0 &&
          this.listenerCount(t) > this.maxListeners &&
          !this.hasWarnedAboutPotentialMemoryLeak)
      ) {
        this.hasWarnedAboutPotentialMemoryLeak = !0;
        let n = new PF(this, t, this.listenerCount(t));
        console.warn(n);
      }
      return this;
    }
    on(t, e) {
      return this.addListener(t, e);
    }
    once(t, e) {
      return this.addListener(t, this._wrapOnceListener(t, e));
    }
    prependListener(t, e) {
      let i = this._getListeners(t);
      if (i.length > 0) {
        let n = [e].concat(i);
        this.events.set(t, n);
      } else this.events.set(t, i.concat(e));
      return this;
    }
    prependOnceListener(t, e) {
      return this.prependListener(t, this._wrapOnceListener(t, e));
    }
    removeListener(t, e) {
      let i = this._getListeners(t);
      return (
        i.length > 0 &&
          (this._removeListener(i, e),
          this.events.set(t, i),
          this._emitInternalEvent("removeListener", t, e)),
        this
      );
    }
    off(t, e) {
      return this.removeListener(t, e);
    }
    removeAllListeners(t) {
      return t ? this.events.delete(t) : this.events.clear(), this;
    }
    listeners(t) {
      return Array.from(this._getListeners(t));
    }
    listenerCount(t) {
      return this._getListeners(t).length;
    }
    rawListeners(t) {
      return this.listeners(t);
    }
  },
  fo = hw;
fo.defaultMaxListeners = 10;
function pw(t, e) {
  let i = t.emit;
  if (i._isPiped) return;
  let n = function (o, ...s) {
    return e.emit(o, ...s), i.call(this, o, ...s);
  };
  (n._isPiped = !0), (t.emit = n);
}
function Im(t) {
  let e = [...t];
  return Object.freeze(e), e;
}
var FF = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  cd = class {
    constructor() {
      this.subscriptions = [];
    }
    dispose() {
      return FF(this, null, function* () {
        yield Promise.all(this.subscriptions.map((e) => e()));
      });
    }
  };
var dd = class extends cd {
  constructor(...e) {
    super(),
      qe(
        this.validateHandlers(e),
        ee.formatMessage(
          "Failed to apply given request handlers: invalid input. Did you forget to spread the request handlers Array?"
        )
      ),
      (this.initialHandlers = Im(e)),
      (this.currentHandlers = [...e]),
      (this.emitter = new fo()),
      (this.publicEmitter = new fo()),
      pw(this.emitter, this.publicEmitter),
      (this.events = this.createLifeCycleEvents()),
      this.subscriptions.push(() => {
        this.emitter.removeAllListeners(),
          this.publicEmitter.removeAllListeners();
      });
  }
  validateHandlers(e) {
    return e.every((i) => !Array.isArray(i));
  }
  use(...e) {
    qe(
      this.validateHandlers(e),
      ee.formatMessage(
        'Failed to call "use()" with the given request handlers: invalid input. Did you forget to spread the array of request handlers?'
      )
    ),
      this.currentHandlers.unshift(...e);
  }
  restoreHandlers() {
    this.currentHandlers.forEach((e) => {
      e.isUsed = !1;
    });
  }
  resetHandlers(...e) {
    this.currentHandlers = e.length > 0 ? [...e] : [...this.initialHandlers];
  }
  listHandlers() {
    return Im(this.currentHandlers);
  }
  createLifeCycleEvents() {
    return {
      on: (...e) => this.publicEmitter.on(...e),
      removeListener: (...e) => this.publicEmitter.removeListener(...e),
      removeAllListeners: (...e) => this.publicEmitter.removeAllListeners(...e),
    };
  }
};
var LF = /[\/\\]msw[\/\\]src[\/\\](.+)/,
  jF =
    /(node_modules)?[\/\\]lib[\/\\](core|browser|node|native|iife)[\/\\]|^[^\/\\]*$/;
function mw(t) {
  let e = t.stack;
  if (!e) return;
  let n = e
    .split(
      `
`
    )
    .slice(1)
    .find((o) => !(LF.test(o) || jF.test(o)));
  return n
    ? n.replace(/\s*at [^()]*\(([^)]+)\)/, "$1").replace(/^@/, "")
    : void 0;
}
function gw(t) {
  return t ? typeof t[Symbol.iterator] == "function" : !1;
}
var VF = Object.defineProperty,
  BF = Object.defineProperties,
  UF = Object.getOwnPropertyDescriptors,
  bw = Object.getOwnPropertySymbols,
  HF = Object.prototype.hasOwnProperty,
  $F = Object.prototype.propertyIsEnumerable,
  vw = (t, e, i) =>
    e in t
      ? VF(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  yw = (t, e) => {
    for (var i in e || (e = {})) HF.call(e, i) && vw(t, i, e[i]);
    if (bw) for (var i of bw(e)) $F.call(e, i) && vw(t, i, e[i]);
    return t;
  },
  _w = (t, e) => BF(t, UF(e)),
  ud = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  ho = class {
    constructor(e) {
      (this.resolver = e.resolver), (this.options = e.options);
      let i = mw(new Error());
      (this.info = _w(yw({}, e.info), { callFrame: i })), (this.isUsed = !1);
    }
    parse(e) {
      return ud(this, null, function* () {
        return {};
      });
    }
    test(e) {
      return ud(this, null, function* () {
        let i = yield this.parse({
          request: e.request,
          resolutionContext: e.resolutionContext,
        });
        return this.predicate({
          request: e.request,
          parsedResult: i,
          resolutionContext: e.resolutionContext,
        });
      });
    }
    extendResolverArgs(e) {
      return {};
    }
    run(e) {
      return ud(this, null, function* () {
        var i, n;
        if (this.isUsed && (i = this.options) != null && i.once) return null;
        let r = e.request.clone(),
          o = yield this.parse({
            request: e.request,
            resolutionContext: e.resolutionContext,
          });
        if (
          !this.predicate({
            request: e.request,
            parsedResult: o,
            resolutionContext: e.resolutionContext,
          }) ||
          (this.isUsed && (n = this.options) != null && n.once)
        )
          return null;
        this.isUsed = !0;
        let a = this.wrapResolver(this.resolver),
          l = this.extendResolverArgs({ request: e.request, parsedResult: o }),
          c = yield a(_w(yw({}, l), { request: e.request }));
        return this.createExecutionResult({
          request: r,
          response: c,
          parsedResult: o,
        });
      });
    }
    wrapResolver(e) {
      return (i) =>
        ud(this, null, function* () {
          let n = this.resolverGenerator || (yield e(i));
          if (gw(n)) {
            this.isUsed = !1;
            let { value: r, done: o } = n[Symbol.iterator]().next(),
              s = yield r;
            return (
              o && (this.isUsed = !0),
              !s && o
                ? (qe(
                    this.resolverGeneratorResult,
                    "Failed to returned a previously stored generator response: the value is not a valid Response."
                  ),
                  this.resolverGeneratorResult.clone())
                : (this.resolverGenerator || (this.resolverGenerator = n),
                  s && (this.resolverGeneratorResult = s?.clone()),
                  s)
            );
          }
          return n;
        });
    }
    createExecutionResult(e) {
      return {
        handler: this,
        request: e.request,
        response: e.response,
        parsedResult: e.parsedResult,
      };
    }
  };
function fd(t, e) {
  return t.toLowerCase() === e.toLowerCase();
}
function hd(t) {
  return t < 300 ? "#69AB32" : t < 400 ? "#F0BB4B" : "#E95F5D";
}
function pd() {
  let t = new Date();
  return [t.getHours(), t.getMinutes(), t.getSeconds()]
    .map(String)
    .map((e) => e.slice(0, 2))
    .map((e) => e.padStart(2, "0"))
    .join(":");
}
var zF = (t, e, i) =>
  new Promise((n, r) => {
    var o = (l) => {
        try {
          a(i.next(l));
        } catch (c) {
          r(c);
        }
      },
      s = (l) => {
        try {
          a(i.throw(l));
        } catch (c) {
          r(c);
        }
      },
      a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
    a((i = i.apply(t, e)).next());
  });
function md(t) {
  return zF(this, null, function* () {
    let i = yield t.clone().text();
    return {
      url: new URL(t.url),
      method: t.method,
      headers: Object.fromEntries(t.headers.entries()),
      body: i,
    };
  });
}
var qF = Object.create,
  xw = Object.defineProperty,
  WF = Object.getOwnPropertyDescriptor,
  ww = Object.getOwnPropertyNames,
  GF = Object.getPrototypeOf,
  YF = Object.prototype.hasOwnProperty,
  Ew = (t, e) =>
    function () {
      return e || (0, t[ww(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  QF = (t, e, i, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let r of ww(e))
        !YF.call(t, r) &&
          r !== i &&
          xw(t, r, {
            get: () => e[r],
            enumerable: !(n = WF(e, r)) || n.enumerable,
          });
    return t;
  },
  ZF = (t, e, i) => (
    (i = t != null ? qF(GF(t)) : {}),
    QF(
      e || !t || !t.__esModule
        ? xw(i, "default", { value: t, enumerable: !0 })
        : i,
      t
    )
  ),
  KF = Ew({
    "node_modules/statuses/codes.json"(t, e) {
      e.exports = {
        100: "Continue",
        101: "Switching Protocols",
        102: "Processing",
        103: "Early Hints",
        200: "OK",
        201: "Created",
        202: "Accepted",
        203: "Non-Authoritative Information",
        204: "No Content",
        205: "Reset Content",
        206: "Partial Content",
        207: "Multi-Status",
        208: "Already Reported",
        226: "IM Used",
        300: "Multiple Choices",
        301: "Moved Permanently",
        302: "Found",
        303: "See Other",
        304: "Not Modified",
        305: "Use Proxy",
        307: "Temporary Redirect",
        308: "Permanent Redirect",
        400: "Bad Request",
        401: "Unauthorized",
        402: "Payment Required",
        403: "Forbidden",
        404: "Not Found",
        405: "Method Not Allowed",
        406: "Not Acceptable",
        407: "Proxy Authentication Required",
        408: "Request Timeout",
        409: "Conflict",
        410: "Gone",
        411: "Length Required",
        412: "Precondition Failed",
        413: "Payload Too Large",
        414: "URI Too Long",
        415: "Unsupported Media Type",
        416: "Range Not Satisfiable",
        417: "Expectation Failed",
        418: "I'm a Teapot",
        421: "Misdirected Request",
        422: "Unprocessable Entity",
        423: "Locked",
        424: "Failed Dependency",
        425: "Too Early",
        426: "Upgrade Required",
        428: "Precondition Required",
        429: "Too Many Requests",
        431: "Request Header Fields Too Large",
        451: "Unavailable For Legal Reasons",
        500: "Internal Server Error",
        501: "Not Implemented",
        502: "Bad Gateway",
        503: "Service Unavailable",
        504: "Gateway Timeout",
        505: "HTTP Version Not Supported",
        506: "Variant Also Negotiates",
        507: "Insufficient Storage",
        508: "Loop Detected",
        509: "Bandwidth Limit Exceeded",
        510: "Not Extended",
        511: "Network Authentication Required",
      };
    },
  }),
  XF = Ew({
    "node_modules/statuses/index.js"(t, e) {
      "use strict";
      var i = KF();
      (e.exports = a),
        (a.message = i),
        (a.code = n(i)),
        (a.codes = r(i)),
        (a.redirect = {
          300: !0,
          301: !0,
          302: !0,
          303: !0,
          305: !0,
          307: !0,
          308: !0,
        }),
        (a.empty = { 204: !0, 205: !0, 304: !0 }),
        (a.retry = { 502: !0, 503: !0, 504: !0 });
      function n(l) {
        var c = {};
        return (
          Object.keys(l).forEach(function (u) {
            var f = l[u],
              h = Number(u);
            c[f.toLowerCase()] = h;
          }),
          c
        );
      }
      function r(l) {
        return Object.keys(l).map(function (d) {
          return Number(d);
        });
      }
      function o(l) {
        var c = l.toLowerCase();
        if (!Object.prototype.hasOwnProperty.call(a.code, c))
          throw new Error('invalid status message: "' + l + '"');
        return a.code[c];
      }
      function s(l) {
        if (!Object.prototype.hasOwnProperty.call(a.message, l))
          throw new Error("invalid status code: " + l);
        return a.message[l];
      }
      function a(l) {
        if (typeof l == "number") return s(l);
        if (typeof l != "string")
          throw new TypeError("code must be a number or string");
        var c = parseInt(l, 10);
        return isNaN(c) ? o(l) : s(c);
      }
    },
  }),
  JF = ZF(XF(), 1),
  gd = JF.default;
var eL = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  { message: tL } = gd;
function bd(t) {
  return eL(this, null, function* () {
    let e = t.clone(),
      i = yield e.text(),
      n = e.status || 200,
      r = e.statusText || tL[n] || "OK";
    return {
      status: n,
      statusText: r,
      headers: Object.fromEntries(e.headers.entries()),
      body: i,
    };
  });
}
function nL(t) {
  for (var e = [], i = 0; i < t.length; ) {
    var n = t[i];
    if (n === "*" || n === "+" || n === "?") {
      e.push({ type: "MODIFIER", index: i, value: t[i++] });
      continue;
    }
    if (n === "\\") {
      e.push({ type: "ESCAPED_CHAR", index: i++, value: t[i++] });
      continue;
    }
    if (n === "{") {
      e.push({ type: "OPEN", index: i, value: t[i++] });
      continue;
    }
    if (n === "}") {
      e.push({ type: "CLOSE", index: i, value: t[i++] });
      continue;
    }
    if (n === ":") {
      for (var r = "", o = i + 1; o < t.length; ) {
        var s = t.charCodeAt(o);
        if (
          (s >= 48 && s <= 57) ||
          (s >= 65 && s <= 90) ||
          (s >= 97 && s <= 122) ||
          s === 95
        ) {
          r += t[o++];
          continue;
        }
        break;
      }
      if (!r) throw new TypeError("Missing parameter name at ".concat(i));
      e.push({ type: "NAME", index: i, value: r }), (i = o);
      continue;
    }
    if (n === "(") {
      var a = 1,
        l = "",
        o = i + 1;
      if (t[o] === "?")
        throw new TypeError('Pattern cannot start with "?" at '.concat(o));
      for (; o < t.length; ) {
        if (t[o] === "\\") {
          l += t[o++] + t[o++];
          continue;
        }
        if (t[o] === ")") {
          if ((a--, a === 0)) {
            o++;
            break;
          }
        } else if (t[o] === "(" && (a++, t[o + 1] !== "?"))
          throw new TypeError("Capturing groups are not allowed at ".concat(o));
        l += t[o++];
      }
      if (a) throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!l) throw new TypeError("Missing pattern at ".concat(i));
      e.push({ type: "PATTERN", index: i, value: l }), (i = o);
      continue;
    }
    e.push({ type: "CHAR", index: i, value: t[i++] });
  }
  return e.push({ type: "END", index: i, value: "" }), e;
}
function iL(t, e) {
  e === void 0 && (e = {});
  for (
    var i = nL(t),
      n = e.prefixes,
      r = n === void 0 ? "./" : n,
      o = "[^".concat(po(e.delimiter || "/#?"), "]+?"),
      s = [],
      a = 0,
      l = 0,
      c = "",
      d = function (H) {
        if (l < i.length && i[l].type === H) return i[l++].value;
      },
      u = function (H) {
        var se = d(H);
        if (se !== void 0) return se;
        var Ue = i[l],
          nt = Ue.type,
          gt = Ue.index;
        throw new TypeError(
          "Unexpected ".concat(nt, " at ").concat(gt, ", expected ").concat(H)
        );
      },
      f = function () {
        for (var H = "", se; (se = d("CHAR") || d("ESCAPED_CHAR")); ) H += se;
        return H;
      };
    l < i.length;

  ) {
    var h = d("CHAR"),
      p = d("NAME"),
      m = d("PATTERN");
    if (p || m) {
      var g = h || "";
      r.indexOf(g) === -1 && ((c += g), (g = "")),
        c && (s.push(c), (c = "")),
        s.push({
          name: p || a++,
          prefix: g,
          suffix: "",
          pattern: m || o,
          modifier: d("MODIFIER") || "",
        });
      continue;
    }
    var b = h || d("ESCAPED_CHAR");
    if (b) {
      c += b;
      continue;
    }
    c && (s.push(c), (c = ""));
    var x = d("OPEN");
    if (x) {
      var g = f(),
        P = d("NAME") || "",
        I = d("PATTERN") || "",
        re = f();
      u("CLOSE"),
        s.push({
          name: P || (I ? a++ : ""),
          pattern: P && !I ? o : I,
          prefix: g,
          suffix: re,
          modifier: d("MODIFIER") || "",
        });
      continue;
    }
    u("END");
  }
  return s;
}
function Cw(t, e) {
  var i = [],
    n = Iw(t, i, e);
  return rL(n, i, e);
}
function rL(t, e, i) {
  i === void 0 && (i = {});
  var n = i.decode,
    r =
      n === void 0
        ? function (o) {
            return o;
          }
        : n;
  return function (o) {
    var s = t.exec(o);
    if (!s) return !1;
    for (
      var a = s[0],
        l = s.index,
        c = Object.create(null),
        d = function (f) {
          if (s[f] === void 0) return "continue";
          var h = e[f - 1];
          h.modifier === "*" || h.modifier === "+"
            ? (c[h.name] = s[f].split(h.prefix + h.suffix).map(function (p) {
                return r(p, h);
              }))
            : (c[h.name] = r(s[f], h));
        },
        u = 1;
      u < s.length;
      u++
    )
      d(u);
    return { path: a, index: l, params: c };
  };
}
function po(t) {
  return t.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Dw(t) {
  return t && t.sensitive ? "" : "i";
}
function oL(t, e) {
  if (!e) return t;
  for (var i = /\((?:\?<(.*?)>)?(?!\?)/g, n = 0, r = i.exec(t.source); r; )
    e.push({
      name: r[1] || n++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: "",
    }),
      (r = i.exec(t.source));
  return t;
}
function sL(t, e, i) {
  var n = t.map(function (r) {
    return Iw(r, e, i).source;
  });
  return new RegExp("(?:".concat(n.join("|"), ")"), Dw(i));
}
function aL(t, e, i) {
  return lL(iL(t, i), e, i);
}
function lL(t, e, i) {
  i === void 0 && (i = {});
  for (
    var n = i.strict,
      r = n === void 0 ? !1 : n,
      o = i.start,
      s = o === void 0 ? !0 : o,
      a = i.end,
      l = a === void 0 ? !0 : a,
      c = i.encode,
      d =
        c === void 0
          ? function (gt) {
              return gt;
            }
          : c,
      u = i.delimiter,
      f = u === void 0 ? "/#?" : u,
      h = i.endsWith,
      p = h === void 0 ? "" : h,
      m = "[".concat(po(p), "]|$"),
      g = "[".concat(po(f), "]"),
      b = s ? "^" : "",
      x = 0,
      P = t;
    x < P.length;
    x++
  ) {
    var I = P[x];
    if (typeof I == "string") b += po(d(I));
    else {
      var re = po(d(I.prefix)),
        H = po(d(I.suffix));
      if (I.pattern)
        if ((e && e.push(I), re || H))
          if (I.modifier === "+" || I.modifier === "*") {
            var se = I.modifier === "*" ? "?" : "";
            b += "(?:"
              .concat(re, "((?:")
              .concat(I.pattern, ")(?:")
              .concat(H)
              .concat(re, "(?:")
              .concat(I.pattern, "))*)")
              .concat(H, ")")
              .concat(se);
          } else
            b += "(?:"
              .concat(re, "(")
              .concat(I.pattern, ")")
              .concat(H, ")")
              .concat(I.modifier);
        else
          I.modifier === "+" || I.modifier === "*"
            ? (b += "((?:".concat(I.pattern, ")").concat(I.modifier, ")"))
            : (b += "(".concat(I.pattern, ")").concat(I.modifier));
      else b += "(?:".concat(re).concat(H, ")").concat(I.modifier);
    }
  }
  if (l)
    r || (b += "".concat(g, "?")),
      (b += i.endsWith ? "(?=".concat(m, ")") : "$");
  else {
    var Ue = t[t.length - 1],
      nt =
        typeof Ue == "string"
          ? g.indexOf(Ue[Ue.length - 1]) > -1
          : Ue === void 0;
    r || (b += "(?:".concat(g, "(?=").concat(m, "))?")),
      nt || (b += "(?=".concat(g, "|").concat(m, ")"));
  }
  return new RegExp(b, Dw(i));
}
function Iw(t, e, i) {
  return t instanceof RegExp
    ? oL(t, e)
    : Array.isArray(t)
    ? sL(t, e, i)
    : aL(t, e, i);
}
var cL = new TextEncoder();
function Sm(t) {
  return cL.encode(t);
}
function Tm(t, e) {
  return new TextDecoder(e).decode(t);
}
function Sw(t) {
  return t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
}
var dL = new Set([101, 103, 204, 205, 304]);
function Qs(t) {
  return dL.has(t);
}
var uL = Object.defineProperty,
  fL = (t, e) => {
    for (var i in e) uL(t, i, { get: e[i], enumerable: !0 });
  },
  Mm = {};
fL(Mm, {
  blue: () => pL,
  gray: () => Am,
  green: () => gL,
  red: () => mL,
  yellow: () => hL,
});
function hL(t) {
  return `\x1B[33m${t}\x1B[0m`;
}
function pL(t) {
  return `\x1B[34m${t}\x1B[0m`;
}
function Am(t) {
  return `\x1B[90m${t}\x1B[0m`;
}
function mL(t) {
  return `\x1B[31m${t}\x1B[0m`;
}
function gL(t) {
  return `\x1B[32m${t}\x1B[0m`;
}
var vd = uo(),
  Rm = class {
    constructor(t) {
      (this.name = t), (this.prefix = `[${this.name}]`);
      let e = Tw("DEBUG"),
        i = Tw("LOG_LEVEL");
      e === "1" || e === "true" || (typeof e < "u" && this.name.startsWith(e))
        ? ((this.debug = Zs(i, "debug") ? yn : this.debug),
          (this.info = Zs(i, "info") ? yn : this.info),
          (this.success = Zs(i, "success") ? yn : this.success),
          (this.warning = Zs(i, "warning") ? yn : this.warning),
          (this.error = Zs(i, "error") ? yn : this.error))
        : ((this.info = yn),
          (this.success = yn),
          (this.warning = yn),
          (this.error = yn),
          (this.only = yn));
    }
    prefix;
    extend(t) {
      return new Rm(`${this.name}:${t}`);
    }
    debug(t, ...e) {
      this.logEntry({
        level: "debug",
        message: Am(t),
        positionals: e,
        prefix: this.prefix,
        colors: { prefix: "gray" },
      });
    }
    info(t, ...e) {
      this.logEntry({
        level: "info",
        message: t,
        positionals: e,
        prefix: this.prefix,
        colors: { prefix: "blue" },
      });
      let i = new bL();
      return (n, ...r) => {
        i.measure(),
          this.logEntry({
            level: "info",
            message: `${n} ${Am(`${i.deltaTime}ms`)}`,
            positionals: r,
            prefix: this.prefix,
            colors: { prefix: "blue" },
          });
      };
    }
    success(t, ...e) {
      this.logEntry({
        level: "info",
        message: t,
        positionals: e,
        prefix: `\u2714 ${this.prefix}`,
        colors: { timestamp: "green", prefix: "green" },
      });
    }
    warning(t, ...e) {
      this.logEntry({
        level: "warning",
        message: t,
        positionals: e,
        prefix: `\u26A0 ${this.prefix}`,
        colors: { timestamp: "yellow", prefix: "yellow" },
      });
    }
    error(t, ...e) {
      this.logEntry({
        level: "error",
        message: t,
        positionals: e,
        prefix: `\u2716 ${this.prefix}`,
        colors: { timestamp: "red", prefix: "red" },
      });
    }
    only(t) {
      t();
    }
    createEntry(t, e) {
      return { timestamp: new Date(), level: t, message: e };
    }
    logEntry(t) {
      let {
          level: e,
          message: i,
          prefix: n,
          colors: r,
          positionals: o = [],
        } = t,
        s = this.createEntry(e, i),
        a = r?.timestamp || "gray",
        l = r?.prefix || "gray",
        c = { timestamp: Mm[a], prefix: Mm[l] };
      this.getWriter(e)(
        [c.timestamp(this.formatTimestamp(s.timestamp))]
          .concat(n != null ? c.prefix(n) : [])
          .concat(Mw(i))
          .join(" "),
        ...o.map(Mw)
      );
    }
    formatTimestamp(t) {
      return `${t.toLocaleTimeString("en-GB")}:${t.getMilliseconds()}`;
    }
    getWriter(t) {
      switch (t) {
        case "debug":
        case "success":
        case "info":
          return vL;
        case "warning":
          return yL;
        case "error":
          return _L;
      }
    }
  },
  bL = class {
    startTime;
    endTime;
    deltaTime;
    constructor() {
      this.startTime = performance.now();
    }
    measure() {
      this.endTime = performance.now();
      let t = this.endTime - this.startTime;
      this.deltaTime = t.toFixed(2);
    }
  },
  yn = () => {};
function vL(t, ...e) {
  if (vd) {
    process.stdout.write(
      ui(t, ...e) +
        `
`
    );
    return;
  }
  console.log(t, ...e);
}
function yL(t, ...e) {
  if (vd) {
    process.stderr.write(
      ui(t, ...e) +
        `
`
    );
    return;
  }
  console.warn(t, ...e);
}
function _L(t, ...e) {
  if (vd) {
    process.stderr.write(
      ui(t, ...e) +
        `
`
    );
    return;
  }
  console.error(t, ...e);
}
function Tw(t) {
  return vd ? process.env[t] : globalThis[t]?.toString();
}
function Zs(t, e) {
  return t !== void 0 && t !== e;
}
function Mw(t) {
  return typeof t > "u"
    ? "undefined"
    : t === null
    ? "null"
    : typeof t == "string"
    ? t
    : typeof t == "object"
    ? JSON.stringify(t)
    : t.toString();
}
var Ln = Symbol("isPatchedModule");
function Om(t) {
  return globalThis[t] || void 0;
}
function xL(t, e) {
  globalThis[t] = e;
}
function Aw(t) {
  delete globalThis[t];
}
var mo = class {
  constructor(t) {
    (this.symbol = t),
      (this.readyState = "INACTIVE"),
      (this.emitter = new fo()),
      (this.subscriptions = []),
      (this.logger = new Rm(t.description)),
      this.emitter.setMaxListeners(0),
      this.logger.info("constructing the interceptor...");
  }
  checkEnvironment() {
    return !0;
  }
  apply() {
    let t = this.logger.extend("apply");
    if (
      (t.info("applying the interceptor..."), this.readyState === "APPLIED")
    ) {
      t.info("intercepted already applied!");
      return;
    }
    if (!this.checkEnvironment()) {
      t.info("the interceptor cannot be applied in this environment!");
      return;
    }
    this.readyState = "APPLYING";
    let i = this.getInstance();
    if (i) {
      t.info("found a running instance, reusing..."),
        (this.on = (n, r) => (
          t.info('proxying the "%s" listener', n),
          i.emitter.addListener(n, r),
          this.subscriptions.push(() => {
            i.emitter.removeListener(n, r),
              t.info('removed proxied "%s" listener!', n);
          }),
          this
        )),
        (this.readyState = "APPLIED");
      return;
    }
    t.info("no running instance found, setting up a new instance..."),
      this.setup(),
      this.setInstance(),
      (this.readyState = "APPLIED");
  }
  setup() {}
  on(t, e) {
    let i = this.logger.extend("on");
    return this.readyState === "DISPOSING" || this.readyState === "DISPOSED"
      ? (i.info("cannot listen to events, already disposed!"), this)
      : (i.info('adding "%s" event listener:', t, e),
        this.emitter.on(t, e),
        this);
  }
  once(t, e) {
    return this.emitter.once(t, e), this;
  }
  off(t, e) {
    return this.emitter.off(t, e), this;
  }
  removeAllListeners(t) {
    return this.emitter.removeAllListeners(t), this;
  }
  dispose() {
    let t = this.logger.extend("dispose");
    if (this.readyState === "DISPOSED") {
      t.info("cannot dispose, already disposed!");
      return;
    }
    if (
      (t.info("disposing the interceptor..."),
      (this.readyState = "DISPOSING"),
      !this.getInstance())
    ) {
      t.info("no interceptors running, skipping dispose...");
      return;
    }
    if (
      (this.clearInstance(),
      t.info("global symbol deleted:", Om(this.symbol)),
      this.subscriptions.length > 0)
    ) {
      t.info("disposing of %d subscriptions...", this.subscriptions.length);
      for (let e of this.subscriptions) e();
      (this.subscriptions = []),
        t.info("disposed of all subscriptions!", this.subscriptions.length);
    }
    this.emitter.removeAllListeners(),
      t.info("destroyed the listener!"),
      (this.readyState = "DISPOSED");
  }
  getInstance() {
    var t;
    let e = Om(this.symbol);
    return (
      this.logger.info(
        "retrieved global instance:",
        (t = e?.constructor) == null ? void 0 : t.name
      ),
      e
    );
  }
  setInstance() {
    xL(this.symbol, this),
      this.logger.info("set global instance!", this.symbol.description);
  }
  clearInstance() {
    Aw(this.symbol),
      this.logger.info("cleared global instance!", this.symbol.description);
  }
};
var yd = class extends mo {
  constructor(t) {
    (yd.symbol = Symbol(t.name)),
      super(yd.symbol),
      (this.interceptors = t.interceptors);
  }
  setup() {
    let t = this.logger.extend("setup");
    t.info("applying all %d interceptors...", this.interceptors.length);
    for (let e of this.interceptors)
      t.info('applying "%s" interceptor...', e.constructor.name),
        e.apply(),
        t.info("adding interceptor dispose subscription"),
        this.subscriptions.push(() => e.dispose());
  }
  on(t, e) {
    for (let i of this.interceptors) i.on(t, e);
    return this;
  }
  once(t, e) {
    for (let i of this.interceptors) i.once(t, e);
    return this;
  }
  off(t, e) {
    for (let i of this.interceptors) i.off(t, e);
    return this;
  }
  removeAllListeners(t) {
    for (let e of this.interceptors) e.removeAllListeners(t);
    return this;
  }
};
function Rw(t, e = !0) {
  return [e && t.origin, t.pathname].filter(Boolean).join("");
}
var wL = /[\?|#].*$/g;
function Ow(t) {
  return new URL(`/${t}`, "http://localhost").searchParams;
}
function _d(t) {
  return t.replace(wL, "");
}
function kw(t) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(t);
}
function Nw(t, e) {
  if (kw(t) || t.startsWith("*")) return t;
  let i = e || (typeof document < "u" && document.baseURI);
  return i ? decodeURI(new URL(encodeURI(t), i).href) : t;
}
function Pw(t, e) {
  if (t instanceof RegExp) return t;
  let i = Nw(t, e);
  return _d(i);
}
function EL(t) {
  return t
    .replace(/([:a-zA-Z_-]*)(\*{1,2})+/g, (e, i, n) => {
      let r = "(.*)";
      return i ? (i.startsWith(":") ? `${i}${n}` : `${i}${r}`) : r;
    })
    .replace(/([^\/])(:)(?=\d+)/, "$1\\$2")
    .replace(/^([^\/]+)(:)(?=\/\/)/, "$1\\$2");
}
function xd(t, e, i) {
  let n = Pw(e, i),
    r = typeof n == "string" ? EL(n) : n,
    o = Rw(t),
    s = Cw(r, { decode: decodeURIComponent })(o),
    a = (s && s.params) || {};
  return { matches: s !== !1, params: a };
}
function jn(t) {
  if (typeof location > "u") return t.url;
  let e = new URL(t.url);
  return e.origin === location.origin ? e.pathname : e.origin + e.pathname;
}
var CL = Object.create,
  Fw = Object.defineProperty,
  DL = Object.getOwnPropertyDescriptor,
  Lw = Object.getOwnPropertyNames,
  IL = Object.getPrototypeOf,
  SL = Object.prototype.hasOwnProperty,
  TL = (t, e) =>
    function () {
      return e || (0, t[Lw(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  ML = (t, e, i, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let r of Lw(e))
        !SL.call(t, r) &&
          r !== i &&
          Fw(t, r, {
            get: () => e[r],
            enumerable: !(n = DL(e, r)) || n.enumerable,
          });
    return t;
  },
  AL = (t, e, i) => (
    (i = t != null ? CL(IL(t)) : {}),
    ML(
      e || !t || !t.__esModule
        ? Fw(i, "default", { value: t, enumerable: !0 })
        : i,
      t
    )
  ),
  RL = TL({
    "node_modules/cookie/index.js"(t) {
      "use strict";
      (t.parse = n), (t.serialize = r);
      var e = Object.prototype.toString,
        i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
      function n(c, d) {
        if (typeof c != "string")
          throw new TypeError("argument str must be a string");
        for (
          var u = {}, f = d || {}, h = f.decode || o, p = 0;
          p < c.length;

        ) {
          var m = c.indexOf("=", p);
          if (m === -1) break;
          var g = c.indexOf(";", p);
          if (g === -1) g = c.length;
          else if (g < m) {
            p = c.lastIndexOf(";", m - 1) + 1;
            continue;
          }
          var b = c.slice(p, m).trim();
          if (u[b] === void 0) {
            var x = c.slice(m + 1, g).trim();
            x.charCodeAt(0) === 34 && (x = x.slice(1, -1)), (u[b] = l(x, h));
          }
          p = g + 1;
        }
        return u;
      }
      function r(c, d, u) {
        var f = u || {},
          h = f.encode || s;
        if (typeof h != "function")
          throw new TypeError("option encode is invalid");
        if (!i.test(c)) throw new TypeError("argument name is invalid");
        var p = h(d);
        if (p && !i.test(p)) throw new TypeError("argument val is invalid");
        var m = c + "=" + p;
        if (f.maxAge != null) {
          var g = f.maxAge - 0;
          if (isNaN(g) || !isFinite(g))
            throw new TypeError("option maxAge is invalid");
          m += "; Max-Age=" + Math.floor(g);
        }
        if (f.domain) {
          if (!i.test(f.domain))
            throw new TypeError("option domain is invalid");
          m += "; Domain=" + f.domain;
        }
        if (f.path) {
          if (!i.test(f.path)) throw new TypeError("option path is invalid");
          m += "; Path=" + f.path;
        }
        if (f.expires) {
          var b = f.expires;
          if (!a(b) || isNaN(b.valueOf()))
            throw new TypeError("option expires is invalid");
          m += "; Expires=" + b.toUTCString();
        }
        if (
          (f.httpOnly && (m += "; HttpOnly"),
          f.secure && (m += "; Secure"),
          f.priority)
        ) {
          var x =
            typeof f.priority == "string"
              ? f.priority.toLowerCase()
              : f.priority;
          switch (x) {
            case "low":
              m += "; Priority=Low";
              break;
            case "medium":
              m += "; Priority=Medium";
              break;
            case "high":
              m += "; Priority=High";
              break;
            default:
              throw new TypeError("option priority is invalid");
          }
        }
        if (f.sameSite) {
          var P =
            typeof f.sameSite == "string"
              ? f.sameSite.toLowerCase()
              : f.sameSite;
          switch (P) {
            case !0:
              m += "; SameSite=Strict";
              break;
            case "lax":
              m += "; SameSite=Lax";
              break;
            case "strict":
              m += "; SameSite=Strict";
              break;
            case "none":
              m += "; SameSite=None";
              break;
            default:
              throw new TypeError("option sameSite is invalid");
          }
        }
        return m;
      }
      function o(c) {
        return c.indexOf("%") !== -1 ? decodeURIComponent(c) : c;
      }
      function s(c) {
        return encodeURIComponent(c);
      }
      function a(c) {
        return e.call(c) === "[object Date]" || c instanceof Date;
      }
      function l(c, d) {
        try {
          return d(c);
        } catch {
          return c;
        }
      }
    },
  }),
  OL = AL(RL(), 1),
  wd = OL.default;
var kL = Object.create,
  Uw = Object.defineProperty,
  NL = Object.getOwnPropertyDescriptor,
  Hw = Object.getOwnPropertyNames,
  PL = Object.getPrototypeOf,
  FL = Object.prototype.hasOwnProperty,
  LL = (t, e) =>
    function () {
      return e || (0, t[Hw(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  jL = (t, e, i, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let r of Hw(e))
        !FL.call(t, r) &&
          r !== i &&
          Uw(t, r, {
            get: () => e[r],
            enumerable: !(n = NL(e, r)) || n.enumerable,
          });
    return t;
  },
  VL = (t, e, i) => (
    (i = t != null ? kL(PL(t)) : {}),
    jL(
      e || !t || !t.__esModule
        ? Uw(i, "default", { value: t, enumerable: !0 })
        : i,
      t
    )
  ),
  BL = LL({
    "node_modules/set-cookie-parser/lib/set-cookie.js"(t, e) {
      "use strict";
      var i = { decodeValues: !0, map: !1, silent: !1 };
      function n(l) {
        return typeof l == "string" && !!l.trim();
      }
      function r(l, c) {
        var d = l.split(";").filter(n),
          u = d.shift(),
          f = o(u),
          h = f.name,
          p = f.value;
        c = c ? Object.assign({}, i, c) : i;
        try {
          p = c.decodeValues ? decodeURIComponent(p) : p;
        } catch (g) {
          console.error(
            "set-cookie-parser encountered an error while decoding a cookie with value '" +
              p +
              "'. Set options.decodeValues to false to disable this feature.",
            g
          );
        }
        var m = { name: h, value: p };
        return (
          d.forEach(function (g) {
            var b = g.split("="),
              x = b.shift().trimLeft().toLowerCase(),
              P = b.join("=");
            x === "expires"
              ? (m.expires = new Date(P))
              : x === "max-age"
              ? (m.maxAge = parseInt(P, 10))
              : x === "secure"
              ? (m.secure = !0)
              : x === "httponly"
              ? (m.httpOnly = !0)
              : x === "samesite"
              ? (m.sameSite = P)
              : (m[x] = P);
          }),
          m
        );
      }
      function o(l) {
        var c = "",
          d = "",
          u = l.split("=");
        return (
          u.length > 1 ? ((c = u.shift()), (d = u.join("="))) : (d = l),
          { name: c, value: d }
        );
      }
      function s(l, c) {
        if (((c = c ? Object.assign({}, i, c) : i), !l)) return c.map ? {} : [];
        if (l.headers)
          if (typeof l.headers.getSetCookie == "function")
            l = l.headers.getSetCookie();
          else if (l.headers["set-cookie"]) l = l.headers["set-cookie"];
          else {
            var d =
              l.headers[
                Object.keys(l.headers).find(function (f) {
                  return f.toLowerCase() === "set-cookie";
                })
              ];
            !d &&
              l.headers.cookie &&
              !c.silent &&
              console.warn(
                "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
              ),
              (l = d);
          }
        if (
          (Array.isArray(l) || (l = [l]),
          (c = c ? Object.assign({}, i, c) : i),
          c.map)
        ) {
          var u = {};
          return l.filter(n).reduce(function (f, h) {
            var p = r(h, c);
            return (f[p.name] = p), f;
          }, u);
        } else
          return l.filter(n).map(function (f) {
            return r(f, c);
          });
      }
      function a(l) {
        if (Array.isArray(l)) return l;
        if (typeof l != "string") return [];
        var c = [],
          d = 0,
          u,
          f,
          h,
          p,
          m;
        function g() {
          for (; d < l.length && /\s/.test(l.charAt(d)); ) d += 1;
          return d < l.length;
        }
        function b() {
          return (f = l.charAt(d)), f !== "=" && f !== ";" && f !== ",";
        }
        for (; d < l.length; ) {
          for (u = d, m = !1; g(); )
            if (((f = l.charAt(d)), f === ",")) {
              for (h = d, d += 1, g(), p = d; d < l.length && b(); ) d += 1;
              d < l.length && l.charAt(d) === "="
                ? ((m = !0), (d = p), c.push(l.substring(u, h)), (u = d))
                : (d = h + 1);
            } else d += 1;
          (!m || d >= l.length) && c.push(l.substring(u, l.length));
        }
        return c;
      }
      (e.exports = s),
        (e.exports.parse = s),
        (e.exports.parseString = r),
        (e.exports.splitCookiesString = a);
    },
  }),
  jw = VL(BL()),
  go = "MSW_COOKIE_STORE";
function Vw() {
  try {
    if (localStorage == null) return !1;
    let t = go + "_test";
    return (
      localStorage.setItem(t, "test"),
      localStorage.getItem(t),
      localStorage.removeItem(t),
      !0
    );
  } catch {
    return !1;
  }
}
function Bw(t, e) {
  try {
    return t[e], !0;
  } catch {
    return !1;
  }
}
var UL = class {
    constructor() {
      this.store = new Map();
    }
    add(t, e) {
      if (Bw(t, "credentials") && t.credentials === "omit") return;
      let i = new URL(t.url),
        n = e.headers.get("set-cookie");
      if (!n) return;
      let r = Date.now(),
        o = (0, jw.parse)(n).map((c) => {
          var d = c,
            { maxAge: a } = d,
            l = sa(d, ["maxAge"]);
          return ae(C({}, l), {
            expires: a === void 0 ? l.expires : new Date(r + a * 1e3),
            maxAge: a,
          });
        }),
        s = this.store.get(i.origin) || new Map();
      o.forEach((a) => {
        this.store.set(i.origin, s.set(a.name, a));
      });
    }
    get(t) {
      this.deleteExpiredCookies();
      let e = new URL(t.url),
        i = this.store.get(e.origin) || new Map();
      if (!Bw(t, "credentials")) return i;
      switch (t.credentials) {
        case "include":
          return (
            typeof document > "u" ||
              (0, jw.parse)(document.cookie).forEach((r) => {
                i.set(r.name, r);
              }),
            i
          );
        case "same-origin":
          return i;
        default:
          return new Map();
      }
    }
    getAll() {
      return this.deleteExpiredCookies(), this.store;
    }
    deleteAll(t) {
      let e = new URL(t.url);
      this.store.delete(e.origin);
    }
    clear() {
      this.store.clear();
    }
    hydrate() {
      if (!Vw()) return;
      let t = localStorage.getItem(go);
      if (t)
        try {
          JSON.parse(t).forEach(([i, n]) => {
            this.store.set(
              i,
              new Map(
                n.map((a) => {
                  var [r, l] = a,
                    c = l,
                    { expires: o } = c,
                    s = sa(c, ["expires"]);
                  return [
                    r,
                    o === void 0 ? s : ae(C({}, s), { expires: new Date(o) }),
                  ];
                })
              )
            );
          });
        } catch (e) {
          console.warn(`
[virtual-cookie] Failed to parse a stored cookie from the localStorage (key "${go}").

Stored value:
${localStorage.getItem(go)}

Thrown exception:
${e}

Invalid value has been removed from localStorage to prevent subsequent failed parsing attempts.`),
            localStorage.removeItem(go);
        }
    }
    persist() {
      if (!Vw()) return;
      let t = Array.from(this.store.entries()).map(([e, i]) => [
        e,
        Array.from(i.entries()),
      ]);
      localStorage.setItem(go, JSON.stringify(t));
    }
    deleteExpiredCookies() {
      let t = Date.now();
      this.store.forEach((e, i) => {
        e.forEach(({ expires: n, name: r }) => {
          n !== void 0 && n.getTime() <= t && e.delete(r);
        }),
          e.size === 0 && this.store.delete(i);
      });
    }
  },
  bo = new UL();
var HL = Object.defineProperty,
  $w = Object.getOwnPropertySymbols,
  $L = Object.prototype.hasOwnProperty,
  zL = Object.prototype.propertyIsEnumerable,
  zw = (t, e, i) =>
    e in t
      ? HL(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  Ed = (t, e) => {
    for (var i in e || (e = {})) $L.call(e, i) && zw(t, i, e[i]);
    if ($w) for (var i of $w(e)) zL.call(e, i) && zw(t, i, e[i]);
    return t;
  };
function qw() {
  return wd.parse(document.cookie);
}
function qL(t) {
  if (typeof document > "u" || typeof location > "u") return {};
  switch (t.credentials) {
    case "same-origin": {
      let e = new URL(t.url);
      return location.origin === e.origin ? qw() : {};
    }
    case "include":
      return qw();
    default:
      return {};
  }
}
function Cd(t) {
  var e;
  let i = t.headers.get("cookie"),
    n = i ? wd.parse(i) : {};
  bo.hydrate();
  let r = Array.from((e = bo.get(t)) == null ? void 0 : e.entries()).reduce(
      (a, [l, { value: c }]) => Object.assign(a, { [l.trim()]: c }),
      {}
    ),
    o = qL(t),
    s = Ed(Ed({}, o), r);
  for (let [a, l] of Object.entries(s))
    t.headers.append("cookie", wd.serialize(a, l));
  return Ed(Ed({}, s), n);
}
var Ww = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  _n = ((t) => (
    (t.HEAD = "HEAD"),
    (t.GET = "GET"),
    (t.POST = "POST"),
    (t.PUT = "PUT"),
    (t.PATCH = "PATCH"),
    (t.OPTIONS = "OPTIONS"),
    (t.DELETE = "DELETE"),
    t
  ))(_n || {}),
  sr = class extends ho {
    constructor(e, i, n, r) {
      super({
        info: { header: `${e} ${i}`, path: i, method: e },
        resolver: n,
        options: r,
      }),
        this.checkRedundantQueryParameters();
    }
    checkRedundantQueryParameters() {
      let { method: e, path: i } = this.info;
      if (i instanceof RegExp || _d(i) === i) return;
      let r = Ow(i),
        o = [];
      r.forEach((s, a) => {
        o.push(a);
      }),
        ee.warn(
          `Found a redundant usage of query parameters in the request handler URL for "${e} ${i}". Please match against a path instead and access query parameters in the response resolver function using "req.url.searchParams".`
        );
    }
    parse(e) {
      return Ww(this, null, function* () {
        var i;
        let n = new URL(e.request.url),
          r = xd(
            n,
            this.info.path,
            (i = e.resolutionContext) == null ? void 0 : i.baseUrl
          ),
          o = Cd(e.request);
        return { match: r, cookies: o };
      });
    }
    predicate(e) {
      let i = this.matchMethod(e.request.method),
        n = e.parsedResult.match.matches;
      return i && n;
    }
    matchMethod(e) {
      return this.info.method instanceof RegExp
        ? this.info.method.test(e)
        : fd(this.info.method, e);
    }
    extendResolverArgs(e) {
      var i;
      return {
        params: ((i = e.parsedResult.match) == null ? void 0 : i.params) || {},
        cookies: e.parsedResult.cookies,
      };
    }
    log(e) {
      return Ww(this, null, function* () {
        let i = jn(e.request),
          n = yield md(e.request),
          r = yield bd(e.response),
          o = hd(r.status);
        console.groupCollapsed(
          ee.formatMessage(
            `${pd()} ${e.request.method} ${i} (%c${r.status} ${r.statusText}%c)`
          ),
          `color:${o}`,
          "color:inherit"
        ),
          console.log("Request", n),
          console.log("Handler:", this),
          console.log("Response", r),
          console.groupEnd();
      });
    }
  };
function fi(t) {
  return (e, i, n = {}) => new sr(t, e, i, n);
}
var Dd = {
  all: fi(/.+/),
  head: fi(_n.HEAD),
  get: fi(_n.GET),
  post: fi(_n.POST),
  put: fi(_n.PUT),
  delete: fi(_n.DELETE),
  patch: fi(_n.PATCH),
  options: fi(_n.OPTIONS),
};
function Id(t, e) {
  if (!!!t) throw new Error(e);
}
function Gw(t) {
  return typeof t == "object" && t !== null;
}
function Yw(t, e) {
  if (!!!t) throw new Error(e ?? "Unexpected invariant triggered.");
}
var WL = /\r\n|[\n\r]/g;
function vo(t, e) {
  let i = 0,
    n = 1;
  for (let r of t.body.matchAll(WL)) {
    if ((typeof r.index == "number" || Yw(!1), r.index >= e)) break;
    (i = r.index + r[0].length), (n += 1);
  }
  return { line: n, column: e + 1 - i };
}
function km(t) {
  return Sd(t.source, vo(t.source, t.start));
}
function Sd(t, e) {
  let i = t.locationOffset.column - 1,
    n = "".padStart(i) + t.body,
    r = e.line - 1,
    o = t.locationOffset.line - 1,
    s = e.line + o,
    a = e.line === 1 ? i : 0,
    l = e.column + a,
    c = `${t.name}:${s}:${l}
`,
    d = n.split(/\r\n|[\n\r]/g),
    u = d[r];
  if (u.length > 120) {
    let f = Math.floor(l / 80),
      h = l % 80,
      p = [];
    for (let m = 0; m < u.length; m += 80) p.push(u.slice(m, m + 80));
    return (
      c +
      Qw([
        [`${s} |`, p[0]],
        ...p.slice(1, f + 1).map((m) => ["|", m]),
        ["|", "^".padStart(h)],
        ["|", p[f + 1]],
      ])
    );
  }
  return (
    c +
    Qw([
      [`${s - 1} |`, d[r - 1]],
      [`${s} |`, u],
      ["|", "^".padStart(l)],
      [`${s + 1} |`, d[r + 1]],
    ])
  );
}
function Qw(t) {
  let e = t.filter(([n, r]) => r !== void 0),
    i = Math.max(...e.map(([n]) => n.length));
  return e.map(([n, r]) => n.padStart(i) + (r ? " " + r : "")).join(`
`);
}
function GL(t) {
  let e = t[0];
  return e == null || "kind" in e || "length" in e
    ? {
        nodes: e,
        source: t[1],
        positions: t[2],
        path: t[3],
        originalError: t[4],
        extensions: t[5],
      }
    : e;
}
var Td = class t extends Error {
  constructor(e, ...i) {
    var n, r, o;
    let {
      nodes: s,
      source: a,
      positions: l,
      path: c,
      originalError: d,
      extensions: u,
    } = GL(i);
    super(e),
      (this.name = "GraphQLError"),
      (this.path = c ?? void 0),
      (this.originalError = d ?? void 0),
      (this.nodes = Zw(Array.isArray(s) ? s : s ? [s] : void 0));
    let f = Zw(
      (n = this.nodes) === null || n === void 0
        ? void 0
        : n.map((p) => p.loc).filter((p) => p != null)
    );
    (this.source =
      a ??
      (f == null || (r = f[0]) === null || r === void 0 ? void 0 : r.source)),
      (this.positions = l ?? f?.map((p) => p.start)),
      (this.locations =
        l && a ? l.map((p) => vo(a, p)) : f?.map((p) => vo(p.source, p.start)));
    let h = Gw(d?.extensions) ? d?.extensions : void 0;
    (this.extensions =
      (o = u ?? h) !== null && o !== void 0 ? o : Object.create(null)),
      Object.defineProperties(this, {
        message: { writable: !0, enumerable: !0 },
        name: { enumerable: !1 },
        nodes: { enumerable: !1 },
        source: { enumerable: !1 },
        positions: { enumerable: !1 },
        originalError: { enumerable: !1 },
      }),
      d != null && d.stack
        ? Object.defineProperty(this, "stack", {
            value: d.stack,
            writable: !0,
            configurable: !0,
          })
        : Error.captureStackTrace
        ? Error.captureStackTrace(this, t)
        : Object.defineProperty(this, "stack", {
            value: Error().stack,
            writable: !0,
            configurable: !0,
          });
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let e = this.message;
    if (this.nodes)
      for (let i of this.nodes)
        i.loc &&
          (e +=
            `

` + km(i.loc));
    else if (this.source && this.locations)
      for (let i of this.locations)
        e +=
          `

` + Sd(this.source, i);
    return e;
  }
  toJSON() {
    let e = { message: this.message };
    return (
      this.locations != null && (e.locations = this.locations),
      this.path != null && (e.path = this.path),
      this.extensions != null &&
        Object.keys(this.extensions).length > 0 &&
        (e.extensions = this.extensions),
      e
    );
  }
};
function Zw(t) {
  return t === void 0 || t.length === 0 ? void 0 : t;
}
function Ve(t, e, i) {
  return new Td(`Syntax Error: ${i}`, { source: t, positions: [e] });
}
var Ks = class {
    constructor(e, i, n) {
      (this.start = e.start),
        (this.end = i.end),
        (this.startToken = e),
        (this.endToken = i),
        (this.source = n);
    }
    get [Symbol.toStringTag]() {
      return "Location";
    }
    toJSON() {
      return { start: this.start, end: this.end };
    }
  },
  yo = class {
    constructor(e, i, n, r, o, s) {
      (this.kind = e),
        (this.start = i),
        (this.end = n),
        (this.line = r),
        (this.column = o),
        (this.value = s),
        (this.prev = null),
        (this.next = null);
    }
    get [Symbol.toStringTag]() {
      return "Token";
    }
    toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column,
      };
    }
  },
  YL = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet",
    ],
    VariableDefinition: ["variable", "type", "defaultValue", "directives"],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "name",
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet",
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields",
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives",
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields",
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"],
  },
  rY = new Set(Object.keys(YL));
var ar = (function (t) {
  return (
    (t.QUERY = "query"),
    (t.MUTATION = "mutation"),
    (t.SUBSCRIPTION = "subscription"),
    t
  );
})(ar || {});
var Md = (function (t) {
  return (
    (t.QUERY = "QUERY"),
    (t.MUTATION = "MUTATION"),
    (t.SUBSCRIPTION = "SUBSCRIPTION"),
    (t.FIELD = "FIELD"),
    (t.FRAGMENT_DEFINITION = "FRAGMENT_DEFINITION"),
    (t.FRAGMENT_SPREAD = "FRAGMENT_SPREAD"),
    (t.INLINE_FRAGMENT = "INLINE_FRAGMENT"),
    (t.VARIABLE_DEFINITION = "VARIABLE_DEFINITION"),
    (t.SCHEMA = "SCHEMA"),
    (t.SCALAR = "SCALAR"),
    (t.OBJECT = "OBJECT"),
    (t.FIELD_DEFINITION = "FIELD_DEFINITION"),
    (t.ARGUMENT_DEFINITION = "ARGUMENT_DEFINITION"),
    (t.INTERFACE = "INTERFACE"),
    (t.UNION = "UNION"),
    (t.ENUM = "ENUM"),
    (t.ENUM_VALUE = "ENUM_VALUE"),
    (t.INPUT_OBJECT = "INPUT_OBJECT"),
    (t.INPUT_FIELD_DEFINITION = "INPUT_FIELD_DEFINITION"),
    t
  );
})(Md || {});
var V = (function (t) {
  return (
    (t.NAME = "Name"),
    (t.DOCUMENT = "Document"),
    (t.OPERATION_DEFINITION = "OperationDefinition"),
    (t.VARIABLE_DEFINITION = "VariableDefinition"),
    (t.SELECTION_SET = "SelectionSet"),
    (t.FIELD = "Field"),
    (t.ARGUMENT = "Argument"),
    (t.FRAGMENT_SPREAD = "FragmentSpread"),
    (t.INLINE_FRAGMENT = "InlineFragment"),
    (t.FRAGMENT_DEFINITION = "FragmentDefinition"),
    (t.VARIABLE = "Variable"),
    (t.INT = "IntValue"),
    (t.FLOAT = "FloatValue"),
    (t.STRING = "StringValue"),
    (t.BOOLEAN = "BooleanValue"),
    (t.NULL = "NullValue"),
    (t.ENUM = "EnumValue"),
    (t.LIST = "ListValue"),
    (t.OBJECT = "ObjectValue"),
    (t.OBJECT_FIELD = "ObjectField"),
    (t.DIRECTIVE = "Directive"),
    (t.NAMED_TYPE = "NamedType"),
    (t.LIST_TYPE = "ListType"),
    (t.NON_NULL_TYPE = "NonNullType"),
    (t.SCHEMA_DEFINITION = "SchemaDefinition"),
    (t.OPERATION_TYPE_DEFINITION = "OperationTypeDefinition"),
    (t.SCALAR_TYPE_DEFINITION = "ScalarTypeDefinition"),
    (t.OBJECT_TYPE_DEFINITION = "ObjectTypeDefinition"),
    (t.FIELD_DEFINITION = "FieldDefinition"),
    (t.INPUT_VALUE_DEFINITION = "InputValueDefinition"),
    (t.INTERFACE_TYPE_DEFINITION = "InterfaceTypeDefinition"),
    (t.UNION_TYPE_DEFINITION = "UnionTypeDefinition"),
    (t.ENUM_TYPE_DEFINITION = "EnumTypeDefinition"),
    (t.ENUM_VALUE_DEFINITION = "EnumValueDefinition"),
    (t.INPUT_OBJECT_TYPE_DEFINITION = "InputObjectTypeDefinition"),
    (t.DIRECTIVE_DEFINITION = "DirectiveDefinition"),
    (t.SCHEMA_EXTENSION = "SchemaExtension"),
    (t.SCALAR_TYPE_EXTENSION = "ScalarTypeExtension"),
    (t.OBJECT_TYPE_EXTENSION = "ObjectTypeExtension"),
    (t.INTERFACE_TYPE_EXTENSION = "InterfaceTypeExtension"),
    (t.UNION_TYPE_EXTENSION = "UnionTypeExtension"),
    (t.ENUM_TYPE_EXTENSION = "EnumTypeExtension"),
    (t.INPUT_OBJECT_TYPE_EXTENSION = "InputObjectTypeExtension"),
    t
  );
})(V || {});
function Kw(t) {
  return t === 9 || t === 32;
}
function _o(t) {
  return t >= 48 && t <= 57;
}
function Xw(t) {
  return (t >= 97 && t <= 122) || (t >= 65 && t <= 90);
}
function Nm(t) {
  return Xw(t) || t === 95;
}
function Jw(t) {
  return Xw(t) || _o(t) || t === 95;
}
function eE(t) {
  var e;
  let i = Number.MAX_SAFE_INTEGER,
    n = null,
    r = -1;
  for (let s = 0; s < t.length; ++s) {
    var o;
    let a = t[s],
      l = QL(a);
    l !== a.length &&
      ((n = (o = n) !== null && o !== void 0 ? o : s),
      (r = s),
      s !== 0 && l < i && (i = l));
  }
  return t
    .map((s, a) => (a === 0 ? s : s.slice(i)))
    .slice((e = n) !== null && e !== void 0 ? e : 0, r + 1);
}
function QL(t) {
  let e = 0;
  for (; e < t.length && Kw(t.charCodeAt(e)); ) ++e;
  return e;
}
var _ = (function (t) {
  return (
    (t.SOF = "<SOF>"),
    (t.EOF = "<EOF>"),
    (t.BANG = "!"),
    (t.DOLLAR = "$"),
    (t.AMP = "&"),
    (t.PAREN_L = "("),
    (t.PAREN_R = ")"),
    (t.SPREAD = "..."),
    (t.COLON = ":"),
    (t.EQUALS = "="),
    (t.AT = "@"),
    (t.BRACKET_L = "["),
    (t.BRACKET_R = "]"),
    (t.BRACE_L = "{"),
    (t.PIPE = "|"),
    (t.BRACE_R = "}"),
    (t.NAME = "Name"),
    (t.INT = "Int"),
    (t.FLOAT = "Float"),
    (t.STRING = "String"),
    (t.BLOCK_STRING = "BlockString"),
    (t.COMMENT = "Comment"),
    t
  );
})(_ || {});
var Js = class {
  constructor(e) {
    let i = new yo(_.SOF, 0, 0, 0, 0);
    (this.source = e),
      (this.lastToken = i),
      (this.token = i),
      (this.line = 1),
      (this.lineStart = 0);
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  advance() {
    return (this.lastToken = this.token), (this.token = this.lookahead());
  }
  lookahead() {
    let e = this.token;
    if (e.kind !== _.EOF)
      do
        if (e.next) e = e.next;
        else {
          let i = ZL(this, e.end);
          (e.next = i), (i.prev = e), (e = i);
        }
      while (e.kind === _.COMMENT);
    return e;
  }
};
function nE(t) {
  return (
    t === _.BANG ||
    t === _.DOLLAR ||
    t === _.AMP ||
    t === _.PAREN_L ||
    t === _.PAREN_R ||
    t === _.SPREAD ||
    t === _.COLON ||
    t === _.EQUALS ||
    t === _.AT ||
    t === _.BRACKET_L ||
    t === _.BRACKET_R ||
    t === _.BRACE_L ||
    t === _.PIPE ||
    t === _.BRACE_R
  );
}
function xo(t) {
  return (t >= 0 && t <= 55295) || (t >= 57344 && t <= 1114111);
}
function Ad(t, e) {
  return iE(t.charCodeAt(e)) && rE(t.charCodeAt(e + 1));
}
function iE(t) {
  return t >= 55296 && t <= 56319;
}
function rE(t) {
  return t >= 56320 && t <= 57343;
}
function lr(t, e) {
  let i = t.source.body.codePointAt(e);
  if (i === void 0) return _.EOF;
  if (i >= 32 && i <= 126) {
    let n = String.fromCodePoint(i);
    return n === '"' ? `'"'` : `"${n}"`;
  }
  return "U+" + i.toString(16).toUpperCase().padStart(4, "0");
}
function Be(t, e, i, n, r) {
  let o = t.line,
    s = 1 + i - t.lineStart;
  return new yo(e, i, n, o, s, r);
}
function ZL(t, e) {
  let i = t.source.body,
    n = i.length,
    r = e;
  for (; r < n; ) {
    let o = i.charCodeAt(r);
    switch (o) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++r;
        continue;
      case 10:
        ++r, ++t.line, (t.lineStart = r);
        continue;
      case 13:
        i.charCodeAt(r + 1) === 10 ? (r += 2) : ++r,
          ++t.line,
          (t.lineStart = r);
        continue;
      case 35:
        return KL(t, r);
      case 33:
        return Be(t, _.BANG, r, r + 1);
      case 36:
        return Be(t, _.DOLLAR, r, r + 1);
      case 38:
        return Be(t, _.AMP, r, r + 1);
      case 40:
        return Be(t, _.PAREN_L, r, r + 1);
      case 41:
        return Be(t, _.PAREN_R, r, r + 1);
      case 46:
        if (i.charCodeAt(r + 1) === 46 && i.charCodeAt(r + 2) === 46)
          return Be(t, _.SPREAD, r, r + 3);
        break;
      case 58:
        return Be(t, _.COLON, r, r + 1);
      case 61:
        return Be(t, _.EQUALS, r, r + 1);
      case 64:
        return Be(t, _.AT, r, r + 1);
      case 91:
        return Be(t, _.BRACKET_L, r, r + 1);
      case 93:
        return Be(t, _.BRACKET_R, r, r + 1);
      case 123:
        return Be(t, _.BRACE_L, r, r + 1);
      case 124:
        return Be(t, _.PIPE, r, r + 1);
      case 125:
        return Be(t, _.BRACE_R, r, r + 1);
      case 34:
        return i.charCodeAt(r + 1) === 34 && i.charCodeAt(r + 2) === 34
          ? ij(t, r)
          : JL(t, r);
    }
    if (_o(o) || o === 45) return XL(t, r, o);
    if (Nm(o)) return rj(t, r);
    throw Ve(
      t.source,
      r,
      o === 39
        ? `Unexpected single quote character ('), did you mean to use a double quote (")?`
        : xo(o) || Ad(i, r)
        ? `Unexpected character: ${lr(t, r)}.`
        : `Invalid character: ${lr(t, r)}.`
    );
  }
  return Be(t, _.EOF, n, n);
}
function KL(t, e) {
  let i = t.source.body,
    n = i.length,
    r = e + 1;
  for (; r < n; ) {
    let o = i.charCodeAt(r);
    if (o === 10 || o === 13) break;
    if (xo(o)) ++r;
    else if (Ad(i, r)) r += 2;
    else break;
  }
  return Be(t, _.COMMENT, e, r, i.slice(e + 1, r));
}
function XL(t, e, i) {
  let n = t.source.body,
    r = e,
    o = i,
    s = !1;
  if ((o === 45 && (o = n.charCodeAt(++r)), o === 48)) {
    if (((o = n.charCodeAt(++r)), _o(o)))
      throw Ve(
        t.source,
        r,
        `Invalid number, unexpected digit after 0: ${lr(t, r)}.`
      );
  } else (r = Pm(t, r, o)), (o = n.charCodeAt(r));
  if (
    (o === 46 &&
      ((s = !0),
      (o = n.charCodeAt(++r)),
      (r = Pm(t, r, o)),
      (o = n.charCodeAt(r))),
    (o === 69 || o === 101) &&
      ((s = !0),
      (o = n.charCodeAt(++r)),
      (o === 43 || o === 45) && (o = n.charCodeAt(++r)),
      (r = Pm(t, r, o)),
      (o = n.charCodeAt(r))),
    o === 46 || Nm(o))
  )
    throw Ve(
      t.source,
      r,
      `Invalid number, expected digit but got: ${lr(t, r)}.`
    );
  return Be(t, s ? _.FLOAT : _.INT, e, r, n.slice(e, r));
}
function Pm(t, e, i) {
  if (!_o(i))
    throw Ve(
      t.source,
      e,
      `Invalid number, expected digit but got: ${lr(t, e)}.`
    );
  let n = t.source.body,
    r = e + 1;
  for (; _o(n.charCodeAt(r)); ) ++r;
  return r;
}
function JL(t, e) {
  let i = t.source.body,
    n = i.length,
    r = e + 1,
    o = r,
    s = "";
  for (; r < n; ) {
    let a = i.charCodeAt(r);
    if (a === 34) return (s += i.slice(o, r)), Be(t, _.STRING, e, r + 1, s);
    if (a === 92) {
      s += i.slice(o, r);
      let l =
        i.charCodeAt(r + 1) === 117
          ? i.charCodeAt(r + 2) === 123
            ? ej(t, r)
            : tj(t, r)
          : nj(t, r);
      (s += l.value), (r += l.size), (o = r);
      continue;
    }
    if (a === 10 || a === 13) break;
    if (xo(a)) ++r;
    else if (Ad(i, r)) r += 2;
    else throw Ve(t.source, r, `Invalid character within String: ${lr(t, r)}.`);
  }
  throw Ve(t.source, r, "Unterminated string.");
}
function ej(t, e) {
  let i = t.source.body,
    n = 0,
    r = 3;
  for (; r < 12; ) {
    let o = i.charCodeAt(e + r++);
    if (o === 125) {
      if (r < 5 || !xo(n)) break;
      return { value: String.fromCodePoint(n), size: r };
    }
    if (((n = (n << 4) | Xs(o)), n < 0)) break;
  }
  throw Ve(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${i.slice(e, e + r)}".`
  );
}
function tj(t, e) {
  let i = t.source.body,
    n = tE(i, e + 2);
  if (xo(n)) return { value: String.fromCodePoint(n), size: 6 };
  if (iE(n) && i.charCodeAt(e + 6) === 92 && i.charCodeAt(e + 7) === 117) {
    let r = tE(i, e + 8);
    if (rE(r)) return { value: String.fromCodePoint(n, r), size: 12 };
  }
  throw Ve(
    t.source,
    e,
    `Invalid Unicode escape sequence: "${i.slice(e, e + 6)}".`
  );
}
function tE(t, e) {
  return (
    (Xs(t.charCodeAt(e)) << 12) |
    (Xs(t.charCodeAt(e + 1)) << 8) |
    (Xs(t.charCodeAt(e + 2)) << 4) |
    Xs(t.charCodeAt(e + 3))
  );
}
function Xs(t) {
  return t >= 48 && t <= 57
    ? t - 48
    : t >= 65 && t <= 70
    ? t - 55
    : t >= 97 && t <= 102
    ? t - 87
    : -1;
}
function nj(t, e) {
  let i = t.source.body;
  switch (i.charCodeAt(e + 1)) {
    case 34:
      return { value: '"', size: 2 };
    case 92:
      return { value: "\\", size: 2 };
    case 47:
      return { value: "/", size: 2 };
    case 98:
      return { value: "\b", size: 2 };
    case 102:
      return { value: "\f", size: 2 };
    case 110:
      return {
        value: `
`,
        size: 2,
      };
    case 114:
      return { value: "\r", size: 2 };
    case 116:
      return { value: "	", size: 2 };
  }
  throw Ve(
    t.source,
    e,
    `Invalid character escape sequence: "${i.slice(e, e + 2)}".`
  );
}
function ij(t, e) {
  let i = t.source.body,
    n = i.length,
    r = t.lineStart,
    o = e + 3,
    s = o,
    a = "",
    l = [];
  for (; o < n; ) {
    let c = i.charCodeAt(o);
    if (c === 34 && i.charCodeAt(o + 1) === 34 && i.charCodeAt(o + 2) === 34) {
      (a += i.slice(s, o)), l.push(a);
      let d = Be(
        t,
        _.BLOCK_STRING,
        e,
        o + 3,
        eE(l).join(`
`)
      );
      return (t.line += l.length - 1), (t.lineStart = r), d;
    }
    if (
      c === 92 &&
      i.charCodeAt(o + 1) === 34 &&
      i.charCodeAt(o + 2) === 34 &&
      i.charCodeAt(o + 3) === 34
    ) {
      (a += i.slice(s, o)), (s = o + 1), (o += 4);
      continue;
    }
    if (c === 10 || c === 13) {
      (a += i.slice(s, o)),
        l.push(a),
        c === 13 && i.charCodeAt(o + 1) === 10 ? (o += 2) : ++o,
        (a = ""),
        (s = o),
        (r = o);
      continue;
    }
    if (xo(c)) ++o;
    else if (Ad(i, o)) o += 2;
    else throw Ve(t.source, o, `Invalid character within String: ${lr(t, o)}.`);
  }
  throw Ve(t.source, o, "Unterminated string.");
}
function rj(t, e) {
  let i = t.source.body,
    n = i.length,
    r = e + 1;
  for (; r < n; ) {
    let o = i.charCodeAt(r);
    if (Jw(o)) ++r;
    else break;
  }
  return Be(t, _.NAME, e, r, i.slice(e, r));
}
function Rd(t) {
  return Od(t, []);
}
function Od(t, e) {
  switch (typeof t) {
    case "string":
      return JSON.stringify(t);
    case "function":
      return t.name ? `[function ${t.name}]` : "[function]";
    case "object":
      return oj(t, e);
    default:
      return String(t);
  }
}
function oj(t, e) {
  if (t === null) return "null";
  if (e.includes(t)) return "[Circular]";
  let i = [...e, t];
  if (sj(t)) {
    let n = t.toJSON();
    if (n !== t) return typeof n == "string" ? n : Od(n, i);
  } else if (Array.isArray(t)) return lj(t, i);
  return aj(t, i);
}
function sj(t) {
  return typeof t.toJSON == "function";
}
function aj(t, e) {
  let i = Object.entries(t);
  return i.length === 0
    ? "{}"
    : e.length > 2
    ? "[" + cj(t) + "]"
    : "{ " + i.map(([r, o]) => r + ": " + Od(o, e)).join(", ") + " }";
}
function lj(t, e) {
  if (t.length === 0) return "[]";
  if (e.length > 2) return "[Array]";
  let i = Math.min(10, t.length),
    n = t.length - i,
    r = [];
  for (let o = 0; o < i; ++o) r.push(Od(t[o], e));
  return (
    n === 1
      ? r.push("... 1 more item")
      : n > 1 && r.push(`... ${n} more items`),
    "[" + r.join(", ") + "]"
  );
}
function cj(t) {
  let e = Object.prototype.toString
    .call(t)
    .replace(/^\[object /, "")
    .replace(/]$/, "");
  if (e === "Object" && typeof t.constructor == "function") {
    let i = t.constructor.name;
    if (typeof i == "string" && i !== "") return i;
  }
  return e;
}
var oE =
  globalThis.process && globalThis.process.env.NODE_ENV === "production"
    ? function (e, i) {
        return e instanceof i;
      }
    : function (e, i) {
        if (e instanceof i) return !0;
        if (typeof e == "object" && e !== null) {
          var n;
          let r = i.prototype[Symbol.toStringTag],
            o =
              Symbol.toStringTag in e
                ? e[Symbol.toStringTag]
                : (n = e.constructor) === null || n === void 0
                ? void 0
                : n.name;
          if (r === o) {
            let s = Rd(e);
            throw new Error(`Cannot use ${r} "${s}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
          }
        }
        return !1;
      };
var wo = class {
  constructor(e, i = "GraphQL request", n = { line: 1, column: 1 }) {
    typeof e == "string" ||
      Id(!1, `Body must be a string. Received: ${Rd(e)}.`),
      (this.body = e),
      (this.name = i),
      (this.locationOffset = n),
      this.locationOffset.line > 0 ||
        Id(!1, "line in locationOffset is 1-indexed and must be positive."),
      this.locationOffset.column > 0 ||
        Id(!1, "column in locationOffset is 1-indexed and must be positive.");
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
};
function sE(t) {
  return oE(t, wo);
}
function Nd(t, e) {
  return new Fm(t, e).parseDocument();
}
var Fm = class {
  constructor(e, i = {}) {
    let n = sE(e) ? e : new wo(e);
    (this._lexer = new Js(n)), (this._options = i), (this._tokenCounter = 0);
  }
  parseName() {
    let e = this.expectToken(_.NAME);
    return this.node(e, { kind: V.NAME, value: e.value });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: V.DOCUMENT,
      definitions: this.many(_.SOF, this.parseDefinition, _.EOF),
    });
  }
  parseDefinition() {
    if (this.peek(_.BRACE_L)) return this.parseOperationDefinition();
    let e = this.peekDescription(),
      i = e ? this._lexer.lookahead() : this._lexer.token;
    if (i.kind === _.NAME) {
      switch (i.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (e)
        throw Ve(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      switch (i.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(i);
  }
  parseOperationDefinition() {
    let e = this._lexer.token;
    if (this.peek(_.BRACE_L))
      return this.node(e, {
        kind: V.OPERATION_DEFINITION,
        operation: ar.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet(),
      });
    let i = this.parseOperationType(),
      n;
    return (
      this.peek(_.NAME) && (n = this.parseName()),
      this.node(e, {
        kind: V.OPERATION_DEFINITION,
        operation: i,
        name: n,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(!1),
        selectionSet: this.parseSelectionSet(),
      })
    );
  }
  parseOperationType() {
    let e = this.expectToken(_.NAME);
    switch (e.value) {
      case "query":
        return ar.QUERY;
      case "mutation":
        return ar.MUTATION;
      case "subscription":
        return ar.SUBSCRIPTION;
    }
    throw this.unexpected(e);
  }
  parseVariableDefinitions() {
    return this.optionalMany(
      _.PAREN_L,
      this.parseVariableDefinition,
      _.PAREN_R
    );
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: V.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(_.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(_.EQUALS)
        ? this.parseConstValueLiteral()
        : void 0,
      directives: this.parseConstDirectives(),
    });
  }
  parseVariable() {
    let e = this._lexer.token;
    return (
      this.expectToken(_.DOLLAR),
      this.node(e, { kind: V.VARIABLE, name: this.parseName() })
    );
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: V.SELECTION_SET,
      selections: this.many(_.BRACE_L, this.parseSelection, _.BRACE_R),
    });
  }
  parseSelection() {
    return this.peek(_.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    let e = this._lexer.token,
      i = this.parseName(),
      n,
      r;
    return (
      this.expectOptionalToken(_.COLON)
        ? ((n = i), (r = this.parseName()))
        : (r = i),
      this.node(e, {
        kind: V.FIELD,
        alias: n,
        name: r,
        arguments: this.parseArguments(!1),
        directives: this.parseDirectives(!1),
        selectionSet: this.peek(_.BRACE_L) ? this.parseSelectionSet() : void 0,
      })
    );
  }
  parseArguments(e) {
    let i = e ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(_.PAREN_L, i, _.PAREN_R);
  }
  parseArgument(e = !1) {
    let i = this._lexer.token,
      n = this.parseName();
    return (
      this.expectToken(_.COLON),
      this.node(i, {
        kind: V.ARGUMENT,
        name: n,
        value: this.parseValueLiteral(e),
      })
    );
  }
  parseConstArgument() {
    return this.parseArgument(!0);
  }
  parseFragment() {
    let e = this._lexer.token;
    this.expectToken(_.SPREAD);
    let i = this.expectOptionalKeyword("on");
    return !i && this.peek(_.NAME)
      ? this.node(e, {
          kind: V.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(!1),
        })
      : this.node(e, {
          kind: V.INLINE_FRAGMENT,
          typeCondition: i ? this.parseNamedType() : void 0,
          directives: this.parseDirectives(!1),
          selectionSet: this.parseSelectionSet(),
        });
  }
  parseFragmentDefinition() {
    let e = this._lexer.token;
    return (
      this.expectKeyword("fragment"),
      this._options.allowLegacyFragmentVariables === !0
        ? this.node(e, {
            kind: V.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            variableDefinitions: this.parseVariableDefinitions(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet(),
          })
        : this.node(e, {
            kind: V.FRAGMENT_DEFINITION,
            name: this.parseFragmentName(),
            typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
            directives: this.parseDirectives(!1),
            selectionSet: this.parseSelectionSet(),
          })
    );
  }
  parseFragmentName() {
    if (this._lexer.token.value === "on") throw this.unexpected();
    return this.parseName();
  }
  parseValueLiteral(e) {
    let i = this._lexer.token;
    switch (i.kind) {
      case _.BRACKET_L:
        return this.parseList(e);
      case _.BRACE_L:
        return this.parseObject(e);
      case _.INT:
        return (
          this.advanceLexer(), this.node(i, { kind: V.INT, value: i.value })
        );
      case _.FLOAT:
        return (
          this.advanceLexer(), this.node(i, { kind: V.FLOAT, value: i.value })
        );
      case _.STRING:
      case _.BLOCK_STRING:
        return this.parseStringLiteral();
      case _.NAME:
        switch ((this.advanceLexer(), i.value)) {
          case "true":
            return this.node(i, { kind: V.BOOLEAN, value: !0 });
          case "false":
            return this.node(i, { kind: V.BOOLEAN, value: !1 });
          case "null":
            return this.node(i, { kind: V.NULL });
          default:
            return this.node(i, { kind: V.ENUM, value: i.value });
        }
      case _.DOLLAR:
        if (e)
          if ((this.expectToken(_.DOLLAR), this._lexer.token.kind === _.NAME)) {
            let n = this._lexer.token.value;
            throw Ve(
              this._lexer.source,
              i.start,
              `Unexpected variable "$${n}" in constant value.`
            );
          } else throw this.unexpected(i);
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(!0);
  }
  parseStringLiteral() {
    let e = this._lexer.token;
    return (
      this.advanceLexer(),
      this.node(e, {
        kind: V.STRING,
        value: e.value,
        block: e.kind === _.BLOCK_STRING,
      })
    );
  }
  parseList(e) {
    let i = () => this.parseValueLiteral(e);
    return this.node(this._lexer.token, {
      kind: V.LIST,
      values: this.any(_.BRACKET_L, i, _.BRACKET_R),
    });
  }
  parseObject(e) {
    let i = () => this.parseObjectField(e);
    return this.node(this._lexer.token, {
      kind: V.OBJECT,
      fields: this.any(_.BRACE_L, i, _.BRACE_R),
    });
  }
  parseObjectField(e) {
    let i = this._lexer.token,
      n = this.parseName();
    return (
      this.expectToken(_.COLON),
      this.node(i, {
        kind: V.OBJECT_FIELD,
        name: n,
        value: this.parseValueLiteral(e),
      })
    );
  }
  parseDirectives(e) {
    let i = [];
    for (; this.peek(_.AT); ) i.push(this.parseDirective(e));
    return i;
  }
  parseConstDirectives() {
    return this.parseDirectives(!0);
  }
  parseDirective(e) {
    let i = this._lexer.token;
    return (
      this.expectToken(_.AT),
      this.node(i, {
        kind: V.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(e),
      })
    );
  }
  parseTypeReference() {
    let e = this._lexer.token,
      i;
    if (this.expectOptionalToken(_.BRACKET_L)) {
      let n = this.parseTypeReference();
      this.expectToken(_.BRACKET_R),
        (i = this.node(e, { kind: V.LIST_TYPE, type: n }));
    } else i = this.parseNamedType();
    return this.expectOptionalToken(_.BANG)
      ? this.node(e, { kind: V.NON_NULL_TYPE, type: i })
      : i;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: V.NAMED_TYPE,
      name: this.parseName(),
    });
  }
  peekDescription() {
    return this.peek(_.STRING) || this.peek(_.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription()) return this.parseStringLiteral();
  }
  parseSchemaDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("schema");
    let n = this.parseConstDirectives(),
      r = this.many(_.BRACE_L, this.parseOperationTypeDefinition, _.BRACE_R);
    return this.node(e, {
      kind: V.SCHEMA_DEFINITION,
      description: i,
      directives: n,
      operationTypes: r,
    });
  }
  parseOperationTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseOperationType();
    this.expectToken(_.COLON);
    let n = this.parseNamedType();
    return this.node(e, {
      kind: V.OPERATION_TYPE_DEFINITION,
      operation: i,
      type: n,
    });
  }
  parseScalarTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("scalar");
    let n = this.parseName(),
      r = this.parseConstDirectives();
    return this.node(e, {
      kind: V.SCALAR_TYPE_DEFINITION,
      description: i,
      name: n,
      directives: r,
    });
  }
  parseObjectTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("type");
    let n = this.parseName(),
      r = this.parseImplementsInterfaces(),
      o = this.parseConstDirectives(),
      s = this.parseFieldsDefinition();
    return this.node(e, {
      kind: V.OBJECT_TYPE_DEFINITION,
      description: i,
      name: n,
      interfaces: r,
      directives: o,
      fields: s,
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements")
      ? this.delimitedMany(_.AMP, this.parseNamedType)
      : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(_.BRACE_L, this.parseFieldDefinition, _.BRACE_R);
  }
  parseFieldDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription(),
      n = this.parseName(),
      r = this.parseArgumentDefs();
    this.expectToken(_.COLON);
    let o = this.parseTypeReference(),
      s = this.parseConstDirectives();
    return this.node(e, {
      kind: V.FIELD_DEFINITION,
      description: i,
      name: n,
      arguments: r,
      type: o,
      directives: s,
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(_.PAREN_L, this.parseInputValueDef, _.PAREN_R);
  }
  parseInputValueDef() {
    let e = this._lexer.token,
      i = this.parseDescription(),
      n = this.parseName();
    this.expectToken(_.COLON);
    let r = this.parseTypeReference(),
      o;
    this.expectOptionalToken(_.EQUALS) && (o = this.parseConstValueLiteral());
    let s = this.parseConstDirectives();
    return this.node(e, {
      kind: V.INPUT_VALUE_DEFINITION,
      description: i,
      name: n,
      type: r,
      defaultValue: o,
      directives: s,
    });
  }
  parseInterfaceTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("interface");
    let n = this.parseName(),
      r = this.parseImplementsInterfaces(),
      o = this.parseConstDirectives(),
      s = this.parseFieldsDefinition();
    return this.node(e, {
      kind: V.INTERFACE_TYPE_DEFINITION,
      description: i,
      name: n,
      interfaces: r,
      directives: o,
      fields: s,
    });
  }
  parseUnionTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("union");
    let n = this.parseName(),
      r = this.parseConstDirectives(),
      o = this.parseUnionMemberTypes();
    return this.node(e, {
      kind: V.UNION_TYPE_DEFINITION,
      description: i,
      name: n,
      directives: r,
      types: o,
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(_.EQUALS)
      ? this.delimitedMany(_.PIPE, this.parseNamedType)
      : [];
  }
  parseEnumTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("enum");
    let n = this.parseName(),
      r = this.parseConstDirectives(),
      o = this.parseEnumValuesDefinition();
    return this.node(e, {
      kind: V.ENUM_TYPE_DEFINITION,
      description: i,
      name: n,
      directives: r,
      values: o,
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(
      _.BRACE_L,
      this.parseEnumValueDefinition,
      _.BRACE_R
    );
  }
  parseEnumValueDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription(),
      n = this.parseEnumValueName(),
      r = this.parseConstDirectives();
    return this.node(e, {
      kind: V.ENUM_VALUE_DEFINITION,
      description: i,
      name: n,
      directives: r,
    });
  }
  parseEnumValueName() {
    if (
      this._lexer.token.value === "true" ||
      this._lexer.token.value === "false" ||
      this._lexer.token.value === "null"
    )
      throw Ve(
        this._lexer.source,
        this._lexer.token.start,
        `${kd(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("input");
    let n = this.parseName(),
      r = this.parseConstDirectives(),
      o = this.parseInputFieldsDefinition();
    return this.node(e, {
      kind: V.INPUT_OBJECT_TYPE_DEFINITION,
      description: i,
      name: n,
      directives: r,
      fields: o,
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(_.BRACE_L, this.parseInputValueDef, _.BRACE_R);
  }
  parseTypeSystemExtension() {
    let e = this._lexer.lookahead();
    if (e.kind === _.NAME)
      switch (e.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    throw this.unexpected(e);
  }
  parseSchemaExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("schema");
    let i = this.parseConstDirectives(),
      n = this.optionalMany(
        _.BRACE_L,
        this.parseOperationTypeDefinition,
        _.BRACE_R
      );
    if (i.length === 0 && n.length === 0) throw this.unexpected();
    return this.node(e, {
      kind: V.SCHEMA_EXTENSION,
      directives: i,
      operationTypes: n,
    });
  }
  parseScalarTypeExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("scalar");
    let i = this.parseName(),
      n = this.parseConstDirectives();
    if (n.length === 0) throw this.unexpected();
    return this.node(e, {
      kind: V.SCALAR_TYPE_EXTENSION,
      name: i,
      directives: n,
    });
  }
  parseObjectTypeExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("type");
    let i = this.parseName(),
      n = this.parseImplementsInterfaces(),
      r = this.parseConstDirectives(),
      o = this.parseFieldsDefinition();
    if (n.length === 0 && r.length === 0 && o.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: V.OBJECT_TYPE_EXTENSION,
      name: i,
      interfaces: n,
      directives: r,
      fields: o,
    });
  }
  parseInterfaceTypeExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("interface");
    let i = this.parseName(),
      n = this.parseImplementsInterfaces(),
      r = this.parseConstDirectives(),
      o = this.parseFieldsDefinition();
    if (n.length === 0 && r.length === 0 && o.length === 0)
      throw this.unexpected();
    return this.node(e, {
      kind: V.INTERFACE_TYPE_EXTENSION,
      name: i,
      interfaces: n,
      directives: r,
      fields: o,
    });
  }
  parseUnionTypeExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("union");
    let i = this.parseName(),
      n = this.parseConstDirectives(),
      r = this.parseUnionMemberTypes();
    if (n.length === 0 && r.length === 0) throw this.unexpected();
    return this.node(e, {
      kind: V.UNION_TYPE_EXTENSION,
      name: i,
      directives: n,
      types: r,
    });
  }
  parseEnumTypeExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("enum");
    let i = this.parseName(),
      n = this.parseConstDirectives(),
      r = this.parseEnumValuesDefinition();
    if (n.length === 0 && r.length === 0) throw this.unexpected();
    return this.node(e, {
      kind: V.ENUM_TYPE_EXTENSION,
      name: i,
      directives: n,
      values: r,
    });
  }
  parseInputObjectTypeExtension() {
    let e = this._lexer.token;
    this.expectKeyword("extend"), this.expectKeyword("input");
    let i = this.parseName(),
      n = this.parseConstDirectives(),
      r = this.parseInputFieldsDefinition();
    if (n.length === 0 && r.length === 0) throw this.unexpected();
    return this.node(e, {
      kind: V.INPUT_OBJECT_TYPE_EXTENSION,
      name: i,
      directives: n,
      fields: r,
    });
  }
  parseDirectiveDefinition() {
    let e = this._lexer.token,
      i = this.parseDescription();
    this.expectKeyword("directive"), this.expectToken(_.AT);
    let n = this.parseName(),
      r = this.parseArgumentDefs(),
      o = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    let s = this.parseDirectiveLocations();
    return this.node(e, {
      kind: V.DIRECTIVE_DEFINITION,
      description: i,
      name: n,
      arguments: r,
      repeatable: o,
      locations: s,
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(_.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    let e = this._lexer.token,
      i = this.parseName();
    if (Object.prototype.hasOwnProperty.call(Md, i.value)) return i;
    throw this.unexpected(e);
  }
  node(e, i) {
    return (
      this._options.noLocation !== !0 &&
        (i.loc = new Ks(e, this._lexer.lastToken, this._lexer.source)),
      i
    );
  }
  peek(e) {
    return this._lexer.token.kind === e;
  }
  expectToken(e) {
    let i = this._lexer.token;
    if (i.kind === e) return this.advanceLexer(), i;
    throw Ve(this._lexer.source, i.start, `Expected ${aE(e)}, found ${kd(i)}.`);
  }
  expectOptionalToken(e) {
    return this._lexer.token.kind === e ? (this.advanceLexer(), !0) : !1;
  }
  expectKeyword(e) {
    let i = this._lexer.token;
    if (i.kind === _.NAME && i.value === e) this.advanceLexer();
    else
      throw Ve(this._lexer.source, i.start, `Expected "${e}", found ${kd(i)}.`);
  }
  expectOptionalKeyword(e) {
    let i = this._lexer.token;
    return i.kind === _.NAME && i.value === e ? (this.advanceLexer(), !0) : !1;
  }
  unexpected(e) {
    let i = e ?? this._lexer.token;
    return Ve(this._lexer.source, i.start, `Unexpected ${kd(i)}.`);
  }
  any(e, i, n) {
    this.expectToken(e);
    let r = [];
    for (; !this.expectOptionalToken(n); ) r.push(i.call(this));
    return r;
  }
  optionalMany(e, i, n) {
    if (this.expectOptionalToken(e)) {
      let r = [];
      do r.push(i.call(this));
      while (!this.expectOptionalToken(n));
      return r;
    }
    return [];
  }
  many(e, i, n) {
    this.expectToken(e);
    let r = [];
    do r.push(i.call(this));
    while (!this.expectOptionalToken(n));
    return r;
  }
  delimitedMany(e, i) {
    this.expectOptionalToken(e);
    let n = [];
    do n.push(i.call(this));
    while (this.expectOptionalToken(e));
    return n;
  }
  advanceLexer() {
    let { maxTokens: e } = this._options,
      i = this._lexer.advance();
    if (
      e !== void 0 &&
      i.kind !== _.EOF &&
      (++this._tokenCounter, this._tokenCounter > e)
    )
      throw Ve(
        this._lexer.source,
        i.start,
        `Document contains more that ${e} tokens. Parsing aborted.`
      );
  }
};
function kd(t) {
  let e = t.value;
  return aE(t.kind) + (e != null ? ` "${e}"` : "");
}
function aE(t) {
  return nE(t) ? `"${t}"` : t;
}
function Pd(t) {
  try {
    return JSON.parse(t);
  } catch {
    return;
  }
}
var hj = Object.create,
  hE = Object.defineProperty,
  pj = Object.getOwnPropertyDescriptor,
  pE = Object.getOwnPropertyNames,
  mj = Object.getPrototypeOf,
  gj = Object.prototype.hasOwnProperty,
  bj = (t, e) =>
    function () {
      return e || (0, t[pE(t)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  vj = (t, e, i, n) => {
    if ((e && typeof e == "object") || typeof e == "function")
      for (let r of pE(e))
        !gj.call(t, r) &&
          r !== i &&
          hE(t, r, {
            get: () => e[r],
            enumerable: !(n = pj(e, r)) || n.enumerable,
          });
    return t;
  },
  yj = (t, e, i) => (
    (i = t != null ? hj(mj(t)) : {}),
    vj(
      e || !t || !t.__esModule
        ? hE(i, "default", { value: t, enumerable: !0 })
        : i,
      t
    )
  ),
  _j = bj({
    "node_modules/set-cookie-parser/lib/set-cookie.js"(t, e) {
      "use strict";
      var i = { decodeValues: !0, map: !1, silent: !1 };
      function n(l) {
        return typeof l == "string" && !!l.trim();
      }
      function r(l, c) {
        var d = l.split(";").filter(n),
          u = d.shift(),
          f = o(u),
          h = f.name,
          p = f.value;
        c = c ? Object.assign({}, i, c) : i;
        try {
          p = c.decodeValues ? decodeURIComponent(p) : p;
        } catch (g) {
          console.error(
            "set-cookie-parser encountered an error while decoding a cookie with value '" +
              p +
              "'. Set options.decodeValues to false to disable this feature.",
            g
          );
        }
        var m = { name: h, value: p };
        return (
          d.forEach(function (g) {
            var b = g.split("="),
              x = b.shift().trimLeft().toLowerCase(),
              P = b.join("=");
            x === "expires"
              ? (m.expires = new Date(P))
              : x === "max-age"
              ? (m.maxAge = parseInt(P, 10))
              : x === "secure"
              ? (m.secure = !0)
              : x === "httponly"
              ? (m.httpOnly = !0)
              : x === "samesite"
              ? (m.sameSite = P)
              : (m[x] = P);
          }),
          m
        );
      }
      function o(l) {
        var c = "",
          d = "",
          u = l.split("=");
        return (
          u.length > 1 ? ((c = u.shift()), (d = u.join("="))) : (d = l),
          { name: c, value: d }
        );
      }
      function s(l, c) {
        if (((c = c ? Object.assign({}, i, c) : i), !l)) return c.map ? {} : [];
        if (l.headers)
          if (typeof l.headers.getSetCookie == "function")
            l = l.headers.getSetCookie();
          else if (l.headers["set-cookie"]) l = l.headers["set-cookie"];
          else {
            var d =
              l.headers[
                Object.keys(l.headers).find(function (f) {
                  return f.toLowerCase() === "set-cookie";
                })
              ];
            !d &&
              l.headers.cookie &&
              !c.silent &&
              console.warn(
                "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
              ),
              (l = d);
          }
        if (
          (Array.isArray(l) || (l = [l]),
          (c = c ? Object.assign({}, i, c) : i),
          c.map)
        ) {
          var u = {};
          return l.filter(n).reduce(function (f, h) {
            var p = r(h, c);
            return (f[p.name] = p), f;
          }, u);
        } else
          return l.filter(n).map(function (f) {
            return r(f, c);
          });
      }
      function a(l) {
        if (Array.isArray(l)) return l;
        if (typeof l != "string") return [];
        var c = [],
          d = 0,
          u,
          f,
          h,
          p,
          m;
        function g() {
          for (; d < l.length && /\s/.test(l.charAt(d)); ) d += 1;
          return d < l.length;
        }
        function b() {
          return (f = l.charAt(d)), f !== "=" && f !== ";" && f !== ",";
        }
        for (; d < l.length; ) {
          for (u = d, m = !1; g(); )
            if (((f = l.charAt(d)), f === ",")) {
              for (h = d, d += 1, g(), p = d; d < l.length && b(); ) d += 1;
              d < l.length && l.charAt(d) === "="
                ? ((m = !0), (d = p), c.push(l.substring(u, h)), (u = d))
                : (d = h + 1);
            } else d += 1;
          (!m || d >= l.length) && c.push(l.substring(u, l.length));
        }
        return c;
      }
      (e.exports = s),
        (e.exports.parse = s),
        (e.exports.parseString = r),
        (e.exports.splitCookiesString = a);
    },
  }),
  xj = yj(_j()),
  wj = /[^a-z0-9\-#$%&'*+.^_`|~]/i;
function ea(t) {
  if (wj.test(t) || t.trim() === "")
    throw new TypeError("Invalid character in header field name");
  return t.trim().toLowerCase();
}
var lE = [
    String.fromCharCode(10),
    String.fromCharCode(13),
    String.fromCharCode(9),
    String.fromCharCode(32),
  ],
  Ej = new RegExp(`(^[${lE.join("")}]|$[${lE.join("")}])`, "g");
function Lm(t) {
  return t.replace(Ej, "");
}
function ta(t) {
  if (typeof t != "string" || t.length === 0) return !1;
  for (let e = 0; e < t.length; e++) {
    let i = t.charCodeAt(e);
    if (i > 127 || !Cj(i)) return !1;
  }
  return !0;
}
function Cj(t) {
  return ![
    127,
    32,
    "(",
    ")",
    "<",
    ">",
    "@",
    ",",
    ";",
    ":",
    "\\",
    '"',
    "/",
    "[",
    "]",
    "?",
    "=",
    "{",
    "}",
  ].includes(t);
}
function cE(t) {
  if (typeof t != "string" || t.trim() !== t) return !1;
  for (let e = 0; e < t.length; e++) {
    let i = t.charCodeAt(e);
    if (i === 0 || i === 10 || i === 13) return !1;
  }
  return !0;
}
var Eo = Symbol("normalizedHeaders"),
  jm = Symbol("rawHeaderNames"),
  dE = ", ",
  uE,
  fE,
  Dj = class mE {
    constructor(e) {
      (this[uE] = {}),
        (this[fE] = new Map()),
        ["Headers", "HeadersPolyfill"].includes(e?.constructor.name) ||
        e instanceof mE ||
        (typeof globalThis.Headers < "u" && e instanceof globalThis.Headers)
          ? e.forEach((n, r) => {
              this.append(r, n);
            }, this)
          : Array.isArray(e)
          ? e.forEach(([i, n]) => {
              this.append(i, Array.isArray(n) ? n.join(dE) : n);
            })
          : e &&
            Object.getOwnPropertyNames(e).forEach((i) => {
              let n = e[i];
              this.append(i, Array.isArray(n) ? n.join(dE) : n);
            });
    }
    [((uE = Eo), (fE = jm), Symbol.iterator)]() {
      return this.entries();
    }
    *keys() {
      for (let [e] of this.entries()) yield e;
    }
    *values() {
      for (let [, e] of this.entries()) yield e;
    }
    *entries() {
      let e = Object.keys(this[Eo]).sort((i, n) => i.localeCompare(n));
      for (let i of e)
        if (i === "set-cookie") for (let n of this.getSetCookie()) yield [i, n];
        else yield [i, this.get(i)];
    }
    has(e) {
      if (!ta(e)) throw new TypeError(`Invalid header name "${e}"`);
      return this[Eo].hasOwnProperty(ea(e));
    }
    get(e) {
      if (!ta(e)) throw TypeError(`Invalid header name "${e}"`);
      return this[Eo][ea(e)] ?? null;
    }
    set(e, i) {
      if (!ta(e) || !cE(i)) return;
      let n = ea(e),
        r = Lm(i);
      (this[Eo][n] = Lm(r)), this[jm].set(n, e);
    }
    append(e, i) {
      if (!ta(e) || !cE(i)) return;
      let n = ea(e),
        r = Lm(i),
        o = this.has(n) ? `${this.get(n)}, ${r}` : r;
      this.set(e, o);
    }
    delete(e) {
      if (!ta(e) || !this.has(e)) return;
      let i = ea(e);
      delete this[Eo][i], this[jm].delete(i);
    }
    forEach(e, i) {
      for (let [n, r] of this.entries()) e.call(i, r, n, this);
    }
    getSetCookie() {
      let e = this.get("set-cookie");
      return e === null ? [] : e === "" ? [""] : (0, xj.splitCookiesString)(e);
    }
  };
function gE(t) {
  return t
    .trim()
    .split(/[\r\n]+/)
    .reduce((i, n) => {
      if (n.trim() === "") return i;
      let r = n.split(": "),
        o = r.shift(),
        s = r.join(": ");
      return i.append(o, s), i;
    }, new Dj());
}
function Ij(t) {
  var e, i;
  let n = gE(t),
    r = n.get("content-type") || "text/plain",
    o = n.get("content-disposition");
  if (!o) throw new Error('"Content-Disposition" header is required.');
  let s = o.split(";").reduce((c, d) => {
      let [u, ...f] = d.trim().split("=");
      return (c[u] = f.join("=")), c;
    }, {}),
    a = (e = s.name) == null ? void 0 : e.slice(1, -1),
    l = (i = s.filename) == null ? void 0 : i.slice(1, -1);
  return { name: a, filename: l, contentType: r };
}
function bE(t, e) {
  let i = e?.get("content-type");
  if (!i) return;
  let [, ...n] = i.split(/; */),
    r = n
      .filter((l) => l.startsWith("boundary="))
      .map((l) => l.replace(/^boundary=/, ""))[0];
  if (!r) return;
  let o = new RegExp(`--+${r}`),
    s = t
      .split(o)
      .filter(
        (l) =>
          l.startsWith(`\r
`) &&
          l.endsWith(`\r
`)
      )
      .map((l) => l.trimStart().replace(/\r\n$/, ""));
  if (!s.length) return;
  let a = {};
  try {
    for (let l of s) {
      let [c, ...d] = l.split(`\r
\r
`),
        u = d.join(`\r
\r
`),
        { contentType: f, filename: h, name: p } = Ij(c),
        m = h === void 0 ? u : new File([u], h, { type: f }),
        g = a[p];
      g === void 0
        ? (a[p] = m)
        : Array.isArray(g)
        ? (a[p] = [...g, m])
        : (a[p] = [g, m]);
    }
    return a;
  } catch {
    return;
  }
}
var vE = Object.getOwnPropertySymbols,
  Sj = Object.prototype.hasOwnProperty,
  Tj = Object.prototype.propertyIsEnumerable,
  Mj = (t, e) => {
    var i = {};
    for (var n in t) Sj.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
    if (t != null && vE)
      for (var n of vE(t)) e.indexOf(n) < 0 && Tj.call(t, n) && (i[n] = t[n]);
    return i;
  },
  yE = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    });
function Vm(t) {
  var e;
  let i = t.definitions.find((n) => n.kind === "OperationDefinition");
  return {
    operationType: i?.operation,
    operationName: (e = i?.name) == null ? void 0 : e.value,
  };
}
function Aj(t) {
  try {
    let e = Nd(t);
    return Vm(e);
  } catch (e) {
    return e;
  }
}
function Rj(t, e, i) {
  let n = { variables: t };
  for (let [r, o] of Object.entries(e)) {
    if (!(r in i)) throw new Error(`Given files do not have a key '${r}' .`);
    for (let s of o) {
      let [a, ...l] = s.split(".").reverse(),
        c = l.reverse(),
        d = n;
      for (let u of c) {
        if (!(u in d)) throw new Error(`Property '${c}' is not in operations.`);
        d = d[u];
      }
      d[a] = i[r];
    }
  }
  return n.variables;
}
function Oj(t) {
  return yE(this, null, function* () {
    var e;
    switch (t.method) {
      case "GET": {
        let i = new URL(t.url),
          n = i.searchParams.get("query"),
          r = i.searchParams.get("variables") || "";
        return { query: n, variables: Pd(r) };
      }
      case "POST": {
        let i = t.clone();
        if (
          (e = t.headers.get("content-type")) != null &&
          e.includes("multipart/form-data")
        ) {
          let r = bE(yield i.text(), t.headers);
          if (!r) return null;
          let o = r,
            { operations: s, map: a } = o,
            l = Mj(o, ["operations", "map"]),
            c = Pd(s) || {};
          if (!c.query) return null;
          let d = Pd(a || "") || {},
            u = c.variables ? Rj(c.variables, d, l) : {};
          return { query: c.query, variables: u };
        }
        let n = yield i.json().catch(() => null);
        if (n?.query) {
          let { query: r, variables: o } = n;
          return { query: r, variables: o };
        }
      }
      default:
        return null;
    }
  });
}
function Fd(t) {
  return yE(this, null, function* () {
    let e = yield Oj(t);
    if (!e || !e.query) return;
    let { query: i, variables: n } = e,
      r = Aj(i);
    if (r instanceof Error) {
      let o = jn(t);
      throw new Error(
        ee.formatMessage(
          `Failed to intercept a GraphQL request to "%s %s": cannot parse query. See the error message from the parser below.

%s`,
          t.method,
          o,
          r.message
        )
      );
    }
    return {
      query: e.query,
      operationType: r.operationType,
      operationName: r.operationName,
      variables: n,
    };
  });
}
var _E = (t, e, i) =>
  new Promise((n, r) => {
    var o = (l) => {
        try {
          a(i.next(l));
        } catch (c) {
          r(c);
        }
      },
      s = (l) => {
        try {
          a(i.throw(l));
        } catch (c) {
          r(c);
        }
      },
      a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
    a((i = i.apply(t, e)).next());
  });
function kj(t) {
  return t == null
    ? !1
    : typeof t == "object" && "kind" in t && "definitions" in t;
}
var na = class extends ho {
  constructor(e, i, n, r, o) {
    let s = i;
    if (kj(i)) {
      let l = Vm(i);
      if (l.operationType !== e)
        throw new Error(
          `Failed to create a GraphQL handler: provided a DocumentNode with a mismatched operation type (expected "${e}", but got "${l.operationType}").`
        );
      if (!l.operationName)
        throw new Error(
          "Failed to create a GraphQL handler: provided a DocumentNode with no operation name."
        );
      s = l.operationName;
    }
    let a =
      e === "all"
        ? `${e} (origin: ${n.toString()})`
        : `${e} ${s} (origin: ${n.toString()})`;
    super({
      info: { header: a, operationType: e, operationName: s },
      resolver: r,
      options: o,
    }),
      (this.endpoint = n);
  }
  parse(e) {
    return _E(this, null, function* () {
      let i = xd(new URL(e.request.url), this.endpoint);
      if (!i.matches) return { match: i };
      let n = yield Fd(e.request).catch((r) => {
        console.error(r);
      });
      return typeof n > "u"
        ? { match: i }
        : {
            match: i,
            query: n.query,
            operationType: n.operationType,
            operationName: n.operationName,
            variables: n.variables,
          };
    });
  }
  predicate(e) {
    if (e.parsedResult.operationType === void 0) return !1;
    if (!e.parsedResult.operationName && this.info.operationType !== "all") {
      let r = jn(e.request);
      return (
        ee.warn(`Failed to intercept a GraphQL request at "${e.request.method} ${r}": anonymous GraphQL operations are not supported.

Consider naming this operation or using "graphql.operation()" request handler to intercept GraphQL requests regardless of their operation name/type. Read more: https://mswjs.io/docs/api/graphql/#graphqloperationresolver`),
        !1
      );
    }
    let i =
        this.info.operationType === "all" ||
        e.parsedResult.operationType === this.info.operationType,
      n =
        this.info.operationName instanceof RegExp
          ? this.info.operationName.test(e.parsedResult.operationName || "")
          : e.parsedResult.operationName === this.info.operationName;
    return e.parsedResult.match.matches && i && n;
  }
  extendResolverArgs(e) {
    let i = Cd(e.request);
    return {
      query: e.parsedResult.query || "",
      operationName: e.parsedResult.operationName || "",
      variables: e.parsedResult.variables || {},
      cookies: i,
    };
  }
  log(e) {
    return _E(this, null, function* () {
      let i = yield md(e.request),
        n = yield bd(e.response),
        r = hd(n.status),
        o = e.parsedResult.operationName
          ? `${e.parsedResult.operationType} ${e.parsedResult.operationName}`
          : `anonymous ${e.parsedResult.operationType}`;
      console.groupCollapsed(
        ee.formatMessage(`${pd()} ${o} (%c${n.status} ${n.statusText}%c)`),
        `color:${r}`,
        "color:inherit"
      ),
        console.log("Request:", i),
        console.log("Handler:", this),
        console.log("Response:", n),
        console.groupEnd();
    });
  }
};
var Nj = Object.defineProperty,
  Pj = Object.defineProperties,
  Fj = Object.getOwnPropertyDescriptors,
  xE = Object.getOwnPropertySymbols,
  Lj = Object.prototype.hasOwnProperty,
  jj = Object.prototype.propertyIsEnumerable,
  wE = (t, e, i) =>
    e in t
      ? Nj(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  Vj = (t, e) => {
    for (var i in e || (e = {})) Lj.call(e, i) && wE(t, i, e[i]);
    if (xE) for (var i of xE(e)) jj.call(e, i) && wE(t, i, e[i]);
    return t;
  },
  Bj = (t, e) => Pj(t, Fj(e)),
  { message: Uj } = gd;
function cr(t = {}) {
  let e = t?.status || 200,
    i = t?.statusText || Uj[e] || "",
    n = new Headers(t?.headers);
  return Bj(Vj({}, t), { headers: n, status: e, statusText: i });
}
function EE(t, e) {
  var i;
  if (
    (e.type &&
      Object.defineProperty(t, "type", {
        value: e.type,
        enumerable: !0,
        writable: !1,
      }),
    typeof document < "u")
  ) {
    let n =
      ((i = e.headers.get("Set-Cookie")) == null ? void 0 : i.split(",")) || [];
    for (let r of n) document.cookie = r;
  }
  return t;
}
var ia = class t extends Response {
  constructor(e, i) {
    let n = cr(i);
    super(e, n), EE(this, n);
  }
  static text(e, i) {
    let n = cr(i);
    return (
      n.headers.has("Content-Type") ||
        n.headers.set("Content-Type", "text/plain"),
      new t(e, n)
    );
  }
  static json(e, i) {
    let n = cr(i);
    return (
      n.headers.has("Content-Type") ||
        n.headers.set("Content-Type", "application/json"),
      new t(JSON.stringify(e), n)
    );
  }
  static xml(e, i) {
    let n = cr(i);
    return (
      n.headers.has("Content-Type") ||
        n.headers.set("Content-Type", "text/xml"),
      new t(e, n)
    );
  }
  static arrayBuffer(e, i) {
    let n = cr(i);
    return (
      e && n.headers.set("Content-Length", e.byteLength.toString()), new t(e, n)
    );
  }
  static formData(e, i) {
    return new t(e, cr(i));
  }
};
fw();
var Hj = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    }),
  CE = uw,
  $j = 3,
  zj = 4,
  DE = 0.5;
function qj(t) {
  return t.reduce(
    (e, i) => (
      i instanceof sr && e.http.push(i), i instanceof na && e.graphql.push(i), e
    ),
    { http: [], graphql: [] }
  );
}
function Wj() {
  return (t, e) => {
    let { path: i, method: n } = e.info;
    if (i instanceof RegExp || n instanceof RegExp) return 1 / 0;
    let o = fd(t.method, n) ? DE : 0,
      s = jn(t);
    return CE(s, i) - o;
  };
}
function Gj(t) {
  return (e, i) => {
    if (typeof t.operationName > "u") return 1 / 0;
    let { operationType: n, operationName: r } = i.info;
    if (typeof r != "string") return 1 / 0;
    let s = t.operationType === n ? DE : 0;
    return CE(t.operationName, r) - s;
  };
}
function Yj(t, e, i) {
  return e
    .reduce((r, o) => {
      let s = i(t, o);
      return r.concat([[s, o]]);
    }, [])
    .sort(([r], [o]) => r - o)
    .filter(([r]) => r <= $j)
    .slice(0, zj)
    .map(([, r]) => r);
}
function Qj(t) {
  return t.length > 1
    ? `Did you mean to request one of the following resources instead?

${t.map((e) => `  \u2022 ${e.info.header}`).join(`
`)}`
    : `Did you mean to request "${t[0].info.header}" instead?`;
}
function IE(t, e, i = "warn") {
  return Hj(this, null, function* () {
    let n = yield Fd(t).catch(() => null),
      r = jn(t);
    function o() {
      let c = qj(e),
        d = n ? c.graphql : c.http,
        u = Yj(t, d, n ? Gj(n) : Wj());
      return u.length > 0 ? Qj(u) : "";
    }
    function s(c) {
      return c?.operationName
        ? `${c.operationType} ${c.operationName} (${t.method} ${r})`
        : `anonymous ${c?.operationType} (${t.method} ${r})`;
    }
    function a() {
      let c = n ? s(n) : `${t.method} ${r}`,
        d = o();
      return [
        "intercepted a request without a matching request handler:",
        `  \u2022 ${c}`,
        d,
        `If you still wish to intercept this unhandled request, please create a request handler for it.
Read more: https://mswjs.io/docs/getting-started/mocks`,
      ].filter(Boolean).join(`

`);
    }
    function l(c) {
      let d = a();
      switch (c) {
        case "error":
          throw (
            (ee.error("Error: %s", d),
            new Error(
              ee.formatMessage(
                'Cannot bypass a request when using the "error" strategy for the "onUnhandledRequest" option.'
              )
            ))
          );
        case "warn": {
          ee.warn("Warning: %s", d);
          break;
        }
        case "bypass":
          break;
        default:
          throw new Error(
            ee.formatMessage(
              'Failed to react to an unhandled request: unknown strategy "%s". Please provide one of the supported strategies ("bypass", "warn", "error") or a custom callback function as the value of the "onUnhandledRequest" option.',
              c
            )
          );
      }
    }
    if (typeof i == "function") {
      i(t, { warning: l.bind(null, "warn"), error: l.bind(null, "error") });
      return;
    }
    l(i);
  });
}
var Zj = Object.defineProperty,
  Kj = Object.defineProperties,
  Xj = Object.getOwnPropertyDescriptors,
  SE = Object.getOwnPropertySymbols,
  Jj = Object.prototype.hasOwnProperty,
  eV = Object.prototype.propertyIsEnumerable,
  TE = (t, e, i) =>
    e in t
      ? Zj(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  tV = (t, e) => {
    for (var i in e || (e = {})) Jj.call(e, i) && TE(t, i, e[i]);
    if (SE) for (var i of SE(e)) eV.call(e, i) && TE(t, i, e[i]);
    return t;
  },
  nV = (t, e) => Kj(t, Xj(e));
function ME(t, e) {
  bo.add(nV(tV({}, t), { url: t.url.toString() }), e), bo.persist();
}
var iV = (t, e, i) =>
  new Promise((n, r) => {
    var o = (l) => {
        try {
          a(i.next(l));
        } catch (c) {
          r(c);
        }
      },
      s = (l) => {
        try {
          a(i.throw(l));
        } catch (c) {
          r(c);
        }
      },
      a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
    a((i = i.apply(t, e)).next());
  });
function Ld(t, e, i, n, r, o) {
  return iV(this, null, function* () {
    var s, a, l, c, d, u;
    if (
      (r.emit("request:start", { request: t, requestId: e }),
      t.headers.get("x-msw-intention") === "bypass")
    ) {
      r.emit("request:end", { request: t, requestId: e }),
        (s = o?.onPassthroughResponse) == null || s.call(o, t);
      return;
    }
    let f = yield Dt(() => lw(t, i, o?.resolutionContext));
    if (f.error)
      throw (
        (r.emit("unhandledException", {
          error: f.error,
          request: t,
          requestId: e,
        }),
        f.error)
      );
    if (!f.data) {
      yield IE(t, i, n.onUnhandledRequest),
        r.emit("request:unhandled", { request: t, requestId: e }),
        r.emit("request:end", { request: t, requestId: e }),
        (a = o?.onPassthroughResponse) == null || a.call(o, t);
      return;
    }
    let { response: h } = f.data;
    if (!h) {
      r.emit("request:end", { request: t, requestId: e }),
        (l = o?.onPassthroughResponse) == null || l.call(o, t);
      return;
    }
    if (
      h.status === 302 &&
      h.headers.get("x-msw-intention") === "passthrough"
    ) {
      r.emit("request:end", { request: t, requestId: e }),
        (c = o?.onPassthroughResponse) == null || c.call(o, t);
      return;
    }
    ME(t, h), r.emit("request:match", { request: t, requestId: e });
    let p = f.data,
      m = ((d = o?.transformResponse) == null ? void 0 : d.call(o, h)) || h;
    return (
      (u = o?.onMockedResponse) == null || u.call(o, m, p),
      r.emit("request:end", { request: t, requestId: e }),
      m
    );
  });
}
function AE(t) {
  return {
    status: t.status,
    statusText: t.statusText,
    headers: Object.fromEntries(t.headers.entries()),
  };
}
function Bm(t) {
  return t != null && typeof t == "object" && !Array.isArray(t);
}
function Um(t, e) {
  return Object.entries(e).reduce((i, [n, r]) => {
    let o = i[n];
    return Array.isArray(o) && Array.isArray(r)
      ? ((i[n] = o.concat(r)), i)
      : Bm(o) && Bm(r)
      ? ((i[n] = Um(o, r)), i)
      : ((i[n] = r), i);
  }, Object.assign({}, t));
}
function rV() {
  let t = (e, i) => {
    (t.state = "pending"),
      (t.resolve = (n) => {
        if (t.state !== "pending") return;
        t.result = n;
        let r = (o) => ((t.state = "fulfilled"), o);
        return e(n instanceof Promise ? n : Promise.resolve(n).then(r));
      }),
      (t.reject = (n) => {
        if (t.state === "pending")
          return (
            queueMicrotask(() => {
              t.state = "rejected";
            }),
            i((t.rejectionReason = n))
          );
      });
  };
  return t;
}
var jd = class extends Promise {
  #e;
  resolve;
  reject;
  constructor(t = null) {
    let e = rV();
    super((i, n) => {
      e(i, n), t?.(e.resolve, e.reject);
    }),
      (this.#e = e),
      (this.resolve = this.#e.resolve),
      (this.reject = this.#e.reject);
  }
  get state() {
    return this.#e.state;
  }
  get rejectionReason() {
    return this.#e.rejectionReason;
  }
  then(t, e) {
    return this.#t(super.then(t, e));
  }
  catch(t) {
    return this.#t(super.catch(t));
  }
  finally(t) {
    return this.#t(super.finally(t));
  }
  #t(t) {
    return Object.defineProperties(t, {
      resolve: { configurable: !0, value: this.resolve },
      reject: { configurable: !0, value: this.reject },
    });
  }
};
function Vd() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
    let e = (Math.random() * 16) | 0;
    return (t == "x" ? e : (e & 3) | 8).toString(16);
  });
}
var oV = class {
  constructor(t) {
    (this.request = t), (this.responsePromise = new jd());
  }
  respondWith(t) {
    qe(
      this.responsePromise.state === "pending",
      'Failed to respond to "%s %s" request: the "request" event has already been responded to.',
      this.request.method,
      this.request.url
    ),
      this.responsePromise.resolve(t);
  }
};
function Bd(t) {
  let e = new oV(t);
  return (
    Reflect.set(t, "respondWith", e.respondWith.bind(e)),
    { interactiveRequest: t, requestController: e }
  );
}
function Ud(t, e, ...i) {
  return vt(this, null, function* () {
    let n = t.listeners(e);
    if (n.length !== 0) for (let r of n) yield r.apply(t, i);
  });
}
function sV(t, e) {
  try {
    return t[e], !0;
  } catch {
    return !1;
  }
}
var OE = class extends mo {
    constructor() {
      super(OE.symbol);
    }
    checkEnvironment() {
      return typeof globalThis < "u" && typeof globalThis.fetch < "u";
    }
    setup() {
      let t = globalThis.fetch;
      qe(!t[Ln], 'Failed to patch the "fetch" module: already patched.'),
        (globalThis.fetch = (e, i) =>
          vt(this, null, function* () {
            var n;
            let r = Vd(),
              o = new Request(e, i);
            this.logger.info("[%s] %s", o.method, o.url);
            let { interactiveRequest: s, requestController: a } = Bd(o);
            this.logger.info(
              'emitting the "request" event for %d listener(s)...',
              this.emitter.listenerCount("request")
            ),
              this.emitter.once("request", ({ requestId: f }) => {
                f === r &&
                  a.responsePromise.state === "pending" &&
                  a.responsePromise.resolve(void 0);
              }),
              this.logger.info("awaiting for the mocked response...");
            let l = s.signal,
              c = new jd();
            l.addEventListener(
              "abort",
              () => {
                c.reject(l.reason);
              },
              { once: !0 }
            );
            let d = yield Dt(() =>
              vt(this, null, function* () {
                let f = Ud(this.emitter, "request", {
                  request: s,
                  requestId: r,
                });
                yield Promise.race([c, f, a.responsePromise]),
                  this.logger.info("all request listeners have been resolved!");
                let h = yield a.responsePromise;
                return this.logger.info("event.respondWith called with:", h), h;
              })
            );
            if (c.state === "rejected")
              return Promise.reject(c.rejectionReason);
            if (d.error) return Promise.reject(RE(d.error));
            let u = d.data;
            if (u && !((n = o.signal) != null && n.aborted)) {
              if (
                (this.logger.info("received mocked response:", u),
                sV(u, "type") && u.type === "error")
              )
                return (
                  this.logger.info(
                    "received a network error response, rejecting the request promise..."
                  ),
                  Promise.reject(RE(u))
                );
              let f = u.clone();
              this.emitter.emit("response", {
                response: f,
                isMockedResponse: !0,
                request: s,
                requestId: r,
              });
              let h = new Response(u.body, u);
              return (
                Object.defineProperty(h, "url", {
                  writable: !1,
                  enumerable: !0,
                  configurable: !1,
                  value: o.url,
                }),
                h
              );
            }
            return (
              this.logger.info("no mocked response received!"),
              t(o).then((f) => {
                let h = f.clone();
                return (
                  this.logger.info("original fetch performed", h),
                  this.emitter.emit("response", {
                    response: h,
                    isMockedResponse: !1,
                    request: s,
                    requestId: r,
                  }),
                  f
                );
              })
            );
          })),
        Object.defineProperty(globalThis.fetch, Ln, {
          enumerable: !0,
          configurable: !0,
          value: !0,
        }),
        this.subscriptions.push(() => {
          Object.defineProperty(globalThis.fetch, Ln, { value: void 0 }),
            (globalThis.fetch = t),
            this.logger.info(
              'restored native "globalThis.fetch"!',
              globalThis.fetch.name
            );
        });
    }
  },
  Hd = OE;
Hd.symbol = Symbol("fetch");
function RE(t) {
  return Object.assign(new TypeError("Failed to fetch"), { cause: t });
}
function aV(t, e) {
  let i = new Uint8Array(t.byteLength + e.byteLength);
  return i.set(t, 0), i.set(e, t.byteLength), i;
}
var FE = class {
    constructor(t, e) {
      (this.AT_TARGET = 0),
        (this.BUBBLING_PHASE = 0),
        (this.CAPTURING_PHASE = 0),
        (this.NONE = 0),
        (this.type = ""),
        (this.srcElement = null),
        (this.currentTarget = null),
        (this.eventPhase = 0),
        (this.isTrusted = !0),
        (this.composed = !1),
        (this.cancelable = !0),
        (this.defaultPrevented = !1),
        (this.bubbles = !0),
        (this.lengthComputable = !0),
        (this.loaded = 0),
        (this.total = 0),
        (this.cancelBubble = !1),
        (this.returnValue = !0),
        (this.type = t),
        (this.target = e?.target || null),
        (this.currentTarget = e?.currentTarget || null),
        (this.timeStamp = Date.now());
    }
    composedPath() {
      return [];
    }
    initEvent(t, e, i) {
      (this.type = t), (this.bubbles = !!e), (this.cancelable = !!i);
    }
    preventDefault() {
      this.defaultPrevented = !0;
    }
    stopPropagation() {}
    stopImmediatePropagation() {}
  },
  lV = class extends FE {
    constructor(t, e) {
      super(t),
        (this.lengthComputable = e?.lengthComputable || !1),
        (this.composed = e?.composed || !1),
        (this.loaded = e?.loaded || 0),
        (this.total = e?.total || 0);
    }
  },
  cV = typeof ProgressEvent < "u";
function dV(t, e, i) {
  let n = [
      "error",
      "progress",
      "loadstart",
      "loadend",
      "load",
      "timeout",
      "abort",
    ],
    r = cV ? ProgressEvent : lV;
  return n.includes(e)
    ? new r(e, {
        lengthComputable: !0,
        loaded: i?.loaded || 0,
        total: i?.total || 0,
      })
    : new FE(e, { target: t, currentTarget: t });
}
function LE(t, e) {
  if (!(e in t)) return null;
  if (Object.prototype.hasOwnProperty.call(t, e)) return t;
  let n = Reflect.getPrototypeOf(t);
  return n ? LE(n, e) : null;
}
function kE(t, e) {
  return new Proxy(t, uV(e));
}
function uV(t) {
  let { constructorCall: e, methodCall: i, getProperty: n, setProperty: r } = t,
    o = {};
  return (
    typeof e < "u" &&
      (o.construct = function (s, a, l) {
        let c = Reflect.construct.bind(null, s, a, l);
        return e.call(l, a, c);
      }),
    (o.set = function (s, a, l) {
      let c = () => {
        let d = LE(s, a) || s,
          u = Reflect.getOwnPropertyDescriptor(d, a);
        return typeof u?.set < "u"
          ? (u.set.apply(s, [l]), !0)
          : Reflect.defineProperty(d, a, {
              writable: !0,
              enumerable: !0,
              configurable: !0,
              value: l,
            });
      };
      return typeof r < "u" ? r.call(s, [a, l], c) : c();
    }),
    (o.get = function (s, a, l) {
      let c = () => s[a],
        d = typeof n < "u" ? n.call(s, [a, l], c) : c();
      return typeof d == "function"
        ? (...u) => {
            let f = d.bind(s, ...u);
            return typeof i < "u" ? i.call(s, [a, u], f) : f();
          }
        : d;
    }),
    o
  );
}
function fV(t) {
  return [
    "application/xhtml+xml",
    "application/xml",
    "image/svg+xml",
    "text/html",
    "text/xml",
  ].some((i) => t.startsWith(i));
}
function hV(t) {
  try {
    return JSON.parse(t);
  } catch {
    return null;
  }
}
function pV(t, e) {
  let i = Qs(t.status) ? null : e;
  return new Response(i, {
    status: t.status,
    statusText: t.statusText,
    headers: mV(t.getAllResponseHeaders()),
  });
}
function mV(t) {
  let e = new Headers(),
    i = t.split(/[\r\n]+/);
  for (let n of i) {
    if (n.trim() === "") continue;
    let [r, ...o] = n.split(": "),
      s = o.join(": ");
    e.append(r, s);
  }
  return e;
}
var NE = Symbol("isMockedResponse"),
  gV = uo(),
  bV = class {
    constructor(t, e) {
      (this.initialRequest = t),
        (this.logger = e),
        (this.method = "GET"),
        (this.url = null),
        (this.events = new Map()),
        (this.requestId = Vd()),
        (this.requestHeaders = new Headers()),
        (this.responseBuffer = new Uint8Array()),
        (this.request = kE(t, {
          setProperty: ([i, n], r) => {
            switch (i) {
              case "ontimeout": {
                let o = i.slice(2);
                return this.request.addEventListener(o, n), r();
              }
              default:
                return r();
            }
          },
          methodCall: ([i, n], r) => {
            var o;
            switch (i) {
              case "open": {
                let [s, a] = n;
                return (
                  typeof a > "u"
                    ? ((this.method = "GET"), (this.url = PE(s)))
                    : ((this.method = s), (this.url = PE(a))),
                  (this.logger = this.logger.extend(
                    `${this.method} ${this.url.href}`
                  )),
                  this.logger.info("open", this.method, this.url.href),
                  r()
                );
              }
              case "addEventListener": {
                let [s, a] = n;
                return (
                  this.registerEvent(s, a),
                  this.logger.info("addEventListener", s, a),
                  r()
                );
              }
              case "setRequestHeader": {
                let [s, a] = n;
                return (
                  this.requestHeaders.set(s, a),
                  this.logger.info("setRequestHeader", s, a),
                  r()
                );
              }
              case "send": {
                let [s] = n;
                s != null &&
                  (this.requestBody = typeof s == "string" ? Sm(s) : s),
                  this.request.addEventListener("load", () => {
                    if (typeof this.onResponse < "u") {
                      let c = pV(this.request, this.request.response);
                      this.onResponse.call(this, {
                        response: c,
                        isMockedResponse: NE in this.request,
                        request: a,
                        requestId: this.requestId,
                      });
                    }
                  });
                let a = this.toFetchApiRequest();
                (
                  ((o = this.onRequest) == null
                    ? void 0
                    : o.call(this, {
                        request: a,
                        requestId: this.requestId,
                      })) || Promise.resolve()
                ).finally(() => {
                  if (this.request.readyState < this.request.LOADING)
                    return (
                      this.logger.info(
                        "request callback settled but request has not been handled (readystate %d), performing as-is...",
                        this.request.readyState
                      ),
                      gV &&
                        this.request.setRequestHeader(
                          "X-Request-Id",
                          this.requestId
                        ),
                      r()
                    );
                });
                break;
              }
              default:
                return r();
            }
          },
        }));
    }
    registerEvent(t, e) {
      let n = (this.events.get(t) || []).concat(e);
      this.events.set(t, n), this.logger.info('registered event "%s"', t, e);
    }
    respondWith(t) {
      this.logger.info(
        "responding with a mocked response: %d %s",
        t.status,
        t.statusText
      ),
        Co(this.request, NE, !0),
        Co(this.request, "status", t.status),
        Co(this.request, "statusText", t.statusText),
        Co(this.request, "responseURL", this.url.href),
        (this.request.getResponseHeader = new Proxy(
          this.request.getResponseHeader,
          {
            apply: (n, r, o) => {
              if (
                (this.logger.info("getResponseHeader", o[0]),
                this.request.readyState < this.request.HEADERS_RECEIVED)
              )
                return (
                  this.logger.info("headers not received yet, returning null"),
                  null
                );
              let s = t.headers.get(o[0]);
              return (
                this.logger.info('resolved response header "%s" to', o[0], s), s
              );
            },
          }
        )),
        (this.request.getAllResponseHeaders = new Proxy(
          this.request.getAllResponseHeaders,
          {
            apply: () => {
              if (
                (this.logger.info("getAllResponseHeaders"),
                this.request.readyState < this.request.HEADERS_RECEIVED)
              )
                return (
                  this.logger.info(
                    "headers not received yet, returning empty string"
                  ),
                  ""
                );
              let r = Array.from(t.headers.entries()).map(
                ([o, s]) => `${o}: ${s}`
              ).join(`\r
`);
              return this.logger.info("resolved all response headers to", r), r;
            },
          }
        )),
        Object.defineProperties(this.request, {
          response: {
            enumerable: !0,
            configurable: !1,
            get: () => this.response,
          },
          responseText: {
            enumerable: !0,
            configurable: !1,
            get: () => this.responseText,
          },
          responseXML: {
            enumerable: !0,
            configurable: !1,
            get: () => this.responseXML,
          },
        });
      let e = t.headers.has("Content-Length")
        ? Number(t.headers.get("Content-Length"))
        : void 0;
      this.logger.info("calculated response body length", e),
        this.trigger("loadstart", { loaded: 0, total: e }),
        this.setReadyState(this.request.HEADERS_RECEIVED),
        this.setReadyState(this.request.LOADING);
      let i = () => {
        this.logger.info("finalizing the mocked response..."),
          this.setReadyState(this.request.DONE),
          this.trigger("load", {
            loaded: this.responseBuffer.byteLength,
            total: e,
          }),
          this.trigger("loadend", {
            loaded: this.responseBuffer.byteLength,
            total: e,
          });
      };
      if (t.body) {
        this.logger.info("mocked response has body, streaming...");
        let n = t.body.getReader(),
          r = () =>
            vt(this, null, function* () {
              let { value: o, done: s } = yield n.read();
              if (s) {
                this.logger.info("response body stream done!"), i();
                return;
              }
              o &&
                (this.logger.info("read response body chunk:", o),
                (this.responseBuffer = aV(this.responseBuffer, o)),
                this.trigger("progress", {
                  loaded: this.responseBuffer.byteLength,
                  total: e,
                })),
                r();
            });
        r();
      } else i();
    }
    responseBufferToText() {
      return Tm(this.responseBuffer);
    }
    get response() {
      if (
        (this.logger.info(
          "getResponse (responseType: %s)",
          this.request.responseType
        ),
        this.request.readyState !== this.request.DONE)
      )
        return null;
      switch (this.request.responseType) {
        case "json": {
          let t = hV(this.responseBufferToText());
          return this.logger.info("resolved response JSON", t), t;
        }
        case "arraybuffer": {
          let t = Sw(this.responseBuffer);
          return this.logger.info("resolved response ArrayBuffer", t), t;
        }
        case "blob": {
          let t =
              this.request.getResponseHeader("Content-Type") || "text/plain",
            e = new Blob([this.responseBufferToText()], { type: t });
          return (
            this.logger.info("resolved response Blob (mime type: %s)", e, t), e
          );
        }
        default: {
          let t = this.responseBufferToText();
          return (
            this.logger.info(
              'resolving "%s" response type as text',
              this.request.responseType,
              t
            ),
            t
          );
        }
      }
    }
    get responseText() {
      if (
        (qe(
          this.request.responseType === "" ||
            this.request.responseType === "text",
          "InvalidStateError: The object is in invalid state."
        ),
        this.request.readyState !== this.request.LOADING &&
          this.request.readyState !== this.request.DONE)
      )
        return "";
      let t = this.responseBufferToText();
      return this.logger.info('getResponseText: "%s"', t), t;
    }
    get responseXML() {
      if (
        (qe(
          this.request.responseType === "" ||
            this.request.responseType === "document",
          "InvalidStateError: The object is in invalid state."
        ),
        this.request.readyState !== this.request.DONE)
      )
        return null;
      let t = this.request.getResponseHeader("Content-Type") || "";
      return typeof DOMParser > "u"
        ? (console.warn(
            "Cannot retrieve XMLHttpRequest response body as XML: DOMParser is not defined. You are likely using an environment that is not browser or does not polyfill browser globals correctly."
          ),
          null)
        : fV(t)
        ? new DOMParser().parseFromString(this.responseBufferToText(), t)
        : null;
    }
    errorWith(t) {
      this.logger.info("responding with an error"),
        this.setReadyState(this.request.DONE),
        this.trigger("error"),
        this.trigger("loadend");
    }
    setReadyState(t) {
      if (
        (this.logger.info(
          "setReadyState: %d -> %d",
          this.request.readyState,
          t
        ),
        this.request.readyState === t)
      ) {
        this.logger.info("ready state identical, skipping transition...");
        return;
      }
      Co(this.request, "readyState", t),
        this.logger.info("set readyState to: %d", t),
        t !== this.request.UNSENT &&
          (this.logger.info('triggerring "readystatechange" event...'),
          this.trigger("readystatechange"));
    }
    trigger(t, e) {
      let i = this.request[`on${t}`],
        n = dV(this.request, t, e);
      this.logger.info('trigger "%s"', t, e || ""),
        typeof i == "function" &&
          (this.logger.info('found a direct "%s" callback, calling...', t),
          i.call(this.request, n));
      for (let [r, o] of this.events)
        r === t &&
          (this.logger.info(
            'found %d listener(s) for "%s" event, calling...',
            o.length,
            t
          ),
          o.forEach((s) => s.call(this.request, n)));
    }
    toFetchApiRequest() {
      this.logger.info("converting request to a Fetch API Request...");
      let t = new Request(this.url.href, {
          method: this.method,
          headers: this.requestHeaders,
          credentials: this.request.withCredentials ? "include" : "same-origin",
          body: ["GET", "HEAD"].includes(this.method) ? null : this.requestBody,
        }),
        e = kE(t.headers, {
          methodCall: ([i, n], r) => {
            switch (i) {
              case "append":
              case "set": {
                let [o, s] = n;
                this.request.setRequestHeader(o, s);
                break;
              }
              case "delete": {
                let [o] = n;
                console.warn(
                  `XMLHttpRequest: Cannot remove a "${o}" header from the Fetch API representation of the "${t.method} ${t.url}" request. XMLHttpRequest headers cannot be removed.`
                );
                break;
              }
            }
            return r();
          },
        });
      return (
        Co(t, "headers", e),
        this.logger.info("converted request to a Fetch API Request!", t),
        t
      );
    }
  };
function PE(t) {
  return typeof location > "u"
    ? new URL(t)
    : new URL(t.toString(), location.href);
}
function Co(t, e, i) {
  Reflect.defineProperty(t, e, { writable: !0, enumerable: !0, value: i });
}
function vV({ emitter: t, logger: e }) {
  return new Proxy(globalThis.XMLHttpRequest, {
    construct(n, r, o) {
      e.info("constructed new XMLHttpRequest");
      let s = Reflect.construct(n, r, o),
        a = Object.getOwnPropertyDescriptors(n.prototype);
      for (let c in a) Reflect.defineProperty(s, c, a[c]);
      let l = new bV(s, e);
      return (
        (l.onRequest = function (u) {
          return vt(this, arguments, function* ({ request: c, requestId: d }) {
            let { interactiveRequest: f, requestController: h } = Bd(c);
            this.logger.info("awaiting mocked response..."),
              t.once("request", ({ requestId: g }) => {
                g === d &&
                  h.responsePromise.state === "pending" &&
                  h.respondWith(void 0);
              });
            let p = yield Dt(() =>
              vt(this, null, function* () {
                this.logger.info(
                  'emitting the "request" event for %s listener(s)...',
                  t.listenerCount("request")
                ),
                  yield Ud(t, "request", { request: f, requestId: d }),
                  this.logger.info('all "request" listeners settled!');
                let g = yield h.responsePromise;
                return this.logger.info("event.respondWith called with:", g), g;
              })
            );
            if (p.error) {
              this.logger.info(
                "request listener threw an exception, aborting request...",
                p.error
              ),
                l.errorWith(p.error);
              return;
            }
            let m = p.data;
            if (typeof m < "u") {
              if (
                (this.logger.info(
                  "received mocked response: %d %s",
                  m.status,
                  m.statusText
                ),
                m.type === "error")
              ) {
                this.logger.info(
                  "received a network error response, rejecting the request promise..."
                ),
                  l.errorWith(new TypeError("Network error"));
                return;
              }
              return l.respondWith(m);
            }
            this.logger.info(
              "no mocked response received, performing request as-is..."
            );
          });
        }),
        (l.onResponse = function (h) {
          return vt(
            this,
            arguments,
            function* ({
              response: c,
              isMockedResponse: d,
              request: u,
              requestId: f,
            }) {
              this.logger.info(
                'emitting the "response" event for %s listener(s)...',
                t.listenerCount("response")
              ),
                t.emit("response", {
                  response: c,
                  isMockedResponse: d,
                  request: u,
                  requestId: f,
                });
            }
          );
        }),
        l.request
      );
    },
  });
}
var jE = class extends mo {
    constructor() {
      super(jE.interceptorSymbol);
    }
    checkEnvironment() {
      return typeof globalThis.XMLHttpRequest < "u";
    }
    setup() {
      let t = this.logger.extend("setup");
      t.info('patching "XMLHttpRequest" module...');
      let e = globalThis.XMLHttpRequest;
      qe(
        !e[Ln],
        'Failed to patch the "XMLHttpRequest" module: already patched.'
      ),
        (globalThis.XMLHttpRequest = vV({
          emitter: this.emitter,
          logger: this.logger,
        })),
        t.info(
          'native "XMLHttpRequest" module patched!',
          globalThis.XMLHttpRequest.name
        ),
        Object.defineProperty(globalThis.XMLHttpRequest, Ln, {
          enumerable: !0,
          configurable: !0,
          value: !0,
        }),
        this.subscriptions.push(() => {
          Object.defineProperty(globalThis.XMLHttpRequest, Ln, {
            value: void 0,
          }),
            (globalThis.XMLHttpRequest = e),
            t.info(
              'native "XMLHttpRequest" module restored!',
              globalThis.XMLHttpRequest.name
            );
        });
    }
  },
  $d = jE;
$d.interceptorSymbol = Symbol("xhr");
var yV = Object.defineProperty,
  _V = Object.defineProperties,
  xV = Object.getOwnPropertyDescriptors,
  VE = Object.getOwnPropertySymbols,
  wV = Object.prototype.hasOwnProperty,
  EV = Object.prototype.propertyIsEnumerable,
  BE = (t, e, i) =>
    e in t
      ? yV(t, e, { enumerable: !0, configurable: !0, writable: !0, value: i })
      : (t[e] = i),
  $m = (t, e) => {
    for (var i in e || (e = {})) wV.call(e, i) && BE(t, i, e[i]);
    if (VE) for (var i of VE(e)) EV.call(e, i) && BE(t, i, e[i]);
    return t;
  },
  zm = (t, e) => _V(t, xV(e)),
  Nt = (t, e, i) =>
    new Promise((n, r) => {
      var o = (l) => {
          try {
            a(i.next(l));
          } catch (c) {
            r(c);
          }
        },
        s = (l) => {
          try {
            a(i.throw(l));
          } catch (c) {
            r(c);
          }
        },
        a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
      a((i = i.apply(t, e)).next());
    });
function CV(t) {
  return new URL(t, location.href).href;
}
function Hm(t, e, i) {
  return (
    [t.active, t.installing, t.waiting]
      .filter((s) => s != null)
      .find((s) => i(s.scriptURL, e)) || null
  );
}
var DV = (t, ...e) =>
  Nt(void 0, [t, ...e], function* (i, n = {}, r) {
    let o = CV(i),
      s = yield navigator.serviceWorker
        .getRegistrations()
        .then((c) => c.filter((d) => Hm(d, o, r)));
    !navigator.serviceWorker.controller && s.length > 0 && location.reload();
    let [a] = s;
    if (a) return a.update().then(() => [Hm(a, o, r), a]);
    let l = yield Dt(() =>
      Nt(void 0, null, function* () {
        let c = yield navigator.serviceWorker.register(i, n);
        return [Hm(c, o, r), c];
      })
    );
    if (l.error) {
      if (l.error.message.includes("(404)")) {
        let d = new URL(n?.scope || "/", location.href);
        throw new Error(
          ee.formatMessage(`Failed to register a Service Worker for scope ('${d.href}') with script ('${o}'): Service Worker script does not exist at the given path.

Did you forget to run "npx msw init <PUBLIC_DIR>"?

Learn more about creating the Service Worker script: https://mswjs.io/docs/cli/init`)
        );
      }
      throw new Error(
        ee.formatMessage(
          `Failed to register the Service Worker:

%s`,
          l.error.message
        )
      );
    }
    return l.data;
  });
function UE(t = {}) {
  if (t.quiet) return;
  let e = t.message || "Mocking enabled.";
  console.groupCollapsed(
    `%c${ee.formatMessage(e)}`,
    "color:orangered;font-weight:bold;"
  ),
    console.log(
      "%cDocumentation: %chttps://mswjs.io/docs",
      "font-weight:bold",
      "font-weight:normal"
    ),
    console.log("Found an issue? https://github.com/mswjs/msw/issues"),
    t.workerUrl && console.log("Worker script URL:", t.workerUrl),
    t.workerScope && console.log("Worker scope:", t.workerScope),
    console.groupEnd();
}
function IV(t, e) {
  return Nt(this, null, function* () {
    var i, n;
    if (
      (t.workerChannel.send("MOCK_ACTIVATE"),
      yield t.events.once("MOCKING_ENABLED"),
      t.isMockingEnabled)
    ) {
      ee.warn(
        'Found a redundant "worker.start()" call. Note that starting the worker while mocking is already enabled will have no effect. Consider removing this "worker.start()" call.'
      );
      return;
    }
    (t.isMockingEnabled = !0),
      UE({
        quiet: e.quiet,
        workerScope: (i = t.registration) == null ? void 0 : i.scope,
        workerUrl: (n = t.worker) == null ? void 0 : n.scriptURL,
      });
  });
}
var SV = class {
  constructor(t) {
    this.port = t;
  }
  postMessage(t, ...e) {
    let [i, n] = e;
    this.port.postMessage({ type: t, data: i }, { transfer: n });
  }
};
function TV(t) {
  if (!["HEAD", "GET"].includes(t.method)) return t.body;
}
function MV(t) {
  return new Request(t.url, zm($m({}, t), { body: TV(t) }));
}
var AV = (t, e) => (i, n) =>
  Nt(void 0, null, function* () {
    var r;
    let o = new SV(i.ports[0]),
      s = n.payload.id,
      a = MV(n.payload),
      l = a.clone();
    try {
      let c;
      yield Ld(a, s, t.requestHandlers, e, t.emitter, {
        onPassthroughResponse() {
          o.postMessage("NOT_FOUND");
        },
        onMockedResponse(d, u) {
          return Nt(
            this,
            arguments,
            function* (f, { handler: h, parsedResult: p }) {
              let m = f.clone(),
                g = f.clone(),
                b = AE(f);
              if (t.supports.readableStreamTransfer) {
                let x = f.body;
                o.postMessage(
                  "MOCK_RESPONSE",
                  zm($m({}, b), { body: x }),
                  x ? [x] : void 0
                );
              } else {
                let x = f.body === null ? null : yield m.arrayBuffer();
                o.postMessage("MOCK_RESPONSE", zm($m({}, b), { body: x }));
              }
              e.quiet ||
                t.emitter.once("response:mocked", () => {
                  h.log({ request: l, response: g, parsedResult: p });
                });
            }
          );
        },
      });
    } catch (c) {
      c instanceof Error &&
        (ee.error(
          `Uncaught exception in the request handler for "%s %s":

%s

This exception has been gracefully handled as a 500 response, however, it's strongly recommended to resolve this error, as it indicates a mistake in your code. If you wish to mock an error response, please see this guide: https://mswjs.io/docs/recipes/mocking-error-responses`,
          a.method,
          a.url,
          (r = c.stack) != null ? r : c
        ),
        o.postMessage("MOCK_RESPONSE", {
          status: 500,
          statusText: "Request Handler Error",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: c.name,
            message: c.message,
            stack: c.stack,
          }),
        }));
    }
  });
function RV(t, e) {
  return Nt(this, null, function* () {
    t.workerChannel.send("INTEGRITY_CHECK_REQUEST");
    let { payload: i } = yield t.events.once("INTEGRITY_CHECK_RESPONSE");
    if (i !== "c5f7f8e188b673ea4e677df7ea3c5a39")
      throw new Error(
        `Currently active Service Worker (${i}) is behind the latest published one (c5f7f8e188b673ea4e677df7ea3c5a39).`
      );
    return e;
  });
}
function OV(t) {
  let e = window.XMLHttpRequest.prototype.send;
  window.XMLHttpRequest.prototype.send = function (...n) {
    Dt(() => t).then(() => {
      (window.XMLHttpRequest.prototype.send = e), this.send(...n);
    });
  };
  let i = window.fetch;
  window.fetch = (...n) =>
    Nt(this, null, function* () {
      return yield Dt(() => t), (window.fetch = i), window.fetch(...n);
    });
}
function kV(t) {
  return (e, i) => {
    var n;
    let { payload: r } = i;
    if ((n = r.type) != null && n.includes("opaque")) return;
    let o =
      r.status === 0
        ? Response.error()
        : new Response(Qs(r.status) ? null : r.body, r);
    t.emitter.emit(r.isMockedResponse ? "response:mocked" : "response:bypass", {
      response: o,
      request: null,
      requestId: r.requestId,
    });
  };
}
function NV(t, e) {
  !e?.quiet &&
    !location.href.startsWith(t.scope) &&
    ee.warn(`Cannot intercept requests on this page because it's outside of the worker's scope ("${t.scope}"). If you wish to mock API requests on this page, you must resolve this scope issue.

- (Recommended) Register the worker at the root level ("/") of your application.
- Set the "Service-Worker-Allowed" response header to allow out-of-scope workers.`);
}
var PV = (t) =>
  function (i, n) {
    let o = (() =>
      Nt(this, null, function* () {
        t.events.removeAllListeners(),
          t.workerChannel.on("REQUEST", AV(t, i)),
          t.workerChannel.on("RESPONSE", kV(t));
        let s = yield DV(
            i.serviceWorker.url,
            i.serviceWorker.options,
            i.findWorker
          ),
          [a, l] = s;
        if (!a) {
          let d = n?.findWorker
            ? ee.formatMessage(
                `Failed to locate the Service Worker registration using a custom "findWorker" predicate.

Please ensure that the custom predicate properly locates the Service Worker registration at "%s".
More details: https://mswjs.io/docs/api/setup-worker/start#findworker
`,
                i.serviceWorker.url
              )
            : ee.formatMessage(
                `Failed to locate the Service Worker registration.

This most likely means that the worker script URL "%s" cannot resolve against the actual public hostname (%s). This may happen if your application runs behind a proxy, or has a dynamic hostname.

Please consider using a custom "serviceWorker.url" option to point to the actual worker script location, or a custom "findWorker" option to resolve the Service Worker registration manually. More details: https://mswjs.io/docs/api/setup-worker/start`,
                i.serviceWorker.url,
                location.host
              );
          throw new Error(d);
        }
        (t.worker = a),
          (t.registration = l),
          t.events.addListener(window, "beforeunload", () => {
            a.state !== "redundant" && t.workerChannel.send("CLIENT_CLOSED"),
              window.clearInterval(t.keepAliveInterval);
          });
        let c = yield Dt(() => RV(t, a));
        return (
          c.error &&
            ee.error(`Detected outdated Service Worker: ${c.error.message}

The mocking is still enabled, but it's highly recommended that you update your Service Worker by running:

$ npx msw init <PUBLIC_DIR>

This is necessary to ensure that the Service Worker is in sync with the library to guarantee its stability.
If this message still persists after updating, please report an issue: https://github.com/open-draft/msw/issues      `),
          (t.keepAliveInterval = window.setInterval(
            () => t.workerChannel.send("KEEPALIVE_REQUEST"),
            5e3
          )),
          NV(l, t.startOptions),
          l
        );
      }))().then((s) =>
      Nt(this, null, function* () {
        let a = s.installing || s.waiting;
        return (
          a &&
            (yield new Promise((l) => {
              a.addEventListener("statechange", () => {
                if (a.state === "activated") return l();
              });
            })),
          yield IV(t, i).catch((l) => {
            throw new Error(`Failed to enable mocking: ${l?.message}`);
          }),
          s
        );
      })
    );
    return i.waitUntilReady && OV(o), o;
  };
function HE(t = {}) {
  t.quiet ||
    console.log(
      `%c${ee.formatMessage("Mocking disabled.")}`,
      "color:orangered;font-weight:bold;"
    );
}
var FV = (t) =>
    function () {
      var i;
      if (!t.isMockingEnabled) {
        ee.warn(
          'Found a redundant "worker.stop()" call. Note that stopping the worker while mocking already stopped has no effect. Consider removing this "worker.stop()" call.'
        );
        return;
      }
      t.workerChannel.send("MOCK_DEACTIVATE"),
        (t.isMockingEnabled = !1),
        window.clearInterval(t.keepAliveInterval),
        HE({ quiet: (i = t.startOptions) == null ? void 0 : i.quiet });
    },
  LV = {
    serviceWorker: {
      url: "/tesla-configurator/mockServiceWorker.js",
      options: null,
    },
    quiet: !1,
    waitUntilReady: !0,
    onUnhandledRequest: "warn",
    findWorker(t, e) {
      return t === e;
    },
  };
function jV(t, e) {
  let i = new yd({ name: "fallback", interceptors: [new Hd(), new $d()] });
  return (
    i.on("request", (n) =>
      Nt(this, [n], function* ({ request: r, requestId: o }) {
        let s = r.clone(),
          a = yield Ld(r, o, t.requestHandlers, e, t.emitter, {
            onMockedResponse(l, { handler: c, parsedResult: d }) {
              e.quiet ||
                t.emitter.once("response:mocked", ({ response: u }) => {
                  c.log({ request: s, response: u, parsedResult: d });
                });
            },
          });
        a && r.respondWith(a);
      })
    ),
    i.on(
      "response",
      ({ response: n, isMockedResponse: r, request: o, requestId: s }) => {
        t.emitter.emit(r ? "response:mocked" : "response:bypass", {
          response: n,
          request: o,
          requestId: s,
        });
      }
    ),
    i.apply(),
    i
  );
}
function VV(t) {
  return function (i) {
    return Nt(this, null, function* () {
      (t.fallbackInterceptor = jV(t, i)),
        UE({ message: "Mocking enabled (fallback mode).", quiet: i.quiet });
    });
  };
}
function BV(t) {
  return function () {
    var i, n;
    (i = t.fallbackInterceptor) == null || i.dispose(),
      HE({ quiet: (n = t.startOptions) == null ? void 0 : n.quiet });
  };
}
function UV() {
  try {
    let t = new ReadableStream({ start: (i) => i.close() });
    return new MessageChannel().port1.postMessage(t, [t]), !0;
  } catch {
    return !1;
  }
}
var HV = class extends dd {
  constructor(...t) {
    super(...t),
      (this.startHandler = null),
      (this.stopHandler = null),
      qe(
        !uo(),
        ee.formatMessage(
          "Failed to execute `setupWorker` in a non-browser environment. Consider using `setupServer` for Node.js environment instead."
        )
      ),
      (this.listeners = []),
      (this.context = this.createWorkerContext());
  }
  createWorkerContext() {
    let t = {
      isMockingEnabled: !1,
      startOptions: null,
      worker: null,
      registration: null,
      requestHandlers: this.currentHandlers,
      emitter: this.emitter,
      workerChannel: {
        on: (e, i) => {
          this.context.events.addListener(
            navigator.serviceWorker,
            "message",
            (n) => {
              if (n.source !== this.context.worker) return;
              let r = n.data;
              r && r.type === e && i(n, r);
            }
          );
        },
        send: (e) => {
          var i;
          (i = this.context.worker) == null || i.postMessage(e);
        },
      },
      events: {
        addListener: (e, i, n) => (
          e.addEventListener(i, n),
          this.listeners.push({ eventType: i, target: e, callback: n }),
          () => {
            e.removeEventListener(i, n);
          }
        ),
        removeAllListeners: () => {
          for (let { target: e, eventType: i, callback: n } of this.listeners)
            e.removeEventListener(i, n);
          this.listeners = [];
        },
        once: (e) => {
          let i = [];
          return new Promise((n, r) => {
            let o = (s) => {
              try {
                let a = s.data;
                a.type === e && n(a);
              } catch (a) {
                r(a);
              }
            };
            i.push(
              this.context.events.addListener(
                navigator.serviceWorker,
                "message",
                o
              ),
              this.context.events.addListener(
                navigator.serviceWorker,
                "messageerror",
                r
              )
            );
          }).finally(() => {
            i.forEach((n) => n());
          });
        },
      },
      supports: {
        serviceWorkerApi:
          !("serviceWorker" in navigator) || location.protocol === "file:",
        readableStreamTransfer: UV(),
      },
    };
    return (
      Object.defineProperties(t, {
        requestHandlers: { get: () => this.currentHandlers },
      }),
      (this.startHandler = t.supports.serviceWorkerApi ? VV(t) : PV(t)),
      (this.stopHandler = t.supports.serviceWorkerApi ? BV(t) : FV(t)),
      t
    );
  }
  start() {
    return Nt(this, arguments, function* (t = {}) {
      return (
        (this.context.startOptions = Um(LV, t)),
        yield this.startHandler(this.context.startOptions, t)
      );
    });
  }
  stop() {
    super.dispose(),
      this.context.events.removeAllListeners(),
      this.context.emitter.removeAllListeners(),
      this.stopHandler();
  }
};
function $E(...t) {
  return new HV(...t);
}
i_(aw, Xx).catch((t) => console.error(t));
var $V = [
    Dd.get("/options/:id", ({ params: t }) => {
      let e = {
        S: {
          configs: [
            {
              id: 1,
              description: "Dual Motor All-Wheel Drive",
              range: 405,
              speed: 149,
              price: 74990,
            },
            {
              id: 2,
              description: "Plaid - Tri Motor All-Wheel Drive",
              range: 396,
              speed: 200,
              price: 89990,
            },
          ],
          towHitch: !1,
          yoke: !0,
        },
        X: {
          configs: [
            {
              id: 1,
              description: "Dual Motor All-Wheel Drive",
              range: 348,
              speed: 149,
              price: 79990,
            },
            {
              id: 2,
              description: "Plaid - Tri Motor All-Wheel Drive",
              range: 333,
              speed: 149,
              price: 94990,
            },
          ],
          towHitch: !0,
          yoke: !0,
        },
        C: {
          configs: [
            {
              id: 1,
              description: "Rear Wheel Drive",
              range: 250,
              speed: 110,
              price: 60990,
            },
            {
              id: 2,
              description: "Dual Motor All-Wheel Drive",
              range: 340,
              speed: 112,
              price: 79990,
            },
            {
              id: 3,
              description: "Cyberbeast - Tri Motor All-Wheel Drive",
              range: 320,
              speed: 130,
              price: 99990,
            },
          ],
          towHitch: !0,
          yoke: !0,
        },
        3: {
          configs: [
            {
              id: 1,
              description: "Rear-Wheel Drive",
              range: 272,
              speed: 140,
              price: 38990,
            },
            {
              id: 2,
              description: "Long Range - Dual Motor All-Wheel Drive",
              range: 333,
              speed: 145,
              price: 45990,
            },
            {
              id: 3,
              description: "Performance - Dual Motor All-Wheel Drive",
              range: 315,
              speed: 162,
              price: 50990,
            },
          ],
          towHitch: !1,
          yoke: !1,
        },
        Y: {
          configs: [
            {
              id: 1,
              description: "Rear-Wheel Drive",
              range: 260,
              speed: 135,
              price: 43990,
            },
            {
              id: 2,
              description: "Long Range - Dual Motor All-Wheel Drive",
              range: 330,
              speed: 135,
              price: 48990,
            },
            {
              id: 3,
              description: "Performance - Dual Motor All-Wheel Drive",
              range: 303,
              speed: 155,
              price: 52490,
            },
          ],
          towHitch: !0,
          yoke: !1,
        },
      };
      return ia.json(e[t.id.toUpperCase()]);
    }),
    Dd.get("/models", ({ request: t, params: e, cookies: i }) =>
      ia.json([
        {
          code: "S",
          description: "Model S",
          colors: [
            { code: "white", description: "Pearl White Multi-Coat", price: 0 },
            { code: "black", description: "Solid Black", price: 0 },
            { code: "blue", description: "Deep Blue Metallic", price: 0 },
            { code: "grey", description: "Stealth Grey", price: 0 },
            { code: "red", description: "Ultra Red", price: 0 },
          ],
        },
        {
          code: "X",
          description: "Model X",
          colors: [
            { code: "white", description: "Pearl White Multi-Coat", price: 0 },
            { code: "black", description: "Solid Black", price: 0 },
            { code: "blue", description: "Deep Blue Metallic", price: 0 },
            { code: "grey", description: "Stealth Grey", price: 0 },
            { code: "red", description: "Ultra Red", price: 0 },
          ],
        },
        {
          code: "C",
          description: "Cybertruck",
          colors: [
            { code: "grey", description: "Stainless Steel", price: 0 },
            { code: "black", description: "Satin Black", price: 6500 },
            { code: "white", description: "Satin White", price: 6500 },
          ],
        },
        {
          code: "3",
          description: "Model 3",
          colors: [
            {
              code: "white",
              description: "Pearl White Multi-Coat",
              price: 1e3,
            },
            { code: "black", description: "Solid Black", price: 1500 },
            { code: "blue", description: "Deep Blue Metallic", price: 1e3 },
            { code: "grey", description: "Midnight Silver Metallic", price: 0 },
            { code: "red", description: "Red Multi-Coat", price: 2e3 },
          ],
        },
        {
          code: "Y",
          description: "Model Y",
          colors: [
            {
              code: "white",
              description: "Pearl White Multi-Coat",
              price: 1e3,
            },
            { code: "black", description: "Solid Black", price: 2e3 },
            { code: "blue", description: "Deep Blue Metallic", price: 1e3 },
            { code: "grey", description: "Midnight Silver Metallic", price: 0 },
            { code: "red", description: "Red Multi-Coat", price: 2e3 },
          ],
        },
      ])
    ),
  ],
  zV = $E(...$V);
zV.start();
export { zV as worker };
