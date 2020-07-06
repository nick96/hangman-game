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

const Hideable = styled.div`
  box-sizing: border-box;
  visibility: ${(props: { show: boolean }) =>
    props.show ? "visible" : "hidden"};
`;

const Head = styled(Hideable)`
  width: 50px;
  height: 60px;
  border: 5px solid black;
  border-radius: 50%;
  display: block;
  position: absolute;
  top: 21px;
  left: 133px;
  z-index: 1;
  transform-origin: center bottom;
`;

const Torso = styled(Hideable)`
  width: 6px;
  height: 100px;
  border: 3px solid black;
  display: block;
  position: absolute;
  top: 80px;
  left: 156px;
`;

const LeftLeg = styled(Hideable)`
  width: 6px;
  height: 100px;
  border: 3px solid black;
  display: block;
  position: absolute;
  top: 175px;
  left: 155px;
  transform: rotate(12deg);
  transform-origin: top;
`;

const RightLeg = styled(Hideable)`
  width: 6px;
  height: 100px;
  border: 3px solid black;
  display: block;
  position: absolute;
  top: 175px;
  left: 157px;
  transform: rotate(-12deg);
  transform-origin: top;
`;

const LeftArm = styled(Hideable)`
  width: 100px;
  height: 6px;
  border: 3px solid black;
  display: block;
  position: absolute;
  top: 86px;
  left: 57px;
  transform-origin: 100%;
`;

const RightArm = styled(Hideable)`
  width: 100px;
  height: 6px;
  border: 3px solid black;
  display: block;
  position: absolute;
  top: 86px;
  left: 161px;
  transform-origin: 0%;
`;

const LeftFoot = styled(Hideable)`
  width: 30px;
  height: 6px;
  border: 3px solid black;
  display: block;
  position: absolute;
  top: 270px;
  left: 110px;
  transform: rotate(8deg);
`;

const RightFoot = styled(Hideable)`
  width: 30px;
  height: 6px;
  border: 3px solid black;
  display: block;
  position: absolute;
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
