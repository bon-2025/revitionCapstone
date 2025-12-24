// models/DeathCertificateSteps.js

// =====================
// STEP 0: Personal Information
// =====================
export class PersonalInformation {
  constructor() {
    this.firstName = "Juan";
    this.middleName = "Santos";
    this.lastName = "Dela Cruz";
    this.sex = "Male";
    this.age = 84;
    this.dateOfBirth = "1941-05-11";
    this.dateOfDeath = "2025-12-01";
    this.timeOfDeath = "4:30 AM";
    this.placeOfDeath = "Brgy. San Isidro, San Luis, Aurora, Philippines";
    this.civilStatus = "Married";
    this.citizenship = "Filipino";
    this.religion = "Iglesia Ni Cristo";
    this.occupation = "None";
  }
}

// =====================
// STEP 1: Place of Death
// =====================
export class PlaceOfDeath {
  constructor() {
    this.region = "Region III";
    this.province = "Aurora";
    this.city = "San Luis";
    this.barangay = "San Isidro";
  }
}

// =====================
// STEP 2: Civil & Religious Information
// =====================
export class CivilReligiousInfo {
  constructor() {
    this.civilStatus = "Married";
    this.religion = "Iglesia Ni Cristo";
    this.citizenship = "Filipino";
    this.occupation = "None";
  }
}

// =====================
// STEP 3: Family Background
// =====================
export class FamilyBackground {
  constructor() {
    this.fatherName = "Pedro Dela Cruz";
    this.motherMaidenName = "Maria Santos";
    this.informantName = "Ana Dela Cruz";
    this.informantRelationship = "Daughter";
  }
}

// =====================
// STEP 4: Medical & Registry Details
// =====================
export class MedicalRegistry {
  constructor() {
    this.causeOfDeath = "Presumed Community Acquired Pneumonia - Moderate Risk (PCAP-MR)";
    this.medicalCertificateIssuedBy = "Dr. Jose Reyes";
    this.registryNumber = "2025-074";
    this.dateRegistered = "2025-12-04";
    this.registeredBy = "Municipal Civil Registrar";
  }
}

// =====================
// STEP 5: Plot & Lot Information
// =====================
export class PlotLotInfo {
  constructor() {
    this.plotLots = [
      { id: "pl-001", block: "Block A", lotNumber: "Lot 12", expirationDate: "2026-12-31" },
      { id: "pl-002", block: "Block B", lotNumber: "Lot 05", expirationDate: "2025-01-15" },
      { id: "pl-003", block: "Block C", lotNumber: "Lot 20", expirationDate: "2025-02-10" },
    ];
  }

  isExpired(date) {
    return new Date() > new Date(date);
  }

  isNearExpiry(date, days = 30) {
    const diff = (new Date(date) - new Date()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= days;
  }

  getAvailablePlots() {
    return this.plotLots.map((lot) => ({
      ...lot,
      status: this.isExpired(lot.expirationDate)
        ? "EXPIRED"
        : this.isNearExpiry(lot.expirationDate)
        ? "NEAR EXPIRY"
        : "ACTIVE",
      disabled: this.isExpired(lot.expirationDate),
    }));
  }
}

// =====================
// STEP 6: Disposal & Embalming
// =====================
export class DisposalEmbalming {
  constructor() {
    this.methodOfDisposal = "Burial";
    this.burialDate = "2025-12-03";
    this.cemetery = "San Luis Public Cemetery, Brgy. San Jose, San Luis, Aurora";
    this.embalmerName = "Juan Embalmer";
    this.embalmerLicenseNo = "LIC-12345 (Valid until Sept 2028)";
  }
}
