import './Footer.css';

interface FooterProps {
    urlLogo: string;
    children?: React.ReactNode;
}

const Footer = ({urlLogo, children}: FooterProps) => {
    return (
        <footer className="footer">
            <div> {children}</div>
            <img src={urlLogo} alt="Logo" className="footer-logo" />
        </footer>
    );
}
export default Footer;