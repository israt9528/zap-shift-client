import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ userReview }) => {
  //   console.log(userReview);
  const { review, userName, user_photoURL, user_email } = userReview;

  return (
    <div>
      <div className="bg-white rounded-xl shadow-2xl p-6 w-cover">
        {/* Quote Icon */}
        <FaQuoteLeft className="text-secondary text-3xl mb-4" />

        {/* Review Text */}
        <p className="text-accent leading-relaxed font-bold">{review}</p>

        {/* Divider */}
        <div className="border-b border-dashed my-4"></div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* Circle Avatar */}
          <div>
            <img
              src={user_photoURL}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>

          <div>
            <h3 className="font-semibold text-secondary">{userName}</h3>
            <p className="text-sm text-accent">{user_email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
