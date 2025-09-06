"use client";
import { useEffect, useState } from "react";

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    country_code: "",
    date_of_birth: "",
    country: "",
    state: "",
    city: "",
    zipcode: "",
    organization: "",
    designation: "",
    referral_source: "",
    bio: "",
    profile_image_url: "",
    completion_percentage: 0,
    checklist: {},
    current_position: [{ position: "", organization: "", year: "", location: "" }],
    education: [{ degree: "", university: "", year: "" }],
    skills: [],
    areas_of_research_interest: [],
    equipment_and_technology_interest: [],
    publication_alerts_enabled: false,
    alert_frequency: "Weekly",
  });

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(false);


  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://65.2.4.179:8000/api/v1/profile/account/profile-progress",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to fetch profile please Login");
        return;
      }

      const data = await response.json();

      setFormData({
        ...data,
        current_position: Array.isArray(data.current_position)
          ? data.current_position
          : [{ location: "", organization: "", position: "", year: "" }],
        education: Array.isArray(data.education)
          ? data.education
          : [{ degree: "", university: "", year: "" }],
        skills: Array.isArray(data.skills) ? data.skills : [""],
        areas_of_research_interest: Array.isArray(data.areas_of_research_interest)
          ? data.areas_of_research_interest
          : [""],
        equipment_and_technology_interest: Array.isArray(data.equipment_and_technology_interest)
          ? data.equipment_and_technology_interest
          : [""],
      });
    } catch (err) {
      console.log("profile photo error:" + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);


  // const fetchprofileData = async () => {
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const response = await fetch(
  //       "http://65.2.4.179:8000/api/v1/profile/account/profile_details",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           accept: "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       const error = await response.json();
  //       alert("Failed to fetch profile: " + JSON.stringify(error));
  //       return;
  //     }

  //     const data = await response.json();
  //     console.log("profile ka data", data);
  //   } catch (err) {
  //     alert("Error loading profile: " + err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchprofileData();
  // }, []);


  // Handle form input change..
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save / Update Profile API Call..
  const handleprofileSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://65.2.4.179:8000/api/v1/profile/account/profile",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile updated:", data);

      alert("Profile updated successfully ✅");
      setEditMode(false);
      showData(); // refresh profile after save
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong while updating profile ❌");
    }
  };


  const handleArrayChange = (field, index, key, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index][key] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleSimpleArrayChange = (field, index, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const showData = async () => {
    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.warn("Access token is missing from localStorage");
        return;
      }

      const response = await fetch(
        "http://65.2.4.179:8000/api/v1/profile/account/profile_details",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("API Error Response:", text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Profile Data:", data);

      // populate state with API response
      setFormData((prev) => ({
        ...prev,
        ...data, // API keys must match formData keys
      }));
    } catch (error) {
      console.error("Error:", error.message || error);
    }
  };

  useEffect(() => {
    showData();
  }, []);


  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(
        "http://65.2.4.179:8000/api/v1/profile/account/profile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Update failed: " + JSON.stringify(error));
      } else {
        alert("Profile updated successfully");
        setEditMode(false);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  if (loading || !formData) {
    return <div className="text-center py-10">Loading profile...</div>;
  }


  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        "http://65.2.4.179:8000/api/v1/profile/account/profile-image/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete. Status: ${response.status}`);
      }

      const data = await response.json(); // parse JSON body
      console.log("Profile image deleted:", data);

      // Refresh profile data
      fetchProfile();
    } catch (error) {
      console.error("Error deleting profile image:", error);
    }
  };

  return (
    <main className="flex-1 mt-[30px] mx-[30px] pb-4">
      {/* Overview Section */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-bold mb-2">Profile Overview</h2>
        <div className="text-sm text-gray-700">
          <p><strong>Completion:</strong> {formData?.completion_percentage ?? 0}%</p>
          <ul className="flex flex-wrap gap-4 mt-2">
            {formData?.checklist &&
              Object.entries(formData.checklist).map(([key, value]) => (
                <li
                  key={key}
                  className={`flex items-center gap-2 p-3 rounded-lg border ${value ? "text-black border-green-300" : "text-red-600 border-red-300"}`}
                >
                  <span className="font-medium">{key.replace(/_/g, " ")}</span>
                  <span className={`px-2 py-1 text-sm rounded-full text-white ${value ? "bg-green-500" : "bg-red-500"}`}>
                    {value ? "Completed" : "Pending"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Personal Info */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Personal Information</h3>
          <div className="flex gap-3">
            {editMode && (
              <button
                onClick={handleprofileSave}
                className="text-white bg-green-600 text-sm px-3 py-1 rounded"
              >
                Save
              </button>
            )}
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="text-blue-600 text-sm"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <img
              src={formData?.profile_image_url || "/default-avatar.png"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border"
            />
            <button
              onClick={handleDelete}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
            {editMode && (
              <input
                type="file"
                accept="image/*"
                className="mt-2 text-xs"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  try {
                    const token = localStorage.getItem("access_token");
                    const formDataUpload = new FormData();
                    formDataUpload.append("file", file);

                    const response = await fetch(
                      "http://65.2.4.179:8000/api/v1/profile/account/profile-image/upload",
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        body: formDataUpload,
                      }
                    );

                    if (!response.ok) {
                      const error = await response.json();
                      alert("Image upload failed: " + JSON.stringify(error));
                      return;
                    }

                    const result = await response.json();
                    console.log("Upload success:", result);

                    setFormData((prev) => ({
                      ...prev,
                      profile_image_url: result.profile_image_url,
                    }));
                  } catch (err) {
                    console.error("Upload error:", err);
                    alert("Something went wrong while uploading image");
                  }
                }}
              />
            )}
          </div>

          {/* Other Details */}
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { name: "full_name", label: "Full Name" },
              { name: "mobile", label: "Mobile" },
              { name: "country_code", label: "Country Code" },
              { name: "date_of_birth", label: "Date of Birth", type: "date" },
              { name: "country", label: "Country" },
              { name: "state", label: "State" },
              { name: "city", label: "City" },
              { name: "zipcode", label: "Zipcode" },
              { name: "organization", label: "Organization" },
              { name: "designation", label: "Designation" },
              { name: "referral_source", label: "Referral Source" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <p className="text-sm text-gray-600">{label}</p>
                {editMode ? (
                  <input
                    type={type}
                    name={name}
                    value={formData?.[name] ?? ""}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p className="font-medium">{formData?.[name] ?? ""}</p>
                )}
              </div>
            ))}
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Bio</p>
              {editMode ? (
                <textarea
                  name="bio"
                  value={formData?.bio ?? ""}
                  onChange={handleChange}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <p className="font-medium">{formData?.bio ?? ""}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Details */}
      <section className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-bold mb-4">Professional Details</h3>
        <h4 className="font-semibold">Current Position</h4>
        {editMode ? (
          (formData?.current_position ?? []).map((item, index) => (
            <div key={index}>
              <input
                type="text"
                value={item?.position ?? ""}
                onChange={(e) =>
                  handleArrayChange("current_position", index, "position", e.target.value)
                }
                placeholder="Position"
                className="border p-1 rounded w-full my-1"
              />
              <input
                type="text"
                value={item?.organization ?? ""}
                onChange={(e) =>
                  handleArrayChange("current_position", index, "organization", e.target.value)
                }
                placeholder="Organization"
                className="border p-1 rounded w-full my-1"
              />
              <input
                type="text"
                value={item?.year ?? ""}
                onChange={(e) =>
                  handleArrayChange("current_position", index, "year", e.target.value)
                }
                placeholder="Year"
                className="border p-1 rounded w-full my-1"
              />
              <input
                type="text"
                value={item?.location ?? ""}
                onChange={(e) =>
                  handleArrayChange("current_position", index, "location", e.target.value)
                }
                placeholder="Location"
                className="border p-1 rounded w-full my-1"
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-700">
            {formData?.current_position?.[0]?.position ?? ""} <br />
            {formData?.current_position?.[0]?.organization ?? ""} <br />
            {formData?.current_position?.[0]?.year ?? ""} •{" "}
            {formData?.current_position?.[0]?.location ?? ""}
          </p>
        )}

        <h4 className="mt-4 font-semibold">Education</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          {(formData?.education ?? []).map((edu, index) =>
            editMode ? (
              <li key={index}>
                <input
                  type="text"
                  value={edu?.degree ?? ""}
                  onChange={(e) =>
                    handleArrayChange("education", index, "degree", e.target.value)
                  }
                  placeholder="Degree"
                  className="border p-1 rounded w-full my-1"
                />
                <input
                  type="text"
                  value={edu?.university ?? ""}
                  onChange={(e) =>
                    handleArrayChange("education", index, "university", e.target.value)
                  }
                  placeholder="University"
                  className="border p-1 rounded w-full my-1"
                />
                <input
                  type="text"
                  value={edu?.year ?? ""}
                  onChange={(e) =>
                    handleArrayChange("education", index, "year", e.target.value)
                  }
                  placeholder="Year"
                  className="border p-1 rounded w-full my-1"
                />
              </li>
            ) : (
              <li key={index}>
                {edu?.degree ?? ""} – {edu?.university ?? ""} ({edu?.year ?? ""})
              </li>
            )
          )}
        </ul>

        <h4 className="mt-4 font-semibold">Skills</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {(formData?.skills ?? []).map((skill, index) =>
            editMode ? (
              <input
                key={index}
                type="text"
                value={skill ?? ""}
                onChange={(e) =>
                  handleSimpleArrayChange("skills", index, e.target.value)
                }
                className="border p-1 rounded text-xs"
              />
            ) : (
              <span
                key={index}
                className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </section>

      {/* Research Interests */}
      <section className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-4">Research Interests</h3>

        <h4 className="font-semibold">Areas of Interest</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {(formData?.areas_of_research_interest ?? []).map((area, index) =>
            editMode ? (
              <input
                key={index}
                type="text"
                value={area ?? ""}
                onChange={(e) =>
                  handleSimpleArrayChange("areas_of_research_interest", index, e.target.value)
                }
                className="border p-1 rounded text-xs"
              />
            ) : (
              <span
                key={index}
                className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full"
              >
                {area}
              </span>
            )
          )}
        </div>

        <h4 className="mt-4 font-semibold">Equipment & Technology Interests</h4>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700 mt-2">
          {(formData?.equipment_and_technology_interest ?? []).map((eq, index) =>
            editMode ? (
              <input
                key={index}
                type="text"
                value={eq ?? ""}
                onChange={(e) =>
                  handleSimpleArrayChange("equipment_and_technology_interest", index, e.target.value)
                }
                className="border p-1 rounded text-xs"
              />
            ) : (
              <li key={index}>
                <input type="checkbox" checked readOnly /> {eq}
              </li>
            )
          )}
        </ul>

        <h4 className="mt-4 font-semibold">Publication Alerts</h4>
        <div className="flex items-center space-x-2 mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={!!formData?.publication_alerts_enabled}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  publication_alerts_enabled: e.target.checked,
                }))
              }
              disabled={!editMode}
            />
            <span className="ml-2">Send me alerts about new research in my field</span>
          </label>
          <select
            className="ml-4 border rounded px-2 py-1 text-sm"
            name="alert_frequency"
            value={formData?.alert_frequency ?? "Daily"}
            onChange={handleChange}
            disabled={!editMode}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </section>
    </main>

  );
}
