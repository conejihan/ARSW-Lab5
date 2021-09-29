var app = (function(){
	var author;
	var blueprintname;

	function getNameAuthor (){
		$("#author").text(author)
	}

	function getBluePrintName() {
        $("#blueprint").text(blueprintName);
	}
	
	function getNameAuthorBlueprints() {
        author = $("#author").val();
        if (author === "") {
            alert("No se ingreso un nombre");
        } else {
            apiclient.getBlueprintsByAuthor(author, (req, resp) => {
                upgradeData(resp);
            });
        }
	}
	
	function upgradeData(data){
		if (data === undefined) {
            alert("No existe el autor");
            $("#author").empty();
            $("#points").empty();
        } else {
            getName();
            const datanew = data.map((element) => {
                return {
                    name: element.name,
                    puntos: element.points.length
                }
            });

            datanew.map((elements) => {
                $("#table > tbody:last").append($("<tr><td>" + elements.name + "</td><td>" + elements.puntos.toString() +
                    "</td><td>" + "<button  id=" + elements.name + " onclick=app.getBlueprintByAuthorAndName(this)>open</button>" + "</td>"));
            });

            const total = datanew.reduce((sum, {puntos}) => sum + puntos, 0);

            $("#points").text(total);
        }
	}

	function getBlueprintByAuthorAndName(data) {
        author = $("#author").val();
        blueprintName = data.id;
        apiclient.getBlueprintsByNameAndAuthor(blueprintName, author, (req, resp) => {
            paintData(resp);
        });
	}
	
	function paintData(data) {
        getBluePrintName();
        const puntos = data.points;
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.restore();
        ctx.beginPath();
        for (let i = 1; i < puntos.length; i++) {
            ctx.moveTo(puntos[i - 1].x, puntos[i - 1].y);
            ctx.lineTo(puntos[i].x, puntos[i].y);
            if (i === puntos.length - 1) {
                ctx.moveTo(puntos[i].x, puntos[i].y);
                ctx.lineTo(puntos[0].x, puntos[0].y);
            }
        }
        ctx.stroke();
    }
})