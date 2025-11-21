import S from './Header.module.scss';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { i18n } = useTranslation();
  const [globalActive, setGlobalActive] = useState(false);
  const [sideBarActive, setSideBarActive] = useState(false);

  const changeLanguage = (lng : 'ko' | 'en') => {
    i18n.changeLanguage(lng);
  };

  const openMobileSideBar = () => {
    setSideBarActive(prev => !prev);
  };

  const openGlobalSelector = () => {
    setGlobalActive(prev => !prev); // 이전 상태 기반으로 안전하게 토글
  };

  return (
      <header className={S.mainHeader}>
        <div className={S.logoContainer}>
          <img src="/src/assets/images/common/logo.png" alt="Logo" className={S.logo} />
        </div>

        <div
            className={`${S.mobileNav} ${sideBarActive ? S.open : ''}`}
            onClick={openMobileSideBar}
        >
          <span>ㅎ</span>
          <span>ㅋ</span>
          <span>ㅇ</span>
        </div>

        <nav className={S.pcNav}>
          <ul className={S.navList}>
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? S.active : '')}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/career" className={({ isActive }) => (isActive ? S.active : '')}>
                Career
              </NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={({ isActive }) => (isActive ? S.active : '')}>
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? S.active : '')}>
                Contact
              </NavLink>
            </li>

            {/* 클릭 핸들러를 li로 옮기고 boolean 직접 출력 제거 */}
            <li
                className={`${S.languageSelector} ${globalActive ? S.open : ''}`}
                onClick={openGlobalSelector}
            >
              <div>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M11 0C4.9225 0 0 4.9225 0 11C0 17.0775 4.9225 22 11 22C17.0775 22 22 17.0775 22 11C22 4.9225 17.0775 0 11 0ZM11 2.75C11.9075 2.75 12.76 2.9975 13.585 3.2725C13.0075 3.8225 12.3475 4.3175 12.4575 4.8125C12.5675 5.3075 14.355 5.17 14.355 6.1875C14.355 6.93 13.2 7.15 13.9975 8.0025C14.96 8.965 12.2375 10.6975 12.1825 11.9625C12.1 14.245 14.4925 14.63 16.39 14.63C17.545 14.63 17.8475 15.18 17.765 15.84C16.28 17.9575 13.75 19.2775 10.9725 19.2775C9.9275 19.2775 8.965 19.03 8.0575 18.6725C8.6625 17.4625 7.2875 15.07 5.995 14.3C5.3625 13.6675 4.015 13.915 3.245 13.6125C2.9975 12.87 2.75 12.1275 2.7225 11.3025C2.805 11.165 2.9425 11.055 3.1625 11.055C3.685 11.055 4.4 12.1 4.785 11.99C5.28 11.88 2.75 8.3875 3.9325 7.7C4.4825 7.37 5.5825 8.7725 5.225 7.26C4.895 5.8575 6.215 6.49 7.04 6.1325C7.755 5.83 8.2775 5.005 7.3975 4.51C7.2325 4.4275 7.04 4.235 6.7925 3.9875C8.03 3.245 9.46 2.7775 11 2.7775V2.75ZM17.3525 5.7475C17.8475 6.3525 18.2325 7.0125 18.5625 7.7275V7.81C18.4525 8.0025 18.26 8.1125 17.9575 8.415C17.1875 9.185 17.0775 7.8375 16.7475 7.5625C16.39 7.2325 15.0975 7.6175 14.9325 7.205C14.74 6.71 16.3075 6.05 17.3525 5.7475Z"
                      fill="white"
                  />
                </svg>
              </div>

              <div className={S.languageDropdown}>
                <ul>
                  <li onClick={() => changeLanguage('ko')}>한국어</li>
                  <li onClick={() => changeLanguage('en')}>English</li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </header>
  );
}
