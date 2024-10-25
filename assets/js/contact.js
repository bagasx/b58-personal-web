function sendEmail(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
  
    if (name == "") {
      return alert("Name must be filled out!");
    } else if (email == "") {
      return alert("Email must be filled out!");
    } else if (phone == "") {
      return alert("Phone number must be filled out!");
    } else if (subject == "" || subject == "Select one") {
      return alert("Subject must be selected!");
    } else if (message == "") { 
      return alert("Message must be filled out!");
    }
  
    const a = document.createElement("a");
    a.href = `mailto:${email}?subject=${subject}&body=${message}`;
    a.click()
  }