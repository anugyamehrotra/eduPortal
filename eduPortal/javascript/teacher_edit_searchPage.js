/*!
 * eduPortal - All Rights Reserved
 * Copyright 2025 Anugya Mehrotra • eduPortal
 *
 * This software is proprietary and may not be copied, modified, or distributed
 * without express written permission. For reference only.
 * https://eduportalhost.neocities.org/eduPortal_main_page
 */


// TO HANDLE EDITING A POST UPON CLICKING THE EDIT BUTTON
    // LOAD ALL THE DATA FROM LOCAL STORAGE
function loadEditForm() {
    const index = localStorage.getItem("editPostIndex");


    // IF INDEX NULL, RETURN VALUE --> NO POSTS AVAILABLE TO EDIT
    if (index === null) 
        return;


    // PARSING ALL TEACHER VARIABLES TO HANDLE EDITING OF ANNOUNCEMENTS (SET INTO ARRAY OR EMPTY ARRAY > CONVERT STRING VALUES TO OBJECT VALUES)
    const teacherTitleEdit = JSON.parse(localStorage.getItem("teacherTitleKey")) || [];
    const teacherDescriptionEdit = JSON.parse(localStorage.getItem("teacherDescriptionKey")) || [];
    const teacherDateEdit = JSON.parse(localStorage.getItem("teacherDateKey")) || [];
    const teacherCatagoryEdit = JSON.parse(localStorage.getItem("teacherCatagoryKey")) || [];
    const teacherClubEdit = JSON.parse(localStorage.getItem("teacherClubKey")) || [];
    const teacherTypeEdit = JSON.parse(localStorage.getItem("teacherTypeKey")) || [];

    const teacherGrade9TEdit = JSON.parse(localStorage.getItem("grade9Key")) || [];
    const teacherGrade10TEdit = JSON.parse(localStorage.getItem("grade10Key")) || [];
    const teacherGrade11TEdit = JSON.parse(localStorage.getItem("grade11Key")) || [];
    const teacherGrade12TEdit = JSON.parse(localStorage.getItem("grade12Key")) || [];


    // SETTING THE VALUES OF THE EDIT FORM FIELDS TO THE SELECTED POST'S DATA
    document.getElementById("createTitle").value = teacherTitleEdit[index];
    document.getElementById("descriptionInput").value = teacherDescriptionEdit[index];
    document.getElementById("date").value = teacherDateEdit[index];
    document.getElementById("tagCatagory").value = teacherCatagoryEdit[index];
    document.getElementById("clubInput").value = teacherClubEdit[index];
    document.getElementById("teacherType").value = teacherTypeEdit[index];

    document.getElementById("grade9").checked = teacherGrade9TEdit[index];
    document.getElementById("grade10").checked = teacherGrade10TEdit[index];
    document.getElementById("grade11").checked = teacherGrade11TEdit[index];
    document.getElementById("grade12").checked = teacherGrade12TEdit[index];
}


// FUNCTION TO SAVE THE EDITED POST
    // FUNCTION: WILL UPDATE THE LOCAL STORAGE WITH THE EDITED VALUES, THUS, DISPLAYING THE UPDATED POST IN THE STUDENT SEARCH PAGE
function saveEditedPostSearchPage() {
    const index = localStorage.getItem("editPostIndex");

    if (index === null) 
        return;


    // DECLARE VARIABLES TO STORE THE EDITED VALUES FROM THE FORM INPUTS BY GETTING NEW ITEMS VIA NEW KEYS (SET ABOVE)
    const newTitle = document.getElementById("createTitle").value;
    const newDescription = document.getElementById("descriptionInput").value;
    const newDate = document.getElementById("date").value;
    const newCatagory = document.getElementById("tagCatagory").value;
    const newClub = document.getElementById("clubInput").value;
    const newType = document.getElementById("teacherType").value;

    const newGrade9 = document.getElementById("grade9").checked;
    const newGrade10 = document.getElementById("grade10").checked;
    const newGrade11 = document.getElementById("grade11").checked;
    const newGrade12 = document.getElementById("grade12").checked;


    // PARSE ALL EDITED VALUES OF NEW KEYS (INPUTS ASSIGNED TO KEYS) AND SET THEM INTO LOCAL STORAGE
        // UPDATE THE LOCAL STORAGE WITH THE NEW VALUES, CONVERY STRINGS TO OBJECTS AND THEN EASILY PARSE THROUGH JSON

    const titleNewVar = JSON.parse(localStorage.getItem("teacherTitleKey")) || [];
        titleNewVar[index] = newTitle;
        localStorage.setItem("teacherTitleKey", JSON.stringify(titleNewVar));

    const descriptionNewVar = JSON.parse(localStorage.getItem("teacherDescriptionKey")) || [];
        descriptionNewVar[index] = newDescription;
        localStorage.setItem("teacherDescriptionKey", JSON.stringify(descriptionNewVar));

    const dateNewVar = JSON.parse(localStorage.getItem("teacherDateKey")) || [];
        dateNewVar[index] = newDate;
        localStorage.setItem("teacherDateKey", JSON.stringify(dateNewVar));

    const catagoryNewVar = JSON.parse(localStorage.getItem("teacherCatagoryKey")) || [];
        catagoryNewVar[index] = newCatagory;
        localStorage.setItem("teacherCatagoryKey", JSON.stringify(catagoryNewVar));

    const clubNewVar = JSON.parse(localStorage.getItem("teacherClubKey")) || [];
        clubNewVar[index] = newClub;
        localStorage.setItem("teacherClubKey", JSON.stringify(clubNewVar));

    const typeNewVar = JSON.parse(localStorage.getItem("teacherTypeKey")) || [];
        typeNewVar[index] = newType;
        localStorage.setItem("teacherTypeKey", JSON.stringify(typeNewVar));

    const grade9NewVar = JSON.parse(localStorage.getItem("grade9Key")) || [];
        grade9NewVar[index] = newGrade9;
        localStorage.setItem("grade9Key", JSON.stringify(grade9NewVar));

    const grade10NewVar = JSON.parse(localStorage.getItem("grade10Key")) || [];
        grade10NewVar[index] = newGrade10;
        localStorage.setItem("grade10Key", JSON.stringify(grade10NewVar));

    const grade11NewVar = JSON.parse(localStorage.getItem("grade11Key")) || [];
        grade11NewVar[index] = newGrade11;
        localStorage.setItem("grade11Key", JSON.stringify(grade11NewVar));

    const grade12NewVar = JSON.parse(localStorage.getItem("grade12Key")) || [];
        grade12NewVar[index] = newGrade12;
        localStorage.setItem("grade12Key", JSON.stringify(grade12NewVar));

    
    alert("Post updated successfully!");
    window.location.href = "studentSearch.html"; // REDIRECT TO STUDENT SEARCH PAGE AFTER SAVING
}


// SOURCES:
// .stringify --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// TERNARY OPERATOR --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

// .trim() ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
// .includes ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes --> THIS FUNCTION CHECKS FOR WHETHER THE TEACHER POST INCLUDES ANY SEARCH QUERIES THAT ARE RELATED TO A USER SEARCH/INPUT, ENABLING FOR hasSearchQueryMatch TO BE DECLARED AS TRUE UPON THE CONDIITON ABOVE BEING FULFILLED. 
// .forEach ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// .split ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
// .filter --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//     // .filter(falseQueries => falseQueries) > REMOVES ALL VALUES FROM NEWLINE ARRAY SPLITS THAT ARE NULL, IRRELEVANT, OR FALSY (i.e. "", null, undef. falsy/false)

// .splice --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice --> USED TO REMOVE ITEMS FROM AN ARRAY (I.E. TEACHER POSTS) AT A SPECIFIC INDEX (I.E. POST 3, INDEX 2)    
