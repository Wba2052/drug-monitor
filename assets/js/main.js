let url = window.location.origin; // đảm bảo đúng cả local & online

$("table").rtResponsiveTables();//for the responsive tables plugin

// ----------------- ADD DRUG -----------------
$("#add_drug").submit(function(event){
    alert($("#name").val() + " sent successfully!");
})

// ----------------- UPDATE DRUG -----------------
$("#update_drug").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log("Sending update:", data); // debug

    $.ajax({
        url: `${url}/api/drugs/${data.id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(response){
            alert(data.name + " Updated Successfully!");
            window.location.href = "/manage";
        },
        error: function(xhr){
            alert("❌ Update failed: " + xhr.responseText);
        }
    })
})

// ----------------- DELETE DRUG -----------------
if(window.location.pathname == "/manage"){
    $ondelete = $("table tbody td a.delete");
    $ondelete.click(function(){
        let id = $(this).attr("data-id");

        let request = {
            "url" : `${url}/api/drugs/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this drug?")){
            $.ajax(request).done(function(response){
                alert("Drug deleted Successfully!");
                location.reload();
            })
        }
    })
}

// ----------------- PURCHASE DRUG -----------------
if(window.location.pathname == "/purchase"){
    $("#drug_days").submit(function(event){
        event.preventDefault();
        $("#purchase_table").show();
        let days = +$("#days").val();
        alert("Drugs for " + days + " days!");
    })
}
