// Base on: https://codepen.io/lorayoconnell/pen/pyayOP
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 300px;
  display: block;
  position: relative;
`;

const Component = styled.div`
  box-sizing: border-box;
  border: 3px solid black;
  display: block;
  position: absolute;
`;

const Hideable = styled(Component)`
  visibility: ${(props: { show: boolean }) =>
    props.show ? "visible" : "hidden"};
`;

const Rope = styled(Component)`
  width: 1%;
  height: 15%;
  left: 55%;
`;

const Beam = styled(Component)`
  width: 50%;
  height: 1%;
  left: 5%;
`;

const Pole = styled(Component)`
  width: 1%;
  height: 100%;
  left: 5%;
`;

const Base = styled(Component)`
  width: 60%;
  height: 1%;
  top: 100%;
  left: 5%;
`;

const Head = styled(Hideable)`
  width: 20%;
  height: 25%;
  border: 5px solid black;
  border-radius: 50%;
  top: 15%;
  left: 46%;
  z-index: 1;
  transform-origin: center bottom;
`;

const Torso = styled(Hideable)`
  width: 1%;
  height: 27%;
  top: 40%;
  left: 55%;
`;

const Leg = styled(Hideable)`
  width: 1%;
  height: 30%;
  top: 63%;
  left: 55%;
`;

const LeftLeg = styled(Leg)`
  transform: rotate(12deg);
  transform-origin: top;
`;

const RightLeg = styled(Leg)`
  transform: rotate(-12deg);
  transform-origin: top;
`;

const LeftArm = styled(Hideable)`
  width: 25%;
  height: 1%;
  top: 40%;
  left: 30%;
  transform: rotate(-45deg);
  transform-origin: 100%;
`;

const RightArm = styled(Hideable)`
  width: 25%;
  height: 1%;
  top: 40%;
  left: 56%;
  transform-origin: 0%;
  transform: rotate(45deg);
`;

interface StickPersonProps {
  head: boolean;
  torso: boolean;
  leftArm: boolean;
  rightArm: boolean;
  leftLeg: boolean;
  rightLeg: boolean;
}

const StickPerson: React.FunctionComponent<StickPersonProps> = ({
  head,
  torso,
  leftArm,
  rightArm,
  leftLeg,
  rightLeg,
}) => {
  return (
    <Container>
      <Rope />
      <Beam />
      <Pole />
      <Base />

      <Head show={head} />
      <Torso show={torso} />
      <LeftArm show={leftArm} />
      <RightArm show={rightArm} />
      <LeftLeg show={leftLeg} />
      <RightLeg show={rightLeg} />
    </Container>
  );
};

export default StickPerson;
