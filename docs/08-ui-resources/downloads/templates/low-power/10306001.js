function screen_on_load()
{

}

function btn_Start_on_mouseup(objInst)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	sld.setfocus();
	this.fn_nationFlag();
	sld.movenext();
}

function btn_ac_on_mouseup(objInst)
{
	factory.loadpopupex("무인민원발급기접근성(팝업)", "/BIZ/103/06/POP/10306019", "발급", true, XFD_BORDER_NONE, 90, 483, 0, 0, false, true, true, screen);	
}

function btnimage_on_click(objInst, bPrevCheckState, bCurCheckState)
{
	let parentScr = this.screen.getparent();
	let sld = parentScr.getinstancebyname("SV_Template");
	let objNm = objInst.getname().substr(3);
	SYSUtil.fn_Debug(this, "objNm:"+objNm);
	SYSUtil.fn_Debug(this, "objNm.substr(3):"+objNm.substr(3));

	let itemNm = objInst.gettext();
	let itemInfo = sld.getcustomprop("itemInfo");
	//차량
	itemInfo.itemNm = itemNm;
	SYSUtil.fn_Debug(this, "itemInfo:" + itemNm);
	sld.setcustomprop("itemInfo", itemNm);
}

function fn_nationFlag()
{
	let parentScr = this.screen.getparent();	
	let sld = parentScr.getinstancebyname("SV_Template");
	let nationVal = this.btnimage1.gettext();
	let i,tab,nationFlagObj;
	SYSUtil.fn_Debug(this, "nationVal:"+nationVal,nationVal);

	for(i = 0; i < sld.getitemcount() ; i++){
		tab = sld.getchildinstancefirst(i);
		SYSUtil.fn_Debug(this, "tab:"+tab,tab);
		nationFlagObj = tab.getchildinstancebyname(0,"btn_flag");
		SYSUtil.fn_Debug(this, "tab.getinnerscreenurl(0):"+tab.getinnerscreenurl(0),tab.getinnerscreenurl(0));
		SYSUtil.fn_Debug(this, "nationFlagObj:"+nationFlagObj,nationFlagObj);
		if(nationFlagObj != null){
			this.fn_nationChange(nationFlagObj,nationVal);
		}
	}
}
 
function fn_nationChange(nationFlagObj,nationFlag)
{
	SYSUtil.fn_Debug(this, "Start:");
	if(nationFlag == 1) {
		nationFlagObj.setimagenormal("/BIZ/103/06LP/PUB/language_lound_kr_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06LP/PUB/language_lound_kr_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06LP/PUB/language_lound_kr_bt_dim.png");
	} else if(nationFlag == 2) {
		nationFlagObj.setimagenormal("/BIZ/103/06LP/PUB/language_lound_eng_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06LP/PUB/language_lound_eng_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06LP/PUB/language_lound_eng_bt_dim22.png");
	} else if(nationFlag == 3) {
		nationFlagObj.setimagenormal("/BIZ/103/06LP/PUB/language_lound_cha_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06LP/PUB/language_lound_cha_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06LP/PUB/language_lound_cha_bt_dim22.png");
	} else {
		nationFlagObj.setimagenormal("/BIZ/103/06LP/PUB/language_lound_jpa_bt.png");
		nationFlagObj.setimagedown("/BIZ/103/06LP/PUB/language_lound_jpa_bt_o.png");
		nationFlagObj.setimagefocus("/BIZ/103/06LP/PUB/language_lound_jpa_bt_dim22.png");
	}
		SYSUtil.fn_Debug(this, "End:");
}
 