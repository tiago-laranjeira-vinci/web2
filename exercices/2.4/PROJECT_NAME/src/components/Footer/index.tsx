import "./Footer.css";

interface FooterProps {
    UrlLogo:string;
    children: React.ReactNode;
}

const Footer = (props: FooterProps) => {
    return (
        <footer className="footer">
            <img src={props.UrlLogo} alt="Footer Logo" className="Footer Logo" />
            <div>{props.children}</div>
        </footer>
    );
};
export default Footer;