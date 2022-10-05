import React, { Component } from "react";
import { ButtonColor, ButtonOutline } from "../UI/Buttons";
import style from "./ProductAttribute.module.css";

export class ProductAttribute extends Component {
    swatchAttribute() {
        const { id, items, value, changeAttribute } = this.props;
        return items.map((item) => (
            <ButtonColor
                onClick={changeAttribute.bind(this, id, item.value)}
                key={item.id}
                active={item.value === value}
                color={item.value}
            />
        ));
    }
    textAttribute() {
        const { id, items, value, changeAttribute } = this.props;
        return items.map((item) => (
            <ButtonOutline
                onClick={changeAttribute.bind(this, id, item.value)}
                key={item.id}
                active={item.value === value}
            >
                {item.value}
            </ButtonOutline>
        ));
    }
    render() {
        const isSwatch = this.props.type === "swatch";
        return (
            <div className={style.attribute}>
                <span>{this.props.name}:</span>
                <div className={style["attribute-values"]}>
                    {isSwatch ? this.swatchAttribute() : this.textAttribute()}
                </div>
            </div>
        );
    }
}

export default ProductAttribute;
