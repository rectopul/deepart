const deepart = (() => {
    //private var/functions
    var apiKey = `GKyebHIvUG2VYoK75PQUy8qYsnr0Q2v41VPclGBS`,
        accessKey = "AKIA3XE3HF7S3IUWISWP",
        secretKey = "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";

    var deepArtEffectsClient = apigClientFactory.newClient({
        apiKey,
        accessKey,
        secretKey,
    });

    function alerts(type, msg) {
        var alertList = document.querySelectorAll(".alert");
        alertList.forEach(function (alert) {
            new bootstrap.Alert(alert);
        });

        alertList.forEach(function (alrt) {
            var alert = bootstrap.Alert.getInstance(alrt);
            alert.close();
        });
    }

    function theAlert(type, msg) {
        var myAlert;

        const alert = document.createElement("div");

        alert.classList.add("alert", "alert-dismissible", "fade", "show");

        alert.role = "alert";

        alert.style.width = "400px";
        alert.style.maxWidth = "100%";
        alert.style.zIndex = "99";
        alert.style.position = "absolute";
        alert.style.right = "5px";
        alert.style.top = "5px";

        if (type == `success`) alert.classList.add("alert-success");
        else if (type == `warning`) alert.classList.add("alert-warning");
        else alert.classList.add("alert-danger");

        alert.innerHTML = `<strong>Alerta!</strong> ${msg}`;

        var bsAlert = new bootstrap.Alert(alert);

        document.body.prepend(alert);
    }

    async function check() {
        return new Promise((resolve, reject) => {
            deepArtEffectsClient
                .stylesGet()
                .then(function (result) {
                    theAlert("success", "Successfully loaded styles");

                    styles = result.data;

                    const results = [];
                    for (var i = 0, length = styles.length; i < length; i++) {
                        results.push(styles[i].id);

                        const result = document.querySelector(".results");

                        //result.append(item);
                    }

                    return resolve(results);
                })
                .catch(function (result) {
                    theAlert("error", "Error loading styles");
                    return reject("Error loading styles");
                });
        });
    }

    async function handleUpload(file, styleId) {
        try {
            var params = { styleId };

            const base64ConvertedImage = file;

            deepArtEffectsClient
                .uploadPost(params, base64ConvertedImage)
                .then(function (result) {
                    console.log("Successfully uploaded image");
                    console.log("SubmissionId: " + result.data.submissionId);

                    result.data.submissionId;
                })
                .catch(function (result) {
                    theAlert("error", "Error uploading image");
                });
        } catch (error) {
            console.error(error);

            return error;
        }
    }

    function changeInput(input) {
        if (!input) return;

        input.addEventListener("change", async function (e) {
            e.preventDefault();

            try {
                var FR = new FileReader();

                FR.addEventListener("load", async function (e) {
                    await handleUpload(
                        e.target.result,
                        `ed818fba-1b90-11e7-afe2-06d95fe194ed`
                    );
                });

                FR.readAsDataURL(input.files[0]);
            } catch (error) {
                console.warn(`error in change event`);
            }
        });
    }

    async function sendImage(selector) {
        try {
            const input = document.querySelector(selector);

            if (!input) return;

            return changeInput(input);
        } catch (error) {
            console.error(error);
        }
    }

    return {
        //public var/functions
        check,
        sendImage,
        alerts,
    };
})();

//deepart.check();

deepart.sendImage(".sendImage");
deepart.alerts();
