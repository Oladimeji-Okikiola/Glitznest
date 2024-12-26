



const firebaseConfig = {
    apiKey: "AIzaSyBpDrnuCX0GztgqmRxs6XXzWIsrXFofJu8",
    authDomain: "saveandget-test1.firebaseapp.com",
    databaseURL: "https://saveandget-test1-default-rtdb.firebaseio.com",
    projectId: "saveandget-test1",
    storageBucket: "saveandget-test1.appspot.com",
    messagingSenderId: "764820232194",
    appId: "1:764820232194:web:6349afe0e91f2c0aa6af1b",
  };

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  import {
    getFirestore,
    onSnapshot,
    doc,
    getDoc,
    getDocs,
    setDoc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField,
    query,
    where,
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
  import {
    getAuth,
    signOut,
    onAuthStateChanged,
  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

  let editProfileDiv = document.getElementById("editProfileDiv");

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  let db = getFirestore();
  const auth = getAuth();


  let currentUser = null;
  let customerDetails = document.querySelector('.customerDetails')
  let editProfile = document.querySelector('.editProfile')

  //   CHECK USER'S AUTHENTICATION
  function stateChanged() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user.uid;
        displayCustomerDetails(currentUser)
      } else {
        window.location.href = "account.html";
      }
    });
  }
  stateChanged();



  // DISPLAY CUSTOMER'S INFORMATION
  async function displayCustomerDetails(currentUser){
    var ref = doc(db, "CUSTOMERS", currentUser)
    const docSnap = await getDoc(ref)

    if(docSnap.exists()){
      let email = docSnap.data().Email
      let newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'customerInternal')
      newDiv.innerHTML = `
        <h3 class="mainDetails">Fullname: ${docSnap.data().Fullname}</h3>
        <h3 class="mainDetails">State: ${docSnap.data().State}</h3>
        <h3 class="mainDetails">Local Gvt: ${docSnap.data().localGovernment}</h3>
        <h3 class="mainDetails">Email: ${docSnap.data().Email}</h3>
        <h3 class="mainDetails">Address: ${docSnap.data().Address}</h3>
        <h3 class="mainDetails">Phone Number: ${docSnap.data().Phone_Number}</h3>
        <div class='otherButtons'>
          <button class='editProfile'> Edit </button>
          <button class='logout'> Logout </button>
        </div>
      `
      newDiv.querySelector('.logout').addEventListener('click', () => {
        logutUser()
      })
      newDiv.querySelector('.editProfile').addEventListener('click', () => {
        customerDetails.style.display = 'none'
        editProfile.style.display = 'flex'
        readProfile()
        // editProfileFunc(currentUser, email)
      })
      customerDetails.appendChild(newDiv)
    }else{
        alert('data does not exist')
    }
  }




  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          // console.log(
          //   "Service Worker registered with scope:",
          //   registration.scope
          // );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    });
  }


    let fullname = document.getElementById('fullname')
    let addresss = document.getElementById('addresss')
    let State = document.getElementById('State')
    let localGvt = document.getElementById('localGvt')
    let phone = document.getElementById('phone')

  // READ THE PROFILE
  async function readProfile(){
    let profileRef = doc(db, "CUSTOMERS", currentUser)
    const docSnap = await getDoc(profileRef)
    if(docSnap.exists()){
      fullname.value = docSnap.data().Fullname
      addresss.value = docSnap.data().Address
      State.value = docSnap.data().State
      phone.value = docSnap.data().Phone_Number
    }else{
      alert("Sorry, You don't have a profile with us")
    }
  }




  let States = [
    `Select State`,
    `Abia`,
    `Adamawa`,
    `Akwa Ibom`,
    `Anambra`,
    `Bauchi`,
    `Bayelsa`,
    `Benue`,
    `Borno`,
    `Cross River`,
    `Delta`,
    `Ebonyi`,
    `Edo`,
    `Ekiti`,
    `Enugu`,
    `Gombe`,
    `Imo`,
    `Jigawa`,
    `Kaduna`,
    `Kano`,
    `Katsina`,
    `Kebbi`,
    `Kogi`,
    `Kwara`,
    `Lagos`,
    `Nasarawa`,
    `Niger`,
    `Ogun`,
    `Ondo`,
    `Osun`,
    `Oyo`,
    `Plateau`,
    `Rivers`,
    `Sokoto`,
    `Taraba`,
    `Yobe`,
    `Zamfara`,
    `Federal Capital Territory (FCT)`
];

let Abia = [
    "Aba North",
    "Aba South",
    "Arochukwu",
    "Bende",
    "Ikwuano",
    "Isiala Ngwa North",
    "Isiala Ngwa South",
    "Isuikwuato",
    "Obingwa",
    "Ohafia",
    "Osisioma",
    "Ugwunagbo",
    "Ukwa East",
    "Ukwa West",
    "Umuahia North",
    "Umuahia South",
    "Uzo-Uwani"
];

let Adamawa = [
    "Demsa",
    "Fufore",
    "Ganye",
    "Gayuk",
    "Girei",
    "Glan",
    "Hong",
    "Jada",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo-Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Numan",
    "Shelleng",
    "Song",
    "Toungo",
    "Yola North",
    "Yola South",
    "Zangra"
];

let AkwaIbom = [
    "Akamkpa",
    "Akapabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Odukpani",
    "Ogoja",
    "Yala",
    "Yarkur",
    "Obudu",
    "Uruan",
    "Uyo",
    "Mbo",
    "Ikot Abasi",
    "Nsit Ibom",
    "Nsit Atai",
    "Onna",
    "Oron",
    "Ukan",
    "Abak",
    "Etim Ekpo"
];


let Anambra = [
    "Aguata",
    "Awka North",
    "Awka South",
    "Anambra East",
    "Anambra West",
    "Anocha",
    "Dunukofia",
    "Ekwusigo",
    "Idemili North",
    "Idemili South",
    "Ihiala",
    "Njikoka",
    "Nnewi North",
    "Nnewi South",
    "Ogbaru",
    "Onitsha North",
    "Onitsha South",
    "Oyi",
    "Orumba North",
    "Orumba South",
    "Awka South"
];


let Bauchi = [
    "Alkaleri",
    "Bauchi",
    "Bogoro",
    "Damban",
    "Darazo",
    "Dass",
    "Ganjuwa",
    "Girei",
    "Glon",
    "Hong",
    "Jada",
    "Lamurde",
    "Madagali",
    "Maiha",
    "Mayo-Belwa",
    "Michika",
    "Mubi North",
    "Mubi South",
    "Warji",
    "Shani",
    "Zaki"
];


let Bayelsa = [
    "Brass",
    "Ekeremor",
    "Kolokuma/Opokuma",
    "Nembe",
    "Ogbia",
    "Sagbama",
    "Southern Ijaw",
    "Yenagoa"
];

let Benue = [
    "Ado",
    "Agatu",
    "Apa",
    "Buruku",
    "Gboko",
    "Guma",
    "Gwer East",
    "Gwer West",
    "Katcha",
    "Katsina-Ala",
    "Konshisha",
    "Kwande",
    "Logo",
    "Makurdi",
    "Ogbadibo",
    "Ohimini",
    "Oju",
    "Okpokwu",
    "Otukpo",
    "Tarka",
    "Ukum",
    "Vandeikya"
];


let Borno = [
    "Abadam",
    "Askira/Uba",
    "Bama",
    "Bayo",
    "Biu",
    "Chibok",
    "Damboa",
    "Dikwa",
    "Gubio",
    "Guzamala",
    "Hawul",
    "Jere",
    "Kaga",
    "Kala/Balge",
    "Konduga",
    "Kukawa",
    "Kwaya Kusar",
    "Mafa",
    "Magumeri",
    "Maiduguri",
    "Marte",
    "Mobbar",
    "Monguno",
    "Ngala",
    "Nganzai",
    "Shani"
];


let CrossRiver = [
    "Akamkpa",
    "Akapabuyo",
    "Bakassi",
    "Bekwarra",
    "Biase",
    "Boki",
    "Calabar Municipal",
    "Calabar South",
    "Etung",
    "Ikom",
    "Obanliku",
    "Obubra",
    "Odukpani",
    "Ogoja",
    "Yala",
    "Yarkur",
    "Obudu"
];

let Delta = [
    "Aniocha North",
    "Aniocha South",
    "Bomadi",
    "Burutu",
    "Ethiope East",
    "Ethiope West",
    "Ika North East",
    "Ika South",
    "Isoko North",
    "Isoko South",
    "Ndokwa East",
    "Ndokwa West",
    "Okpe",
    "Oshimili North",
    "Oshimili South",
    "Patani",
    "Sapele",
    "Udu",
    "Ughelli North",
    "Ughelli South",
    "Ukwuani",
    "Warri North",
    "Warri South",
    "Warri South West",
    "Uvwie"
];

let Ebonyi = [
    "Abakaliki",
    "Afikpo North",
    "Afikpo South",
    "Ebonyi",
    "Ekiti",
    "Ezza North",
    "Ezza South",
    "Ikwo",
    "Ivo",
    "Izzi",
    "Ohaukwu",
    "Ohaozara",
    "Onicha"
];

let Edo = [
    "Akoko Edo",
    "Egor",
    "Esan Central",
    "Esan North-East",
    "Esan South-East",
    "Esan West",
    "Etsako Central",
    "Etsako East",
    "Etsako West",
    "Igueben",
    "Ikpoba-Okha",
    "Oredo",
    "Orhionmwon",
    "Ovia North-East",
    "Ovia South-West",
    "Uhunmwonde"
];

let Ekiti = [
    "Ado-Ekiti",
    "Efon",
    "Ekiti East",
    "Ekiti South-West",
    "Ekiti West",
    "Emure",
    "Ido-Osi",
    "Ijero",
    "Ikere",
    "Ikole",
    "Irepodun/Ifelodun",
    "Ise/Orun",
    "Moba",
    "Oye"
];

let Enugu = [
    "Aninri",
    "Awgu",
    "Enugu East",
    "Enugu North",
    "Enugu South",
    "Ezeagu",
    "Igbo Etiti",
    "Igboeze North",
    "Igboeze South",
    "Isi-Uzo",
    "Nkanu East",
    "Nkanu West",
    "Nsukka",
    "Oji River",
    "Udenu",
    "Udi",
    "Uzouwani"
];

let Gombe = [
    "Akko",
    "Balanga",
    "Billiri",
    "Dukku",
    "Funakaye",
    "Gombe",
    "Kaltungo",
    "Kwami",
    "Nafada",
    "Shongom",
    "Yamaltu-Deba"
];

let Imo = [
    "Ahiazu Mbaise",
    "Ehime Mbano",
    "Ezinihitte Mbaise",
    "Ideato North",
    "Ideato South",
    "Ihitte/Uboma",
    "Ikeduru",
    "Isiala Mbano",
    "Isu",
    "Mbaitoli",
    "Ngor Okpala",
    "Njaba",
    "Nwangele",
    "Obowo",
    "Oguta",
    "Ohaji/Egbema",
    "Okigwe",
    "Onuimo",
    "Orlu",
    "Orsu",
    "Oru East",
    "Oru West",
    "Owerri Municipal",
    "Owerri North",
    "Owerri West",
    "Unuimo",
    "Ngor Okpala"
];

let Jigawa = [
    "Auyo",
    "Babura",
    "Birniwa",
    "Buji",
    "Dutse",
    "Gagarawa",
    "Garki",
    "Gumel",
    "Guri",
    "Hadejia",
    "Jahun",
    "Kafin Hausa",
    "Kauwa",
    "Kazaure",
    "Kirikasamma",
    "Kiyawa",
    "Maigatari",
    "Miga",
    "Ringim",
    "Roni",
    "Sayya",
    "Sulleri",
    "Yankwashi"
];

let Kaduna = [
    "Birnin Gwari",
    "Chikun",
    "Giwa",
    "Igabi",
    "Ikara",
    "Jaba",
    "Jema'a",
    "Kachia",
    "Kaduna North",
    "Kaduna South",
    "Kagara",
    "Kajuru",
    "Lere",
    "Makarfi",
    "Sabon Gari",
    "Sanga",
    "Soba",
    "Zangon Kataf"
];

let Kano = [
    "Ajingi",
    "Albasu",
    "Bagwai",
    "Bebeji",
    "Bichi",
    "Bunkure",
    "Dala",
    "Dambatta",
    "Danbatta",
    "Dengi",
    "Fagge",
    "Gabu",
    "Garko",
    "Garun Malam",
    "Gwale",
    "Gaya",
    "Gezawa",
    "Gwale",
    "Karaye",
    "Kibiya",
    "Kunchi",
    "Kura",
    "Madobi",
    "Makoda",
    "Minjibir",
    "Nassarawa",
    "Rano",
    "Rimin Gado",
    "Rogo",
    "Shanono",
    "Sumaila",
    "Takai",
    "Tarauni",
    "Tofa",
    "Tsanyawa",
    "Tudun Wada",
    "Warawa",
    "Wudil",
    "Gaya"
];

let Katsina = [
    "Bakori",
    "Batagarawa",
    "Batsari",
    "Baure",
    "Bindawa",
    "Charanchi",
    "Dandume",
    "Danmusa",
    "Dutsin-Ma",
    "Funtua",
    "Ingawa",
    "Jibia",
    "Kafur",
    "Kaita",
    "Kankara",
    "Katsina",
    "Kurfi",
    "Kusada",
    "Mai'adua",
    "Malumfashi",
    "Mani",
    "Mashi",
    "Matazu",
    "Musawa",
    "Rimi",
    "Sabuwa",
    "Safana",
    "Sandamu",
    "Zango"
];

let Kebbi = [
    "Aleiro",
    "Arewa",
    "Augie",
    "Bagudo",
    "Birnin Kebbi",
    "Bunza",
    "Dandi",
    "Danko/Wasagu",
    "Fakai",
    "Gwandu",
    "Jega",
    "Kalgo",
    "Koko/Besse",
    "Maiyama",
    "Ngaski",
    "Shanga",
    "Suru",
    "Zuru",
    "Kabi",
    "Kebbi North"
];

let Kogi = [
    "Adavi",
    "Ajaokuta",
    "Ankpa",
    "Bassa",
    "Dekina",
    "Ibaji",
    "Idah",
    "Igalamela/Odolu",
    "Ijumu",
    "Kabba/Bunu",
    "Kogi",
    "Mopa-Muro",
    "Ofu",
    "Ogori/Magongo",
    "Okehi",
    "Okene",
    "Omala",
    "Yagba East",
    "Yagba West",
    "Lokoja"
];

let Kwara = [
    "Asa",
    "Baruten",
    "Edu",
    "Ekiti",
    "Ifelodun",
    "Ilorin East",
    "Ilorin South",
    "Ilorin West",
    "Irepodun",
    "Isin",
    "Kaiama",
    "Moro",
    "Offa",
    "Oke-Ero",
    "Oyun",
    "Pategi"
];

let Lagos = [
    "Agege",
    "Alimosho",
    "Amuwo Odofin",
    "Apapa",
    "Badagry",
    "Epe",
    "Eti Osa",
    "Ibeju-Lekki",
    "Ifako-Ijaiye",
    "Ikeja",
    "Ikorodu",
    "Kosofe",
    "Lagos Island",
    "Lagos Mainland",
    "Mushin",
    "Ojo",
    "Oshodi-Isolo",
    "Shomolu",
    "Surulere"
];

let Nasarawa = [
    "Akwanga",
    "Awe",
    "Doma",
    "Karu",
    "Keana",
    "Keffi",
    "Kokona",
    "Lafia",
    "Nasarawa",
    "Obi",
    "Toto",
    "Wamba"
];

let Niger = [
    "Agaie",
    "Agwara",
    "Bida",
    "Borgu",
    "Chanchaga",
    "Edati",
    "Gbako",
    "Gurara",
    "Katcha",
    "Kontagora",
    "Lapai",
    "Lemu",
    "Magama",
    "Mariga",
    "Mashegu",
    "Mokwa",
    "Munya",
    "Paikoro",
    "Rafi",
    "Rijau",
    "Shiroro",
    "Suleja",
    "Tafa",
    "Wushishi"
];

let Ogun = [
    "Abeokuta North",
    "Abeokuta South",
    "Ado-Odo/Ota",
    "Ewekoro",
    "Ifo",
    "Ijebu East",
    "Ijebu North",
    "Ijebu North East",
    "Ijebu Ode",
    "Ikenne",
    "Imeko-Afon",
    "Ipokia",
    "Obafemi-Owode",
    "Odeda",
    "Odogbolu",
    "Ogun Waterside",
    "Remo North",
    "Shagamu"
];

let Ondo = [
    "Akoko North East",
    "Akoko North West",
    "Akoko South East",
    "Akoko South West",
    "Akure North",
    "Akure South",
    "Ese Odo",
    "Idanre",
    "Ifedore",
    "Ilaje",
    "Ile Oluji/Okeigbo",
    "Irele",
    "Odigbo",
    "Okitipupa",
    "Ondo East",
    "Ondo West",
    "Ose",
    "Owo"
];

let Osun = [
    "Aiyedade",
    "Aiyedire",
    "Atakumosa East",
    "Atakumosa West",
    "Boluwaduro",
    "Boripe",
    "Ede North",
    "Ede South",
    "Egbedore",
    "Ejigbo",
    "Ife Central",
    "Ife East",
    "Ife North",
    "Ife South",
    "Ilesa East",
    "Ilesa West",
    "Irepodun",
    "Irewole",
    "Isokan",
    "Isokan West",
    "Obokun",
    "Odo-Otin",
    "Ola-Oluwa",
    "Olorunda",
    "Oriade",
    "Orolu",
    "Osogbo",
    "Ede South"
];

let Oyo = [
    "Afijio",
    "Akinyele",
    "Atiba",
    "Atigun",
    "Egbeda",
    "Ibadan North",
    "Ibadan North East",
    "Ibadan North West",
    "Ibadan South East",
    "Ibadan South West",
    "Ibarapa Central",
    "Ibarapa East",
    "Ibarapa North",
    "Ido",
    "Irepo",
    "Isokan",
    "Itesiwaju",
    "Lagelu",
    "Ogbomosho North",
    "Ogbomosho South",
    "Olorunsogo",
    "Ona-Ara",
    "Orire",
    "Oyo East",
    "Oyo West",
    "Saki West",
    "Saki East",
    "Surulere"
];

let Plateau = [
    "Bokkos",
    "Jos East",
    "Jos North",
    "Jos South",
    "Kanke",
    "Kanam",
    "Langtang North",
    "Langtang South",
    "Mangu",
    "Mikang",
    "Pankshin",
    "Quaan Pan",
    "Riyom",
    "Shendam",
    "Wase"
];

let Rivers = [
    "Abua/Odual",
    "Ahoada East",
    "Ahoada West",
    "Akuku-Toru",
    "Andoni",
    "Bonny",
    "Emohua",
    "Gokana",
    "Ikwerre",
    "Khana",
    "Obio/Akpor",
    "Ogba/Egbema/Ndoni",
    "Ogu/Bolo",
    "Okrika",
    "Omuma",
    "Port Harcourt",
    "Tai",
    "Eleme",
    "Abua",
    "Ayama"
];

let Sokoto = [
    "Binji",
    "Bodinga",
    "Dange Shuni",
    "Gada",
    "Goronyo",
    "Gudu",
    "Illela",
    "Kebbe",
    "Kware",
    "Rabah",
    "Sabon Birni",
    "Shagari",
    "Silame",
    "Sokoto North",
    "Sokoto South",
    "Tambuwal",
    "Tureta",
    "Wamako",
    "Wurno",
    "Yabo",
    "Mahal"
];

let Taraba = [
    "Ardo Kola",
    "Bali",
    "Donga",
    "Gashaka",
    "Gassol",
    "Ibi",
    "Jalingo",
    "Karim Lamido",
    "Keffi",
    "Lau",
    "Sada",
    "Takum",
    "Ussa",
    "Wukari",
    "Zing"
];

let Yobe = [
    "Bade",
    "Bursari",
    "Damaturu",
    "Fika",
    "Fune",
    "Geidam",
    "Gujba",
    "Gulani",
    "Jakusko",
    "Karasuwa",
    "Machina",
    "Nangere",
    "Nguru",
    "Potiskum",
    "Tarmuwa",
    "Yunusari",
    "Zangon"
];

let Zamfara = [
    "Anka",
    "Bakura",
    "Birnin Magaji",
    "Bukkuyum",
    "Chafe",
    "Gummi",
    "Gusau",
    "Kayawa",
    "Maru",
    "Shinkafi",
    "Talata Mafara",
    "Tsafe",
    "Zurmi"
];

let FCT_Abuja = [
    "Abaji",
    "Bwari",
    "Gwagwalada",
    "Kuje",
    "Abuja Municipal Area Council (AMAC)",
    "Nyanya"
];


let slct1 = document.getElementById("State");
let slct2 = document.getElementById("localGvt");

States.forEach(function addSchool(item){
    let option = document.createElement("option");
    option.text = item;
    option.value = item;
    slct1.appendChild(option);
});

slct1.onchange = function(){
    slct2.innerHTML = "<option>Select local Government</option>";
    if (this.value == "Abia"){
        addToSlct2(Abia);
    }
    if (this.value == "Adamawa"){
        addToSlct2(Adamawa);
    }
    if (this.value == "Akwa Ibom"){
        addToSlct2(AkwaIbom);
    }
    if (this.value == "Anambra"){
        addToSlct2(Anambra);
    }
    if (this.value == "Bauchi"){
        addToSlct2(Bauchi);
    }
    if (this.value == "Bayelsa"){
        addToSlct2(Bayelsa);
    }
    if (this.value == "Benue"){
        addToSlct2(Benue);
    }
    if (this.value == "Borno"){
        addToSlct2(Borno);
    }
    if (this.value == "Cross River"){
        addToSlct2(CrossRiver);
    }
    if (this.value == "Delta"){
        addToSlct2(Delta);
    }
    if (this.value == "Ebonyi"){
        addToSlct2(Ebonyi);
    }
    if (this.value == "Edo"){
        addToSlct2(Edo);
    }
    if (this.value == "Ekiti"){
        addToSlct2(Ekiti);
    }
    if (this.value == "Enugu"){
        addToSlct2(Enugu);
    }
    if (this.value == "Gombe"){
        addToSlct2(Gombe);
    }
    if (this.value == "Imo"){
        addToSlct2(Imo);
    }
    if (this.value == "Jigawa"){
        addToSlct2(Jigawa);
    }
    if (this.value == "Kaduna"){
        addToSlct2(Kaduna);
    }
    if (this.value == "Kano"){
        addToSlct2(Kano);
    }
    if (this.value == "Katsina"){
        addToSlct2(Katsina);
    }
    if (this.value == "Kebbi"){
        addToSlct2(Kebbi);
    }
    if (this.value == "Kogi"){
        addToSlct2(Kogi);
    }
    if (this.value == "Kwara"){
        addToSlct2(Kwara);
    }
    if (this.value == "Lagos"){
        addToSlct2(Lagos);
    }
    if (this.value == "Nasarawa"){
        addToSlct2(Nasarawa);
    }
    if (this.value == "Niger"){
        addToSlct2(Niger);
    }
    if (this.value == "Ogun"){
        addToSlct2(Ogun);
    }
    if (this.value == "Ondo"){
        addToSlct2(Ondo);
    }
    if (this.value == "Osun"){
        addToSlct2(Osun);
    }
    if (this.value == "Oyo"){
        addToSlct2(Oyo);
    }
    if (this.value == "Plateau"){
        addToSlct2(Plateau);
    }
    if (this.value == "Rivers"){
        addToSlct2(Rivers);
    }
    if (this.value == "Sokoto"){
        addToSlct2(Sokoto);
    }
    if (this.value == "Taraba"){
        addToSlct2(Taraba);
    }
    if (this.value == "Yobe"){
        addToSlct2(Yobe);
    }
    if (this.value == "Zamfara"){
        addToSlct2(Zamfara);
    }
    if (this.value == "Federal Capital Territory (FCT)"){
        addToSlct2(FCT_Abuja);
    }
}

function addToSlct2(arr) {
    arr.forEach(function (item){
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        slct2.appendChild(option);
    })
};





  // UPDATING THE PROFILE

  let updateBtn = document.querySelector('.updateBtn')

  async function updateDocProfile(){
    let fullnameIn = fullname.value
    let addresssIn = addresss.value
    let StateIn = State.value
    let localGovt = localGvt.value
    let phoneIn = phone.value

    var ref = doc(db, "CUSTOMERS", currentUser)
    await updateDoc(ref, {
        Fullname: fullnameIn,
        Address: addresssIn,
        State: StateIn,
        localGovernment : localGovt,
        Phone_Number: phoneIn,
    })
    .then(() => {
      alert('Updated Successfully')
      setTimeout(() => {  
        customerDetails.style.display = 'flex'
        editProfile.style.display = 'none'
      }, 1000);
    })
    .catch(error => {
        alert(error.message)
    })
  } 

  updateBtn.addEventListener('click', updateDocProfile)






//   signOut
async function logutUser(){
  signOut(auth)
    .then(() => {
        window.location.href = 'account.html'
    })
    .catch(err => {
        console.error(err);
    })
}