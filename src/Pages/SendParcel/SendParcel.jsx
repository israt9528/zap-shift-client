import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    // formState: { errors },
  } = useForm();

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData();
  const regionsDuplicated = serviceCenters.map((c) => c.region);
  const regions = [...new Set(regionsDuplicated)];
  const senderRegion = watch("senderRegion");
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegion = (region) => {
    const regionDistricts = serviceCenters.filter((c) => c.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    Swal.fire({
      title: "Are you agree?",
      text: `The cost will be ${cost}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, i agree!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/parcels", data).then((res) => {
          console.log(res.data);
        });

        // Swal.fire({
        //   title: "Booked!",
        //   text: "Your order has been placed.",
        //   icon: "success",
        // });
      }
    });

    console.log(cost);
  };

  return (
    <div className="p-20 bg-white mb-10 rounded-4xl shadow">
      <h2 className="text-secondary text-4xl font-bold">Send A Parcel</h2>
      <p className="text-secondary font-bold text-lg mt-6 pb-5 border-b border-gray-300">
        Enter your parcel details
      </p>
      <form onSubmit={handleSubmit(handleSendParcel)} className="text-black">
        <div>
          {/* radio button */}
          <div className="space-x-10 py-5">
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                className="radio radio-success"
                defaultChecked
              />
              Document
            </label>
            <label className="label">
              <input
                type="radio"
                {...register("parcelType")}
                value="non-document"
                className="radio radio-success"
              />
              Non-Document
            </label>
          </div>
          {/* parcel name & weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 font-bold gap-7 pb-7 border-b border-gray-300">
            <fieldset className="fieldset">
              <label className="label text-black">Parcel Name</label>
              <input
                type="text"
                {...register("parcelName")}
                className="input w-full"
                placeholder="Parcel Name"
              />
            </fieldset>
            <fieldset className="fieldset">
              <label className="label text-black">Parcel Weight (KG)</label>
              <input
                type="number"
                {...register("parcelWeight")}
                className="input w-full"
                placeholder="Parcel Weight (KG)"
              />
            </fieldset>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 my-7">
          {/* service details */}
          <div className="font-bold space-y-5">
            <h3 className="text-secondary text-lg">Sender Details</h3>
            <fieldset className="fieldset">
              <label className="label text-black">Sender Name</label>
              <input
                type="text"
                {...register("senderName")}
                className="input w-full mb-3"
                defaultValue={user?.displayName}
                placeholder="Sender Name"
              />
              <label className="label text-black">Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full mb-3"
                placeholder="Address"
              />
              <label className="label text-black">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                className="input w-full mb-3"
                defaultValue={user?.email}
                placeholder="Sender Email"
              />
              <label className="label text-black">Sender Region</label>
              <select
                className="select w-full mb-3"
                {...register("senderRegion")}
                defaultValue="Select Sender Region"
              >
                <option disabled={true}>Select Sender Region</option>
                {regions.map((r) => (
                  <option>{r}</option>
                ))}
              </select>
              <label className="label text-black">Sender District</label>
              <select
                className="select w-full mb-3"
                {...register("senderDistrict")}
                defaultValue="Select Sender District"
              >
                <option disabled={true}>Select Sender District</option>
                {districtsByRegion(senderRegion).map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
              <label className="label text-black">Pickup Instruction</label>
              <textarea
                className="textarea w-full"
                {...register("senderInstruction")}
                placeholder="Pickup Instruction"
              ></textarea>
            </fieldset>
          </div>
          {/* receiver details */}
          <div className="font-bold space-y-5">
            <h3 className="text-secondary text-lg">Receiver Details</h3>
            <fieldset className="fieldset">
              <label className="label text-black">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full mb-3"
                placeholder="Receiver Name"
              />
              <label className="label text-black">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full mb-3"
                placeholder="Receiver Address"
              />
              <label className="label text-black">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full mb-3"
                placeholder="Receiver Email"
              />
              <label className="label text-black">Receiver Region</label>
              <select
                className="select w-full mb-3"
                {...register("receiverRegion")}
                defaultValue="Select Receiver Region"
              >
                <option disabled={true}>Select Receiver Region</option>
                {regions.map((r) => (
                  <option>{r}</option>
                ))}
              </select>
              <label className="label text-black">Receiver District</label>
              <select
                className="select w-full mb-3"
                {...register("receiverDistrict")}
                defaultValue="Select Receiver District"
              >
                <option disabled={true}>Select Receiver District</option>
                {districtsByRegion(receiverRegion).map((d, i) => (
                  <option key={i}>{d}</option>
                ))}
              </select>
              <label className="label text-black">Delivery Instruction</label>
              <textarea
                className="textarea w-full"
                {...register("receiverInstruction")}
                placeholder="Delivery Instruction"
              ></textarea>
            </fieldset>
          </div>
        </div>
        <p className="text-sm mb-7">* PickUp Time 4pm-7pm Approx.</p>
        <input
          type="submit"
          value="Proceed to Confirm Booking"
          className="btn btn-primary text-black"
        />
      </form>
    </div>
  );
};

export default SendParcel;
