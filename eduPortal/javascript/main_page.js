/*!
 * eduPortal - All Rights Reserved
 * Copyright 2025 Anugya Mehrotra • eduPortal
 *
 * This software is proprietary and may not be copied, modified, or distributed
 * without express written permission. For reference only.
 * https://eduportalhost.neocities.org/eduPortal_main_page
 */


function displayRecentPosts() {
   
    const loggedInTeacher = localStorage.getItem("loggedInTeacherKey");

    
    
     // PARSING ALL TEACHER VARIABLES TO HANDLE MULTIPLE ANNOUNCEMENTS (SET INTO ARRAY OR EMPTY ARRAY > CONVERT STRING VALUES TO OBJECT VALUES)
    const teacherTitle = JSON.parse(localStorage.getItem("teacherTitleKey")) || [];
    const teacherDescription = JSON.parse(localStorage.getItem("teacherDescriptionKey")) || [];
    const teacherDate = JSON.parse(localStorage.getItem("teacherDateKey")) || [];
    const teacherCatagory = JSON.parse(localStorage.getItem("teacherCatagoryKey")) || [];
    const teacherClub = JSON.parse(localStorage.getItem("teacherClubKey")) || [];
    const teacherType = JSON.parse(localStorage.getItem("teacherTypeKey")) || [];

    const teacherGrade9T = JSON.parse(localStorage.getItem("grade9Key")) || [];
    const teacherGrade10T = JSON.parse(localStorage.getItem("grade10Key")) || [];
    const teacherGrade11T = JSON.parse(localStorage.getItem("grade11Key")) || [];
    const teacherGrade12T = JSON.parse(localStorage.getItem("grade12Key")) || [];

    const teacherImages = JSON.parse(localStorage.getItem("teacherImagesKey")) || [];


    // SETTING UP CONDITIONS FOR GETTING ALL VALUES FROM LOCAL STORAGE ONTO VARIABLESZ
        // IF NO DATA IS FOUND IN LOCAL STORAGE, DECLARE IT AS EMPTY (FALSY)
    mainSearchBarS = localStorage.getItem("mainSearchBarSKey") || "";
    studentTitle = localStorage.getItem("studentTitleKey") || "";
    studentDescription = localStorage.getItem("studentDescriptionKey") || "";
    studentCatagory = localStorage.getItem("studentCatagoryKey") || "";
    studentTeacherType = localStorage.getItem("studentTeacherTypeKey") || "";
    studentClub = localStorage.getItem("studentClubKey") || "";
    studentDate1 = localStorage.getItem("studentDate1Key") || "";
    studentDate2 = localStorage.getItem("studentDate2Key") || "";

    studentGrade9 = localStorage.getItem("studentGrade9Key") === 'true';
    studentGrade10 = localStorage.getItem("studentGrade10Key") === 'true';
    studentGrade11 = localStorage.getItem("studentGrade11Key") === 'true';
    studentGrade12 = localStorage.getItem("studentGrade12Key") === 'true';  
   
    let resultsHTMLSecond = "";
    
    const rightAlignMaxPostsViewable = 6; 
   

    // TO DISPLAY ALL RECENT POSTS ON THE MAIN PAGE, UNDER "RECENT" SECTION
    for (let i = teacherTitle.length - 1; i >= teacherTitle.length - rightAlignMaxPostsViewable && i >= 0; i--) {
        if (i < teacherTitle.length) {
                   

            const editButton = loggedInTeacher ? `<button onclick="editPost(${i})">Edit Post</button>` : ""; // IF LOGGED IN AS TEACHER, DISPLAY EDIT BUTTON

            const deleteButton = loggedInTeacher ? `<button onclick="deletePost(${i})">Delete Post</button>` : ""; // IF LOGGED IN AS TEACHER, DISPLAY DELETE BUTTON

            let gradeDisplay = [];
            if (teacherGrade9T[i]) gradeDisplay.push("Grade 9");
            if (teacherGrade10T[i]) gradeDisplay.push("Grade 10");
            if (teacherGrade11T[i]) gradeDisplay.push("Grade 11");
            if (teacherGrade12T[i]) gradeDisplay.push("Grade 12");

            resultsHTMLSecond += `
                <div class="post">
                    <h4>${teacherTitle[i] || ""}</h4>
                    <img src="${teacherImages[i] || ""}" alt="Post Image" style="max-width: 517px; height: 188px;">
                    <p>Date: ${teacherDate[i] || ""}</p>
                    <p>Posted by: ${teacherType[i] || ""}</p>
                    <p>Description: ${teacherDescription[i] || ""}</p>
                    <p>Category: ${teacherCatagory[i] || ""}</p>
                    <p>Club: ${teacherClub[i] || ""}</p>
                    <p>Grades: ${gradeDisplay.join(", ")}</p><br>
                    ${editButton}
                    ${deleteButton}<br>
                    
                </div>
            `;


            // DISPLAY POSTS SECTION
            const searchResultsSecond = document.getElementById("latestPostContainerView");

            if (searchResultsSecond) {
                searchResultsSecond.innerHTML = resultsHTMLSecond;
            } else {
                console.error("Nothing found, recheck IDs or HTML structure.");
            }
            
        }

    }
    
}


// EDIT POST FUNCTION
function editPost(index) {
    localStorage.setItem("editPostIndex", index); // LOG SPECIFIC POST BY INDEX (I.E. OF 5 POSTS, IF YOU EDIT POST 3, IT WILL LOG THE INDEX AS 2 (ORDER: RECENT POST IS 0, SECOND POST IS 1, ETC.))

    window.location.href = "edit_teacher_post_mainPage.html"; // REDIRECT TO EDIT POST PAGE
}

// DELETE POST FUNCTION
function deletePost(index) {

    // RECALL ALL TEACHER VARIABLES FROM LOCAL STORAGE TO HANDLE DELETION OF ANNOUNCEMENTS (SET INTO ARRAY OR EMPTY ARRAY > CONVERT STRING VALUES TO OBJECT VALUES)
    const teacherTitle = JSON.parse(localStorage.getItem("teacherTitleKey")) || [];
    const teacherDescription = JSON.parse(localStorage.getItem("teacherDescriptionKey")) || [];
    const teacherDate = JSON.parse(localStorage.getItem("teacherDateKey")) || [];
    const teacherCatagory = JSON.parse(localStorage.getItem("teacherCatagoryKey")) || [];
    const teacherClub = JSON.parse(localStorage.getItem("teacherClubKey")) || [];
    const teacherType = JSON.parse(localStorage.getItem("teacherTypeKey")) || [];

    const teacherGrade9T = JSON.parse(localStorage.getItem("grade9Key")) || [];
    const teacherGrade10T = JSON.parse(localStorage.getItem("grade10Key")) || [];
    const teacherGrade11T = JSON.parse(localStorage.getItem("grade11Key")) || [];
    const teacherGrade12T = JSON.parse(localStorage.getItem("grade12Key")) || [];

    const teacherImages = JSON.parse(localStorage.getItem("teacherImagesKey")) || [];

    // SPLICE THE TEACHER VARIABLES TO REMOVE THE POST AT THE SPECIFIED INDEX (REFER TO STACK OVERFLOW SOURCE)
    teacherTitle.splice(index, 1);
    teacherDescription.splice(index, 1);
    teacherDate.splice(index, 1);
    teacherCatagory.splice(index, 1);
    teacherClub.splice(index, 1);
    teacherType.splice(index, 1);

    teacherGrade9T.splice(index, 1);
    teacherGrade10T.splice(index, 1);
    teacherGrade11T.splice(index, 1);
    teacherGrade12T.splice(index, 1);

    teacherImages.splice(index, 1);

    // SAVE THE UPDATED DATA BACK TO LOCAL STORAGE
    localStorage.setItem("teacherTitleKey", JSON.stringify(teacherTitle));
    localStorage.setItem("teacherDescriptionKey", JSON.stringify(teacherDescription));
    localStorage.setItem("teacherDateKey", JSON.stringify(teacherDate));
    localStorage.setItem("teacherCatagoryKey", JSON.stringify(teacherCatagory));
    localStorage.setItem("teacherClubKey", JSON.stringify(teacherClub));
    localStorage.setItem("teacherTypeKey", JSON.stringify(teacherType));

    localStorage.setItem("grade9Key", JSON.stringify(teacherGrade9T));
    localStorage.setItem("grade10Key", JSON.stringify(teacherGrade10T));
    localStorage.setItem("grade11Key", JSON.stringify(teacherGrade11T));
    localStorage.setItem("grade12Key", JSON.stringify(teacherGrade12T));

    localStorage.setItem("teacherImagesKey", JSON.stringify(teacherImages));

    
    alert("Post deleted successfully!"); // ALERT USER OF SUCCESSFUL DELETION
    location.reload(); // RELOAD THE PAGE TO REFLECT THE DELETION
    
}


function logOut() {
    localStorage.removeItem("loggedInTeacherKey"); // REMOVE THE LOGGED IN TEACHER KEY FROM LOCAL STORAGE
    alert("You have been logged out successfully!"); // ALERT USER OF SUCCESSFUL LOGOUT
    window.location.href = "eduPortal_main_page.html"; // REDIRECT TO MAIN PAGE
}


function searchPostsMainBar(){
    const searchValue = document.getElementById("mainSearchBarS").value.toLowerCase(); // GET THE VALUE FROM THE MAIN SEARCH BAR (ON TOP) AND CONVERT IT TO LOWERCASE

    
    if( searchValue === "") {
        alert("Please enter a search term."); // ALERT USER IF SEARCH BAR IS EMPTY
        return;
    } else if (searchValue){
        localStorage.setItem("mainSearchBarSKey", searchValue); // SAVE THE SEARCH VALUE TO LOCAL STORAGE
        window.location.href = "studentSearch.html"; // REDIRECT TO SEARCH RESULTS PAGE
    } else {
        alert("No results found. Please try again."); // ALERT USER IF NO RESULTS ARE FOUND
    }

}

function searchPostsLatest(){
    const searchValue2 = document.getElementById("mainSearchBarS2").value.toLowerCase(); // GET THE VALUE FROM THE MAIN SEARCH BAR (ON TOP) AND CONVERT IT TO LOWERCASE

    
    if( searchValue2 === "") {
        alert("Please enter a search term."); // ALERT USER IF SEARCH BAR IS EMPTY
        return;
    } else if (searchValue2){
        localStorage.setItem("mainSearchBarSKey", searchValue2); // SAVE THE SEARCH VALUE TO LOCAL STORAGE
        window.location.href = "studentSearch.html"; // REDIRECT TO SEARCH RESULTS PAGE
    } else {
        alert("No results found. Please try again."); // ALERT USER IF NO RESULTS ARE FOUND
    }

}


/* SOURCES:

- LOCALSTORAGE: https://www.linkedin.com/pulse/how-use-localstorage-store-data-javascript-react-otto-joash

- JSON.PARSE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse

- REGEX FUNCTIONS: /\s+/ ---> THE "/\s+/" REGEX SPLITS THE STRING INTO AN ARRAY BASED ON SPACES, TABS, OR NEWLINES SO THAT THEY CAN EASILY BE COMPARED TO KEY WORDS SEARCHES USING THE SEARCH BAR WITHOUT HAVING TO INPUT THE EXACT TITLES
    // e.g const teacherTitleWords = teacherTitle ? teacherTitle.toLowerCase().split(/\s+/) : ["  "]; // const studentTitleWords = studentTitle ? studentTitle.toLowerCase(/\s+/).split() : ["  "]; --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

- DATEVALUE: https://support.microsoft.com/en-us/office/datevalue-function-df8b07d4-7761-4a93-bc33-b7471bbff252 (CONVERT HTML DATE TO SERIAL DATES)
    - SERIAL DATES: TO CONVERT ALL HTML DATE VALUES TO SERIAL VALUES (i.e =DATEVALUE("1/1/2008") returns 39448) IN NUMERICAL OUTPUT FOR EASY COMPARISON

- ARROW FUNCTION =>: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions --> SHORTENED FUNCTION DECLARATION


.trim() ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim
.includes ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes --> THIS FUNCTION CHECKS FOR WHETHER THE TEACHER POST INCLUDES ANY SEARCH QUERIES THAT ARE RELATED TO A USER SEARCH/INPUT, ENABLING FOR hasSearchQueryMatch TO BE DECLARED AS TRUE UPON THE CONDIITON ABOVE BEING FULFILLED. 
.forEach ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
.split ---> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
.filter --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // .filter(falseQueries => falseQueries) > REMOVES ALL VALUES FROM NEWLINE ARRAY SPLITS THAT ARE NULL, IRRELEVANT, OR FALSY (i.e. "", null, undef. falsy/false)

.splice --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice --> USED TO REMOVE ITEMS FROM AN ARRAY (I.E. TEACHER POSTS) AT A SPECIFIC INDEX (I.E. POST 3, INDEX 2)


// CAPTURING IMAGE & HOLDING: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/capture
    // https://stackoverflow.com/questions/5802580/html-input-type-file-get-the-image-before-submitting-the-form#:~:text=0-,URL.,This%20code%20works%20for%20me.
    // https://stackoverflow.com/questions/13405129/how-to-get-the-image-file-from-input-type-file-in-javascript

*/
