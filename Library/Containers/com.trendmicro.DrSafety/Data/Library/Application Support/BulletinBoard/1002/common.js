const MSGTYPE = {
    kOpenApp: '0',
    kOpenURL: '1',
    kFeedback: '2',
    kIngore: '3'
};

var sourceFrom = '';

var sendMsgToSafety = function (msg) {
    if (window.webkit) {
        window.webkit.messageHandlers.BulletinMessageHandler.postMessage(msg);
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
            URL: 'https://cleanerone.trendmicro.com/blog/how-to-upgrade-to-macos-big-sur/?utm_source=antivirusone&utm_medium=referral&utm_campaign=antiviruspush20201113'
        });
	});
};

$(document).ready(function () {
	initEvent();
});
