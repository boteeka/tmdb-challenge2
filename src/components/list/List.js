import { Lightning } from 'wpe-lightning-sdk';
import Item from '../item/Item';

export default class List extends Lightning.Component {
    static _template() {
        return {
            Label: {
                y: 30,
                text: { text: '', fontFace: 'SourceSansPro-Regular' },
                transitions: {
                    alpha: { duration: 0.2 },
                },
            },
            Movies: {
                y: 100,
                transitions: {
                    x: { duration: 0.1 },
                },
            },
        };
    }

    _init() {
        this._index = 0;
        this.assets = [];
    }

    _handleLeft() {
        this.setIndex(this._index - 1);
    }

    _handleRight() {
        this.setIndex(this._index + 1);
    }

    setIndex(index) {
        let newIndex = index;

        if (index < 0) {
            newIndex = 0;
        }

        if (index > this.assets.length - 1) {
            newIndex = this.assets.length - 1;
        }

        if (newIndex === this._index) {
            return;
        }

        this._index = newIndex;
        this.label = this.assets[newIndex].title || this.assets[newIndex].original_name;

        this.tag('Movies').setSmooth('x', Math.max(-8 * 1.5 * 200, -newIndex * 200));
    }

    set label(title) {
        this.tag('Label').patch({
            text: title,
            alpha: 0.5,
        });
        this.tag('Label').setSmooth('alpha', 1);
    }

    set movies(v) {
        this.assets = v;
        this.tag('Movies').children = this.assets.map((el, idx) => {
            return {
                type: Item,
                item: el,
                x: 200 * idx,
            };
        });
    }

    get items() {
        return this.tag('Movies').children;
    }

    get activeItem() {
        return this.tag('Movies').children ? this.tag('Movies').children[this._index] : null;
    }

    _focus() {
        this.label = this.assets[this._index].title;
    }

    _getFocused() {
        return this.activeItem;
    }
}
