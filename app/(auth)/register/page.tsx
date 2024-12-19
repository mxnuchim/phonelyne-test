"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/Container";
import PrimaryButton from "@/components/shared/PrimaryButton";
import TextInput from "@/components/shared/Input";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";
import BackButton from "@/components/shared/BackButton";
import { createUser, verifyLink } from "@/app/actions/authActions";
import { CreateUserParams, IUser } from "@/types";
import { useAppStore } from "@/app/store/store";
import { countryListAlpha2 } from "@/utils/data";
import Loader from "@/components/shared/Loader";

const Register = () => {
  const router = useRouter();
  const { setUser, setUserId, setToken } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignupError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    phone: "",
    password: "",
    simName: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    phone: "",
    password: "",
    simName: "",
  });

  useEffect(() => {
    // if (typeof window === "undefined") return;

    // const query = new URLSearchParams(window.location.search);
    // const tokenFromUrl = query.get("token");
    const tokenFromUrl = "";
    console.log({ tokenFromUrl });

    async function verifyToken() {
      const response = await verifyLink(tokenFromUrl || "");
      console.log({ response });

      if (!response || !response?.success) {
        return;
      }
      const userData: IUser = response?.data;

      setFormData({
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        email: userData?.email || "",
        location: "", // Assuming location is not provided in the response
        phone: userData.phone || "",
        password: "", // Password should not be populated for security reasons
        simName: "", // Assuming simName is not provided in the response
      });
    }

    verifyToken();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when input changes
  };

  // Validate form fields
  const validate = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "A valid email is required.";
      isValid = false;
    }

    if (!formData.location) {
      newErrors.location = "Location is required.";
      isValid = false;
    }

    const phoneRegex = /^[0-9]+$/; // Example phone validation
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = "A valid phone number is required.";
      isValid = false;
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleDone = async () => {
    if (!validate()) {
      console.error("form is not valid");
      return;
    }

    // Find the country code based on the location
    const countryCode = Object.entries(countryListAlpha2).find(
      ([, name]) => name.toLowerCase() === formData.location.toLowerCase()
    )?.[0];

    if (!countryCode) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        location: "Invalid country name. Please add a valid country.",
      }));
      return;
    }

    const params: CreateUserParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone: formData.phone,
      country: countryCode, // Pass country code here
      password: formData.password,
      email: formData.email,
    };
    setLoading(true);

    const createUserResponse = await createUser(params);
    setLoading(false);

    if (!createUserResponse.success) {
      console.log("Error creating user");
      setSignupError(createUserResponse.message || "");
      return;
    }
    console.log({ createUserResponse });
    setToken(createUserResponse?.data?.accessToken);
    setUser(createUserResponse?.data?.user);
    setUserId(createUserResponse?.data?.user?.id);

    router.push("/register/success");
  };

  return (
    <React.Suspense>
      {loading ? <Loader /> : null}
      <Navbar
        type="auth"
        className="!bg-whiteBg border-b border-b-gray-200"
        logoType="dark"
      />

      <Container className="bg-whiteBg flex flex-grow items-start justify-start min-h-screen">
        <div className="w-full min-h-screen lg:flex lg:flex-row items-start justify-start py-16">
          {/* Left Image/Title Section */}
          <div className="w-full h-full hidden lg:flex lg:w-1/2 flex-col items-start justify-start mt-8 lg:mt-0">
            <BackButton
              text="Back to home"
              onBackBtnPress={() => router.push("/")}
            />
            <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-black text-left">
              Set up your Phonelyne account
            </h1>
            <div className="w-[468px] h-[347px] border border-gray-300"></div>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start items-start px-0 md:px-8 mt-8 lg:mt-0">
            <p className="text-sm lg:text-sm text-gray700 mt-6 mb-8 font-medium">
              Start by entering your details to create your Phonelyne account.
              This will give you access to manage your eSIM and future
              purchases.
            </p>

            <div>
              <div className="w-full flex flex-col items-start border border-gray-200 rounded-[20px] p-4">
                <div className="flex space-x-4 w-full mb-4 ">
                  <TextInput
                    label="First Name"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName} // Display error
                    required
                    editable={false}
                  />
                  <TextInput
                    label="Last Name"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName} // Display error
                    required
                    editable={false}
                  />
                </div>

                <TextInput
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email} // Display error
                  className="mb-4"
                  required
                  editable={false}
                />

                <TextInput
                  label="Location"
                  type="text"
                  name="location"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={handleInputChange}
                  error={errors.location} // Display error
                  className="mb-4"
                  required
                />

                <TextInput
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={errors.phone} // Display error
                  className="mb-4"
                  required
                  editable={false}
                />

                <TextInput
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={errors.password} // Display error
                  className=""
                  required
                />
              </div>

              {signUpError ? (
                <div className="w-full my-4 flex items-start justify-start">
                  <p className="text-sm font-regular text-red-500">
                    {signUpError}
                  </p>
                </div>
              ) : null}

              <PrimaryButton
                className="bg-orange !h-10 !w-44 mt-4"
                onClick={handleDone}
              >
                Continue
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </React.Suspense>
  );
};

export default Register;
