import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdStopwatch } from "react-icons/io";
import { RiBookLine } from "react-icons/ri";
import { FaRegWindowMaximize, FaRegWindowRestore } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FiBookmark } from "react-icons/fi";
import { logoLiterature } from "../../../assets/images";
import { motion } from "framer-motion";

interface AsideProps {
  closeSidebar: boolean;
}

const AsideContainer = styled.div<AsideProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  padding: 1.25rem;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #e8e6db;
  //box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  margin-top: 10rem;
`;

const IconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  &:hover {
    background-color: #d77575;
    color: white;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    color: #1d202e;
    font-size: 2rem;
    line-height: 0;

    &:hover {
      color: white;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 3.125rem;
  top: -0.6rem;
  background-color: #fff;
  color: #ed6a6a;
  padding: 5px 10px;
  border-radius: 3rem;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  opacity: 0;
`;

const Aside = () => {
  const location = useLocation();
  const isBookReaderPage = location.pathname.startsWith("/book-reader");
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);
  const [closeSidebar, setCloseSidebar] = useState<boolean>(false);

  const handleSidebar = () => {
    setCloseSidebar(!closeSidebar);
  };

  const menuText = [
    {
      id: 1,
      text: "Home",
      icon: <IoHomeOutline className="my-icon" />,
      link: "/",
    },
    {
      id: 2,
      text: "Book Slider",
      icon: <RiBookLine className="my-icon" />,
      link: "/book-slider",
    },
    {
      id: 3,
      text: "Live Clock",
      icon: <IoMdStopwatch className="my-icon" />,
      link: "/live-clock",
    },
    {
      id: 4,
      text: "Bookmark",
      icon: <FiBookmark className="my-icon" />,
      link: "/book-mark",
    },
    {
      id: 5,
      text: "Settings",
      icon: <IoSettingsOutline className="my-icon" />,
      link: "#",
    },
  ];

  return (
    <>
      {closeSidebar ? (
        <IoClose
          style={{
            color: "#7e7e7e",
            cursor: "pointer",
            fontSize: "2rem",
            position: "fixed",
            top: "1rem",
            left: "1rem",
          }}
          className="toggle-icon"
          onClick={handleSidebar}
        />
      ) : null}
      <AsideContainer
        as={motion.div}
        initial={{ x: -300 }}
        animate={{ x: closeSidebar ? -300 : 0 }}
        transition={{ duration: 0.3, type: "tween" }}
        closeSidebar={closeSidebar}
        className="aside-container"
      >
        <div className="logo-wrapper">
          <a href="/">
            <img src={logoLiterature} alt="logo-img" width={70} />
          </a>
        </div>
        {isBookReaderPage && (
          <FaRegWindowMaximize
            style={{
              color: "#3b3b3b",
              cursor: "pointer",
              fontSize: "2rem",
          
            }}
            onClick={handleSidebar}
          />
        )}
        <IconWrapper>
          {menuText.map((menu) => (
            <IconContainer
              key={menu.id}
              onMouseEnter={() => setHoveredIcon(menu.id)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <a
                href={menu.link}
                style={menu.id === 1 ? { marginTop: "-.3rem" } : undefined}
              >
                {menu.icon}
              </a>

              {hoveredIcon === menu.id && (
                <Tooltip
                  as={motion.div}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {menu.text}
                </Tooltip>
              )}
            </IconContainer>
          ))}
          {/*<div className="icon-menu-lines">
          <RiMenu3Line style={{ fontSize: '2rem', color: '#1d202e' }} />
        </div>*/}
        </IconWrapper>
      </AsideContainer>
    </>
  );
};

export default Aside;
