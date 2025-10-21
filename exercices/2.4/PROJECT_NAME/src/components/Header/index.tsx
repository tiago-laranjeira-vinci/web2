import "./header.css";

interface HeaderProps {
    url: string;
    children: React.ReactNode;
}
const Header = (props: HeaderProps) => {
    return (
        <header className="header">
            <img src={props.url} alt="Header Image" className="Header Image" />
            <div>{props.children}</div>
        </header>
    );
};
export default Header;