import { useEffect, useState } from "react";

import {
  getProfile,
  updateProfile,
} from "../services/profileService";
import "../styles/profile.css";
const Profile = () => {

  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");

  const loadProfile = async () => {

    try {

      const response =
        await getProfile();

      setProfile(response.data.data);

      setName(response.data.data.name);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    loadProfile();

  }, []);

  const handleUpdate = async () => {

    try {

      const response =
        await updateProfile({ name });

      setProfile(response.data.data);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      alert("Profile Updated");

    } catch (error) {

      console.log(error);

    }

  };

  if (!profile) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">

          {profile.name.charAt(0).toUpperCase()}

        </div>

        <div className="profile-info">

          <h2>My Profile</h2>

          <label>Name</label>

          <input
            value={name}
            onChange={(e)=>
              setName(e.target.value)
            }
          />

          <label>Email</label>

          <input
            value={profile.email}
            disabled
          />

          <label>Role</label>

          <input
            value={profile.role}
            disabled
          />

          <label>Joined</label>

          <input
            value={
              new Date(
                profile.created_at
              ).toLocaleDateString()
            }
            disabled
          />

          <button
            className="primary-btn"
            onClick={handleUpdate}
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>

  );

};

export default Profile;