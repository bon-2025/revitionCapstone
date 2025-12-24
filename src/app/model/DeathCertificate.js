// models/DeathCertificate.js

import {
  PersonalInformation,
  PlaceOfDeath,
  CivilReligiousInfo,
  FamilyBackground,
  MedicalRegistry,
  PlotLotInfo,
  DisposalEmbalming
} from "./DeathCertificateSteps";

export class DeathCertificate {
  constructor() {
    this.personalInfo = new PersonalInformation();
    this.placeOfDeath = new PlaceOfDeath();
    this.civilReligiousInfo = new CivilReligiousInfo();
    this.familyBackground = new FamilyBackground();
    this.medicalRegistry = new MedicalRegistry();
    this.plotLotInfo = new PlotLotInfo();
    this.disposalEmbalming = new DisposalEmbalming();
  }

  // Fetch summary of all sections
  getSummary() {
    return {
      personalInfo: { ...this.personalInfo },
      placeOfDeath: { ...this.placeOfDeath },
      civilReligiousInfo: { ...this.civilReligiousInfo },
      familyBackground: { ...this.familyBackground },
      medicalRegistry: { ...this.medicalRegistry },
      plotLotInfo: this.plotLotInfo.getAvailablePlots(),
      disposalEmbalming: { ...this.disposalEmbalming },
    };
  }

  // Example: fetch available plot lots
  getAvailablePlots() {
    return this.plotLotInfo.getAvailablePlots();
  }
}
