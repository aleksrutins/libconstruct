function styleBBCode(text, styles) {
    let tagNames = {
        'color': 'color',
        'backColor': 'background-color'
    }
    let beginTags = [];
    let endTags = [];
    for(let style in styles) {
        if(tagNames[style]) {
            beginTags.push(`[${tagNames[style]}=${styles[style]}]`);
            endTags.unshift(`[/${tagNames[style]}]`);
        }
    }
    return beginTags.join('') + text + endTags.join('');
}

export function uiText(item) {
    if(item instanceof Array) {
        return new Box(item).render();
    } else if(item instanceof Renderable) {
        return item.render();
    } else {
        return '';
    }
}
export class Renderable {
    text = '';
    get content() {
        return this.text;
    }
    /**
     * @type {{color: string, backColor: string}}
     */
    style = {};
    styles(style) {
        this.style = style;
        return this;
    }
    render() {
        return styleBBCode(this.content, this.style);
    }
}

export class TextBlock extends Renderable {
    constructor(text = '') {
        super();
        this.text = text.toString();
    }
}
export class Range extends Renderable {
    constructor(current, max) {
        super();
        this.content = `[b]${current}[/b]/[b]${max}[/b]`;
    }
}
export class HealthBar extends Renderable {
    constructor(current, max, char = '❤', activeColor = 'darkred', inactiveColor = 'gray') {
        super();
        Object.assign(this, { current, max, char, activeColor, inactiveColor });
    }
    get content() {
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
export class ValueDisplay extends Renderable {
    constructor(props) {
        super();
        this.props = props;
    }
    get content() {
        return Object.keys(props).map(key => {
            if (typeof props[key] == 'string') return `{ ${key}: ${props[key]} }`;
            if (props[key] instanceof Renderable) return `{ ${key}: ${props[key].render()} }`;
        }).join('  ');
    }
}
export class Box extends Renderable {
    constructor(items) {
        super();
        this.items = items;
    }
    get content() {
        return this.items.map(item => {
            if(item instanceof Renderable) {
                return item.render();
            } else {
                return '';
            }
        }).join(' ');
    }
}