import { customComponent } from '@sagemodeninja/custom-component'
import { html, unsafeCSS, LitElement, PropertyValues } from 'lit'
import { property, query } from 'lit/decorators.js'
import styles from './explorer-item.component.scss'

@customComponent('explorer-item')
export class ExplorerItem extends LitElement {
    static styles = unsafeCSS(styles)

    @query('#input')
    private _input: HTMLInputElement

    @property()
    public name: string

    @property({ type: Boolean })
    public editMode: boolean

    public render() {
        return html`
            <div @keydown=${this.onKeyDown} tabindex="0" ?data-editable=${this.editMode}>
                <span id="name">${this.name}</span>
                <input id="input" @focusout=${this.exitEditMode} />
            <div>
            <div>
                <slot></slot>
            </div>
        `
    }

    override updated(changes: PropertyValues): void {
        if (changes.has('editMode')) {
            if (this.editMode) {
                this._input.focus()
            }
        }
    }

    private onKeyDown(e: KeyboardEvent) {
        e.stopPropagation()

        if (e.key === 'Escape') {
            this.exitEditMode()
            return
        }

        if (e.key === 'Enter') {
            if (!this.editMode)
                this.enterEditMode()
            else
                this.exitEditMode()
        }
    }

    private enterEditMode() {
        this.editMode = true
        this._input.value = this.name
    }

    private exitEditMode() {
        this.editMode = false
        this.name = this._input.value
    }
}