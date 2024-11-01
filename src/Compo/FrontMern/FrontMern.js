import "./FrontMern.css";
import { Box ,Image,Badge} from "@chakra-ui/react";
import PaidUser from "../PaidUser/PaidUser";
import Footer from "../Footer2.js/Footer2";
import { StarIcon } from "@chakra-ui/icons";
import FrontMernList from './FrontMernList'
import MernFrontData from './FrontMernData'
export default function FrontMern() {
  
  const url = "https://www.youtube.com/watch?v=oTNRYy0VOfY&t=70s";
  const videoId = new URL(url).searchParams.get("v");
  return (
    <>
      <PaidUser />
      <FrontMernList  property={MernFrontData}/>
      <div className="container offset-lg-1">
        <div className="row">
          <div className="col-lg-6">
            
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
