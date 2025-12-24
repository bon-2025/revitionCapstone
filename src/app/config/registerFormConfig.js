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
    // ================= STEP 0 =================
    {
      step: 0,
      title: "Personal Information",
      fields: [
        { name: "firstName", label: "First Name", type: "text", required: true },
        { name: "middleName", label: "Middle Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text", required: true },

        {
          name: "sex",
          label: "Sex",
          type: "select",
          required: true,
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ],
        },

        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        { name: "dateOfDeath", label: "Date of Death", type: "date", required: true },
      ],
    },

    // ================= STEP 1 =================
    {
      step: 1,
      title: "Place of Death",
      fields: [
        {
          name: "deathRegion",
          label: "Region",
          type: "select",
          required: true,
          options: regionOptions || [],
          onChange: (e) => setRegionId(e.target.value),
        },
        {
          name: "deathProvince",
          label: "Province",
          type: "select",
          required: true,
          options: provinceOptions || [],
          disabled: !provinceOptions.length,
          onChange: (e) => setProvinceId(e.target.value),
        },
        {
          name: "deathCity",
          label: "City / Municipality",
          type: "select",
          required: true,
          options: cityOptions || [],
          disabled: !cityOptions.length,
          onChange: (e) => setCityId(e.target.value),
        },
        {
          name: "deathBarangay",
          label: "Barangay",
          type: "select",
          required: true,
          options: barangayOptions || [],
          disabled: !barangayOptions.length,
        },
      ],
    },

    // ================= STEP 2 =================
    {
      step: 2,
      title: "Civil & Religious Information",
      fields: [
        {
          name: "civilStatus",
          label: "Civil Status",
          type: "select",
          required: true,
          options: [
            { label: "Single", value: "single" },
            { label: "Married", value: "married" },
            { label: "Widowed", value: "widowed" },
            { label: "Separated", value: "separated" },
            { label: "Divorced", value: "divorced" },
          ],
        },
        {
          name: "religion",
          label: "Religion",
          type: "select",
          required: true,
          options: [
            { label: "Roman Catholic", value: "catholic" },
            { label: "Iglesia ni Cristo", value: "inc" },
            { label: "Islam", value: "islam" },
            { label: "Protestant", value: "protestant" },
            { label: "Buddhist", value: "buddhist" },
            { label: "Others", value: "others" },
          ],
        },
        {
          name: "citizenship",
          label: "Citizenship",
          type: "select",
          required: true,
          options: [
            { label: "Filipino", value: "filipino" },
            { label: "Dual Citizen", value: "dual" },
            { label: "Foreign National", value: "foreign" },
          ],
        },
        { name: "occupation", label: "Occupation", type: "text", required: true },
      ],
    },
    {
      step: 3,
      title: "Residence",
      fields: [
        {
          name: "residenceRegion",
          label: "Region",
          type: "select",
          required: true,
          options: regionOptions || [],
          onChange: (e) => setRegionId(e.target.value),
        },
        {
          name: "residenceProvince",
          label: "Province",
          type: "select",
          required: true,
          options: provinceOptions || [],
          disabled: !provinceOptions.length,
          onChange: (e) => setProvinceId(e.target.value),
        },
        {
          name: "residenceCity",
          label: "City / Municipality",
          type: "select",
          required: true,
          options: cityOptions || [],
          disabled: !cityOptions.length,
          onChange: (e) => setCityId(e.target.value),
        },
        {
          name: "residenceBarangay",
          label: "Barangay",
          type: "select",
          required: true,
          options: barangayOptions || [],
          disabled: !barangayOptions.length,
        },
      ],
    },
  ];
};
