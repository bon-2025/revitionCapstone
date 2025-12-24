import { usePhilippineAddress } from "../../hooks/shared/usePhilippineAddress";

export const useRegisterFormConfig = () => {
  const { regionOptions, provinceOptions, cityOptions, barangayOptions, setRegionId, setProvinceId, setCityId, } = usePhilippineAddress();

  // ================= SAMPLE DATA (FOR VISUALIZATION) =================
  const plotLots = [
    {
      id: "pl-001",
      block: "Block A",
      lotNumber: "Lot 12",
      expirationDate: "2026-12-31", // ACTIVE
    },
    {
      id: "pl-002",
      block: "Block B",
      lotNumber: "Lot 05",
      expirationDate: "2025-01-15", // EXPIRED
    },
    {
      id: "pl-003",
      block: "Block C",
      lotNumber: "Lot 20",
      expirationDate: "2025-02-10", // NEAR EXPIRY
    },
  ];

  const isExpired = (expirationDate) =>
  new Date() > new Date(expirationDate);

const isNearExpiry = (expirationDate, days = 30) => {
  const diff =
    (new Date(expirationDate) - new Date()) /
    (1000 * 60 * 60 * 24);
  return diff > 0 && diff <= days;
};



  // Reusable function for address selects
  const addressFields = (prefix) => [
    {
      name: `${prefix}Region`,
      label: "Region",
      type: "select",
      required: true,
      options: regionOptions || [],
      onChange: (e) => setRegionId(e.target.value),
    },
    {
      name: `${prefix}Province`,
      label: "Province",
      type: "select",
      required: true,
      options: provinceOptions || [],
      disabled: !provinceOptions.length,
      onChange: (e) => setProvinceId(e.target.value),
    },
    {
      name: `${prefix}City`,
      label: "City / Municipality",
      type: "select",
      required: true,
      options: cityOptions || [],
      disabled: !cityOptions.length,
      onChange: (e) => setCityId(e.target.value),
    },
    {
      name: `${prefix}Barangay`,
      label: "Barangay",
      type: "select",
      required: true,
      options: barangayOptions || [],
      disabled: !barangayOptions.length,
    },
  ];

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
        { name: "age", label: "Age", type: "number", required: true },
        { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
        { name: "dateOfDeath", label: "Date of Death", type: "date", required: true },
        { name: "timeOfDeath", label: "Time of Death", type: "time", required: true },
      ],
    },

    // ================= STEP 1 =================
    {
      step: 1,
      title: "Place of Death",
      fields: addressFields("death"),
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

    // ================= STEP 3 =================
    {
      step: 3,
      title: "Family Background",
      fields: [
        { name: "fatherName", label: "Father's Name", type: "text", required: true },
        { name: "motherMaidenName", label: "Mother's Maiden Name", type: "text", required: true },
        { name: "informantName", label: "Informant Name", type: "text", required: true },
        {
          name: "informantRelationship",
          label: "Relationship to Deceased",
          type: "text",
          required: true,
        },
      ],
    },

    // ================= STEP 4 =================
    {
      step: 4,
      title: "Medical & Registry Details",
      fields: [
        { name: "causeOfDeath", label: "Cause of Death", type: "text", required: true },
        { name: "medicalCertificateIssuedBy", label: "Medical Certificate Issued By", type: "text", required: true },
        { name: "registryNumber", label: "Registry Number", type: "text", required: true },
        { name: "dateRegistered", label: "Date Registered", type: "date", required: true },
        { name: "registeredBy", label: "Registered By", type: "text", required: true },
      ],
    },
    // ================= STEP 5 =================
    {
      step: 5,
      title: "Plot & Lot Information",
      fields: [
        {
          name: "plotLotId",
          label: "Registered Plot & Lot",
          type: "select",
          required: true,
          options: plotLots.map((lot) => ({
            label: `${lot.block} - ${lot.lotNumber}${
              isExpired(lot.expirationDate)
                ? " (EXPIRED)"
                : isNearExpiry(lot.expirationDate)
                ? " (NEAR EXPIRY)"
                : ""
            }`,
            value: lot.id,
            disabled: isExpired(lot.expirationDate),
          })),
        },
      ],
    },
    // ================= STEP 6 =================
    {
      step: 6,
      title: "Disposal & Embalming",
      fields: [
        {
          name: "methodOfDisposal",
          label: "Method of Disposal",
          type: "select",
          required: true,
          options: [
            { label: "Burial", value: "burial" },
            { label: "Cremation", value: "cremation" },
          ],
        },
        { name: "burialDate", label: "Burial Date", type: "date" },
        { name: "cemetery", label: "Cemetery / Location", type: "text" },
        { name: "embalmerName", label: "Embalmer Name", type: "text" },
        { name: "embalmerLicenseNo", label: "Embalmer License No", type: "text" },
      ],
    }
  ];
};
