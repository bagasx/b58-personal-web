// ajax
function getWithAjax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.onload = () => {
      resolve(JSON.parse(xhr.response));
    };

    xhr.onerror = () => {
      reject("Network Error!");
    };

    xhr.send();
  });
}

// fetch
async function getAllTestimonial() {
  const url = "https://api.npoint.io/7421ab0e86928e67aa4d";
  try {
    const response = await fetch(url);
    const json = await response.json();

    const html = json.map((testimonial) => {
      return `<div class="col">
          <div class="card shadow">
            <img src="${testimonial.image}" class="px-3 pt-3" alt="image" />
            <div class="card-body">
              <p class="card-text text-start"><i>"${testimonial.content}"</i></p>
              <h6 class="text-end">- ${testimonial.author}</h6>
              <h6 class="text-end">${testimonial.star} <i class="fa-solid fa-star fa-xs"></i></h6>
            </div>
          </div>
        </div>`;
    });
    document.getElementById("container-card").innerHTML = html.join("");
  } catch (error) {
    console.error(error);
  }
}

async function getTestimonialByStar(star) {
  const url = "https://api.npoint.io/7421ab0e86928e67aa4d";
  try {
    const response = await fetch(url);
    const json = await response.json();

    const filtered = json.filter((testimonial) => {
      return testimonial.star === star;
    });

    const html = filtered.map((testimonial) => {
      return `<div class="col">
          <div class="card shadow">
            <img src="${testimonial.image}" class="px-3 pt-3" alt="image" />
            <div class="card-body">
              <p class="card-text text-start"><i>"${testimonial.content}"</i></p>
              <h6 class="text-end">- ${testimonial.author}</h6>
              <h6 class="text-end">${testimonial.star} <i class="fa-solid fa-star fa-xs"></i></h6>
            </div>
          </div>
        </div>`;
    });
    document.getElementById("container-card").innerHTML = html.join("");
  } catch (error) {
    console.error(error);
  }
}

getAllTestimonial();
