



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
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";
  import {getAuth, signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
  import { getFirestore, doc, collection, getDocs, addDoc, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

    let productCard = document.getElementById('mainCard')


    
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    let auth = getAuth()
    let db = getFirestore();
    let popNotifier = document.querySelector('.popNotifier')
    let productNAmee = document.querySelector('.productNAmee')

        //   EXTRACT SLUG CONTENT
        const urlParameters = new URLSearchParams(window.location.search)
        const slug = urlParameters.get('slug')
        const road = urlParameters.get('road')

        //   SEARCH THE DATABASE
        let myCollection = collection(db, road)
        

        async function checkThrough(){
            if(road === "JEWELERIES"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().productPrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                            <img src="${element.data().productImage}" alt="${element.data().productName}">
                            <h3>${element.data().productName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share"><i class="fa-solid fa-share"></i></button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            const productName = element.data().productName;
                            const productPrice = element.data().productPrice;
                            const productImage = element.data().productImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            }else if(road === "BATHROOM"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().bathroomPrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                            <img src="${element.data().bathroomImage}" alt="${element.data().bathroomName}">
                            <h3>${element.data().bathroomName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share">Share</button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            let productName = element.data().bathroomName;
                            let productPrice = element.data().bathroomPrice;
                            let productImage = element.data().bathroomImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            }else if(road === "CLOTHING"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().clothingPrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                            <img src="${element.data().productImage}" alt="${element.data().clothingName}">
                            <h3>${element.data().clothingName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share">Share</button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            let productName = element.data().clothingName;
                            let productPrice = element.data().clothingPrice;
                            let productImage = element.data().productImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            }else if(road === "HOME"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().homePrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                      
                            <img src="${element.data().homeImage}" alt="${element.data().homeName}">
                            <h3>${element.data().homeName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share">Share</button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            let productName = element.data().homeName;
                            let productPrice = element.data().homePrice;
                            let productImage = element.data().homeImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            }else if(road === "KITCHEN"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().kitchenPrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                      
                            <img src="${element.data().kitchenImage}" alt="${element.data().kitchenName}">
                            <h3>${element.data().kitchenName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share">Share</button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            let productName = element.data().kitchenName;
                            let productPrice = element.data().kitchenPrice;
                            let productImage = element.data().kitchenImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            }else if(road === "LAUNDARY"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().othersPrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                      
                            <img src="${element.data().othersImage}" alt="${element.data().othersName}">
                            <h3>${element.data().othersName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share">Share</button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            let productName = element.data().othersName;
                            let productPrice = element.data().othersPrice;
                            let productImage = element.data().othersImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            } else if(road === "PHONE"){
                let myCollection = collection(db, road)
                let querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
                if (querySnapshot.empty) {
                alert('Slug does not exist');
                } else {
                    querySnapshot.forEach(element => {

                        let formattedPrice = new Intl.NumberFormat('en-NG', {
                        style : 'currency',
                        currency : 'NGN'
                        }).format(`${element.data().phonePrice}`)


                        let newDiv = document.createElement('div')
                        newDiv.setAttribute('class', 'card')
                        newDiv.innerHTML = `
                
                      
                            <img src="${element.data().phoneImage}" alt="${element.data().phoneName}">
                            <h3>${element.data().phoneName}</h3>

                            <div class="otherDet">
                            <div class="buttonss">
                                <button class="buyBtn">Add to Cart</button>
                                <button class="share">Share</button>
                            </div>
                            <div class="newOldPrice">
                                <h3 class="pricing old">${formattedPrice}</h3>
                                <h3 class="pricing">${formattedPrice}</h3>
                            </div>
                            </div>
                        `
                        newDiv.querySelector('.share').addEventListener('click', () => {
                        alert('i am clicked')
                        })
                        newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                            
                            let productName = element.data().phoneName;
                            let productPrice = element.data().phonePrice;
                            let productImage = element.data().phoneImage;
                            checkAuth(productName, productPrice, productImage)
                        })
                        productCard.appendChild(newDiv)
                    });
                }
            }else{
                alert("link doesn't exist")
            }
        }

        checkThrough()








        
        // CHECK THROUGH THE DATABASE
        // async function fetchSlugData() {
        // try {
        //     const querySnapshot = await getDocs(query(myCollection, where("slug", "==", slug)));
            
        //     if (querySnapshot.empty) {
        //     alert('Slug does not exist');
        //     } else {
        //     querySnapshot.forEach(element => {

        //             let formattedPrice = new Intl.NumberFormat('en-NG', {
        //             style : 'currency',
        //             currency : 'NGN'
        //             }).format(`${element.data().productPrice}`)


        //         let newDiv = document.createElement('div')
        //         newDiv.setAttribute('class', 'card')
        //         newDiv.innerHTML = `
         
        //             <img src="${element.data().productImage}" alt="${element.data().productName}">
        //             <h3>${element.data().productName}</h3>

        //             <div class="otherDet">
        //             <div class="buttonss">
        //                 <button class="buyBtn">Add to Cart</button>
        //                 <button class="share"><i class="fa-solid fa-share"></i></button>
        //             </div>
        //             <div class="newOldPrice">
        //                 <h3 class="pricing old">${formattedPrice}</h3>
        //                 <h3 class="pricing">${formattedPrice}</h3>
        //             </div>
        //             </div>
        //         `
        //         newDiv.querySelector('.share').addEventListener('click', () => {
        //           alert('i am clicked')
        //         })
        //         newDiv.querySelector('.buyBtn').addEventListener('click', () => {

                    
        //             const productName = element.data().productName;
        //             const productPrice = element.data().productPrice;
        //             const productImage = element.data().productImage;
        //             checkAuth(productName, productPrice, productImage)
        //         })
        //         productCard.appendChild(newDiv)
        //         console.log(doc.id, " => ", element.data());
        //     });
        //     }
        // } catch (error) {
        //     console.error("Error fetching data:", error);
        // }
        // }

        // fetchSlugData();








































































































    // CHECKING THE AUTHENTICATION 
    function checkAuth(productName, productPrice, productImage){
      let productNameComing = productName
      let productPriceComing = productPrice
      let productImageComing = productImage
      
        onAuthStateChanged(auth, (user) => {
          if(user){
            let userId = user.uid
            addToCart(productName, productImage, productPrice, userId)
          }else{
            window.location.href = 'account.html'
          }
        })
  }

  // ADDING TO CART
  async function addToCart(productName, productImage, productPrice, userId){
    const cartRef = collection(db, "CARTS", userId, "carts");

    await addDoc(cartRef, {
      productName: productName,
      productPrice: productPrice,
      productImage: productImage,
    })
    .then(() => {
      productNAmee.textContent = productName
      popNotifier.style.display = 'flex'
      setTimeout(() => {
        popNotifier.style.display = 'none'
      }, 1500)
    })
    .catch(err => {
      console.error('the error is ', err);
    })
  }

    
    if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        // console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}