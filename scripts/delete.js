addEventListener("DOMContentLoaded", async function() {
    document.querySelector("#deleteBtn").addEventListener("click", deleteSong);
    getAllSongs()
})

async function getAllSongs() {
    const response = await fetch("http://localhost:3000/api/songs");
    if (response.ok) {
        const songs = await response.json();
        let html = "";
        for(let song of songs) {
            html += `<option value="${song._id}">${song.title}</option>`

       
        }
     document.querySelector("#songDropDown").innerHTML = html;

    }
}

async function deleteSong(){
    //get the song id
    const songID = document.querySelector("#songDropDown option:checked").value

    const response = await fetch("http://localhost:3000/api/songs/" + songID, {
        method: "DELETE"
    })
    if (response.ok) {
        //successfully deleted song
        alert("Deleted song.")
        getAllSongs();
        document.querySelector("#songDropDown").selectedIndex = -1
        document.querySelector("#error").innerHTML = "";
    }
    else {
        document.querySelector("#error").innerHTML = "Cannot delete song."
    }
}