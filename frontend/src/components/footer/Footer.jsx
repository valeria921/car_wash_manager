import "./style.css";

const Footer = () => {
    return (
        <>
            <footer class="custom-footer">
                <hr class="custom-footer__separator" />
                <p class="custom-footer__text">
                    &copy; 2025 - Built by{" "}
                    <a
                        href="https://www.linkedin.com/in/valeria-kruk"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="custom-footer__link"
                    >
                        Valeria Kruk
                    </a>
                </p>
            </footer>
        </>
    );
};

export default Footer;
