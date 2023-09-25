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

var wkInitWording = function (language, junkSize) {
	switch (language) {
		case 'zh-Hans':
			wkRunLocalization(Localization_zh_hans, junkSize);
			break;
		case 'zh-Hant':
			wkRunLocalization(Localization_zh_hant, junkSize);
			break;
		case 'de':
			wkRunLocalization(Localization_de, junkSize);
			break;
		case 'es':
			wkRunLocalization(Localization_es, junkSize);
			break;
		case 'fr':
			wkRunLocalization(Localization_fr, junkSize);
			break;
		case 'it':
			wkRunLocalization(Localization_it, junkSize);
			break;
		case 'ko':
			wkRunLocalization(Localization_ko, junkSize);
			break;
		case 'nl':
			wkRunLocalization(Localization_nl, junkSize);
			break;
		case 'en':
			wkRunLocalization(Localization_en, junkSize);
			break;
		case 'pt-BR':
		    wkRunLocalization(Localization_pt_br, junkSize);
		    break;
		case 'ru':
		    wkRunLocalization(Localization_ru, junkSize);
		    break;
		default:
			wkRunLocalization(Localization_en, junkSize);
	}
};

var wkRunLocalization = function(wkWordings, wkJunkSize) {
	wkSetJunkSize(wkWordings, wkJunkSize);
	$("#description-content-2").html(wkWordings.Product_Description_2);
	$("#btn-cancel-title-content").html(wkWordings.Button_Cancel);
	$("#btn-download-title-content").html(wkWordings.Button_Download);
};

var wkSetJunkSize = function(wkWordings, wkJunkSize) {
	var wording = wkWordings.Product_Description_1;
	var substitute = wording.replace("%@", "<font color=FAA500>"+wkJunkSize+"</font>");
	$("#description-content-1").html(substitute);
}


var initEvent = function () {
	$(".btn-cancel").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kIngore
        });
	});

	$(".btn-download").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kOpenApp,
			bundleIDs: ["com.trendmicro.TrendCleanerPro", "com.trendmicro.DrCleanerProPlus", "com.trendmicro.TrendCleaner"],
            URL: 'macappstore://apps.apple.com/app/apple-store/id1133028347?pt=444218&ct=safety_'+ sourceFrom +'_promotion_V1006&mt=8'
        });
	});
};

$(document).ready(function () {
	initEvent();
});
