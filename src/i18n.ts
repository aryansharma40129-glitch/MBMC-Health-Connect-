import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "MBMC Health-Link",
      "welcome": "Welcome back",
      "abha_id": "ABHA ID",
      "link_abha": "Link ABHA ID",
      "medical_passport": "Medical Passport",
      "records": "Medical Records",
      "prescriptions": "Prescriptions",
      "lab_reports": "Lab Reports",
      "vaccinations": "Vaccinations",
      "qr_code": "Share QR Code",
      "voice_search": "Voice Search",
      "add_record": "Add Record",
      "no_records": "No records found",
      "search_placeholder": "Search records...",
      "doctor": "Doctor",
      "date": "Date",
      "notes": "Notes",
      "profile": "Profile",
      "settings": "Settings",
      "listening": "Listening...",
      "stop_listening": "Stop Listening",
      "language": "Language",
      "blood_group": "Blood Group",
      "gender": "Gender",
      "age": "Age",
      "paperless_desc": "Your paperless medical history in one place.",
      "qr_desc": "Show this to your doctor for instant access.",
      "digital_updates": "Digital Updates",
      "no_updates": "No new updates"
    }
  },
  hi: {
    translation: {
      "app_name": "MBMC हेल्थ-लिंक",
      "welcome": "वापस स्वागत है",
      "abha_id": "ABHA आईडी",
      "link_abha": "ABHA आईडी लिंक करें",
      "medical_passport": "मेडिकल पासपोर्ट",
      "records": "मेडिकल रिकॉर्ड",
      "prescriptions": "नुस्खे",
      "lab_reports": "लैब रिपोर्ट",
      "vaccinations": "टीकाकरण",
      "qr_code": "QR कोड साझा करें",
      "voice_search": "वॉयस सर्च",
      "add_record": "रिकॉर्ड जोड़ें",
      "no_records": "कोई रिकॉर्ड नहीं मिला",
      "search_placeholder": "रिकॉर्ड खोजें...",
      "doctor": "डॉक्टर",
      "date": "तारीख",
      "notes": "नोट्स",
      "profile": "प्रोफ़ाइल",
      "settings": "सेटिंग्स",
      "listening": "सुन रहा हूँ...",
      "stop_listening": "सुनना बंद करें",
      "language": "भाषा",
      "blood_group": "रक्त समूह",
      "gender": "लिंग",
      "age": "आयु",
      "paperless_desc": "आपका पेपरलेस मेडिकल इतिहास एक ही स्थान पर।",
      "qr_desc": "त्वरित पहुंच के लिए इसे अपने डॉक्टर को दिखाएं।",
      "digital_updates": "डिजिटल अपडेट",
      "no_updates": "कोई नया अपडेट नहीं"
    }
  },
  mr: {
    translation: {
      "app_name": "MBMC हेल्थ-लिंक",
      "welcome": "पुन्हा स्वागत आहे",
      "abha_id": "ABHA आयडी",
      "link_abha": "ABHA आयडी लिंक करा",
      "medical_passport": "वैद्यकीय पासपोर्ट",
      "records": "वैद्यकीय रेकॉर्ड",
      "prescriptions": "प्रिस्क्रिप्शन",
      "lab_reports": "लॅब रिपोर्ट",
      "vaccinations": "लसीकरण",
      "qr_code": "QR कोड शेअर करा",
      "voice_search": "व्हॉइस सर्च",
      "add_record": "रेकॉर्ड जोडा",
      "no_records": "कोणतेही रेकॉर्ड आढळले नाहीत",
      "search_placeholder": "रेकॉर्ड शोधा...",
      "doctor": "डॉक्टर",
      "date": "तारीख",
      "notes": "नोट्स",
      "profile": "प्रोफाइल",
      "settings": "सेटिंग्ज",
      "listening": "ऐकत आहे...",
      "stop_listening": "ऐकणे थांबवा",
      "language": "भाषा",
      "blood_group": "रक्त गट",
      "gender": "लिंग",
      "age": "वय",
      "paperless_desc": "तुमचा पेपरलेस वैद्यकीय इतिहास एकाच ठिकाणी.",
      "qr_desc": "त्वरीत प्रवेशासाठी हे तुमच्या डॉक्टरांना दाखवा.",
      "digital_updates": "डिजिटल अपडेट्स",
      "no_updates": "नवीन अपडेट्स नाहीत"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
