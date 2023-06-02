import Client from "../../../client/client";

export default function init(self: Window | any, __dynamic: any) {
    if (!__dynamic) __dynamic = self.__dynamic;

    self.__dynamic.define = new self.Proxy(self.Object.defineProperty, {
        apply(t: any, g: any, a: any) {
            try {
                return Reflect.apply(t, g, a);
            } catch(e) {
                console.log(e)
                return a[2];
            }
        }
    });

    if (self.parent) __dynamic.parent = self.parent;
    if (self.top) __dynamic.top = self.top;

    if (self.document) __dynamic.elements = {
        attributes: ['src', 'href', 'srcset', 'action', 'data', 'integrity', 'nonce', 'imagesrcset'],
        iframeSrc: Object.getOwnPropertyDescriptor(self.HTMLIFrameElement.prototype, 'src'),
        contentWindow: Object.getOwnPropertyDescriptor(self.HTMLIFrameElement.prototype, 'contentWindow'),
        innerHTML: Object.getOwnPropertyDescriptor(self.Element.prototype, 'innerHTML'),
        outerHTML: Object.getOwnPropertyDescriptor(self.Element.prototype, 'outerHTML'),

        setAttribute: self.Element.prototype.setAttribute,
        getAttribute: self.Element.prototype.getAttribute,
        removeAttribute: self.Element.prototype.removeAttribute,
        hasAttribute: self.Element.prototype.hasAttribute,
        cloneNode: self.Node.prototype.cloneNode,
        
        config: [
            {
                "elements": [self.HTMLScriptElement, self.HTMLIFrameElement, self.HTMLEmbedElement, self.HTMLInputElement, self.HTMLTrackElement, self.HTMLMediaElement,self.HTMLSourceElement, self.Image, self.HTMLImageElement],
                "tags": ['src'],
                "action": "url"
            },
            {
                "elements": [self.HTMLSourceElement, self.HTMLImageElement],
                "tags": ['srcset'],
                "action": "srcset"
            },
            {
                "elements": [self.HTMLAnchorElement, self.HTMLLinkElement, self.HTMLAreaElement, self.SVGImageElement, self.HTMLBaseElement],
                "tags": ['href'],
                "action": "url"
            },
            {
                "elements": [self.HTMLIFrameElement],
                "tags": ['contentWindow'],
                "action": "window"
            },
            {
                "elements": [self.HTMLIFrameElement],
                "tags": ['contentDocument'],
                "action": "window"
            },
            {
                "elements": [self.HTMLFormElement],
                "tags": ['action'],
                "action": "url"
            }, 
            {
                "elements": [self.HTMLObjectElement],
                "tags": ['data'],
                "action": "url",
            },
            {
                "elements": [self.HTMLScriptElement, self.HTMLLinkElement],
                "tags": ['integrity'],
                "action": "rewrite",
                "new": "nointegrity",
            },
            {
                "elements": [self.HTMLScriptElement, self.HTMLLinkElement],
                "tags": ['nonce'],
                "action": "rewrite",
                "new": "nononce",
            },
            {
                "elements": [self.HTMLIFrameElement],
                "tags": ['contentWindow', 'contentDocument'],
                "action": "window", 
            },
            {
                "elements": [self.HTMLIFrameElement],
                "tags": ['srcdoc'],
                "action": "html",
            },
            {
                "elements": [self.HTMLElement],
                "tags": ['style'],
                "action": "css"
            },
            {
                "elements": [self.HTMLLinkElement],
                "tags": ['imageSrcset'],
                "action": "srcset"
            },
        ],

        createGetter: (prop: any) => {return {get(this: any): any {return (new URL(this.href||self.__dynamic$location.href) as any)[prop];},set(val: any) {return;}}},
        client: Client
    };

    if (self.document) __dynamic.cookie = {
        str: self.__dynamic$cookie||'',
        desc: Object.getOwnPropertyDescriptor(self.Document.prototype, 'cookie')
    };

    if (self.XMLHttpRequest) __dynamic.http = {
        XMLResponseURL: Object.getOwnPropertyDescriptor(self.XMLHttpRequest.prototype, 'responseURL'),
        ResponseURL: Object.getOwnPropertyDescriptor(self.Response.prototype, 'url'),
        RequestURL: Object.getOwnPropertyDescriptor(self.Request.prototype, 'url'),
        XMLHttpRequest: self.XMLHttpRequest,
    }

    if (self.Storage) (self.__dynamic.storage = {
        localStorage: self.localStorage,
        sessionStorage: self.sessionStorage,
        keys: {
            localStorage: Object.keys(self.localStorage),
            sessionStorage: Object.keys(self.sessionStorage)
        },
        methods: ['getItem', 'setItem', 'removeItem', 'clear', 'length', 'keys', 'values', 'entries', 'forEach', 'hasOwnProperty', 'toString', 'toLocaleString', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor', 'key'],
    }, self.__dynamic.storage.cloned = {
        localStorage: self.__dynamic.util.clone(self.__dynamic.storage.localStorage),
        sessionStorage: self.__dynamic.util.clone(self.__dynamic.storage.sessionStorage)
    });

    if (self.__dynamic$config.tab) {
        if (self.__dynamic$config.tab['title']) {
            document.title = self.__dynamic$config.tab.title;
            self.__dynamic.define(self.document, 'title', {
                get() {
                    return self.__dynamic$config.tab.title;
                },
                set(val: any) {
                    return val;
                }
            });
        }

        if (self.__dynamic$config.tab['icon']) {
            self.__dynamic$icon = self.__dynamic$config.tab.icon;
        }

        if (self.__dynamic$config.tab['ua']) {
            self.__dynamic.define(self.navigator, 'userAgent', {
                get() {
                    return self.__dynamic$config.tab.ua;
                },
                set() {}
            });
        }
    }
}