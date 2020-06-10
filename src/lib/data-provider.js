import { Router } from 'wpe-lightning-sdk';
import { getMovies } from './api';

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
 */
export default () => {
    Router.boot(async () => {
        // this will always be called
    });

    Router.before(
        'movies',
        async ({ page }) => {
            page.movies = await getMovies();
        },
        500 /* expires */
    );
};
