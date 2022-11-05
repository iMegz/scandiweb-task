import React, { Component } from "react";
import style from "./Gallery.module.css";

export class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: props.gallery[0],
        };
    }
    changeImg(img) {
        this.setState({ main: img });
    }
    render() {
        const { gallery, title } = this.props;
        return (
            <div className={style["gallery"]}>
                <div className={style["mini-img-list"]}>
                    {gallery.map((img) => {
                        const active =
                            img === this.state.main ? style["active"] : "";
                        return (
                            <img
                                key={img}
                                src={img}
                                className={`${style["mini-img"]} ${active}`}
                                alt={title}
                                onClick={this.changeImg.bind(this, img)}
                            />
                        );
                    })}
                </div>
                <img
                    src={this.state.main}
                    alt={title}
                    className={style["main-img"]}
                />
            </div>
        );
    }
}

export default Gallery;
