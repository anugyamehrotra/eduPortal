/*!
 * eduPortal - All Rights Reserved
 * Copyright 2025 Anugya Mehrotra
 *
 * This software is proprietary and may not be copied, modified, or distributed
 * without express written permission. For reference only.
 * https://eduportalhost.neocities.org/eduPortal_main_page
 */


// DECLARATION OF VARIABLES AND CONSTANTS OF TEACHER POST CREATION FORM 

var addAnnForm = document.getElementById("createPostForm");

var teacherTitle = [];
var teacherDescription = [];
var teacherDate = [];

var teacherCatagory = [];
var imageInput = [];
var teacherClub = [];

var teacherType = [];

var teacherGrade9T = [];
var teacherGrade10T = [];
var teacherGrade11T = [];
var teacherGrade12T = [];

var teacherImages = [];

// ADD NEW ANNOUNCEMENT FUNCTION

function addNewAnnouncement(addAnnForm) {
    
    // CONFIRM IF ARRAYS ARE EMPTY/NULL
    if (JSON.parse(localStorage.getItem("teacherTitleKey")) != null) {
        
        teacherTitle = JSON.parse(localStorage.getItem("teacherTitleKey"));
        teacherDescription = JSON.parse(localStorage.getItem("teacherDescriptionKey"));
        teacherDate = JSON.parse(localStorage.getItem("teacherDateKey"));
        teacherCatagory = JSON.parse(localStorage.getItem("teacherCatagoryKey"));
        teacherClub = JSON.parse(localStorage.getItem("teacherClubKey"));

        teacherType = JSON.parse(localStorage.getItem("teacherTypeKey"));
                    
        teacherGrade9T = JSON.parse(localStorage.getItem("grade9Key"));
        teacherGrade10T = JSON.parse(localStorage.getItem("grade10Key"));
        teacherGrade11T = JSON.parse(localStorage.getItem("grade11Key"));
        teacherGrade12T = JSON.parse(localStorage.getItem("grade12Key"));

        teacherImages = JSON.parse(localStorage.getItem("teacherImagesKey"));
        
    } else {
        teacherTitle = [];
        teacherDescription = [];
        teacherDate = [];
        teacherCatagory = [];
        teacherClub = [];

        teacherType = [];

        teacherGrade9T = [];
        teacherGrade10T = [];
        teacherGrade11T = [];
        teacherGrade12T = [];

        teacherImages = [];
    }

    // ASSIGNING INPUT TO VARIABLES FROM HTML FORM ELEMENTS & PUSHING ALL ELEMENTS INTO ARRAY FOR ACCURATE SEARCHING VIA QUERIES
    teacherTitle.push(addAnnForm.titleT.value);
    teacherDescription.push(addAnnForm.descriptionT.value);
    teacherDate.push(addAnnForm.dateT.value);
    teacherCatagory.push(addAnnForm.catagoryT.value);
    teacherClub.push(addAnnForm.clubT.value);

    teacherType.push(addAnnForm.teacherTypeT.value);
            
    teacherGrade9T.push(addAnnForm.grade9T.checked);
    teacherGrade10T.push(addAnnForm.grade10T.checked);
    teacherGrade11T.push(addAnnForm.grade11T.checked);
    teacherGrade12T.push(addAnnForm.grade12T.checked);

    const imageFile = addAnnForm.imageT.files[0];

    if (imageFile) {

        const allowedFileFormats = ["image/jpeg", "image/png"]; // ALLOWED IMAGE FILE FORMATS

        const maxSizeInMB = 2; // MAXIMUM SIZE OF IMAGE FILE IN MB
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // CONVERT MB TO BYTES (IMAGE FILE * 1,048,576 BYTES OF FILE INFO THAT CAN BE COLLECTED)

        // CHECK IF IMAGE FILE FORMAT IS ALLOWED
        // FUNCTION: CHECKS IF THE IMAGE FILE FORMAT IS JPEG OR PNG. IF NOT, IT ALERTS THE USER AND RETURNS
        if (!allowedFileFormats.includes(imageFile.type)) {
            alert("Please select a JPEG or PNG image file.");
            return;
        }   

        // CHECK IF IMAGE FILE SIZE EXCEEDS THE MAXIMUM SIZE
        // FUNCTION: CHECKS IF THE IMAGE FILE SIZE IS GREATER THAN 2MB. IF NOT, IT PROCEEDS TO READ THE FILE
        if (imageFile.size > maxSizeInBytes) {
            alert("The selected image is too large. Please choose an image smaller than 2MB.");
            return;
        }

        // IMAGE READER FUNCTION: READS THE IMAGE FILE AND CONVERTS IT TO A BASE64 STRING
        const reader = new FileReader();
        reader.onloadend = function() {
            teacherImages.push(reader.result);
            localStorage.setItem("teacherImagesKey", JSON.stringify(teacherImages));
        };
        reader.readAsDataURL(imageFile);
    } else {
        
        const defaultImage = "defaultImageRender.png"; // DEFAULT IMAGE IF NO IMAGE IS SELECTED
        teacherImages.push(defaultImage);
        localStorage.setItem("teacherImagesKey", JSON.stringify(teacherImages));
    }

    localStorage.setItem("teacherTitleKey", JSON.stringify(teacherTitle));
    localStorage.setItem("teacherDescriptionKey", JSON.stringify(teacherDescription));
    localStorage.setItem("teacherDateKey", JSON.stringify(teacherDate));
    localStorage.setItem("teacherCatagoryKey", JSON.stringify(teacherCatagory));
    localStorage.setItem("teacherClubKey", JSON.stringify(teacherClub));
  
    localStorage.setItem("teacherTypeKey", JSON.stringify(teacherType));
    
    // STRINGIFY FUNCTION IS TO OUPUT THE TEACHERGRADE ARRAY AS A STRING IN LOCALSTORAGE (TRUE/FALSE FOR EACH GRADE)
    localStorage.setItem("grade9Key", JSON.stringify(teacherGrade9T));
    localStorage.setItem("grade10Key", JSON.stringify(teacherGrade10T));
    localStorage.setItem("grade11Key", JSON.stringify(teacherGrade11T));
    localStorage.setItem("grade12Key", JSON.stringify(teacherGrade12T));

    localStorage.setItem("teacherImagesKey", JSON.stringify(teacherImages)); // STORE THE TEACHER IMAGES IN LOCAL STORAGE

    // LOG STORED DATA TO CONSOLE FOR CHECKING (ADDT. CHECK)
    console.log("teacherTitleKey: " + localStorage.getItem("teacherTitleKey"));
    console.log("teacherDescriptionKey: " + localStorage.getItem("teacherDescriptionKey"));
    console.log("teacherDateKey: " + localStorage.getItem("teacherDateKey"));
    console.log("teacherGradeKey: " + localStorage.getItem("teacherGradeKey"));
    console.log("teacherCatagoryKey: " + localStorage.getItem("teacherCatagoryKey"));
    console.log("teacherClubKey: " + localStorage.getItem("teacherClubKey"));

    console.log("grade9Key: " + localStorage.getItem("grade9Key"));
    console.log("grade10Key: " + localStorage.getItem("grade10Key"));
    console.log("grade11Key: " + localStorage.getItem("grade11Key"));
    console.log("grade12Key: " + localStorage.getItem("grade12Key"));

    alert("Post successfully created!"); // ALERT TO CONFIRM POST CREATION
    addAnnForm.reset();
}

// DELETE FUNCTION OF TEACHER POSTS 
function deleteFunction() {
    addAnnForm.reset();
    alert("Post successfully deleted!");
}

function homeButton() {
    window.location.href = "eduPortal_main_page.html"; // REDIRECT TO MAIN PAGE
}


// SOURCES:
// .stringify --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// TERNARY OPERATOR --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

// CAPTURING IMAGE & HOLDING: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture
    // https://stackoverflow.com/questions/5802580/html-input-type-file-get-the-image-before-submitting-the-form#:~:text=0-,URL.,This%20code%20works%20for%20me.
    // https://stackoverflow.com/questions/13405129/how-to-get-the-image-file-from-input-type-file-in-javascript
