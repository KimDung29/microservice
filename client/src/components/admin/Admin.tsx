import style from "./admin.module.css";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";
import ListProduct from "./product/ListProduct";

function Admin() {
    return (
        <div className={style.container}>
            <div className={style.wrapper}>
                <div className={style.header}>
                    <h2>Admin Page</h2>
                    <Logout />
                </div>
                <Link to="/products/create" style={{ textDecoration: "none" }}>
                    <button className={style.btn}>Create Product</button>
                </Link>

                <div className={style.table}>
                    <ListProduct />
                </div>
            </div>
        </div>
    );
}

export default Admin;
