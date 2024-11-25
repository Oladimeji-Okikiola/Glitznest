
        // service workers
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('../service-worker.js')
                .then((registration) => {
                  console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                  console.log('Service Worker registration failed:', error);
                });
            });
          }

// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

// overlay menu
function openNav() {
    document.getElementById("myNav").classList.toggle("menu_width");
    document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");
}


/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// lightbox gallery
$(document).on("click", '[data-toggle="lightbox"]', function (event) {
    event.preventDefault();
    $(this).ekkoLightbox();
});

// FUNCTION TO UPDATE THE LATEST PRODUCTS

const firebaseConfig = {
  apiKey: "AIzaSyBpDrnuCX0GztgqmRxs6XXzWIsrXFofJu8",
  authDomain: "saveandget-test1.firebaseapp.com",
  databaseURL: "https://saveandget-test1-default-rtdb.firebaseio.com",
  projectId: "saveandget-test1",
  storageBucket: "saveandget-test1.appspot.com",
  messagingSenderId: "764820232194",
  appId: "1:764820232194:web:6349afe0e91f2c0aa6af1b"
};

  
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let db = getFirestore();

const myCollection = collection(db, 'LATEST');
const generalContainer = document.getElementById('generalContainer')


// FUNCTION TO DISPLAY LATEST
async function readAllDocuments() {
  try {
    querySnapshot = await getDocs(myCollection);
    displayDataIn(querySnapshot);
  } catch (error) {
    console.error('Error reading documents: ', error);
  }
}

readAllDocuments()

  function displayDataIn(querySnapshot){
    querySnapshot.forEach(element => {
      let newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'col-sm-6 col-md-4 col-lg-3')

      newDiv.innerHTML = `

        <div class="box">
            <a href="">
              <div class="img-box">
                <img src="${element.data().latestImage}" alt="">
              </div>
              <div class="detail-box">
                <h6>
                ${element.data().latestName}
                </h6>
                <h6>
                  Price
                  <span>
                    &#x20A6; ${element.data().latestPrice}
                  </span>
                </h6>
              </div>
              <div class="new">
                <span>
                  New
                </span>
              </div>
            </a>
          </div>      
      `
      generalContainer.appendChild(newDiv)
    });
  }




  // FUNCTION TO DISPLAY BLOG
const myBlog = collection(db, 'BLOG');
const blogContainer = document.getElementById('blogContainer')

async function readAllBlogs() {
  try {
    querySnapshot = await getDocs(myBlog);
    displayBlog(querySnapshot);
  } catch (error) {
    console.error('Error reading documents: ', error);
  }
}

readAllBlogs()

  function displayBlog(querySnapshot){
    querySnapshot.forEach(element => {
      let newDiv = document.createElement('div')
      newDiv.setAttribute('class', 'col-md-6')

      newDiv.innerHTML = `

        <div class="box">
            <div class="img-box">
              <img src="${element.data().blogImage}" alt="">
              <h4 class="blog_date">
                14 <br>
                July
              </h4>
            </div>
            <div class="detail-box">
              <h5>
                ${element.data().blogName}
              </h5>
              <p>${element.data().blogPrice}</p>
              <a href="blog.html">
                Read More
              </a>
            </div>
          </div>
      `
      blogContainer.appendChild(newDiv)
    });
  }


















