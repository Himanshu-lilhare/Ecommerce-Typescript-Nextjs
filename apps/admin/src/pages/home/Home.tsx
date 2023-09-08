import BarChart from "../../components/homeboxes/barchartbox/BarChart"
import Box1 from "../../components/homeboxes/box1/Box1"
import Chartbox from "../../components/homeboxes/linechartbox/Chartbox"

import "./home.scss"
const Home = () => {
  return (
    <div className="home">
      <div className="box box1">
      <Box1/>
      </div>
      <div className="box box2">
        <Chartbox/>
      </div>
      <div className="box box3">
      <Chartbox/>
      </div>
      <div className="box box4">
        box4
      </div>
      <div className="box box5">
      <Chartbox/>
      </div>
      <div className="box box6">
      <Chartbox/>
      </div>
      <div className="box box7">
box 7
      </div>
      <div className="box box8">
      <BarChart/>
      </div>
      <div className="box box9">
      <BarChart/>
      </div>
    </div>
  )
}

export default Home