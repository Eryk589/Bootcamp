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

var wkInitWording = function (language) {
	switch (language) {
		case 'zh-Hans':
			wkRunLocalization(Localization_zh_hans);
			break;
		case 'zh-Hant':
			wkRunLocalization(Localization_zh_hant);
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
	$("#description-content-1").html(wkWordings.Product_Description_1);
	$("#description-content-2").html(wkWordings.Product_Description_2);
	$("#btn-cancel-title-content").html(wkWordings.Button_Cancel);
	$("#btn-download-title-content").html(wkWordings.Button_Download);
};

var initEvent = function () {
	$(".btn-cancel").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kIngore
        });
	});

	$(".btn-download").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kOpenApp,
			bundleIDs: ['com.trendmicro.adblockone'],
            URL: 'macappstore://apps.apple.com/app/apple-store/id1491889901?pt=444218&ct=safety_'+ sourceFrom +'_promotion&mt=8'
        });
	});
};

$(document).ready(function () {
	initEvent();
});
