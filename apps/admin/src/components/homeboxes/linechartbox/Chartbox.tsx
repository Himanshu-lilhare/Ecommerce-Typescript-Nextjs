import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";
import "./chartbox.scss";
import { Link } from "react-router-dom";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const Chartbox = () => {
  return (
    <div className="chartbox">
      <div className="chart-info">
        <span>Total Users</span>
        <h2>12345</h2>

        <Link to={"users"}>All USers</Link>
      </div>
      <div className="chart-chart">
        <div className="chart">
          <ResponsiveContainer width="100%" height="50%">
            <LineChart data={data}>
              <Tooltip contentStyle={{background:"transparent",border:"none"}} labelStyle={{display:"none"}} />
              <Line
                type={"monotone"}
                dataKey={"pv"}
                stroke="#8884d6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage">45%</span>
          <span className="duration">This Month</span>
        </div>
      </div>
    </div>
  );
};

export default Chartbox;
