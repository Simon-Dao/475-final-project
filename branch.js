import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import {API_KEY, API_URL} from './config.js'

const supabase = createClient(API_URL, API_KEY);

async function fetchBranches() {
    return ["1","2","3"]
}

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize the selected page from sessionStorage, default to "Home"

    const branches = await fetchBranches()
    const branchSelect = document.querySelector("#select-branches")

    branches.forEach((branch, i) => {
        const newOption = document.createElement('option') 
        newOption.value = branch
        newOption.innerText = branch
        branchSelect.appendChild(newOption)
    })
    

    if (!sessionStorage.getItem("selectedBranch")) {

        const branches = await fetchBranches()
        sessionStorage.setItem("selectedBranch", "");
    }
    

    branchSelect.value = sessionStorage.getItem("selectedBranch")

    branchSelect.addEventListener('change', (event) => {
        sessionStorage.setItem("selectedBranch",event.target.value)
    })

});