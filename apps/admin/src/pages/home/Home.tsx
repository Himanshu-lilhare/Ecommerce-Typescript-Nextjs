import LoadingSkeleton from "../../components/Loading/skeleton/LoadingSkeleton";
import BarChart from "../../components/homeboxes/barchartbox/BarChart";
import Box1 from "../../components/homeboxes/box1/Box1";
import Chartbox from "../../components/homeboxes/linechartbox/Chartbox";
import { useGetStatsQuery } from "../../services/statsApi";

import "./home.scss";
const Home = () => {
  const { data, isLoading } = useGetStatsQuery();

  return (
    <div className="home">
      <div className="box box1">
        {isLoading && <LoadingSkeleton />}

        {data?.top3Products && <Box1 top3Products={data?.top3Products} />}
      </div>
      <div className="box box2">
        {isLoading && <LoadingSkeleton />}
        {data && <Chartbox userStats={data?.userStats} title={"Users"} />}
      </div>
      <div className="box box3">
        {isLoading && <LoadingSkeleton />}
        {data && <Chartbox orderStats={data?.orderStats} title={"Orders"} />}
      </div>
      <div className="box box4">
        {isLoading && <LoadingSkeleton />}
        {data && <BarChart title="Users"/>}
      </div>
      <div className="box box5">
        {isLoading && <LoadingSkeleton />}
        {data && <BarChart title="Products"/>}
      </div>
    </div>
  );
};

export default Home;
