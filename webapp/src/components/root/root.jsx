import React from 'react';
import PropTypes from 'prop-types';

import github from '../../github';

const StageEnum = {
    TYPE: 0,
    PICK_FILE: 1,
}

export default class Root extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        message: PropTypes.string.isRequired,
        close: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            stage: StageEnum.TYPE,
            path: '/',
            type: null,
            data: null,
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.visible && !prevProps.visible) {
            this.loadDocs();
            copyToClipboard(this.props.message);
        }
    }
    loadDocs = async (path = 'site/content') => {
        const result = await github.repos.getContents({owner: 'mattermost', repo: 'mattermost-developer-documentation', path})
        console.log(result.data);
        this.setState({data: result.data, path});
    }
    goBack = () => {
        let {path} = this.state;
        path = path.substring(0, path.lastIndexOf('/'));
        this.loadDocs(path);
    }
    renderTypeStage = () => {
        return (
            <React.Fragment>
                {'What type of documentation is this?'}
                <br/>
                <button onClick={() => this.setState({type: 'admin', stage: StageEnum.PICK_FILE})}>{'Admin'}</button>
                <button onClick={() => this.setState({type: 'developer', stage: StageEnum.PICK_FILE})}>{'Developer'}</button>
                <button onClick={() => this.setState({type: 'company', stage: StageEnum.PICK_FILE})}>{'Company'}</button>
            </React.Fragment>
        );
    }
    renderPickFileStage = () => {
        const {data, type, path} = this.state;

        let backFunc = this.goBack;
        if (path === 'site/content') {
            backFunc = () => this.setState({stage: StageEnum.TYPE});
        }

        return (
            <React.Fragment>
                {'Type: ' + type}
                <br/>
                {'Path: ' + path}
                <br/>
                {'Pick a file to add documentation to.'}
                <br/>
                {data.map(this.renderFile)}
                <br/>
                <br/>
                <button onClick={backFunc}>{'Back'}</button>
            </React.Fragment>
        );
    }
    renderFile = (file) => {
        if (!file || (!file.name.endsWith('.md') && file.size !== 0)) {
            console.log('skipped ' + file ? file.name : 'null file');
            return null;
        }

        if (file.size === 0) {
            return (
                <button onClick={() => this.loadDocs(file.path)}>
                    {file.name}
                </button>
            );
        }

        return (
            <button onClick={() => window.open('https://github.com/mattermost/mattermost-developer-documentation/edit/master/' + file.path)}>
                {file.name}
            </button>
        );
    }
    render() {
        const {visible, theme, message, close} = this.props;

        if (!visible) {
            return null;
        }

        const {data, stage} = this.state;
    
        const style = getStyle(theme);

        let content;
        switch (stage) {
            case StageEnum.TYPE:
                content = this.renderTypeStage();
                break;
            case StageEnum.PICK_FILE:
                content = this.renderPickFileStage();
                break;
            default:
                content = 'Unknown stage.';
        }
    
        return (
            <div
                style={style.backdrop}
            >
                <div style={style.modal}>
                    {content}
                    <br/>
                    <br/>
                    {'Message to document (copied to clipboard):'}
                    <br/>
                    <span>{message}</span>
                    <br/>
                    <br/>
                    <button onClick={close}>{'Close'}</button>
                </div>
            </div>
        );
    }
}

const getStyle = (theme) => ({
    backdrop: {
        position: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.50)',
        zIndex: 2000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        height: '500px',
        width: '800px',
        padding: '1em',
        color: theme.centerChannelColor,
        backgroundColor: theme.centerChannelBg,
    },
});

function copyToClipboard(data) {
    // creates a tiny temporary text area to copy text out of
    // see https://stackoverflow.com/a/30810322/591374 for details
    const textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = data;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

