import { Lightning, Utils } from 'wpe-lightning-sdk';
import { List } from '../components';

export default class Main extends Lightning.Component {
    static _template() {
        const timingFunction = 'cubic-bezier(0.20, 1.00, 0.80, 1.00)';

        return {
            Lists: {
                x: 75,
                y: 260,
                zIndex: 3,
            },
            Logo: {
                src: Utils.asset('images/logo.png'),
                mount: 0.5,
                x: 75 * 2,
                y: -100,
                alpha: 0.0001,
                scale: 0.5,
                transitions: {
                    alpha: { duration: 1, timingFunction },
                    y: { duration: 1, timingFunction },
                },
            },
        };
    }

    _init() {
        this._index = 0;
    }

    _firstEnable() {
        this.tag('Logo').on('txLoaded', () => {
            this.patch({
                Logo: { smooth: { alpha: 1, y: 75 } },
            });
        });
    }

    set movies(movies) {
        this.moviesList = new List(this.stage);
        this.tag('Lists').childList.clear();
        this.tag('Lists').childList.add(this.moviesList);
        this.moviesList.movies = movies;
    }

    _unfocus() {
        // @todo
    }

    _getFocused() {
        return this.moviesList;
    }
}
