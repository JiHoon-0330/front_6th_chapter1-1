const privateClass = Symbol("privateClass");

class Events {
  #events = new Map([
    // ["click", new Map([["componentId", new Set()]])],
    // ["change", new Map([["componentId", new Set()]])],
  ]);
  #abortControllerMap = new Map([
    // ["click", new AbortController()],
    // ["change", new AbortController()],
  ]);

  constructor(symbol) {
    if (privateClass !== symbol) {
      throw new Error("Cannot instantiate directly");
    }
  }

  addEvent({ eventName, comopnentId, callback, selector }) {
    if (this.#events.has(eventName)) {
      const eventMap = this.#events.get(eventName);
      if (eventMap.has(comopnentId)) {
        eventMap.get(comopnentId).add({ callback, selector });
      } else {
        eventMap.set(comopnentId, new Set([{ callback, selector }]));
      }
    } else {
      this.setListener(eventName);
      const eventMap = new Map([[comopnentId, new Set([{ callback, selector }])]]);
      this.#events.set(eventName, eventMap);
    }
  }

  setListener(eventName) {
    const abortController = new AbortController();
    this.#abortControllerMap.get(eventName)?.abort();
    this.#abortControllerMap.set(eventName, abortController);
    document.addEventListener(
      eventName,
      (e) => {
        const eventMap = this.#events.get(eventName);

        if (!eventMap) {
          return;
        }

        for (const [componentId, handlers] of eventMap) {
          if (!e.target.closest(componentId)) {
            continue;
          }

          for (const { callback, selector } of handlers) {
            const $closest = e.target.closest(selector);

            if ($closest) {
              callback(e, $closest);
              break;
            }
          }
        }
      },
      abortController,
    );
  }

  removeEvent({ comopnentId, eventName }) {
    if (!this.#events.has(eventName)) {
      return;
    }

    this.#events.get(eventName).delete(comopnentId);
    if (!this.#events.get(eventName).size) {
      this.#abort(eventName);
    }
  }

  removeComponentEvents(comopnentId) {
    this.#events.forEach((eventMap, eventName) => {
      eventMap.delete(comopnentId);
      if (!eventMap.size) {
        this.#abort(eventName);
      }
    });
  }

  #abort(eventName) {
    this.#abortControllerMap.get(eventName)?.abort();
    this.#abortControllerMap.delete(eventName);
    this.#events.delete(eventName);
  }

  dispose() {
    this.#abortControllerMap.forEach((v) => v.abort());
  }
}

const events = new Events(privateClass);

export class ComponentEvents {
  #componentId;
  constructor(componentId) {
    this.#componentId = componentId;
  }

  addEvent({ eventName, selector, callback }) {
    events.addEvent({
      comopnentId: this.#componentId,
      eventName,
      selector,
      callback,
    });
  }

  removeEvent({ eventName }) {
    events.removeEvent({
      comopnentId: this.#componentId,
      eventName,
    });
  }

  dispose() {
    events.removeComponentEvents(this.#componentId);
  }
}
