function sendEmail(event) {
    event.preventDefault();
  
    const name = document.getElementById("f-name").value;
    const email = document.getElementById("f-email").value;
    const phone = document.getElementById("f-phone").value;
    const subject = document.getElementById("f-subject").value;
    const message = document.getElementById("f-message").value;
  
    if (name == "") {
      return alert("Name must be filled out!");
    } else if (email == "") {
      return alert("Email must be filled out!");
    } else if (phone == "") {
      return alert("Phone number must be filled out!");
    } else if (subject == "") {
      return alert("Subject must be filled out!");
    } else if (message == "") { 
      return alert("Message must be filled out!");
    }
  
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(subject);
    console.log(message);
  
    const a = document.createElement("a");
    a.href = `mailto:${email}?subject=${subject}&body=${message}`;
    a.click()
  }