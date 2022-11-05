import React, { Component } from "react";
import style from "./ProductAttributes.module.css";
import Swatch from "../../../../shared/components/Swatch/Swatch";
import Button from "../../../../shared/components/Button/Button";

export class ProductAttributes extends Component {
    change(id, i) {
        if (!this.props.disabled) this.props.change(id, i);
    }
    render() {
        const { attributes, disabled, size } = this.props;

        return (
            <div className={style["attributes-list"]}>
                {attributes.map((attr) => {
                    if (attr.type === "swatch") {
                        const items = attr.items.map((item, i) => {
                            const selected = i === attr.selected;
                            return (
                                <Swatch
                                    size={size || "lg"}
                                    selected={selected}
                                    color={item.value}
                                    key={item.id}
                                    disabled={disabled}
                                    onClick={this.change.bind(this, attr.id, i)}
                                />
                            );
                        });
                        return (
                            <div key={attr.id}>
                                <span className="product-attribute-name">
                                    {attr.name} :
                                </span>
                                <div className={style["attribute-values"]}>
                                    {items}
                                </div>
                            </div>
                        );
                    } else {
                        const items = attr.items.map((item, i) => {
                            const selected = i === attr.selected;
                            return (
                                <Button
                                    type="outline"
                                    size={size || "md"}
                                    selected={selected}
                                    key={item.id}
                                    disabled={disabled}
                                    onClick={this.change.bind(this, attr.id, i)}
                                >
                                    {item.value}
                                </Button>
                            );
                        });
                        return (
                            <div key={attr.id}>
                                <span className="product-attribute-name">
                                    {attr.name} :
                                </span>
                                <div className={style["attribute-values"]}>
                                    {items}
                                </div>
                            </div>
                        );
                    }
                })}
            </div>
        );
    }
}

export default ProductAttributes;
