import { customComponent } from '@sagemodeninja/custom-component'
import { html, unsafeCSS, LitElement } from 'lit'
import { Table } from '@/entities'
import styles from './explorer-panel.component.scss'

@customComponent('explorer-panel')
export class ExplorerPanel extends LitElement {
    static styles = unsafeCSS(styles)

    private _tables: Table[] = []

    public render() {
        return html`
            <div id="header">
                <h1 id="title">Explorer</h1>
                <button @click="${this.onAddClick}">+</button>
            </div>
            <div id="body">
                ${this.renderTables()}
            </div>
        `
    }

    private onAddClick() {
        this._tables.push({
            name: 'Sample Table',
            columns: []
        })
        this.requestUpdate()
    }

    private renderTables() {
        return this._tables.map(t => html`
            <explorer-item name="${t.name}">
            </explorer-item>
        `)
    }
}