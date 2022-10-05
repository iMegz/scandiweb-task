import React, { Component } from "react";
import style from "./Gallery.module.css";

export class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: props.gallery[0],
        };
    }

    changeMainImg(img) {
        this.setState({ main: img });
    }

    render() {
        const gallery = this.props.gallery;
        const productName = this.props.productName;

        return (
            <div className={style.gallery}>
                <div className={style["images-section"]}>
                    {gallery.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            className={
                                img === this.state.main
                                    ? style.active
                                    : undefined
                            }
                            onClick={this.changeMainImg.bind(this, img)}
                            alt={productName}
                        />
                    ))}
                </div>
                <img
                    className={style["main-image"]}
                    src={this.state.main}
                    alt={productName}
                />
            </div>
        );
    }
}

export default Gallery;
