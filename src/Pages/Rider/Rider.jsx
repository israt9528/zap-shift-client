import React from "react";
import agentImg from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,

    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const serviceCenters = useLoaderData();
  const regionsDuplicated = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicated)];
  const riderRegion = useWatch({ control, name: "region" });
  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your application has been submitted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="mb-10 p-20 bg-white rounded-3xl shadow-2xl">
      <div className="border-b border-accent/50 pb-10">
        <h1 className="text-4xl font-bold text-secondary">Be a Rider</h1>
        <p className="text-accent">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal <br /> packages to business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <div className="flex justify-between items-center mt-10">
        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Tell us about yourself
          </h2>
          <form
            onSubmit={handleSubmit(handleRiderApplication)}
            className="text-black"
          >
            <div>{/* parcel name & weight */}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7">
              {/* service details */}
              <div className="font-bold space-y-5">
                <fieldset className="fieldset">
                  <label className="label text-black">Your Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    className="input w-full mb-3"
                    defaultValue={user?.displayName}
                    placeholder="Your Name"
                  />

                  <label className="label text-black">Your Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    className="input w-full mb-3"
                    defaultValue={user?.email}
                    placeholder="Your Email"
                  />
                  <label className="label text-black">NID No</label>
                  <input
                    type="number"
                    {...register("nidNo")}
                    className="input w-full mb-3"
                    placeholder="NID"
                  />
                  <label className="label text-black">Your Region</label>
                  <select
                    className="select w-full mb-3"
                    {...register("region")}
                    defaultValue="Select Your Region"
                  >
                    <option disabled={true}>Select Your Region</option>
                    {regions.map((r) => (
                      <option>{r}</option>
                    ))}
                  </select>
                </fieldset>
              </div>
              {/* receiver details */}
              <div className="font-bold space-y-5">
                <fieldset className="fieldset">
                  <label className="label text-black">Your Age</label>
                  <input
                    type="number"
                    {...register("age")}
                    className="input w-full mb-3"
                    placeholder="Your Age"
                  />
                  <label className="label text-black">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className="input w-full mb-3"
                    placeholder="Address"
                  />

                  <label className="label text-black">Contact</label>
                  <input
                    type="number"
                    {...register("contact")}
                    className="input w-full mb-3"
                    placeholder="Contact"
                  />

                  <label className="label text-black">Your District</label>
                  <select
                    className="select w-full mb-3"
                    {...register("district")}
                    defaultValue="Select Your District"
                  >
                    <option disabled={true}>Select Your District</option>
                    {districtsByRegion(riderRegion).map((d, i) => (
                      <option key={i}>{d}</option>
                    ))}
                  </select>
                </fieldset>
              </div>
            </div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-primary text-black"
            />
          </form>
        </div>
        <div>
          <img src={agentImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
