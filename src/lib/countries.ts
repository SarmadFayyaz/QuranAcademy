export interface Country {
  name: string;
  code: string;
  dial: string;
  mask: string; // # = digit placeholder
}

export const countries: Country[] = [
  { name: "Afghanistan", code: "AF", dial: "+93", mask: "+93 ## ### ####" },
  { name: "Albania", code: "AL", dial: "+355", mask: "+355 ## ### ####" },
  { name: "Algeria", code: "DZ", dial: "+213", mask: "+213 ### ## ## ##" },
  { name: "Australia", code: "AU", dial: "+61", mask: "+61 ### ### ###" },
  { name: "Austria", code: "AT", dial: "+43", mask: "+43 ### ######" },
  { name: "Bahrain", code: "BH", dial: "+973", mask: "+973 #### ####" },
  { name: "Bangladesh", code: "BD", dial: "+880", mask: "+880 #### ######" },
  { name: "Belgium", code: "BE", dial: "+32", mask: "+32 ### ## ## ##" },
  { name: "Brazil", code: "BR", dial: "+55", mask: "+55 ## ##### ####" },
  { name: "Canada", code: "CA", dial: "+1", mask: "+1 (###) ###-####" },
  { name: "China", code: "CN", dial: "+86", mask: "+86 ### #### ####" },
  { name: "Denmark", code: "DK", dial: "+45", mask: "+45 ## ## ## ##" },
  { name: "Egypt", code: "EG", dial: "+20", mask: "+20 ### ### ####" },
  { name: "Finland", code: "FI", dial: "+358", mask: "+358 ## ### ####" },
  { name: "France", code: "FR", dial: "+33", mask: "+33 # ## ## ## ##" },
  { name: "Germany", code: "DE", dial: "+49", mask: "+49 ### #######" },
  { name: "Greece", code: "GR", dial: "+30", mask: "+30 ### ### ####" },
  { name: "India", code: "IN", dial: "+91", mask: "+91 ##### #####" },
  { name: "Indonesia", code: "ID", dial: "+62", mask: "+62 ### #### ####" },
  { name: "Iraq", code: "IQ", dial: "+964", mask: "+964 ### ### ####" },
  { name: "Ireland", code: "IE", dial: "+353", mask: "+353 ## ### ####" },
  { name: "Italy", code: "IT", dial: "+39", mask: "+39 ### ### ####" },
  { name: "Japan", code: "JP", dial: "+81", mask: "+81 ## #### ####" },
  { name: "Jordan", code: "JO", dial: "+962", mask: "+962 # #### ####" },
  { name: "Kenya", code: "KE", dial: "+254", mask: "+254 ### ######" },
  { name: "Kuwait", code: "KW", dial: "+965", mask: "+965 #### ####" },
  { name: "Lebanon", code: "LB", dial: "+961", mask: "+961 ## ### ###" },
  { name: "Libya", code: "LY", dial: "+218", mask: "+218 ## ### ####" },
  { name: "Malaysia", code: "MY", dial: "+60", mask: "+60 ## #### ####" },
  { name: "Morocco", code: "MA", dial: "+212", mask: "+212 ### ######" },
  { name: "Netherlands", code: "NL", dial: "+31", mask: "+31 # ## ## ## ##" },
  { name: "New Zealand", code: "NZ", dial: "+64", mask: "+64 ## ### ####" },
  { name: "Nigeria", code: "NG", dial: "+234", mask: "+234 ### ### ####" },
  { name: "Norway", code: "NO", dial: "+47", mask: "+47 ### ## ###" },
  { name: "Oman", code: "OM", dial: "+968", mask: "+968 #### ####" },
  { name: "Pakistan", code: "PK", dial: "+92", mask: "+92 ### #######" },
  { name: "Palestine", code: "PS", dial: "+970", mask: "+970 ## ### ####" },
  { name: "Philippines", code: "PH", dial: "+63", mask: "+63 ### ### ####" },
  { name: "Poland", code: "PL", dial: "+48", mask: "+48 ### ### ###" },
  { name: "Portugal", code: "PT", dial: "+351", mask: "+351 ### ### ###" },
  { name: "Qatar", code: "QA", dial: "+974", mask: "+974 #### ####" },
  { name: "Russia", code: "RU", dial: "+7", mask: "+7 ### ### ## ##" },
  { name: "Saudi Arabia", code: "SA", dial: "+966", mask: "+966 ## ### ####" },
  { name: "Singapore", code: "SG", dial: "+65", mask: "+65 #### ####" },
  { name: "Somalia", code: "SO", dial: "+252", mask: "+252 ## #######" },
  { name: "South Africa", code: "ZA", dial: "+27", mask: "+27 ## ### ####" },
  { name: "South Korea", code: "KR", dial: "+82", mask: "+82 ## #### ####" },
  { name: "Spain", code: "ES", dial: "+34", mask: "+34 ### ### ###" },
  { name: "Sri Lanka", code: "LK", dial: "+94", mask: "+94 ## ### ####" },
  { name: "Sudan", code: "SD", dial: "+249", mask: "+249 ## ### ####" },
  { name: "Sweden", code: "SE", dial: "+46", mask: "+46 ## ### ## ##" },
  { name: "Switzerland", code: "CH", dial: "+41", mask: "+41 ## ### ## ##" },
  { name: "Syria", code: "SY", dial: "+963", mask: "+963 ### ### ###" },
  { name: "Tunisia", code: "TN", dial: "+216", mask: "+216 ## ### ###" },
  { name: "Turkey", code: "TR", dial: "+90", mask: "+90 ### ### ## ##" },
  { name: "UAE", code: "AE", dial: "+971", mask: "+971 ## ### ####" },
  { name: "Uganda", code: "UG", dial: "+256", mask: "+256 ### ######" },
  { name: "United Kingdom", code: "GB", dial: "+44", mask: "+44 #### ######" },
  { name: "United States", code: "US", dial: "+1", mask: "+1 (###) ###-####" },
  { name: "Yemen", code: "YE", dial: "+967", mask: "+967 ### ### ###" },
];

export function findCountryByName(name: string): Country | undefined {
  return countries.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function findCountryByCode(code: string): Country | undefined {
  return countries.find((c) => c.code === code);
}

export function applyPhoneMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, "");
  const maskDigits = mask.replace(/[^#]/g, "").length;
  const dialPart = mask.split("#")[0]; // e.g., "+92 "
  const dialDigits = dialPart.replace(/\D/g, ""); // e.g., "92"

  // If user hasn't typed beyond dial code, return dial code
  if (digits.length <= dialDigits.length) {
    return dialPart.trimEnd();
  }

  let result = "";
  let digitIndex = 0;

  for (let i = 0; i < mask.length && digitIndex < digits.length; i++) {
    if (mask[i] === "#") {
      result += digits[digitIndex];
      digitIndex++;
    } else {
      result += mask[i];
      // If next in digits matches this non-digit char, skip it
      if (digits[digitIndex] === mask[i]) {
        digitIndex++;
      }
    }
  }

  return result;
}

export function getDialDigits(mask: string): string {
  const dialPart = mask.split("#")[0];
  return dialPart.replace(/\D/g, "");
}
