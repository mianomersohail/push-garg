import "./PanelDeal.css";
import DealNav from "./DealNav";
import NavOver from "./NavOver";
import MainPanel from "./MainPanel/MainPanelNav";
export default function PanelDeal() {
  return (
    <>
    <DealNav/>
    <NavOver/>
    <MainPanel/>
      <div className="container-fluid">
        <div className="row Panel-Deal-Nav">
          <div className="col-lg-6"></div>

        </div>
      </div>
    </>
  );
}
