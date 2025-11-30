export interface Hospital {
  id: string;
  name: string;
  hospitalGroup: string;
  address: string;
  city: string;
  state: string;
  telephone: string;
  website: string;
  doctorDirectory: string;
}

export const hospitals: Hospital[] = [
  {
    id: "1",
    name: "KPJ Batu Pahat Specialist Hospital",
    hospitalGroup: "KPJ",
    address: "No. 2, Jalan Zabedah, 83000 Batu Pahat",
    city: "Batu Pahat",
    state: "Johor",
    telephone: "07-434 5000",
    website: "https://www.kpjhealth.com.my/batupahat",
    doctorDirectory: "/hospitals/1/doctors"
  },
  {
    id: "2",
    name: "Gleneagles Hospital Kuala Lumpur",
    hospitalGroup: "Gleneagles",
    address: "286 & 288, Jalan Ampang, 50450 Kuala Lumpur",
    city: "Kuala Lumpur",
    state: "Federal Territory",
    telephone: "03-4141 3000",
    website: "https://www.gleneagles.com.my/kuala-lumpur",
    doctorDirectory: "/hospitals/2/doctors"
  },
  {
    id: "3",
    name: "Columbia Asia Hospital - Petaling Jaya",
    hospitalGroup: "Columbia Asia",
    address: "1, Jalan SS 7/19, Kelana Jaya, 47301 Petaling Jaya",
    city: "Petaling Jaya",
    state: "Selangor",
    telephone: "03-7806 8118",
    website: "https://www.columbiaasia.com/malaysia/petaling-jaya",
    doctorDirectory: "/hospitals/3/doctors"
  },
  {
    id: "4",
    name: "Tung Shin Hospital",
    hospitalGroup: "Tung Shin",
    address: "102, Jalan Pudu, 55100 Kuala Lumpur",
    city: "Kuala Lumpur",
    state: "Federal Territory",
    telephone: "03-2037 2288",
    website: "https://www.tungshin.com.my",
    doctorDirectory: "/hospitals/4/doctors"
  },
  {
    id: "5",
    name: "Georgetown Specialist Hospital",
    hospitalGroup: "Georgetown Specialist",
    address: "19, Jalan Logan, 10400 Georgetown",
    city: "Georgetown",
    state: "Penang",
    telephone: "04-238 8888",
    website: "https://www.georgetownhospital.com",
    doctorDirectory: "/hospitals/5/doctors"
  },
  {
    id: "6",
    name: "KPJ Damansara Specialist Hospital",
    hospitalGroup: "KPJ",
    address: "119, Jalan SS 20/10, Damansara Kim, 47400 Petaling Jaya",
    city: "Petaling Jaya",
    state: "Selangor",
    telephone: "03-7718 1000",
    website: "https://www.kpjhealth.com.my/damansara",
    doctorDirectory: "/hospitals/6/doctors"
  },
  {
    id: "7",
    name: "Columbia Asia Hospital - Bukit Rimau",
    hospitalGroup: "Columbia Asia",
    address: "No. 2, Jalan Serambi, U8/24, Seksyen U8, Bukit Rimau, 40150 Shah Alam",
    city: "Shah Alam",
    state: "Selangor",
    telephone: "03-5525 8999",
    website: "https://www.columbiaasia.com/malaysia/bukit-rimau",
    doctorDirectory: "/hospitals/7/doctors"
  },
  {
    id: "8",
    name: "Gleneagles Hospital Penang",
    hospitalGroup: "Gleneagles",
    address: "1, Jalan Pangkor, 10050 Georgetown",
    city: "Georgetown",
    state: "Penang",
    telephone: "04-222 9111",
    website: "https://www.gleneagles.com.my/penang",
    doctorDirectory: "/hospitals/8/doctors"
  },
  {
    id: "9",
    name: "KPJ Ipoh Specialist Hospital",
    hospitalGroup: "KPJ",
    address: "26, Jalan Raja Dihilir, 30350 Ipoh",
    city: "Ipoh",
    state: "Perak",
    telephone: "05-240 8777",
    website: "https://www.kpjhealth.com.my/ipoh",
    doctorDirectory: "/hospitals/9/doctors"
  },
  {
    id: "10",
    name: "Columbia Asia Hospital - Miri",
    hospitalGroup: "Columbia Asia",
    address: "Lot 1035, Block 10, Jalan Bulan Sabit, 98000 Miri",
    city: "Miri",
    state: "Sarawak",
    telephone: "085-437 755",
    website: "https://www.columbiaasia.com/malaysia/miri",
    doctorDirectory: "/hospitals/10/doctors"
  }
];
