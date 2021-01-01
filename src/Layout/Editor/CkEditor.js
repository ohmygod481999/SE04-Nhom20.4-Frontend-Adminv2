import React, { Component, Fragment } from "react";

import CKEditor from "react-ckeditor-component";

import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import { Row, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import Configuration from "../../utils/configuration";

export default class CkEditor extends Component {
    constructor(props) {
        super(props);

        //State initialization
        this.state = {
            content: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.content != null) {
            this.setState({
                content: nextProps.content,
            });
        }
    }

    onChange = (evt) => {
        this.setState({
            content: evt.editor.getData(),
        });
        this.props.onchange(evt.editor.getData());
    };

    onBlur(evt) {}

    afterPaste(evt) {}

    render() {
        return (
            <CKEditor
                type="inline"
                content={this.state.content}
                config={Configuration.editorConfiguration}
                events={{
                    blur: this.onBlur,
                    afterPaste: this.afterPaste,
                    change: this.onChange,
                }}
                scriptUrl={Configuration.scriptUrlCke}
            />
        );
    }
}
