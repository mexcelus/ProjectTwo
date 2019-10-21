var $toolName = $("#tool-name");
var $toolDescription = $("#tool-description");
var $toolCategory = $("#tool-category");
var $toolPrice = $("#tool-price");
var $submitBtn = $("#post-tool");
//var $toolList = $("#tool-list");

$(document).ready(function() {
  $("select").formSelect();
});

var API = {
  saveTool: function(tool) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tools",
      data: JSON.stringify(tool)
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  },
  getTools: function() {
    return $.ajax({
      url: "api/tools",
      type: "GET"
    });
  },
  deleteTools: function(id) {
    return $.ajax({
      url: "api/tools/" + id,
      type: "DELETE"
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  }
};

var handleFormSubmit = function(event) {
  event.preventDefault();

  var tool = {
    name: $toolName.val().trim(),
    description: $toolDescription.val().trim(),
    category: $toolCategory.val().trim(),
    price: $toolPrice.val().trim(),
    MemberId: 1
  };

  if (!($toolName && $toolDescription)) {
    alert("You must enter a tool name and description!");
    return;
  }

  API.saveTool(tool).then(function() {
    //refreshExamples();
  });

  $toolName.val("");
  $toolDescription.val("");
  $toolCategory.val("");
  $toolPrice.val(0);
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
