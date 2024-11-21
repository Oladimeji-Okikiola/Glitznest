
    
    const firebaseConfig = {
        apiKey: "AIzaSyBKnPAKQWo6Dqr2WG9gOKjYMSlsNow6W0w",
        authDomain: "my-demo-project-c063c.firebaseapp.com",
        databaseURL: "https://my-demo-project-c063c-default-rtdb.firebaseio.com",
        projectId: "my-demo-project-c063c",
        storageBucket: "my-demo-project-c063c.firebasestorage.app",
        messagingSenderId: "271406994028",
        appId: "1:271406994028:web:f6ce7eda1d5b2dd4a3be49",
        measurementId: "G-VGF9LL3P60"
      };
    
        
      import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";    
      import{getFirestore, doc, getDoc, getDocs, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
      import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
      
      const db = getFirestore()
      let auth = getAuth()
      const storage = getStorage()
    
        
        const app = initializeApp(firebaseConfig);
        // const analytics = getAnalytics(app);




        // FOR PRODUCT PAGE
        let productNameIn = document.getElementById('productName')
        let productPriceIn = document.getElementById('productPrice')
        let productImageIn = document.getElementById('productImage')
        let productCategoryIn = document.getElementById('categoryy')

        let productWrite = document.getElementById('productWrite')
        let productUpdate = document.getElementById('productUpdate')
        let productRead = document.getElementById('productRead')
        let productDelete = document.getElementById('productDelete')
    
        async function writeForProduct() {
            let productName = productNameIn.value
            let productPrice = productPriceIn.value
            let productCategory = productCategoryIn.value
            // let productDescription = productDescriptionIn.value
            // let productContact = productContactIn.value
    
            if (productName == '' || productPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = productImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'PRODUCTS/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "PRODUCTS", productName);
                    await setDoc(ref, {
                        productName: productName,
                        productPrice: productPrice,
                        productDescription: productDescription,
                        productContact: productContact,
                        productImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormProduct();
                });
            }
        }
    
        function clearFormProduct() {
            // Clear form fields after successful upload
            productNameIn.value = ''
            productPriceIn.value = ''
            productDescriptionIn.value = ''
            productContactIn.value = ''
        }
    
        productWrite.addEventListener('click', writeForProduct);
    
    
        // UPDATE FOR PRODUCT
        async function updateForProduct(){
    
            let productName = productNameIn.value
            let productPrice = productPriceIn.value
            let productDescription = productDescriptionIn.value
            let productContact = productContactIn.value
    
            var ref = doc(db, "PRODUCTS", productName)
            await updateDoc(ref, {
                productName: productName,
                productPrice: productPrice,
                productDescription: productDescription,
                productContact: productContact,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            productNameIn.value = ''
            productPriceIn.value = ''
            productDescriptionIn.value = ''
            productContactIn.value = ''
        }
        productUpdate.addEventListener('click', updateForProduct)
    
    
        // READ FOR PRODUCT
        async function readForProduct(){
    
            let productName = productNameIn.value
            var ref = doc(db, "PRODUCTS", productName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                productNameIn.value = docSnap.data().productName
                productPriceIn.value = docSnap.data().productPrice
                productDescriptionIn.value = docSnap.data().productDescription
                productContactIn.value = docSnap.data().productContact
                let photoSee = docSnap.data().productImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        productRead.addEventListener('click', readForProduct)
    
        // DELETE FOR PRODUCT
            async function deleteForProduct(){
                let productName = productNameIn.value
                var ref = doc(db, "PRODUCTS", productName)
                const docSnap = await getDoc(ref)
                if(!docSnap.exists()){
                    alert('No such Document')
                }
                await deleteDoc(ref)
                .then(() => {
                    alert('Product Deleted')
                })
                .catch(error => {
                    alert(error.message)
                })
            }
    
            productDelete.addEventListener('click', deleteForProduct)