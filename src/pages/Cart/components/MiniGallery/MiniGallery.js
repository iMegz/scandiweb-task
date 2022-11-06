import React, { Component } from "react";
import Arrow from "../../../../shared/components/Arrow/Arrow";
import Button from "../../../../shared/components/Button/Button";
import style from "./MiniGallery.module.css";

export class MiniGallery extends Component {
    constructor(props) {
        super(props);
        this.length = props.gallery.length;
        this.state = { index: 0 };
    }
    next() {
        const index = (this.state.index + 1) % this.length;
        this.setState({ index });
    }
    prev() {
        const index = (this.state.index + this.length - 1) % this.length;
        this.setState({ index });
    }
    render() {
        const { gallery, title } = this.props;
        return (
            <div className={style["mini-gallery"]}>
                {this.length > 1 && (
                    <div className={style["change-img-btns"]}>
                        <Button
                            type="outline"
                            size="sm"
                            className={style["change-img-btn"]}
                            onClick={this.prev.bind(this)}
                        >
                            <Arrow dir="left" />
                        </Button>
                        <Button
                            type="outline"
                            size="sm"
                            className={style["change-img-btn"]}
                            onClick={this.next.bind(this)}
                        >
                            <Arrow dir="right" />
                        </Button>
                    </div>
                )}

                <img
                    src={gallery[this.state.index]}
                    alt={title}
                    className={style["mini-img"]}
                />
            </div>
        );
    }
}

export default MiniGallery;
