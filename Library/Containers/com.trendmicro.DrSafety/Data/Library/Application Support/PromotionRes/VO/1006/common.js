const MSGTYPE = {
    kOpenApp: '0',
    kOpenURL: '1',
    kFeedback: '2',
    kIngore: '3'
};

var sourceFrom = '';
var currentLanObj;
var currentLanguage;

var sendMsgToSafety = function (msg) {
    if (window.webkit) {
        window.webkit.messageHandlers.MessageHandler.postMessage(msg);
    }
};

var wkSetSource = function (strSource) {
    sourceFrom = strSource;
	var currentDescriptionWordElem = "vpn-description-word" + "-" + currentLanguage;
	$('.vpn-description-word').remove();
	$elem = $('.wrapper');
	$elem.append($('<div>', {'class': currentDescriptionWordElem, 'text': currentLanObj['Product_Description']}));
}

var wkInitWording = function (language) {
	currentLanguage = language;
	switch (language) {
		case 'zh-Hans':
			wkRunLocalization(ATLocalization_zh_hans);
			currentLanObj = ATLocalization_zh_hans;
			break;
		case 'zh-Hant':
			wkRunLocalization(ATLocalization_zh_hant);
			currentLanObj = ATLocalization_zh_hant;
			break;
		case 'de':
			wkRunLocalization(ATLocalization_de);
			currentLanObj = ATLocalization_de;
			break;
		case 'es':
			wkRunLocalization(ATLocalization_es);
			currentLanObj = ATLocalization_es;
			break;
		case 'fr':
			wkRunLocalization(ATLocalization_fr);
			currentLanObj = ATLocalization_fr;
			break;
		case 'it':
			wkRunLocalization(ATLocalization_it);
			currentLanObj = ATLocalization_it;
			break;
		case 'ko':
			wkRunLocalization(ATLocalization_ko);
			currentLanObj = ATLocalization_ko;
			break;
		case 'nl':
			wkRunLocalization(ATLocalization_nl);
			currentLanObj = ATLocalization_nl;
			break;
		case 'en':
			wkRunLocalization(ATLocalization_en);
			currentLanObj = ATLocalization_en;
			break;
        case 'pt-BR':
            wkRunLocalization(ATLocalization_pt_br);
			currentLanObj = ATLocalization_pt_br;
            break;
        case 'ru':
            wkRunLocalization(ATLocalization_ru);
			currentLanObj = ATLocalization_ru;
            break;
		default:
			wkRunLocalization(ATLocalization_en);
			currentLanObj = ATLocalization_en;
	}
};

var wkRunLocalization = function(wkWordings) {
	var currentDescriptionWordElem = "vpn-description-word" + "-" + currentLanguage;
	$(".vpn-name").html(wkWordings.Product_Title);
	$("." + currentDescriptionWordElem).html(wkWordings.Product_Description);
	$(".cancel-btn").html(wkWordings.Button_Cancel);
	$(".open-btn").html(wkWordings.Button_Open);
};


var initEvent = function () {
	$(".cancel-btn").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kIngore
        });
	});

	$(".open-btn").click(function () {
		sendMsgToSafety({
            type: MSGTYPE.kOpenApp,
            bundleIDs: ['com.trendmicro.MAC.TMPWP'],
			URL: 'macappstore://apps.apple.com/app/apple-store/id1451310993?pt=444218&ct=Safety_BuyVPN_'+ sourceFrom +'_V1006&mt=8'
        });
	});
};

$(document).ready(function () {
	//setLanguage("en");
	initEvent();
});
