import React, { Component } from "react";

export class Dropdown extends Component {
    constructor() {
        super();
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
        if (
            this.wrapperRef &&
            !this.wrapperRef.current.contains(event.target)
        ) {
            this.props.hide(event.target.id);
        }
    }
}

export default Dropdown;
