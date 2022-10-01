import React, { Component } from "react";

export class Container extends Component {
    render() {
        return (
            <div style={{ width: "85%", margin: "auto" }}>
                {this.props.children}
            </div>
        );
    }
}

export default Container;
