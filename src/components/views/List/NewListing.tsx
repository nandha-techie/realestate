import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { Button, Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  newList,
  fileUpload,
  getEditList,
  updateList,
} from "../../../services/Services";
import { getToken } from "../../utility/Helper";
import { useAppContext } from "../../../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValuesSchema = {
  name: string;
  description: string;
  address: string;
  contact: string;
  bed: string;
  baths: string;
  type: string;
  price: string;
  parking: boolean;
  furnished: boolean;
  offer: boolean;
  files?: null | any[];
};

const newListing = () => {
  const [listingImages, setListingImages] = useState<any[]>([]);
  const [imageError, setImageError] = useState<boolean | string>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<FormValuesSchema>({
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
  });
  const submitButton = useRef<HTMLButtonElement>(null);
  const uploadButton = useRef<HTMLButtonElement>(null);
  const uploadField = useRef<HTMLInputElement>(null);
  let navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAppContext();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .min(3, "please enter valid name")
      .max(40, "Name is tooo long"),
    description: Yup.string()
      .required("Required")
      .max(300, "Description is tooo long"),
    address: Yup.string().required("Required").max(300, "Address is too long"),
    contact: Yup.string()
      .required("Enter contact number")
      .matches(phoneRegExp, {
        message: "Invalid number",
        excludeEmptyString: false,
      })
      .min(10, "minimum 10 digits")
      .max(10, "maximum 10 digits"),
    price: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, {
        message: "Invalid number",
        excludeEmptyString: false,
      }),
    bed: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, {
        message: "Invalid number",
        excludeEmptyString: false,
      }),
    baths: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, {
        message: "Invalid number",
        excludeEmptyString: false,
      }),
    files: Yup.array().max(4, "Maximum 4 images allowed"),
  });

  const handleListing = async (values: FormValuesSchema) => {
    try {
      const payload: any = {
        ...values,
        image_urls: imageUrls.toString(),
        token: getToken(),
      };
      if (listingImages.length > 0 && imageUrls.length == 0) {
        setImageError("Please upload images");
        return;
      }

      if (imageUrls.length < 2) {
        return setImageError("Please upload at least 2 image");
      } else {
        setImageError("");
      }
      if (uploadButton.current) {
        uploadButton.current.disabled = true;
      }

      if (id) {
        let updateResponse = await updateList(id, payload);
        if (updateResponse?.success) {
          setImageError("");
          toast(updateResponse.success, {
            position: "top-right",
            type: "success",
            autoClose: 1000,
            onClose: () => navigate("/listing"),
          });
        }
        if (updateResponse.error) {
          let message: any = Object.values(updateResponse.error)[0];
          toast.warn(message);
          if (submitButton.current) {
            submitButton.current.disabled = false;
          }
        }
        return;
      }

      let response = await newList(payload);
      if (response?.success) {
        setImageError("");
        toast(response.success, {
          position: "top-right",
          type: "success",
          autoClose: 1000,
          onClose: () => navigate("/listing"),
        });
      }
      if (response.error) {
        let message: any = Object.values(response.error)[0];
        toast.warn(message);
        if (submitButton.current) {
          submitButton.current.disabled = false;
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleUpload = async () => {
    if (listingImages.length === 0) {
      setImageError("Please select images");
      return;
    }

    if (listingImages.length + imageUrls.length < 5) {
      let form = new FormData();
      for (var i = 0; i < listingImages.length; i++) {
        let file = listingImages[i];
        form.append("file[" + i + "]", file);
      }
      if (user) {
        const token = user[0];
        form.append("token", token.token);
      } else {
        form.append("token", "");
      }
      if (uploadButton.current) {
        uploadButton.current.disabled = true;
      }

      const response = await fileUpload(form);
      if (response.success) {
        setImageUrls([...imageUrls, ...response.urls]);
        setImageError("");
        toast(response.success, {
          position: "top-right",
          type: "success",
          autoClose: 1500,
        });
        if (uploadField.current) {
          uploadField.current.value = "";
        }
        if (uploadButton.current) {
          uploadButton.current.disabled = false;
        }
      }
      if (response.error) {
        let message: any = Object.values(response.error)[0];
        toast.warn(message);
        if (submitButton.current) {
          if (uploadButton.current) {
            uploadButton.current.disabled = false;
          }
        }
      }
    } else {
      setImageError("You can upload only 4 images per listing");
      if (uploadButton.current) {
        uploadButton.current.disabled = false;
      }
    }
  };

  const removeImages = (id: number) => {
    // const temp = imageUrls.filter((data, index) => index != id);
    imageUrls.splice(id, 1);
    setImageUrls([...imageUrls]);
  };

  useEffect(() => {
    if (id) {
      async function getListData() {
        const list = await getEditList(id);
        if (list) {
          console.log(list);
          setFormValues({
            name: list.data.name,
            description: list.data.description,
            address: list.data.address,
            contact: list.data.contact,
            bed: list.data.bed,
            baths: list.data.baths,
            type: list.data.type,
            price: list.data.regular_price,
            parking: list.data.parking == "true",
            furnished: list.data.furnished == "true",
            offer: list.data.offer == "true",
            files: [],
          });
          setImageUrls(list.data.image_urls.split(","));
        }
      }
      getListData();
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Container className="mb-5">
        <h2 className="text-center my-3">
          {id ? "Updating Listing" : "Create Listing"}
        </h2>
        <Formik
          initialValues={formValues}
          onSubmit={(values: FormValuesSchema) => {
            handleListing(values);
          }}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {(formik: FormikProps<FormValuesSchema>) => {
            const { setFieldValue } = formik;
            return (
              <Form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="name">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        placeholder="Enter username"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <Form.Text className="text-danger">
                          {formik.errors.name}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder="Enter description"
                      />
                      {formik.touched.description &&
                        formik.errors.description && (
                          <Form.Text className="text-danger">
                            {formik.errors.description}
                          </Form.Text>
                        )}
                    </Form.Group>
                    <FloatingLabel controlId="address" label="Address">
                      <Form.Control
                        type="textarea"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        placeholder="address"
                        style={{ height: "50px" }}
                      />
                    </FloatingLabel>
                    {formik.touched.address && formik.errors.address && (
                      <Form.Text className="text-danger">
                        {formik.errors.address}
                      </Form.Text>
                    )}
                    <Form.Group className="mb-3" controlId="contact">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="contact"
                        value={formik.values.contact}
                        onChange={formik.handleChange}
                        placeholder="contact"
                      />
                      {formik.touched.contact && formik.errors.contact && (
                        <Form.Text className="text-danger">
                          {formik.errors.contact}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="price">
                          <Form.Label>
                            Regular price <small>(Rs.)</small>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.price && formik.errors.price && (
                            <Form.Text className="text-danger">
                              {formik.errors.price}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="bed">
                          <Form.Label>Beds</Form.Label>
                          <Form.Control
                            type="text"
                            name="bed"
                            value={formik.values.bed}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.bed && formik.errors.bed && (
                            <Form.Text className="text-danger">
                              {formik.errors.bed}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="baths">
                          <Form.Label>Baths</Form.Label>
                          <Form.Control
                            type="text"
                            name="baths"
                            value={formik.values.baths}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.baths && formik.errors.baths && (
                            <Form.Text className="text-danger">
                              {formik.errors.baths}
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <Form.Check
                        inline
                        label="Rent"
                        name="type"
                        value="rent"
                        onChange={formik.handleChange}
                        type="radio"
                        id={`inline-rent-1`}
                        defaultChecked={formik.values.type === "rent"}
                      />
                      <Form.Check
                        inline
                        label="Sale"
                        name="type"
                        type="radio"
                        value="sale"
                        onChange={formik.handleChange}
                        id={`inline-sale-2`}
                        defaultChecked={formik.values.type === "sale"}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check
                        inline
                        label="Parking Spot"
                        name="parking"
                        type="checkbox"
                        id={`inline-parking-1`}
                        onChange={formik.handleChange}
                        checked={formik.values.parking}
                      />

                      <Form.Check
                        inline
                        label="Furnished"
                        name="furnished"
                        type="checkbox"
                        id={`inline-furnished-2`}
                        onChange={formik.handleChange}
                        checked={formik.values.furnished}
                      />
                      <Form.Check
                        inline
                        label="Offer"
                        type="checkbox"
                        id={`inline-offer-3`}
                        name="offer"
                        onChange={formik.handleChange}
                        checked={formik.values.offer}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formFileMultiple">
                      <Form.Label>Multiple files input example</Form.Label>
                      <Row className="mb-3">
                        <Col xs={6}>
                          <Form.Control
                            name="files"
                            type="file"
                            accept="image/*"
                            ref={uploadField}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (event.target.files) {
                                const filesArray = Array.from(
                                  event.target.files
                                );
                                setFieldValue("files", filesArray);
                                setListingImages(filesArray);
                                if (imageUrls.length < 2) {
                                  if (filesArray.length === 0) {
                                    setImageError("please select an images");
                                  }
                                }
                              }
                            }}
                            multiple
                          />
                        </Col>
                        <Col>
                          <Button
                            ref={uploadButton}
                            onClick={handleUpload}
                            variant="primary"
                          >
                            Upload
                          </Button>
                        </Col>
                      </Row>
                      {formik.touched.files && formik.errors.files && (
                        <Form.Text className="text-danger">
                          {formik.errors.files}
                        </Form.Text>
                      )}
                      {imageError && (
                        <Form.Text className="text-danger">
                          {imageError}
                        </Form.Text>
                      )}
                    </Form.Group>
                    <div>
                      {imageUrls &&
                        imageUrls.map((img, index) => (
                          <div key={index} className="d-flex gap-2 mb-3">
                            <img src={img} width="80" height="80" alt="" />
                            <p
                              className="text-danger"
                              role="button"
                              onClick={() => removeImages(index)}
                            >
                              Delete
                            </p>
                          </div>
                        ))}
                    </div>
                    <Button
                      className="mt-4"
                      ref={submitButton}
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Container>
    </>
  );
};

export default newListing;
