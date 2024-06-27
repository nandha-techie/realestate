import { useNavigate } from "react-router-dom";

const WidgetsItems = (props: any) => {
  const { list } = props;
  const type: string = props.type;
  const navigate = useNavigate();
  return (
    <>
      <div className="mb-2 ">
        {type == "rent" ? <h3>Place for Rent</h3> : <h3>Place for Sale</h3>}
        <div
          onClick={() => {
            navigate("/search", { state: { type: type } });
          }}
          className="d-inline-block text-primary show-more"
          role="button"
        >
          Show more offers for {type}
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 gy-3 mb-4">
        {list.length > 0 &&
          list.map((data: any) => (
            <div key={data.list_id} className="col">
              <div
                className="card h-100"
                onClick={() => navigate(`/list-detail/${data.list_id}`)}
                role="button"
              >
                <div className="img_card border-0 border-bottom border-1">
                  <img
                    src={data.image_urls?.substring(
                      0,
                      data.image_urls.indexOf(",")
                    )}
                    className="card-img-top "
                    alt="data.description"
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">
                    {data.description}
                  </h5>
                  <p className="card-text flex-grow-1">{data.address}</p>
                  <div className="d-flex justify-content-between">
                    <span className="text-secondary">
                      Rs. {data.regular_price}
                    </span>
                    <span className="text-capitalize rounded-5 bg-success bg-opacity px-3 py-1 text-white">
                      {data.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default WidgetsItems;
