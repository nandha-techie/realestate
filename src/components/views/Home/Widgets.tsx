import { useEffect, useState } from "react";
import { getHomeList } from "../../../services/Services";
import WidgetsItems from "./WidgetItems";

const Widgets = () => {
  const [saleList, setSaleList] = useState([]);
  const [rentList, setRentList] = useState([]);

  useEffect(() => {
    const getAllData = async () => {
      const response = await getHomeList();
      setRentList(response?.rent);
      setSaleList(response?.sale);
    };
    getAllData();
  }, []);

  return (
    <div className="container">
      {rentList.length > 0 && <WidgetsItems list={rentList} type={"rent"} />}
      {rentList.length > 0 && <WidgetsItems list={saleList} type={"sale"} />}
    </div>
  );
};
export default Widgets;
