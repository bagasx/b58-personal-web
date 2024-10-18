const projects = [];

function addProject(event) {
    event.preventDefault();

    const projectName = document.getElementById("f-name").value;
    const sDate = document.getElementById("f-sdate").value;
    const eDate = document.getElementById("f-edate").value;
    const desc = document.getElementById("f-desc").value;
    const img = document.getElementById("f-img").files;
    let image;
    const cbSelected = [];
   
    const checkbox = document.querySelectorAll('input[type=checkbox]')

    for (let i = 0; i < checkbox.length; i++) {
      if (document.getElementById(checkbox[i].value).checked == true) {
        cbSelected.push(checkbox[i].value);
      }
    }

    if (projectName == "") {
      return alert("Name must be filled out!");
    } else if (sDate == "") {
      return alert("Start Date must be selected!"); 
    } else if (eDate == "") {
      return alert("End Date must be selected!");
    } else if (sDate === eDate) {
      return alert("Start Date & End Date must be different!");
    } else if (sDate > eDate) {
      return alert("End date must be greater than start date!");
    } else if (desc == "") {
      return alert("Description must be filled out!");
    } else if (cbSelected.length == 0) {
      return alert("Technologies must be selected!");
    } else if (img.length == 0) {
      return alert("Image must be selected!");
    } else {
      image = URL.createObjectURL(img[0]);
    }

    const project = {
        name: projectName,
        startDate: sDate,
        endDate: eDate,
        description: desc,
        tech: cbSelected,
        image: image
      };

    projects.unshift(project);
    renderProject();
}

function renderProject() {
  let html = ``;
  for (let i = 0; i < projects.length; i++) {
    html += `<div class="card">
          <img src="${projects[i].image}" alt="project image" />
          <div class="title">
            <h2>${projects[i].name}</h2>
            <p>Duration - ${dateDiff(projects[i].startDate, projects[i].endDate)}</p>
          </div>
          <div class="desc">
            <p>
            ${projects[i].description}
            </p>
          </div>
          <div class="tech">
            <img src="assets/icon/${projects[i].tech[0]}.svg" class="${projects[i].tech[0] === undefined ? `hidden` : ``}" alt="" />
            <img src="assets/icon/${projects[i].tech[1]}.svg" class="${projects[i].tech[1] === undefined ? `hidden` : ``}" alt="" />
            <img src="assets/icon/${projects[i].tech[2]}.svg" class="${projects[i].tech[2] === undefined ? `hidden` : ``}" alt="" />
            <img src="assets/icon/${projects[i].tech[3]}.svg" class="${projects[i].tech[3] === undefined ? `hidden` : ``}" alt="" />
          </div>
          <div class="btn">
            <button class="edit">Edit</button>
            <button class="delete" onclick="deleteProject(${i})">Delete</button>
          </div>
        </div>`;
  }
  document.getElementById("card-container").innerHTML = html;
}

function deleteProject(i) {
  projects.splice(i, 1);
  renderProject();
}

function dateDiff(startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const time = Math.abs(date2 - date1);
  const day = Math.ceil(time / (1000 * 60 * 60 * 24));
  const month = Math.floor(day / 31);
  const year = Math.floor(month / 12);
  
  if (day <= 1) {
    return `${day} day`;
  } else if (day <= 31) {
    return `${day} days`;
  } else if (month <= 1) {
    return `${month} Month`
  } else if (month <= 12) {
    return `${month} Months`
  } else if (year <= 1) {
    return `${year} Year`
  } else {
    return `${year} Years`
  }
}