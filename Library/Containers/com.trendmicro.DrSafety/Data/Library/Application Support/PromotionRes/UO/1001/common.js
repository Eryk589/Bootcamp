const MSGTYPE = {
    kOpenApp: '0',
    kOpenURL: '1',
    kFeedback: '2',
    kIngore: '3'
};

var sourceFrom = '';

var sendMsgToSafety = function (msg) {
	if (window.webkit) {
		window.webkit.messageHandlers.MessageHandler.postMessage(msg);
	}
};


String.format = function() {
    if (arguments.length == 0)
        return null;
    var str = arguments[0];
    for ( var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};

var wkSetSource = function (strSource) {
    sourceFrom = strSource;
}

var wkInitWording = function (language) {
	switch (language) {
		case 'zh-Hans':
			wkRunLocalization(ATLocalization_zhCN);
			break;
		case 'zh-Hant':
			wkRunLocalization(ATLocalization_zhTW);
			break;
		case 'de':
			wkRunLocalization(ATLocalization_de);
			break;
		case 'es':
			wkRunLocalization(ATLocalization_es);
			break;
		case 'fr':
			wkRunLocalization(ATLocalization_fr);
			break;
		case 'it':
			wkRunLocalization(ATLocalization_it);
			break;
		case 'ko':
			wkRunLocalization(ATLocalization_ko);
			break;
		case 'nl':
			wkRunLocalization(ATLocalization_nl);
			break;
		case 'en':
			wkRunLocalization(ATLocalization_en);
			break;
		case 'ru':
			wkRunLocalization(ATLocalization_ru);
			break;
		case 'pt-BR':
			wkRunLocalization(ATLocalization_pt_br);
			break;
		default:
			wkRunLocalization(ATLocalization_en);
	}
};

var setLanguage = function(language) {
    $('.wrapper').children().each(function(){
        $(this).addClass(language);
    });

    $.getScript("localization/"+language+".lproj/LocalizationString.js", function(data, textStatus, jqxhr) {
        runLocalization();
    });
};

var runLocalization = function() {
    $("#title-content").html(ATLocalization.Product_Title);
    $("#description-content").html(ATLocalization.Product_Description);
    $("#btn-cancel-title-content").html(ATLocalization.Button_Cancel);
    $("#btn-open-title-content").html(ATLocalization.Button_Open);
};

var wkRunLocalization = function(wkWordings) {
	$("#title-content").html(wkWordings.Product_Title);
	$("#description-content").html(wkWordings.Product_Description);
	$("#btn-cancel-title-content").html(wkWordings.Button_Cancel);
	$("#btn-open-title-content").html(wkWordings.Button_Open);
};

var initEvent = function() {
    $(".btn-cancel").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kIngore
        });
	});

    $(".btn-open").click(function() {
    	sendMsgToSafety({
            type: MSGTYPE.kOpenApp,
			bundleIDs: ["com.trendmicro.DrUnzip"],
            URL: 'macappstore://apps.apple.com/app/apple-store/id1127253508?pt=444218&ct=Safety_BuyUnarchiver_'+ sourceFrom +'_V1001&mt=8'
        });
    });
};

$(document).ready(function(){
    //setLanguage("en");
    initEvent();
});
