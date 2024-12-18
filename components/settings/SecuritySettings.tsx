import React, { useState } from "react";
import TextInput from "../shared/Input";
import Divider from "../shared/Divider";
import SettingToggle from "./SettingToggle";
import PrimaryButton from "../shared/PrimaryButton";

const SecuritySettings = () => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleTogglePasswordForm = () => {
    setShowPasswordForm((prev) => !prev);
    setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
    setErrors({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
  };

  const validateForm = () => {
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Old password is required.";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters.";
    }

    if (!formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Please confirm your new password.";
    } else if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" })); // Clear the error for the field being updated
  };

  const handleSaveChanges = () => {
    if (validateForm()) {
      // Simulate save action
      alert("Password changed successfully!");
      setShowPasswordForm(false);
    }
  };

  return (
    <div className="w-full min-h-72 rounded-[10px] bg-[#F9F9F980]/50 flex flex-col items-start justify-start p-2 lg:p-4">
      {/* Password Section */}
      <div className="w-full flex items-start justify-between">
        <p className="hidden lg:block text-sm text-gray-800 font-medium">
          Password
        </p>
        <div className="flex w-full lg:w-[413px] flex-col space-y-4 lg:space-y-5">
          {!showPasswordForm ? (
            <>
              {/* Hidden Password Display */}
              <TextInput
                label="Password"
                type=""
                placeholder="Enter your password"
                value={"************"}
                onChange={() => {}}
                editable={false}
                className="-mt-1.5"
              />
              {/* Change Password Link */}
              <div
                className="cursor-pointer"
                onClick={handleTogglePasswordForm}
              >
                <p className="underline font-medium text-sm text-gray600">
                  Change password
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Change Password Form */}
              <TextInput
                label="Old Password"
                inputClassName="border border-gray-100"
                type="password"
                placeholder="Enter your old password"
                value={formData.oldPassword}
                onChange={(e) =>
                  handleInputChange("oldPassword", e.target.value)
                }
                error={errors.oldPassword}
              />
              <TextInput
                label="New Password"
                inputClassName="border border-gray-100"
                type="password"
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                error={errors.newPassword}
              />
              <TextInput
                label="Confirm New Password"
                inputClassName="border border-gray-100"
                type="password"
                placeholder="Confirm your new password"
                value={formData.confirmNewPassword}
                onChange={(e) =>
                  handleInputChange("confirmNewPassword", e.target.value)
                }
                error={errors.confirmNewPassword}
              />
              <div className="flex justify-start space-x-4">
                <PrimaryButton
                  className="!w-[153px] !h-10 text-white bg-orange !rounded-[12px] text-sm font-medium"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </PrimaryButton>
                <button
                  className="text-sm text-gray-600 underline"
                  onClick={handleTogglePasswordForm}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Divider className="w-full !border-gray500 my-8" />

      {/* Two-Factor Authentication Section */}
      <div className="flex flex-col lg:flex-row w-full items-center justify-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-col items-start justify-start w-full lg:w-1/2 space-y-2">
          <p className="block text-sm text-gray-800 font-medium">
            Two factor authentication
          </p>
          <p className="block text-sm text-gray-800 font-light text-wrap break-words whitespace-break-spaces">
            Add an extra layer of security to your account by enabling
            Two-Factor Authentication.{" "}
          </p>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col space-y-4 lg:space-y-6">
          <SettingToggle label="Set up 2FA via SMS" enabled={false} />
          <SettingToggle label="Set up 2FA via Email" enabled={false} />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
