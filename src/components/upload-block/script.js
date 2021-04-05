jQuery(function($){

	
function formatSize(length){
    var i = 0, type = ['б','Кб','Мб','Гб','Тб','Пб'];
    while((length / 1000 | 0) && i < type.length - 1) {
        length /= 1024;
        i++;
    }
    return length.toFixed(2) + ' ' + type[i];
}


// File Upload
$.fn.fileUploader = function (filesToUpload, sectionIdentifier) {
var fileIdCounter = 0;
	
    this.parents('.js-files-form').find(".js-file-input").change(function (evt) {
        var output = [];

        for (var i = 0; i < evt.target.files.length; i++) {
            fileIdCounter++;
            var file = evt.target.files[i];
            var fileId = sectionIdentifier + fileIdCounter;

            filesToUpload.push({
                id: fileId,
                file: file
            });

            var size = formatSize(file.size);
            var removeLink = "<a class=\"js-file-delete\" href=\"#\" data-fileid=\"" + fileId + "\"><svg class=\"icon icon_close\"><use xlink:href=\"images/sprite-svg.svg#close\"></use></svg></a>";

            output.push("<div class=\"upload-block__result-item\">", escape(file.name), "<span>", size, "</span>", removeLink, "</div>");
        };

        $(this).parents('.js-files-form').find(".js-files-list")
            .append(output.join(""));

        //reset the input to null - nice little chrome bug!
        evt.target.value = null;
    });

    $(document).on("click", ".js-file-delete", function (e) {
        e.preventDefault();

        var fileId = $(this).parent().children("a").data("fileid");

        // loop through the files array and check if the name of that file matches FileName
        // and get the index of the match
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id === fileId)
                filesToUpload.splice(i, 1);
        }

        $(this).parent().remove();
    });

    this.clear = function () {
        for (var i = 0; i < filesToUpload.length; ++i) {
            if (filesToUpload[i].id.indexOf(sectionIdentifier) >= 0)
                filesToUpload.splice(i, 1);
        }

        $(this).children(".js-files-list").empty();
    }

    return this;
};

(function () {
    var filesToUpload = [];

    var files1Uploader = $(".js-file-input").fileUploader(filesToUpload, "files1");
    //var files2Uploader = $("#files2").fileUploader(filesToUpload, "files2");
    //var files3Uploader = $("#files3").fileUploader(filesToUpload, "files3");

    $(document).on('click','.js-upload-btn', function (e) {
        e.preventDefault();

        var formData = new FormData();

        for (var i = 0, len = filesToUpload.length; i < len; i++) {
            formData.append("files", filesToUpload[i].file);
        }

        $.ajax({
            url: "http://requestb.in/1k0dxvs1",
            data: formData,
            processData: false,
            contentType: false,
            type: "POST",
            success: function (data) {
                alert("DONE");

                files1Uploader.clear();
                files2Uploader.clear();
                files3Uploader.clear();
            },
            error: function (data) {
                alert("ERROR - " + data.responseText);
            }
        });
    });
})()


    
});