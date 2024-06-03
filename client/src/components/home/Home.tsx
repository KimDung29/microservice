import { Link } from "react-router-dom";
import home from "./home.module.css";

function Home() {
    return (
        <div className={home.container}>
            <div className={home.header}>
                <h2>Home Page</h2>
                <div className={home.wrapper}>
                    <Link to="/register">
                        <button type="button" className={home.btn}>
                            Register
                        </button>
                    </Link>
                    <Link to="/login">
                        <button type="button" className={home.btn}>
                            Login
                        </button>
                    </Link>
                </div>
            </div>
            <div className={home.content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
                ad blanditiis, ex sint natus, amet inventore iure quis nostrum
                sunt enim, quae corrupti. Nihil deleniti architecto numquam
                neque earum tenetur blanditiis ad soluta dolores, quo adipisci
                deserunt id sed accusamus a quidem aliquam enim! Ipsum quia
                reprehenderit quod nihil voluptatibus cum aliquid laudantium
                quae dolorum tempora deserunt, eos nulla quasi obcaecati impedit
                possimus quibusdam provident ratione ex nobis fugit temporibus
                optio. Officiis quod quia eaque ea minima ad non corrupti
                asperiores eligendi laudantium blanditiis, culpa nemo! Pariatur
                architecto velit culpa ducimus recusandae delectus! Fugiat error
                mollitia architecto id, doloremque suscipit.
            </div>
        </div>
    );
}

export default Home;
