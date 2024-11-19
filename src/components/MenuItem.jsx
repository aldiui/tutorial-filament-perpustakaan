import { Link } from "react-router-dom";

const MenuItem = ({ item, activeSection }) => {
    return (
        <li>
            <Link to={item.id} className={activeSection === item.id ? "active" : ""}>
                <span className="text-xl mr-2">{item.icon}</span>
                {item.label}
            </Link>
        </li>
    );
};

export default MenuItem;
