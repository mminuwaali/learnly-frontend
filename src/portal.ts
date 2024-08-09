// src/portalApp.ts
import stores from "./stores";
import { createApp, type App } from 'vue'

class PortalApp {
    private app: App | null = null
    private portalElement: Element | null = null

    constructor() {
        this.portalElement = document.getElementById('portal')
    }

    mount(component: any) {
        if (this.app) this.unmount()

        this.app = createApp(component)
        this.app.use(stores)
        this.app.mount(this.portalElement!)
    }

    unmount() {
        if (this.app) {
            this.app.unmount()
            this.app = null
        }
    }
}

export const portalApp = new PortalApp()
