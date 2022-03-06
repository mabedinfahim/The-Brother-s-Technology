//main content start
document.getElementById("search-btn").addEventListener("click", function() {
    const spinner = document.getElementById("spinner")
    spinner.style.display = "block";
    const input = document.getElementById("search-input");
    const mainDiv = document.getElementById("row");
    const inputValue = input.value;
    if (isNaN(inputValue)) {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.data.length === 0) {
                    const warning = document.getElementById("warning");
                    warning.innerText = "Sorry! No result were found..."
                    mainDiv.textContent = "";
                    input.value = "";
                    const spinner = document.getElementById("spinner")
                    spinner.style.display = "none";
                } else {
                    loadData(data.data)
                    const spinner = document.getElementById("spinner")
                    spinner.style.display = "none";
                }
            })

        const loadData = (datas) => {
            const data20 = datas.slice(0, 20);
            mainDiv.textContent = "";
            for (const data of data20) {
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("cardDiv");
                cardDiv.classList.add("col-12");
                cardDiv.classList.add("col-md-6");
                cardDiv.classList.add("col-lg-4");
                cardDiv.innerHTML = `<div id="card" class="card rounded shadow-lg mb-5 text-center">
                        <img src="${data.image}" class="card-img-top img-fluid w-75 mx-auto p-4" alt="...">
                        <div class="card-body">
                          <h4 class="card-title">Model: <span class="fw-normal">${data.phone_name.slice(0,20)}</span> </h4>
                          <h6 class="card-text">Brand: <span class="fw-normal"> ${data.brand}</span></h6>
                          <a onclick="clickMe('${data.slug}')" href="#" class="rounded-pill btn btn-danger 
                          text-white fw-bolder mt-3 px-5 text-uppercase">Details</a>
                        </div>
                      </div>`

                mainDiv.appendChild(cardDiv);
                input.value = "";
                const warning = document.getElementById("warning");
                warning.innerText = "Your search results:"

            }
            const spinner = document.getElementById("spinner")
            spinner.style.display = "none";
        }

    } else {
        const warning = document.getElementById("warning");
        warning.innerText = "Your input was wrong"
        mainDiv.textContent = "";
        input.value = "";
        const spinner = document.getElementById("spinner")
        spinner.style.display = "none";
    }
})

//main content end


// content Details start
const clickMe = (id) => {
        const div = document.getElementById("second-row")
        div.textContent = "";
        const url = `https://openapi.programming-hero.com/api/phone/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayDetails(data))
        const displayDetails = (data) => {
            console.log(data)
            const creatDiv = document.createElement("div")
            creatDiv.classList.add("row")

            creatDiv.innerHTML = `
        <div class="col-2"></div>
        <div class="col-8 py-2 shadow-lg " id="details">
            <button onclick="closeMe()" id="close-btn"><i class="fa-solid fa-xmark"></i></button>
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-12 col-md-12 col-lg-4"><div class="d-flex justify-content-center align-items-center mb-3">
                <img src="${data.data.image}" class="mx-2 img-fluid">
            </div></div>
                <div class="col-md-12 col-lg-8 col-12"> <h6> <span class="fw-bolder">Brand:</span> ${data.data.brand}</h6>
                <h6> <span class="fw-bolder">Model: </span> ${data.data.name}</h6>
                <p><span class="fw-bolder">Memory:</span> ${data.data.mainFeatures.memory}</p>
                <p><span class="fw-bolder">Display Size: </span>${data.data.mainFeatures.displaySize}</p>
                <p><span class="fw-bolder">chip Set: </span> ${data.data.mainFeatures.chipSet}</p>
                <p><span class="fw-bolder">Sensors: </span> ${data.data.mainFeatures.sensors}</p>
                <p><span class="fw-bolder">Storage: </span> ${data.data.mainFeatures.storage}</p>
                <p><span class="fw-bolder">Bluetooth: </span> ${data?.data?.others?.Bluetooth?data.data.others.Bluetooth:"Not found"}</p>
                <p><span class="fw-bolder">GPS: </span> ${data?.data?.others?.GPS?data.data.others.GPS:"Not found"}</p>
                <p><span class="fw-bolder">WLAN: </span> ${data?.data?.others?.WLAN?data.data.others.WLAN:"Not found"}</p>
                <p class="text-success"><span class="fw-bolder">Release Date: </span>${data.data.releaseDate?data.data.releaseDate:'Release Date Not Found'}</p></div>
            </div>
        </div>
        <div class="col-2"></div>
   `
            div.appendChild(creatDiv);
            const spinner = document.getElementById("spinner")
            spinner.style.display = "none";

            const blurDiv = document.getElementById("blur")
            blurDiv.classList.add("blur");
        };

    }
    // Content Details end

//close btn start
const closeMe = () => {
    const div = document.getElementById("second-row")
    div.textContent = "";
    const blurDiv = document.getElementById("blur")
    blurDiv.classList.remove("blur");
}

//close btn end



//Default content start
const url = `https://openapi.programming-hero.com/api/phones?search=apple`;
fetch(url)
    .then(res => res.json())
    .then(data => loadData(data.data))

const mainDiv = document.getElementById("row");
const loadData = (datas) => {
    const data20 = datas.slice(0, 21);
    for (const data of data20) {

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("cardDiv");
        cardDiv.classList.add("col-12");
        cardDiv.classList.add("col-md-6");
        cardDiv.classList.add("col-lg-4");
        cardDiv.innerHTML = `<div id="card" class="card rounded shadow-lg mb-5 text-center">
            <img src="${data.image}" class="card-img-top img-fluid w-75 mx-auto p-4" alt="...">
            <div class="card-body">
              <h4 class="card-title">Model: <span class="fw-normal">${data.phone_name.slice(0,20)}</span> </h4>
              <h6 class="card-text">Brand: <span class="fw-normal"> ${data.brand}</span></h6>
              <a onclick="clickMe('${data.slug}')" href="#" class="btn btn-danger 
              text-white fw-bolder mt-3 rounded-pill px-5 text-uppercase">Details</a>
            </div>
          </div>`
        mainDiv.appendChild(cardDiv);
        const spinner = document.getElementById("spinner")
        spinner.style.display = "none";
    }
}

//Default content end