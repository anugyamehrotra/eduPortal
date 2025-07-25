# 📘 eduPortal

![image](https://github.com/user-attachments/assets/c9c08f41-f6ae-4448-8447-ed0f0f2c2e4f)


[eduPortal](https://eduportalhost.neocities.org/eduPortal_main_page) is a revolutionary program designed to modernize communication for educational systems and organizations. It enables all educators and supervisors within a region, school, or group to publish, share, and access information about the respective organizations that use the software.  

In the complex digital age of the 21st century, the challenges of communication and delivering messages across various organizations persist, leaving some individuals unaware or uninformed about events, programs, and more. In school environments, the communication gap between students and educators is particularly prevalen. eduPortal offers a clear solution for educators, allowing them to publish, share, and deliver messages and information to students across diverse organizations.

<br>

## 📑 Contents
- [Quick Start](#quick-start)
- [Core Features](#core-features)
- [Configuration](#configuratiom)

<br>

---

# 🚀 Quick Start
![image](https://github.com/user-attachments/assets/18a6d5d2-1779-4c40-8f28-c7112b99cfaf)

Follow these steps to get the eduPortal project up and running locally or online:  
<br>

### 🔗 Live Demo  
Access eduPortal via this [link](https://eduportalhost.neocities.org/eduPortal_main_page), or download all files and set-up manually.  
#### _For login, refer to Configuration below._
<br>

### 📁 Clone The Repository  
First, clone the eduPortal Repository to your local machine:

```bash
git clone https://github.com/anugyamehrotra/eduPortal.git
cd eduPortal
```
<br>

### 🌐 Run Locally (No Git Clone/Live Server)  
<li>Open <code>eduPortal_main_page.html</code> in any modern browser:  
  <ul> 
    <li>Right-click → <strong>Open with</strong> → your browser</li>  
    <li>Or drag and drop the file into a browser window</li> 
    <li>Repeat for all additional pages and javascript files if manually downloading or run through an IDE</li>
  </ul> 
</li>  

<br>

---

# 🧩 Core Features

![image](https://github.com/user-attachments/assets/a2a75952-167e-4361-b331-78a2f3cc0ac3)


### ✍️ 1. Post Creation Interface
- Administrators with a valid login can create new posts by filling in fields such as:
  - `Post Title`
  - `Post Content`
  - `Subject`
  - `Grades`
  - `Category Tags`
  
- This feature is useful for categorizing specific posts related to an organization, including events, plans, or general announcements.  
- Posts are saved dynamically using `localStorage`, allowing easy user data persistience when submitted. 
- To create a post, once administrator access is granted **_(refer to configuration below)_**, select the `Create A New Post` — this button can be found across multiple pages once logged in.
- Fill in all form data (relating to all categories above) then click `Submit` to publish a post. All published posts can be found upon redirect to home page.
<br>

### 🛠 2. Manage, Filter & Edit Posts (Edit/Delete/Search)
- Administrators have the option to:
  - **Edit A Post** — recall data from `localStorage`, publish changes to HTML keys & variables, and dynamically display changes via DOM manipulation  
  - **Delete A Post** — _splice_ data from HTML value keys (containing post data), update to `localStorage`, and dynamically display posts  
- Each post is stored in JSON format in the browser  
- To delete or edit a post, once logged in, select the `Edit` or `Delete` button found below the posts on the main home page, expanded pages, or search pages. Upon clicking `Edit`, you will be redirected to a page to edit all current form data. Once edited, click `Submit` to finalize all changes to be redicted to the specific page. 

- To search for a post, upon filling in valid search queries (i.e. no null values), click `Search` (function found on multiple pages — home page, search page, etc.) to be redirected to a search page with basic searching & advanced category searching. 
<br>

### 🖼️ 3. Image & File Support (Base64 Encoding)
- eduPortal's post creation supports displaying of uploaded images (in `.png` or `.jpeg` format) by converting them to **Base64 format**:  
  - Images are **embeded directly into HTML** without external hosting  
  - Posts dynamically display **inline previews of uploaded images**  
  - Seamless storage in `localStorage` as Base64 plain string data  

#### ⚙️ How it Works
- When user uploads an image (in `.png` or `.jpeg` format), the file is:
  - Read via FileReader API/Funtion  
  - Convert image strng format to Base64 plain string data  
  - Update input to HTML keys and dynamically preview across pages using DOM manipulation  

#### 💻 Example Output
```bash
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..." alt="Uploaded Image" />
const teacherImages = JSON.parse(localStorage.getItem("teacherImagesKey")) || [];
<img src="${teacherImages[i] || ""}" alt="Post Image" style="max-width: 717px; height: 388px;">
```
> This allows the image to be displayed even after the browser is closed and reopened, without relying on external links or servers.  

<br>

### 🧪 4. Data Validation & Handling
- Checks for empty fields in HTML inputs, invalid formats, or invalid input (invalid image input, textual input, etc.)  
<br>

### 🖥️ 5. Simple & Responsive UI
- Clean layout and form based, enabling the program to be easy for administrators/educators  
- eduPortal uses HTML & CSS to make interaction intuitive on desktops  

<br>

# 🛠️ Configuration
![image](https://github.com/user-attachments/assets/db822c88-cb39-4256-890f-979e52689325)

### 🔐 Login System Overview

eduPortal uses a simple frontend login system for administrators to access the post creation interface. Login credentials are checked against set values stored within the application.

> WARNING: Do NOT use real or sensitive passwords in this system.  
> This login is for demonstration only and is NOT secure.  
> For real-world use, implement proper backend authentication and secure password storage.

Database security for storing passwords can be done via node.js or external dependencies. This program does not support the use of external storage.

---

### 🧾 Default Credentials

To log in:

- **Username:** `admin1`
- **Password:** `pass1`

> These values are customizable by editing the JavaScript source in the main HTML file.

---

### 💻 Additional Logic Credentials
```js
// USER LOGIN CREDENTIALS --> SECURE USING EXTERNAL DATABASE IN FUTURE
    const usernameValues = ["admin1", "admin2", "admin3", "admin4"];
    const passwordValues = ["pass1", "pass2", "pass3", "pass4"];
```

---

### 👤 Author

Created by Anugya Mehrotra.  
Contact: amehrotra.395@gmail.com for all inquiries.

---

### 📄 License

eduPortal is protected under the MIT License.  
You may view, use, and modify the code under the terms of that license.  

For full details, see the LICENSE.md file at:  
[LICENSE](https://github.com/anugyamehrotra/eduPortal/blob/main/LICENSE)

