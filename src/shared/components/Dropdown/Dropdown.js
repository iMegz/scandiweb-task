import React, { Component } from "react";

export class Dropdown extends Component {
    constructor() {
        super();
        this.ref = React.createRef();
        this.onClickOutside = this.onClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.onClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.onClickOutside);
    }

    onClickOutside(event) {
        if (this.ref && !this.ref.current.contains(event.target)) {
            this.props.onClickOutside(event.target);
        }
    }
    render() {
        return (
            <div className={this.props.className} ref={this.ref}>
                {this.props.children}
            </div>
        );
    }
}

export default Dropdown;
