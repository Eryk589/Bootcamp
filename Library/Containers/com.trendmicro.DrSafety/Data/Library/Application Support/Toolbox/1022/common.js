const MSGTYPE = {
    kOpenApp: '0',
    kOpenURL: '1',
    kFeedback: '2'
};

var sendMsgToSafety = function (msg) {
    if (window.webkit) {
        window.webkit.messageHandlers.ToolboxMessageHandler.postMessage(msg);
    }
};

var setLanguage = function (lang) {
    switch (lang) {
        case 'de':
            runLocalization(wordings_de);
            break;
        case 'en':
            runLocalization(wordings_en);
            break;
        case 'es':
            runLocalization(wordings_es);
            break;
        case 'fr':
            runLocalization(wordings_fr);
            break;
        case 'it':
            runLocalization(wordings_it);
            break;
        case 'ko':
            runLocalization(wordings_ko);
            break;
        case 'nl':
            runLocalization(wordings_nl);
            break;
        case 'pt-BR':
            runLocalization(wordings_pt_br);
            break;
        case 'ru':
            runLocalization(wordings_ru);
            break;
        case 'zh-Hans':
            runLocalization(wordings_zh_hans);
            break;
        case 'zh-Hant':
            runLocalization(wordings_zh_hant);
            break;
        default:
            runLocalization(wordings_en);
    }
};

var runLocalization = function (data) {
    $("#title-content").html(data.Product_Title);
    $("#description-content").text(data.Product_Description);
    $("#tool-name-content-1").text(data.Tool_Name_1);
    $("#tool-description-content-1").text(data.Tool_Description_1);
    $("#tool-name-content-2").html(data.Tool_Name_2);
    $("#tool-description-content-2").html(data.Tool_Description_2);
    $("#tool-name-content-3").html(data.Tool_Name_3);
    $("#tool-description-content-3").html(data.Tool_Description_3);
    $(".open-btn").html(data.Button_Open);
    $(".feedback-btn").html(data.Button_Feedback);
    $(".tool-created").html(data.Tool_Created_Name);
};

var reloadCurrentPage = function (data) {
    var langObj;
    let language = data.language;
    switch (language) {
        case 'de':
            langObj = wordings_de;
            break;
        case 'en':
            langObj = wordings_en;
            break;
        case 'es':
            langObj = wordings_es;
            break;
        case 'fr':
            langObj = wordings_fr;
            break;
        case 'it':
            langObj = wordings_it;
            break;
        case 'ko':
            langObj = wordings_ko;
            break;
        case 'nl':
            langObj = wordings_nl;
            break;
        case 'pt-BR':
            langObj = wordings_pt_br;
            break;
        case 'ru':
            langObj = wordings_ru;
            break;
        case 'zh-Hans':
            langObj = wordings_zh_hans;
            break;
        case 'zh-Hant':
            langObj = wordings_zh_hant;
            break;
        default:
            langObj = wordings_en;
    }
    $('.tool').remove();
    let appList = ["vpnone", "unarchiverone", "cleanerone", "adblockone", "other"];
    var count = 0;
    var $elem = $('body div.wrapper');
    for (var app of appList) {

        if (count >= 3) {
            break;
        }

        let elementObj = generateElements(app, data, langObj);
        if(elementObj.bMeet != undefined && elementObj.bMeet === true && elementObj.elements != undefined) {
            $elem.append(elementObj.elements);
            count += 1;
        }
    }
}

var generateElements = function (appName, dataDict, language) {
    var retDict = {};
    let btnText = language.Button_Open;
    let manufacturerText = language.Tool_Created_Name;
    let appNameText = language['Tool_Name_'+appName];
    let descriptionText = language['Tool_Description_'+appName];
    $("#description-content").text(language.Product_Description);
    switch (appName) {
        case "vpnone":
            retDict = {
                bMeet : dataDict.countryCode === "CN" ? false : true,
                elements : $('<div/>', {'class': 'tool'}).append(
                $('<div/>', {'class': 'tool-icon tool-icon-'+appName})
                ).append(
                $('<button/>', {'type':'button','class': 'open-btn', 'text':btnText, 'click':function() {
                    sendMsgToSafety({
                        type: MSGTYPE.kOpenApp,
                        product: "VPN",
                        bundleIDs: ["com.trendmicro.MAC.TMPWP"],
                        storeURL: 'macappstore://apps.apple.com/app/apple-store/id1451310993?pt=444218&ct=Safety_toolbox_V1022&mt=8'
                    });
                }})
                ).append(
                $('<div/>', {'class': 'tool-name-with-created', 'text':appNameText})
                ).append(
                $('<div/>', {'class': 'tool-created', 'text':manufacturerText})
                ).append(
                $('<div/>', {'class': 'tool-description', 'text':descriptionText})
                )
            }
            break;

        case "unarchiverone":
            retDict = {
                bMeet : true ,
                elements : $('<div/>', {'class': 'tool'}).append(
                $('<div/>', {'class': 'tool-icon tool-icon-'+appName})
                ).append(
                $('<button/>', {'type':'button','class': 'open-btn', 'text':btnText, 'click':function() {
                    sendMsgToSafety({
                        type: MSGTYPE.kOpenApp,
                        product: "Unarchiver",
                        bundleIDs: ["com.trendmicro.DrUnzip"],
                        storeURL: 'macappstore://apps.apple.com/app/apple-store/id1127253508?pt=444218&ct=Safety_toolbox_V1022&mt=8'
                    });
                }})
                ).append(
                $('<div/>', {'class': 'tool-name-with-created', 'text':appNameText})
                ).append(
                $('<div/>', {'class': 'tool-created', 'text':manufacturerText})
                ).append(
                $('<div/>', {'class': 'tool-free-icon2'})
                ).append(
                $('<div/>', {'class': 'tool-description', 'text':descriptionText})
                )
            }
            break;

        case "cleanerone":
            retDict = {
                    bMeet : true ,
                    elements : $('<div/>', {'class': 'tool'}).append(
                   $('<div/>', {'class': 'tool-icon tool-icon-'+appName})
                    ).append(
                    $('<button/>', {'type':'button','class': 'open-btn', 'text':btnText, 'click':function() {
                     sendMsgToSafety({
                        type: MSGTYPE.kOpenApp,
                        product: "Cleaner",
                        bundleIDs: ["com.trendmicro.TrendCleanerPro", "com.trendmicro.DrCleanerProPlus", "com.trendmicro.TrendCleaner"],
                        storeURL: "macappstore://apps.apple.com/app/apple-store/id1133028347?pt=444218&ct=Safety_toolbox_V1022&mt=8"
                    });
                 }})
                    ).append(
                    $('<div/>', {'class': 'tool-name-with-created', 'text':appNameText})
                    ).append(
                    $('<div/>', {'class': 'tool-created', 'text':manufacturerText})
                    ).append(
                    $('<div/>', {'class': 'tool-description', 'text':descriptionText})
                    )
                }
            break;
        case "adblockone":
            retDict = {
                    bMeet : true,
                    elements : $('<div/>', {'class': 'tool'}).append(
                   $('<div/>', {'class': 'tool-icon tool-icon-'+appName})
                    ).append(
                    $('<button/>', {'type':'button','class': 'open-btn', 'text':btnText, 'click':function() {
                     sendMsgToSafety({
                        type: MSGTYPE.kOpenApp,
                        product: "AdBlock",
                        bundleIDs: ["com.trendmicro.adblockone"],
                        storeURL: "macappstore://apps.apple.com/app/apple-store/id1491889901?pt=444218&ct=Safety_toolbox_V1022&mt=8"
                    });
                 }})
                    ).append(
                    $('<div/>', {'class': 'tool-name-with-created', 'text':appNameText})
                    ).append(
                    $('<div/>', {'class': 'tool-created', 'text':manufacturerText})
                    ).append(
                    $('<div/>', {'class': 'tool-free-icon2'})
                    ).append(
                    $('<div/>', {'class': 'tool-description', 'text':descriptionText})
                    )
                }
            break;
        case "icleaner":
            retDict = {
                    bMeet : true,
                    elements : $('<div/>', {'class': 'tool'}).append(
                   $('<div/>', {'class': 'tool-icon tool-icon-'+appName})
                    ).append(
                    $('<button/>', {'type':'button','class': 'open-btn', 'text':btnText, 'click':function() {
                         sendMsgToSafety({
                            type: MSGTYPE.kOpenURL,
                            product: "iCleaner",
                            URL: "https://apps.apple.com/app/apple-store/id1156773866?pt=444218&ct=Safety_toolbox_V1022&mt=8"
                        });
                    }})
                    ).append(
                    $('<div/>', {'class': 'tool-name-with-created', 'text':appNameText})
                    ).append(
                    $('<div/>', {'class': 'tool-created', 'text':manufacturerText})
                    ).append(
                    $('<div/>', {'class': 'tool-description-with-qrcode', 'text':descriptionText})
                    ).append(
                    $('<div/>', {'class': 'tool-qrcode tool-qrcode-2'})
                    )
                }
            break;
        case "other":
            btnText = language.Button_Feedback;
            retDict = {
                        bMeet : true,
                        elements : $('<div/>', {'class': 'tool', 'id' : 'feedback'}).append(
                       $('<div/>', {'class': 'tool-icon tool-icon-'+appName})
                        ).append(
                        $('<button/>', {'type':'button','class': 'feedback-btn', 'text':btnText, 'click':function() {
                            sendMsgToSafety({
                                type: MSGTYPE.kFeedback,
                                product: "Feedback"
                            });
                        }})
                        ).append(
                        $('<div/>', {'class': 'tool-name', 'text':appNameText})
                        ).append(
                        $('<div/>', {'class': 'tool-description', 'text':descriptionText})
                        )
                    }
            break;
        default:
    }
    return retDict;
}

var initEvent = function () {

    $("#btn-open-tool-1").click(function () {
        sendMsgToSafety({
            type: MSGTYPE.kOpenApp,
            product: "Cleaner",
            bundleIDs: ["com.trendmicro.TrendCleanerPro", "com.trendmicro.TrendCleanerProTW", "com.trendmicro.TrendCleaner"],
            storeURL: "macappstore://apps.apple.com/app/apple-store/id1133028347?pt=444218&ct=Safety_toolbox_V1022&mt=8"
        });
    });

    $("#btn-open-tool-2").click(function () {
        sendMsgToSafety({
            type: MSGTYPE.kOpenURL,
            product: "iCleaner",
            URL: "https://apps.apple.com/app/apple-store/id1156773866?pt=444218&ct=Safety_toolbox_V1022&mt=8"
        });
    });

    $("#btn-open-tool-3").click(function () {
        sendMsgToSafety({
            type: MSGTYPE.kFeedback,
            product: "Feedback"
        });
    });

};

$(document).ready(function () {
    initEvent();
});
