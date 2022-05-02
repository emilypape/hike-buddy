const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();
    // const name = document.getElementById("name");
    // const files = document.getElementById("files");
    // const formData = {}
    // formData.append("name", name.value);
    // for(let i =0; i < files.files.length; i++) {
    //         formData.append("files", files.files[i]);
    // }
    fetch("/upload_files", {
        method: 'POST',
        body: JSON.stringify(
            profile_picture),
        headers: {
            "Content-Type": "multipart/form-data"
          }
      })
          .then((res) => console.log(res))
          .catch((err) => ("Error occured", err));
  }