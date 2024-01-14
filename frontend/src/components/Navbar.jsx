

import { Link, NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import WalletContext from '../context/WalletContext';
import ConnectModal from '../modals/ConnectModal';
import Logo from './Logo';
import './Navbar.css';
export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const walletContext = useContext(WalletContext);

    function handleModalClick(event) {
        event.preventDefault();
        if (walletContext.defaultAccount) {
            setIsModalOpen(false)
            return
        };
        setIsModalOpen(!isModalOpen);
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    function handleMobileMenuClick() {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Clicking outside of the navbar will close mobile navbar.
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.container')) {
                setIsMobileMenuOpen(false);
            };
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isMobileMenuOpen]);

    return (
        <nav className='container'>
            <div className='nav-header'>
                <Link to={'/'} className='nav-banner'>
                    BlokSeçim
                    <Logo/>
                </Link>
                <span className='hamburger-icon' onClick={handleMobileMenuClick}>
                    &#9776;
                </span>
            </div>
            <ul className={`nav-links ${isMobileMenuOpen ? 'show-menu' : ''}`}>
                {/* <li onClick={handleMobileMenuClick}>
                    <NavLink to={'/tokenomics'}>Token Al</NavLink>
                </li> */}

                <li onClick={handleMobileMenuClick}>
                    <NavLink to={'/create'}>Önerge Oluştur</NavLink>
                </li>

                <li onClick={handleMobileMenuClick}>
                    <NavLink to={'/proposals'}>Önergeler</NavLink>
                </li>

                <li onClick={handleMobileMenuClick}>
                    <NavLink to={'/results'}>Sonuçlar</NavLink>
                </li>
                <li onClick={handleMobileMenuClick}>
                    <NavLink to={'/profile'}>Profilim</NavLink>
                </li>
                <button className='connect-wallet' onClick={handleModalClick}>
                    <NavLink to={`${walletContext.defaultAccount !== null ? '/profile' : '#'}`}>
                        {walletContext.defaultAccount !== null ? walletContext.conBtnText : 'Cüzdan Bağla'}
                    </NavLink>
                </button>
            </ul>
            {isModalOpen && (<ConnectModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />)}
        </nav>
    )
};