var apiclient = (function () {
    return {
        getBlueprintsByAuthor: function (author, callback) {
            const apiRest = $.get({
                url: "/blueprints/" + author,
                contentType: "application/json",
            });
            apiRest.then(function (data) {
                    callback(null, data);
                }, function (error) {
                    alert("No existen los datos")
                }
            );
        },

        getBlueprintsByNameAndAuthor: function (name, author, callback) {
            const apiRest = $.get({
                url: "/blueprints/" + author + "/" + name,
                contentType: "application/json",
            });
            apiRest.then(function (data) {
                    callback(null, data);
                }, function (error) {
                    alert("No existen los datos")
                }
            );
        }
    }
})();