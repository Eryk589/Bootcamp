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

var wkSetSource = function (strSource) {
    sourceFrom = strSource;
}

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

var wkInitWording = function (language) {
	switch (language) {
		case 'zh-Hans':
			wkRunLocalization(Localization_zhCN);
			break;
		case 'zh-Hant':
			wkRunLocalization(Localization_zhTW);
			break;
		case 'de':
			wkRunLocalization(Localization_de);
			break;
		case 'es':
			wkRunLocalization(Localization_es);
			break;
		case 'fr':
			wkRunLocalization(Localization_fr);
			break;
		case 'it':
			wkRunLocalization(Localization_it);
			break;
		case 'ko':
			wkRunLocalization(Localization_ko);
			break;
		case 'nl':
			wkRunLocalization(Localization_nl);
			break;
		case 'en':
			wkRunLocalization(Localization_en);
			break;
		case 'pt-BR':
		    wkRunLocalization(Localization_pt_br);
		    break;
		case 'ru':
		    wkRunLocalization(Localization_ru);
		    break;
		default:
			wkRunLocalization(Localization_en);
	}
};

var wkRunLocalization = function(wkWordings) {
	$("#title-content").html(wkWordings.Product_Title);
	$("#description-content").html(wkWordings.Product_Description);
	$("#qr-code-guide-content").html(wkWordings.QR_Guide);
	$("#btn-cancel-title-content").html(wkWordings.Button_Cancel);
	$("#btn-open-title-content").html(wkWordings.Button_Open);
};

var initEvent = function () {
	$(".btn-cancel").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kIngore
        });
	});

	$(".btn-open").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kOpenURL,
            URL: 'https://apps.apple.com/app/apple-store/id1156773866?pt=444218&ct=safety_'+ sourceFrom +'_promotion&mt=8'
        });
	});
};

$(document).ready(function () {
	initEvent();
});
