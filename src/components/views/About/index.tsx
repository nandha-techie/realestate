const About = () => {
  return (
    <>
      <div className="container">
        <div className="my-5">
          <h3>About Realestate</h3>
          <p>
            About RealEstate RealEstate is a leading real estate agency that
            specializes in helping clients buy, sell, and rent properties in the
            most desirable neighborhoods. Our team of experienced agents is
            dedicated to providing exceptional service and making the buying and
            selling process as smooth as possible.
          </p>
          <p>
            Our mission is to help our clients achieve their real estate goals
            by providing expert advice, personalized service, and a deep
            understanding of the local market. Whether you are looking to buy,
            sell, or rent a property, we are here to help you every step of the
            way.
          </p>
          <p>
            Our team of agents has a wealth of experience and knowledge in the
            real estate industry, and we are committed to providing the highest
            level of service to our clients. We believe that buying or selling a
            property should be an exciting and rewarding experience, and we are
            dedicated to making that a reality for each and every one of our
            clients.
          </p>
        </div>
        <section className="d-flex justify-content-evenly">
          <div className="d-flex flex-column align-items-center">
            <img
              className="rounded-circle mb-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
              width={100}
              height={100}
            />
            <h6>John Gilbert</h6>
            <p className="mb-1">0987654321</p>
            <p className="fw-semibold">CEO</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <img
              className="rounded-circle mb-2"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
              width={100}
              height={100}
            />
            <h6>Ashwini</h6>
            <p className="mb-1">0987654321</p>
            <p className="fw-semibold">President</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <img
              className="rounded-circle mb-2"
              src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png"
              alt=""
              width={100}
              height={100}
            />
            <h6>Vishal Varma</h6>
            <p className="mb-1">08787654321</p>
            <p className="fw-semibold">Director</p>
          </div>
          <div className="d-flex flex-column align-items-center">
            <img
              className="rounded-circle mb-2"
              src="https://www.shutterstock.com/image-photo/close-portrait-smiling-young-caucasian-260nw-1898328466.jpg"
              alt=""
              width={100}
              height={100}
            />
            <h6>Pooja</h6>
            <p className="mb-1">0997654321</p>
            <p className="fw-semibold">Marketing Manager</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
