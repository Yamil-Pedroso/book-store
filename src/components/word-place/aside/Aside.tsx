import { useState } from "react";
import styled from "styled-components";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdStopwatch } from "react-icons/io";
import { RiBookLine, RiMenu3Line } from "react-icons/ri";
import { FiBookmark } from "react-icons/fi";
import { logoLiterature } from "../../../assets/images";
import { motion } from "framer-motion";

const AsideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: fixed;
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
    color: #1d202e;
    font-size: 2rem;

    &:hover {
      color: white;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  left: 3.125rem;
  top: -.6rem;
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
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

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
    <AsideContainer>
      <div className="logo-wrapper">
        <a href="/">
          <img src={logoLiterature} alt="logo-img" width={70} />
        </a>
      </div>
      <IconWrapper>
        {menuText.map((menu) => (
          <IconContainer
            key={menu.id}
            onMouseEnter={() => setHoveredIcon(menu.id)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <a href={menu.link}>{menu.icon}</a>
            {hoveredIcon === menu.id && <Tooltip
             as={motion.div}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >{menu.text}</Tooltip>}
          </IconContainer>
        ))}
        {/*<div className="icon-menu-lines">
          <RiMenu3Line style={{ fontSize: '2rem', color: '#1d202e' }} />
        </div>*/}
      </IconWrapper>
    </AsideContainer>
  );
};

export default Aside;
