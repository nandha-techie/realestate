import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search as BiSearch } from "react-bootstrap-icons";
import { SearchInputSchema, ListingSchema } from "../../utility/Helper";
import { searchList } from "../../../services/Services";

const Search = () => {
  const [list, setList] = useState<ListingSchema[]>([]);
  const [paramField, setParamField] = useState("");
  const [limit, setLimit] = useState(0);
  const [showMore, setShowMore] = useState<boolean>(true);
  const searchParam = useLocation();
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState<SearchInputSchema>({
    search: "",
    type: "alltype",
    parking: false,
    furnished: false,
    offer: false,
    sort: "new_list",
    limit: 0,
  });
  if (paramField != searchParam.state?.search && searchParam.state?.search) {
    setParamField(searchParam.state?.search);
    setFormInput({ ...formInput, search: searchParam.state?.search });
  }
  const handleSubmit = async (e: React.SyntheticEvent) => {
    setShowMore(true);
    e.preventDefault();
    console.log(showMore);
    const response = await searchList({ ...formInput, limit: 0 });
    if (response?.data?.length === 0) {
      setShowMore(false);
    }
    setList(response?.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "checkbox") {
      setFormInput({ ...formInput, [e.target.name]: e.target.checked });
    } else {
      setFormInput({ ...formInput, [e.target.name]: e.target.value });
    }
  };
  const handleSelectBoxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const fetchDataLimit = async () => {
    const response = await searchList({ ...formInput, limit: limit + 4 });
    console.log(response?.data?.length);
    if (response?.data?.length === 0) {
      setShowMore(false);
    }
    setList([...list, ...response?.data]);
    setLimit(limit + 4);
  };

  useEffect(() => {
    if (searchParam.state?.type) {
      setFormInput({ ...formInput, type: searchParam.state?.type });
    }

    async function getAllList() {
      setShowMore(true);
      const response = await searchList({
        ...formInput,
        type: searchParam.state?.type
          ? searchParam.state?.type
          : formInput.type,
      });
      //console.log(response?.data?.length);
      if (response?.data?.length === 0) {
        console.log(showMore);
        setShowMore(false);
      }
      setList(response.data);
      setLimit(0);
    }
    getAllList();
  }, [paramField, formInput.type]);

  return (
    <>
      <div className="container-fluid">
        <div className="row py-2">
          <div className="col-md-3">
            <h3>Filters</h3>
            <div className="border p-3">
              <form
                className=""
                onSubmit={(e) => {
                  setLimit(limit - limit);
                  handleSubmit(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="search" className="form-label">
                    Search
                  </label>
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control pe-4"
                      name="search"
                      value={formInput.search}
                      placeholder="Search"
                      onChange={handleChange}
                    />
                    <span className="ms-n4 mt-n1 z-3" id="basic-addon1">
                      <BiSearch />
                    </span>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="alltype"
                      value="alltype"
                      onChange={handleChange}
                      checked={formInput.type == "alltype"}
                    />
                    <label className="form-check-label" htmlFor="alltype">
                      Rent & Sale
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="rent"
                      value="rent"
                      onChange={handleChange}
                      checked={formInput.type == "rent"}
                    />
                    <label className="form-check-label" htmlFor="rent">
                      Rent
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="type"
                      id="sale"
                      value="sale"
                      onChange={handleChange}
                      checked={formInput.type == "sale"}
                    />
                    <label className="form-check-label" htmlFor="sale">
                      Sale
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="parking"
                      name="parking"
                      onChange={handleChange}
                      checked={formInput.parking}
                    />
                    <label className="form-check-label" htmlFor="parking">
                      Parking
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="furnished"
                      name="furnished"
                      onChange={handleChange}
                      checked={formInput.furnished}
                    />
                    <label className="form-check-label" htmlFor="furnished">
                      Furnished
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="offer"
                      name="offer"
                      onChange={handleChange}
                      checked={formInput.offer}
                    />
                    <label className="form-check-label" htmlFor="offer">
                      Offer
                    </label>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="sort">
                    Sort
                  </label>
                  <select
                    className="form-select"
                    aria-label="sort"
                    name="sort"
                    onChange={handleSelectBoxChange}
                    defaultValue={"new_list"}
                  >
                    <option value="new_list">Latest</option>
                    <option value="old_list">Oldest</option>
                    <option value="high_price">Price high to low</option>
                    <option value="low_price">Price low to high</option>
                  </select>
                </div>
                <div className="d-grid col-12">
                  <button className="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-9">
            <h3>Listing results</h3>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 gy-3">
              {list.length > 0 &&
                list.map((data) => (
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
            {showMore && (
              <div>
                <button
                  onClick={() => {
                    fetchDataLimit();
                  }}
                  className="btn btn-link"
                >
                  Show more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
