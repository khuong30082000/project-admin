import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "antd";
import { Helmet } from "react-helmet";
import styled from "styled-components";

const StyledUlWrapper = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;

  list-style: none;
`;

const StyledLi = styled.li`
  position: relative;
  .span1 {
    margin-right: 36px;
    color: #5f5f76;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
  }
  .span2 {
    color: #0f0f3f;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: ${(props) => props.color && props.color};
    border-radius: 50%;
    left: -29px;
    top: 50%;
    transform: translateY(-50%);
  }
  &:nth-child(1)::after {
    content: "";
    width: 2px;
    height: 50px;
    background-color: #dedee7;
    position: absolute;
    left: 215px;
  }
`;

const data = [
  // {
  //   name: "18-24",
  //   uv: 31.47,
  //   pv: 2400,
  //   fill: "#8884d8",
  // },
  {
    name: "Bank",
    uv: 7,
    value: "4,567,890.12",

    fill: "#F3BA2F",
  },
  {
    name: "Token",
    uv: 6,
    value: "1,567,890.12",
    fill: "#54C2C1",
  },
  {
    name: "Cash",
    uv: 12,
    value: "67,890.12",
    fill: "#0F0F3F;",
  },
  {
    name: "Stock",
    uv: 8.0,
    value: "567,890.12",
    fill: "#9020E9",
  },
];
const style = {
  top: "80%",
  left: "50%",
  transform: "translate(-45%, 0)",

  lineHeight: "24px",
  bottom: 0,
};

const renderLegend = (props) => {
  const { payload } = props;
  console.log(payload);

  return (
    <StyledUlWrapper>
      {payload.map((item, index) => {
        return (
          <StyledLi key={`item-${index}`} color={item.color}>
            <span className="span1">{item.payload.name} </span>
            <span className="span2">${item.payload.payload.value}</span>
          </StyledLi>
        );
      })}
    </StyledUlWrapper>
  );
};

const RadialChart = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Radial Chart</title>
      </Helmet>
      <Typography.Title level={2}>Money Allocation</Typography.Title>
      <ResponsiveContainer width="100%" height={500}>
        <RadialBarChart
          cx="50%"
          cy="40%"
          innerRadius="20%"
          outerRadius="80%"
          barSize={13}
          data={data}
          startAngle={0}
        >
          <RadialBar
            minAngle={20}
            // label={{ position: "insideStart", fill: "#fff" }}
            background
            // clockWise

            dataKey="uv"
          />

          <Legend
            iconSize={17}
            width={600}
            layout="horizontal"
            verticalAlign="bottom"
            wrapperStyle={style}
            content={renderLegend}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RadialChart;
