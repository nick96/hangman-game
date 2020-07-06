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
  width: 6px;
  height: 60px;
  top: -39px;
  left: 156px;
`;

const Beam = styled(Component)`
  width: 150px;
  height: 6px;
  top: -39px;
  left: 10px;
`;

const Pole = styled(Component)`
  width: 6px;
  height: 440px;
  top: -39px;
  left: 10px;
`;

const Base = styled(Component)`
  width: 300px;
  height: 6px;
  top: 400px;
  left: 10px;
`;

const Head = styled(Hideable)`
  width: 50px;
  height: 60px;
  border: 5px solid black;
  border-radius: 50%;
  top: 21px;
  left: 133px;
  z-index: 1;
  transform-origin: center bottom;
`;

const Torso = styled(Hideable)`
  width: 6px;
  height: 100px;
  top: 80px;
  left: 156px;
`;

const LeftLeg = styled(Hideable)`
  width: 6px;
  height: 100px;
  top: 175px;
  left: 155px;
  transform: rotate(12deg);
  transform-origin: top;
`;

const RightLeg = styled(Hideable)`
  width: 6px;
  height: 100px;
  top: 175px;
  left: 157px;
  transform: rotate(-12deg);
  transform-origin: top;
`;

const LeftArm = styled(Hideable)`
  width: 75px;
  height: 6px;
  top: 86px;
  left: 83px;
  transform: rotate(-45deg);
  transform-origin: 100%;
`;

const RightArm = styled(Hideable)`
  width: 75px;
  height: 6px;
  top: 86px;
  left: 159px;
  transform-origin: 0%;
  transform: rotate(45deg);
`;

const LeftFoot = styled(Hideable)`
  width: 30px;
  height: 6px;
  top: 270px;
  left: 110px;
  transform: rotate(8deg);
`;

const RightFoot = styled(Hideable)`
  width: 30px;
  height: 6px;
  top: 270px;
  left: 178px;
  transform: rotate(-8deg);
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
      <LeftFoot show={leftLeg} />
      <RightLeg show={rightLeg} />
      <RightFoot show={rightLeg} />
    </Container>
  );
};

export default StickPerson;
