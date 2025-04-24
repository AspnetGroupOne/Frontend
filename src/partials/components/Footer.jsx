import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <>
            <footer className='page-footer'>
                <section className='page-footer-text'>
                    <p className='page-footer-text-p'>Copyright 2025 Peterdraw</p>
                    <section className='page-footer-links'>
                        <Link className='page-footer-link' to="">Privacy Policy</Link>
                        <Link className='page-footer-link' to="">Terms & Conditions</Link>
                        <Link className='page-footer-link' to="">Contact</Link>
                    </section>
                </section>
                <aside className='page-footer-aside'>
                    <a href="#">
                        <img src="/public/images/Socialmedia-icons/FacebookLogo.svg" alt="Facebook Logo" />
                    </a>
                    <a href="#">
                        <img src="/public/images/Socialmedia-icons/XLogo.svg" alt="X Logo" />
                    </a>
                    <a href="#">
                        <img src="/public/images/Socialmedia-icons/InstagramLogo.svg" alt="Instagram Logo" />
                    </a>
                    <a href="#">
                        <img src="/public/images/Socialmedia-icons/YoutubeLogo.svg" alt="Youtube Logo" />
                    </a>
                    <a href="#">
                        <img src="/public/images/Socialmedia-icons/LinkedinLogo.svg" alt="Linkedin Logo" />
                    </a>
                </aside>
            </footer>
        </>
    )
}

export default Footer