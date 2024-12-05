import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { API_KEY, API_URL } from "./config.js";

const supabase = createClient(API_URL, API_KEY);

async function fetchBranches() {
  const { data, error } = await supabase
    .from("branches") // Replace with your table name
    .select("*"); // Replace '*' with specific columns if needed

  if (error) {
    console.error("Error fetching data:", error);
  } else {
    console.log("Fetched data:", data);
  }

  return data
}

document.addEventListener("DOMContentLoaded", async () => {
  // Initialize the selected page from sessionStorage, default to "Home"

  const branches = await fetchBranches();
  const branchSelect = document.querySelector("#select-branches");
  const optionsMetadata = new Map();

  branches.forEach((branch, i) => {
    const newOption = document.createElement("option");
    newOption.value = branch.address;
    newOption.innerText = branch.address;
    optionsMetadata.set(branch.address, branch); // Store metadata in a Map
    branchSelect.appendChild(newOption);
  });

  if (!sessionStorage.getItem("selectedBranch")) {
    const branches = await fetchBranches();
    sessionStorage.setItem("selectedBranch", {});
  }

  if(sessionStorage.getItem("selectedBranch") !== 'undefined') {
      const currentBranchAddress = JSON.parse(sessionStorage.getItem("selectedBranch")).address
      branchSelect.value = currentBranchAddress
  }
  
  branchSelect.addEventListener("change", (event) => {
    const selectedAddress = event.target.value;
    const branchMetadata = JSON.stringify(optionsMetadata.get(selectedAddress)); // Retrieve metadata from Map
    sessionStorage.setItem("selectedBranch", branchMetadata);

    // Populate employees dynamically
    const branchAddress = document.querySelector('#branch-address')
    const branchId = document.querySelector('#branch-id')
    const branchPhone = document.querySelector('#branch-phone')
    const branchOpen = document.querySelector('#branch-open')
    const branchClose = document.querySelector('#branch-close')
    const currentBranch = JSON.parse(sessionStorage.getItem("selectedBranch"))

    if(!branchAddress) return
    branchAddress.innerText = "Address: "+currentBranch.address
    branchId.innerText = "Branch Id: "+currentBranch.branch_id
    branchPhone.innerText = "Phone: "+currentBranch.phone_number
    branchOpen.innerText = "Open Time: "+currentBranch.open_time
    branchClose.innerText = "Closing Time: "+currentBranch.close_time
});
});