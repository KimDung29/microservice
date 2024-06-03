import { useState, useEffect } from "react";
import API from "../../../core/utils/axiosInstance";
import style from "./product.module.css";

interface ProductType {
    name: string;
    description: string;
    price: number;
    quantity: number;
    avatar: string;
    images: string[];
}

function ListProduct() {
    const [products, setProducts] = useState([] as ProductType[]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get("/products");
                setProducts(res.data.products ? res.data.products : []);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className={style.container}>
            {products?.length === 0 && <div>There is no product</div>}
            {products?.length > 0 && (
                <table className={style.table}>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Description</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td>Avatar</td>
                            <td>Images</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.description}</td>
                                <td className={style.function}>
                                    {item?.price}
                                </td>
                                <td className={style.function}>
                                    {item?.quantity}
                                </td>
                                <td className={style.function}>
                                    <img
                                        src={`http://localhost:8080/uploads/${item?.avatar}`}
                                        style={{
                                            height: "50px",
                                            width: "50px",
                                        }}
                                        alt={item?.name}
                                    />
                                </td>
                                <td className={style.function}>
                                    {item?.images?.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={`http://localhost:8080/uploads/${img}`}
                                            style={{
                                                height: "50px",
                                                width: "50px",
                                                margin: "5px ",
                                            }}
                                            alt={item?.name}
                                        />
                                    ))}
                                </td>
                                <td className={style.function}>
                                    <button className={style.btn}>Edit</button>
                                </td>
                                <td className={style.function}>
                                    <button
                                        className={`${style.btn} ${style.delete}`}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ListProduct;
