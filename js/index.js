$(document).ready(function() {
	//remover classe de erro
	function erroClass() {
		$("form label").removeClass("text-danger");
	}

	$("form").submit(function(e) {
		e.preventDefault();

		var a = 0;
		var b = 0;
		var c = 0;
		var d = 0;
		var e = 0;
		var f = 0;
		var res = "";
		var sigla = "";

		let total_afirmativas = $("form :input[type='radio']").length;
		let total_respondidas = $("form :input:checked").length;

		//Removendo classe de erro
		erroClass();
		//verificando quantidade de respostas
		if (total_afirmativas / 2 !== total_respondidas) {
			$(".form-group").each(function(i) {
				//Recuperar afirmativas não respondidas
				if (
					$(this)
						.find("input")
						.not(":checked").length > 1
				) {
					$(this)
						.find("label")
						.addClass("text-danger");
				}
			});

			//dando foco na primeira avirmativa não respondida
			$("form label").each(function(i) {
				if ($(this).hasClass("text-danger")) {
					$(this).focus();
					return false;
				}
			});
		} else {
            $("form :input:checked").each(function (i) {
                //quantificando resultado
				switch ($(this).val()) {
					case "a":
						a++;
						break;
					case "b":
						b++;
						break;
					case "c":
						c++;
						break;
					case "d":
						d++;
						break;
					case "e":
						e++;
						break;
					case "f":
						f++;
						break;
					default:
						break;
				}
			});

            //Valiando resultado
			if (a > c) {
				res += "P.";
				sigla += "Produtor, ";
			} else {
				res += "C.";
				sigla += "Conector, ";
			}

			if (d > f) {
				res += "E.";
				sigla += "Estabilizador, ";
			} else {
				res += "V.";
				sigla += "Variador, ";
			}

			if (b > e) {
				res += "I";
				sigla += "Interiorizador";
			} else {
				res += "E";
				sigla += "Exteriorizador";
			}

            //Resultado no modal
			$("#res").html(sigla + " = " + res);

			//Reativando botão de reset
			$(".btn-secondary").prop("disabled", false);
            //exibindo modal
			$("#exampleModal").modal("show");
		}
	});

	//Desativar resposta
	$(document).on("change", ".form-group", function() {
		$(this)
			.find("input")
			.not(":checked")
			.prop("disabled", true);
		//removendo erro
		$(this)
			.find("label")
			.removeClass("text-danger");
	});

	//Reativar opções
	$(".btn-secondary").click(function() {
		$("form")
			.find("input")
			.not(":checked")
			.prop("disabled", false);
		//Removendo mensagens de erro
		erroClass();

		//Foco na primeira afirmativa
		$("input[type='radio']")
			.first()
			.focus();
	});

	//Função para iniciar tratamento de javascript
	function start() {
		$.getJSON("js/perguntas.json", function(data) {
			$.each(data, function(i, perguntas) {
				//inserção da primeira pergunta
				if (!i) {
					$("li h5").text("Afirmativa " + (i + 1) + ":");
					$.each(perguntas, function(j, pergunta) {
						if (!j) {
							//Config de Labels
							$("label")
                                .attr("for", "r" + i + "_" + j)
                                .addClass("text-justify")
								.text(pergunta.resposta);
							//Config de Input
							$("input")
								.attr("id", "r" + i + "_" + j)
								.attr("name", "r" + i)
								.val(pergunta.valor);
							$("div.spinner").remove();
							$("ul").prop("hidden", false);
						} else {
							//clonando estrutura
							clone = $("div.custom-control").clone();
							//inserindo dados
							clone
								.find("label")
                                .attr("for", "r" + i + "_" + j)
                                .addClass("text-justify")
								.text(pergunta.resposta);

							clone
								.find("input")
								.attr("id", "r" + i + "_" + j)
								.attr("name", "r" + i)
								.val(pergunta.valor);

							//inserindo no html
							$("div.form-group").append(clone);
						}
					});
				} else {
					//recuperar primeira pergunta inserida
					clone_pergunta = $("li")
						.first()
						.clone();

					clone_pergunta.find("h5").text("Afirmativa " + (i + 1) + ":");

					$.each(perguntas, function(j, pergunta) {
						if (!j) {
							//recuperando primeira div de pergunta
							div = clone_pergunta.find("div.custom-control").first();

							//inserindo dados
							div
								.find("label")
                                .attr("for", "r" + i + "_" + j)
                                .addClass("text-justify")
								.text(pergunta.resposta);

							div
								.find("input")
								.attr("id", "r" + i + "_" + j)
								.attr("name", "r" + i)
								.val(pergunta.valor);
						} else {
							//recuperando segunda div de pergunta
							div = clone_pergunta.find("div.custom-control").last();
							//inserindo dados
							div
								.find("label")
                                .attr("for", "r" + i + "_" + j)
                                .addClass("text-justify")
								.text(pergunta.resposta);

							div
								.find("input")
								.attr("id", "r" + i + "_" + j)
								.attr("name", "r" + i)
								.val(pergunta.valor);
						}
					});
					//inserindo na lista de questões
					$("ul").append(clone_pergunta);
				}
			});
		});
	}

	start();
});
