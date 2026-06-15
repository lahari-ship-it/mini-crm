let leads = JSON.parse(localStorage.getItem("leads")) || [];

function saveData() {
    localStorage.setItem("leads", JSON.stringify(leads));
}

function displayLeads() {

    let list = document.getElementById("leadList");

    list.innerHTML = "";

    leads.forEach((lead,index)=>{

        list.innerHTML += `
        <tr>
            <td>${lead.name}</td>
            <td>${lead.email}</td>
            <td>${lead.source}</td>

            <td>
                <select onchange="changeStatus(${index},this.value)">
                    <option ${lead.status=="New"?"selected":""}>New</option>
                    <option ${lead.status=="Contacted"?"selected":""}>Contacted</option>
                    <option ${lead.status=="Converted"?"selected":""}>Converted</option>
                </select>
            </td>

            <td>
                <button onclick="deleteLead(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function addLead(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let source = document.getElementById("source").value;

    if(name=="" || email=="" || source==""){
        alert("Fill all fields");
        return;
    }

    leads.push({
        name:name,
        email:email,
        source:source,
        status:"New"
    });

    saveData();
    displayLeads();

    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("source").value="";
}

function changeStatus(index,status){
    leads[index].status=status;
    saveData();
}

function deleteLead(index){
    leads.splice(index,1);
    saveData();
    displayLeads();
}

displayLeads();