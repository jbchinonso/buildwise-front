import React from "react";
import ProfileForm from "./ProfileForm";

const Profile = () => {
  return (
    <section className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap gap-4 gap-x-20 w-full p-2">
        <ProfileForm />
      </div>
    </section>
  );
};

export default Profile;
