import { usePhilippineAddress } from "../../hooks/shared/usePhilippineAddress";

export const useRegisterFormConfig = () => {
  const {
    regionOptions,
    provinceOptions,
    cityOptions,
    barangayOptions,
    setRegionId,
    setProvinceId,
    setCityId,
  } = usePhilippineAddress();

  return [
    {
      step: 0,
      title: "Account Information",
      fields: [
        { name: "username", label: "Username", type: "text", required: true },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "role",
          label: "Account Role",
          type: "select",
          required: true,
          options: ["User", "Admin", "Moderator"].map((r) => ({
            label: r,
            value: r.toLowerCase(),
          })),
        },
      ],
    },
    {
      step: 1,
      title: "Personal Details",
      fields: [
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "lastName", label: "Last Name", type: "text", required: true },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Prefer not to say", value: "na" },
          ],
        },
      ],
    },
    {
      step: 2,
      title: "Address",
      fields: [
        {
          name: "region",
          label: "Region",
          type: "select",
          required: true,
          options: regionOptions || [],
          onChange: (e) => setRegionId(e.target.value),
        },
        {
          name: "province",
          label: "Province",
          type: "select",
          required: true,
          options: provinceOptions || [],
          disabled: !provinceOptions.length,
          onChange: (e) => setProvinceId(e.target.value),
        },
        {
          name: "city",
          label: "City / Municipality",
          type: "select",
          required: true,
          options: cityOptions || [],
          disabled: !cityOptions.length,
          onChange: (e) => setCityId(e.target.value),
        },
        {
          name: "barangay",
          label: "Barangay",
          type: "select",
          required: true,
          options: barangayOptions || [],
          disabled: !barangayOptions.length,
        },
      ],
    },
    {
      step: 3,
      title: "Security",
      fields: [
        { name: "password", label: "Password", type: "password", required: true, minLength: 6 },
        { name: "confirmPassword", label: "Confirm Password", type: "password", required: true, match: "password" },
      ],
    },
  ];
};
