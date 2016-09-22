var cropImage;

//initialize a DropZone
var MultiplePicDropZone = new Dropzone("form#MultipleImageUpload", {
    url: '/Account/UpdateUserMultiProfilePic',
    autoDiscover: false,
    dictDefaultMessage: '',
    autoProcessQueue: false,
    accept: function (file, done) {

        $("#cropImage").html("");

        var _this = this;
        var validExts = new Array(".jpg", ".jpeg", ".png", ".gif");
        var fileExt = file.name;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt.toLowerCase()) < 0) {
            WarningMessage("The profile image should be in the format ('.jpg','.jpeg','.png','.gif')");
            _this.removeFile(file);
        }
        else if ((file.size / 1024) > 10240) {
            WarningMessage("Image must be under 10MB...");
            _this.removeFile(file);
        }
        else if (file.width < 250 || file.height < 250) {
            WarningMessage("The profile image should be at least 250 x 250...");
            _this.removeFile(file);
        }
    },
    init: function () {
        this.on("thumbnail", function (file) {
            var _this = this;

            if (file.cropped) {
                return;
            }

            // cache filename to re-assign it to cropped file
            var cachedFilename = file.name;

            var formdata = new FormData(); //FormData object
            formdata.append("ProfilePicture", file);
            formdata.append("_id", "1");

            var cropped64;

            $.ajax({
                type: "POST",
                url: "/Account/ResizeProfileImage",
                data: formdata,
                processData: false,
                contentType: false,
                async: false,
                success: function (result) {
                    if (result.success == true) {

                        cropImage = $('#cropImage').croppie({
                            viewport: {
                                width: 250,
                                height: 250
                            },
                            boundary: { width: result.width, height: result.height }
                        });

                        cropped64 = result.base64;

                        $('#image-upload').modal('show');
                        $('#image-upload').on('shown.bs.modal', function (e) {
                            cropImage.croppie('bind', {
                                url: cropped64
                            });
                        });

                        $('#cancelImageUpload').on('click', function (ev) {
                            $('#image-upload').modal('hide');
                        });

                        $('#closeImageUpload').on('click', function (ev) {
                            $('#image-upload').modal('hide');
                        });

                        $('#saveImageUpload').on('click', function (ev) {

                            $('#image-upload').modal('hide');

                            cropImage.croppie('result', 'canvas').then(function (base64Image) {
                                // do something with cropped base64 image here
                                var newFile = dataURItoBlob(base64Image);
                                // set 'cropped to true' (so that we don't get to that listener again)
                                newFile.cropped = true;
                                // assign original filename
                                newFile.name = cachedFilename;

                                // remove not cropped file from dropzone (we will replace it later)
                                _this.removeFile(file);

                                // add cropped file to dropzone
                                _this.addFile(newFile);
                                // upload cropped file with dropzone
                                _this.processQueue();
                                $('#image-upload').modal('hide');

                            });
                        });

                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    return false;
                }
            });

        });
        this.on("sending", function (file) {
            ProcessingMultiBardisplay();
        });
        this.on("success", function (file) {
        });
    }
});

function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

//File upload button clicked
$("div#UploadFileButton").on("click", function () { $('#UserMultiProfilePicDiv #MultipleImageUpload').click(); });


function changeMultiImage() {
    ProcessingMultiBarremove();
}

//processing a image file to upload
function ProcessingMultiBardisplay() {
    $('#MultiImageProcess').html("<div class='alert alert-info'><i class='icon icon-info-circle'></i> Processing image... </div>");
}

//Warning Message to be shown
function WarningMessage(Message) {
    var Html = "<div class='alert alert-info'><i class='icon icon-info-circle'></i>  " + Message + " </div>";
    $(Html).hide().appendTo("#MultiImageProcess").fadeIn(1000).delay(8000).fadeOut();
}

//Remove popup contant
function ProcessingMultiBarremove() {
    $('#MultiImageProcess').html("");
}
