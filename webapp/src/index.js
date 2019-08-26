import {id as pluginId} from './manifest';

import Root from './components/root';

import {openRootModal} from './actions';
import reducer from './reducer';

export default class Plugin {
    initialize(registry, store) {
        registry.registerRootComponent(Root);
        registry.registerReducer(reducer);

        registry.registerPostDropdownMenuAction(
            'Doc Up',
            (postID) => store.dispatch(openRootModal(postID)),
        );
    }
}

window.registerPlugin(pluginId, new Plugin());
