/**************************************************************/
/* Prepares and detect the selected item on the  side nav     */
/**************************************************************/
function prepareList(pathname) {
    
    $('#side_nav').find('li:has(ul) > a').each(function () {
        if ($(this).attr('href').toLowerCase() === pathname.toLowerCase()) {
            $(this).addClass("nav_selected");
        } 
        $(this).parent().click(function (event) {
            if (this == event.target) {
               $(this).children('ul').removeClass("nav_selected");
            }
            return false;
        });
    });

    //for list items that don't have children
    $('#side_nav').find('li:not(:has(ul)) > a').each(function () {
        if ($(this).attr('href').toLowerCase() === pathname.toLowerCase()) {
            $(this).addClass("nav_selected");

            //for sub-list items that need the parents to be expanded
            if ($(this).hasClass('subcase')) {

                $(this).addClass("nav_selected");

            };

        }

    });
}


/**************************************************************/
/*                  feedback form functions                   */
/**************************************************************/


function validateForm() {
    //global vars
    var email = $("#email");
    var emailError = $("#emailError_en");
    var emailError_fr = $("#emailError_fr");
    var emailError_de = $("#emailError_de");
    var emailError_pt = $("#emailError_pt");
    var emailError_es = $("#emailError_es");

    var selectRegarding = $('#select_regarding');
    var selectRegardingError = $('#selectRegardingError_en');
    var selectRegardingError_fr = $('#selectRegardingError_fr');
    var selectRegardingError_de = $('#selectRegardingError_de');
    var selectRegardingError_pt = $('#selectRegardingError_pt');
    var selectRegardingError_es = $('#selectRegardingError_es');

    var message = $("#message");
    var messageError = $("#messageError_en");
    var messageError_fr = $("#messageError_fr");
    var messageError_de = $("#messageError_de");
    var messageError_pt = $("#messageError_pt");
    var messageError_es = $("#messageError_es");

    var submitFeedback = $('#submitFeedback')
    var emailValid = false;
    var msqValid = false;
    var selectValid = false;

    //On blur
    email.blur(validateEmail);
    selectRegarding.blur(validateSelectRegarding);

    message.blur(function () {
        validateMessage();

        if (validateMessage() == false) {
            messageError.text("Please enter a valid message!");
            messageError.addClass("error");
            messageError_fr.text("Veuillez entrer un message valide!");
            messageError_fr.addClass("error");
            messageError_de.text("Bitte geben Sie ein gültige Nachricht ein!");
            messageError_de.addClass("error");
            messageError_pt.text("Por favor digite uma mensagem válida!");
            messageError_pt.addClass("error");
            messageError_es.text("¡Por favor introduzca un mensaje válido!");
            messageError_es.addClass("error");
        }
    });

    //On select
    selectRegarding.change(validateSelectRegarding);

    //On key up
    message.keyup(validateMessage);

    //validation functions
    function validateEmail() {
        //testing regular expression
        var a = $("#email").val();
        var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+.[a-z]{2,4}$/;
        //if it's valid email
        if (filter.test(a)) {
            email.removeClass("error");
            emailError.text("");
            emailError.removeClass("error");
            emailError_fr.text("");
            emailError_fr.removeClass("error");
            emailError_de.text("");
            emailError_de.removeClass("error");
            emailError_pt.text("");
            emailError_pt.removeClass("error");
            emailError_es.text("");
            emailError_es.removeClass("error");
            emailValid = true;

            if (msqValid && selectValid) {
                submitFeedback.removeAttr('disabled').removeClass("disabled");
            }
            return true;
        }
        //if it's NOT valid
        else {
            email.addClass("error");
            emailError.text("Please enter a valid email!");
            emailError.addClass("error");
            emailError_fr.text("Veuillez entrer une adresse email valide!");
            emailError_fr.addClass("error");
            emailError_de.text("Bitte geben Sie eine gültige E-Mail ein!");
            emailError_de.addClass("error");
            emailError_pt.text("Por favor digite um email válido!");
            emailError_pt.addClass("error");
            emailError_es.text("¡Por favor introduzca un correo electrónico válido!");
            emailError_es.addClass("error");
            submitFeedback.attr('disabled', 'disabled').addClass("disabled");
            return false;
        }
    }

    function validateSelectRegarding() {
        //testing regular expression
        var a = selectRegarding.val();

        //if it's valid Option
        if (a != "Select One" && a != "Sélectionner" && a != "Wählen Sie eines" && a != "Selecione uma" && a != "Seleccione uno") {
            selectRegardingError.text("");
            selectRegardingError.removeClass("error");
            selectRegardingError_fr.text("");
            selectRegardingError_fr.removeClass("error");
            selectRegardingError_de.text("");
            selectRegardingError_de.removeClass("error");
            selectRegardingError_pt.text("");
            selectRegardingError_pt.removeClass("error");
            selectRegardingError_es.text("");
            selectRegardingError_es.removeClass("error");
            selectValid = true;

            if (msqValid && emailValid) {
                submitFeedback.removeAttr('disabled').removeClass("disabled");
            }
            //ChatHelp : if user select "Chat" from drop down
            if (a == "16") {
                $('#contactHelp').text("Please describe in what way chat does not work for you? For instance,  I clicked on the chat link, the chat window popped up and I started a conversation, after the third message the chat window went green and stopped working. Many chat errors happen to only a few users and the best way for us to fix it is to know exactly what happened.");
                $('#contactHelp').addClass("greenBold_text");
                $('#contactHelp_fr').text("Veuillez décrire le problème dont vous avez fait l'expérience avec le Chat. Par exemple: \"J'ai cliqué sur le lien du Chat, la fenêtre du Chat s'est ouverte et j'ai commencé à dialoguer avec un autre membre. Au bout du troisième message, la fenêtre du Chat est devenue verte et s'est arrêtée de fonctionner\". La plupart des erreurs du Chat ne sont rencontrées que par quelques membres et la meilleure façon pour nous de régler le problème est de savoir exactement ce qu'il s'est passé.");
                $('#contactHelp_fr').addClass("greenBold_text");
                $('#contactHelp_de').text("Bitte beschreiben Sie, was bei Ihrem Chat nicht funktioniert. Zum Beipsiel: Ich klicke auf den Chatlink, das Chatfenster erscheint und ich starte das Gespräch. Nach der dritten Nachricht verfärbt sich das Chatfenster grün und funktioniert nicht mehr. Einige Störungen treten nur bei manchen Benutzern auf und deswegen ist eine genaue Beschreibung von Ihnen der beste Weg für die Behebung des Problems.");
                $('#contactHelp_de').addClass("greenBold_text");
                $('#contactHelp_pt').text("Por favor, descreva de que maneira o chat não funciona para você? Por exemplo, eu cliquei no link chat, a janela de chat apareceu e eu comecei uma conversa, depois da terceira mensagem a janela de bate-papo ficou verde e parou de funcionar. Muitos erros de bate-papo acontecem apenas com alguns usuários e a melhor maneira para nós para consertarmos é saber exatamente o que aconteceu.");
                $('#contactHelp_pt').addClass("greenBold_text");
                $('#contactHelp_es').text("Por favor describa por qué el chat no esta funcionando para usted. Por ejemplo, hice clic en el enlace de chat, la ventana del chat apareció y comencé una conversación, después del tercer mensaje la ventana de conversación se volvió verde y dejó de funcionar. Muchos de los errores con el chat les ocurre sólo a unos cuantos usuarios y la mejor manera para que podamos arreglarlo es sabiendo exactamente que pasó.");
                $('#contactHelp_es').addClass("greenBold_text");
                $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
            }
            else if (a == "8") {
                $('#contactHelp').text("If you are writing to us to let us know about a dispruptive ad, please provide the name of the brand advertising and the location on the site of the ad and we will process your request.");
                $('#contactHelp').addClass("greenBold_text");
                $('#contactHelp_fr').text("Si vous nous écrivez au sujet d'une bannière de publicité indécente, veuillez nous fournir le nom de la marque faisant l'objet de cette publicité et l'emplacement de cette bannière sur le site afin que nous puissions traiter votre demande.");
                $('#contactHelp_fr').addClass("greenBold_text");
                $('#contactHelp_de').text("Wenn Sie uns schreiben, setzen Sie uns über die störende Anzeige in Kenntnis. Bitte halten Sie den Namen der Marke und den Ort der Seite bereit und wir werden Ihre Beanstandung bearbeiten.");
                $('#contactHelp_de').addClass("greenBold_text");
                $('#contactHelp_pt').text("Se você está escrevendo para nos informar sobre um anúncio ofensivo, forneça o nome da marca fazendo a publicidade e o local no site do anúncio aparece e processaremos o seu pedido.");
                $('#contactHelp_pt').addClass("greenBold_text");
                $('#contactHelp_es').text("Si nos está escribiendo para informarnos sobre un anuncio perturbador,  por favor indique el nombre de la marca haciendo la publicidad y la ubicación en la página del anuncio para poder procesar su informe.");
                $('#contactHelp_es').addClass("greenBold_text");
                $('html, body').animate({ scrollTop: $(document).height() }, 'slow');
            }

            else {
                $('#contactHelp').text("");
                $('#contactHelp').removeClass("greenBold_text");
                $('#contactHelp_fr').text("");
                $('#contactHelp_fr').removeClass("greenBold_text");
                $('#contactHelp_de').text("");
                $('#contactHelp_de').removeClass("greenBold_text");
                $('#contactHelp_pt').text("");
                $('#contactHelp_pt').removeClass("greenBold_text");
                $('#contactHelp_es').text("");
                $('#contactHelp_es').removeClass("greenBold_text");
            }

            return true;
        }
        //if it's NOT valid
        else {
            selectRegardingError.text("Please select one!");
            selectRegardingError.addClass("error");
            selectRegardingError_fr.text("Veuillez en sélectionner un!");
            selectRegardingError_fr.addClass("error");
            selectRegardingError_de.text("Bitte wählen Sie eines aus!");
            selectRegardingError_de.addClass("error");
            selectRegardingError_pt.text("Por favor selecione um!");
            selectRegardingError_pt.addClass("error");
            selectRegardingError_es.text("¡Por favor seleccione uno!");
            selectRegardingError_es.addClass("error");
            submitFeedback.attr('disabled', 'disabled').addClass("disabled");
            return false;
        }
    }


    function validateMessage() {
        //it's NOT valid
        if (message.val().length < 5) {
            submitFeedback.attr('disabled', 'disabled').addClass("disabled");
            return false;
        }
        //it's valid
        else {
            message.removeClass("error");
            messageError.text("");
            messageError.removeClass("error");
            messageError_fr.text("");
            messageError_fr.removeClass("error");
            messageError_de.text("");
            messageError_de.removeClass("error");
            messageError_pt.text("");
            messageError_pt.removeClass("error");
            messageError_es.text("");
            messageError_es.removeClass("error");

            msqValid = true;

            if (emailValid && selectValid) {
                submitFeedback.removeAttr('disabled').removeClass("disabled");
            }
            return true;
        }
    }
};

function revealFeedbackForm() {
    $('#feedBack_normal').hide();
    $('#feedBack_yes').hide();
    $('html, body').animate({ scrollTop: $("#feedback").offset().top }, 'slow');
    if ($("#feedBack_no").is(":hidden")) { $("#feedBack_no").slideDown("slow"); };

    $('#email').focus();
    $('#submitFeedback').attr('disabled', 'disabled').addClass("disabled");
}

/**************************************************************/
/* Functions to execute on loading the document and contents  */
/**************************************************************/

$(document).ready(function () {

    // Functions to execute on loading the document             
    prepareList(window.location.pathname + window.location.search);


    // Functions to validate the feedback form
    validateForm();

    var submitMsg = $('#submitMsg').text();

    if ( submitMsg.length === 0)
    {
        $('#feedBack_normal').show();
        $('#submitMsg').hide();
    }
    else {
        $('#feedBack_normal').hide();
        $('#submitMsg').show();
        $('html, body').animate({ scrollTop: $("#feedback").offset().top }, 'slow');
    }

    $('#feedBack_yes').hide();
    $('#feedBack_no').hide();




    //handle side-nav menu clicks (load content and toggle expand/collapse)
    $('ul#side_nav li a').unbind('click').click(function () {
        //load page

        window.location = $(this).attr('href');

        $('#feedBack_normal').show();
        $('#feedBack_yes').hide();
        $('#feedBack_no').hide();


        return false;
    });

    $('#yesButton').click(function () {

        $('#feedBack_normal').hide();
        if ($("#feedBack_yes").is(":hidden")) { $("#feedBack_yes").slideDown("slow"); };
        $('#feedBack_no').hide();

        //updates positive feedback stats for the page 
        $.ajax({
            type: "POST",
            url: "helpCenter_faq.aspx/UpdateFeedbackYes",
            data: "{}",
            contentType: "application/json;charset=utf-8",
            datatype: "json"
        });


    });

    $('#feedBack_normal').click(function () {

        revealFeedbackForm();

        //updates negative feedback stats for the page 
        $.ajax({
            type: "POST",
            url: "helpCenter_faq.aspx/UpdateFeedbackNo",
            data: "{}",
            contentType: "application/json;charset=utf-8",
            datatype: "json"
        });
    });

    $('#noButton').click(function () {

        $('#feedBack_normal').hide();
        $('#feedBack_yes').hide();
        $('#content_column').css('padding-bottom', "+=600")
        $('html, body').animate({ scrollTop: $(document).height() }, 'slow');

        if ($("#feedBack_no").is(":hidden")) { $("#feedBack_no").slideDown("slow"); };
        $('#email').focus();
        //		        $('#message').attr('class', 'inactive_text');
        $('#submitFeedback').attr('disabled', 'disabled').addClass("disabled");

        //updates negative feedback stats for the page 
        $.ajax({
            type: "POST",
            url: "helpCenter_faq.aspx/UpdateFeedbackNo",
            data: "{}",
            contentType: "application/json;charset=utf-8",
            datatype: "json"
        });
    });

    //For links to feedback
    $('a.feedbackLink')
        .unbind('click')
        .click(function () {
            revealFeedbackForm();

            $(this)
               .off('click')
               .css('cursor', 'default')
               .css('text-decoration', 'none')
               .css('color', '#323232');
        }
    );
    
	if (window.location.search.indexOf("feedbackLink") != -1) {
		$('#noButton').click();
	}

	if (window.pof && !window.pof.userIsLoggedIn) {
		$('.authorizedContent').hide();
	}
});
