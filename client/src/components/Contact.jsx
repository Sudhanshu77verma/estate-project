import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contact({ listing }) {
  const [Landlord, setLandlord] = useState(null);
  console.log(Landlord);
  console.log(listing);
  const [message, setmessage] = useState("");

  const onChange = (e) => {
    setmessage(e.target.value);
  };
  //  console.log(message)
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <div>
      {Landlord && (
        <div className="flex flex-col gap-3 mt-8">
          <p>
            Contact <span className="font-semibold mr-2">{Landlord.username}</span>
             for
            <span className="font-semibold ml-2">{listing.name.toLowerCase()}</span>
          </p>

          <textarea className="w-full border bg-orange-50 border-gray-400 rounded-md -2 mt-2 p-1 "
            name="message"
            id="message"
            placeholder=" Enter Your message"
            rows="2"
            value={message}
            onChange={onChange}
          ></textarea>

          <Link to={`mailto:${Landlord.email}?subject=Regarding${listing.name}&body=${message}`} className="bg-slate-700 text-white text-center uppercase rounded-md p-2 hover:opacity-95 "> Send Message</Link>
        </div>
      )}
    </div>
  );
}

export default Contact;
