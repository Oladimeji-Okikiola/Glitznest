
    
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




        // FOR JEWELERIES PAGE
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
    
                const storageRef = ref(storage, 'JEWELERIES/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "JEWELERIES", productName);
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
    
            var ref = doc(db, "JEWELERIES", productName)
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
            var ref = doc(db, "JEWELERIES", productName)
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


        // FOR KITCHEN PAGE
        let kitchenNameIn = document.getElementById('kitchenName')
        let kitchenPriceIn = document.getElementById('kitchenPrice')
        let kitchenImageIn = document.getElementById('kitchenImage')

        let kitchenWrite = document.getElementById('kitchenWrite')
        let kitchenUpdate = document.getElementById('kitchenUpdate')
        let kitchenRead = document.getElementById('kitchenRead')
        let kitchenDelete = document.getElementById('kitchenDelete')
    
        async function writeForkitchen() {
            let kitchenName = kitchenNameIn.value
            let kitchenPrice = kitchenPriceIn.value
    
            if (kitchenName == '' || kitchenPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = kitchenImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'KITCHEN/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "KITCHEN", kitchenName);
                    await setDoc(ref, {
                        kitchenName: kitchenName,
                        kitchenPrice: kitchenPrice,
                        kitchenImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormProduct();
                });
            }
        }
    
        function clearFormProduct() {
            // Clear form fields after successful upload
            kitchenNameIn.value = ''
            kitchenPriceIn.value = ''
        }
    
        kitchenWrite.addEventListener('click', writeForkitchen);
    
    
        // UPDATE FOR KITCHEN
        async function updateForkitchen(){
    
            let kitchenName = kitchenNameIn.value
            let kitchenPrice = kitchenPriceIn.value
            
            var ref = doc(db, "KITCHEN", kitchenName)
            await updateDoc(ref, {
                kitchenName: kitchenName,
                kitchenPrice: kitchenPrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            kitchenNameIn.value = ''
            kitchenPriceIn.value = ''
            }
            kitchenUpdate.addEventListener('click', updateForkitchen)
    
    
        // READ FOR KITCHEN
        async function readForkitchen(){
    
            let kitchenName = kitchenNameIn.value
            var ref = doc(db, "KITCHEN", kitchenName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                kitchenNameIn.value = docSnap.data().kitchenName
                kitchenPriceIn.value = docSnap.data().kitchenPrice
                let photoSee = docSnap.data().productImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        kitchenRead.addEventListener('click', readForkitchen)
    
        // DELETE FOR KITCHEN
            async function deleteForkitchen(){
                let kitchenName = kitchenNameIn.value
                var ref = doc(db, "KITCHEN", kitchenName)
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
    
            kitchenDelete.addEventListener('click', deleteForkitchen)


        // FOR LAUNDARY PAGE
        let laundaryNameIn = document.getElementById('laundaryName')
        let laundaryPriceIn = document.getElementById('laundaryPrice')
        let laundaryImageIn = document.getElementById('laundaryImage')
      
        let laundaryWrite = document.getElementById('laundaryWrite')
        let laundaryUpdate = document.getElementById('laundaryUpdate')
        let laundaryRead = document.getElementById('laundaryRead')
        let laundaryDelete = document.getElementById('laundaryDelete')
    
        async function writeForlaundary() {
            let laundaryName = laundaryNameIn.value
            let laundaryPrice = laundaryPriceIn.value
    
            if (laundaryName == '' || laundaryPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = laundaryImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'LAUNDARY/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "LAUNDARY", productName);
                    await setDoc(ref, {
                        laundaryName: laundaryName,
                        laundaryPrice: laundaryPrice,
                        laundaryImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormlaundary();
                });
            }
        }
    
        function clearFormlaundary() {
            // Clear form fields after successful upload
            laundaryNameIn.value = ''
            laundaryPriceIn.value = ''
            }
    
            laundaryWrite.addEventListener('click', writeForlaundary);
    
    
        // UPDATE FOR LAUNDARY
        async function updateForlaundary(){
    
            let laundaryName = laundaryNameIn.value
            let laundaryPrice = laundaryPriceIn.value
    
            var ref = doc(db, "LAUNDARY", laundaryName)
            await updateDoc(ref, {
                laundaryName: laundaryName,
                laundaryPrice: laundaryPrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            laundaryNameIn.value = ''
            laundaryPriceIn.value = ''
        }
        laundaryUpdate.addEventListener('click', laundaryForProduct)
    
    
        // READ FOR LAUNDARY
        async function readForlaundary(){
    
            let laundaryName = laundaryNameIn.value
            var ref = doc(db, "LAUNDARY", laundaryName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                laundaryNameIn.value = docSnap.data().laundaryName
                laundaryPriceIn.value = docSnap.data().laundaryPrice
            let photoSee = docSnap.data().productImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        laundaryRead.addEventListener('click', readForlaundary)
    
        // DELETE FOR LAUNDARY
            async function deleteForlaundary(){
                let laundaryName = laundaryNameIn.value
                var ref = doc(db, "LAUNDARY", laundaryName)
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
    
            laundaryDelete.addEventListener('click', deleteForlaundary)


        // FOR CLOTHING PAGE
        let clothingNameIn = document.getElementById('clothingName')
        let clothingPriceIn = document.getElementById('clothingPrice')
        let clothingImageIn = document.getElementById('clothingImage')

        let clothingWrite = document.getElementById('clothingWrite')
        let clothingUpdate = document.getElementById('clothingUpdate')
        let clothingRead = document.getElementById('clothingRead')
        let clothingDelete = document.getElementById('clothingDelete')
    
        async function writeForclothing() {
            let clothingName = clothingNameIn.value
            let clothingPrice = clothingPriceIn.value
    
            if (clothingName == '' || clothingPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = clothingImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'CLOTHING/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "CLOTHING", clothingName);
                    await setDoc(ref, {
                        clothingName: clothingName,
                        clothingPrice: clothingPrice,
                        productImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormclothing();
                });
            }
        }
    
        function clearFormclothing() {
            // Clear form fields after successful upload
            clothingNameIn.value = ''
            clothingPriceIn.value = ''
            }
    
            clothingWrite.addEventListener('click', writeForclothing);
    
    
        // UPDATE FOR CLOTHING
        async function updateForclothing(){
    
            let clothingName = clothingNameIn.value
            let clothingPrice = productPriceIn.value
            
            var ref = doc(db, "CLOTHING", clothingName)
            await updateDoc(ref, {
                clothingName: clothingName,
                clothingPrice: clothingPrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            clothingNameIn.value = ''
            clothingPriceIn.value = ''
            }
            clothingUpdate.addEventListener('click', updateForclothing)
    
    
        // READ FOR CLOTHING
        async function readForclothing(){
    
            let clothingName = clothingNameIn.value
            var ref = doc(db, "CLOTHING", clothingName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                clothingNameIn.value = docSnap.data().clothingName
                clothingPriceIn.value = docSnap.data().clothingPrice
                let photoSee = docSnap.data().clothingImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        clothingRead.addEventListener('click', readForclothing)
    
        // DELETE FOR CLOTHINGS
            async function deleteForclothing(){
                let clothingName = clothingNameIn.value
                var ref = doc(db, "CLOTHING", clothingName)
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
    
            clothingDelete.addEventListener('click', deleteForclothing)


        // FOR BATHROOM PAGE
        let bathroomNameIn = document.getElementById('bathroomName')
        let bathroomPriceIn = document.getElementById('bathroomPrice')
        let bathroomImageIn = document.getElementById('bathroomImage')


        let bathroomWrite = document.getElementById('bathroomWrite')
        let bathroomUpdate = document.getElementById('bathroomUpdate')
        let bathroomRead = document.getElementById('bathroomRead')
        let bathroomDelete = document.getElementById('bathroomDelete')
    
        async function writeForbathroom() {
            let bathroomName = bathroomNameIn.value
            let bathroomPrice = bathroomPriceIn.value
            
            if (bathroomName == '' || bathroomPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = bathroomImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'BATHROOM/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "BATHROOM", bathroomName);
                    await setDoc(ref, {
                        bathroomName: bathroomName,
                        bathroomPrice: bathroomPrice,
                        bathroomImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormbathroom();
                });
            }
        }
    
        function clearFormbathroom() {
            // Clear form fields after successful upload
            bathroomNameIn.value = ''
            bathroomPriceIn.value = ''
            }
    
            bathroomWrite.addEventListener('click', writeForbathroom);
    
    
        // UPDATE FOR BATHROOM
        async function updateForbathroom(){
    
            let bathroomName = bathroomNameIn.value
            let bathroomPrice = bathroomPriceIn.value
            
            var ref = doc(db, "BATHROOM", bathroomName)
            await updateDoc(ref, {
                bathroomName: bathroomName,
                bathroomPrice: bathroomPrice,
                })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            bathroomNameIn.value = ''
            bathroomPriceIn.value = ''
            }
            bathroomUpdate.addEventListener('click', updateForbathroom)
    
    
        // READ FOR BATHROOM
        async function readForbathroom(){
    
            let bathroomName = bathroomNameIn.value
            var ref = doc(db, "BATHROOM", bathroomName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                bathroomNameIn.value = docSnap.data().bathroomName
                bathroomPriceIn.value = docSnap.data().bathroomPrice
                let photoSee = docSnap.data().bathroomImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        bathroomRead.addEventListener('click', readForbathroom)
    
        // DELETE FOR BATHROOM
            async function deleteForbathroom(){
                let bathroomName = bathroomNameIn.value
                var ref = doc(db, "BATHROOM", bathroomName)
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
    
            bathroomDelete.addEventListener('click', deleteForbathroom)


        // FOR PHONE PAGE
        let phoneNameIn = document.getElementById('phoneName')
        let phonePriceIn = document.getElementById('phonePrice')
        let phoneImageIn = document.getElementById('phoneImage')
        
        let phoneWrite = document.getElementById('phoneWrite')
        let phoneUpdate = document.getElementById('phoneUpdate')
        let phoneRead = document.getElementById('phoneRead')
        let phoneDelete = document.getElementById('phoneDelete')
    
        async function writeForphone() {
            let phoneName = phoneNameIn.value
            let phonePrice = phonePriceIn.value
            
            if (phoneName == '' || phonePrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = phoneImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'PHONE/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "PHONE", phoneName);
                    await setDoc(ref, {
                        phoneName: phoneName,
                        phonePrice: phonePrice,
                        phoneImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormphone();
                });
            }
        }
    
        function clearFormphone() {
            // Clear form fields after successful upload
            phoneNameIn.value = ''
            phonePriceIn.value = ''
            }
    
            phoneWrite.addEventListener('click', writeForphone);
    
    
        // UPDATE FOR PHONE
        async function updateForphone(){
    
            let phoneName = phoneNameIn.value
            let phonePrice = phonePriceIn.value
            
            var ref = doc(db, "PHONE", phoneName)
            await updateDoc(ref, {
                phoneName: phoneName,
                phonePrice: phonePrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            phoneNameIn.value = ''
            phonePriceIn.value = ''
            }
            phoneUpdate.addEventListener('click', updateForphone)
    
    
        // READ FOR PHONE
        async function readForphone(){
    
            let phoneName = phoneNameIn.value
            var ref = doc(db, "PHONE", phoneName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                phoneNameIn.value = docSnap.data().phoneName
                phonePriceIn.value = docSnap.data().phonePrice
                let photoSee = docSnap.data().phoneImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        phoneRead.addEventListener('click', readForphone)
    
        // DELETE FOR PHONE
            async function deleteForphone(){
                let phoneName = phoneNameIn.value
                var ref = doc(db, "PHONE", phoneName)
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
    
            phoneDelete.addEventListener('click', deleteForphone)


        // FOR HOME PAGE
        let homeNameIn = document.getElementById('homeName')
        let homePriceIn = document.getElementById('homePrice')
        let homeImageIn = document.getElementById('homeImage')
        
        let homeWrite = document.getElementById('homeWrite')
        let homeUpdate = document.getElementById('homeUpdate')
        let homeRead = document.getElementById('homeRead')
        let homeDelete = document.getElementById('homeDelete')
    
        async function writeForhome() {
            let homeName = homeNameIn.value
            let homePrice = homePriceIn.value
            let productCategory = productCategoryIn.value
            
            if (homeName == '' || homePrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = homeImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'HOME/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "HOME", homeName);
                    await setDoc(ref, {
                        homeName: homeName,
                        homePrice: homePrice,
                        homeImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormhome();
                });
            }
        }
    
        function clearFormhome() {
            // Clear form fields after successful upload
            homeNameIn.value = ''
            homePriceIn.value = ''
            }
    
            homeWrite.addEventListener('click', writeForhome);
    
    
        // UPDATE FOR HOME
        async function updateForhome(){
    
            let homeName = homeNameIn.value
            let homePrice = homePriceIn.value
            
            var ref = doc(db, "HOME", homeName)
            await updateDoc(ref, {
                homeName: homeName,
                homePrice: homePrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            homeNameIn.value = ''
            homePriceIn.value = ''
            }
            homeUpdate.addEventListener('click', updateForhome)
    
    
        // READ FOR HOME
        async function readForhome(){
    
            let homeName = homeNameIn.value
            var ref = doc(db, "HOME", homeName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                homeNameIn.value = docSnap.data().homeName
                homePriceIn.value = docSnap.data().homePrice
                let photoSee = docSnap.data().homeImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        homeRead.addEventListener('click', readForhome)
    
        // DELETE FOR HOME
            async function deleteForhome(){
                let homeName = homeNameIn.value
                var ref = doc(db, "HOME", homeName)
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
    
            homeDelete.addEventListener('click', deleteForhome)


        // FOR OTHERS PAGE
        let othersNameIn = document.getElementById('othersName')
        let othersPriceIn = document.getElementById('othersPrice')
        let othersImageIn = document.getElementById('othersImage')
        
        let othersWrite = document.getElementById('othersWrite')
        let othersUpdate = document.getElementById('othersUpdate')
        let othersRead = document.getElementById('othersRead')
        let othersDelete = document.getElementById('othersDelete')
    
        async function writeForothers() {
            let othersName = othersNameIn.value
            let othersPrice = othersPriceIn.value
            
            if (othersName == '' || othersPrice == '') {
                alert('Please fill all empty spaces');
            } else {
                let file = othersImageIn.files[0];
                var fileName = file.name;
    
                const storageRef = ref(storage, 'OTHERS/' + fileName);
                const uploadTask = uploadBytesResumable(storageRef, file);
    
                uploadTask.on('state_changed', (snapshot) => {
                    console.log(snapshot);
                }, (error) => {
                    console.log(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    
                    const ref = doc(db, "OTHERS", othersName);
                    await setDoc(ref, {
                        othersName: othersName,
                        othersPrice: othersPrice,
                        othersImage: downloadURL,  
                    });
    
                    alert("Uploading Successful");
                    clearFormothers();
                });
            }
        }
    
        function clearFormothers() {
            // Clear form fields after successful upload
            othersNameIn.value = ''
            othersPriceIn.value = ''
            }
    
            othersWrite.addEventListener('click', writeForothers);
    
    
        // UPDATE FOR OTHERS
        async function updateForothers(){
    
            let othersName = othersNameIn.value
            let othersPrice = othersPriceIn.value
            
            var ref = doc(db, "OTHERS", othersName)
            await updateDoc(ref, {
                othersName: othersName,
                othersPrice: othersPrice,
                // productImage: downloadURL,
            })
            .then(() => {
                alert('Updated Successfully')
            })
            .catch(error => {
                alert(error.message)
            })
            othersNameIn.value = ''
            othersPriceIn.value = ''
            }
            othersUpdate.addEventListener('click', updateForothers)
    
    
        // READ FOR OTHERS
        async function readForothers(){
    
            let othersName = othersNameIn.value
            var ref = doc(db, "OTHERS", othersName)
            const docSnap = await getDoc(ref)
            if(docSnap.exists()){
                // console.log(docSnap.data())
                othersNameIn.value = docSnap.data().othersName
                othersPriceIn.value = docSnap.data().othersPrice
                let photoSee = docSnap.data().othersImage
    
                console.log(photoSee)
            }else{
                alert('Product does not exist')
            }
        }
        othersRead.addEventListener('click', readForothers)
    
        // DELETE FOR OTHERS
            async function deleteForothers(){
                let othersName = othersNameIn.value
                var ref = doc(db, "OTHERS", othersName)
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
    
            othersDelete.addEventListener('click', deleteForothers)






















