let blogPosts;

async function fetchData() {
  try {
    const response = await fetch("/posts/allposts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    blogPosts = await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
fetchData();

const postsPerPage = 6;
let currentPage = 1;

function displayPosts() {
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = blogPosts.slice(startIndex, endIndex);

  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";

  postsToShow.forEach((post) => {
    const inputDate = new Date(post.publish_date);
    const formattedDate = inputDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const postElement = document.createElement("div");
    postElement.classList.add("bg-cardbg", "p-4", "rounded-lg");
    postElement.innerHTML = `
                    
                    <div class="">
                        <img src="/Thumbnails/thumbnail-${post.image}" alt="Blog Image" class=" border  border-white rounded-lg">
                    </div>
                    
                    <p class="text-sm text-datelink mt-2">${formattedDate}</p>
                    <h3 class="text-lg font-semibold text-textcolor mt-1">${post.title}</h3>
                    <p class="text-textmuted mt-1">${post.meta_description}</p>

             
                `;
    blogContainer.appendChild(postElement);
  });
}

function updatePagination() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.classList.add("px-3", "py-1", "rounded");

    if (i === currentPage) {
      pageButton.classList.add("bg-white", "text-black");
    } else {
      pageButton.classList.add("text-textmuted", "hover:text-white");
    }
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayPosts();
      updatePagination();
    });
    pagination.appendChild(pageButton);
  }
}

document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPosts();
    updatePagination();
  }
});

document.getElementById("next-page").addEventListener("click", () => {
  if (currentPage < Math.ceil(blogPosts.length / postsPerPage)) {
    currentPage++;
    displayPosts();
    updatePagination();
  }
});

setTimeout(() => {
  displayPosts();
  updatePagination();
  displayRecentPosts();
}, 2000);

// for rectnt posts
function displayRecentPosts() {
  const postsToShow = blogPosts.slice(0,20);

  
  const blogContainer = document.getElementById("blog-container-recent");
  blogContainer.innerHTML = "";

  postsToShow.forEach((post) => {
    const inputDate = new Date(post.publish_date);
    const formattedDate = inputDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const postElement = document.createElement("div");
    const postdata=JSON.stringify(post);
    postElement.classList.add("bg-cardbg", "p-4", "rounded-lg");
    postElement.innerHTML = `
                    <div class="">
                        <img src="/Thumbnails/thumbnail-${
                          post.image
                        }" alt="Blog Image" class=" border  border-white rounded-lg">
                    </div>
                    
                    <p class="text-sm text-datelink mt-2">${formattedDate}</p>
                    <h3 class="text-lg font-semibold text-textcolor mt-1">${
                      post.title
                    }</h3>
                    <p class="text-textmuted mt-1">${post.meta_description}</p>
                    <a href="posts/${post.id}" onclick="GetAllDetails(event)" data-postdata='${postdata}' class="text-textmuted p-2 bg-buttonbg rounded-md mt-3 inline-block" >Read</a> 
                `;




    blogContainer.appendChild(postElement);

  });
}

// function GetAllDetails(e) {
//   e.preventDefault(); 

//   let postData = e.target.dataset.postdata; 
//   try {
//     if (postData) {
//       let postObject = JSON.parse(postData); 
//       e.target.href=`/posts/${postObject.id}`
      
       
//     } else {
//       console.log("No post data found!");
//     }
//   } catch (error) {
//     console.log(error);
    
//   }
// }

// this is for detail blog click
