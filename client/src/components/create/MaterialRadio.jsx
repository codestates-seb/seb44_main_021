import React from "react";
import styled from "styled-components";

const MaterialRadio = ({ onChange }) => {
  //   const handleMateriel1 = () => {
  //     materialRef.current = "1";
  //     Material();
  //   };

  //   const handleMateriel2 = () => {
  //     materialRef.current = "2";
  //     Material();
  //   };

  //   const handleMateriel3 = () => {
  //     materialRef.current = "3";
  //     Material();
  //   };

  //   const handleMateriel4 = () => {
  //     materialRef.current = "4";
  //     Material();
  //   };

  //   const handleMateriel5 = () => {
  //     materialRef.current = "5";
  //     Material();
  //   };

  //   const handleMateriel6 = () => {
  //     materialRef.current = "6";
  //     Material();
  //   };

  const materialItems = [
    {
      value: "1",
      url: "/image/IconCloth.png",
    },
    {
      value: "2",
      url: "/image/IconWood.png",
    },
    {
      value: "3",
      url: "/image/IconPlastic.png",
    },
    {
      value: "4",
      url: "/image/IconSteel.png",
    },
    {
      value: "5",
      url: "/image/IconGlass.png",
    },
    {
      value: "6",
      url: "/image/IconEtc.png",
    },
  ];

  return (
    <RadioBox>
      {materialItems.map((material) => (
        <RadioBtn
          key={material.value}
          type="radio"
          value={material.value}
          name="categoryId"
          url={material.url}
          onChange={onChange}
        />
      ))}
    </RadioBox>
  );
};
export default MaterialRadio;

const RadioBox = styled.div`
  display: flex;
  border: 1px solid #dde2e6;
  border-radius: 3px;
`;

const RadioBtn = styled.input`
  /* box-sizing: border-box; */
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  appearance: none;
  width: 3rem;
  height: 3rem;
  margin: 0.5rem auto;
  border: 2px solid transparent;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
  &:focus {
    outline: none;
  }
  &:checked {
    border-color: var(--color-main);
    /* border-radius: 50px; */
  }
`;
