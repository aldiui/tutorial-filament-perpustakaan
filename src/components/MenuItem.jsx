const MenuItem = ({ item, activeSection, setActiveSection }) => {
    return (
        <li>
            <a className={activeSection === item.id ? "active" : ""} onClick={() => setActiveSection(item.id)}>
                <span className="text-xl mr-2">{item.icon}</span>
                {item.label}
            </a>
        </li>
    );
};

export default MenuItem;
