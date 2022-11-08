import React, { Component } from "react";

export class Dropdown extends Component {
    constructor() {
        super();
        this.ref = React.createRef();
        this.onClickOutside = this.onClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.onClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.onClickOutside);
    }

    onClickOutside(event) {
        //Outside the dropdown
        if (this.ref && !this.ref.current.contains(event.target)) {
            const btnRef = this.props.btnRef.current;

            //And not on the button
            if (!(btnRef && btnRef.contains(event.target)))
                this.props.onClickOutside();
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
