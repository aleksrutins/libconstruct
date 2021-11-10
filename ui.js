export function uiText(props) {
    return Object.keys(props).map(key => {
        if (typeof props[key] == 'string') return `{ ${key}: ${props[key]} }`;
        if (props[key] instanceof Renderable) return `{ ${key}: ${props[key].render()} }`;
    }).join('  ');
}
export class Renderable {
    render() {
        return '';
    }
}
export class TextBlock extends Renderable {
    constructor(text = '', color) {
        super();
        this.text = text.toString();
        this.color = color;
    }
    render() {
        return (this.color ? `[color=${this.color}]` : '') + this.text + (this.color ? '[/color]' : '');
    }
}
export class Range extends Renderable {
    constructor(current, max) {
        super();
        this.cur = current;
        this.max = max;
    }
    render() {
        return `[b]${this.cur}[/b]/[b]${this.max}[/b]`;
    }
}
export class HealthBar extends Renderable {
    constructor(current, max, char = '❤', activeColor = 'darkred', inactiveColor = 'gray') {
        super();
        Object.assign(this, { current, max, char, activeColor, inactiveColor });
    }
    render() {
        let rendered = '';
        for (let i = 0; i < this.max; i++) {
            if (i < this.current) {
                rendered += `[color=${this.activeColor}]${this.char}[/color]`;
            } else {
                rendered += `[color=${this.inactiveColor}]${this.char}[/color]`;
            }
        }
        return rendered;
    }
}