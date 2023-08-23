import LayoutSecondary from "@/layout/LayoutSecondary";
import TopicDashboard from "@/modules/dashboard/TopicDashboard";
import React from "react";
import { HiArrowCircleLeft } from "react-icons/hi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    post: 4000,
    discuss: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    post: 3000,
    discuss: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    post: 2000,
    discuss: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    post: 2780,
    discuss: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    post: 1890,
    discuss: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    post: 2390,
    discuss: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    post: 3490,
    discuss: 4300,
    amt: 2100,
  },
  {
    name: "Page H",
    post: 2000,
    discuss: 9800,
    amt: 2290,
  },
  {
    name: "Page I",
    post: 2780,
    discuss: 3908,
    amt: 2000,
  },
  {
    name: "Page K",
    post: 1890,
    discuss: 4800,
    amt: 2181,
  },
  {
    name: "Page L",
    post: 2390,
    discuss: 3800,
    amt: 2500,
  },
  {
    name: "Page M",
    post: 3490,
    discuss: 4300,
    amt: 2100,
  },
];
const dataPie = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomLabelProps) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DashBoardPage: React.FC = () => {
  return (
    <LayoutSecondary>
      <a
        className="dark:text-light0 bg- rounded-full mb-4 pr-1 link inline-flex items-center text-sm font-medium !text-grey-600 bg-light2 hover:bg-light0 dark:bg-dark2 dark:hover:bg-dark1"
        href="/managements"
      >
        <HiArrowCircleLeft className="w-6 h-6 mr-1" />
        Back to Managements
      </a>
      <div className=" h-auto mx-auto bg-light3 dark:bg-dark1 shadow-md p-4 rounded-3xl">
        <div className=" py-4">
          <h4 className="text-xl font-bold text-darker ">Dashboard</h4>
        </div>
        <div className="flex flex-col lg:grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4">
          <div className=" bg-light4 rounded-lg lg:col-span-1 dark:bg-dark2 p-4 h-auto">
            <TopicDashboard></TopicDashboard>
          </div>

          <div className=" bg-light4 h-auto lg:col-span-2 dark:bg-dark2 p-4 rounded-lg">
            <div className="text-sm dark:text-white mb-4 font-bold">
              Overview user
            </div>
            <div className="flex justify-center items-center gap-4 p-4  rounded-lg  lg:h-[180px]">
              <div
                className=" dark:bg-dark0  w-1/3 h-auto rounded-lg p-4 shadow-md flex
                        flex-col items-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3429/3429417.png"
                  className=" object-fill"
                  width={50}
                  height={50}
                ></img>
                <div className=" text-xs text-dark3 font-medium mt-2 mb-4">
                  Student
                </div>
                <div className="font-semibold dark:text-white text-4xl">
                  100
                </div>
              </div>
              <div
                className=" dark:bg-dark0  w-1/3 h-auto rounded-lg p-4 shadow-md flex
                        flex-col items-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1995/1995539.png"
                  className=" object-fill"
                  width={50}
                  height={50}
                ></img>
                <div className=" text-xs text-dark3 font-medium mt-2 mb-4">
                  Teacher
                </div>
                <div className="font-semibold dark:text-white text-4xl">
                  100
                </div>
              </div>
              <div
                className=" dark:bg-dark0  w-1/3 h-auto rounded-lg p-4 shadow-md flex
                        flex-col items-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3061/3061341.png"
                  className=" object-fill"
                  width={50}
                  height={50}
                ></img>
                <div className=" text-xs text-dark3 font-medium mt-2 mb-4">
                  Company
                </div>
                <div className="font-semibold dark:text-white text-4xl">
                  100
                </div>
              </div>
            </div>
          </div>
          <div className="flex no-scrollbar flex-col gap-4 items-center justify-center lg:col-span-2 dark:bg-dark2 bg-light4 p-4 rounded-md">
            <div className=" text-sm dark:text-white font-bold">
              Post & Discussion
            </div>
            <div className="flex items-end justify-end text-right">
              <select className="bg-light1 dark:bg-dark0 dark:text-white rounded-md py-1 px-2">
                <option value="">Tuần</option>
                <option value="zip">Tháng</option>
                <option value="doc">Năm</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={600}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 30,
                  bottom: 5,
                }}
              >
                <CartesianGrid stroke="#8d8383" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#8d8383" />
                <YAxis stroke="#8d8383" />
                <Tooltip />
                <Legend />
                <Bar dataKey="post" fill="#8884d8" />
                <Bar dataKey="discuss" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex no-scrollbar flex-col  items-center justify-center lg:col-span-1 dark:bg-dark2 bg-light4 p-4 rounded-md">
            <div className=" text-sm dark:text-white font-bold mb-4">
              Reports
            </div>
            <div className="flex items-end justify-end text-right">
              <select className="bg-light1 dark:bg-dark0 dark:text-white rounded-md py-1 px-2">
                <option value="">Tuần</option>
                <option value="zip">Tháng</option>
                <option value="doc">Năm</option>
              </select>
            </div>
            <PieChart width={300} height={300}>
              <Pie
                data={dataPie}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
      </div>
    </LayoutSecondary>
  );
};

export default DashBoardPage;
