import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Button, Container, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListing, deleteList } from "../../../services/Services";
import { ListingSchema, convertToFormattedDate } from "../../utility/Helper";

const Listing = () => {
  const [lists, setLists] = useState<ListingSchema[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);
  let navigate = useNavigate();

  const removeList = async (id: string) => {
    setButtonState(true);

    const response = await deleteList(id);
    if (response?.success) {
      if (response?.success) {
        toast(response.success, {
          position: "top-right",
          type: "success",
          autoClose: 1000,
          onClose: () => navigate("/listing"),
        });
        setButtonState(false);

        setLists(lists.filter((data) => data.list_id != id));
      }
      if (response.error) {
        let message: any = Object.values(response.error)[0];
        toast.warn(message);
        setButtonState(false);
      }
    }
  };

  useEffect(() => {
    async function getListingData() {
      const response = await getListing();
      setLists(response.data);
    }
    getListingData();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 p-2">
            {lists?.length > 0 &&
              lists.map((list) => (
                <div
                  key={list.list_id}
                  className="d-flex justify-content-between p-2 py-4 mb-3 shadow-sm text-bg-light "
                >
                  <div
                    className="d-flex "
                    onClick={() => navigate(`/list-detail/${list.list_id}`)}
                    role="button"
                  >
                    {list?.image_urls && (
                      <img
                        className="rounded"
                        width={100}
                        height={100}
                        src={list?.image_urls.substr(
                          0,
                          list?.image_urls.search(",")
                        )}
                        alt=""
                      />
                    )}
                    <p className="ms-2 align-self-center">{list.name}</p>
                  </div>
                  <div className="d-flex flex-column justify-content-between align-items-end">
                    <div className="d-grid gap-2 col-7">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigate(`/edit-listing/${list.list_id}`);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          removeList(list.list_id);
                        }}
                        disabled={buttonState}
                      >
                        Delete
                      </button>
                    </div>
                    <p className="pt-2">
                      {convertToFormattedDate(list.date_added)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Listing;
