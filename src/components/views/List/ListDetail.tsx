import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import {
  GeoAltFill,
  PersonFill,
  Envelope,
  Check2Circle,
} from "react-bootstrap-icons";
import { FormValuesSchema } from "../../utility/Helper";
import { getListdetail } from "../../../services/Services";
import { useParams } from "react-router-dom";
const ListDetail = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [list, setList] = useState<FormValuesSchema>({
    name: "",
    description: "",
    address: "",
    contact: "",
    bed: "",
    baths: "",
    type: "rent",
    price: "",
    parking: false,
    furnished: false,
    offer: false,
    files: [],
    email: "",
  });
  const { id } = useParams();

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (id) {
      async function getListData() {
        const response = await getListdetail(id);
        if (response) {
          setList({
            name: response.data.name,
            description: response.data.description,
            address: response.data.address,
            contact: response.data.contact,
            bed: response.data.bed,
            baths: response.data.baths,
            type: response.data.type,
            price: response.data.regular_price,
            parking: response.data.parking == "true",
            furnished: response.data.furnished == "true",
            offer: response.data.offer == "true",
            files: [],
            email: response.data.user_email,
          });
          setImageUrls(response.data.image_urls.split(","));
        }
      }
      getListData();
    }
  }, []);

  return (
    <>
      <Carousel
        data-bs-theme="dark"
        activeIndex={index}
        onSelect={handleSelect}
        className=""
        controls={true}
        indicators={false}
      >
        {imageUrls.length > 0 &&
          imageUrls.map((image, indexNo) => (
            <Carousel.Item key={indexNo} className="">
              <Image
                src={image}
                className="d-block w-100"
                height={600}
                alt="..."
              />
            </Carousel.Item>
          ))}
      </Carousel>
      <div className="container-fluid bg-body-tertiary">
        <div className="d-flex justify-content-around py-3 px-2">
          <div>
            <div className="d-flex flex-column row-gap-3">
              <h3>Price: {list.price}/-</h3>
              <div>
                <GeoAltFill color="#7DB713" size={20} />
                <span className="mw-50 ps-3">{list.address}</span>
              </div>
              <p className="badge text-bg-primary text-capitalize fs-4 align-self-start  px-5 mb-0">
                {list.type}
              </p>
              <p>
                <strong>Details:</strong> {list.description}
              </p>
            </div>
            <div className="d-flex ">
              <span className="me-2">{list.bed} Beds</span>
              <span className="me-2">{list.baths} Baths</span>
              {list.parking && (
                <span className="me-2">
                  Parking <Check2Circle />
                </span>
              )}
              {list.furnished && (
                <span className="me-2">
                  Furnished <Check2Circle />
                </span>
              )}
            </div>
          </div>
          <div className="d-flex flex-column row-gap-2 bg-white p-3 shadow-sm">
            <h4>Owner details</h4>
            <hr className="w-100  border-danger border-2 opacity-50" />
            <div className="d-flex column-gap-3">
              <span>
                <PersonFill /> Name
              </span>
              <span>{list.name}</span>
            </div>
            <div className="d-flex column-gap-3">
              <span>
                <Envelope /> Email
              </span>
              <span>{list.email}</span>
            </div>
            <div className="d-flex column-gap-3">
              <span>
                <Check2Circle /> Phone
              </span>
              <span>{list.contact}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListDetail;
