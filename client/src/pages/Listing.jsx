import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { TiLocationOutline } from "react-icons/ti";
import { FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

function Listing() {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const params = useParams();
  const [contact, setcontact] = useState(false);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);

  console.log(listing);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setloading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setloading(false);
          return;
        }
        setloading(false);
        setListing(data);
        setError(false);
        // console.log(listing)
      } catch (error) {
        setError(true);
      }
    };
    fetchListing();
  }, []);

  return (
    <main>
      {loading && (
        <p className="spinner w-[100vw] h-[100vh] mx-auto my-10 "> </p>
      )}
      {error && (
        <p className="text-2xl text-red-700 text-center">
          {" "}
          Something went wrong !
        </p>
      )}

      {listing && !error && !loading && (
        <div className="flex flex-col items-center justify-center gap-5">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className=" ">
                  {/* //  style={{background :` url(${url}) center no-repeat `,  backgroundSize:'cover'} } */}
                  <img
                    src={url}
                    className="h-[350px] min-w-96 mt-14 rounded-xl border border-slate-800  "
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col items-start gap-3 ml-5 ">
            <p className="flex flex-row justify-start items-center gap-1 ">
              <TiLocationOutline className="text-green-700 "></TiLocationOutline>

              <span className="text-[15px] opacity-80">{listing.address}</span>
            </p>

            <div className="flex flex-row items-center gap-2 mt-5">
              <p className="bg-red-900  w-[200px] text-white text-center rounded-sm p-1 ">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>

              {listing.offer && (
                // <div >
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center rounded-sm p-1  ">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>

            <p>
              {" "}
              <span className="font-bold">Description- </span>
              {listing.description}
            </p>

            <ul className="flex flex-wrap gap-4">
              <li className="flex flex-row items-center gap-3 text-green-900 ">
                <FaBed></FaBed>
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>

              <li className="flex flex-row items-center gap-3 text-green-900 ">
                <FaBath></FaBath>
                {listing.bathrrooms > 1
                  ? `${listing.bathrooms} bathrooms`
                  : `${listing.bathrooms} bathroom`}
              </li>

              <li className="flex flex-row items-center gap-2 text-green-900 ">
                <FaParking></FaParking>
                {listing.parking ? "Parking" : "No Parking"}
              </li>

              <li className="flex flex-row items-center gap-3 text-green-900 ">
                <FaChair></FaChair>
                {listing.furnished ? "Furnished" : "UnFurnished"}
              </li>
            </ul>

            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setcontact(true)}
                className="bg-slate-700  text-white rounded-lg uppercase hover:opacity-95 p-3"
              >
                Contact Landlord
              </button>
            )}

            {contact && <Contact listing={listing}></Contact>}
          </div>
        </div>
      )}
    </main>
  );
}

export default Listing;
