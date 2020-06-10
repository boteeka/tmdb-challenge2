import { Lightning } from 'wpe-lightning-sdk';
import { getImgUrl } from '../../lib/tools';

export default class Level extends Lightning.Component {
    static _template() {
        return {
            alpha: 0.6,
            w: 200,
            h: 300,
            zIndex: 0,
            Image: {},
            Title: {
                y: 310,
                x: 5,
                text: {
                    w: 180,
                    fontFace: 'SourceSansPro-Regular',
                    fontSize: 24,
                    textAlign: 'center',
                    textOverflow: 'ellipsis',
                },
            },
            RoundRectangle: {
                x: -2,
                y: -2,
                alpha: 0,
                zIndex: 1,
                texture: lng.Tools.getRoundRect(185, 278, 2, 2, 0x660fb6de, false),
            },
        };
    }

    set item(v) {
        this.patch({
            Image: {
                src: getImgUrl(v.poster_path),
            },
            Title: {
                text: {
                    text: v.title || v.original_name,
                },
            },
        });
    }

    _focus() {
        this.patch({
            smooth: {
                alpha: 1,
                scale: 1.5,
                zIndex: 1,
                y: 60,
            },
        });
        this.tag('RoundRectangle').patch({
            alpha: 1,
        });
    }

    _unfocus() {
        this.patch({
            smooth: {
                alpha: 0.6,
                scale: 1,
                zIndex: 0,
            },
        });
        this.tag('RoundRectangle').patch({
            alpha: 0,
        });
    }
}
