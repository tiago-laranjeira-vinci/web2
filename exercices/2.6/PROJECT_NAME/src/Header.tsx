import './Header.css'

interface HeaderProps {
    UrlLogo: string;
    children: React.ReactNode;
}

const Header = ({ UrlLogo, children }: HeaderProps) => {
    return (
        <header className="header">
            <img src={UrlLogo} alt="Logo" className="header-logo" />
            <div className="header-children">
                {children}
            </div>
        </header>
    );
}

export default Header;
