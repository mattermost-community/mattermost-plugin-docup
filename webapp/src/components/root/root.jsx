import React from 'react';
import PropTypes from 'prop-types';

import {makeStyleFromTheme, changeOpacity} from 'mattermost-redux/utils/theme_utils';

import FullScreenModal from '../modals/full_screen_modal.jsx';

import './root.scss';

export default class Root extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        postID: PropTypes.string.isRequired,
        close: PropTypes.func.isRequired,
        submit: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        fetchPluginRepos: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            type: null,
            message: null,
            title: '',
            pluginRepos: [],
            selectedPluginRepo: null,
        };
    }

    componentDidMount() {
        this.fetchPluginRepos()
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible && state.message == null) {
            return {message: props.message};
        }
        if (!props.visible && state.message != null) {
            return {message: null, title: '', type: null, selectedPluginRepo: null};
        }
        return null;
    }

    fetchPluginRepos = async () => {
        const repos = await this.props.fetchPluginRepos()
        this.setState({pluginRepos: repos})
    }

    submit = () => {
        const {submit, close, postID} = this.props;
        const {type, title, message, selectedPluginRepo} = this.state;
        submit(type, title, message, selectedPluginRepo, postID);
        close();
    }

    render() {
        const {visible, theme, close} = this.props;

        if (!visible) {
            return null;
        }

        const {message, type, title} = this.state;

        const style = getStyle(theme);

        return (
            <FullScreenModal
                show={visible}
                onClose={close}
            >
                <div
                    style={style.modal}
                    className='DocUpRootModal'
                >
                    <h1>{'Doc Up'}</h1>
                    <div className='docup-item'>
                        <h2>
                            {'What type of documentation is this?'}
                        </h2>
                        <fieldset
                            key='channelType'
                            className='multi-select__radio'
                        >
                            <div className='radio'>
                                <label>
                                    <input
                                        id='admin'
                                        type='radio'
                                        checked={type === 'admin'}
                                        onChange={() => this.setState({type: 'admin'})}
                                    />
                                    {'Admin'}
                                </label>
                            </div>
                            <div className='radio'>
                                <label>
                                    <input
                                        id='developer'
                                        type='radio'
                                        checked={type === 'developer'}
                                        onChange={() => this.setState({type: 'developer'})}
                                    />
                                    {'Developer'}
                                </label>
                            </div>
                            <div className='radio'>
                                <label>
                                    <input
                                        id='handbook'
                                        type='radio'
                                        checked={type === 'handbook'}
                                        onChange={() => this.setState({type: 'handbook'})}
                                    />
                                    {'Company Handbook'}
                                </label>
                            </div>
                            <div className='radio'>
                                <label>
                                    <input
                                        id='plugin-repo'
                                        type='radio'
                                        checked={type === 'plugin'}
                                        onChange={() => this.setState({type: 'plugin'})}
                                    />
                                    {'Plugin Repository'}
                                </label>
                                <select
                                    value={this.state.selectedPluginRepo}
                                    onChange={(e) => this.setState({selectedPluginRepo: e.target.value})}
                                    disabled={this.state.type !== 'plugin'}
                                >
                                    <option value=''></option>
                                    {this.state.pluginRepos.map((repoName) => (
                                        <option value={repoName}>{repoName}</option>
                                    ))}
                                </select>
                            </div>
                        </fieldset>
                    </div>
                    <div className='docup-item'>
                        <h2>
                            {'Short title'}
                        </h2>
                        <input
                            className='docup-input docup-one-line'
                            style={style.textarea}
                            type='text'
                            value={title}
                            placeholder='One line summary of what is being documented'
                            onChange={(e) => this.setState({title: e.target.value})}
                        />
                    </div>
                    <div className='docup-item'>
                        <h2>
                            {'Message to document'}
                        </h2>
                        <textarea
                            className='docup-input'
                            style={style.textarea}
                            value={message}
                            onChange={(e) => this.setState({message: e.target.value})}
                        />
                    </div>
                    <div className='docup-button-container'>
                        <button
                            className={'btn btn-primary'}
                            style={!type || !title ? style.inactiveButton : style.button}
                            onClick={this.submit}
                            disabled={!type || !title || (type === 'plugin' && !this.state.selectedPluginRepo)}
                        >
                            {'Mark for Documentation'}
                        </button>
                    </div>
                    <div className='docup-divider'/>
                    <div className='docup-clarification'>
                        <div className='docup-question'>
                            {'What does this do?'}
                        </div>
                        <div className='docup-answer'>
                            {'Marking something for documentation, otherwise known as doc\'ing up, will create a GitHub issue in the corresponding repository for the documentation type that is selected. This GitHub issue can then be picked up by someone to edit and submit a pull request to update our official documentation.'}
                        </div>
                        <div className='docup-question'>
                            {'Why create an issue instead of directly creating a pull request?'}
                        </div>
                        <div className='docup-answer'>
                            {'Creating a pull request requires intricate knowledge of our documentation repositories, making it difficult for someone not familiar to know exactly where to place the documentation. Creating an issue gives our writers and editors a list of items needing documenation while at the same time making a raw form of the documentation, in the GitHub issue, immediately searchable on the web.'}
                        </div>
                    </div>
                </div>
            </FullScreenModal>
        );
    }
}

const getStyle = makeStyleFromTheme((theme) => {
    return {
        modal: {
            color: changeOpacity(theme.centerChannelColor, 0.9),
        },
        textarea: {
            backgroundColor: theme.centerChannelBg,
        },
        helpText: {
            color: changeOpacity(theme.centerChannelColor, 0.6),
        },
        button: {
            color: theme.buttonColor,
            backgroundColor: theme.buttonBg,
        },
        inactiveButton: {
            color: changeOpacity(theme.buttonColor, 0.5),
            backgroundColor: changeOpacity(theme.buttonBg, 0.1),
        },
    };
});